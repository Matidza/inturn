// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Box, Typography, Stack, Grid, Skeleton, Avatar } from "@mui/material";
// import {
//   ArrowLeft, Brain, Clock, Users, Star, BookOpen,
//   Globe, Lock, Play, Share2, CheckCircle2, Copy,
//   ChevronRight, BarChart2, Zap, RefreshCw, AlertCircle,
//   Code2, Briefcase, FlaskConical, Megaphone, TrendingUp,
// } from "lucide-react";

// /* ─────────────────────────────────────────────────────────────
//    API
// ───────────────────────────────────────────────────────────── */
// const API_BASE = "http://localhost:5005/api/v1";

// const authFetch = async (path: string) => {
//   const token = localStorage.getItem("authToken") ?? "";
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed ${res.status}`);
//   return data;
// };

// /* ─────────────────────────────────────────────────────────────
//    TOKENS  — identical to aiInterviews.tsx so pages feel unified
// ───────────────────────────────────────────────────────────── */
// const P      = "#7F42E7";
// const PD     = "#5E2EC5";
// const PM     = "#B893F6";
// const PL     = "#F0EAFD";
// const INK    = "#0D0D12";
// const INK2   = "#4A4A5A";
// const INK3   = "#8A8AA0";
// const BORDER = "#E8E3F5";
// const OFF    = "#F7F6FC";
// const WHITE  = "#FFFFFF";
// const GRN    = "#059669";
// const GRNL   = "#ECFDF5";
// const AMB    = "#D97706";
// const AMBL   = "#FFFBEB";
// const RED    = "#DC2626";
// const REDL   = "#FEF2F2";

// /* ─────────────────────────────────────────────────────────────
//    TYPES  — mirrors APIInterview + source field from update.tsx
// ───────────────────────────────────────────────────────────── */
// interface CreatedBy {
//   _id?:    string;
//   name?:   string;
//   surname?:string;
//   avatar?: string;
// }

// interface AIInterviewDoc {
//   _id:        string;
//   createdBy:  CreatedBy | string;
//   title:      string;
//   description:string;
//   category:   string;
//   difficulty: string;
//   duration:   number;
//   isPublic:   boolean;
//   questions:  string[];
//   attempts:   number;
//   rating:     number;
//   featured:   boolean;
//   tags:       string[];
//   createdAt:  string;
//   source:     "community" | "private";  // injected by getSingleAIInterview
// }

// /* ─────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────── */
// const creatorName = (cb: CreatedBy | string): string => {
//   if (!cb) return "Community";
//   if (typeof cb === "string") return "Community";
//   return `${cb.name ?? ""} ${cb.surname ?? ""}`.trim() || "Community";
// };

// const creatorAvatar = (cb: CreatedBy | string): string => {
//   const name = typeof cb === "object" && cb !== null
//     ? (cb.name ?? "U")
//     : "U";
//   const photo = typeof cb === "object" && cb !== null ? cb.avatar : undefined;
//   return photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F42E7&color=fff`;
// };

// const difficultyMeta = (d: string) => ({
//   beginner:     { label: "Beginner",     bg: GRNL,  color: GRN },
//   intermediate: { label: "Intermediate", bg: AMBL,  color: AMB },
//   advanced:     { label: "Advanced",     bg: REDL,  color: RED },
// }[d] ?? { label: d, bg: PL, color: P });

// const categoryIcon = (c: string) => ({
//   technical:   <Code2     size={14}/>,
//   behavioural: <Brain     size={14}/>,
//   product:     <Briefcase size={14}/>,
//   data:        <BarChart2 size={14}/>,
//   marketing:   <Megaphone size={14}/>,
//   finance:     <TrendingUp size={14}/>,
//   science:     <FlaskConical size={14}/>,
// }[c] ?? <Brain size={14}/>);

// const fmtDate = (iso: string) =>
//   new Date(iso).toLocaleDateString("en-ZA", { day:"numeric", month:"long", year:"numeric" });

// /* ─────────────────────────────────────────────────────────────
//    GLOBAL CSS
// ───────────────────────────────────────────────────────────── */
// const css = `
//   *, *::before, *::after { box-sizing: border-box; }
//   html, body { overflow-x: hidden; max-width: 100vw; }

//   @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
//   @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

//   .fu  { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
//   .d1  { animation-delay:.06s; }
//   .d2  { animation-delay:.13s; }
//   .d3  { animation-delay:.20s; }
//   .d4  { animation-delay:.27s; }
//   .d5  { animation-delay:.34s; }

//   /* ── Start CTA ── */
//   .start-cta {
//     display:flex; align-items:center; justify-content:center; gap:9px;
//     width:100%; padding:15px 0; border:none; border-radius:14px;
//     background:${P}; color:#fff; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
//     box-shadow:0 6px 20px rgba(127,66,231,.3);
//     transition:all .2s cubic-bezier(.34,1.56,.64,1);
//     position:relative; overflow:hidden;
//   }
//   .start-cta::before {
//     content:''; position:absolute; inset:0;
//     background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
//     background-size:300% auto; animation:shimmer 2.2s linear infinite;
//   }
//   .start-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

//   /* ── Back button ── */
//   .back-btn {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:8px 14px; border-radius:10px; border:1.5px solid ${BORDER};
//     background:${WHITE}; color:${INK2}; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
//     transition:all .18s;
//   }
//   .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

//   /* ── Question item ── */
//   .q-item {
//     display:flex; gap:14px; align-items:flex-start;
//     padding:18px 20px;
//     border:1.5px solid ${BORDER}; border-radius:14px;
//     background:${WHITE};
//     transition:border-color .2s, box-shadow .2s, transform .2s;
//   }
//   .q-item:hover {
//     border-color:${PM};
//     box-shadow:0 6px 20px rgba(127,66,231,.08);
//     transform:translateX(3px);
//   }

//   /* ── Share button ── */
//   .share-btn {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:8px 16px; border-radius:10px;
//     border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
//     font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
//     cursor:pointer; transition:all .18s;
//   }
//   .share-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

//   /* ── Chip ── */
//   .chip {
//     display:inline-flex; align-items:center; gap:5px;
//     padding:4px 11px; border-radius:100px;
//     font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600;
//   }

//   /* ── Stat box ── */
//   .stat-box {
//     border:1.5px solid ${BORDER}; border-radius:14px;
//     padding:16px 18px; background:${WHITE};
//     display:flex; flex-direction:column; gap:4px;
//   }

//   /* ── Tag ── */
//   .tag {
//     padding:4px 12px; border-radius:100px;
//     border:1.5px solid ${BORDER}; background:${OFF};
//     font-family:'DM Sans',sans-serif; font-size:12px; color:${INK2};
//   }
// `;

// /* ─────────────────────────────────────────────────────────────
//    SKELETON
// ───────────────────────────────────────────────────────────── */
// const DetailSkeleton = () => (
//   <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
//     <Skeleton width={80} height={36} sx={{ borderRadius:2, mb:3 }}/>
//     <Grid container spacing={4}>
//       <Grid item xs={12} md={8}>
//         <Skeleton width="65%" height={42} sx={{ mb:1.5 }}/>
//         <Skeleton width="90%" height={20} sx={{ mb:.75 }}/>
//         <Skeleton width="75%" height={20} sx={{ mb:3 }}/>
//         <Stack direction="row" spacing={1} mb={4}>
//           {[60,80,70].map(w => <Skeleton key={w} width={w} height={28} sx={{ borderRadius:100 }}/>)}
//         </Stack>
//         {[1,2,3,4,5].map(i => (
//           <Skeleton key={i} height={72} sx={{ borderRadius:2, mb:1.5 }}/>
//         ))}
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Skeleton height={320} sx={{ borderRadius:3 }}/>
//       </Grid>
//     </Grid>
//   </Box>
// );

