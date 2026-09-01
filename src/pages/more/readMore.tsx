import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Clock, ArrowUpRight, Bot, Users, TrendingUp, Megaphone } from "lucide-react";

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

/* ── Categories ───────────────────────────────────────────────
   Each gets its own icon + accent, used consistently across the
   tag pill, the tab, and the featured strip. */
const CATEGORY_META: Record<string, { icon: React.ReactNode; accent: string }> = {
  "Interview Tips": { icon: <Users size={13} />, accent: P },
  "Career Advice": { icon: <TrendingUp size={13} />, accent: "#1E9E6B" },
  "AI & Prep Tools": { icon: <Bot size={13} />, accent: "#C2650A" },
  "inTurn Updates": { icon: <Megaphone size={13} />, accent: "#2470C4" },
};
const TABS = ["All", ...Object.keys(CATEGORY_META)];

/* ── Articles ─────────────────────────────────────────────────
   Real, specific inTurn-relevant content — not filler. First
   entry is the featured hero piece. */
type Article = {
  title: string; excerpt: string; category: string;
  author: string; date: string; readMins: number; featured?: boolean;
};

const ARTICLES: Article[] = [
  {
    title: "What happens in your brain during an interview — and how to prep for it",
    excerpt:
      "Interview nerves aren't a character flaw, they're a predictable stress response. Here's what's actually happening physiologically when you freeze up, and the specific rehearsal habits that blunt it before it starts.",
    category: "Interview Tips",
    author: "Naledi Khumalo",
    date: "24 Aug 2026",
    readMins: 7,
    featured: true,
  },
  {
    title: "The STAR method is fine. Here's what actually separates strong answers from weak ones.",
    excerpt:
      "Everyone knows Situation, Task, Action, Result. Almost nobody nails the part that matters most: picking the right story in the first five seconds.",
    category: "Interview Tips",
    author: "Naledi Khumalo",
    date: "18 Aug 2026",
    readMins: 6,
  },
  {
    title: "How to answer 'What's your biggest weakness?' without lying or oversharing",
    excerpt:
      "Two failure modes: the fake weakness ('I'm too much of a perfectionist') and the honest one that tanks your chances. There's a third option.",
    category: "Interview Tips",
    author: "Thabo Mokoena",
    date: "12 Aug 2026",
    readMins: 5,
  },
  {
    title: "Your CV isn't rejected by a person. It's rejected by a filter. Fix the filter first.",
    excerpt:
      "Applicant tracking systems reject most CVs before a human sees them. What they're actually parsing for, and the formatting choices quietly working against you.",
    category: "Career Advice",
    author: "Sipho Nkosi",
    date: "20 Aug 2026",
    readMins: 8,
  },
  {
    title: "Switching careers with no direct experience: what actually gets you an interview",
    excerpt:
      "Transferable skills are real, but 'I'm a fast learner' isn't a pitch. Here's how to translate unrelated experience into language a hiring manager trusts.",
    category: "Career Advice",
    author: "Amahle Dlamini",
    date: "9 Aug 2026",
    readMins: 9,
  },
  {
    title: "How to negotiate salary when you have zero leverage",
    excerpt:
      "You don't need a competing offer to negotiate — you need to understand what's actually flexible in a job offer beyond the number on the letter.",
    category: "Career Advice",
    author: "Thabo Mokoena",
    date: "3 Aug 2026",
    readMins: 6,
  },
  {
    title: "We watched 10,000 AI mock interviews. Here's what the best answers had in common.",
    excerpt:
      "A look at the patterns behind top-rated inTurn sessions — where strong answers actually differ from weak ones, question by question.",
    category: "AI & Prep Tools",
    author: "inTurn Team",
    date: "22 Aug 2026",
    readMins: 10,
  },
  {
    title: "AI interviews vs. real interviews: when to use each while you prepare",
    excerpt:
      "They're not competing tools. Here's a practical sequence — when to drill with AI, and when it's time to book a real session with a professional.",
    category: "AI & Prep Tools",
    author: "inTurn Team",
    date: "14 Aug 2026",
    readMins: 5,
  },
  {
    title: "New: difficulty-adaptive AI interviews are live",
    excerpt:
      "AI interviews now adjust follow-up depth based on how you're answering, not just the fixed question list — closer to how a real interviewer probes.",
    category: "inTurn Updates",
    author: "inTurn Team",
    date: "27 Aug 2026",
    readMins: 3,
  },
  {
    title: "inTurn is now open to companies looking to discover prepared candidates",
    excerpt:
      "Companies can now browse mentee profiles who've opted in to visibility — see CV analysis scores, completed interviews, and readiness at a glance.",
    category: "inTurn Updates",
    author: "inTurn Team",
    date: "5 Aug 2026",
    readMins: 4,
  },
];

