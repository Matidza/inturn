import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import {
  Target, Eye, Zap, FileText, Users, Briefcase,
  Globe, TrendingUp, Shield, Heart, ArrowRight,
} from "lucide-react";
import showli from "../../assets/4750.jpg";

/* ── TOKENS ─────────────────────────────────────────── */
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#5C5C72";
const BORDER = "#E8E3F5";
const OFF    = "#F7F6FC";

/* ── CSS ─────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing:border-box; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmer {
    from { background-position:-250% center; }
    to   { background-position: 250% center; }
  }
  @keyframes orb {
    0%,100% { opacity:.45; transform:scale(1); }
    50%      { opacity:.75; transform:scale(1.07); }
  }

  .fu  { animation:fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.08s; }
  .d2  { animation-delay:.16s; }
  .d3  { animation-delay:.24s; }
  .d4  { animation-delay:.32s; }

  .shine-p {
    background-image:linear-gradient(90deg,${P} 0%,${P_MID} 48%,${P} 100%);
    background-size:250% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    animation:shimmer 4.5s linear infinite;
  }

  .mv-card {
    border:1.5px solid ${BORDER}; border-radius:18px;
    background:#fff; padding:32px; height:100%;
    transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
  }
  .mv-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(127,66,231,.1); }

  .what-card {
    border:1.5px solid ${BORDER}; border-radius:16px;
    background:#fff; padding:24px; height:100%;
    transition:transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
  }
  .what-card:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(127,66,231,.09); }

  .value-row {
    display:flex; align-items:flex-start; gap:14px;
    padding:20px 24px; border:1.5px solid ${BORDER};
    border-radius:14px; background:#fff;
    transition:border-color .15s, background .15s;
  }
  .value-row:hover { border-color:${P_MID}; background:${P_LITE}; }
  .value-icon {
    width:38px; height:38px; border-radius:9px;
    background:${P_LITE}; display:flex; align-items:center;
    justify-content:center; color:${P}; flex-shrink:0;
    transition:all .15s;
  }
  .value-row:hover .value-icon { background:${P}; color:#fff; }

  .story-block {
    border-left:3px solid ${P}; padding-left:20px;
    margin-bottom:24px;
  }

  .founder-card {
    background:${INK}; border-radius:24px;
    padding:40px; position:relative; overflow:hidden;
  }
  .founder-avatar {
    width:90px; height:90px; border-radius:50%;
    border:3px solid ${P}; object-fit:cover;
    position:relative; z-index:1;
    flex-shrink:0; opacity: 0.07;
    overflow: "hidden";
  }         
              
  .section-label {
    font-family:'DM Sans',sans-serif;
    font-size:11.5px; font-weight:700; color:${P};
    text-transform:uppercase; letter-spacing:0.1em;
  }

  .cta-btn {
    display:inline-flex; align-items:center; gap:7px;
    padding:13px 28px; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
    text-decoration:none; border:none; cursor:pointer; transition:all .2s;
  }
  .cta-primary { background:${P}; color:#fff; }
  .cta-primary:hover { background:${P_DARK}; transform:translateY(-2px); box-shadow:0 8px 24px rgba(127,66,231,.3); }
`;

/* ── DATA ─────────────────────────────────────────────── */
const WHAT_WE_DO = [
  { icon:<Zap size={18}/>,       title:"AI Mock Interviews",        desc:"Practice real-world interview scenarios powered by AI and receive instant, scored feedback." },
  { icon:<FileText size={18}/>,  title:"CV & ATS Optimization",     desc:"Improve your CV to pass Applicant Tracking Systems and get in front of more recruiters." },
  { icon:<Users size={18}/>,     title:"Professional Coaching",     desc:"Connect with industry professionals who evaluate your skills and readiness in real time." },
  { icon:<Briefcase size={18}/>, title:"Opportunity Access",        desc:"Discover internships and jobs shared directly by companies looking for prepared talent." },
];

