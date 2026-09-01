import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Users, ArrowLeft, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   PROFESSIONALS — COMING SOON
   The real implementation is fully preserved below this
   component, commented out line-by-line (not block-commented,
   since the original file has its own internal /* *\/ comments
   that would otherwise terminate a wrapping block comment early).

   TO RESTORE THE REAL PAGE ONCE IT'S READY:
   1. Delete this ComingSoon component (and its imports above)
      and the `export default ComingSoon;` line right below it.
   2. Select the entire commented block beneath the divider and
      toggle-uncomment it (Ctrl+/ or Cmd+/ in VS Code selects and
      un-comments every line at once).
   3. That block already ends with `export default Professionals;`
      — nothing else to change.
───────────────────────────────────────────────────────────── */

const P    = "#7F42E7";
const PD   = "#5E2EC5";
const PL   = "#F0EAFD";
const INK  = "#0D0D12";
const INK2 = "#4A4A5A";
const BORDER = "#E8E3F5";
const WHITE  = "#FFFFFF";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: WHITE, minHeight: "100vh", minWidth: 0,
        fontFamily: "'DM Sans',sans-serif", overflowX: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        px: 3, py: 8,
      }}
    >
      <Box sx={{ maxWidth: 460, textAlign: "center" }}>
        <Box
          sx={{
            width: 72, height: 72, borderRadius: "50%", background: PL,
            display: "flex", alignItems: "center", justifyContent: "center",
            mx: "auto", mb: 3,
          }}
        >
          <Users size={30} color={P} />
        </Box>

        <Box
          sx={{
            display: "inline-flex", alignItems: "center", gap: 0.6,
            border: `1px solid ${BORDER}`, borderRadius: "100px",
            px: 1.75, py: 0.5, mb: 2.5, color: P, fontSize: 12.5, fontWeight: 700,
          }}
        >
          <Sparkles size={12} />
          Coming soon
        </Box>

        <Typography
          sx={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: { xs: "1.6rem", md: "1.9rem" }, color: INK,
            letterSpacing: "-0.02em", mb: 1.5, lineHeight: 1.3,
          }}
        >
          Real mock interviews with industry professionals
        </Typography>

        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.75, mb: 4 }}>
          We're putting the finishing touches on booking real sessions with professionals.
          It'll be here soon — in the meantime, an AI mock interview is a great way to keep
          sharpening your answers.
        </Typography>

        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "inline-flex", alignItems: "center", gap: 0.75,
            px: 3, py: 1.4, borderRadius: "100px",
            border: `1.5px solid ${BORDER}`, color: INK2,
            fontSize: 13.5, fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s",
            "&:hover": { borderColor: P, color: P, background: PL },
          }}
        >
          <ArrowLeft size={15} />
          Go back
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;








// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box, Typography, Grid, Avatar, Stack, Drawer, Skeleton,
// } from "@mui/material";
// import {
//   Search, SlidersHorizontal, X, Star, Zap, Heart,
//   BookOpen, AlertCircle, RefreshCw, ChevronRight,
// } from "lucide-react";

// /* ─── API ────────────────────────────────────────────────── */
// const API_BASE = "http://localhost:1000/api/v1";

// // Single source of truth for the mentee-professionals route — same
// // authFetch pattern used by AIInterviewHome, so auth handling (cookie +
// // Authorization header) doesn't have to be independently maintained here.
// const PROFESSIONALS_ENDPOINT = "/mentee/professionals";

// const authFetch = async (path: string, opts: RequestInit = {}) => {
//   const token = localStorage.getItem("token") ?? "";
//   const res = await fetch(`${API_BASE}${path}`, {
//     ...opts,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(opts.headers ?? {}),
//     },
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed ${res.status}`);
//   return data;
// };

// /* ─────────────────────────────────────────────────────────────
//    TOKENS — identical to ProfessionalCardDetails
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
//    CONSTANTS
// ───────────────────────────────────────────────────────────── */
// const MAX_PRICE     = 300;
// const ITEMS_PER_PAGE = 8;

// /* ─────────────────────────────────────────────────────────────
//    TYPES
// ───────────────────────────────────────────────────────────── */
// interface Professional {
//   _id:                 string;
//   name:                string;
//   surname:             string;
//   image?:              string;
//   currentJobTitle?:    string;
//   companyName?:        string;
//   interviewFocusArea?: string[];
//   experienceLevel?:    string[];
//   aboutUser?:          string;
//   price?:              number;
//   rating?:             number;
//   reviews?:            number;
//   availability?:       string[];
//   skills?:             string[];
//   field?:              string;
//   instantBooking?:     boolean;
// }

// interface FilterState {
//   priceRange: [number, number];
//   minRating:  number;
//   sortBy:     string;
// }

// /* ─────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────── */
// const getInitials = (name = "", surname = "") =>
//   `${name[0] ?? ""}${surname[0] ?? ""}`.toUpperCase();

// const fmtRating = (r?: number) => Number((r ?? 4.5).toFixed(1));

// const avatarUrl = (name: string, photo?: string) =>
//   photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F42E7&color=fff`;

