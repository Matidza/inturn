import React, { useMemo, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, Stack, Skeleton, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";
import { Calendar, Clock, Video, XCircle, Star, AlertCircle, CreditCard, CheckCircle, ChevronRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── TOKENS ─────────────────────────────────────────────── */
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
// const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#4A4A5A";
const BORDER = "#E8E3F5";
const OFF    = "#FAFAFA";
const GREEN  = "#00916E";
const GREEN_L= "#ECFDF5";
const RED    = "#DC2626";
const AMBER  = "#B45309";
const AMBER_L= "#FEF3C7";

const REFUND_WINDOW_HOURS = 24;

/* ── CSS ─────────────────────────────────────────────────── */
const css = `

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cardLift { 0%,100%{transform:translateY(0)} }

  .card-hover {
    transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
  }
  .card-hover:hover {
    transform:translateY(-4px);
    box-shadow:0 16px 40px rgba(127,66,231,.11);
  }

  /* Primary action button */
  .action-btn {
    width:100%; padding:13px 16px;
    border:none; border-radius:12px; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
    display:flex; align-items:center; justify-content:center; gap:7px;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
  }
  .action-btn.join {
    background:${P}; color:#fff;
    box-shadow:0 4px 16px rgba(127,66,231,.25);
  }
  .action-btn.join:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 8px 24px rgba(127,66,231,.35); }
  .action-btn.pay {
    background:#F59E0B; color:#fff;
    box-shadow:0 4px 14px rgba(245,158,11,.25);
  }
  .action-btn.pay:hover { background:#D97706; transform:translateY(-2px); }

  /* Secondary buttons */
  .sec-btn {
    flex:1; padding:9px 12px; border-radius:10px; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    display:flex; align-items:center; justify-content:center; gap:6px;
    transition:all .18s;
  }
  .sec-btn.refund {
    background:#FFFBEB; color:${AMBER};
    border:1.5px solid #FDE68A;
  }
  .sec-btn.refund:hover { background:${AMBER_L}; }
  .sec-btn.cancel {
    background:#FFF5F5; color:${RED};
    border:1.5px solid #FECACA;
  }
  .sec-btn.cancel:hover { background:#FEE2E2; }
  .sec-btn.review {
    background:${P_LITE}; color:${P};
    border:1.5px solid ${BORDER};
  }
  .sec-btn.review:hover { background:${P}; color:#fff; border-color:${P}; }

  /* Status badge */
  .status-badge {
    display:inline-flex; align-items:center; gap:5px;
    padding:4px 10px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
  }

  /* Countdown pill */
  .countdown-pill {
    display:flex; align-items:center; justify-content:space-between;
    padding:8px 14px; border-radius:10px; margin-bottom:14px;
  }

  /* Tab indicator */
  .tab-active {
    position:relative;
  }
  .tab-active::after {
    content:''; position:absolute; bottom:-1px; left:0; right:0;
    height:2px; background:${P}; border-radius:2px;
  }
`;

/* ── TYPES ────────────────────────────────────────────────── */
type PaymentStatus = "Paid" | "Unpaid" | "Refunded";
type InterviewStatus = "Scheduled" | "Pending Approval" | "Completed" | "Cancelled";

interface Interview {
  id: number;
  professional: string;
  role: string;
  date: string;
  time: string;
  duration: number;
  status: InterviewStatus;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  image: string;
  specialty: string;
  price: number;
  sessionType: string;
  meetingLink?: string;
}

/* ── HELPERS ──────────────────────────────────────────────── */
const getStatusConfig = (status: InterviewStatus) => {
  const m: Record<InterviewStatus, { color:string; bg:string; icon:React.ReactNode }> = {
    "Scheduled":        { color:GREEN,  bg:GREEN_L,  icon:<CheckCircle size={11}/> },
    "Pending Approval": { color:AMBER,  bg:AMBER_L,  icon:<AlertCircle size={11}/> },
    "Completed":        { color:P,      bg:P_LITE,   icon:<CheckCircle size={11}/> },
    "Cancelled":        { color:"#6B7280", bg:"#F3F4F6", icon:<XCircle size={11}/> },
  };
  return m[status];
};

const getPaymentConfig = (payment: PaymentStatus) => {
  const m: Record<PaymentStatus, { color:string; bg:string }> = {
    "Paid":     { color:GREEN, bg:GREEN_L },
    "Unpaid":   { color:RED,   bg:"#FEE2E2" },
    "Refunded": { color:AMBER, bg:AMBER_L },
  };
  return m[payment];
};

const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-ZA", { weekday:"short", day:"numeric", month:"short", year:"numeric" });

const formatTime = (t: string) => {
  const [h, m] = t.split(":");
  const hr = parseInt(h);
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

const hoursUntil = (date: string, time: string) => {
  const diff = new Date(`${date}T${time}`).getTime() - Date.now();
  return diff / (1000 * 60 * 60);
};

const countdownLabel = (date: string, time: string) => {
  const diff = new Date(`${date}T${time}`).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000*60*60*24));
  const hrs  = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  if (days === 0) return hrs === 0 ? "Starting soon" : `In ${hrs}h`;
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
};

/* ── INITIAL DATA ────────────────────────────────────────── */
const INITIAL: Interview[] = [
  {
    id: 1,
    professional: "Lerato Mokoena",
    role: "Software Engineer at TechWave",
    date: "2026-05-15",
    time: "14:00",
    duration: 45,
    status: "Scheduled",
    paymentStatus: "Paid",
    paidAt: "2026-05-01T10:00:00",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    specialty: "Technical Interviews",
    price: 350,
    sessionType: "Mock Interview",
    meetingLink: "/mentee/join-session/1",
  },
  {
    id: 2,
    professional: "Thabo Nkosi",
    role: "Data Analyst at InsightHub",
    date: "2026-05-18",
    time: "11:30",
    duration: 30,
    status: "Scheduled",
    paymentStatus: "Unpaid",
    paidAt: null,
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    specialty: "Data & Analytics",
    price: 250,
    sessionType: "CV Review",
  },
  {
    id: 3,
    professional: "Aisha Patel",
    role: "Marketing Specialist at BrandSpark",
    date: "2026-04-28",
    time: "16:00",
    duration: 60,
    status: "Completed",
    paymentStatus: "Paid",
    paidAt: "2026-04-20T09:00:00",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    specialty: "Marketing & Brand",
    price: 400,
    sessionType: "Career Coaching",
  },
  {
    id: 4,
    professional: "Sipho Dlamini",
    role: "Product Manager at FinTech SA",
    date: "2026-04-10",
    time: "09:00",
    duration: 45,
    status: "Cancelled",
    paymentStatus: "Refunded",
    paidAt: "2026-04-01T14:00:00",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    specialty: "Product Management",
    price: 380,
    sessionType: "Mock Interview",
  },
];

/* ── SKELETON ─────────────────────────────────────────────── */
const InterviewSkeleton = () => (
  <Card sx={{ p:3, borderRadius:3, border:`1.5px solid ${BORDER}`, boxShadow:"none" }}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Skeleton variant="circular" width={48} height={48}/>
        <Box width="100%"><Skeleton width="65%" height={20}/><Skeleton width="45%" height={16} sx={{ mt:.5 }}/></Box>
      </Stack>
      <Skeleton width="80%" height={16}/>
      <Skeleton width="50%" height={16}/>
      <Stack direction="row" spacing={1} mt={1}>
        <Skeleton width={80} height={28} sx={{ borderRadius:10 }}/>
        <Skeleton width={60} height={28} sx={{ borderRadius:10 }}/>
      </Stack>
      <Skeleton width="100%" height={44} sx={{ borderRadius:2 }}/>
    </Stack>
  </Card>
);

/* ── EMPTY STATE ──────────────────────────────────────────── */
const EmptyState = ({ tab }: { tab:string }) => {
  const m: Record<string,{ title:string; desc:string; cta:string; to:string }> = {
    upcoming:  { title:"No upcoming sessions",   desc:"Book a session with a professional to start practicing.", cta:"Browse professionals", to:"/professionals" },
    completed: { title:"No completed sessions",  desc:"Sessions you've finished will appear here with feedback.", cta:"Book your first session", to:"/professionals" },
    cancelled: { title:"No cancelled sessions",  desc:"All looking good — no cancellations to show.",           cta:"Browse professionals", to:"/professionals" },
  };
  const info = m[tab] || m.upcoming;
  return (
    <Box sx={{ gridColumn:"1/-1", textAlign:"center", py:10, px:3, background:WHITE, borderRadius:3, border:`1.5px dashed ${BORDER}` }}>
      <Box sx={{ width:60, height:60, borderRadius:"50%", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
        <Calendar size={26} color={P}/>
      </Box>
      <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:.5 }}>{info.title}</Typography>
      <Typography sx={{ fontSize:14, color:INK2, mb:3, maxWidth:360, mx:"auto", lineHeight:1.7 }}>{info.desc}</Typography>
      <a href={info.to} style={{
        display:"inline-flex", alignItems:"center", gap:6,
        padding:"11px 22px", borderRadius:100,
        fontSize:14, fontWeight:500, fontFamily:"'DM Sans',sans-serif",
        background:P, color:"#fff", textDecoration:"none",
      }}>
        {info.cta} <ChevronRight size={14}/>
      </a>
    </Box>
  );
};

/* ── INTERVIEW CARD ──────────────────────────────────────── */
const WHITE = "#fff";

const InterviewCard = ({
  interview,
  onCancel,
  // onPay,
}: {
  interview: Interview;
  onCancel: (iv:Interview) => void;
  onPay: (iv:Interview) => void;
}) => {
  const navigate = useNavigate();
  const isPaid      = interview.paymentStatus === "Paid";
  const isScheduled = interview.status === "Scheduled";
  const isCompleted = interview.status === "Completed";
  const isCancelled = interview.status === "Cancelled";
  const hrs         = hoursUntil(interview.date, interview.time);
  const canRefund   = isPaid && hrs >= REFUND_WINDOW_HOURS;
  const countdown   = countdownLabel(interview.date, interview.time);
  const statusCfg   = getStatusConfig(interview.status);
  const paymentCfg  = getPaymentConfig(interview.paymentStatus);

  return (
    <Card
      className="card-hover"
      sx={{
        borderRadius:3, border:`1.5px solid ${BORDER}`,
        boxShadow:"none", background:WHITE,
        display:"flex", flexDirection:"column",
        justifyContent:"space-between",
      }}
    >
      <CardContent sx={{ pb:0 }}>
        {/* Countdown banner */}
        {isScheduled && countdown && (
          <div
            className="countdown-pill"
            style={{
              background: isPaid ? `${GREEN}12` : "#FFFBEB",
              border: `1px solid ${isPaid ? GREEN+"30" : "#FDE68A"}`,
            }}
          >
            <Stack direction="row" spacing={.75} alignItems="center">
              <Clock size={12} color={isPaid ? GREEN : AMBER}/>
              <Typography sx={{ fontSize:12, fontWeight:500, color:isPaid?GREEN:AMBER }}>{countdown}</Typography>
            </Stack>
            {!isPaid && (
              <Typography sx={{ fontSize:11, fontWeight:600, color:RED }}>⚠ Payment required</Typography>
            )}
          </div>
        )}

        {/* Professional header */}
        <Stack direction="row" spacing={1.5} mb={2.5} alignItems="center">
          <Avatar
            src={interview.image}
            sx={{ width:48, height:48, border:`2px solid ${BORDER}`, cursor:"pointer" }}
            onClick={() => navigate(`/mentee/professional-details/${interview.id}`)}
          />
          <Box sx={{ cursor:"pointer" }} onClick={() => navigate(`/mentee/professional-details/${interview.id}`)}>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:INK, lineHeight:1.2 }}>
              {interview.professional}
            </Typography>
            <Typography sx={{ fontSize:12.5, color:INK2, mt:.2 }}>{interview.role}</Typography>
          </Box>
        </Stack>

        {/* Session meta */}
        <Box sx={{ background:OFF, borderRadius:"10px", p:1.5, mb:2 }}>
          <Stack spacing={.75}>
            {[
              { icon:<Calendar size={13} color={INK2}/>, val:formatDate(interview.date) },
              { icon:<Clock size={13} color={INK2}/>,    val:`${formatTime(interview.time)} · ${interview.duration} min` },
              { icon:<Video size={13} color={INK2}/>,    val:interview.sessionType },
            ].map(({ icon, val }, i) => (
              <Stack key={i} direction="row" spacing={.875} alignItems="center">
                {icon}
                <Typography sx={{ fontSize:13, color:INK2 }}>{val}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Badges */}
        <Stack direction="row" spacing={.75} flexWrap="wrap" mb={1.25}>
          <span className="status-badge" style={{ background:statusCfg.bg, color:statusCfg.color }}>
            {statusCfg.icon} {interview.status}
          </span>
          <span className="status-badge" style={{ background:paymentCfg.bg, color:paymentCfg.color }}>
            {interview.paymentStatus}
          </span>
          <span className="status-badge" style={{ background:BORDER, color:INK2 }}>
            R{interview.price}
          </span>
        </Stack>

        {interview.paidAt && (
          <Typography sx={{ fontSize:11.5, color:INK2, mb:1 }}>
            Paid {new Date(interview.paidAt).toLocaleDateString("en-ZA",{ day:"numeric", month:"short", year:"numeric" })}
          </Typography>
        )}

        {/* ── PRIMARY CTA ─────────────────────────────── */}
        {isScheduled && (
          <Box mt={1} mb={1}>
            {isPaid ? (
              /* JOIN SESSION → navigate to join-session page */
              <button
                className="action-btn join"
                // onClick={() => navigate(interview.meetingLink || `/mentee/join-session/${interview.id}`)}
                onClick={() => navigate(`/mentee/join-session`)}
              >
                <Video size={15}/> Join session
              </button>
            ) : (
              /* PAY NOW → navigate to payment page */
              <button
                className="action-btn pay"
                // onClick={() => onPay(interview)}
                onClick={() => navigate(`/mentee/pay`)}
              >
                <CreditCard size={15}/> Pay R{interview.price} — Secure checkout
              </button>
            )}
          </Box>
        )}

        {/* COMPLETED — leave review */}
        {isCompleted && (
          <Box mt={1} mb={1}>
            <button
              className="action-btn join"
              style={{ background:P_LITE, color:P, boxShadow:"none" }}
              onClick={() => navigate(`/mentee/feedback/${interview.id}`)}
            >
              <Star size={15}/> Leave a review
            </button>
          </Box>
        )}
      </CardContent>

      {/* ── SECONDARY ACTIONS ────────────────────────── */}
      {!isCancelled && (
        <Box sx={{ px:2, pb:2 }}>
          <Stack direction="row" spacing={1} mt={1}>
            {/* REFUND → navigate to refund page */}
            {canRefund && (
              <button
                className="sec-btn refund"
                // onClick={() => navigate(`/mentee/refund/${interview.id}`, { state:{ interview } })}
                onClick={() => navigate(`/mentee/refund`)}
              >
                <RefreshCw size={13}/> Refund
              </button>
            )}
            {/* CANCEL → confirmation dialog */}
            {isScheduled && (
              <button
                className="sec-btn cancel"
                onClick={() => onCancel(interview)}
              >
                <XCircle size={13}/> Cancel
              </button>
            )}
          </Stack>
        </Box>
      )}
    </Card>
  );
};

/* ── MAIN COMPONENT ──────────────────────────────────────── */
const Interviews: React.FC = () => {
  const navigate = useNavigate();
  const [loading]    = useState(false);
  const [tab, setTab] = useState("upcoming");
  const [interviews, setInterviews] = useState<Interview[]>(INITIAL);
  const [cancelTarget, setCancelTarget] = useState<Interview|null>(null);
  const [snack, setSnack] = useState<{ open:boolean; msg:string; type:"success"|"info"|"warning" }>({ open:false, msg:"", type:"success" });

  const showSnack = (msg:string, type:"success"|"info"|"warning"="success") =>
    setSnack({ open:true, msg, type });

  const filtered = useMemo(() => {
    if (tab==="upcoming")  return interviews.filter(i=>i.status!=="Completed"&&i.status!=="Cancelled");
    if (tab==="completed") return interviews.filter(i=>i.status==="Completed");
    if (tab==="cancelled") return interviews.filter(i=>i.status==="Cancelled");
    return interviews;
  }, [tab, interviews]);

  const counts = useMemo(() => ({
    upcoming:  interviews.filter(i=>i.status!=="Completed"&&i.status!=="Cancelled").length,
    completed: interviews.filter(i=>i.status==="Completed").length,
    cancelled: interviews.filter(i=>i.status==="Cancelled").length,
  }), [interviews]);

  /* Cancel confirm */
  const confirmCancel = () => {
    if (!cancelTarget) return;
    const refundable = hoursUntil(cancelTarget.date, cancelTarget.time) >= REFUND_WINDOW_HOURS;
    setInterviews(prev => prev.map(i =>
      i.id===cancelTarget.id
        ? { ...i, status:"Cancelled", paymentStatus:refundable&&i.paymentStatus==="Paid"?"Refunded":i.paymentStatus }
        : i
    ));
    setCancelTarget(null);
    showSnack(refundable?"Interview cancelled. Refund initiated.":"Interview cancelled.", "info");
  };

  /* Pay now → navigate to payment page with session state */
  const handlePay = (iv: Interview) => {
    navigate("/payment", { state:{ interview:iv } });
  };

  return (
    <>
      <style>{css}</style>
      <Box sx={{ background:"#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── HEADER ─────────────────────────────────── */}
        <Box sx={{ background:"#FFFFFF", borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:8 }, py:{ xs:4, md:5 } }}>
          {/* background:WHITE, */}
          <Box maxWidth="lg" mx="auto">
            <Stack direction={{ xs:"column", sm:"row" }} justifyContent="space-between" alignItems={{ xs:"flex-start", sm:"center" }} spacing={2}>
              <Box>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"1.8rem", md:"2.4rem" }, fontWeight:800, color:INK, letterSpacing:"-0.02em", lineHeight:1.1 }}>
                  My interviews
                </Typography>
                <Typography sx={{ fontSize:14, color:INK2, mt:.5 }}>Manage your upcoming and past sessions</Typography>
              </Box>
              <button
                onClick={() => navigate("/mentee/professionals")}
                style={{
                  display:"inline-flex", alignItems:"center", gap:7,
                  padding:"11px 22px", borderRadius:100,
                  fontSize:14, fontWeight:500, fontFamily:"'DM Sans',sans-serif",
                  background:P, color:"#fff", border:"none", cursor:"pointer",
                  boxShadow:"0 4px 16px rgba(127,66,231,.25)",
                  transition:"all .2s",
                }}
              >
                <ChevronRight size={15}/> Book a session
              </button>
            </Stack>
          </Box>
        </Box>

        {/* ── TABS ───────────────────────────────────── */}
        <Box sx={{ background:WHITE, borderBottom:`1px solid ${BORDER}`, px:{ xs:3, md:8 } }}>
          <Box maxWidth="lg" mx="auto">
            <Stack direction="row" spacing={0}>
              {[
                { key:"upcoming",  label:"Upcoming",  count:counts.upcoming  },
                { key:"completed", label:"Completed", count:counts.completed },
                { key:"cancelled", label:"Cancelled", count:counts.cancelled },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  className={tab===key?"tab-active":""}
                  onClick={() => setTab(key)}
                  style={{
                    padding:"14px 20px", background:"none", border:"none",
                    cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                    fontSize:14, fontWeight:tab===key?600:400,
                    color:tab===key?P:INK2,
                    display:"flex", alignItems:"center", gap:7,
                    position:"relative",
                  }}
                >
                  {label}
                  {count > 0 && (
                    <Box sx={{
                      background:tab===key?P_LITE:"#F3F4F6",
                      color:tab===key?P:INK2,
                      fontSize:11, fontWeight:700,
                      borderRadius:100, px:.9, py:.1,
                      minWidth:20, textAlign:"center",
                      fontFamily:"'DM Mono',monospace",
                    }}>
                      {count}
                    </Box>
                  )}
                </button>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* ── CONTENT ────────────────────────────────── */}
        <Box sx={{ py:{ xs:4, md:6 }, px:{ xs:3, md:8 } }}>
          <Box maxWidth="lg" mx="auto">
            {loading ? (
              <Grid container spacing={3}>
                {Array.from({ length:3 }).map((_,i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}><InterviewSkeleton/></Grid>
                ))}
              </Grid>
            ) : filtered.length === 0 ? (
              <EmptyState tab={tab}/>
            ) : (
              <Grid container spacing={3}>
                {filtered.map(iv => (
                  <Grid item xs={12} sm={6} md={4} key={iv.id}>
                    <InterviewCard
                      interview={iv}
                      onCancel={setCancelTarget}
                      onPay={handlePay}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>

        {/* ── CANCEL DIALOG ──────────────────────────── */}
        <Dialog
          open={!!cancelTarget}
          onClose={() => setCancelTarget(null)}
          PaperProps={{ sx:{ borderRadius:3, border:`1.5px solid ${BORDER}`, boxShadow:"0 24px 64px rgba(0,0,0,.08)", p:1 } }}
        >
          <DialogTitle sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:INK }}>
            Cancel this session?
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7 }}>
              You're about to cancel your session with{" "}
              <strong>{cancelTarget?.professional}</strong> on{" "}
              {cancelTarget && formatDate(cancelTarget.date)}.
            </Typography>
            {cancelTarget && hoursUntil(cancelTarget.date, cancelTarget.time) >= REFUND_WINDOW_HOURS ? (
              <Box sx={{ mt:2, background:GREEN_L, borderRadius:"10px", p:1.75 }}>
                <Typography sx={{ fontSize:13, color:GREEN, fontWeight:500 }}>
                  ✓ You're eligible for a full refund of R{cancelTarget.price}
                </Typography>
              </Box>
            ) : cancelTarget?.paymentStatus === "Paid" ? (
              <Box sx={{ mt:2, background:"#FEE2E2", borderRadius:"10px", p:1.75 }}>
                <Typography sx={{ fontSize:13, color:RED, fontWeight:500 }}>
                  ✗ Less than {REFUND_WINDOW_HOURS}h to session — no refund available
                </Typography>
              </Box>
            ) : null}
          </DialogContent>
          <DialogActions sx={{ px:3, pb:2 }}>
            <button
              onClick={() => setCancelTarget(null)}
              style={{ padding:"10px 20px", borderRadius:100, border:`1.5px solid ${BORDER}`, background:WHITE, color:INK2, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14 }}
            >
              Keep it
            </button>
            <button
              onClick={confirmCancel}
              style={{ padding:"10px 20px", borderRadius:100, border:"none", background:RED, color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600 }}
            >
              Yes, cancel
            </button>
          </DialogActions>
        </Dialog>

        {/* ── SNACKBAR ───────────────────────────────── */}
        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={() => setSnack({...snack, open:false})}
          anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        >
          <Alert severity={snack.type} onClose={() => setSnack({...snack, open:false})} sx={{ borderRadius:2 }}>
            {snack.msg}
          </Alert>
        </Snackbar>

      </Box>
    </>
  );
};

