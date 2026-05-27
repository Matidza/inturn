
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Box, Typography, Stack } from "@mui/material";
// import {
//   Mic, MicOff, Video, VideoOff, PhoneOff, Monitor,
//   MessageSquare, FileText, Users, ChevronRight,
//   CheckCircle2, Clock, Maximize2, Minimize2, Settings,
//   Send, MoreVertical, Wifi, AlertCircle, X, ChevronDown,
// } from "lucide-react";

// /* ── TOKENS ─────────────────────────────────────────────── */
// const SURFACE   = "#0E0F14";
// const SURFACE2  = "#161820";
// const SURFACE3  = "#1E2028";
// const SURFACE4  = "#262830";
// const BORDER    = "rgba(255,255,255,0.07)";
// const P         = "#7F42E7";
// const P_MID     = "#B893F6";
// const P_LITE    = "rgba(127,66,231,0.15)";
// const RED       = "#E5383B";
// const RED_L     = "rgba(229,56,59,0.15)";
// const GREEN     = "#22C55E";
// const GREEN_L   = "rgba(34,197,94,0.15)";
// const AMBER     = "#F59E0B";
// const AMBER_L   = "rgba(245,158,11,0.12)";
// const TEXT      = "#F0F0F5";
// const TEXT2     = "rgba(240,240,245,0.55)";
// const TEXT3     = "rgba(240,240,245,0.3)";

// /* ── CSS ─────────────────────────────────────────────────── */
// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   html, body { height: 100%; overflow: hidden; }

//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes slideLeft {
//     from { opacity: 0; transform: translateX(20px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes pulse-ring {
//     0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
//     70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
//     100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
//   }
//   @keyframes mic-wave {
//     0%,100% { transform: scaleY(0.4); }
//     50%     { transform: scaleY(1); }
//   }
//   @keyframes blink {
//     0%,100% { opacity: 1; }
//     50%      { opacity: 0; }
//   }
//   @keyframes pip-in {
//     from { opacity: 0; transform: scale(0.85) translateY(12px); }
//     to   { opacity: 1; transform: scale(1) translateY(0); }
//   }
//   @keyframes toast-in {
//     from { opacity: 0; transform: translateX(24px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes end-pulse {
//     0%,100% { box-shadow: 0 0 0 0 rgba(229,56,59,0.6); }
//     50%      { box-shadow: 0 0 0 14px rgba(229,56,59,0); }
//   }

//   .fade-in  { animation: fadeIn .4s cubic-bezier(.22,1,.36,1) both; }
//   .slide-left { animation: slideLeft .35s cubic-bezier(.22,1,.36,1) both; }
//   .pip-in   { animation: pip-in .4s cubic-bezier(.34,1.56,.64,1) both; }
//   .toast-in { animation: toast-in .35s cubic-bezier(.22,1,.36,1) both; }

//   /* Control buttons */
//   .ctrl-btn {
//     display: flex; align-items: center; justify-content: center;
//     width: 48px; height: 48px; border-radius: 14px;
//     border: none; cursor: pointer;
//     background: ${SURFACE3}; color: ${TEXT};
//     transition: all .18s cubic-bezier(.34,1.56,.64,1);
//     position: relative;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .ctrl-btn:hover {
//     background: ${SURFACE4};
//     transform: translateY(-2px) scale(1.06);
//   }
//   .ctrl-btn.active {
//     background: ${P_LITE};
//     color: ${P_MID};
//     border: 1px solid rgba(127,66,231,0.3);
//   }
//   .ctrl-btn.danger {
//     background: ${RED_L};
//     color: ${RED};
//     border: 1px solid rgba(229,56,59,0.3);
//   }
//   .ctrl-btn.danger:hover {
//     background: ${RED};
//     color: #fff;
//     box-shadow: 0 8px 24px rgba(229,56,59,0.4);
//   }
//   .ctrl-btn.end-btn {
//     width: auto; padding: 0 22px; gap: 8px;
//     font-size: 14px; font-weight: 600;
//     background: ${RED}; color: #fff; border: none;
//     animation: end-pulse 2.5s ease-in-out infinite;
//   }
//   .ctrl-btn.end-btn:hover {
//     background: #C62828; transform: translateY(-2px);
//     box-shadow: 0 12px 32px rgba(229,56,59,0.5);
//     animation: none;
//   }

//   .ctrl-btn .tooltip {
//     position: absolute; bottom: calc(100% + 10px); left: 50%;
//     transform: translateX(-50%);
//     background: rgba(0,0,0,0.85); color: #fff;
//     font-size: 11.5px; font-weight: 500; white-space: nowrap;
//     padding: 5px 10px; border-radius: 7px;
//     pointer-events: none; opacity: 0;
//     transition: opacity .15s;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .ctrl-btn:hover .tooltip { opacity: 1; }

//   /* Mic wave bars */
//   .mic-wave {
//     display: flex; align-items: center; gap: 2px; height: 16px;
//   }
//   .mic-bar {
//     width: 3px; border-radius: 2px; background: ${GREEN};
//     animation: mic-wave 0.8s ease-in-out infinite;
//   }
//   .mic-bar:nth-child(1) { animation-delay: 0s;    height: 6px; }
//   .mic-bar:nth-child(2) { animation-delay: 0.1s;  height: 12px; }
//   .mic-bar:nth-child(3) { animation-delay: 0.2s;  height: 16px; }
//   .mic-bar:nth-child(4) { animation-delay: 0.15s; height: 10px; }
//   .mic-bar:nth-child(5) { animation-delay: 0.05s; height: 6px; }

