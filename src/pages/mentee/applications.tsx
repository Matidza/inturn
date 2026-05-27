
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
  Slider,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Badge,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

// ── Constants ──
const PRIMARY = "#7F42E7";
const MAX_SALARY = 150000;

// ── Salary parser helper ──
const parseSalaryMin = (salaryStr: string): number => {
  const match = salaryStr.match(/R([\d]+)k/);
  return match ? parseInt(match[1]) * 1000 : 0;
};
const parseSalaryMax = (salaryStr: string): number => {
  const matches = salaryStr.match(/R([\d]+)k/g);
  if (!matches || matches.length < 2) return MAX_SALARY;
  const last = matches[matches.length - 1].replace("R", "").replace("k", "");
  return parseInt(last) * 1000;
};

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

// ── Filter Drawer ──
interface FilterState {
  jobType: string[];
  location: string;
  salaryRange: [number, number];
  skills: string[];
}

const ALL_JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"];
const ALL_LOCATIONS = ["All", "Remote", "Sandton", "Cape Town", "Johannesburg", "Pretoria", "Durban"];
const ALL_SKILLS = ["React", "TypeScript", "Python", "SQL", "Node.js", "Docker", "AWS", "Power BI", "Next.js"];

const FilterDrawer = ({
  open,
  onClose,
  filters,
  setFilters,
  onReset,
  activeCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  onReset: () => void;
  activeCount: number;
}) => {
  const toggleJobType = (type: string) => {
    const updated = filters.jobType.includes(type)
      ? filters.jobType.filter((t) => t !== type)
      : [...filters.jobType, type];
    setFilters({ ...filters, jobType: updated });
  };

  const toggleSkill = (skill: string) => {
    const updated = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    setFilters({ ...filters, skills: updated });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 380 },
          maxWidth: "100vw",
          px: 3,
          py: 3,
          boxSizing: "border-box",
          overflowX: "hidden",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography fontWeight={700} fontSize={18}>Filters</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </Stack>

      <Stack spacing={3} sx={{ overflowY: "auto", flex: 1 }}>
        {/* Job Type */}
        <Box>
          <Typography fontWeight={700} fontSize={14} mb={1.5}>Job Type</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {ALL_JOB_TYPES.map((type) => (
              <Chip
                key={type}
                label={type}
                onClick={() => toggleJobType(type)}
                sx={{
                  borderRadius: 2,
                  fontWeight: filters.jobType.includes(type) ? 700 : 400,
                  bgcolor: filters.jobType.includes(type) ? PRIMARY : "transparent",
                  color: filters.jobType.includes(type) ? "#fff" : "#555",
                  border: filters.jobType.includes(type) ? "none" : "1px solid #ddd",
                  cursor: "pointer",
                  "&:hover": { bgcolor: filters.jobType.includes(type) ? "#6a35c9" : "#f5f5f5" },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Location */}
        <Box>
          <Typography fontWeight={700} fontSize={14} mb={1.5}>Location</Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Location</InputLabel>
            <Select
              value={filters.location}
              label="Location"
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              sx={{ borderRadius: 2 }}
            >
              {ALL_LOCATIONS.map((loc) => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider />

        {/* Salary Range */}
        <Box>
          <Typography fontWeight={700} fontSize={14} mb={2}>Salary Range (per month)</Typography>
          <Slider
            value={filters.salaryRange}
            onChange={(_, val) => setFilters({ ...filters, salaryRange: val as [number, number] })}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `R${(v / 1000).toFixed(0)}k`}
            min={0}
            max={MAX_SALARY}
            step={5000}
            sx={{ color: PRIMARY }}
          />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
              <Typography fontSize={11} color="text.secondary">Min</Typography>
              <Typography fontSize={13} fontWeight={700}>R{(filters.salaryRange[0] / 1000).toFixed(0)}k</Typography>
            </Box>
            <Box sx={{ border: "1px solid #eee", borderRadius: 2, px: 1.5, py: 0.8, minWidth: 80, textAlign: "center" }}>
              <Typography fontSize={11} color="text.secondary">Max</Typography>
              <Typography fontSize={13} fontWeight={700}>R{(filters.salaryRange[1] / 1000).toFixed(0)}k</Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* Skills */}
        <Box>
          <Typography fontWeight={700} fontSize={14} mb={1.5}>Skills / Tech Stack</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {ALL_SKILLS.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => toggleSkill(skill)}
                sx={{
                  borderRadius: 2,
                  fontWeight: filters.skills.includes(skill) ? 700 : 400,
                  bgcolor: filters.skills.includes(skill) ? "#f5f0fd" : "transparent",
                  color: filters.skills.includes(skill) ? PRIMARY : "#555",
                  border: filters.skills.includes(skill) ? `1px solid ${PRIMARY}` : "1px solid #ddd",
                  cursor: "pointer",
                }}
              />
            ))}
          </Stack>
        </Box>

        <Divider />
      </Stack>

      <Stack spacing={1.5} mt={3}>
        {activeCount > 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => { onReset(); onClose(); }}
            sx={{ borderRadius: 3, textTransform: "none", borderColor: "#ddd", color: "#555" }}
          >
            Clear all filters
          </Button>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: PRIMARY,
            "&:hover": { backgroundColor: "#6a35c9" },
          }}
        >
          Show Results
        </Button>
      </Stack>
    </Drawer>
  );
};