export default Interviews;



















// import React, { useMemo, useState } from "react";
// import { Box, Typography, Grid, Card, CardContent, Avatar, Stack, Chip, Skeleton, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";
// import { Calendar, Clock, Video, XCircle, Star, AlertCircle, CreditCard, CheckCircle, ChevronRight, RefreshCw } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// /* ── TOKENS ─────────────────────────────────────────────── */
// const P      = "#7F42E7";
// const P_DARK = "#5E2EC5";
// const P_MID  = "#B893F6";
// const P_LITE = "#F0EAFD";
// const INK    = "#0D0D12";
// const INK2   = "#4A4A5A";
// const BORDER = "#E8E3F5";
// const OFF    = "#FAFAFA";
// const GREEN  = "#00916E";
// const GREEN_L= "#ECFDF5";
// const RED    = "#DC2626";
// const AMBER  = "#B45309";
// const AMBER_L= "#FEF3C7";

// const REFUND_WINDOW_HOURS = 24;

// /* ── CSS ─────────────────────────────────────────────────── */
// const css = `

//   *, *::before, *::after { box-sizing: border-box; }

//   @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes cardLift { 0%,100%{transform:translateY(0)} }

//   .card-hover {
//     transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
//   }
//   @media(min-width:600px) {
//     .card-hover:hover {
//       transform:translateY(-4px);
//       box-shadow:0 16px 40px rgba(127,66,231,.11);
//     }
//   }

