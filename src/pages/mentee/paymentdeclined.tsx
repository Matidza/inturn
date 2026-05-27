import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { HandshakeOutlined } from "@mui/icons-material";
import {
  XCircle, RefreshCw, CreditCard, Phone, Lock,
  ChevronRight, AlertTriangle, ArrowLeft, Shield,
  Wifi, Clock, HelpCircle, ArrowRight,
} from "lucide-react";

/* ── TOKENS ─────────────────────────────────────────────── */
const INK    = "#0A0A0F";
const INK2   = "#52526A";
const INK3   = "#9898B0";
const OFF    = "#F8F7FC";
const WHITE  = "#FFFFFF";
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const BORDER = "#E5E3F0";
const RED    = "#DC2626";
const RED_MID= "#EF4444";
const RED_L  = "#FEF2F2";
const RED_D  = "#7F1D1D";
const AMBER  = "#D97706";
const AMBER_L= "#FFFBEB";

/* ── CSS ─────────────────────────────────────────────────── */
const css = `
  
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shakeX {
    0%,100%{transform:translateX(0)}
    15%{transform:translateX(-8px)}
    30%{transform:translateX(7px)}
    45%{transform:translateX(-5px)}
    60%{transform:translateX(4px)}
    75%{transform:translateX(-2px)}
  }
  @keyframes ringShake {
    0%{transform:scale(.5) rotate(-20deg);opacity:0}
    50%{transform:scale(1.1) rotate(3deg);opacity:1}
    75%{transform:scale(.97) rotate(-1deg)}
    100%{transform:scale(1) rotate(0);opacity:1}
  }
  @keyframes pulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.07)} }
  @keyframes spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes shimmer { from{background-position:-300% center} to{background-position:300% center} }

  .fu  { animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.06s; } .d2 { animation-delay:.14s; }
  .d3  { animation-delay:.22s; } .d4 { animation-delay:.30s; }
  .d5  { animation-delay:.38s; } .d6 { animation-delay:.46s; }

  .decline-ring {
    width:110px; height:110px; border-radius:50%;
    background:${RED_L};
    display:flex; align-items:center; justify-content:center;
    position:relative;
    animation:ringShake .7s cubic-bezier(.34,1.56,.64,1) .1s both;
  }
  .decline-ring::before {
    content:''; position:absolute; inset:-6px;
    border-radius:50%; border:3px solid ${RED_MID};
    opacity:.25; animation:pulse 2.5s ease-in-out infinite 1s;
  }

  .x-icon { animation:shakeX .6s ease .5s both; }

  /* Reason card */
  .reason-card {
    border:1.5px solid #FECACA; border-radius:16px;
    background:${RED_L}; padding:20px 22px;
  }

  /* Fix card */
  .fix-card {
    border:1.5px solid ${BORDER}; border-radius:14px;
    background:${WHITE}; padding:18px 20px;
    display:flex; gap:14px; align-items:flex-start;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    cursor:default;
  }
  .fix-card:hover { border-color:${P_MID}; transform:translateY(-2px); box-shadow:0 8px 24px rgba(127,66,231,.08); }

  .fix-icon {
    width:40px; height:40px; border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
  }

  /* Retry button */
  .retry-btn {
    width:100%; padding:16px; border:none;
    border-radius:14px; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
    background:${P}; color:#fff;
    display:flex; align-items:center; justify-content:center; gap:9px;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
    box-shadow:0 8px 28px rgba(127,66,231,.3);
    position:relative; overflow:hidden;
  }
  .retry-btn::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    background-size:300% auto;
    animation:shimmer 2.5s linear infinite;
  }
  .retry-btn:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 16px 40px rgba(127,66,231,.4); }
  .retry-btn.loading { pointer-events:none; }

  .alt-btn {
    width:100%; padding:13px; border-radius:12px;
    border:1.5px solid ${BORDER}; background:${WHITE};
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
    color:${INK2}; cursor:pointer;
    display:flex; align-items:center; justify-content:center; gap:8px;
    transition:all .18s;
  }
  .alt-btn:hover { border-color:${P}; color:${P}; }

  .spinner { width:18px; height:18px; border:2.5px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; }

  /* Decline code */
  .decline-code {
    font-family:'DM Mono',monospace; font-size:13px;
    background:#FEE2E2; color:${RED}; border-radius:8px;
    padding:4px 10px; letter-spacing:0.06em;
  }
`;

