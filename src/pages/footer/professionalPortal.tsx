import React from "react";
import { Box, Typography, Grid, Card, CardContent, Stack, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Briefcase, DollarSign, Clock, Users, ArrowRight, TrendingUp, Star } from "lucide-react";



const P = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_LIGHT = "#F0EAFD";
const INK = "#0D0D12";
const INK2 = "#4A4A5A";
const BORDER = "#E8E3F5";
const OFF = "#FAFAFA";

const styles = `
  .card-lift { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
  .card-lift:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(127,66,231,0.10); }
`;


const PBtn = ({ children, to, dark }: { children: React.ReactNode; to: string; dark?: boolean }) => (
  <Link
    to={to}
    style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "13px 28px", borderRadius: 100,
      fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
      textDecoration: "none",
      background: dark ? P : "transparent",
      color: dark ? "#fff" : P,
      border: dark ? "none" : `1.5px solid ${P}`,
      transition: "all 0.2s",
    }}
  >
    {children} <ArrowRight size={14} />
  </Link>
);
export const ProfessionalPortal: React.FC = () => {
  const sessions = [
    { icon: <Briefcase size={20} />, title: "Mock interviews", desc: "Simulate real interview scenarios and help students prepare with confidence." },
    { icon: <Users size={20} />, title: "CV reviews", desc: "Review and improve student CVs to increase their chances of getting shortlisted." },
    { icon: <TrendingUp size={20} />, title: "Career coaching", desc: "Guide students on career paths, skill priorities, and industry expectations." },
  ];

  const steps = [
    { num: "01", title: "Create your profile", desc: "Showcase your experience, set your specialties, and build credibility with reviews." },
    { num: "02", title: "Set your availability", desc: "Choose when you're free and what you charge. Full control, always." },
    { num: "03", title: "Get booked & paid", desc: "Students find you, book sessions, and pay upfront. You just show up." },
  ];

  const reviews = [
    { name: "Thabo M.", role: "Engineering student", review: "The mock interview helped me land my internship! Incredibly helpful.", rating: 5 },
    { name: "Lerato K.", role: "Marketing grad", review: "My CV improved so much after one session. I had no idea what I was missing.", rating: 5 },
    { name: "James D.", role: "Finance student", review: "Great mentor. Clear, practical guidance. Worth every rand.", rating: 5 },
  ];

  return (
    <>
      <style>{styles}</style>
      <Box sx={{ background: OFF, fontFamily: "'DM Sans', sans-serif" }}>

        {/* HERO */}
        {/* background: `linear-gradient(160deg, ${P_LIGHT} 0%, #fff 55%)`, */}
        {/* background: INK, */}
        <Box sx={{ background: `linear-gradient(160deg, ${P_LIGHT} 0%, #fff 55%)`, pt: { xs: 10, md: 16 }, pb: { xs: 10, md: 14 }, px: { xs: 3, md: 8 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${P}30 0%, transparent 70%)`, pointerEvents: "none" }} /> */}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>For professionals</Typography>
            {/* sx={{ fontFamily: "'Syne', sans-serif", fontSize: { xs: "2.2rem", md: "3.5rem" }, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, mb: 2 }} */}
            {/* sx={{ fontFamily: "'Syne', sans-serif", fontSize: { xs: "2.2rem", md: "3.5rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.05, mb: 2 }} */}
            <Typography sx={{ fontFamily: "sans-serif", fontSize: { xs: "2.2rem", md: "3.5rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.05, mb: 2 }}>
              Turn your experience<br />into income.
            </Typography>
            {/* sx={{ fontSize: { xs: 15, md: 17 }, color: "rgba(255,255,255,0.5)", maxWidth: 500, mx: "auto", lineHeight: 1.7, mb: 2, fontWeight: 300 }} */}
            {/* sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, maxWidth: 520, mx: "auto", lineHeight: 1.7, mb: 4, fontWeight: 300 }} */}
            <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, maxWidth: 520, mx: "auto", lineHeight: 1.7, mb: 4, fontWeight: 300 }}>
              Become a mentor. Help students succeed, share your knowledge, and get paid for every session you host.
            </Typography>
            <Box
              sx={{
                display: "inline-flex", alignItems: "center", gap: 1,
                background: `${P}25`, border: `1px solid ${P}50`,
                borderRadius: 100, px: 2, py: 0.75, mb: 4,
              }}
            >
              <DollarSign size={14} color="#B893F6" />
              <Typography sx={{ fontSize: 13.5, color: "#B893F6", fontWeight: 500 }}>
                Top mentors earn R5,000+ / month
              </Typography>
            </Box>
            <Box><PBtn to="/pro" dark>Become a mentor</PBtn></Box>
          </Box>
        </Box>

        {/* STATS */}
        <Box sx={{ background: P, py: { xs: 4, md: 5 }, px: { xs: 3, md: 8 } }}>
          <Box maxWidth="lg" mx="auto">
            <Grid container spacing={2}>
              {[
                { value: "850+", label: "Active mentors" },
                { value: "12K+", label: "Sessions completed" },
                { value: "4.9★", label: "Average mentor rating" },
                { value: "R5K+", label: "Top monthly earnings" },
              ].map((s) => (
                <Grid item xs={6} md={3} key={s.label}>
                  <Stack alignItems="center" spacing={0.25}>
                    <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.2rem" }, fontWeight: 800, color: "#fff" }}>{s.value}</Typography>
                    <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>{s.label}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* SESSIONS */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems={{ xs: "center", md: "flex-start" }} mb={6}>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>What you offer</Typography>
              <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.1, textAlign: { xs: "center", md: "left" } }}>
                High-demand session types.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              {sessions.map((s, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", height: "100%" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: 2, background: P_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: P, mb: 2 }}>{s.icon}</Box>
                      <Typography sx={{ fontFamily: " sans-serif", fontWeight: 700, fontSize: "1.05rem", color: INK, mb: 1 }}>{s.title}</Typography>
                      <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7 }}>{s.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* HOW IT WORKS */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: P_LIGHT }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>How it works</Typography>
              <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.1, textAlign: "center" }}>
                Start earning in three steps.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              {steps.map((step, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", background: "#fff", position: "relative", overflow: "hidden" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography sx={{ fontFamily: " sans-serif", fontSize: "4rem", fontWeight: 800, color: `${P}10`, position: "absolute", top: -10, right: 16, lineHeight: 1 }}>{step.num}</Typography>
                      <Typography sx={{ fontFamily: " sans-serif", fontWeight: 700, fontSize: "1.05rem", color: INK, mb: 1 }}>{step.title}</Typography>
                      <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7 }}>{step.desc}</Typography>
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
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>Student feedback</Typography>
              <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", textAlign: "center" }}>What students say.</Typography>
            </Stack>
            <Grid container spacing={3}>
              {reviews.map((r, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" spacing={0.3} mb={2}>{Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={13} fill={P} color={P} />)}</Stack>
                      <Typography sx={{ fontSize: 14.5, color: INK, lineHeight: 1.7, mb: 2.5, fontStyle: "italic" }}>"{r.review}"</Typography>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ width: 36, height: 36, borderRadius: "50%", background: P_LIGHT, color: P, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>{r.name[0]}</Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: 13.5, color: INK }}>{r.name}</Typography>
                          <Typography sx={{ fontSize: 12, color: INK2 }}>{r.role}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 3, md: 8 }, background: INK, textAlign: "center" }}>
          <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, color: "#fff", mb: 1.5, letterSpacing: "-0.02em" }}>
            Start mentoring today.
          </Typography>
          <Typography sx={{ fontSize: 16, color: "rgba(255,255,255,0.45)", mb: 4, lineHeight: 1.7 }}>
            Join professionals already earning by helping students succeed.
          </Typography>
          <PBtn to="/signup" dark>Create professional account</PBtn>
        </Box>

      </Box>
    </>
  );
};

export default ProfessionalPortal;








