import React, { useMemo } from "react";
import {
  Box, Typography, Grid, Paper, Stack, Button,
  LinearProgress, Chip, Avatar, Skeleton, Divider, Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import PsychologyIcon       from "@mui/icons-material/Psychology";
import WorkOutlineIcon       from "@mui/icons-material/WorkOutline";
import DescriptionIcon       from "@mui/icons-material/Description";
import ArrowForwardIcon      from "@mui/icons-material/ArrowForward";
import TrendingUpIcon        from "@mui/icons-material/TrendingUp";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { ThemeProvider, useThemeMode } from "../../components/common/themecontext";

/* ── CONSTANTS ───────────────────────────────────────────── */
const PURPLE   = "#7F42E7";
const BLUE     = "#5B8DEF";
const GREEN    = "#22C55E";
const WARNING  = "#F59E0B";

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

/* ── TYPES ───────────────────────────────────────────────── */
interface UserStats {
  name: string;
  aiInterviews: number; aiTarget: number;
  professionalInterviews: number; proTarget: number;
  cvScore: number; cvScorePrev?: number;
  streak?: number;
}

interface ActivityItem { id:string; icon:string; label:string; timestamp:string; }

/* ── MOCK DATA ───────────────────────────────────────────── */
const MOCK_STATS: UserStats = {
  name: "Matidza",
  aiInterviews: 6, aiTarget: 10,
  professionalInterviews: 2, proTarget: 5,
  cvScore: 78, cvScorePrev: 65, streak: 4,
};

const MOCK_ACTIVITY: ActivityItem[] = [
  { id:"1", icon:"✅", label:"Completed AI Interview — Backend Developer",  timestamp:"2h ago"      },
  { id:"2", icon:"📄", label:"CV improved from 65% → 78%",                  timestamp:"Yesterday"   },
  { id:"3", icon:"🎤", label:"Attended mock interview with recruiter",       timestamp:"3 days ago"  },
];

/* ── HELPERS ─────────────────────────────────────────────── */
const progressLabel = (p:number) =>
  p >= 100 ? "Complete 🎉" : p >= 60 ? "Almost there!" : p >= 30 ? "Good start" : "Just started";

const clamp = (v:number) => Math.min(100, Math.max(0, v));

/* ── STAT CARD ───────────────────────────────────────────── */
interface StatCardProps {
  icon:React.ReactNode; avatarBg:string;
  title:string; value:string;
  progress:number; barColor:string; barBg:string;
  ctaLabel:string; ctaTo:string;
  tooltipText?:string;
  dark:boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon, avatarBg, title, value,
  progress, barColor, barBg,
  ctaLabel, ctaTo, tooltipText, dark,
}) => {
  const t = tok(dark);
  const clamped = clamp(progress);

  return (
    <Paper
      elevation={0}
      className="fu"
      sx={{
        p:3, borderRadius:4,
        border:`1px solid ${t.border}`,
        background: t.bgCard,
        height:"100%",
        transition:"box-shadow 0.2s, background 0.3s, transform 0.2s",
        "&:hover":{ boxShadow:t.shadow, transform:"translateY(-2px)" },
      }}
    >
      <Stack spacing={2} height="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Avatar sx={{ bgcolor:avatarBg, width:42, height:42 }}>{icon}</Avatar>
            <Typography sx={{ fontWeight:600, fontSize:14, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>
              {title}
            </Typography>
          </Stack>
          {tooltipText && (
            <Tooltip title={tooltipText} arrow>
              <TrendingUpIcon sx={{ fontSize:17, color:t.textMuted, cursor:"help" }}/>
            </Tooltip>
          )}
        </Stack>

        <Typography sx={{ fontSize:30, fontWeight:800, lineHeight:1, color:t.text, fontFamily:"'Syne',sans-serif" }}>
          {value}
        </Typography>

        <Box>
          <Stack direction="row" justifyContent="space-between" mb={0.75}>
            <Typography sx={{ fontSize:12, color:t.textSub }}>{progressLabel(clamped)}</Typography>
            <Typography sx={{ fontSize:12, fontWeight:600, color:barColor }}>{Math.round(clamped)}%</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={clamped}
            sx={{
              backgroundColor: barBg,
              height:8, borderRadius:5,
              "& .MuiLinearProgress-bar":{ backgroundColor:barColor, borderRadius:5 },
            }}
          />
        </Box>

        <Box mt="auto">
          <Button
            component={Link} to={ctaTo}
            endIcon={<ArrowForwardIcon/>}
            size="small"
            sx={{
              textTransform:"none", color:barColor, fontWeight:600, px:0,
              fontFamily:"'DM Sans',sans-serif",
              "&:hover":{ bgcolor:`${barColor}18` },
            }}
          >
            {ctaLabel}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

/* ── STEP CARD ───────────────────────────────────────────── */
interface StepCardProps {
  title:string; desc:string; color:string; chipLabel:string; to?:string; dark:boolean;
}

const StepCard: React.FC<StepCardProps> = ({ title, desc, color, chipLabel, to, dark }) => {
  const t = tok(dark);
  return (
    <Paper
      elevation={0}
      className="fu"
      sx={{
        p:3, borderRadius:4,
        border:`1px solid ${t.stepBorder}`,
        background: t.bgCard,
        height:"100%",
        transition:"transform .18s, box-shadow .18s, background .3s",
        "&:hover":{ transform:"translateY(-3px)", boxShadow:t.shadow },
      }}
    >
      <Stack spacing={2} height="100%">
        <Box>
          <Typography sx={{ fontWeight:700, fontSize:14.5, mb:.5, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize:13.5, color:t.textSub, lineHeight:1.65, fontFamily:"'DM Sans',sans-serif" }}>
            {desc}
          </Typography>
        </Box>
        <Box mt="auto">
          <Chip
            label={chipLabel}
            size="small"
            sx={{ bgcolor:`${color}18`, color, fontWeight:600, fontSize:12 }}
          />
          {to && (
            <Button
              component={Link} to={to}
              size="small"
              endIcon={<ArrowForwardIcon/>}
              sx={{ textTransform:"none", color, fontWeight:600, ml:1, px:0, fontFamily:"'DM Sans',sans-serif", "&:hover":{ bgcolor:`${color}14` } }}
            >
              Start
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

/* ── MAIN COMPONENT ──────────────────────────────────────── */
const Home: React.FC = () => {
  const { dark } = useThemeMode();
  const t = tok(dark);

  const stats    = MOCK_STATS;
  const activity = MOCK_ACTIVITY;
  const isLoading = false;

  const aiProgress  = useMemo(() => (stats.aiInterviews / stats.aiTarget) * 100,  [stats]);
  const proProgress = useMemo(() => (stats.professionalInterviews / stats.proTarget) * 100, [stats]);
  const cvDelta     = stats.cvScorePrev != null ? stats.cvScore - stats.cvScorePrev : null;

  const nextSteps: Omit<StepCardProps,"dark">[] = [
    { title:"Complete 10 AI Interviews",  desc:"Consistency builds confidence — you're over halfway there.", color:PURPLE,  chipLabel:"In Progress",  to:"/mentee/ai-practice"   },
    { title:"Book a Real Interview",       desc:"Test yourself with a seasoned professional.",               color:BLUE,    chipLabel:"Recommended",  to:"/mentee/professionals"  },
    { title:"Improve CV to 90%",           desc:"A stronger CV dramatically increases your shortlist rate.", color:GREEN,   chipLabel:"High Impact",   to:"/mentee/cv-analyzer"    },
  ];

  if (isLoading) return (
    <Box sx={{ px:{ xs:2, md:3 }, py:2.5, bgcolor:t.bg, minHeight:"100vh" }}>
      <Skeleton height={60} sx={{ mb:2, bgcolor: dark?"rgba(255,255,255,0.06)":undefined }}/>
      <Grid container spacing={3}>
        {[1,2,3].map(i => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius:4, bgcolor: dark?"rgba(255,255,255,0.06)":undefined }}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <>
      <style>{css}</style>
      <Box
        sx={{
          px:{ xs:2, md:3 }, py:2.5,
          bgcolor: t.bg,
          minHeight:"100vh",
          transition:"background 0.3s ease",
          fontFamily:"'DM Sans',sans-serif",
        }}
      >

        {/* ── HEADER ────────────────────────────────── */}
        <Stack
          direction={{ xs:"column", md:"row" }}
          justifyContent="space-between"
          alignItems={{ md:"center" }}
          mb={4} spacing={2}
          className="fu"
        >
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
              <Typography
                sx={{
                  fontFamily:"'Syne',sans-serif",
                  color: t.text,
                  fontSize:{ xs:22, md:26 },
                  fontWeight:800,
                  letterSpacing:"-0.015em",
                }}
              >
                Welcome back, {stats.name} 👋
              </Typography>
              {stats.streak && stats.streak > 1 && (
                <Chip
                  icon={<EmojiEventsOutlinedIcon sx={{ fontSize:15 }}/>}
                  label={`${stats.streak}-day streak`}
                  size="small"
                  sx={{ bgcolor:`${WARNING}18`, color:WARNING, fontWeight:600, fontSize:12 }}
                />
              )}
            </Stack>
            <Typography sx={{ color:t.textSub, mt:.5, fontSize:14.5 }}>
              You're getting closer to landing your dream role 🚀
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Button
              component={Link} to="/mentee/ai-home"
              variant="contained"
              sx={{
                bgcolor:PURPLE, borderRadius:100, textTransform:"none",
                fontWeight:600, px:3, fontSize:14,
                fontFamily:"'DM Sans',sans-serif",
                boxShadow:"0 4px 16px rgba(127,66,231,0.3)",
                "&:hover":{ bgcolor:"#6a35c9", boxShadow:"0 8px 24px rgba(127,66,231,0.4)" },
              }}
            >
              Start AI Interview
            </Button>
            <Button
              component={Link} to="/mentee/professionals"
              variant="outlined"
              sx={{
                borderRadius:100, textTransform:"none",
                borderColor: t.btnOutline,
                color:PURPLE, fontWeight:600, px:3, fontSize:14,
                fontFamily:"'DM Sans',sans-serif",
                background: t.btnOutlineBg,
                "&:hover":{ background:`${PURPLE}12`, borderColor:PURPLE },
                transition:"all 0.2s",
              }}
            >
              Book Professional
            </Button>
          </Stack>
        </Stack>

        {/* ── STAT CARDS ────────────────────────────── */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} className="fu d1">
            <StatCard
              icon={<PsychologyIcon sx={{ color:PURPLE }}/>}
              avatarBg={t.actBg}
              title="AI Interviews"
              value={`${stats.aiInterviews} / ${stats.aiTarget}`}
              progress={aiProgress}
              barColor={PURPLE}
              barBg={t.barBgPurple}
              ctaLabel="Continue Practice"
              ctaTo="/mentee/ai-practice"
              tooltipText="Practice sessions completed this month"
              dark={dark}
            />
          </Grid>
          <Grid item xs={12} md={4} className="fu d2">
            <StatCard
              icon={<WorkOutlineIcon sx={{ color:BLUE }}/>}
              avatarBg={t.actBgBlue}
              title="Real Interviews"
              value={`${stats.professionalInterviews} / ${stats.proTarget}`}
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
              icon={<DescriptionIcon sx={{ color:GREEN }}/>}
              avatarBg={t.actBgGreen}
              title={cvDelta != null ? `CV Score (+${cvDelta}% this week)` : "CV Score"}
              value={`${stats.cvScore}%`}
              progress={stats.cvScore}
              barColor={GREEN}
              barBg={t.barBgGreen}
              ctaLabel="Improve CV"
              ctaTo="/mentee/cv-analyzer"
              tooltipText="Based on ATS compatibility and completeness"
              dark={dark}
            />
          </Grid>
        </Grid>

        {/* ── NEXT STEPS ────────────────────────────── */}
        <Box mt={4} className="fu d4">
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
            <Typography sx={{ fontSize:{ xs:17, md:20 }, fontWeight:700, color:t.text, fontFamily:"'Syne',sans-serif" }}>
              Next Steps
            </Typography>
            <Typography sx={{ fontSize:12, color:t.textSub }}>Personalised to your progress</Typography>
          </Stack>
          <Grid container spacing={3}>
            {nextSteps.map((step, i) => (
              <Grid item xs={12} md={4} key={i}>
                <StepCard {...step} dark={dark}/>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── RECENT ACTIVITY ───────────────────────── */}
        <Box mt={4} className="fu d5">
          <Typography sx={{ fontSize:{ xs:17, md:20 }, fontWeight:700, color:t.text, mb:2.5, fontFamily:"'Syne',sans-serif" }}>
            Recent Activity
          </Typography>

          <Paper
            elevation={0}
            sx={{
              borderRadius:4,
              border:`1px solid ${t.border}`,
              background: t.bgCard,
              overflow:"hidden",
              transition:"background 0.3s",
            }}
          >
            <Stack divider={<Divider sx={{ borderColor:t.divider }}/>}>
              {activity.length === 0 ? (
                <Box px={3} py={4} textAlign="center">
                  <Typography sx={{ color:t.textSub, fontSize:14 }}>
                    No recent activity — complete your first session!
                  </Typography>
                </Box>
              ) : (
                activity.map(item => (
                  <Stack
                    key={item.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3} py={2}
                    sx={{
                      transition:"background 0.15s",
                      "&:hover":{ bgcolor:t.bgAlt },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography fontSize={20} role="img">{item.icon}</Typography>
                      <Typography sx={{ fontSize:14, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>
                        {item.label}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize:12.5, color:t.textSub, flexShrink:0, ml:2 }}>
                      {item.timestamp}
                    </Typography>
                  </Stack>
                ))
              )}
            </Stack>
          </Paper>
        </Box>

        {/* ── BOTTOM PADDING ─────────────────────────── */}
        <Box pb={4}/>
      </Box>
    </>
  );
};

export default Home;