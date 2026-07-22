// import React, { useMemo, useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   MenuItem,
//   Card,
//   Button,
//   Stack,
//   Chip,
//   Divider,
//   InputAdornment,
//   Drawer,
//   IconButton,
//   useTheme,
//   useMediaQuery,
//   Alert,
//   Skeleton,
//   Slider,
//   FormControl,
//   InputLabel,
//   Select,
//   Checkbox,
//   FormControlLabel,
//   Badge,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import TuneIcon from "@mui/icons-material/Tune";
// import CloseIcon from "@mui/icons-material/Close";

// // ── Constants ──
// const PRIMARY = "#7F42E7";
// const MAX_SALARY = 150000;

// // ── Salary parser helper ──
// const parseSalaryMin = (salaryStr: string): number => {
//   const match = salaryStr.match(/R([\d]+)k/);
//   return match ? parseInt(match[1]) * 1000 : 0;
// };
// const parseSalaryMax = (salaryStr: string): number => {
//   const matches = salaryStr.match(/R([\d]+)k/g);
//   if (!matches || matches.length < 2) return MAX_SALARY;
//   const last = matches[matches.length - 1].replace("R", "").replace("k", "");
//   return parseInt(last) * 1000;
// };

// // ── Types ──
// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   location: string;
//   type: string;
//   level: string;
//   salary: string;
//   skills: string[];
//   deadline?: string;
//   description: string;
//   responsibilities: string[];
//   requirements: string[];
//   tools: string[];
// }

// // ── Mock Data ──
// const jobsMock: Job[] = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     company: "Sportserve",
//     location: "Remote",
//     type: "Full-Time",
//     level: "Mid",
//     salary: "R45k - R70k",
//     skills: ["React", "TypeScript", "Next.js", "Tailwind"],
//     deadline: "30 May 2026",
//     description: `Sportserve forms part of a global group of sports betting and sportsbook technology companies. We are focused on delivering world-class digital experiences to millions of users worldwide.\n\nWe are looking for a Frontend Developer who is passionate about building scalable and performant web applications. You will work closely with product, design, and backend teams to bring ideas to life.`,
//     responsibilities: [
//       "Develop modern frontend applications using React and Next.js",
//       "Collaborate with designers and backend engineers",
//       "Build reusable UI components",
//       "Optimize applications for performance and scalability",
//       "Participate in code reviews and technical discussions",
//     ],
//     requirements: [
//       "3+ years experience with JavaScript / TypeScript",
//       "Strong experience with React or similar frameworks",
//       "Understanding of REST APIs",
//       "Experience with Git and version control",
//       "Strong problem-solving skills",
//     ],
//     tools: ["React", "Next.js", "Docker", "GitLab CI/CD", "TailwindCSS"],
//   },
//   {
//     id: 2,
//     title: "Data Analyst",
//     company: "Discovery",
//     location: "Sandton",
//     type: "Full-Time",
//     level: "Entry",
//     salary: "R25k - R40k",
//     skills: ["Python", "SQL", "Power BI"],
//     description: `Discovery is seeking a Data Analyst to join our analytics team. You will work with large datasets to generate insights that drive business decisions.`,
//     responsibilities: [
//       "Analyze large datasets to extract insights",
//       "Build dashboards and reports",
//       "Work with stakeholders to understand data needs",
//       "Ensure data accuracy and integrity",
//     ],
//     requirements: [
//       "Degree in Data Science, Statistics or related field",
//       "Strong SQL and Python skills",
//       "Experience with Power BI or Tableau",
//       "Analytical mindset",
//     ],
//     tools: ["Python", "SQL", "Power BI", "Excel"],
//   },
//   {
//     id: 3,
//     title: "Backend Engineer",
//     company: "Takealot",
//     location: "Cape Town",
//     type: "Full-Time",
//     level: "Mid",
//     salary: "R50k - R80k",
//     skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
//     description: `Join Takealot's backend team and help build scalable systems that power one of South Africa's largest e-commerce platforms.`,
//     responsibilities: [
//       "Design and build scalable APIs",
//       "Work with databases and optimize queries",
//       "Ensure system reliability and performance",
//       "Collaborate with frontend teams",
//     ],
//     requirements: [
//       "Experience with Node.js and Express",
//       "Strong understanding of databases",
//       "Experience with cloud platforms",
//       "Knowledge of system design",
//     ],
//     tools: ["Node.js", "PostgreSQL", "Docker", "AWS"],
//   },
// ];

// const extendedJobs: Job[] = Array.from({ length: 30 }).map((_, i) => ({
//   ...jobsMock[i % jobsMock.length],
//   id: i,
// }));

// // ── Job card skeleton ──
// const JobCardSkeleton = () => (
//   <Card sx={{ p: 2, borderRadius: 3, boxShadow: "none", border: "1px solid #eee" }}>
//     <Skeleton width="60%" height={20} />
//     <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
//     <Stack direction="row" spacing={1} mt={1}>
//       <Skeleton variant="rounded" width={60} height={24} />
//       <Skeleton variant="rounded" width={50} height={24} />
//     </Stack>
//     <Skeleton width="30%" height={16} sx={{ mt: 1 }} />
//   </Card>
// );

// // ── Empty state ──
// const EmptyState = ({ filtered }: { filtered: boolean }) => (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       py: 10,
//       textAlign: "center",
//       gap: 1.5,
//     }}
//   >
//     <Box
//       sx={{
//         width: 72,
//         height: 72,
//         borderRadius: "50%",
//         bgcolor: "#f5f0fd",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <WorkOutlineIcon sx={{ fontSize: 36, color: PRIMARY }} />
//     </Box>
//     <Typography fontWeight={700} fontSize={16}>
//       {filtered ? "No jobs match your search" : "No jobs available yet"}
//     </Typography>
//     <Typography fontSize={14} color="text.secondary" maxWidth={300}>
//       {filtered
//         ? "Try adjusting your search or filters."
//         : "Check back soon — new jobs are posted regularly."}
//     </Typography>
//   </Box>
// );

