// import React, { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

//   @keyframes fade-in {
//     from { opacity: 0; transform: translateY(16px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes line-grow {
//     from { width: 0; }
//     to   { width: 48px; }
//   }

//   .letter-wrap { animation: fade-in 1.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
//   .p1 { animation-delay: 0.2s; }
//   .p2 { animation-delay: 0.5s; }
//   .p3 { animation-delay: 0.8s; }
//   .p4 { animation-delay: 1.1s; }
//   .p5 { animation-delay: 1.4s; }
//   .p6 { animation-delay: 1.7s; }
//   .p7 { animation-delay: 2s; }
//   .p8 { animation-delay: 2.3s; }
//   .p9 { animation-delay: 2.6s; }
//   .sig { animation-delay: 3.2s; }

//   .divider-line {
//     display: block;
//     height: 1px;
//     background: rgba(180, 160, 130, 0.35);
//     animation: line-grow 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
//     margin: 40px 0;
//   }
// `;

// const HMM4750 = () => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setShow(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   if (!show) return null;

//   return (
//     <>
//       <style>{styles}</style>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "#F9F6F0",
//           display: "flex",
//           alignItems: "flex-start",
//           justifyContent: "center",
//           px: { xs: 3, md: 4 },
//           py: { xs: 8, md: 12 },
//         }}
//       >
//         <Box sx={{ maxWidth: 620, width: "100%" }}>

//           {/* TAG */}
//           <Box className="letter-wrap p1">
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: 11,
//                 fontWeight: 400,
//                 color: "rgba(140, 110, 80, 0.6)",
//                 letterSpacing: "0.25em",
//                 textTransform: "uppercase",
//                 mb: 4,
//               }}
//             >
//               HMM · 4750
//             </Typography>
//           </Box>

//           {/* OPENING LINE */}
//           <Box className="letter-wrap p2">
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: { xs: "2.2rem", md: "3rem" },
//                 fontWeight: 300,
//                 fontStyle: "italic",
//                 color: "#2C2418",
//                 lineHeight: 1.15,
//                 mb: 5,
//                 letterSpacing: "-0.01em",
//               }}
//             >
//               I love you.
//             </Typography>
//           </Box>

//           <span className="divider-line" />

//           {/* BODY PARAGRAPHS */}
//           {[
//             {
//               cls: "p3",
//               text: "More than I allowed myself to show, and definitely more than I expressed in ways that you deserved. There were moments where my actions probably made it seem like I didn't care, or like I had already checked out. But the truth is, I didn't leave because I stopped loving you — I left because I couldn't lead either of us into something better.",
//             },
//             {
//               cls: "p4",
//               text: "I wasn't disciplined. I wasn't consistent. I wasn't the version of myself that could build a future — not just for me, but for us. And staying while being that person would have been more unfair than walking away.",
//             },
//             {
//               cls: "p5",
//               text: "You deserved stability. Direction. Growth. And I knew deep down I couldn't give you that at the time. This isn't an excuse — it's accountability. I see it now more clearly than I did then.",
//             },
//             {
//               cls: "p6",
//               text: "Regret is a quiet teacher. It doesn't shout, but it stays. It shows up in the moments where I realise what I could have done better — how I could have led better, loved better, and shown up more fully.",
//             },
//             {
//               cls: "p7",
//               text: "But this isn't just about loss. It's about reflection. Growth. Responsibility. I've had to sit with the truth that potential means nothing without execution.",
//             },
//             {
//               cls: "p8",
//               text: "And maybe that's the hardest part — knowing that love was there, but leadership wasn't.",
//             },
//             {
//               cls: "p9",
//               text: "I hope you find everything I couldn't give you. And I hope I become the kind of man who never has to walk away from something real again because he wasn't ready.",
//             },
//           ].map(({ cls, text }) => (
//             <Box key={cls} className={`letter-wrap ${cls}`}>
//               <Typography
//                 sx={{
//                   fontFamily: "'EB Garamond', serif",
//                   fontSize: { xs: "1.1rem", md: "1.2rem" },
//                   fontWeight: 400,
//                   color: "#3C3025",
//                   lineHeight: 1.9,
//                   mb: 3,
//                 }}
//               >
//                 {text}
//               </Typography>
//             </Box>
//           ))}

//           <span className="divider-line" />

//           {/* SIGNATURE */}
//           <Box className="letter-wrap sig">
//             <Typography
//               sx={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: { xs: "1.3rem", md: "1.6rem" },
//                 fontWeight: 300,
//                 fontStyle: "italic",
//                 color: "#8C6E50",
//                 lineHeight: 1.6,
//               }}
//             >
//               — I Love you a thousand folds
//             </Typography>
//           </Box>