// const getBadge = (rating: number, reviews: number) => {
//   if (rating >= 4.8 && reviews >= 100) return { label: "Top Rated", bg: AMBL,  color: AMB };
//   if (rating >= 4.5 && reviews >= 20)  return { label: "Rising",    bg: PL,    color: P   };
//   return null;
// };

// /* ─────────────────────────────────────────────────────────────
//    GLOBAL CSS
// ───────────────────────────────────────────────────────────── */
// const css = `
//   *, *::before, *::after { box-sizing: border-box; }
//   html, body { overflow-x: hidden; max-width: 100vw; }

//   @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
//   .fu { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
//   .d1 { animation-delay:.06s; } .d2 { animation-delay:.12s; }
//   .d3 { animation-delay:.18s; } .d4 { animation-delay:.24s; }

//   /* ── Search ── */
//   .search-wrap { position:relative; flex:1; min-width:200px; }
//   .search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:${INK3}; pointer-events:none; }
//   .search-input {
//     width:100%; padding:10px 14px 10px 38px;
//     border:1.5px solid ${BORDER}; border-radius:12px;
//     font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
//     background:${WHITE}; outline:none; transition:border-color .18s;
//   }
//   .search-input:focus { border-color:${P}; }
//   .search-input::placeholder { color:${INK3}; }

//   /* ── Buttons ── */
//   .filter-btn {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:10px 16px; border:1.5px solid ${BORDER}; border-radius:12px;
//     font-family:'DM Sans',sans-serif; font-size:13px; color:${INK2};
//     background:${WHITE}; cursor:pointer; font-weight:500;
//     transition:all .18s; white-space:nowrap; flex-shrink:0;
//   }
//   .filter-btn:hover  { border-color:${P}; color:${P}; background:${PL}; }
//   .filter-btn.active { border-color:${P}; color:${P}; background:${PL}; font-weight:700; }

//   .icon-btn {
//     display:inline-flex; align-items:center; justify-content:center;
//     width:32px; height:32px; border-radius:8px; border:none;
//     background:rgba(255,255,255,.9); cursor:pointer;
//     transition:background .15s, transform .15s;
//   }
//   .icon-btn:hover { background:${WHITE}; transform:scale(1.08); }

//   .apply-cta {
//     display:flex; align-items:center; justify-content:center; gap:8px;
//     width:100%; padding:14px; border:none; border-radius:14px;
//     background:${P}; color:#fff; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
//     box-shadow:0 6px 20px rgba(127,66,231,.28);
//     transition:all .2s;
//   }
//   .apply-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

//   .clear-btn {
//     display:inline-flex; align-items:center; gap:5px;
//     padding:10px 16px; border:1.5px solid ${BORDER}; border-radius:12px;
//     font-family:'DM Sans',sans-serif; font-size:13px; color:${INK3};
//     background:${WHITE}; cursor:pointer; font-weight:500;
//     transition:all .18s; flex-shrink:0;
//   }
//   .clear-btn:hover { border-color:${BORDER}; color:${INK2}; }

//   /* ── Category pill ── */
//   .cat-pill {
//     padding:6px 16px; border-radius:100px; flex-shrink:0;
//     border:1.5px solid ${BORDER}; background:${WHITE};
//     font-family:'DM Sans',sans-serif; font-size:13px;
//     color:${INK2}; cursor:pointer; font-weight:500;
//     transition:all .15s; white-space:nowrap;
//   }
//   .cat-pill:hover  { border-color:${PM}; color:${P}; }
//   .cat-pill.active { border-color:${P}; background:${PL}; color:${P}; font-weight:700; }

