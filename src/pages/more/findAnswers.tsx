import React, { useMemo, useState, useRef } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  Search, Sparkles, Bot, Users, FileText, CreditCard,
  ShieldCheck, Briefcase, ChevronDown, Mail, MessageCircle,
} from "lucide-react";

/* ── Brand tokens (matches inTurn's purple system) ──────────── */
const P = "#7F42E7";
const PD = "#5E2EC5";
const PL = "#F0EAFD";
const INK = "#0D0D12";
const INK2 = "#4A4A5A";
const INK3 = "#8A8AA0";
const BORDER = "#E8E3F5";
const OFF = "#F7F6FC";
const WHITE = "#FFFFFF";

const DISPLAY_FONT = "'Syne', sans-serif";
const BODY_FONT = "'DM Sans', sans-serif";
const MONO_FONT = "'DM Mono', monospace";

/* ── Content ──────────────────────────────────────────────────
   Real inTurn FAQ content, grouped by the categories a mentee,
   professional, or company would actually search for. */
type QA = { q: string; a: string };
type Category = { id: string; label: string; icon: React.ReactNode; items: QA[] };

const CATEGORIES: Category[] = [
  {
    id: "getting-started",
    label: "Getting started",
    icon: <Sparkles size={16} />,
    items: [
      {
        q: "What is inTurn?",
        a: "inTurn is a career-prep platform that connects you with everything you need to walk into an interview ready: AI-powered mock interviews you can run any time, real mock interviews with industry professionals, and a CV analyzer that tells you exactly what to fix before you apply.",
      },
      {
        q: "Do I need any experience to start using inTurn?",
        a: "No. Whether you're preparing for your first internship or your tenth interview, you can start with an AI mock interview at the beginner difficulty and work your way up. There's no prerequisite — just an account.",
      },
      {
        q: "What's the difference between a mentee, a professional, and a company account?",
        a: "Mentees are job seekers preparing for interviews. Professionals are industry practitioners who host real mock interviews and give feedback. Companies use inTurn to discover candidates who've prepared seriously. You choose your account type when you sign up, and each gets its own dashboard.",
      },
    ],
  },
  {
    id: "ai-interviews",
    label: "AI interviews",
    icon: <Bot size={16} />,
    items: [
      {
        q: "How does an AI mock interview work?",
        a: "Pick or create an interview by role, category, and difficulty. The AI asks the set questions, listens to your answers, and adapts its follow-ups based on what you say — the same way a real interviewer would probe deeper on a vague answer.",
      },
      {
        q: "Can I create my own AI interview?",
        a: "Yes. Set a title, description, category, difficulty, and at least 5 questions, then choose whether to keep it private or publish it to the community, where other mentees can practice with it too.",
      },
      {
        q: "Do AI interviews give feedback, or just ask questions?",
        a: "Both. After each session you get feedback on your answers, and your attempt is added to that interview's history so you can track improvement over multiple tries.",
      },
    ],
  },
  {
    id: "real-interviews",
    label: "Real interviews",
    icon: <Users size={16} />,
    items: [
      {
        q: "What's a real interview, and how is it different from an AI one?",
        a: "A real interview is a live session with an actual industry professional — booked at a specific time, conducted over video, with feedback from a person who's hired for roles like the one you're preparing for.",
      },
      {
        q: "How do I book a session with a professional?",
        a: "Browse professionals by role, industry, or rating, open their profile to see their availability, and pick a time slot. You'll get a confirmation once they accept, and a reminder before the session starts.",
      },
      {
        q: "What happens if I need to cancel or reschedule?",
        a: "You can cancel or reschedule from your applications page. Cancelling with enough notice before the session is free; check the specific policy shown at booking, since it can vary by professional.",
      },
    ],
  },
  {
    id: "cv-analyzer",
    label: "CV analyzer",
    icon: <FileText size={16} />,
    items: [
      {
        q: "What does the CV analyzer actually check?",
        a: "It reviews structure, clarity, keyword alignment with the role you're targeting, and common issues that get CVs filtered out before a human ever reads them — then gives you a prioritized list of what to fix.",
      },
      {
        q: "What file formats can I upload?",
        a: "PDF and Word documents (.pdf, .docx) both work. We'd recommend PDF, since it preserves your formatting exactly as a recruiter would see it.",
      },
      {
        q: "Can I re-analyze my CV after making changes?",
        a: "Yes — upload as many times as you like. Every analysis is saved to your profile, so you can compare versions and see your score improve.",
      },
    ],
  },
  {
    id: "billing",
    label: "Payments & billing",
    icon: <CreditCard size={16} />,
    items: [
      {
        q: "Is inTurn free to use?",
        a: "AI mock interviews and the CV analyzer are free to use. Booking a real session with a professional has a cost, set individually by each professional and shown clearly before you confirm a booking.",
      },
      {
        q: "How do payments to professionals work?",
        a: "Payment is collected securely when you confirm a booking. Professionals are paid out after the session is completed, so you're never charged for a session that didn't happen.",
      },
      {
        q: "Can I get a refund?",
        a: "If a professional cancels or doesn't show up, you're refunded automatically. For other cancellations, refund eligibility depends on how much notice was given — this is shown at the time of booking.",
      },
    ],
  },
  {
    id: "account",
    label: "Account & security",
    icon: <ShieldCheck size={16} />,
    items: [
      {
        q: "How do I reset my password?",
        a: "From the login page, select 'Forgot password' and enter your email. We'll send a verification code you can use to set a new one — it expires after 5 minutes for security.",
      },
      {
        q: "Is my CV and interview data private?",
        a: "Yes. Your CV, private AI interviews, and session recordings are only visible to you and, for real interviews, the professional you booked. Nothing is shared with companies unless you choose to make your profile discoverable.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Account Settings > Privacy > Delete account. This permanently removes your profile, CVs, and interview history, so make sure you've downloaded anything you want to keep first.",
      },
    ],
  },
  {
    id: "professionals",
    label: "For professionals",
    icon: <Briefcase size={16} />,
    items: [
      {
        q: "How do I become a professional on inTurn?",
        a: "Sign up with a professional account and complete your profile — role, industry, experience, and the type of interviews you're able to host. Profiles are reviewed before they go live to mentees.",
      },
      {
        q: "How do I set my availability and rate?",
        a: "From your professional dashboard, open Availability to set the time slots you're open for bookings, and Rates to set what you charge per session — you can change either at any time.",
      },
      {
        q: "When and how do I get paid?",
        a: "Payouts are released after each completed session, on the schedule shown in your dashboard's Payments tab, to the payout method you've connected.",
      },
    ],
  },
];

