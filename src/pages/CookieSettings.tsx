import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Cookie, BarChart2, Heart, Megaphone, Shield,
  CheckCircle2, Info, ChevronDown, ChevronUp, ArrowRight,
  Save, RotateCcw,
} from "lucide-react";

/* ── TOKENS ──────────────────────────────────────────── */
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#5C5C72";
const INK3   = "#8A8AA0";
const BORDER = "#E8E3F5";
const OFF    = "#F8F7FC";
const GREEN  = "#00916E";
const GREEN_L= "#ECFDF5";

/* ── CSS ─────────────────────────────────────────────── */
const css = `
  
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes checkPop {
    0%  { transform: scale(0) rotate(-20deg); opacity: 0; }
    70% { transform: scale(1.2) rotate(3deg); opacity: 1; }
    100%{ transform: scale(1) rotate(0); opacity: 1; }
  }
  @keyframes savedPop {
    0%  { opacity: 0; transform: translateY(10px) scale(.95); }
    60% { opacity: 1; transform: translateY(-3px) scale(1.02); }
    100%{ opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position:  200% center; }
  }

  .fu  { animation: fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay: .06s; }
  .d2 { animation-delay: .12s; }
  .d3 { animation-delay: .18s; }

  /* Custom toggle */
  .toggle-wrap {
    position: relative; display: inline-flex; align-items: center;
    width: 52px; height: 28px; flex-shrink: 0;
  }
  .toggle-input {
    opacity: 0; width: 0; height: 0; position: absolute;
  }
  .toggle-track {
    position: absolute; inset: 0; border-radius: 100px;
    background: #E5E7EB; cursor: pointer;
    transition: background .25s cubic-bezier(.4,0,.2,1);
  }
  .toggle-track.on { background: ${P}; }
  .toggle-track.always-on { background: ${GREEN}; cursor: not-allowed; }
  .toggle-thumb {
    position: absolute; top: 3px; left: 3px;
    width: 22px; height: 22px; border-radius: 50%;
    background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.18);
    transition: left .25s cubic-bezier(.34,1.56,.64,1);
  }
  .toggle-track.on .toggle-thumb, .toggle-track.always-on .toggle-thumb { left: 27px; }

  /* Cookie category cards */
  .cookie-card {
    border: 1.5px solid ${BORDER}; border-radius: 18px;
    background: #fff; overflow: hidden;
    transition: border-color .2s, box-shadow .2s;
  }
  .cookie-card.enabled { border-color: ${P}; box-shadow: 0 0 0 3px ${P_LITE}; }
  .cookie-card.always  { border-color: ${GREEN}; box-shadow: 0 0 0 3px ${GREEN_L}; }

  .cookie-header {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 22px 24px; cursor: pointer;
  }
  .cookie-header.no-expand { cursor: default; }

  .cookie-icon {
    width: 42px; height: 42px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all .2s;
  }

  .cookie-body { padding: 0 24px 22px; }

  /* Info list */
  .info-list { list-style: none; padding: 0; margin: 10px 0 0; }
  .info-list li {
    display: flex; gap: 8px; align-items: flex-start;
    padding: 6px 0; border-bottom: 1px solid ${BORDER};
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: ${INK2}; line-height: 1.6;
  }
  .info-list li:last-child { border-bottom: none; }

  /* Save feedback */
  .save-feedback {
    display: flex; align-items: center; gap: 8px;
    background: ${GREEN_L}; border: 1.5px solid #86EFAC;
    border-radius: 12px; padding: 14px 20px;
    animation: savedPop .4s cubic-bezier(.22,1,.36,1) both;
  }

  /* Buttons */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 13px 28px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    border: none; cursor: pointer; background: ${P}; color: #fff;
    transition: all .2s;
  }
  .btn-primary:hover { background: ${P_DARK}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(127,66,231,.28); }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    background: transparent; color: ${INK2};
    border: 1.5px solid ${BORDER}; cursor: pointer;
    transition: all .2s;
  }
  .btn-secondary:hover { border-color: ${P}; color: ${P}; }

  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
    background: ${P_LITE}; color: ${P};
  }
  .badge-green {
    background: ${GREEN_L}; color: ${GREEN};
  }
`;