//   /* ── Pro card ── */
//   .pro-card {
//     border:1.5px solid ${BORDER}; border-radius:18px;
//     background:${WHITE}; cursor:pointer; overflow:hidden;
//     display:flex; flex-direction:column; height:100%;
//     transition:border-color .2s, box-shadow .2s, transform .2s;
//   }
//   .pro-card:hover {
//     border-color:${PM};
//     box-shadow:0 8px 28px rgba(127,66,231,.09);
//     transform:translateY(-3px);
//   }

//   .pro-card-img {
//     width:100%; height:180px; object-fit:cover;
//     transition:transform .3s ease;
//   }
//   .pro-card:hover .pro-card-img { transform:scale(1.04); }

//   .pro-card-img-placeholder {
//     width:100%; height:180px;
//     background:${PL};
//     display:flex; align-items:center; justify-content:center;
//   }

//   /* ── Chip ── */
//   .chip {
//     display:inline-flex; align-items:center; gap:4px;
//     padding:3px 10px; border-radius:100px;
//     font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
//   }

//   /* ── Tag ── */
//   .tag {
//     padding:3px 10px; border-radius:100px;
//     border:1.5px solid ${BORDER}; background:${OFF};
//     font-family:'DM Sans',sans-serif; font-size:11.5px; color:${INK2};
//   }

//   /* ── Drawer chip ── */
//   .drawer-chip {
//     padding:7px 14px; border-radius:100px;
//     border:1.5px solid ${BORDER}; background:${OFF};
//     font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500;
//     color:${INK2}; cursor:pointer; transition:all .15s;
//   }
//   .drawer-chip.on { border-color:${P}; color:${P}; background:${PL}; font-weight:700; }
//   .drawer-chip:hover { border-color:${PM}; }

//   /* ── Star row ── */
//   .stars { display:inline-flex; gap:2px; align-items:center; }

//   /* ── Pagination ── */
//   .page-btn {
//     display:inline-flex; align-items:center; justify-content:center;
//     width:36px; height:36px; border-radius:10px;
//     border:1.5px solid ${BORDER}; background:${WHITE};
//     font-family:'DM Mono',monospace; font-size:13px; font-weight:600; color:${INK2};
//     cursor:pointer; transition:all .15s;
//   }
//   .page-btn:hover  { border-color:${PM}; color:${P}; background:${PL}; }
//   .page-btn.active { border-color:${P}; background:${P}; color:#fff; }
//   .page-btn:disabled { opacity:.35; cursor:default; pointer-events:none; }

//   /* ── Back btn ── */
//   .back-btn {
//     display:inline-flex; align-items:center; gap:6px;
//     padding:8px 14px; border-radius:10px;
//     border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
//     cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
//     transition:all .18s;
//   }
//   .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

//   /* ── Drawer slider ── */
//   .range-row { display:flex; gap:10px; margin-top:10px; }
//   .range-box {
//     flex:1; border:1.5px solid ${BORDER}; border-radius:10px;
//     padding:8px 12px; text-align:center; background:${OFF};
//   }

//   /* ── Scrollbar ── */
//   ::-webkit-scrollbar { width:5px; }
//   ::-webkit-scrollbar-track { background:transparent; }
//   ::-webkit-scrollbar-thumb { background:${BORDER}; border-radius:4px; }

//   /* ── Cat bar hide scrollbar ── */
//   .cat-bar { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; }
//   .cat-bar::-webkit-scrollbar { display:none; }
// `;

// /* ─────────────────────────────────────────────────────────────
//    STAR ROW
// ───────────────────────────────────────────────────────────── */
// const StarRow = ({ value, size = 13 }: { value: number; size?: number }) => (
//   <span className="stars">
//     {Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         size={size}
//         color={AMB}
//         fill={value >= i + 0.5 ? AMB : "none"}
//         style={{ opacity: value >= i + 0.5 ? 1 : 0.22 }}
//       />
//     ))}
//   </span>
// );

