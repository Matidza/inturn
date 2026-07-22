// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// import StarIcon from "@mui/icons-material/Star";
// import StarHalfIcon from "@mui/icons-material/StarHalf";
// import StarOutlineIcon from "@mui/icons-material/StarOutline";
// import WorkIcon from "@mui/icons-material/Work";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// import {
//   Box,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Chip,
//   Stack,
//   Button,
//   Skeleton,
//   Alert,
//   Divider,
//   Paper,
//   Tooltip,
//   IconButton,
//   Snackbar,
// } from "@mui/material";

// import { ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";

// // ─── Constants ───────────────────────────────────────────────────────────────

// const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5005";
// const PROFESSIONAL_ENDPOINT = `${API_BASE}/api/v1/mentee/professional-details`;

// const PRIMARY = "#7B61FF";
// const SUCCESS_GREEN = "#22c55e";

// // ─── Default focus areas (fallback when API returns none) ────────────────────

// const DEFAULT_FOCUS_AREAS: { title: string }[] = [
//   { title: "1-on-1 Mock Interview Practice" },
//   { title: "Personalized Feedback & Tips" },
//   { title: "CV / Resume Review" },
//   { title: "Interview Preparation & Guidance" },
// ];

// // ─── Types ───────────────────────────────────────────────────────────────────

// interface Experience {
//   role: string;
//   company: string;
//   duration: string;
// }

// interface Testimonial {
//   user: string;
//   comment: string;
//   rating?: number;
// }

// interface Professional {
//   _id: string;
//   name: string;
//   surname: string;
//   avatar?: string;
//   currentJobTitle?: string;
//   companyName?: string;
//   rating?: number;
//   reviews?: number;
//   aboutUser?: string;
//   skills?: string[];
//   interviewFocusArea?: string[];
//   experience?: Experience[];
//   testimonials?: Testimonial[];
//   availability?: string[];
//   price?: number;
//   instantBooking?: boolean;
// }

// // ─── Star Rating Display ─────────────────────────────────────────────────────

// function StarRating({ value }: { value: number }) {
//   const stars = Array.from({ length: 5 }, (_, i) => {
//     if (value >= i + 1) return "full";
//     if (value >= i + 0.5) return "half";
//     return "empty";
//   });

//   return (
//     <Stack direction="row" spacing={0.25} alignItems="center">
//       {stars.map((type, i) =>
//         type === "full" ? (
//           <StarIcon key={i} sx={{ fontSize: 20, color: "#f59e0b" }} />
//         ) : type === "half" ? (
//           <StarHalfIcon key={i} sx={{ fontSize: 20, color: "#f59e0b" }} />
//         ) : (
//           <StarOutlineIcon key={i} sx={{ fontSize: 20, color: "#f59e0b" }} />
//         )
//       )}
//     </Stack>
//   );
// }

// // ─── Loading Skeleton ────────────────────────────────────────────────────────

// function LoadingSkeleton() {
//   return (
//     <Container maxWidth="lg" sx={{ py: 6 }}>
//       <Skeleton width={100} height={40} sx={{ mb: 3 }} />
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={8}>
//           <Skeleton variant="rounded" height={200} sx={{ mb: 3, borderRadius: 4 }} />
//           <Skeleton variant="rounded" height={120} sx={{ mb: 3, borderRadius: 3 }} />
//           <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Skeleton variant="rounded" height={300} sx={{ borderRadius: 4 }} />
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }

// // ─── Main Component ──────────────────────────────────────────────────────────

// const ProfessionalCardDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [professional, setProfessional] = useState<Professional | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saved, setSaved] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // ── Fetch ──────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     if (!id) {
//       setError("Invalid professional ID.");
//       setLoading(false);
//       return;
//     }

//     let cancelled = false;

//     const fetchProfessional = async () => {
//       try {
//         const res = await axios.get<{ result: Professional }>(
//           PROFESSIONAL_ENDPOINT,
//           { params: { _id: id } }
//         );

//         if (!cancelled) {
//           setProfessional(res.data.result ?? null);
//           if (!res.data.result) setError("Professional not found.");
//         }
//       } catch (err) {
//         if (!cancelled) {
//           if (axios.isAxiosError(err) && err.response?.status === 404) {
//             setError("This professional could not be found.");
//           } else {
//             setError("Something went wrong. Please try again.");
//           }
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     fetchProfessional();
//     return () => { cancelled = true; };
//   }, [id]);

//   // ── Derived state ──────────────────────────────────────────────────────────

