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
  CardContent,
  Avatar,
  Chip,
  Stack,
  Button,
  Paper,
  Skeleton,
  Checkbox,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";

// ── Constants ──
const PRIMARY = "#7f42e7";
const API_URL = "http://localhost:5005/api/v1/mentee/profesionals";
const MAX_PRICE = 1000;

// ── Types ──
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

// ── Helpers ──
const getInitials = (name = "", surname = "") =>
  `${name[0] ?? ""}${surname[0] ?? ""}`.toUpperCase();

const ratingColor = (rating: number) => {
  if (rating >= 4.5) return "#22c55e";
  if (rating >= 3.5) return "#f59e0b";
  return "#ef4444";
};

// ── Skeleton card ──
const SkeletonCard = () => (
  <Card sx={{ p: 2, borderRadius: 4 }}>
    <Stack direction="row" spacing={2} mb={1}>
      <Skeleton variant="circular" width={60} height={60} />
      <Box flex={1}>
        <Skeleton width="70%" height={20} />
        <Skeleton width="50%" height={16} />
        <Skeleton width="40%" height={16} />
      </Box>
    </Stack>
    <Skeleton width="30%" height={16} />
    <Skeleton width="100%" height={40} sx={{ mt: 1 }} />
    <Skeleton width="60%" height={16} sx={{ mt: 1 }} />
    <Skeleton variant="rounded" height={36} sx={{ mt: 2 }} />
  </Card>
);

// ── Empty state ──
const EmptyState = ({ filtered }: { filtered: boolean }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 400,
      textAlign: "center",
      gap: 2,
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        backgroundColor: "#f5f0fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PersonOffOutlinedIcon sx={{ fontSize: 40, color: PRIMARY }} />
    </Box>
    <Typography variant="h6" fontWeight={700}>
      {filtered ? "No professionals match your filters" : "No professionals available yet"}
    </Typography>
    <Typography color="text.secondary" fontSize={14} maxWidth={340}>
      {filtered
        ? "Try adjusting your search or filters to find someone."
        : "Check back soon — more professionals are joining every day."}
    </Typography>
  </Box>
);

// ── Professional card ──
const ProCard = ({
  pro,
  onClick,
}: {
  pro: Professional;
  onClick: () => void;
}) => {
  const rating = pro.rating ?? 4.5;
  const reviews = pro.reviews ?? 0;
  const price = pro.price ?? 250;

  return (
    <Card
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        border: "1px solid #eee",
        boxShadow: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Badges */}
        <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
          {(pro.rating ?? 0) >= 4.5 && (
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
              label="Top Rated"
              size="small"
              sx={{ backgroundColor: "#dcfce7", color: "#166534", fontWeight: 600 }}
            />
          )}
          {(pro.reviews ?? 0) > 100 && (
            <Chip
              label="Most Booked"
              size="small"
              sx={{ backgroundColor: "#ede9fe", color: "#5b21b6", fontWeight: 600 }}
            />
          )}
        </Stack>

        {/* Profile */}
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            src={pro.image}
            sx={{ width: 56, height: 56, bgcolor: "text.secondary", flexShrink: 0 }}
          >
            {!pro.image && getInitials(pro.name, pro.surname)}
          </Avatar>
          <Box minWidth={0}>
            <Typography fontWeight={700} noWrap>
              {pro.name} {pro.surname}
            </Typography>
            <Typography fontSize={12} color="text.secondary" noWrap>
              {pro.currentJobTitle || "Professional"}
            </Typography>
            {pro.companyName && (
              <Typography fontSize={12} color="text.secondary" noWrap>
                {pro.companyName}
              </Typography>
            )}
          </Box>
        </Stack>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
          <StarIcon sx={{ fontSize: 14, color: ratingColor(rating) }} />
          <Typography fontSize={13} fontWeight={600} color={ratingColor(rating)}>
            {rating.toFixed(1)}
          </Typography>
          {reviews > 0 && (
            <Typography fontSize={12} color="text.secondary">
              ({reviews} review{reviews !== 1 ? "s" : ""})
            </Typography>
          )}
        </Stack>

        {/* Focus area tags */}
        {(pro.interviewFocusArea?.length ?? 0) > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={0.5} mt={1}>
            {pro.interviewFocusArea!.slice(0, 3).map((tag, i) => (
              <Chip key={i} label={tag} size="small" sx={{ fontSize: 11 }} />
            ))}
          </Stack>
        )}

        {/* About */}
        {pro.aboutUser && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: 13,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {pro.aboutUser}
          </Typography>
        )}

        {/* Availability 
        {(pro.availability?.length ?? 0) > 0 && (
          <Box mt={1.5}>
            <Typography fontSize={11} fontWeight={600} color="text.secondary" mb={0.5}>
              NEXT AVAILABLE
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap">
              {pro.availability!.slice(0, 2).map((slot, i) => (
                <Chip
                  key={i}
                  label={slot}
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ fontSize: 11 }}
                />
              ))}
            </Stack>
          </Box>
        )}*/}
      </CardContent>

      {/* CTA */}
      <Box mt={2}>
        <Typography fontWeight={700} fontSize={16}>
          R{price.toLocaleString()}
          <Typography component="span" fontSize={12} color="text.secondary" ml={0.5}>
            / session
          </Typography>
        </Typography>

        <Button
          fullWidth
          variant={pro.instantBooking ? "contained" : "outlined"}
          sx={{
            mt: 1,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600,
            ...(pro.instantBooking
              ? {
                  backgroundColor: PRIMARY,
                  "&:hover": { backgroundColor: "#6a35c9" },
                }
              : {
                  borderColor: PRIMARY,
                  color: PRIMARY,
                  "&:hover": { backgroundColor: "#f5f0fd" },
                }),
          }}
        >
          {pro.instantBooking ? "Instant Book" : "Request Session"}
        </Button>
      </Box>
    </Card>
  );
};

