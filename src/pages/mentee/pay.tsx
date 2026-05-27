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

// const PaySession = () => {
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
//         Pay Session
//     </Box>
//   )
// }

// export default PaySession







import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { HandshakeOutlined } from "@mui/icons-material";
import {
  Lock, CreditCard, Calendar, Shield, CheckCircle2,
  ChevronRight, Star, Clock, Video, User, ArrowLeft,
  Sparkles, AlertCircle,
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
const GREEN_L= "#ECFDF5";
const RED    = "#DC2626";
const RED_L  = "#FEF2F2";

/* ── STYLES ─────────────────────────────────────────────── */
const css = `
  
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn  { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
  @keyframes shimmer  { from{background-position:-300% center} to{background-position:300% center} }
  @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cardFlip { from{transform:rotateY(0)} to{transform:rotateY(10deg)} }

  .fu  { animation: fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
  .si  { animation: slideIn .5s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.06s; } .d2 { animation-delay:.12s; }
  .d3  { animation-delay:.18s; } .d4 { animation-delay:.24s; }
  .d5  { animation-delay:.30s; } .d6 { animation-delay:.36s; }

  /* Card input */
  .field-wrap {
    display:flex; flex-direction:column; gap:7px;
  }
  .field-label {
    font-family:'DM Sans',sans-serif;
    font-size:11.5px; font-weight:600;
    color:${INK2}; text-transform:uppercase; letter-spacing:0.09em;
  }
  .field-input {
    width:100%; padding:13px 16px;
    border:1.5px solid ${BORDER}; border-radius:12px;
    font-family:'DM Mono',monospace; font-size:15px; color:${INK};
    background:${WHITE}; outline:none;
    transition:border-color .18s, box-shadow .18s;
    -webkit-appearance:none;
  }
  .field-input:focus { border-color:${P}; box-shadow:0 0 0 4px rgba(127,66,231,.1); }
  .field-input.error { border-color:${RED}; box-shadow:0 0 0 4px rgba(220,38,38,.08); }
  .field-input::placeholder { color:${INK3}; opacity:.7; font-family:'DM Mono',monospace; }

  /* Credit card visual */
  .card-visual {
    width:100%; height:180px; border-radius:18px;
    background:linear-gradient(135deg, ${P} 0%, #4A1D96 60%, #2D1158 100%);
    position:relative; overflow:hidden;
    box-shadow:0 20px 60px rgba(127,66,231,.35);
    transition:transform .3s cubic-bezier(.34,1.56,.64,1);
  }
  .card-visual:hover { transform:translateY(-4px) rotate(0.5deg); }
  .card-chip {
    width:40px; height:30px; border-radius:6px;
    background:linear-gradient(135deg,#f0d060 0%,#c8a020 100%);
    position:absolute; top:48px; left:28px;
    display:grid; grid-template-columns:1fr 1fr; gap:2px; padding:4px;
  }
  .card-chip-cell {
    background:rgba(160,120,0,.35); border-radius:2px;
  }
  .card-number-display {
    position:absolute; bottom:52px; left:28px; right:28px;
    font-family:'DM Mono',monospace; font-size:16px;
    color:rgba(255,255,255,.9); letter-spacing:0.2em;
  }
  .card-holder-display {
    position:absolute; bottom:24px; left:28px;
    font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500;
    color:rgba(255,255,255,.65); text-transform:uppercase; letter-spacing:0.12em;
  }
  .card-expiry-display {
    position:absolute; bottom:24px; right:28px;
    font-family:'DM Mono',monospace; font-size:12px;
    color:rgba(255,255,255,.65);
  }
  .card-brand {
    position:absolute; top:24px; right:24px;
    width:44px; height:28px; display:flex; align-items:center; justify-content:center;
  }

  /* Pay button */
  .pay-btn {
    width:100%; padding:17px; border:none;
    border-radius:14px; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:16px; font-weight:600;
    background:${P}; color:#fff;
    display:flex; align-items:center; justify-content:center; gap:10px;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    position:relative; overflow:hidden;
    box-shadow:0 8px 32px rgba(127,66,231,.35);
  }
  .pay-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
    background-size:300% auto;
    animation:shimmer 2.5s linear infinite;
  }
  .pay-btn:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 16px 40px rgba(127,66,231,.45); }
  .pay-btn:active { transform:translateY(0); }
  .pay-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
  .pay-btn.loading { pointer-events:none; }

  /* Spinner */
  .spinner {
    width:18px; height:18px; border:2.5px solid rgba(255,255,255,.3);
    border-top-color:#fff; border-radius:50%;
    animation:spin .7s linear infinite;
  }

  /* Trust badge */
  .trust-badge {
    display:inline-flex; align-items:center; gap:6px;
    font-family:'DM Sans',sans-serif; font-size:12.5px; color:${INK2};
  }

  /* Summary card */
  .summary-card {
    background:${WHITE}; border:1.5px solid ${BORDER};
    border-radius:20px; overflow:hidden;
    box-shadow:0 4px 24px rgba(0,0,0,.04);
  }

  /* Payment method tabs */
  .method-tab {
    flex:1; padding:11px 8px; border:1.5px solid ${BORDER};
    border-radius:11px; cursor:pointer; background:${WHITE};
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    color:${INK2}; transition:all .18s;
    display:flex; flex-direction:column; align-items:center; gap:4px;
  }
  .method-tab.active {
    border-color:${P}; background:${P_LITE}; color:${P};
    box-shadow:0 0 0 3px rgba(127,66,231,.1);
  }
  .method-tab:hover:not(.active) { border-color:${P_MID}; }

  /* Secure indicator */
  .secure-bar {
    display:flex; align-items:center; justify-content:center; gap:8px;
    padding:10px; background:${GREEN_L};
    border-radius:10px;
    font-family:'DM Sans',sans-serif; font-size:12.5px;
    color:${GREEN}; font-weight:500;
  }

  /* Card decoration circles */
  .card-circle-1 {
    position:absolute; width:200px; height:200px; border-radius:50%;
    background:rgba(255,255,255,.06); top:-60px; right:-40px;
  }
  .card-circle-2 {
    position:absolute; width:140px; height:140px; border-radius:50%;
    background:rgba(255,255,255,.04); bottom:-30px; left:60px;
  }

  /* Field error */
  .field-error {
    font-family:'DM Sans',sans-serif; font-size:12px; color:${RED};
    display:flex; align-items:center; gap:5px; margin-top:-2px;
  }
`;

/* ── CARD NUMBER FORMATTER ──────────────────────────────── */
const formatCard = (v: string) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

/* ── VISA / MC DETECT ───────────────────────────────────── */
const detectCard = (n: string) => {
  const num = n.replace(/\s/g, "");
  if (/^4/.test(num)) return "visa";
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return "mastercard";
  return null;
};

/* ── MOCK SESSION DATA ──────────────────────────────────── */
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
  rating:       4.9,
  reviews:      48,
};

