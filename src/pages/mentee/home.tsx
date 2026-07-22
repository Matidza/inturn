import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Typography, Grid, Paper, Stack, Button,
  LinearProgress, Chip, Avatar, Skeleton, Divider, Tooltip, Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import PsychologyIcon          from "@mui/icons-material/Psychology";
import WorkOutlineIcon          from "@mui/icons-material/WorkOutline";
import DescriptionIcon          from "@mui/icons-material/Description";
import ArrowForwardIcon         from "@mui/icons-material/ArrowForward";
import TrendingUpIcon           from "@mui/icons-material/TrendingUp";
import EmojiEventsOutlinedIcon  from "@mui/icons-material/EmojiEventsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useThemeMode } from "../../components/common/themecontext";

/* ── API BASE ─────────────────────────────────────────────── */
// Adjust this to your actual backend URL / env var
const API_BASE = "http://localhost:5005/api/v1";

/* ── CONSTANTS ───────────────────────────────────────────── */
const PURPLE  = "#7F42E7";
const BLUE    = "#5B8DEF";
const GREEN   = "#22C55E";
const WARNING = "#F59E0B";
const P      = "#7F42E7";
const PD     = "#5E2EC5";
const PM     = "#B893F6";
const PL     = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#4A4A5A";
const INK3   = "#8A8AA0";
const BORDER = "#E8E3F5";
const OFF    = "#F7F6FC";
const WHITE  = "#FFFFFF";
const GRN    = "#059669";
const GRNL   = "#ECFDF5";
const AMB    = "#D97706";
const AMBL   = "#FFFBEB";
const RED    = "#DC2626";
const REDL   = "#FEF2F2";

/* ── THEME TOKENS ────────────────────────────────────────── */
const tok = (dark: boolean) => ({
  bg:           dark ? "#0D0D12" : "#FFFFFF",
  bgCard:       dark ? "#161820" : "#FFFFFF",
  bgCardHover:  dark ? "#1E2028" : "#FAFAFA",
  bgAlt:        dark ? "#1E2028" : "#F8F9FB",
  border:       dark ? "rgba(255,255,255,0.07)" : "#E5E7EB",
  text:         dark ? "#F0F0F5" : "#0D0D12",
  textSub:      dark ? "rgba(240,240,245,0.55)" : "#52526A",
  textMuted:    dark ? "rgba(240,240,245,0.35)" : "#9CA3AF",
  divider:      dark ? "rgba(255,255,255,0.07)" : "#E5E7EB",
  btnOutline:   dark ? "rgba(127,66,231,0.5)" : PURPLE,
  btnOutlineBg: dark ? "rgba(127,66,231,0.08)" : "transparent",
  barBgPurple:  dark ? "rgba(127,66,231,0.2)" : "#EEE8FF",
  barBgBlue:    dark ? "rgba(91,141,239,0.2)"  : "#E8F0FF",
  barBgGreen:   dark ? "rgba(34,197,94,0.18)"  : "#E8FFF3",
  actBg:        dark ? "rgba(127,66,231,0.15)" : "#EEE8FF",
  actBgBlue:    dark ? "rgba(91,141,239,0.15)" : "#E8F0FF",
  actBgGreen:   dark ? "rgba(34,197,94,0.14)"  : "#E8FFF3",
  shadow:       dark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.06)",
  stepBorder:   dark ? "rgba(255,255,255,0.07)" : "#E5E7EB",
});

