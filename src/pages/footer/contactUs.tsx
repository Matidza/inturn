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


import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export const ContactUs = () => {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(f => ({ ...f, [k]:e.target.value }));

  const handleSubmit = () => {
    console.log(form);
    setSent(true);
  };

  return (
    <>
      <style>{sharedCss}{`
        .form-group{display:flex;flex-direction:column;gap:6px}
        .form-label{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:${INK2};text-transform:uppercase;letter-spacing:0.07em}
        textarea.input-field{min-height:120px;resize:vertical}
        select.input-field{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C5C72' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}
      `}</style>
      <Box sx={{ background:OFF, fontFamily:"'DM Sans',sans-serif", pb:10 }}>
        {/* HERO */}
        <Box sx={{ background:`linear-gradient(160deg,${P_LITE} 0%,#fff 55%)`, pt:{ xs:10, md:14 }, pb:{ xs:8, md:10 }, px:{ xs:3, md:8 } }}>
          <Box maxWidth="lg" mx="auto">
            <span className="section-label">Get in touch</span>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2.2rem", md:"3.2rem" }, fontWeight:800, color:INK, letterSpacing:"-0.025em", lineHeight:1.06, mt:1.5, mb:2, maxWidth:560 }}>
              We'd love to hear from you.
            </Typography>
            <Typography sx={{ fontSize:16, color:INK2, lineHeight:1.65, fontWeight:300, maxWidth:480 }}>
              Whether you're a student, professional, or company — feel free to reach out. We aim to respond within 24 hours.
            </Typography>
          </Box>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} mt={-4}>
          <Grid container spacing={4}>
            {/* Info panel */}
            <Grid item xs={12} md={4}>
              <Box sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:4, mb:3 }}>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:INK, mb:3 }}>Contact info</Typography>
                <Stack spacing={3}>
                  {[
                    { icon:<Mail size={16}/>,    label:"Email",    val:"matidza46@gmail.com",          href:"mailto:matidza46@gmail.com" },
                    { icon:<Phone size={16}/>,   label:"Phone",    val:"+27 66 434 7295",               href:"tel:+27664347295" },
                    { icon:<MapPin size={16}/>,  label:"Location", val:"Vereeniging, Gauteng, SA",     href:"#" },
                  ].map(({ icon, label, val, href }) => (
                    <Stack direction="row" spacing={1.5} alignItems="flex-start" key={label}>
                      <Box sx={{ width:34, height:34, borderRadius:"8px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", color:P, flexShrink:0 }}>{icon}</Box>
                      <Box>
                        <Typography sx={{ fontSize:11.5, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.07em", mb:.25 }}>{label}</Typography>
                        <a href={href} style={{ fontSize:14, color:INK, textDecoration:"none", fontFamily:"'DM Sans',sans-serif" }}>{val}</a>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ background:P, borderRadius:"16px", p:3 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                  <Clock size={15} color="rgba(255,255,255,.6)"/>
                  <Typography sx={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,.6)", textTransform:"uppercase", letterSpacing:"0.07em" }}>Support hours</Typography>
                </Stack>
                <Typography sx={{ fontSize:14, color:"#fff", lineHeight:1.7, fontFamily:"'DM Sans',sans-serif" }}>Monday – Friday<br/>9:00 AM – 6:00 PM SAST</Typography>
              </Box>
            </Grid>

            {/* Form */}
            <Grid item xs={12} md={8}>
              {sent ? (
                <Box sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:6, textAlign:"center" }}>
                  <Box sx={{ width:64, height:64, borderRadius:"50%", background:"#ECFDF5", display:"flex", alignItems:"center", justifyContent:"center", mx:"auto", mb:2.5 }}>
                    <CheckCircle2 size={30} color="#00916E"/>
                  </Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", color:INK, mb:1 }}>Message sent!</Typography>
                  <Typography sx={{ fontSize:14.5, color:INK2, lineHeight:1.7 }}>
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ background:"#fff", border:`1.5px solid ${BORDER}`, borderRadius:"20px", p:{ xs:3, md:4.5 } }}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.15rem", color:INK, mb:3.5 }}>Send us a message</Typography>
                  <Stack spacing={2.5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <div className="form-group">
                          <label className="form-label">Full name</label>
                          <input className="input-field" placeholder="Zwivhuya Mukwevho" value={form.name} onChange={set("name")}/>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input className="input-field" type="email" placeholder="zwivhuya@email.com" value={form.email} onChange={set("email")}/>
                        </div>
                      </Grid>
                    </Grid>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <select className="input-field" value={form.subject} onChange={set("subject")}>
                        <option value="">Select a topic</option>
                        <option>Account & Login</option>
                        <option>Payments & Billing</option>
                        <option>Session Booking</option>
                        <option>Technical Issue</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="input-field" placeholder="Tell us how we can help..." value={form.message} onChange={set("message")}/>
                    </div>
                    <button className="cta-primary" onClick={handleSubmit} style={{ alignSelf:"flex-start" }}>
                      <Send size={14}/> Send message
                    </button>
                  </Stack>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};