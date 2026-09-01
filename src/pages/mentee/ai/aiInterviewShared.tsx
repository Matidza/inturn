import React from "react";

/* ═══════════════════════════════════════════════════════════
   API
   ═══════════════════════════════════════════════════════════ */
export const API_BASE = "http://localhost:1000/api/v1";
export const INTERVIEWS_PATH = "/mentee/interviews";
export const CREATE_INTERVIEWS_PATH = "/mentee/create";

export const authFetch = async (path: string, opts: RequestInit = {}) => {
  const token = localStorage.getItem("token") ?? "";
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed (${res.status})`);
  return data;
};

export const buildQuery = (scope: "community" | "mine", f: { category: string; sort: string; search: string }) => {
  const p = new URLSearchParams({ scope, sort: f.sort });
  if (f.category !== "All") p.set("category", f.category);
  if (f.search.trim()) p.set("search", f.search.trim());
  return p.toString();
};

/* ═══════════════════════════════════════════════════════════
   TYPES — matches AIInterviewModel exactly
   ═══════════════════════════════════════════════════════════ */
export interface ApiInterview {
  _id: string;
  createdBy: string | { name?: string; surname?: string; avatar?: string };
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  isPublic: boolean;
  questions: string[];
  attempts: number;
  rating: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionCount: number;
  questionList: string[];
  duration: number;
  attempts: number;
  rating: number;
  isPublic: boolean;
  featured: boolean;
  tags: string[];
  authorLabel: string;
  authorAvatar: string;
}

export const toSession = (iv: ApiInterview): Session => {
  const author = typeof iv.createdBy === "object" && iv.createdBy !== null ? iv.createdBy : null;
  const authorName = author ? `${author.name ?? ""} ${author.surname ?? ""}`.trim() : "";
  return {
    id: iv._id ?? "",
    title: iv.title ?? "Untitled session",
    description: iv.description ?? "",
    category: iv.category ?? "Technical",
    difficulty: (iv.difficulty as Session["difficulty"]) ?? "beginner",
    questionCount: Array.isArray(iv.questions) ? iv.questions.length : 0,
    questionList: Array.isArray(iv.questions) ? iv.questions : [],
    duration: iv.duration ?? 30,
    attempts: iv.attempts ?? 0,
    rating: iv.rating ?? 0,
    isPublic: iv.isPublic ?? true,
    featured: iv.featured ?? false,
    tags: Array.isArray(iv.tags) ? iv.tags : [],
    authorLabel: authorName || "Community",
    authorAvatar: author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName || "U")}&background=7F42E7&color=fff`,
  };
};

/* ═══════════════════════════════════════════════════════════
   DATA — matches AIInterviewSchema enums exactly
   ═══════════════════════════════════════════════════════════ */
export const CATEGORIES = [
  "Technical", "Behavioural", "Case-based", "Situational",
  "Competency", "Screening", "Portfolio", "Presentational", "Stress",
];

/* ═══════════════════════════════════════════════════════════
   THEME — shared CSS custom properties + component classes
   ═══════════════════════════════════════════════════════════ */
