// ─────────────────────────────────────────────────────────────────────────────
// StudentPortal.tsx
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Stack, Avatar, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, FileText, Users, CheckCircle2, Star } from "lucide-react";

const P = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_LIGHT = "#F0EAFD";
const INK = "#0D0D12";
const INK2 = "#4A4A5A";
const BORDER = "#E8E3F5";
const OFF = "#FAFAFA";

const sharedStyles = `
  .card-lift { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
  .card-lift:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(127,66,231,0.10); }
`;

const SectionLabel = ({ children }: { children: string }) => (
  <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>
    {children}
  </Typography>
);

const SectionHeading = ({ children, center }: { children: React.ReactNode; center?: boolean }) => (
  <Typography
    sx={{
      fontFamily: " sans-serif",
      fontSize: { xs: "1.8rem", md: "2.4rem" },
      fontWeight: 800,
      color: INK,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      textAlign: center ? "center" : "inherit",
      mb: 1,
    }}
  >
    {children}
  </Typography>
);

const PrimaryBtn = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Button
    component={Link}
    to={to}
    variant="contained"
    endIcon={<ArrowRight size={15} />}
    sx={{
      borderRadius: 100, textTransform: "none",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      background: P, boxShadow: "none",
      "&:hover": { background: P_DARK, boxShadow: "none", transform: "translateY(-2px)" },
      transition: "all 0.2s",
    }}
  >
    {children}
  </Button>
);

const GhostBtn = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Button
    component={Link}
    to={to}
    variant="outlined"
    endIcon={<ArrowRight size={15} />}
    sx={{
      borderRadius: 100, textTransform: "none",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      borderColor: P, color: P,
      "&:hover": { background: P, color: "#fff", borderColor: P, boxShadow: "none", transform: "translateY(-2px)" },
      transition: "all 0.2s",
    }}
  >
    {children}
  </Button>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", height: "100%" }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ width: 44, height: 44, borderRadius: 2, background: P_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: P, mb: 2 }}>
        {icon}
      </Box>
      <Typography sx={{ fontFamily: " sans-serif", fontWeight: 700, fontSize: "1.05rem", color: INK, mb: 1 }}>{title}</Typography>
      <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7 }}>{desc}</Typography>
    </CardContent>
  </Card>
);