const VALUES = [
  { icon:<Globe size={17}/>,    title:"Accessibility", desc:"Opportunities should not be limited by background, university name, or network." },
  { icon:<TrendingUp size={17}/>,title:"Growth",       desc:"Continuous improvement through real feedback, not generic advice." },
  { icon:<Shield size={17}/>,   title:"Transparency",  desc:"Honest insights and real-world expectations — no sugarcoating." },
  { icon:<Heart size={17}/>,    title:"Impact",         desc:"Everything we build is focused on real career outcomes, not vanity metrics." },
];

const STATS = [
  { value:"2026", label:"Founded" },
  { value:"12K+", label:"Students helped" },
  { value:"850+", label:"Professionals" },
  { value:"SA 🇿🇦", label:"Based in" },
];

/* ── COMPONENT ────────────────────────────────────────── */
const AboutUs = () => {
  return (
    <>
      <style>{css}</style>
      <Box sx={{ background:OFF, fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>

        {/* ══ HERO ══════════════════════════════════════════ */}
        <Box sx={{
          background:`linear-gradient(160deg,${P_LITE} 0%,#fff 55%)`,
          pt:{ xs:10, md:16 }, pb:{ xs:10, md:14 },
          px:{ xs:3, md:8 },
          position:"relative", overflow:"hidden",
        }}>
          {/* Decorative orbs */}
          <Box sx={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle,${P}25 0%,transparent 70%)`, animation:"orb 9s ease-in-out infinite", pointerEvents:"none" }}/>

          <Box maxWidth="lg" mx="auto">
            <Box className="fu">
              <span className="section-label">About inTURN</span>
            </Box>
            <Box className="fu d1" mt={2} maxWidth={820}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2.4rem", md:"4rem" }, fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.04, color:INK }}>
                Building the bridge between{" "}
                <span className="shine-p">students and real opportunities.</span>
              </Typography>
            </Box>
            <Box className="fu d2" mt={3} maxWidth={600}>
              <Typography sx={{ fontSize:{ xs:15, md:17 }, color:INK2, lineHeight:1.75, fontWeight:300 }}>
                inTurn exists to solve one of the biggest problems students face today: being academically qualified but completely unprepared for real-world interviews. We combine AI-powered simulations with real professional feedback to help you become truly job-ready.
              </Typography>
            </Box>
            <Box className="fu d3" mt={4}>
              <a href="/login" className="cta-btn cta-primary">
                Start preparing free <ArrowRight size={14}/>
              </a>
            </Box>
          </Box>
        </Box>

        {/* ══ STATS ═══════════════════════════════════════ */}
        <Box sx={{ background:INK, py:{ xs:4, md:5 }, px:{ xs:3, md:8 } }}>
          <Box maxWidth="lg" mx="auto">
            <Grid container spacing={2}>
              {STATS.map(({ value, label }) => (
                <Grid item xs={6} md={3} key={label}>
                  <Stack alignItems="center" spacing={.25}>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:{ xs:"1.8rem", md:"2.2rem" }, color:"#fff", letterSpacing:"-0.01em" }}>{value}</Typography>
                    <Typography sx={{ fontSize:12.5, color:"rgba(255,255,255,.38)", textAlign:"center" }}>{label}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ══ MISSION / VISION ════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, px:{ xs:3, md:8 }, background:"#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack spacing={1} mb={7} alignItems={{ xs:"center", md:"flex-start" }}>
              <span className="section-label">Why we exist</span>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2rem", md:"2.8rem" }, fontWeight:800, color:INK, lineHeight:1.08, letterSpacing:"-0.025em", textAlign:{ xs:"center", md:"left" } }}>
                Mission & vision.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <div className="mv-card">
                  <Box sx={{ width:44, height:44, borderRadius:"11px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", color:P, mb:2.5 }}>
                    <Target size={20}/>
                  </Box>
                  <Typography sx={{ fontSize:11.5, fontWeight:700, color:P, textTransform:"uppercase", letterSpacing:"0.09em", mb:1 }}>Our mission</Typography>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.2rem", color:INK, mb:1.5, lineHeight:1.2 }}>
                    Empower students with tools and confidence.
                  </Typography>
                  <Typography sx={{ fontSize:14.5, color:INK2, lineHeight:1.75 }}>
                    To give every student the tools, confidence, and real-world experience they need to succeed in interviews and secure meaningful careers — regardless of where they started.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="mv-card">
                  <Box sx={{ width:44, height:44, borderRadius:"11px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", color:P, mb:2.5 }}>
                    <Eye size={20}/>
                  </Box>
                  <Typography sx={{ fontSize:11.5, fontWeight:700, color:P, textTransform:"uppercase", letterSpacing:"0.09em", mb:1 }}>Our vision</Typography>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.2rem", color:INK, mb:1.5, lineHeight:1.2 }}>
                    Equal access to career opportunities.
                  </Typography>
                  <Typography sx={{ fontSize:14.5, color:INK2, lineHeight:1.75 }}>
                    A world where every student, regardless of background, has equal access to career opportunities through preparation, mentorship, and technology built to level the playing field.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* ══ WHAT WE DO ══════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, px:{ xs:3, md:8 }, background:P_LITE }}>
          <Box maxWidth="lg" mx="auto">
            <Stack spacing={1} mb={7} alignItems="center" textAlign="center">
              <span className="section-label">The platform</span>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2rem", md:"2.8rem" }, fontWeight:800, color:INK, lineHeight:1.08, letterSpacing:"-0.025em" }}>
                What we do.
              </Typography>
            </Stack>
            <Grid container spacing={3}>
              {WHAT_WE_DO.map((item, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <div className="what-card">
                    <Box sx={{ width:44, height:44, borderRadius:"11px", background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", color:P, mb:2.5 }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:INK, mb:1, lineHeight:1.2 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize:13.5, color:INK2, lineHeight:1.7 }}>{item.desc}</Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ══ OUR STORY ═══════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, px:{ xs:3, md:8 }, background:"#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Grid container spacing={{ xs:4, md:10 }} alignItems="flex-start">
              {/* Left: heading */}
              <Grid item xs={12} md={4}>
                <Box sx={{ position:{ md:"sticky" }, top:100 }}>
                  <span className="section-label">Origin</span>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2rem", md:"2.6rem" }, fontWeight:800, color:INK, lineHeight:1.08, letterSpacing:"-0.025em", mt:1 }}>
                    Our story.
                  </Typography>
                  <Box sx={{ width:48, height:3, borderRadius:100, background:P, mt:2 }}/>
                </Box>
              </Grid>

              {/* Right: paragraphs */}
              <Grid item xs={12} md={8}>
                <Stack spacing={4}>
                  {[
                    {
                      heading:"The problem we saw",
                      text:"inTurn was born out of a simple but frustrating reality — students were doing everything right academically but still failing interviews. There was a clear and painful gap between education and employability.",
                    },
                    {
                      heading:"What we realized",
                      text:"Preparation wasn't just about knowledge — it was about experience, confidence, and feedback. Reading about interviews is not the same as doing them. Theory never beats practice.",
                    },
                    {
                      heading:"What we built",
                      text:"That's why we built a platform that combines artificial intelligence with real human insight. AI gives you infinite reps at zero cost. Real professionals give you the raw, honest feedback that a machine can't replicate.",
                    },
                    {
                      heading:"Where we are today",
                      text:"inTurn is focused on one outcome: helping students transition from learning to earning — faster, smarter, and with genuine confidence. Everything we build points toward that.",
                    },
                  ].map(({ heading, text }, i) => (
                    <div key={i} className="story-block">
                      <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:INK, mb:.75 }}>{heading}</Typography>
                      <Typography sx={{ fontSize:15, color:INK2, lineHeight:1.8, fontWeight:300 }}>{text}</Typography>
                    </div>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* ══ VALUES ══════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, px:{ xs:3, md:8 }, background:P_LITE }}>
          <Box maxWidth="lg" mx="auto">
            <Stack spacing={1} mb={7} alignItems={{ xs:"center", md:"flex-start" }}>
              <span className="section-label">What we stand for</span>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2rem", md:"2.8rem" }, fontWeight:800, color:INK, lineHeight:1.08, letterSpacing:"-0.025em", textAlign:{ xs:"center", md:"left" } }}>
                Our core values.
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {VALUES.map(({ icon, title, desc }, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <div className="value-row">
                    <div className="value-icon">{icon}</div>
                    <Box>
                      <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:INK, mb:.5 }}>{title}</Typography>
                      <Typography sx={{ fontSize:14, color:INK2, lineHeight:1.65 }}>{desc}</Typography>
                    </Box>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ══ FOUNDER ═════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:12 }, px:{ xs:3, md:8 }, background:"#fff" }}>
          <Box maxWidth="lg" mx="auto">
            <Stack spacing={1} mb={7} alignItems={{ xs:"center", md:"flex-start" }}>
              <span className="section-label">The team</span>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2rem", md:"2.8rem" }, fontWeight:800, color:INK, lineHeight:1.08, letterSpacing:"-0.025em", textAlign:{ xs:"center", md:"left" } }}>
                Meet the founder.
              </Typography>
            </Stack>
            <div className="founder-card">
              {/* Decorative orbs */}
              <Box sx={{ position:"absolute", top:-60, right:-60, width:240, height:240, borderRadius:"50%", background:`radial-gradient(circle,${P}40 0%,transparent 70%)`, pointerEvents:"none" }}/>
              <Box sx={{ position:"absolute", bottom:-40, left:40, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,${P_MID}20 0%,transparent 70%)`, pointerEvents:"none" }}/>

              <Stack direction={{ xs:"column", md:"row" }} spacing={4} alignItems={{ xs:"center", md:"flex-start" }} sx={{ position:"relative", zIndex:1 }}>
                {/* Avatar */}
                <Box sx={{ flexShrink:0 }}>
                  <img
                    src={showli}
                    alt="Zwivhuya Mukwevho"
                    className="founder-avatar"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      // fallback handled below
                    }}
                  />
                  {/* Fallback initial avatar */}
                  <Box sx={{ width:80, height:80, borderRadius:"50%", border:`3px solid ${P}`, background:P_LITE, display:"flex", alignItems:"center", justifyContent:"center", display:"none" }}>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2rem", color:P }}>Z</Typography>
                  </Box>
                </Box>

                <Box flex={1}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#fff", mb:.5, letterSpacing:"-0.01em" }}>
                    Zwivhuya Mukwevho
                  </Typography>
                  <Typography sx={{ fontSize:13.5, fontWeight:500, color:P_MID, mb:3 }}>
                    Founder & Developer
                  </Typography>
                  <Typography sx={{ fontSize:15, color:"rgba(255,255,255,.6)", lineHeight:1.8, fontWeight:300, maxWidth:580 }}>
                    Driven by a passion for solving real-world problems, Zwivhuya created inTurn to bridge the gap between academic success and career readiness. With a background in web development and a deep focus on building impactful platforms, the mission has always been simple: help students win.
                  </Typography>

                  {/* Tags */}
                  <Stack direction="row" spacing={1.5} flexWrap="wrap" mt={3}>
                    {["Software Developer", "System Design", "4750", "South Africa"].map((tag) => (
                      <Box key={tag} sx={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", borderRadius:100, px:1.5, py:.5 }}>
                        <Typography sx={{ fontSize:12, color:"rgba(255,255,255,.6)", fontFamily:"'DM Sans',sans-serif" }}>{tag}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </div>
          </Box>
        </Box>

        {/* ══ FINAL CTA ═══════════════════════════════════ */}
        <Box sx={{ py:{ xs:10, md:14 }, px:{ xs:3, md:8 }, background:INK, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <Box sx={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle,${P}30 0%,transparent 68%)`, pointerEvents:"none" }}/>
          <Box maxWidth="md" mx="auto" sx={{ position:"relative", zIndex:1 }}>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"2rem", md:"3rem" }, fontWeight:800, color:"#fff", lineHeight:1.08, letterSpacing:"-0.025em", mb:2 }}>
              Ready to start preparing?
            </Typography>
            <Typography sx={{ fontSize:16, color:"rgba(255,255,255,.45)", mb:5, lineHeight:1.7 }}>
              Join 12,000+ students already using inTURN to land their dream jobs.
            </Typography>
            <a href="/login" className="cta-btn cta-primary">
              Get started — it's free <ArrowRight size={15}/>
            </a>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default AboutUs;
