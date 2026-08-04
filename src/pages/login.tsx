// import { useLogin } from "@refinedev/core";
// import { useEffect, useRef, useState } from "react";

// import {
//   Box,
//   Typography,
//   ToggleButton,
//   ToggleButtonGroup,
//   Paper,
//   Stack,
// } from "@mui/material";

// import { CredentialResponse } from "../interfaces/google";

// const GOOGLE_CLIENT_ID =


// export const Login: React.FC = () => {
//   const { mutate: login } = useLogin<CredentialResponse>();

//   const [role, setRole] = useState<"mentee" | "professional" | "admin">("mentee");

//   const divRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!window.google || !divRef.current) return;

//     window.google.accounts.id.initialize({
//       client_id: GOOGLE_CLIENT_ID,
//       ux_mode: "popup",
//       callback: async (res: CredentialResponse) => {
//         if (res.credential) {
//           login({
//             ...res,
//             role,
//           });
//         }
//       },
//     });

//     window.google.accounts.id.renderButton(divRef.current, {
//       // theme: "filled_white",
//       size: "large",
//       width: 320,
//     });
//   }, [role]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#FAFAFC",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* 🔵 BACKGROUND BLOBS (same feel as landing page) */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: -120,
//           right: -120,
//           width: 400,
//           height: 400,
//           bgcolor: "#7F42E7",
//           opacity: 0.08,
//           filter: "blur(120px)",
//           borderRadius: "50%",
//         }}
//       />

//       <Box
//         sx={{
//           position: "absolute",
//           bottom: -120,
//           left: -120,
//           width: 400,
//           height: 400,
//           bgcolor: "#9B6BFF",
//           opacity: 0.08,
//           filter: "blur(120px)",
//           borderRadius: "50%",
//         }}
//       />

//       {/* CENTER CONTENT */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           px: 2,
//         }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             width: "100%",
//             maxWidth: 440,
//             p: { xs: 3, md: 5 },
//             borderRadius: 4,
//             border: "1px solid #EAEAF0",
//             backdropFilter: "blur(6px)",
//             backgroundColor: "rgba(255,255,255,0.9)",
//           }}
//         >
//           <Stack spacing={3}>
//             {/* LOGO */}
//             <Typography
//               fontSize={26}
//               fontWeight={800}
//               textAlign="center"
//               letterSpacing={-0.5}
//             >
//               in<span style={{ color: "#7F42E7" }}>TURN</span>
//             </Typography>

//             {/* TITLE */}
//             <Box textAlign="center">
//               <Typography fontSize={18} fontWeight={600}>
//                 Welcome back
//               </Typography>
//               <Typography fontSize={13} color="text.secondary">
//                 Choose your role to continue
//               </Typography>
//             </Box>

//             {/* ROLE SELECTOR */}
//             <ToggleButtonGroup
//               value={role}
//               exclusive
//               onChange={(_, value) => value && setRole(value)}
//               fullWidth
//               sx={{
//                 bgcolor: "#F3EDFF",
//                 borderRadius: 3,
//                 p: 0.5,
//               }}
//             >
//               {["mentee", "professional", "admin"].map((r) => (
//                 <ToggleButton
//                   key={r}
//                   value={r}
//                   sx={{
//                     border: "none",
//                     borderRadius: 2,
//                     textTransform: "capitalize",
//                     fontWeight: 600,
//                     fontSize: 13,
//                     color: "#555",
//                     transition: "all 0.2s ease",

//                     "&.Mui-selected": {
//                       bgcolor: "#7F42E7",
//                       color: "#fff",
//                       boxShadow: "0 4px 12px rgba(127,66,231,0.25)",
//                     },
//                   }}
//                 >
//                   {r}
//                 </ToggleButton>
//               ))}
//             </ToggleButtonGroup>

//             {/* GOOGLE BUTTON */}
//             <Box display="flex" justifyContent="center">
//               <div ref={divRef} />
//             </Box>

//             {/* FOOTER TEXT */}
//             <Typography
//               fontSize={11}
//               textAlign="center"
//               color="text.secondary"
//             >
//               By continuing, you agree to our Terms & Privacy Policy
//             </Typography>
//           </Stack>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };









import { useLogin } from "@refinedev/core";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { CredentialResponse } from "../interfaces/google";
import { HandshakeOutlined } from "@mui/icons-material";
import { ArrowRight, Zap, Shield, Users } from "lucide-react";

const GOOGLE_CLIENT_ID = "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

