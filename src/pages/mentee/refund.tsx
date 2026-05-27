// import React from 'react'
// import { Box } from '@mui/material'

// const PRIMARY     = "#7B61FF";
// const DANGER      = "#ef4444";
// const SUCCESS     = "#22c55e";
// const P = "#7F42E7";
// const P_DARK = "#5E2EC5";
// const P_LIGHT = "#F0EAFD";
// const P_MID = "#B893F6";
// const OFF_WHITE = "#FAFAFA";
// const INK = "#0D0D12";
// const INK2 = "#4A4A5A";
// const BORDER = "#E8E3F5";

// const Refund = () => {
//   return (
//     <Box
//       sx={{
//         px: { xs: 2, md: 4 },
//         py: 3,
//         backgroundColor: "#FFFFFF",
//         color: "#05050B",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//         Reqfund
//     </Box>
//   )
// }

// export default Refund






import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { HandshakeOutlined } from "@mui/icons-material";
import {
  ArrowLeft, Shield, Clock, CheckCircle2, AlertTriangle,
  ChevronRight, RefreshCw, CreditCard, Calendar, Video,
  HelpCircle, ArrowRight, Info, Send, Check,
} from "lucide-react";

/* ── TOKENS ─────────────────────────────────────────────── */
const INK    = "#0A0A0F";
const INK2   = "#52526A";
const INK3   = "#9898B0";
const OFF    = "#F6F5FA";
const WHITE  = "#FFFFFF";
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const BORDER = "#E5E3F0";
const GREEN  = "#059669";
const GREEN_L= "#D1FAE5";
const GREEN_D= "#065F46";
const AMBER  = "#D97706";
const AMBER_L= "#FFFBEB";
const RED    = "#DC2626";
const RED_L  = "#FEF2F2";