// /* ─────────────────────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────────────────────── */
// const AIInterviewDetail: React.FC = () => {
//   const { interviewId } = useParams<{ interviewId: string }>();
//   const navigate        = useNavigate();
//   const location        = useLocation();

//   /* ── state ── */
//   const [iv,       setIv]       = useState<AIInterviewDoc | null>(null);
//   const [loading,  setLoading]  = useState(true);
//   const [error,    setError]    = useState<string | null>(null);
//   const [copied,   setCopied]   = useState(false);
//   const [starting, setStarting] = useState(false);

//   /* ── fetch ── */
//   const fetchInterview = useCallback(async () => {
//     if (!interviewId) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await authFetch(`/mentee/practice-details/${interviewId}`);
//       setIv(data.result as AIInterviewDoc);
//     } catch (err: any) {
//       setError(err?.message ?? "Failed to load interview. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [interviewId]);

//   useEffect(() => { fetchInterview(); }, [fetchInterview]);

//   /* ── derived ── */
//   const diffMeta = iv ? difficultyMeta(iv.difficulty) : null;
//   const author   = iv ? creatorName(iv.createdBy)   : "";
//   const photo    = iv ? creatorAvatar(iv.createdBy) : "";
//   const stars    = iv ? Math.round(iv.rating * 2) / 2 : 0; // half-star precision

//   /* ── start practice ── */
//   const handleStart = () => {
//     if (!iv) return;
//     setStarting(true);
//     navigate("/mentee/ai-practice", {
//       state: {
//         interviewId: iv._id,
//         title:       iv.title,
//         questions:   iv.questions,   // full string[] — backend already returns them
//         duration:    iv.duration,
//         category:    iv.category,
//         source:      iv.source,
//       },
//     });
//   };

//   /* ── copy link ── */
//   const handleCopy = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2200);
//     });
//   };

//   /* ── loading ── */
//   if (loading) return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
//         <DetailSkeleton/>
//       </Box>
//     </>
//   );

//   /* ── error ── */
//   if (error || !iv) return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:WHITE, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", px:2 }}>
//         <Box sx={{ textAlign:"center", maxWidth:400 }}>
//           <Box sx={{ width:56, height:56, borderRadius:"50%", background:REDL, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
//             <AlertCircle size={24} color={RED}/>
//           </Box>
//           <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:1 }}>
//             {error === "This interview is private." ? "Private interview" : "Interview not found"}
//           </Typography>
//           <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7, mb:3 }}>
//             {error ?? "This interview may have been removed or is not available."}
//           </Typography>
//           <Stack direction="row" spacing={1.5} justifyContent="center">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               <ArrowLeft size={14}/> Go back
//             </button>
//             {error !== "This interview is private." && (
//               <button className="back-btn" style={{ borderColor:P, color:P, background:PL }}
//                 onClick={fetchInterview}>
//                 <RefreshCw size={14}/> Retry
//               </button>
//             )}
//           </Stack>
//         </Box>
//       </Box>
//     </>
//   );

//   return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>

//         {/* ── TOP BAR ─────────────────────────────────────── */}
//         <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:{ xs:2, md:6 }, py:1.5, position:"sticky", top:0, background:`${WHITE}E8`, backdropFilter:"blur(12px)", zIndex:10 }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               <ArrowLeft size={14}/> Back to interviews
//             </button>
//             <Stack direction="row" spacing={1}>
//               <button className="share-btn" onClick={handleCopy}>
//                 {copied ? <><CheckCircle2 size={13} color={GRN}/> Copied!</> : <><Share2 size={13}/> Share</>}
//               </button>
//             </Stack>
//           </Stack>
//         </Box>

//         {/* ── BODY ────────────────────────────────────────── */}
//         <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
//           <Grid container spacing={{ xs:3, md:5 }}>

//             {/* ════════════════════════════════════════════
//                 LEFT — interview detail
//             ════════════════════════════════════════════ */}
//             <Grid item xs={12} md={8}>

//               {/* Visibility badge + source indicator */}
//               <Stack direction="row" spacing={1} alignItems="center" mb={2} className="fu">
//                 {iv.source === "private" ? (
//                   <span className="chip" style={{ background:AMBL, color:AMB }}>
//                     <Lock size={11}/> Private
//                   </span>
//                 ) : (
//                   <span className="chip" style={{ background:GRNL, color:GRN }}>
//                     <Globe size={11}/> Community
//                   </span>
//                 )}
//                 {iv.featured && (
//                   <span className="chip" style={{ background:PL, color:P }}>
//                     <Zap size={11}/> Featured
//                   </span>
//                 )}
//                 <span className="chip" style={{ background:OFF, color:INK3 }}>
//                   {categoryIcon(iv.category)} {iv.category.charAt(0).toUpperCase() + iv.category.slice(1)}
//                 </span>
//               </Stack>

//               {/* Title */}
//               <Typography className="fu d1" sx={{
//                 fontFamily:"'Syne',sans-serif", fontWeight:800,
//                 fontSize:{ xs:"1.6rem", md:"2.1rem" },
//                 color:INK, lineHeight:1.1, letterSpacing:"-0.025em", mb:1.5,
//               }}>
//                 {iv.title}
//               </Typography>

//               {/* Description */}
//               <Typography className="fu d2" sx={{
//                 fontSize:{ xs:14.5, md:16 }, color:INK2, lineHeight:1.8, mb:3,
//               }}>
//                 {iv.description}
//               </Typography>

//               {/* Difficulty + duration + meta chips */}
//               <Stack className="fu d3" direction="row" flexWrap="wrap" gap={1} mb={4}>
//                 {diffMeta && (
//                   <span className="chip" style={{ background:diffMeta.bg, color:diffMeta.color }}>
//                     <Brain size={11}/> {diffMeta.label}
//                   </span>
//                 )}
//                 <span className="chip" style={{ background:OFF, color:INK2 }}>
//                   <Clock size={11}/> {iv.duration} min
//                 </span>
//                 <span className="chip" style={{ background:OFF, color:INK2 }}>
//                   <BookOpen size={11}/> {iv.questions.length} questions
//                 </span>
//                 <span className="chip" style={{ background:OFF, color:INK2 }}>
//                   <Users size={11}/> {iv.attempts.toLocaleString()} attempts
//                 </span>
//                 {iv.rating > 0 && (
//                   <span className="chip" style={{ background:AMBL, color:AMB }}>
//                     <Star size={11}/> {iv.rating.toFixed(1)}
//                   </span>
//                 )}
//               </Stack>

//               {/* Tags */}
//               {iv.tags.length > 0 && (
//                 <Stack className="fu d3" direction="row" flexWrap="wrap" gap={.75} mb={4}>
//                   {iv.tags.map(t => <span key={t} className="tag">{t}</span>)}
//                 </Stack>
//               )}

//               {/* Divider */}
//               <Box sx={{ height:1, background:BORDER, mb:4 }} className="fu d3"/>

//               {/* ── QUESTIONS LIST ── */}
//               <Box className="fu d4">
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
//                   <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:INK }}>
//                     Interview Questions
//                   </Typography>
//                   <Typography sx={{ fontSize:12.5, color:INK3 }}>
//                     {iv.questions.length} questions · {iv.duration} min
//                   </Typography>
//                 </Stack>

//                 <Stack spacing={1.5}>
//                   {iv.questions.map((q, i) => (
//                     <div key={i} className="q-item">
//                       {/* Number badge */}
//                       <Box sx={{
//                         width:30, height:30, borderRadius:"8px", flexShrink:0,
//                         background:PL, display:"flex", alignItems:"center", justifyContent:"center",
//                       }}>
//                         <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, fontWeight:700, color:P }}>
//                           {String(i + 1).padStart(2, "0")}
//                         </Typography>
//                       </Box>