//   const focusAreas = useMemo(() => {
//     return professional?.interviewFocusArea?.length
//       ? professional.interviewFocusArea.map((f) => ({ title: f }))
//       : DEFAULT_FOCUS_AREAS;
//   }, [professional]);

//   const displayRating = useMemo(
//     () => Number((professional?.rating ?? 4.5).toFixed(1)),
//     [professional]
//   );

//   // ── Handlers ───────────────────────────────────────────────────────────────

//   const handleBack = useCallback(() => navigate("/mentee/professionals"), [navigate]);

//   const handleBook = useCallback(() => {
//     if (professional?._id) navigate(`/mentee/book-session/${professional._id}`);
//   }, [navigate, professional]);

//   const handleShare = useCallback(async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({ title: `Book ${professional?.name}`, url: window.location.href });
//       } else {
//         await navigator.clipboard.writeText(window.location.href);
//         setSnackbarOpen(true);
//       }
//     } catch {
//       // User cancelled share — no-op
//     }
//   }, [professional]);

//   const handleSave = useCallback(() => setSaved((prev) => !prev), []);

//   // ── Render guards ──────────────────────────────────────────────────────────

//   if (loading) return <LoadingSkeleton />;

//   if (error || !professional) {
//     return (
//       <Container maxWidth="sm" sx={{ py: 8 }}>
//         <Alert
//           severity="error"
//           action={
//             <Button color="inherit" size="small" onClick={handleBack}>
//               Go back
//             </Button>
//           }
//         >
//           {error ?? "Professional not found."}
//         </Alert>
//       </Container>
//     );
//   }

//   const pro = professional;
//   const initials = `${pro.name?.[0] ?? ""}${pro.surname?.[0] ?? ""}`.toUpperCase();
//   // const initials = `${pro.name[0] ?? ""}${pro.surname[0] ?? ""}`.toUpperCase();

//   // ── JSX ────────────────────────────────────────────────────────────────────

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFFFF", py: 4 }}>
//       {/* backgroundColor: "#f8f9fb", */}
//       <Container maxWidth="lg">

//         {/* ── Navigation row ─────────────────────────────────── */}
//         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//           <Button
//             startIcon={<ArrowLeft size={18} />}
//             onClick={handleBack}
//             sx={{ color: "text.secondary" }}
//           >
//             Back to Professionals
//           </Button>

//           <Stack direction="row" spacing={1}>
//             <Tooltip title={saved ? "Remove bookmark" : "Bookmark"}>
//               <IconButton onClick={handleSave} aria-label="Save professional">
//                 <Bookmark
//                   size={20}
//                   fill={saved ? PRIMARY : "none"}
//                   stroke={saved ? PRIMARY : "currentColor"}
//                 />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Share profile">
//               <IconButton onClick={handleShare} aria-label="Share profile">
//                 <Share2 size={20} />
//               </IconButton>
//             </Tooltip>
//           </Stack>
//         </Stack>

//         <Grid container spacing={4}>

//           {/* ═══════════════════════════ LEFT ═══════════════════════════ */}
//           <Grid item xs={12} md={8}>

//             {/* ── Hero card ───────────────────────────────────── */}
//             <Card elevation={0} sx={{ borderRadius: 4, mb: 3, border: "1px solid #e5e7eb" }}>
//               <CardContent sx={{ p: 3 }}>
//                 <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>

//                   <Box sx={{ position: "relative", flexShrink: 0 }}>
//                     <Avatar
//                       src={pro.avatar}
//                       alt={`${pro.name} ${pro.surname}`}
//                       sx={{
//                         width: 100,
//                         height: 100,
//                         fontSize: 28,
//                         fontWeight: 700,
//                         backgroundColor: PRIMARY,
//                         color: "#fff",
//                         border: `3px solid ${PRIMARY}22`,
//                       }}
//                     >
//                       {!pro.avatar && initials}
//                     </Avatar>
//                   </Box>

//                   <Box flex={1} minWidth={0}>
//                     {/* Badges */}
//                     <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
//                       {(pro.rating ?? 0) >= 4.5 && (
//                         <Chip
//                           icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
//                           label="Top Rated"
//                           size="small"
//                           sx={{ backgroundColor: "#dcfce7", color: "#166534", fontWeight: 600 }}
//                         />
//                       )}
//                       {(pro.reviews ?? 0) > 100 && (
//                         <Chip
//                           label="Most Booked"
//                           size="small"
//                           sx={{ backgroundColor: "#ede9fe", color: "#5b21b6", fontWeight: 600 }}
//                         />
//                       )}
//                     </Stack>

