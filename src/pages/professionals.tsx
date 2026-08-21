// import React, { useMemo, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Stack,
//   Chip,
//   Button,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const PRIMARY = "#7B61FF";

// const categories = ["All", "Tech", "Marketing", "Finance", "Design", "Law", "Healthcare", "Engineering"];

// // DATA
// const professionalsMock = [
//   { name: "Sarah", surname: "Johnson", role: "HR Manager", company: "Google", category: "Marketing", sessions: 128, price: 25, rating: 4.9 },
//   { name: "David", surname: "Lee", role: "Tech Recruiter", company: "Amazon", category: "Tech", sessions: 86, price: 30, rating: 4.8 },
//   { name: "Nandi", surname: "Dlamini", role: "Talent Acquisition Lead", company: "MTN", category: "Marketing", sessions: 104, price: 25, rating: 4.9 },
//   { name: "James", surname: "Carter", role: "Corporate Lawyer", company: "Bowmans", category: "Law", sessions: 76, price: 40, rating: 4.7 },
//   { name: "Aisha", surname: "Khan", role: "Medical Doctor", company: "Netcare", category: "Healthcare", sessions: 140, price: 35, rating: 4.9 },
//   { name: "Thabo", surname: "Mokoena", role: "Civil Engineer", company: "WBHO", category: "Engineering", sessions: 92, price: 28, rating: 4.8 },
//   { name: "Emily", surname: "Chen", role: "UI/UX Designer", company: "Figma", category: "Design", sessions: 110, price: 27, rating: 4.9 },
//   { name: "Michael", surname: "Smith", role: "Financial Analyst", company: "Deloitte", category: "Finance", sessions: 89, price: 32, rating: 4.7 },
// ];

// // EXTENDED DATA
// const extendedProfessionals = Array.from({ length: 32 }).map((_, i) => ({
//   ...professionalsMock[i % professionalsMock.length],
//   id: i,
// }));

// const Professionals = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   // 🔥 COMBINED FILTER (category + search)
//   const filtered = useMemo(() => {
//     return extendedProfessionals.filter((pro) => {
//       const matchesCategory =
//         selectedCategory === "All" || pro.category === selectedCategory;

//       const matchesSearch =
//         `${pro.name} ${pro.surname} ${pro.role} ${pro.company}`
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   }, [selectedCategory, searchQuery]);

//   return (
//     <Box
//       sx={{
//         px: { xs: 2, md: 4 },
//         py: 2.5,
//         background: "#FFFFFF",
//         minHeight: "100vh",
//       }}
//     >
//       {/* HEADER */}
//       <Box textAlign="left" mb={3}>
//         <Typography variant="h5" fontWeight="bold">
//           Professionals
//         </Typography>

//         <Typography variant="body2" color="text.secondary" mt={1}>
//           Practice mock interviews with verified professionals.
//         </Typography>
//       </Box>

//       {/* 🔍 SEARCH BAR */}
//       <TextField
//         fullWidth
//         placeholder="Search by name, role, or company..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         sx={{
//           mb: 3,
//           borderColor: "#7B61FF",
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "999px",
//             background: "#F7F7FB",
//             borderColor: "#7B61FF"
//           },
//         }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//       />

//       {/* 🔒 STICKY CATEGORY FILTER */}
//       <Box
//         sx={{
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//           background: "#fff",
//           pb: 2,
//           mb: 3,
//         }}
//       >
//         <Stack direction="row" spacing={1} flexWrap="wrap">
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               onClick={() => setSelectedCategory(cat)}
//               sx={{
//                 borderRadius: "999px",
//                 px: 1,
//                 fontWeight: 500,
//                 backgroundColor:
//                   selectedCategory === cat ? PRIMARY : "#F7F7FB",
//                 color: selectedCategory === cat ? "#fff" : "#555",
//                 "&:hover": {
//                   backgroundColor:
//                     selectedCategory === cat ? "#6a4ee6" : "#ddd",
//                 },
//               }}
//             />
//           ))}
//         </Stack>
//       </Box>

