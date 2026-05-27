import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import WorkIcon from "@mui/icons-material/Work";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
  Button,
  Skeleton,
  Alert,
  Divider,
  Paper,
  Tooltip,
  IconButton,
  Snackbar,
} from "@mui/material";

import { ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5005";
const PROFESSIONAL_ENDPOINT = `${API_BASE}/api/v1/mentee/professional-details`;

const PRIMARY = "#7B61FF";
const SUCCESS_GREEN = "#22c55e";

// ─── Default focus areas (fallback when API returns none) ────────────────────

const DEFAULT_FOCUS_AREAS: { title: string }[] = [
  { title: "1-on-1 Mock Interview Practice" },
  { title: "Personalized Feedback & Tips" },
  { title: "CV / Resume Review" },
  { title: "Interview Preparation & Guidance" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface Experience {
  role: string;
  company: string;
  duration: string;
}

interface Testimonial {
  user: string;
  comment: string;
  rating?: number;
}

interface Professional {
  _id: string;
  name: string;
  surname: string;
  avatar?: string;
  currentJobTitle?: string;
  companyName?: string;
  rating?: number;
  reviews?: number;
  aboutUser?: string;
  skills?: string[];
  interviewFocusArea?: string[];
  experience?: Experience[];
  testimonials?: Testimonial[];
  availability?: string[];
  price?: number;
  instantBooking?: boolean;
}

// ─── Star Rating Display ─────────────────────────────────────────────────────

function StarRating({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (value >= i + 1) return "full";
    if (value >= i + 0.5) return "half";
    return "empty";
  });

  return (
    <Stack direction="row" spacing={0.25} alignItems="center">
      {stars.map((type, i) =>
        type === "full" ? (
          <StarIcon key={i} sx={{ fontSize: 20, color: "#f59e0b" }} />
        ) : type === "half" ? (
          <StarHalfIcon key={i} sx={{ fontSize: 20, color: "#f59e0b" }} />
        ) : (
          <StarOutlineIcon key={i} sx={{ fontSize: 20, color: "#f59e0b" }} />
        )
      )}
    </Stack>
  );
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Skeleton width={100} height={40} sx={{ mb: 3 }} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rounded" height={200} sx={{ mb: 3, borderRadius: 4 }} />
          <Skeleton variant="rounded" height={120} sx={{ mb: 3, borderRadius: 3 }} />
          <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rounded" height={300} sx={{ borderRadius: 4 }} />
        </Grid>
      </Grid>
    </Container>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const ProfessionalCardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────

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
          PROFESSIONAL_ENDPOINT,
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

  // ── Derived state ──────────────────────────────────────────────────────────

  const focusAreas = useMemo(() => {
    return professional?.interviewFocusArea?.length
      ? professional.interviewFocusArea.map((f) => ({ title: f }))
      : DEFAULT_FOCUS_AREAS;
  }, [professional]);

  const displayRating = useMemo(
    () => Number((professional?.rating ?? 4.5).toFixed(1)),
    [professional]
  );

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleBack = useCallback(() => navigate("/mentee/professionals"), [navigate]);

  const handleBook = useCallback(() => {
    if (professional?._id) navigate(`/mentee/book-session/${professional._id}`);
  }, [navigate, professional]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Book ${professional?.name}`, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setSnackbarOpen(true);
      }
    } catch {
      // User cancelled share — no-op
    }
  }, [professional]);

  const handleSave = useCallback(() => setSaved((prev) => !prev), []);

  // ── Render guards ──────────────────────────────────────────────────────────

  if (loading) return <LoadingSkeleton />;

  if (error || !professional) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleBack}>
              Go back
            </Button>
          }
        >
          {error ?? "Professional not found."}
        </Alert>
      </Container>
    );
  }

  const pro = professional;
  const initials = `${pro.name?.[0] ?? ""}${pro.surname?.[0] ?? ""}`.toUpperCase();
  // const initials = `${pro.name[0] ?? ""}${pro.surname[0] ?? ""}`.toUpperCase();

  // ── JSX ────────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFFFF", py: 4 }}>
      {/* backgroundColor: "#f8f9fb", */}
      <Container maxWidth="lg">

        {/* ── Navigation row ─────────────────────────────────── */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={handleBack}
            sx={{ color: "text.secondary" }}
          >
            Back to Professionals
          </Button>

          <Stack direction="row" spacing={1}>
            <Tooltip title={saved ? "Remove bookmark" : "Bookmark"}>
              <IconButton onClick={handleSave} aria-label="Save professional">
                <Bookmark
                  size={20}
                  fill={saved ? PRIMARY : "none"}
                  stroke={saved ? PRIMARY : "currentColor"}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share profile">
              <IconButton onClick={handleShare} aria-label="Share profile">
                <Share2 size={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Grid container spacing={4}>

          {/* ═══════════════════════════ LEFT ═══════════════════════════ */}
          <Grid item xs={12} md={8}>

            {/* ── Hero card ───────────────────────────────────── */}
            <Card elevation={0} sx={{ borderRadius: 4, mb: 3, border: "1px solid #e5e7eb" }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>

                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Avatar
                      src={pro.avatar}
                      alt={`${pro.name} ${pro.surname}`}
                      sx={{
                        width: 100,
                        height: 100,
                        fontSize: 28,
                        fontWeight: 700,
                        backgroundColor: PRIMARY,
                        color: "#fff",
                        border: `3px solid ${PRIMARY}22`,
                      }}
                    >
                      {!pro.avatar && initials}
                    </Avatar>
                  </Box>

                  <Box flex={1} minWidth={0}>
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

                    <Typography variant="h5" fontWeight={700} noWrap>
                      {pro.name} {pro.surname}
                    </Typography>

                    {(pro.currentJobTitle || pro.companyName) && (
                      <Stack direction="row" spacing={0.5} alignItems="center" mt={0.5}>
                        <WorkIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {[pro.currentJobTitle, pro.companyName].filter(Boolean).join(" @ ")}
                        </Typography>
                      </Stack>
                    )}

                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                      <StarRating value={displayRating} />
                      <Typography variant="body2" fontWeight={600}>
                        {displayRating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({(pro.reviews ?? 0).toLocaleString()} reviews)
                      </Typography>
                    </Stack>

                    {pro.aboutUser && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={2}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {pro.aboutUser}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* ── Skills ──────────────────────────────────────── */}
            {pro.skills && pro.skills.length > 0 && (
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #e5e7eb" }}>
                <Typography fontWeight={700} mb={2}>Skills & Expertise</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {pro.skills.map((skill, i) => (
                    <Chip
                      key={i}
                      label={skill}
                      size="small"
                      sx={{ backgroundColor: "#f3f4f6", fontWeight: 500 }}
                    />
                  ))}
                </Stack>
              </Paper>
            )}

            {/* ── What You'll Get ──────────────────────────────── */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #e5e7eb" }}>
              <Typography fontWeight={700} mb={2}>What You'll Get</Typography>
              <Stack spacing={1.5}>
                {focusAreas.map((f, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                    <CheckCircleOutlineIcon sx={{ fontSize: 20, color: SUCCESS_GREEN, mt: 0.1 }} />
                    <Typography variant="body2">{f.title}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            {/* ── Experience ───────────────────────────────────── */}
            {pro.experience && pro.experience.length > 0 && (
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, border: "1px solid #e5e7eb" }}>
                <Typography fontWeight={700} mb={2}>Experience</Typography>
                <Stack spacing={2}>
                  {pro.experience.map((exp, i) => (
                    <React.Fragment key={i}>
                      <Box>
                        <Typography fontWeight={600} variant="body2">{exp.role}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {exp.company}
                          {exp.duration ? ` · ${exp.duration}` : ""}
                        </Typography>
                      </Box>
                      {i < pro.experience!.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* ── Testimonials ─────────────────────────────────── */}
            {pro.testimonials && pro.testimonials.length > 0 && (
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e5e7eb" }}>
                <Typography fontWeight={700} mb={2}>Student Reviews</Typography>
                <Stack spacing={2.5}>
                  {pro.testimonials.map((t, i) => (
                    <React.Fragment key={i}>
                      <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Typography fontWeight={600} variant="body2">{t.user}</Typography>
                          {t.rating && <StarRating value={t.rating} />}
                        </Stack>
                        <Stack direction="row" spacing={1} mt={0.5} alignItems="flex-start">
                          <FormatQuoteIcon sx={{ fontSize: 18, color: PRIMARY, mt: 0.1, flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary">{t.comment}</Typography>
                        </Stack>
                      </Box>
                      {i < pro.testimonials!.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </Stack>
              </Paper>
            )}
          </Grid>

          {/* ═══════════════════════════ RIGHT ══════════════════════════ */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                position: { md: "sticky" },
                top: 88,
                border: "1px solid #e5e7eb",
              }}
            >
              {/* Price */}
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography variant="h4" fontWeight={800} color={SUCCESS_GREEN}>
                  R{(pro.price ?? 150).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">/ session</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Availability */}
              {pro.availability && pro.availability.length > 0 && (
                <>
                  <Typography fontWeight={600} variant="body2" mb={1.5}>
                    Available Slots
                  </Typography>
                  <Stack spacing={1} mb={2.5}>
                    {pro.availability.slice(0, 5).map((slot, i) => (
                      <Chip
                        key={i}
                        label={slot}
                        size="small"
                        variant="outlined"
                        sx={{ justifyContent: "flex-start", borderRadius: 2 }}
                      />
                    ))}
                    {pro.availability.length > 5 && (
                      <Typography variant="caption" color="text.secondary">
                        +{pro.availability.length - 5} more slots available
                      </Typography>
                    )}
                  </Stack>
                </>
              )}

              {/* CTA */}
              {pro.instantBooking ? (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Calendar size={18} />}
                  onClick={handleBook}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    backgroundColor: PRIMARY,
                    "&:hover": { backgroundColor: "#6950e0" },
                    textTransform: "none",
                    fontSize: 15,
                  }}
                >
                  Book Instantly
                </Button>
              ) : (
                <Button
                  to="/mentee/request-an-interview"
                  component={Link}
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    borderColor: PRIMARY,
                    color: PRIMARY,
                    "&:hover": { backgroundColor: `${PRIMARY}10`, borderColor: PRIMARY },
                    textTransform: "none",
                    fontSize: 15,
                  }}
                >
                  Request Session
                </Button>
              )}

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                textAlign="center"
                mt={1.5}
              >
                No charge until session is confirmed
              </Typography>
            </Card>
          </Grid>

        </Grid>
      </Container>

      {/* Clipboard snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default ProfessionalCardDetails;