//   /* Agenda item */
//   .agenda-item {
//     display: flex; align-items: center; gap: 10px;
//     padding: 9px 12px; border-radius: 10px;
//     cursor: pointer; transition: background .15s;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .agenda-item:hover { background: rgba(255,255,255,0.04); }
//   .agenda-item.active { background: ${P_LITE}; }

//   /* Chat bubble */
//   .chat-bubble {
//     max-width: 78%; padding: 10px 13px;
//     border-radius: 14px; font-family: 'DM Sans', sans-serif;
//     font-size: 13.5px; line-height: 1.6;
//   }
//   .chat-bubble.them {
//     background: ${SURFACE3}; color: ${TEXT};
//     border-bottom-left-radius: 4px;
//   }
//   .chat-bubble.me {
//     background: ${P}; color: #fff;
//     border-bottom-right-radius: 4px;
//   }

//   /* Notes textarea */
//   .notes-area {
//     width: 100%; flex: 1; resize: none;
//     background: transparent; border: none; outline: none;
//     color: ${TEXT}; font-family: 'DM Sans', sans-serif;
//     font-size: 13.5px; line-height: 1.75;
//     caret-color: ${P_MID};
//   }
//   .notes-area::placeholder { color: ${TEXT3}; }

//   /* Chat input */
//   .chat-input {
//     flex: 1; background: transparent; border: none; outline: none;
//     color: ${TEXT}; font-family: 'DM Sans', sans-serif; font-size: 13.5px;
//   }
//   .chat-input::placeholder { color: ${TEXT3}; }

//   /* Tab pill */
//   .tab-pill {
//     display: flex; align-items: center; gap: 6px;
//     padding: 7px 14px; border-radius: 9px;
//     font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
//     cursor: pointer; border: none; background: transparent;
//     color: ${TEXT2}; transition: all .15s; flex: 1; justify-content: center;
//   }
//   .tab-pill.active { background: ${SURFACE3}; color: ${TEXT}; }
//   .tab-pill:hover:not(.active) { color: ${TEXT}; }

//   /* PiP drag handle area */
//   .pip-container {
//     position: absolute; bottom: 88px; right: 18px;
//     width: 168px; height: 114px;
//     border-radius: 14px; overflow: hidden;
//     border: 2px solid rgba(255,255,255,0.12);
//     box-shadow: 0 12px 40px rgba(0,0,0,0.5);
//     cursor: grab;
//     transition: transform .2s, box-shadow .2s;
//   }
//   .pip-container:hover {
//     transform: scale(1.03);
//     box-shadow: 0 16px 48px rgba(0,0,0,0.6);
//   }

//   /* Network badge */
//   .net-badge {
//     display: flex; align-items: center; gap: 5px;
//     padding: 4px 10px; border-radius: 100px;
//     font-family: 'DM Mono', monospace; font-size: 11px;
//     background: rgba(0,0,0,0.4); backdrop-filter: blur(6px);
//     color: ${TEXT2};
//   }

//   /* Recording dot */
//   .rec-dot {
//     width: 8px; height: 8px; border-radius: 50%;
//     background: ${RED}; animation: blink 1.2s ease-in-out infinite;
//   }

//   /* Scrollbar */
//   ::-webkit-scrollbar { width: 4px; }
//   ::-webkit-scrollbar-track { background: transparent; }
//   ::-webkit-scrollbar-thumb { background: ${SURFACE4}; border-radius: 4px; }
// `;

// /* ── MOCK DATA ─────────────────────────────────────────── */
// const SESSION = {
//   professional: { name:"Sarah Johnson", role:"Software Engineer · TechWave", avatar:"https://randomuser.me/api/portraits/women/68.jpg" },
//   student:      { name:"Thabo Nkosi",   avatar:"https://randomuser.me/api/portraits/men/22.jpg" },
//   type:         "Technical Mock Interview",
//   duration:     45, // minutes
// };

// const AGENDA_ITEMS = [
//   { id:1, label:"Introduction",    done:true  },
//   { id:2, label:"Experience",      done:true  },
//   { id:3, label:"Problem Solving", done:false, active:true },
//   { id:4, label:"Behavioural",     done:false },
//   { id:5, label:"Q&A",             done:false },
// ];

// const INIT_MESSAGES = [
//   { id:1, from:"them", name:"Sarah",  text:"Welcome! Let's start with your background. Tell me about your experience with React.", time:"32:01" },
//   { id:2, from:"me",   name:"Thabo",  text:"Sure! I've been using React for about 2 years now — mostly in side projects and a recent internship.", time:"32:18" },
//   { id:3, from:"them", name:"Sarah",  text:"Great. Have you worked with any state management libraries?", time:"32:45" },
// ];

// const INIT_NOTES = `Problem Solving section
// ──────────────────────
// • Asked about React hooks — mentioned useState, useEffect, useRef
// • Good answer on component lifecycle
// • Needs to elaborate more on useCallback/useMemo

// Behavioral section (next)
// • Prepare STAR examples
// • Ask about conflict resolution
// `;