// ── Main component ──
const Professionals: React.FC = () => {
  const navigate = useNavigate();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("best");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch
  useEffect(() => {
    let cancelled = false;

    const fetchProfessionals = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(API_URL, { timeout: 10000 });
        if (!cancelled) {
          if (data?.success) {
            setProfessionals(
              Array.isArray(data.result) ? data.result : []
            );
          } else {
            setError("Failed to load professionals. Please try again.");
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          if (err.code === "ECONNABORTED") {
            setError("Request timed out. Please check your connection.");
          } else if (err.response?.status === 404) {
            setError("Professionals endpoint not found.");
          } else if (err.response?.status >= 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfessionals();
    return () => { cancelled = true; };
  }, []);

  // Unique categories
  const categories = useMemo(
    () =>
      Array.from(
        new Set(professionals.map((p) => p.field).filter((f): f is string => !!f))
      ),
    [professionals]
  );

  // Max price from data
  const dataMaxPrice = useMemo(
    () => Math.max(MAX_PRICE, ...professionals.map((p) => p.price ?? 0)),
    [professionals]
  );

  // Filter + sort
  const filteredProfessionals = useMemo(() => {
    const lower = filterText.toLowerCase().trim();

    const result = professionals.filter((pro) => {
      const textMatch =
        !lower ||
        `${pro.name} ${pro.surname}`.toLowerCase().includes(lower) ||
        (pro.currentJobTitle?.toLowerCase().includes(lower) ?? false) ||
        (pro.companyName?.toLowerCase().includes(lower) ?? false) ||
        (pro.interviewFocusArea?.some((t) => t.toLowerCase().includes(lower)) ?? false);

      const categoryMatch = !selectedCategory || pro.field === selectedCategory;
      const price = pro.price ?? 0;
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      const ratingMatch = (pro.rating ?? 0) >= minRating;

      return textMatch && categoryMatch && priceMatch && ratingMatch;
    });

    return result.sort((a, b) => {
      if (sortBy === "priceLow") return (a.price ?? 0) - (b.price ?? 0);
      if (sortBy === "priceHigh") return (b.price ?? 0) - (a.price ?? 0);
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      // best match: rating × reviews
      return (b.rating ?? 0) * (b.reviews ?? 1) - (a.rating ?? 0) * (a.reviews ?? 1);
    });
  }, [filterText, selectedCategory, priceRange, minRating, sortBy, professionals]);

  const hasActiveFilters =
    !!filterText || !!selectedCategory || minRating > 0 ||
    priceRange[0] > 0 || priceRange[1] < dataMaxPrice;

  const resetFilters = () => {
    setFilterText("");
    setSelectedCategory("");
    setPriceRange([0, dataMaxPrice]);
    setMinRating(0);
    setSortBy("best");
  };

  // ── Render ──
  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 4,
        backgroundColor: "#FFFFFF",
        // backgroundColor: "#f8f9fb",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={1}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Find a Professional
          </Typography>
          {!loading && !error && (
            <Typography variant="body2" color="text.secondary">
              {filteredProfessionals.length} professional
              {filteredProfessionals.length !== 1 ? "s" : ""} available
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={resetFilters}
              sx={{ textTransform: "none", color: PRIMARY }}
            >
              Clear filters
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              display: { md: "none" },
              textTransform: "none",
              borderColor: PRIMARY,
              color: PRIMARY,
              borderRadius: 3,
            }}
          >
            Filters
          </Button>
        </Stack>
      </Stack>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 3 }}
          action={
            <Button
              size="small"
              onClick={() => window.location.reload()}
              sx={{ textTransform: "none" }}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Filters sidebar */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{ display: { xs: showFilters ? "block" : "none", md: "block" } }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              position: { md: "sticky" },
              top: 80,
              border: "1px solid #eee",
              borderRadius: 4,
            }}
          >
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name, role..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: "#aaa" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="best">Best Match</MenuItem>
                  <MenuItem value="priceLow">Price: Low → High</MenuItem>
                  <MenuItem value="priceHigh">Price: High → Low</MenuItem>
                  <MenuItem value="rating">Top Rated</MenuItem>
                </Select>
              </FormControl>

              {categories.length > 0 && (
                <>
                  <Divider />
                  <Box>
                    <Typography fontWeight={600} fontSize={14} mb={1}>
                      Category
                    </Typography>
                    <Stack spacing={0.5}>
                      {categories.map((cat) => (
                        <FormControlLabel
                          key={cat}
                          control={
                            <Checkbox
                              size="small"
                              checked={selectedCategory === cat}
                              onChange={() =>
                                setSelectedCategory(
                                  selectedCategory === cat ? "" : cat
                                )
                              }
                              sx={{ color: PRIMARY, "&.Mui-checked": { color: PRIMARY } }}
                            />
                          }
                          label={
                            <Typography fontSize={13}>{cat}</Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Box>
                </>
              )}

              <Divider />

              <Box>
                <Typography fontWeight={600} fontSize={14} mb={1}>
                  Price Range
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, val) => setPriceRange(val as [number, number])}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `R${v}`}
                  min={0}
                  max={dataMaxPrice}
                  sx={{ color: PRIMARY }}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontSize={12} color="text.secondary">
                    R{priceRange[0]}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    R{priceRange[1]}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography fontWeight={600} fontSize={14} mb={1}>
                  Minimum Rating
                </Typography>
                <Slider
                  value={minRating}
                  onChange={(_, val) => setMinRating(val as number)}
                  valueLabelDisplay="auto"
                  step={0.5}
                  min={0}
                  max={5}
                  sx={{ color: PRIMARY }}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontSize={12} color="text.secondary">
                    Any
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    ⭐ {minRating > 0 ? minRating.toFixed(1) + "+" : "All"}
                  </Typography>
                </Stack>
              </Box>

              {hasActiveFilters && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={resetFilters}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    borderColor: "#ddd",
                    color: "#555",
                  }}
                >
                  Reset all filters
                </Button>
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* Cards grid */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 9 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : error ? null : filteredProfessionals.length === 0 ? (
            <EmptyState filtered={hasActiveFilters} />
          ) : (
            <Grid container spacing={2}>
              {filteredProfessionals.map((pro) => (
                <Grid item xs={12} sm={6} md={4} key={pro._id}>
                  <ProCard
                    pro={pro}
                    onClick={() =>
                      navigate(`/professional-details/${pro._id}`)
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Professionals;