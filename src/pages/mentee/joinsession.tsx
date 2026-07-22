// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, Stack } from "@mui/material";
// import {
//   Mic, MicOff, Video, VideoOff, PhoneOff, Monitor,
//   MessageSquare, FileText, Users, CheckCircle2, Clock,
//   Maximize2, Minimize2, Settings, Send, Wifi, X,
//   ChevronDown, ChevronUp, ChevronLeft,
// } from "lucide-react";
// import showli from "../../assets/showli.jpeg"
// import { useLogout, useGetIdentity } from "@refinedev/core";


// /* ─── TOKENS ─────────────────────────────────────────────── */
// const S1  = "#0E0F14";
// const S2  = "#161820";
// const S3  = "#1E2028";
// const S4  = "#262830";
// const BD  = "rgba(255,255,255,0.07)";
// const P   = "#7F42E7";
// const PM  = "#B893F6";
// const PL  = "rgba(127,66,231,0.18)";
// const RED = "#E5383B";
// const RL  = "rgba(229,56,59,0.18)";
// const GRN = "#22C55E";
// const GL  = "rgba(34,197,94,0.18)";
// const AMB = "#F59E0B";
// const TXT = "#F0F0F5";
// const T2  = "rgba(240,240,245,0.55)";
// const T3  = "rgba(240,240,245,0.28)";

// /* ─── CSS ────────────────────────────────────────────────── */
// const css = `
  

//   /* ── PORTAL: escape layout, own full-screen stacking context ── */
//   #join-session-root {
//     position: fixed;
//     inset: 0;
//     z-index: 9999;
//     background: ${S1};
//     display: flex;
//     flex-direction: column;
//     font-family: 'DM Sans', sans-serif;
//     overflow: hidden;
//     -webkit-overflow-scrolling: touch;
//   }

//   *, *::before, *::after { box-sizing: border-box; }

//   /* ── Animations ── */
//   @keyframes fadeIn     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes panelIn    { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
//   @keyframes panelInUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes micWave    { 0%,100%{transform:scaleY(.35)} 50%{transform:scaleY(1)} }
//   @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
//   @keyframes pipIn      { from{opacity:0;transform:scale(.8) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
//   @keyframes toastIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes endPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(229,56,59,.55)} 50%{box-shadow:0 0 0 12px rgba(229,56,59,0)} }
//   @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

//   .fade-in   { animation:fadeIn   .35s cubic-bezier(.22,1,.36,1) both; }
//   .panel-in  { animation:panelIn  .3s  cubic-bezier(.22,1,.36,1) both; }
//   .panel-up  { animation:panelInUp .35s cubic-bezier(.22,1,.36,1) both; }
//   .pip-in    { animation:pipIn    .4s  cubic-bezier(.34,1.56,.64,1) both; }
//   .toast-in  { animation:toastIn  .3s  cubic-bezier(.22,1,.36,1) both; }

//   /* ── Control buttons ── */
//   .ctrl {
//     display:flex; align-items:center; justify-content:center;
//     border:none; cursor:pointer; position:relative;
//     background:${S3}; color:${TXT};
//     transition:all .18s cubic-bezier(.34,1.56,.64,1);
//     border-radius:14px; width:48px; height:48px;
//   }
//   .ctrl:hover      { background:${S4}; transform:translateY(-2px) scale(1.05); }
//   .ctrl.on         { background:${PL}; color:${PM}; border:1px solid rgba(127,66,231,.35); }
//   .ctrl.off        { background:${RL}; color:${RED}; border:1px solid rgba(229,56,59,.35); }
//   .ctrl.off:hover  { background:${RED}; color:#fff; box-shadow:0 8px 24px rgba(229,56,59,.4); }
//   .ctrl.end        {
//     width:auto; padding:0 20px; gap:7px;
//     font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600;
//     background:${RED}; color:#fff; border:none; border-radius:14px;
//     animation:endPulse 2.5s ease-in-out infinite;
//   }
//   .ctrl.end:hover  {
//     background:#C62828; transform:translateY(-2px);
//     box-shadow:0 12px 32px rgba(229,56,59,.5);
//     animation:none;
//   }
//   /* mobile: smaller controls */
//   @media(max-width:640px) {
//     .ctrl { width:42px; height:42px; border-radius:12px; }
//     .ctrl.end { padding:0 14px; font-size:13px; }
//   }

//   .ctrl .tip {
//     position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%);
//     background:rgba(0,0,0,.88); color:#fff; font-size:11px; font-weight:500;
//     white-space:nowrap; padding:5px 9px; border-radius:7px;
//     pointer-events:none; opacity:0; transition:opacity .15s;
//     font-family:'DM Sans',sans-serif; z-index:10;
//   }
//   .ctrl:hover .tip { opacity:1; }

//   /* ── Mic wave ── */
//   .mw { display:flex; align-items:center; gap:2px; height:16px; }
//   .mb { width:3px; border-radius:2px; background:${GRN}; animation:micWave .8s ease-in-out infinite; }
//   .mb:nth-child(1){height:5px;  animation-delay:0s}
//   .mb:nth-child(2){height:11px; animation-delay:.1s}
//   .mb:nth-child(3){height:16px; animation-delay:.2s}
//   .mb:nth-child(4){height:10px; animation-delay:.15s}
//   .mb:nth-child(5){height:5px;  animation-delay:.05s}

//   /* ── Agenda item ── */
//   .ag-row {
//     display:flex; align-items:center; gap:10px;
//     padding:9px 12px; border-radius:10px;
//     cursor:pointer; transition:background .15s;
//   }
//   .ag-row:hover         { background:rgba(255,255,255,.04); }
//   .ag-row.ag-active     { background:${PL}; }

//   /* ── Chat bubble ── */
//   .bubble {
//     max-width:80%; padding:10px 13px;
//     border-radius:14px; font-size:13.5px; line-height:1.6;
//     font-family:'DM Sans',sans-serif;
//   }
//   .bubble.them { background:${S3}; color:${TXT}; border-bottom-left-radius:4px; }
//   .bubble.me   { background:${P};  color:#fff;   border-bottom-right-radius:4px; }

//   /* ── Notes area ── */
//   .notes-ta {
//     width:100%; flex:1; resize:none;
//     background:transparent; border:none; outline:none;
//     color:${TXT}; font-family:'DM Sans',sans-serif;
//     font-size:13.5px; line-height:1.75; caret-color:${PM};
//   }
//   .notes-ta::placeholder { color:${T3}; }

//   /* ── Chat input ── */
//   .chat-in {
//     flex:1; background:transparent; border:none; outline:none;
//     color:${TXT}; font-family:'DM Sans',sans-serif; font-size:13.5px;
//   }
//   .chat-in::placeholder { color:${T3}; }

//   /* ── Tab pills ── */
//   .tpill {
//     display:flex; align-items:center; gap:5px;
//     padding:7px 10px; border-radius:9px;
//     font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500;
//     cursor:pointer; border:none; background:transparent;
//     color:${T2}; transition:all .15s; flex:1; justify-content:center;
//     white-space:nowrap;
//   }
//   .tpill.active { background:${S3}; color:${TXT}; }
//   .tpill:hover:not(.active) { color:${TXT}; }

//   /* ── PiP ── */
//   .pip {
//     position:absolute; border-radius:14px; overflow:hidden;
//     border:2px solid rgba(255,255,255,.12);
//     box-shadow:0 12px 40px rgba(0,0,0,.55);
//     cursor:grab; transition:transform .2s, box-shadow .2s;
//     /* desktop */
//     width:168px; height:114px;
//     bottom:90px; right:18px;
//   }
//   .pip:hover { transform:scale(1.04); box-shadow:0 16px 48px rgba(0,0,0,.65); }
//   /* mobile: smaller, top-right corner */
//   @media(max-width:640px) {
//     .pip {
//       width:100px; height:72px;
//       bottom:auto; top:72px; right:12px;
//     }
//   }

//   /* ── Net badge ── */
//   .net {
//     display:flex; align-items:center; gap:5px;
//     padding:4px 10px; border-radius:100px;
//     font-family:'DM Mono',monospace; font-size:10.5px;
//     background:rgba(0,0,0,.45); backdrop-filter:blur(6px);
//     color:${T2};
//   }

//   /* ── Rec dot ── */
//   .rdot {
//     width:8px; height:8px; border-radius:50%;
//     background:${RED}; animation:blink 1.2s ease-in-out infinite;
//     flex-shrink:0;
//   }