//       {/* GRID */}
//       <Grid container spacing={3}>
//         {filtered.map((pro) => {
//           const initials = `${pro.name[0]}${pro.surname[0]}`;

//           return (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={pro.id}>
//               <Card
//                 sx={{
//                   p: 2,
//                   borderRadius: 4,
//                   border: `1px solid #eee`,
//                   textAlign: "center",
//                   boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
//                   transition: "0.25s",
//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Avatar
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       margin: "0 auto",
//                       mb: 2,
//                       fontSize: 20,
//                       bgcolor: "#E6E0FF",
//                       color: "#5B3DF5",
//                     }}
//                   >
//                     {initials}
//                   </Avatar>

//                   <Typography fontWeight="bold">
//                     {pro.name} {pro.surname}
//                   </Typography>

//                   <Typography variant="body2" color="text.secondary">
//                     {pro.role}
//                   </Typography>

//                   <Typography fontSize={12} color="#777" mb={1}>
//                     {pro.company}
//                   </Typography>

//                   <Typography fontSize={13} mb={1}>
//                     ⭐ {pro.rating} ({pro.sessions})
//                   </Typography>

//                   <Typography fontWeight="bold" mb={2}>
//                     ${pro.price} / session
//                   </Typography>

//                   <Button
//                     fullWidth
//                     sx={{
//                       borderRadius: 999,
//                       textTransform: "none",
//                       backgroundColor: PRIMARY,
//                       color: "#fff",
//                       fontWeight: 500,
//                       "&:hover": {
//                         backgroundColor: "#6a4ee6",
//                       },
//                     }}
//                   >
//                     Book Session
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* EMPTY STATE */}
//       {filtered.length === 0 && (
//         <Typography mt={4} textAlign="center" color="text.secondary">
//           No professionals found. Try a different search or category.
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default Professionals;






















// With Back-end intergrated

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  TextField,
  Card,
  Avatar,
  Chip,
  Stack,
  Button,
  Skeleton,
  InputAdornment,
  Alert,
  Drawer,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Rating,
  Pagination,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteFilled from "@mui/icons-material/Favorite";
import VerifiedIcon from "@mui/icons-material/Verified";
import BoltIcon from "@mui/icons-material/Bolt";

// ── Constants ──
const PRIMARY = "#7F42E7";
const PRIMARY_LIGHT = "#F5F0FD";
const MAX_PRICE = 1000;
const ITEMS_PER_PAGE = 20; // Max profiles displayed simultaneously per view sequence
const P = "#7F42E7"; const P_DARK = "#5E2EC5"; const P_LITE = "#F0EAFD";
const BORDER = "#E8E3F5";
const API_URL = "http://localhost:1000/api/v1/mentee/profesionals";

interface Professional {
  _id: string;
  name: string;
  surname: string;
  image?: string;
  currentJobTitle?: string;
  companyName?: string;
  interviewFocusArea?: string[];
  experienceLevel?: string[];
  aboutUser?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  availability?: string[];
  skills?: string[];
  field?: string;
  instantBooking?: boolean;
}

const getInitials = (name = "", surname = "") =>
  `${name[0] ?? ""}${surname[0] ?? ""}`.toUpperCase();

const getSellerLevel = (rating: number, reviews: number) => {
  if (rating >= 4.8 && reviews >= 100) return { label: "Top Rated", color: "#f59e0b", bg: "#fef9c3" };
  if (rating >= 4.5 && reviews >= 20) return { label: "Level 2", color: "#7F42E7", bg: "#F5F0FD" };
  if (reviews >= 5) return { label: "Level 1", color: "#3b82f6", bg: "#eff6ff" };
  return null;
};