/* ── Component ────────────────────────────────────────────────── */
const ReadMore = () => {
  const [tab, setTab] = useState("All");

  const featured = ARTICLES.find((a) => a.featured)!;
  const rest = ARTICLES.filter((a) => !a.featured);

  const visible = useMemo(
    () => (tab === "All" ? rest : rest.filter((a) => a.category === tab)),
    [tab, rest]
  );

  return (
    <Box sx={{ background: WHITE, minWidth: 0, fontFamily: BODY_FONT }}>
      <Box sx={{ maxWidth: 1120, mx: "auto", px: { xs: 2, md: 10 }, py: { xs: 5, md: 7 }, minWidth: 0 }}>
        {/* ── Page intro ─────────────────────────────────────── */}
        <Typography
          sx={{
            fontFamily: DISPLAY_FONT, fontWeight: 700,
            fontSize: { xs: 28, md: 38 }, color: INK, letterSpacing: "-0.02em", mb: 1,
          }}
        >
          Read more
        </Typography>
        <Typography sx={{ color: INK2, fontSize: 15, maxWidth: 520, mb: { xs: 4, md: 5 } }}>
          Interview tactics, career advice, and how to get the most out of your prep — written by our
          team and the professionals on inTurn.
        </Typography>

        {/* ── Featured article ───────────────────────────────── */}
        <Box
          sx={{
            display: "flex", flexDirection: { xs: "column", md: "row" },
            border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden",
            mb: { xs: 5, md: 6 }, cursor: "pointer",
            "&:hover .featured-title": { color: P },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: 340 }, minHeight: { xs: 160, md: "auto" }, flexShrink: 0,
              background: `linear-gradient(135deg, ${P}, ${PD})`,
              display: "flex", alignItems: "center", justifyContent: "center", p: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: DISPLAY_FONT, fontWeight: 700, color: WHITE,
                fontSize: 22, textAlign: "center", lineHeight: 1.3, letterSpacing: "-0.01em",
              }}
            >
              inTurn Reads
            </Typography>
          </Box>
          <Box sx={{ p: { xs: 3, md: 4.5 }, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
            <CategoryTag category={featured.category} />
            <Typography
              className="featured-title"
              sx={{ fontSize: { xs: 19, md: 22 }, fontWeight: 800, color: INK, mt: 1.5, mb: 1, lineHeight: 1.35, transition: "color 0.15s" }}
            >
              {featured.title}
            </Typography>
            <Typography sx={{ fontSize: 14, color: INK2, lineHeight: 1.7, mb: 2 }}>
              {featured.excerpt}
            </Typography>
            <ArticleMeta article={featured} />
          </Box>
        </Box>

        {/* ── Category tabs ──────────────────────────────────── */}
        <Box sx={{ display: "flex", gap: 1, mb: 4, overflowX: "auto", minWidth: 0, pb: 0.5 }}>
          {TABS.map((t) => (
            <Box
              key={t}
              onClick={() => setTab(t)}
              sx={{
                px: 2, py: 0.85, borderRadius: "100px", flexShrink: 0, cursor: "pointer",
                fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                border: `1px solid ${tab === t ? P : BORDER}`,
                background: tab === t ? P : WHITE,
                color: tab === t ? WHITE : INK2,
                transition: "all 0.15s",
                "&:hover": tab === t ? {} : { borderColor: P, color: P },
              }}
            >
              {t}
            </Box>
          ))}
        </Box>

        {/* ── Article grid ───────────────────────────────────── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {visible.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </Box>

        {visible.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: INK, mb: 0.5 }}>
              Nothing here yet
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: INK2 }}>
              We haven't published in this category yet — check back soon.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/* ── Pieces ───────────────────────────────────────────────────── */
const CategoryTag = ({ category }: { category: string }) => {
  const meta = CATEGORY_META[category];
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, width: "fit-content", color: meta.accent, fontSize: 12, fontWeight: 700 }}>
      {meta.icon}
      {category}
    </Box>
  );
};

const ArticleMeta = ({ article }: { article: Article }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: "auto" }}>
    <Typography sx={{ fontSize: 12.5, color: INK, fontWeight: 700 }}>{article.author}</Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: INK3 }}>
      <Clock size={12} />
      <Typography sx={{ fontSize: 12, fontFamily: MONO_FONT }}>{article.readMins} min</Typography>
    </Box>
    <Typography sx={{ fontSize: 12, color: INK3, fontFamily: MONO_FONT }}>{article.date}</Typography>
  </Box>
);

const ArticleCard = ({ article }: { article: Article }) => (
  <Box
    sx={{
      border: `1px solid ${BORDER}`, borderRadius: 3, p: 3, cursor: "pointer",
      display: "flex", flexDirection: "column", minWidth: 0,
      transition: "border-color 0.15s, transform 0.15s",
      "&:hover": { borderColor: P, transform: "translateY(-2px)" },
      "&:hover .card-title": { color: P },
      "&:hover .card-arrow": { opacity: 1, transform: "translate(2px,-2px)" },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5 }}>
      <CategoryTag category={article.category} />
      <Box className="card-arrow" sx={{ color: INK3, opacity: 0, transition: "all 0.15s", flexShrink: 0 }}>
        <ArrowUpRight size={16} />
      </Box>
    </Box>
    <Typography
      className="card-title"
      sx={{ fontSize: 16, fontWeight: 800, color: INK, mt: 1.25, mb: 1, lineHeight: 1.4, transition: "color 0.15s" }}
    >
      {article.title}
    </Typography>
    <Typography sx={{ fontSize: 13, color: INK2, lineHeight: 1.65, mb: 2.5, flex: 1 }}>
      {article.excerpt}
    </Typography>
    <ArticleMeta article={article} />
  </Box>
);

export default ReadMore;
