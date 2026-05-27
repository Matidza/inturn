import React from "react";
import { Box, Typography, Grid, Card, CardContent, Stack, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Briefcase, DollarSign, Clock, Users, ArrowRight, TrendingUp } from "lucide-react";

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
      fontSize: 14, fontWeight: 500, fontFamily: " sans-serif",
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


import PsychologyIcon from "@mui/icons-material/Psychology";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

// const features = [
//   {
//     title: "AI Mock Interviews",
//     desc: "Practice real interview scenarios with adaptive AI and get instant, actionable feedback.",
//     icon: <PsychologyIcon />,
//   },
//   {
//     title: "CV & ATS Optimization",
//     desc: "Improve your CV with smart ATS analysis and increase your chances of getting shortlisted.",
//     icon: <DescriptionIcon />,
//   },
//   {
//     title: "Professional Coaching",
//     desc: "Get coached by real industry professionals who prepare you for real expectations.",
//     icon: <GroupsIcon />,
//   },
//   {
//     title: "Student Growth Hub",
//     desc: "Track progress, identify weaknesses, and build real confidence over time.",
//     icon: <TrendingUpIcon />,
//   },
//   {
//     title: "Professional Portal",
//     desc: "Offer mentorship, mock interviews, and monetize your expertise.",
//     icon: <WorkOutlineIcon />,
//   },
//   {
//     title: "Company Portal",
//     desc: "Connect with job-ready candidates and streamline your hiring pipeline.",
//     icon: <BusinessCenterIcon />,
//   },
// ];
const featureData = [
  { title: "AI mock interviews", desc: "Practice real interview scenarios with adaptive AI and get instant, actionable feedback on every answer.", icon: <PsychologyIcon /> },
  { title: "CV & ATS optimization", desc: "Improve your CV with smart ATS analysis and increase your chances of getting shortlisted first time.", icon: <DescriptionIcon /> },
  { title: "Professional coaching", desc: "Get coached by real industry professionals who prepare you for real expectations — not textbook theory.", icon: <GroupsIcon /> },
  { title: "Student growth hub", desc: "Track progress, identify weaknesses, and build real confidence over time with data-backed insights.", icon: <TrendingUpIcon /> },
  { title: "Professional portal", desc: "Offer mentorship and mock interviews. Monetize your expertise and build your personal brand.", icon: <WorkOutlineIcon /> },
  { title: "Company portal", desc: "Connect with interview-ready candidates and streamline your entire hiring pipeline.", icon: <BusinessCenterIcon /> },
];

// const Features = () => {
//   return (
//     <Box
//       sx={{
//         px: { xs: 2, md: 8 },
//         py: 10,
//         // background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
//         background: "#FFFFFF"
//       }}
//     >
//       {/* HEADER */}
//       <Box mb={8} maxWidth={700}>
//         <Typography
//           variant="h3"
//           fontWeight={800}
//           mb={2}
//           sx={{
//             fontSize: { xs: "2rem", md: "3rem" },
//             background: "linear-gradient(90deg, #6366f1, #d946ef)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Everything you need to land the job
//         </Typography>

//         <Typography
//           sx={{
//             fontSize: "1.1rem",
//             color: "text.secondary",
//           }}
//         >
//           InTurn brings students, professionals, and companies into one powerful
//           ecosystem designed to turn preparation into real opportunities.
//         </Typography>
//       </Box>

//       {/* FEATURES GRID */}
//       <Grid container spacing={4}>
//         {features.map((feature, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card
//               sx={{
//                 height: "100%",
//                 borderRadius: 4,
//                 p: 2,
//                 background: "#ffffff",
//                 border: "1px solid #eef0f3",
//                 transition: "all 0.3s ease",
//                 position: "relative",
//                 overflow: "hidden",
//                 "&:hover": {
//                   transform: "translateY(-6px)",
//                   boxShadow:
//                     "0 20px 40px rgba(99, 102, 241, 0.15)",
//                 },
//               }}
//             >
//               <CardContent>
//                 <Stack spacing={2}>
//                   {/* ICON */}
//                   <Box
//                     sx={{
//                       width: 50,
//                       height: 50,
//                       borderRadius: 3,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       background:
//                         "linear-gradient(135deg, #6366f1, #d946ef)",
//                       color: "#fff",
//                     }}
//                   >
//                     {feature.icon}
//                   </Box>

//                   {/* TITLE */}
//                   <Typography
//                     variant="h6"
//                     fontWeight={700}
//                     sx={{ color: "#05050B" }}
//                   >
//                     {feature.title}
//                   </Typography>

//                   {/* DESCRIPTION */}
//                   <Typography
//                     sx={{
//                       color: "text.secondary",
//                       lineHeight: 1.6,
//                     }}
//                   >
//                     {feature.desc}
//                   </Typography>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };
export const Features = () => {
  return (
    <>
      <style>{styles}</style>
      <Box sx={{ background:`linear-gradient(160deg,${P_LIGHT} 0%,#fff 55%)`, fontFamily: " sans-serif", py: { xs: 8, md: 14 }, px: { xs: 3, md: 8 } }}>
        <Box maxWidth="lg" mx="auto">
          {/* HEADER */}
          <Box mb={10} maxWidth={640}>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>Platform features</Typography>
            <Typography
              sx={{
                fontFamily: " sans-serif",
                fontSize: { xs: "2rem", md: "3.2rem" },
                fontWeight: 800,
                color: INK,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              Everything you need to land the job.
            </Typography>
            <Typography sx={{ fontSize: 17, color: INK2, lineHeight: 1.7, fontWeight: 300 }}>
              inTurn brings students, professionals, and companies into one powerful ecosystem designed to turn preparation into real opportunities.
            </Typography>
          </Box>

          {/* GRID */}
          <Grid container spacing={3}>
            {featureData.map((feature, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  className="card-lift"
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: `1.5px solid ${BORDER}`,
                    boxShadow: "none",
                    background: "#fff",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 48, height: 48, borderRadius: 2,
                        background: P_LIGHT,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: P, mb: 2, fontSize: 22,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography sx={{ fontFamily: " sans-serif", fontWeight: 700, fontSize: "1.05rem", color: INK, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7 }}>
                      {feature.desc}
                    </Typography>
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

export default Features;