// /* ── HOOK: SESSION TIMER ──────────────────────────────── */
// const useTimer = (startSeconds = 32 * 60 + 18) => {
//   const [elapsed, setElapsed] = useState(startSeconds);
//   useEffect(() => {
//     const id = setInterval(() => setElapsed(e => e + 1), 1000);
//     return () => clearInterval(id);
//   }, []);
//   const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
//   const ss = String(elapsed % 60).padStart(2, "0");
//   return `${mm}:${ss}`;
// };

// /* ── TOAST ─────────────────────────────────────────────── */
// interface Toast { id: number; msg: string; icon?: React.ReactNode; }

// /* ── MAIN COMPONENT ─────────────────────────────────────── */
// const JoinSession: React.FC = () => {
//   const navigate = useNavigate();

//   /* Controls state */
//   const [micOn,    setMicOn]    = useState(true);
//   const [camOn,    setCamOn]    = useState(true);
//   const [sharing,  setSharing]  = useState(false);
//   const [fullscreen, setFullscreen] = useState(false);

//   /* Panel state */
//   const [panel,    setPanel]    = useState<"agenda"|"chat"|"notes">("agenda");
//   const [panelOpen, setPanelOpen] = useState(true);

//   /* Chat */
//   const [messages,   setMessages]   = useState(INIT_MESSAGES);
//   const [chatInput,  setChatInput]  = useState("");
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   /* Notes */
//   const [notes,    setNotes]    = useState(INIT_NOTES);

//   /* Agenda */
//   const [agenda,   setAgenda]   = useState(AGENDA_ITEMS);
//   const [activeAgenda, setActiveAgenda] = useState(3);

//   /* End session dialog */
//   const [showEndDialog, setShowEndDialog] = useState(false);

//   /* Toasts */
//   const [toasts, setToasts] = useState<Toast[]>([]);
//   const toastId = useRef(0);

//   /* Timer */
//   const elapsed = useTimer();

//   /* Network quality simulation */
//   const [netQuality, setNetQuality] = useState<"good"|"fair"|"poor">("good");
//   useEffect(() => {
//     const id = setInterval(() => {
//       const r = Math.random();
//       setNetQuality(r > 0.85 ? "poor" : r > 0.7 ? "fair" : "good");
//     }, 8000);
//     return () => clearInterval(id);
//   }, []);

//   const addToast = useCallback((msg: string, icon?: React.ReactNode) => {
//     const id = ++toastId.current;
//     setToasts(prev => [...prev, { id, msg, icon }]);
//     setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
//   }, []);