//                       {/* Question text */}
//                       <Box flex={1} minWidth={0}>
//                         <Typography sx={{ fontSize:14.5, color:INK, lineHeight:1.65 }}>
//                           {q}
//                         </Typography>
//                       </Box>

//                       {/* Arrow hint */}
//                       <Box sx={{ color:INK3, flexShrink:0, mt:.2 }}>
//                         <ChevronRight size={15}/>
//                       </Box>
//                     </div>
//                   ))}
//                 </Stack>
//               </Box>

//               {/* ── WHAT TO EXPECT ── */}
//               <Box className="fu d5" mt={5}>
//                 <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>
//                   What to expect
//                 </Typography>
//                 <Grid container spacing={2}>
//                   {[
//                     { icon:<Brain size={18} color={P}/>,      title:"AI interviewer",     desc:"The AI adapts follow-up questions based on your answers in real time." },
//                     { icon:<Clock size={18} color={AMB}/>,    title:"Timed session",       desc:`You have ${iv.duration} minutes. The AI tracks pacing and gives feedback.` },
//                     { icon:<CheckCircle2 size={18} color={GRN}/>, title:"Instant feedback", desc:"After each answer you receive a score, suggested improvements, and model answer." },
//                   ].map(({ icon, title, desc }) => (
//                     <Grid item xs={12} sm={4} key={title}>
//                       <Box sx={{ p:2, border:`1.5px solid ${BORDER}`, borderRadius:"14px", height:"100%", background:OFF }}>
//                         <Box mb={1}>{icon}</Box>
//                         <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK, mb:.5 }}>{title}</Typography>
//                         <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.6 }}>{desc}</Typography>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>

//             </Grid>

//             {/* ════════════════════════════════════════════
//                 RIGHT — sticky action card
//             ════════════════════════════════════════════ */}
//             <Grid item xs={12} md={4}>
//               <Box sx={{ position:{ md:"sticky" }, top:{ md:80 } }}>

//                 {/* Action card */}
//                 <Box className="fu d2" sx={{
//                   border:`1.5px solid ${BORDER}`, borderRadius:"18px",
//                   overflow:"hidden", background:WHITE,
//                   boxShadow:"0 8px 32px rgba(127,66,231,.08)",
//                 }}>

//                   {/* Stats row */}
//                   <Box sx={{ borderBottom:`1px solid ${BORDER}`, p:2.5 }}>
//                     <Grid container spacing={1.5}>
//                       {[
//                         { icon:<Users size={15} color={INK3}/>,    val:iv.attempts.toLocaleString(), label:"Attempts" },
//                         { icon:<Clock size={15} color={INK3}/>,    val:`${iv.duration}m`,            label:"Duration" },
//                         { icon:<BookOpen size={15} color={INK3}/>, val:`${iv.questions.length}Q`,    label:"Questions" },
//                         { icon:<Star size={15} color={AMB}/>,      val:iv.rating > 0 ? iv.rating.toFixed(1) : "—", label:"Rating" },
//                       ].map(({ icon, val, label }) => (
//                         <Grid item xs={6} key={label}>
//                           <div className="stat-box">
//                             <Box sx={{ display:"flex", alignItems:"center", gap:.5, mb:.25 }}>{icon}</Box>
//                             <Typography sx={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:16, color:INK }}>
//                               {val}
//                             </Typography>
//                             <Typography sx={{ fontSize:11.5, color:INK3 }}>{label}</Typography>
//                           </div>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Box>

//                   {/* Creator */}
//                   <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
//                     <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1.25 }}>
//                       Created by
//                     </Typography>
//                     <Stack direction="row" spacing={1.5} alignItems="center">
//                       <Avatar src={photo} sx={{ width:36, height:36 }}>
//                         {author[0] ?? "C"}
//                       </Avatar>
//                       <Box>
//                         <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK }}>{author}</Typography>
//                         <Typography sx={{ fontSize:12, color:INK3 }}>
//                           Published {fmtDate(iv.createdAt)}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </Box>

//                   {/* Difficulty */}
//                   {diffMeta && (
//                     <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
//                       <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1 }}>
//                         Difficulty
//                       </Typography>
//                       <Stack direction="row" spacing={.75} alignItems="center">
//                         <Box sx={{ width:8, height:8, borderRadius:"50%", bgcolor:diffMeta.color }}/>
//                         <Typography sx={{ fontSize:13.5, fontWeight:600, color:diffMeta.color }}>
//                           {diffMeta.label}
//                         </Typography>
//                       </Stack>
//                     </Box>
//                   )}

//                   {/* CTA */}
//                   <Box sx={{ p:2.5 }}>
//                     <button
//                       className="start-cta"
//                       onClick={handleStart}
//                       disabled={starting}
//                     >
//                       {starting
//                         ? <Box sx={{ width:18, height:18, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
//                         : <Play size={17} fill="#fff"/>
//                       }
//                       {starting ? "Starting…" : "Start Interview"}
//                     </button>

//                     <Typography sx={{ fontSize:12, color:INK3, textAlign:"center", mt:1.5, lineHeight:1.6 }}>
//                       Answers are evaluated by AI. You'll receive instant feedback after each response.
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Tips card */}
//                 <Box className="fu d3" mt={2.5} sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"16px", p:2.5, background:OFF }}>
//                   <Typography sx={{ fontWeight:700, fontSize:13, color:INK, mb:1.5 }}>
//                     💡 Tips before you start
//                   </Typography>
//                   <Stack spacing={1.25}>
//                     {[
//                       "Use the STAR method — Situation, Task, Action, Result.",
//                       "Speak your answer aloud if possible — fluency matters.",
//                       "It's okay to take 5 seconds before responding.",
//                       "Be specific with examples rather than speaking generally.",
//                     ].map((tip, i) => (
//                       <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
//                         <Box sx={{ width:5, height:5, borderRadius:"50%", bgcolor:P, mt:".55em", flexShrink:0 }}/>
//                         <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.65 }}>{tip}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                 </Box>

//               </Box>
//             </Grid>

//           </Grid>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AIInterviewDetail;













// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Box, Typography, Stack, Grid, Skeleton, Avatar } from "@mui/material";
// import {
//   ArrowLeft, Brain, Clock, Users, Star, BookOpen,
//   Globe, Lock, Play, Share2, CheckCircle2, Copy,
//   ChevronRight, BarChart2, Zap, RefreshCw, AlertCircle,
//   Code2, Briefcase, FlaskConical, Megaphone, TrendingUp,
// } from "lucide-react";

// /* ─────────────────────────────────────────────────────────────
//    API
// ───────────────────────────────────────────────────────────── */
// const API_BASE = "http://localhost:5005/api/v1";
// // const API = "http://localhost:5005/api/v1/mentee/practice-details"


