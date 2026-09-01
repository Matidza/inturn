import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Stack, Skeleton, Alert } from "@mui/material";
import {
  Search, Plus, Brain, Clock, Users, Star, ChevronRight,
  Sparkles, BookOpen, Code2, Briefcase, GitBranch, Target,
 AlertTriangle,
  X, Check,
  Play, Globe, Lock, Zap, ChevronDown, CheckCircle2, RefreshCw,
} from "lucide-react";

/* ─── API ────────────────────────────────────────────────── */
const API_BASE = "http://localhost:1000/api/v1"

// Single source of truth for the mentee-interview routes, matching the
// consolidated AIInterviewModel backend (one collection, scope=community|mine
// on the list endpoint instead of two separate community/mine endpoints).
const INTERVIEWS_ENDPOINT = "/mentee/interviews";
const CREATE_INTERVIEW_ENDPOINT = "/mentee/create-ai-interview";


const authFetch = async (path: string, opts: RequestInit = {}) => {
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
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed ${res.status}`);
  return data;
};

/* Builds the query string shared by both the Community and My interviews
   fetches — scope is the only thing that differs between them. */
const buildInterviewsQuery = (scope: "community" | "mine", filters: { cat: string; sort: string; search: string }) => {
  const params = new URLSearchParams({ scope, sort: filters.sort });
  if (filters.cat !== "all") params.set("category", filters.cat);
  if (filters.search.trim()) params.set("search", filters.search.trim());
  return params.toString();
};

/* ─── API INTERVIEW TYPE (matches Mongoose document) ─────── */
interface APIInterview {
  _id:        string;
  createdBy:  string | { name?: string; surname?: string; avatar?: string };
  title:      string;
  description:string;
  category:   string;
  difficulty: string;
  duration:   number;         // minutes (Number in schema)
  isPublic:   boolean;
  questions:  string[];       // string[] in schema
  attempts:   number;
  rating:     number;
  featured:   boolean;
  tags:       string[];
  createdAt:  string;
}

/* Normalise API document → shape IVCard + featured strip expect.
   All optional chaining + fallbacks prevent "cannot read properties
   of undefined" when any field is missing from the DB document.    */
const normalise = (iv: APIInterview) => ({
  id:           iv._id ?? "",
  title:        iv.title ?? "Untitled",
  category:     iv.category ?? "Technical",
  difficulty:   iv.difficulty ?? "beginner",
  questions:    Array.isArray(iv.questions) ? iv.questions.length : 0,   // ← guarded
  duration:     iv.duration ?? 30,
  attempts:     iv.attempts ?? 0,
  rating:       iv.rating   ?? 0,
  createdBy:    typeof iv.createdBy === "object" && iv.createdBy !== null
    ? `${(iv.createdBy as any).name ?? ""} ${(iv.createdBy as any).surname ?? ""}`.trim() || "Community"
    : "Community",
  avatar: typeof iv.createdBy === "object" && iv.createdBy !== null && (iv.createdBy as any).avatar
    ? (iv.createdBy as any).avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        typeof iv.createdBy === "object" && iv.createdBy !== null
          ? ((iv.createdBy as any).name ?? "U")
          : "U"
      )}&background=7F42E7&color=fff`,
  tags:         Array.isArray(iv.tags) ? iv.tags : [],                   // ← guarded
  description:  iv.description ?? "",
  isPublic:     iv.isPublic ?? true,
  featured:     iv.featured  ?? false,
  questionList: Array.isArray(iv.questions) ? iv.questions : [],         // ← guarded
});

/* ─── TOKENS ─────────────────────────────────────────────── */
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
const RED    = "#DC2626";
const REDL   = "#FEF2F2";

/* ─── CSS ────────────────────────────────────────────────── */
const css = `
  
  /* Reset horizontal overflow */
  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; max-width: 100vw; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulse   { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:.85;transform:scale(1.06)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(80px)} to{opacity:1;transform:translateY(0)} }

  .fu { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1{animation-delay:.06s} .d2{animation-delay:.12s} .d3{animation-delay:.18s} .d4{animation-delay:.24s}

  /* ── Interview card ── */
  .iv-card {
    background:${WHITE}; border:1.5px solid ${BORDER};
    border-radius:16px; overflow:hidden;
    display:flex; flex-direction:column; height:100%;
    transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s, border-color .25s;
  }
  .iv-card:hover {
    transform:translateY(-4px);
    box-shadow:0 18px 44px rgba(127,66,231,.12);
    border-color:${PM};
  }

  /* ── Start btn ── */
  .start-btn {
    width:100%; padding:12px; border:none; border-radius:10px;
    cursor:pointer; font-family:'DM Sans',sans-serif;
    font-size:14px; font-weight:600;
    display:flex; align-items:center; justify-content:center; gap:7px;
    background:${P}; color:#fff;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 4px 14px rgba(127,66,231,.22);
    position:relative; overflow:hidden;
  }
  .start-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    background-size:300% auto; animation:shimmer 2s linear infinite;
  }
  .start-btn:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 10px 28px rgba(127,66,231,.38); }

  /* ── Search input ── */
  .search-wrap { position:relative; width:100%; }
  .search-input {
    width:100%; padding:12px 16px 12px 42px;
    border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
    background:${WHITE}; outline:none;
    transition:border-color .18s, box-shadow .18s;
    -webkit-appearance:none;
  }
  .search-input:focus { border-color:${P}; box-shadow:0 0 0 3px rgba(127,66,231,.1); }
  .search-input::placeholder { color:${INK3}; }

  /* ── Category chips — horizontal scroll, no wrap, no clip ── */
  .cat-scroll {
    display:flex; gap:8px;
    overflow-x:auto; overflow-y:visible;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none;
    padding-bottom:4px;
    /* prevent clipping the active box-shadow */
    padding-top:4px; margin-top:-4px;
  }
  .cat-scroll::-webkit-scrollbar { display:none; }

  .cat-chip {
    display:inline-flex; align-items:center; gap:5px;
    padding:8px 14px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:${WHITE};
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    color:${INK2}; cursor:pointer; white-space:nowrap; flex-shrink:0;
    transition:all .18s cubic-bezier(.34,1.56,.64,1);
    -webkit-tap-highlight-color:transparent;
  }
  .cat-chip:hover:not(.active) { border-color:${PM}; color:${P}; }
  .cat-chip.active {
    border-color:${P}; background:${PL}; color:${P}; font-weight:600;
    box-shadow:0 0 0 3px rgba(127,66,231,.1);
  }

  /* ── Difficulty badge ── */
  .diff { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:100px; font-family:'DM Mono',monospace; font-size:11px; font-weight:500; }

  /* ── Sort select ── */
  .sort-sel {
    padding:10px 34px 10px 13px; border:1.5px solid ${BORDER};
    border-radius:10px; background:${WHITE};
    font-family:'DM Sans',sans-serif; font-size:13.5px; color:${INK};
    outline:none; cursor:pointer; appearance:none; -webkit-appearance:none;
    min-width:0; width:100%;
  }
  .sort-sel:focus { border-color:${P}; }

  /* ── Modal ── */
  .modal-ov {
    position:fixed; inset:0; z-index:2000;
    background:rgba(0,0,0,.58); backdrop-filter:blur(6px);
    display:flex; align-items:flex-end; justify-content:center;
    padding:0;
  }
  .modal-sheet {
    width:100%; max-width:660px; max-height:93vh;
    background:${WHITE}; border-radius:22px 22px 0 0;
    overflow-y:auto; -webkit-overflow-scrolling:touch;
    padding:24px 20px 40px;
    animation:slideUp .38s cubic-bezier(.22,1,.36,1) both;
  }
  @media(min-width:640px){
    .modal-ov { align-items:center; padding:16px; }
    .modal-sheet { border-radius:22px; max-height:90vh; padding:32px; }
  }

  /* ── Form fields ── */
  .flabel {
    font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
    color:${INK2}; text-transform:uppercase; letter-spacing:0.09em;
    display:block; margin-bottom:7px;
  }
  .finput {
    width:100%; padding:12px 14px;
    border:1.5px solid ${BORDER}; border-radius:11px;
    font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
    background:${WHITE}; outline:none; -webkit-appearance:none;
    transition:border-color .18s, box-shadow .18s;
  }
  .finput:focus { border-color:${P}; box-shadow:0 0 0 3px rgba(127,66,231,.1); }
  .finput::placeholder { color:${INK3}; }
  select.finput { appearance:none; -webkit-appearance:none; cursor:pointer; }
  textarea.finput { min-height:80px; resize:vertical; }

  /* ── Q items ── */
  .q-item {
    display:flex; align-items:center; gap:10px;
    padding:11px 13px; border:1.5px solid ${BORDER};
    border-radius:11px; background:${OFF};
    transition:border-color .15s;
  }
  .q-item:focus-within { border-color:${PM}; background:${WHITE}; }
  .q-input { flex:1; background:transparent; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:14px; color:${INK}; min-width:0; }
  .q-input::placeholder { color:${INK3}; }
  .q-num {
    width:24px; height:24px; border-radius:50%;
    background:${PL}; color:${P}; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    font-family:'DM Mono',monospace; font-size:11px; font-weight:700;
  }

  /* ── Create/Submit btn ── */
  .create-btn {
    width:100%; padding:14px; border:none; border-radius:13px;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
    background:${P}; color:#fff; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:all .2s; box-shadow:0 8px 28px rgba(127,66,231,.3);
    -webkit-tap-highlight-color:transparent;
  }
  .create-btn:hover { background:${PD}; transform:translateY(-2px); }
  .create-btn:disabled { opacity:.45; cursor:not-allowed; transform:none; }

  /* ── Spinner ── */
  .spinner { width:17px; height:17px; border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }

  /* ── Hero orb ── */
  .hero-orb {
    position:absolute; border-radius:50%;
    background:radial-gradient(circle,${P}28 0%,transparent 70%);
    pointer-events:none; animation:pulse 9s ease-in-out infinite;
  }

  /* ── Featured dark card ── */
  .feat-card {
    background:linear-gradient(135deg,${INK} 0%,#1C1030 100%);
    border-radius:16px; padding:24px;
    display:flex; flex-direction:column; gap:16px;
    position:relative; overflow:hidden; cursor:pointer;
    transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
    height:100%;
  }
  .feat-card:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,0,0,.28); }

  /* ── Tag pill ── */
  .tag { background:${OFF}; border-radius:100px; padding:3px 10px; font-size:11.5px; font-family:'DM Mono',monospace; color:${INK2}; display:inline-block; }

  /* Touch feedback */
  .touch-active:active { opacity:.75; }
`;