// /* ─────────────────────────────────────────────────────────────
//    SKELETON CARD
// ───────────────────────────────────────────────────────────── */
// const SkeletonCard = () => (
//   <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "18px", overflow: "hidden", background: WHITE }}>
//     <Skeleton variant="rectangular" height={180} sx={{ bgcolor: "#F0EAFD33" }}/>
//     <Box p={2}>
//       <Stack direction="row" spacing={1.25} alignItems="center" mb={1.5}>
//         <Skeleton variant="circular" width={32} height={32}/>
//         <Skeleton width="50%" height={14}/>
//       </Stack>
//       <Skeleton width="90%" height={13} sx={{ mb: .5 }}/>
//       <Skeleton width="70%" height={13} sx={{ mb: 1.5 }}/>
//       <Box sx={{ height: 1, background: BORDER, mb: 1.5 }}/>
//       <Stack direction="row" justifyContent="space-between">
//         <Skeleton width="35%" height={13}/>
//         <Skeleton width="25%" height={13}/>
//       </Stack>
//     </Box>
//   </Box>
// );

// /* ─────────────────────────────────────────────────────────────
//    PRO CARD
// ───────────────────────────────────────────────────────────── */
// const ProCard = ({
//   pro, onClick,
// }: { pro: Professional; onClick: () => void }) => {
//   const rating  = fmtRating(pro.rating);
//   const reviews = pro.reviews ?? 0;
//   const price   = pro.price ?? 250;
//   const badge   = getBadge(rating, reviews);
//   const photo   = avatarUrl(`${pro.name} ${pro.surname}`, pro.image);
//   const [liked, setLiked] = useState(false);

//   return (
//     <div className="pro-card fu" onClick={onClick}>
//       {/* Image */}
//       <Box sx={{ position: "relative", flexShrink: 0, overflow: "hidden" }}>
//         {pro.image ? (
//           <img src={pro.image} alt={pro.name} className="pro-card-img"/>
//         ) : (
//           <div className="pro-card-img-placeholder">
//             <Avatar sx={{ width: 72, height: 72, bgcolor: P, fontSize: 22, fontWeight: 700 }}>
//               {getInitials(pro.name, pro.surname)}
//             </Avatar>
//           </div>
//         )}

//         {/* Save */}
//         <button
//           className="icon-btn"
//           style={{ position: "absolute", top: 10, right: 10 }}
//           onClick={e => { e.stopPropagation(); setLiked(v => !v); }}
//         >
//           <Heart size={15} color={liked ? RED : INK2} fill={liked ? RED : "none"}/>
//         </button>

//         {/* Instant badge */}
//         {pro.instantBooking && (
//           <span
//             className="chip"
//             style={{ position: "absolute", top: 10, left: 10, background: P, color: "#fff" }}
//           >
//             <Zap size={10}/> Instant
//           </span>
//         )}
//       </Box>

//       {/* Body */}
//       <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1 }}>
//         {/* Name row */}
//         <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//           <Avatar src={photo} sx={{ width: 28, height: 28, bgcolor: P, fontSize: 11 }}>
//             {getInitials(pro.name, pro.surname)}
//           </Avatar>
//           <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, flex: 1 }} noWrap>
//             {pro.name} {pro.surname}
//           </Typography>
//           {badge && (
//             <span className="chip" style={{ background: badge.bg, color: badge.color, flexShrink: 0 }}>
//               {badge.label}
//             </span>
//           )}
//         </Stack>

//         {/* Title */}
//         {pro.currentJobTitle && (
//           <Typography sx={{ fontSize: 12.5, color: INK3, mb: .75 }} noWrap>
//             {pro.currentJobTitle}{pro.companyName ? ` · ${pro.companyName}` : ""}
//           </Typography>
//         )}

//         {/* Focus tags */}
//         {(pro.interviewFocusArea?.length ?? 0) > 0 && (
//           <Stack direction="row" flexWrap="wrap" gap={0.6} mb={1.25}>
//             {pro.interviewFocusArea!.slice(0, 2).map((t, i) => (
//               <span key={i} className="tag">{t}</span>
//             ))}
//           </Stack>
//         )}

//         {/* Footer */}
//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Stack direction="row" spacing={0.5} alignItems="center">
//             {reviews > 0 ? (
//               <>
//                 <StarRow value={rating}/>
//                 <Typography sx={{ fontWeight: 700, fontSize: 12, color: AMB }}>{rating}</Typography>
//                 <Typography sx={{ fontSize: 11.5, color: INK3 }}>({reviews})</Typography>
//               </>
//             ) : (
//               <span className="chip" style={{ background: GRNL, color: GRN }}>New</span>
//             )}
//           </Stack>
//           <Box sx={{ textAlign: "right" }}>
//             <Typography sx={{ fontSize: 10.5, color: INK3, lineHeight: 1 }}>From</Typography>
//             <Typography sx={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14, color: INK }}>
//               R{price.toLocaleString()}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>

