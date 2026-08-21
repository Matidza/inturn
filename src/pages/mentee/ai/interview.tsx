import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Grid, Stack, Skeleton } from "@mui/material";
import {
  ArrowLeft, Play, RefreshCw, BookOpen, Clock, Users, Star,
  Globe, Lock, Sparkles, Lock as LockLarge, SearchX, AlertTriangle,
} from "lucide-react";

/* ─── API ────────────────────────────────────────────────── */
const API_BASE = "http://localhost:1000/api/v1";

// Same endpoint family as the list page — one interview by its Mongo _id,
// as a real path segment. The old getSingleAIInterview read req.query._id
// (?_id=...); the consolidated backend route is GET /mentee/interviews/:id.
const interviewByIdEndpoint = (id: string) => `/mentee/interviews/${id}`;

// NOTE: this duplicates the authFetch helper in the interviews list page.
// Worth lifting both into a shared src/lib/api.ts once you have a home for
// it — kept inline here so this file drops in without assuming your folder
// structure.
const authFetch = async (path: string, opts: RequestInit = {}) => {
  const token = localStorage.getItem("authToken") ?? "";
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    const err: any = new Error(data.message ?? `Request failed ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
};

/* ─── TYPES ──────────────────────────────────────────────── */
interface APIInterview {
  _id: string;
  createdBy: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  isPublic: boolean;
  questions: string[];
  attempts: number;
  rating: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
}

const normalise = (iv: APIInterview) => ({
  id: iv._id ?? "",
  title: iv.title ?? "Untitled",
  category: iv.category ?? "technical",
  difficulty: iv.difficulty ?? "beginner",
  duration: iv.duration ?? 30,
  attempts: iv.attempts ?? 0,
  rating: iv.rating ?? 0,
  tags: Array.isArray(iv.tags) ? iv.tags : [],
  description: iv.description ?? "",
  isPublic: iv.isPublic ?? true,
  featured: iv.featured ?? false,
  createdBy: iv.createdBy ?? "",
  questions: Array.isArray(iv.questions) ? iv.questions : [],
});

type NormalisedIV = ReturnType<typeof normalise>;

/* ─── TOKENS (matches the interviews list page) ─────────── */
const P = "#7F42E7", PD = "#5E2EC5", PM = "#B893F6", PL = "#F0EAFD";
const INK = "#0D0D12", INK2 = "#4A4A5A", INK3 = "#8A8AA0";
const BORDER = "#E8E3F5", OFF = "#F7F6FC", WHITE = "#FFFFFF";
const GRN = "#059669", GRNL = "#ECFDF5", AMB = "#D97706", AMBL = "#FFFBEB", RED = "#DC2626", REDL = "#FEF2F2";

const DIFFS = [
  { id: "beginner", label: "Beginner", color: GRN, bg: GRNL },
  { id: "intermediate", label: "Intermediate", color: AMB, bg: AMBL },
  { id: "advanced", label: "Advanced", color: RED, bg: REDL },
];

const css = `
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
  .fu { animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both; }

  .back-link {
    display:inline-flex; align-items:center; gap:6px;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
    color:${INK2}; cursor:pointer; background:none; border:none; padding:0;
  }
  .back-link:hover { color:${P}; }

  .diff { display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:100px; font-family:'DM Mono',monospace; font-size:11.5px; font-weight:500; }
  .tag { background:${OFF}; border-radius:100px; padding:4px 11px; font-size:12px; font-family:'DM Mono',monospace; color:${INK2}; display:inline-block; }

  .q-row {
    display:flex; gap:12px; padding:14px 16px; border:1.5px solid ${BORDER};
    border-radius:12px; background:${WHITE};
  }
  .q-num {
    width:26px; height:26px; border-radius:50%; flex-shrink:0;
    background:${PL}; color:${P};
    display:flex; align-items:center; justify-content:center;
    font-family:'DM Mono',monospace; font-size:11.5px; font-weight:700;
  }

  .stat-card { border:1.5px solid ${BORDER}; border-radius:14px; padding:16px; background:${WHITE}; }

  .cta-btn {
    width:100%; padding:14px; border:none; border-radius:12px;
    cursor:pointer; font-family:'DM Sans',sans-serif;
    font-size:15px; font-weight:600;
    display:flex; align-items:center; justify-content:center; gap:8px;
    background:${P}; color:#fff;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 8px 26px rgba(127,66,231,.28);
    position:relative; overflow:hidden;
  }
  .cta-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
    background-size:300% auto; animation:shimmer 2.2s linear infinite;
  }
  .cta-btn:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.4); }

  .retry-btn {
    display:flex; align-items:center; gap:6px; padding:10px 18px; border-radius:9px;
    border:none; background:${RED}; color:#fff; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:600;
  }