/* ─── DATA ───────────────────────────────────────────────── */
// "Technical","Behavioural","Case-based","Situational/Hypothetical","Competency-based","Screening","Portfolio", "Presentational", "Stress"
const CATEGORIES = [
  { id:"all",                        label:"All",                       icon:<Globe size={13}/> },
  { id:"Technical",                  label:"Technical",                 icon:<Code2 size={13}/> },
  { id:"Behavioural",                label:"Behavioural",               icon:<Brain size={13}/> },
  { id:"Case-based",                 label:"Case-based",                icon:<Briefcase size={13}/> },
  { id:"Situational",                label:"Situational",               icon:<GitBranch size={13}/> },
  { id:"Competency",                 label:"Competency",                icon:<Target size={13}/> },
  // { id:"Screening",                  label:"Screening",                 icon:<ClipboardCheck size={13}/> },
  // { id:"Portfolio",                  label:"Portfolio",                 icon:<Image size={13}/> },
  // { id:"Presentational",             label:"Presentational",            icon:<Presentation size={13}/> },
  { id:"Stress",                     label:"Stress",                    icon:<AlertTriangle size={13}/> },
];

const DIFFS = [
  { id:"beginner",     label:"Beginner",     color:GRN, bg:GRNL },
  { id:"intermediate", label:"Intermediate", color:AMB, bg:AMBL },
  { id:"advanced",     label:"Advanced",     color:RED, bg:REDL },
];

type FormData = { title:string; category:string; difficulty:string; duration:string; visibility:string; description:string; questions:string[] };

type NormalisedIV = ReturnType<typeof normalise>;

/* ─── INTERVIEW CARD ─────────────────────────────────────── */
type IVCardProps = {
  iv: NormalisedIV;
  onOpen: (id: string) => void;   // view the interview's info/results page
  onStart: (iv: NormalisedIV) => void; // jump straight into starting/retaking it
};

const IVCard = ({ iv, onOpen, onStart }: IVCardProps) => {
  const diff = DIFFS.find(d => d.id === iv.difficulty)!;

  return (
    <div className="iv-card touch-active" onClick={() => onOpen(iv.id)}>
      {/* Header */}
      <Box sx={{ p:2.5, pb:2, borderBottom:`1px solid ${BORDER}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.25}>
          {iv.featured ? (
            <Box sx={{ display:"inline-flex", alignItems:"center", gap:.5, background:`linear-gradient(90deg,${P},${PM})`, borderRadius:100, px:1.25, py:.35 }}>
              <Sparkles size={9} color="#fff"/>
              <Typography sx={{ fontSize:10, fontWeight:700, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>Featured</Typography>
            </Box>
          ) : <Box/>}
          <span className="diff" style={{ background:diff.bg, color:diff.color, marginLeft:"auto" }}>{diff.label}</span>
        </Stack>
        <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.98rem", color:INK, lineHeight:1.25, mb:.75 }}>
          {iv.title}
        </Typography>
        <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.65, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {iv.description}
        </Typography>
      </Box>

      {/* Tags */}
      <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}`, display:"flex", flexWrap:"wrap", gap:.75 }}>
        {(iv.tags ?? []).map(t => <span key={t} className="tag">{t}</span>)}
      </Box>

      {/* Stats */}
      <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Stack direction="row" spacing={1.5}>
            <Stack direction="row" spacing={.5} alignItems="center">
              <BookOpen size={12} color={INK3}/>
              <Typography sx={{ fontSize:12.5, color:INK2 }}>{iv.questions}Q</Typography>
            </Stack>
            <Stack direction="row" spacing={.5} alignItems="center">
              <Clock size={12} color={INK3}/>
              <Typography sx={{ fontSize:12.5, color:INK2 }}>{iv.duration}m</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1.25}>
            <Stack direction="row" spacing={.5} alignItems="center">
              <Users size={12} color={INK3}/>
              <Typography sx={{ fontSize:12.5, color:INK2 }}>{iv.attempts.toLocaleString()}</Typography>
            </Stack>
            <Stack direction="row" spacing={.5} alignItems="center">
              <Star size={12} fill={P} color={P}/>
              <Typography sx={{ fontSize:12.5, fontWeight:600, color:INK }}>{iv.rating}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Creator + CTA */}
      <Box sx={{ px:2.5, py:2, mt:"auto" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <img src={iv.avatar} alt="" style={{ width:22, height:22, borderRadius:"50%", objectFit:"cover" }}/>
            <Typography sx={{ fontSize:12.5, color:INK2 }}>by {iv.createdBy}</Typography>
          </Stack>
          {iv.isPublic ? <Globe size={12} color={INK3}/> : <Lock size={12} color={INK3}/>}
        </Stack>
        <button
          className="start-btn"
          onClick={e => { e.stopPropagation(); onStart(iv); }}
        >
          <Play size={14}/> Start interview
        </button>
      </Box>
    </div>
  );
};