/* ── Component ────────────────────────────────────────────────── */
const FindAnswers = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [expanded, setExpanded] = useState<string | false>(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isSearching = query.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const needle = query.trim().toLowerCase();
    const results: { category: Category; item: QA }[] = [];
    for (const category of CATEGORIES) {
      for (const item of category.items) {
        if (item.q.toLowerCase().includes(needle) || item.a.toLowerCase().includes(needle)) {
          results.push({ category, item });
        }
      }
    }
    return results;
  }, [query, isSearching]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box sx={{ background: WHITE, minWidth: 0, fontFamily: BODY_FONT }}>
      {/* ── Hero / search ─────────────────────────────────────── */}
      <Box sx={{ background: `linear-gradient(180deg, ${PL} 0%, ${WHITE} 100%)`, borderBottom: `1px solid ${BORDER}` }}>
        <Box sx={{ maxWidth: 900, mx: "auto", px: { xs: 2, md: 10 }, pt: { xs: 6, md: 9 }, pb: { xs: 5, md: 7 }, textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: DISPLAY_FONT, fontWeight: 700,
              fontSize: { xs: 30, md: 42 }, color: INK, letterSpacing: "-0.02em", mb: 1.5,
            }}
          >
            How can we help?
          </Typography>
          <Typography sx={{ color: INK2, fontSize: 15.5, maxWidth: 480, mx: "auto", mb: 4 }}>
            Answers about AI interviews, real sessions with professionals, your CV, and your account.
          </Typography>

          <Box
            sx={{
              display: "flex", alignItems: "center", gap: 1.25,
              background: WHITE, border: `1px solid ${BORDER}`, borderRadius: "100px",
              px: 2.5, py: 1.25, maxWidth: 520, mx: "auto",
              boxShadow: "0 1px 2px rgba(13,13,18,0.04)",
              "&:focus-within": { borderColor: P },
            }}
          >
            <Search size={18} color={INK3} />
            <Box
              component="input"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Search for a question..."
              sx={{
                border: "none", outline: "none", flex: 1,
                fontFamily: BODY_FONT, fontSize: 14.5, color: INK,
                background: "transparent",
                "&::placeholder": { color: INK3 },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ── Body ──────────────────────────────────────────────── */}
      <Box sx={{ maxWidth: 1080, mx: "auto", px: { xs: 2, md: 10 }, py: { xs: 5, md: 7 }, minWidth: 0 }}>
        {isSearching ? (
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 13, color: INK3, fontFamily: MONO_FONT, mb: 3 }}>
              {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
            </Typography>

            {searchResults.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: INK, mb: 1 }}>
                  No matches for that search
                </Typography>
                <Typography sx={{ fontSize: 14, color: INK2 }}>
                  Try a shorter or more general term, or reach out below and we'll answer directly.
                </Typography>
              </Box>
            ) : (
              searchResults.map(({ category, item }, i) => (
                <FaqRow
                  key={`${category.id}-${i}`}
                  qa={item}
                  tag={category.label}
                  expanded={expanded === `${category.id}-${i}`}
                  onToggle={() => setExpanded(expanded === `${category.id}-${i}` ? false : `${category.id}-${i}`)}
                />
              ))
            )}
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: { xs: 0, md: 6 }, minWidth: 0 }}>
            {/* Sidebar nav */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: 220, flexShrink: 0,
                position: "sticky", top: 24, alignSelf: "flex-start",
              }}
            >
              {CATEGORIES.map((c) => (
                <Box
                  key={c.id}
                  onClick={() => scrollToCategory(c.id)}
                  sx={{
                    display: "flex", alignItems: "center", gap: 1.25,
                    px: 1.5, py: 1.1, borderRadius: 2, cursor: "pointer",
                    color: activeCategory === c.id ? P : INK2,
                    background: activeCategory === c.id ? PL : "transparent",
                    fontSize: 13.5, fontWeight: activeCategory === c.id ? 700 : 500,
                    "&:hover": { background: PL, color: P },
                  }}
                >
                  {c.icon}
                  {c.label}
                </Box>
              ))}

              <Box sx={{ mt: 3, p: 2.25, background: OFF, borderRadius: 3, border: `1px solid ${BORDER}` }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, mb: 0.5 }}>
                  Still stuck?
                </Typography>
                <Typography sx={{ fontSize: 12, color: INK2, lineHeight: 1.6, mb: 1.5 }}>
                  Our team usually replies within a day.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: P, fontSize: 12.5, fontWeight: 700 }}>
                  <Mail size={13} /> support@inturn.app
                </Box>
              </Box>
            </Box>

            {/* Category sections */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {CATEGORIES.map((category) => (
                <Box
                  key={category.id}
                  ref={(el: HTMLDivElement | null) => { sectionRefs.current[category.id] = el; }}
                  sx={{ mb: 5, scrollMarginTop: 24 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, color: P }}>
                    {category.icon}
                    <Typography sx={{ fontSize: 17, fontWeight: 800, color: INK, fontFamily: DISPLAY_FONT }}>
                      {category.label}
                    </Typography>
                  </Box>

                  {category.items.map((item, i) => {
                    const key = `${category.id}-${i}`;
                    return (
                      <FaqRow
                        key={key}
                        qa={item}
                        expanded={expanded === key}
                        onToggle={() => setExpanded(expanded === key ? false : key)}
                      />
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* ── Contact strip ─────────────────────────────────────── */}
      <Box sx={{ borderTop: `1px solid ${BORDER}`, background: OFF }}>
        <Box
          sx={{
            maxWidth: 1080, mx: "auto", px: { xs: 2, md: 10 }, py: { xs: 5, md: 6 },
            display: "flex", flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: PL, display: "flex", alignItems: "center", justifyContent: "center", color: P, flexShrink: 0 }}>
              <MessageCircle size={18} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: INK }}>
                Didn't find your answer?
              </Typography>
              <Typography sx={{ fontSize: 13, color: INK2 }}>
                Email us directly and a real person will get back to you.
              </Typography>
            </Box>
          </Box>
          <Box
            component="a"
            href="mailto:support@inturn.app"
            sx={{
              px: 3, py: 1.25, borderRadius: "100px", background: P, color: WHITE,
              fontSize: 13.5, fontWeight: 700, textDecoration: "none", flexShrink: 0,
              "&:hover": { background: PD },
            }}
          >
            Contact support
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

/* ── FAQ row (accordion) ─────────────────────────────────────── */
const FaqRow = ({
  qa, tag, expanded, onToggle,
}: { qa: QA; tag?: string; expanded: boolean; onToggle: () => void }) => (
  <Accordion
    expanded={expanded}
    onChange={onToggle}
    disableGutters
    elevation={0}
    sx={{
      border: `1px solid ${BORDER}`, borderRadius: "12px !important",
      mb: 1.25, overflow: "hidden",
      "&:before": { display: "none" },
      "&.Mui-expanded": { borderColor: P },
    }}
  >
    <AccordionSummary
      expandIcon={<ChevronDown size={17} color={INK3} />}
      sx={{ px: 2.25, py: 0.5, "& .MuiAccordionSummary-content": { my: 1.25 } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
        {tag && (
          <Typography sx={{ fontSize: 11, color: P, fontFamily: MONO_FONT, fontWeight: 700 }}>
            {tag}
          </Typography>
        )}
        <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: INK }}>{qa.q}</Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails sx={{ px: 2.25, pb: 2.25, pt: 0 }}>
      <Typography sx={{ fontSize: 13.5, color: INK2, lineHeight: 1.7 }}>{qa.a}</Typography>
    </AccordionDetails>
  </Accordion>
);

export default FindAnswers;
