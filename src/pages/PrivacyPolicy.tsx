import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Shield, Database, Share2, Lock, Clock,
  UserCheck, Globe, Cookie, RefreshCw, Mail,
  ArrowRight, ChevronRight,
} from "lucide-react";

/* ── TOKENS ──────────────────────────────────────────── */
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#5C5C72";
const INK3   = "#8A8AA0";
const BORDER = "#E8E3F5";
const OFF    = "#F8F7FC";

/* ── SHARED CSS ──────────────────────────────────────── */
const css = `
 
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-14px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes progressBar {
    from { width: 0; }
    to   { width: var(--w); }
  }

  .fu   { animation: fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .fi   { animation: fadeIn .5s ease both; }
  .sr   { animation: slideRight .5s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay: .06s; }
  .d2 { animation-delay: .12s; }
  .d3 { animation-delay: .18s; }
  .d4 { animation-delay: .24s; }

  /* Table of contents link */
  .toc-link {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    color: ${INK2}; text-decoration: none;
    transition: all .15s; cursor: pointer;
    border: none; background: none; width: 100%; text-align: left;
  }
  .toc-link:hover { background: ${P_LITE}; color: ${P}; }
  .toc-link.active { background: ${P_LITE}; color: ${P}; font-weight: 600; }
  .toc-link.active .toc-num { background: ${P}; color: #fff; }

  .toc-num {
    width: 22px; height: 22px; border-radius: 6px;
    background: ${BORDER}; color: ${INK2};
    display: flex; align-items: center; justify-content: center;
    font-size: 10.5px; font-weight: 700; flex-shrink: 0;
    font-family: 'DM Mono', monospace;
    transition: all .15s;
  }

  /* Section cards */
  .section-card {
    border: 1.5px solid ${BORDER}; border-radius: 18px;
    background: #fff; padding: 32px 36px;
    transition: border-color .2s;
    scroll-margin-top: 100px;
  }
  .section-card:hover { border-color: ${P_MID}; }
  .section-card:target { border-color: ${P}; }

  .section-icon {
    width: 42px; height: 42px; border-radius: 11px;
    background: ${P_LITE}; color: ${P};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* Bullet list */
  .policy-list { list-style: none; padding: 0; margin: 12px 0 0; }
  .policy-list li {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid ${BORDER};
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px; color: ${INK2}; line-height: 1.7;
  }
  .policy-list li:last-child { border-bottom: none; }
  .policy-list li::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: ${P}; flex-shrink: 0; margin-top: 8px;
  }

  /* CTA button */
  .cta-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    text-decoration: none; border: none; cursor: pointer;
    background: ${P}; color: #fff;
    transition: all .2s;
  }
  .cta-btn:hover { background: ${P_DARK}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(127,66,231,.28); }

  /* Progress bar (reading indicator) */
  .read-bar {
    position: fixed; top: 0; left: 0; height: 3px;
    background: ${P}; z-index: 9999;
    transition: width .1s linear;
    border-radius: 0 2px 2px 0;
  }

  /* Highlight badge */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
    background: ${P_LITE}; color: ${P};
  }

  /* Right-rail callout */
  .callout {
    border: 1.5px solid ${BORDER}; border-radius: 14px;
    background: #fff; padding: 20px;
    margin-bottom: 16px;
  }

  /* Version tag */
  .mono { font-family: 'DM Mono', monospace; font-size: 12px; }
`;