/* ─── CREATE MODAL ───────────────────────────────────────── */
const CreateModal = ({ onClose, onCreate }: { onClose:()=>void; onCreate:(f:FormData, apiResult: APIInterview)=>void }) => {
  const [form, setForm] = useState<FormData>({ title:"", category:"technical", difficulty:"beginner", duration:"30", visibility:"public", description:"", questions:["","",""] });
  const [creating, setCreating] = useState(false);
  const [step, setStep] = useState<1|2>(1);

  const set = (k:keyof FormData) => (e:React.ChangeEvent<any>) => setForm(f => ({ ...f, [k]:e.target.value }));
  const setQ = (i:number, v:string) => setForm(f => { const q=[...f.questions]; q[i]=v; return {...f,questions:q}; });
  const addQ = () => form.questions.length < 12 && setForm(f => ({ ...f, questions:[...f.questions,""] }));
  const remQ = (i:number) => setForm(f => ({ ...f, questions:f.questions.filter((_,j)=>j!==i) }));

  const ok1 = form.title.trim().length > 5 && form.description.trim().length > 10;
  const ok2 = form.questions.filter(q=>q.trim().length>0).length >= 2;

  const [apiError, setApiError] = useState<string | null>(null);

  const submit = async () => {
    if (!ok2) return;
    setCreating(true);
    setApiError(null);
    try {
      const data = await authFetch(CREATE_INTERVIEW_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          title:       form.title.trim(),
          description: form.description.trim(),
          category:    form.category,
          difficulty:  form.difficulty,
          duration:    parseInt(form.duration, 10),
          visibility:  form.visibility,
          questions:   form.questions.filter(q => q.trim().length > 0),
        }),
      });
      onCreate(form, data.result);   // pass raw API result back to parent
    } catch (err: any) {
      setApiError(err?.message ?? "Something went wrong. Please try again.");
      setCreating(false);
    }
  };

  return (
    <div className="modal-ov" onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
      <div className="modal-sheet">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.2rem", md:"1.35rem" }, color:INK, letterSpacing:"-0.015em" }}>
              Create an interview
            </Typography>
            <Typography sx={{ fontSize:13, color:INK2, mt:.2 }}>Step {step} of 2</Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            {[1,2].map(s => <Box key={s} sx={{ width:s<=step?22:7, height:7, borderRadius:100, background:s<=step?P:BORDER, transition:"all .25s" }}/>)}
            <Box onClick={onClose} sx={{ width:30, height:30, borderRadius:"50%", background:OFF, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", ml:.75, "&:hover":{ background:BORDER }, flexShrink:0 }}>
              <X size={14} color={INK2}/>
            </Box>
          </Stack>
        </Stack>

        {/* Step 1 */}
        {step===1 && (
          <Stack spacing={2.5}>
            <div>
              <label className="flabel">Interview title *</label>
              <input className="finput" placeholder="e.g. React Frontend Engineer — Junior Level" value={form.title} onChange={set("title")}/>
            </div>
            <div>
              <label className="flabel">Description *</label>
              <textarea className="finput" placeholder="What will students practice? Who is this for?" value={form.description} onChange={set("description")}/>
            </div>
            <Grid container spacing={1.5}>
              {[
                { k:"category",   label:"Category",  opts:CATEGORIES.filter(c=>c.id!=="all").map(c=>({ v:c.id, l:c.label })) },
                { k:"difficulty", label:"Difficulty", opts:DIFFS.map(d=>({ v:d.id, l:d.label })) },
                { k:"duration",   label:"Duration (min)", opts:null },
                { k:"visibility", label:"Visibility", opts:[{ v:"public", l:"Public — anyone can practice" },{ v:"private", l:"Private — only me" }] },
              ].map(({ k, label, opts }) => (
                <Grid item xs={12} sm={6} key={k}>
                  <label className="flabel">{label}</label>
                  {opts ? (
                    <div style={{ position:"relative" }}>
                      <select className="finput" value={(form as any)[k]} onChange={set(k as any)}>
                        {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                      </select>
                      <ChevronDown size={13} style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", color:INK3, pointerEvents:"none" }}/>
                    </div>
                  ) : (
                    <input className="finput" type="number" min="5" max="120" value={(form as any)[k]} onChange={set(k as any)}/>
                  )}
                </Grid>
              ))}
            </Grid>
            <button className="create-btn" disabled={!ok1} onClick={() => setStep(2)} style={{ opacity:!ok1?.45:1 }}>
              Continue — Add questions <ChevronRight size={16}/>
            </button>
          </Stack>
        )}

        {/* Step 2 */}
        {step===2 && (
          <Stack spacing={2.5}>
            <Box sx={{ background:PL, borderRadius:"12px", p:2, display:"flex", gap:1.25, alignItems:"flex-start" }}>
              <Zap size={14} color={P} style={{ flexShrink:0, marginTop:2 }}/>
              <Typography sx={{ fontSize:13.5, color:P, lineHeight:1.65 }}>
                The AI uses your questions as a guide and adapts follow-ups based on each student's answers.
              </Typography>
            </Box>
            <Stack spacing={1.25}>
              {form.questions.map((q, i) => (
                <div key={i} className="q-item">
                  <div className="q-num">{i+1}</div>
                  <input className="q-input" placeholder={["Tell me about yourself.","What's your biggest challenge?","Describe a project you're proud of."][i%3]} value={q} onChange={e => setQ(i, e.target.value)}/>
                  {form.questions.length > 2 && (
                    <Box onClick={() => remQ(i)} sx={{ color:INK3, cursor:"pointer", "&:hover":{ color:RED }, flexShrink:0 }}>
                      <X size={14}/>
                    </Box>
                  )}
                </div>
              ))}
            </Stack>
            {form.questions.length < 12 && (
              <button onClick={addQ} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 14px", border:`1.5px dashed ${BORDER}`, borderRadius:11, background:"transparent", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:INK2, cursor:"pointer", width:"100%" }}>
                <Plus size={14}/> Add another question
              </button>
            )}
            <Box sx={{ height:1, background:BORDER }}/>
            {apiError && (
              <Box sx={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:"11px", p:1.75, display:"flex", gap:1, alignItems:"flex-start" }}>
                <X size={14} color="#DC2626" style={{ flexShrink:0, marginTop:2 }}/>
                <Typography sx={{ fontSize:13, color:"#991B1B", lineHeight:1.6 }}>{apiError}</Typography>
              </Box>
            )}
            <Stack spacing={1.25}>
              <button className="create-btn" disabled={!ok2||creating} onClick={submit}>
                {creating ? <><div className="spinner"/> Creating...</> : <><Check size={15}/> Publish interview</>}
              </button>
              <button onClick={() => setStep(1)} style={{ padding:"12px", borderRadius:11, border:`1.5px solid ${BORDER}`, background:WHITE, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:INK2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
                Back to details
              </button>
            </Stack>
          </Stack>
        )}
      </div>
    </div>
  );
};

/* ─── SKELETON CARD ──────────────────────────────────────── */
const CardSkeleton = () => (
  <Box sx={{ background:"#FFFFFF", border:`1.5px solid ${BORDER}`, borderRadius:"16px", overflow:"hidden", height:290 }}>
    <Box sx={{ p:2.5, pb:2, borderBottom:`1px solid ${BORDER}` }}>
      <Skeleton variant="text" width="60%" height={22} sx={{ mb:.75 }}/>
      <Skeleton variant="text" width="90%" height={18}/>
      <Skeleton variant="text" width="75%" height={18}/>
    </Box>
    <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}`, display:"flex", gap:.75 }}>
      <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius:100 }}/>
      <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius:100 }}/>
    </Box>
    <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}` }}>
      <Skeleton variant="text" width="80%" height={18}/>
    </Box>
    <Box sx={{ px:2.5, py:2 }}>
      <Skeleton variant="rounded" height={42} sx={{ borderRadius:"10px" }}/>
    </Box>
  </Box>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const AIInterviewHome: React.FC = () => {
  const navigate = useNavigate();

  /* ── filter / UI state ── */
  const [search,  setSearch]  = useState("");
  const [cat,     setCat]     = useState("all");
  const [sort,    setSort]    = useState("popular");
  const [modal,   setModal]   = useState(false);
  const [tab,     setTab]     = useState<"community"|"mine">("community");
  const [success, setSuccess] = useState(false);

  /* ── data state ──
     communityList → every public interview (the Community tab)
     myList        → only the PRIVATE interviews this user created
                      (their public ones already show up in communityList,
                      so we don't duplicate them here)                    */
  const [communityList, setCommunityList] = useState<NormalisedIV[]>([]);
  const [myList,        setMyList]        = useState<NormalisedIV[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [fetchError,    setFetchError]    = useState<string | null>(null);
  const [lastCreated,   setLastCreated]   = useState<NormalisedIV | null>(null);

  /* ── stats (from the interviews list response) ── */
  const [stats, setStats] = useState({ completedSessions: 0, completionRate: 0 });

  /* ── fetch whichever tab is active ──
     One function for both tabs — scope is the only real difference, and
     the backend already applies category/sort/search filtering for both,
     so there's no separate client-side filtering step needed here. */
  const fetchInterviews = useCallback(async (scope: "community" | "mine") => {
    setLoading(true);
    setFetchError(null);
    try {
      const query = buildInterviewsQuery(scope, { cat, sort, search });
      const data = await authFetch(`${INTERVIEWS_ENDPOINT}?${query}`);
      const interviews: NormalisedIV[] = (data.result?.interviews ?? []).map(normalise);

      if (scope === "community") {
        setCommunityList(interviews);
      } else {
        // Server returns everything this user created (public + private);
        // only the private ones belong on this tab.
        setMyList(interviews.filter(iv => !iv.isPublic));
      }
    } catch (err: any) {
      setFetchError(err?.message ?? "Failed to load interviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [cat, sort, search]);

  /* Load the active tab's data on mount, on tab switch, and whenever a
     filter (category/sort/search) changes. */
  useEffect(() => { fetchInterviews(tab); }, [tab, fetchInterviews]);

  const activeList = tab === "mine" ? myList : communityList;
  const featured = communityList.filter(i => i.featured);

  /* ── navigation ──
     onOpen  → view an interview's info/results page
     onStart → jump straight into starting (or retaking) it              */
  const openInterview = (id: string) => navigate(`/mentee/ai-interview/${id}`);
  const startInterview = (iv: NormalisedIV) => navigate("/mentee/ai-practice", {
    state: { interviewId: iv.id, title: iv.title, questions: iv.questionList, duration: iv.duration, category: iv.category },
  });

  /* ── handle successful interview creation ── */
  const handleCreate = (form: FormData, apiResult: APIInterview) => {
    const norm = normalise(apiResult);

    if (norm.isPublic) {
      setCommunityList(prev => [norm, ...prev]);
      setTab("community");
    } else {
      setMyList(prev => [norm, ...prev]);
      setTab("mine");
    }

    setLastCreated(norm);
    setModal(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background: "#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", maxWidth:"100vw" }}>

        {/* ── HERO ─────────────────────────────────────── */}
        <Box sx={{ background:`#FFFFFF`, pt:{ xs:5, md:10 }, pb:{ xs:5, md:9 }, px:{ xs:2, md:6 }, position:"relative", overflow:"hidden" }}>
          {/* <Box className="hero-orb" sx={{ width:{ xs:240, md:380 }, height:{ xs:240, md:380 }, top:-100, right:-80 }}/>
          <Box className="hero-orb" sx={{ width:{ xs:160, md:240 }, height:{ xs:160, md:240 }, bottom:-50, left:"5%", animationDelay:"4s" }}/> */}

          <Box maxWidth="lg" mx="auto" sx={{ position:"relative", zIndex:1 }}>
            {/* Badge */}
            <Box className="fu" mb={2}>
              <Box sx={{ display:"inline-flex", alignItems:"center", gap:.75, background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:100, px:1.75, py:.7, boxShadow:"0 2px 12px rgba(127,66,231,.08)" }}>
                <Brain size={13} color={P}/>
                <Typography sx={{ fontSize:12, fontWeight:500, color:P }}>AI-powered interview practice</Typography>
              </Box>
            </Box>

            {/* Headline + CTA row */}
            <Stack direction={{ xs:"column", md:"row" }} justifyContent="space-between" alignItems={{ xs:"flex-start", md:"flex-end" }} gap={{ xs:2.5, md:0 }}>
              <Box className="fu d1" sx={{ maxWidth:580, minWidth:0 }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"2rem", sm:"2.6rem", md:"3.4rem" }, color:INK, lineHeight:1.04, letterSpacing:"-0.03em", mb:1.5, wordBreak:"break-word" }}>
                  Practice with real<br/>interview questions.
                </Typography>
                <Typography sx={{ fontSize:{ xs:14.5, md:16.5 }, color:INK2, lineHeight:1.75, fontWeight:300, maxWidth:520 }}>
                  Browse interviews created by the community, or build your own. The AI adapts to your answers.
                </Typography>
              </Box>

              <Box className="fu d2" sx={{ flexShrink:0 }}>
                <button
                  onClick={() => setModal(true)}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 22px", borderRadius:100, border:"none", background:P, color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, boxShadow:"0 8px 28px rgba(127,66,231,.3)", transition:"all .2s", whiteSpace:"nowrap" }}
                >
                  <Plus size={16}/> Create interview
                </button>
              </Box>
            </Stack>

            {/* Live stats from backend */}
            <Stack className="fu d3" direction="row" flexWrap="wrap" gap={{ xs:2, md:3 }} mt={4}>
              {[
                { icon:<Users size={13}/>,  val:`${communityList.length}+`,   label:"Interviews" },
                { icon:<Brain size={13}/>,  val:`${stats.completedSessions}+`, label:"Sessions completed" },
                { icon:<Zap size={13}/>,    val:`${stats.completionRate}%`,    label:"Completion rate" },
              ].map(({ icon, val, label }) => (
                <Stack key={label} direction="row" spacing={.8} alignItems="center">
                  <Box sx={{ color:P }}>{icon}</Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:{ xs:13.5, md:15 }, color:INK }}>{val}</Typography>
                  <Typography sx={{ fontSize:{ xs:12.5, md:13.5 }, color:INK2 }}>{label}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* ── CONTENT ──────────────────────────────────── */}
        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} sx={{ overflowX:"hidden" }}>

          {/* Fetch error */}
          {fetchError && (
            <Box sx={{ py:2 }}>
              <Box sx={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:"13px", p:2, display:"flex", alignItems:"center", justifyContent:"space-between", gap:1.5 }}>
                <Typography sx={{ fontSize:13.5, color:"#991B1B" }}>{fetchError}</Typography>
                <button
                  onClick={() => fetchInterviews(tab)}
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, border:"none", background:"#DC2626", color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, flexShrink:0 }}
                >
                  <RefreshCw size={13}/> Retry
                </button>
              </Box>
            </Box>
          )}

          {/* Featured strip */}
          {tab==="community" && !loading && featured.length > 0 && (
            <Box py={{ xs:3, md:4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Sparkles size={15} color={P}/>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:{ xs:"1rem", md:"1.1rem" }, color:INK }}>Featured</Typography>
                </Stack>
              </Stack>
              <Grid container spacing={{ xs:2, md:2.5 }}>
                {featured.map(iv => (
                  <Grid item xs={12} sm={6} key={iv.id}>
                    <div className="feat-card" onClick={() => openInterview(iv.id)}>
                      <Box sx={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,${P}45 0%,transparent 70%)`, pointerEvents:"none" }}/>
                      <Box sx={{ position:"relative", zIndex:1 }}>
                        <Box sx={{ display:"inline-flex", alignItems:"center", gap:.5, background:`${P}28`, border:`1px solid ${P}40`, borderRadius:100, px:1.25, py:.35, mb:1.5 }}>
                          <Sparkles size={9} color={PM}/>
                          <Typography sx={{ fontSize:10.5, fontWeight:700, color:PM, fontFamily:"'DM Sans',sans-serif" }}>Featured</Typography>
                        </Box>
                        <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.05rem", md:"1.15rem" }, color:"#fff", lineHeight:1.2, mb:.75 }}>{iv.title}</Typography>
                        <Typography sx={{ fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.6, mb:2, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{iv.description}</Typography>
                        <Stack direction="row" spacing={1.75} flexWrap="wrap" gap={.75}>
                          {([[<BookOpen size={11}/>,`${iv.questions}Q`],[<Clock size={11}/>,`${iv.duration}m`],[<Users size={11}/>,iv.attempts.toLocaleString()]] as [React.ReactNode,string][]).map(([icon,val],i)=>(
                            <Stack key={i} direction="row" spacing={.5} alignItems="center">
                              <Box sx={{ color:"rgba(255,255,255,.4)" }}>{icon}</Box>
                              <Typography sx={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>{val}</Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                      <button
                        className="start-btn"
                        style={{ position:"relative", zIndex:1 }}
                        onClick={e => { e.stopPropagation(); startInterview(iv); }}
                      >
                        <Play size={14}/> Start now
                      </button>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Success toast */}
          {success && (
            <Box sx={{ background:GRNL, border:`1.5px solid #86EFAC`, borderRadius:"13px", p:2, mb:3, display:"flex", alignItems:"center", gap:1.5 }}>
              <CheckCircle2 size={15} color={GRN}/>
              <Typography sx={{ fontSize:13.5, fontWeight:500, color:"#065F46" }}>
                {lastCreated?.isPublic
                  ? "Interview published to the community! Students can now practice with it."
                  : "Interview saved privately. Only you can see and practice with it."}
              </Typography>
            </Box>
          )}

          {/* Tabs */}
          <Stack direction="row" sx={{ borderBottom:`1px solid ${BORDER}`, mt:1 }}>
            {[
              { key:"community", label:"Community",    count: communityList.length },
              { key:"mine",      label:"My interviews", count: myList.length },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                style={{ padding:"11px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:tab===key?600:400, color:tab===key?P:INK2, borderBottom:`2px solid ${tab===key?P:"transparent"}`, marginBottom:"-1px", display:"flex", alignItems:"center", gap:6, transition:"all .15s", whiteSpace:"nowrap" }}
              >
                {label}
                <Box sx={{ background:tab===key?PL:"#F3F4F6", color:tab===key?P:INK3, fontSize:10.5, fontWeight:700, borderRadius:100, px:.85, minWidth:18, textAlign:"center", fontFamily:"'DM Mono',monospace" }}>
                  {count}
                </Box>
              </button>
            ))}
          </Stack>

          {/* Filter bar */}
          <Box py={2.5}>
            <Stack direction={{ xs:"column", sm:"row" }} spacing={1.5} mb={2}>
              <div className="search-wrap">
                <Search size={15} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:INK3 }}/>
                <input className="search-input" placeholder="Search interviews, topics, skills..." value={search} onChange={e => setSearch(e.target.value)}/>
              </div>
              <Box sx={{ position:"relative", flexShrink:0, width:{ xs:"100%", sm:"auto" } }}>
                <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value)} style={{ width:"100%" }}>
                  <option value="popular">Most popular</option>
                  <option value="rating">Highest rated</option>
                  <option value="newest">Newest first</option>
                  <option value="shortest">Shortest</option>
                </select>
                <ChevronDown size={13} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:INK3, pointerEvents:"none" }}/>
              </Box>
            </Stack>
            <Box sx={{ overflow:"hidden", mx:-2, px:2 }}>
              <div className="cat-scroll">
                {CATEGORIES.map(c => (
                  <button key={c.id} className={`cat-chip${cat===c.id?" active":""}`} onClick={() => setCat(c.id)}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </Box>
          </Box>

          {/* Grid */}
          {loading ? (
            <Grid container spacing={{ xs:2, md:2.5 }} pb={8}>
              {[1,2,3,4,5,6].map(i => (
                <Grid item xs={12} sm={6} md={4} key={i}><CardSkeleton/></Grid>
              ))}
            </Grid>
          ) : activeList.length === 0 ? (
            <Box sx={{ textAlign:"center", py:{ xs:6, md:10 } }}>
              <Box sx={{ width:52, height:52, borderRadius:"50%", background:PL, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
                <Search size={22} color={P}/>
              </Box>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:.75 }}>
                {tab==="mine" ? "No interviews yet" : "No interviews found"}
              </Typography>
              <Typography sx={{ fontSize:13.5, color:INK2, mb:3, lineHeight:1.7 }}>
                {tab==="mine"
                  ? "Create your first interview and share it with the community."
                  : "Try adjusting your search or selecting a different category."}
              </Typography>
              {tab==="mine" && (
                <button onClick={() => setModal(true)} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"12px 22px", borderRadius:100, border:"none", background:P, color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500 }}>
                  <Plus size={15}/> Create interview
                </button>
              )}
            </Box>
          ) : (
            <Grid container spacing={{ xs:2, md:2.5 }} pb={8}>
              {activeList.map(iv => (
                <Grid item xs={12} sm={6} md={4} key={iv.id}>
                  <IVCard iv={iv} onOpen={openInterview} onStart={startInterview}/>
                </Grid>
              ))}
            </Grid>
          )}

        </Box>
      </Box>

      {modal && <CreateModal onClose={() => setModal(false)} onCreate={handleCreate}/>}
    </>
  );
};