/* ── DECLINE REASONS ─────────────────────────────────────── */
const REASONS = [
  { code:"INSUFFICIENT_FUNDS",  label:"Insufficient funds",      icon:<CreditCard size={16}/>, color:AMBER, bg:AMBER_L, explain:"Your card didn't have enough available balance for this transaction." },
  { code:"CARD_DECLINED",       label:"Card declined by bank",   icon:<XCircle size={16}/>,    color:RED,   bg:RED_L,   explain:"Your bank declined this transaction. This is often a temporary security hold." },
  { code:"EXPIRED_CARD",        label:"Card expired",            icon:<Clock size={16}/>,       color:AMBER, bg:AMBER_L, explain:"The expiry date on your card may have passed. Try a newer card." },
  { code:"NETWORK_ERROR",       label:"Network error",           icon:<Wifi size={16}/>,        color:AMBER, bg:AMBER_L, explain:"We couldn't communicate with your bank. This is usually temporary." },
];

// In production, get this from location.state or API response
const MOCK_REASON = REASONS[1];

const FIXES = [
  { icon:<CreditCard size={17}/>, iconBg:P_LITE, iconColor:P, title:"Use a different card",     desc:"Try another credit or debit card with sufficient funds." },
  { icon:<Phone size={17}/>,      iconBg:AMBER_L, iconColor:AMBER, title:"Contact your bank",    desc:"Your bank may have flagged this as unusual. A quick call usually resolves it." },
  { icon:<RefreshCw size={17}/>,  iconBg:"#ECFDF5", iconColor:"#059669", title:"Try again shortly", desc:"Sometimes a brief wait of a few minutes resolves temporary network holds." },
];