//   /* ── Right panel ── */
//   /* Desktop: slide in from right alongside video */
//   .rpanel {
//     width:300px; flex-shrink:0;
//     background:${S2}; border-left:1px solid ${BD};
//     display:flex; flex-direction:column; overflow:hidden;
//   }
//   /* Mobile: bottom sheet that overlays the video */
//   @media(max-width:900px) {
//     .rpanel {
//       width:100%;
//       position:absolute; bottom:0; left:0; right:0;
//       height:60vh; max-height:420px;
//       border-left:none; border-top:1px solid ${BD};
//       border-radius:18px 18px 0 0;
//       z-index:20;
//     }
//   }

//   /* ── Controls bar ── */
//   .cbar {
//     position:absolute; bottom:0; left:0; right:0;
//     height:76px;
//     display:flex; align-items:center; justify-content:center;
//     gap:10px; padding:0 12px;
//     background:linear-gradient(to top, rgba(14,15,20,.95) 0%, transparent 100%);
//   }
//   @media(max-width:640px) {
//     .cbar { gap:8px; height:72px; padding:0 8px; }
//   }

//   /* ── Separator ── */
//   .sep { width:1px; height:30px; background:${BD}; flex-shrink:0; }

//   /* ── Scrollbar ── */
//   ::-webkit-scrollbar { width:4px; }
//   ::-webkit-scrollbar-track { background:transparent; }
//   ::-webkit-scrollbar-thumb { background:${S4}; border-radius:4px; }

//   /* ── End dialog ── */
//   .end-dialog {
//     position:absolute; inset:0; z-index:50;
//     background:rgba(0,0,0,.75); backdrop-filter:blur(6px);
//     display:flex; align-items:center; justify-content:center;
//     padding:16px;
//   }
//   .end-card {
//     background:${S2}; border-radius:20px;
//     border:1.5px solid ${BD};
//     padding:32px; width:100%; max-width:400px;
//     box-shadow:0 32px 80px rgba(0,0,0,.65);
//   }
// `;

// /* ── MOCK DATA ───────────────────────────────────────────── */
// const SESSION = {
//   pro:      { name:"Sarah Johnson", role:"Software Engineer · TechWave", avatar:"https://randomuser.me/api/portraits/women/68.jpg" },
//   student:  { name:"Thabo Nkosi",   avatar:"https://randomuser.me/api/portraits/men/22.jpg" },
//   type:     "Technical Mock Interview",
//   duration: 45,
// };

// const INIT_AGENDA = [
//   { id:1, label:"Introduction",    done:true  },
//   { id:2, label:"Experience",      done:true  },
//   { id:3, label:"Problem Solving", done:false },
//   { id:4, label:"Behavioural",     done:false },
//   { id:5, label:"Q&A",             done:false },
// ];

// const INIT_MSGS = [
//   { id:1, from:"them", name:"Sarah", text:"Welcome! Tell me about your experience with React.", time:"32:01" },
//   { id:2, from:"me",   name:"Thabo", text:"I've been using React for 2 years — side projects and an internship.", time:"32:18" },
//   { id:3, from:"them", name:"Sarah", text:"Great. Have you worked with any state management libraries?", time:"32:45" },
// ];

// const INIT_NOTES = `Problem Solving
// ──────────────
// • useState, useEffect, useRef — good
// • Needs to elaborate on useCallback/useMemo

// Behavioural (next)
// • Ask about conflict resolution
// `;

// /* ── TIMER HOOK ──────────────────────────────────────────── */
// const useTimer = (start = 32 * 60 + 18) => {
//   const [s, setS] = useState(start);
//   useEffect(() => {
//     const id = setInterval(() => setS(x => x + 1), 1000);
//     return () => clearInterval(id);
//   }, []);
//   return `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
// };

// interface IToast { id:number; msg:string; icon?:React.ReactNode }

// /* ── COMPONENT ───────────────────────────────────────────── */
// const JoinSession: React.FC = () => {
//   const navigate  = useNavigate();
//   const elapsed   = useTimer();
//   const { data: user } = useGetIdentity<any>();

//   /* controls */
//   const [micOn,  setMicOn]  = useState(true);
//   const [camOn,  setCamOn]  = useState(true);
//   const [share,  setShare]  = useState(false);
//   const [full,   setFull]   = useState(false);

//   /* panel */
//   const [panel, setPanel]       = useState<"agenda"|"chat"|"notes">("agenda");
//   const [pOpen, setPOpen]       = useState(true);

//   /* chat */
//   const [msgs,   setMsgs]   = useState(INIT_MSGS);
//   const [input,  setInput]  = useState("");
//   const chatRef = useRef<HTMLDivElement>(null);

//   /* notes */
//   const [notes, setNotes] = useState(INIT_NOTES);

//   /* agenda */
//   const [agenda, setAgenda]   = useState(INIT_AGENDA);
//   const [active, setActive]   = useState(3);

//   /* end */
//   const [endDlg, setEndDlg] = useState(false);

//   /* toasts */
//   const [toasts, setToasts] = useState<IToast[]>([]);
//   const tid = useRef(0);

//   /* network */
//   const [net, setNet] = useState<"good"|"fair"|"poor">("good");

//   useEffect(() => {
//     const id = setInterval(() => {
//       const r = Math.random();
//       setNet(r > .85 ? "poor" : r > .7 ? "fair" : "good");
//     }, 9000);
//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => { chatRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

//   const toast = useCallback((msg:string, icon?:React.ReactNode) => {
//     const id = ++tid.current;
//     setToasts(p => [...p, { id, msg, icon }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
//   }, []);

//   const toggleMic = () => { setMicOn(m => !m); toast(micOn ? "Mic muted" : "Mic on", micOn ? <MicOff size={13}/> : <Mic size={13}/>); };
//   const toggleCam = () => { setCamOn(c => !c); toast(camOn ? "Camera off" : "Camera on", camOn ? <VideoOff size={13}/> : <Video size={13}/>); };
//   const toggleShare = () => { setShare(s => !s); toast(share ? "Screen sharing stopped" : "Screen sharing started", <Monitor size={13}/>); };

//   const sendMsg = () => {
//     if (!input.trim()) return;
//     setMsgs(p => [...p, { id:p.length+1, from:"me", name:"Thabo", text:input.trim(), time:elapsed }]);
//     setInput("");
//   };

//   const netColor = net === "good" ? GRN : net === "fair" ? AMB : RED;

//   const markDone = () => {
//     setAgenda(p => p.map(a => a.id === active ? { ...a, done:true } : a));
//     const nxt = agenda.find(a => !a.done && a.id !== active);
//     if (nxt) setActive(nxt.id);
//     toast("Section marked complete", <CheckCircle2 size={13}/>);
//   };

//   /* ── PANEL TOGGLE: on mobile close panel if same tab tapped ── */
//   const togglePanel = (id: "agenda"|"chat"|"notes") => {
//     if (panel === id && pOpen) { setPOpen(false); return; }
//     setPanel(id); setPOpen(true);
//   };

//   return (
//     <>
//       <style>{css}</style>

//       {/* ── FULL-SCREEN ROOT (z-index:9999 escapes the dashboard layout) ── */}
//       <div id="join-session-root">

//         {/* ══ TOP BAR ════════════════════════════════════ */}
//         <Box sx={{
//           height:{ xs:52, md:56 }, flexShrink:0,
//           display:"flex", alignItems:"center", justifyContent:"space-between",
//           px:{ xs:2, md:3 },
//           background:S2, borderBottom:`1px solid ${BD}`, zIndex:10,
//         }}>
//           {/* Left */}
//           <Stack direction="row" spacing={{ xs:1.5, md:2 }} alignItems="center">
//             <Box sx={{ width:{ xs:28, md:32 }, height:{ xs:28, md:32 }, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//               <Video size={15} color="#fff"/>
//             </Box>
//             <Box sx={{ display:{ xs:"none", sm:"block" } }}>
//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:{ xs:13, md:14 }, color:TXT, lineHeight:1.2 }}>
//                 {SESSION.type}
//               </Typography>
//               <Typography sx={{ fontSize:11, color:T2, fontFamily:"'DM Mono',monospace" }}>
//                 {SESSION.pro.name} · inTURN
//               </Typography>
//             </Box>
//             {/* Mobile: just show name */}
//             <Box sx={{ display:{ xs:"block", sm:"none" } }}>
//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:TXT }}>
//                 {SESSION.pro.name}
//               </Typography>
//             </Box>
//           </Stack>

