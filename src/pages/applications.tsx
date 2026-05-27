
import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  Button,
  Stack,
  Chip,
  Divider,
  InputAdornment,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  Skeleton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TuneIcon from "@mui/icons-material/Tune";

import { Search as SearchIcon, Clock as ClockIcon, Tag } from "lucide-react";

// ── Constants ──
const PRIMARY = "#7F42E7";
const P = "#7F42E7"; const P_DARK = "#5E2EC5"; const P_LITE = "#F0EAFD";
const INK = "#0D0D12"; const INK2 = "#5C5C72"; const BORDER = "#E8E3F5"; const OFF = "#F7F6FC";
// ── Types ──
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  skills: string[];
  deadline?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tools: string[];
}

// ── Mock Data ──
const jobsMock: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Sportserve",
    location: "Remote",
    type: "Full-Time",
    level: "Mid",
    salary: "R45k - R70k",
    skills: ["React", "TypeScript", "Next.js", "Tailwind"],
    deadline: "30 May 2026",
    description: `Sportserve forms part of a global group of sports betting and sportsbook technology companies. We are focused on delivering world-class digital experiences to millions of users worldwide.\n\nWe are looking for a Frontend Developer who is passionate about building scalable and performant web applications. You will work closely with product, design, and backend teams to bring ideas to life.`,
    responsibilities: [
      "Develop modern frontend applications using React and Next.js",
      "Collaborate with designers and backend engineers",
      "Build reusable UI components",
      "Optimize applications for performance and scalability",
      "Participate in code reviews and technical discussions",
    ],
    requirements: [
      "3+ years experience with JavaScript / TypeScript",
      "Strong experience with React or similar frameworks",
      "Understanding of REST APIs",
      "Experience with Git and version control",
      "Strong problem-solving skills",
    ],
    tools: ["React", "Next.js", "Docker", "GitLab CI/CD", "TailwindCSS"],
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Discovery",
    location: "Sandton",
    type: "Full-Time",
    level: "Entry",
    salary: "R25k - R40k",
    skills: ["Python", "SQL", "Power BI"],
    description: `Discovery is seeking a Data Analyst to join our analytics team. You will work with large datasets to generate insights that drive business decisions.`,
    responsibilities: [
      "Analyze large datasets to extract insights",
      "Build dashboards and reports",
      "Work with stakeholders to understand data needs",
      "Ensure data accuracy and integrity",
    ],
    requirements: [
      "Degree in Data Science, Statistics or related field",
      "Strong SQL and Python skills",
      "Experience with Power BI or Tableau",
      "Analytical mindset",
    ],
    tools: ["Python", "SQL", "Power BI", "Excel"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Takealot",
    location: "Cape Town",
    type: "Full-Time",
    level: "Mid",
    salary: "R50k - R80k",
    skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
    description: `Join Takealot's backend team and help build scalable systems that power one of South Africa's largest e-commerce platforms.`,
    responsibilities: [
      "Design and build scalable APIs",
      "Work with databases and optimize queries",
      "Ensure system reliability and performance",
      "Collaborate with frontend teams",
    ],
    requirements: [
      "Experience with Node.js and Express",
      "Strong understanding of databases",
      "Experience with cloud platforms",
      "Knowledge of system design",
    ],
    tools: ["Node.js", "PostgreSQL", "Docker", "AWS"],
  },
];

const extendedJobs: Job[] = Array.from({ length: 30 }).map((_, i) => ({
  ...jobsMock[i % jobsMock.length],
  id: i,
}));

// ── Job card skeleton ──
const JobCardSkeleton = () => (
  <Card sx={{ p: 2, borderRadius: 3, boxShadow: "none", border: "1px solid #eee" }}>
    <Skeleton width="60%" height={20} />
    <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
    <Stack direction="row" spacing={1} mt={1}>
      <Skeleton variant="rounded" width={60} height={24} />
      <Skeleton variant="rounded" width={50} height={24} />
    </Stack>
    <Skeleton width="30%" height={16} sx={{ mt: 1 }} />
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
      py: 10,
      textAlign: "center",
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        bgcolor: "#f5f0fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <WorkOutlineIcon sx={{ fontSize: 36, color: PRIMARY }} />
    </Box>
    <Typography fontWeight={700} fontSize={16}>
      {filtered ? "No jobs match your search" : "No jobs available yet"}
    </Typography>
    <Typography fontSize={14} color="text.secondary" maxWidth={300}>
      {filtered
        ? "Try adjusting your search or filters."
        : "Check back soon — new jobs are posted regularly."}
    </Typography>
  </Box>
);