const ReviewCard = ({ name, role, review, rating }: { name: string; role: string; review: string; rating: number }) => (
  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none" }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" spacing={0.3} mb={2}>
        {Array.from({ length: rating }).map((_, i) => <Star key={i} size={13} fill={P} color={P} />)}
      </Stack>
      <Typography sx={{ fontSize: 14.5, color: INK, lineHeight: 1.7, mb: 2.5, fontStyle: "italic" }}>"{review}"</Typography>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box sx={{ width: 36, height: 36, borderRadius: "50%", background: P_LIGHT, color: P, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: " sans-serif", fontWeight: 700, fontSize: 14 }}>{name[0]}</Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: 13.5, color: INK }}>{name}</Typography>
          <Typography sx={{ fontSize: 12, color: INK2 }}>{role}</Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export const StudentPortal: React.FC = () => {
  const features = [
    { icon: <FileText size={20} />, title: "CV & ATS optimization", desc: "Get expert-level feedback and ensure your CV passes automated screening on the first try." },
    { icon: <Brain size={20} />, title: "AI mock interviews", desc: "Simulate real-world interviews with adaptive AI and get instant feedback on every answer." },
    { icon: <Users size={20} />, title: "Career coaching", desc: "Book 1-on-1 sessions with working professionals who know what recruiters actually want." },
  ];

  const steps = [
    { title: "Browse professionals", desc: "Explore mentors by industry, specialty, and rating. Find the right fit for your target role." },
    { title: "Book a session", desc: "Pick a time that works. Confirm your booking and pay securely in minutes." },
    { title: "Practice & improve", desc: "Attend your session, get actionable feedback, and track your growth over time." },
  ];

  const mentors = [
    { name: "Lerato M.", role: "Software Engineer · 5★", rating: 5 },
    { name: "Thabo N.", role: "Data Analyst · 5★", rating: 5 },
    { name: "Aisha P.", role: "Marketing Specialist · 4★", rating: 4 },
  ];

  const reviews = [
    { name: "Thando", role: "Engineering intern", review: "I got my first internship after 2 mock interviews. The feedback was brutally honest — exactly what I needed.", rating: 5 },
    { name: "Aisha", role: "Data analyst", review: "The CV review made a massive difference. I went from no callbacks to 3 in one week.", rating: 5 },
    { name: "Michael", role: "Finance grad", review: "Super helpful mentors. Clear, practical, and direct. Highly recommend to anyone job hunting.", rating: 5 },
  ];

  return (
    <>
      <style>{sharedStyles}</style>
      <Box sx={{ background: OFF, fontFamily: "'DM Sans', sans-serif" }}>

        {/* HERO */}
        <Box sx={{ background: `linear-gradient(160deg, ${P_LIGHT} 0%, #fff 55%)`, pt: { xs: 8, md: 14 }, pb: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, textAlign: "center" }}>
          <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>For students</Typography>
          <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "2.2rem", md: "3.5rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.1, mb: 2 }}>
            Get job-ready faster.
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, maxWidth: 540, mx: "auto", lineHeight: 1.7, mb: 4, fontWeight: 300 }}>
            Connect with professionals, practice real interviews, and improve your chances of landing your dream job.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <PrimaryBtn to="/mentee">Start for free</PrimaryBtn>
            <GhostBtn to="/professionals">Browse mentors</GhostBtn>
          </Stack>
        </Box>

        {/* FEATURES */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <SectionLabel>What you get</SectionLabel>
              <SectionHeading center>Everything in one place.</SectionHeading>
            </Stack>
            <Grid container spacing={3}>
              {features.map((f, i) => <Grid item xs={12} md={4} key={i}><FeatureCard {...f} /></Grid>)}
            </Grid>
          </Box>
        </Box>

        {/* HOW IT WORKS */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: P_LIGHT }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <SectionLabel>Process</SectionLabel>
              <SectionHeading center>How it works.</SectionHeading>
            </Stack>
            <Grid container spacing={3}>
              {steps.map((step, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", background: "#fff" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ width: 28, height: 28, borderRadius: "50%", background: P, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: " sans-serif", mb: 2 }}>{i + 1}</Box>
                      <Typography sx={{ fontFamily: " sans-serif", fontWeight: 700, fontSize: "1.05rem", color: INK, mb: 1 }}>{step.title}</Typography>
                      <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7 }}>{step.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* MENTORS */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <SectionLabel>Top mentors</SectionLabel>
              <SectionHeading center>Who you'll learn from.</SectionHeading>
            </Stack>
            <Grid container spacing={3} mb={4}>
              {mentors.map((m, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ width: 48, height: 48, borderRadius: "50%", background: P_LIGHT, color: P, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: " sans-serif", fontWeight: 700, fontSize: 16 }}>{m.name[0]}</Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: 15, color: INK }}>{m.name}</Typography>
                          <Typography sx={{ fontSize: 12.5, color: INK2 }}>{m.role}</Typography>
                          <Rating value={m.rating} readOnly size="small" sx={{ "& .MuiRating-iconFilled": { color: P } }} />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack alignItems="center">
              <GhostBtn to="/professionals">Browse all professionals</GhostBtn>
            </Stack>
          </Box>
        </Box>

        {/* PRICING */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: P_LIGHT }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading center>Pay only for what you need.</SectionHeading>
            </Stack>
            <Grid container spacing={3}>
              {[
                { title: "AI CV review", price: "Free", note: "unlimited" },
                { title: "AI Mock interview", price: "R50", note: "per session" },
                { title: "Career coaching", price: "R100 - R400", note: "per session" },
              ].map((plan, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", background: "#fff" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1 }}>{plan.title}</Typography>
                      <Stack direction="row" alignItems="baseline" spacing={0.75} mb={0.5}>
                        <Typography sx={{ fontFamily: " sans-serif", fontSize: "2.2rem", fontWeight: 800, color: INK }}>{plan.price}</Typography>
                        <Typography sx={{ fontSize: 13, color: INK2 }}>{plan.note}</Typography>
                      </Stack>
                      <Box mt={2}><PrimaryBtn to="/login">Book now</PrimaryBtn></Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* REVIEWS */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <SectionLabel>Success stories</SectionLabel>
              <SectionHeading center>Real students, real results.</SectionHeading>
            </Stack>
            <Grid container spacing={3}>
              {reviews.map((r, i) => <Grid item xs={12} md={4} key={i}><ReviewCard {...r} /></Grid>)}
            </Grid>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 3, md: 8 }, background: "#0D0D12", textAlign: "center" }}>
          <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, color: "#fff", mb: 1.5, letterSpacing: "-0.02em" }}>
            Start your journey today.
          </Typography>
          <Typography sx={{ fontSize: 16, color: "rgba(255,255,255,0.45)", mb: 4, lineHeight: 1.7 }}>
            Take the next step toward your career with expert guidance.
          </Typography>
          <PrimaryBtn to="/mentee">Get started — it's free</PrimaryBtn>
        </Box>

      </Box>
    </>
  );
};

export default StudentPortal;