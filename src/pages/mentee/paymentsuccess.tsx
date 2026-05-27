import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { HandshakeOutlined } from "@mui/icons-material";
import {
  CheckCircle2, Calendar, Clock, Video, User,
  Download, ChevronRight, Star, ArrowRight,
  Mail, Copy, Check, Sparkles,
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
const GREEN_D = "#065F46";

/* ── CSS ─────────────────────────────────────────────────── */
const css = `

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(.5) rotate(-15deg)} to{opacity:1;transform:scale(1) rotate(0)} }
  @keyframes checkDraw { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
  @keyframes ringExpand {
    0%   { transform:scale(.6); opacity:0; }
    50%  { transform:scale(1.15); opacity:.9; }
    100% { transform:scale(1); opacity:1; }
  }
  @keyframes confettiDrop {
    0%   { transform:translateY(-10px) rotate(0deg);    opacity:1; }
    100% { transform:translateY(60px)  rotate(360deg);  opacity:0; }
  }
  @keyframes shimmer   { from{background-position:-300% center} to{background-position:300% center} }
  @keyframes pulse     { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes numberUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  .fu   { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .su   { animation:slideUp .5s cubic-bezier(.22,1,.36,1) both; }
  .d1   { animation-delay:.08s; }
  .d2   { animation-delay:.18s; }
  .d3   { animation-delay:.28s; }
  .d4   { animation-delay:.38s; }
  .d5   { animation-delay:.48s; }
  .d6   { animation-delay:.58s; }
  .d7   { animation-delay:.68s; }
  .d8   { animation-delay:.78s; }

  /* Success ring */
  .success-ring {
    width:110px; height:110px; border-radius:50%;
    background:${GREEN_L};
    display:flex; align-items:center; justify-content:center;
    position:relative;
    animation:ringExpand .7s cubic-bezier(.34,1.56,.64,1) .1s both;
  }
  .success-ring::before {
    content:''; position:absolute; inset:-6px;
    border-radius:50%; border:3px solid ${GREEN};
    opacity:.3; animation:pulse 2.5s ease-in-out infinite 1s;
  }
  .success-ring::after {
    content:''; position:absolute; inset:-14px;
    border-radius:50%; border:2px solid ${GREEN};
    opacity:.12; animation:pulse 2.5s ease-in-out infinite 1.3s;
  }

  .check-icon { animation:scaleIn .5s cubic-bezier(.34,1.56,.64,1) .35s both; }

  /* Confetti pieces */
  .confetti { position:absolute; width:8px; height:8px; border-radius:2px; }

  /* Receipt card */
  .receipt-card {
    background:${WHITE}; border:1.5px solid ${BORDER};
    border-radius:20px; overflow:hidden;
    box-shadow:0 8px 32px rgba(0,0,0,.06);
  }

  /* Reference code */
  .ref-code {
    font-family:'DM Mono',monospace; font-size:18px;
    font-weight:500; color:${P}; letter-spacing:0.12em;
    background:${P_LITE}; border-radius:10px; padding:12px 20px;
    cursor:pointer; transition:all .18s; border:none;
    display:inline-flex; align-items:center; gap:10px;
  }
  .ref-code:hover { background:${P}; color:#fff; }

  /* Next step card */
  .next-card {
    background:${WHITE}; border:1.5px solid ${BORDER};
    border-radius:16px; padding:20px 22px;
    transition:all .22s cubic-bezier(.34,1.56,.64,1);
    cursor:pointer; text-decoration:none; display:block;
  }
  .next-card:hover {
    border-color:${P}; transform:translateY(-3px);
    box-shadow:0 12px 32px rgba(127,66,231,.12);
  }

  /* CTA button */
  .cta-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 28px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500;
    text-decoration:none; border:none; cursor:pointer;
    background:${P}; color:#fff;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 8px 28px rgba(127,66,231,.3);
    position:relative; overflow:hidden;
  }
  .cta-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
    background-size:300% auto;
    animation:shimmer 2.5s linear infinite;
  }
  .cta-btn:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 14px 36px rgba(127,66,231,.42); }

  .cta-ghost {
    display:inline-flex; align-items:center; gap:7px;
    padding:13px 24px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
    text-decoration:none; background:transparent;
    color:${P}; border:1.5px solid ${P};
    transition:all .2s;
  }
  .cta-ghost:hover { background:${P}; color:#fff; transform:translateY(-2px); }

  /* Timeline dot */
  .tl-dot {
    width:10px; height:10px; border-radius:50%;
    background:${GREEN}; flex-shrink:0; margin-top:5px;
    position:relative;
  }
  .tl-dot::after {
    content:''; position:absolute;
    width:1px; background:${BORDER};
    left:50%; transform:translateX(-50%);
    top:14px; bottom:-24px;
  }
`;

/* ── CONFETTI ─────────────────────────────────────────────── */
const CONFETTI_COLORS = [P, "#22C55E", "#F59E0B", "#EF4444", "#06B6D4", P_MID];

const ConfettiPiece = ({ i }: { i: number }) => {
  const left   = `${10 + (i * 12.7) % 80}%`;
  const delay  = `${(i * 0.15) % 1.4}s`;
  const dur    = `${1.2 + (i * 0.18) % 0.8}s`;
  const color  = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
  const shape  = i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "50% 0";
  return (
    <div
      className="confetti"
      style={{
        left, top: "-10px",
        background: color,
        borderRadius: shape,
        animation: `confettiDrop ${dur} ease-in ${delay} both`,
      }}
    />
  );
};

/* ── MOCK DATA ─────────────────────────────────────────────── */
const SESSION = {
  professional: "Lerato Mokoena",
  role:         "Software Engineer at TechWave",
  avatar:       "https://randomuser.me/api/portraits/women/68.jpg",
  type:         "Mock Interview",
  date:         "Mon 12 May 2026",
  time:         "14:00 SAST",
  duration:     "45 min",
  price:        350,
  platformFee:  35,
  ref:          "INT-2026-8847",
  email:        "student@email.com",
};

/* ── COMPONENT ──────────────────────────────────────────────── */
const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [show, setShow]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const copyRef = () => {
    navigator.clipboard.writeText(SESSION.ref).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh", background:"#FFFFFF",}}>
        {/* background:WHITE */}

        {/* ── NAV ─────────────────────────────────────── */}
        <Box sx={{ background:"#FFFFFF", borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:6 }, py:2 }}>
          {/* background:WHITE */}
          <Box maxWidth="lg" mx="auto" display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width:32, height:32, borderRadius:"9px", background:WHITE, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:17, color:WHITE,background:WHITE }}/>
              </Box>
              <Typography sx={{ fontWeight:700, fontSize:"1.2rem", color:WHITE }}>inTURN</Typography>
            </Stack> 
            <Box sx={{ display:"flex", alignItems:"center", gap:.75, background:GREEN_L, borderRadius:100, px:1.75, py:.75 }}>
              <CheckCircle2 size={13} color={GREEN}/>
              <Typography sx={{ fontSize:12.5, fontWeight:600, color:GREEN_D, }}>Payment confirmed</Typography>
            </Box>
          </Box>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} py={{ xs:5, md:8 }}>
          <Grid container spacing={5} alignItems="flex-start">

            {/* ── LEFT: SUCCESS MESSAGE ───────────────── */}
            <Grid item xs={12} md={6}>

              {/* Confetti container */}
              <Box sx={{ position:"relative", display:"flex", justifyContent:"center", mb:4, overflow:"visible", height:120 }}>
                {show && Array.from({ length:12 }).map((_,i) => <ConfettiPiece key={i} i={i}/>)}

                {/* Success ring */}
                <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, pt:1 }}>
                  <div className="success-ring">
                    <div className="check-icon">
                      <CheckCircle2 size={52} color={GREEN} strokeWidth={1.5}/>
                    </div>
                  </div>
                </Box>
              </Box>

              {/* Heading */}
              <Box className="fu" textAlign="center" mb={5}>
                <Typography sx={{ fontWeight:900, fontSize:{ xs:"2.4rem", md:"3.2rem" }, color:INK, lineHeight:1.04, letterSpacing:"-0.025em", mb:1.5 }}>
                  You're all booked!
                </Typography>
                <Typography sx={{ fontSize:{ xs:15, md:16 }, color:INK2, lineHeight:1.75, fontWeight:300, maxWidth:440, mx:"auto" }}>
                  Your session with <strong style={{ color:INK, fontWeight:600 }}>{SESSION.professional}</strong> is confirmed. A confirmation email has been sent to <strong style={{ color:P }}>{SESSION.email}</strong>.
                </Typography>
              </Box>

              {/* Reference code */}
              <Box className="fu d2" textAlign="center" mb={5}>
                <Typography sx={{ fontSize:11.5, fontWeight:600, color:INK3, textTransform:"uppercase", letterSpacing:"0.09em", mb:1.5 }}>
                  Booking reference
                </Typography>
                <button className="ref-code" onClick={copyRef}>
                  {SESSION.ref}
                  {copied ? <Check size={16}/> : <Copy size={16}/>}
                </button>
                <Typography sx={{ fontSize:12, color:INK3, mt:1 }}>
                  {copied ? "Copied!" : "Click to copy"}
                </Typography>
              </Box>

              {/* What's next */}
              <Box className="fu d3" mb={4}>
                <Typography sx={{  fontWeight:700, fontSize:"1.1rem", color:INK, mb:2.5 }}>
                  What happens next?
                </Typography>
                <Stack spacing={0}>
                  {[
                    { title:"Confirmation email sent",     desc:`Check ${SESSION.email} for your booking details and calendar invite.`,           done:true  },
                    { title:"Professional notified",       desc:`${SESSION.professional.split(" ")[0]} has been notified and will confirm shortly.`, done:true  },
                    { title:"Session link emailed to you", desc:"24 hours before your session, you'll receive a secure video call link.",          done:false },
                    { title:"Join your session",           desc:`${SESSION.date} at ${SESSION.time} — just click the link and you're in.`,         done:false },
                  ].map((step, i, arr) => (
                    <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                      <Stack alignItems="center">
                        <Box sx={{
                          width:10, height:10, borderRadius:"50%", mt:.55, flexShrink:0,
                          background: step.done ? GREEN : BORDER,
                          border: step.done ? "none" : `2px solid ${INK3}`,
                          transition:"all .3s", boxShadow: step.done ? `0 0 0 4px ${GREEN_L}` : "none",
                        }}/>
                        {i < arr.length-1 && <Box sx={{ width:1.5, height:36, background:`linear-gradient(to bottom, ${step.done?GREEN:BORDER}, ${arr[i+1].done?GREEN:BORDER})`, mt:.25 }}/>}
                      </Stack>
                      <Box pb={2}>
                        <Typography sx={{ fontSize:14, fontWeight:600, color:step.done?INK:INK2, lineHeight:1.3, mb:.35 }}>{step.title}</Typography>
                        <Typography sx={{ fontSize:13, color:INK3, lineHeight:1.6 }}>{step.desc}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              {/* CTAs */}
              <Box className="fu d4">
                <Stack direction={{ xs:"column", sm:"row" }} spacing={1.5}>
                  <a href="/mentee/interviews" className="cta-btn">
                    View my interviews <ArrowRight size={15}/>
                  </a>
                  <a href="/professionals" className="cta-ghost">
                    Browse more pros
                  </a>
                </Stack>
              </Box>
            </Grid>

            {/* ── RIGHT: RECEIPT ──────────────────────── */}
            <Grid item xs={12} md={6}>
              <Box className="fu d1">

                {/* Receipt card */}
                <div className="receipt-card">
                  {/* Green header */}
                  <Box sx={{ background:`linear-gradient(135deg, ${GREEN} 0%, #047857 100%)`, px:3.5, py:3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography sx={{ fontWeight:700, fontSize:"1rem", color:"rgba(255,255,255,.7)", mb:.25 }}>
                          Payment receipt
                        </Typography>
                        <Typography sx={{  fontSize:12.5, color:"rgba(255,255,255,.55)" }}>
                          {new Date().toLocaleDateString("en-ZA", { day:"numeric", month:"long", year:"numeric" })}
                        </Typography>
                      </Box>
                      <Box sx={{ width:44, height:44, borderRadius:"12px", background:"rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <CheckCircle2 size={22} color="#fff"/>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Professional */}
                  <Box sx={{ px:3.5, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img src={SESSION.avatar} alt="" style={{ width:44, height:44, borderRadius:"50%", objectFit:"cover", border:`2px solid ${BORDER}` }}/>
                      <Box>
                        <Typography sx={{ fontWeight:600, fontSize:14.5, color:INK }}>{SESSION.professional}</Typography>
                        <Typography sx={{ fontSize:12.5, color:INK2 }}>{SESSION.role}</Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Details */}
                  <Box sx={{ px:3.5, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Stack spacing={1.5}>
                      {[
                        { label:"Session type", val:SESSION.type },
                        { label:"Date",         val:SESSION.date },
                        { label:"Time",         val:SESSION.time },
                        { label:"Duration",     val:SESSION.duration },
                        { label:"Reference",    val:SESSION.ref, mono:true },
                      ].map(({ label, val,  }) => (
                        <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
                          <Typography sx={{ fontSize:13.5, color:INK2 }}>{label}</Typography>
                          <Typography sx={{ fontSize:13.5, fontWeight:500, color:INK, }}>{val}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* Pricing */}
                  <Box sx={{ px:3.5, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Stack spacing={1.25}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize:13.5, color:INK2 }}>Session fee</Typography>
                        <Typography sx={{ fontSize:13.5, color:INK }}>R{SESSION.price}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize:13.5, color:INK2 }}>Platform fee</Typography>
                        <Typography sx={{ fontSize:13.5, color:INK }}>R{SESSION.platformFee}</Typography>
                      </Stack>
                      <Box sx={{ height:1, background:BORDER }}/>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontWeight:700, fontSize:"1.05rem", color:INK }}>Total paid</Typography>
                        <Typography sx={{fontWeight:700, fontSize:"1.4rem", color:GREEN }}>
                          R{(SESSION.price + SESSION.platformFee).toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  {/* Status */}
                  <Box sx={{ px:3.5, py:2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize:13, color:INK2 }}>Payment status</Typography>
                      <Box sx={{ display:"flex", alignItems:"center", gap:.75, background:GREEN_L, borderRadius:100, px:1.5, py:.5 }}>
                        <CheckCircle2 size={12} color={GREEN}/>
                        <Typography sx={{ fontSize:12, fontWeight:700, color:GREEN_D,  }}>Paid</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </div>

                {/* Download receipt */}
                <Box className="fu d3" mt={2}>
                  <button
                    style={{
                      width:"100%", padding:"12px", borderRadius:12,
                      border:`1.5px solid ${BORDER}`, background:WHITE,
                      fontSize:14, fontWeight:500,
                      color:INK2, cursor:"pointer", display:"flex",
                      alignItems:"center", justifyContent:"center", gap:8,
                      transition:"all .18s",
                    }}
                    onMouseEnter={e => { (e.target as any).style.borderColor=P; (e.target as any).style.color=P; }}
                    onMouseLeave={e => { (e.target as any).style.borderColor=BORDER; (e.target as any).style.color=INK2; }}
                  >
                    <Download size={15}/> Download receipt
                  </button>
                </Box>

                {/* Rate your pro prompt */}
                <Box className="fu d4" mt={2} sx={{ background:P_LITE, borderRadius:"16px", p:3, display:"flex", gap:2, alignItems:"center" }}>
                  <Box sx={{ width:40, height:40, borderRadius:"50%", background:P_LITE, border:`2px solid ${P}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Sparkles size={18} color={P}/>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize:13.5, fontWeight:600, color:P, mb:.3 }}>
                      After your session
                    </Typography>
                    <Typography sx={{ fontSize:12.5, color:INK2, lineHeight:1.6 }}>
                      You'll be prompted to rate and review {SESSION.professional.split(" ")[0]}. Your feedback helps other students.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PaymentSuccess;