/* ── COMPONENT ────────────────────────────────────────────── */
const PaymentDeclined: React.FC = () => {
  const navigate = useNavigate();
  const [retrying, setRetrying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    if (countdown <= 0) { setShowCountdown(false); return; }
    const id = setTimeout(() => setCountdown(c => c-1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => navigate("/payment"), 1000);
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh",background:"#FFFFFF" }}>
        {/* ,background:WHITE */}

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
            <Box sx={{ display:"flex", alignItems:"center", gap:.75, background:RED_L, borderRadius:100, px:1.75, py:.75 }}>
              <XCircle size={13} color={RED}/>
              <Typography sx={{ fontSize:12.5, fontWeight:600, color:RED_D, }}>Payment declined</Typography>
            </Box>
          </Box>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} py={{ xs:5, md:8 }}>
          <Grid container spacing={5} alignItems="flex-start">

            {/* ── LEFT ─────────────────────────────────── */}
            <Grid item xs={12} md={6}>

              {/* Decline icon */}
              <Box className="fu" sx={{ display:"flex", justifyContent:"center", mb:4 }}>
                <div className="decline-ring">
                  <div className="x-icon">
                    <XCircle size={52} color={RED} strokeWidth={1.5}/>
                  </div>
                </div>
              </Box>

              {/* Heading */}
              <Box className="fu d1" textAlign="center" mb={4}>
                <Typography sx={{ fontWeight:900, fontSize:{ xs:"2.2rem", md:"2.9rem" }, color:INK, lineHeight:1.08, letterSpacing:"-0.025em", mb:1.5 }}>
                  Payment was declined
                </Typography>
                <Typography sx={{ fontSize:15, color:INK2, lineHeight:1.75, fontWeight:300, maxWidth:420, mx:"auto" }}>
                  Don't worry — your booking is still held for you. No charges were made to your card. Let's get this sorted.
                </Typography>
              </Box>

              {/* Decline reason */}
              <Box className="fu d2" mb={3.5}>
                <div className="reason-card">
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Box sx={{ width:38, height:38, borderRadius:"9px", background:"rgba(220,38,38,.12)", display:"flex", alignItems:"center", justifyContent:"center", color:RED, flexShrink:0 }}>
                      {MOCK_REASON.icon}
                    </Box>
                    <Box flex={1}>
                      <Stack direction="row" spacing={1.25} alignItems="center" mb={0.5}>
                        <Typography sx={{ fontSize:14, fontWeight:600, color:RED_D }}>{MOCK_REASON.label}</Typography>
                        <span className="decline-code">{MOCK_REASON.code}</span>
                      </Stack>
                      <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.65 }}>
                        {MOCK_REASON.explain}
                      </Typography>
                    </Box>
                  </Stack>
                </div>
              </Box>

              {/* Retry countdown */}
              {showCountdown && (
                <Box className="fu d2" sx={{ background:AMBER_L, borderRadius:"12px", px:2.5, py:1.5, display:"flex", justifyContent:"space-between", alignItems:"center", mb:3.5, border:`1px solid #FDE68A` }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AlertTriangle size={14} color={AMBER}/>
                    <Typography sx={{ fontSize:13, color:AMBER, fontWeight:500 }}>Booking held for</Typography>
                  </Stack>
                  <Typography sx={{ fontSize:15, fontWeight:600, color:AMBER }}>
                    {String(Math.floor(countdown/60)).padStart(2,"0")}:{String(countdown%60).padStart(2,"0")}
                  </Typography>
                </Box>
              )}

              {/* Retry button */}
              <Box className="fu d3" mb={1.5}>
                <button
                  className={`retry-btn${retrying?" loading":""}`}
                  onClick={handleRetry}
                  disabled={retrying}
                >
                  {retrying
                    ? <><div className="spinner"/> Redirecting to checkout...</>
                    : <><RefreshCw size={17}/> Try payment again</>
                  }
                </button>
              </Box>

              {/* Alternative actions */}
              <Box className="fu d4">
                <Stack spacing={1.25}>
                  <button className="alt-btn" onClick={() => navigate("/payment", { state:{ method:"eft" } })}>
                    <Box sx={{ fontSize:12, fontWeight:600 }}>EFT</Box>
                    Try Instant EFT instead
                  </button>
                  <button className="alt-btn" onClick={() => navigate(-2)}>
                    <ArrowLeft size={14}/> Cancel and go back
                  </button>
                </Stack>
              </Box>
            </Grid>

            {/* ── RIGHT ─────────────────────────────────── */}
            <Grid item xs={12} md={6}>
              <Box className="fu d2">

                {/* What to try */}
                <Box sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:3.5, mb:3 }}>
                  <Typography sx={{ fontWeight:700, fontSize:"1.1rem", color:INK, mb:2.5 }}>
                    What you can try
                  </Typography>
                  <Stack spacing={1.75}>
                    {FIXES.map(({ icon, iconBg, iconColor, title, desc }, i) => (
                      <div key={i} className="fix-card">
                        <div className="fix-icon" style={{ background:iconBg, color:iconColor }}>{icon}</div>
                        <Box>
                          <Typography sx={{ fontSize:14, fontWeight:600, color:INK, mb:.4 }}>{title}</Typography>
                          <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.6 }}>{desc}</Typography>
                        </Box>
                      </div>
                    ))}
                  </Stack>
                </Box>

                {/* Security note */}
                <Box sx={{ background:P_LITE, borderRadius:"16px", p:3, mb:3, display:"flex", gap:2, alignItems:"flex-start" }}>
                  <Box sx={{ width:38, height:38, borderRadius:"9px", background:"rgba(127,66,231,.15)", display:"flex", alignItems:"center", justifyContent:"center", color:P, flexShrink:0 }}>
                    <Lock size={17}/>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize:13.5, fontWeight:600, color:P, mb:.4 }}>Your session is still held</Typography>
                    <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.65 }}>
                      No charges were made. Your booking with <strong>{`Lerato Mokoena`}</strong> is reserved for the next {countdown > 0 ? `${countdown} seconds` : "a few more minutes"} while you retry.
                    </Typography>
                  </Box>
                </Box>

                {/* Support */}
                <Box sx={{ background:WHITE, border:`1.5px solid ${BORDER}`, borderRadius:"16px", p:3, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ width:38, height:38, borderRadius:"9px", background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", color:INK2 }}>
                      <HelpCircle size={17}/>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize:14, fontWeight:600, color:INK }}>Need help?</Typography>
                      <Typography sx={{ fontSize:13, color:INK2 }}>Our team responds in under 24h</Typography>
                    </Box>
                  </Stack>
                  <a href="/support" style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:13.5, fontWeight:500, color:P, textDecoration:"none", }}>
                    Contact us <ArrowRight size={13}/>
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

export default PaymentDeclined;