//         </Box>
//       </Box>
//     </>
//   );
// };

// export default HMM4750;





// import React, { useEffect, useState } from "react";
// import { Box, Typography } from "@mui/material";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cinzel:wght@400;600&display=swap');

//   @keyframes fade-rise {
//     from { opacity: 0; transform: translateY(22px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes line-grow {
//     from { width: 0; opacity: 0; }
//     to   { width: 64px; opacity: 1; }
//   }
//   @keyframes fade-in-slow {
//     from { opacity: 0; }
//     to   { opacity: 1; }
//   }
//   @keyframes pulse-glow {
//     0%, 100% { text-shadow: 0 0 0px rgba(180, 140, 80, 0); }
//     50%       { text-shadow: 0 0 20px rgba(180, 140, 80, 0.3); }
//   }

//   .fade-rise { animation: fade-rise 1.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
//   .fade-slow { animation: fade-in-slow 2.2s ease both; }

//   .p0  { animation-delay: 0.1s; }
//   .p1  { animation-delay: 0.4s; }
//   .p2  { animation-delay: 0.8s; }
//   .p3  { animation-delay: 1.4s; }
//   .p4  { animation-delay: 2.0s; }
//   .p5  { animation-delay: 2.6s; }
//   .p6  { animation-delay: 3.2s; }
//   .p7  { animation-delay: 3.8s; }
//   .p8  { animation-delay: 4.4s; }
//   .p9  { animation-delay: 5.0s; }
//   .p10 { animation-delay: 5.6s; }
//   .p11 { animation-delay: 6.2s; }
//   .p12 { animation-delay: 6.8s; }
//   .p13 { animation-delay: 7.4s; }
//   .p14 { animation-delay: 8.0s; }
//   .p15 { animation-delay: 8.6s; }
//   .p16 { animation-delay: 9.2s; }
//   .sig { animation-delay: 9.8s; }

//   .divider-line {
//     display: block;
//     height: 1px;
//     background: linear-gradient(to right, transparent, rgba(180, 150, 100, 0.4), transparent);
//     animation: line-grow 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;
//     margin: 44px auto;
//     max-width: 220px;
//   }

//   .ornament {
//     display: block;
//     text-align: center;
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 18px;
//     color: rgba(160, 120, 70, 0.4);
//     letter-spacing: 0.3em;
//     animation: fade-in-slow 1.4s ease both;
//     margin: 40px 0;
//   }

//   .pull-quote {
//     border-left: 2px solid rgba(180, 150, 100, 0.35);
//     padding-left: 20px;
//     margin: 4px 0;
//   }

//   .glow {
//     animation: pulse-glow 4s ease-in-out infinite;
//   }
// `;