//           {/* Center: timer */}
//           <Stack direction="row" spacing={1} alignItems="center">
//             <div className="rdot"/>
//             <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:{ xs:15, md:18 }, fontWeight:500, color:TXT, letterSpacing:"0.05em" }}>
//               {elapsed}
//             </Typography>
//             <Typography sx={{ fontSize:11, color:T3, display:{ xs:"none", md:"block" } }}>
//               / {SESSION.duration}:00
//             </Typography>
//           </Stack>

//           {/* Right */}
//           <Stack direction="row" spacing={{ xs:1, md:1.5 }} alignItems="center">
//             <div className="net">
//               <Wifi size={11} color={netColor}/>
//               <span style={{ color:netColor, textTransform:"uppercase", letterSpacing:"0.06em", display: "none" }} id="net-label">
//                 {net}
//               </span>
//               <Box component="span" sx={{ display:{ xs:"none", sm:"block" }, color:netColor, textTransform:"uppercase", letterSpacing:"0.06em", fontSize:10.5, fontFamily:"'DM Mono',monospace" }}>
//                 {net}
//               </Box>
//             </div>
//             <button
//               className="ctrl"
//               onClick={() => setFull(f => !f)}
//               style={{ width:34, height:34, borderRadius:"9px" }}
//             >
//               {full ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
//               <span className="tip">{full ? "Exit fullscreen" : "Fullscreen"}</span>
//             </button>
//             <button className="ctrl" style={{ width:34, height:34, borderRadius:"9px" }}>
//               <Settings size={14}/>
//               <span className="tip">Settings</span>
//             </button>
//           </Stack>
//         </Box>

//         {/* ══ BODY ══════════════════════════════════════ */}
//         <Box sx={{ flex:1, display:"flex", overflow:"hidden", position:"relative" }}>

//           {/* ── VIDEO AREA ──────────────────────────── */}
//           <Box sx={{ flex:1, position:"relative", background:S1, overflow:"hidden" }}>

//             {/* Main video */}
//             <Box sx={{ position:"absolute", inset:0, background:`linear-gradient(160deg,#1A1B22 0%,#0E0F14 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
//               {camOn ? (
//                 <img src={SESSION.pro.avatar} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.92)" }}/>
//               ) : (
//                 <Stack alignItems="center" spacing={1.5}>
//                   <Box sx={{ width:{ xs:60, md:80 }, height:{ xs:60, md:80 }, borderRadius:"50%", background:S3, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                     <VideoOff size={28} color={T3}/>
//                   </Box>
//                   <Typography sx={{ fontSize:13.5, color:T2 }}>Camera is off</Typography>
//                 </Stack>
//               )}
//               {/* Bottom gradient */}
//               <Box sx={{ position:"absolute", bottom:0, left:0, right:0, height:{ xs:120, md:160 }, background:"linear-gradient(to top,rgba(14,15,20,.92) 0%,transparent 100%)", pointerEvents:"none" }}/>
//               {/* Top gradient */}
//               <Box sx={{ position:"absolute", top:0, left:0, right:0, height:80, background:"linear-gradient(to bottom,rgba(14,15,20,.5) 0%,transparent 100%)", pointerEvents:"none" }}/>
//             </Box>

//             {/* Name tag */}
//             <Box sx={{
//               position:"absolute", bottom:{ xs:82, md:90 }, left:{ xs:12, md:20 },
//               display:"flex", alignItems:"center", gap:1.25,
//               background:"rgba(0,0,0,.58)", backdropFilter:"blur(8px)",
//               borderRadius:"10px", px:1.5, py:.75,
//               border:"1px solid rgba(255,255,255,.08)",
//             }}>
//               <div className="mw" style={{ display:micOn?"flex":"none" }}>
//                 {[0,1,2,3,4].map(i => <div key={i} className="mb"/>)}
//               </div>
//               {!micOn && <MicOff size={12} color={RED}/>}
//               <Typography sx={{ fontSize:{ xs:12, md:13 }, fontWeight:500, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>
//                 {SESSION.pro.name}
//               </Typography>
//             </Box>

//             {/* Screen share badge */}
//             {share && (
//               <Box sx={{ position:"absolute", top:{ xs:64, md:16 }, left:{ xs:12, md:16 }, display:"flex", alignItems:"center", gap:.75, background:PL, border:`1px solid rgba(127,66,231,.4)`, borderRadius:100, px:1.5, py:.5 }}>
//                 <Monitor size={11} color={PM}/>
//                 <Typography sx={{ fontSize:11, fontWeight:600, color:PM, fontFamily:"'DM Sans',sans-serif" }}>Sharing</Typography>
//               </Box>
//             )}

//             {/* PiP */}
//             <div className="pip pip-in">
//               {camOn ? (
//                 <img src={showli} alt="You" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
//                 // <img src={showli} alt="You" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
//                 // src={user?.avatar}
//                 // <img src={SESSION.student.avatar} alt="You" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
//               ) : (
//                 <Box sx={{ width:"100%", height:"100%", background:S3, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                   <VideoOff size={18} color={T3}/>
//                 </Box>
//               )}
//               <Box sx={{ position:"absolute", bottom:5, left:7 }}>
//                 <Typography sx={{ fontSize:10.5, fontWeight:500, color:"rgba(255,255,255,.85)", fontFamily:"'DM Sans',sans-serif", textShadow:"0 1px 4px rgba(0,0,0,.8)" }}>You</Typography>
//               </Box>
//               {!micOn && (
//                 <Box sx={{ position:"absolute", top:5, right:5, width:18, height:18, borderRadius:"50%", background:"rgba(229,56,59,.85)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                   <MicOff size={9} color="#fff"/>
//                 </Box>
//               )}
//             </div>

//             {/* ── CONTROLS BAR ─────────────────────── */}
//             <div className="cbar">
//               {/* Mic */}
//               <button className={`ctrl${!micOn?" off":""}`} onClick={toggleMic}>
//                 {micOn ? <Mic size={18}/> : <MicOff size={18}/>}
//                 <span className="tip">{micOn?"Mute":"Unmute"}</span>
//               </button>

//               {/* Cam */}
//               <button className={`ctrl${!camOn?" off":""}`} onClick={toggleCam}>
//                 {camOn ? <Video size={18}/> : <VideoOff size={18}/>}
//                 <span className="tip">{camOn?"Camera off":"Camera on"}</span>
//               </button>

//               {/* Share */}
//               <button className={`ctrl${share?" on":""}`} onClick={toggleShare}>
//                 <Monitor size={18}/>
//                 <span className="tip">{share?"Stop sharing":"Share screen"}</span>
//               </button>

//               <div className="sep"/>

//               {/* Panel toggles */}
//               {(["agenda","chat","notes"] as const).map(id => (
//                 <button
//                   key={id}
//                   className={`ctrl${panel===id&&pOpen?" on":""}`}
//                   onClick={() => togglePanel(id)}
//                 >
//                   {id==="agenda" && <Users size={18}/>}
//                   {id==="chat"   && <MessageSquare size={18}/>}
//                   {id==="notes"  && <FileText size={18}/>}
//                   {/* Chat badge */}
//                   {id==="chat" && msgs.filter(m=>m.from==="them").length>0 && (
//                     <Box sx={{ position:"absolute", top:-5, right:-5, width:16, height:16, borderRadius:"50%", background:P, fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'DM Mono',monospace" }}>
//                       {msgs.filter(m=>m.from==="them").length}
//                     </Box>
//                   )}
//                   <span className="tip">{id.charAt(0).toUpperCase()+id.slice(1)}</span>
//                 </button>
//               ))}

//               <div className="sep"/>

//               {/* End */}
//               <button className="ctrl end" onClick={() => setEndDlg(true)}>
//                 <PhoneOff size={16}/> End
//               </button>
//             </div>