// const authFetch = async (path: string) => {
//   const token = localStorage.getItem("authToken") ?? "";
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed ${res.status}`);
//   return data;
// };

// /* ─────────────────────────────────────────────────────────────
//    TOKENS  — identical to aiInterviews.tsx so pages feel unified
// ───────────────────────────────────────────────────────────── */
// const P      = "#7F42E7";
// const PD     = "#5E2EC5";
// const PM     = "#B893F6";
// const PL     = "#F0EAFD";
// const INK    = "#0D0D12";
// const INK2   = "#4A4A5A";
// const INK3   = "#8A8AA0";
// const BORDER = "#E8E3F5";
// const OFF    = "#F7F6FC";
// const WHITE  = "#FFFFFF";
// const GRN    = "#059669";
// const GRNL   = "#ECFDF5";
// const AMB    = "#D97706";
// const AMBL   = "#FFFBEB";
// const RED    = "#DC2626";
// const REDL   = "#FEF2F2";

// /* ─────────────────────────────────────────────────────────────
//    TYPES  — mirrors APIInterview + source field from update.tsx
// ───────────────────────────────────────────────────────────── */
// interface CreatedBy {
//   _id?:    string;
//   name?:   string;
//   surname?:string;
//   avatar?: string;
// }

// interface AIInterviewDoc {
//   _id:        string;
//   createdBy:  CreatedBy | string;
//   title:      string;
//   description:string;
//   category:   string;
//   difficulty: string;
//   duration:   number;
//   isPublic:   boolean;
//   questions:  string[];
//   attempts:   number;
//   rating:     number;
//   featured:   boolean;
//   tags:       string[];
//   createdAt:  string;
//   source:     "community" | "private";  // injected by getSingleAIInterview
// }

// /* ─────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────── */
// const creatorName = (cb: CreatedBy | string): string => {
//   if (!cb) return "Community";
//   if (typeof cb === "string") return "Community";
//   return `${cb.name ?? ""} ${cb.surname ?? ""}`.trim() || "Community";
// };

// const creatorAvatar = (cb: CreatedBy | string): string => {
//   const name = typeof cb === "object" && cb !== null
//     ? (cb.name ?? "U")
//     : "U";
//   const photo = typeof cb === "object" && cb !== null ? cb.avatar : undefined;
//   return photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F42E7&color=fff`;
// };

// const difficultyMeta = (d: string) => ({
//   beginner:     { label: "Beginner",     bg: GRNL,  color: GRN },
//   intermediate: { label: "Intermediate", bg: AMBL,  color: AMB },
//   advanced:     { label: "Advanced",     bg: REDL,  color: RED },
// }[d] ?? { label: d, bg: PL, color: P });

// const categoryIcon = (c: string) => ({
//   technical:   <Code2     size={14}/>,
//   behavioural: <Brain     size={14}/>,
//   product:     <Briefcase size={14}/>,
//   data:        <BarChart2 size={14}/>,
//   marketing:   <Megaphone size={14}/>,
//   finance:     <TrendingUp size={14}/>,
//   science:     <FlaskConical size={14}/>,
// }[c] ?? <Brain size={14}/>);

// const fmtDate = (iso: string) =>
//   new Date(iso).toLocaleDateString("en-ZA", { day:"numeric", month:"long", year:"numeric" });

// /* ─────────────────────────────────────────────────────────────
//    GLOBAL CSS
// ───────────────────────────────────────────────────────────── */
// const css = `
//   *, *::before, *::after { box-sizing: border-box; }
//   html, body { overflow-x: hidden; max-width: 100vw; }

//   @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
//   @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

//   .fu  { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
//   .d1  { animation-delay:.06s; }
//   .d2  { animation-delay:.13s; }
//   .d3  { animation-delay:.20s; }
//   .d4  { animation-delay:.27s; }
//   .d5  { animation-delay:.34s; }

//   /* ── Start CTA ── */
//   .start-cta {
//     display:flex; align-items:center; justify-content:center; gap:9px;
//     width:100%; padding:15px 0; border:none; border-radius:14px;
//     background:${P}; color:#fff; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
//     box-shadow:0 6px 20px rgba(127,66,231,.3);
//     transition:all .2s cubic-bezier(.34,1.56,.64,1);
//     position:relative; overflow:hidden;
//   }
//   .start-cta::before {
//     content:''; position:absolute; inset:0;
//     background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
//     background-size:300% auto; animation:shimmer 2.2s linear infinite;
//   }
//   .start-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

//   /* ── Back button ── */
//   .back-btn {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:8px 14px; border-radius:10px; border:1.5px solid ${BORDER};
//     background:${WHITE}; color:${INK2}; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
//     transition:all .18s;
//   }
//   .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

//   /* ── Question item ── */
//   .q-item {
//     display:flex; gap:14px; align-items:flex-start;
//     padding:18px 20px;
//     border:1.5px solid ${BORDER}; border-radius:14px;
//     background:${WHITE};
//     transition:border-color .2s, box-shadow .2s, transform .2s;
//   }
//   .q-item:hover {
//     border-color:${PM};
//     box-shadow:0 6px 20px rgba(127,66,231,.08);
//     transform:translateX(3px);
//   }

//   /* ── Share button ── */
//   .share-btn {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:8px 16px; border-radius:10px;
//     border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
//     font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
//     cursor:pointer; transition:all .18s;
//   }
//   .share-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

//   /* ── Chip ── */
//   .chip {
//     display:inline-flex; align-items:center; gap:5px;
//     padding:4px 11px; border-radius:100px;
//     font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600;
//   }

//   /* ── Stat box ── */
//   .stat-box {
//     border:1.5px solid ${BORDER}; border-radius:14px;
//     padding:16px 18px; background:${WHITE};
//     display:flex; flex-direction:column; gap:4px;
//   }

//   /* ── Tag ── */
//   .tag {
//     padding:4px 12px; border-radius:100px;
//     border:1.5px solid ${BORDER}; background:${OFF};
//     font-family:'DM Sans',sans-serif; font-size:12px; color:${INK2};
//   }
// `;

// /* ─────────────────────────────────────────────────────────────
//    SKELETON
// ───────────────────────────────────────────────────────────── */
// const DetailSkeleton = () => (
//   <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
//     <Skeleton width={80} height={36} sx={{ borderRadius:2, mb:3 }}/>
//     <Grid container spacing={4}>
//       <Grid item xs={12} md={8}>
//         <Skeleton width="65%" height={42} sx={{ mb:1.5 }}/>
//         <Skeleton width="90%" height={20} sx={{ mb:.75 }}/>
//         <Skeleton width="75%" height={20} sx={{ mb:3 }}/>
//         <Stack direction="row" spacing={1} mb={4}>
//           {[60,80,70].map(w => <Skeleton key={w} width={w} height={28} sx={{ borderRadius:100 }}/>)}
//         </Stack>
//         {[1,2,3,4,5].map(i => (
//           <Skeleton key={i} height={72} sx={{ borderRadius:2, mb:1.5 }}/>
//         ))}
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <Skeleton height={320} sx={{ borderRadius:3 }}/>
//       </Grid>
//     </Grid>
//   </Box>
// );

// /* ─────────────────────────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────────────────────────── */
// const AIInterviewDetail: React.FC = () => {
//   const { interviewId } = useParams<{ interviewId: string }>();
//   const navigate        = useNavigate();
//   const location        = useLocation();

//   /* ── state ── */
//   const [iv,       setIv]       = useState<AIInterviewDoc | null>(null);
//   const [loading,  setLoading]  = useState(true);
//   const [error,    setError]    = useState<string | null>(null);
//   const [copied,   setCopied]   = useState(false);
//   const [starting, setStarting] = useState(false);

//   /* ── fetch ── */
//   const fetchInterview = useCallback(async () => {
//     if (!interviewId) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await authFetch(`/mentee/practice-details/${interviewId}`);
//       setIv(data.result as AIInterviewDoc);
//     } catch (err: any) {
//       setError(err?.message ?? "Failed to load interview. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [interviewId]);

//   useEffect(() => { fetchInterview(); }, [fetchInterview]);

//   /* ── derived ── */
//   const diffMeta = iv ? difficultyMeta(iv.difficulty) : null;
//   const author   = iv ? creatorName(iv.createdBy)   : "";
//   const photo    = iv ? creatorAvatar(iv.createdBy) : "";
//   const stars    = iv ? Math.round(iv.rating * 2) / 2 : 0; // half-star precision