// const paragraphs = [
//   {
//     cls: "p3",
//     type: "body",
//     text: "Before you, I did not know that a person could feel like a season. Like the particular slant of late afternoon light in winter — not warm exactly, but so golden it aches. That is what you were. Something I did not have a word for. Something the world had not yet named.",
//   },
//   {
//     cls: "p4",
//     type: "body",
//     text: "I remember the first time I truly saw you — not looked at you, but saw you. The way your mind moved. The way you laughed at something before you explained it, like joy arrived a second before language could catch up. I thought: this person was made in a different register. A frequency the rest of the world was not tuned to. I was terrified I would never find that station again.",
//   },
//   {
//     cls: "p5",
//     type: "pull",
//     text: "There is a kind of love that does not announce itself. It arrives like weather — you step outside one morning and realize the whole world has shifted, and you cannot say exactly when it happened.",
//   },
//   {
//     cls: "p6",
//     type: "body",
//     text: "That was us. We were not loud. We were not perfect. We were a Tuesday morning with nowhere to be — soft-spoken and unhurried, full of the particular tenderness that lives in ordinary moments: your handwriting in the margin of a book, the way you slept facing the window as though even in dreams you were reaching for light.",
//   },
//   {
//     cls: "p7",
//     type: "body",
//     text: "I loved you in the language of small things. The way I always saved the better half. The way I memorized your order before you knew mine. The way I watched you cross a room and thought, quietly, without ceremony: there she is. There she always is.",
//   },
//   {
//     cls: "p8",
//     type: "pull",
//     text: "You were not the love I had imagined. You were the love that made me realize every love I had imagined before was just a sketch — and you were the actual thing.",
//   },
//   {
//     cls: "p9",
//     type: "body",
//     text: "The poets have written about love as fire. But what I felt for you was more like water — patient, persistent, finding its way through every crack in my composure, pooling quietly in the lowest places until I was full of you without knowing when the filling had begun.",
//   },
//   {
//     cls: "p10",
//     type: "body",
//     text: "And I was not always worthy of it. I was young in ways that had nothing to do with age. I was still learning that love is not a feeling you receive — it is a practice you choose, again and again, especially on the days it does not feel easy. I learned that lesson just a little too slowly. And the cost of the lesson was losing you.",
//   },
//   {
//     cls: "p11",
//     type: "pull",
//     text: "I have met people who say they have no regrets. I think they are either lying or they have never loved something they were not ready for.",
//   },
//   {
//     cls: "p12",
//     type: "body",
//     text: "I regret the silences I let grow too long. The times I was physically present and emotionally absent — sitting beside you while you spoke to the part of me that was already somewhere else. You deserved the whole of me. I gave you fractions.",
//   },
//   {
//     cls: "p13",
//     type: "body",
//     text: "But here is what I want you to know — what I need you to know: what I felt for you was not ordinary. It was not the kind of feeling that fades into background noise. It was singular. It was the kind that leaves a watermark on everything that comes after. Every room I walk into still has a corner where you exist. Every good thing I do has some thread of you woven through it.",
//   },
//   {
//     cls: "p14",
//     type: "pull",
//     text: "I do not think the heart forgets the things it has loved completely. I think it just learns to carry them differently — not as open wounds, but as quiet proof that it has been capable of something extraordinary.",
//   },
//   {
//     cls: "p15",
//     type: "body",
//     text: "If love were a country, what we had would be a city that no longer exists on any map but is still spoken of in the language of people who were there. A place that cannot be revisited but cannot be forgotten either. A name that surfaces in the middle of other conversations and causes a small, involuntary pause.",
//   },
//   {
//     cls: "p16",
//     type: "body",
//     text: "I hope you have found the life that fits you. I hope you are loved by someone who is ready — someone who knows that you are not a chapter but the whole story. Someone who sees what I saw and does not flinch, does not run, does not arrive late to the one thing that mattered most. I am becoming that man. I just needed you first, to know he was possible.",
//   },
// ];

// const HMM4750 = () => {
//   const [show, setShow] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setShow(true), 100);
//     return () => clearTimeout(t);
//   }, []);
//   if (!show) return null;

//   return (
//     <>
//       <style>{styles}</style>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(160deg, #FAF7F2 0%, #F5F0E8 60%, #F0EBE0 100%)",
//           display: "flex",
//           alignItems: "flex-start",
//           justifyContent: "center",
//           px: { xs: 3, sm: 4, md: 6 },
//           py: { xs: 8, md: 14 },
//         }}
//       >
//         <Box sx={{ maxWidth: 660, width: "100%" }}>

//           {/* TAG */}
//           <Box className="fade-rise p0">
//             <Typography sx={{
//               fontFamily: "'Cinzel', serif",
//               fontSize: 10,
//               fontWeight: 600,
//               color: "rgba(140, 110, 70, 0.5)",
//               letterSpacing: "0.35em",
//               textTransform: "uppercase",
//               mb: 5,
//             }}>
//               HMM · 4750
//             </Typography>
//           </Box>

//           {/* OPENING — the title */}
//           <Box className="fade-rise p1">
//             <Typography className="glow" sx={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: { xs: "2.6rem", sm: "3.2rem", md: "3.8rem" },
//               fontWeight: 300,
//               fontStyle: "italic",
//               color: "#1E1510",
//               lineHeight: 1.1,
//               mb: 1.5,
//               letterSpacing: "-0.015em",
//             }}>
//               A Love That Had No Equal
//             </Typography>
//           </Box>

//           {/* SUBTITLE */}
//           <Box className="fade-rise p2" sx={{ mb: 6 }}>
//             <Typography sx={{
//               fontFamily: "'EB Garamond', serif",
//               fontSize: { xs: "1rem", md: "1.1rem" },
//               fontStyle: "italic",
//               color: "rgba(100, 75, 45, 0.65)",
//               letterSpacing: "0.02em",
//               lineHeight: 1.6,
//             }}>
//               A true account of something the world only grants once.
//             </Typography>
//           </Box>

//           <span className="divider-line p2 fade-rise" />