//             {/* ── END DIALOG ─────────────────────── */}
//             {endDlg && (
//               <div className="end-dialog">
//                 <div className="end-card fade-in">
//                   <Box sx={{ width:48, height:48, borderRadius:"13px", background:RL, display:"flex", alignItems:"center", justifyContent:"center", mb:2.5 }}>
//                     <PhoneOff size={22} color={RED}/>
//                   </Box>
//                   <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.25rem", color:TXT, mb:.75 }}>
//                     End this session?
//                   </Typography>
//                   <Typography sx={{ fontSize:13.5, color:T2, lineHeight:1.7, mb:3 }}>
//                     You've been in session for <strong style={{ color:TXT }}>{elapsed}</strong>. You'll be taken to the feedback page.
//                   </Typography>
//                   <Box sx={{ background:S3, borderRadius:"12px", p:2, mb:3 }}>
//                     <Stack spacing={.75}>
//                       {[
//                         { label:"Professional", val:SESSION.pro.name },
//                         { label:"Duration",     val:elapsed },
//                         { label:"Sections",     val:`${agenda.filter(a=>a.done).length}/${agenda.length}` },
//                       ].map(({ label, val }) => (
//                         <Stack key={label} direction="row" justifyContent="space-between">
//                           <Typography sx={{ fontSize:13, color:T2 }}>{label}</Typography>
//                           <Typography sx={{ fontSize:13, fontWeight:600, color:TXT }}>{val}</Typography>
//                         </Stack>
//                       ))}
//                     </Stack>
//                   </Box>
//                   <Stack direction="row" spacing={1.5}>
//                     <button
//                       onClick={() => setEndDlg(false)}
//                       style={{ flex:1, padding:"12px", borderRadius:12, border:`1.5px solid ${BD}`, background:"transparent", color:T2, fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, cursor:"pointer" }}
//                     >
//                       Keep going
//                     </button>
//                     <button
//                       onClick={() => navigate("/mentee/feedback")}
//                       style={{ flex:1, padding:"12px", borderRadius:12, border:"none", background:RED, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 20px rgba(229,56,59,.3)" }}
//                     >
//                       End &amp; feedback
//                     </button>
//                   </Stack>
//                 </div>
//               </div>
//             )}
//           </Box>

//           {/* ── RIGHT / BOTTOM PANEL ────────────────── */}
//           {pOpen && (
//             <Box
//               component="div"
//               className={`rpanel panel-in`}
//             >
//               {/* Mobile drag handle + close */}
//               <Box sx={{ display:{ xs:"flex", md:"none" }, alignItems:"center", justifyContent:"center", py:1, position:"relative" }}>
//                 <Box sx={{ width:36, height:4, borderRadius:2, background:BD }}/>
//                 <Box
//                   onClick={() => setPOpen(false)}
//                   sx={{ position:"absolute", right:14, width:28, height:28, borderRadius:"50%", background:S3, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
//                 >
//                   <X size={13} color={T2}/>
//                 </Box>
//               </Box>

//               {/* Tabs */}
//               <Box sx={{ px:1.25, pb:1, borderBottom:`1px solid ${BD}`, display:"flex", gap:.5 }}>
//                 {([
//                   { id:"agenda", icon:<Users size={13}/>,          label:"Agenda" },
//                   { id:"chat",   icon:<MessageSquare size={13}/>,   label:"Chat" },
//                   { id:"notes",  icon:<FileText size={13}/>,        label:"Notes" },
//                 ] as const).map(t => (
//                   <button
//                     key={t.id}
//                     className={`tpill${panel===t.id?" active":""}`}
//                     onClick={() => setPanel(t.id)}
//                   >
//                     {t.icon} {t.label}
//                   </button>
//                 ))}
//               </Box>

//               {/* ── AGENDA ─────────────────────────── */}
//               {panel === "agenda" && (
//                 <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                   <Box sx={{ px:2.5, py:2, borderBottom:`1px solid ${BD}` }}>
//                     <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:TXT, mb:.4 }}>
//                       Interview Agenda
//                     </Typography>
//                     <Stack direction="row" spacing={.75} alignItems="center" mb={1.25}>
//                       <Clock size={11} color={T3}/>
//                       <Typography sx={{ fontSize:11.5, color:T2, fontFamily:"'DM Mono',monospace" }}>
//                         {agenda.filter(a=>a.done).length}/{agenda.length} complete
//                       </Typography>
//                     </Stack>
//                     <Box sx={{ height:3, background:S4, borderRadius:100, overflow:"hidden" }}>
//                       <Box sx={{ height:"100%", width:`${(agenda.filter(a=>a.done).length/agenda.length)*100}%`, background:P, borderRadius:100, transition:"width .5s ease" }}/>
//                     </Box>
//                   </Box>
//                   <Box sx={{ flex:1, p:1.5, overflowY:"auto" }}>
//                     <Stack spacing={.5}>
//                       {agenda.map((item, i) => (
//                         <div
//                           key={item.id}
//                           className={`ag-row${active===item.id?" ag-active":""}`}
//                           onClick={() => setActive(item.id)}
//                         >
//                           <Box sx={{ width:28, height:28, borderRadius:"50%", background:item.done?GL:active===item.id?PL:S3, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:active===item.id&&!item.done?`1.5px solid ${P}`:"none" }}>
//                             {item.done
//                               ? <CheckCircle2 size={13} color={GRN}/>
//                               : <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:10, fontWeight:700, color:active===item.id?PM:T3 }}>{String(i+1).padStart(2,"0")}</Typography>
//                             }
//                           </Box>
//                           <Box flex={1}>
//                             <Typography sx={{ fontSize:13.5, fontWeight:item.done||active===item.id?600:400, color:item.done?T2:active===item.id?TXT:T2, lineHeight:1.3 }}>
//                               {item.label}
//                             </Typography>
//                             {active===item.id && !item.done && (
//                               <Typography sx={{ fontSize:10.5, color:PM, mt:.15 }}>In progress</Typography>
//                             )}
//                           </Box>
//                           {active===item.id && !item.done && (
//                             <Box sx={{ width:6, height:6, borderRadius:"50%", background:P, animation:"blink 1.2s ease-in-out infinite", flexShrink:0 }}/>
//                           )}
//                         </div>
//                       ))}
//                     </Stack>
//                   </Box>
//                   <Box sx={{ p:2, borderTop:`1px solid ${BD}` }}>
//                     <button
//                       onClick={markDone}
//                       style={{ width:"100%", padding:"10px", borderRadius:10, border:`1.5px solid rgba(127,66,231,.35)`, background:PL, color:PM, fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, cursor:"pointer", transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}
//                     >
//                       <CheckCircle2 size={13}/> Mark complete
//                     </button>
//                   </Box>
//                 </Box>
//               )}

//               {/* ── CHAT ───────────────────────────── */}
//               {panel === "chat" && (
//                 <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                   <Box sx={{ px:2, py:1.75, borderBottom:`1px solid ${BD}` }}>
//                     <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:TXT }}>Session Chat</Typography>
//                     <Typography sx={{ fontSize:11.5, color:T2, mt:.2 }}>Visible only to participants</Typography>
//                   </Box>
//                   <Box sx={{ flex:1, overflowY:"auto", p:2 }}>
//                     <Stack spacing={2}>
//                       {msgs.map(m => (
//                         <Box key={m.id} sx={{ display:"flex", flexDirection:"column", alignItems:m.from==="me"?"flex-end":"flex-start" }}>
//                           <Stack direction="row" spacing={.75} alignItems="center" mb={.4} sx={{ flexDirection:m.from==="me"?"row-reverse":"row" }}>
//                             <img src={m.from==="me"?SESSION.student.avatar:SESSION.pro.avatar} alt="" style={{ width:18, height:18, borderRadius:"50%", objectFit:"cover" }}/>
//                             <Typography sx={{ fontSize:11, color:T3, fontFamily:"'DM Sans',sans-serif" }}>{m.name} · {m.time}</Typography>
//                           </Stack>
//                           <div className={`bubble ${m.from==="me"?"me":"them"}`}>{m.text}</div>
//                         </Box>
//                       ))}
//                       <div ref={chatRef}/>
//                     </Stack>
//                   </Box>
//                   <Box sx={{ p:1.5, borderTop:`1px solid ${BD}` }}>
//                     <Box sx={{ display:"flex", alignItems:"center", gap:1, background:S3, borderRadius:11, px:2, py:1, border:`1px solid ${BD}` }}>
//                       <input
//                         className="chat-in"
//                         placeholder="Type a message..."
//                         value={input}
//                         onChange={e => setInput(e.target.value)}
//                         onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMsg(); }}}
//                       />
//                       <button onClick={sendMsg} style={{ background:"none", border:"none", cursor:input.trim()?"pointer":"default", color:input.trim()?PM:T3, display:"flex", transition:"color .15s" }}>
//                         <Send size={15}/>
//                       </button>
//                     </Box>
//                   </Box>
//                 </Box>
//               )}