// ── Job detail panel ──
const JobDetail = ({ job, isMobile }: { job: Job; isMobile: boolean }) => (
  <Box p={isMobile ? 2 : 4} maxWidth={800} width="100%">
    <Typography fontSize={{ xs: 20, md: 24 }} fontWeight={700}>
      {job.title}
    </Typography>

    <Typography color="#777" fontSize={14} mb={2}>
      {job.company} • {job.location}
    </Typography>

    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      gap={1.5}
      mb={3}
    >
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Chip label={job.type} size="small" />
        <Chip label={job.level} size="small" />
      </Stack>

      <Button
        variant="contained"
        sx={{
          backgroundColor: PRIMARY,
          borderRadius: 6,
          px: 3,
          textTransform: "none",
          fontWeight: 600,
          whiteSpace: "nowrap",
          "&:hover": { backgroundColor: "#6a35c9" },
        }}
      >
        Apply Now
      </Button>
    </Stack>

    {job.deadline && (
      <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
        Application deadline: <strong>{job.deadline}</strong>
      </Alert>
    )}

    <Divider sx={{ my: 2 }} />

    <Typography fontWeight={600} mb={1}>
      About the Role
    </Typography>
    <Typography fontSize={14} color="#444" sx={{ whiteSpace: "pre-line" }} mb={2}>
      {job.description}
    </Typography>

    <Typography fontWeight={600} mt={2}>
      Responsibilities
    </Typography>
    <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
      {job.responsibilities.map((r, i) => (
        <Box component="li" key={i}>
          <Typography fontSize={14}>{r}</Typography>
        </Box>
      ))}
    </Box>

    <Typography fontWeight={600} mt={2}>
      Requirements
    </Typography>
    <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
      {job.requirements.map((r, i) => (
        <Box component="li" key={i}>
          <Typography fontSize={14}>{r}</Typography>
        </Box>
      ))}
    </Box>

    <Typography fontWeight={600} mt={2} mb={1}>
      Tech Stack
    </Typography>
    <Stack direction="row" gap={1} flexWrap="wrap">
      {job.tools.map((t, i) => (
        <Chip key={i} label={t} size="small" />
      ))}
    </Stack>

    <Divider sx={{ my: 3 }} />

    <Typography fontWeight={700} fontSize={16}>
      💰 {job.salary}
    </Typography>
  </Box>
);