//   /* Auto-scroll chat */
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendChat = () => {
//     if (!chatInput.trim()) return;
//     setMessages(prev => [...prev, {
//       id: prev.length + 1, from: "me", name: "Thabo",
//       text: chatInput.trim(), time: elapsed,
//     }]);
//     setChatInput("");
//   };

//   const handleMic = () => {
//     setMicOn(m => !m);
//     addToast(micOn ? "Microphone muted" : "Microphone on",
//       micOn ? <MicOff size={14}/> : <Mic size={14}/>);
//   };

//   const handleCam = () => {
//     setCamOn(c => !c);
//     addToast(camOn ? "Camera off" : "Camera on",
//       camOn ? <VideoOff size={14}/> : <Video size={14}/>);
//   };

//   const handleShare = () => {
//     setSharing(s => !s);
//     addToast(sharing ? "Screen sharing stopped" : "Screen sharing started", <Monitor size={14}/>);
//   };

//   const handleEnd = () => setShowEndDialog(true);

//   const confirmEnd = () => navigate("/mentee/feedback");

//   const netColor = netQuality === "good" ? GREEN : netQuality === "fair" ? AMBER : RED;

//   /* ── RENDER ─────────────────────────────────────────── */
//   return (
//     <>
//       <style>{css}</style>

//       <Box sx={{
//         width:"100vw", height:"100vh",
//         background:SURFACE,
//         display:"flex", flexDirection:"column",
//         fontFamily:"'DM Sans', sans-serif",
//         overflow:"hidden",
//         position:"relative",
//       }}>

//         {/* ══ TOP BAR ══════════════════════════════════ */}
//         <Box sx={{
//           height:56, flexShrink:0,
//           display:"flex", alignItems:"center", justifyContent:"space-between",
//           px:3,
//           background:SURFACE2,
//           borderBottom:`1px solid ${BORDER}`,
//           zIndex:10,
//         }}>
//           {/* Left: session info */}
//           <Stack direction="row" spacing={2} alignItems="center">
//             <Box sx={{ width:32, height:32, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//               <Video size={16} color="#fff"/>
//             </Box>
//             <Box>
//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:TEXT, lineHeight:1.2 }}>
//                 {SESSION.type}
//               </Typography>
//               <Typography sx={{ fontSize:11.5, color:TEXT2, fontFamily:"'DM Mono',monospace" }}>
//                 {SESSION.professional.name} · inTURN Session
//               </Typography>
//             </Box>
//           </Stack>

//           {/* Center: timer */}
//           <Stack direction="row" spacing={1.5} alignItems="center">
//             <div className="rec-dot"/>
//             <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:18, fontWeight:500, color:TEXT, letterSpacing:"0.05em" }}>
//               {elapsed}
//             </Typography>
//             <Typography sx={{ fontSize:11.5, color:TEXT3, fontFamily:"'DM Sans',sans-serif" }}>
//               / {SESSION.duration}:00
//             </Typography>
//           </Stack>

//           {/* Right: network + settings */}
//           <Stack direction="row" spacing={1.5} alignItems="center">
//             {/* Network quality */}
//             <div className="net-badge">
//               <Wifi size={12} color={netColor}/>
//               <span style={{ color:netColor, textTransform:"uppercase", letterSpacing:"0.06em" }}>
//                 {netQuality}
//               </span>
//             </div>

//             <button
//               className="ctrl-btn"
//               onClick={() => setFullscreen(f => !f)}
//               style={{ width:36, height:36, borderRadius:"9px" }}
//             >
//               {fullscreen ? <Minimize2 size={15}/> : <Maximize2 size={15}/>}
//               <span className="tooltip">{fullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
//             </button>

//             <button
//               className="ctrl-btn"
//               style={{ width:36, height:36, borderRadius:"9px" }}
//             >
//               <Settings size={15}/>
//               <span className="tooltip">Settings</span>
//             </button>
//           </Stack>
//         </Box>

//         {/* ══ MAIN CONTENT ═════════════════════════════ */}
//         <Box sx={{ flex:1, display:"flex", overflow:"hidden", position:"relative" }}>

//           {/* ── VIDEO AREA ─────────────────────────── */}
//           <Box sx={{ flex:1, position:"relative", background:SURFACE, overflow:"hidden" }}>

//             {/* Main video (professional) */}
//             <Box sx={{
//               position:"absolute", inset:0,
//               background:`linear-gradient(160deg, #1A1B22 0%, #0E0F14 100%)`,
//               display:"flex", alignItems:"center", justifyContent:"center",
//             }}>
//               {camOn ? (
//                 <img
//                   src={SESSION.professional.avatar}
//                   alt={SESSION.professional.name}
//                   style={{
//                     width:"100%", height:"100%",
//                     objectFit:"cover",
//                     filter:"brightness(0.92)",
//                   }}
//                 />
//               ) : (
//                 <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
//                   <Box sx={{ width:80, height:80, borderRadius:"50%", background:SURFACE3, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                     <VideoOff size={30} color={TEXT3}/>
//                   </Box>
//                   <Typography sx={{ fontSize:14, color:TEXT2 }}>Camera is off</Typography>
//                 </Box>
//               )}

//               {/* Dark gradient overlay bottom */}
//               <Box sx={{ position:"absolute", bottom:0, left:0, right:0, height:160, background:"linear-gradient(to top, rgba(14,15,20,0.9) 0%, transparent 100%)", pointerEvents:"none" }}/>

//               {/* Dark gradient overlay top */}
//               <Box sx={{ position:"absolute", top:0, left:0, right:0, height:80, background:"linear-gradient(to bottom, rgba(14,15,20,0.5) 0%, transparent 100%)", pointerEvents:"none" }}/>
//             </Box>

//             {/* Professional name tag */}
//             <Box sx={{
//               position:"absolute", bottom:96, left:20,
//               display:"flex", alignItems:"center", gap:1.25,
//               background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)",
//               borderRadius:"10px", px:1.75, py:.85,
//               border:"1px solid rgba(255,255,255,0.08)",
//             }}>
//               {/* Mic active indicator */}
//               <div className="mic-wave" style={{ display:micOn?"flex":"none" }}>
//                 <div className="mic-bar"/>
//                 <div className="mic-bar"/>
//                 <div className="mic-bar"/>
//                 <div className="mic-bar"/>
//                 <div className="mic-bar"/>
//               </div>
//               {!micOn && <MicOff size={13} color={RED}/>}
//               <Typography sx={{ fontSize:13, fontWeight:500, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>
//                 {SESSION.professional.name}
//               </Typography>
//             </Box>

//             {/* Top-right overlays */}
//             <Box sx={{ position:"absolute", top:16, left:16, display:"flex", gap:1 }}>
//               {sharing && (
//                 <Box sx={{ display:"flex", alignItems:"center", gap:.75, background:P_LITE, border:`1px solid rgba(127,66,231,0.4)`, borderRadius:100, px:1.5, py:.5 }}>
//                   <Monitor size={12} color={P_MID}/>
//                   <Typography sx={{ fontSize:11.5, fontWeight:600, color:P_MID, fontFamily:"'DM Sans',sans-serif" }}>Sharing screen</Typography>
//                 </Box>
//               )}
//             </Box>

//             {/* PiP — student's self view */}
//             <div className="pip-container pip-in" style={{ position:"absolute" }}>
//               {camOn ? (
//                 <img
//                   src={SESSION.student.avatar}
//                   alt="You"
//                   style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
//                 />
//               ) : (
//                 <Box sx={{ width:"100%", height:"100%", background:SURFACE3, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                   <VideoOff size={22} color={TEXT3}/>
//                 </Box>
//               )}
//               <Box sx={{ position:"absolute", bottom:6, left:8, display:"flex", alignItems:"center", gap:.75 }}>
//                 <Typography sx={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,0.85)", fontFamily:"'DM Sans',sans-serif", textShadow:"0 1px 4px rgba(0,0,0,0.8)" }}>
//                   You
//                 </Typography>
//               </Box>
//               {!micOn && (
//                 <Box sx={{ position:"absolute", top:6, right:6, width:22, height:22, borderRadius:"50%", background:"rgba(229,56,59,0.85)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                   <MicOff size={11} color="#fff"/>
//                 </Box>
//               )}
//             </div>

//             {/* ── CONTROLS BAR ─────────────────────── */}
//             <Box sx={{
//               position:"absolute", bottom:0, left:0, right:0,
//               height:80,
//               display:"flex", alignItems:"center", justifyContent:"center",
//               gap:1.5,
//               px:3,
//             }}>
//               {/* Mic */}
//               <button
//                 className={`ctrl-btn${!micOn?" danger":""}`}
//                 onClick={handleMic}
//               >
//                 {micOn ? <Mic size={19}/> : <MicOff size={19}/>}
//                 <span className="tooltip">{micOn ? "Mute mic" : "Unmute mic"}</span>
//               </button>

//               {/* Camera */}
//               <button
//                 className={`ctrl-btn${!camOn?" danger":""}`}
//                 onClick={handleCam}
//               >
//                 {camOn ? <Video size={19}/> : <VideoOff size={19}/>}
//                 <span className="tooltip">{camOn ? "Turn off camera" : "Turn on camera"}</span>
//               </button>

//               {/* Screen share */}
//               <button
//                 className={`ctrl-btn${sharing?" active":""}`}
//                 onClick={handleShare}
//               >
//                 <Monitor size={19}/>
//                 <span className="tooltip">{sharing ? "Stop sharing" : "Share screen"}</span>
//               </button>

//               {/* Panel toggles */}
//               <Box sx={{ width:1, height:32, background:BORDER, mx:.5 }}/>

//               <button
//                 className={`ctrl-btn${panel==="chat"&&panelOpen?" active":""}`}
//                 onClick={() => { setPanel("chat"); setPanelOpen(p => panel==="chat"?!p:true); }}
//               >
//                 <MessageSquare size={19}/>
//                 <span className="tooltip">Chat</span>
//               </button>

//               <button
//                 className={`ctrl-btn${panel==="notes"&&panelOpen?" active":""}`}
//                 onClick={() => { setPanel("notes"); setPanelOpen(p => panel==="notes"?!p:true); }}
//               >
//                 <FileText size={19}/>
//                 <span className="tooltip">Notes</span>
//               </button>

//               <button
//                 className={`ctrl-btn${panel==="agenda"&&panelOpen?" active":""}`}
//                 onClick={() => { setPanel("agenda"); setPanelOpen(p => panel==="agenda"?!p:true); }}
//               >
//                 <Users size={19}/>
//                 <span className="tooltip">Agenda</span>
//               </button>

//               <Box sx={{ width:1, height:32, background:BORDER, mx:.5 }}/>

//               {/* End session */}
//               <button className="ctrl-btn end-btn" onClick={handleEnd}>
//                 <PhoneOff size={17}/>
//                 End Session
//               </button>
//             </Box>
//           </Box>

//           {/* ── RIGHT PANEL ────────────────────────── */}
//           {panelOpen && (
//             <Box
//               className="slide-left"
//               sx={{
//                 width:300,
//                 background:SURFACE2,
//                 borderLeft:`1px solid ${BORDER}`,
//                 display:"flex", flexDirection:"column",
//                 flexShrink:0,
//                 overflow:"hidden",
//               }}
//             >
//               {/* Panel tabs */}
//               <Box sx={{ p:1.25, borderBottom:`1px solid ${BORDER}`, display:"flex", gap:.5 }}>
//                 {([
//                   { id:"agenda", icon:<Users size={14}/>,        label:"Agenda" },
//                   { id:"chat",   icon:<MessageSquare size={14}/>, label:"Chat",
//                     badge: messages.filter(m=>m.from==="them").length },
//                   { id:"notes",  icon:<FileText size={14}/>,     label:"Notes" },
//                 ] as const).map(t => (
//                   <button
//                     key={t.id}
//                     className={`tab-pill${panel===t.id?" active":""}`}
//                     onClick={() => setPanel(t.id as any)}
//                   >
//                     {t.icon} {t.label}
//                     {"badge" in t && t.badge > 0 && (
//                       <Box sx={{ width:16, height:16, borderRadius:"50%", background:P, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'DM Mono',monospace" }}>
//                         {t.badge}
//                       </Box>
//                     )}
//                   </button>
//                 ))}
//               </Box>

//               {/* ── AGENDA PANEL ───────────────────── */}
//               {panel === "agenda" && (
//                 <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                   <Box sx={{ p:2.5, borderBottom:`1px solid ${BORDER}` }}>
//                     <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:TEXT, mb:.5 }}>
//                       Interview Agenda
//                     </Typography>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <Clock size={12} color={TEXT3}/>
//                       <Typography sx={{ fontSize:12, color:TEXT2, fontFamily:"'DM Mono',monospace" }}>
//                         {agenda.filter(a=>a.done).length}/{agenda.length} complete
//                       </Typography>
//                     </Stack>
//                     {/* Progress bar */}
//                     <Box sx={{ mt:1.5, height:3, background:SURFACE4, borderRadius:100, overflow:"hidden" }}>
//                       <Box sx={{ height:"100%", width:`${(agenda.filter(a=>a.done).length/agenda.length)*100}%`, background:P, borderRadius:100, transition:"width .5s ease" }}/>
//                     </Box>
//                   </Box>

//                   <Box sx={{ flex:1, p:1.5, overflowY:"auto" }}>
//                     <Stack spacing={.5}>
//                       {agenda.map((item, i) => (
//                         <div
//                           key={item.id}
//                           className={`agenda-item${activeAgenda===item.id?" active":""}`}
//                           onClick={() => setActiveAgenda(item.id)}
//                         >
//                           {/* Status dot / check */}
//                           <Box sx={{
//                             width:28, height:28, borderRadius:"50%",
//                             background: item.done ? GREEN_L : activeAgenda===item.id ? P_LITE : SURFACE3,
//                             display:"flex", alignItems:"center", justifyContent:"center",
//                             flexShrink:0, border: activeAgenda===item.id && !item.done ? `1.5px solid ${P}` : "none",
//                           }}>
//                             {item.done
//                               ? <CheckCircle2 size={14} color={GREEN}/>
//                               : <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:10.5, fontWeight:700, color: activeAgenda===item.id ? P_MID : TEXT3 }}>{String(i+1).padStart(2,"0")}</Typography>
//                             }
//                           </Box>
//                           <Box flex={1}>
//                             <Typography sx={{ fontSize:13.5, fontWeight:item.done||activeAgenda===item.id?600:400, color:item.done?TEXT2:activeAgenda===item.id?TEXT:TEXT2, lineHeight:1.3 }}>
//                               {item.label}
//                             </Typography>
//                             {activeAgenda===item.id && !item.done && (
//                               <Typography sx={{ fontSize:11, color:P_MID, mt:.2 }}>In progress</Typography>
//                             )}
//                           </Box>
//                           {activeAgenda===item.id && !item.done && (
//                             <Box sx={{ width:6, height:6, borderRadius:"50%", background:P, animation:"blink 1.2s ease-in-out infinite" }}/>
//                           )}
//                         </div>
//                       ))}
//                     </Stack>
//                   </Box>

//                   {/* Mark complete button */}
//                   <Box sx={{ p:2, borderTop:`1px solid ${BORDER}` }}>
//                     <button
//                       onClick={() => {
//                         setAgenda(prev => prev.map(a => a.id===activeAgenda ? {...a,done:true} : a));
//                         const next = agenda.find(a => !a.done && a.id!==activeAgenda);
//                         if (next) setActiveAgenda(next.id);
//                         addToast("Section marked complete", <CheckCircle2 size={14}/>);
//                       }}
//                       style={{
//                         width:"100%", padding:"10px", borderRadius:10,
//                         border:`1.5px solid rgba(127,66,231,0.35)`,
//                         background:P_LITE, color:P_MID,
//                         fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600,
//                         cursor:"pointer", transition:"all .18s",
//                         display:"flex", alignItems:"center", justifyContent:"center", gap:7,
//                       }}
//                     >
//                       <CheckCircle2 size={14}/> Mark section complete
//                     </button>
//                   </Box>
//                 </Box>
//               )}

//               {/* ── CHAT PANEL ─────────────────────── */}
//               {panel === "chat" && (
//                 <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                   <Box sx={{ p:2, borderBottom:`1px solid ${BORDER}` }}>
//                     <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:TEXT }}>
//                       Session Chat
//                     </Typography>
//                     <Typography sx={{ fontSize:12, color:TEXT2, mt:.25 }}>
//                       Visible only to session participants
//                     </Typography>
//                   </Box>

//                   {/* Messages */}
//                   <Box sx={{ flex:1, overflowY:"auto", p:2 }}>
//                     <Stack spacing={2}>
//                       {messages.map((msg) => (
//                         <Box key={msg.id} sx={{ display:"flex", flexDirection:"column", alignItems:msg.from==="me"?"flex-end":"flex-start" }}>
//                           {/* Avatar + name */}
//                           <Stack direction="row" spacing={.75} alignItems="center" mb={.5} sx={{ flexDirection:msg.from==="me"?"row-reverse":"row" }}>
//                             <img
//                               src={msg.from==="me" ? SESSION.student.avatar : SESSION.professional.avatar}
//                               alt={msg.name}
//                               style={{ width:20, height:20, borderRadius:"50%", objectFit:"cover" }}
//                             />
//                             <Typography sx={{ fontSize:11.5, color:TEXT3, fontFamily:"'DM Sans',sans-serif" }}>{msg.name} · {msg.time}</Typography>
//                           </Stack>
//                           <div className={`chat-bubble ${msg.from==="me"?"me":"them"}`}>
//                             {msg.text}
//                           </div>
//                         </Box>
//                       ))}
//                       <div ref={chatEndRef}/>
//                     </Stack>
//                   </Box>

//                   {/* Input */}
//                   <Box sx={{ p:1.5, borderTop:`1px solid ${BORDER}` }}>
//                     <Box sx={{ display:"flex", alignItems:"center", gap:1, background:SURFACE3, borderRadius:12, px:2, py:1, border:`1px solid ${BORDER}` }}>
//                       <input
//                         className="chat-input"
//                         placeholder="Type a message..."
//                         value={chatInput}
//                         onChange={e => setChatInput(e.target.value)}
//                         onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }}}
//                       />
//                       <button
//                         onClick={sendChat}
//                         style={{ background:"none", border:"none", cursor:chatInput.trim()?"pointer":"default", color:chatInput.trim()?P_MID:TEXT3, display:"flex", transition:"color .15s" }}
//                       >
//                         <Send size={16}/>
//                       </button>
//                     </Box>
//                   </Box>
//                 </Box>
//               )}

//               {/* ── NOTES PANEL ────────────────────── */}
//               {panel === "notes" && (
//                 <Box sx={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                   <Box sx={{ p:2, borderBottom:`1px solid ${BORDER}` }}>
//                     <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:TEXT }}>
//                       Session Notes
//                     </Typography>
//                     <Typography sx={{ fontSize:12, color:TEXT2, mt:.25 }}>
//                       Private — only visible to you
//                     </Typography>
//                   </Box>
//                   <Box sx={{ flex:1, p:2, display:"flex", flexDirection:"column", overflow:"hidden" }}>
//                     <textarea
//                       className="notes-area"
//                       value={notes}
//                       onChange={e => setNotes(e.target.value)}
//                       placeholder="Take notes here... (private, only visible to you)"
//                     />
//                   </Box>
//                   <Box sx={{ px:2, pb:2, borderTop:`1px solid ${BORDER}`, pt:1.5 }}>
//                     <Typography sx={{ fontSize:11.5, color:TEXT3, fontFamily:"'DM Mono',monospace" }}>
//                       {notes.length} characters · Auto-saved
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           )}
//         </Box>