//                     <Typography variant="h5" fontWeight={700} noWrap>
//                       {pro.name} {pro.surname}
//                     </Typography>

//                     {(pro.currentJobTitle || pro.companyName) && (
//                       <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
//                         <WorkIcon sx={{ fontSize: 16, color: "text.secondary" }} />
//                         <Typography variant="body2" color="text.secondary">
//                           {[pro.currentJobTitle, pro.companyName].filter(Boolean).join(" @ ")}
//                         </Typography>
//                       </Stack>
//                     )}

//                     <Stack direction="row" spacing={1} mt={1} alignItems="center">
//                       <StarRating value={displayRating} />
//                       <Typography variant="body2" fontWeight={600}>
//                         {displayRating}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         ({(pro.reviews ?? 0).toLocaleString()} reviews)
//                       </Typography>
//                     </Stack>

//                     {pro.aboutUser && (
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         mt={2}
//                         sx={{
//                           display: "-webkit-box",
//                           WebkitLineClamp: 4,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {pro.aboutUser}
//                       </Typography>
//                     )}
//                   </Box>
//                 </Stack>
//               </CardContent>
//             </Card>

//             {/* ── Skills ──────────────────────────────────────── */}
//             {pro.skills && pro.skills.length > 0 && (
//               <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #e5e7eb" }}>
//                 <Typography fontWeight={700} mb={2}>Skills & Expertise</Typography>
//                 <Stack direction="row" flexWrap="wrap" gap={1}>
//                   {pro.skills.map((skill, i) => (
//                     <Chip
//                       key={i}
//                       label={skill}
//                       size="small"
//                       sx={{ backgroundColor: "#f3f4f6", fontWeight: 500 }}
//                     />
//                   ))}
//                 </Stack>
//               </Paper>
//             )}

//             {/* ── What You'll Get ──────────────────────────────── */}
//             <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #e5e7eb" }}>
//               <Typography fontWeight={700} mb={2}>What You'll Get</Typography>
//               <Stack spacing={1.5}>
//                 {focusAreas.map((f, i) => (
//                   <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
//                     <CheckCircleOutlineIcon sx={{ fontSize: 20, color: SUCCESS_GREEN, mt: 0.1 }} />
//                     <Typography variant="body2">{f.title}</Typography>
//                   </Stack>
//                 ))}
//               </Stack>
//             </Paper>

//             {/* ── Experience ───────────────────────────────────── */}
//             {pro.experience && pro.experience.length > 0 && (
//               <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #e5e7eb" }}>
//                 <Typography fontWeight={700} mb={2}>Experience</Typography>
//                 <Stack spacing={2}>
//                   {pro.experience.map((exp, i) => (
//                     <React.Fragment key={i}>
//                       <Box>
//                         <Typography fontWeight={600} variant="body2">{exp.role}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {exp.company}
//                           {exp.duration ? ` · ${exp.duration}` : ""}
//                         </Typography>
//                       </Box>
//                       {i < pro.experience!.length - 1 && <Divider />}
//                     </React.Fragment>
//                   ))}
//                 </Stack>
//               </Paper>
//             )}

//             {/* ── Testimonials ─────────────────────────────────── */}
//             {pro.testimonials && pro.testimonials.length > 0 && (
//               <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e5e7eb" }}>
//                 <Typography fontWeight={700} mb={2}>Student Reviews</Typography>
//                 <Stack spacing={2.5}>
//                   {pro.testimonials.map((t, i) => (
//                     <React.Fragment key={i}>
//                       <Box>
//                         <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//                           <Typography fontWeight={600} variant="body2">{t.user}</Typography>
//                           {t.rating && <StarRating value={t.rating} />}
//                         </Stack>
//                         <Stack direction="row" spacing={1} mt={0.5} alignItems="flex-start">
//                           <FormatQuoteIcon sx={{ fontSize: 18, color: PRIMARY, mt: 0.1, flexShrink: 0 }} />
//                           <Typography variant="body2" color="text.secondary">{t.comment}</Typography>
//                         </Stack>
//                       </Box>
//                       {i < pro.testimonials!.length - 1 && <Divider />}
//                     </React.Fragment>
//                   ))}
//                 </Stack>
//               </Paper>
//             )}
//           </Grid>

//           {/* ═══════════════════════════ RIGHT ══════════════════════════ */}
//           <Grid item xs={12} md={4}>
//             <Card
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 4,
//                 position: { md: "sticky" },
//                 top: 88,
//                 border: "1px solid #e5e7eb",
//               }}
//             >
//               {/* Price */}
//               <Stack direction="row" alignItems="baseline" spacing={1}>
//                 <Typography variant="h4" fontWeight={800} color={SUCCESS_GREEN}>
//                   R{(pro.price ?? 150).toLocaleString()}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">/ session</Typography>
//               </Stack>