//   /* Primary action button */
//   .action-btn {
//     width:100%; padding:13px 16px;
//     border:none; border-radius:12px; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
//     display:flex; align-items:center; justify-content:center; gap:7px;
//     transition:all .2s cubic-bezier(.34,1.56,.64,1);
//     min-width:0; word-break:break-word;
//   }
//   .action-btn.join {
//     background:${P}; color:#fff;
//     box-shadow:0 4px 16px rgba(127,66,231,.25);
//   }
//   .action-btn.join:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 8px 24px rgba(127,66,231,.35); }
//   .action-btn.pay {
//     background:#F59E0B; color:#fff;
//     box-shadow:0 4px 14px rgba(245,158,11,.25);
//   }
//   .action-btn.pay:hover { background:#D97706; transform:translateY(-2px); }

//   /* Secondary buttons */
//   .sec-btn {
//     flex:1; padding:9px 10px; border-radius:10px; cursor:pointer;
//     font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
//     display:flex; align-items:center; justify-content:center; gap:6px;
//     transition:all .18s; min-width:0; white-space:nowrap;
//   }
//   .sec-btn.refund {
//     background:#FFFBEB; color:${AMBER};
//     border:1.5px solid #FDE68A;
//   }
//   .sec-btn.refund:hover { background:${AMBER_L}; }
//   .sec-btn.cancel {
//     background:#FFF5F5; color:${RED};
//     border:1.5px solid #FECACA;
//   }
//   .sec-btn.cancel:hover { background:#FEE2E2; }
//   .sec-btn.review {
//     background:${P_LITE}; color:${P};
//     border:1.5px solid ${BORDER};
//   }
//   .sec-btn.review:hover { background:${P}; color:#fff; border-color:${P}; }