// // ── Job detail panel ──
// const JobDetail = ({ job, isMobile }: { job: Job; isMobile: boolean }) => (
//   <Box p={isMobile ? 2 : 4} maxWidth={800} width="100%">
//     <Typography fontSize={{ xs: 20, md: 24 }} fontWeight={700}>
//       {job.title}
//     </Typography>

//     <Typography color="#777" fontSize={14} mb={2}>
//       {job.company} • {job.location}
//     </Typography>

//     <Stack
//       direction={{ xs: "column", sm: "row" }}
//       justifyContent="space-between"
//       alignItems={{ xs: "flex-start", sm: "center" }}
//       gap={1.5}
//       mb={3}
//     >
//       <Stack direction="row" spacing={1} flexWrap="wrap">
//         <Chip label={job.type} size="small" />
//         <Chip label={job.level} size="small" />
//       </Stack>

//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: PRIMARY,
//           borderRadius: 6,
//           px: 3,
//           textTransform: "none",
//           fontWeight: 600,
//           whiteSpace: "nowrap",
//           "&:hover": { backgroundColor: "#6a35c9" },
//         }}
//       >
//         Apply Now
//       </Button>
//     </Stack>

//     {job.deadline && (
//       <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
//         Application deadline: <strong>{job.deadline}</strong>
//       </Alert>
//     )}

//     <Divider sx={{ my: 2 }} />

//     <Typography fontWeight={600} mb={1}>
//       About the Role
//     </Typography>
//     <Typography fontSize={14} color="#444" sx={{ whiteSpace: "pre-line" }} mb={2}>
//       {job.description}
//     </Typography>

//     <Typography fontWeight={600} mt={2}>
//       Responsibilities
//     </Typography>
//     <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
//       {job.responsibilities.map((r, i) => (
//         <Box component="li" key={i}>
//           <Typography fontSize={14}>{r}</Typography>
//         </Box>
//       ))}
//     </Box>

//     <Typography fontWeight={600} mt={2}>
//       Requirements
//     </Typography>
//     <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
//       {job.requirements.map((r, i) => (
//         <Box component="li" key={i}>
//           <Typography fontSize={14}>{r}</Typography>
//         </Box>
//       ))}
//     </Box>

//     <Typography fontWeight={600} mt={2} mb={1}>
//       Tech Stack
//     </Typography>
//     <Stack direction="row" gap={1} flexWrap="wrap">
//       {job.tools.map((t, i) => (
//         <Chip key={i} label={t} size="small" />
//       ))}
//     </Stack>

//     <Divider sx={{ my: 3 }} />

//     <Typography fontWeight={700} fontSize={16}>
//       💰 {job.salary}
//     </Typography>
//   </Box>
// );

// // ── Filter Drawer ──
// interface FilterState {
//   jobType: string[];
//   location: string;
//   salaryRange: [number, number];
//   skills: string[];
// }

// const ALL_JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"];
// const ALL_LOCATIONS = ["All", "Remote", "Sandton", "Cape Town", "Johannesburg", "Pretoria", "Durban"];
// const ALL_SKILLS = ["React", "TypeScript", "Python", "SQL", "Node.js", "Docker", "AWS", "Power BI", "Next.js"];

// const FilterDrawer = ({
//   open,
//   onClose,
//   filters,
//   setFilters,
//   onReset,
//   activeCount,
// }: {
//   open: boolean;
//   onClose: () => void;
//   filters: FilterState;
//   setFilters: (f: FilterState) => void;
//   onReset: () => void;
//   activeCount: number;
// }) => {
//   const toggleJobType = (type: string) => {
//     const updated = filters.jobType.includes(type)
//       ? filters.jobType.filter((t) => t !== type)
//       : [...filters.jobType, type];
//     setFilters({ ...filters, jobType: updated });
//   };

//   const toggleSkill = (skill: string) => {
//     const updated = filters.skills.includes(skill)
//       ? filters.skills.filter((s) => s !== skill)
//       : [...filters.skills, skill];
//     setFilters({ ...filters, skills: updated });
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: { xs: "100vw", sm: 380 },
//           maxWidth: "100vw",
//           px: 3,
//           py: 3,
//           boxSizing: "border-box",
//           overflowX: "hidden",
//         },
//       }}
//     >
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography fontWeight={700} fontSize={18}>Filters</Typography>
//         <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
//       </Stack>

//       <Stack spacing={3} sx={{ overflowY: "auto", flex: 1 }}>
//         {/* Job Type */}
//         <Box>
//           <Typography fontWeight={700} fontSize={14} mb={1.5}>Job Type</Typography>
//           <Stack direction="row" flexWrap="wrap" gap={1}>
//             {ALL_JOB_TYPES.map((type) => (
//               <Chip
//                 key={type}
//                 label={type}
//                 onClick={() => toggleJobType(type)}
//                 sx={{
//                   borderRadius: 2,
//                   fontWeight: filters.jobType.includes(type) ? 700 : 400,
//                   bgcolor: filters.jobType.includes(type) ? PRIMARY : "transparent",
//                   color: filters.jobType.includes(type) ? "#fff" : "#555",
//                   border: filters.jobType.includes(type) ? "none" : "1px solid #ddd",
//                   cursor: "pointer",
//                   "&:hover": { bgcolor: filters.jobType.includes(type) ? "#6a35c9" : "#f5f5f5" },
//                 }}
//               />
//             ))}
//           </Stack>
//         </Box>

//         <Divider />

//         {/* Location */}
//         <Box>
//           <Typography fontWeight={700} fontSize={14} mb={1.5}>Location</Typography>
//           <FormControl fullWidth size="small">
//             <InputLabel sx={{ "&.Mui-focused": { color: PRIMARY } }}>Location</InputLabel>
//             <Select
//               value={filters.location}
//               label="Location"
//               onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//               sx={{ borderRadius: 2, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY } }}
//             >
//               {ALL_LOCATIONS.map((loc) => (
//                 <MenuItem key={loc} value={loc}>{loc}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         <Divider />