//       {/* View arrow */}
//       <Box sx={{
//         px: 2, py: 1.25, borderTop: `1px solid ${BORDER}`,
//         display: "flex", justifyContent: "flex-end", alignItems: "center", gap: .5,
//       }}>
//         <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: P }}>View profile</Typography>
//         <ChevronRight size={13} color={P}/>
//       </Box>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    FILTER DRAWER
// ───────────────────────────────────────────────────────────── */
// const SORT_OPTIONS = [
//   { value: "best",      label: "Best match"         },
//   { value: "priceLow",  label: "Price: low → high"  },
//   { value: "priceHigh", label: "Price: high → low"  },
//   { value: "rating",    label: "Top rated"           },
// ];

// const RATING_OPTIONS = [
//   { value: 0,   label: "Any rating" },
//   { value: 4,   label: "4.0 +" },
//   { value: 4.5, label: "4.5 +" },
//   { value: 4.8, label: "4.8 +" },
// ];

// const FilterDrawer = ({
//   open, onClose, filters, setFilters, dataMaxPrice,
//   hasActive, onReset,
// }: {
//   open:          boolean;
//   onClose:       () => void;
//   filters:       FilterState;
//   setFilters:    (f: FilterState) => void;
//   dataMaxPrice:  number;
//   hasActive:     boolean;
//   onReset:       () => void;
// }) => {
//   const set = (patch: Partial<FilterState>) => setFilters({ ...filters, ...patch });

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: { width: { xs: "100vw", sm: 360 }, px: 3, py: 3, boxSizing: "border-box", overflowX: "hidden" },
//       }}
//     >
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: INK }}>
//           Filters
//         </Typography>
//         <button className="back-btn" style={{ padding: "6px 10px" }} onClick={onClose}>
//           <X size={14}/>
//         </button>
//       </Stack>

//       <Stack spacing={3} sx={{ flex: 1, overflowY: "auto" }}>
//         {/* Sort */}
//         <Box>
//           <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>Sort by</Typography>
//           <Stack direction="row" flexWrap="wrap" gap={0.75}>
//             {SORT_OPTIONS.map(o => (
//               <button
//                 key={o.value}
//                 className={`drawer-chip${filters.sortBy === o.value ? " on" : ""}`}
//                 onClick={() => set({ sortBy: o.value })}
//               >
//                 {o.label}
//               </button>
//             ))}
//           </Stack>
//         </Box>

//         <Box sx={{ height: 1, background: BORDER }}/>

//         {/* Budget */}
//         <Box>
//           <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>
//             Budget per session
//           </Typography>
//           <Stack direction="row" alignItems="center" spacing={1.5}>
//             <Box sx={{ flex: 1, borderRadius: "10px", border: `1.5px solid ${BORDER}`, background: OFF, px: 1.5, py: 1, textAlign: "center" }}>
//               <Typography sx={{ fontSize: 10.5, color: INK3 }}>Min</Typography>
//               <Typography sx={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14, color: INK }}>
//                 R{filters.priceRange[0].toLocaleString()}
//               </Typography>
//             </Box>
//             <Typography sx={{ color: INK3, fontSize: 13 }}>—</Typography>
//             <Box sx={{ flex: 1, borderRadius: "10px", border: `1.5px solid ${BORDER}`, background: OFF, px: 1.5, py: 1, textAlign: "center" }}>
//               <Typography sx={{ fontSize: 10.5, color: INK3 }}>Max</Typography>
//               <Typography sx={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14, color: INK }}>
//                 R{filters.priceRange[1].toLocaleString()}
//               </Typography>
//             </Box>
//           </Stack>
//           <Box sx={{ mt: 2 }}>
//             <input
//               type="range" min={0} max={dataMaxPrice} step={50}
//               value={filters.priceRange[1]}
//               onChange={e => set({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
//               style={{ width: "100%", accentColor: P }}
//             />
//           </Box>
//         </Box>

//         <Box sx={{ height: 1, background: BORDER }}/>

