import React from "react";
import { Box, Typography, Grid, Card, CardContent, Stack, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Briefcase, DollarSign, Clock, Users, ArrowRight, TrendingUp, CheckCircle } from "lucide-react";

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

const pricingTiers = [
  {
    title: "Starter",
    price: "R 49 / interview",
    features: [
      "Basic AI mock interview (limited sessions)",
      "Unlimited CV scan with basic feedback",
      "Access to public job listings",
      "Priority access to professionals",
    ],
  },
  {
    title: "Pro",
    price: "R149 / month",
    features: [
      "Unlimited AI interview simulations",
      "Advanced CV + ATS optimization insights",
      "Personalized improvement roadmap",
      "Priority access to professionals",
    ],
  },
  {
    title: "Pay-Per-Session",
    price: "R100 – R400",
    features: [
      "Live mock interviews with real professionals",
      "Industry-specific feedback",
      "Performance scoring + improvement plan",
      "Pricing varies per professional",
    ],
  },
];

// const Pricing = () => {
//   return (
//     <Box sx={{ px: { xs: 2, md: 6 }, py: 6, background: "#FFFFFF" }}>
//       <Typography variant="h4" fontWeight={700} mb={2} color="#05050B">
//         Pricing that grows with you
//       </Typography>

//       <Typography mb={6} maxWidth={600}  color="#05050B">
//         Start free, improve with AI, and level up with real professionals when you're ready.
//       </Typography>

//       <Grid container spacing={4}>
//         {pricingTiers.map((tier, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Card sx={{ borderRadius: 4, height: "100%", border: "1px solid #c8c8c8ff", background: "#FFFFFF",  }}>
//               <CardContent>
//                 <Typography variant="h6" fontWeight={600} mb={1} color="#b893f6ff">
//                   {tier.title}
//                 </Typography>

//                 <Typography variant="h4" fontWeight={700} mb={2} color="#05050B">
//                   {tier.price}
//                 </Typography>

//                 {tier.features.map((feature, i) => (
//                   <Typography key={i} sx={{ mb: 1 }} color="#4a4a4aff">
//                     • {feature}
//                   </Typography>
//                 ))}
//                 <Box>
//                   <Button variant="contained"   sx={{ 
//                     mt: 5,
//                     mb: 5,
//                     color: "#FFFFFF",
//                     borderRadius: 5,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     background: "#7f42e7ff",
//                     "&:hover": {
//                       background: "#b187faff", color: "#FFFFFF"
//                     },
                    
//                     px: { xs: 2, md: 10 },
//                     maxWidth: 600
//                   }}
//                 >
//                 Get Started
//               </Button>          
//                 </Box>
                     
//               </CardContent>
              
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

export const Pricing = () => {
  const tiers = [
    {
      label: "AI Starter",
      price: "R49",
      per: "/ interview",
      features: [
        "Free unlimited CV scan with basic feedback",
        "Basic AI mock interview (limited sessions)",
        "Access to public job listings",
        "Community support",
      ],
      highlighted: false,
    },
    {
      label: "Pro",
      price: "R149",
      per: "/ month",
      features: [
        "Unlimited AI interview simulations",
        "Advanced CV + ATS optimization insights",
        "Personalized improvement roadmap",
        "Priority access to professionals",
      ],
      highlighted: true,
    },
    {
      label: "Pay-per-session",
      price: "R100–R400",
      per: "per session",
      features: [
        "Live mock interviews with real professionals",
        "Industry-specific, personal feedback",
        "Performance scoring + improvement plan",
        "Pricing varies by professional",
      ],
      highlighted: false,
    },
  ];

  return (
    <>
      <style>{styles}</style>
        <Box sx={{ background:`linear-gradient(160deg,${P_LIGHT} 0%,#fff 55%)`, fontFamily: "'DM Sans', sans-serif", py: { xs: 8, md: 14 }, px: { xs: 3, md: 8 } }}>
        <Box maxWidth="lg" mx="auto" sx={{ background:`linear-gradient(160deg,${P_LIGHT} 0%,#fff 55%)` }}>
          <Box mb={8}>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>Pricing</Typography>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.05, mb: 2 }}>
              Pricing that grows with you.
            </Typography>
            <Typography sx={{ fontSize: 16, color: INK2, lineHeight: 1.7, maxWidth: 500, fontWeight: 300 }}>
              Start free, sharpen with AI, and level up with real professionals when you're ready.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {tiers.map((tier, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card
                  className="card-lift"
                  sx={{
                    borderRadius: 3,
                    border: tier.highlighted ? `2px solid ${P}` : `1.5px solid ${BORDER}`,
                    boxShadow: "none",
                    background: tier.highlighted ? INK : "#fff",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {tier.highlighted && (
                    <Box sx={{ position: "absolute", top: 0, right: 0, background: P, px: 2, py: 0.5, borderBottomLeftRadius: 8 }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>Most popular</Typography>
                    </Box>
                  )}
                  <CardContent sx={{ p: 4 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: tier.highlighted ? "rgba(255,255,255,0.45)" : INK2, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1.5 }}>
                      {tier.label}
                    </Typography>
                    <Stack direction="row" alignItems="baseline" spacing={0.75} mb={1}>
                      <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 800, color: tier.highlighted ? "#fff" : INK }}>
                        {tier.price}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: tier.highlighted ? "rgba(255,255,255,0.4)" : INK2 }}>{tier.per}</Typography>
                    </Stack>
                    <Box sx={{ height: 1, background: tier.highlighted ? "rgba(255,255,255,0.1)" : BORDER, my: 3 }} />
                    <Stack spacing={1.5} mb={4}>
                      {tier.features.map((f) => (
                        <Stack direction="row" spacing={1} alignItems="flex-start" key={f}>
                          <CheckCircle size={14} color={tier.highlighted ? "#B893F6" : "#00916E"} style={{ marginTop: 2, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 14, color: tier.highlighted ? "rgba(255,255,255,0.65)" : INK2, lineHeight: 1.5 }}>{f}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <PBtn to="/login" dark={tier.highlighted}>Get started</PBtn>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};


export default Pricing;