//         {/* Salary Range */}
//         <Box>
//           <Typography fontWeight={700} fontSize={14} mb={2}>Salary Range (per month)</Typography>
//           <Slider
//             value={filters.salaryRange}
//             onChange={(_, val) => setFilters({ ...filters, salaryRange: val as [number, number] })}
//             valueLabelDisplay="auto"
//             valueLabelFormat={(v) => `R${(v / 1000).toFixed(0)}k`}
//             min={0}
//             max={MAX_SALARY}
//             step={5000}
//             sx={{ color: PRIMARY }}
//           />
//           <Stack direction="row" justifyContent="space-between" mt={1}>
//             <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
//               <Typography fontSize={11} color="text.secondary">Min</Typography>
//               <Typography fontSize={13} fontWeight={700}>R{(filters.salaryRange[0] / 1000).toFixed(0)}k</Typography>
//             </Box>
//             <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
//               <Typography fontSize={11} color="text.secondary">Max</Typography>
//               <Typography fontSize={13} fontWeight={700}>R{(filters.salaryRange[1] / 1000).toFixed(0)}k</Typography>
//             </Box>
//           </Stack>
//         </Box>

//         <Divider />

//         {/* Skills */}
//         <Box>
//           <Typography fontWeight={700} fontSize={14} mb={1.5}>Skills / Tech Stack</Typography>
//           <Stack direction="row" flexWrap="wrap" gap={1}>
//             {ALL_SKILLS.map((skill) => (
//               <Chip
//                 key={skill}
//                 label={skill}
//                 onClick={() => toggleSkill(skill)}
//                 sx={{
//                   borderRadius: 2,
//                   fontWeight: filters.skills.includes(skill) ? 700 : 400,
//                   bgcolor: filters.skills.includes(skill) ? "#f5f0fd" : "transparent",
//                   color: filters.skills.includes(skill) ? PRIMARY : "#555",
//                   border: filters.skills.includes(skill) ? `1px solid ${PRIMARY}` : "1px solid #ddd",
//                   cursor: "pointer",
//                 }}
//               />
//             ))}
//           </Stack>
//         </Box>

//         <Divider />
//       </Stack>

//       <Stack spacing={1.5} mt={3}>
//         {activeCount > 0 && (
//           <Button
//             fullWidth
//             variant="outlined"
//             onClick={() => { onReset(); onClose(); }}
//             sx={{ borderRadius: 3, textTransform: "none", borderColor: "#ddd", color: "#555" }}
//           >
//             Clear all filters
//           </Button>
//         )}
//         <Button
//           fullWidth
//           variant="contained"
//           onClick={onClose}
//           sx={{
//             borderRadius: 3,
//             textTransform: "none",
//             fontWeight: 700,
//             backgroundColor: PRIMARY,
//             "&:hover": { backgroundColor: "#6a35c9" },
//           }}
//         >
//           Show Results
//         </Button>
//       </Stack>
//     </Drawer>
//   );
// };

// // ── Main component ──
// const Applications = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [search, setSearch] = useState("");
//   const [level, setLevel] = useState("");
//   const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState<Job>(extendedJobs[0]);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [loading] = useState(false);

//   const defaultFilters: FilterState = {
//     jobType: [],
//     location: "All",
//     salaryRange: [0, MAX_SALARY],
//     skills: [],
//   };
//   const [advancedFilters, setAdvancedFilters] = useState<FilterState>(defaultFilters);

//   const activeFilterCount = useMemo(() => {
//     let count = 0;
//     if (advancedFilters.jobType.length > 0) count++;
//     if (advancedFilters.location !== "All") count++;
//     if (advancedFilters.salaryRange[0] > 0 || advancedFilters.salaryRange[1] < MAX_SALARY) count++;
//     if (advancedFilters.skills.length > 0) count++;
//     return count;
//   }, [advancedFilters]);

//   const filtered = useMemo(() => {
//     const lower = search.toLowerCase().trim();
//     return extendedJobs
//       .filter((job) =>
//         !lower ||
//         job.title.toLowerCase().includes(lower) ||
//         job.company.toLowerCase().includes(lower) ||
//         job.location.toLowerCase().includes(lower)
//       )
//       .filter((job) => (level ? job.level.toLowerCase() === level.toLowerCase() : true))
//       .filter((job) =>
//         advancedFilters.jobType.length === 0 ||
//         advancedFilters.jobType.some((t) => t.toLowerCase() === job.type.toLowerCase() ||
//           (t === "Remote" && job.location.toLowerCase() === "remote"))
//       )
//       .filter((job) =>
//         advancedFilters.location === "All" ||
//         job.location.toLowerCase() === advancedFilters.location.toLowerCase()
//       )
//       .filter((job) => {
//         const min = parseSalaryMin(job.salary);
//         const max = parseSalaryMax(job.salary);
//         return max >= advancedFilters.salaryRange[0] && min <= advancedFilters.salaryRange[1];
//       })
//       .filter((job) =>
//         advancedFilters.skills.length === 0 ||
//         advancedFilters.skills.every((skill) =>
//           job.skills.some((s) => s.toLowerCase() === skill.toLowerCase()) ||
//           job.tools.some((t) => t.toLowerCase() === skill.toLowerCase())
//         )
//       );
//   }, [search, level, advancedFilters]);

//   const hasActiveFilters = !!search || !!level || activeFilterCount > 0;

//   const handleJobClick = (job: Job) => {
//     setSelectedJob(job);
//     if (isMobile) setMobileOpen(true);
//   };

//   const resetFilters = () => {
//     setSearch("");
//     setLevel("");
//     setAdvancedFilters(defaultFilters);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         backgroundColor: "#FFFFFF",
//         overflowX: "hidden",
//       }}
//     >
//       {/* ── Search bar ── */}
//       <Box
//         sx={{
//           px: { xs: 2, md: 4 },
//           py: 2,
//           borderBottom: "1px solid #eee",
//           bgcolor: "#fff",
//         }}
//       >
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={1}
//           alignItems={{ xs: "stretch", sm: "center" }}
//         >
//           <TextField
//             size="small"
//             fullWidth
//             placeholder="Search by title, company or location..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon fontSize="small" sx={{ color: "#aaa" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 3,
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
//               },
//             }}
//           />

