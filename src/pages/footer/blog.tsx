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


import { Search as SearchIcon, Clock as ClockIcon, Tag } from "lucide-react";

const POSTS = [
  { title:"How to Land Your First Internship in South Africa", category:"Career Tips", date:"10 Apr 2026", readTime:"5 min", excerpt:"A step-by-step guide to help students and graduates secure internships in top SA companies.", image:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80", featured:true },
  { title:"Top 10 Most In-Demand Tech Skills in 2026",          category:"Tech",        date:"5 Apr 2026",  readTime:"7 min", excerpt:"Discover the most valuable skills employers are looking for in developers, analysts, and engineers.", image:"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80", featured:false },
  { title:"How to Prepare for Your First Job Interview",         category:"Interviews",  date:"1 Apr 2026",  readTime:"6 min", excerpt:"Learn how to confidently answer interview questions and stand out from other candidates.", image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", featured:false },
  { title:"The STAR Method: Answer Behavioural Questions Right", category:"Interviews",  date:"28 Mar 2026", readTime:"4 min", excerpt:"Master the Situation-Task-Action-Result framework and never fumble a behavioural question again.", image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", featured:false },
  { title:"ATS Systems Explained: Why Your CV Gets Ghosted",     category:"CV Tips",     date:"22 Mar 2026", readTime:"8 min", excerpt:"Most applications are rejected by software before a human reads them. Here's how to beat the bots.", image:"https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80", featured:false },
];

const CATEGORIES = ["All", "Career Tips", "Interviews", "Tech", "CV Tips"];

export const Blog = () => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = POSTS.filter(p =>
    (cat==="All" || p.category===cat) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );
  const featured = filtered.find(p=>p.featured);
  const rest = filtered.filter(p=>!p.featured);

  return (
    <>
      <style>{sharedCss}</style>
      <Box sx={{ background:OFF, fontFamily:"'DM Sans',sans-serif", pb:10 }}>
        {/* HERO */}
        <Box sx={{ background:`linear-gradient(160deg,${P_LITE} 0%,#fff 55%)`, pt:{ xs:10, md:14 }, pb:{ xs:8, md:10 }, px:{ xs:3, md:8 }, textAlign:"center" }}>
          <span className="section-label">Career Blog</span>
          <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2.2rem", md:"3.2rem" }, fontWeight:800, color:INK, letterSpacing:"-0.025em", lineHeight:1.06, mt:1.5, mb:2 }}>
            Tips, insights, strategies.
          </Typography>
          <Typography sx={{ fontSize:16, color:INK2, lineHeight:1.65, fontWeight:300, maxWidth:460, mx:"auto", mb:4 }}>
            Everything you need to land jobs, grow your career, and stand out in South Africa.
          </Typography>
          <Box sx={{ maxWidth:480, mx:"auto", position:"relative" }}>
            <SearchIcon size={15} style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:INK2 }}/>
            <input className="input-field" style={{ paddingLeft:42 }} placeholder="Search articles..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </Box>
        </Box>

        <Box maxWidth="lg" mx="auto" px={{ xs:2, md:4 }} mt={4}>
          {/* Category filters */}
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={5}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={()=>setCat(c)}
                style={{ padding:"8px 18px", borderRadius:100, border:`1.5px solid ${cat===c?P:BORDER}`, background:cat===c?P_LITE:"#fff", color:cat===c?P:INK2, fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, cursor:"pointer", transition:"all .15s" }}>
                {c}
              </button>
            ))}
          </Stack>

          {/* Featured post */}
          {featured && (
            <Box sx={{ mb:6, border:`1.5px solid ${BORDER}`, borderRadius:"20px", overflow:"hidden", background:"#fff", display:"flex", flexDirection:{ xs:"column", md:"row" } }}>
              <Box sx={{ width:{ md:"48%" }, flexShrink:0, background:"#F3F4F6", minHeight:280 }}>
                <img src={featured.image} alt={featured.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              </Box>
              <Box sx={{ p:{ xs:3, md:5 }, display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <Stack direction="row" spacing={1} mb={2}>
                  <Box sx={{ background:P_LITE, color:P, borderRadius:100, px:1.5, py:.4, fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Featured</Box>
                  <Box sx={{ background:"#F3F4F6", color:INK2, borderRadius:100, px:1.5, py:.4, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>{featured.category}</Box>
                </Stack>
                <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.4rem", md:"1.8rem" }, color:INK, lineHeight:1.1, letterSpacing:"-0.02em", mb:1.5 }}>
                  {featured.title}
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <Stack direction="row" spacing={.5} alignItems="center"><ClockIcon size={12} color={INK2}/><Typography sx={{ fontSize:12.5, color:INK2 }}>{featured.readTime} read</Typography></Stack>
                  <Typography sx={{ fontSize:12.5, color:INK2 }}>·</Typography>
                  <Typography sx={{ fontSize:12.5, color:INK2 }}>{featured.date}</Typography>
                </Stack>
                <Typography sx={{ fontSize:14.5, color:INK2, lineHeight:1.7, mb:3 }}>{featured.excerpt}</Typography>
                <a href="#" className="cta-primary" style={{ alignSelf:"flex-start" }}>Read article <ArrowRight size={14}/></a>
              </Box>
            </Box>
          )}

          {/* Grid */}
          <Grid container spacing={3}>
            {rest.map((post, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ border:`1.5px solid ${BORDER}`, borderRadius:"16px", background:"#fff", overflow:"hidden", height:"100%", display:"flex", flexDirection:"column", transition:"all .22s cubic-bezier(.34,1.56,.64,1)", "&:hover":{ transform:"translateY(-4px)", boxShadow:`0 16px 40px rgba(127,66,231,.1)` } }}>
                  <Box sx={{ height:180, background:"#F3F4F6", flexShrink:0 }}>
                    <img src={post.image} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                  </Box>
                  <Box sx={{ p:2.5, display:"flex", flexDirection:"column", flex:1 }}>
                    <Box sx={{ background:P_LITE, color:P, borderRadius:100, px:1.25, py:.35, fontSize:11.5, fontWeight:600, fontFamily:"'DM Sans',sans-serif", display:"inline-block", mb:1.5 }}>{post.category}</Box>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:INK, lineHeight:1.25, mb:1 }}>{post.title}</Typography>
                    <Typography sx={{ fontSize:13, color:INK2, lineHeight:1.6, mb:2, flex:1 }}>{post.excerpt}</Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize:12, color:INK2 }}>{post.date}</Typography>
                      <a href="#" style={{ fontSize:13, fontWeight:600, color:P, textDecoration:"none", display:"flex", alignItems:"center", gap:4, fontFamily:"'DM Sans',sans-serif" }}>Read <ArrowRight size={12}/></a>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {filtered.length === 0 && (
            <Box sx={{ textAlign:"center", py:10 }}>
              <Typography sx={{ fontSize:14, color:INK2 }}>No articles found. Try a different search.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};