//   /* Status badge */
//   .status-badge {
//     display:inline-flex; align-items:center; gap:5px;
//     padding:4px 10px; border-radius:100px;
//     font-family:'DM Sans',sans-serif; font-size:11.5px; font-weight:600;
//   }

//   /* Countdown pill */
//   .countdown-pill {
//     display:flex; align-items:center; justify-content:space-between;
//     padding:8px 14px; border-radius:10px; margin-bottom:14px;
//   }

//   /* Tab indicator */
//   .tab-active {
//     position:relative;
//   }
//   .tab-active::after {
//     content:''; position:absolute; bottom:-1px; left:0; right:0;
//     height:2px; background:${P}; border-radius:2px;
//   }
// `;

// /* ── TYPES ────────────────────────────────────────────────── */
// type PaymentStatus = "Paid" | "Unpaid" | "Refunded";
// type InterviewStatus = "Scheduled" | "Pending Approval" | "Completed" | "Cancelled";

// interface Interview {
//   id: number;
//   professional: string;
//   role: string;
//   date: string;
//   time: string;
//   duration: number;
//   status: InterviewStatus;
//   paymentStatus: PaymentStatus;
//   paidAt: string | null;
//   image: string;
//   specialty: string;
//   price: number;
//   sessionType: string;
//   meetingLink?: string;
// }