/* ── COOKIE TYPES DATA ───────────────────────────────── */
const COOKIE_TYPES = [
  {
    key:    "necessary",
    label:  "Strictly necessary",
    icon:   <Shield size={19} />,
    always: true,
    color:  GREEN,
    bg:     GREEN_L,
    tagLabel: "Always active",
    short:  "Core platform functions. Cannot be disabled.",
    desc:   "These cookies are essential for the inTURN platform to function correctly. Without them, core features like authentication, security, and session management would not work.",
    examples: [
      "Session authentication and login persistence",
      "Security tokens and CSRF protection",
      "Load balancing and server routing",
      "Shopping cart and booking state",
    ],
  },
  {
    key:    "analytics",
    label:  "Analytics",
    icon:   <BarChart2 size={19} />,
    always: false,
    color:  P,
    bg:     P_LITE,
    tagLabel: "Optional",
    short:  "Help us understand how the platform is used.",
    desc:   "These cookies collect anonymised data about how users navigate and interact with inTURN. This helps us identify areas for improvement and understand which features are most valuable.",
    examples: [
      "Page views, session duration, and bounce rates",
      "Feature usage and interaction patterns",
      "Error tracking and performance monitoring",
      "A/B test participation (anonymised)",
    ],
  },
  {
    key:    "preferences",
    label:  "Preferences",
    icon:   <Heart size={19} />,
    always: false,
    color:  P,
    bg:     P_LITE,
    tagLabel: "Optional",
    short:  "Remember your settings and personalise your experience.",
    desc:   "These cookies allow inTURN to remember choices you've made — such as your preferred language, region, or theme — so we can provide a more personalised experience on your next visit.",
    examples: [
      "Language and region preferences",
      "Dashboard layout and display settings",
      "Notification preferences",
      "Recently viewed profiles and jobs",
    ],
  },
  {
    key:    "marketing",
    label:  "Marketing",
    icon:   <Megaphone size={19} />,
    always: false,
    color:  P,
    bg:     P_LITE,
    tagLabel: "Optional",
    short:  "Deliver relevant ads and measure campaign performance.",
    desc:   "These cookies are used to show you relevant advertisements on inTURN and third-party platforms, and to track the effectiveness of marketing campaigns. They may be set by us or trusted advertising partners.',",
    examples: [
      "Targeted advertising based on browsing history",
      "Cross-platform retargeting campaigns",
      "Ad conversion and attribution tracking",
      "Social media pixel integration",
    ],
  },
];

type Settings = { necessary: boolean; analytics: boolean; preferences: boolean; marketing: boolean };
type SettingKey = keyof Settings;

/* ── TOGGLE COMPONENT ────────────────────────────────── */
const Toggle = ({ checked, onChange, disabled }: { checked: boolean; onChange?: () => void; disabled?: boolean }) => (
  <div className="toggle-wrap" onClick={!disabled ? onChange : undefined}>
    <div className={`toggle-track${disabled ? " always-on" : checked ? " on" : ""}`}>
      <div className="toggle-thumb" />
    </div>
  </div>
);