export default AIInterviewHome;



























// With Payement



// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, Grid, Stack, Skeleton, Alert } from "@mui/material";
// import {
//   Search, Plus, Brain, Clock, Users, Star, ChevronRight,
//   Sparkles, TrendingUp, BookOpen, Code2, Briefcase,
//   BarChart2, Megaphone, FlaskConical, X, Check, ArrowRight,
//   Play, Globe, Lock, Zap, ChevronDown, CheckCircle2, RefreshCw,
// } from "lucide-react";

// /* ─── PRICING ────────────────────────────────────────────── */
// // Kept as a single source of truth on this screen. The backend is the
// // actual authority — these numbers are for display/confirmation only.
// const PRICING = {
//   CREATE_FEE: 50,   // charged to publish every interview after your first
//   ATTEMPT_FEE: 30,  // charged to attempt someone else's public interview
// };

// /* ─── API ────────────────────────────────────────────────── */
// const API_BASE = "http://localhost:1000/api/v1"

// // (import.meta as any).env?.VITE_API_URL ?? "/api";
// const authFetch = async (path: string, opts: RequestInit = {}) => {
//   const token = localStorage.getItem("token") ?? "";
//   const res = await fetch(`${API_BASE}${path}`, {
//     ...opts,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       ...(opts.headers ?? {}),
//     },
//   });
//   const data = await res.json();
//   if (!res.ok || !data.success) throw new Error(data.message ?? `Request failed ${res.status}`);
//   return data;
// };

// /* ─── API INTERVIEW TYPE (matches Mongoose document) ─────── */
// interface APIInterview {
//   _id:        string;
//   createdBy:  string | { name?: string; surname?: string; avatar?: string };
//   title:      string;
//   description:string;
//   category:   string;
//   difficulty: string;
//   duration:   number;         // minutes (Number in schema)
//   isPublic:   boolean;
//   questions:  string[];       // string[] in schema
//   attempts:   number;
//   rating:     number;
//   featured:   boolean;
//   tags:       string[];
//   createdAt:  string;
//   creationFee?:     number;   // 0 if this was the creator's free first interview
//   creationFeePaid?: boolean;
// }