/* ── CSS ─────────────────────────────────────────────────── */
const css = `

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
  @keyframes shimmer   { from{background-position:-300% center} to{background-position:300% center} }
  @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes successIn {
    0%  { opacity:0; transform:scale(.5) rotate(-20deg); }
    65% { transform:scale(1.12) rotate(3deg); opacity:1; }
    100%{ transform:scale(1) rotate(0); opacity:1; }
  }
  @keyframes ringPulse {
    0%,100%{ opacity:.35; transform:scale(1); }
    50%    { opacity:.7; transform:scale(1.06); }
  }

  .fu { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1 { animation-delay:.07s; } .d2 { animation-delay:.14s; }
  .d3 { animation-delay:.21s; } .d4 { animation-delay:.28s; }
  .d5 { animation-delay:.35s; } .d6 { animation-delay:.42s; }

  /* Reason selector */
  .reason-option {
    display:flex; align-items:flex-start; gap:14px;
    padding:16px 18px; border:1.5px solid ${BORDER};
    border-radius:14px; background:${WHITE};
    cursor:pointer; transition:all .18s cubic-bezier(.34,1.56,.64,1);
    position:relative; overflow:hidden;
  }
  .reason-option:hover:not(.selected) { border-color:${P_MID}; background:${P_LITE}; }
  .reason-option.selected {
    border-color:${P};
    background:${P_LITE};
    box-shadow:0 0 0 3px rgba(127,66,231,.1);
  }
  .reason-radio {
    width:20px; height:20px; border-radius:50%;
    border:2px solid ${BORDER}; flex-shrink:0; margin-top:2px;
    display:flex; align-items:center; justify-content:center;
    transition:all .18s; background:${WHITE};
  }
  .reason-option.selected .reason-radio {
    border-color:${P}; background:${P};
  }
  .reason-dot {
    width:8px; height:8px; border-radius:50%;
    background:#fff; transform:scale(0); transition:transform .15s;
  }
  .reason-option.selected .reason-dot { transform:scale(1); }

  /* Textarea */
  .ref-textarea {
    width:100%; min-height:100px;
    border:1.5px solid ${BORDER}; border-radius:12px;
    padding:13px 16px; font-family:'DM Sans',sans-serif;
    font-size:14px; color:${INK}; resize:vertical; outline:none;
    transition:border-color .18s, box-shadow .18s;
    background:${WHITE};
  }
  .ref-textarea:focus { border-color:${P}; box-shadow:0 0 0 4px rgba(127,66,231,.1); }
  .ref-textarea::placeholder { color:${INK3}; opacity:.7; }

  /* Submit button */
  .submit-btn {
    width:100%; padding:16px; border:none; border-radius:14px;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
    cursor:pointer; display:flex; align-items:center; justify-content:center; gap:9px;
    background:${P}; color:#fff;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 8px 28px rgba(127,66,231,.3);
    position:relative; overflow:hidden;
  }
  .submit-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
    background-size:300% auto; animation:shimmer 2.5s linear infinite;
  }
  .submit-btn:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 16px 40px rgba(127,66,231,.42); }
  .submit-btn:disabled { opacity:.45; cursor:not-allowed; transform:none; }

  .ghost-btn {
    width:100%; padding:13px; border-radius:12px;
    border:1.5px solid ${BORDER}; background:${WHITE};
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
    color:${INK2}; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
    transition:all .18s;
  }
  .ghost-btn:hover { border-color:${P}; color:${P}; }

  .spinner {
    width:18px; height:18px; border:2.5px solid rgba(255,255,255,.35);
    border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite;
  }

  /* Timeline */
  .tl-step {
    display:flex; gap:14px; align-items:flex-start;
  }
  .tl-col { display:flex; flex-direction:column; align-items:center; }
  .tl-dot {
    width:12px; height:12px; border-radius:50%; flex-shrink:0; margin-top:4px;
  }
  .tl-line {
    width:2px; flex:1; min-height:24px; margin:4px 0;
  }

  /* Success ring */
  .success-ring {
    width:96px; height:96px; border-radius:50%; background:${GREEN_L};
    display:flex; align-items:center; justify-content:center;
    position:relative;
  }
  .success-ring::before {
    content:''; position:absolute; inset:-7px; border-radius:50%;
    border:2.5px solid ${GREEN}; opacity:.3;
    animation:ringPulse 2.5s ease-in-out infinite 1s;
  }
  .check-anim { animation:successIn .55s cubic-bezier(.34,1.56,.64,1) .2s both; }

  /* Eligibility badge */
  .elig-badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:6px 14px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:600;
  }
  .elig-badge.eligible { background:${GREEN_L}; color:${GREEN_D}; }
  .elig-badge.ineligible { background:${RED_L}; color:${RED}; }
  .elig-badge.partial { background:${AMBER_L}; color:${AMBER}; }

  /* Field label */
  .field-label {
    font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
    color:${INK2}; text-transform:uppercase; letter-spacing:0.09em;
    display:block; margin-bottom:8px;
  }
`;

/* ── MOCK SESSION ─────────────────────────────────────────── */
const SESSION = {
  id:           "INT-2026-8847",
  professional: "Lerato Mokoena",
  role:         "Software Engineer at TechWave",
  avatar:       "https://randomuser.me/api/portraits/women/68.jpg",
  type:         "Mock Interview",
  date:         "Mon 12 May 2026",
  time:         "14:00 SAST",
  duration:     "45 min",
  price:        350,
  platformFee:  35,
  paidAt:       "2026-05-01T10:00:00",
  hoursUntil:   36, // hours until session — determines eligibility
};

const REASONS = [
  { id:"schedule",  label:"Schedule conflict",       desc:"I can no longer attend at this time." },
  { id:"personal",  label:"Personal circumstances",  desc:"Something came up that prevents me from attending." },
  { id:"wrong",     label:"Booked by mistake",       desc:"I accidentally booked the wrong session or professional." },
  { id:"dissatisfied", label:"Not satisfied with booking", desc:"The session details don't match what I expected." },
  { id:"other",     label:"Other reason",            desc:"I'll provide more details below." },
];

