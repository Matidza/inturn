import axios from "axios";

// const REFRESH_URL = "http://localhost:1000/api/v1/refresh-token";
const REFRESH_URL = "http://localhost:1000/api/v1/refresh-token/get-new-access-token";

// Must match the backend's actual expiresIn on the access token
// (generateAccessToken / refreshTokenHandler both use "15m").
// If that value ever changes, update this too — there's no
// single shared source of truth between frontend and backend here.
const ACCESS_TOKEN_LIFETIME_MS = 15 * 60 * 1000;
const REFRESH_MARGIN_MS = 60 * 1000; // refresh 1 min before expiry
const ISSUED_AT_KEY = "tokenIssuedAt";

let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let refreshInFlight: Promise<boolean> | null = null;

/**
 * Calls the refresh endpoint. Deduped: if a refresh is already in
 * flight (e.g. the proactive timer and a reactive 401 both fire at
 * once), every caller shares the same promise instead of hitting the
 * endpoint multiple times in parallel.
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    try {
      await axios.post(REFRESH_URL, {}, { withCredentials: true });
      localStorage.setItem(ISSUED_AT_KEY, Date.now().toString());
      return true;
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export function markTokenIssued() {
  localStorage.setItem(ISSUED_AT_KEY, Date.now().toString());
}

/**
 * Schedules the next proactive refresh. Call this once after login,
 * and once more on app mount if a session already exists — it
 * accounts for elapsed time since the token was issued, so a page
 * reload mid-session doesn't reset the countdown incorrectly.
 */
export function scheduleTokenRefresh(onExpired: () => void) {
  clearScheduledRefresh();

  const issuedAt = Number(localStorage.getItem(ISSUED_AT_KEY)) || Date.now();
  const elapsed = Date.now() - issuedAt;
  const targetDelay = ACCESS_TOKEN_LIFETIME_MS - REFRESH_MARGIN_MS; // 14 min
  const delay = Math.max(targetDelay - elapsed, 0);

  refreshTimer = setTimeout(async () => {
    const ok = await refreshAccessToken();
    if (ok) {
      scheduleTokenRefresh(onExpired); // re-arm for the next 14-min cycle
    } else {
      onExpired(); // refresh token itself is dead — force real re-login
    }
  }, delay);
}

export function clearScheduledRefresh() {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}