`;

/* ─── LOADING SKELETON ───────────────────────────────────── */
const DetailSkeleton = () => (
  <Box maxWidth="md" mx="auto" px={{ xs: 2, md: 0 }} py={{ xs: 4, md: 6 }}>
    <Skeleton variant="text" width={90} height={20} sx={{ mb: 3 }} />
    <Skeleton variant="rounded" height={26} width="70%" sx={{ mb: 1.5, borderRadius: "6px" }} />
    <Skeleton variant="text" width="95%" height={20} />
    <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />
    <Stack direction="row" spacing={1.5} mb={4}>
      <Skeleton variant="rounded" width={80} height={30} sx={{ borderRadius: "100px" }} />
      <Skeleton variant="rounded" width={80} height={30} sx={{ borderRadius: "100px" }} />
    </Stack>
    {[1, 2, 3].map(i => (
      <Skeleton key={i} variant="rounded" height={54} sx={{ mb: 1.5, borderRadius: "12px" }} />
    ))}
  </Box>
);

/* ─── ERROR / EMPTY STATES ───────────────────────────────── */
const StateMessage = ({
  icon, title, body, onRetry, onBack,
}: { icon: React.ReactNode; title: string; body: string; onRetry?: () => void; onBack: () => void }) => (
  <Box maxWidth="sm" mx="auto" textAlign="center" py={{ xs: 10, md: 14 }} px={2}>
    <Box sx={{ width: 56, height: 56, borderRadius: "50%", background: PL, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2.5 }}>
      {icon}
    </Box>
    <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.15rem", color: INK, mb: 1 }}>
      {title}
    </Typography>
    <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7, mb: 3.5 }}>
      {body}
    </Typography>
    <Stack direction="row" spacing={1.5} justifyContent="center">
      <button className="back-link" onClick={onBack} style={{ padding: "10px 16px", border: `1.5px solid ${BORDER}`, borderRadius: 9 }}>
        <ArrowLeft size={14} /> Back to interviews
      </button>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          <RefreshCw size={13} /> Retry
        </button>
      )}
    </Stack>
  </Box>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const AIInterviewDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [interview, setInterview] = useState<NormalisedIV | null>(null);
  const [loading, setLoading] = useState(true);
  // "not-found" | "private" | "invalid" | "error" | null
  const [errorKind, setErrorKind] = useState<"not-found" | "private" | "invalid" | "error" | null>(null);

  const fetchInterview = useCallback(async () => {
    if (!id) {
      setErrorKind("invalid");
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorKind(null);
    try {
      const data = await authFetch(interviewByIdEndpoint(id));
      setInterview(normalise(data.result));
    } catch (err: any) {
      if (err.status === 404) setErrorKind("not-found");
      else if (err.status === 403) setErrorKind("private");
      else if (err.status === 400) setErrorKind("invalid");
      else setErrorKind("error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchInterview(); }, [fetchInterview]);

  const goBack = () => navigate("/mentee/ai-home");
  const startInterview = () => {
    if (!interview) return;
    navigate("/mentee/ai-practice", {
      state: {
        interviewId: interview.id,
        title: interview.title,
        questions: interview.questions,
        duration: interview.duration,
        category: interview.category,
      },
    });
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background: "#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", maxWidth:"100vw" }}>

        {loading && <DetailSkeleton />}

        {!loading && errorKind === "not-found" && (
          <StateMessage
            icon={<SearchX size={22} color={P} />}
            title="Interview not found"
            body="This interview may have been removed, or the link isn't quite right."
            onBack={goBack}
          />
        )}

        {!loading && errorKind === "private" && (
          <StateMessage
            icon={<LockLarge size={22} color={P} />}
            title="This interview is private"
            body="Only the person who created it can view or practice with it."
            onBack={goBack}
          />
        )}

        {!loading && errorKind === "invalid" && (
          <StateMessage
            icon={<AlertTriangle size={22} color={P} />}
            title="That's not a valid interview link"
            body="Double-check the link, or head back and pick an interview from the list."
            onBack={goBack}
          />
        )}

        {!loading && errorKind === "error" && (
          <StateMessage
            icon={<AlertTriangle size={22} color={P} />}
            title="Couldn't load this interview"
            body="Something went wrong on our end. Please try again."
            onRetry={fetchInterview}
            onBack={goBack}
          />
        )}

        {!loading && !errorKind && interview && (
          <Box maxWidth="md" mx="auto" px={{ xs: 2, md: 0 }} py={{ xs: 4, md: 7 }}>
            <button className="back-link fu" onClick={goBack} style={{ marginBottom: 24 }}>
              <ArrowLeft size={14} /> Back to interviews
            </button>

            {/* Header */}
            <Box className="fu">
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1} mb={1.5}>
                {interview.featured && (
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: .5, background: `linear-gradient(90deg,${P},${PM})`, borderRadius: 100, px: 1.25, py: .4 }}>
                    <Sparkles size={10} color="#fff" />
                    <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#fff" }}>Featured</Typography>
                  </Box>
                )}
                <span className="diff" style={{ background: DIFFS.find(d => d.id === interview.difficulty)!.bg, color: DIFFS.find(d => d.id === interview.difficulty)!.color }}>
                  {DIFFS.find(d => d.id === interview.difficulty)!.label}
                </span>
                <Stack direction="row" spacing={.5} alignItems="center" sx={{ color: INK3 }}>
                  {interview.isPublic ? <Globe size={13} /> : <Lock size={13} />}
                  <Typography sx={{ fontSize: 12.5, color: INK3 }}>{interview.isPublic ? "Community" : "Private"}</Typography>
                </Stack>
              </Stack>

              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.1rem" }, color: INK, lineHeight: 1.15, letterSpacing: "-0.02em", mb: 1.5 }}>
                {interview.title}
              </Typography>
              <Typography sx={{ fontSize: 15, color: INK2, lineHeight: 1.75, mb: 2.5 }}>
                {interview.description}
              </Typography>

              {interview.tags.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={3}>
                  {interview.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </Stack>
              )}
            </Box>

            {/* Stats + CTA */}
            <Grid container spacing={1.5} className="fu" mb={4}>
              {[
                { icon: <BookOpen size={15} color={P} />, val: `${interview.questions.length}`, label: "Questions" },
                { icon: <Clock size={15} color={P} />, val: `${interview.duration}m`, label: "Duration" },
                { icon: <Users size={15} color={P} />, val: interview.attempts.toLocaleString(), label: "Attempts" },
                { icon: <Star size={15} color={P} fill={P} />, val: `${interview.rating}`, label: "Rating" },
              ].map(({ icon, val, label }) => (
                <Grid item xs={6} sm={3} key={label}>
                  <div className="stat-card">
                    <Box mb={.5}>{icon}</Box>
                    <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: INK }}>{val}</Typography>
                    <Typography sx={{ fontSize: 12, color: INK3 }}>{label}</Typography>
                  </div>
                </Grid>
              ))}
            </Grid>

            <Box className="fu" mb={4}>
              <button className="cta-btn" onClick={startInterview}>
                <Play size={16} /> Start interview
              </button>
            </Box>

            {/* Questions */}
            <Box className="fu">
              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: INK, mb: 2 }}>
                What this interview covers
              </Typography>
              <Stack spacing={1.25}>
                {interview.questions.map((q, i) => (
                  <div className="q-row" key={i}>
                    <div className="q-num">{i + 1}</div>
                    <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.6 }}>{q}</Typography>
                  </div>
                ))}
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AIInterviewDetail;