//               <Divider sx={{ my: 2 }} />

//               {/* Availability */}
//               {pro.availability && pro.availability.length > 0 && (
//                 <>
//                   <Typography fontWeight={600} variant="body2" mb={1.5}>
//                     Available Slots
//                   </Typography>
//                   <Stack spacing={1} mb={2.5}>
//                     {pro.availability.slice(0, 5).map((slot, i) => (
//                       <Chip
//                         key={i}
//                         label={slot}
//                         size="small"
//                         variant="outlined"
//                         sx={{ justifyContent: "flex-start", borderRadius: 2 }}
//                       />
//                     ))}
//                     {pro.availability.length > 5 && (
//                       <Typography variant="caption" color="text.secondary">
//                         +{pro.availability.length - 5} more slots available
//                       </Typography>
//                     )}
//                   </Stack>
//                 </>
//               )}

//               {/* CTA */}
//               {pro.instantBooking ? (
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   startIcon={<Calendar size={18} />}
//                   onClick={handleBook}
//                   sx={{
//                     borderRadius: 3,
//                     py: 1.5,
//                     fontWeight: 700,
//                     backgroundColor: PRIMARY,
//                     "&:hover": { backgroundColor: "#6950e0" },
//                     textTransform: "none",
//                     fontSize: 15,
//                   }}
//                 >
//                   Book Instantly
//                 </Button>
//               ) : (
//                 <Button
//                   to="/mentee/request-an-interview"
//                   component={Link}
//                   fullWidth
//                   variant="outlined"
//                   size="large"
//                   sx={{
//                     borderRadius: 3,
//                     py: 1.5,
//                     fontWeight: 700,
//                     borderColor: PRIMARY,
//                     color: PRIMARY,
//                     "&:hover": { backgroundColor: `${PRIMARY}10`, borderColor: PRIMARY },
//                     textTransform: "none",
//                     fontSize: 15,
//                   }}
//                 >
//                   Request Session
//                 </Button>
//               )}

//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 display="block"
//                 textAlign="center"
//                 mt={1.5}
//               >
//                 No charge until session is confirmed
//               </Typography>
//             </Card>
//           </Grid>

//         </Grid>
//       </Container>

//       {/* Clipboard snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         message="Link copied to clipboard"
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       />
//     </Box>
//   );
// };

// export default ProfessionalCardDetails;










