

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   Card,
//   Avatar,
//   Chip,
//   Stack,
//   Button,
//   Skeleton,
//   InputAdornment,
//   Alert,
//   Drawer,
//   IconButton,
//   Divider,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Slider,
//   Rating,
//   Pagination,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import TuneIcon from "@mui/icons-material/Tune";
// import CloseIcon from "@mui/icons-material/Close";
// import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
// import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteFilled from "@mui/icons-material/Favorite";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import BoltIcon from "@mui/icons-material/Bolt";

// // ── Constants ──
// const PRIMARY = "#7F42E7";
// const PRIMARY_LIGHT = "#F5F0FD";
// const MAX_PRICE = 1000;
// const ITEMS_PER_PAGE = 20; // Max profiles displayed simultaneously per view sequence
// const P = "#7F42E7"; const P_DARK = "#5E2EC5"; const P_LITE = "#F0EAFD";
// const BORDER = "#E8E3F5";
// const API_URL = "http://localhost:1000/api/v1/mentee/profesionals";

// interface Professional {
//   _id: string;
//   name: string;
//   surname: string;
//   image?: string;
//   currentJobTitle?: string;
//   companyName?: string;
//   interviewFocusArea?: string[];
//   experienceLevel?: string[];
//   aboutUser?: string;
//   price?: number;
//   rating?: number;
//   reviews?: number;
//   availability?: string[];
//   skills?: string[];
//   field?: string;
//   instantBooking?: boolean;
// }

// const getInitials = (name = "", surname = "") =>
//   `${name[0] ?? ""}${surname[0] ?? ""}`.toUpperCase();

// const getSellerLevel = (rating: number, reviews: number) => {
//   if (rating >= 4.8 && reviews >= 100) return { label: "Top Rated", color: "#f59e0b", bg: "#fef9c3" };
//   if (rating >= 4.5 && reviews >= 20) return { label: "Level 2", color: "#7F42E7", bg: "#F5F0FD" };
//   if (reviews >= 5) return { label: "Level 1", color: "#3b82f6", bg: "#eff6ff" };
//   return null;
// };

// const SkeletonCard = () => (
//   <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #eee", overflow: "hidden" }}>
//     <Skeleton variant="rectangular" height={200} />
//     <Box p={1.5}>
//       <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//         <Skeleton variant="circular" width={32} height={32} />
//         <Skeleton width="50%" height={14} />
//       </Stack>
//       <Skeleton width="90%" height={14} />
//       <Skeleton width="70%" height={14} sx={{ mt: 0.5 }} />
//       <Divider sx={{ my: 1 }} />
//       <Stack direction="row" justifyContent="space-between">
//         <Skeleton width="30%" height={14} />
//         <Skeleton width="25%" height={14} />
//       </Stack>
//     </Box>
//   </Card>
// );

// const EmptyState = ({ filtered }: { filtered: boolean }) => (
//   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center", gap: 2 }}>
//     <Box sx={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: PRIMARY_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <PersonOffOutlinedIcon sx={{ fontSize: 40, color: PRIMARY }} />
//     </Box>
//     <Typography variant="h6" fontWeight={700}>
//       {filtered ? "No professionals match your filters" : "No professionals yet"}
//     </Typography>
//     <Typography color="text.secondary" fontSize={14} maxWidth={320}>
//       {filtered ? "Try adjusting your search parameters or clearing filters." : "Check back soon — more professionals are joining daily."}
//     </Typography>
//   </Box>
// );