/* ── SECTIONS DATA ───────────────────────────────────── */
const SECTIONS = [
  {
    id: "s1", num: "01", icon: <Database size={19} />,
    title: "Information we collect",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          We collect personal data that you provide directly, including your name, email address, CV/resume data, interview responses, and account details.
        </Typography>
        <ul className="policy-list">
          <li>Name, email address, and account credentials</li>
          <li>CV and resume data submitted for analysis</li>
          <li>Interview responses and session recordings</li>
          <li>Usage data: interaction behaviour, session duration, clicks</li>
          <li>Device type, browser, and IP address (analytics only)</li>
          <li>Payment data — processed by PCI-compliant third parties only</li>
        </ul>
      </>
    ),
  },
  {
    id: "s2", num: "02", icon: <UserCheck size={19} />,
    title: "How we use your information",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          Every piece of data we collect has a specific, justified purpose. We never use your data for anything beyond what's described here.
        </Typography>
        <ul className="policy-list">
          <li>Deliver AI-powered interview simulations and scoring</li>
          <li>Analyse and optimise your CV for ATS systems</li>
          <li>Connect you with professionals and employers</li>
          <li>Improve platform performance and personalise your experience</li>
          <li>Ensure platform security and prevent fraud</li>
          <li>Send transactional and account-related communications</li>
        </ul>
      </>
    ),
  },
  {
    id: "s3", num: "03", icon: <Shield size={19} />,
    title: "Legal basis for processing",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          We only process your data where we have a lawful basis to do so under applicable data protection law, including POPIA and GDPR.
        </Typography>
        <ul className="policy-list">
          <li>Your explicit consent — always withdrawable</li>
          <li>Contractual necessity to provide the service</li>
          <li>Legal obligations we are required to fulfil</li>
          <li>Legitimate business interests, balanced against your rights</li>
        </ul>
      </>
    ),
  },
  {
    id: "s4", num: "04", icon: <Share2 size={19} />,
    title: "Data sharing & disclosure",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          We do not sell your personal data. We do not share it for advertising purposes. We only share data in the following limited circumstances:
        </Typography>
        <ul className="policy-list">
          <li>With professionals you explicitly choose to engage with</li>
          <li>With employers when you apply for an opportunity</li>
          <li>With service providers (hosting, analytics, payments) under strict data processing agreements</li>
        </ul>
        <Box sx={{ mt: 2.5, background: P_LITE, borderRadius: "10px", p: 2, display: "flex", gap: 1.5, alignItems: "flex-start" }}>
          <Shield size={14} color={P} style={{ flexShrink: 0, marginTop: 3 }} />
          <Typography sx={{ fontSize: 13.5, color: P, lineHeight: 1.65 }}>
            All third parties are contractually required to maintain confidentiality and uphold data protection standards equivalent to our own.
          </Typography>
        </Box>
      </>
    ),
  },
  {
    id: "s5", num: "05", icon: <Lock size={19} />,
    title: "Data security",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        We implement appropriate technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. This includes encryption in transit and at rest, access controls, and regular security audits. No system is entirely immune to risk, but we treat data security as a first-class concern.
      </Typography>
    ),
  },
  {
    id: "s6", num: "06", icon: <Clock size={19} />,
    title: "Data retention",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. When your data is no longer needed, we securely delete or anonymise it. You can request early deletion at any time by contacting us.
      </Typography>
    ),
  },
  {
    id: "s7", num: "07", icon: <UserCheck size={19} />,
    title: "Your rights",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          Under applicable laws including POPIA and GDPR, you have the following rights regarding your personal data:
        </Typography>
        <ul className="policy-list">
          <li>Access — request a copy of the data we hold about you</li>
          <li>Correction — request that inaccurate data be corrected</li>
          <li>Deletion — request erasure of your personal data</li>
          <li>Object — object to how we process your data</li>
          <li>Portability — receive your data in a machine-readable format</li>
          <li>Withdraw consent — at any time, without affecting prior processing</li>
        </ul>
      </>
    ),
  },
  {
    id: "s8", num: "08", icon: <Globe size={19} />,
    title: "International data transfers",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        Your information may be transferred to and processed in countries outside South Africa, including those where our service providers operate. In all cases, we ensure appropriate safeguards are in place — such as standard contractual clauses or equivalent data protection agreements — before any transfer takes place.
      </Typography>
    ),
  },
  {
    id: "s9", num: "09", icon: <Cookie size={19} />,
    title: "Cookies & tracking",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        We use cookies and similar tracking technologies to enhance your experience, analyse platform usage, and improve our services. You can manage your cookie preferences at any time through our Cookie Settings page. Certain cookies are strictly necessary for the platform to function and cannot be disabled.
      </Typography>
    ),
  },
  {
    id: "s10", num: "10", icon: <RefreshCw size={19} />,
    title: "Updates to this policy",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or platform features. We will notify you of material changes via email or a prominent notice on the platform. Continued use of inTURN after updates constitutes your acceptance of the revised policy.
      </Typography>
    ),
  },
  {
    id: "s11", num: "11", icon: <Mail size={19} />,
    title: "Contact us",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 3 }}>
          If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please reach out. We aim to respond within 48 hours.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <a href="mailto:inturnsa@gmail.com" className="cta-btn">
            <Mail size={15} /> inturnsa@gmail.com
          </a>
          <Link to="/contact-us" className="cta-btn" style={{ background: "transparent", color: P, border: `1.5px solid ${P}` }}>
            Contact form <ArrowRight size={14} />
          </Link>
        </Stack>
      </>
    ),
  },
];