// /* ── HELPERS ──────────────────────────────────────────────── */
// const getStatusConfig = (status: InterviewStatus) => {
//   const m: Record<InterviewStatus, { color:string; bg:string; icon:React.ReactNode }> = {
//     "Scheduled":        { color:GREEN,  bg:GREEN_L,  icon:<CheckCircle size={11}/> },
//     "Pending Approval": { color:AMBER,  bg:AMBER_L,  icon:<AlertCircle size={11}/> },
//     "Completed":        { color:P,      bg:P_LITE,   icon:<CheckCircle size={11}/> },
//     "Cancelled":        { color:"#6B7280", bg:"#F3F4F6", icon:<XCircle size={11}/> },
//   };
//   return m[status];
// };

// const getPaymentConfig = (payment: PaymentStatus) => {
//   const m: Record<PaymentStatus, { color:string; bg:string }> = {
//     "Paid":     { color:GREEN, bg:GREEN_L },
//     "Unpaid":   { color:RED,   bg:"#FEE2E2" },
//     "Refunded": { color:AMBER, bg:AMBER_L },
//   };
//   return m[payment];
// };

// const formatDate = (d: string) =>
//   new Date(d + "T00:00:00").toLocaleDateString("en-ZA", { weekday:"short", day:"numeric", month:"short", year:"numeric" });

// const formatTime = (t: string) => {
//   const [h, m] = t.split(":");
//   const hr = parseInt(h);
//   return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
// };

// const hoursUntil = (date: string, time: string) => {
//   const diff = new Date(`${date}T${time}`).getTime() - Date.now();
//   return diff / (1000 * 60 * 60);
// };

// const countdownLabel = (date: string, time: string) => {
//   const diff = new Date(`${date}T${time}`).getTime() - Date.now();
//   if (diff <= 0) return null;
//   const days = Math.floor(diff / (1000*60*60*24));
//   const hrs  = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
//   if (days === 0) return hrs === 0 ? "Starting soon" : `In ${hrs}h`;
//   if (days === 1) return "Tomorrow";
//   return `In ${days} days`;
// };

// /* ── INITIAL DATA ────────────────────────────────────────── */
// const INITIAL: Interview[] = [
//   {
//     id: 1,
//     professional: "Lerato Mokoena",
//     role: "Software Engineer at TechWave",
//     date: "2026-05-15",
//     time: "14:00",
//     duration: 45,
//     status: "Scheduled",
//     paymentStatus: "Paid",
//     paidAt: "2026-05-01T10:00:00",
//     image: "https://randomuser.me/api/portraits/women/68.jpg",
//     specialty: "Technical Interviews",
//     price: 350,
//     sessionType: "Mock Interview",
//     meetingLink: "/mentee/join-session/1",
//   },
//   {
//     id: 2,
//     professional: "Thabo Nkosi",
//     role: "Data Analyst at InsightHub",
//     date: "2026-05-18",
//     time: "11:30",
//     duration: 30,
//     status: "Scheduled",
//     paymentStatus: "Unpaid",
//     paidAt: null,
//     image: "https://randomuser.me/api/portraits/men/22.jpg",
//     specialty: "Data & Analytics",
//     price: 250,
//     sessionType: "CV Review",
//   },
//   {
//     id: 3,
//     professional: "Aisha Patel",
//     role: "Marketing Specialist at BrandSpark",
//     date: "2026-04-28",
//     time: "16:00",
//     duration: 60,
//     status: "Completed",
//     paymentStatus: "Paid",
//     paidAt: "2026-04-20T09:00:00",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     specialty: "Marketing & Brand",
//     price: 400,
//     sessionType: "Career Coaching",
//   },
//   {
//     id: 4,
//     professional: "Sipho Dlamini",
//     role: "Product Manager at FinTech SA",
//     date: "2026-04-10",
//     time: "09:00",
//     duration: 45,
//     status: "Cancelled",
//     paymentStatus: "Refunded",
//     paidAt: "2026-04-01T14:00:00",
//     image: "https://randomuser.me/api/portraits/men/55.jpg",
//     specialty: "Product Management",
//     price: 380,
//     sessionType: "Mock Interview",
//   },
// ];

