import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
  FileText, Users, CreditCard, Briefcase, AlertTriangle,
  Ban, Cpu, XCircle, TrendingDown, Umbrella,
  Edit3, MapPin, Mail, ChevronRight, ArrowRight, Scale,
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
const AMBER  = "#B45309";
const AMBER_L= "#FEF3C7";

/* ── CSS ─────────────────────────────────────────────── */
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

  .fu  { animation: fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay: .06s; }
  .d2 { animation-delay: .12s; }
  .d3 { animation-delay: .18s; }

  .toc-link {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px; border-radius: 9px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
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

  .section-card {
    border: 1.5px solid ${BORDER}; border-radius: 18px;
    background: #fff; padding: 32px 36px;
    transition: border-color .2s;
    scroll-margin-top: 100px;
  }
  .section-card:hover { border-color: ${P_MID}; }

  .section-icon {
    width: 42px; height: 42px; border-radius: 11px;
    background: ${P_LITE}; color: ${P};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .policy-list { list-style: none; padding: 0; margin: 12px 0 0; }
  .policy-list li {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 8px 0; border-bottom: 1px solid ${BORDER};
    font-family: 'DM Sans', sans-serif; font-size: 14.5px;
    color: ${INK2}; line-height: 1.7;
  }
  .policy-list li:last-child { border-bottom: none; }
  .policy-list li::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: ${P}; flex-shrink: 0; margin-top: 8px;
  }

  .warning-list { list-style: none; padding: 0; margin: 12px 0 0; }
  .warning-list li {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 8px 0; border-bottom: 1px solid ${AMBER_L};
    font-family: 'DM Sans', sans-serif; font-size: 14.5px;
    color: ${INK2}; line-height: 1.7;
  }
  .warning-list li:last-child { border-bottom: none; }
  .warning-list li::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: ${AMBER}; flex-shrink: 0; margin-top: 8px;
  }

  .cta-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    text-decoration: none; border: none; cursor: pointer;
    transition: all .2s;
  }
  .cta-primary { background: ${P}; color: #fff; }
  .cta-primary:hover { background: ${P_DARK}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(127,66,231,.28); }
  .cta-ghost { background: transparent; color: ${P}; border: 1.5px solid ${P}; }
  .cta-ghost:hover { background: ${P}; color: #fff; transform: translateY(-2px); }

  .read-bar {
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, ${P} 0%, ${P_MID} 100%);
    z-index: 9999; transition: width .1s linear;
    border-radius: 0 2px 2px 0;
  }

  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
    background: ${P_LITE}; color: ${P};
  }

  .callout {
    border: 1.5px solid ${BORDER}; border-radius: 14px;
    background: #fff; padding: 20px; margin-bottom: 16px;
  }

  .highlight-box {
    background: ${P_LITE}; border-radius: 12px; padding: 16px 18px;
    display: flex; gap: 12px; align-items: flex-start; margin-top: 16px;
  }
  .warning-box {
    background: ${AMBER_L}; border-radius: 12px; padding: 16px 18px;
    display: flex; gap: 12px; align-items: flex-start; margin-top: 16px;
    border: 1px solid #FDE68A;
  }