//         {/* Rating */}
//         <Box>
//           <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>Minimum rating</Typography>
//           <Stack spacing={0.75}>
//             {RATING_OPTIONS.map(o => (
//               <Box
//                 key={o.value}
//                 onClick={() => set({ minRating: o.value })}
//                 sx={{
//                   display: "flex", alignItems: "center", gap: 1.5,
//                   p: "10px 14px", borderRadius: "12px", cursor: "pointer",
//                   border: `1.5px solid ${filters.minRating === o.value ? P : BORDER}`,
//                   background: filters.minRating === o.value ? PL : WHITE,
//                   transition: "all .15s",
//                   "&:hover": { borderColor: PM },
//                 }}
//               >
//                 {o.value > 0 && <StarRow value={o.value}/>}
//                 <Typography sx={{ fontSize: 13.5, fontWeight: filters.minRating === o.value ? 700 : 400, color: filters.minRating === o.value ? P : INK }}>
//                   {o.label}
//                 </Typography>
//               </Box>
//             ))}
//           </Stack>
//         </Box>
//       </Stack>

//       <Stack spacing={1.25} mt={3}>
//         {hasActive && (
//           <button className="back-btn" style={{ width: "100%", justifyContent: "center", padding: "13px" }}
//             onClick={() => { onReset(); onClose(); }}>
//             Clear all filters
//           </button>
//         )}
//         <button className="apply-cta" onClick={onClose}>Show results</button>
//       </Stack>
//     </Drawer>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    PAGINATION
// ───────────────────────────────────────────────────────────── */
// const Pager = ({
//   page, total, onChange,
// }: { page: number; total: number; onChange: (p: number) => void }) => {
//   if (total <= 1) return null;

//   const pages = Array.from({ length: total }, (_, i) => i + 1);
//   const visible = pages.filter(p => p === 1 || p === total || Math.abs(p - page) <= 1);

//   const rendered: (number | "…")[] = [];
//   visible.forEach((p, i) => {
//     if (i > 0 && p - (visible[i - 1] as number) > 1) rendered.push("…");
//     rendered.push(p);
//   });

//   return (
//     <Stack direction="row" spacing={0.75} justifyContent="center" alignItems="center" mt={6}>
//       <button className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
//       {rendered.map((p, i) =>
//         p === "…"
//           ? <Typography key={`e${i}`} sx={{ px: 1, color: INK3, fontSize: 13 }}>…</Typography>
//           : <button key={p} className={`page-btn${page === p ? " active" : ""}`} onClick={() => onChange(p as number)}>{p}</button>
//       )}
//       <button className="page-btn" disabled={page === total} onClick={() => onChange(page + 1)}>›</button>
//     </Stack>
//   );
// };

// /* ─────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────── */
// const Professionals: React.FC = () => {
//   const navigate = useNavigate();

//   const [professionals, setProfessionals] = useState<Professional[]>([]);
//   const [loading,       setLoading]       = useState(true);
//   const [error,         setError]         = useState<string | null>(null);
//   const [search,        setSearch]        = useState("");
//   const [category,      setCategory]      = useState("All");
//   const [page,          setPage]          = useState(1);
//   const [filterOpen,    setFilterOpen]    = useState(false);
//   const [filters,       setFilters]       = useState<FilterState>({
//     priceRange: [0, MAX_PRICE],
//     minRating:  0,
//     sortBy:     "best",
//   });

//   /* ── Fetch — via authFetch, same pattern as AIInterviewHome ── */
//   useEffect(() => {
//     let cancelled = false;
//     const fetchData = async () => {
//       setLoading(true); setError(null);
//       try {
//         const data = await authFetch(PROFESSIONALS_ENDPOINT);
//         if (!cancelled) {
//           setProfessionals(Array.isArray(data.result) ? data.result : []);
//         }
//       } catch (err: any) {
//         if (!cancelled) {
//           setError(err?.message ?? "Something went wrong loading professionals.");
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };
//     fetchData();
//     return () => { cancelled = true; };
//   }, []);

//   /* ── Derived ── */
//   const categories = useMemo(() => {
//     const unique = Array.from(
//       new Set(professionals.map(p => p.field).filter((f): f is string => !!f))
//     );
//     return ["All", ...unique];
//   }, [professionals]);

//   const dataMaxPrice = useMemo(
//     () => Math.max(MAX_PRICE, ...professionals.map(p => p.price ?? 0)),
//     [professionals]
//   );