// /* Normalise API document → shape IVCard + featured strip expect.
//    All optional chaining + fallbacks prevent "cannot read properties
//    of undefined" when any field is missing from the DB document.    */
// const normalise = (iv: APIInterview) => ({
//   id:           iv._id ?? "",
//   title:        iv.title ?? "Untitled",
//   category:     iv.category ?? "technical",
//   difficulty:   iv.difficulty ?? "beginner",
//   questions:    Array.isArray(iv.questions) ? iv.questions.length : 0,   // ← guarded
//   duration:     iv.duration ?? 30,
//   attempts:     iv.attempts ?? 0,
//   rating:       iv.rating   ?? 0,
//   createdBy:    typeof iv.createdBy === "object" && iv.createdBy !== null
//     ? `${(iv.createdBy as any).name ?? ""} ${(iv.createdBy as any).surname ?? ""}`.trim() || "Community"
//     : "Community",
//   avatar: typeof iv.createdBy === "object" && iv.createdBy !== null && (iv.createdBy as any).avatar
//     ? (iv.createdBy as any).avatar
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(
//         typeof iv.createdBy === "object" && iv.createdBy !== null
//           ? ((iv.createdBy as any).name ?? "U")
//           : "U"
//       )}&background=7F42E7&color=fff`,
//   tags:         Array.isArray(iv.tags) ? iv.tags : [],                   // ← guarded
//   description:  iv.description ?? "",
//   isPublic:     iv.isPublic ?? true,
//   featured:     iv.featured  ?? false,
//   questionList: Array.isArray(iv.questions) ? iv.questions : [],         // ← guarded
// });

// /* ─── TOKENS ─────────────────────────────────────────────── */
// const P      = "#7F42E7";
// const PD     = "#5E2EC5";
// const PM     = "#B893F6";
// const PL     = "#F0EAFD";
// const INK    = "#0D0D12";
// const INK2   = "#4A4A5A";
// const INK3   = "#8A8AA0";
// const BORDER = "#E8E3F5";
// const OFF    = "#F7F6FC";
// const WHITE  = "#FFFFFF";
// const GRN    = "#059669";
// const GRNL   = "#ECFDF5";
// const AMB    = "#D97706";
// const AMBL   = "#FFFBEB";
// const RED    = "#DC2626";
// const REDL   = "#FEF2F2";

// /* ─── CSS ────────────────────────────────────────────────── */
// const css = `
  
//   /* Reset horizontal overflow */
//   *, *::before, *::after { box-sizing: border-box; }
//   html, body { overflow-x: hidden; max-width: 100vw; }

//   @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }
//   @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
//   @keyframes pulse   { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:.85;transform:scale(1.06)} }
//   @keyframes slideUp { from{opacity:0;transform:translateY(80px)} to{opacity:1;transform:translateY(0)} }

//   .fu { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
//   .d1{animation-delay:.06s} .d2{animation-delay:.12s} .d3{animation-delay:.18s} .d4{animation-delay:.24s}

//   /* ── Interview card ── */
//   .iv-card {
//     background:${WHITE}; border:1.5px solid ${BORDER};
//     border-radius:16px; overflow:hidden;
//     display:flex; flex-direction:column; height:100%;
//     transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s, border-color .25s;
//   }
//   .iv-card:hover {
//     transform:translateY(-4px);
//     box-shadow:0 18px 44px rgba(127,66,231,.12);
//     border-color:${PM};
//   }

//   /* ── Start btn ── */
//   .start-btn {
//     width:100%; padding:12px; border:none; border-radius:10px;
//     cursor:pointer; font-family:'DM Sans',sans-serif;
//     font-size:14px; font-weight:600;
//     display:flex; align-items:center; justify-content:center; gap:7px;
//     background:${P}; color:#fff;
//     transition:all .2s cubic-bezier(.34,1.56,.64,1);
//     box-shadow:0 4px 14px rgba(127,66,231,.22);
//     position:relative; overflow:hidden;
//   }
//   .start-btn::before {
//     content:''; position:absolute; inset:0;
//     background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
//     background-size:300% auto; animation:shimmer 2s linear infinite;
//   }
//   .start-btn:hover { background:${PD}; transform:translateY(-2px); box-shadow:0 10px 28px rgba(127,66,231,.38); }

//   /* ── AI-generate btn ── */
//   .ai-gen-btn {
//     display:flex; align-items:center; justify-content:center; gap:8px;
//     width:100%; padding:11px 14px; border-radius:11px;
//     border:1.5px dashed ${PM}; background:${PL};
//     font-family:'DM Sans',sans-serif; font-size:13.5px; font-weight:600;
//     color:${P}; cursor:pointer; transition:all .18s;
//   }
//   .ai-gen-btn:hover:not(:disabled) { background:${WHITE}; border-color:${P}; }
//   .ai-gen-btn:disabled { opacity:.6; cursor:not-allowed; }

//   /* ── Search input ── */
//   .search-wrap { position:relative; width:100%; }
//   .search-input {
//     width:100%; padding:12px 16px 12px 42px;
//     border:1.5px solid ${BORDER}; border-radius:12px;
//     font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
//     background:${WHITE}; outline:none;
//     transition:border-color .18s, box-shadow .18s;
//     -webkit-appearance:none;
//   }
//   .search-input:focus { border-color:${P}; box-shadow:0 0 0 3px rgba(127,66,231,.1); }
//   .search-input::placeholder { color:${INK3}; }

//   /* ── Category chips — horizontal scroll, no wrap, no clip ── */
//   .cat-scroll {
//     display:flex; gap:8px;
//     overflow-x:auto; overflow-y:visible;
//     -webkit-overflow-scrolling:touch;
//     scrollbar-width:none;
//     padding-bottom:4px;
//     /* prevent clipping the active box-shadow */
//     padding-top:4px; margin-top:-4px;
//   }
//   .cat-scroll::-webkit-scrollbar { display:none; }

//   .cat-chip {
//     display:inline-flex; align-items:center; gap:5px;
//     padding:8px 14px; border-radius:100px;
//     border:1.5px solid ${BORDER}; background:${WHITE};
//     font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
//     color:${INK2}; cursor:pointer; white-space:nowrap; flex-shrink:0;
//     transition:all .18s cubic-bezier(.34,1.56,.64,1);
//     -webkit-tap-highlight-color:transparent;
//   }
//   .cat-chip:hover:not(.active) { border-color:${PM}; color:${P}; }
//   .cat-chip.active {
//     border-color:${P}; background:${PL}; color:${P}; font-weight:600;
//     box-shadow:0 0 0 3px rgba(127,66,231,.1);
//   }

//   /* ── Difficulty badge ── */
//   .diff { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:100px; font-family:'DM Mono',monospace; font-size:11px; font-weight:500; }

//   /* ── Price badge ── */
//   .price-badge { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:100px; font-family:'DM Mono',monospace; font-size:11px; font-weight:600; background:${AMBL}; color:${AMB}; }

//   /* ── Sort select ── */
//   .sort-sel {
//     padding:10px 34px 10px 13px; border:1.5px solid ${BORDER};
//     border-radius:10px; background:${WHITE};
//     font-family:'DM Sans',sans-serif; font-size:13.5px; color:${INK};
//     outline:none; cursor:pointer; appearance:none; -webkit-appearance:none;
//     min-width:0; width:100%;
//   }
//   .sort-sel:focus { border-color:${P}; }

//   /* ── Modal ── */
//   .modal-ov {
//     position:fixed; inset:0; z-index:2000;
//     background:rgba(0,0,0,.58); backdrop-filter:blur(6px);
//     display:flex; align-items:flex-end; justify-content:center;
//     padding:0;
//   }
//   .modal-sheet {
//     width:100%; max-width:660px; max-height:93vh;
//     background:${WHITE}; border-radius:22px 22px 0 0;
//     overflow-y:auto; -webkit-overflow-scrolling:touch;
//     padding:24px 20px 40px;
//     animation:slideUp .38s cubic-bezier(.22,1,.36,1) both;
//   }
//   @media(min-width:640px){
//     .modal-ov { align-items:center; padding:16px; }
//     .modal-sheet { border-radius:22px; max-height:90vh; padding:32px; }
//   }

//   /* ── Form fields ── */
//   .flabel {
//     font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
//     color:${INK2}; text-transform:uppercase; letter-spacing:0.09em;
//     display:block; margin-bottom:7px;
//   }
//   .finput {
//     width:100%; padding:12px 14px;
//     border:1.5px solid ${BORDER}; border-radius:11px;
//     font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
//     background:${WHITE}; outline:none; -webkit-appearance:none;
//     transition:border-color .18s, box-shadow .18s;
//   }
//   .finput:focus { border-color:${P}; box-shadow:0 0 0 3px rgba(127,66,231,.1); }
//   .finput::placeholder { color:${INK3}; }
//   select.finput { appearance:none; -webkit-appearance:none; cursor:pointer; }
//   textarea.finput { min-height:80px; resize:vertical; }

//   /* ── Q items ── */
//   .q-item {
//     display:flex; align-items:center; gap:10px;
//     padding:11px 13px; border:1.5px solid ${BORDER};
//     border-radius:11px; background:${OFF};
//     transition:border-color .15s;
//   }
//   .q-item:focus-within { border-color:${PM}; background:${WHITE}; }
//   .q-input { flex:1; background:transparent; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:14px; color:${INK}; min-width:0; }
//   .q-input::placeholder { color:${INK3}; }
//   .q-num {
//     width:24px; height:24px; border-radius:50%;
//     background:${PL}; color:${P}; flex-shrink:0;
//     display:flex; align-items:center; justify-content:center;
//     font-family:'DM Mono',monospace; font-size:11px; font-weight:700;
//   }

//   /* ── Create/Submit btn ── */
//   .create-btn {
//     width:100%; padding:14px; border:none; border-radius:13px;
//     font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
//     background:${P}; color:#fff; cursor:pointer;
//     display:flex; align-items:center; justify-content:center; gap:8px;
//     transition:all .2s; box-shadow:0 8px 28px rgba(127,66,231,.3);
//     -webkit-tap-highlight-color:transparent;
//   }
//   .create-btn:hover { background:${PD}; transform:translateY(-2px); }
//   .create-btn:disabled { opacity:.45; cursor:not-allowed; transform:none; }

//   /* ── Spinner ── */
//   .spinner { width:17px; height:17px; border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }
//   .spinner-p { width:15px; height:15px; border:2.5px solid rgba(127,66,231,.25); border-top-color:${P}; border-radius:50%; animation:spin .7s linear infinite; }

//   /* ── Hero orb ── */
//   .hero-orb {
//     position:absolute; border-radius:50%;
//     background:radial-gradient(circle,${P}28 0%,transparent 70%);
//     pointer-events:none; animation:pulse 9s ease-in-out infinite;
//   }

//   /* ── Featured dark card ── */
//   .feat-card {
//     background:linear-gradient(135deg,${INK} 0%,#1C1030 100%);
//     border-radius:16px; padding:24px;
//     display:flex; flex-direction:column; gap:16px;
//     position:relative; overflow:hidden; cursor:pointer;
//     transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
//     height:100%;
//   }
//   .feat-card:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(0,0,0,.28); }

//   /* ── Tag pill ── */
//   .tag { background:${OFF}; border-radius:100px; padding:3px 10px; font-size:11.5px; font-family:'DM Mono',monospace; color:${INK2}; display:inline-block; }

//   /* Touch feedback */
//   .touch-active:active { opacity:.75; }
// `;

// /* ─── DATA ───────────────────────────────────────────────── */
// const CATEGORIES = [
//   { id:"all",         label:"All",           icon:<Globe size={13}/> },
//   { id:"technical",   label:"Technical",     icon:<Code2 size={13}/> },
//   { id:"behavioural", label:"Behavioural",   icon:<Brain size={13}/> },
//   { id:"product",     label:"Product",       icon:<Briefcase size={13}/> },
//   { id:"data",        label:"Data",          icon:<BarChart2 size={13}/> },
//   { id:"marketing",   label:"Marketing",     icon:<Megaphone size={13}/> },
//   { id:"finance",     label:"Finance",       icon:<TrendingUp size={13}/> },
//   { id:"science",     label:"Science",       icon:<FlaskConical size={13}/> },
// ];

// const DIFFS = [
//   { id:"beginner",     label:"Beginner",     color:GRN, bg:GRNL },
//   { id:"intermediate", label:"Intermediate", color:AMB, bg:AMBL },
//   { id:"advanced",     label:"Advanced",     color:RED, bg:REDL },
// ];

// type FormData = { title:string; category:string; difficulty:string; duration:string; visibility:string; description:string; questions:string[] };

// type NormalisedIV = ReturnType<typeof normalise>;

// /* ─── INTERVIEW CARD ─────────────────────────────────────── */
// const IVCard = ({ iv, isOwner }: { iv: NormalisedIV; isOwner: boolean }) => {
//   const navigate = useNavigate();
//   const diff = DIFFS.find(d => d.id === iv.difficulty)!;
//   // Only community interviews you didn't create carry the attempt fee —
//   // your own creations (and any retake logic) are handled server-side,
//   // this is just what we show/confirm on the button.
//   const isPaidAttempt = !isOwner && iv.isPublic;

//   const startInterview = () => {
//     if (isPaidAttempt) {
//       const confirmed = window.confirm(
//         `This interview was created by someone in the community. Starting it costs $${PRICING.ATTEMPT_FEE}. Continue?`
//       );
//       if (!confirmed) return;
//     }
//     navigate(`/mentee/ai-interview/${iv.id}`, { state:{ interviewId:iv.id, title:iv.title, questions:iv.questionList, duration:iv.duration, category:iv.category } });
//   };

//   return (
//     <div className="iv-card touch-active">
//       {/* Header */}
//       <Box sx={{ p:2.5, pb:2, borderBottom:`1px solid ${BORDER}` }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.25}>
//           {iv.featured ? (
//             <Box sx={{ display:"inline-flex", alignItems:"center", gap:.5, background:`linear-gradient(90deg,${P},${PM})`, borderRadius:100, px:1.25, py:.35 }}>
//               <Sparkles size={9} color="#fff"/>
//               <Typography sx={{ fontSize:10, fontWeight:700, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>Featured</Typography>
//             </Box>
//           ) : <Box/>}
//           <Stack direction="row" spacing={.6} sx={{ marginLeft:"auto" }}>
//             {isPaidAttempt && <span className="price-badge">${PRICING.ATTEMPT_FEE}</span>}
//             <span className="diff" style={{ background:diff.bg, color:diff.color }}>{diff.label}</span>
//           </Stack>
//         </Stack>
//         <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.98rem", color:INK, lineHeight:1.25, mb:.75 }}>
//           {iv.title}
//         </Typography>
//         <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.65, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
//           {iv.description}
//         </Typography>
//       </Box>

//       {/* Tags */}
//       <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}`, display:"flex", flexWrap:"wrap", gap:.75 }}>
//         {(iv.tags ?? []).map(t => <span key={t} className="tag">{t}</span>)}
//       </Box>

//       {/* Stats */}
//       <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}` }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
//           <Stack direction="row" spacing={1.5}>
//             <Stack direction="row" spacing={.5} alignItems="center">
//               <BookOpen size={12} color={INK3}/>
//               <Typography sx={{ fontSize:12.5, color:INK2 }}>{iv.questions}Q</Typography>
//             </Stack>
//             <Stack direction="row" spacing={.5} alignItems="center">
//               <Clock size={12} color={INK3}/>
//               <Typography sx={{ fontSize:12.5, color:INK2 }}>{iv.duration}m</Typography>
//             </Stack>
//           </Stack>
//           <Stack direction="row" spacing={1.25}>
//             <Stack direction="row" spacing={.5} alignItems="center">
//               <Users size={12} color={INK3}/>
//               <Typography sx={{ fontSize:12.5, color:INK2 }}>{iv.attempts.toLocaleString()}</Typography>
//             </Stack>
//             <Stack direction="row" spacing={.5} alignItems="center">
//               <Star size={12} fill={P} color={P}/>
//               <Typography sx={{ fontSize:12.5, fontWeight:600, color:INK }}>{iv.rating}</Typography>
//             </Stack>
//           </Stack>
//         </Stack>
//       </Box>

//       {/* Creator + CTA */}
//       <Box sx={{ px:2.5, py:2, mt:"auto" }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <img src={iv.avatar} alt="" style={{ width:22, height:22, borderRadius:"50%", objectFit:"cover" }}/>
//             <Typography sx={{ fontSize:12.5, color:INK2 }}>by {iv.createdBy}</Typography>
//           </Stack>
//           {iv.isPublic ? <Globe size={12} color={INK3}/> : <Lock size={12} color={INK3}/>}
//         </Stack>
//         <button className="start-btn" onClick={startInterview}>
//           <Play size={14}/> {isOwner ? "Start interview" : isPaidAttempt ? `Start — $${PRICING.ATTEMPT_FEE}` : "Retake"}
//         </button>
//       </Box>
//     </div>
//   );
// };

// /* ─── CREATE MODAL ───────────────────────────────────────── */
// const CreateModal = ({ onClose, onCreate, isFirstInterview }: { onClose:()=>void; onCreate:(f:FormData, apiResult: APIInterview)=>void; isFirstInterview: boolean }) => {
//   const [form, setForm] = useState<FormData>({ title:"", category:"technical", difficulty:"beginner", duration:"30", visibility:"public", description:"", questions:["","",""] });
//   const [creating, setCreating] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [step, setStep] = useState<1|2>(1);

//   const set = (k:keyof FormData) => (e:React.ChangeEvent<any>) => setForm(f => ({ ...f, [k]:e.target.value }));
//   const setQ = (i:number, v:string) => setForm(f => { const q=[...f.questions]; q[i]=v; return {...f,questions:q}; });
//   const addQ = () => form.questions.length < 12 && setForm(f => ({ ...f, questions:[...f.questions,""] }));
//   const remQ = (i:number) => setForm(f => ({ ...f, questions:f.questions.filter((_,j)=>j!==i) }));

//   const ok1 = form.title.trim().length > 5 && form.description.trim().length > 10;
//   const ok2 = form.questions.filter(q=>q.trim().length>0).length >= 2;

//   const [apiError, setApiError] = useState<string | null>(null);

//   // Questions are generated by a third-party AI model server-side — this
//   // just sends the brief and drops the result into the editable list
//   // below, so the user can still tweak anything the model produced.
//   const generateQuestions = async () => {
//     setGenerating(true);
//     setApiError(null);
//     try {
//       const data = await authFetch("/mentee/ai-home/generate-questions", {
//         method: "POST",
//         body: JSON.stringify({
//           title:       form.title.trim(),
//           description: form.description.trim(),
//           category:    form.category,
//           difficulty:  form.difficulty,
//         }),
//       });
//       const generated: string[] = data.result?.questions ?? [];
//       if (generated.length) {
//         setForm(f => ({ ...f, questions: generated.slice(0, 12) }));
//       } else {
//         setApiError("The AI didn't return any questions — try writing your own below.");
//       }
//     } catch (err: any) {
//       setApiError(err?.message ?? "Couldn't generate questions. Try writing your own below.");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const submit = async () => {
//     if (!ok2) return;
//     setCreating(true);
//     setApiError(null);
//     try {
//       const data = await authFetch("/mentee/interviews", {
//         method: "POST",
//         body: JSON.stringify({
//           title:       form.title.trim(),
//           description: form.description.trim(),
//           category:    form.category,
//           difficulty:  form.difficulty,
//           duration:    parseInt(form.duration, 10),
//           visibility:  form.visibility,
//           questions:   form.questions.filter(q => q.trim().length > 0),
//         }),
//       });
//       onCreate(form, data.result);   // pass raw API result back to parent
//     } catch (err: any) {
//       setApiError(err?.message ?? "Something went wrong. Please try again.");
//       setCreating(false);
//     }
//   };

//   return (
//     <div className="modal-ov" onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
//       <div className="modal-sheet">
//         {/* Header */}
//         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//           <Box>
//             <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.2rem", md:"1.35rem" }, color:INK, letterSpacing:"-0.015em" }}>
//               Create an interview
//             </Typography>
//             <Typography sx={{ fontSize:13, color:INK2, mt:.2 }}>Step {step} of 2</Typography>
//           </Box>
//           <Stack direction="row" spacing={1} alignItems="center">
//             {[1,2].map(s => <Box key={s} sx={{ width:s<=step?22:7, height:7, borderRadius:100, background:s<=step?P:BORDER, transition:"all .25s" }}/>)}
//             <Box onClick={onClose} sx={{ width:30, height:30, borderRadius:"50%", background:OFF, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", ml:.75, "&:hover":{ background:BORDER }, flexShrink:0 }}>
//               <X size={14} color={INK2}/>
//             </Box>
//           </Stack>
//         </Stack>

//         {/* Fee banner */}
//         <Box sx={{ background: isFirstInterview ? GRNL : AMBL, border:`1.5px solid ${isFirstInterview ? "#86EFAC" : "#FDE68A"}`, borderRadius:"12px", p:1.75, mb:2.5, display:"flex", gap:1.25, alignItems:"flex-start" }}>
//           {isFirstInterview
//             ? <Sparkles size={14} color={GRN} style={{ flexShrink:0, marginTop:2 }}/>
//             : <Zap size={14} color={AMB} style={{ flexShrink:0, marginTop:2 }}/>}
//           <Typography sx={{ fontSize:13, color: isFirstInterview ? "#065F46" : "#92400E", lineHeight:1.6 }}>
//             {isFirstInterview
//               ? "Your first AI interview is free to publish."
//               : `Publishing this interview costs $${PRICING.CREATE_FEE} — your free interview has already been used.`}
//           </Typography>
//         </Box>

//         {/* Step 1 */}
//         {step===1 && (
//           <Stack spacing={2.5}>
//             <div>
//               <label className="flabel">Interview title *</label>
//               <input className="finput" placeholder="e.g. React Frontend Engineer — Junior Level" value={form.title} onChange={set("title")}/>
//             </div>
//             <div>
//               <label className="flabel">Description *</label>
//               <textarea className="finput" placeholder="What will students practice? Who is this for?" value={form.description} onChange={set("description")}/>
//             </div>
//             <Grid container spacing={1.5}>
//               {[
//                 { k:"category",   label:"Category",  opts:CATEGORIES.filter(c=>c.id!=="all").map(c=>({ v:c.id, l:c.label })) },
//                 { k:"difficulty", label:"Difficulty", opts:DIFFS.map(d=>({ v:d.id, l:d.label })) },
//                 { k:"duration",   label:"Duration (min)", opts:null },
//                 { k:"visibility", label:"Visibility", opts:[{ v:"public", l:"Public — anyone can practice" },{ v:"private", l:"Private — only me" }] },
//               ].map(({ k, label, opts }) => (
//                 <Grid item xs={12} sm={6} key={k}>
//                   <label className="flabel">{label}</label>
//                   {opts ? (
//                     <div style={{ position:"relative" }}>
//                       <select className="finput" value={(form as any)[k]} onChange={set(k as any)}>
//                         {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
//                       </select>
//                       <ChevronDown size={13} style={{ position:"absolute", right:11, top:"50%", transform:"translateY(-50%)", color:INK3, pointerEvents:"none" }}/>
//                     </div>
//                   ) : (
//                     <input className="finput" type="number" min="5" max="120" value={(form as any)[k]} onChange={set(k as any)}/>
//                   )}
//                 </Grid>
//               ))}
//             </Grid>
//             <button className="create-btn" disabled={!ok1} onClick={() => setStep(2)} style={{ opacity:!ok1?.45:1 }}>
//               Continue — Add questions <ChevronRight size={16}/>
//             </button>
//           </Stack>
//         )}

//         {/* Step 2 */}
//         {step===2 && (
//           <Stack spacing={2.5}>
//             <Box sx={{ background:PL, borderRadius:"12px", p:2, display:"flex", gap:1.25, alignItems:"flex-start" }}>
//               <Zap size={14} color={P} style={{ flexShrink:0, marginTop:2 }}/>
//               <Typography sx={{ fontSize:13.5, color:P, lineHeight:1.65 }}>
//                 The AI uses your questions as a guide and adapts follow-ups based on each student's answers.
//               </Typography>
//             </Box>

//             <button className="ai-gen-btn" onClick={generateQuestions} disabled={generating}>
//               {generating ? <><div className="spinner-p"/> Generating questions...</> : <><Sparkles size={14}/> Generate questions with AI</>}
//             </button>

//             <Stack spacing={1.25}>
//               {form.questions.map((q, i) => (
//                 <div key={i} className="q-item">
//                   <div className="q-num">{i+1}</div>
//                   <input className="q-input" placeholder={["Tell me about yourself.","What's your biggest challenge?","Describe a project you're proud of."][i%3]} value={q} onChange={e => setQ(i, e.target.value)}/>
//                   {form.questions.length > 2 && (
//                     <Box onClick={() => remQ(i)} sx={{ color:INK3, cursor:"pointer", "&:hover":{ color:RED }, flexShrink:0 }}>
//                       <X size={14}/>
//                     </Box>
//                   )}
//                 </div>
//               ))}
//             </Stack>
//             {form.questions.length < 12 && (
//               <button onClick={addQ} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 14px", border:`1.5px dashed ${BORDER}`, borderRadius:11, background:"transparent", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:INK2, cursor:"pointer", width:"100%" }}>
//                 <Plus size={14}/> Add another question
//               </button>
//             )}
//             <Box sx={{ height:1, background:BORDER }}/>
//             {apiError && (
//               <Box sx={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:"11px", p:1.75, display:"flex", gap:1, alignItems:"flex-start" }}>
//                 <X size={14} color="#DC2626" style={{ flexShrink:0, marginTop:2 }}/>
//                 <Typography sx={{ fontSize:13, color:"#991B1B", lineHeight:1.6 }}>{apiError}</Typography>
//               </Box>
//             )}
//             <Stack spacing={1.25}>
//               <button className="create-btn" disabled={!ok2||creating} onClick={submit}>
//                 {creating ? <><div className="spinner"/> Creating...</> : <><Check size={15}/> {isFirstInterview ? "Publish interview — free" : `Publish interview — $${PRICING.CREATE_FEE}`}</>}
//               </button>
//               <button onClick={() => setStep(1)} style={{ padding:"12px", borderRadius:11, border:`1.5px solid ${BORDER}`, background:WHITE, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:INK2, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
//                 Back to details
//               </button>
//             </Stack>
//           </Stack>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ─── SKELETON CARD ──────────────────────────────────────── */
// const CardSkeleton = () => (
//   <Box sx={{ background:"#FFFFFF", border:`1.5px solid ${BORDER}`, borderRadius:"16px", overflow:"hidden", height:290 }}>
//     <Box sx={{ p:2.5, pb:2, borderBottom:`1px solid ${BORDER}` }}>
//       <Skeleton variant="text" width="60%" height={22} sx={{ mb:.75 }}/>
//       <Skeleton variant="text" width="90%" height={18}/>
//       <Skeleton variant="text" width="75%" height={18}/>
//     </Box>
//     <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}`, display:"flex", gap:.75 }}>
//       <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius:100 }}/>
//       <Skeleton variant="rounded" width={52} height={22} sx={{ borderRadius:100 }}/>
//     </Box>
//     <Box sx={{ px:2.5, py:1.5, borderBottom:`1px solid ${BORDER}` }}>
//       <Skeleton variant="text" width="80%" height={18}/>
//     </Box>
//     <Box sx={{ px:2.5, py:2 }}>
//       <Skeleton variant="rounded" height={42} sx={{ borderRadius:"10px" }}/>
//     </Box>
//   </Box>
// );

// /* ─── MAIN COMPONENT ─────────────────────────────────────── */
// const AIInterviewHome: React.FC = () => {
//   const navigate = useNavigate();

//   /* ── filter / UI state ── */
//   const [search,  setSearch]  = useState("");
//   const [cat,     setCat]     = useState("all");
//   const [sort,    setSort]    = useState("popular");
//   const [modal,   setModal]   = useState(false);
//   const [tab,     setTab]     = useState<"community"|"mine">("community");
//   const [success, setSuccess] = useState(false);

//   /* ── data state ── */
//   const [communityList, setCommunityList] = useState<NormalisedIV[]>([]);
//   const [myList,        setMyList]        = useState<NormalisedIV[]>([]);
//   const [loading,       setLoading]       = useState(true);
//   const [loadingMine,   setLoadingMine]   = useState(false);
//   const [fetchError,    setFetchError]    = useState<string | null>(null);

//   /* ── stats (from ai-home) ── */
//   const [stats, setStats] = useState({ totalSessions: 0, completedSessions: 0, completionRate: 0 });

//   /* ── fetch community interviews ── */
//   const fetchCommunity = useCallback(async () => {
//     setLoading(true);
//     setFetchError(null);
//     try {
//       const params = new URLSearchParams({ sort });
//       if (cat !== "all")  params.set("category", cat);
//       if (search.trim())  params.set("search", search.trim());

//       const data = await authFetch(`/mentee/community-interviews?${params.toString()}`);
//       setCommunityList((data.result?.interviews ?? []).map(normalise));
//       setStats(prev => ({
//         ...prev,
//         totalSessions: data.result?.stats?.totalCommunityInterviews ?? prev.totalSessions,
//       }));
//     } catch (err: any) {
//       setFetchError(err?.message ?? "Failed to load interviews. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [cat, sort, search]);

//   /* ── fetch "my interviews" (both public + private the user created) ── */
//   const fetchMine = useCallback(async () => {
//     setLoadingMine(true);
//     try {
//       const params = new URLSearchParams({ sort });
//       if (cat !== "all")  params.set("category", cat);
//       if (search.trim())  params.set("search", search.trim());

//       const data = await authFetch(`/mentee/my-interviews?${params.toString()}`);
//       setMyList((data.result?.interviews ?? []).map(normalise));
//       console.log(data.result)
     
//     } catch { /* non-critical — show empty state */ }
//     finally { setLoadingMine(false); }
//   }, [sort, cat, search]);  

//   /* load community on mount + whenever filters change */
//   useEffect(() => { fetchCommunity(); }, [fetchCommunity]);

//   /* load mine on mount too (not just when the tab is opened) — we need it
//      to know whether a community card belongs to the current user (for
//      pricing) and whether this would be their free first interview */
//   useEffect(() => { fetchMine(); }, [fetchMine]);

//   /* ── derived list (client-side filter for instant feedback) ── */
//   const activeList = tab === "mine" ? myList : communityList;

//   const myInterviewIds = useMemo(() => new Set(myList.map(i => i.id)), [myList]);

//   const filtered = useMemo(() => {
//     // The backend already filters by cat/sort/search for community tab.
//     // For "mine" we filter client-side since the list is small.
//     let list = tab === "mine" ? [...myList] : [...communityList];
//     if (tab === "mine") {
//       if (cat !== "all") list = list.filter(i => i.category === cat);
//       if (search.trim()) list = list.filter(i =>
//         i.title.toLowerCase().includes(search.toLowerCase()) ||
//         i.description.toLowerCase().includes(search.toLowerCase()) ||
//         i.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
//       );
//       if (sort === "popular")  list.sort((a, b) => b.attempts - a.attempts);
//       if (sort === "rating")   list.sort((a, b) => b.rating - a.rating);
//       if (sort === "newest")   list.reverse();
//       if (sort === "shortest") list.sort((a, b) => a.duration - b.duration);
//     }
//     return list;
//   }, [search, cat, sort, tab, communityList, myList]);

//   const featured = communityList.filter(i => i.featured);

//   /* ── handle successful interview creation ── */
//   const handleCreate = (form: FormData, apiResult: APIInterview) => {
//     const norm = normalise(apiResult);

//     // Always add to myList — user created it regardless of visibility
//     setMyList(prev => [norm, ...prev]);

//     // Only add to communityList if the user chose public visibility
//     if (apiResult.isPublic) {
//       setCommunityList(prev => [norm, ...prev]);
//     }

//     setModal(false);
//     setTab("mine");   // switch to "My interviews" tab so user sees their new interview
//     setSuccess(true);
//     setTimeout(() => setSuccess(false), 4000);
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background: "#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", maxWidth:"100vw" }}>