export const ivxTheme = `
  :root {
    --brand: #7F42E7;
    --brand-deep: #5E2EC5;
    --brand-soft: #B893F6;
    --brand-wash: #F5F0FD;
    --ink: #12101B;
    --ink-2: #5B5769;
    --ink-3: #96919F;
    --line: #E6E1F0;
    --paper: #FFFFFF;
    --floor: #FAF8FD;
    --good: #0E9F6E;
    --good-wash: #E7F9F1;
    --warn: #D97706;
    --warn-wash: #FEF3E2;
    --bad: #DC2626;
    --bad-wash: #FDECEC;
  }
  *,*::before,*::after{ box-sizing:border-box; }
  html,body{ overflow-x:hidden; max-width:100vw; }

  @keyframes rise   { from{opacity:0; transform:translateY(14px)} to{opacity:1; transform:translateY(0)} }
  @keyframes spin   { to{transform:rotate(360deg)} }
  @keyframes sheetUp{ from{opacity:0; transform:translateY(60px)} to{opacity:1; transform:translateY(0)} }
  @keyframes skelShimmer{ 0%{background-position:100% 50%} 100%{background-position:0 50%} }

  .ivx-rise{ animation:rise .5s cubic-bezier(.22,1,.36,1) both; }
  .ivx-rise.d1{ animation-delay:.05s } .ivx-rise.d2{ animation-delay:.1s }

  .ivx-shell{ background:var(--paper); min-height:100vh; font-family:'DM Sans',sans-serif; overflow-x:hidden; max-width:100vw; color:var(--ink); }

  .ivx-hero{ padding:56px 20px 40px; background:var(--floor); border-bottom:1px solid var(--line); }
  @media(min-width:900px){ .ivx-hero{ padding:76px 48px 56px; } }
  .ivx-eyebrow{ display:inline-flex; align-items:center; gap:8px; background:var(--paper); border:1px solid var(--line); border-radius:100px; padding:7px 14px; font-size:12px; font-weight:600; color:var(--brand); }
  .ivx-title{ font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(2rem,5vw,3.2rem); line-height:1.05; letter-spacing:-.03em; margin:18px 0 12px; }
  .ivx-sub{ font-size:15.5px; color:var(--ink-2); line-height:1.7; max-width:520px; font-weight:300; }
  .ivx-cta{ display:inline-flex; align-items:center; gap:9px; padding:14px 24px; border-radius:100px; border:none; background:var(--brand); color:#fff; font-weight:600; font-size:14px; cursor:pointer; box-shadow:0 10px 30px rgba(127,66,231,.28); transition:transform .18s, box-shadow .18s; text-decoration:none; }
  .ivx-cta:hover{ transform:translateY(-2px); box-shadow:0 14px 36px rgba(127,66,231,.36); }
  .ivx-stat{ display:flex; align-items:baseline; gap:6px; }
  .ivx-stat b{ font-family:'Syne',sans-serif; font-size:16px; }
  .ivx-stat span{ font-size:12.5px; color:var(--ink-2); }

  .ivx-body{ max-width:1180px; margin:0 auto; padding:0 20px 64px; }
  @media(min-width:900px){ .ivx-body{ padding:0 48px 80px; display:grid; grid-template-columns:216px 1fr; gap:36px; } }

  .ivx-rail{ padding:28px 0; }
  @media(min-width:900px){ .ivx-rail{ position:sticky; top:24px; align-self:start; } }
  .ivx-rail h4{ font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:var(--ink-3); margin:0 0 10px; }
  .ivx-rail-group{ margin-bottom:24px; }
  .ivx-cat-btn{ display:flex; align-items:center; justify-content:space-between; width:100%; text-align:left; padding:9px 11px; border-radius:9px; border:none; background:transparent; font-size:13.5px; color:var(--ink-2); cursor:pointer; font-family:'DM Sans',sans-serif; transition:background .15s,color .15s; }
  .ivx-cat-btn:hover{ background:var(--brand-wash); color:var(--brand); }
  .ivx-cat-btn.active{ background:var(--brand-wash); color:var(--brand); font-weight:600; }

  .ivx-search{ position:relative; }
  .ivx-search input{ width:100%; padding:11px 14px 11px 38px; border:1.5px solid var(--line); border-radius:11px; font-size:13.5px; font-family:'DM Sans',sans-serif; outline:none; background:var(--paper); transition:border-color .15s; }
  .ivx-search input:focus{ border-color:var(--brand); }
  .ivx-search svg{ position:absolute; left:12px; top:50%; transform:translateY(-50%); pointer-events:none; }

  .ivx-sort{ width:100%; padding:10px 30px 10px 12px; border:1.5px solid var(--line); border-radius:10px; background:var(--paper); font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; appearance:none; }

  .ivx-tabs{ display:flex; gap:4px; border-bottom:1px solid var(--line); margin-top:28px; }
  @media(min-width:900px){ .ivx-tabs{ margin-top:0; } }
  .ivx-tab{ padding:12px 6px; margin-right:20px; background:none; border:none; cursor:pointer; font-size:13.5px; font-family:'DM Sans',sans-serif; color:var(--ink-2); border-bottom:2px solid transparent; display:flex; align-items:center; gap:7px; }
  .ivx-tab.active{ color:var(--brand); border-color:var(--brand); font-weight:600; }
  .ivx-tab-count{ background:var(--floor); font-size:10.5px; font-weight:700; border-radius:100px; padding:1px 7px; font-family:'DM Mono',monospace; color:var(--ink-3); }
  .ivx-tab.active .ivx-tab-count{ background:var(--brand-wash); color:var(--brand); }

  .ivx-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; padding-top:24px; }
  .ivx-card{ background:var(--paper); border:1px solid var(--line); border-left:3px solid var(--brand-soft); border-radius:14px; overflow:hidden; display:flex; flex-direction:column; cursor:pointer; transition:transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s; }
  .ivx-card:hover{ transform:translateY(-3px); box-shadow:0 16px 40px rgba(18,16,27,.08); }
  .ivx-card-body{ padding:18px; flex:1; display:flex; flex-direction:column; }
  .ivx-gauge{ width:30px; height:30px; flex-shrink:0; }
  .ivx-card-title{ font-family:'Syne',sans-serif; font-weight:700; font-size:15px; line-height:1.3; margin:12px 0 6px; }
  .ivx-card-desc{ font-size:12.5px; color:var(--ink-2); line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; flex:1; }
  .ivx-card-meta{ display:flex; justify-content:space-between; align-items:center; font-size:11.5px; color:var(--ink-3); margin-top:14px; padding-top:12px; border-top:1px solid var(--line); }
  .ivx-card-foot{ padding:14px 18px; background:var(--floor); display:flex; align-items:center; justify-content:space-between; gap:10px; }
  .ivx-author{ display:flex; align-items:center; gap:7px; min-width:0; }
  .ivx-author img{ width:20px; height:20px; border-radius:50%; flex-shrink:0; object-fit:cover; }
  .ivx-author span{ font-size:11.5px; color:var(--ink-2); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .ivx-go{ width:30px; height:30px; border-radius:50%; border:none; background:var(--brand); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:transform .15s; }
  .ivx-go:hover{ transform:scale(1.08); }

  .ivx-feat{ background:linear-gradient(135deg,var(--ink) 0%,#251A3D 100%); border-radius:16px; padding:22px; color:#fff; position:relative; overflow:hidden; cursor:pointer; }
  .ivx-feat:hover .ivx-feat-arrow{ transform:translateX(3px); }
  .ivx-feat-arrow{ transition:transform .15s; }

  .ivx-empty{ text-align:center; padding:80px 20px; }
  .ivx-empty-icon{ width:48px; height:48px; border-radius:50%; background:var(--brand-wash); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
  .ivx-skel{ background:linear-gradient(90deg,var(--floor) 25%,var(--line) 37%,var(--floor) 63%); background-size:400% 100%; animation:skelShimmer 1.4s ease infinite; border-radius:14px; height:230px; }

  .ivx-page{ max-width:640px; margin:0 auto; padding:48px 20px 80px; }
  .ivx-back{ display:inline-flex; align-items:center; gap:6px; font-size:13px; color:var(--ink-2); text-decoration:none; margin-bottom:24px; cursor:pointer; background:none; border:none; padding:0; }
  .ivx-field label{ font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--ink-2); display:block; margin-bottom:7px; }
  .ivx-field input, .ivx-field select, .ivx-field textarea{ width:100%; padding:11px 13px; border:1.5px solid var(--line); border-radius:10px; font-size:14px; font-family:'DM Sans',sans-serif; outline:none; background:var(--paper); transition:border-color .15s; }
  .ivx-field input:focus, .ivx-field select:focus, .ivx-field textarea:focus{ border-color:var(--brand); box-shadow:0 0 0 3px rgba(127,66,231,.1); }
  .ivx-field textarea{ min-height:76px; resize:vertical; }
  .ivx-q-row{ display:flex; align-items:center; gap:9px; padding:10px 12px; border:1.5px solid var(--line); border-radius:10px; background:var(--floor); }
  .ivx-q-num{ width:22px; height:22px; border-radius:50%; background:var(--brand-wash); color:var(--brand); flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'DM Mono',monospace; font-size:10.5px; font-weight:700; }
  .ivx-q-row input{ flex:1; border:none; background:transparent; outline:none; font-size:13.5px; font-family:'DM Sans',sans-serif; min-width:0; }
  .ivx-submit{ width:100%; padding:14px; border:none; border-radius:12px; background:var(--brand); color:#fff; font-weight:600; font-size:14.5px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background .15s; }
  .ivx-submit:hover{ background:var(--brand-deep); }
  .ivx-submit:disabled{ opacity:.45; cursor:not-allowed; }
  .ivx-spinner{ width:15px; height:15px; border:2px solid rgba(255,255,255,.35); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
`;

/* ═══════════════════════════════════════════════════════════
   DifficultyGauge — shared signature element
   ═══════════════════════════════════════════════════════════ */
const DIFFICULTY_ARC: Record<string, { color: string; sweep: number }> = {
  beginner: { color: "var(--good)", sweep: 120 },
  intermediate: { color: "var(--warn)", sweep: 240 },
  advanced: { color: "var(--bad)", sweep: 340 },
};

export const DifficultyGauge = ({ level }: { level: string }) => {
  const cfg = DIFFICULTY_ARC[level] ?? DIFFICULTY_ARC.beginner;
  const r = 11, c = 2 * Math.PI * r;
  const filled = (cfg.sweep / 360) * c;
  return (
    <svg className="ivx-gauge" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r={r} fill="none" stroke="var(--line)" strokeWidth="3" />
      <circle
        cx="15" cy="15" r={r} fill="none" stroke={cfg.color} strokeWidth="3"
        strokeDasharray={`${filled} ${c}`} strokeLinecap="round"
        transform="rotate(-90 15 15)"
      />
    </svg>
  );
};