//         {/* ══ TOAST STACK ══════════════════════════════ */}
//         <Box sx={{ position:"fixed", bottom:100, left:"50%", transform:"translateX(-50%)", zIndex:1000, display:"flex", flexDirection:"column", alignItems:"center", gap:1, pointerEvents:"none" }}>
//           {toasts.map(t => (
//             <Box
//               key={t.id}
//               className="toast-in"
//               sx={{
//                 display:"flex", alignItems:"center", gap:1,
//                 background:"rgba(22,24,32,0.92)", backdropFilter:"blur(12px)",
//                 border:`1px solid ${BORDER}`,
//                 borderRadius:100, px:2, py:1,
//                 boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
//               }}
//             >
//               <Box sx={{ color:TEXT2 }}>{t.icon}</Box>
//               <Typography sx={{ fontSize:13, color:TEXT, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>{t.msg}</Typography>
//             </Box>
//           ))}
//         </Box>

//         {/* ══ END SESSION DIALOG ═══════════════════════ */}
//         {showEndDialog && (
//           <Box sx={{
//             position:"fixed", inset:0, zIndex:2000,
//             background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)",
//             display:"flex", alignItems:"center", justifyContent:"center",
//           }}>
//             <Box
//               className="fade-in"
//               sx={{
//                 background:SURFACE2, borderRadius:"20px",
//                 border:`1.5px solid ${BORDER}`,
//                 p:4, maxWidth:420, width:"90%",
//                 boxShadow:"0 32px 80px rgba(0,0,0,0.6)",
//               }}
//             >
//               {/* Icon */}
//               <Box sx={{ width:52, height:52, borderRadius:"14px", background:RED_L, display:"flex", alignItems:"center", justifyContent:"center", mb:2.5 }}>
//                 <PhoneOff size={24} color={RED}/>
//               </Box>