//               {/* ── NOTES ──────────────────────────── */}
//               {panel === "notes" && (
//                 <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                   <Box sx={{ px:2, py:1.75, borderBottom:`1px solid ${BD}` }}>
//                     <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:TXT }}>Session Notes</Typography>
//                     <Typography sx={{ fontSize:11.5, color:T2, mt:.2 }}>Private — only visible to you</Typography>
//                   </Box>
//                   <Box sx={{ flex:1, p:2, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                     <textarea className="notes-ta" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Take notes here..."/>
//                   </Box>
//                   <Box sx={{ px:2, pb:2, pt:1.5, borderTop:`1px solid ${BD}` }}>
//                     <Typography sx={{ fontSize:11, color:T3, fontFamily:"'DM Mono',monospace" }}>
//                       {notes.length} chars · Auto-saved
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           )}
//         </Box>

//         {/* ══ TOASTS ═════════════════════════════════════ */}
//         <Box sx={{ position:"fixed", bottom:{ xs:82, md:90 }, left:"50%", transform:"translateX(-50%)", zIndex:100, display:"flex", flexDirection:"column", alignItems:"center", gap:1, pointerEvents:"none" }}>
//           {toasts.map(t => (
//             <Box
//               key={t.id}
//               className="toast-in"
//               sx={{ display:"flex", alignItems:"center", gap:1, background:"rgba(22,24,32,.94)", backdropFilter:"blur(10px)", border:`1px solid ${BD}`, borderRadius:100, px:2, py:1, boxShadow:"0 8px 32px rgba(0,0,0,.4)", whiteSpace:"nowrap" }}
//             >
//               <Box sx={{ color:T2 }}>{t.icon}</Box>
//               <Typography sx={{ fontSize:12.5, color:TXT, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{t.msg}</Typography>
//             </Box>
//           ))}
//         </Box>

//       </div>
//     </>
//   );
// };

// export default JoinSession;








































import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, Monitor,
  MessageSquare, FileText, Users, CheckCircle2, Clock,
  Maximize2, Minimize2, Settings, Send, Wifi, X,
  ChevronDown, ChevronUp, ChevronLeft,
} from "lucide-react";
import showli from "../../assets/showli.jpeg"
import { useLogout, useGetIdentity } from "@refinedev/core";


/* ─── TOKENS ─────────────────────────────────────────────── */
const S1  = "#FFFFFF";        // was #0E0F14 — now white background
const S2  = "#F7F6FC";        // was #161820 — now off-white / lightest surface
const S3  = "#EDE9F8";        // was #1E2028 — now light purple tint
const S4  = "#E2DBF5";        // was #262830 — now medium purple tint
const BD  = "#E8E3F5";        // was rgba(255,255,255,0.07) — now solid light border
const P   = "#7F42E7";
const PM  = "#7F42E7";        // was #B893F6 — use full purple on light bg
const PL  = "rgba(127,66,231,0.10)";
const RED = "#DC2626";        // slightly more legible red on white
const RL  = "rgba(220,38,38,0.10)";
const GRN = "#00916E";
const GL  = "rgba(0,145,110,0.12)";
const AMB = "#B45309";
const TXT = "#0D0D12";        // was #F0F0F5 — now near-black for light bg
const T2  = "#4A4A5A";        // was rgba(240,240,245,0.55)
const T3  = "#9CA3AF";        // was rgba(240,240,245,0.28)

/* ─── CSS ────────────────────────────────────────────────── */
const css = `
  

  /* ── PORTAL: escape layout, own full-screen stacking context ── */
  #join-session-root {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: ${S1};
    display: flex;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ── Animations ── */
  @keyframes fadeIn     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes panelIn    { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes panelInUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes micWave    { 0%,100%{transform:scaleY(.35)} 50%{transform:scaleY(1)} }
  @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pipIn      { from{opacity:0;transform:scale(.8) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes toastIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes endPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.45)} 50%{box-shadow:0 0 0 12px rgba(220,38,38,0)} }
  @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .fade-in   { animation:fadeIn   .35s cubic-bezier(.22,1,.36,1) both; }
  .panel-in  { animation:panelIn  .3s  cubic-bezier(.22,1,.36,1) both; }
  .panel-up  { animation:panelInUp .35s cubic-bezier(.22,1,.36,1) both; }
  .pip-in    { animation:pipIn    .4s  cubic-bezier(.34,1.56,.64,1) both; }
  .toast-in  { animation:toastIn  .3s  cubic-bezier(.22,1,.36,1) both; }

  /* ── Control buttons ── */
  .ctrl {
    display:flex; align-items:center; justify-content:center;
    border:none; cursor:pointer; position:relative;
    background:${S3}; color:${TXT};
    transition:all .18s cubic-bezier(.34,1.56,.64,1);
    border-radius:14px; width:48px; height:48px;
  }
  .ctrl:hover      { background:${S4}; transform:translateY(-2px) scale(1.05); }
  .ctrl.on         { background:${PL}; color:${P}; border:1px solid rgba(127,66,231,.35); }
  .ctrl.off        { background:${RL}; color:${RED}; border:1px solid rgba(220,38,38,.35); }
  .ctrl.off:hover  { background:${RED}; color:#fff; box-shadow:0 8px 24px rgba(229,56,59,.4); }
  .ctrl.end        {
    width:auto; padding:0 20px; gap:7px;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600;
    background:${RED}; color:#fff; border:none; border-radius:14px;
    animation:endPulse 2.5s ease-in-out infinite;
  }
  .ctrl.end:hover  {
    background:#C62828; transform:translateY(-2px);
    box-shadow:0 12px 32px rgba(229,56,59,.5);
    animation:none;
  }
  /* mobile: smaller controls */
  @media(max-width:640px) {
    .ctrl { width:42px; height:42px; border-radius:12px; }
    .ctrl.end { padding:0 14px; font-size:13px; }
  }

  .ctrl .tip {
    position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%);
    background:rgba(0,0,0,.88); color:#fff; font-size:11px; font-weight:500;
    white-space:nowrap; padding:5px 9px; border-radius:7px;
    pointer-events:none; opacity:0; transition:opacity .15s;
    font-family:'DM Sans',sans-serif; z-index:10;
  }
  .ctrl:hover .tip { opacity:1; }

  /* ── Mic wave ── */
  .mw { display:flex; align-items:center; gap:2px; height:16px; }
  .mb { width:3px; border-radius:2px; background:${GRN}; animation:micWave .8s ease-in-out infinite; }
  .mb:nth-child(1){height:5px;  animation-delay:0s}
  .mb:nth-child(2){height:11px; animation-delay:.1s}
  .mb:nth-child(3){height:16px; animation-delay:.2s}
  .mb:nth-child(4){height:10px; animation-delay:.15s}
  .mb:nth-child(5){height:5px;  animation-delay:.05s}

  /* ── Agenda item ── */
  .ag-row {
    display:flex; align-items:center; gap:10px;
    padding:9px 12px; border-radius:10px;
    cursor:pointer; transition:background .15s;
  }
  .ag-row:hover         { background:rgba(255,255,255,.04); }
  .ag-row.ag-active     { background:${PL}; }

  /* ── Chat bubble ── */
  .bubble {
    max-width:80%; padding:10px 13px;
    border-radius:14px; font-size:13.5px; line-height:1.6;
    font-family:'DM Sans',sans-serif;
  }
  .bubble.them { background:${S3}; color:${TXT}; border-bottom-left-radius:4px; border:1px solid ${BD}; }
  .bubble.me   { background:${P};  color:#fff;   border-bottom-right-radius:4px; }

  /* ── Notes area ── */
  .notes-ta {
    width:100%; flex:1; resize:none;
    background:transparent; border:none; outline:none;
    color:${TXT}; font-family:'DM Sans',sans-serif;
    font-size:13.5px; line-height:1.75; caret-color:${P};
  }
  .notes-ta::placeholder { color:${T3}; }

  /* ── Chat input ── */
  .chat-in {
    flex:1; background:transparent; border:none; outline:none;
    color:${TXT}; font-family:'DM Sans',sans-serif; font-size:13.5px;
  }
  .chat-in::placeholder { color:${T3}; }

  /* ── Tab pills ── */
  .tpill {
    display:flex; align-items:center; gap:5px;
    padding:7px 10px; border-radius:9px;
    font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500;
    cursor:pointer; border:none; background:transparent;
    color:${T2}; transition:all .15s; flex:1; justify-content:center;
    white-space:nowrap;
  }
  .tpill.active { background:${S4}; color:${P}; }
  .tpill:hover:not(.active) { color:${TXT}; }

  /* ── PiP ── */
  .pip {
    position:absolute; border-radius:14px; overflow:hidden;
    border:2px solid ${BD};
    box-shadow:0 8px 24px rgba(127,66,231,.15);
    cursor:grab; transition:transform .2s, box-shadow .2s;
    /* desktop */
    width:168px; height:114px;
    bottom:90px; right:18px;
  }
  .pip:hover { transform:scale(1.04); box-shadow:0 12px 32px rgba(127,66,231,.22); }
  /* mobile: smaller, top-right corner */
  @media(max-width:640px) {
    .pip {
      width:100px; height:72px;
      bottom:auto; top:72px; right:12px;
    }
  }

  /* ── Net badge ── */
  .net {
    display:flex; align-items:center; gap:5px;
    padding:4px 10px; border-radius:100px;
    font-family:'DM Mono',monospace; font-size:10.5px;
    background:${S3}; border:1px solid ${BD};
    color:${T2};
  }

  /* ── Rec dot ── */
  .rdot {
    width:8px; height:8px; border-radius:50%;
    background:${RED}; animation:blink 1.2s ease-in-out infinite;
    flex-shrink:0;
  }

  /* ── Right panel ── */
  /* Desktop: slide in from right alongside video */
  .rpanel {
    width:300px; flex-shrink:0;
    background:${S2}; border-left:1px solid ${BD};
    display:flex; flex-direction:column; overflow:hidden;
  }
  /* Mobile: bottom sheet that overlays the video */
  @media(max-width:900px) {
    .rpanel {
      width:100%;
      position:absolute; bottom:0; left:0; right:0;
      height:60vh; max-height:420px;
      border-left:none; border-top:1px solid ${BD};
      border-radius:18px 18px 0 0;
      z-index:20;
      background:${S2};
    }
  }

  /* ── Controls bar ── */
  .cbar {
    position:absolute; bottom:0; left:0; right:0;
    height:76px;
    display:flex; align-items:center; justify-content:center;
    gap:10px; padding:0 12px;
    background:${S2};
    border-top:1px solid ${BD};
  }
  @media(max-width:640px) {
    .cbar { gap:8px; height:72px; padding:0 8px; }
  }

  /* ── Separator ── */
  .sep { width:1px; height:30px; background:${BD}; flex-shrink:0; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:${S4}; border-radius:4px; }

  /* ── End dialog ── */
  .end-dialog {
    position:absolute; inset:0; z-index:50;
    background:rgba(0,0,0,.35); backdrop-filter:blur(4px);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
  }
  .end-card {
    background:${S1}; border-radius:20px;
    border:1.5px solid ${BD};
    padding:32px; width:100%; max-width:400px;
    box-shadow:0 32px 80px rgba(127,66,231,.15);
  }
`;