//           <TextField
//             size="small"
//             select
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             sx={{
//               minWidth: 160,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 3,
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
//               },
//               "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <WorkOutlineIcon fontSize="small" sx={{ color: "#aaa" }} />
//                 </InputAdornment>
//               ),
//             }}
//           >
//             <MenuItem value="">All Levels</MenuItem>
//             <MenuItem value="entry">Entry</MenuItem>
//             <MenuItem value="mid">Mid</MenuItem>
//             <MenuItem value="senior">Senior</MenuItem>
//           </TextField>

//           <Badge badgeContent={activeFilterCount} color="secondary" sx={{ flexShrink: 0 }}>
//             <Button
//               variant="outlined"
//               startIcon={<TuneIcon />}
//               onClick={() => setFilterDrawerOpen(true)}
//               sx={{
//                 textTransform: "none",
//                 borderColor: activeFilterCount > 0 ? PRIMARY : "#ddd",
//                 color: activeFilterCount > 0 ? PRIMARY : "#555",
//                 borderRadius: 3,
//                 fontWeight: activeFilterCount > 0 ? 700 : 400,
//                 whiteSpace: "nowrap",
//                 width: { xs: "100%", sm: "auto" },
//               }}
//             >
//               Filters
//             </Button>
//           </Badge>

//           {hasActiveFilters && (
//             <Button
//               onClick={resetFilters}
//               size="small"
//               sx={{
//                 textTransform: "none",
//                 color: PRIMARY,
//                 whiteSpace: "nowrap",
//                 flexShrink: 0,
//               }}
//             >
//               Clear all
//             </Button>
//           )}
//         </Stack>

//         {/* Active filter chips */}
//         {(advancedFilters.jobType.length > 0 || advancedFilters.location !== "All" || advancedFilters.skills.length > 0) && (
//           <Stack direction="row" flexWrap="wrap" gap={0.75} mt={1.5}>
//             {advancedFilters.jobType.map((type) => (
//               <Chip
//                 key={type}
//                 label={type}
//                 size="small"
//                 onDelete={() => setAdvancedFilters({ ...advancedFilters, jobType: advancedFilters.jobType.filter((t) => t !== type) })}
//                 sx={{ bgcolor: "#f5f0fd", color: PRIMARY, fontSize: 11 }}
//               />
//             ))}
//             {advancedFilters.location !== "All" && (
//               <Chip
//                 label={`📍 ${advancedFilters.location}`}
//                 size="small"
//                 onDelete={() => setAdvancedFilters({ ...advancedFilters, location: "All" })}
//                 sx={{ bgcolor: "#f5f0fd", color: PRIMARY, fontSize: 11 }}
//               />
//             )}
//             {advancedFilters.skills.map((skill) => (
//               <Chip
//                 key={skill}
//                 label={skill}
//                 size="small"
//                 onDelete={() => setAdvancedFilters({ ...advancedFilters, skills: advancedFilters.skills.filter((s) => s !== skill) })}
//                 sx={{ bgcolor: "#f5f0fd", color: PRIMARY, fontSize: 11 }}
//               />
//             ))}
//           </Stack>
//         )}
//       </Box>

//       {/* ── Title row ── */}
//       <Box sx={{ px: { xs: 2, md: 4 }, pt: 2.5, pb: 1 }}>
//         <Typography variant="h5" fontWeight="bold">
//           Jobs for you
//         </Typography>
//         {!loading && (
//           <Typography variant="body2" color="text.secondary" mt={0.5}>
//             {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
//           </Typography>
//         )}
//       </Box>

//       {/* ── Split panel ── */}
//       <Stack direction="row" sx={{ flex: 1, overflow: "hidden" }}>
//         {/* LEFT — job list */}
//         <Box
//           sx={{
//             width: { xs: "100%", md: "38%" },
//             borderRight: { md: "1px solid #eee" },
//             overflowY: "auto",
//             px: { xs: 1.5, md: 2 },
//             py: 2,
//             height: { md: "calc(100vh - 150px)" },
//           }}
//         >
//           {loading ? (
//             <Stack spacing={1.5}>
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <JobCardSkeleton key={i} />
//               ))}
//             </Stack>
//           ) : filtered.length === 0 ? (
//             <EmptyState filtered={hasActiveFilters} />
//           ) : (
//             <Stack spacing={1.5}>
//               {filtered.map((job) => (
//                 <Card
//                   key={job.id}
//                   onClick={() => handleJobClick(job)}
//                   sx={{
//                     p: 2,
//                     cursor: "pointer",
//                     borderRadius: 3,
//                     boxShadow: "none",
//                     border:
//                       selectedJob?.id === job.id
//                         ? `2px solid ${PRIMARY}`
//                         : "1px solid #eee",
//                     bgcolor:
//                       selectedJob?.id === job.id ? "#faf8ff" : "#fff",
//                     transition: "box-shadow 0.15s ease, border-color 0.15s ease",
//                     "&:hover": { boxShadow: 2 },
//                     minWidth: 0,
//                   }}
//                 >
//                   <Typography fontWeight={600} fontSize={15} noWrap>
//                     {job.title}
//                   </Typography>
//                   <Typography fontSize={13} color="#777" noWrap>
//                     {job.company} • {job.location}
//                   </Typography>

//                   <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" gap={0.5}>
//                     <Chip label={job.type} size="small" />
//                     <Chip label={job.level} size="small" />
//                   </Stack>

//                   <Typography fontSize={12} mt={1} color="#555">
//                     💰 {job.salary}
//                   </Typography>

//                   {job.deadline && (
//                     <Typography fontSize={11} color="#aaa" mt={0.5}>
//                       Closes {job.deadline}
//                     </Typography>
//                   )}
//                 </Card>
//               ))}
//             </Stack>
//           )}
//         </Box>

//         {/* RIGHT — job detail (desktop only) */}
//         <Box
//           sx={{
//             display: { xs: "none", md: "block" },
//             flex: 1,
//             overflowY: "auto",
//             height: "calc(100vh - 150px)",
//             bgcolor: "#fff",
//           }}
//         >
//           {selectedJob && (
//             <JobDetail job={selectedJob} isMobile={false} />
//           )}
//         </Box>
//       </Stack>

//       {/* ── Mobile bottom drawer ── */}
//       <Drawer
//         anchor="bottom"
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         PaperProps={{
//           sx: {
//             height: "92%",
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             overflowY: "auto",
//           },
//         }}
//       >
//         {/* Drag handle */}
//         <Box
//           sx={{
//             width: 40,
//             height: 4,
//             bgcolor: "#ddd",
//             borderRadius: 2,
//             mx: "auto",
//             mt: 1.5,
//             mb: 0.5,
//             flexShrink: 0,
//           }}
//         />

//         <Stack
//           direction="row"
//           alignItems="center"
//           px={1}
//           pb={1}
//           sx={{ borderBottom: "1px solid #eee", flexShrink: 0 }}
//         >
//           <IconButton onClick={() => setMobileOpen(false)}>
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography fontWeight={600} fontSize={15}>
//             Job Details
//           </Typography>
//         </Stack>

//         {selectedJob && <JobDetail job={selectedJob} isMobile={true} />}
//       </Drawer>

//       {/* ── Advanced Filter Drawer ── */}
//       <FilterDrawer
//         open={filterDrawerOpen}
//         onClose={() => setFilterDrawerOpen(false)}
//         filters={advancedFilters}
//         setFilters={setAdvancedFilters}
//         onReset={resetFilters}
//         activeCount={activeFilterCount}
//       />
//     </Box>
//   );
// };

// export default Applications;






import React, { useMemo, useState, useCallback } from "react";
import {
  Box, Typography, Stack, Grid, Avatar, Drawer,
} from "@mui/material";
import {
  Search, SlidersHorizontal, X, ArrowLeft, MapPin, Briefcase,
  Clock, Zap, CheckCircle2, ChevronRight, Calendar,
  BookOpen, Star, DollarSign, AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
interface Job {
  id:               number;
  title:            string;
  company:          string;
  location:         string;
  type:             string;
  level:            string;
  salary:           string;
  skills:           string[];
  deadline?:        string;
  about:            string;
  responsibilities: string[];
  requirements:     string[];
  tools:            string[];
}

interface FilterState {
  types:  string[];
  skills: string[];
}

/* ─────────────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────────────── */
const jobsMock: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Sportserve",
    location: "Remote",
    type: "Full-Time",
    level: "Mid",
    salary: "R45k–R70k",
    skills: ["React", "TypeScript", "Next.js"],
    deadline: "30 May 2026",
    about:
      "Sportserve builds world-class digital experiences for millions of users globally. We want a Frontend Developer who thrives on scalable, performant web apps and loves working closely with product and design teams.",
    responsibilities: [
      "Build modern apps with React and Next.js",
      "Create reusable, accessible UI components",
      "Optimise for performance and Core Web Vitals",
      "Participate in code reviews and RFC discussions",
    ],
    requirements: [
      "3+ years with TypeScript / JavaScript",
      "Strong React or Next.js experience",
      "Familiarity with REST and GraphQL APIs",
      "Git workflow and CI/CD literacy",
    ],
    tools: ["React", "Next.js", "TailwindCSS", "Docker", "GitLab CI"],
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Discovery",
    location: "Sandton",
    type: "Full-Time",
    level: "Entry",
    salary: "R25k–R40k",
    skills: ["Python", "SQL", "Power BI"],
    about:
      "Discovery's analytics team is looking for a Data Analyst to surface insights from large datasets and translate them into decisions that improve millions of lives.",
    responsibilities: [
      "Analyse large datasets and extract actionable insights",
      "Build dashboards, reports and KPI trackers",
      "Collaborate with stakeholders to scope data needs",
      "Ensure data quality and governance standards",
    ],
    requirements: [
      "Degree in Data Science, Statistics or equivalent",
      "Strong SQL and Python proficiency",
      "Experience with Power BI or Tableau",
      "Detail-oriented analytical mindset",
    ],
    tools: ["Python", "SQL", "Power BI", "Excel", "dbt"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Takealot",
    location: "Cape Town",
    type: "Full-Time",
    level: "Mid",
    salary: "R50k–R80k",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    about:
      "Help power South Africa's largest e-commerce platform. You'll design and scale APIs that handle millions of daily transactions alongside a strong engineering team.",
    responsibilities: [
      "Design and ship high-throughput REST APIs",
      "Optimise database queries and schema design",
      "Maintain system reliability through observability",
      "Collaborate with mobile and frontend squads",
    ],
    requirements: [
      "Solid Node.js and Express experience",
      "Strong PostgreSQL / database fundamentals",
      "Cloud platform exposure (AWS or GCP)",
      "Appreciation for system design principles",
    ],
    tools: ["Node.js", "PostgreSQL", "Docker", "AWS", "Redis"],
  },
  {
    id: 4,
    title: "Product Designer",
    company: "Offerzen",
    location: "Remote",
    type: "Full-Time",
    level: "Mid",
    salary: "R40k–R65k",
    skills: ["Figma", "UX Research", "Prototyping"],
    about:
      "Offerzen is redefining how developers find jobs. Join us to craft the experiences that help thousands of engineers launch their next chapter.",
    responsibilities: [
      "Lead end-to-end design on core product flows",
      "Conduct user research and usability tests",
      "Collaborate closely with engineering on delivery",
      "Maintain and evolve our design system",
    ],
    requirements: [
      "3+ years product or UX design experience",
      "Expert-level Figma skills",
      "Proven UX research methods",
      "Strong communication of design rationale",
    ],
    tools: ["Figma", "Maze", "Jira", "Loom", "Notion"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Rain",
    location: "Johannesburg",
    type: "Contract",
    level: "Senior",
    salary: "R80k–R120k",
    skills: ["Kubernetes", "Terraform", "AWS"],
    about:
      "Rain is South Africa's mobile-only network. We need a DevOps engineer to own our infrastructure and help us scale to millions more subscribers.",
    responsibilities: [
      "Manage Kubernetes clusters across production",
      "Build and maintain Terraform infrastructure-as-code",
      "Own CI/CD pipelines and release engineering",
      "Champion observability across the stack",
    ],
    requirements: [
      "5+ years DevOps or SRE experience",
      "Deep Kubernetes and Helm knowledge",
      "Terraform at production scale",
      "AWS Professional certification a bonus",
    ],
    tools: ["Kubernetes", "Terraform", "AWS", "Datadog", "ArgoCD"],
  },
  {
    id: 6,
    title: "Mobile Developer",
    company: "FNB",
    location: "Johannesburg",
    type: "Full-Time",
    level: "Mid",
    salary: "R55k–R85k",
    skills: ["React Native", "iOS", "Android"],
    about:
      "FNB's digital banking app serves millions of South Africans. Join the mobile team and help shape how people experience their money every day.",
    responsibilities: [
      "Ship features across iOS and Android using React Native",
      "Integrate with secure banking APIs",
      "Champion mobile performance and accessibility",
      "Write thorough unit and E2E tests",
    ],
    requirements: [
      "3+ years React Native or Flutter",
      "Experience with native modules (Swift or Kotlin)",
      "Understanding of financial-grade security",
      "Strong testing discipline",
    ],
    tools: ["React Native", "Swift", "Kotlin", "Detox", "Fastlane"],
  },
];

const ALL_TYPES  = ["Full-Time", "Contract", "Part-Time", "Internship"];
const ALL_SKILLS = ["React", "TypeScript", "Python", "SQL", "Node.js", "Docker", "AWS", "Figma", "Next.js", "Kubernetes"];

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .fu  { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.07s; } .d2 { animation-delay:.13s; }
  .d3  { animation-delay:.19s; } .d4 { animation-delay:.25s; }

  /* Inputs */
  .search-wrap { position:relative; flex:1; min-width:180px; }
  .search-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:${INK3}; pointer-events:none; }
  .search-input {
    width:100%; padding:9px 14px 9px 36px;
    border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
    background:${WHITE}; outline:none; transition:border-color .18s;
  }
  .search-input:focus { border-color:${P}; }
  .search-input::placeholder { color:${INK3}; }

  .select-pill {
    padding:9px 14px; border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:13px; color:${INK2};
    background:${WHITE}; cursor:pointer; outline:none;
    transition:border-color .18s; appearance:none;
  }
  .select-pill:focus { border-color:${P}; }

  /* Buttons */
  .filter-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:9px 16px; border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:13px; color:${INK2};
    background:${WHITE}; cursor:pointer; font-weight:500;
    transition:all .18s; white-space:nowrap;
  }
  .filter-btn:hover { border-color:${P}; color:${P}; background:${PL}; }
  .filter-btn.active { border-color:${P}; color:${P}; background:${PL}; font-weight:700; }

  .back-btn {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 14px; border-radius:10px;
    border:1.5px solid ${BORDER}; background:${WHITE}; color:${INK2};
    cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:500;
    transition:all .18s;
  }
  .back-btn:hover { border-color:${P}; color:${P}; background:${PL}; }

  .apply-cta {
    display:flex; align-items:center; justify-content:center; gap:9px;
    width:100%; padding:15px; border:none; border-radius:14px;
    background:${P}; color:#fff; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700;
    box-shadow:0 6px 20px rgba(127,66,231,.3);
    transition:all .2s;
  }
  .apply-cta:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 12px 32px rgba(127,66,231,.42); }

  /* Job card */
  .job-card {
    padding:18px 20px; border:1.5px solid ${BORDER};
    border-radius:16px; background:${WHITE}; cursor:pointer;
    transition:border-color .2s, box-shadow .2s, transform .2s;
  }
  .job-card:hover  { border-color:${PM}; box-shadow:0 6px 20px rgba(127,66,231,.07); transform:translateY(-1px); }
  .job-card.active { border-color:${P}; background:#FDFBFF; box-shadow:0 6px 24px rgba(127,66,231,.1); }

  /* Chip */
  .chip {
    display:inline-flex; align-items:center; gap:5px;
    padding:3px 10px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
  }

  /* Tag */
  .tag {
    padding:3px 10px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${OFF};
    font-family:'DM Sans',sans-serif; font-size:11.5px; color:${INK2};
  }

  /* Row item */
  .row-item {
    display:flex; gap:12px; align-items:flex-start;
    padding:12px 16px; border:1.5px solid ${BORDER};
    border-radius:13px; background:${WHITE};
    transition:border-color .2s, transform .2s;
  }
  .row-item:hover { border-color:${PM}; transform:translateX(3px); }

  /* Stat card */
  .stat-card { border:1.5px solid ${BORDER}; border-radius:13px; padding:14px 16px; background:${WHITE}; }

  /* Drawer chip */
  .drawer-chip {
    padding:6px 14px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${OFF};
    font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500;
    color:${INK2}; cursor:pointer; transition:all .15s;
  }
  .drawer-chip.on { border-color:${P}; color:${P}; background:${PL}; font-weight:700; }
  .drawer-chip:hover { border-color:${PM}; }

  /* Scrollbar */
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:${BORDER}; border-radius:4px; }
`;

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */

/** Active filter chip */
const FilterChip = ({
  label, onRemove,
}: { label: string; onRemove: () => void }) => (
  <span
    className="chip"
    style={{ background: PL, color: P, cursor: "pointer", gap: 6 }}
    onClick={onRemove}
  >
    {label} <X size={10}/>
  </span>
);

/** Job list card */
const JobCard = ({
  job, active, onClick,
}: { job: Job; active: boolean; onClick: () => void }) => (
  <div className={`job-card fu ${active ? "active" : ""}`} onClick={onClick}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.75}>
      <Box minWidth={0}>
        <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: INK, lineHeight: 1.3, mb: .25 }}>
          {job.title}
        </Typography>
        <Typography sx={{ fontSize: 13, color: INK3 }}>
          {job.company} · {job.location}
        </Typography>
      </Box>
      <span className="chip" style={{ background: GRNL, color: GRN, flexShrink: 0, marginLeft: 8 }}>
        {job.salary}
      </span>
    </Stack>
    <Stack direction="row" flexWrap="wrap" gap={0.6} mt={1.25}>
      <span className="chip" style={{ background: OFF, color: INK2, border: `1.5px solid ${BORDER}` }}>{job.type}</span>
      <span className="chip" style={{ background: OFF, color: INK2, border: `1.5px solid ${BORDER}` }}>{job.level}</span>
      {job.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
    </Stack>
    {job.deadline && (
      <Typography sx={{ fontSize: 11.5, color: INK3, mt: 1 }}>
        Closes {job.deadline}
      </Typography>
    )}
  </div>
);

/** Full job detail panel */
const JobDetail = ({ job }: { job: Job }) => (
  <Box px={{ xs: 2.5, md: 3.5 }} pt={3.5} pb={5}>
    {/* Header */}
    <Box className="fu" mb={2.5}>
      <Typography sx={{
        fontFamily: "'Syne',sans-serif", fontWeight: 800,
        fontSize: { xs: "1.4rem", md: "1.75rem" },
        color: INK, letterSpacing: "-0.025em", lineHeight: 1.1, mb: .5,
      }}>
        {job.title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: INK3, mb: 1.5 }}>
        {job.company} · {job.location}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        <span className="chip" style={{ background: OFF, color: INK2, border: `1.5px solid ${BORDER}` }}>{job.type}</span>
        <span className="chip" style={{ background: OFF, color: INK2, border: `1.5px solid ${BORDER}` }}>{job.level}</span>
        {job.deadline && (
          <span className="chip" style={{ background: AMBL, color: AMB }}>
            <Clock size={10}/> Closes {job.deadline}
          </span>
        )}
      </Stack>
    </Box>

    {/* Stats */}
    <Grid container spacing={1.25} className="fu d1" mb={3}>
      {[
        { icon: <DollarSign size={14} color={GRN}/>,   val: job.salary,    label: "Salary / month" },
        { icon: <MapPin size={14} color={INK3}/>,       val: job.location,  label: "Location" },
        { icon: <Briefcase size={14} color={INK3}/>,    val: job.type,      label: "Job type" },
        { icon: <Star size={14} color={AMB}/>,          val: job.level,     label: "Level" },
      ].map(({ icon, val, label }) => (
        <Grid item xs={6} key={label}>
          <div className="stat-card">
            <Box sx={{ mb: .5 }}>{icon}</Box>
            <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK }}>{val}</Typography>
            <Typography sx={{ fontSize: 11.5, color: INK3 }}>{label}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>

    {/* Divider */}
    <Box sx={{ height: 1, background: BORDER, mb: 3 }} className="fu d1"/>

    {/* About */}
    <Box className="fu d2" mb={3}>
      <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.02rem", color: INK, mb: 1.5 }}>
        About the role
      </Typography>
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.85 }}>{job.about}</Typography>
    </Box>

    {/* Responsibilities */}
    <Box className="fu d2" mb={3}>
      <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.02rem", color: INK, mb: 1.75 }}>
        What you'll do
      </Typography>
      <Stack spacing={1.25}>
        {job.responsibilities.map((r, i) => (
          <div key={i} className="row-item">
            <Box sx={{ width: 28, height: 28, borderRadius: "7px", flexShrink: 0, background: PL, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={13} color={P}/>
            </Box>
            <Typography sx={{ fontSize: 14.5, color: INK, lineHeight: 1.65, pt: .25 }}>{r}</Typography>
            <Box sx={{ color: INK3, flexShrink: 0, mt: .35, ml: "auto" }}>
              <ChevronRight size={14}/>
            </Box>
          </div>
        ))}
      </Stack>
    </Box>

    {/* Requirements */}
    <Box className="fu d3" mb={3}>
      <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.02rem", color: INK, mb: 1.75 }}>
        What we're looking for
      </Typography>
      <Stack spacing={1.25}>
        {job.requirements.map((r, i) => (
          <div key={i} className="row-item">
            <Box sx={{ width: 28, height: 28, borderRadius: "7px", flexShrink: 0, background: OFF, border: `1.5px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={12} color={INK3}/>
            </Box>
            <Typography sx={{ fontSize: 14.5, color: INK, lineHeight: 1.65, pt: .25 }}>{r}</Typography>
          </div>
        ))}
      </Stack>
    </Box>

    {/* Tech stack */}
    <Box className="fu d3" mb={4}>
      <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.02rem", color: INK, mb: 1.5 }}>
        Tech stack
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.75}>
        {job.tools.map(t => <span key={t} className="tag">{t}</span>)}
      </Stack>
    </Box>

    {/* CTA */}
    <Box className="fu d4">
      <button className="apply-cta">
        <Calendar size={16}/> Apply for this role
      </button>
      <Typography sx={{ fontSize: 12, color: INK3, textAlign: "center", mt: 1.5 }}>
        You'll be redirected to the company's application page
      </Typography>
    </Box>
  </Box>
);