// const ProCard = ({ pro, onClick }: { pro: Professional; onClick: () => void }) => {
//   const rating = pro.rating ?? 4.5;
//   const reviews = pro.reviews ?? 0;
//   const price = pro.price ?? 250;
//   const sellerLevel = getSellerLevel(rating, reviews);
//   const [liked, setLiked] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <Card
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       sx={{
//         borderRadius: 3,
//         boxShadow: "none",
//         border: "1px solid #e8e8e8",
//         overflow: "hidden",
//         cursor: "pointer",
//         transition: "box-shadow 0.2s ease, transform 0.2s ease",
//         "&:hover": { boxShadow: "0 8px 30px rgba(0,0,0,0.12)", transform: { xs: "none", sm: "translateY(-3px)" } },
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         minWidth: 0,
//         maxWidth: "100%",
//       }}
//     >
//       <Box onClick={onClick} sx={{ position: "relative", height: 200, backgroundColor: PRIMARY_LIGHT, overflow: "hidden", flexShrink: 0 }}>
//         {pro.image ? (
//           <Box component="img" src={pro.image} alt={pro.name} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
//         ) : (
//           <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${PRIMARY_LIGHT}, #e0d4fb)` }}>
//             <Avatar sx={{ width: 80, height: 80, bgcolor: PRIMARY, fontSize: 28, fontWeight: 700 }}>{getInitials(pro.name, pro.surname)}</Avatar>
//           </Box>
//         )}

//         <IconButton onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.9)", width: 32, height: 32, opacity: hovered || liked ? 1 : 0, transition: "opacity 0.2s ease", "&:hover": { bgcolor: "#fff" } }}>
//           {liked ? <FavoriteFilled sx={{ fontSize: 16, color: "#ef4444" }} /> : <FavoriteIcon sx={{ fontSize: 16, color: "#555" }} />}
//         </IconButton>

//         {pro.instantBooking && (
//           <Box sx={{ position: "absolute", top: 8, left: 8, bgcolor: PRIMARY, color: "#fff", fontSize: 11, fontWeight: 700, px: 1, py: 0.4, borderRadius: 1.5, display: "flex", alignItems: "center", gap: 0.3 }}>
//             <BoltIcon sx={{ fontSize: 13 }} /> Instant
//           </Box>
//         )}
//       </Box>

//       <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden" }}>
//         <Stack direction="row" spacing={1} alignItems="center" mb={1} sx={{ minWidth: 0 }}>
//           <Avatar src={pro.image} sx={{ width: 28, height: 28, bgcolor: PRIMARY, fontSize: 11 }}>{!pro.image && getInitials(pro.name, pro.surname)}</Avatar>
//           <Typography fontSize={13} fontWeight={600} noWrap flex={1}>{pro.name} {pro.surname}</Typography>
//           {sellerLevel && <Chip label={sellerLevel.label} size="small" sx={{ fontSize: 10, fontWeight: 700, height: 20, bgcolor: sellerLevel.bg, color: sellerLevel.color, flexShrink: 0 }} />}
//         </Stack>

//         <Typography fontSize={13} color="#404145" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5, flex: 1, mb: 1 }}>
//           {pro.aboutUser || `I will conduct a professional mock interview for ${pro.interviewFocusArea?.[0] ?? "your target role"}`}
//         </Typography>

//         {(pro.interviewFocusArea?.length ?? 0) > 0 && (
//           <Stack direction="row" gap={0.5} flexWrap="wrap" mb={1}>
//             {pro.interviewFocusArea!.slice(0, 2).map((tag, i) => (
//               <Chip key={i} label={tag} size="small" sx={{ fontSize: 10, height: 20, bgcolor: "#f5f5f5", color: "#555", borderRadius: 1 }} />
//             ))}
//           </Stack>
//         )}

//         <Divider sx={{ my: 1 }} />

//         <Stack direction="row" justifyContent="space-between" alignItems="center">
//           <Stack direction="row" alignItems="center" spacing={0.5}>
//             {reviews > 0 ? (
//               <>
//                 <Rating value={rating} readOnly precision={0.5} size="small" sx={{ fontSize: 13, "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
//                 <Typography fontSize={12} fontWeight={700} color="#f59e0b">{rating.toFixed(1)}</Typography>
//                 <Typography fontSize={11} color="text.secondary">({reviews})</Typography>
//               </>
//             ) : (
//               <Typography fontSize={11} color="text.secondary">New</Typography>
//             )}
//           </Stack>
//           <Box textAlign="right">
//             <Typography fontSize={10} color="text.secondary">From</Typography>
//             <Typography fontSize={14} fontWeight={800} color="#404145">R{price.toLocaleString()}</Typography>
//           </Box>
//         </Stack>
//       </Box>
//     </Card>
//   );
// };

// const FilterDrawer = ({ open, onClose, sortBy, setSortBy, priceRange, setPriceRange, minRating, setMinRating, dataMaxPrice, hasActiveFilters, resetFilters }: any) => (
//   <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: "100vw", sm: 360 }, maxWidth: "100vw", px: 3, py: 3, boxSizing: "border-box", overflowX: "hidden" } }}>
//     <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//       <Typography fontWeight={700} fontSize={18}>Filters</Typography>
//       <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
//     </Stack>

//     <Stack spacing={3}>
//       <FormControl fullWidth size="small">
//         <InputLabel sx={{ "&.Mui-focused": { color: PRIMARY } }}>Sort By</InputLabel>
//         <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)} sx={{ "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}>
//           <MenuItem value="best">Best Match</MenuItem>
//           <MenuItem value="priceLow">Price: Low → High</MenuItem>
//           <MenuItem value="priceHigh">Price: High → Low</MenuItem>
//           <MenuItem value="rating">Top Rated</MenuItem>
//         </Select>
//       </FormControl>

//       <Divider />

//       <Box>
//         <Typography fontWeight={700} fontSize={14} mb={2}>Budget</Typography>
//         <Slider value={priceRange} onChange={(_: any, val: any) => setPriceRange(val)} valueLabelDisplay="auto" valueLabelFormat={(v: number) => `R${v}`} min={0} max={dataMaxPrice} sx={{ color: PRIMARY }} />
//         <Stack direction="row" justifyContent="space-between" mt={1}>
//           <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
//             <Typography fontSize={11} color="text.secondary">Min</Typography>
//             <Typography fontSize={13} fontWeight={700}>R{priceRange[0]}</Typography>
//           </Box>
//           <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
//             <Typography fontSize={11} color="text.secondary">Max</Typography>
//             <Typography fontSize={13} fontWeight={700}>R{priceRange[1]}</Typography>
//           </Box>
//         </Stack>
//       </Box>

//       <Divider />

//       <Box>
//         <Typography fontWeight={700} fontSize={14} mb={2}>Minimum Rating</Typography>
//         <Stack spacing={1}>
//           {[0, 4, 4.5, 4.8].map((r) => (
//             <Box key={r} onClick={() => setMinRating(r)} sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, borderRadius: 2, cursor: "pointer", border: minRating === r ? `2px solid ${PRIMARY}` : "2px solid transparent", bgcolor: minRating === r ? PRIMARY_LIGHT : "transparent", "&:hover": { bgcolor: PRIMARY_LIGHT } }}>
//               <Rating value={r === 0 ? 5 : r} readOnly precision={0.5} size="small" sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
//               <Typography fontSize={13} fontWeight={minRating === r ? 700 : 400}>{r === 0 ? "Any rating" : `${r}+`}</Typography>
//             </Box>
//           ))}
//         </Stack>
//       </Box>

//       <Divider />
//     </Stack>

//     <Stack spacing={1.5} mt={3}>
//       {hasActiveFilters && <Button fullWidth variant="outlined" onClick={() => { resetFilters(); onClose(); }} sx={{ borderRadius: 3, textTransform: "none", borderColor: "#ddd", color: "#555" }}>Clear all</Button>}
//       <Button fullWidth variant="contained" onClick={onClose} sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700, backgroundColor: PRIMARY, "&:hover": { backgroundColor: "#6a35c9" } }}>Apply</Button>
//     </Stack>
//   </Drawer>
// );

// const Professionals: React.FC = () => {
//   const navigate = useNavigate();

//   const [professionals, setProfessionals] = useState<Professional[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filterText, setFilterText] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
//   const [minRating, setMinRating] = useState(0);
//   const [sortBy, setSortBy] = useState("best");
//   const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

//   // Pagination Configuration State
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     let cancelled = false;
//     const fetch = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const { data } = await axios.get(API_URL, { timeout: 10000 });
//         if (!cancelled) {
//           if (data?.success) setProfessionals(Array.isArray(data.result) ? data.result : []);
//           else setError("Failed to load professionals. Please try again.");
//         }
//       } catch (err: any) {
//         if (!cancelled) {
//           if (err.code === "ECONNABORTED") setError("Request timed out.");
//           else if (err.response?.status === 404) setError("Endpoint not found.");
//           else if (err.response?.status >= 500) setError("Server error. Try again later.");
//           else setError("Something went wrong.");
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };
//     fetch();
//     return () => { cancelled = true; };
//   }, []);

//   const categories = useMemo(() => {
//     const unique = Array.from(new Set(professionals.map((p) => p.field).filter((f): f is string => !!f)));
//     return ["All", ...unique];
//   }, [professionals]);

//   const dataMaxPrice = useMemo(() => Math.max(MAX_PRICE, ...professionals.map((p) => p.price ?? 0)), [professionals]);

//   // Reset pagination index back to 1 whenever search criteria change
//   useEffect(() => {
//     setPage(1);
//   }, [filterText, selectedCategory, priceRange, minRating, sortBy]);

//   const filteredAll = useMemo(() => {
//     const lower = filterText.toLowerCase().trim();
//     return professionals
//       .filter((pro) => {
//         const textMatch = !lower || `${pro.name} ${pro.surname}`.toLowerCase().includes(lower) || (pro.currentJobTitle?.toLowerCase().includes(lower) ?? false) || (pro.interviewFocusArea?.some((t) => t.toLowerCase().includes(lower)) ?? false);
//         const catMatch = selectedCategory === "All" || pro.field === selectedCategory;
//         const price = pro.price ?? 0;
//         const priceMatch = price >= priceRange[0] && price <= priceRange[1];
//         const ratingMatch = (pro.rating ?? 0) >= minRating;
//         return textMatch && catMatch && priceMatch && ratingMatch;
//       })
//       .sort((a, b) => {
//         if (sortBy === "priceLow") return (a.price ?? 0) - (b.price ?? 0);
//         if (sortBy === "priceHigh") return (b.price ?? 0) - (a.price ?? 0);
//         if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
//         return (b.rating ?? 0) * (b.reviews ?? 1) - (a.rating ?? 0) * (a.reviews ?? 1);
//       });
//   }, [filterText, selectedCategory, priceRange, minRating, sortBy, professionals]);

//   // Compute total dynamic pages
//   const totalPages = Math.ceil(filteredAll.length / ITEMS_PER_PAGE);

//   // Slices data exclusively to fit current window page bounds
//   const paginatedResults = useMemo(() => {
//     const startIdx = (page - 1) * ITEMS_PER_PAGE;
//     return filteredAll.slice(startIdx, startIdx + ITEMS_PER_PAGE);
//   }, [filteredAll, page]);

//   const hasActiveFilters = !!filterText || selectedCategory !== "All" || minRating > 0 || priceRange[0] > 0 || priceRange[1] < dataMaxPrice;

//   const resetFilters = () => {
//     setFilterText("");
//     setSelectedCategory("All");
//     setPriceRange([0, dataMaxPrice]);
//     setMinRating(0);
//     setSortBy("best");
//     setPage(1);
//   };

//   // Triggers smooth top scroll alignment during page movements
//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
//   };

//   return (
//     <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw", width: "100%" }}>
//       {/* Search Header */}
//       <Box sx={{ px: { xs: 2, md: 4 }, pt: 3, pb: 2, borderBottom: "1px solid #eee" }}>
//         <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="center">
//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Search for a professional..."
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon fontSize="small" sx={{ color: "#aaa" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ 
//               "& .MuiOutlinedInput-root": { borderRadius: 3, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } },
//               border: 0.1, borderRadius: 3, borderColor: "#ddd"          
//             }}
//           />

//           <Button variant="outlined" startIcon={<TuneIcon />} onClick={() => setFilterDrawerOpen(true)} sx={{ textTransform: "none", borderColor: hasActiveFilters ? PRIMARY : "#ddd", color: hasActiveFilters ? PRIMARY : "#555", borderRadius: 3, fontWeight: hasActiveFilters ? 700 : 400, whiteSpace: "nowrap", flexShrink: 0, "&:hover": { border: 1, borderRadius: 3, borderColor: `${P}` } }}>
//             Filters{hasActiveFilters ? " •" : ""}
//           </Button>

//           {hasActiveFilters && <Button size="small" onClick={resetFilters} sx={{ textTransform: "none", color: PRIMARY, whiteSpace: "nowrap", flexShrink: 0 }}>Clear</Button>}
//         </Stack>
//       </Box>

//       {/* Category Navigation Bar */}
//       <Box sx={{ px: { xs: 2, md: 4 }, py: 1.5, borderBottom: "1px solid #eee", display: "flex", gap: 1, overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none" }}>
//         {loading
//           ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} variant="rounded" width={90} height={32} sx={{ borderRadius: 10, flexShrink: 0 }} />)
//           : categories.map((cat) => (
//               <Chip key={cat} label={cat} onClick={() => setSelectedCategory(cat)} sx={{ flexShrink: 0, borderRadius: 10, fontWeight: selectedCategory === cat ? 700 : 400, backgroundColor: selectedCategory === cat ? P_LITE : "transparent", color: selectedCategory === cat ? P : "#555", border: selectedCategory === cat ? `1px solid ${P}` : `1px solid ${BORDER}`, "&:hover": { backgroundColor: selectedCategory === cat ? P_LITE : "#f5f5f5" }, transition: "all 0.15s ease", cursor: "pointer" }} />
//             ))
//         }
//       </Box>

//       {/* Grid Summary Info */}
//       <Box sx={{ px: { xs: 2, md: 4 }, py: 2, display: "flex", alignItems: "center", justifyBox: "space-between", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
//         <Box>
//           <Typography variant="h5" fontWeight={800}>{selectedCategory === "All" ? "All Professionals" : selectedCategory}</Typography>
//           {!loading && !error && (
//             <Typography fontSize={13} color="text.secondary">
//               Showing {Math.min(filteredAll.length, (page - 1) * ITEMS_PER_PAGE + 1)}-{Math.min(filteredAll.length, page * ITEMS_PER_PAGE)} of {filteredAll.length} service{filteredAll.length !== 1 ? "s" : ""}
//             </Typography>
//           )}
//         </Box>

//         <FormControl size="small" sx={{ display: { xs: "none", md: "flex" }, minWidth: 170, "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY } }}>
//           <InputLabel>Sort By</InputLabel>
//           <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)} sx={{ borderRadius: 3, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}>
//             <MenuItem value="best">Best Match</MenuItem>
//             <MenuItem value="priceLow">Price: Low → High</MenuItem>
//             <MenuItem value="priceHigh">Price: High → Low</MenuItem>
//             <MenuItem value="rating">Top Rated</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Error States */}
//       {error && (
//         <Box px={{ xs: 2, md: 4 }}>
//           <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }} action={<Button size="small" onClick={() => window.location.reload()} sx={{ textTransform: "none" }}>Retry</Button>}>
//             {error}
//           </Alert>
//         </Box>
//       )}

//       {/* Main Results Container */}
//       <Box px={{ xs: 2, md: 4 }} pb={4} sx={{ overflowX: "hidden" }}>
//         {loading ? (
//           <Grid container spacing={2.5}>
//             {Array.from({ length: 4 }).map((_, i) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={i}><SkeletonCard /></Grid>
//             ))}
//           </Grid>
//         ) : error ? null : filteredAll.length === 0 ? (
//           <EmptyState filtered={hasActiveFilters} />
//         ) : (
//           <>
//             <Grid container spacing={2.5}>
//               {paginatedResults.map((pro) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={pro._id}>
//                   <ProCard pro={pro} onClick={() => navigate(`/professional-details/${pro._id}`)} />
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Pagination Layer Control */}
//             {totalPages > 1 && (
//               <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
//                 <Pagination 
//                   count={totalPages} 
//                   page={page} 
//                   onChange={handlePageChange} 
//                   color="primary"
//                   sx={{
//                     "& .MuiPaginationItem-root": { fontWeight: 600 },
//                     "& .Mui-selected": { backgroundColor: `${PRIMARY} !important`, color: "#fff" }
//                   }}
//                 />
//               </Box>
//             )}
//           </>
//         )}
//       </Box>

//       <FilterDrawer open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} sortBy={sortBy} setSortBy={setSortBy} priceRange={priceRange} setPriceRange={setPriceRange} minRating={minRating} setMinRating={setMinRating} dataMaxPrice={dataMaxPrice} hasActiveFilters={hasActiveFilters} resetFilters={resetFilters} />
//     </Box>
//   );
// };

// export default Professionals;





import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Grid, Avatar, Stack, Drawer, Skeleton,
} from "@mui/material";
import {
  Search, SlidersHorizontal, X, Star, Zap, Heart,
  BookOpen, AlertCircle, RefreshCw, ChevronRight,
} from "lucide-react";

/* ─── API ────────────────────────────────────────────────── */
const API_BASE = "http://localhost:1000/api/v1";

// Single source of truth for the mentee-professionals route — same
// authFetch pattern used by AIInterviewHome, so auth handling (cookie +
// Authorization header) doesn't have to be independently maintained here.
const PROFESSIONALS_ENDPOINT = "/mentee/professionals";

const authFetch = async (path: string, opts: RequestInit = {}) => {
  const token = localStorage.getItem("token") ?? "";
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers ?? {}),
    },
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed ${res.status}`);
  return data;
};

/* ─────────────────────────────────────────────────────────────
   TOKENS — identical to ProfessionalCardDetails
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
   CONSTANTS
───────────────────────────────────────────────────────────── */
const MAX_PRICE     = 300;
const ITEMS_PER_PAGE = 8;

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface Professional {
  _id:                 string;
  name:                string;
  surname:             string;
  image?:              string;
  currentJobTitle?:    string;
  companyName?:        string;
  interviewFocusArea?: string[];
  experienceLevel?:    string[];
  aboutUser?:          string;
  price?:              number;
  rating?:             number;
  reviews?:            number;
  availability?:       string[];
  skills?:             string[];
  field?:              string;
  instantBooking?:     boolean;
}

interface FilterState {
  priceRange: [number, number];
  minRating:  number;
  sortBy:     string;
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
const getInitials = (name = "", surname = "") =>
  `${name[0] ?? ""}${surname[0] ?? ""}`.toUpperCase();

const fmtRating = (r?: number) => Number((r ?? 4.5).toFixed(1));

const avatarUrl = (name: string, photo?: string) =>
  photo ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F42E7&color=fff`;