import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Stack, Grid, Skeleton, Avatar } from "@mui/material";
import {
  ArrowLeft, Share2, CheckCircle2, Calendar, Bookmark,
  ChevronRight, Star, Clock, Users, Briefcase, MapPin,
  RefreshCw, AlertCircle, Globe, Zap, BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   API  — unchanged from professionalDetails
───────────────────────────────────────────────────────────── */
const API_BASE              = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5005";
const PROFESSIONAL_ENDPOINT = `${API_BASE}/api/v1/mentee/professional-details`;

/* ─────────────────────────────────────────────────────────────
   TOKENS  — identical to interview.tsx
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   TYPES  — unchanged from professionalDetails
───────────────────────────────────────────────────────────── */
interface Experience {
  role:     string;
  company:  string;
  duration: string;
}

interface Testimonial {
  user:     string;
  comment:  string;
  rating?:  number;
}

interface Professional {
  _id:                 string;
  name:                string;
  surname:             string;
  avatar?:             string;
  currentJobTitle?:    string;
  companyName?:        string;
  rating?:             number;
  reviews?:            number;
  aboutUser?:          string;
  skills?:             string[];
  interviewFocusArea?: string[];
  experience?:         Experience[];
  testimonials?:       Testimonial[];
  availability?:       string[];
  price?:              number;
  instantBooking?:     boolean;
}

/* ─────────────────────────────────────────────────────────────
   DEFAULT FOCUS AREAS  — unchanged from professionalDetails
───────────────────────────────────────────────────────────── */
const DEFAULT_FOCUS_AREAS = [
  "1-on-1 Mock Interview Practice",
  "Personalised Feedback & Tips",
  "CV / Resume Review",
  "Interview Preparation & Guidance",
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
const fmtRating = (r?: number) => Number((r ?? 4.5).toFixed(1));

const avatarUrl = (name: string, photo?: string) =>
  photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F42E7&color=fff`;

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS  — same as interview.tsx, with book-btn added
───────────────────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .fu { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay:.06s; } .d2 { animation-delay:.13s; }
  .d3 { animation-delay:.20s; } .d4 { animation-delay:.27s; }
  .d5 { animation-delay:.34s; }

  /* ── Back button ── */
  .back-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 14px; border-radius:10px; border:1.5px solid ${BORDER};
    background:${WHITE}; color:${INK2}; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
    transition:all .18s;
  }
  .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  /* ── Share button ── */
  .share-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 16px; border-radius:10px;
    border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    cursor:pointer; transition:all .18s;
  }
  .share-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  /* ── Save button ── */
  .save-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 16px; border-radius:10px;
    border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    cursor:pointer; transition:all .18s;
  }
  .save-btn.saved { border-color:${P}; color:${P}; background:${PL}; }
  .save-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  /* ── Book CTA ── */
  .book-cta {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:15px 0; border:none; border-radius:14px;
    background:${P}; color:#fff; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
    box-shadow:0 6px 20px rgba(127,66,231,.3);
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    position:relative; overflow:hidden;
  }
  .book-cta::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    background-size:300% auto; animation:shimmer 2.2s linear infinite;
  }
  .book-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

  /* ── Request outline CTA ── */
  .request-cta {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:14px 0; border-radius:14px;
    border:1.5px solid ${P}; background:${WHITE}; color:${P};
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
    cursor:pointer; transition:all .2s;
    text-decoration:none;
  }
  .request-cta:hover { background:${PL}; box-shadow:0 6px 20px rgba(127,66,231,.15); }

  /* ── Row item (skill / focus / availability) ── */
  .row-item {
    display:flex; gap:14px; align-items:flex-start;
    padding:14px 18px;
    border:1.5px solid ${BORDER}; border-radius:14px;
    background:${WHITE};
    transition:border-color .2s, box-shadow .2s, transform .2s;
  }
  .row-item:hover {
    border-color:${PM};
    box-shadow:0 6px 20px rgba(127,66,231,.08);
    transform:translateX(3px);
  }

  /* ── Chip ── */
  .chip {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 11px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600;
  }

  /* ── Skill tag ── */
  .tag {
    padding:4px 12px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${OFF};
    font-family:'DM Sans',sans-serif; font-size:12px; color:${INK2};
  }

  /* ── Stat box ── */
  .stat-box {
    border:1.5px solid ${BORDER}; border-radius:14px;
    padding:16px 18px; background:${WHITE};
    display:flex; flex-direction:column; gap:4px;
  }

  /* ── Testimonial card ── */
  .testi-card {
    padding:20px; border:1.5px solid ${BORDER}; border-radius:14px;
    background:${WHITE};
    transition:border-color .2s, box-shadow .2s;
  }
  .testi-card:hover { border-color:${PM}; box-shadow:0 4px 16px rgba(127,66,231,.07); }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:${BORDER}; border-radius:4px; }
`;

/* ─────────────────────────────────────────────────────────────
   STAR ROW
───────────────────────────────────────────────────────────── */
const StarRow = ({ value }: { value: number }) => (
  <Stack direction="row" spacing={0.25} alignItems="center">
    {Array.from({ length: 5 }, (_, i) => {
      const fill = value >= i + 1 ? AMB : value >= i + 0.5 ? AMB : "none";
      const opacity = value >= i + 0.5 ? 1 : 0.25;
      return (
        <Star key={i} size={15} color={AMB}
          fill={fill} style={{ opacity }} />
      );
    })}
  </Stack>
);

/* ─────────────────────────────────────────────────────────────
   SKELETON  — matches interview.tsx skeleton structure
───────────────────────────────────────────────────────────── */
const DetailSkeleton = () => (
  <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
    <Skeleton width={80} height={36} sx={{ borderRadius:2, mb:3 }}/>
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        {/* Avatar + name */}
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Skeleton variant="circular" width={72} height={72}/>
          <Box flex={1}>
            <Skeleton width="55%" height={32} sx={{ mb:.75 }}/>
            <Skeleton width="40%" height={18}/>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} mb={3}>
          {[60,80,70].map(w => <Skeleton key={w} width={w} height={28} sx={{ borderRadius:100 }}/>)}
        </Stack>
        <Skeleton width="95%" height={18} sx={{ mb:.5 }}/>
        <Skeleton width="85%" height={18} sx={{ mb:.5 }}/>
        <Skeleton width="70%" height={18} sx={{ mb:3 }}/>
        {[1,2,3,4].map(i => <Skeleton key={i} height={60} sx={{ borderRadius:2, mb:1.5 }}/>)}
      </Grid>
      <Grid item xs={12} md={4}>
        <Skeleton height={380} sx={{ borderRadius:3 }}/>
      </Grid>
    </Grid>
  </Box>
);

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const ProfessionalCardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /* ── state ── */
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [copied,       setCopied]       = useState(false);
  const [saved,        setSaved]        = useState(false);

  /* ── fetch — mirrors professionalDetails pattern exactly ── */
  useEffect(() => {
    if (!id) {
      setError("Invalid professional ID.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProfessional = async () => {
      try {
        const res = await axios.get<{ result: Professional }>(
          `${PROFESSIONAL_ENDPOINT}`,
          { params: { _id: id } }
        );
        if (!cancelled) {
          setProfessional(res.data.result ?? null);
          if (!res.data.result) setError("Professional not found.");
        }
      } catch (err) {
        if (!cancelled) {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            setError("This professional could not be found.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfessional();
    return () => { cancelled = true; };
  }, [id]);

  /* ── derived ── */
  const pro          = professional;
  const displayRating = fmtRating(pro?.rating);
  const photo        = avatarUrl(`${pro?.name ?? "U"} ${pro?.surname ?? ""}`, pro?.avatar);
  const fullName     = pro ? `${pro.name} ${pro.surname}` : "";

  const focusAreas = useMemo(() =>
    pro?.interviewFocusArea?.length
      ? pro.interviewFocusArea
      : DEFAULT_FOCUS_AREAS,
  [pro]);

  /* ── handlers ── */
  const handleBack = useCallback(() => navigate("/mentee/professionals"), [navigate]);

  const handleBook = useCallback(() => {
    if (pro?._id) navigate(`/mentee/request-an-interview`);
  }, [navigate, pro]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }, []);

  /* ── loading ── */
  if (loading) return (
    <>
      <style>{css}</style>
      <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
        <DetailSkeleton/>
      </Box>
    </>
  );

  /* ── error ── */
  if (error || !pro) return (
    <>
      <style>{css}</style>
      <Box sx={{ background:WHITE, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", px:2 }}>
        <Box sx={{ textAlign:"center", maxWidth:400 }}>
          <Box sx={{ width:56, height:56, borderRadius:"50%", background:REDL, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
            <AlertCircle size={24} color={RED}/>
          </Box>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:1 }}>
            Professional not found
          </Typography>
          <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7, mb:3 }}>
            {error ?? "This profile may have been removed or is unavailable."}
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center">
            <button className="back-btn" onClick={handleBack}>
              <ArrowLeft size={14}/> Go back
            </button>
            <button className="back-btn" style={{ borderColor:P, color:P, background:PL }}
              onClick={() => window.location.reload()}>
              <RefreshCw size={14}/> Retry
            </button>
          </Stack>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>

        {/* ── TOP BAR ───────────────────────────────────────── */}
        <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:{ xs:2, md:6 }, py:1.5, position:"sticky", top:0, background:`${WHITE}E8`, backdropFilter:"blur(12px)", zIndex:10 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <button className="back-btn" onClick={handleBack}>
              <ArrowLeft size={14}/> Back to professionals
            </button>
            <Stack direction="row" spacing={1}>
              <button
                className={`save-btn${saved ? " saved" : ""}`}
                onClick={() => setSaved(p => !p)}
              >
                <Bookmark size={13} fill={saved ? P : "none"}/> {saved ? "Saved" : "Save"}
              </button>
              <button className="share-btn" onClick={handleShare}>
                {copied
                  ? <><CheckCircle2 size={13} color={GRN}/> Copied!</>
                  : <><Share2 size={13}/> Share</>
                }
              </button>
            </Stack>
          </Stack>
        </Box>

        {/* ── BODY ────────────────────────────────────────────── */}
        <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
          <Grid container spacing={{ xs:3, md:5 }}>

            {/* ════════════════════════════════════════════════
                LEFT — profile detail
            ════════════════════════════════════════════════ */}
            <Grid item xs={12} md={8}>

              {/* ── HERO SECTION — avatar + name + title ── */}
              <Stack direction={{ xs:"column", sm:"row" }} spacing={3} alignItems={{ xs:"flex-start", sm:"center" }} mb={3} className="fu">
                <Avatar
                  src={photo}
                  sx={{ width:{ xs:64, md:80 }, height:{ xs:64, md:80 }, flexShrink:0,
                    border:`3px solid ${BORDER}`,
                    boxShadow:`0 0 0 4px ${PL}`,
                  }}
                >
                  {pro.name[0]}
                </Avatar>
                <Box minWidth={0}>
                  {/* Name */}
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800,
                    fontSize:{ xs:"1.5rem", md:"2rem" },
                    color:INK, lineHeight:1.1, letterSpacing:"-0.025em", mb:.5 }}>
                    {fullName}
                  </Typography>
                  {/* Job title + company */}
                  {(pro.currentJobTitle || pro.companyName) && (
                    <Stack direction="row" flexWrap="wrap" gap={.75} alignItems="center">
                      {pro.currentJobTitle && (
                        <span className="chip" style={{ background:PL, color:P }}>
                          <Briefcase size={11}/> {pro.currentJobTitle}
                        </span>
                      )}
                      {pro.companyName && (
                        <span className="chip" style={{ background:OFF, color:INK2 }}>
                          <Globe size={11}/> {pro.companyName}
                        </span>
                      )}
                    </Stack>
                  )}
                </Box>
              </Stack>

              {/* ── META CHIPS ── */}
              <Stack className="fu d1" direction="row" flexWrap="wrap" gap={1} mb={3}>
                {/* Rating */}
                <span className="chip" style={{ background:AMBL, color:AMB }}>
                  <Star size={11} fill={AMB}/> {displayRating}
                  {pro.reviews ? ` (${pro.reviews.toLocaleString()})` : ""}
                </span>
                {/* Price */}
                <span className="chip" style={{ background:GRNL, color:GRN }}>
                  R{(pro.price ?? 150).toLocaleString()} / session
                </span>
                {/* Instant booking */}
                {pro.instantBooking && (
                  <span className="chip" style={{ background:PL, color:P }}>
                    <Zap size={11}/> Instant booking
                  </span>
                )}
              </Stack>

              {/* ── ABOUT ── */}
              {pro.aboutUser && (
                <Box className="fu d2" mb={4}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:1.5 }}>
                    About
                  </Typography>
                  <Typography sx={{ fontSize:{ xs:14.5, md:15.5 }, color:INK2, lineHeight:1.85 }}>
                    {pro.aboutUser}
                  </Typography>
                </Box>
              )}

              {/* ── SKILLS ── */}
              {pro.skills && pro.skills.length > 0 && (
                <Box className="fu d2" mb={4}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:1.5 }}>
                    Skills & Expertise
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={.75}>
                    {pro.skills.map(s => <span key={s} className="tag">{s}</span>)}
                  </Stack>
                </Box>
              )}

              {/* divider */}
              <Box sx={{ height:1, background:BORDER, mb:4 }} className="fu d2"/>

              {/* ── WHAT YOU'LL GET (focus areas) ── */}
              <Box className="fu d3" mb={4}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>
                  What you'll get
                </Typography>
                <Stack spacing={1.5}>
                  {focusAreas.map((f, i) => (
                    <div key={i} className="row-item">
                      <Box sx={{ width:28, height:28, borderRadius:"7px", flexShrink:0,
                        background:PL, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <CheckCircle2 size={14} color={P}/>
                      </Box>
                      <Typography sx={{ fontSize:14.5, color:INK, lineHeight:1.6, pt:.2 }}>{f}</Typography>
                      <Box sx={{ color:INK3, flexShrink:0, mt:.3, ml:"auto" }}>
                        <ChevronRight size={15}/>
                      </Box>
                    </div>
                  ))}
                </Stack>
              </Box>

              {/* ── EXPERIENCE ── */}
              {pro.experience && pro.experience.length > 0 && (
                <Box className="fu d4" mb={4}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>
                    Experience
                  </Typography>
                  <Stack spacing={1.5}>
                    {pro.experience.map((exp, i) => (
                      <div key={i} className="row-item">
                        <Box sx={{ width:28, height:28, borderRadius:"7px", flexShrink:0,
                          background:OFF, border:`1.5px solid ${BORDER}`,
                          display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Briefcase size={13} color={INK3}/>
                        </Box>
                        <Box minWidth={0}>
                          <Typography sx={{ fontWeight:700, fontSize:14, color:INK }}>{exp.role}</Typography>
                          <Typography sx={{ fontSize:13, color:INK2 }}>
                            {exp.company}{exp.duration ? ` · ${exp.duration}` : ""}
                          </Typography>
                        </Box>
                      </div>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* ── TESTIMONIALS ── */}
              {pro.testimonials && pro.testimonials.length > 0 && (
                <Box className="fu d5">
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>
                    Student reviews
                  </Typography>
                  <Stack spacing={1.5}>
                    {pro.testimonials.map((t, i) => (
                      <div key={i} className="testi-card">
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK }}>{t.user}</Typography>
                          {t.rating && <StarRow value={t.rating}/>}
                        </Stack>
                        <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.7, fontStyle:"italic" }}>
                          "{t.comment}"
                        </Typography>
                      </div>
                    ))}
                  </Stack>
                </Box>
              )}

            </Grid>

            {/* ════════════════════════════════════════════════
                RIGHT — sticky booking card
            ════════════════════════════════════════════════ */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position:{ md:"sticky" }, top:{ md:80 } }}>

                {/* ── ACTION CARD ── */}
                <Box className="fu d2" sx={{
                  border:`1.5px solid ${BORDER}`, borderRadius:"18px",
                  overflow:"hidden", background:WHITE,
                  boxShadow:"0 8px 32px rgba(127,66,231,.08)",
                }}>

                  {/* Stats grid */}
                  <Box sx={{ borderBottom:`1px solid ${BORDER}`, p:2.5 }}>
                    <Grid container spacing={1.5}>
                      {[
                        { icon:<Star size={15} color={AMB}/>,    val:displayRating.toString(),                        label:"Rating" },
                        { icon:<Users size={15} color={INK3}/>,  val:(pro.reviews ?? 0).toLocaleString(),             label:"Reviews" },
                        { icon:<Clock size={15} color={INK3}/>,  val:pro.availability?.length ? `${pro.availability.length} slots` : "Flexible", label:"Availability" },
                        { icon:<BookOpen size={15} color={P}/>,  val:`R${(pro.price ?? 150).toLocaleString()}`,       label:"Per session" },
                      ].map(({ icon, val, label }) => (
                        <Grid item xs={6} key={label}>
                          <div className="stat-box">
                            <Box sx={{ display:"flex", alignItems:"center", gap:.5, mb:.25 }}>{icon}</Box>
                            <Typography sx={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:15, color:INK }}>
                              {val}
                            </Typography>
                            <Typography sx={{ fontSize:11.5, color:INK3 }}>{label}</Typography>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Availability slots */}
                  {pro.availability && pro.availability.length > 0 && (
                    <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
                      <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1.25 }}>
                        Available slots
                      </Typography>
                      <Stack spacing={.75}>
                        {pro.availability.slice(0, 4).map((slot, i) => (
                          <Stack key={i} direction="row" spacing={1} alignItems="center">
                            <Box sx={{ width:6, height:6, borderRadius:"50%", bgcolor:GRN, flexShrink:0 }}/>
                            <Typography sx={{ fontSize:13, color:INK2 }}>{slot}</Typography>
                          </Stack>
                        ))}
                        {pro.availability.length > 4 && (
                          <Typography sx={{ fontSize:12, color:P, fontWeight:500 }}>
                            +{pro.availability.length - 4} more slots
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}

                  {/* Creator row */}
                  <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
                    <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1.25 }}>
                      Professional
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={photo} sx={{ width:34, height:34 }}>{pro.name[0]}</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK }}>{fullName}</Typography>
                        {pro.currentJobTitle && (
                          <Typography sx={{ fontSize:12, color:INK3 }}>{pro.currentJobTitle}</Typography>
                        )}
                      </Box>
                    </Stack>
                  </Box>

                  {/* CTA */}
                  <Box sx={{ p:2.5 }}>
                    {pro.instantBooking ? (
                      <button className="book-cta" onClick={handleBook}>
                        <Calendar size={16}/> Book Instantly
                      </button>
                    ) : (
                      <Link to="/mentee/request-an-interview" className="request-cta">
                        <Calendar size={16}/> Request Session
                      </Link>
                    )}
                    <Typography sx={{ fontSize:12, color:INK3, textAlign:"center", mt:1.5, lineHeight:1.6 }}>
                      No charge until session is confirmed
                    </Typography>
                  </Box>
                </Box>

                {/* ── TIPS CARD ── */}
                <Box className="fu d3" mt={2.5} sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"16px", p:2.5, background:OFF }}>
                  <Typography sx={{ fontWeight:700, fontSize:13, color:INK, mb:1.5 }}>
                    💡 How to get the most out of your session
                  </Typography>
                  <Stack spacing={1.25}>
                    {[
                      "Prepare 2–3 specific examples using the STAR method.",
                      "Share your CV beforehand so your mentor can tailor feedback.",
                      "List the roles you are targeting before the session starts.",
                      "Come with questions — this is your time.",
                    ].map((tip, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                        <Box sx={{ width:5, height:5, borderRadius:"50%", bgcolor:P, mt:".55em", flexShrink:0 }}/>
                        <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.65 }}>{tip}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>

              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProfessionalCardDetails;