/** Filter drawer */
const FilterDrawer = ({
  open, onClose, filters, setFilters,
}: {
  open:       boolean;
  onClose:    () => void;
  filters:    FilterState;
  setFilters: (f: FilterState) => void;
}) => {
  const toggle = (key: "types" | "skills", val: string) => {
    const arr = filters[key];
    setFilters({
      ...filters,
      [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val],
    });
  };

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
        <button className="back-btn" onClick={onClose} style={{ padding: "6px 10px" }}>
          <X size={14}/>
        </button>
      </Stack>

      <Stack spacing={3} sx={{ flex: 1, overflowY: "auto" }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>Job type</Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {ALL_TYPES.map(t => (
              <button
                key={t}
                className={`drawer-chip${filters.types.includes(t) ? " on" : ""}`}
                onClick={() => toggle("types", t)}
              >
                {t}
              </button>
            ))}
          </Stack>
        </Box>

        <Box sx={{ height: 1, background: BORDER }}/>

        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, mb: 1.5 }}>Skills & stack</Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75}>
            {ALL_SKILLS.map(s => (
              <button
                key={s}
                className={`drawer-chip${filters.skills.includes(s) ? " on" : ""}`}
                onClick={() => toggle("skills", s)}
              >
                {s}
              </button>
            ))}
          </Stack>
        </Box>
      </Stack>

      <Stack spacing={1.25} mt={3}>
        {(filters.types.length > 0 || filters.skills.length > 0) && (
          <button
            className="back-btn"
            style={{ width: "100%", justifyContent: "center", padding: "13px" }}
            onClick={() => { setFilters({ types: [], skills: [] }); onClose(); }}
          >
            Clear all filters
          </button>
        )}
        <button className="apply-cta" onClick={onClose}>Show results</button>
      </Stack>
    </Drawer>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const Applications: React.FC = () => {
  const [search,      setSearch]      = useState("");
  const [level,       setLevel]       = useState("");
  const [type,        setType]        = useState("");
  const [filters,     setFilters]     = useState<FilterState>({ types: [], skills: [] });
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [selectedId,  setSelectedId]  = useState<number>(jobsMock[0].id);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  const activeCount = filters.types.length + filters.skills.length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobsMock.filter(j => {
      if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q) && !j.location.toLowerCase().includes(q)) return false;
      if (level && j.level.toLowerCase() !== level.toLowerCase()) return false;
      if (type  && j.type.toLowerCase()  !== type.toLowerCase())  return false;
      if (filters.types.length  && !filters.types.includes(j.type))  return false;
      if (filters.skills.length && !filters.skills.every(sk =>
        j.skills.some(s => s.toLowerCase() === sk.toLowerCase()) ||
        j.tools.some(t  => t.toLowerCase() === sk.toLowerCase())
      )) return false;
      return true;
    });
  }, [search, level, type, filters]);

  const selectedJob = jobsMock.find(j => j.id === selectedId) ?? jobsMock[0];
  const hasActive   = !!(search || level || type || activeCount);

  const clearAll = useCallback(() => {
    setSearch(""); setLevel(""); setType(""); setFilters({ types: [], skills: [] });
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedId(job.id);
    setMobileOpen(true);
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background: WHITE, minHeight: "100vh", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden" }}>

        {/* ── SEARCH BAR ── */}
        <Box sx={{
          borderBottom: `1px solid ${BORDER}`,
          px: { xs: 2, md: 5 }, py: 2,
          position: "sticky", top: 0,
          background: `${WHITE}E8`, backdropFilter: "blur(12px)", zIndex: 10,
        }}>
          <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" gap={1} mb={1.5}>
            <div className="search-wrap">
              <Search size={14} className="search-icon"/>
              <input
                className="search-input"
                placeholder="Title, company or location…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select className="select-pill" value={level} onChange={e => setLevel(e.target.value)}>
              <option value="">All levels</option>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>

            <select className="select-pill" value={type} onChange={e => setType(e.target.value)}>
              <option value="">All types</option>
              {ALL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <button
              className={`filter-btn${activeCount ? " active" : ""}`}
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={13}/> Filters
              {activeCount > 0 && (
                <span style={{
                  background: P, color: "#fff", borderRadius: "100px",
                  padding: "1px 6px", fontSize: "10.5px", fontWeight: 700,
                }}>
                  {activeCount}
                </span>
              )}
            </button>

            {hasActive && (
              <button className="filter-btn" style={{ color: INK3 }} onClick={clearAll}>
                <X size={12}/> Clear
              </button>
            )}
          </Stack>

          {/* Active filter chips */}
          {(filters.types.length > 0 || filters.skills.length > 0) && (
            <Stack direction="row" flexWrap="wrap" gap={0.6}>
              {filters.types.map(t => (
                <FilterChip key={t} label={t}
                  onRemove={() => setFilters({ ...filters, types: filters.types.filter(v => v !== t) })}/>
              ))}
              {filters.skills.map(s => (
                <FilterChip key={s} label={s}
                  onRemove={() => setFilters({ ...filters, skills: filters.skills.filter(v => v !== s) })}/>
              ))}
            </Stack>
          )}

          <Typography sx={{ fontSize: 12.5, color: INK3, mt: 1 }}>
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </Typography>
        </Box>

        {/* ── TITLE ── */}
        <Box sx={{ px: { xs: 2, md: 5 }, pt: 3, pb: 1 }}>
          <Typography sx={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: { xs: "1.4rem", md: "1.7rem" }, color: INK, letterSpacing: "-0.025em" }}>
            Jobs for you
          </Typography>
        </Box>

        {/* ── SPLIT PANEL ── */}
        <Stack direction="row" sx={{ overflow: "hidden" }}>

          {/* LEFT — job list */}
          <Box sx={{
            width: { xs: "100%", md: "40%" },
            borderRight: { md: `1px solid ${BORDER}` },
            overflowY: "auto",
            px: { xs: 2, md: 2.5 }, py: 2,
            height: { md: "calc(100vh - 152px)" },
            display: "flex", flexDirection: "column", gap: "10px",
          }}>
            {filtered.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Box sx={{ width: 52, height: 52, borderRadius: "50%", background: PL, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1.5 }}>
                  <AlertCircle size={22} color={P}/>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: INK, mb: .5 }}>No jobs found</Typography>
                <Typography sx={{ fontSize: 13.5, color: INK3 }}>Try adjusting your search or filters.</Typography>
              </Box>
            ) : filtered.map(j => (
              <JobCard
                key={j.id}
                job={j}
                active={j.id === selectedId}
                onClick={() => handleJobClick(j)}
              />
            ))}
          </Box>

          {/* RIGHT — detail (desktop) */}
          <Box sx={{
            display: { xs: "none", md: "block" },
            flex: 1, overflowY: "auto",
            height: "calc(100vh - 152px)",
          }}>
            <JobDetail job={selectedJob}/>
          </Box>
        </Stack>

        {/* ── MOBILE DETAIL DRAWER ── */}
        <Drawer
          anchor="bottom"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: { height: "92%", borderTopLeftRadius: 20, borderTopRightRadius: 20, overflowY: "auto" },
          }}
        >
          <Box sx={{ width: 36, height: 4, bgcolor: BORDER, borderRadius: 2, mx: "auto", mt: 1.5, mb: .5 }}/>
          <Box sx={{
            px: 2, pb: 1.5, borderBottom: `1px solid ${BORDER}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            position: "sticky", top: 0, background: `${WHITE}E8`, backdropFilter: "blur(10px)",
          }}>
            <button className="back-btn" onClick={() => setMobileOpen(false)}>
              <ArrowLeft size={14}/> Back to jobs
            </button>
            <span className="chip" style={{ background: GRNL, color: GRN }}>{selectedJob.salary}</span>
          </Box>
          <JobDetail job={selectedJob}/>
        </Drawer>

        {/* ── FILTER DRAWER ── */}
        <FilterDrawer
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
    </>
  );
};

export default Applications;