/* ── COOKIE CARD ─────────────────────────────────────── */
const CookieCard = ({
  type, enabled, onToggle,
}: {
  type: typeof COOKIE_TYPES[0];
  enabled: boolean;
  onToggle: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const isOn = type.always || enabled;

  return (
    <div className={`cookie-card${type.always ? " always" : isOn ? " enabled" : ""}`}>
      {/* Header */}
      <div
        className={`cookie-header${type.always ? " no-expand" : ""}`}
        onClick={() => !type.always && setExpanded(e => !e)}
      >
        {/* Icon */}
        <Box sx={{ width: 42, height: 42, borderRadius: "11px", background: type.always ? GREEN_L : isOn ? P_LITE : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", color: type.always ? GREEN : isOn ? P : INK3, flexShrink: 0, transition: "all .2s" }}>
          {type.icon}
        </Box>

        {/* Title + desc */}
        <Box flex={1} minWidth={0}>
          <Stack direction="row" spacing={1.25} alignItems="center" mb={0.5} flexWrap="wrap">
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: INK }}>
              {type.label}
            </Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.25, py: 0.3, borderRadius: 100, background: type.always ? GREEN_L : isOn ? P_LITE : "#F3F4F6", fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: type.always ? GREEN : isOn ? P : INK3 }}>
              {type.always ? <CheckCircle2 size={11} /> : <Info size={11} />}
              {type.always ? "Always active" : isOn ? "Active" : "Inactive"}
            </Box>
          </Stack>
          <Typography sx={{ fontSize: 13.5, color: INK2, lineHeight: 1.6 }}>{type.short}</Typography>
        </Box>

        {/* Controls */}
        <Stack direction="row" spacing={1.5} alignItems="center" flexShrink={0} onClick={e => e.stopPropagation()}>
          <Toggle checked={isOn} onChange={onToggle} disabled={type.always} />
          {!type.always && (
            <Box sx={{ color: INK3, mt: 0.25 }} onClick={e => { e.stopPropagation(); setExpanded(x => !x); }}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Box>
          )}
        </Stack>
      </div>

      {/* Expanded body */}
      {expanded && !type.always && (
        <div className="cookie-body">
          <Box sx={{ height: 1, background: BORDER, mb: 2 }} />
          <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.75, mb: 2 }}>
            {type.desc}
          </Typography>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1 }}>
            Examples
          </Typography>
          <ul className="info-list">
            {type.examples.map((ex) => (
              <li key={ex}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: P, flexShrink: 0, mt: 0.85 }} />
                {ex}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/* ── MAIN COMPONENT ──────────────────────────────────── */
const CookieSettings: React.FC = () => {
  const DEFAULTS: Settings = { necessary: true, analytics: false, preferences: false, marketing: false };

  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem("cookieSettings");
      return stored ? { ...DEFAULTS, ...JSON.parse(stored), necessary: true } : DEFAULTS;
    } catch { return DEFAULTS; }
  });

  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const toggle = (key: SettingKey) => {
    if (key === "necessary") return;
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setHasChanges(true);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("cookieSettings", JSON.stringify(settings));
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 4000);
  };

  const handleReject = () => {
    const reset: Settings = { necessary: true, analytics: false, preferences: false, marketing: false };
    setSettings(reset);
    localStorage.setItem("cookieSettings", JSON.stringify(reset));
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 4000);
  };

  const handleAcceptAll = () => {
    const all: Settings = { necessary: true, analytics: true, preferences: true, marketing: true };
    setSettings(all);
    localStorage.setItem("cookieSettings", JSON.stringify(all));
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 4000);
  };

  const activeCount = Object.values(settings).filter(Boolean).length;

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background: OFF, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ──────────────────────────────────────── */}
        <Box sx={{
          background: `linear-gradient(160deg, ${P_LITE} 0%, #fff 55%)`,
          pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 },
          px: { xs: 3, md: 8 }, borderBottom: `1px solid ${BORDER}`,
        }}>
          <Box maxWidth="lg" mx="auto">
            <div className="fu">
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 3 }}>
                <div className="badge"><Cookie size={12} /> Privacy</div>
              </Box>
            </div>
            <div className="fu d1">
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.4rem", md: "3.8rem" },
                fontWeight: 800, color: INK,
                letterSpacing: "-0.03em", lineHeight: 1.04, mb: 2.5,
              }}>
                Cookie Settings
              </Typography>
            </div>
            <div className="fu d2">
              <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, lineHeight: 1.8, maxWidth: 580, fontWeight: 300 }}>
                You have full control over how your data is used. Manage your cookie preferences below in compliance with POPIA and GDPR.
              </Typography>
            </div>

            {/* Active count strip */}
            <div className="fu d3">
              <Stack direction="row" spacing={3} mt={4} alignItems="center">
                <Box>
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.25 }}>Active categories</Typography>
                  <Typography sx={{ fontSize: 13.5, color: INK, fontWeight: 500 }}>{activeCount} of {COOKIE_TYPES.length}</Typography>
                </Box>
                {hasChanges && (
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.5, py: 0.5, borderRadius: 100, background: "#FEF3C7", border: "1px solid #FDE68A" }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#B45309" }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#B45309" }}>Unsaved changes</Typography>
                  </Box>
                )}
              </Stack>
            </div>
          </Box>
        </Box>

        {/* ── CONTENT ───────────────────────────────────── */}
        <Box maxWidth="lg" mx="auto" px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 8 }}>
          <Box sx={{ display: "flex", gap: 5, alignItems: "flex-start" }}>

            {/* ─ Sidebar ──────────────────────────────── */}
            <Box sx={{ display: { xs: "none", lg: "block" }, width: 260, flexShrink: 0, position: "sticky", top: 90 }}>

              {/* Quick actions */}
              <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "16px", background: "#fff", p: 3, mb: 2.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.08em", mb: 2 }}>
                  Quick actions
                </Typography>
                <Stack spacing={1.25}>
                  <button className="btn-primary" onClick={handleAcceptAll} style={{ width: "100%", justifyContent: "center" }}>
                    Accept all
                  </button>
                  <button className="btn-secondary" onClick={handleReject} style={{ width: "100%", justifyContent: "center" }}>
                    <RotateCcw size={14} /> Reject optional
                  </button>
                </Stack>
              </Box>

              {/* Category overview */}
              <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "16px", background: "#fff", p: 3, mb: 2.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.08em", mb: 2 }}>
                  Your selections
                </Typography>
                <Stack spacing={1.5}>
                  {COOKIE_TYPES.map((type) => {
                    const on = type.always || settings[type.key as SettingKey];
                    return (
                      <Stack key={type.key} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontSize: 13.5, color: INK2 }}>{type.label}</Typography>
                        <Box sx={{ fontSize: 12, fontWeight: 600, color: on ? (type.always ? GREEN : P) : INK3, background: on ? (type.always ? GREEN_L : P_LITE) : "#F3F4F6", borderRadius: 100, px: 1.25, py: 0.3, fontFamily: "'DM Sans', sans-serif" }}>
                          {on ? (type.always ? "Always" : "On") : "Off"}
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>

              {/* Links */}
              <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "14px", background: "#fff", p: 2.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1.5 }}>
                  Related policies
                </Typography>
                <Stack spacing={0.75}>
                  {[{ label: "Privacy Policy", to: "/privacy-policy" }, { label: "Terms of Service", to: "/terms-of-service" }].map(({ label, to }) => (
                    <Link key={to} to={to} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", fontSize: 13.5, color: INK2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderBottom: `1px solid ${BORDER}` }}>
                      {label} <ArrowRight size={13} />
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* ─ Main content ─────────────────────────── */}
            <Box flex={1}>

              {/* Save feedback */}
              {saved && (
                <Box sx={{ mb: 3 }}>
                  <div className="save-feedback">
                    <CheckCircle2 size={18} color={GREEN} />
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: GREEN }}>Preferences saved</Typography>
                      <Typography sx={{ fontSize: 13, color: INK2, mt: 0.25 }}>Your cookie settings have been updated and stored.</Typography>
                    </Box>
                  </div>
                </Box>
              )}

              {/* Intro */}
              <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "18px", background: "#fff", p: 3, mb: 3, display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box sx={{ width: 36, height: 36, borderRadius: "9px", background: P_LITE, display: "flex", alignItems: "center", justifyContent: "center", color: P, flexShrink: 0 }}>
                  <Info size={17} />
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: INK, mb: 0.5 }}>
                    How we use cookies
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: INK2, lineHeight: 1.7 }}>
                    We use cookies to make inTURN work correctly and to understand how it's used. Only strictly necessary cookies are enabled by default. All others require your consent and can be changed at any time.
                  </Typography>
                </Box>
              </Box>

              {/* Cookie cards */}
              <Stack spacing={2} mb={4}>
                {COOKIE_TYPES.map((type) => (
                  <CookieCard
                    key={type.key}
                    type={type}
                    enabled={settings[type.key as SettingKey]}
                    onToggle={() => toggle(type.key as SettingKey)}
                  />
                ))}
              </Stack>

              {/* Action bar */}
              <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "18px", background: "#fff", p: 3 }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2}>
                  <Box>
                    <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: INK, mb: 0.25 }}>
                      Save your preferences
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: INK2 }}>
                      Changes take effect immediately after saving.
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1.5} flexShrink={0}>
                    <button className="btn-secondary" onClick={handleReject}>
                      <RotateCcw size={14} /> Reject optional
                    </button>
                    <button className="btn-primary" onClick={handleSave}>
                      <Save size={14} /> Save preferences
                    </button>
                  </Stack>
                </Stack>
              </Box>

              {/* Bottom nav */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={5} pt={4}
                sx={{ borderTop: `1px solid ${BORDER}` }}>
                <Typography sx={{ fontSize: 13, color: INK3 }}>© 2026 inTURN. All rights reserved.</Typography>
                <Stack direction="row" spacing={2}>
                  <Link to="/privacy-policy" style={{ fontSize: 13, color: INK2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</Link>
                  <Link to="/terms-of-service" style={{ fontSize: 13, color: INK2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</Link>
                </Stack>
              </Stack>

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CookieSettings;