import React, { useState } from "react";
import { Box, Typography, Grid, Stack, Collapse } from "@mui/material";
import { Search, Headphones, CreditCard, Calendar, Wrench, ChevronDown, ChevronUp, ArrowRight, MessageSquare } from "lucide-react";

const P = "#7F42E7"; const P_DARK = "#5E2EC5"; const P_LITE = "#F0EAFD";
const INK = "#0D0D12"; const INK2 = "#5C5C72"; const BORDER = "#E8E3F5"; const OFF = "#F7F6FC";

const sharedCss = `
  *, *::before, *::after { box-sizing:border-box; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .fu{animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both}
  .d1{animation-delay:.08s} .d2{animation-delay:.16s} .d3{animation-delay:.24s}
  .cta-primary{background:${P};color:#fff;border:none;border-radius:100px;padding:13px 28px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:7px;text-decoration:none;transition:all .2s}
  .cta-primary:hover{background:${P_DARK};transform:translateY(-2px);box-shadow:0 8px 24px rgba(127,66,231,.3)}
  .cta-ghost{background:transparent;color:${P};border:1.5px solid ${P};border-radius:100px;padding:12px 24px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:7px;text-decoration:none;transition:all .2s}
  .cta-ghost:hover{background:${P};color:#fff;transform:translateY(-2px)}
  .section-label{font-family:'DM Sans',sans-serif;font-size:11.5px;font-weight:700;color:${P};text-transform:uppercase;letter-spacing:0.1em}
  .input-field{width:100%;padding:13px 16px;border:1.5px solid ${BORDER};border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;color:${INK};background:#fff;outline:none;transition:border-color .2s}
  .input-field:focus{border-color:${P}}
  .input-field::placeholder{color:${INK2};opacity:.6}
`;

const SUPPORT_CATS = [
  { icon:<Headphones size={18}/>, title:"Account issues",      desc:"Login problems, password reset, account settings" },
  { icon:<CreditCard size={18}/>, title:"Payments & billing",  desc:"Subscriptions, refunds, and payment methods" },
  { icon:<Calendar size={18}/>,   title:"Session management",  desc:"Booking, cancellations, and rescheduling" },
  { icon:<Wrench size={18}/>,     title:"Technical support",   desc:"Bugs, errors, or platform issues" },
];

const FAQS = [
  { q:"How do I book a session?",         a:"Browse professionals, select a session type, choose a time slot, confirm your booking, and pay. The professional then approves and you receive a confirmation." },
  { q:"How do payments work?",            a:"Payment is charged only after a professional approves your session request. You'll receive a secure payment link via email. We accept all major cards." },
  { q:"Can I cancel or reschedule?",      a:"Yes — sessions can be cancelled or rescheduled more than 24 hours before the start time. Within 24 hours, standard cancellation terms apply." },
  { q:"How do I become a mentor?",        a:"Sign up as a professional, complete your profile with your experience and specialty, set your availability and rates, and you're live. Students can find and book you immediately." },
  { q:"Is my payment information safe?",  a:"Yes. We use industry-standard encryption and work with PCI-compliant payment processors. We never store your full card details." },
  { q:"How does the AI interview work?",  a:"Our AI asks you real interview questions for your target role, listens to your responses via text or voice, scores each answer, and delivers detailed feedback instantly." },
];

const FaqItem = ({ q, a }: { q:string; a:string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ border:`1.5px solid ${open?P:BORDER}`, borderRadius:"14px", background:"#fff", overflow:"hidden", transition:"border-color .15s", mb:1.25 }}>
      <Box onClick={() => setOpen(o=>!o)} sx={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", p:2.5, cursor:"pointer", gap:2 }}>
        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14.5, color:INK, lineHeight:1.4 }}>{q}</Typography>
        <Box sx={{ color:open?P:INK2, flexShrink:0, mt:.2 }}>{open?<ChevronUp size={16}/>:<ChevronDown size={16}/>}</Box>
      </Box>
      <Collapse in={open}>
        <Box sx={{ px:2.5, pb:2.5 }}>
          <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.75 }}>{a}</Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

import { CheckCircle2 as Check, BookOpen as BookIcon, FileCheck, User } from "lucide-react";