//   /* ── start practice ── */
//   const handleStart = () => {
//     if (!iv) return;
//     setStarting(true);
//     navigate("/mentee/ai-practice", {
//       state: {
//         interviewId: iv._id,
//         title:       iv.title,
//         questions:   iv.questions,   // full string[] — backend already returns them
//         duration:    iv.duration,
//         category:    iv.category,
//         source:      iv.source,
//       },
//     });
//   };

//   /* ── copy link ── */
//   const handleCopy = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2200);
//     });
//   };

//   /* ── loading ── */
//   if (loading) return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>
//         <DetailSkeleton/>
//       </Box>
//     </>
//   );

//   /* ── error ── */
//   if (error || !iv) return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:WHITE, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", px:2 }}>
//         <Box sx={{ textAlign:"center", maxWidth:400 }}>
//           <Box sx={{ width:56, height:56, borderRadius:"50%", background:REDL, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
//             <AlertCircle size={24} color={RED}/>
//           </Box>
//           <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:1 }}>
//             {error === "This interview is private." ? "Private interview" : "Interview not found"}
//           </Typography>
//           <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7, mb:3 }}>
//             {error ?? "This interview may have been removed or is not available."}
//           </Typography>
//           <Stack direction="row" spacing={1.5} justifyContent="center">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               <ArrowLeft size={14}/> Go back
//             </button>
//             {error !== "This interview is private." && (
//               <button className="back-btn" style={{ borderColor:P, color:P, background:PL }}
//                 onClick={fetchInterview}>
//                 <RefreshCw size={14}/> Retry
//               </button>
//             )}
//           </Stack>
//         </Box>
//       </Box>
//     </>
//   );

//   return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>

//         {/* ── TOP BAR ─────────────────────────────────────── */}
//         <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:{ xs:2, md:6 }, py:1.5, position:"sticky", top:0, background:`${WHITE}E8`, backdropFilter:"blur(12px)", zIndex:10 }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               <ArrowLeft size={14}/> Back to interviews
//             </button>
//             <Stack direction="row" spacing={1}>
//               <button className="share-btn" onClick={handleCopy}>
//                 {copied ? <><CheckCircle2 size={13} color={GRN}/> Copied!</> : <><Share2 size={13}/> Share</>}
//               </button>
//             </Stack>
//           </Stack>
//         </Box>

//         {/* ── BODY ────────────────────────────────────────── */}
//         <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
//           <Grid container spacing={{ xs:3, md:5 }}>

//             {/* ════════════════════════════════════════════
//                 LEFT — interview detail
//             ════════════════════════════════════════════ */}
//             <Grid item xs={12} md={8}>

//               {/* Visibility badge + source indicator */}
//               <Stack direction="row" spacing={1} alignItems="center" mb={2} className="fu">
//                 {iv.source === "private" ? (
//                   <span className="chip" style={{ background:AMBL, color:AMB }}>
//                     <Lock size={11}/> Private
//                   </span>
//                 ) : (
//                   <span className="chip" style={{ background:GRNL, color:GRN }}>
//                     <Globe size={11}/> Community
//                   </span>
//                 )}
//                 {iv.featured && (
//                   <span className="chip" style={{ background:PL, color:P }}>
//                     <Zap size={11}/> Featured
//                   </span>
//                 )}
//                 <span className="chip" style={{ background:OFF, color:INK3 }}>
//                   {categoryIcon(iv.category)} {iv.category.charAt(0).toUpperCase() + iv.category.slice(1)}
//                 </span>
//               </Stack>

//               {/* Title */}
//               <Typography className="fu d1" sx={{
//                 fontFamily:"'Syne',sans-serif", fontWeight:800,
//                 fontSize:{ xs:"1.6rem", md:"2.1rem" },
//                 color:INK, lineHeight:1.1, letterSpacing:"-0.025em", mb:1.5,
//               }}>
//                 {iv.title}
//               </Typography>

//               {/* Description */}
//               <Typography className="fu d2" sx={{
//                 fontSize:{ xs:14.5, md:16 }, color:INK2, lineHeight:1.8, mb:3,
//               }}>
//                 {iv.description}
//               </Typography>

//               {/* Difficulty + duration + meta chips */}
//               <Stack className="fu d3" direction="row" flexWrap="wrap" gap={1} mb={4}>
//                 {diffMeta && (
//                   <span className="chip" style={{ background:diffMeta.bg, color:diffMeta.color }}>
//                     <Brain size={11}/> {diffMeta.label}
//                   </span>
//                 )}
//                 <span className="chip" style={{ background:OFF, color:INK2 }}>
//                   <Clock size={11}/> {iv.duration} min
//                 </span>
//                 <span className="chip" style={{ background:OFF, color:INK2 }}>
//                   <BookOpen size={11}/> {iv.questions.length} questions
//                 </span>
//                 <span className="chip" style={{ background:OFF, color:INK2 }}>
//                   <Users size={11}/> {iv.attempts.toLocaleString()} attempts
//                 </span>
//                 {iv.rating > 0 && (
//                   <span className="chip" style={{ background:AMBL, color:AMB }}>
//                     <Star size={11}/> {iv.rating.toFixed(1)}
//                   </span>
//                 )}
//               </Stack>

//               {/* Tags */}
//               {iv.tags.length > 0 && (
//                 <Stack className="fu d3" direction="row" flexWrap="wrap" gap={.75} mb={4}>
//                   {iv.tags.map(t => <span key={t} className="tag">{t}</span>)}
//                 </Stack>
//               )}

//               {/* Divider */}
//               <Box sx={{ height:1, background:BORDER, mb:4 }} className="fu d3"/>

//               {/* ── QUESTIONS LIST ── */}
//               <Box className="fu d4">
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
//                   <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:INK }}>
//                     Interview Questions
//                   </Typography>
//                   <Typography sx={{ fontSize:12.5, color:INK3 }}>
//                     {iv.questions.length} questions · {iv.duration} min
//                   </Typography>
//                 </Stack>

//                 <Stack spacing={1.5}>
//                   {iv.questions.map((q, i) => (
//                     <div key={i} className="q-item">
//                       {/* Number badge */}
//                       <Box sx={{
//                         width:30, height:30, borderRadius:"8px", flexShrink:0,
//                         background:PL, display:"flex", alignItems:"center", justifyContent:"center",
//                       }}>
//                         <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, fontWeight:700, color:P }}>
//                           {String(i + 1).padStart(2, "0")}
//                         </Typography>
//                       </Box>

//                       {/* Question text */}
//                       <Box flex={1} minWidth={0}>
//                         <Typography sx={{ fontSize:14.5, color:INK, lineHeight:1.65 }}>
//                           {q}
//                         </Typography>
//                       </Box>

//                       {/* Arrow hint */}
//                       <Box sx={{ color:INK3, flexShrink:0, mt:.2 }}>
//                         <ChevronRight size={15}/>
//                       </Box>
//                     </div>
//                   ))}
//                 </Stack>
//               </Box>

//               {/* ── WHAT TO EXPECT ── */}
//               <Box className="fu d5" mt={5}>
//                 <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>
//                   What to expect
//                 </Typography>
//                 <Grid container spacing={2}>
//                   {[
//                     { icon:<Brain size={18} color={P}/>,      title:"AI interviewer",     desc:"The AI adapts follow-up questions based on your answers in real time." },
//                     { icon:<Clock size={18} color={AMB}/>,    title:"Timed session",       desc:`You have ${iv.duration} minutes. The AI tracks pacing and gives feedback.` },
//                     { icon:<CheckCircle2 size={18} color={GRN}/>, title:"Instant feedback", desc:"After each answer you receive a score, suggested improvements, and model answer." },
//                   ].map(({ icon, title, desc }) => (
//                     <Grid item xs={12} sm={4} key={title}>
//                       <Box sx={{ p:2, border:`1.5px solid ${BORDER}`, borderRadius:"14px", height:"100%", background:OFF }}>
//                         <Box mb={1}>{icon}</Box>
//                         <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK, mb:.5 }}>{title}</Typography>
//                         <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.6 }}>{desc}</Typography>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>