const isEligible = SESSION.hoursUntil >= 24;
const isPartial  = SESSION.hoursUntil >= 12 && SESSION.hoursUntil < 24;
const total      = SESSION.price + SESSION.platformFee;
const refundAmt  = isEligible ? total : isPartial ? Math.round(total * 0.5) : 0;

type Step = "review" | "confirm" | "submitted";

/* ── COMPONENT ────────────────────────────────────────────── */
const Refund: React.FC = () => {
  const navigate = useNavigate();

  const [step,        setStep]        = useState<Step>("review");
  const [reason,      setReason]      = useState("");
  const [details,     setDetails]     = useState("");
  const [agreed,      setAgreed]      = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [refId]                       = useState(`REF-${Date.now().toString().slice(-8)}`);

  const canProceed = reason !== "" && (reason !== "other" || details.trim().length > 10);

  const handleSubmit = () => {
    if (!agreed) return;
    setSubmitting(true);
    // 🔥 Replace with real API call
    setTimeout(() => {
      setSubmitting(false);
      setStep("submitted");
    }, 2000);
  };

  /* ── SUBMITTED STATE ─────────────────────────────────────── */
  if (step === "submitted") {
    return (
      <>
        <style>{css}</style>
        <Box sx={{ minHeight:"100vh", background:OFF, display:"flex", flexDirection:"column" }}>

          {/* Nav */}
          <Box sx={{ background:WHITE, borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:6 }, py:2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width:32, height:32, borderRadius:"9px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:17, color:"#fff" }}/>
              </Box>
              <Typography sx={{ fontWeight:700, fontSize:"1.2rem", color:INK }}>inTURN</Typography>
            </Stack>
          </Box>

          <Box sx={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", px:3, py:8 }}>
            <Box sx={{ maxWidth:520, width:"100%", textAlign:"center" }}>

              {/* Success ring */}
              <Box sx={{ display:"flex", justifyContent:"center", mb:4 }}>
                <div className="success-ring">
                  <div className="check-anim">
                    <CheckCircle2 size={46} color={GREEN} strokeWidth={1.5}/>
                  </div>
                </div>
              </Box>

              <Box className="fu">
                <Typography sx={{ fontWeight:900, fontSize:{ xs:"2.2rem", md:"2.8rem" }, color:INK, lineHeight:1.08, letterSpacing:"-0.025em", mb:1.5 }}>
                  Refund requested
                </Typography>
                <Typography sx={{ fontSize:16, color:INK2, lineHeight:1.75, fontWeight:300, mb:4 }}>
                  Your refund request has been submitted. We'll process it and send a confirmation to your email within 24 hours.
                </Typography>
              </Box>

              {/* Summary box */}
              <Box className="fu d1" sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"18px", p:3.5, mb:3, textAlign:"left" }}>
                <Typography sx={{ fontWeight:700, fontSize:"1rem", color:INK, mb:2 }}>
                  Refund summary
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    { label:"Reference",      val:refId, mono:true },
                    { label:"Session",        val:SESSION.type },
                    { label:"Professional",   val:SESSION.professional },
                    { label:"Refund amount",  val:`R${refundAmt.toLocaleString()}` },
                    { label:"Return to",      val:"Original payment method" },
                    { label:"Expected",       val:"3–5 business days" },
                  ].map(({ label, val, mono }) => (
                    <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize:13.5, color:INK2 }}>{label}</Typography>
                      <Typography sx={{ fontSize:13.5, fontWeight:600, color:label==="Refund amount"?GREEN:INK, fontFamily:mono?"'DM Mono',monospace":"'DM Sans',sans-serif" }}>{val}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* Timeline */}
              <Box className="fu d2" sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"18px", p:3.5, mb:4, textAlign:"left" }}>
                <Typography sx={{ fontWeight:700, fontSize:"1rem", color:INK, mb:2.5 }}>
                  What happens next
                </Typography>
                <Stack spacing={0}>
                  {[
                    { label:"Request received",         desc:"Your refund request is queued for review.",         done:true  },
                    { label:"Review within 24h",        desc:"Our team verifies your eligibility and reason.",    done:false },
                    { label:"Refund initiated",         desc:"We send the funds back to your payment method.",   done:false },
                    { label:"Funds in your account",    desc:"Typically 3–5 business days after initiation.",    done:false },
                  ].map((item, i, arr) => (
                    <div key={i} className="tl-step">
                      <div className="tl-col">
                        <Box className="tl-dot" sx={{ background:item.done ? GREEN : BORDER, border:!item.done?`2px solid ${INK3}`:"none" }}/>
                        {i < arr.length-1 && <Box className="tl-line" sx={{ background:`linear-gradient(to bottom,${item.done?GREEN:BORDER},${arr[i+1].done?GREEN:BORDER})` }}/>}
                      </div>
                      <Box pb={2.5}>
                        <Typography sx={{ fontSize:13.5, fontWeight:600, color:item.done?INK:INK2, lineHeight:1.3, mb:.3 }}>{item.label}</Typography>
                        <Typography sx={{ fontSize:13, color:INK3, lineHeight:1.6 }}>{item.desc}</Typography>
                      </Box>
                    </div>
                  ))}
                </Stack>
              </Box>

              <Stack className="fu d3" direction={{ xs:"column", sm:"row" }} spacing={1.5} justifyContent="center">
                <button className="submit-btn" style={{ maxWidth:240 }} onClick={() => navigate("/mentee/interviews")}>
                  Back to my interviews <ArrowRight size={15}/>
                </button>
                <button className="ghost-btn" style={{ maxWidth:200 }} onClick={() => navigate("/professionals")}>
                  Book a new session
                </button>
              </Stack>

            </Box>
          </Box>
        </Box>
      </>
    );
  }

  /* ── MAIN FORM ───────────────────────────────────────────── */
  return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh", background:"#FFFFFF",  }}>
        {/* background:OFF, */}

        {/* ── NAV ─────────────────────────────────────── */}
        <Box sx={{ background:"#FFFFFF", borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:6 }, py:2 }}>
          {/* background:WHITE, */}
          <Box maxWidth="lg" mx="auto" display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width:32, height:32, borderRadius:"9px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:17, color:"#fff" }}/>
              </Box>
              <Typography sx={{ fontWeight:700, fontSize:"1.2rem", color:INK }}>inTURN</Typography>
            </Stack>
            {/* Step indicator */}
            <Stack direction="row" spacing={1} alignItems="center">
              {(["review","confirm"] as Step[]).map((s, i) => (
                <React.Fragment key={s}>
                  <Box sx={{
                    width:28, height:28, borderRadius:"50%",
                    background:step===s||((s==="review"&&step==="confirm"))?P:BORDER,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:700, color:step===s||((s==="review"&&step==="confirm"))?"#fff":INK3,
                    
                  }}>
                    {i+1}
                  </Box>
                  {i === 0 && <Box sx={{ width:24, height:2, background:step==="confirm"?P:BORDER, borderRadius:1 }}/>}
                </React.Fragment>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Back */}
        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} pt={4}>
          <button
            onClick={() => step==="confirm" ? setStep("review") : navigate(-1)}
            style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", fontSize:13.5, color:INK2 }}
          >
            <ArrowLeft size={14}/> {step==="confirm" ? "Back to reason" : "Back"}
          </button>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} py={4}>
          <Grid container spacing={4} alignItems="flex-start">

            {/* ── LEFT: FORM ──────────────────────────── */}
            <Grid item xs={12} md={7}>

              {/* Heading */}
              <Box className="fu" mb={4}>
                <Typography sx={{ fontWeight:700, fontSize:{ xs:"2rem", md:"2.6rem" }, color:INK, lineHeight:1.1, letterSpacing:"-0.02em", mb:.75 }}>
                  {step==="review" ? "Request a refund" : "Confirm your refund"}
                </Typography>
                <Typography sx={{ fontSize:15, color:INK2, lineHeight:1.65, fontWeight:300 }}>
                  {step==="review"
                    ? "Tell us why you're cancelling and we'll process your refund."
                    : "Review the details below before submitting your refund request."
                  }
                </Typography>
              </Box>

              {/* Eligibility banner */}
              <Box className="fu d1" mb={3.5}>
                {isEligible ? (
                  <Box sx={{ background:GREEN_L, border:`1.5px solid #86EFAC`, borderRadius:"14px", p:2.5, display:"flex", gap:1.5, alignItems:"flex-start" }}>
                    <Shield size={16} color={GREEN} style={{ flexShrink:0, marginTop:2 }}/>
                    <Box>
                      <Typography sx={{ fontSize:14, fontWeight:600, color:GREEN_D, mb:.4 }}>
                        Full refund eligible — R{refundAmt.toLocaleString()}
                      </Typography>
                      <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.65 }}>
                        Your session is more than 24 hours away. You're entitled to a full refund of the session fee and platform fee.
                      </Typography>
                    </Box>
                  </Box>
                ) : isPartial ? (
                  <Box sx={{ background:AMBER_L, border:`1.5px solid #FDE68A`, borderRadius:"14px", p:2.5, display:"flex", gap:1.5, alignItems:"flex-start" }}>
                    <AlertTriangle size={16} color={AMBER} style={{ flexShrink:0, marginTop:2 }}/>
                    <Box>
                      <Typography sx={{ fontSize:14, fontWeight:600, color:AMBER, mb:.4 }}>
                        Partial refund — R{refundAmt.toLocaleString()} (50%)
                      </Typography>
                      <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.65 }}>
                        Your session is within 24 hours. Per our policy, only 50% of the total is refundable at this stage.
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ background:RED_L, border:`1.5px solid #FECACA`, borderRadius:"14px", p:2.5, display:"flex", gap:1.5, alignItems:"flex-start" }}>
                    <AlertTriangle size={16} color={RED} style={{ flexShrink:0, marginTop:2 }}/>
                    <Box>
                      <Typography sx={{ fontSize:14, fontWeight:600, color:RED, mb:.4 }}>
                        Not eligible for a refund
                      </Typography>
                      <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.65 }}>
                        Your session starts in less than 12 hours. Unfortunately our policy does not allow refunds at this stage. You can still reschedule.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* STEP 1: REASON SELECTION ─────────────── */}
              {step === "review" && (
                <>
                  <Box className="fu d2" mb={3}>
                    <label className="field-label">Reason for cancellation</label>
                    <Stack spacing={1.25}>
                      {REASONS.map(r => (
                        <div
                          key={r.id}
                          className={`reason-option${reason===r.id?" selected":""}`}
                          onClick={() => setReason(r.id)}
                        >
                          <div className="reason-radio">
                            <div className="reason-dot"/>
                          </div>
                          <Box>
                            <Typography sx={{ fontSize:14, fontWeight:600, color:INK, lineHeight:1.3, mb:.25 }}>{r.label}</Typography>
                            <Typography sx={{ fontSize:13, color:INK2 }}>{r.desc}</Typography>
                          </Box>
                        </div>
                      ))}
                    </Stack>
                  </Box>

                  {/* Additional details */}
                  <Box className="fu d3" mb={3.5}>
                    <label className="field-label">
                      Additional details {reason !== "other" && <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0, opacity:.5 }}>(optional)</span>}
                    </label>
                    <textarea
                      className="ref-textarea"
                      placeholder="Help us improve by sharing more context..."
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                    />
                  </Box>

                  <Box className="fu d4">
                    <button
                      className="submit-btn"
                      disabled={!canProceed}
                      onClick={() => setStep("confirm")}
                    >
                      Continue <ChevronRight size={16}/>
                    </button>
                  </Box>
                </>
              )}

              {/* STEP 2: CONFIRM ─────────────────────── */}
              {step === "confirm" && (
                <>
                  {/* Confirm summary */}
                  <Box className="fu d1" sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"18px", p:3.5, mb:3 }}>
                    <Typography sx={{ fontWeight:700, fontSize:"1rem", color:INK, mb:2 }}>
                      Refund breakdown
                    </Typography>
                    <Stack spacing={1.5}>
                      {[
                        { label:"Session fee",       val:`R${SESSION.price}`,       refundable:isEligible||isPartial },
                        { label:"Platform fee",      val:`R${SESSION.platformFee}`, refundable:isEligible },
                        { label:"Total charged",     val:`R${total}`,               bold:true },
                        { label:"Refund amount",     val:`R${refundAmt}`,           green:true, bold:true },
                      ].map(({ label, val, bold, green, refundable }) => (
                        <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" sx={{ py:.75, borderBottom:`1px solid ${BORDER}`, "&:last-child":{ borderBottom:"none" } }}>
                          <Typography sx={{ fontSize:13.5, color:INK2 }}>{label}</Typography>
                          <Typography sx={{ fontSize:13.5, fontWeight:bold?700:500, color:green?GREEN:INK,  }}>{val}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* Selected reason */}
                  <Box className="fu d2" sx={{ background:P_LITE, borderRadius:"14px", p:2.5, mb:3, display:"flex", gap:1.5 }}>
                    <Info size={15} color={P} style={{ flexShrink:0, marginTop:2 }}/>
                    <Box>
                      <Typography sx={{ fontSize:13, fontWeight:600, color:P, mb:.3 }}>Your reason</Typography>
                      <Typography sx={{ fontSize:13.5, color:INK2 }}>
                        {REASONS.find(r=>r.id===reason)?.label}
                        {details && ` — "${details}"`}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Agreement checkbox */}
                  <Box className="fu d3" sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"14px", p:2.5, mb:3, display:"flex", gap:1.5, alignItems:"flex-start" }}>
                    <Box
                      onClick={() => setAgreed(a=>!a)}
                      sx={{
                        width:22, height:22, borderRadius:"6px", flexShrink:0, mt:.15, cursor:"pointer",
                        border:`2px solid ${agreed?P:BORDER}`,
                        background:agreed?P:"transparent",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        transition:"all .18s",
                      }}
                    >
                      {agreed && <Check size={13} color="#fff"/>}
                    </Box>
                    <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.65, cursor:"pointer" }} onClick={() => setAgreed(a=>!a)}>
                      I understand that cancelling this session is permanent, and the refund of <strong style={{ color:INK }}>R{refundAmt.toLocaleString()}</strong> will be returned to my original payment method within 3–5 business days.
                    </Typography>
                  </Box>

                  <Box className="fu d4">
                    <Stack spacing={1.5}>
                      <button
                        className="submit-btn"
                        disabled={!agreed || submitting}
                        onClick={handleSubmit}
                        style={{ opacity:!agreed?0.45:1 }}
                      >
                        {submitting ? <><div className="spinner"/> Processing...</> : <><Send size={16}/> Submit refund request</>}
                      </button>
                      <button className="ghost-btn" onClick={() => setStep("review")}>
                        <ArrowLeft size={14}/> Go back and edit
                      </button>
                    </Stack>
                  </Box>
                </>
              )}
            </Grid>

            {/* ── RIGHT: SESSION DETAILS ───────────────── */}
            <Grid item xs={12} md={5}>
              <Box className="fu d1" sx={{ position:{ md:"sticky" }, top:24 }}>

                {/* Session card */}
                <Box sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"20px", overflow:"hidden", mb:2.5, boxShadow:"0 4px 24px rgba(0,0,0,.04)" }}>
                  <Box sx={{ background:`linear-gradient(135deg,${P} 0%,#4A1D96 100%)`, px:3, py:2.5 }}>
                    <Typography sx={{ fontWeight:700, fontSize:"1rem", color:"rgba(255,255,255,.65)", mb:.25 }}>Cancelling session</Typography>
                    <Typography sx={{ fontWeight:700, fontSize:"1.4rem", color:"#fff" }}>{SESSION.type}</Typography>
                  </Box>

                  <Box sx={{ px:3, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img src={SESSION.avatar} alt="" style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", border:`2px solid ${BORDER}` }}/>
                      <Box>
                        <Typography sx={{ fontWeight:600, fontSize:14.5, color:INK }}>{SESSION.professional}</Typography>
                        <Typography sx={{ fontSize:12.5, color:INK2 }}>{SESSION.role}</Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ px:3, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Stack spacing={1.5}>
                      {[
                        { icon:<Calendar size={14}/>, label:"Date",     val:SESSION.date },
                        { icon:<Clock size={14}/>,    label:"Time",     val:SESSION.time },
                        { icon:<Video size={14}/>,    label:"Duration", val:SESSION.duration },
                        { icon:<CreditCard size={14}/>,label:"Paid on", val:new Date(SESSION.paidAt).toLocaleDateString("en-ZA",{ day:"numeric", month:"short", year:"numeric" }) },
                      ].map(({ icon, label, val }) => (
                        <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" sx={{ py:.6 }}>
                          <Stack direction="row" spacing={0.75} alignItems="center">
                            <Box sx={{ color:INK3 }}>{icon}</Box>
                            <Typography sx={{ fontSize:13.5, color:INK2 }}>{label}</Typography>
                          </Stack>
                          <Typography sx={{ fontSize:13.5, fontWeight:500, color:INK }}>{val}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  <Box sx={{ px:3, py:2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontWeight:700, fontSize:"1rem", color:INK }}>Refund amount</Typography>
                      <Typography sx={{ fontWeight:700, fontSize:"1.4rem", color:isEligible?GREEN:isPartial?AMBER:RED }}>
                        R{refundAmt.toLocaleString()}
                      </Typography>
                    </Stack>
                    <Box sx={{ display:"flex", justifyContent:"flex-end", mt:.5 }}>
                      <span className={`elig-badge ${isEligible?"eligible":isPartial?"partial":"ineligible"}`}>
                        {isEligible ? <><CheckCircle2 size={12}/> Full refund</> : isPartial ? <><AlertTriangle size={12}/> Partial (50%)</> : <><AlertTriangle size={12}/> Not eligible</>}
                      </span>
                    </Box>
                  </Box>
                </Box>

                {/* Policy note */}
                <Box sx={{ background:P_LITE, borderRadius:"16px", p:2.5, display:"flex", gap:1.5 }}>
                  <Shield size={15} color={P} style={{ flexShrink:0, marginTop:2 }}/>
                  <Box>
                    <Typography sx={{ fontSize:13, fontWeight:600, color:P, mb:.4 }}>Refund policy</Typography>
                    <Stack spacing={0.75}>
                      {[
                        "24h+ before session → Full refund",
                        "12–24h before session → 50% refund",
                        "Under 12h → No refund",
                      ].map(line => (
                        <Typography key={line} sx={{ fontSize:12.5, color:INK2, lineHeight:1.5 }}>· {line}</Typography>
                      ))}
                    </Stack>
                  </Box>
                </Box>

                {/* Need help */}
                <Box sx={{ mt:2, background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"14px", p:2.5, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width:36, height:36, borderRadius:"9px", background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", color:INK2 }}>
                      <HelpCircle size={16}/>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize:13.5, fontWeight:600, color:INK }}>Need help?</Typography>
                      <Typography sx={{ fontSize:12.5, color:INK2 }}>We respond within 24h</Typography>
                    </Box>
                  </Stack>
                  <a href="/support" style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:13, fontWeight:500, color:P, textDecoration:"none",  }}>
                    Contact <ArrowRight size={12}/>
                  </a>
                </Box>

              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Refund;