// ── Main component ──
const Applications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job>(extendedJobs[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading] = useState(false);

  const defaultFilters: FilterState = {
    jobType: [],
    location: "All",
    salaryRange: [0, MAX_SALARY],
    skills: [],
  };
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>(defaultFilters);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.jobType.length > 0) count++;
    if (advancedFilters.location !== "All") count++;
    if (advancedFilters.salaryRange[0] > 0 || advancedFilters.salaryRange[1] < MAX_SALARY) count++;
    if (advancedFilters.skills.length > 0) count++;
    return count;
  }, [advancedFilters]);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase().trim();
    return extendedJobs
      .filter((job) =>
        !lower ||
        job.title.toLowerCase().includes(lower) ||
        job.company.toLowerCase().includes(lower) ||
        job.location.toLowerCase().includes(lower)
      )
      .filter((job) => (level ? job.level.toLowerCase() === level.toLowerCase() : true))
      .filter((job) =>
        advancedFilters.jobType.length === 0 ||
        advancedFilters.jobType.some((t) => t.toLowerCase() === job.type.toLowerCase() ||
          (t === "Remote" && job.location.toLowerCase() === "remote"))
      )
      .filter((job) =>
        advancedFilters.location === "All" ||
        job.location.toLowerCase() === advancedFilters.location.toLowerCase()
      )
      .filter((job) => {
        const min = parseSalaryMin(job.salary);
        const max = parseSalaryMax(job.salary);
        return max >= advancedFilters.salaryRange[0] && min <= advancedFilters.salaryRange[1];
      })
      .filter((job) =>
        advancedFilters.skills.length === 0 ||
        advancedFilters.skills.every((skill) =>
          job.skills.some((s) => s.toLowerCase() === skill.toLowerCase()) ||
          job.tools.some((t) => t.toLowerCase() === skill.toLowerCase())
        )
      );
  }, [search, level, advancedFilters]);

  const hasActiveFilters = !!search || !!level || activeFilterCount > 0;

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) setMobileOpen(true);
  };

  const resetFilters = () => {
    setSearch("");
    setLevel("");
    setAdvancedFilters(defaultFilters);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
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
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />

          <TextField
            size="small"
            select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            sx={{ minWidth: 160, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkOutlineIcon fontSize="small" sx={{ color: "#aaa" }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="entry">Entry</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </TextField>

          <Badge badgeContent={activeFilterCount} color="secondary" sx={{ flexShrink: 0 }}>
            <Button
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={() => setFilterDrawerOpen(true)}
              sx={{
                textTransform: "none",
                borderColor: activeFilterCount > 0 ? PRIMARY : "#ddd",
                color: activeFilterCount > 0 ? PRIMARY : "#555",
                borderRadius: 3,
                fontWeight: activeFilterCount > 0 ? 700 : 400,
                whiteSpace: "nowrap",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Filters
            </Button>
          </Badge>

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
              Clear all
            </Button>
          )}
        </Stack>

        {/* Active filter chips */}
        {(advancedFilters.jobType.length > 0 || advancedFilters.location !== "All" || advancedFilters.skills.length > 0) && (
          <Stack direction="row" flexWrap="wrap" gap={0.75} mt={1.5}>
            {advancedFilters.jobType.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                onDelete={() => setAdvancedFilters({ ...advancedFilters, jobType: advancedFilters.jobType.filter((t) => t !== type) })}
                sx={{ bgcolor: "#f5f0fd", color: PRIMARY, fontSize: 11 }}
              />
            ))}
            {advancedFilters.location !== "All" && (
              <Chip
                label={`📍 ${advancedFilters.location}`}
                size="small"
                onDelete={() => setAdvancedFilters({ ...advancedFilters, location: "All" })}
                sx={{ bgcolor: "#f5f0fd", color: PRIMARY, fontSize: 11 }}
              />
            )}
            {advancedFilters.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                onDelete={() => setAdvancedFilters({ ...advancedFilters, skills: advancedFilters.skills.filter((s) => s !== skill) })}
                sx={{ bgcolor: "#f5f0fd", color: PRIMARY, fontSize: 11 }}
              />
            ))}
          </Stack>
        )}
      </Box>

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

      {/* ── Advanced Filter Drawer ── */}
      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={advancedFilters}
        setFilters={setAdvancedFilters}
        onReset={resetFilters}
        activeCount={activeFilterCount}
      />
    </Box>
  );
};

export default Applications;