//   const filteredAll = useMemo(() => {
//     const q = search.toLowerCase().trim();
//     return professionals
//       .filter(p => {
//         if (q && !`${p.name} ${p.surname}`.toLowerCase().includes(q) &&
//           !(p.currentJobTitle?.toLowerCase().includes(q)) &&
//           !(p.interviewFocusArea?.some(t => t.toLowerCase().includes(q)))) return false;
//         if (category !== "All" && p.field !== category) return false;
//         const price = p.price ?? 0;
//         if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
//         if ((p.rating ?? 0) < filters.minRating) return false;
//         return true;
//       })
//       .sort((a, b) => {
//         if (filters.sortBy === "priceLow")  return (a.price ?? 0) - (b.price ?? 0);
//         if (filters.sortBy === "priceHigh") return (b.price ?? 0) - (a.price ?? 0);
//         if (filters.sortBy === "rating")    return (b.rating ?? 0) - (a.rating ?? 0);
//         return (b.rating ?? 0) * (b.reviews ?? 1) - (a.rating ?? 0) * (a.reviews ?? 1);
//       });
//   }, [search, category, filters, professionals]);

//   const totalPages = Math.ceil(filteredAll.length / ITEMS_PER_PAGE);
//   const paginated  = useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     return filteredAll.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredAll, page]);

//   const activeFilterCount = useMemo(() => {
//     let n = 0;
//     if (filters.minRating > 0)                                     n++;
//     if (filters.sortBy !== "best")                                  n++;
//     if (filters.priceRange[0] > 0 || filters.priceRange[1] < dataMaxPrice) n++;
//     return n;
//   }, [filters, dataMaxPrice]);

//   const hasActive = !!(search || category !== "All" || activeFilterCount);

//   const resetFilters = useCallback(() => {
//     setSearch(""); setCategory("All"); setPage(1);
//     setFilters({ priceRange: [0, dataMaxPrice], minRating: 0, sortBy: "best" });
//   }, [dataMaxPrice]);

//   /* Reset page when filters change */
//   useEffect(() => { setPage(1); }, [search, category, filters]);

//   const handlePageChange = (p: number) => {
//     setPage(p);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background: WHITE, minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>

//         {/* ── SEARCH BAR ─────────────────────────────────────── */}
//         <Box sx={{
//           borderBottom: `1px solid ${BORDER}`, px: { xs: 2, md: 6 }, py: 2,
//           position: "sticky", top: 0,
//           background: `${WHITE}E8`, backdropFilter: "blur(12px)", zIndex: 10,
//         }}>
//           <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
//             <div className="search-wrap">
//               <Search size={14} className="search-icon"/>
//               <input
//                 className="search-input"
//                 placeholder="Search by name, title or focus area…"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               />
//             </div>
//             <button
//               className={`filter-btn${activeFilterCount ? " active" : ""}`}
//               onClick={() => setFilterOpen(true)}
//             >
//               <SlidersHorizontal size={13}/> Filters
//               {activeFilterCount > 0 && (
//                 <span style={{
//                   background: P, color: "#fff", borderRadius: "100px",
//                   padding: "1px 7px", fontSize: "10.5px", fontWeight: 700,
//                 }}>
//                   {activeFilterCount}
//                 </span>
//               )}
//             </button>
//             {hasActive && (
//               <button className="clear-btn" onClick={resetFilters}>
//                 <X size={12}/> Clear
//               </button>
//             )}
//           </Stack>
//         </Box>

//         {/* ── CATEGORY BAR ────────────────────────────────────── */}
//         <Box sx={{ borderBottom: `1px solid ${BORDER}`, px: { xs: 2, md: 6 }, py: 1.5 }}>
//           <div className="cat-bar">
//             {loading
//               ? Array.from({ length: 6 }).map((_, i) => (
//                   <Skeleton key={i} variant="rounded" width={88} height={34} sx={{ borderRadius: "100px", flexShrink: 0 }}/>
//                 ))
//               : categories.map(c => (
//                   <button
//                     key={c}
//                     className={`cat-pill${category === c ? " active" : ""}`}
//                     onClick={() => setCategory(c)}
//                   >
//                     {c}
//                   </button>
//                 ))
//             }
//           </div>
//         </Box>

