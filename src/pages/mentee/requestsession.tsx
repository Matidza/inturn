import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Typography, Stack, Grid, Avatar,
  Collapse, Divider, Alert,
} from "@mui/material";
import {
  Calendar, Clock, Video, Star, ChevronDown, ChevronUp,
  CheckCircle2, CreditCard, ArrowLeft, ArrowRight,
  Briefcase, MessageSquare, FileText, Lightbulb,
  Shield, Info,
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
const GREEN_L= "#ECFDF5";

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const css = `

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes slideIn {
    from { opacity:0; transform:translateX(14px); }
    to   { opacity:1; transform:translateX(0);    }
  }
  @keyframes successPop {
    0%  { transform:scale(.7) rotate(-10deg); opacity:0; }
    60% { transform:scale(1.12) rotate(3deg); opacity:1; }
    100%{ transform:scale(1) rotate(0); opacity:1; }
  }

  .fu  { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .si  { animation:slideIn .5s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.06s; }
  .d2  { animation-delay:.12s; }
  .d3  { animation-delay:.18s; }
  .d4  { animation-delay:.24s; }
  .d5  { animation-delay:.30s; }

  /* step pill */
  .step-bar { display:flex; gap:8px; }
  .step-pill {
    flex:1; height:4px; border-radius:100px;
    background:${BORDER}; transition:background .3s;
  }
  .step-pill.done { background:${P}; }
  .step-pill.active { background:${P_MID}; }

  /* session type cards */
  .stype-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:10px; }
  .stype-card {
    display:flex; flex-direction:column; align-items:center; gap:8px;
    padding:16px 12px; border-radius:14px;
    border:1.5px solid ${BORDER}; background:#fff;
    cursor:pointer; transition:all .22s cubic-bezier(.34,1.56,.64,1);
    font-family:'DM Sans',sans-serif;
  }
  .stype-card:hover:not(.on) { border-color:${P_MID}; background:${P_LITE}; }
  .stype-card.on {
    border-color:${P}; background:${P_LITE};
    box-shadow:0 0 0 3px ${P_LITE}, 0 4px 18px rgba(127,66,231,.12);
  }
  .stype-icon {
    width:40px; height:40px; border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    background:${BORDER}; color:${INK2}; transition:all .2s;
  }
  .stype-card.on .stype-icon { background:${P}; color:#fff; }
  .stype-label { font-size:13px; font-weight:600; color:${INK}; text-align:center; }
  .stype-price { font-size:12px; color:${INK2}; }

  /* date/time slot grid */
  .date-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  .time-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
  .slot-btn {
    padding:10px 6px; border:1.5px solid ${BORDER};
    background:#fff; border-radius:10px; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    color:${INK}; text-align:center; transition:all .18s;
  }
  .slot-btn:hover:not(.taken):not(.on) { border-color:${P_MID}; color:${P}; }
  .slot-btn.on { border-color:${P}; background:${P_LITE}; color:${P}; font-weight:600; }
  .slot-btn.taken { opacity:.38; cursor:not-allowed; background:#F9F9F9; color:${INK2}; }

  /* textarea */
  .message-box {
    width:100%; min-height:110px;
    border:1.5px solid ${BORDER}; border-radius:12px;
    padding:14px 16px;
    font-family:'DM Sans',sans-serif; font-size:14px; color:${INK};
    background:#fff; resize:vertical; outline:none;
    transition:border-color .2s;
  }
  .message-box:focus { border-color:${P}; }
  .message-box::placeholder { color:${INK2}; opacity:.6; }

  /* goals checkbox chips */
  .goal-chip {
    display:inline-flex; align-items:center; gap:6px;
    padding:8px 14px; border-radius:100px;
    border:1.5px solid ${BORDER}; background:#fff;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    color:${INK2}; cursor:pointer; transition:all .18s;
  }
  .goal-chip:hover:not(.on) { border-color:${P_MID}; color:${P}; }
  .goal-chip.on { border-color:${P}; background:${P_LITE}; color:${P}; font-weight:600; }

  /* primary cta */
  .primary-cta {
    width:100%; padding:15px; border:none;
    background:${P}; color:#fff; border-radius:14px;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
    transition:all .2s;
  }
  .primary-cta:hover { background:${P_DARK}; transform:translateY(-2px); }
  .primary-cta:disabled { opacity:.45; cursor:not-allowed; transform:none; }

  .back-btn {
    display:inline-flex; align-items:center; gap:5px;
    background:none; border:none; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13.5px;
    color:${INK2}; padding:0; transition:color .15s;
  }
  .back-btn:hover { color:${INK}; }

  /* success screen */
  .success-icon { animation:successPop .5s cubic-bezier(.34,1.56,.64,1) .1s both; }

  /* summary row */
  .sum-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:12px 0; border-bottom:1px solid ${BORDER};
  }
  .sum-row:last-child { border-bottom:none; }
`;

/* ── MOCK DATA ───────────────────────────────────────────────────────────── */
const PROFESSIONAL = {
  id: "1",
  name: "Lerato Mokoena",
  role: "Software Engineer at TechWave",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  rating: 4.9,
  reviews: 38,
  specialty: "Technical Interviews",
  bio: "5 years at TechWave building distributed systems. I help CS students and grads crack technical rounds at top SA tech companies. Comfortable with system design, DSA, and behavioural prep.",
  sessionTypes: [
    { value:"mock",     label:"Mock Interview",  icon:<Video size={17}/>,        price:350, duration:"45 min" },
    { value:"cv",       label:"CV Review",        icon:<FileText size={17}/>,     price:220, duration:"30 min" },
    { value:"coaching", label:"Career Coaching",  icon:<Lightbulb size={17}/>,    price:400, duration:"60 min" },
    { value:"system",   label:"System Design",    icon:<Briefcase size={17}/>,    price:450, duration:"60 min" },
  ],
};

const DATES = [
  { label:"Mon 12 May", slots:["09:00","10:00","14:00","16:00"], taken:["10:00"] },
  { label:"Tue 13 May", slots:["11:00","13:00","15:00","17:00"], taken:["13:00","17:00"] },
  { label:"Wed 14 May", slots:["09:00","11:00","14:00","16:00"], taken:["09:00"] },
  { label:"Thu 15 May", slots:["10:00","12:00","15:00","17:00"], taken:[] },
];

const GOALS = [
  "Crack technical rounds",
  "Improve STAR answers",
  "System design prep",
  "Confidence building",
  "Salary negotiation",
  "CV improvement",
  "Career switch advice",
  "First job guidance",
];

/* ── STEP INDICATOR ─────────────────────────────────────────────────────── */
const StepBar = ({ step, total }: { step:number; total:number }) => (
  <Box mb={3}>
    <div className="step-bar">
      {Array.from({ length:total }).map((_,i) => (
        <div key={i} className={`step-pill ${i<step?"done":i===step?"active":""}`}/>
      ))}
    </div>
    <Typography sx={{ fontSize:12, color:INK2, mt:1 }}>Step {step+1} of {total}</Typography>
  </Box>
);

/* ── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const RequestSession: React.FC = () => {
  const navigate = useNavigate();
  const pro = PROFESSIONAL;

  const [step, setStep]       = useState(0);
  const [sType, setSType]     = useState("");
  const [dateIdx, setDateIdx] = useState<number|null>(null);
  const [time, setTime]       = useState("");
  const [goals, setGoals]     = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedType   = pro.sessionTypes.find(s => s.value === sType);
  const selectedDate   = dateIdx !== null ? DATES[dateIdx] : null;
  const takenSlots     = selectedDate?.taken ?? [];

  const toggleGoal = (g:string) =>
    setGoals(prev => prev.includes(g) ? prev.filter(x=>x!==g) : [...prev,g]);

  const canNext = [
    !!sType,
    !!(dateIdx!==null && time),
    goals.length > 0,
    true,
  ][step];

  const handleSubmit = () => {
    // 🔥 Replace with API call
    setSubmitted(true);
  };

  /* ── SUCCESS SCREEN ───────────────────────────────── */
  if (submitted) return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh", background:"#F7F6FB", display:"flex", alignItems:"center", justifyContent:"center", p:3, fontFamily:"'DM Sans',sans-serif" }}>
        <Box sx={{ maxWidth:480, width:"100%", textAlign:"center" }}>
          <Box className="success-icon" sx={{ width:80, height:80, borderRadius:"50%", background:GREEN_L, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:3 }}>
            <CheckCircle2 size={38} color={GREEN}/>
          </Box>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2rem", color:INK, letterSpacing:"-0.02em", mb:1 }}>
            Request sent!
          </Typography>
          <Typography sx={{ fontSize:15, color:INK2, lineHeight:1.7, mb:4 }}>
            <strong style={{ color:INK }}>{pro.name}</strong> will confirm your session within 24 hours. You'll get a notification and calendar invite once approved.
          </Typography>

          <Box sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"18px", p:3, mb:4, textAlign:"left" }}>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:INK, mb:2 }}>Session summary</Typography>
            {[
              ["Session type",  selectedType?.label ?? "—"],
              ["Date",          selectedDate?.label ?? "—"],
              ["Time",          time || "—"],
              ["Duration",      selectedType?.duration ?? "—"],
              ["Amount",        selectedType ? `R${selectedType.price}` : "—"],
            ].map(([k,v]) => (
              <div key={k} className="sum-row">
                <Typography sx={{ fontSize:13.5, color:INK2 }}>{k}</Typography>
                <Typography sx={{ fontSize:13.5, fontWeight:600, color:INK }}>{v}</Typography>
              </div>
            ))}
          </Box>

          <Stack direction={{ xs:"column", sm:"row" }} spacing={2} justifyContent="center">
            <button className="primary-cta" style={{ maxWidth:220, margin:"0 auto" }} onClick={() => navigate("/mentee/interviews")}>
              View my interviews <ArrowRight size={15}/>
            </button>
          </Stack>
          <button className="back-btn" style={{ marginTop:16, display:"inline-flex" }} onClick={() => navigate("/professionals")}>
            <ArrowLeft size={13}/> Browse more professionals
          </button>
        </Box>
      </Box>
    </>
  );

  /* ── MAIN LAYOUT ──────────────────────────────────── */
  return (
    <>
      <style>{css}</style>
      <Box sx={{ background:"#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", pb:10 }}>

        {/* Header */}
        <Box sx={{ background:"#fff", borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:8 }, py:3 }}>
          <Box maxWidth="lg" mx="auto">
            <button className="back-btn" onClick={() => step > 0 ? setStep(s=>s-1) : navigate(-1)}>
              <ArrowLeft size={14}/> {step>0 ? "Back" : "Professionals"}
            </button>
          </Box>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} pt={5}>
          <Grid container spacing={4}>

            {/* ── LEFT: PROFESSIONAL CARD (sticky) ─────── */}
            <Grid item xs={12} md={4}>
              <Box className="fu" sx={{ position:{ md:"sticky" }, top:24 }}>

                {/* Pro card */}
                <Box sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:3.5, mb:3 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                    <Avatar src={pro.avatar} sx={{ width:56, height:56, border:`2px solid ${BORDER}` }}/>
                    <Box>
                      <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.05rem", color:INK, lineHeight:1.2 }}>
                        {pro.name}
                      </Typography>
                      <Typography sx={{ fontSize:12.5, color:INK2, mt:.25 }}>{pro.role}</Typography>
                      <Stack direction="row" spacing={.5} alignItems="center" mt={.5}>
                        <Star size={12} fill={P} color={P}/>
                        <Typography sx={{ fontSize:12.5, fontWeight:600, color:INK }}>{pro.rating}</Typography>
                        <Typography sx={{ fontSize:12, color:INK2 }}>({pro.reviews} reviews)</Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Box sx={{ background:"#F9F8FE", borderRadius:"12px", p:2, mb:2 }}>
                    <Typography sx={{ fontSize:11.5, fontWeight:600, color:P, textTransform:"uppercase", letterSpacing:"0.07em", mb:.75 }}>Specialty</Typography>
                    <Typography sx={{ fontSize:13.5, color:INK }}>{pro.specialty}</Typography>
                  </Box>

                  <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.7 }}>{pro.bio}</Typography>
                </Box>

                {/* Booking summary (shows once selections made) */}
                {(sType || (dateIdx!==null && time)) && (
                  <Box className="si" sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:3 }}>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.9rem", color:INK, mb:2 }}>
                      Your booking
                    </Typography>
                    <Stack spacing={1.5}>
                      {selectedType && (
                        <Stack direction="row" justifyContent="space-between">
                          <Typography sx={{ fontSize:13.5, color:INK2 }}>{selectedType.label}</Typography>
                          <Typography sx={{ fontSize:13.5, fontWeight:600, color:INK }}>R{selectedType.price}</Typography>
                        </Stack>
                      )}
                      {selectedType && (
                        <Stack direction="row" justifyContent="space-between">
                          <Typography sx={{ fontSize:13.5, color:INK2 }}>Duration</Typography>
                          <Typography sx={{ fontSize:13.5, color:INK }}>{selectedType.duration}</Typography>
                        </Stack>
                      )}
                      {selectedDate && time && (
                        <Stack direction="row" justifyContent="space-between">
                          <Typography sx={{ fontSize:13.5, color:INK2 }}>When</Typography>
                          <Typography sx={{ fontSize:13.5, color:INK }}>{selectedDate.label} · {time}</Typography>
                        </Stack>
                      )}
                    </Stack>
                    {selectedType && (
                      <>
                        <Box sx={{ height:1, background:BORDER, my:2 }}/>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:INK }}>Total</Typography>
                          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.3rem", color:P }}>
                            R{selectedType.price}
                          </Typography>
                        </Stack>
                      </>
                    )}
                  </Box>
                )}

                {/* Guarantee */}
                <Box sx={{ display:"flex", alignItems:"flex-start", gap:1.25, mt:2, px:.5 }}>
                  <Shield size={14} color={GREEN} style={{ marginTop:2, flexShrink:0 }}/>
                  <Typography sx={{ fontSize:12.5, color:INK2, lineHeight:1.6 }}>
                    Full refund if cancelled 24+ hours before the session.
                  </Typography>
                </Box>

              </Box>
            </Grid>

            {/* ── RIGHT: FORM STEPS ────────────────────── */}
            <Grid item xs={12} md={8}>
              <Box className="fu d1" sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:{ xs:3, md:4.5 } }}>

                <StepBar step={step} total={4}/>

                {/* ─── STEP 0: SESSION TYPE ─────────────── */}
                {step === 0 && (
                  <Box>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.35rem", color:INK, mb:.75, letterSpacing:"-0.015em" }}>
                      What kind of session?
                    </Typography>
                    <Typography sx={{ fontSize:14, color:INK2, mb:3, lineHeight:1.65 }}>
                      Choose the type of session that best fits what you need right now.
                    </Typography>
                    <div className="stype-grid">
                      {pro.sessionTypes.map(s => (
                        <div
                          key={s.value}
                          className={`stype-card${sType===s.value?" on":""}`}
                          onClick={() => setSType(s.value)}
                        >
                          <div className="stype-icon">{s.icon}</div>
                          <div className="stype-label">{s.label}</div>
                          <div className="stype-price">R{s.price} · {s.duration}</div>
                        </div>
                      ))}
                    </div>
                  </Box>
                )}

                {/* ─── STEP 1: DATE & TIME ──────────────── */}
                {step === 1 && (
                  <Box>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.35rem", color:INK, mb:.75, letterSpacing:"-0.015em" }}>
                      Pick a date & time
                    </Typography>
                    <Typography sx={{ fontSize:14, color:INK2, mb:3, lineHeight:1.65 }}>
                      All times shown in your local timezone (SAST).
                    </Typography>

                    {/* Date row */}
                    <Typography sx={{ fontSize:12, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.08em", mb:1.5 }}>
                      Available dates
                    </Typography>
                    <div className="date-grid" style={{ marginBottom:24 }}>
                      {DATES.map((d, i) => (
                        <button
                          key={i}
                          className={`slot-btn${dateIdx===i?" on":""}`}
                          onClick={() => { setDateIdx(i); setTime(""); }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>

                    {/* Time slots */}
                    {dateIdx !== null && (
                      <Box>
                        <Typography sx={{ fontSize:12, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.08em", mb:1.5 }}>
                          Available times — {selectedDate?.label}
                        </Typography>
                        <div className="time-grid">
                          {selectedDate?.slots.map(t => (
                            <button
                              key={t}
                              className={`slot-btn${time===t?" on":""}${takenSlots.includes(t)?" taken":""}`}
                              onClick={() => !takenSlots.includes(t) && setTime(t)}
                            >
                              {t}
                              {takenSlots.includes(t) && <span style={{ fontSize:10, display:"block", color:"#aaa" }}>Booked</span>}
                            </button>
                          ))}
                        </div>
                      </Box>
                    )}
                  </Box>
                )}

                {/* ─── STEP 2: GOALS ────────────────────── */}
                {step === 2 && (
                  <Box>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.35rem", color:INK, mb:.75, letterSpacing:"-0.015em" }}>
                      What are your goals?
                    </Typography>
                    <Typography sx={{ fontSize:14, color:INK2, mb:3, lineHeight:1.65 }}>
                      Select all that apply — this helps {pro.name.split(" ")[0]} prepare the right session for you.
                    </Typography>
                    <Box sx={{ display:"flex", flexWrap:"wrap", gap:1.25 }}>
                      {GOALS.map(g => (
                        <div
                          key={g}
                          className={`goal-chip${goals.includes(g)?" on":""}`}
                          onClick={() => toggleGoal(g)}
                        >
                          {goals.includes(g) && <CheckCircle2 size={13}/>}
                          {g}
                        </div>
                      ))}
                    </Box>
                    {goals.length > 0 && (
                      <Typography sx={{ fontSize:12.5, color:P, mt:2, fontWeight:500 }}>
                        {goals.length} goal{goals.length!==1?"s":""} selected
                      </Typography>
                    )}

                    {/* Message box */}
                    <Box mt={3.5}>
                      <Typography sx={{ fontSize:12, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.08em", mb:1.25 }}>
                        Message to {pro.name.split(" ")[0]} <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0, color:"rgba(92,92,114,.5)", fontSize:11 }}>(optional)</span>
                      </Typography>
                      <textarea
                        className="message-box"
                        placeholder={`Hi ${pro.name.split(" ")[0]}, I'm looking to prepare for a ${selectedType?.label ?? "session"}. I'm targeting roles at...`}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                      />
                    </Box>
                  </Box>
                )}

                {/* ─── STEP 3: CONFIRM ──────────────────── */}
                {step === 3 && (
                  
                  <Box>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.35rem", color:INK, mb:.75, letterSpacing:"-0.015em" }}>
                      Confirm your request
                    </Typography>
                    <Typography sx={{ fontSize:14, color:INK2, mb:3.5, lineHeight:1.65 }}>
                      Review everything before sending. Payment is collected only after {pro.name.split(" ")[0]} approves.
                    </Typography>

                    {/* Summary table */}
                    <Box sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"14px", overflow:"hidden", mb:3 }}>
                      {[
                        { label:"Professional",  value:pro.name },
                        { label:"Session type",  value:selectedType?.label },
                        { label:"Duration",       value:selectedType?.duration },
                        { label:"Date",           value:selectedDate?.label },
                        { label:"Time",           value:time ? `${time} SAST` : "—" },
                        { label:"Goals",          value:goals.join(", ") || "—" },
                      ].map(({ label, value }, i) => (
                        <Stack key={i} direction="row" justifyContent="space-between" alignItems="flex-start"
                          sx={{ px:3, py:1.75, borderBottom:`1px solid ${BORDER}`, "&:last-child":{ borderBottom:"none" }, background: i%2===0 ? "#fff" : "#FBFAFF" }}>
                          <Typography sx={{ fontSize:13.5, color:INK2, flexShrink:0, width:"38%" }}>{label}</Typography>
                          <Typography sx={{ fontSize:13.5, fontWeight:500, color:INK, textAlign:"right" }}>{value ?? "—"}</Typography>
                        </Stack>
                      ))}
                    </Box>

                    {/* Message preview */}
                    {message && (
                      <Box sx={{ background:"#F9F8FE", borderRadius:"12px", p:2.5, mb:3 }}>
                        <Typography sx={{ fontSize:12, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.07em", mb:.75 }}>Your message</Typography>
                        <Typography sx={{ fontSize:13.5, color:INK, lineHeight:1.7, fontStyle:"italic" }}>"{message}"</Typography>
                      </Box>
                    )}

                    {/* Price + payment note */}
                    <Box sx={{ background:P_LITE, border:`1.5px solid ${BORDER}`, borderRadius:"14px", p:3, mb:3 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb="1.5">
                        <Typography sx={{ fontSize:14, color:INK }}>Session fee</Typography>
                        <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.4rem", color:P }}>
                          R{selectedType?.price ?? "—"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="flex-start" mt={1.5}>
                        <Info size={13} color={P} style={{ marginTop:2, flexShrink:0 }}/>
                        <Typography sx={{ fontSize:12.5, color:INK2, lineHeight:1.65 }}>
                          Payment is only charged once {pro.name.split(" ")[0]} confirms your session. You'll receive a payment link by email.
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ background:GREEN_L, borderRadius:"12px", p:2, mb:3 }}>
                      <Shield size={14} color={GREEN} style={{ marginTop:2, flexShrink:0 }}/>
                      <Typography sx={{ fontSize:12.5, color:GREEN, lineHeight:1.65 }}>
                        Full refund guaranteed if cancelled 24+ hours before the session.
                      </Typography>
                    </Stack>
                  </Box>
                )}

                {/* ─── NAV BUTTONS ──────────────────────── */}
                <Box mt={4}>
                  {step < 3 ? (
                    <button
                      className="primary-cta"
                      disabled={!canNext}
                      onClick={() => setStep(s=>s+1)}
                    >
                      Continue <ArrowRight size={16}/>
                    </button>
                  ) : (
                    <button className="primary-cta" onClick={handleSubmit}>
                      <CreditCard size={16}/> Send request
                    </button>
                  )}
                </Box>

              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default RequestSession;