//         {/* ── HERO ─────────────────────────────────────── */}
//         <Box sx={{ background:`#FFFFFF`, pt:{ xs:5, md:10 }, pb:{ xs:5, md:9 }, px:{ xs:2, md:6 }, position:"relative", overflow:"hidden" }}>
//           <Box className="hero-orb" sx={{ width:{ xs:240, md:380 }, height:{ xs:240, md:380 }, top:-100, right:-80 }}/>
//           <Box className="hero-orb" sx={{ width:{ xs:160, md:240 }, height:{ xs:160, md:240 }, bottom:-50, left:"5%", animationDelay:"4s" }}/>

//           <Box maxWidth="lg" mx="auto" sx={{ position:"relative", zIndex:1 }}>
//             {/* Badge */}
//             <Box className="fu" mb={2}>
//               <Box sx={{ display:"inline-flex", alignItems:"center", gap:.75, background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:100, px:1.75, py:.7, boxShadow:"0 2px 12px rgba(127,66,231,.08)" }}>
//                 <Brain size={13} color={P}/>
//                 <Typography sx={{ fontSize:12, fontWeight:500, color:P }}>AI-powered interview practice</Typography>
//               </Box>
//             </Box>

//             {/* Headline + CTA row */}
//             <Stack direction={{ xs:"column", md:"row" }} justifyContent="space-between" alignItems={{ xs:"flex-start", md:"flex-end" }} gap={{ xs:2.5, md:0 }}>
//               <Box className="fu d1" sx={{ maxWidth:580, minWidth:0 }}>
//                 <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"2rem", sm:"2.6rem", md:"3.4rem" }, color:INK, lineHeight:1.04, letterSpacing:"-0.03em", mb:1.5, wordBreak:"break-word" }}>
//                   Practice with real<br/>interview questions.
//                 </Typography>
//                 <Typography sx={{ fontSize:{ xs:14.5, md:16.5 }, color:INK2, lineHeight:1.75, fontWeight:300, maxWidth:520 }}>
//                   Browse interviews created by the community, or build your own. The AI adapts to your answers.
//                 </Typography>
//               </Box>