//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.3rem", color:TEXT, mb:.75, letterSpacing:"-0.01em" }}>
//                 End this session?
//               </Typography>
//               <Typography sx={{ fontSize:14, color:TEXT2, lineHeight:1.7, mb:3 }}>
//                 You've been in session for <strong style={{ color:TEXT }}>{elapsed}</strong>. Ending now will take you to the feedback page where you can rate and review this session.
//               </Typography>

//               {/* Session summary */}
//               <Box sx={{ background:SURFACE3, borderRadius:"12px", p:2, mb:3 }}>
//                 <Stack spacing={1}>
//                   {[
//                     { label:"Professional", val:SESSION.professional.name },
//                     { label:"Duration",     val:elapsed },
//                     { label:"Agenda",       val:`${agenda.filter(a=>a.done).length}/${agenda.length} sections` },
//                   ].map(({ label, val }) => (
//                     <Stack key={label} direction="row" justifyContent="space-between">
//                       <Typography sx={{ fontSize:13, color:TEXT2 }}>{label}</Typography>
//                       <Typography sx={{ fontSize:13, fontWeight:600, color:TEXT }}>{val}</Typography>
//                     </Stack>
//                   ))}
//                 </Stack>
//               </Box>

//               <Stack direction="row" spacing={1.5}>
//                 <button
//                   onClick={() => setShowEndDialog(false)}
//                   style={{
//                     flex:1, padding:"12px", borderRadius:12,
//                     border:`1.5px solid ${BORDER}`,
//                     background:"transparent", color:TEXT2,
//                     fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500,
//                     cursor:"pointer",
//                   }}
//                 >
//                   Continue session
//                 </button>
//                 <button
//                   onClick={confirmEnd}
//                   style={{
//                     flex:1, padding:"12px", borderRadius:12,
//                     border:"none",
//                     background:RED, color:"#fff",
//                     fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600,
//                     cursor:"pointer",
//                     boxShadow:"0 4px 20px rgba(229,56,59,0.3)",
//                   }}
//                 >
//                   End &amp; give feedback
//                 </button>
//               </Stack>
//             </Box>
//           </Box>
//         )}