//             </Grid>

//             {/* ════════════════════════════════════════════
//                 RIGHT — sticky action card
//             ════════════════════════════════════════════ */}
//             <Grid item xs={12} md={4}>
//               <Box sx={{ position:{ md:"sticky" }, top:{ md:80 } }}>

//                 {/* Action card */}
//                 <Box className="fu d2" sx={{
//                   border:`1.5px solid ${BORDER}`, borderRadius:"18px",
//                   overflow:"hidden", background:WHITE,
//                   boxShadow:"0 8px 32px rgba(127,66,231,.08)",
//                 }}>

//                   {/* Stats row */}
//                   <Box sx={{ borderBottom:`1px solid ${BORDER}`, p:2.5 }}>
//                     <Grid container spacing={1.5}>
//                       {[
//                         { icon:<Users size={15} color={INK3}/>,    val:iv.attempts.toLocaleString(), label:"Attempts" },
//                         { icon:<Clock size={15} color={INK3}/>,    val:`${iv.duration}m`,            label:"Duration" },
//                         { icon:<BookOpen size={15} color={INK3}/>, val:`${iv.questions.length}Q`,    label:"Questions" },
//                         { icon:<Star size={15} color={AMB}/>,      val:iv.rating > 0 ? iv.rating.toFixed(1) : "—", label:"Rating" },
//                       ].map(({ icon, val, label }) => (
//                         <Grid item xs={6} key={label}>
//                           <div className="stat-box">
//                             <Box sx={{ display:"flex", alignItems:"center", gap:.5, mb:.25 }}>{icon}</Box>
//                             <Typography sx={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:16, color:INK }}>
//                               {val}
//                             </Typography>
//                             <Typography sx={{ fontSize:11.5, color:INK3 }}>{label}</Typography>
//                           </div>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Box>

//                   {/* Creator */}
//                   <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
//                     <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1.25 }}>
//                       Created by
//                     </Typography>
//                     <Stack direction="row" spacing={1.5} alignItems="center">
//                       <Avatar src={photo} sx={{ width:36, height:36 }}>
//                         {author[0] ?? "C"}
//                       </Avatar>
//                       <Box>
//                         <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK }}>{author}</Typography>
//                         <Typography sx={{ fontSize:12, color:INK3 }}>
//                           Published {fmtDate(iv.createdAt)}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                   </Box>

//                   {/* Difficulty */}
//                   {diffMeta && (
//                     <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
//                       <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1 }}>
//                         Difficulty
//                       </Typography>
//                       <Stack direction="row" spacing={.75} alignItems="center">
//                         <Box sx={{ width:8, height:8, borderRadius:"50%", bgcolor:diffMeta.color }}/>
//                         <Typography sx={{ fontSize:13.5, fontWeight:600, color:diffMeta.color }}>
//                           {diffMeta.label}
//                         </Typography>
//                       </Stack>
//                     </Box>
//                   )}

//                   {/* CTA */}
//                   <Box sx={{ p:2.5 }}>
//                     <button
//                       className="start-cta"
//                       onClick={handleStart}
//                       disabled={starting}
//                     >
//                       {starting
//                         ? <Box sx={{ width:18, height:18, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
//                         : <Play size={17} fill="#fff"/>
//                       }
//                       {starting ? "Starting…" : "Start Interview"}
//                     </button>

//                     <Typography sx={{ fontSize:12, color:INK3, textAlign:"center", mt:1.5, lineHeight:1.6 }}>
//                       Answers are evaluated by AI. You'll receive instant feedback after each response.
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Tips card */}
//                 <Box className="fu d3" mt={2.5} sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"16px", p:2.5, background:OFF }}>
//                   <Typography sx={{ fontWeight:700, fontSize:13, color:INK, mb:1.5 }}>
//                     💡 Tips before you start
//                   </Typography>
//                   <Stack spacing={1.25}>
//                     {[
//                       "Use the STAR method — Situation, Task, Action, Result.",
//                       "Speak your answer aloud if possible — fluency matters.",
//                       "It's okay to take 5 seconds before responding.",
//                       "Be specific with examples rather than speaking generally.",
//                     ].map((tip, i) => (
//                       <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
//                         <Box sx={{ width:5, height:5, borderRadius:"50%", bgcolor:P, mt:".55em", flexShrink:0 }}/>
//                         <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.65 }}>{tip}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                 </Box>

//               </Box>
//             </Grid>

//           </Grid>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AIInterviewDetail;