/* ── MOCK DATA ───────────────────────────────────────────── */
const SESSION = {
  pro:      { name:"Sarah Johnson", role:"Software Engineer · TechWave", avatar:"https://randomuser.me/api/portraits/women/68.jpg" },
  student:  { name:"Thabo Nkosi",   avatar:"https://randomuser.me/api/portraits/men/22.jpg" },
  type:     "Technical Mock Interview",
  duration: 45,
};

const INIT_AGENDA = [
  { id:1, label:"Introduction",    done:true  },
  { id:2, label:"Experience",      done:true  },
  { id:3, label:"Problem Solving", done:false },
  { id:4, label:"Behavioural",     done:false },
  { id:5, label:"Q&A",             done:false },
];

const INIT_MSGS = [
  { id:1, from:"them", name:"Sarah", text:"Welcome! Tell me about your experience with React.", time:"32:01" },
  { id:2, from:"me",   name:"Thabo", text:"I've been using React for 2 years — side projects and an internship.", time:"32:18" },
  { id:3, from:"them", name:"Sarah", text:"Great. Have you worked with any state management libraries?", time:"32:45" },
];

const INIT_NOTES = `Problem Solving
──────────────
• useState, useEffect, useRef — good
• Needs to elaborate on useCallback/useMemo

Behavioural (next)
• Ask about conflict resolution
`;