//       </Box>
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
const S1  = "#0E0F14";
const S2  = "#161820";
const S3  = "#1E2028";
const S4  = "#262830";
const BD  = "rgba(255,255,255,0.07)";
const P   = "#7F42E7";
const PM  = "#B893F6";
const PL  = "rgba(127,66,231,0.18)";
const RED = "#E5383B";
const RL  = "rgba(229,56,59,0.18)";
const GRN = "#22C55E";
const GL  = "rgba(34,197,94,0.18)";
const AMB = "#F59E0B";
const TXT = "#F0F0F5";
const T2  = "rgba(240,240,245,0.55)";
const T3  = "rgba(240,240,245,0.28)";

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
  @keyframes endPulse   { 0%,100%{box-shadow:0 0 0 0 rgba(229,56,59,.55)} 50%{box-shadow:0 0 0 12px rgba(229,56,59,0)} }
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
  .ctrl.on         { background:${PL}; color:${PM}; border:1px solid rgba(127,66,231,.35); }
  .ctrl.off        { background:${RL}; color:${RED}; border:1px solid rgba(229,56,59,.35); }
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
  .bubble.them { background:${S3}; color:${TXT}; border-bottom-left-radius:4px; }
  .bubble.me   { background:${P};  color:#fff;   border-bottom-right-radius:4px; }

  /* ── Notes area ── */
  .notes-ta {
    width:100%; flex:1; resize:none;
    background:transparent; border:none; outline:none;
    color:${TXT}; font-family:'DM Sans',sans-serif;
    font-size:13.5px; line-height:1.75; caret-color:${PM};
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
  .tpill.active { background:${S3}; color:${TXT}; }
  .tpill:hover:not(.active) { color:${TXT}; }

  /* ── PiP ── */
  .pip {
    position:absolute; border-radius:14px; overflow:hidden;
    border:2px solid rgba(255,255,255,.12);
    box-shadow:0 12px 40px rgba(0,0,0,.55);
    cursor:grab; transition:transform .2s, box-shadow .2s;
    /* desktop */
    width:168px; height:114px;
    bottom:90px; right:18px;
  }
  .pip:hover { transform:scale(1.04); box-shadow:0 16px 48px rgba(0,0,0,.65); }
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
    background:rgba(0,0,0,.45); backdrop-filter:blur(6px);
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
    }
  }

  /* ── Controls bar ── */
  .cbar {
    position:absolute; bottom:0; left:0; right:0;
    height:76px;
    display:flex; align-items:center; justify-content:center;
    gap:10px; padding:0 12px;
    background:linear-gradient(to top, rgba(14,15,20,.95) 0%, transparent 100%);
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
    background:rgba(0,0,0,.75); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center;
    padding:16px;
  }
  .end-card {
    background:${S2}; border-radius:20px;
    border:1.5px solid ${BD};
    padding:32px; width:100%; max-width:400px;
    box-shadow:0 32px 80px rgba(0,0,0,.65);
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
            <Box sx={{ position:"absolute", inset:0, background:`linear-gradient(160deg,#1A1B22 0%,#0E0F14 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {camOn ? (
                <img src={SESSION.pro.avatar} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.92)" }}/>
              ) : (
                <Stack alignItems="center" spacing={1.5}>
                  <Box sx={{ width:{ xs:60, md:80 }, height:{ xs:60, md:80 }, borderRadius:"50%", background:S3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <VideoOff size={28} color={T3}/>
                  </Box>
                  <Typography sx={{ fontSize:13.5, color:T2 }}>Camera is off</Typography>
                </Stack>
              )}
              {/* Bottom gradient */}
              <Box sx={{ position:"absolute", bottom:0, left:0, right:0, height:{ xs:120, md:160 }, background:"linear-gradient(to top,rgba(14,15,20,.92) 0%,transparent 100%)", pointerEvents:"none" }}/>
              {/* Top gradient */}
              <Box sx={{ position:"absolute", top:0, left:0, right:0, height:80, background:"linear-gradient(to bottom,rgba(14,15,20,.5) 0%,transparent 100%)", pointerEvents:"none" }}/>
            </Box>

            {/* Name tag */}
            <Box sx={{
              position:"absolute", bottom:{ xs:82, md:90 }, left:{ xs:12, md:20 },
              display:"flex", alignItems:"center", gap:1.25,
              background:"rgba(0,0,0,.58)", backdropFilter:"blur(8px)",
              borderRadius:"10px", px:1.5, py:.75,
              border:"1px solid rgba(255,255,255,.08)",
            }}>
              <div className="mw" style={{ display:micOn?"flex":"none" }}>
                {[0,1,2,3,4].map(i => <div key={i} className="mb"/>)}
              </div>
              {!micOn && <MicOff size={12} color={RED}/>}
              <Typography sx={{ fontSize:{ xs:12, md:13 }, fontWeight:500, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>
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
                <Typography sx={{ fontSize:10.5, fontWeight:500, color:"rgba(255,255,255,.85)", fontFamily:"'DM Sans',sans-serif", textShadow:"0 1px 4px rgba(0,0,0,.8)" }}>You</Typography>
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
                      style={{ flex:1, padding:"12px", borderRadius:12, border:`1.5px solid ${BD}`, background:"transparent", color:T2, fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, cursor:"pointer" }}
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
                <Box sx={{ width:36, height:4, borderRadius:2, background:BD }}/>
                <Box
                  onClick={() => setPOpen(false)}
                  sx={{ position:"absolute", right:14, width:28, height:28, borderRadius:"50%", background:S3, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
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
              sx={{ display:"flex", alignItems:"center", gap:1, background:"rgba(22,24,32,.94)", backdropFilter:"blur(10px)", border:`1px solid ${BD}`, borderRadius:100, px:2, py:1, boxShadow:"0 8px 32px rgba(0,0,0,.4)", whiteSpace:"nowrap" }}
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