// /* ── SKELETON ─────────────────────────────────────────────── */
// const InterviewSkeleton = () => (
//   <Card sx={{ p:3, borderRadius:3, border:`1.5px solid ${BORDER}`, boxShadow:"none" }}>
//     <Stack spacing={2}>
//       <Stack direction="row" spacing={2}>
//         <Skeleton variant="circular" width={48} height={48}/>
//         <Box width="100%"><Skeleton width="65%" height={20}/><Skeleton width="45%" height={16} sx={{ mt:.5 }}/></Box>
//       </Stack>
//       <Skeleton width="80%" height={16}/>
//       <Skeleton width="50%" height={16}/>
//       <Stack direction="row" spacing={1} mt={1}>
//         <Skeleton width={80} height={28} sx={{ borderRadius:10 }}/>
//         <Skeleton width={60} height={28} sx={{ borderRadius:10 }}/>
//       </Stack>
//       <Skeleton width="100%" height={44} sx={{ borderRadius:2 }}/>
//     </Stack>
//   </Card>
// );

// /* ── EMPTY STATE ──────────────────────────────────────────── */
// const EmptyState = ({ tab }: { tab:string }) => {
//   const m: Record<string,{ title:string; desc:string; cta:string; to:string }> = {
//     upcoming:  { title:"No upcoming sessions",   desc:"Book a session with a professional to start practicing.", cta:"Browse professionals", to:"/professionals" },
//     completed: { title:"No completed sessions",  desc:"Sessions you've finished will appear here with feedback.", cta:"Book your first session", to:"/professionals" },
//     cancelled: { title:"No cancelled sessions",  desc:"All looking good — no cancellations to show.",           cta:"Browse professionals", to:"/professionals" },
//   };
//   const info = m[tab] || m.upcoming;
//   return (
//     <Box sx={{ gridColumn:"1/-1", textAlign:"center", py:10, px:3, background:WHITE, borderRadius:3, border:`1.5px dashed ${BORDER}` }}>
//       <Box sx={{ width:60, height:60, borderRadius:"50%", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2 }}>
//         <Calendar size={26} color={P}/>
//       </Box>
//       <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:.5 }}>{info.title}</Typography>
//       <Typography sx={{ fontSize:14, color:INK2, mb:3, maxWidth:360, mx:"auto", lineHeight:1.7 }}>{info.desc}</Typography>
//       <a href={info.to} style={{
//         display:"inline-flex", alignItems:"center", gap:6,
//         padding:"11px 22px", borderRadius:100,
//         fontSize:14, fontWeight:500, fontFamily:"'DM Sans',sans-serif",
//         background:P, color:"#fff", textDecoration:"none",
//       }}>
//         {info.cta} <ChevronRight size={14}/>
//       </a>
//     </Box>
//   );
// };

// /* ── INTERVIEW CARD ──────────────────────────────────────── */
// const WHITE = "#fff"; = ({
//   interview,
//   onCancel,
//   onPay,
// }: {
//   interview: Interview;
//   onCancel: (iv:Interview) => void;
//   onPay: (iv:Interview) => void;
// }) => {
//   const navigate = useNavigate();
//   const isPaid      = interview.paymentStatus === "Paid";
//   const isScheduled = interview.status === "Scheduled";
//   const isCompleted = interview.status === "Completed";
//   const isCancelled = interview.status === "Cancelled";
//   const hrs         = hoursUntil(interview.date, interview.time);
//   const canRefund   = isPaid && hrs >= REFUND_WINDOW_HOURS;
//   const countdown   = countdownLabel(interview.date, interview.time);
//   const statusCfg   = getStatusConfig(interview.status);
//   const paymentCfg  = getPaymentConfig(interview.paymentStatus);

//   return (
//     <Card
//       className="card-hover"
//       sx={{
//         borderRadius:3, border:`1.5px solid ${BORDER}`,
//         boxShadow:"none", background:WHITE,
//         display:"flex", flexDirection:"column",
//         justifyContent:"space-between",
//       }}
//     >
//       <CardContent sx={{ pb:0 }}>
//         {/* Countdown banner */}
//         {isScheduled && countdown && (
//           <div
//             className="countdown-pill"
//             style={{
//               background: isPaid ? `${GREEN}12` : "#FFFBEB",
//               border: `1px solid ${isPaid ? GREEN+"30" : "#FDE68A"}`,
//             }}
//           >
//             <Stack direction="row" spacing={.75} alignItems="center">
//               <Clock size={12} color={isPaid ? GREEN : AMBER}/>
//               <Typography sx={{ fontSize:12, fontWeight:500, color:isPaid?GREEN:AMBER }}>{countdown}</Typography>
//             </Stack>
//             {!isPaid && (
//               <Typography sx={{ fontSize:11, fontWeight:600, color:RED }}>⚠ Payment required</Typography>
//             )}
//           </div>
//         )}

//         {/* Professional header */}
//         <Stack direction="row" spacing={1.5} mb={2.5} alignItems="center">
//           <Avatar
//             src={interview.image}
//             sx={{ width:48, height:48, border:`2px solid ${BORDER}`, cursor:"pointer" }}
//             onClick={() => navigate(`/mentee/professional-details/${interview.id}`)}
//           />
//           <Box sx={{ cursor:"pointer" }} onClick={() => navigate(`/mentee/professional-details/${interview.id}`)}>
//             <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:INK, lineHeight:1.2 }}>
//               {interview.professional}
//             </Typography>
//             <Typography sx={{ fontSize:12.5, color:INK2, mt:.2 }}>{interview.role}</Typography>
//           </Box>
//         </Stack>

//         {/* Session meta */}
//         <Box sx={{ background:OFF, borderRadius:"10px", p:1.5, mb:2 }}>
//           <Stack spacing={.75}>
//             {[
//               { icon:<Calendar size={13} color={INK2}/>, val:formatDate(interview.date) },
//               { icon:<Clock size={13} color={INK2}/>,    val:`${formatTime(interview.time)} · ${interview.duration} min` },
//               { icon:<Video size={13} color={INK2}/>,    val:interview.sessionType },
//             ].map(({ icon, val }, i) => (
//               <Stack key={i} direction="row" spacing={.875} alignItems="center">
//                 {icon}
//                 <Typography sx={{ fontSize:13, color:INK2 }}>{val}</Typography>
//               </Stack>
//             ))}
//           </Stack>
//         </Box>

