import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { HandshakeOutlined } from "@mui/icons-material";
import { Instagram, X, LinkedIn, YouTube } from "@mui/icons-material";

const P = "#7F42E7";
const P_MID = "#B893F6";
const INK = "#0D0D12";
const INK2 = "#6B6B7A";
const BORDER = "#EDEAF5";



const NAV_COLS = [
  {
    links: [
      { label: "Student portal", to: "/student-portal" },
      { label: "Professional portal", to: "/professional-portal" },
      { label: "Company portal", to: "/company-portal" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Features", to: "/features" },
    ],
  },
  {
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "Blog", to: "/blog" },
      { label: "Support", to: "/support" },
      { label: "About us", to: "/about-us" },
      { label: "Contact us", to: "/contact-us" },
    ],
  },
];

const SOCIALS = [
  { icon: <Instagram sx={{ fontSize: 20 }} />, to: "https://instagram.com" },
  { icon: <X sx={{ fontSize: 20 }} />, to: "https://x.com" },
  { icon: <LinkedIn sx={{ fontSize: 20 }} />, to: "https://linkedin.com" },
  { icon: <YouTube sx={{ fontSize: 20 }} />, to: "https://youtube.com" },
];

const Footer = () => {
  return (
    <>
      
      <Box
        component="footer"
        sx={{
          background: "#fff",
          borderTop: `1px solid ${BORDER}`,
          pt: { xs: 7, md: 10 },
          pb: { xs: 4, md: 5 },
          px: { xs: 3, md: 8 },
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Box maxWidth="lg" mx="auto">
          <Grid container spacing={{ xs: 5, md: 8 }}>

            {/* BRAND BLOCK */}
            <Grid item xs={12} md={5}>
              {/* Logo */}
              <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                <Box
                  sx={{
                    width: 36, height: 36, borderRadius: 2,
                    background: P, display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <HandshakeOutlined sx={{ fontSize: 20, color: "#fff" }} />
                </Box>
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: INK,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  inTURN
                </Typography>
              </Stack>

              {/* Tagline */}
              <Typography
                sx={{
                  fontSize: 14.5,
                  color: INK2,
                  lineHeight: 1.7,
                  maxWidth: 300,
                  mb: 4,
                }}
              >
                Master interviews before they matter. AI practice, CV analysis, and real professionals — all in one place.
              </Typography>

              {/* Address & Contact */}
              <Stack spacing={2} mb={4}>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: INK, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5 }}>
                    Address
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: INK2 }}>
                    Ganymede Ave, Bedworth Park<br />
                    Vereeniging, Gauteng, 1939
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: INK, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5 }}>
                    Contact
                  </Typography>
                  <Typography
                    component="a"
                    href="tel:0664347295"
                    sx={{ display: "block", fontSize: 13.5, color: INK2, textDecoration: "none", "&:hover": { color: P } }}
                  >
                    066 434 7295
                  </Typography>
                  <Typography
                    component="a"
                    href="mailto:inturnsa@gmail.com"
                    sx={{ display: "block", fontSize: 13.5, color: INK2, textDecoration: "none", "&:hover": { color: P } }}
                  >
                    inturnsa@gmail.com
                  </Typography>
                </Box>
              </Stack>

              {/* Socials */}
              <Stack direction="row" spacing={1}>
                {SOCIALS.map(({ icon, to }, i) => (
                  <Box
                    key={i}
                    component="a"
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 36, height: 36, borderRadius: 2,
                      border: `1.5px solid ${BORDER}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: INK2, textDecoration: "none",
                      transition: "all 0.2s",
                      "&:hover": { background: P, borderColor: P, color: "#fff" },
                    }}
                  >
                    {icon}
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* NAV LINKS */}
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                {NAV_COLS.map((col, ci) => (
                  <Grid item xs={6} key={ci}>
                    <Stack spacing={2}>
                      {col.links.map(({ label, to }) => (
                        <Typography
                          key={to}
                          component={Link}
                          to={to}
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: INK2,
                            textDecoration: "none",
                            transition: "color 0.15s",
                            "&:hover": { color: P },
                          }}
                        >
                          {label}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>

          </Grid>

          {/* BOTTOM BAR */}
          <Box sx={{ mt: { xs: 6, md: 8 }, pt: 3, borderTop: `1px solid ${BORDER}` }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Typography sx={{ fontSize: 13, color: INK2 }}>
                © 2026 inTURN. All rights reserved.
              </Typography>
              <Stack direction="row" spacing={2.5}>
                {[
                  { label: "Privacy policy", to: "/privacy-policy" },
                  { label: "Terms of service", to: "/terms-of-service" },
                  { label: "Cookie settings", to: "/cookie-settings" },
                ].map(({ label, to }) => (
                  <Typography
                    key={to}
                    component={Link}
                    to={to}
                    sx={{
                      fontSize: 13,
                      color: INK2,
                      textDecoration: "none",
                      transition: "color 0.15s",
                      "&:hover": { color: P },
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