/* ── TIMER HOOK ──────────────────────────────────────────── */
const useTimer = (start = 32 * 60 + 18) => {
  const [s, setS] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setS(x => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return `${String(Math.floor(s / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
};

interface IToast { id:number; msg:string; icon?:React.ReactNode }

/* ── COMPONENT ───────────────────────────────────────────── */
const JoinSession: React.FC = () => {
  const navigate  = useNavigate();
  const elapsed   = useTimer();
  const { data: user } = useGetIdentity<any>();

  /* controls */
  const [micOn,  setMicOn]  = useState(true);
  const [camOn,  setCamOn]  = useState(true);
  const [share,  setShare]  = useState(false);
  const [full,   setFull]   = useState(false);

  /* panel */
  const [panel, setPanel]       = useState<"agenda"|"chat"|"notes">("agenda");
  const [pOpen, setPOpen]       = useState(true);

  /* chat */
  const [msgs,   setMsgs]   = useState(INIT_MSGS);
  const [input,  setInput]  = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  /* notes */
  const [notes, setNotes] = useState(INIT_NOTES);

  /* agenda */
  const [agenda, setAgenda]   = useState(INIT_AGENDA);
  const [active, setActive]   = useState(3);

  /* end */
  const [endDlg, setEndDlg] = useState(false);

  /* toasts */
  const [toasts, setToasts] = useState<IToast[]>([]);
  const tid = useRef(0);

  /* network */
  const [net, setNet] = useState<"good"|"fair"|"poor">("good");

  useEffect(() => {
    const id = setInterval(() => {
      const r = Math.random();
      setNet(r > .85 ? "poor" : r > .7 ? "fair" : "good");
    }, 9000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { chatRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const toast = useCallback((msg:string, icon?:React.ReactNode) => {
    const id = ++tid.current;
    setToasts(p => [...p, { id, msg, icon }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  }, []);

  const toggleMic = () => { setMicOn(m => !m); toast(micOn ? "Mic muted" : "Mic on", micOn ? <MicOff size={13}/> : <Mic size={13}/>); };
  const toggleCam = () => { setCamOn(c => !c); toast(camOn ? "Camera off" : "Camera on", camOn ? <VideoOff size={13}/> : <Video size={13}/>); };
  const toggleShare = () => { setShare(s => !s); toast(share ? "Screen sharing stopped" : "Screen sharing started", <Monitor size={13}/>); };

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { id:p.length+1, from:"me", name:"Thabo", text:input.trim(), time:elapsed }]);
    setInput("");
  };

  const netColor = net === "good" ? GRN : net === "fair" ? AMB : RED;

  const markDone = () => {
    setAgenda(p => p.map(a => a.id === active ? { ...a, done:true } : a));
    const nxt = agenda.find(a => !a.done && a.id !== active);
    if (nxt) setActive(nxt.id);
    toast("Section marked complete", <CheckCircle2 size={13}/>);
  };

  /* ── PANEL TOGGLE: on mobile close panel if same tab tapped ── */
  const togglePanel = (id: "agenda"|"chat"|"notes") => {
    if (panel === id && pOpen) { setPOpen(false); return; }
    setPanel(id); setPOpen(true);
  };

  return (
    <>
      <style>{css}</style>

      {/* ── FULL-SCREEN ROOT (z-index:9999 escapes the dashboard layout) ── */}
      <div id="join-session-root">

        {/* ══ TOP BAR ════════════════════════════════════ */}
        <Box sx={{
          height:{ xs:52, md:56 }, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          px:{ xs:2, md:3 },
          background:S2, borderBottom:`1px solid ${BD}`, zIndex:10,
        }}>
          {/* Left */}
          <Stack direction="row" spacing={{ xs:1.5, md:2 }} alignItems="center">
            <Box sx={{ width:{ xs:28, md:32 }, height:{ xs:28, md:32 }, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Video size={15} color="#fff"/>
            </Box>
            <Box sx={{ display:{ xs:"none", sm:"block" } }}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:{ xs:13, md:14 }, color:TXT, lineHeight:1.2 }}>
                {SESSION.type}
              </Typography>
              <Typography sx={{ fontSize:11, color:T2, fontFamily:"'DM Mono',monospace" }}>
                {SESSION.pro.name} · inTURN
              </Typography>
            </Box>
            {/* Mobile: just show name */}
            <Box sx={{ display:{ xs:"block", sm:"none" } }}>
              <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color:TXT }}>
                {SESSION.pro.name}
              </Typography>
            </Box>
          </Stack>

          {/* Center: timer */}
          <Stack direction="row" spacing={1} alignItems="center">
            <div className="rdot"/>
            <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:{ xs:15, md:18 }, fontWeight:500, color:TXT, letterSpacing:"0.05em" }}>
              {elapsed}
            </Typography>
            <Typography sx={{ fontSize:11, color:T3, display:{ xs:"none", md:"block" } }}>
              / {SESSION.duration}:00
            </Typography>
          </Stack>

          {/* Right */}
          <Stack direction="row" spacing={{ xs:1, md:1.5 }} alignItems="center">
            <div className="net">
              <Wifi size={11} color={netColor}/>
              <span style={{ color:netColor, textTransform:"uppercase", letterSpacing:"0.06em", display: "none" }} id="net-label">
                {net}
              </span>
              <Box component="span" sx={{ display:{ xs:"none", sm:"block" }, color:netColor, textTransform:"uppercase", letterSpacing:"0.06em", fontSize:10.5, fontFamily:"'DM Mono',monospace" }}>
                {net}
              </Box>
            </div>
            <button
              className="ctrl"
              onClick={() => setFull(f => !f)}
              style={{ width:34, height:34, borderRadius:"9px" }}
            >
              {full ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
              <span className="tip">{full ? "Exit fullscreen" : "Fullscreen"}</span>
            </button>
            <button className="ctrl" style={{ width:34, height:34, borderRadius:"9px" }}>
              <Settings size={14}/>
              <span className="tip">Settings</span>
            </button>
          </Stack>
        </Box>

        {/* ══ BODY ══════════════════════════════════════ */}
        <Box sx={{ flex:1, display:"flex", overflow:"hidden", position:"relative" }}>

          {/* ── VIDEO AREA ──────────────────────────── */}
          <Box sx={{ flex:1, position:"relative", background:S1, overflow:"hidden" }}>

            {/* Main video */}
            <Box sx={{ position:"absolute", inset:0, background:S2, display:"flex", alignItems:"center", justifyContent:"center",  }}>
              {camOn ? (
                <img src={showli} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              ) : (
                <Stack alignItems="center" spacing={1.5}>
                  <Box sx={{ width:{ xs:60, md:80 }, height:{ xs:60, md:80 }, borderRadius:"50%", background:S3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <VideoOff size={28} color={T3}/>
                  </Box>
                  <Typography sx={{ fontSize:13.5, color:T2 }}>Camera is off</Typography>
                </Stack>
              )}
            </Box>

            {/* Name tag */}
            <Box sx={{
              position:"absolute", bottom:{ xs:82, md:90 }, left:{ xs:12, md:20 },
              display:"flex", alignItems:"center", gap:1.25,
              background:S2,
              borderRadius:"10px", px:1.5, py:.75,
              border:`1px solid ${BD}`,
              boxShadow:"0 2px 8px rgba(127,66,231,.08)",
            }}>
              <div className="mw" style={{ display:micOn?"flex":"none" }}>
                {[0,1,2,3,4].map(i => <div key={i} className="mb"/>)}
              </div>
              {!micOn && <MicOff size={12} color={RED}/>}
              <Typography sx={{ fontSize:{ xs:12, md:13 }, fontWeight:500, color:TXT, fontFamily:"'DM Sans',sans-serif" }}>
                {SESSION.pro.name}
              </Typography>
            </Box>

            {/* Screen share badge */}
            {share && (
              <Box sx={{ position:"absolute", top:{ xs:64, md:16 }, left:{ xs:12, md:16 }, display:"flex", alignItems:"center", gap:.75, background:PL, border:`1px solid rgba(127,66,231,.4)`, borderRadius:100, px:1.5, py:.5 }}>
                <Monitor size={11} color={PM}/>
                <Typography sx={{ fontSize:11, fontWeight:600, color:PM, fontFamily:"'DM Sans',sans-serif" }}>Sharing</Typography>
              </Box>
            )}

            {/* PiP */}
            <div className="pip pip-in">
              {camOn ? (
                <img src={showli} alt="You" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                // <img src={showli} alt="You" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                // src={user?.avatar}
                // <img src={SESSION.student.avatar} alt="You" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
              ) : (
                <Box sx={{ width:"100%", height:"100%", background:S3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <VideoOff size={18} color={T3}/>
                </Box>
              )}
              <Box sx={{ position:"absolute", bottom:5, left:7 }}>
                <Typography sx={{ fontSize:10.5, fontWeight:600, color:TXT, fontFamily:"'DM Sans',sans-serif" }}>You</Typography>
              </Box>
              {!micOn && (
                <Box sx={{ position:"absolute", top:5, right:5, width:18, height:18, borderRadius:"50%", background:"rgba(229,56,59,.85)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <MicOff size={9} color="#fff"/>
                </Box>
              )}
            </div>

            {/* ── CONTROLS BAR ─────────────────────── */}
            <div className="cbar">
              {/* Mic */}
              <button className={`ctrl${!micOn?" off":""}`} onClick={toggleMic}>
                {micOn ? <Mic size={18}/> : <MicOff size={18}/>}
                <span className="tip">{micOn?"Mute":"Unmute"}</span>
              </button>

              {/* Cam */}
              <button className={`ctrl${!camOn?" off":""}`} onClick={toggleCam}>
                {camOn ? <Video size={18}/> : <VideoOff size={18}/>}
                <span className="tip">{camOn?"Camera off":"Camera on"}</span>
              </button>

              {/* Share */}
              <button className={`ctrl${share?" on":""}`} onClick={toggleShare}>
                <Monitor size={18}/>
                <span className="tip">{share?"Stop sharing":"Share screen"}</span>
              </button>

              <div className="sep"/>

              {/* Panel toggles */}
              {(["agenda","chat","notes"] as const).map(id => (
                <button
                  key={id}
                  className={`ctrl${panel===id&&pOpen?" on":""}`}
                  onClick={() => togglePanel(id)}
                >
                  {id==="agenda" && <Users size={18}/>}
                  {id==="chat"   && <MessageSquare size={18}/>}
                  {id==="notes"  && <FileText size={18}/>}
                  {/* Chat badge */}
                  {id==="chat" && msgs.filter(m=>m.from==="them").length>0 && (
                    <Box sx={{ position:"absolute", top:-5, right:-5, width:16, height:16, borderRadius:"50%", background:P, fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'DM Mono',monospace" }}>
                      {msgs.filter(m=>m.from==="them").length}
                    </Box>
                  )}
                  <span className="tip">{id.charAt(0).toUpperCase()+id.slice(1)}</span>
                </button>
              ))}

              <div className="sep"/>

              {/* End */}
              <button className="ctrl end" onClick={() => setEndDlg(true)}>
                <PhoneOff size={16}/> End
              </button>
            </div>

            {/* ── END DIALOG ─────────────────────── */}
            {endDlg && (
              <div className="end-dialog">
                <div className="end-card fade-in">
                  <Box sx={{ width:48, height:48, borderRadius:"13px", background:RL, display:"flex", alignItems:"center", justifyContent:"center", mb:2.5 }}>
                    <PhoneOff size={22} color={RED}/>
                  </Box>
                  <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.25rem", color:TXT, mb:.75 }}>
                    End this session?
                  </Typography>
                  <Typography sx={{ fontSize:13.5, color:T2, lineHeight:1.7, mb:3 }}>
                    You've been in session for <strong style={{ color:TXT }}>{elapsed}</strong>. You'll be taken to the feedback page.
                  </Typography>
                  <Box sx={{ background:S3, borderRadius:"12px", p:2, mb:3 }}>
                    <Stack spacing={.75}>
                      {[
                        { label:"Professional", val:SESSION.pro.name },
                        { label:"Duration",     val:elapsed },
                        { label:"Sections",     val:`${agenda.filter(a=>a.done).length}/${agenda.length}` },
                      ].map(({ label, val }) => (
                        <Stack key={label} direction="row" justifyContent="space-between">
                          <Typography sx={{ fontSize:13, color:T2 }}>{label}</Typography>
                          <Typography sx={{ fontSize:13, fontWeight:600, color:TXT }}>{val}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1.5}>
                    <button
                      onClick={() => setEndDlg(false)}
                      style={{ flex:1, padding:"12px", borderRadius:12, border:`1.5px solid ${BD}`, background:S3, color:T2, fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, cursor:"pointer" }}
                    >
                      Keep going
                    </button>
                    <button
                      onClick={() => navigate("/mentee/feedback")}
                      style={{ flex:1, padding:"12px", borderRadius:12, border:"none", background:RED, color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 20px rgba(229,56,59,.3)" }}
                    >
                      End &amp; feedback
                    </button>
                  </Stack>
                </div>
              </div>
            )}
          </Box>

          {/* ── RIGHT / BOTTOM PANEL ────────────────── */}
          {pOpen && (
            <Box
              component="div"
              className={`rpanel panel-in`}
            >
              {/* Mobile drag handle + close */}
              <Box sx={{ display:{ xs:"flex", md:"none" }, alignItems:"center", justifyContent:"center", py:1, position:"relative" }}>
                <Box sx={{ width:36, height:4, borderRadius:2, background:S4 }}/>
                <Box
                  onClick={() => setPOpen(false)}
                  sx={{ position:"absolute", right:14, width:28, height:28, borderRadius:"50%", background:S4, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
                >
                  <X size={13} color={T2}/>
                </Box>
              </Box>

              {/* Tabs */}
              <Box sx={{ px:1.25, pb:1, borderBottom:`1px solid ${BD}`, display:"flex", gap:.5 }}>
                {([
                  { id:"agenda", icon:<Users size={13}/>,          label:"Agenda" },
                  { id:"chat",   icon:<MessageSquare size={13}/>,   label:"Chat" },
                  { id:"notes",  icon:<FileText size={13}/>,        label:"Notes" },
                ] as const).map(t => (
                  <button
                    key={t.id}
                    className={`tpill${panel===t.id?" active":""}`}
                    onClick={() => setPanel(t.id)}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </Box>

              {/* ── AGENDA ─────────────────────────── */}
              {panel === "agenda" && (
                <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
                  <Box sx={{ px:2.5, py:2, borderBottom:`1px solid ${BD}` }}>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:TXT, mb:.4 }}>
                      Interview Agenda
                    </Typography>
                    <Stack direction="row" spacing={.75} alignItems="center" mb={1.25}>
                      <Clock size={11} color={T3}/>
                      <Typography sx={{ fontSize:11.5, color:T2, fontFamily:"'DM Mono',monospace" }}>
                        {agenda.filter(a=>a.done).length}/{agenda.length} complete
                      </Typography>
                    </Stack>
                    <Box sx={{ height:3, background:S4, borderRadius:100, overflow:"hidden" }}>
                      <Box sx={{ height:"100%", width:`${(agenda.filter(a=>a.done).length/agenda.length)*100}%`, background:P, borderRadius:100, transition:"width .5s ease" }}/>
                    </Box>
                  </Box>
                  <Box sx={{ flex:1, p:1.5, overflowY:"auto" }}>
                    <Stack spacing={.5}>
                      {agenda.map((item, i) => (
                        <div
                          key={item.id}
                          className={`ag-row${active===item.id?" ag-active":""}`}
                          onClick={() => setActive(item.id)}
                        >
                          <Box sx={{ width:28, height:28, borderRadius:"50%", background:item.done?GL:active===item.id?PL:S3, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:active===item.id&&!item.done?`1.5px solid ${P}`:"none" }}>
                            {item.done
                              ? <CheckCircle2 size={13} color={GRN}/>
                              : <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:10, fontWeight:700, color:active===item.id?PM:T3 }}>{String(i+1).padStart(2,"0")}</Typography>
                            }
                          </Box>
                          <Box flex={1}>
                            <Typography sx={{ fontSize:13.5, fontWeight:item.done||active===item.id?600:400, color:item.done?T2:active===item.id?TXT:T2, lineHeight:1.3 }}>
                              {item.label}
                            </Typography>
                            {active===item.id && !item.done && (
                              <Typography sx={{ fontSize:10.5, color:PM, mt:.15 }}>In progress</Typography>
                            )}
                          </Box>
                          {active===item.id && !item.done && (
                            <Box sx={{ width:6, height:6, borderRadius:"50%", background:P, animation:"blink 1.2s ease-in-out infinite", flexShrink:0 }}/>
                          )}
                        </div>
                      ))}
                    </Stack>
                  </Box>
                  <Box sx={{ p:2, borderTop:`1px solid ${BD}` }}>
                    <button
                      onClick={markDone}
                      style={{ width:"100%", padding:"10px", borderRadius:10, border:`1.5px solid rgba(127,66,231,.35)`, background:PL, color:PM, fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, cursor:"pointer", transition:"all .18s", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}
                    >
                      <CheckCircle2 size={13}/> Mark complete
                    </button>
                  </Box>
                </Box>
              )}

              {/* ── CHAT ───────────────────────────── */}
              {panel === "chat" && (
                <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
                  <Box sx={{ px:2, py:1.75, borderBottom:`1px solid ${BD}` }}>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:TXT }}>Session Chat</Typography>
                    <Typography sx={{ fontSize:11.5, color:T2, mt:.2 }}>Visible only to participants</Typography>
                  </Box>
                  <Box sx={{ flex:1, overflowY:"auto", p:2 }}>
                    <Stack spacing={2}>
                      {msgs.map(m => (
                        <Box key={m.id} sx={{ display:"flex", flexDirection:"column", alignItems:m.from==="me"?"flex-end":"flex-start" }}>
                          <Stack direction="row" spacing={.75} alignItems="center" mb={.4} sx={{ flexDirection:m.from==="me"?"row-reverse":"row" }}>
                            <img src={m.from==="me"?SESSION.student.avatar:SESSION.pro.avatar} alt="" style={{ width:18, height:18, borderRadius:"50%", objectFit:"cover" }}/>
                            <Typography sx={{ fontSize:11, color:T3, fontFamily:"'DM Sans',sans-serif" }}>{m.name} · {m.time}</Typography>
                          </Stack>
                          <div className={`bubble ${m.from==="me"?"me":"them"}`}>{m.text}</div>
                        </Box>
                      ))}
                      <div ref={chatRef}/>
                    </Stack>
                  </Box>
                  <Box sx={{ p:1.5, borderTop:`1px solid ${BD}` }}>
                    <Box sx={{ display:"flex", alignItems:"center", gap:1, background:S3, borderRadius:11, px:2, py:1, border:`1px solid ${BD}` }}>
                      <input
                        className="chat-in"
                        placeholder="Type a message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMsg(); }}}
                      />
                      <button onClick={sendMsg} style={{ background:"none", border:"none", cursor:input.trim()?"pointer":"default", color:input.trim()?PM:T3, display:"flex", transition:"color .15s" }}>
                        <Send size={15}/>
                      </button>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* ── NOTES ──────────────────────────── */}
              {panel === "notes" && (
                <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
                  <Box sx={{ px:2, py:1.75, borderBottom:`1px solid ${BD}` }}>
                    <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:TXT }}>Session Notes</Typography>
                    <Typography sx={{ fontSize:11.5, color:T2, mt:.2 }}>Private — only visible to you</Typography>
                  </Box>
                  <Box sx={{ flex:1, p:2, display:"flex", flexDirection:"column", overflow:"hidden" }}>
                    <textarea className="notes-ta" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Take notes here..."/>
                  </Box>
                  <Box sx={{ px:2, pb:2, pt:1.5, borderTop:`1px solid ${BD}` }}>
                    <Typography sx={{ fontSize:11, color:T3, fontFamily:"'DM Mono',monospace" }}>
                      {notes.length} chars · Auto-saved
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* ══ TOASTS ═════════════════════════════════════ */}
        <Box sx={{ position:"fixed", bottom:{ xs:82, md:90 }, left:"50%", transform:"translateX(-50%)", zIndex:100, display:"flex", flexDirection:"column", alignItems:"center", gap:1, pointerEvents:"none" }}>
          {toasts.map(t => (
            <Box
              key={t.id}
              className="toast-in"
              sx={{ display:"flex", alignItems:"center", gap:1, background:"rgba(247,246,252,.96)", backdropFilter:"blur(10px)", border:`1px solid ${BD}`, borderRadius:100, px:2, py:1, boxShadow:"0 8px 32px rgba(127,66,231,.12)", whiteSpace:"nowrap" }}
            >
              <Box sx={{ color:T2 }}>{t.icon}</Box>
              <Typography sx={{ fontSize:12.5, color:TXT, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{t.msg}</Typography>
            </Box>
          ))}
        </Box>

      </div>
    </>
  );
};

export default JoinSession;