//           {/* BODY */}
//           {paragraphs.map(({ cls, type, text }) => (
//             <Box key={cls} className={`fade-rise ${cls}`}>
//               {type === "pull" ? (
//                 <Box className="pull-quote" sx={{ my: 3.5 }}>
//                   <Typography sx={{
//                     fontFamily: "'Cormorant Garamond', serif",
//                     fontSize: { xs: "1.25rem", md: "1.45rem" },
//                     fontWeight: 400,
//                     fontStyle: "italic",
//                     color: "#4A3520",
//                     lineHeight: 1.65,
//                   }}>
//                     {text}
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Typography sx={{
//                   fontFamily: "'EB Garamond', serif",
//                   fontSize: { xs: "1.05rem", md: "1.15rem" },
//                   fontWeight: 400,
//                   color: "#2C2010",
//                   lineHeight: 1.95,
//                   mb: 3,
//                   letterSpacing: "0.005em",
//                 }}>
//                   {text}
//                 </Typography>
//               )}
//             </Box>
//           ))}

//           <span className="divider-line sig fade-rise" />

//           {/* CLOSING */}
//           <Box className="fade-rise sig">
//             <Typography sx={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: { xs: "1.05rem", md: "1.2rem" },
//               fontWeight: 400,
//               fontStyle: "italic",
//               color: "rgba(120, 90, 50, 0.7)",
//               lineHeight: 1.8,
//               mb: 1,
//             }}>
//               Not as an ending. As evidence.
//             </Typography>
//             <Typography sx={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: { xs: "1.4rem", md: "1.7rem" },
//               fontWeight: 300,
//               fontStyle: "italic",
//               color: "#8C6E42",
//               lineHeight: 1.5,
//             }}>
//               — I loved you in a way the world will not see again.
//             </Typography>
//           </Box>

//           <Box className="fade-rise sig" sx={{ mt: 5, mb: 2 }}>
//             <Typography sx={{
//               fontFamily: "'Cinzel', serif",
//               fontSize: 10,
//               color: "rgba(140, 110, 70, 0.3)",
//               letterSpacing: "0.3em",
//               textTransform: "uppercase",
//             }}>
//               HMM · 4750
//             </Typography>
//           </Box>

//         </Box>
//       </Box>
//     </>
//   );
// };

// export default HMM4750;




































import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500;700&family=DM+Mono:wght@300;400&display=swap');

  @keyframes temporal-drift {
    from { opacity: 0; transform: translateY(30px) scale(0.99); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }

  @keyframes timeline-axis {
    from { height: 0%; opacity: 0; }
    to   { height: 100%; opacity: 0.15; }
  }

  @keyframes quantum-pulse {
    0%, 100% { opacity: 0.3; text-shadow: 0 0 0px rgba(188, 153, 106, 0); }
    50%       { opacity: 0.8; text-shadow: 0 0 12px rgba(188, 153, 106, 0.4); }
  }

  .nolan-container {
    position: relative;
    background: #0B0B0E;
    color: #E2E2E6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    padding: 80px 24px;
  }

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, #BC996A, transparent);
    animation: timeline-axis 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .dimension-block {
    position: relative;
    max-width: 680px;
    width: 100%;
    margin-bottom: 120px;
    opacity: 0;
    animation: temporal-drift 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .d-1 { animation-delay: 0.4s; }
  .d-2 { animation-delay: 1.2s; }
  .d-3 { animation-delay: 2.0s; }
  .d-4 { animation-delay: 2.8s; }

  .vector-stamp {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 4px;
    color: #BC996A;
    text-transform: uppercase;
    margin-bottom: 16px;
    opacity: 0.6;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vector-stamp::before {
    content: '';
    width: 16px;
    height: 1px;
    background: #BC996A;
    display: inline-block;
  }

  .quantum-quote {
    position: relative;
    border-left: 1px solid rgba(188, 153, 106, 0.3);
    padding-left: 24px;
    margin: 24px 0;
  }
`;

export default function NolanTimelineLetter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0B0B0E" }}>
      <style>{styles}</style>
      
      <div className="nolan-container">
        {/* Central Visual Coordinate Vector Line */}
        <div className="timeline-line" />

        {/* ── DIMENSION 01: THE SINGULARITY ───────────────────────────────── */}
        <Box className="dimension-block d-1">
          <div className="vector-stamp">T = 00:00:00 // Relative Perspective</div>
          
          <Typography sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 400,
            color: "#BC996A",
            letterSpacing: "4px",
            mb: 3,
            lineHeight: 1.3
          }}>
            I. THE INITIAL MEASUREMENT
          </Typography>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            fontWeight: 300,
            color: "rgba(226, 226, 230, 0.85)",
            lineHeight: 1.8,
            textAlign: "justify",
            mb: 2
          }}>
            If time is non-linear, then I am still there with you in that doorway. I loved you more than I allowed myself to show, and infinitely more than I expressed in ways that you deserved. 
          </Typography>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            fontWeight: 300,
            color: "rgba(226, 226, 230, 0.85)",
            lineHeight: 1.8,
            textAlign: "justify"
          }}>
            There were moments where my actions probably made it seem like I didn't care, or like I had already checked out from our architecture. But the math of it was different. The truth is, I didn't leave because I stopped loving you — I left because I couldn't lead either of us into something better.
          </Typography>
        </Box>

        {/* ── DIMENSION 02: THE GRAVITATIONAL COLLAPSE ────────────────────── */}
        <Box className="dimension-block d-2">
          <div className="vector-stamp">T = -04:12:50 // Structural Failure</div>
          
          <Typography sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 400,
            color: "#BC996A",
            letterSpacing: "4px",
            mb: 3,
            lineHeight: 1.3
          }}>
            II. THE ACCOUNTABILITY FALLACY
          </Typography>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            fontWeight: 300,
            color: "rgba(226, 226, 230, 0.85)",
            lineHeight: 1.8,
            textAlign: "justify",
            mb: 3
          }}>
            I wasn't disciplined. I wasn't consistent. I wasn't the version of myself that possessed the mass to build a future — not just for me, but for us. And staying inside your orbit while being that unanchored person would have been more unfair than walking out into the void.
          </Typography>

          <div className="quantum-quote">
            <Typography sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { xs: "1.2rem", md: "1.4rem" },
              fontWeight: 400,
              fontStyle: "italic",
              color: "#BC996A",
              lineHeight: 1.6,
            }}>
              "You deserved stability. Direction. Growth. And I knew deep down within the system parameters that I couldn't engineer that for you at the time. This isn't an excuse — it's structural accountability."
            </Typography>
          </div>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            fontWeight: 300,
            color: "rgba(226, 226, 230, 0.85)",
            lineHeight: 1.8,
            textAlign: "justify"
          }}>
            I see it now more clearly than I did when the event horizon closed. Potential means absolutely nothing without physical execution.
          </Typography>
        </Box>

        {/* ── DIMENSION 03: THE ECHO CHAMBER ──────────────────────────────── */}
        <Box className="dimension-block d-3">
          <div className="vector-stamp">T = +11:47:02 // Persistent Variable</div>
          
          <Typography sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 400,
            color: "#BC996A",
            letterSpacing: "4px",
            mb: 3,
            lineHeight: 1.3
          }}>
            III. THE QUIET TEACHER
          </Typography>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            fontWeight: 300,
            color: "rgba(226, 226, 230, 0.85)",
            lineHeight: 1.8,
            textAlign: "justify",
            mb: 2
          }}>
            Regret behaves exactly like gravity. It doesn't shout. It doesn't make a sound, but it stays. It alters the trajectory of every moment where I realize how I could have led better, how I could have loved you better, and shown up more fully instead of retreating.
          </Typography>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.15rem", md: "1.3rem" },
            fontWeight: 300,
            color: "rgba(226, 226, 230, 0.85)",
            lineHeight: 1.8,
            textAlign: "justify"
          }}>
            But this isn't just a record of loss. This is an validation of reflection. Growth. Responsibility. And maybe that remains the hardest mathematical constant to accept — knowing that love was entirely present, but the leadership required to anchor it wasn't.
          </Typography>
        </Box>

        {/* ── DIMENSION 04: THE ABSOLUTE CONSTANT ─────────────────────────── */}
        <Box className="dimension-block d-4" sx={{ mb: 0 }}>
          <div className="vector-stamp">T = ∞ // Immutable State</div>
          
          <Typography sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 400,
            color: "#BC996A",
            letterSpacing: "4px",
            mb: 4,
            lineHeight: 1.3
          }}>
            IV. THE QUANTUM ANOMALY
          </Typography>

          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: { xs: "1.25rem", md: "1.45rem" },
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(226, 226, 230, 0.9)",
            lineHeight: 1.9,
            textAlign: "center",
            mb: 6
          }}>
            We trace our parameters over separate dimensions now. Not as an admission of an ending. But as empirical evidence.
          </Typography>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography sx={{
              fontFamily: "'Cinzel', serif",
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              fontWeight: 400,
              color: "#BC996A",
              letterSpacing: "3px",
              lineHeight: 1.5,
              animation: "quantum-pulse 4s infinite ease-in-out"
            }}>
              — I loved you in a way the world will not see again.
            </Typography>
            
            <Typography sx={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "rgba(188, 153, 106, 0.4)",
              letterSpacing: "6px",
              mt: 4,
              textTransform: "uppercase"
            }}>
              [ End Transmission // Frame: 4750 ]
            </Typography>
          </Box>
        </Box>

      </div>
    </Box>
  );
}