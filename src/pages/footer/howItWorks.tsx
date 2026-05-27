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

import { GraduationCap, Briefcase as BriefcaseIcon, Building2 as Building2Icon } from "lucide-react";

export const HowItWorks = () => {
  const STEPS = [
    { num:"01", title:"Create your profile",    desc:"Sign up in 2 minutes. Tell us your target role, industry, and experience level so we can personalise everything." },
    { num:"02", title:"Explore opportunities",  desc:"Browse internships, graduate programmes, and job listings tailored to your career path and goals." },
    { num:"03", title:"Practice & prepare",     desc:"AI mock interviews on demand. Real professional sessions when you're ready to level up." },
    { num:"04", title:"Apply & get hired",       desc:"Apply to jobs directly, track your applications, and walk into every interview fully prepared." },
  ];

  const AUDIENCES = [
    { icon:<GraduationCap size={20}/>, who:"Students",      points:["Find internships and grad programmes","Practice with AI & real professionals","Build confidence before applying"] },
    { icon:<BriefcaseIcon size={20}/>, who:"Professionals", points:["Monetize your expertise","Help candidates prepare","Build your personal brand"] },
    { icon:<Building2Icon size={20}/>, who:"Companies",     points:["Post jobs and internships","Access prepared candidates","Reduce hiring risk"] },
  ];

  return (
    <>
      <style>{sharedCss}</style>
      <Box sx={{ background:OFF, fontFamily:"'DM Sans',sans-serif", pb:10 }}>
        <Box sx={{ background:`linear-gradient(160deg,${P_LITE} 0%,#fff 55%)`, pt:{ xs:10, md:14 }, pb:{ xs:8, md:10 }, px:{ xs:3, md:8 }, textAlign:"center" }}>
          <span className="section-label">Process</span>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2.2rem", md:"3.2rem" }, fontWeight:800, color:INK, letterSpacing:"-0.025em", lineHeight:1.06, mt:1.5, mb:2 }}>
            How it works.
          </Typography>
          <Typography sx={{ fontSize:16, color:INK2, lineHeight:1.65, fontWeight:300, maxWidth:460, mx:"auto" }}>
            A simple, powerful way to prepare, apply, and get hired faster.
          </Typography>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }}>
          <Grid container spacing={3} mb={8} mt={2}>
            {STEPS.map((step, i) => (
              <Grid item xs={12} md={6} lg={3} key={i}>
                <Box sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"18px", background:"#fff", p:3.5, height:"100%", position:"relative", overflow:"hidden", transition:"all .22s cubic-bezier(.34,1.56,.64,1)", "&:hover":{ transform:"translateY(-4px)", boxShadow:`0 14px 36px rgba(127,66,231,.1)`, borderColor:P_LITE } }}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:"5rem", fontWeight:800, color:`${P}10`, position:"absolute", top:-16, right:10, lineHeight:1, userSelect:"none" }}>{step.num}</Typography>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:1 }}>{step.title}</Typography>
                  <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.7 }}>{step.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} mb={8}>
            {AUDIENCES.map(({ icon, who, points }, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"18px", background:"#fff", p:3.5, height:"100%" }}>
                  <Box sx={{ width:44, height:44, borderRadius:"11px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", color:P, mb:2 }}>{icon}</Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:2 }}>For {who}</Typography>
                  <Stack spacing={1.5}>
                    {points.map((pt, j) => (
                      <Stack key={j} direction="row" spacing={1.25} alignItems="flex-start">
                        <Box sx={{ width:6, height:6, borderRadius:"50%", background:P, flexShrink:0, mt:.75 }}/>
                        <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.6 }}>{pt}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ background:INK, borderRadius:"20px", p:{ xs:4, md:6 }, textAlign:"center", position:"relative", overflow:"hidden" }}>
            <Box sx={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${P}30 0%,transparent 65%)`, pointerEvents:"none" }}/>
            <Box sx={{ position:"relative", zIndex:1 }}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.6rem", md:"2.4rem" }, color:"#fff", mb:1.5, letterSpacing:"-0.02em" }}>
                Ready to take the next step?
              </Typography>
              <Typography sx={{ fontSize:15, color:"rgba(255,255,255,.45)", mb:4 }}>Start your journey today and unlock real opportunities.</Typography>
              <a href="/ai-practice" className="cta-primary">Get started <ArrowRight size={14}/></a>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};