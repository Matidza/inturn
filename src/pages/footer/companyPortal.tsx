import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Building2, Search, BarChart2, CheckCircle, Briefcase, ArrowRight } from "lucide-react";


// const CompanyPortal: React.FC = () => {
//   return (
//     <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
//       {/* HERO */}
//       <Box textAlign="center" mb={6}>
//         <Typography variant="h3" fontWeight={800} gutterBottom>
//           Hire Smarter. Grow Faster.
//         </Typography>
//         <Typography variant="h6" color="text.secondary" maxWidth={700} mx="auto">
//           Access top student and professional talent. Post jobs, manage applicants,
//           and scale your hiring — all in one platform.
//         </Typography>

//         <Button
//           variant="contained"
//           size="large"
//           sx={{ 
//             mt: 3, 
//             px: 4, 
//             borderRadius: "20px", 
//             backgroundColor: "#7f42e7ff",
//             "&:hover": {
//               opacity: 0.9,
//               background: "#7f42e7",
//             }, 
//           }}
//         >
//           Get Started
//         </Button>
//       </Box>
    
//     { /* FEATURES */ }
//     <Grid container spacing={3} mb={8}>
//         {[
//           {
//             title: "Post Jobs Easily",
//             desc: "Create and publish job listings in minutes and reach qualified candidates instantly.",
//           },
//           {
//             title: "Access Verified Talent",
//             desc: "Connect with students and professionals ready to work and grow.",
//           },
//           {
//             title: "Manage Applications",
//             desc: "Track applicants, shortlist candidates, and manage hiring workflows efficiently.",
//           },
//         ].map((feature, index) => (
//           <Grid item xs={12} md={4} key={index}>
//             <Card sx={{ borderRadius: 3, height: "100%" }}>
//               <CardContent>
//                 <Typography variant="h6" fontWeight={700} gutterBottom>
//                   {feature.title}
//                 </Typography>
//                 <Typography color="text.secondary">
//                   {feature.desc}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
    
//     { /* PRICING */ }
//     <Box textAlign="center" mb={4}>
//         <Typography variant="h4" fontWeight={700} gutterBottom>
//           Simple Pricing
//         </Typography>
//         <Typography color="text.secondary">
//           Choose what works best for your company
//         </Typography>
//       </Box>
    
//     <
//     Grid container spacing = { 3 } > { /* PAY PER POST */ }
//     <Grid item xs={12} md={6}>
//           <Card sx={{ borderRadius: 3 }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight={700}>
//                 Pay Per Job Post
//               </Typography>
//               <Typography variant="h4" fontWeight={800} my={2}>
//                 R99 / post
//               </Typography>

//               <Stack spacing={1} mb={3}>
//                 <Typography>✔ 1 Job Listing</Typography>
//                 <Typography>✔ 30 Days Visibility</Typography>
//                 <Typography>✔ Basic Applicant Tracking</Typography>
//               </Stack>

//               <Button fullWidth variant="outlined" 
//                 sx={{ 
//                   borderRadius: 5,
//                   textTransform: "none",
//                   borderColor: "#7f42e7",
//                   color: "#7f42e7",
//                   fontWeight: 600,
//                   "&:hover": {
//                     background: "#7f42e7",
//                     color: "#fff",
//                   },
//                 }}
//               >
//                 Choose Plan
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
    
//     { /* SUBSCRIPTION */ }
//     <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               border: "2px solid",
//               borderColor: "#7f42e7ff",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" fontWeight={700}>
//                 Unlimited Plan
//               </Typography>
//               <Typography variant="h4" fontWeight={800} my={2}>
//                 R499 / month
//               </Typography>

//               <Stack spacing={1} mb={3}>
//                 <Typography>✔ Unlimited Job Posts</Typography>
//                 <Typography>✔ Priority Listings</Typography>
//                 <Typography>✔ Advanced Analytics</Typography>
//                 <Typography>✔ Candidate Shortlisting</Typography>
//               </Stack>

//               <Button fullWidth variant="contained" 
//                 sx={{
//                   backgroundColor: "#7f42e7ff", 
//                   borderRadius: "20px",
//                   "&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   },
//                 }}
//               >
//                 Go Unlimited
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid> 
//       </Grid>
    
//     { /* CTA */ }
//     <Box textAlign="center" mt={8}>
//         <Typography variant="h5" fontWeight={700} gutterBottom>
//           Start Hiring Today
//         </Typography>
//         <Typography color="text.secondary" mb={3}>
//           Join companies already finding top talent on our platform.
//         </Typography>

//         <Button variant="contained" component={Link} to="/login" size="large" sx={{ px: 5, backgroundColor: "#7f42e7ff", borderRadius: "20px","&:hover": {
//                     opacity: 0.9,
//                     background: "#7f42e7",
//                   }, }}>
//           Create Company Account
//         </Button>
//       </Box> 
//     </Box>
//   );
// };

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