//               <Box className="fu d2" sx={{ flexShrink:0 }}>
//                 <button
//                   onClick={() => setModal(true)}
//                   style={{ display:"flex", alignItems:"center", gap:8, padding:"13px 22px", borderRadius:100, border:"none", background:P, color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, boxShadow:"0 8px 28px rgba(127,66,231,.3)", transition:"all .2s", whiteSpace:"nowrap" }}
//                 >
//                   <Plus size={16}/> Create interview
//                 </button>
//               </Box>
//             </Stack>

//             {/* Live stats from backend */}
//             <Stack className="fu d3" direction="row" flexWrap="wrap" gap={{ xs:2, md:3 }} mt={4}>
//               {[
//                 { icon:<Users size={13}/>,  val:`${communityList.length}+`,   label:"Interviews" },
//                 { icon:<Brain size={13}/>,  val:`${stats.completedSessions}+`, label:"Sessions completed" },
//                 { icon:<Zap size={13}/>,    val:`${stats.completionRate}%`,    label:"Completion rate" },
//               ].map(({ icon, val, label }) => (
//                 <Stack key={label} direction="row" spacing={.8} alignItems="center">
//                   <Box sx={{ color:P }}>{icon}</Box>
//                   <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:{ xs:13.5, md:15 }, color:INK }}>{val}</Typography>
//                   <Typography sx={{ fontSize:{ xs:12.5, md:13.5 }, color:INK2 }}>{label}</Typography>
//                 </Stack>
//               ))}
//             </Stack>
//           </Box>
//         </Box>