// ── Main component ──
const Applications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job>(extendedJobs[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading] = useState(false); // swap for real loading state when using API

  const filtered = useMemo(() => {
    const lower = search.toLowerCase().trim();
    return extendedJobs
      .filter(
        (job) =>
          !lower ||
          job.title.toLowerCase().includes(lower) ||
          job.company.toLowerCase().includes(lower) ||
          job.location.toLowerCase().includes(lower)
      )
      .filter((job) =>
        filter ? job.level.toLowerCase() === filter.toLowerCase() : true
      );
  }, [search, filter]);

  const hasActiveFilters = !!search || !!filter;

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) setMobileOpen(true);
  };

  const resetFilters = () => {
    setSearch("");
    setFilter("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* ── Search bar ── */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          borderBottom: "1px solid #eee",
          bgcolor: "#fff",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Search by title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#aaa" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            size="small"
            select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 160 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TuneIcon fontSize="small" sx={{ color: "#aaa" }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="entry">Entry</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </TextField>

          {hasActiveFilters && (
            <Button
              onClick={resetFilters}
              size="small"
              sx={{
                textTransform: "none",
                color: PRIMARY,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Clear
            </Button>
          )}
        </Stack>
      </Box>
      {/* <Box sx={{ maxWidth:480, mx:"auto", position:"relative" }}>
        <SearchIcon  style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:INK2 }}/>
        <input className="input-field" style={{ paddingLeft:42 }} placeholder="Search articles..."  onChange={e=>setSearch(e.target.value)}/>
      </Box> */}

      {/* ── Title row ── */}
      <Box sx={{ px: { xs: 2, md: 4 }, pt: 2.5, pb: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          Jobs for you
        </Typography>
        {!loading && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </Typography>
        )}
      </Box>

      {/* ── Split panel ── */}
      <Stack direction="row" sx={{ flex: 1, overflow: "hidden" }}>
        {/* LEFT — job list */}
        <Box
          sx={{
            width: { xs: "100%", md: "38%" },
            borderRight: { md: "1px solid #eee" },
            overflowY: "auto",
            px: { xs: 1.5, md: 2 },
            py: 2,
            height: { md: "calc(100vh - 150px)" },
          }}
        >
          {loading ? (
            <Stack spacing={1.5}>
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </Stack>
          ) : filtered.length === 0 ? (
            <EmptyState filtered={hasActiveFilters} />
          ) : (
            <Stack spacing={1.5}>
              {filtered.map((job) => (
                <Card
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    borderRadius: 3,
                    boxShadow: "none",
                    border:
                      selectedJob?.id === job.id
                        ? `2px solid ${PRIMARY}`
                        : "1px solid #eee",
                    bgcolor:
                      selectedJob?.id === job.id ? "#faf8ff" : "#fff",
                    transition: "box-shadow 0.15s ease, border-color 0.15s ease",
                    "&:hover": { boxShadow: 2 },
                    minWidth: 0,
                  }}
                >
                  <Typography fontWeight={600} fontSize={15} noWrap>
                    {job.title}
                  </Typography>
                  <Typography fontSize={13} color="#777" noWrap>
                    {job.company} • {job.location}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" gap={0.5}>
                    <Chip label={job.type} size="small" />
                    <Chip label={job.level} size="small" />
                  </Stack>

                  <Typography fontSize={12} mt={1} color="#555">
                    💰 {job.salary}
                  </Typography>

                  {job.deadline && (
                    <Typography fontSize={11} color="#aaa" mt={0.5}>
                      Closes {job.deadline}
                    </Typography>
                  )}
                </Card>
              ))}
            </Stack>
          )}
        </Box>

        {/* RIGHT — job detail (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            flex: 1,
            overflowY: "auto",
            height: "calc(100vh - 150px)",
            bgcolor: "#fff",
          }}
        >
          {selectedJob && (
            <JobDetail job={selectedJob} isMobile={false} />
          )}
        </Box>
      </Stack>

      {/* ── Mobile bottom drawer ── */}
      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            height: "92%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflowY: "auto",
          },
        }}
      >
        {/* Drag handle */}
        <Box
          sx={{
            width: 40,
            height: 4,
            bgcolor: "#ddd",
            borderRadius: 2,
            mx: "auto",
            mt: 1.5,
            mb: 0.5,
            flexShrink: 0,
          }}
        />

        <Stack
          direction="row"
          alignItems="center"
          px={1}
          pb={1}
          sx={{ borderBottom: "1px solid #eee", flexShrink: 0 }}
        >
          <IconButton onClick={() => setMobileOpen(false)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography fontWeight={600} fontSize={15}>
            Job Details
          </Typography>
        </Stack>

        {selectedJob && <JobDetail job={selectedJob} isMobile={true} />}
      </Drawer>
    </Box>
  );
};

export default Applications;











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
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// const PRIMARY = "#7F42E7";

// /* MOCK DATA (same as yours, shortened here) */
// const jobsMock = [
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

//     description: `Sportserve forms part of a global group of sports betting and sportsbook technology companies. 
// We are focused on delivering world-class digital experiences to millions of users worldwide.

// We are looking for a Frontend Developer who is passionate about building scalable and performant web applications. 
// You will work closely with product, design, and backend teams to bring ideas to life.`,

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

//     tools: [
//       "React",
//       "Next.js",
//       "Docker",
//       "GitLab CI/CD",
//       "TailwindCSS",
//     ],
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

//     description: `Discovery is seeking a Data Analyst to join our analytics team.
// You will work with large datasets to generate insights that drive business decisions.`,

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

//     description: `Join Takealot’s backend team and help build scalable systems 
// that power one of South Africa’s largest e-commerce platforms.`,

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

//   // 👉 You can duplicate and vary this pattern to reach 30+
// ];


// const extendedJobs = Array.from({ length: 30 }).map((_, i) => ({
//   ...jobsMock[i % jobsMock.length],
//   id: i,
// }));

// const Applications = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("");
//   const [selectedJob, setSelectedJob] = useState(extendedJobs[0]);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const filtered = useMemo(() => {
//     return extendedJobs
//       .filter(
//         (job) =>
//           job.title.toLowerCase().includes(search.toLowerCase()) ||
//           job.company.toLowerCase().includes(search.toLowerCase())
//       )
//       .filter((job) =>
//         filter ? job.level.toLowerCase() === filter.toLowerCase() : true
//       );
//   }, [search, filter]);

//   const handleJobClick = (job: any) => {
//     setSelectedJob(job);
//     if (isMobile) setMobileOpen(true);
//   };

//   /* ---------------- JOB DETAILS COMPONENT ---------------- */
//   const JobDetails = ({ job }: any) => (
//     <Box p={isMobile ? 2 : 4} maxWidth={800}>
//       <Typography fontSize={24} fontWeight={700}>
//         {job.title}
//       </Typography>