export const CompanyPortal: React.FC = () => {
  const features = [
    { icon: <Briefcase size={20} />, title: "Post jobs easily", desc: "Create and publish job listings in minutes and reach qualified candidates instantly." },
    { icon: <Search size={20} />, title: "Access verified talent", desc: "Connect with students and professionals who've been trained and interview-ready." },
    { icon: <BarChart2 size={20} />, title: "Manage applications", desc: "Track applicants, shortlist candidates, and manage your hiring pipeline efficiently." },
  ];

  return (
    <>
      <style>{styles}</style>
      <Box sx={{ background: OFF, fontFamily: "'DM Sans', sans-serif" }}>

        {/* HERO */}
        <Box sx={{ background: `linear-gradient(160deg, ${P_LIGHT} 0%, #fff 55%)`, pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, textAlign: "center" }}>
          <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>For companies</Typography>
          <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "2.2rem", md: "3.5rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1.05, mb: 2 }}>
            Hire smarter.<br />Grow faster.
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, maxWidth: 520, mx: "auto", lineHeight: 1.7, mb: 4, fontWeight: 300 }}>
            Access top student and professional talent. Post jobs, manage applicants, and scale your hiring — all in one platform.
          </Typography>
          <PBtn to="/company" dark>Get started</PBtn>
        </Box>

        {/* FEATURES */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: "#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>Platform features</Typography>
              <Typography sx={{ fontFamily: "sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", textAlign: "center" }}>
                Built for serious hiring.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              {features.map((f, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card className="card-lift" sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", height: "100%" }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: 2, background: P_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", color: P, mb: 2 }}>{f.icon}</Box>
                      <Typography sx={{ amily: " sans-serif", fontWeight: 700, fontSize: "1.05rem", color: INK, mb: 1 }}>{f.title}</Typography>
                      <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7 }}>{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* PRICING */}
        <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 3, md: 8 }, background: P_LIGHT }}>
          <Box maxWidth="lg" mx="auto">
            <Stack alignItems="center" mb={6}>
              <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: P, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1 }}>Pricing</Typography>
              <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, fontWeight: 800, color: INK, letterSpacing: "-0.02em", textAlign: "center" }}>
                Simple, transparent pricing.
              </Typography>
            </Stack>
            <Grid container spacing={3} maxWidth={800} mx="auto">
              {/* PAY PER POST */}
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, border: `1.5px solid ${BORDER}`, boxShadow: "none", background: "#fff", height: "100%" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: INK2, textTransform: "uppercase", letterSpacing: "0.08em", mb: 1 }}>Pay per post</Typography>
                    <Stack direction="row" alignItems="baseline" spacing={0.5} mb={3}>
                      <Typography sx={{ fontFamily: " sans-serif", fontSize: "2.5rem", fontWeight: 800, color: INK }}>R99</Typography>
                      <Typography sx={{ fontSize: 14, color: INK2 }}>/ post</Typography>
                    </Stack>
                    {["1 job listing", "30 days visibility", "Basic applicant tracking"].map((f) => (
                      <Stack direction="row" spacing={1} alignItems="center" mb={1} key={f}>
                        <CheckCircle size={14} color="#00916E" />
                        <Typography sx={{ fontSize: 14, color: INK2 }}>{f}</Typography>
                      </Stack>
                    ))}
                    <Box mt={3}><PBtn to="/login">Choose plan</PBtn></Box>
                  </CardContent>
                </Card>
              </Grid>
              {/* UNLIMITED */}
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, border: `2px solid ${P}`, boxShadow: "none", background: INK, height: "100%", position: "relative", overflow: "hidden" }}>
                  <Box sx={{ position: "absolute", top: 0, right: 0, background: P, px: 2, py: 0.5, borderBottomLeftRadius: 8 }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>Most popular</Typography>
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", mb: 1 }}>Unlimited plan</Typography>
                    <Stack direction="row" alignItems="baseline" spacing={0.5} mb={3}>
                      <Typography sx={{ fontFamily: " sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#fff" }}>R499</Typography>
                      <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>/ month</Typography>
                    </Stack>
                    {["Unlimited job posts", "Priority listings", "Advanced analytics", "Candidate shortlisting"].map((f) => (
                      <Stack direction="row" spacing={1} alignItems="center" mb={1} key={f}>
                        <CheckCircle size={14} color="#B893F6" />
                        <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{f}</Typography>
                      </Stack>
                    ))}
                    <Box mt={3}><PBtn to="/login" dark>Go unlimited</PBtn></Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 3, md: 8 }, background: INK, textAlign: "center" }}>
          <Typography sx={{ fontFamily: " sans-serif", fontSize: { xs: "1.8rem", md: "2.6rem" }, fontWeight: 800, color: "#fff", mb: 1.5, letterSpacing: "-0.02em" }}>
            Start hiring today.
          </Typography>
          <Typography sx={{ fontSize: 16, color: "rgba(255,255,255,0.45)", mb: 4, lineHeight: 1.7 }}>
            Join companies already finding top talent on our platform.
          </Typography>
          <PBtn to="/signup" dark>Create company account</PBtn>
        </Box>

      </Box>
    </>
  );
};



export default CompanyPortal;