/* ── TOKENS ─────────────────────────────────────────────────────────────── */
const P      = "#7F42E7";
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
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes orb {
    0%,100% { transform: scale(1)   translate(0,0);    opacity:.55; }
    40%     { transform: scale(1.1) translate(12px,-8px); opacity:.8;  }
    70%     { transform: scale(.96) translate(-6px,10px); opacity:.6; }
  }
  @keyframes shimmer {
    from { background-position: -250% center; }
    to   { background-position:  250% center; }
  }

  .fu   { animation: fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
  .d1   { animation-delay:.07s; }
  .d2   { animation-delay:.14s; }
  .d3   { animation-delay:.21s; }
  .d4   { animation-delay:.28s; }
  .d5   { animation-delay:.35s; }

  /* role pill strip */
  .rtrack { display:flex; background:${P_LITE}; border-radius:13px; padding:5px; gap:4px; }
  .rpill  {
    flex:1; padding:10px 4px; border:none; background:transparent;
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500;
    color:${INK2}; border-radius:9px; cursor:pointer;
    transition:all .2s cubic-bezier(.34,1.56,.64,1);
  }
  .rpill:hover:not(.on) { color:${P}; background:rgba(127,66,231,.06); }
  .rpill.on {
    background:#fff; color:${P}; font-weight:600;
    box-shadow:0 2px 14px rgba(127,66,231,.13);
  }

  .or { display:flex; align-items:center; gap:12px;
        font-family:'DM Sans',sans-serif; font-size:12px; color:${INK2}; }
  .or::before,.or::after { content:''; flex:1; height:1px; background:${BORDER}; }

  /* left panel decorative blobs */
  .lb1,.lb2,.lb3 { position:absolute; border-radius:50%; pointer-events:none; }
  .lb1 { width:340px; height:340px; top:-90px; left:-90px;
          background:radial-gradient(circle,${P}50 0%,transparent 68%);
          animation:orb 8s ease-in-out infinite; }
  .lb2 { width:220px; height:220px; bottom:60px; right:-50px;
          background:radial-gradient(circle,${P_MID}30 0%,transparent 70%);
          animation:orb 11s ease-in-out infinite 3.5s; }
  .lb3 { width:140px; height:140px; top:45%; left:55%;
          background:radial-gradient(circle,${P}20 0%,transparent 70%);
          animation:orb 14s ease-in-out infinite 7s; }

  .shine {
    background-image:linear-gradient(90deg,#fff 0%,${P_MID} 48%,#fff 100%);
    background-size:250% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    animation:shimmer 4s linear infinite;
  }
`;

const ROLES = [
  { value:"mentee",       label:"Student",       note:"Practice & get hired" },
  { value:"professional", label:"Professional",  note:"Mentor & earn" },
  { value:"admin",        label:"Admin",          note:"Manage platform" },
] as const;
type Role = typeof ROLES[number]["value"];

const PERKS = [
  { icon:<Zap size={15}/>,    text:"AI interviews with instant scoring" },
  { icon:<Shield size={15}/>, text:"ATS-beating CV analysis" },
  { icon:<Users size={15}/>,  text:"Real professionals in your field" },
];

/* ── COMPONENT ───────────────────────────────────────────────────────────── */
export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [role, setRole] = useState<Role>("mentee");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !divRef.current) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      ux_mode: "popup",
      callback: async (res: CredentialResponse) => {
        if (res.credential) login({ ...res, role });
      },
    });
    window.google.accounts.id.renderButton(divRef.current, {
      size:"large", width:"340", text:"signin_with", shape:"rectangular",
    });
  }, [role]);

  return (
    <>
      <style>{css}</style>
      <Box sx={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans',sans-serif", background:"#F7F6FB" }}>

        {/* ── LEFT PANEL ──────────────────────────────────── */}
        <Box sx={{
          display:{ xs:"none", lg:"flex" }, flexDirection:"column",
          justifyContent:"space-between",
          width:"43%", minHeight:"100vh",
          background:INK, px:7, py:6,
          position:"relative", overflow:"hidden", flexShrink:0,
        }}>
          <div className="lb1"/><div className="lb2"/><div className="lb3"/>

          {/* Logo */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ position:"relative", zIndex:1 }}>
            <Box sx={{ width:34, height:34, borderRadius:"10px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <HandshakeOutlined sx={{ fontSize:18, color:"#fff" }}/>
            </Box>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.25rem", color:"#fff", letterSpacing:"-0.01em" }}>
              inTURN
            </Typography>
          </Stack>

          {/* Headline + perks */}
          <Box sx={{ position:"relative", zIndex:1 }}>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:"2.9rem", fontWeight:800, lineHeight:1.08, letterSpacing:"-0.025em", color:"#fff", mb:4 }}>
              Your next<br/>interview<br/><span className="shine">starts here.</span>
            </Typography>
            <Stack spacing={2.5}>
              {PERKS.map(({ icon, text }, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ width:34, height:34, borderRadius:"9px", background:`${P}38`, color:P_MID, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {icon}
                  </Box>
                  <Typography sx={{ fontSize:13.5, color:"rgba(255,255,255,.58)", lineHeight:1.5 }}>
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Stats */}
          <Box sx={{ position:"relative", zIndex:1 }}>
            <Box sx={{ height:1, background:"rgba(255,255,255,.07)", mb:3 }}/>
            <Stack direction="row" spacing={4}>
              {[["12K+","Students"],["94%","Hired"],["4.9★","Rating"]].map(([v,l])=>(
                <Box key={l}>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.35rem", color:"#fff" }}>{v}</Typography>
                  <Typography sx={{ fontSize:11, color:"rgba(255,255,255,.35)", letterSpacing:"0.04em" }}>{l}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* ── RIGHT FORM ──────────────────────────────────── */}
        <Box sx={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", px:{ xs:3, sm:6, md:10 }, py:6, position:"relative" }}>

          {/* Mobile logo */}
          <Stack direction="row" spacing={1} alignItems="center"
            sx={{ display:{ xs:"flex", lg:"none" }, position:"absolute", top:24, left:24 }}>
            <Box sx={{ width:30, height:30, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <HandshakeOutlined sx={{ fontSize:16, color:"#fff" }}/>
            </Box>
            <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.1rem", color:INK }}>inTURN</Typography>
          </Stack>

          <Box sx={{ width:"100%", maxWidth:400 }}>

            {/* Heading */}
            <Box className="fu" mb={5}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontSize:{ xs:"1.9rem", md:"2.35rem" }, fontWeight:800, color:INK, letterSpacing:"-0.025em", lineHeight:1.08, mb:1 }}>
                Welcome back.
              </Typography>
              <Typography sx={{ fontSize:14.5, color:INK2, lineHeight:1.65 }}>
                Sign in to continue.{" "}
                <Link to="/register" style={{ color:P, fontWeight:500, textDecoration:"none" }}>New here?</Link>
              </Typography>
            </Box>

            {/* Role */}
            <Box className="fu d1" mb={4}>
              <Typography sx={{ fontSize:11.5, fontWeight:600, color:INK2, textTransform:"uppercase", letterSpacing:"0.09em", mb:1.25 }}>
                I'm signing in as
              </Typography>
              <div className="rtrack">
                {ROLES.map(({ value, label }) => (
                  <button key={value} className={`rpill${role===value?" on":""}`} onClick={() => setRole(value)}>
                    {label}
                  </button>
                ))}
              </div>
              <Typography sx={{ fontSize:12, color:INK2, mt:1, pl:.5 }}>
                {ROLES.find(r=>r.value===role)?.note}
              </Typography>
            </Box>

            {/* Divider */}
            <Box className="fu d2" mb={3.5}>
              <div className="or">Continue with Google</div>
            </Box>

            {/* Google btn */}
            <Box className="fu d3" display="flex" justifyContent="center" mb={4}>
              <div ref={divRef}/>
            </Box>

            {/* Terms */}
            <Box className="fu d4">
              <Typography sx={{ fontSize:11.5, color:INK2, textAlign:"center", lineHeight:1.7 }}>
                By signing in you agree to our{" "}
                <Link to="/terms-of-service" style={{ color:P, textDecoration:"none", fontWeight:500 }}>Terms</Link>
                {" "}&amp;{" "}
                <Link to="/privacy-policy" style={{ color:P, textDecoration:"none", fontWeight:500 }}>Privacy Policy</Link>.
              </Typography>
            </Box>

            {/* Register link */}
            <Box className="fu d5" mt={5} pt={4} sx={{ borderTop:`1px solid ${BORDER}` }}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <Typography sx={{ fontSize:13.5, color:INK2 }}>Don't have an account?</Typography>
                <Link to="/signup" style={{ color:P, fontWeight:600, fontSize:"13.5px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:4 }}>
                  Create one <ArrowRight size={13}/>
                </Link>
              </Stack>
            </Box>

          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;