import React, { useState } from "react";
import { useNavigate,  } from "react-router-dom";
import {
  Box, Typography, Stack, Grid, 
  Chip, Collapse
} from "@mui/material";
import {
  MessageSquare, Target, Clock, ChevronDown,
  ChevronUp, Star, ArrowRight, CheckCircle2,
  Info,
} from "lucide-react";

/* ── TOKENS ─────────────────────────────────────────────────────────────── */
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#5C5C72";
const BORDER = "#E8E3F5";
const GREEN  = "#00916E";
const AMBER  = "#B45309";
const RED    = "#DC2626";

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
  
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes scoreRing {
    from { stroke-dashoffset: 440; }
    to   { stroke-dashoffset: var(--offset); }
  }
  @keyframes barGrow {
    from { width:0; }
    to   { width:var(--w); }
  }
  @keyframes pulse {
    0%,100% { opacity:.7; }
    50%      { opacity:1;  }
  }

  .fu   { animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
  .d1   { animation-delay:.07s; }
  .d2   { animation-delay:.14s; }
  .d3   { animation-delay:.21s; }
  .d4   { animation-delay:.28s; }
  .d5   { animation-delay:.35s; }
  .d6   { animation-delay:.42s; }
  .d7   { animation-delay:.49s; }

  .score-svg circle.track  { fill:none; stroke:#F0EAFD; stroke-width:14; }
  .score-svg circle.fill   {
    fill:none; stroke:${P}; stroke-width:14;
    stroke-linecap:round;
    stroke-dasharray:440;
    animation:scoreRing 1.4s cubic-bezier(.4,0,.2,1) .4s both;
  }

  .bar-wrap { background:#F3F0FA; border-radius:100px; overflow:hidden; height:8px; }
  .bar-fill {
    height:100%; border-radius:100px;
    animation:barGrow 1s cubic-bezier(.4,0,.2,1) .5s both;
  }

  .qa-card {
    border:1.5px solid ${BORDER};
    border-radius:16px;
    background:#fff;
    overflow:hidden;
    transition:box-shadow .2s;
  }
  .qa-card:hover { box-shadow:0 6px 24px rgba(127,66,231,.08); }

  .qa-header {
    display:flex; align-items:flex-start; justify-content:space-between;
    padding:18px 20px; cursor:pointer; gap:12px;
    background:#fff;
  }
  .qa-body { padding:0 20px 18px; }

  .tag-good   { background:#ECFDF5; color:${GREEN}; border:none; }
  .tag-avg    { background:#FFFBEB; color:${AMBER}; border:none; }
  .tag-weak   { background:#FEF2F2; color:${RED};   border:none; }

  .insight-card {
    border-radius:14px; padding:18px 20px;
    display:flex; gap:14px; align-items:flex-start;
  }
  .insight-icon {
    width:36px; height:36px; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
  }

  .cta-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 28px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-weight:500; font-size:14px;
    cursor:pointer; text-decoration:none; border:none;
    transition:all .2s;
  }
  .cta-primary { background:${P}; color:#fff; }
  .cta-primary:hover { background:${P_DARK}; transform:translateY(-2px); }
  .cta-ghost { background:transparent; color:${P}; border:1.5px solid ${P}; }
  .cta-ghost:hover { background:${P}; color:#fff; transform:translateY(-2px); }
`;

/* ── MOCK DATA (replace with real API response) ─────────────────────────── */
const MOCK_RESULT = {
  role: "Software Engineer",
  company: "TechWave",
  duration: "24 min",
  date: new Date().toLocaleDateString("en-ZA", { weekday:"long", day:"numeric", month:"long", year:"numeric" }),
  overallScore: 76,
  dimensions: [
    { label:"Clarity of thought",   score:82, color:P       },
    { label:"Technical depth",       score:68, color:"#E17055"},
    { label:"Communication",         score:80, color:GREEN   },
    { label:"Confidence",            score:74, color:P_MID   },
    { label:"Structure (STAR)",      score:70, color:AMBER   },
  ],
  questions: [
    {
      id:1,
      question:"Tell me about yourself and why you're interested in this role.",
      answer:"I'm a final-year CS student with a passion for building scalable systems. I've interned at two startups where I worked primarily with Node.js and React. I'm interested in this role because of the engineering culture and the scale of problems you solve.",
      score:85,
      tag:"Strong",
      feedback:"Good personal narrative. You tied your background to the role well. Consider adding a specific metric — e.g. 'improved API response time by 40%' — to make it more memorable.",
      improvement:"Add one concrete achievement with a number.",
    },
    {
      id:2,
      question:"Describe a time you had to debug a complex production issue.",
      answer:"We had a memory leak in our Node server. I used heap snapshots and found a closure that was holding references. It took a few hours but we resolved it.",
      score:62,
      tag:"Needs work",
      feedback:"The situation was clear but the answer lacked STAR structure. You jumped to the solution without explaining the impact or your specific actions in detail. The result was vague.",
      improvement:"Use full STAR: Situation → Task → Action → Result. Quantify the result.",
    },
    {
      id:3,
      question:"How do you handle disagreements with teammates on technical decisions?",
      answer:"I try to understand their perspective first, then present data or examples to support my view. If we can't agree, I defer to the team lead or we time-box a trial period for both approaches.",
      score:78,
      tag:"Good",
      feedback:"Mature and balanced answer. You demonstrated emotional intelligence and practical conflict resolution. Could briefly mention a real example to strengthen it.",
      improvement:"Anchor with a real (even brief) example.",
    },
    {
      id:4,
      question:"What's your approach to system design for a URL shortener?",
      answer:"I'd start with the requirements — reads vs writes ratio, latency, scale. Then define the API, choose a hash function for generating short codes, use a database like Cassandra for high write throughput, and put a cache in front for popular URLs.",
      score:80,
      tag:"Strong",
      feedback:"Solid high-level design. You asked the right clarifying questions implicitly and covered key components. To push this further, mention load balancing, CDN for global users, and database sharding strategy.",
      improvement:"Add CDN, load balancer, and briefly touch on failover.",
    },
  ],
  strengths: [
    "Clear communication and articulate answers",
    "Good awareness of system-level trade-offs",
    "Honest and composed under pressure",
  ],
  improvements: [
    "Use STAR structure consistently for behavioural questions",
    "Quantify achievements — numbers make stories stick",
    "Slow down slightly — you rushed on question 2",
  ],
  nextSteps: [
    { label:"Practice behavioural questions", to:"/ai-practice?type=behavioural" },
    { label:"Book a real mock interview", to:"/professionals" },
    { label:"Optimize your CV", to:"/cv-analysis" },
  ],
};

/* ── SCORE RING ─────────────────────────────────────────────────────────── */
const ScoreRing = ({ score }: { score: number }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const label = score >= 80 ? "Strong" : score >= 65 ? "Good" : "Developing";
  const labelColor = score >= 80 ? GREEN : score >= 65 ? P : AMBER;

  return (
    <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:1 }}>
      <Box sx={{ position:"relative", width:160, height:160 }}>
        <svg className="score-svg" width="160" height="160" viewBox="0 0 160 160">
          <circle className="track" cx="80" cy="80" r={r}/>
          <circle
            className="fill"
            cx="80" cy="80" r={r}
            transform="rotate(-90 80 80)"
            style={{ "--offset": offset } as React.CSSProperties}
          />
        </svg>
        <Box sx={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2.4rem", color:INK, lineHeight:1 }}>
            {score}
          </Typography>
          <Typography sx={{ fontSize:11.5, color:INK2, mt:.25 }}>/ 100</Typography>
        </Box>
      </Box>
      <Box sx={{ display:"inline-flex", alignItems:"center", gap:.75, background:P_LITE, borderRadius:100, px:2, py:.5 }}>
        <Box sx={{ width:7, height:7, borderRadius:"50%", background:labelColor }}/>
        <Typography sx={{ fontSize:12.5, fontWeight:600, color:labelColor }}>{label}</Typography>
      </Box>
    </Box>
  );
};

/* ── DIMENSION BAR ──────────────────────────────────────────────────────── */
const DimBar = ({ label, score, color }: { label:string; score:number; color:string }) => (
  <Box>
    <Stack direction="row" justifyContent="space-between" mb={.75}>
      <Typography sx={{ fontSize:13, color:INK, fontWeight:500 }}>{label}</Typography>
      <Typography sx={{ fontSize:13, color:INK2, fontWeight:600 }}>{score}%</Typography>
    </Stack>
    <div className="bar-wrap">
      <div
        className="bar-fill"
        style={{ background:color, "--w":`${score}%` } as React.CSSProperties}
      />
    </div>
  </Box>
);

/* ── QA ACCORDION ───────────────────────────────────────────────────────── */
const QACard = ({ q, idx }: { q: typeof MOCK_RESULT.questions[0]; idx: number }) => {
  const [open, setOpen] = useState(idx === 0);
  const tagClass = q.score >= 80 ? "tag-good" : q.score >= 70 ? "tag-avg" : "tag-weak";
  // const tagColor = q.score >= 80 ? GREEN : q.score >= 70 ? AMBER : RED;

  return (
    <div className="qa-card">
      <div className="qa-header" onClick={() => setOpen(o => !o)}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start" flex={1}>
          <Box sx={{ width:26, height:26, borderRadius:"50%", background:P_LITE, color:P, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:11.5, flexShrink:0, mt:.15 }}>
            {idx+1}
          </Box>
          <Box flex={1}>
            <Typography sx={{ fontSize:14, fontWeight:600, color:INK, lineHeight:1.45, mb:.75 }}>
              {q.question}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={q.tag} size="small" className={tagClass} sx={{ height:22, fontSize:11.5, fontWeight:600, borderRadius:"6px" }}/>
              <Typography sx={{ fontSize:12, color:INK2 }}>{q.score}/100</Typography>
            </Stack>
          </Box>
        </Stack>
        <Box sx={{ color:INK2, mt:.2, flexShrink:0 }}>
          {open ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}
        </Box>
      </div>

      <Collapse in={open}>
        <div className="qa-body">
          <Box sx={{ background:"#F9F8FE", borderRadius:"10px", p:2, mb:2 }}>
            <Typography sx={{ fontSize:12, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.07em", mb:.75 }}>Your answer</Typography>
            <Typography sx={{ fontSize:13.5, color:INK, lineHeight:1.75, fontStyle:"italic" }}>"{q.answer}"</Typography>
          </Box>

          <Box sx={{ background:P_LITE, borderRadius:"10px", p:2, mb:2 }}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <Info size={14} color={P} style={{ flexShrink:0, marginTop:2 }}/>
              <Box>
                <Typography sx={{ fontSize:12, fontWeight:600, color:P, mb:.5 }}>AI Feedback</Typography>
                <Typography sx={{ fontSize:13.5, color:INK, lineHeight:1.75 }}>{q.feedback}</Typography>
              </Box>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Target size={14} color={AMBER} style={{ flexShrink:0, marginTop:2 }}/>
            <Typography sx={{ fontSize:13, color:AMBER, lineHeight:1.65 }}>
              <strong>Improve: </strong>{q.improvement}
            </Typography>
          </Stack>
        </div>
      </Collapse>
    </div>
  );
};

/* ── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const Feedback: React.FC = () => {
  // const navigate = useNavigate();
  const data = MOCK_RESULT; // replace with useLocation state or API call

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background:"#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", pb:10 }}>

        {/* ── HEADER BAR ──────────────────────────────────── */}
        <Box sx={{ background:"#fff", borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:8 }, py:3 }}>
          <Box maxWidth="lg" mx="auto">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width:30, height:30, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Star size={15} color="#fff"/>
                </Box>
                <Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, color:INK, lineHeight:1 }}>Interview Feedback</Typography>
                  <Typography sx={{ fontSize:11.5, color:INK2 }}>{data.role} · {data.company}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Clock size={13} color={INK2}/>
                <Typography sx={{ fontSize:13, color:INK2 }}>{data.duration}</Typography>
                <Box sx={{ width:4, height:4, borderRadius:"50%", background:BORDER }}/>
                <Typography sx={{ fontSize:13, color:INK2 }}>{data.date}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} pt={5}>

          {/* ── HERO SCORE ROW ───────────────────────────── */}
          <Grid container spacing={3} mb={4}>
            {/* Score ring card */}
            <Grid item xs={12} md={4}>
              <Box className="fu" sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:4, display:"flex", flexDirection:"column", alignItems:"center", gap:2.5, height:"100%" }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:INK2, textTransform:"uppercase", letterSpacing:"0.08em" }}>
                  Overall score
                </Typography>
                <ScoreRing score={data.overallScore}/>
                <Typography sx={{ fontSize:13, color:INK2, textAlign:"center", lineHeight:1.6 }}>
                  You outperformed <strong style={{ color:INK }}>68%</strong> of candidates who practiced this role.
                </Typography>
              </Box>
            </Grid>

            {/* Dimensions */}
            <Grid item xs={12} md={8}>
              <Box className="fu d1" sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:4, height:"100%" }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.1rem", color:INK, mb:3 }}>
                  Performance breakdown
                </Typography>
                <Stack spacing={2.5}>
                  {data.dimensions.map((d,i) => (
                    <DimBar key={i} label={d.label} score={d.score} color={d.color}/>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* ── STRENGTHS & IMPROVEMENTS ─────────────────── */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <Box className="fu d2" sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:4, height:"100%" }}>
                <Stack direction="row" spacing={1.25} alignItems="center" mb={2.5}>
                  <Box sx={{ width:32, height:32, borderRadius:"8px", background:"#ECFDF5", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <CheckCircle2 size={16} color={GREEN}/>
                  </Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:INK }}>
                    What you did well
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {data.strengths.map((s,i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                      <Box sx={{ width:6, height:6, borderRadius:"50%", background:GREEN, mt:.8, flexShrink:0 }}/>
                      <Typography sx={{ fontSize:14, color:INK, lineHeight:1.6 }}>{s}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box className="fu d3" sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:4, height:"100%" }}>
                <Stack direction="row" spacing={1.25} alignItems="center" mb={2.5}>
                  <Box sx={{ width:32, height:32, borderRadius:"8px", background:"#FEF3C7", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Target size={16} color={AMBER}/>
                  </Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:INK }}>
                    Areas to improve
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {data.improvements.map((s,i) => (
                    <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                      <Box sx={{ width:6, height:6, borderRadius:"50%", background:AMBER, mt:.8, flexShrink:0 }}/>
                      <Typography sx={{ fontSize:14, color:INK, lineHeight:1.6 }}>{s}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* ── Q&A BREAKDOWN ────────────────────────────── */}
          <Box className="fu d4" mb={4}>
            <Box sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:4 }}>
              <Stack direction="row" spacing={1.25} alignItems="center" mb={3}>
                <Box sx={{ width:32, height:32, borderRadius:"8px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <MessageSquare size={16} color={P}/>
                </Box>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:INK }}>
                  Question-by-question breakdown
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {data.questions.map((q, i) => <QACard key={q.id} q={q} idx={i}/>)}
              </Stack>
            </Box>
          </Box>

          {/* ── NEXT STEPS ───────────────────────────────── */}
          <Box className="fu d5">
            <Box sx={{ background:INK, border:`1.5px solid transparent`, borderRadius:"20px", p:{ xs:4, md:5 }, position:"relative", overflow:"hidden" }}>
              <Box sx={{ position:"absolute", top:-60, right:-60, width:220, height:220, borderRadius:"50%", background:`radial-gradient(circle,${P}35 0%,transparent 70%)`, pointerEvents:"none" }}/>
              <Box sx={{ position:"relative", zIndex:1 }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.4rem", md:"1.8rem" }, color:"#fff", mb:.75, lineHeight:1.1 }}>
                  Keep the momentum going.
                </Typography>
                <Typography sx={{ fontSize:14, color:"rgba(255,255,255,.5)", mb:4, lineHeight:1.65 }}>
                  Your score of {data.overallScore} is solid — here's exactly how to push it further.
                </Typography>
                <Stack direction={{ xs:"column", sm:"row" }} spacing={2} flexWrap="wrap">
                  {data.nextSteps.map((step, i) => (
                    <a key={i} href={step.to} className={`cta-btn ${i===0?"cta-primary":"cta-ghost"}`}
                      style={{ border:i!==0?"1.5px solid rgba(255,255,255,.25)":undefined, color:i!==0?"#fff":undefined }}>
                      {step.label} <ArrowRight size={14}/>
                    </a>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default Feedback;