//         {/* Badges */}
//         <Stack direction="row" spacing={.75} flexWrap="wrap" mb={1.25}>
//           <span className="status-badge" style={{ background:statusCfg.bg, color:statusCfg.color }}>
//             {statusCfg.icon} {interview.status}
//           </span>
//           <span className="status-badge" style={{ background:paymentCfg.bg, color:paymentCfg.color }}>
//             {interview.paymentStatus}
//           </span>
//           <span className="status-badge" style={{ background:BORDER, color:INK2 }}>
//             R{interview.price}
//           </span>
//         </Stack>

//         {interview.paidAt && (
//           <Typography sx={{ fontSize:11.5, color:INK2, mb:1 }}>
//             Paid {new Date(interview.paidAt).toLocaleDateString("en-ZA",{ day:"numeric", month:"short", year:"numeric" })}
//           </Typography>
//         )}

//         {/* ── PRIMARY CTA ─────────────────────────────── */}
//         {isScheduled && (
//           <Box mt={1} mb={1}>
//             {isPaid ? (
//               /* JOIN SESSION → navigate to join-session page */
//               <button
//                 className="action-btn join"
//                 // onClick={() => navigate(interview.meetingLink || `/mentee/join-session/${interview.id}`)}
//                 onClick={() => navigate(`/mentee/join-session`)}
//               >
//                 <Video size={15}/> Join session
//               </button>
//             ) : (
//               /* PAY NOW → navigate to payment page */
//               <button
//                 className="action-btn pay"
//                 // onClick={() => onPay(interview)}
//                 onClick={() => navigate(`/mentee/pay`)}
//               >
//                 <CreditCard size={15}/> Pay R{interview.price} — Secure checkout
//               </button>
//             )}
//           </Box>
//         )}

//         {/* COMPLETED — leave review */}
//         {isCompleted && (
//           <Box mt={1} mb={1}>
//             <button
//               className="action-btn join"
//               style={{ background:P_LITE, color:P, boxShadow:"none" }}
//               onClick={() => navigate(`/mentee/feedback/${interview.id}`)}
//             >
//               <Star size={15}/> Leave a review
//             </button>
//           </Box>
//         )}
//       </CardContent>

//       {/* ── SECONDARY ACTIONS ────────────────────────── */}
//       {!isCancelled && (
//         <Box sx={{ px:2, pb:2 }}>
//           <Stack direction="row" spacing={1} mt={1} flexWrap="wrap" gap={0.5}>
//             {/* REFUND → navigate to refund page */}
//             {canRefund && (
//               <button
//                 className="sec-btn refund"
//                 // onClick={() => navigate(`/mentee/refund/${interview.id}`, { state:{ interview } })}
//                 onClick={() => navigate(`/mentee/refund`)}
//               >
//                 <RefreshCw size={13}/> Refund
//               </button>
//             )}
//             {/* CANCEL → confirmation dialog */}
//             {isScheduled && (
//               <button
//                 className="sec-btn cancel"
//                 onClick={() => onCancel(interview)}
//               >
//                 <XCircle size={13}/> Cancel
//               </button>
//             )}
//           </Stack>
//         </Box>
//       )}
//     </Card>
//   );
// };

// /* ── MAIN COMPONENT ──────────────────────────────────────── */
// const Interviews: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading]    = useState(false);
//   const [tab, setTab] = useState("upcoming");
//   const [interviews, setInterviews] = useState<Interview[]>(INITIAL);
//   const [cancelTarget, setCancelTarget] = useState<Interview|null>(null);
//   const [snack, setSnack] = useState<{ open:boolean; msg:string; type:"success"|"info"|"warning" }>({ open:false, msg:"", type:"success" });

//   const showSnack = (msg:string, type:"success"|"info"|"warning"="success") =>
//     setSnack({ open:true, msg, type });

//   const filtered = useMemo(() => {
//     if (tab==="upcoming")  return interviews.filter(i=>i.status!=="Completed"&&i.status!=="Cancelled");
//     if (tab==="completed") return interviews.filter(i=>i.status==="Completed");
//     if (tab==="cancelled") return interviews.filter(i=>i.status==="Cancelled");
//     return interviews;
//   }, [tab, interviews]);

//   const counts = useMemo(() => ({
//     upcoming:  interviews.filter(i=>i.status!=="Completed"&&i.status!=="Cancelled").length,
//     completed: interviews.filter(i=>i.status==="Completed").length,
//     cancelled: interviews.filter(i=>i.status==="Cancelled").length,
//   }), [interviews]);

//   /* Cancel confirm */
//   const confirmCancel = () => {
//     if (!cancelTarget) return;
//     const refundable = hoursUntil(cancelTarget.date, cancelTarget.time) >= REFUND_WINDOW_HOURS;
//     setInterviews(prev => prev.map(i =>
//       i.id===cancelTarget.id
//         ? { ...i, status:"Cancelled", paymentStatus:refundable&&i.paymentStatus==="Paid"?"Refunded":i.paymentStatus }
//         : i
//     ));
//     setCancelTarget(null);
//     showSnack(refundable?"Interview cancelled. Refund initiated.":"Interview cancelled.", "info");
//   };

//   /* Pay now → navigate to payment page with session state */
//   const handlePay = (iv: Interview) => {
//     navigate("/payment", { state:{ interview:iv } });
//   };

//   return (
//     <>
//       <style>{css}</style>
//       <Box sx={{ background:"#FFFFFF", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden", maxWidth:"100vw" }}>