//         {/* ── TITLE ROW ───────────────────────────────────────── */}
//         <Box sx={{ px: { xs: 2, md: 6 }, pt: 3.5, pb: 1.5 }}>
//           <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} gap={1}>
//             <Box>
//               <Typography sx={{
//                 fontFamily: "'Syne',sans-serif", fontWeight: 800,
//                 fontSize: { xs: "1.5rem", md: "1.85rem" },
//                 color: INK, letterSpacing: "-0.025em",
//               }}>
//                 {category === "All" ? "All Professionals" : category}
//               </Typography>
//               {!loading && !error && (
//                 <Typography sx={{ fontSize: 13, color: INK3, mt: .25 }}>
//                   Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filteredAll.length)}–{Math.min(page * ITEMS_PER_PAGE, filteredAll.length)} of {filteredAll.length} professional{filteredAll.length !== 1 ? "s" : ""}
//                 </Typography>
//               )}
//             </Box>

//             {/* Desktop sort */}
//             <Box sx={{ display: { xs: "none", md: "block" } }}>
//               <select
//                 className="filter-btn"
//                 style={{ paddingRight: 24 }}
//                 value={filters.sortBy}
//                 onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
//               >
//                 {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//               </select>
//             </Box>
//           </Stack>
//         </Box>

//         {/* ── ERROR ───────────────────────────────────────────── */}
//         {error && (
//           <Box sx={{ px: { xs: 2, md: 6 }, mb: 2 }}>
//             <Box sx={{
//               border: `1.5px solid #FECACA`, borderRadius: "16px", background: REDL,
//               p: 2.5, display: "flex", alignItems: "center", gap: 1.5,
//             }}>
//               <AlertCircle size={18} color={RED}/>
//               <Typography sx={{ fontSize: 14, color: RED, flex: 1 }}>{error}</Typography>
//               <button className="back-btn" style={{ borderColor: RED, color: RED }}
//                 onClick={() => window.location.reload()}>
//                 <RefreshCw size={13}/> Retry
//               </button>
//             </Box>
//           </Box>
//         )}

//         {/* ── GRID ────────────────────────────────────────────── */}
//         <Box sx={{ px: { xs: 2, md: 6 }, pb: 6 }}>
//           {loading ? (
//             <Grid container spacing={2.5}>
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
//                   <SkeletonCard/>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : error ? null : filteredAll.length === 0 ? (
//             /* Empty state */
//             <Box sx={{ textAlign: "center", py: 10 }}>
//               <Box sx={{
//                 width: 60, height: 60, borderRadius: "50%", background: PL,
//                 display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2,
//               }}>
//                 <BookOpen size={24} color={P}/>
//               </Box>
//               <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: INK, mb: .75 }}>
//                 {hasActive ? "No professionals match your filters" : "No professionals yet"}
//               </Typography>
//               <Typography sx={{ fontSize: 14, color: INK3, maxWidth: 320, mx: "auto", lineHeight: 1.7 }}>
//                 {hasActive ? "Try adjusting your search or clearing some filters." : "Check back soon — more professionals join daily."}
//               </Typography>
//               {hasActive && (
//                 <button className="filter-btn" style={{ margin: "16px auto 0", display: "inline-flex" }} onClick={resetFilters}>
//                   <X size={12}/> Clear filters
//                 </button>
//               )}
//             </Box>
//           ) : (
//             <>
//               <Grid container spacing={2.5}>
//                 {paginated.map((pro, i) => (
//                   <Grid item xs={12} sm={6} md={4} lg={3} key={pro._id}>
//                     <Box className={`d${Math.min(i % 4 + 1, 4) as 1 | 2 | 3 | 4}`} sx={{ height: "100%" }}>
//                       <ProCard
//                         pro={pro}
//                         onClick={() => navigate(`/mentee/professional-details/${pro._id}`)}
//                       />
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//               <Pager page={page} total={totalPages} onChange={handlePageChange}/>
//             </>
//           )}
//         </Box>

//         {/* ── FILTER DRAWER ───────────────────────────────────── */}
//         <FilterDrawer
//           open={filterOpen}
//           onClose={() => setFilterOpen(false)}
//           filters={filters}
//           setFilters={setFilters}
//           dataMaxPrice={dataMaxPrice}
//           hasActive={hasActive}
//           onReset={resetFilters}
//         />
//       </Box>
//     </>
//   );
// };

// export default Professionals;