const SkeletonCard = () => (
  <Card sx={{ borderRadius: 3, boxShadow: "none", border: "1px solid #eee", overflow: "hidden" }}>
    <Skeleton variant="rectangular" height={200} />
    <Box p={1.5}>
      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton width="50%" height={14} />
      </Stack>
      <Skeleton width="90%" height={14} />
      <Skeleton width="70%" height={14} sx={{ mt: 0.5 }} />
      <Divider sx={{ my: 1 }} />
      <Stack direction="row" justifyContent="space-between">
        <Skeleton width="30%" height={14} />
        <Skeleton width="25%" height={14} />
      </Stack>
    </Box>
  </Card>
);

const EmptyState = ({ filtered }: { filtered: boolean }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center", gap: 2 }}>
    <Box sx={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: PRIMARY_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <PersonOffOutlinedIcon sx={{ fontSize: 40, color: PRIMARY }} />
    </Box>
    <Typography variant="h6" fontWeight={700}>
      {filtered ? "No professionals match your filters" : "No professionals yet"}
    </Typography>
    <Typography color="text.secondary" fontSize={14} maxWidth={320}>
      {filtered ? "Try adjusting your search parameters or clearing filters." : "Check back soon — more professionals are joining daily."}
    </Typography>
  </Box>
);

const ProCard = ({ pro, onClick }: { pro: Professional; onClick: () => void }) => {
  const rating = pro.rating ?? 4.5;
  const reviews = pro.reviews ?? 0;
  const price = pro.price ?? 250;
  const sellerLevel = getSellerLevel(rating, reviews);
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        border: "1px solid #e8e8e8",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": { boxShadow: "0 8px 30px rgba(0,0,0,0.12)", transform: { xs: "none", sm: "translateY(-3px)" } },
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <Box onClick={onClick} sx={{ position: "relative", height: 200, backgroundColor: PRIMARY_LIGHT, overflow: "hidden", flexShrink: 0 }}>
        {pro.image ? (
          <Box component="img" src={pro.image} alt={pro.name} sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
        ) : (
          <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${PRIMARY_LIGHT}, #e0d4fb)` }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: PRIMARY, fontSize: 28, fontWeight: 700 }}>{getInitials(pro.name, pro.surname)}</Avatar>
          </Box>
        )}

        <IconButton onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.9)", width: 32, height: 32, opacity: hovered || liked ? 1 : 0, transition: "opacity 0.2s ease", "&:hover": { bgcolor: "#fff" } }}>
          {liked ? <FavoriteFilled sx={{ fontSize: 16, color: "#ef4444" }} /> : <FavoriteIcon sx={{ fontSize: 16, color: "#555" }} />}
        </IconButton>

        {pro.instantBooking && (
          <Box sx={{ position: "absolute", top: 8, left: 8, bgcolor: PRIMARY, color: "#fff", fontSize: 11, fontWeight: 700, px: 1, py: 0.4, borderRadius: 1.5, display: "flex", alignItems: "center", gap: 0.3 }}>
            <BoltIcon sx={{ fontSize: 13 }} /> Instant
          </Box>
        )}
      </Box>

      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1} sx={{ minWidth: 0 }}>
          <Avatar src={pro.image} sx={{ width: 28, height: 28, bgcolor: PRIMARY, fontSize: 11 }}>{!pro.image && getInitials(pro.name, pro.surname)}</Avatar>
          <Typography fontSize={13} fontWeight={600} noWrap flex={1}>{pro.name} {pro.surname}</Typography>
          {sellerLevel && <Chip label={sellerLevel.label} size="small" sx={{ fontSize: 10, fontWeight: 700, height: 20, bgcolor: sellerLevel.bg, color: sellerLevel.color, flexShrink: 0 }} />}
        </Stack>

        <Typography fontSize={13} color="#404145" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5, flex: 1, mb: 1 }}>
          {pro.aboutUser || `I will conduct a professional mock interview for ${pro.interviewFocusArea?.[0] ?? "your target role"}`}
        </Typography>

        {(pro.interviewFocusArea?.length ?? 0) > 0 && (
          <Stack direction="row" gap={0.5} flexWrap="wrap" mb={1}>
            {pro.interviewFocusArea!.slice(0, 2).map((tag, i) => (
              <Chip key={i} label={tag} size="small" sx={{ fontSize: 10, height: 20, bgcolor: "#f5f5f5", color: "#555", borderRadius: 1 }} />
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {reviews > 0 ? (
              <>
                <Rating value={rating} readOnly precision={0.5} size="small" sx={{ fontSize: 13, "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
                <Typography fontSize={12} fontWeight={700} color="#f59e0b">{rating.toFixed(1)}</Typography>
                <Typography fontSize={11} color="text.secondary">({reviews})</Typography>
              </>
            ) : (
              <Typography fontSize={11} color="text.secondary">New</Typography>
            )}
          </Stack>
          <Box textAlign="right">
            <Typography fontSize={10} color="text.secondary">From</Typography>
            <Typography fontSize={14} fontWeight={800} color="#404145">R{price.toLocaleString()}</Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

const FilterDrawer = ({ open, onClose, sortBy, setSortBy, priceRange, setPriceRange, minRating, setMinRating, dataMaxPrice, hasActiveFilters, resetFilters }: any) => (
  <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: { xs: "100vw", sm: 360 }, maxWidth: "100vw", px: 3, py: 3, boxSizing: "border-box", overflowX: "hidden" } }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
      <Typography fontWeight={700} fontSize={18}>Filters</Typography>
      <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
    </Stack>

    <Stack spacing={3}>
      <FormControl fullWidth size="small">
        <InputLabel sx={{ "&.Mui-focused": { color: PRIMARY } }}>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)} sx={{ "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}>
          <MenuItem value="best">Best Match</MenuItem>
          <MenuItem value="priceLow">Price: Low → High</MenuItem>
          <MenuItem value="priceHigh">Price: High → Low</MenuItem>
          <MenuItem value="rating">Top Rated</MenuItem>
        </Select>
      </FormControl>

      <Divider />

      <Box>
        <Typography fontWeight={700} fontSize={14} mb={2}>Budget</Typography>
        <Slider value={priceRange} onChange={(_: any, val: any) => setPriceRange(val)} valueLabelDisplay="auto" valueLabelFormat={(v: number) => `R${v}`} min={0} max={dataMaxPrice} sx={{ color: PRIMARY }} />
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
            <Typography fontSize={11} color="text.secondary">Min</Typography>
            <Typography fontSize={13} fontWeight={700}>R{priceRange[0]}</Typography>
          </Box>
          <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
            <Typography fontSize={11} color="text.secondary">Max</Typography>
            <Typography fontSize={13} fontWeight={700}>R{priceRange[1]}</Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography fontWeight={700} fontSize={14} mb={2}>Minimum Rating</Typography>
        <Stack spacing={1}>
          {[0, 4, 4.5, 4.8].map((r) => (
            <Box key={r} onClick={() => setMinRating(r)} sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, borderRadius: 2, cursor: "pointer", border: minRating === r ? `2px solid ${PRIMARY}` : "2px solid transparent", bgcolor: minRating === r ? PRIMARY_LIGHT : "transparent", "&:hover": { bgcolor: PRIMARY_LIGHT } }}>
              <Rating value={r === 0 ? 5 : r} readOnly precision={0.5} size="small" sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" } }} />
              <Typography fontSize={13} fontWeight={minRating === r ? 700 : 400}>{r === 0 ? "Any rating" : `${r}+`}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider />
    </Stack>

    <Stack spacing={1.5} mt={3}>
      {hasActiveFilters && <Button fullWidth variant="outlined" onClick={() => { resetFilters(); onClose(); }} sx={{ borderRadius: 3, textTransform: "none", borderColor: "#ddd", color: "#555" }}>Clear all</Button>}
      <Button fullWidth variant="contained" onClick={onClose} sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700, backgroundColor: PRIMARY, "&:hover": { backgroundColor: "#6a35c9" } }}>Apply</Button>
    </Stack>
  </Drawer>
);

const Professionals: React.FC = () => {
  const navigate = useNavigate();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("best");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Pagination Configuration State
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(API_URL, { timeout: 10000 });
        if (!cancelled) {
          if (data?.success) setProfessionals(Array.isArray(data.result) ? data.result : []);
          else setError("Failed to load professionals. Please try again.");
        }
      } catch (err: any) {
        if (!cancelled) {
          if (err.code === "ECONNABORTED") setError("Request timed out.");
          else if (err.response?.status === 404) setError("Endpoint not found.");
          else if (err.response?.status >= 500) setError("Server error. Try again later.");
          else setError("Something went wrong.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(professionals.map((p) => p.field).filter((f): f is string => !!f)));
    return ["All", ...unique];
  }, [professionals]);

  const dataMaxPrice = useMemo(() => Math.max(MAX_PRICE, ...professionals.map((p) => p.price ?? 0)), [professionals]);

  // Reset pagination index back to 1 whenever search criteria change
  useEffect(() => {
    setPage(1);
  }, [filterText, selectedCategory, priceRange, minRating, sortBy]);

  const filteredAll = useMemo(() => {
    const lower = filterText.toLowerCase().trim();
    return professionals
      .filter((pro) => {
        const textMatch = !lower || `${pro.name} ${pro.surname}`.toLowerCase().includes(lower) || (pro.currentJobTitle?.toLowerCase().includes(lower) ?? false) || (pro.interviewFocusArea?.some((t) => t.toLowerCase().includes(lower)) ?? false);
        const catMatch = selectedCategory === "All" || pro.field === selectedCategory;
        const price = pro.price ?? 0;
        const priceMatch = price >= priceRange[0] && price <= priceRange[1];
        const ratingMatch = (pro.rating ?? 0) >= minRating;
        return textMatch && catMatch && priceMatch && ratingMatch;
      })
      .sort((a, b) => {
        if (sortBy === "priceLow") return (a.price ?? 0) - (b.price ?? 0);
        if (sortBy === "priceHigh") return (b.price ?? 0) - (a.price ?? 0);
        if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
        return (b.rating ?? 0) * (b.reviews ?? 1) - (a.rating ?? 0) * (a.reviews ?? 1);
      });
  }, [filterText, selectedCategory, priceRange, minRating, sortBy, professionals]);

  // Compute total dynamic pages
  const totalPages = Math.ceil(filteredAll.length / ITEMS_PER_PAGE);

  // Slices data exclusively to fit current window page bounds
  const paginatedResults = useMemo(() => {
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    return filteredAll.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredAll, page]);

  const hasActiveFilters = !!filterText || selectedCategory !== "All" || minRating > 0 || priceRange[0] > 0 || priceRange[1] < dataMaxPrice;

  const resetFilters = () => {
    setFilterText("");
    setSelectedCategory("All");
    setPriceRange([0, dataMaxPrice]);
    setMinRating(0);
    setSortBy("best");
    setPage(1);
  };

  // Triggers smooth top scroll alignment during page movements
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw", width: "100%" }}>
      {/* Search Header */}
      <Box sx={{ px: { xs: 2, md: 4 }, pt: 3, pb: 2, borderBottom: "1px solid #eee" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Search for a professional..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#aaa" }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              "& .MuiOutlinedInput-root": { borderRadius: 3, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } },
              border: 0.1, borderRadius: 3, borderColor: "#ddd"          
            }}
          />

          <Button variant="outlined" startIcon={<TuneIcon />} onClick={() => setFilterDrawerOpen(true)} sx={{ textTransform: "none", borderColor: hasActiveFilters ? PRIMARY : "#ddd", color: hasActiveFilters ? PRIMARY : "#555", borderRadius: 3, fontWeight: hasActiveFilters ? 700 : 400, whiteSpace: "nowrap", flexShrink: 0, "&:hover": { border: 1, borderRadius: 3, borderColor: `${P}` } }}>
            Filters{hasActiveFilters ? " •" : ""}
          </Button>

          {hasActiveFilters && <Button size="small" onClick={resetFilters} sx={{ textTransform: "none", color: PRIMARY, whiteSpace: "nowrap", flexShrink: 0 }}>Clear</Button>}
        </Stack>
      </Box>

      {/* Category Navigation Bar */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 1.5, borderBottom: "1px solid #eee", display: "flex", gap: 1, overflowX: "auto", "&::-webkit-scrollbar": { display: "none" }, msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} variant="rounded" width={90} height={32} sx={{ borderRadius: 10, flexShrink: 0 }} />)
          : categories.map((cat) => (
              <Chip key={cat} label={cat} onClick={() => setSelectedCategory(cat)} sx={{ flexShrink: 0, borderRadius: 10, fontWeight: selectedCategory === cat ? 700 : 400, backgroundColor: selectedCategory === cat ? P_LITE : "transparent", color: selectedCategory === cat ? P : "#555", border: selectedCategory === cat ? `1px solid ${P}` : `1px solid ${BORDER}`, "&:hover": { backgroundColor: selectedCategory === cat ? P_LITE : "#f5f5f5" }, transition: "all 0.15s ease", cursor: "pointer" }} />
            ))
        }
      </Box>

      {/* Grid Summary Info */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 2, display: "flex", alignItems: "center", justifyBox: "space-between", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>{selectedCategory === "All" ? "All Professionals" : selectedCategory}</Typography>
          {!loading && !error && (
            <Typography fontSize={13} color="text.secondary">
              Showing {Math.min(filteredAll.length, (page - 1) * ITEMS_PER_PAGE + 1)}-{Math.min(filteredAll.length, page * ITEMS_PER_PAGE)} of {filteredAll.length} service{filteredAll.length !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>

        <FormControl size="small" sx={{ display: { xs: "none", md: "flex" }, minWidth: 170, "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY } }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)} sx={{ borderRadius: 3, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}>
            <MenuItem value="best">Best Match</MenuItem>
            <MenuItem value="priceLow">Price: Low → High</MenuItem>
            <MenuItem value="priceHigh">Price: High → Low</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Error States */}
      {error && (
        <Box px={{ xs: 2, md: 4 }}>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }} action={<Button size="small" onClick={() => window.location.reload()} sx={{ textTransform: "none" }}>Retry</Button>}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Main Results Container */}
      <Box px={{ xs: 2, md: 4 }} pb={4} sx={{ overflowX: "hidden" }}>
        {loading ? (
          <Grid container spacing={2.5}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}><SkeletonCard /></Grid>
            ))}
          </Grid>
        ) : error ? null : filteredAll.length === 0 ? (
          <EmptyState filtered={hasActiveFilters} />
        ) : (
          <>
            <Grid container spacing={2.5}>
              {paginatedResults.map((pro) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pro._id}>
                  <ProCard pro={pro} onClick={() => navigate(`/professional-details/${pro._id}`)} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Layer Control */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": { fontWeight: 600 },
                    "& .Mui-selected": { backgroundColor: `${PRIMARY} !important`, color: "#fff" }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      <FilterDrawer open={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} sortBy={sortBy} setSortBy={setSortBy} priceRange={priceRange} setPriceRange={setPriceRange} minRating={minRating} setMinRating={setMinRating} dataMaxPrice={dataMaxPrice} hasActiveFilters={hasActiveFilters} resetFilters={resetFilters} />
    </Box>
  );
};

export default Professionals;