//       <Typography color="#777" mb={2}>
//         {job.company} • {job.location}
//       </Typography>

//       <Stack direction="row" justifyContent="space-between" mb={3}>
//         <Stack direction="row" spacing={1}>
//           <Chip label={job.type} />
//           <Chip label={job.level} />
//         </Stack>

//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: PRIMARY,
//             borderRadius: 6,
//             px: 3,
//             textTransform: "none",
//           }}
//         >
//           Apply
//         </Button>
//       </Stack>

//       <Divider sx={{ my: 2 }} />

//       <Typography mb={2}>{job.description}</Typography>

//       <Typography fontWeight={600}>Responsibilities</Typography>
//       <ul>
//         {job.responsibilities.map((r: string, i: number) => (
//           <li key={i}>{r}</li>
//         ))}
//       </ul>

//       <Typography fontWeight={600}>Requirements</Typography>
//       <ul>
//         {job.requirements.map((r: string, i: number) => (
//           <li key={i}>{r}</li>
//         ))}
//       </ul>

//       <Stack direction="row" gap={1} mt={2} flexWrap="wrap">
//         {job.tools.map((t: string, i: number) => (
//           <Chip key={i} label={t} />
//         ))}
//       </Stack>

//       <Divider sx={{ my: 3 }} />

//       <Typography fontWeight={600}>{job.salary}</Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
//       {/* SEARCH */}
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mb={3}>
//         <TextField
//           size="small"
//           fullWidth
//           placeholder="Search jobs..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <TextField
//           size="small"
//           select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{ minWidth: 150 }}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="entry">Entry</MenuItem>
//           <MenuItem value="mid">Mid</MenuItem>
//         </TextField>
//       </Stack>

//       {/* LAYOUT */}
//       <Stack direction="row">
//         {/* LEFT LIST */}
//         <Box sx={{ width: isMobile ? "100%" : "35%" }}>
//           <Stack spacing={2}>
//             {filtered.map((job) => (
//               // <Card
//               //   key={job.id}
//               //   onClick={() => handleJobClick(job)}
//               //   sx={{
//               //     p: 2,
//               //     cursor: "pointer",
//               //     border:
//               //       selectedJob.id === job.id
//               //         ? `2px solid ${PRIMARY}`
//               //         : "1px solid #eee",
//               //   }}
//               // >
//               //   <Typography fontWeight={600}>{job.title}</Typography>
//               //   <Typography fontSize={13} color="#777">
//               //     {job.company}
//               //   </Typography>
//               // </Card>
//               <Card
//                 key={job.id}
//                 onClick={() => handleJobClick(job)}
//                 sx={{
//                   p: 2,
//                   cursor: "pointer",
//                   borderRadius: 3,
//                   border:
//                     selectedJob.id === job.id
//                       ? `2px solid ${PRIMARY}`
//                       : "1px solid #eee",
//                   "&:hover": { boxShadow: 3 },
//                 }}
//               >
//                 <Typography fontWeight={600}>{job.title}</Typography>
//                 <Typography fontSize={13} color="#777">
//                   {job.company} • {job.location}
//                 </Typography>

//                 <Stack direction="row" spacing={1} mt={1}>
//                   <Chip label={job.type} size="small" />
//                   <Chip label={job.level} size="small" />
//                 </Stack>

//                 <Typography fontSize={12} mt={1}>
//                   💰 {job.salary}
//                 </Typography>
//               </Card>
//             ))}
//           </Stack>
//         </Box>

//         {/* RIGHT (DESKTOP ONLY) */}
//         {!isMobile && (
//           <Box
//             sx={{
//                 flex: 1,
//                 p: 4,
//                 position: "sticky",
//                 top: 0,
//                 height: "100vh",
//                 overflowY: "auto",
//                 background: "#fff",
//               }}
//           >
//             <JobDetails  job={selectedJob} />
//           </Box>
//         )}
//       </Stack>

//       {/* MOBILE DRAWER */}
//       <Drawer
//         anchor="bottom"
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         PaperProps={{
//           sx: {
//             height: "90%",
//             borderTopLeftRadius: 16,
//             borderTopRightRadius: 16,
//           },
//         }}
//       >
//         <Box display="flex" alignItems="center" p={1}>
//           <IconButton onClick={() => setMobileOpen(false)}>
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography fontWeight={600}>Job Details</Typography>
//         </Box>

//         {selectedJob && <JobDetails job={selectedJob} />}
//       </Drawer>
//     </Box>
//   );
// };

// export default Applications;