//         {/* ── CONTENT ──────────────────────────────────── */}
//         <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} sx={{ overflowX:"hidden" }}>

//           {/* Fetch error */}
//           {fetchError && (
//             <Box sx={{ py:2 }}>
//               <Box sx={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:"13px", p:2, display:"flex", alignItems:"center", justifyContent:"space-between", gap:1.5 }}>
//                 <Typography sx={{ fontSize:13.5, color:"#991B1B" }}>{fetchError}</Typography>
//                 <button
//                   onClick={fetchCommunity}
//                   style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:8, border:"none", background:"#DC2626", color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, flexShrink:0 }}
//                 >
//                   <RefreshCw size={13}/> Retry
//                 </button>
//               </Box>
//             </Box>
//           )}

//           {/* Featured strip */}
//           {tab==="community" && !loading && featured.length > 0 && (
//             <Box py={{ xs:3, md:4 }}>
//               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Sparkles size={15} color={P}/>
//                   <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:{ xs:"1rem", md:"1.1rem" }, color:INK }}>Featured</Typography>
//                 </Stack>
//               </Stack>
//               <Grid container spacing={{ xs:2, md:2.5 }}>
//                 {featured.map(iv => {
//                   const featOwner = myInterviewIds.has(iv.id);
//                   const featPaid = !featOwner && iv.isPublic;
//                   return (
//                   <Grid item xs={12} sm={6} key={iv.id}>
//                     <div className="feat-card">
//                       <Box sx={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,${P}45 0%,transparent 70%)`, pointerEvents:"none" }}/>
//                       <Box sx={{ position:"relative", zIndex:1 }}>
//                         <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
//                           <Box sx={{ display:"inline-flex", alignItems:"center", gap:.5, background:`${P}28`, border:`1px solid ${P}40`, borderRadius:100, px:1.25, py:.35 }}>
//                             <Sparkles size={9} color={PM}/>
//                             <Typography sx={{ fontSize:10.5, fontWeight:700, color:PM, fontFamily:"'DM Sans',sans-serif" }}>Featured</Typography>
//                           </Box>
//                           {featPaid && (
//                             <Box sx={{ background:"rgba(217,119,6,.18)", borderRadius:100, px:1.1, py:.3 }}>
//                               <Typography sx={{ fontSize:10.5, fontWeight:700, color:"#FBBF24", fontFamily:"'DM Mono',monospace" }}>${PRICING.ATTEMPT_FEE}</Typography>
//                             </Box>
//                           )}
//                         </Stack>
//                         <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.05rem", md:"1.15rem" }, color:"#fff", lineHeight:1.2, mb:.75 }}>{iv.title}</Typography>
//                         <Typography sx={{ fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.6, mb:2, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{iv.description}</Typography>
//                         <Stack direction="row" spacing={1.75} flexWrap="wrap" gap={.75}>
//                           {([[<BookOpen size={11}/>,`${iv.questions}Q`],[<Clock size={11}/>,`${iv.duration}m`],[<Users size={11}/>,iv.attempts.toLocaleString()]] as [React.ReactNode,string][]).map(([icon,val],i)=>(
//                             <Stack key={i} direction="row" spacing={.5} alignItems="center">
//                               <Box sx={{ color:"rgba(255,255,255,.4)" }}>{icon}</Box>
//                               <Typography sx={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>{val}</Typography>
//                             </Stack>
//                           ))}
//                         </Stack>
//                       </Box>
//                       <button
//                         className="start-btn"
//                         style={{ position:"relative", zIndex:1 }}
//                         onClick={e => {
//                           e.stopPropagation();
//                           if (featPaid) {
//                             const confirmed = window.confirm(`This interview was created by someone in the community. Starting it costs $${PRICING.ATTEMPT_FEE}. Continue?`);
//                             if (!confirmed) return;
//                           }
//                           navigate("/mentee/ai-practice", { state:{ interviewId:iv.id, title:iv.title, questions:iv.questionList, duration:iv.duration, category:iv.category } });
//                         }}
//                       >
//                         <Play size={14}/> {featPaid ? `Start now — $${PRICING.ATTEMPT_FEE}` : "Start now"}
//                       </button>
//                     </div>
//                   </Grid>
//                   );
//                 })}
//               </Grid>
//             </Box>
//           )}

//           {/* Success toast */}
//           {success && (
//             <Box sx={{ background:GRNL, border:`1.5px solid #86EFAC`, borderRadius:"13px", p:2, mb:3, display:"flex", alignItems:"center", gap:1.5 }}>
//               <CheckCircle2 size={15} color={GRN}/>
//               <Typography sx={{ fontSize:13.5, fontWeight:500, color:"#065F46" }}>
//                 {myList[0]?.isPublic
//                   ? "Interview published to the community! Students can now practice with it."
//                   : "Interview saved privately. Only you can see and practice with it."}
//               </Typography>
//             </Box>
//           )}

//           {/* Tabs */}
//           <Stack direction="row" sx={{ borderBottom:`1px solid ${BORDER}`, mt:1 }}>
//             {[
//               { key:"community", label:"Community",    count: communityList.length },
//               { key:"mine",      label:"My interviews", count: myList.length },
//             ].map(({ key, label, count }) => (
//               <button
//                 key={key}
//                 onClick={() => setTab(key as any)}
//                 style={{ padding:"11px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:tab===key?600:400, color:tab===key?P:INK2, borderBottom:`2px solid ${tab===key?P:"transparent"}`, marginBottom:"-1px", display:"flex", alignItems:"center", gap:6, transition:"all .15s", whiteSpace:"nowrap" }}
//               >
//                 {label}
//                 <Box sx={{ background:tab===key?PL:"#F3F4F6", color:tab===key?P:INK3, fontSize:10.5, fontWeight:700, borderRadius:100, px:.85, minWidth:18, textAlign:"center", fontFamily:"'DM Mono',monospace" }}>
//                   {count}
//                 </Box>
//               </button>
//             ))}
//           </Stack>

//           {/* Filter bar */}
//           <Box py={2.5}>
//             <Stack direction={{ xs:"column", sm:"row" }} spacing={1.5} mb={2}>
//               <div className="search-wrap">
//                 <Search size={15} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:INK3 }}/>
//                 <input className="search-input" placeholder="Search interviews, topics, skills..." value={search} onChange={e => setSearch(e.target.value)}/>
//               </div>
//               <Box sx={{ position:"relative", flexShrink:0, width:{ xs:"100%", sm:"auto" } }}>
//                 <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value)} style={{ width:"100%" }}>
//                   <option value="popular">Most popular</option>
//                   <option value="rating">Highest rated</option>
//                   <option value="newest">Newest first</option>
//                   <option value="shortest">Shortest</option>
//                 </select>
//                 <ChevronDown size={13} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", color:INK3, pointerEvents:"none" }}/>
//               </Box>
//             </Stack>
//             <Box sx={{ overflow:"hidden", mx:-2, px:2 }}>
//               <div className="cat-scroll">
//                 {CATEGORIES.map(c => (
//                   <button key={c.id} className={`cat-chip${cat===c.id?" active":""}`} onClick={() => setCat(c.id)}>
//                     {c.icon} {c.label}
//                   </button>
//                 ))}
//               </div>
//             </Box>
//           </Box>

//           {/* Grid */}
//           {loading ? (
//             <Grid container spacing={{ xs:2, md:2.5 }} pb={8}>
//               {[1,2,3,4,5,6].map(i => (
//                 <Grid item xs={12} sm={6} md={4} key={i}><CardSkeleton/></Grid>
//               ))}
//             </Grid>
//           ) : filtered.length === 0 ? (
//             <Box sx={{ textAlign:"center", py:{ xs:6, md:10 } }}>
//               <Box sx={{ width:52, height:52, borderRadius:"50%", background:PL, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
//                 <Search size={22} color={P}/>
//               </Box>
//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:.75 }}>
//                 {tab==="mine" ? "No interviews yet" : "No interviews found"}
//               </Typography>
//               <Typography sx={{ fontSize:13.5, color:INK2, mb:3, lineHeight:1.7 }}>
//                 {tab==="mine"
//                   ? "Create your first interview and share it with the community."
//                   : "Try adjusting your search or selecting a different category."}
//               </Typography>
//               {tab==="mine" && (
//                 <button onClick={() => setModal(true)} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"12px 22px", borderRadius:100, border:"none", background:P, color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500 }}>
//                   <Plus size={15}/> Create interview
//                 </button>
//               )}
//             </Box>
//           ) : (
//             <Grid container spacing={{ xs:2, md:2.5 }} pb={8}>
//               {filtered.map(iv => (
//                 <Grid item xs={12} sm={6} md={4} key={iv.id}>
//                   <IVCard iv={iv} isOwner={myInterviewIds.has(iv.id)}/>
//                 </Grid>
//               ))}
//             </Grid>
//           )}

//         </Box>
//       </Box>

//       {modal && <CreateModal onClose={() => setModal(false)} onCreate={handleCreate} isFirstInterview={!loadingMine && myList.length === 0}/>}
//     </>
//   );
// };

// export default AIInterviewHome;