const getBadge = (rating: number, reviews: number) => {
  if (rating >= 4.8 && reviews >= 100) return { label: "Top Rated", bg: AMBL,  color: AMB };
  if (rating >= 4.5 && reviews >= 20)  return { label: "Rising",    bg: PL,    color: P   };
  return null;
};

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
  .fu { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay:.06s; } .d2 { animation-delay:.12s; }
  .d3 { animation-delay:.18s; } .d4 { animation-delay:.24s; }

  /* ── Search ── */
  .search-wrap { position:relative; flex:1; min-width:200px; }
  .search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:${INK3}; pointer-events:none; }
  .search-input {
    width:100%; padding:10px 14px 10px 38px;
    border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
    background:${WHITE}; outline:none; transition:border-color .18s;
  }
  .search-input:focus { border-color:${P}; }
  .search-input::placeholder { color:${INK3}; }

  /* ── Buttons ── */
  .filter-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:10px 16px; border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:13px; color:${INK2};
    background:${WHITE}; cursor:pointer; font-weight:500;
    transition:all .18s; white-space:nowrap; flex-shrink:0;
  }
  .filter-btn:hover  { border-color:${P}; color:${P}; background:${PL}; }
  .filter-btn.active { border-color:${P}; color:${P}; background:${PL}; font-weight:700; }

  .icon-btn {
    display:inline-flex; align-items:center; justify-content:center;
    width:32px; height:32px; border-radius:8px; border:none;
    background:rgba(255,255,255,.9); cursor:pointer;
    transition:background .15s, transform .15s;
  }
  .icon-btn:hover { background:${WHITE}; transform:scale(1.08); }

  .apply-cta {
    display:flex; align-items:center; justify-content:center; gap:8px;
    width:100%; padding:14px; border:none; border-radius:14px;
    background:${P}; color:#fff; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
    box-shadow:0 6px 20px rgba(127,66,231,.28);
    transition:all .2s;
  }
  .apply-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

  .clear-btn {
    display:inline-flex; align-items:center; gap:5px;
    padding:10px 16px; border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:13px; color:${INK3};
    background:${WHITE}; cursor:pointer; font-weight:500;
    transition:all .18s; flex-shrink:0;
  }
  .clear-btn:hover { border-color:${BORDER}; color:${INK2}; }

  /* ── Category pill ── */
  .cat-pill {
    padding:6px 16px; border-radius:100px; flex-shrink:0;
    border:1.5px solid ${BORDER}; background:${WHITE};
    font-family:'DM Sans',sans-serif; font-size:13px;
    color:${INK2}; cursor:pointer; font-weight:500;
    transition:all .15s; white-space:nowrap;
  }
  .cat-pill:hover  { border-color:${PM}; color:${P}; }
  .cat-pill.active { border-color:${P}; background:${PL}; color:${P}; font-weight:700; }

  /* ── Pro card ── */
  .pro-card {
    border:1.5px solid ${BORDER}; border-radius:18px;
    background:${WHITE}; cursor:pointer; overflow:hidden;
    display:flex; flex-direction:column; height:100%;
    transition:border-color .2s, box-shadow .2s, transform .2s;
  }
  .pro-card:hover {
    border-color:${PM};
    box-shadow:0 8px 28px rgba(127,66,231,.09);
    transform:translateY(-3px);
  }

  .pro-card-img {
    width:100%; height:180px; object-fit:cover;
    transition:transform .3s ease;
  }
  .pro-card:hover .pro-card-img { transform:scale(1.04); }

  .pro-card-img-placeholder {
    width:100%; height:180px;
    background:${PL};
    display:flex; align-items:center; justify-content:center;
  }

  /* ── Chip ── */
  .chip {
    display:inline-flex; align-items:center; gap:4px;
    padding:3px 10px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
  }

  /* ── Tag ── */
  .tag {
    padding:3px 10px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${OFF};
    font-family:'DM Sans',sans-serif; font-size:11.5px; color:${INK2};
  }

  /* ── Drawer chip ── */
  .drawer-chip {
    padding:7px 14px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${OFF};
    font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500;
    color:${INK2}; cursor:pointer; transition:all .15s;
  }
  .drawer-chip.on { border-color:${P}; color:${P}; background:${PL}; font-weight:700; }
  .drawer-chip:hover { border-color:${PM}; }

  /* ── Star row ── */
  .stars { display:inline-flex; gap:2px; align-items:center; }

  /* ── Pagination ── */
  .page-btn {
    display:inline-flex; align-items:center; justify-content:center;
    width:36px; height:36px; border-radius:10px;
    border:1.5px solid ${BORDER}; background:${WHITE};
    font-family:'DM Mono',monospace; font-size:13px; font-weight:600; color:${INK2};
    cursor:pointer; transition:all .15s;
  }
  .page-btn:hover  { border-color:${PM}; color:${P}; background:${PL}; }
  .page-btn.active { border-color:${P}; background:${P}; color:#fff; }
  .page-btn:disabled { opacity:.35; cursor:default; pointer-events:none; }

  /* ── Back btn ── */
  .back-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 14px; border-radius:10px;
    border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
    cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
    transition:all .18s;
  }
  .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  /* ── Drawer slider ── */
  .range-row { display:flex; gap:10px; margin-top:10px; }
  .range-box {
    flex:1; border:1.5px solid ${BORDER}; border-radius:10px;
    padding:8px 12px; text-align:center; background:${OFF};
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:${BORDER}; border-radius:4px; }

  /* ── Cat bar hide scrollbar ── */
  .cat-bar { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; }
  .cat-bar::-webkit-scrollbar { display:none; }
