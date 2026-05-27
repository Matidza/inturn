// import React from 'react'
// import { Box } from '@mui/material'

// const P = "#7F42E7";
// const P_DARK = "#5E2EC5";
// const P_LIGHT = "#F0EAFD";
// const INK = "#0D0D12";
// const INK2 = "#4A4A5A";
// const BORDER = "#E8E3F5";
// const OFF = "#FAFAFA";

// const Signup = () => {
//   return (
//     <Box sx={{ background: "#FAFAFA", fontFamily: "'DM Sans', sans-serif", py: { xs: 8, md: 14 }, px: { xs: 3, md: 8 } }}>
//       Signup
//     </Box> 
//   )
// }

// export default Signup;







import { useRegister } from "@refinedev/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { CredentialResponse } from "../interfaces/google";
import { HandshakeOutlined } from "@mui/icons-material";
import { ArrowLeft, CheckCircle2, GraduationCap, Briefcase, Building2 } from "lucide-react";

const GOOGLE_CLIENT_ID =
  "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

/* ── TOKENS ─────────────────────────────────────────────────────────────── */
const P      = "#7F42E7";
const P_DARK = "#5E2EC5";
const P_MID  = "#B893F6";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#5C5C72";
const BORDER = "#E8E3F5";

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes cardIn {
    from { opacity:0; transform:translateY(16px) scale(.98); }
    to   { opacity:1; transform:translateY(0)    scale(1);   }
  }
  @keyframes checkPop {
    0%  { transform:scale(0) rotate(-20deg); }
    70% { transform:scale(1.15) rotate(4deg); }
    100%{ transform:scale(1) rotate(0); }
  }

  .fu  { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1  { animation-delay:.06s; }
  .d2  { animation-delay:.12s; }
  .d3  { animation-delay:.18s; }
  .d4  { animation-delay:.24s; }
  .d5  { animation-delay:.30s; }
  .d6  { animation-delay:.36s; }

  /* role cards */
  .rcards { display:flex; flex-direction:column; gap:10px; }
  .rcard  {
    display:flex; align-items:center; gap:14px;
    padding:16px 18px; border-radius:14px;
    border:1.5px solid ${BORDER};
    background:#fff;
    cursor:pointer;
    transition:all .22s cubic-bezier(.34,1.56,.64,1);
    position:relative; overflow:hidden;
    font-family:'DM Sans',sans-serif;
  }
  .rcard::before {
    content:''; position:absolute; inset:0;
    background:${P_LITE}; opacity:0;
    transition:opacity .2s;
  }
  .rcard:hover::before { opacity:.6; }
  .rcard.on {
    border-color:${P};
    box-shadow:0 0 0 3px ${P_LITE}, 0 4px 20px rgba(127,66,231,.12);
  }
  .rcard.on::before { opacity:1; }
  .rcard-icon {
    width:42px; height:42px; border-radius:11px;
    display:flex; align-items:center; justify-content:center;
    background:${BORDER}; color:${INK2};
    flex-shrink:0; position:relative; z-index:1;
    transition:all .2s;
  }
  .rcard.on .rcard-icon { background:${P}; color:#fff; }
  .rcard-body { flex:1; position:relative; z-index:1; }
  .rcard-label { font-size:14px; font-weight:600; color:${INK}; line-height:1.2; }
  .rcard-desc  { font-size:12px; color:${INK2}; margin-top:2px; }
  .rcard-check {
    position:absolute; right:16px; top:50%; transform:translateY(-50%);
    opacity:0; transition:opacity .15s; z-index:1;
  }
  .rcard.on .rcard-check { opacity:1; animation:checkPop .3s cubic-bezier(.34,1.56,.64,1) both; }

  .or { display:flex; align-items:center; gap:12px;
        font-family:'DM Sans',sans-serif; font-size:12px; color:${INK2}; }
  .or::before,.or::after { content:''; flex:1; height:1px; background:${BORDER}; }

  /* right panel feature list */
  .feat-item { display:flex; align-items:flex-start; gap:12px; }
  .feat-dot  { width:8px; height:8px; border-radius:50%; background:${P}; flex-shrink:0; margin-top:5px; }
`;

const ROLES = [
  {
    value:"mentee", label:"Student",
    desc:"I want to practice interviews & get hired",
    icon:<GraduationCap size={18}/>,
  },
  {
    value:"professional", label:"Professional",
    desc:"I want to mentor students & earn income",
    icon:<Briefcase size={18}/>,
  },
  {
    value:"admin", label:"Company / Admin",
    desc:"I want to post jobs & find talent",
    icon:<Building2 size={18}/>,
  },
] as const;
type Role = typeof ROLES[number]["value"];

const BENEFITS: Record<Role, string[]> = {
  mentee: [
    "Unlimited AI mock interview sessions",
    "CV & ATS optimization analysis",
    "Book 1-on-1 sessions with pros",
    "Track your progress over time",
    "Get hired faster",
  ],
  professional: [
    "Earn R200–R800 per session",
    "Build your mentor reputation",
    "Flexible schedule — you decide",
    "Access to thousands of students",
    "Instant payouts",
  ],
  admin: [
    "Post unlimited job listings",
    "Access interview-ready talent",
    "Manage applicants in one place",
    "Advanced hiring analytics",
    "Priority support",
  ],
};

export const Signup: React.FC = () => {
  const { mutate: register } = useRegister<CredentialResponse>();
  const [role, setRole] = useState<Role>("mentee");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !divRef.current) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      ux_mode: "popup",
      callback: async (res: CredentialResponse) => {
        if (res.credential) register({ ...res, role });
      },
    });
    window.google.accounts.id.renderButton(divRef.current, {
      size:"large", width:"340", text:"signup_with", shape:"rectangular",
    });
  }, [role]);

  return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans',sans-serif", background:"#FAFAFA" }}>

        {/* ── LEFT — FORM PANEL ─────────────────────────── */}
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", px:{ xs:3, sm:6, md:10 }, py:6, position:"relative" }}>

          {/* Back + Logo row */}
          <Stack direction="row" justifyContent="space-between" alignItems="center"
            sx={{ position:"absolute", top:24, left:24, right:24 }}>
            <Link to="/login" style={{ display:"inline-flex", alignItems:"center", gap:5, color:INK2, fontSize:13, fontWeight:500, textDecoration:"none", fontFamily:"'DM Sans',sans-serif" }}>
              <ArrowLeft size={14}/> Sign in
            </Link>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width:28, height:28, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:15, color:"#fff" }}/>
              </Box>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1rem", color:INK }}>inTURN</Typography>
            </Stack>
          </Stack>

          <Box sx={{ width:"100%", maxWidth:420 }}>

            {/* Heading */}
            <Box className="fu" mb={4}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"1.9rem", md:"2.3rem" }, fontWeight:800, color:INK, letterSpacing:"-0.025em", lineHeight:1.08, mb:1 }}>
                Create your account.
              </Typography>
              <Typography sx={{ fontSize:14.5, color:INK2, lineHeight:1.65 }}>
                Choose how you're joining inTURN.
              </Typography>
            </Box>

            {/* Role cards */}
            <Box className="fu d1" mb={4}>
              <Typography sx={{ fontSize:11.5, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.09em", mb:1.5 }}>
                I am a
              </Typography>
              <div className="rcards">
                {ROLES.map(({ value, label, desc, icon }) => (
                  <div key={value} className={`rcard${role===value?" on":""}`} onClick={() => setRole(value)}>
                    <div className="rcard-icon">{icon}</div>
                    <div className="rcard-body">
                      <div className="rcard-label">{label}</div>
                      <div className="rcard-desc">{desc}</div>
                    </div>
                    <div className="rcard-check">
                      <CheckCircle2 size={18} color={P}/>
                    </div>
                  </div>
                ))}
              </div>
            </Box>

            {/* Divider */}
            <Box className="fu d2" mb={3.5}>
              <div className="or">Sign up with Google</div>
            </Box>

            {/* Google btn */}
            <Box className="fu d3" display="flex" justifyContent="center" mb={4}>
              <div ref={divRef}/>
            </Box>

            {/* Terms */}
            <Box className="fu d4">
              <Typography sx={{ fontSize:11.5, color:INK2, textAlign:"center", lineHeight:1.7 }}>
                By creating an account you agree to our{" "}
                <Link to="/terms-of-service" style={{ color:P, textDecoration:"none", fontWeight:500 }}>Terms</Link>
                {" "}&amp;{" "}
                <Link to="/privacy-policy" style={{ color:P, textDecoration:"none", fontWeight:500 }}>Privacy Policy</Link>.
              </Typography>
            </Box>

            {/* Sign in link */}
            <Box className="fu d5" mt={5} pt={4} sx={{ borderTop:`1px solid ${BORDER}` }}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <Typography sx={{ fontSize:13.5, color:INK2 }}>Already have an account?</Typography>
                <Link to="/login" style={{ color:P, fontWeight:600, fontSize:"13.5px", textDecoration:"none" }}>
                  Sign in
                </Link>
              </Stack>
            </Box>

          </Box>
        </Box>

        {/* ── RIGHT — BENEFITS PANEL ────────────────────── */}
        <Box sx={{
          display:{ xs:"none", lg:"flex" },
          flexDirection:"column", justifyContent:"center",
          width:"42%", minHeight:"100vh",
          background:P, px:7, py:8,
          position:"relative", overflow:"hidden", flexShrink:0,
        }}>
          {/* decorative ring */}
          <Box sx={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", border:`60px solid rgba(255,255,255,.06)`, pointerEvents:"none" }}/>
          <Box sx={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, borderRadius:"50%", border:`50px solid rgba(255,255,255,.05)`, pointerEvents:"none" }}/>

          <Box sx={{ position:"relative", zIndex:1 }}>
            <Typography sx={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,.55)", textTransform:"uppercase", letterSpacing:"0.1em", mb:2 }}>
              {ROLES.find(r=>r.value===role)?.label} benefits
            </Typography>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", mb:5 }}>
              What you'll<br/>unlock.
            </Typography>

            <Stack spacing={2.5}>
              {BENEFITS[role].map((b, i) => (
                <div key={i} className="feat-item">
                  <div className="feat-dot"/>
                  <Typography sx={{ fontSize:14.5, color:"rgba(255,255,255,.8)", lineHeight:1.55, fontFamily:"'DM Sans',sans-serif" }}>
                    {b}
                  </Typography>
                </div>
              ))}
            </Stack>

            {/* testimonial snippet */}
            <Box sx={{ mt:7, pt:5, borderTop:"1px solid rgba(255,255,255,.15)" }}>
              <Typography sx={{ fontSize:15, color:"rgba(255,255,255,.75)", lineHeight:1.7, fontStyle:"italic", fontFamily:"'DM Sans',sans-serif", mb:2 }}>
                "Two sessions in and I had an offer. The preparation was unlike anything else."
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#fff" }}>T</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize:13, fontWeight:600, color:"#fff" }}>Thando M.</Typography>
                  <Typography sx={{ fontSize:11.5, color:"rgba(255,255,255,.45)" }}>Software Intern · Absa</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default Signup;