/* ── CSS ─────────────────────────────────────────────────── */
const css = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .fu { animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
  .d1{animation-delay:.06s} .d2{animation-delay:.12s} .d3{animation-delay:.18s}
  .d4{animation-delay:.24s} .d5{animation-delay:.30s} .d6{animation-delay:.36s}
`;

/* ── API TYPES ───────────────────────────────────────────── */
interface MenteeProfile {
  _id: string;
  name: string;
  surname: string;
  avatar?: string;
}

interface AISessionStats {
  totalSessions: number;
  completedSessions: number;
  completionRate: number;
}

interface MentorProfile {
  _id: string;
  name: string;
  surname: string;
  avatar?: string;
  field?: string;
  roles?: string[];
  experienceLevel?: string;
}

interface Interview {
  _id: string;
  scheduledAt: string;
  status: string;
  mentorId?: { name: string; surname: string; avatar?: string; roles?: string[] };
  duration?: number;
}

// Shape returned by menteeDashboard
interface DashboardResult {
  profile:            MenteeProfile | null;
  recommendedMentors: MentorProfile[];
}

// Shape returned by aiInterviewHome
interface AIHomeResult {
  stats: AISessionStats;
}

// Shape returned by interviews (list)
interface InterviewsResult {
  result: Interview[];
}

/* ── DERIVED UI STATS (built from API data) ──────────────── */
interface UIStats {
  firstName: string;
  avatar?: string;
  aiCompleted: number;
  aiTarget: number;
  proInterviews: number;
  proTarget: number;
  cvScore: number;
  cvScorePrev?: number;
  streak?: number;
  upcomingInterview?: Interview;
}

/* ── HELPERS ─────────────────────────────────────────────── */
const progressLabel = (p: number) =>
  p >= 100 ? "Complete 🎉" : p >= 60 ? "Almost there!" : p >= 30 ? "Good start" : "Just started";

const clamp = (v: number) => Math.min(100, Math.max(0, v));

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-ZA", { weekday:"short", day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" });

/* ── FETCH HELPER ────────────────────────────────────────── */
async function apiFetch<T>(path: string): Promise<T> {
  const token = localStorage.getItem("authToken") ?? "";
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.message ?? `API ${path} returned success=false`);
  return data.result as T;
}

/* ── STAT CARD ───────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode; avatarBg: string;
  title: string; value: string;
  progress: number; barColor: string; barBg: string;
  ctaLabel: string; ctaTo: string;
  tooltipText?: string;
  dark: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon, avatarBg, title, value,
  progress, barColor, barBg,
  ctaLabel, ctaTo, tooltipText, dark,
}) => {
  const t = tok(dark);
  const clamped = clamp(progress);
  return (
    <Paper elevation={0} className="fu" sx={{
      p: 3, borderRadius: 4,
      border: `1px solid ${t.border}`,
      background: t.bgCard, height: "100%",
      transition: "box-shadow 0.2s, background 0.3s, transform 0.2s",
      "&:hover": { boxShadow: t.shadow, transform: "translateY(-2px)" },
    }}>
      <Stack spacing={2} height="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Avatar sx={{ bgcolor: avatarBg, width: 42, height: 42 }}>{icon}</Avatar>
            <Typography sx={{ fontWeight: 600, fontSize: 14, color: t.text, fontFamily: "'DM Sans',sans-serif" }}>
              {title}
            </Typography>
          </Stack>
          {tooltipText && (
            <Tooltip title={tooltipText} arrow>
              <TrendingUpIcon sx={{ fontSize: 17, color: t.textMuted, cursor: "help" }} />
            </Tooltip>
          )}
        </Stack>

        <Typography sx={{ fontSize: 30, fontWeight: 800, lineHeight: 1, color: t.text, fontFamily: "'Syne',sans-serif" }}>
          {value}
        </Typography>

        <Box>
          <Stack direction="row" justifyContent="space-between" mb={0.75}>
            <Typography sx={{ fontSize: 12, color: t.textSub }}>{progressLabel(clamped)}</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: barColor }}>{Math.round(clamped)}%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={clamped} sx={{
            backgroundColor: barBg, height: 8, borderRadius: 5,
            "& .MuiLinearProgress-bar": { backgroundColor: barColor, borderRadius: 5 },
          }} />
        </Box>

        <Box mt="auto">
          <Button component={Link} to={ctaTo} endIcon={<ArrowForwardIcon />} size="small" sx={{
            textTransform: "none", color: barColor, fontWeight: 600, px: 0,
            fontFamily: "'DM Sans',sans-serif",
            "&:hover": { bgcolor: `${barColor}18` },
          }}>
            {ctaLabel}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

/* ── STEP CARD ───────────────────────────────────────────── */
interface StepCardProps {
  title: string; desc: string; color: string; chipLabel: string; to?: string; dark: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ title, desc, color, chipLabel, to, dark }) => {
  const t = tok(dark);
  return (
    <Paper elevation={0} className="fu" sx={{
      p: 3, borderRadius: 4,
      border: `1px solid ${t.stepBorder}`,
      background: t.bgCard, height: "100%",
      transition: "transform .18s, box-shadow .18s, background .3s",
      "&:hover": { transform: "translateY(-3px)", boxShadow: t.shadow },
    }}>
      <Stack spacing={2} height="100%">
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14.5, mb: .5, color: t.text, fontFamily: "'DM Sans',sans-serif" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: t.textSub, lineHeight: 1.65, fontFamily: "'DM Sans',sans-serif" }}>
            {desc}
          </Typography>
        </Box>
        <Box mt="auto">
          <Chip label={chipLabel} size="small"
            sx={{ bgcolor: `${color}18`, color, fontWeight: 600, fontSize: 12 }} />
          {to && (
            <Button component={Link} to={to} size="small" endIcon={<ArrowForwardIcon />}
              sx={{ textTransform: "none", color, fontWeight: 600, ml: 1, px: 0, fontFamily: "'DM Sans',sans-serif", "&:hover": { bgcolor: `${color}14` } }}>
              Start
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

/* ── UPCOMING INTERVIEW CARD ─────────────────────────────── */
const UpcomingCard: React.FC<{ interview: Interview; dark: boolean }> = ({ interview, dark }) => {
  const t = tok(dark);
  const mentor = interview.mentorId;
  return (
    <Paper elevation={0} sx={{
      p: 2.5, borderRadius: 3, border: `1.5px solid ${PURPLE}33`,
      background: dark ? "rgba(127,66,231,0.08)" : "#FAF6FF",
    }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: t.actBg, width: 44, height: 44 }}>
          <CalendarTodayOutlinedIcon sx={{ color: PURPLE, fontSize: 20 }} />
        </Avatar>
        <Box flex={1} minWidth={0}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: t.text }}>
            {mentor ? `Session with ${mentor.name} ${mentor.surname}` : "Upcoming Session"}
          </Typography>
          {mentor?.roles?.[0] && (
            <Typography sx={{ fontSize: 12, color: t.textSub }}>{mentor.roles[0]}</Typography>
          )}
          <Typography sx={{ fontSize: 12, color: PURPLE, fontWeight: 600, mt: 0.5 }}>
            {fmt(interview.scheduledAt)}
            {interview.duration ? ` · ${interview.duration} min` : ""}
          </Typography>
        </Box>
        <Button component={Link} to={`/mentee/join-session?sessionId=${interview._id}`}
          variant="contained" size="small"
          sx={{ bgcolor: PURPLE, textTransform: "none", borderRadius: 100, fontWeight: 600, px: 2, fontSize: 12, flexShrink: 0,
            "&:hover": { bgcolor: "#6a35c9" } }}>
          Join
        </Button>
      </Stack>
    </Paper>
  );
};

/* ── MENTOR CARD (recommended) ───────────────────────────── */
const MentorCard: React.FC<{ mentor: MentorProfile; dark: boolean }> = ({ mentor, dark }) => {
  const t = tok(dark);
  return (
    <Paper elevation={0} sx={{
      p: 2, borderRadius: 3, border: `1px solid ${t.border}`,
      background: t.bgCard,
      transition: "transform .18s, box-shadow .18s",
      "&:hover": { transform: "translateY(-2px)", boxShadow: t.shadow },
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
        <Avatar src={mentor.avatar} sx={{ width: 40, height: 40, bgcolor: t.actBg }}>
          {!mentor.avatar && mentor.name?.[0]}
        </Avatar>
        <Box minWidth={0}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: t.text }} noWrap>
            {mentor.name} {mentor.surname}
          </Typography>
          {mentor.field && (
            <Typography sx={{ fontSize: 12, color: t.textSub }} noWrap>{mentor.field}</Typography>
          )}
        </Box>
      </Stack>
      {mentor.roles?.[0] && (
        <Chip label={mentor.roles[0]} size="small"
          sx={{ bgcolor: t.actBg, color: PURPLE, fontSize: 11, fontWeight: 600, mb: 1.5, alignSelf: "flex-start" }} />
      )}
      <Box mt="auto">
        <Button component={Link} to={`/mentee/professional-details/${mentor._id}`}
        
        // /mentee/professional-details/${pro._id}
          size="small" endIcon={<ArrowForwardIcon />} fullWidth
          sx={{ textTransform: "none", color: PURPLE, fontWeight: 600, fontSize: 12,
            "&:hover": { bgcolor: `${PURPLE}10` } }}>
          View profile
        </Button>
      </Box>
    </Paper>
  );
};

/* ── SKELETON LOADER ─────────────────────────────────────── */
const DashSkeleton: React.FC<{ dark: boolean }> = ({ dark }) => {
  const t = tok(dark);
  const skColor = dark ? "rgba(255,255,255,0.06)" : undefined;
  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 2.5, bgcolor: t.bg, minHeight: "100vh" }}>
      <Skeleton height={60} sx={{ mb: 2, bgcolor: skColor }} />
      <Grid container spacing={3} mb={3}>
        {[1, 2, 3].map(i => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4, bgcolor: skColor }} />
          </Grid>
        ))}
      </Grid>
      <Skeleton height={30} width="30%" sx={{ mb: 2, bgcolor: skColor }} />
      <Grid container spacing={3}>
        {[1, 2, 3].map(i => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 4, bgcolor: skColor }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/* ── MAIN COMPONENT ──────────────────────────────────────── */
const Home: React.FC = () => {
  const { dark } = useThemeMode();
  const t = tok(dark);

  // ── state ──
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [uiStats, setUiStats]         = useState<UIStats | null>(null);
  const [mentors, setMentors]         = useState<MentorProfile[]>([]);
  const [upcomingInterview, setUpcoming] = useState<Interview | null>(null);

  // ── fetch dashboard data ──
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Main dashboard call — profile + recommended mentors
        const dash = await apiFetch<DashboardResult>("/mentee/dashboard");

        // 2. AI session stats
        const aiHome = await apiFetch<AIHomeResult>("/mentee/ai-home");

        // 3. Upcoming interviews — first upcoming one
        let upcoming: Interview | null = null;
        try {
          const ivRes = await apiFetch<InterviewsResult>("/mentee/interviews");
          upcoming = ivRes.result?.[0] ?? null;
        } catch { /* non-critical — don't fail the whole page */ }

        if (cancelled) return;

        const profile = dash.profile;
        const ai = aiHome.stats;

        setMentors(dash.recommendedMentors ?? []);
        setUpcoming(upcoming);

        // Build unified UI stats from real API data
        setUiStats({
          firstName:     profile?.name ?? "there",
          avatar:        profile?.avatar,
          // AI sessions from the aiInterviewHome response
          aiCompleted:   ai.completedSessions,
          aiTarget:      10, // configurable target
          // Pro interviews — use upcoming interview count as a proxy;
          // the interviews endpoint returns paginated results with totalResults
          proInterviews: upcoming ? 1 : 0, // will be replaced once we get the count
          proTarget:     5,
          // CV score — default 0 if no analysis history yet
          cvScore:       profile?.["cvAnalysisHistory"]?.[0]?.score ?? 0,
          cvScorePrev:   profile?.["cvAnalysisHistory"]?.[1]?.score ?? undefined,
          streak:        profile?.["streak"] ?? undefined,
        });

      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? "Failed to load dashboard. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  // ── derived ──
  const aiProgress  = useMemo(() =>
    uiStats ? clamp((uiStats.aiCompleted / uiStats.aiTarget) * 100) : 0,
  [uiStats]);

  const proProgress = useMemo(() =>
    uiStats ? clamp((uiStats.proInterviews / uiStats.proTarget) * 100) : 0,
  [uiStats]);

  const cvDelta = useMemo(() =>
    uiStats?.cvScorePrev != null ? uiStats.cvScore - uiStats.cvScorePrev : null,
  [uiStats]);

  const nextSteps: Omit<StepCardProps, "dark">[] = useMemo(() => {
    if (!uiStats) return [];
    const steps: Omit<StepCardProps, "dark">[] = [];

    if (uiStats.aiCompleted < uiStats.aiTarget) {
      steps.push({
        title: `Complete ${uiStats.aiTarget} AI Interviews`,
        desc:  `You've done ${uiStats.aiCompleted} — consistency builds confidence.`,
        color: PURPLE, chipLabel: "In Progress", to: "/mentee/ai-home",
      });
    } else {
      steps.push({
        title: "AI Practice Complete 🎉",
        desc:  "Incredible consistency. Keep the momentum going.",
        color: PURPLE, chipLabel: "Complete",
      });
    }

    steps.push({
      title: "Book a Real Interview",
      desc:  "Test yourself with a seasoned professional. It makes all the difference.",
      color: BLUE, chipLabel: "Recommended", to: "/mentee/professionals",
    });

    steps.push({
      title: uiStats.cvScore >= 90 ? "CV Looking Strong 💪" : "Improve CV to 90%",
      desc:  uiStats.cvScore >= 90
        ? "Your CV is in great shape — keep it updated as you grow."
        : `Currently at ${uiStats.cvScore}%. A stronger CV dramatically increases your shortlist rate.`,
      color: GREEN, chipLabel: uiStats.cvScore >= 90 ? "On Track" : "High Impact", to: "/mentee/cv-analyzer",
    });

    return steps;
  }, [uiStats]);

  // ── loading ──
  if (loading) return <DashSkeleton dark={dark} />;

  // ── error ──
  if (error) return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 2.5, bgcolor: t.bg, minHeight: "100vh" }}>
      <Alert severity="error" sx={{ borderRadius: 3, mt: 4 }}
        action={
          <Button color="inherit" size="small" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }>
        {error}
      </Alert>
    </Box>
  );

  if (!uiStats) return null;

  return (
    <>
      <style>{css}</style>
      <Box sx={{
        px: { xs: 2, md: 3 }, py: 2.5,
        bgcolor: t.bg, minHeight: "100vh",
        // background:`linear-gradient(160deg,${PL} 0%,${WHITE} 60%)`,
        transition: "background 0.3s ease",
        fontFamily: "'DM Sans',sans-serif",
      }}>

        {/* ── HEADER ────────────────────────────────── */}
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between"
          alignItems={{ md: "center" }} mb={4} spacing={2} className="fu">
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
              <Typography sx={{
                fontFamily: "'Syne',sans-serif", color: t.text,
                fontSize: { xs: 22, md: 26 }, fontWeight: 800, letterSpacing: "-0.015em",
              }}>
                Welcome back, {uiStats.firstName} 👋
              </Typography>
              {uiStats.streak && uiStats.streak > 1 && (
                <Chip icon={<EmojiEventsOutlinedIcon sx={{ fontSize: 15 }} />}
                  label={`${uiStats.streak}-day streak`} size="small"
                  sx={{ bgcolor: `${WARNING}18`, color: WARNING, fontWeight: 600, fontSize: 12 }} />
              )}
            </Stack>
            <Typography sx={{ color: t.textSub, mt: .5, fontSize: 14.5 }}>
              You're getting closer to landing your dream role 🚀
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Button component={Link} to="/mentee/ai-home" variant="contained" sx={{
              bgcolor: PURPLE, borderRadius: 100, textTransform: "none",
              fontWeight: 600, px: 3, fontSize: 14, fontFamily: "'DM Sans',sans-serif",
              boxShadow: "0 4px 16px rgba(127,66,231,0.3)",
              "&:hover": { bgcolor: "#6a35c9", boxShadow: "0 8px 24px rgba(127,66,231,0.4)" },
            }}>
              Start AI Interview
            </Button>
            <Button component={Link} to="/mentee/professionals" variant="outlined" sx={{
              borderRadius: 100, textTransform: "none",
              borderColor: t.btnOutline, color: PURPLE, fontWeight: 600, px: 3, fontSize: 14,
              fontFamily: "'DM Sans',sans-serif", background: t.btnOutlineBg,
              "&:hover": { background: `${PURPLE}12`, borderColor: PURPLE },
              transition: "all 0.2s",
            }}>
              Book Professional
            </Button>
          </Stack>
        </Stack>

        {/* ── UPCOMING INTERVIEW BANNER ──────────────── */}
        {upcomingInterview && (
          <Box mb={3} className="fu d1">
            <UpcomingCard interview={upcomingInterview} dark={dark} />
          </Box>
        )}

        {/* ── STAT CARDS ────────────────────────────── */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} className="fu d1">
            <StatCard
              icon={<PsychologyIcon sx={{ color: PURPLE }} />}
              avatarBg={t.actBg}
              title="AI Interviews"
              value={`${uiStats.aiCompleted} / ${uiStats.aiTarget}`}
              progress={aiProgress}
              barColor={PURPLE}
              barBg={t.barBgPurple}
              ctaLabel="Continue Practice"
              ctaTo="/mentee/ai-practice"
              tooltipText="AI practice sessions completed this month"
              dark={dark}
            />
          </Grid>
          <Grid item xs={12} md={4} className="fu d2">
            <StatCard
              icon={<WorkOutlineIcon sx={{ color: BLUE }} />}
              avatarBg={t.actBgBlue}
              title="Real Interviews"
              value={`${uiStats.proInterviews} / ${uiStats.proTarget}`}
              progress={proProgress}
              barColor={BLUE}
              barBg={t.barBgBlue}
              ctaLabel="Book Session"
              ctaTo="/mentee/professionals"
              tooltipText="Booked sessions with industry professionals"
              dark={dark}
            />
          </Grid>
          <Grid item xs={12} md={4} className="fu d3">
            <StatCard
              icon={<DescriptionIcon sx={{ color: GREEN }} />}
              avatarBg={t.actBgGreen}
              title={cvDelta != null && cvDelta > 0 ? `CV Score (+${cvDelta}% this week)` : "CV Score"}
              value={uiStats.cvScore > 0 ? `${uiStats.cvScore}%` : "Not analyzed"}
              progress={uiStats.cvScore}
              barColor={GREEN}
              barBg={t.barBgGreen}
              ctaLabel={uiStats.cvScore > 0 ? "Improve CV" : "Analyze CV"}
              ctaTo="/mentee/cv-analyzer"
              tooltipText="Based on ATS compatibility and completeness"
              dark={dark}
            />
          </Grid>
        </Grid>

        {/* ── NEXT STEPS ────────────────────────────── */}
        <Box mt={4} className="fu d4">
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
            <Typography sx={{ fontSize: { xs: 17, md: 20 }, fontWeight: 700, color: t.text, fontFamily: "'Syne',sans-serif" }}>
              Next Steps
            </Typography>
            <Typography sx={{ fontSize: 12, color: t.textSub }}>Personalised to your progress</Typography>
          </Stack>
          <Grid container spacing={3}>
            {nextSteps.map((step, i) => (
              <Grid item xs={12} md={4} key={i}>
                <StepCard {...step} dark={dark} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── RECOMMENDED MENTORS ───────────────────── */}
        {mentors.length > 0 && (
          <Box mt={4} className="fu d5">
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
              <Typography sx={{ fontSize: { xs: 17, md: 20 }, fontWeight: 700, color: t.text, fontFamily: "'Syne',sans-serif" }}>
                Recommended for You
              </Typography>
              <Button component={Link} to="/mentee/professionals" size="small" endIcon={<ArrowForwardIcon />}
                sx={{ textTransform: "none", color: PURPLE, fontWeight: 600, fontSize: 13,
                  "&:hover": { bgcolor: `${PURPLE}10` } }}>
                View all
              </Button>
            </Stack>
            <Grid container spacing={2.5}>
              {mentors.slice(0, 6).map(m => (
                <Grid item xs={12} sm={6} md={4} key={m._id}>
                  <MentorCard mentor={m} dark={dark} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* ── BOTTOM PADDING ─────────────────────────── */}
        <Box pb={4} />
      </Box>
    </>
  );
};

export default Home;