`;

/* ─────────────────────────────────────────────────────────────
   STAR ROW
───────────────────────────────────────────────────────────── */
const StarRow = ({ value, size = 13 }: { value: number; size?: number }) => (
  <span className="stars">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        color={AMB}
        fill={value >= i + 0.5 ? AMB : "none"}
        style={{ opacity: value >= i + 0.5 ? 1 : 0.22 }}
      />
    ))}
  </span>
);

/* ─────────────────────────────────────────────────────────────
   SKELETON CARD
───────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <Box sx={{ border: `1.5px solid ${BORDER}`, borderRadius: "18px", overflow: "hidden", background: WHITE }}>
    <Skeleton variant="rectangular" height={180} sx={{ bgcolor: "#F0EAFD33" }}/>
    <Box p={2}>
      <Stack direction="row" spacing={1.25} alignItems="center" mb={1.5}>
        <Skeleton variant="circular" width={32} height={32}/>
        <Skeleton width="50%" height={14}/>
      </Stack>
      <Skeleton width="90%" height={13} sx={{ mb: .5 }}/>
      <Skeleton width="70%" height={13} sx={{ mb: 1.5 }}/>
      <Box sx={{ height: 1, background: BORDER, mb: 1.5 }}/>
      <Stack direction="row" justifyContent="space-between">
        <Skeleton width="35%" height={13}/>
        <Skeleton width="25%" height={13}/>
      </Stack>
    </Box>
  </Box>
);

/* ─────────────────────────────────────────────────────────────
   PRO CARD
───────────────────────────────────────────────────────────── */
const ProCard = ({
  pro, onClick,
}: { pro: Professional; onClick: () => void }) => {
  const rating  = fmtRating(pro.rating);
  const reviews = pro.reviews ?? 0;
  const price   = pro.price ?? 250;
  const badge   = getBadge(rating, reviews);
  const photo   = avatarUrl(`${pro.name} ${pro.surname}`, pro.image);
  const [liked, setLiked] = useState(false);

  return (
    <div className="pro-card fu" onClick={onClick}>
      {/* Image */}
      <Box sx={{ position: "relative", flexShrink: 0, overflow: "hidden" }}>
        {pro.image ? (
          <img src={pro.image} alt={pro.name} className="pro-card-img"/>
        ) : (
          <div className="pro-card-img-placeholder">
            <Avatar sx={{ width: 72, height: 72, bgcolor: P, fontSize: 22, fontWeight: 700 }}>
              {getInitials(pro.name, pro.surname)}
            </Avatar>
          </div>
        )}

        {/* Save */}
        <button
          className="icon-btn"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={e => { e.stopPropagation(); setLiked(v => !v); }}
        >
          <Heart size={15} color={liked ? RED : INK2} fill={liked ? RED : "none"}/>
        </button>

        {/* Instant badge */}
        {pro.instantBooking && (
          <span
            className="chip"
            style={{ position: "absolute", top: 10, left: 10, background: P, color: "#fff" }}
          >
            <Zap size={10}/> Instant
          </span>
        )}
      </Box>

      {/* Body */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Name row */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Avatar src={photo} sx={{ width: 28, height: 28, bgcolor: P, fontSize: 11 }}>
            {getInitials(pro.name, pro.surname)}
          </Avatar>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, flex: 1 }} noWrap>
            {pro.name} {pro.surname}
          </Typography>
          {badge && (
            <span className="chip" style={{ background: badge.bg, color: badge.color, flexShrink: 0 }}>
              {badge.label}
            </span>
          )}
        </Stack>

        {/* Title */}
        {pro.currentJobTitle && (
          <Typography sx={{ fontSize: 12.5, color: INK3, mb: .75 }} noWrap>
            {pro.currentJobTitle}{pro.companyName ? ` · ${pro.companyName}` : ""}
          </Typography>
        )}

        {/* Focus tags */}
        {(pro.interviewFocusArea?.length ?? 0) > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={0.6} mb={1.25}>
            {pro.interviewFocusArea!.slice(0, 2).map((t, i) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </Stack>
        )}

        {/* Footer */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            {reviews > 0 ? (
              <>
                <StarRow value={rating}/>
                <Typography sx={{ fontWeight: 700, fontSize: 12, color: AMB }}>{rating}</Typography>
                <Typography sx={{ fontSize: 11.5, color: INK3 }}>({reviews})</Typography>
              </>
            ) : (
              <span className="chip" style={{ background: GRNL, color: GRN }}>New</span>
            )}
          </Stack>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: 10.5, color: INK3, lineHeight: 1 }}>From</Typography>
            <Typography sx={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14, color: INK }}>
              R{price.toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* View arrow */}
      <Box sx={{
        px: 2, py: 1.25, borderTop: `1px solid ${BORDER}`,
        display: "flex", justifyContent: "flex-end", alignItems: "center", gap: .5,
      }}>
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: P }}>View profile</Typography>
        <ChevronRight size={13} color={P}/>
      </Box>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   FILTER DRAWER
───────────────────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "best",      label: "Best match"         },
  { value: "priceLow",  label: "Price: low → high"  },
  { value: "priceHigh", label: "Price: high → low"  },
  { value: "rating",    label: "Top rated"           },
];

const RATING_OPTIONS = [
  { value: 0,   label: "Any rating" },
  { value: 4,   label: "4.0 +" },
  { value: 4.5, label: "4.5 +" },
  { value: 4.8, label: "4.8 +" },
];

const FilterDrawer = ({
  open, onClose, filters, setFilters, dataMaxPrice,
  hasActive, onReset,
}: {
  open:          boolean;
  onClose:       () => void;
  filters:       FilterState;
  setFilters:    (f: FilterState) => void;
  dataMaxPrice:  number;
  hasActive:     boolean;
  onReset:       () => void;
}) => {
  const set = (patch: Partial<FilterState>) => setFilters({ ...filters, ...patch });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100vw", sm: 360 }, px: 3, py: 3, boxSizing: "border-box", overflowX: "hidden" },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: INK }}>
          Filters
        </Typography>
        <button className="back-btn" style={{ padding: "6px 10px" }} onClick={onClose}>
          <X size={14}/>
        </button>
      </Stack>

      <Stack spacing={3} sx={{ flex: 1, overflowY: "auto" }}>
        {/* Sort */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>Sort by</Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {SORT_OPTIONS.map(o => (
              <button
                key={o.value}
                className={`drawer-chip${filters.sortBy === o.value ? " on" : ""}`}
                onClick={() => set({ sortBy: o.value })}
              >
                {o.label}
              </button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ height: 1, background: BORDER }}/>

        {/* Budget */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>
            Budget per session
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ flex: 1, borderRadius: "10px", border: `1.5px solid ${BORDER}`, background: OFF, px: 1.5, py: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: 10.5, color: INK3 }}>Min</Typography>
              <Typography sx={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14, color: INK }}>
                R{filters.priceRange[0].toLocaleString()}
              </Typography>
            </Box>
            <Typography sx={{ color: INK3, fontSize: 13 }}>—</Typography>
            <Box sx={{ flex: 1, borderRadius: "10px", border: `1.5px solid ${BORDER}`, background: OFF, px: 1.5, py: 1, textAlign: "center" }}>
              <Typography sx={{ fontSize: 10.5, color: INK3 }}>Max</Typography>
              <Typography sx={{ fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14, color: INK }}>
                R{filters.priceRange[1].toLocaleString()}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <input
              type="range" min={0} max={dataMaxPrice} step={50}
              value={filters.priceRange[1]}
              onChange={e => set({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
              style={{ width: "100%", accentColor: P }}
            />
          </Box>
        </Box>

        <Box sx={{ height: 1, background: BORDER }}/>

        {/* Rating */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>Minimum rating</Typography>
          <Stack spacing={0.75}>
            {RATING_OPTIONS.map(o => (
              <Box
                key={o.value}
                onClick={() => set({ minRating: o.value })}
                sx={{
                  display: "flex", alignItems: "center", gap: 1.5,
                  p: "10px 14px", borderRadius: "12px", cursor: "pointer",
                  border: `1.5px solid ${filters.minRating === o.value ? P : BORDER}`,
                  background: filters.minRating === o.value ? PL : WHITE,
                  transition: "all .15s",
                  "&:hover": { borderColor: PM },
                }}
              >
                {o.value > 0 && <StarRow value={o.value}/>}
                <Typography sx={{ fontSize: 13.5, fontWeight: filters.minRating === o.value ? 700 : 400, color: filters.minRating === o.value ? P : INK }}>
                  {o.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>

      <Stack spacing={1.25} mt={3}>
        {hasActive && (
          <button className="back-btn" style={{ width: "100%", justifyContent: "center", padding: "13px" }}
            onClick={() => { onReset(); onClose(); }}>
            Clear all filters
          </button>
        )}
        <button className="apply-cta" onClick={onClose}>Show results</button>
      </Stack>
    </Drawer>
  );
};

/* ─────────────────────────────────────────────────────────────
   PAGINATION
───────────────────────────────────────────────────────────── */
const Pager = ({
  page, total, onChange,
}: { page: number; total: number; onChange: (p: number) => void }) => {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const visible = pages.filter(p => p === 1 || p === total || Math.abs(p - page) <= 1);

  const rendered: (number | "…")[] = [];
  visible.forEach((p, i) => {
    if (i > 0 && p - (visible[i - 1] as number) > 1) rendered.push("…");
    rendered.push(p);
  });

  return (
    <Stack direction="row" spacing={0.75} justifyContent="center" alignItems="center" mt={6}>
      <button className="page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
      {rendered.map((p, i) =>
        p === "…"
          ? <Typography key={`e${i}`} sx={{ px: 1, color: INK3, fontSize: 13 }}>…</Typography>
          : <button key={p} className={`page-btn${page === p ? " active" : ""}`} onClick={() => onChange(p as number)}>{p}</button>
      )}
      <button className="page-btn" disabled={page === total} onClick={() => onChange(page + 1)}>›</button>
    </Stack>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const Professionals: React.FC = () => {
  const navigate = useNavigate();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [search,        setSearch]        = useState("");
  const [category,      setCategory]      = useState("All");
  const [page,          setPage]          = useState(1);
  const [filterOpen,    setFilterOpen]    = useState(false);
  const [filters,       setFilters]       = useState<FilterState>({
    priceRange: [0, MAX_PRICE],
    minRating:  0,
    sortBy:     "best",
  });

  /* ── Fetch — via authFetch, same pattern as AIInterviewHome ── */
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const data = await authFetch(PROFESSIONALS_ENDPOINT);
        if (!cancelled) {
          setProfessionals(Array.isArray(data.result) ? data.result : []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message ?? "Something went wrong loading professionals.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  /* ── Derived ── */
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(professionals.map(p => p.field).filter((f): f is string => !!f))
    );
    return ["All", ...unique];
  }, [professionals]);

  const dataMaxPrice = useMemo(
    () => Math.max(MAX_PRICE, ...professionals.map(p => p.price ?? 0)),
    [professionals]
  );

  const filteredAll = useMemo(() => {
    const q = search.toLowerCase().trim();
    return professionals
      .filter(p => {
        if (q && !`${p.name} ${p.surname}`.toLowerCase().includes(q) &&
          !(p.currentJobTitle?.toLowerCase().includes(q)) &&
          !(p.interviewFocusArea?.some(t => t.toLowerCase().includes(q)))) return false;
        if (category !== "All" && p.field !== category) return false;
        const price = p.price ?? 0;
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
        if ((p.rating ?? 0) < filters.minRating) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "priceLow")  return (a.price ?? 0) - (b.price ?? 0);
        if (filters.sortBy === "priceHigh") return (b.price ?? 0) - (a.price ?? 0);
        if (filters.sortBy === "rating")    return (b.rating ?? 0) - (a.rating ?? 0);
        return (b.rating ?? 0) * (b.reviews ?? 1) - (a.rating ?? 0) * (a.reviews ?? 1);
      });
  }, [search, category, filters, professionals]);

  const totalPages = Math.ceil(filteredAll.length / ITEMS_PER_PAGE);
  const paginated  = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredAll.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAll, page]);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.minRating > 0)                                     n++;
    if (filters.sortBy !== "best")                                  n++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < dataMaxPrice) n++;
    return n;
  }, [filters, dataMaxPrice]);

  const hasActive = !!(search || category !== "All" || activeFilterCount);

  const resetFilters = useCallback(() => {
    setSearch(""); setCategory("All"); setPage(1);
    setFilters({ priceRange: [0, dataMaxPrice], minRating: 0, sortBy: "best" });
  }, [dataMaxPrice]);

  /* Reset page when filters change */
  useEffect(() => { setPage(1); }, [search, category, filters]);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background: WHITE, minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>

        {/* ── SEARCH BAR ─────────────────────────────────────── */}
        <Box sx={{
          borderBottom: `1px solid ${BORDER}`, px: { xs: 2, md: 6 }, py: 2,
          position: "sticky", top: 0,
          background: `${WHITE}E8`, backdropFilter: "blur(12px)", zIndex: 10,
        }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
            <div className="search-wrap">
              <Search size={14} className="search-icon"/>
              <input
                className="search-input"
                placeholder="Search by name, title or focus area…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              className={`filter-btn${activeFilterCount ? " active" : ""}`}
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={13}/> Filters
              {activeFilterCount > 0 && (
                <span style={{
                  background: P, color: "#fff", borderRadius: "100px",
                  padding: "1px 7px", fontSize: "10.5px", fontWeight: 700,
                }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
            {hasActive && (
              <button className="clear-btn" onClick={resetFilters}>
                <X size={12}/> Clear
              </button>
            )}
          </Stack>
        </Box>

        {/* ── CATEGORY BAR ────────────────────────────────────── */}
        <Box sx={{ borderBottom: `1px solid ${BORDER}`, px: { xs: 2, md: 6 }, py: 1.5 }}>
          <div className="cat-bar">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" width={88} height={34} sx={{ borderRadius: "100px", flexShrink: 0 }}/>
                ))
              : categories.map(c => (
                  <button
                    key={c}
                    className={`cat-pill${category === c ? " active" : ""}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))
            }
          </div>
        </Box>

        {/* ── TITLE ROW ───────────────────────────────────────── */}
        <Box sx={{ px: { xs: 2, md: 6 }, pt: 3.5, pb: 1.5 }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} gap={1}>
            <Box>
              <Typography sx={{
                fontFamily: "'Syne',sans-serif", fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "1.85rem" },
                color: INK, letterSpacing: "-0.025em",
              }}>
                {category === "All" ? "All Professionals" : category}
              </Typography>
              {!loading && !error && (
                <Typography sx={{ fontSize: 13, color: INK3, mt: .25 }}>
                  Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filteredAll.length)}–{Math.min(page * ITEMS_PER_PAGE, filteredAll.length)} of {filteredAll.length} professional{filteredAll.length !== 1 ? "s" : ""}
                </Typography>
              )}
            </Box>

            {/* Desktop sort */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <select
                className="filter-btn"
                style={{ paddingRight: 24 }}
                value={filters.sortBy}
                onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Box>
          </Stack>
        </Box>

        {/* ── ERROR ───────────────────────────────────────────── */}
        {error && (
          <Box sx={{ px: { xs: 2, md: 6 }, mb: 2 }}>
            <Box sx={{
              border: `1.5px solid #FECACA`, borderRadius: "16px", background: REDL,
              p: 2.5, display: "flex", alignItems: "center", gap: 1.5,
            }}>
              <AlertCircle size={18} color={RED}/>
              <Typography sx={{ fontSize: 14, color: RED, flex: 1 }}>{error}</Typography>
              <button className="back-btn" style={{ borderColor: RED, color: RED }}
                onClick={() => window.location.reload()}>
                <RefreshCw size={13}/> Retry
              </button>
            </Box>
          </Box>
        )}

        {/* ── GRID ────────────────────────────────────────────── */}
        <Box sx={{ px: { xs: 2, md: 6 }, pb: 6 }}>
          {loading ? (
            <Grid container spacing={2.5}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <SkeletonCard/>
                </Grid>
              ))}
            </Grid>
          ) : error ? null : filteredAll.length === 0 ? (
            /* Empty state */
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Box sx={{
                width: 60, height: 60, borderRadius: "50%", background: PL,
                display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2,
              }}>
                <BookOpen size={24} color={P}/>
              </Box>
              <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: INK, mb: .75 }}>
                {hasActive ? "No professionals match your filters" : "No professionals yet"}
              </Typography>
              <Typography sx={{ fontSize: 14, color: INK3, maxWidth: 320, mx: "auto", lineHeight: 1.7 }}>
                {hasActive ? "Try adjusting your search or clearing some filters." : "Check back soon — more professionals join daily."}
              </Typography>
              {hasActive && (
                <button className="filter-btn" style={{ margin: "16px auto 0", display: "inline-flex" }} onClick={resetFilters}>
                  <X size={12}/> Clear filters
                </button>
              )}
            </Box>
          ) : (
            <>
              <Grid container spacing={2.5}>
                {paginated.map((pro, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={pro._id}>
                    <Box className={`d${Math.min(i % 4 + 1, 4) as 1 | 2 | 3 | 4}`} sx={{ height: "100%" }}>
                      <ProCard
                        pro={pro}
                        onClick={() => navigate(`/professional-details/${pro._id}`)}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pager page={page} total={totalPages} onChange={handlePageChange}/>
            </>
          )}
        </Box>

        {/* ── FILTER DRAWER ───────────────────────────────────── */}
        <FilterDrawer
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          setFilters={setFilters}
          dataMaxPrice={dataMaxPrice}
          hasActive={hasActive}
          onReset={resetFilters}
        />
      </Box>
    </>
  );
};

export default Professionals;