export const InterviewCVTip = () => {
  const TIPS = [
    {
      icon:<User size={20}/>,
      title:"Build a strong CV",
      items:["Keep it 1–2 pages max","Highlight achievements, not just responsibilities","Use action words: Built, Led, Designed, Reduced","Tailor your CV for every single job"],
    },
    {
      icon:<BookIcon size={20}/>,
      title:"Ace your interview",
      items:["Research the company the night before","Practice common questions out loud — not in your head","Use the STAR method for every story","Prepare at least 3 questions to ask the interviewer"],
    },
    {
      icon:<FileCheck size={20}/>,
      title:"Stand out as a candidate",
      items:["Build a portfolio: GitHub, case studies, projects","Optimise your LinkedIn headline and summary","Network before you need a job","Show confidence and speak with specifics, not generalities"],
    },
  ];

  const COMMON_Q = [
    "Tell me about yourself",
    "Why should we hire you?",
    "What are your strengths and weaknesses?",
    "Describe a challenge you faced and how you handled it",
    "Where do you see yourself in 5 years?",
    "Tell me about a time you failed",
  ];

  return (
    <>
      <style>{sharedCss}</style>
      <Box sx={{ background:OFF, fontFamily:"'DM Sans',sans-serif", pb:10 }}>
        <Box sx={{ background:`linear-gradient(160deg,${P_LITE} 0%,#fff 55%)`, pt:{ xs:10, md:14 }, pb:{ xs:8, md:10 }, px:{ xs:3, md:8 }, textAlign:"center" }}>
          <span className="section-label">Preparation guide</span>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2.2rem", md:"3.2rem" }, fontWeight:800, color:INK, letterSpacing:"-0.025em", lineHeight:1.06, mt:1.5, mb:2 }}>
            Interview & CV tips.
          </Typography>
          <Typography sx={{ fontSize:16, color:INK2, lineHeight:1.65, fontWeight:300, maxWidth:480, mx:"auto" }}>
            Build a strong CV, prepare for interviews, and land your next job with these fundamentals.
          </Typography>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} mt={4}>
          <Grid container spacing={3} mb={8}>
            {TIPS.map((section, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"18px", background:"#fff", p:3.5, height:"100%", transition:"all .22s cubic-bezier(.34,1.56,.64,1)", "&:hover":{ transform:"translateY(-4px)", boxShadow:`0 14px 36px rgba(127,66,231,.1)` } }}>
                  <Box sx={{ width:44, height:44, borderRadius:"11px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", color:P, mb:2.5 }}>{section.icon}</Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2.5 }}>{section.title}</Typography>
                  <Stack spacing={1.75}>
                    {section.items.map((item, j) => (
                      <Stack key={j} direction="row" spacing={1.25} alignItems="flex-start">
                        <Check size={14} color="#00916E" style={{ flexShrink:0, marginTop:3 }}/>
                        <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.6 }}>{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mb:8 }}>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:INK, letterSpacing:"-0.02em", mb:3 }}>
              Common interview questions
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.25}>
              {COMMON_Q.map((q, i) => (
                <Box key={i} sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:100, px:2, py:.9, fontSize:13.5, fontFamily:"'DM Sans',sans-serif", color:INK, transition:"all .15s", cursor:"default", "&:hover":{ borderColor:P, background:P_LITE, color:P } }}>
                  {q}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ background:INK, borderRadius:"20px", p:{ xs:4, md:6 }, textAlign:"center", position:"relative", overflow:"hidden" }}>
            <Box sx={{ position:"absolute", top:-40, right:-40, width:220, height:220, borderRadius:"50%", background:`radial-gradient(circle,${P}40 0%,transparent 70%)`, pointerEvents:"none" }}/>
            <Box sx={{ position:"relative", zIndex:1 }}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.5rem", md:"2rem" }, color:"#fff", mb:1.5, letterSpacing:"-0.02em" }}>
                Want real interview practice?
              </Typography>
              <Typography sx={{ fontSize:15, color:"rgba(255,255,255,.45)", mb:4, lineHeight:1.65 }}>
                Practice with AI or connect with real professionals and get feedback that improves your chances.
              </Typography>
              <Stack direction={{ xs:"column", sm:"row" }} spacing={1.5} justifyContent="center">
                <a href="/ai-practice" className="cta-primary">Start practicing <ArrowRight size={14}/></a>
                <a href="/professionals" className="cta-ghost" style={{ border:"1.5px solid rgba(255,255,255,.25)", color:"#fff" }}>Browse professionals</a>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};