`;

/* ── SECTIONS ─────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "s1", num: "01", icon: <Users size={19} />,
    title: "Eligibility",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 1.5 }}>
          You must be at least 18 years old — or have appropriate legal consent from a guardian — to create an account and use the inTURN platform.
        </Typography>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
          By accessing or using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement.
        </Typography>
      </>
    ),
  },
  {
    id: "s2", num: "02", icon: <FileText size={19} />,
    title: "User accounts",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          When you create an account, you are responsible for:
        </Typography>
        <ul className="policy-list">
          <li>Maintaining the confidentiality of your login credentials</li>
          <li>All activities that occur under your account</li>
          <li>Ensuring that your account information is accurate and up to date</li>
          <li>Notifying us immediately of any unauthorised use or security breach</li>
        </ul>
        <div className="highlight-box">
          <AlertTriangle size={15} color={P} style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography sx={{ fontSize: 13.5, color: P, lineHeight: 1.65 }}>
            You may not share your account with others or transfer it to any third party without our written consent.
          </Typography>
        </div>
      </>
    ),
  },
  {
    id: "s3", num: "03", icon: <Cpu size={19} />,
    title: "Services provided",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          inTURN provides the following core services, which may evolve over time:
        </Typography>
        <ul className="policy-list">
          <li>AI-powered mock interview simulations with instant scoring and feedback</li>
          <li>CV and ATS optimisation tools</li>
          <li>A marketplace connecting students with professional mentors</li>
          <li>Job and internship listings from partner companies</li>
          <li>Career coaching and guidance sessions</li>
        </ul>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mt: 2 }}>
          We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice where possible.
        </Typography>
      </>
    ),
  },
  {
    id: "s4", num: "04", icon: <CreditCard size={19} />,
    title: "Payments & pricing",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          Certain services on the inTURN platform require payment. The following terms apply:
        </Typography>
        <ul className="policy-list">
          <li>All pricing is displayed in South African Rand (ZAR)</li>
          <li>Payments are processed securely through PCI-compliant third-party providers</li>
          <li>Session fees are charged only after a professional approves your booking</li>
          <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
          <li>Refunds are available for cancelled sessions within the eligible window (24+ hours notice)</li>
        </ul>
        <div className="warning-box">
          <AlertTriangle size={15} color={AMBER} style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography sx={{ fontSize: 13.5, color: AMBER, lineHeight: 1.65 }}>
            Outside the eligible cancellation window, payments are non-refundable unless otherwise required by applicable consumer protection law.
          </Typography>
        </div>
      </>
    ),
  },
  {
    id: "s5", num: "05", icon: <Briefcase size={19} />,
    title: "Professional services disclaimer",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          inTURN facilitates connections between users and independent professionals. We are a platform, not an employment agency or career counselling service.
        </Typography>
        <ul className="policy-list">
          <li>We do not guarantee job placement or interview success</li>
          <li>We do not guarantee specific performance improvements</li>
          <li>Professionals are independent contractors, not inTURN employees</li>
          <li>Session quality and outcomes may vary between professionals</li>
        </ul>
      </>
    ),
  },
  {
    id: "s6", num: "06", icon: <Ban size={19} />,
    title: "Acceptable use",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          By using the platform, you agree not to engage in the following conduct:
        </Typography>
        <ul className="warning-list">
          <li>Violate any applicable laws, regulations, or third-party rights</li>
          <li>Engage in fraudulent, deceptive, or misleading behaviour</li>
          <li>Attempt to breach, hack, or exploit platform security systems</li>
          <li>Harass, intimidate, or harm other users or professionals</li>
          <li>Upload malicious code, viruses, or harmful content</li>
          <li>Use automated tools to scrape or extract platform data</li>
          <li>Impersonate another user, professional, or inTURN employee</li>
        </ul>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mt: 2 }}>
          Violations may result in immediate account suspension or termination without refund.
        </Typography>
      </>
    ),
  },
  {
    id: "s7", num: "07", icon: <Scale size={19} />,
    title: "Intellectual property",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        All content, trademarks, branding, software, algorithms, and technology on the inTURN platform are the exclusive property of inTURN and are protected under applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable licence to use the platform for its intended purpose. Nothing in these Terms transfers any ownership of intellectual property to you.
      </Typography>
    ),
  },
  {
    id: "s8", num: "08", icon: <XCircle size={19} />,
    title: "Termination",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        We reserve the right to suspend or permanently terminate your account, with or without notice, if you violate these Terms or engage in any conduct that we determine to be harmful to the platform, other users, or third parties. You may also close your account at any time by contacting us. Upon termination, your right to use the platform ceases immediately. Provisions that by their nature should survive termination will continue to apply.
      </Typography>
    ),
  },
  {
    id: "s9", num: "09", icon: <TrendingDown size={19} />,
    title: "Limitation of liability",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 2 }}>
          To the maximum extent permitted by applicable law, inTURN shall not be liable for:
        </Typography>
        <ul className="policy-list">
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Loss of profits, revenue, data, or business opportunities</li>
          <li>Damages arising from reliance on platform content or professional advice</li>
          <li>Service interruptions, errors, or technical failures beyond our control</li>
        </ul>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mt: 2 }}>
          Our total liability in any circumstance is limited to the amount you paid to us in the 3 months preceding the claim.
        </Typography>
      </>
    ),
  },
  {
    id: "s10", num: "10", icon: <Umbrella size={19} />,
    title: "Indemnification",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        You agree to indemnify, defend, and hold harmless inTURN, its directors, employees, and agents from and against any claims, liabilities, damages, judgments, costs, and expenses (including reasonable legal fees) arising from or related to your use of the platform, your violation of these Terms, or your infringement of any rights of a third party.
      </Typography>
    ),
  },
  {
    id: "s11", num: "11", icon: <Edit3 size={19} />,
    title: "Changes to terms",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        We may update these Terms at any time to reflect changes in our services, legal requirements, or business practices. We will notify you of material changes via email or a prominent notice on the platform at least 14 days before they take effect. Continued use of inTURN after the effective date of updated Terms constitutes your acceptance of those changes.
      </Typography>
    ),
  },
  {
    id: "s12", num: "12", icon: <MapPin size={19} />,
    title: "Governing law",
    content: (
      <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8 }}>
        These Terms of Service are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising out of or related to these Terms or your use of the platform shall be subject to the exclusive jurisdiction of the South African courts, unless an alternative dispute resolution mechanism is mutually agreed upon.
      </Typography>
    ),
  },
  {
    id: "s13", num: "13", icon: <Mail size={19} />,
    title: "Contact",
    content: (
      <>
        <Typography sx={{ fontSize: 14.5, color: INK2, lineHeight: 1.8, mb: 3 }}>
          For any questions, concerns, or legal notices regarding these Terms of Service, please contact us. We aim to respond within 48 hours.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <a href="mailto:inturnsa@gmail.com" className="cta-btn cta-primary">
            <Mail size={15} /> inturnsa@gmail.com
          </a>
          <Link to="/contact-us" className="cta-btn cta-ghost">
            Contact form <ArrowRight size={14} />
          </Link>
        </Stack>
      </>
    ),
  },
];

/* ── COMPONENT ────────────────────────────────────────── */
const TermsOfService: React.FC = () => {
  const [activeId, setActiveId] = useState("s1");
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      setReadProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);

      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) { setActiveId(sec.id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <style>{css}</style>
      <div className="read-bar" style={{ width: `${readProgress}%` }} />

      <Box sx={{ background: OFF, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* HERO */}
        <Box sx={{
          background: `linear-gradient(160deg, ${P_LITE} 0%, #fff 55%)`,
          pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 },
          px: { xs: 3, md: 8 }, borderBottom: `1px solid ${BORDER}`,
        }}>
          <Box maxWidth="lg" mx="auto">
            <div className="fu">
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 3 }}>
                <div className="badge"><Scale size={12} /> Legal</div>
                <Typography sx={{ fontSize: 12, color: INK3, fontFamily: "'DM Mono', monospace" }}>
                  v2.1 · 05 April 2026
                </Typography>
              </Box>
            </div>
            <div className="fu d1">
              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.4rem", md: "3.8rem" },
                fontWeight: 800, color: INK,
                letterSpacing: "-0.03em", lineHeight: 1.04, mb: 2.5,
              }}>
                Terms of Service
              </Typography>
            </div>
            <div className="fu d2">
              <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: INK2, lineHeight: 1.8, maxWidth: 580, fontWeight: 300 }}>
                By using inTURN, you agree to these terms. We've written them to be clear, fair, and straightforward — no intentional legal obscurity.
              </Typography>
            </div>
            <div className="fu d3">
              <Stack direction="row" spacing={3} mt={4} flexWrap="wrap">
                {[
                  { label: "Last updated", val: "05 April 2026" },
                  { label: "Jurisdiction", val: "South Africa" },
                  { label: "Sections", val: `${SECTIONS.length} clauses` },
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

        {/* BODY */}
        <Box maxWidth="lg" mx="auto" px={{ xs: 2, md: 4 }} py={{ xs: 4, md: 8 }}>
          <Box sx={{ display: "flex", gap: 5, alignItems: "flex-start" }}>

            {/* TOC */}
            <Box sx={{ display: { xs: "none", lg: "block" }, width: 240, flexShrink: 0, position: "sticky", top: 90 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: INK3, textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5, px: 1.5 }}>
                Contents
              </Typography>
              <Stack spacing={0.25}>
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

              <Box mt={3}>
                <div className="callout">
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: INK, mb: 0.5 }}>Plain English summary</Typography>
                  <Typography sx={{ fontSize: 12.5, color: INK2, lineHeight: 1.65 }}>
                    Be honest, don't harm others, and pay for what you use. That's the core of it.
                  </Typography>
                </div>
                <div className="callout">
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: INK, mb: 0.5 }}>South African law</Typography>
                  <Typography sx={{ fontSize: 12.5, color: INK2, lineHeight: 1.65 }}>
                    These terms are governed by South African law and comply with the Consumer Protection Act.
                  </Typography>
                </div>
              </Box>
            </Box>

            {/* Sections */}
            <Box flex={1}>
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

              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={5} pt={4}
                sx={{ borderTop: `1px solid ${BORDER}` }}>
                <Typography sx={{ fontSize: 13, color: INK3 }}>© 2026 inTURN. All rights reserved.</Typography>
                <Stack direction="row" spacing={2}>
                  <Link to="/privacy-policy" style={{ fontSize: 13, color: INK2, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</Link>
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

export default TermsOfService;