//         {/* ── HEADER ─────────────────────────────────── */}
//         <Box sx={{ background:"#FFFFFF", borderBottom:`1px solid ${BORDER}`, px:{ xs:2, sm:3, md:8 }, py:{ xs:3, md:5 }, overflowX:"hidden" }}>
//           {/* background:WHITE, */}
//           <Box maxWidth="lg" mx="auto">
//             <Stack direction={{ xs:"column", sm:"row" }} justifyContent="space-between" alignItems={{ xs:"flex-start", sm:"center" }} spacing={2}>
//               <Box>
//                 <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"1.5rem", sm:"1.8rem", md:"2.4rem" }, fontWeight:800, color:INK, letterSpacing:"-0.02em", lineHeight:1.1 }}>
//                   My interviews
//                 </Typography>
//                 <Typography sx={{ fontSize:14, color:INK2, mt:.5 }}>Manage your upcoming and past sessions</Typography>
//               </Box>
//               <button
//                 onClick={() => navigate("/mentee/professionals")}
//                 style={{
//                   display:"inline-flex", alignItems:"center", gap:7,
//                   padding:"11px 22px", borderRadius:100,
//                   fontSize:14, fontWeight:500, fontFamily:"'DM Sans',sans-serif",
//                   background:P, color:"#fff", border:"none", cursor:"pointer",
//                   boxShadow:"0 4px 16px rgba(127,66,231,.25)",
//                   transition:"all .2s",
//                   whiteSpace:"nowrap", flexShrink:0,
//                 }}
//               >
//                 <ChevronRight size={15}/> Book a session
//               </button>
//             </Stack>
//           </Box>
//         </Box>

//         {/* ── TABS ───────────────────────────────────── */}
//         <Box sx={{ background:"#FFFFFF", borderBottom:`1px solid ${BORDER}`, px:{ xs:2, sm:3, md:8 }, overflowX:"auto", "&::-webkit-scrollbar":{ display:"none" }, msOverflowStyle:"none", scrollbarWidth:"none" }}>
//           <Box maxWidth="lg" mx="auto">
//             <Stack direction="row" spacing={0}>
//               {[
//                 { key:"upcoming",  label:"Upcoming",  count:counts.upcoming  },
//                 { key:"completed", label:"Completed", count:counts.completed },
//                 { key:"cancelled", label:"Cancelled", count:counts.cancelled },
//               ].map(({ key, label, count }) => (
//                 <button
//                   key={key}
//                   className={tab===key?"tab-active":""}
//                   onClick={() => setTab(key)}
//                   style={{
//                     padding:"14px 16px", background:"none", border:"none",
//                     cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
//                     fontSize:14, fontWeight:tab===key?600:400,
//                     color:tab===key?P:INK2,
//                     display:"flex", alignItems:"center", gap:7,
//                     position:"relative", whiteSpace:"nowrap", flexShrink:0,
//                   }}
//                 >
//                   {label}
//                   {count > 0 && (
//                     <Box sx={{
//                       background:tab===key?P_LITE:"#F3F4F6",
//                       color:tab===key?P:INK2,
//                       fontSize:11, fontWeight:700,
//                       borderRadius:100, px:.9, py:.1,
//                       minWidth:20, textAlign:"center",
//                       fontFamily:"'DM Mono',monospace",
//                     }}>
//                       {count}
//                     </Box>
//                   )}
//                 </button>
//               ))}
//             </Stack>
//           </Box>
//         </Box>

//         {/* ── CONTENT ────────────────────────────────── */}
//         <Box sx={{ py:{ xs:3, md:6 }, px:{ xs:2, sm:3, md:8 }, overflowX:"hidden" }}>
//           <Box maxWidth="lg" mx="auto">
//             {loading ? (
//               <Grid container spacing={3}>
//                 {Array.from({ length:3 }).map((_,i) => (
//                   <Grid item xs={12} sm={6} md={4} key={i}><InterviewSkeleton/></Grid>
//                 ))}
//               </Grid>
//             ) : filtered.length === 0 ? (
//               <EmptyState tab={tab}/>
//             ) : (
//               <Grid container spacing={3}>
//                 {filtered.map(iv => (
//                   <Grid item xs={12} sm={6} md={4} key={iv.id}>
//                     <InterviewCard
//                       interview={iv}
//                       onCancel={setCancelTarget}
//                       onPay={handlePay}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </Box>
//         </Box>

//         {/* ── CANCEL DIALOG ──────────────────────────── */}
//         <Dialog
//           open={!!cancelTarget}
//           onClose={() => setCancelTarget(null)}
//           PaperProps={{ sx:{ borderRadius:3, border:`1.5px solid ${BORDER}`, boxShadow:"0 24px 64px rgba(0,0,0,.08)", p:1, mx:2, width:"100%", maxWidth:440 } }}
//         >
//           <DialogTitle sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:INK }}>
//             Cancel this session?
//           </DialogTitle>
//           <DialogContent>
//             <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.7 }}>
//               You're about to cancel your session with{" "}
//               <strong>{cancelTarget?.professional}</strong> on{" "}
//               {cancelTarget && formatDate(cancelTarget.date)}.
//             </Typography>
//             {cancelTarget && hoursUntil(cancelTarget.date, cancelTarget.time) >= REFUND_WINDOW_HOURS ? (
//               <Box sx={{ mt:2, background:GREEN_L, borderRadius:"10px", p:1.75 }}>
//                 <Typography sx={{ fontSize:13, color:GREEN, fontWeight:500 }}>
//                   ✓ You're eligible for a full refund of R{cancelTarget.price}
//                 </Typography>
//               </Box>
//             ) : cancelTarget?.paymentStatus === "Paid" ? (
//               <Box sx={{ mt:2, background:"#FEE2E2", borderRadius:"10px", p:1.75 }}>
//                 <Typography sx={{ fontSize:13, color:RED, fontWeight:500 }}>
//                   ✗ Less than {REFUND_WINDOW_HOURS}h to session — no refund available
//                 </Typography>
//               </Box>
//             ) : null}
//           </DialogContent>
//           <DialogActions sx={{ px:3, pb:2, flexWrap:"wrap", gap:1 }}>
//             <button
//               onClick={() => setCancelTarget(null)}
//               style={{ padding:"10px 20px", borderRadius:100, border:`1.5px solid ${BORDER}`, background:WHITE, color:INK2, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14 }}
//             >
//               Keep it
//             </button>
//             <button
//               onClick={confirmCancel}
//               style={{ padding:"10px 20px", borderRadius:100, border:"none", background:RED, color:"#fff", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600 }}
//             >
//               Yes, cancel
//             </button>
//           </DialogActions>
//         </Dialog>

//         {/* ── SNACKBAR ───────────────────────────────── */}
//         <Snackbar
//           open={snack.open}
//           autoHideDuration={4000}
//           onClose={() => setSnack({...snack, open:false})}
//           anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
//         >
//           <Alert severity={snack.type} onClose={() => setSnack({...snack, open:false})} sx={{ borderRadius:2 }}>
//             {snack.msg}
//           </Alert>
//         </Snackbar>

//       </Box>
//     </>
//   );
// };

// export default Interviews;