/* ── COMPONENT ───────────────────────────────────────────── */
const PaySession: React.FC = () => {
  const navigate = useNavigate();

  const [method, setMethod]     = useState<"card"|"eft">("card");
  const [cardNum, setCardNum]   = useState("");
  const [holder, setHolder]     = useState("");
  const [expiry, setExpiry]     = useState("");
  const [cvv, setCvv]           = useState("");
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState<Record<string,string>>({});
  const [cvvFocus, setCvvFocus] = useState(false);

  const cardType = detectCard(cardNum);

  const displayNum = cardNum || "•••• •••• •••• ••••";
  const displayExp = expiry || "MM/YY";
  const displayHolder = holder.toUpperCase() || "FULL NAME";

  const validate = () => {
    const e: Record<string,string> = {};
    if (cardNum.replace(/\s/g,"").length < 16) e.cardNum = "Enter a valid 16-digit card number";
    if (!holder.trim()) e.holder = "Cardholder name is required";
    if (expiry.length < 5) e.expiry = "Enter a valid expiry date";
    if (cvv.length < 3) e.cvv = "Enter a valid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setLoading(true);
    // 🔥 Replace with Stripe / PayFast API call
    setTimeout(() => {
      // Simulate 85% success, 15% decline for demo
      const success = Math.random() > 0.15;
      navigate(success ? "/payment/success" : "/payment/declined", {
        state: { session: SESSION },
      });
    }, 2200);
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh", background:WHITE }}>

        {/* ── NAV ─────────────────────────────────────── */}
        <Box sx={{ background:WHITE, borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:6 }, py:2 }}>
          <Box maxWidth="lg" mx="auto" display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width:32, height:32, borderRadius:"9px", background:WHITE, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:17, color:WHITE,background:WHITE }}/>
              </Box>
              <Typography sx={{ fontWeight:700, fontSize:"1.2rem", color:WHITE }}>inTURN</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Lock size={14} color={GREEN}/>
              <Typography sx={{ fontSize:13, color:INK2 }}>Secure checkout</Typography>
            </Stack>
          </Box>
        </Box>

        {/* ── BACK ─────────────────────────────────────── */}
        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} pt={4}>
          <button
            onClick={() => navigate(-1)}
            style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", fontSize:13.5, color:INK2 }}
          >
            <ArrowLeft size={14}/> Back
          </button>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} py={4}>
          <Grid container spacing={4} alignItems="flex-start">

            {/* ── LEFT: PAYMENT FORM ──────────────────── */}
            <Grid item xs={12} md={7}>

              {/* Heading */}
              <Box className="fu" mb={4}>
                <Typography sx={{ fontWeight:700, fontSize:{ xs:"2rem", md:"2.6rem" }, color:INK, lineHeight:1.1, letterSpacing:"-0.02em", mb:.75 }}>
                  Complete your booking
                </Typography>
                <Typography sx={{ fontSize:15, color:INK2, lineHeight:1.6, fontWeight:300 }}>
                  You're one step away from your session with {SESSION.professional}.
                </Typography>
              </Box>

              {/* Secure bar */}
              <Box className="fu d1" mb={3}>
                <div className="secure-bar">
                  <Shield size={14}/>
                  256-bit SSL encryption · PCI DSS compliant · Powered by Stripe
                </div>
              </Box>

              {/* Payment method tabs */}
              <Box className="fu d2" mb={3}>
                <Typography sx={{ fontSize:11.5, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.09em", mb:1.25 }}>
                  Payment method
                </Typography>
                <Stack direction="row" spacing={1.25}>
                  <button
                    className={`method-tab${method==="card"?" active":""}`}
                    onClick={() => setMethod("card")}
                  >
                    <CreditCard size={18}/>
                    Credit / Debit
                  </button>
                  <button
                    className={`method-tab${method==="eft"?" active":""}`}
                    onClick={() => setMethod("eft")}
                  >
                    <Box sx={{ fontSize:14, fontWeight:600, color:"inherit" }}>EFT</Box>
                    Instant EFT
                  </button>
                  <button className="method-tab" style={{ opacity:.45, cursor:"not-allowed" }}>
                    <Box sx={{ fontSize:12 }}>PayPal</Box>
                    Coming soon
                  </button>
                </Stack>
              </Box>

              {/* Card form */}
              {method === "card" && (
                <Box>
                  {/* Visual card */}
                  <Box className="fu d2" mb={3.5}>
                    <div className="card-visual" style={{ transform:cvvFocus?"rotateY(180deg)":"none", transition:"transform .5s" }}>
                      <div className="card-circle-1"/>
                      <div className="card-circle-2"/>
                      {/* Back of card (CVV) */}
                      {cvvFocus ? (
                        <Box sx={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"center", transform:"rotateY(180deg)" }}>
                          <Box sx={{ height:40, background:"rgba(0,0,0,0.35)", mx:0, mt:3 }}/>
                          <Box sx={{ mx:"auto", mt:2, width:"60%", height:32, background:"rgba(255,255,255,.85)", borderRadius:4, display:"flex", alignItems:"center", px:2 }}>
                            <Typography sx={{ fontSize:16, color:INK, letterSpacing:"0.2em" }}>
                              {cvv || "•••"}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize:11, color:"rgba(255,255,255,.5)", textAlign:"center", mt:1,  }}>CVV</Typography>
                        </Box>
                      ) : (
                        <>
                          <div className="card-chip">
                            <div className="card-chip-cell"/><div className="card-chip-cell"/>
                            <div className="card-chip-cell"/><div className="card-chip-cell"/>
                          </div>
                          <Box className="card-brand">
                            {cardType === "visa" && (
                              <Typography sx={{ fontStyle:"italic", fontWeight:700, fontSize:22, color:"#fff" }}>VISA</Typography>
                            )}
                            {cardType === "mastercard" && (
                              <Stack direction="row">
                                <Box sx={{ width:22, height:22, borderRadius:"50%", background:"#EB001B", opacity:.9 }}/>
                                <Box sx={{ width:22, height:22, borderRadius:"50%", background:"#F79E1B", opacity:.9, ml:-1 }}/>
                              </Stack>
                            )}
                            {!cardType && (
                              <CreditCard size={22} color="rgba(255,255,255,0.4)"/>
                            )}
                          </Box>
                          <div className="card-number-display">{displayNum}</div>
                          <div className="card-holder-display">{displayHolder}</div>
                          <div className="card-expiry-display">{displayExp}</div>
                        </>
                      )}
                    </div>
                  </Box>

                  {/* Fields */}
                  <Box className="fu d3" sx={{ background:WHITE, borderRadius:"18px", border:`1.5px solid ${BORDER}`, p:{ xs:3, md:3.5 } }}>
                    <Stack spacing={2.5}>
                      {/* Card number */}
                      <div className="field-wrap">
                        <label className="field-label">Card number</label>
                        <Box sx={{ position:"relative" }}>
                          <input
                            className={`field-input${errors.cardNum?" error":""}`}
                            style={{ paddingRight:52 }}
                            placeholder="0000 0000 0000 0000"
                            value={cardNum}
                            onChange={e => setCardNum(formatCard(e.target.value))}
                            inputMode="numeric"
                          />
                          <Box sx={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
                            {cardType === "visa" && <Typography sx={{ fontStyle:"italic", fontWeight:700, fontSize:15, color:INK2 }}>VISA</Typography>}
                            {cardType === "mastercard" && (
                              <Stack direction="row">
                                <Box sx={{ width:18, height:18, borderRadius:"50%", background:"#EB001B" }}/>
                                <Box sx={{ width:18, height:18, borderRadius:"50%", background:"#F79E1B", ml:-0.75 }}/>
                              </Stack>
                            )}
                            {!cardType && <CreditCard size={16} color={INK3}/>}
                          </Box>
                        </Box>
                        {errors.cardNum && <span className="field-error"><AlertCircle size={12}/>{errors.cardNum}</span>}
                      </div>

                      {/* Holder */}
                      <div className="field-wrap">
                        <label className="field-label">Cardholder name</label>
                        <input
                          className={`field-input${errors.holder?" error":""}`}
                          
                          placeholder="Full name as on card"
                          value={holder}
                          onChange={e => setHolder(e.target.value)}
                        />
                        {errors.holder && <span className="field-error"><AlertCircle size={12}/>{errors.holder}</span>}
                      </div>

                      {/* Expiry + CVV */}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <div className="field-wrap">
                            <label className="field-label">Expiry date</label>
                            <input
                              className={`field-input${errors.expiry?" error":""}`}
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={e => setExpiry(formatExpiry(e.target.value))}
                              inputMode="numeric"
                            />
                            {errors.expiry && <span className="field-error"><AlertCircle size={12}/>{errors.expiry}</span>}
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div className="field-wrap">
                            <label className="field-label">CVV / CVC</label>
                            <input
                              className={`field-input${errors.cvv?" error":""}`}
                              placeholder="•••"
                              value={cvv}
                              onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))}
                              onFocus={() => setCvvFocus(true)}
                              onBlur={() => setCvvFocus(false)}
                              inputMode="numeric"
                              type="password"
                            />
                            {errors.cvv && <span className="field-error"><AlertCircle size={12}/>{errors.cvv}</span>}
                          </div>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Box>
                </Box>
              )}

              {/* EFT placeholder */}
              {method === "eft" && (
                <Box className="fu d2" sx={{ background:WHITE, borderRadius:"18px", border:`1.5px solid ${BORDER}`, p:4, textAlign:"center" }}>
                  <Box sx={{ width:52, height:52, borderRadius:"14px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
                    <Sparkles size={22} color={P}/>
                  </Box>
                  <Typography sx={{ fontWeight:600, fontSize:"1.1rem", color:INK, mb:.75 }}>Instant EFT</Typography>
                  <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7 }}>
                    Pay directly from your South African bank account via Peach Payments instant EFT. You'll be redirected to your bank's secure portal.
                  </Typography>
                </Box>
              )}

              {/* Pay button */}
              <Box className="fu d4" mt={3}>
                <button
                  className={`pay-btn${loading?" loading":""}`}
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"/>
                      Processing payment...
                    </>
                  ) : (
                    <>
                      <Lock size={17}/>
                      Pay R{(SESSION.price + SESSION.platformFee).toLocaleString()} · Secure checkout
                    </>
                  )}
                </button>
              </Box>

              {/* Trust signals */}
              <Box className="fu d5" mt={2.5}>
                <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
                  {[
                    { icon:<Shield size={13} color={GREEN}/>,      text:"SSL Encrypted" },
                    { icon:<CheckCircle2 size={13} color={GREEN}/>, text:"PCI Compliant" },
                    { icon:<Lock size={13} color={GREEN}/>,         text:"24h Refund window" },
                  ].map(({ icon, text }) => (
                    <span key={text} className="trust-badge">{icon} {text}</span>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* ── RIGHT: ORDER SUMMARY ─────────────────── */}
            <Grid item xs={12} md={5}>
              <Box className="fu d1" sx={{ position:{ md:"sticky" }, top:24 }}>

                <div className="summary-card">
                  {/* Header */}
                  <Box sx={{ background:`linear-gradient(135deg, ${P} 0%, #4A1D96 100%)`, px:3, py:3 }}>
                    <Typography sx={{ fontWeight:700, fontSize:"1rem", color:"rgba(255,255,255,.65)", mb:.5 }}>
                      Order summary
                    </Typography>
                    <Typography sx={{ fontWeight:700, fontSize:"1.5rem", color:"#fff", letterSpacing:"-0.01em" }}>
                      {SESSION.type}
                    </Typography>
                  </Box>

                  {/* Professional */}
                  <Box sx={{ px:3, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ position:"relative" }}>
                        <img src={SESSION.avatar} alt={SESSION.professional} style={{ width:48, height:48, borderRadius:"50%", objectFit:"cover", border:`2px solid ${BORDER}` }}/>
                        <Box sx={{ position:"absolute", bottom:-2, right:-2, width:16, height:16, borderRadius:"50%", background:GREEN, border:`2px solid #fff`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Box sx={{ width:6, height:6, borderRadius:"50%", background:"#fff" }}/>
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight:600, fontSize:15, color:INK }}>{SESSION.professional}</Typography>
                        <Typography sx={{ fontSize:12.5, color:INK2 }}>{SESSION.role}</Typography>
                        <Stack direction="row" spacing=".5" alignItems="center" mt={.25}>
                          <Star size={12} fill={P} color={P}/>
                          <Typography sx={{ fontSize:12, fontWeight:600, color:INK }}>{SESSION.rating}</Typography>
                          <Typography sx={{ fontSize:12, color:INK3 }}>({SESSION.reviews} reviews)</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Session details */}
                  <Box sx={{ px:3, py:2.5, borderBottom:`1px solid ${BORDER}` }}>
                    <Typography sx={{ fontSize:11.5, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.08em", mb:1.75 }}>Session details</Typography>
                    <Stack spacing={1.5}>
                      {[
                        { icon:<Video size={14}/>,    label:"Type",     val:SESSION.type },
                        { icon:<Calendar size={14}/>, label:"Date",     val:SESSION.date },
                        { icon:<Clock size={14}/>,    label:"Time",     val:SESSION.time },
                        { icon:<Clock size={14}/>,    label:"Duration", val:SESSION.duration },
                      ].map(({ icon, label, val }) => (
                        <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ color:INK3 }}>{icon}</Box>
                            <Typography sx={{ fontSize:13.5, color:INK2 }}>{label}</Typography>
                          </Stack>
                          <Typography sx={{ fontSize:13.5, fontWeight:500, color:INK }}>{val}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* Pricing breakdown */}
                  <Box sx={{ px:3, py:2.5 }}>
                    <Stack spacing={1.25}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize:13.5, color:INK2 }}>Session fee</Typography>
                        <Typography sx={{ fontSize:13.5, color:INK }}>R{SESSION.price}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize:13.5, color:INK2 }}>Platform fee (10%)</Typography>
                        <Typography sx={{ fontSize:13.5, color:INK }}>R{SESSION.platformFee}</Typography>
                      </Stack>
                      <Box sx={{ height:1, background:BORDER, my:.5 }}/>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontWeight:700, fontSize:"1.1rem", color:INK }}>Total</Typography>
                        <Typography sx={{ fontWeight:700, fontSize:"1.4rem", color:P }}>
                          R{(SESSION.price + SESSION.platformFee).toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </div>

                {/* Refund policy */}
                <Box mt={2} sx={{ background:P_LITE, borderRadius:"14px", p:2.5, display:"flex", gap:1.5, alignItems:"flex-start" }}>
                  <Shield size={15} color={P} style={{ flexShrink:0, marginTop:2 }}/>
                  <Box>
                    <Typography sx={{ fontSize:13, fontWeight:600, color:P, mb:.4 }}>Full refund guarantee</Typography>
                    <Typography sx={{ fontSize:12.5, color:INK2, lineHeight:1.6 }}>
                      Cancel more than 24 hours before your session for a complete refund — no questions asked.
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

export default PaySession;