/* ── COMPONENT ────────────────────────────────────────── */
const PrivacyPolicy: React.FC = () => {
  const [activeId, setActiveId] = useState("s1");
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Reading progress */
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadProgress(progress);

      /* Active section highlight */
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveId(sec.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{css}</style>

      {/* Reading progress bar */}
      <div className="read-bar" style={{ width: `${readProgress}%` }} />

      <Box sx={{ background: OFF, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ──────────────────────────────────────── */}
        <Box sx={{
          background: `linear-gradient(160deg, ${P_LITE} 0%, #fff 55%)`,
          pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 },
          px: { xs: 3, md: 8 },
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <Box maxWidth="lg" mx="auto">
            <div className="fu">
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 3 }}>
                <div className="badge"><Shield size={12} /> Legal</div>
                <Typography sx={{ fontSize: 12, color: INK3, fontFamily: "'DM Mono', monospace" }}>
                  v2.1 · 05 April 2026
                </Typography>
              </Box>
            </div>
            <div className="fu d1">
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.4rem", md: "3.8rem" },
                fontWeight: 800,
                color: INK,
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
                mb: 2.5,
              }}>
                Privacy Policy
              </Typography>
            </div>
            <div className="fu d2">
              <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, lineHeight: 1.8, maxWidth: 580, fontWeight: 300 }}>
                We believe privacy is a right, not a feature. This document explains exactly what data we collect, why we collect it, and how we protect it.
              </Typography>
            </div>

            {/* Meta strip */}
            <div className="fu d3">
              <Stack direction="row" spacing={3} mt={4} flexWrap="wrap">
                {[
                  { label: "Last updated", val: "05 April 2026" },
                  { label: "Jurisdiction", val: "South Africa (POPIA)" },
                  { label: "Sections", val: `${SECTIONS.length} topics` },
                ].map(({ label, val }) => (
                  <Box key={label}>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.25 }}>{label}</Typography>
                    <Typography sx={{ fontSize: 13.5, color: INK, fontWeight: 500 }}>{val}</Typography>
                  </Box>
                ))}
              </Stack>
            </div>
          </Box>
        </Box>

        {/* ── BODY (two-col) ────────────────────────────── */}
        <Box maxWidth="lg" mx="auto" px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 8 }}>
          <Box sx={{ display: "flex", gap: 5, alignItems: "flex-start" }}>

            {/* ─ LEFT: Table of Contents (sticky) ──── */}
            <Box sx={{
              display: { xs: "none", lg: "block" },
              width: 240, flexShrink: 0,
              position: "sticky", top: 90,
            }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5, px: 1.5 }}>
                Contents
              </Typography>
              <Stack spacing="0.25">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    className={`toc-link${activeId === sec.id ? " active" : ""}`}
                    onClick={() => scrollTo(sec.id)}
                  >
                    <span className="toc-num">{sec.num}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>{sec.title}</span>
                    {activeId === sec.id && <ChevronRight size={13} />}
                  </button>
                ))}
              </Stack>

              {/* Right-rail callouts */}
              <Box mt={3}>
                <div className="callout">
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: INK, mb: 0.5 }}>Your data, your control</Typography>
                  <Typography sx={{ fontSize: 12.5, color: INK2, lineHeight: 1.65 }}>
                    You can request access, correction, or deletion of your data at any time.
                  </Typography>
                </div>
                <div className="callout">
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: INK, mb: 0.5 }}>We never sell data</Typography>
                  <Typography sx={{ fontSize: 12.5, color: INK2, lineHeight: 1.65 }}>
                    Your personal information is never sold to third parties for any purpose.
                  </Typography>
                </div>
              </Box>
            </Box>

            {/* ─ RIGHT: Sections ───────────────────── */}
            <Box flex={1} ref={contentRef}>
              <Stack spacing={2.5}>
                {SECTIONS.map((sec) => (
                  <div key={sec.id} id={sec.id} className="section-card">
                    <Stack direction="row" spacing={1.75} alignItems="center" mb={2.5}>
                      <div className="section-icon">{sec.icon}</div>
                      <Box>
                        <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: INK3, mb: 0.25 }}>
                          {sec.num}
                        </Typography>
                        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: INK, letterSpacing: "-0.01em" }}>
                          {sec.title}
                        </Typography>
                      </Box>
                    </Stack>
                    {sec.content}
                  </div>
                ))}
              </Stack>

              {/* Bottom nav */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={5} pt={4}
                sx={{ borderTop: `1px solid ${BORDER}` }}>
                <Typography sx={{ fontSize: 13, color: INK3 }}>
                  © 2026 inTURN. All rights reserved.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Link to="/terms-of-service" style={{ fontSize: 13, color: INK2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</Link>
                  <Link to="/cookie-settings" style={{ fontSize: 13, color: INK2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Cookie Settings</Link>
                </Stack>
              </Stack>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