import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Stack, Grid, Skeleton, Avatar } from "@mui/material";
import {
  ArrowLeft, Brain, Clock, Users, Star, BookOpen,
  Globe, Lock, Play, Share2, CheckCircle2, Copy,
  ChevronRight, BarChart2, Zap, RefreshCw, AlertCircle,
  Code2, Briefcase, FlaskConical, Megaphone, TrendingUp,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   API
───────────────────────────────────────────────────────────── */
const API_BASE             = "http://localhost:5005";
const INTERVIEW_ENDPOINT   = `${API_BASE}/api/v1/mentee/practice-details`;
// console.log(INTERVIEW_ENDPOINT)
/* ─────────────────────────────────────────────────────────────
   TOKENS  — identical to aiInterviews.tsx so pages feel unified
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
   TYPES  — mirrors APIInterview + source field from update.tsx
───────────────────────────────────────────────────────────── */
interface CreatedBy {
  _id?:    string;
  name?:   string;
  surname?:string;
  avatar?: string;
}

interface AIInterviewDoc {
  _id:        string;
  createdBy:  CreatedBy | string;
  title:      string;
  description:string;
  category:   string;
  difficulty: string;
  duration:   number;
  isPublic:   boolean;
  questions:  string[];
  attempts:   number;
  rating:     number;
  featured:   boolean;
  tags:       string[];
  createdAt:  string;
  source:     "community" | "private";  // injected by getSingleAIInterview
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
const creatorName = (cb: CreatedBy | string): string => {
  if (!cb) return "Community";
  if (typeof cb === "string") return "Community";
  return `${cb.name ?? ""} ${cb.surname ?? ""}`.trim() || "Community";
};

const creatorAvatar = (cb: CreatedBy | string): string => {
  const name = typeof cb === "object" && cb !== null
    ? (cb.name ?? "U")
    : "U";
  const photo = typeof cb === "object" && cb !== null ? cb.avatar : undefined;
  return photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F42E7&color=fff`;
};

const difficultyMeta = (d: string) => ({
  beginner:     { label: "Beginner",     bg: GRNL,  color: GRN },
  intermediate: { label: "Intermediate", bg: AMBL,  color: AMB },
  advanced:     { label: "Advanced",     bg: REDL,  color: RED },
}[d] ?? { label: d, bg: PL, color: P });

const categoryIcon = (c: string) => ({
  technical:   <Code2     size={14}/>,
  behavioural: <Brain     size={14}/>,
  product:     <Briefcase size={14}/>,
  data:        <BarChart2 size={14}/>,
  marketing:   <Megaphone size={14}/>,
  finance:     <TrendingUp size={14}/>,
  science:     <FlaskConical size={14}/>,
}[c] ?? <Brain size={14}/>);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-ZA", { day:"numeric", month:"long", year:"numeric" });

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .fu  { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.06s; }
  .d2  { animation-delay:.13s; }
  .d3  { animation-delay:.20s; }
  .d4  { animation-delay:.27s; }
  .d5  { animation-delay:.34s; }

  /* ── Start CTA ── */
  .start-cta {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:15px 0; border:none; border-radius:14px;
    background:${P}; color:#fff; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
    box-shadow:0 6px 20px rgba(127,66,231,.3);
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    position:relative; overflow:hidden;
  }
  .start-cta::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    background-size:300% auto; animation:shimmer 2.2s linear infinite;
  }
  .start-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

  /* ── Back button ── */
  .back-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 14px; border-radius:10px; border:1.5px solid ${BORDER};
    background:${WHITE}; color:${INK2}; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
    transition:all .18s;
  }
  .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  /* ── Question item ── */
  .q-item {
    display:flex; gap:14px; align-items:flex-start;
    padding:18px 20px;
    border:1.5px solid ${BORDER}; border-radius:14px;
    background:${WHITE};
    transition:border-color .2s, box-shadow .2s, transform .2s;
  }
  .q-item:hover {
    border-color:${PM};
    box-shadow:0 6px 20px rgba(127,66,231,.08);
    transform:translateX(3px);
  }

  /* ── Share button ── */
  .share-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 16px; border-radius:10px;
    border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    cursor:pointer; transition:all .18s;
  }
  .share-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  /* ── Chip ── */
  .chip {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 11px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600;
  }

  /* ── Stat box ── */
  .stat-box {
    border:1.5px solid ${BORDER}; border-radius:14px;
    padding:16px 18px; background:${WHITE};
    display:flex; flex-direction:column; gap:4px;
  }

  /* ── Tag ── */
  .tag {
    padding:4px 12px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${OFF};
    font-family:'DM Sans',sans-serif; font-size:12px; color:${INK2};
  }
`;

/* ─────────────────────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────────────────── */
const DetailSkeleton = () => (
  <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
    <Skeleton width={80} height={36} sx={{ borderRadius:2, mb:3 }}/>
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Skeleton width="65%" height={42} sx={{ mb:1.5 }}/>
        <Skeleton width="90%" height={20} sx={{ mb:.75 }}/>
        <Skeleton width="75%" height={20} sx={{ mb:3 }}/>
        <Stack direction="row" spacing={1} mb={4}>
          {[60,80,70].map(w => <Skeleton key={w} width={w} height={28} sx={{ borderRadius:100 }}/>)}
        </Stack>
        {[1,2,3,4,5].map(i => (
          <Skeleton key={i} height={72} sx={{ borderRadius:2, mb:1.5 }}/>
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Skeleton height={320} sx={{ borderRadius:3 }}/>
      </Grid>
    </Grid>
  </Box>
);

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
const AIInterviewDetail: React.FC = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  
  const navigate        = useNavigate();
  const location        = useLocation();

  /* ── state ── */
  const [iv,       setIv]       = useState<AIInterviewDoc | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [copied,   setCopied]   = useState(false);
  const [starting, setStarting] = useState(false);

  /* ── fetch — mirrors professionalDetails pattern exactly ── */
  useEffect(() => {
    if (!interviewId) {
      setError("Invalid interview ID.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchInterview = async () => {
      try {
        const res = await axios.get<{ result: AIInterviewDoc }>(
            INTERVIEW_ENDPOINT,
        //   `${INTERVIEW_ENDPOINT}/${interviewId}`,
          { params: { _id: _id }}
        );


        if (!cancelled) {
          setIv(res.data.result ?? null);
          if (!res.data.result) setError("Interview not found.");
        }
      } catch (err) {
        if (!cancelled) {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            setError("This interview could not be found.");
          } else if (axios.isAxiosError(err) && err.response?.status === 403) {
            setError("This interview is private.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchInterview();
    return () => { cancelled = true; };
  }, [interviewId]);

  /* ── derived ── */
  const diffMeta = iv ? difficultyMeta(iv.difficulty) : null;
  const author   = iv ? creatorName(iv.createdBy)   : "";
  const photo    = iv ? creatorAvatar(iv.createdBy) : "";
  const stars    = iv ? Math.round(iv.rating * 2) / 2 : 0; // half-star precision

  /* ── start practice ── */
  const handleStart = () => {
    if (!iv) return;
    setStarting(true);
    navigate("/mentee/ai-practice", {
      state: {
        interviewId: iv._id,
        title:       iv.title,
        questions:   iv.questions,   // full string[] — backend already returns them
        duration:    iv.duration,
        category:    iv.category,
        source:      iv.source,
      },
    });
  };

  /* ── copy link ── */
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

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
  if (error || !iv) return (
    <>
      <style>{css}</style>
      <Box sx={{ background:WHITE, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", px:2 }}>
        <Box sx={{ textAlign:"center", maxWidth:400 }}>
          <Box sx={{ width:56, height:56, borderRadius:"50%", background:REDL, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
            <AlertCircle size={24} color={RED}/>
          </Box>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:1 }}>
            {error === "This interview is private." ? "Private interview" : "Interview not found"}
          </Typography>
          <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7, mb:3 }}>
            {error ?? "This interview may have been removed or is not available."}
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={14}/> Go back
            </button>
            {error !== "This interview is private." && (
              <button className="back-btn" style={{ borderColor:P, color:P, background:PL }}
                onClick={() => window.location.reload()}>
                <RefreshCw size={14}/> Retry
              </button>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background:WHITE, minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>

        {/* ── TOP BAR ─────────────────────────────────────── */}
        <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:{ xs:2, md:6 }, py:1.5, position:"sticky", top:0, background:`${WHITE}E8`, backdropFilter:"blur(12px)", zIndex:10 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={14}/> Back to interviews
            </button>
            <Stack direction="row" spacing={1}>
              <button className="share-btn" onClick={handleCopy}>
                {copied ? <><CheckCircle2 size={13} color={GRN}/> Copied!</> : <><Share2 size={13}/> Share</>}
              </button>
            </Stack>
          </Stack>
        </Box>

        {/* ── BODY ────────────────────────────────────────── */}
        <Box sx={{ px:{ xs:2, md:6 }, py:{ xs:4, md:6 }, maxWidth:"1100px", mx:"auto" }}>
          <Grid container spacing={{ xs:3, md:5 }}>

            {/* ════════════════════════════════════════════
                LEFT — interview detail
            ════════════════════════════════════════════ */}
            <Grid item xs={12} md={8}>

              {/* Visibility badge + source indicator */}
              <Stack direction="row" spacing={1} alignItems="center" mb={2} className="fu">
                {iv.source === "private" ? (
                  <span className="chip" style={{ background:AMBL, color:AMB }}>
                    <Lock size={11}/> Private
                  </span>
                ) : (
                  <span className="chip" style={{ background:GRNL, color:GRN }}>
                    <Globe size={11}/> Community
                  </span>
                )}
                {iv.featured && (
                  <span className="chip" style={{ background:PL, color:P }}>
                    <Zap size={11}/> Featured
                  </span>
                )}
                <span className="chip" style={{ background:OFF, color:INK3 }}>
                  {categoryIcon(iv.category)} {iv.category.charAt(0).toUpperCase() + iv.category.slice(1)}
                </span>
              </Stack>

              {/* Title */}
              <Typography className="fu d1" sx={{
                fontFamily:"'Syne',sans-serif", fontWeight:800,
                fontSize:{ xs:"1.6rem", md:"2.1rem" },
                color:INK, lineHeight:1.1, letterSpacing:"-0.025em", mb:1.5,
              }}>
                {iv.title}
              </Typography>

              {/* Description */}
              <Typography className="fu d2" sx={{
                fontSize:{ xs:14.5, md:16 }, color:INK2, lineHeight:1.8, mb:3,
              }}>
                {iv.description}
              </Typography>

              {/* Difficulty + duration + meta chips */}
              <Stack className="fu d3" direction="row" flexWrap="wrap" gap={1} mb={4}>
                {diffMeta && (
                  <span className="chip" style={{ background:diffMeta.bg, color:diffMeta.color }}>
                    <Brain size={11}/> {diffMeta.label}
                  </span>
                )}
                <span className="chip" style={{ background:OFF, color:INK2 }}>
                  <Clock size={11}/> {iv.duration} min
                </span>
                <span className="chip" style={{ background:OFF, color:INK2 }}>
                  <BookOpen size={11}/> {iv.questions.length} questions
                </span>
                <span className="chip" style={{ background:OFF, color:INK2 }}>
                  <Users size={11}/> {iv.attempts.toLocaleString()} attempts
                </span>
                {iv.rating > 0 && (
                  <span className="chip" style={{ background:AMBL, color:AMB }}>
                    <Star size={11}/> {iv.rating.toFixed(1)}
                  </span>
                )}
              </Stack>

              {/* Tags */}
              {iv.tags.length > 0 && (
                <Stack className="fu d3" direction="row" flexWrap="wrap" gap={.75} mb={4}>
                  {iv.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </Stack>
              )}

              {/* Divider */}
              <Box sx={{ height:1, background:BORDER, mb:4 }} className="fu d3"/>

              {/* ── QUESTIONS LIST ── */}
              <Box className="fu d4">
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:INK }}>
                    Interview Questions
                  </Typography>
                  <Typography sx={{ fontSize:12.5, color:INK3 }}>
                    {iv.questions.length} questions · {iv.duration} min
                  </Typography>
                </Stack>

                <Stack spacing={1.5}>
                  {iv.questions.map((q, i) => (
                    <div key={i} className="q-item">
                      {/* Number badge */}
                      <Box sx={{
                        width:30, height:30, borderRadius:"8px", flexShrink:0,
                        background:PL, display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:11.5, fontWeight:700, color:P }}>
                          {String(i + 1).padStart(2, "0")}
                        </Typography>
                      </Box>

                      {/* Question text */}
                      <Box flex={1} minWidth={0}>
                        <Typography sx={{ fontSize:14.5, color:INK, lineHeight:1.65 }}>
                          {q}
                        </Typography>
                      </Box>

                      {/* Arrow hint */}
                      <Box sx={{ color:INK3, flexShrink:0, mt:.2 }}>
                        <ChevronRight size={15}/>
                      </Box>
                    </div>
                  ))}
                </Stack>
              </Box>

              {/* ── WHAT TO EXPECT ── */}
              <Box className="fu d5" mt={5}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>
                  What to expect
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { icon:<Brain size={18} color={P}/>,      title:"AI interviewer",     desc:"The AI adapts follow-up questions based on your answers in real time." },
                    { icon:<Clock size={18} color={AMB}/>,    title:"Timed session",       desc:`You have ${iv.duration} minutes. The AI tracks pacing and gives feedback.` },
                    { icon:<CheckCircle2 size={18} color={GRN}/>, title:"Instant feedback", desc:"After each answer you receive a score, suggested improvements, and model answer." },
                  ].map(({ icon, title, desc }) => (
                    <Grid item xs={12} sm={4} key={title}>
                      <Box sx={{ p:2, border:`1.5px solid ${BORDER}`, borderRadius:"14px", height:"100%", background:OFF }}>
                        <Box mb={1}>{icon}</Box>
                        <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK, mb:.5 }}>{title}</Typography>
                        <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.6 }}>{desc}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

            </Grid>

            {/* ════════════════════════════════════════════
                RIGHT — sticky action card
            ════════════════════════════════════════════ */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position:{ md:"sticky" }, top:{ md:80 } }}>

                {/* Action card */}
                <Box className="fu d2" sx={{
                  border:`1.5px solid ${BORDER}`, borderRadius:"18px",
                  overflow:"hidden", background:WHITE,
                  boxShadow:"0 8px 32px rgba(127,66,231,.08)",
                }}>

                  {/* Stats row */}
                  <Box sx={{ borderBottom:`1px solid ${BORDER}`, p:2.5 }}>
                    <Grid container spacing={1.5}>
                      {[
                        { icon:<Users size={15} color={INK3}/>,    val:iv.attempts.toLocaleString(), label:"Attempts" },
                        { icon:<Clock size={15} color={INK3}/>,    val:`${iv.duration}m`,            label:"Duration" },
                        { icon:<BookOpen size={15} color={INK3}/>, val:`${iv.questions.length}Q`,    label:"Questions" },
                        { icon:<Star size={15} color={AMB}/>,      val:iv.rating > 0 ? iv.rating.toFixed(1) : "—", label:"Rating" },
                      ].map(({ icon, val, label }) => (
                        <Grid item xs={6} key={label}>
                          <div className="stat-box">
                            <Box sx={{ display:"flex", alignItems:"center", gap:.5, mb:.25 }}>{icon}</Box>
                            <Typography sx={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:16, color:INK }}>
                              {val}
                            </Typography>
                            <Typography sx={{ fontSize:11.5, color:INK3 }}>{label}</Typography>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Creator */}
                  <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
                    <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1.25 }}>
                      Created by
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={photo} sx={{ width:36, height:36 }}>
                        {author[0] ?? "C"}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight:700, fontSize:13.5, color:INK }}>{author}</Typography>
                        <Typography sx={{ fontSize:12, color:INK3 }}>
                          Published {fmtDate(iv.createdAt)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Difficulty */}
                  {diffMeta && (
                    <Box sx={{ borderBottom:`1px solid ${BORDER}`, px:2.5, py:2 }}>
                      <Typography sx={{ fontSize:11.5, color:INK3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", mb:1 }}>
                        Difficulty
                      </Typography>
                      <Stack direction="row" spacing={.75} alignItems="center">
                        <Box sx={{ width:8, height:8, borderRadius:"50%", bgcolor:diffMeta.color }}/>
                        <Typography sx={{ fontSize:13.5, fontWeight:600, color:diffMeta.color }}>
                          {diffMeta.label}
                        </Typography>
                      </Stack>
                    </Box>
                  )}

                  {/* CTA */}
                  <Box sx={{ p:2.5 }}>
                    <button
                      className="start-cta"
                      onClick={handleStart}
                      disabled={starting}
                    >
                      {starting
                        ? <Box sx={{ width:18, height:18, border:"2px solid rgba(255,255,255,.4)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
                        : <Play size={17} fill="#fff"/>
                      }
                      {starting ? "Starting…" : "Start Interview"}
                    </button>

                    <Typography sx={{ fontSize:12, color:INK3, textAlign:"center", mt:1.5, lineHeight:1.6 }}>
                      Answers are evaluated by AI. You'll receive instant feedback after each response.
                    </Typography>
                  </Box>
                </Box>

                {/* Tips card */}
                <Box className="fu d3" mt={2.5} sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"16px", p:2.5, background:OFF }}>
                  <Typography sx={{ fontWeight:700, fontSize:13, color:INK, mb:1.5 }}>
                    💡 Tips before you start
                  </Typography>
                  <Stack spacing={1.25}>
                    {[
                      "Use the STAR method — Situation, Task, Action, Result.",
                      "Speak your answer aloud if possible — fluency matters.",
                      "It's okay to take 5 seconds before responding.",
                      "Be specific with examples rather than speaking generally.",
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

export default AIInterviewDetail;
