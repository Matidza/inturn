// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import StopIcon from "@mui/icons-material/Stop";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

// const PRIMARY = "#7B61FF";

// const WAVE_COUNT = 50;

// const AIPractice = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [seconds, setSeconds] = useState(0);

//   // waveform stored in state (stable UI)
//   const [wave, setWave] = useState<number[]>(() =>
//     Array.from({ length: WAVE_COUNT }, () => 10)
//   );

//   const waveRef = useRef<NodeJS.Timeout | null>(null);

//   // ⏱ TIMER
//   useEffect(() => {
//     let interval: any;

//     if (isListening) {
//       interval = setInterval(() => {
//         setSeconds((prev) => prev + 1);
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [isListening]);

//   // 🎧 SMOOTH WAVE ANIMATION (IMPORTANT FIX)
//   useEffect(() => {
//     if (!isListening) {
//       // reset to calm state
//       setWave(Array.from({ length: WAVE_COUNT }, () => 8));
//       return;
//     }

//     waveRef.current = setInterval(() => {
//       setWave((prev) =>
//         prev.map((h) => {
//           const random = Math.random() * 35 + 5;
//           return h * 0.7 + random * 0.3; // smoothing effect
//         })
//       );
//     }, 120);

//     return () => {
//       if (waveRef.current) clearInterval(waveRef.current);
//     };
//   }, [isListening]);

//   const formatTime = (sec: number) => {
//     const m = String(Math.floor(sec / 60)).padStart(2, "0");
//     const s = String(sec % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   return (
//     <Box
//       sx={{ px: { xs: 2, md: 3 }, py: 4, backgroundColor: "#ffffff", color: "#05050B", minHeight: "100vh", }}
//       // sx={{
//       //  
//       //   px: { xs: 2, md: 6 },
//       //   py: 4,
//       //   // background: "linear-gradient(135deg, #0f1020 0%, #1a1b3a 50%, #2b1f4a 100%)",
//       //   background: "#FFFFFF",
//       //  
//       // }}
//     >
//       {/* HEADER */}
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
//         <Stack direction="row" spacing={1} alignItems="center">
//           <Avatar sx={{ bgcolor: PRIMARY }}>AI</Avatar>
//           <Typography fontWeight={600}>AI Interviewer</Typography>
//         </Stack>

//         <Button
//           sx={{
//             backgroundColor: "#ef4444",
//             color: "#fff",
//             textTransform: "none",
//             borderRadius: 2,
//             // mr: 5
//           }}
//         >
//           End Interview
//         </Button>
//       </Stack>

//       {/* QUESTION */}
//       <Stack mt={8} direction="row" spacing={5}>
//         <Avatar
//           sx={{
//             width: 130,
//             height: 130,
//             border: 4,
//             borderColor: PRIMARY,
//             backgroundColor: "#fff",
//           }}
//         >
//           <PersonOutlineOutlinedIcon sx={{ fontSize: 60, color: PRIMARY }} />
//         </Avatar>

//         <Typography fontSize={{ xs: 22, md: 50 }} fontWeight={600} maxWidth={700}>
//           Tell me about yourself and your background.
//         </Typography>
//       </Stack>

//       {/* LISTENING */}
//       <Stack direction="column" spacing={3} mt={5}>
//         <Typography color="#bbb" textAlign="center">
//           {isListening ? "Listening..." : "Click mic to start"}
//         </Typography>

//         {/* 🎤 WAVEFORM (NOW SMOOTH + STABLE) */}
//         <Stack
//           direction="row"
//           spacing={0.5}
//           justifyContent="center"
//           alignItems="flex-end"
//           sx={{ height: 60 }}
//         >
//           {wave.map((h, i) => (
//             <Box
//               key={i}
//               sx={{
//                 width: 3,
//                 height: `${h}px`,
//                 background: PRIMARY,
//                 borderRadius: 2,
//                 transition: "height 120ms ease-in-out",
//               }}
//             />
//           ))}
//         </Stack>
//       </Stack>

//       {/* CONTROLS (NO RE-RENDER JITTER) */}
//       <Stack
//         mt={10}
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         width="100%"
//       >
//         <Stack direction="row" spacing={1} alignItems="center">
//           <FiberManualRecordIcon
//             sx={{ fontSize: 12, color: isListening ? "#22c55e" : "#666" }}
//           />
//           <Typography>{formatTime(seconds)}</Typography>
//         </Stack>

//         <IconButton
//           onClick={() => setIsListening((prev) => !prev)}
//           sx={{
//             width: 70,
//             height: 70,
//             backgroundColor: PRIMARY,
//             color: "#fff",
//             "&:hover": { backgroundColor: "#6a4ee6" },
//           }}
//         >
//           {isListening ? <StopIcon /> : <MicIcon />}
//         </IconButton>

//         <Button
//           sx={{
//             backgroundColor: "#2b2d42",
//             color: "#fff",
//             textTransform: "none",
//             borderRadius: 2,
//             // mr: 5
//           }}
//         >
//           Finish Answer
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default AIPractice;











import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  Tooltip,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIMARY     = "#7B61FF";
const DANGER      = "#ef4444";
const SUCCESS     = "#22c55e";
const WAVE_COUNT  = 50;
const MAX_SECONDS = 3 * 60; // 3-minute answer cap per question

// ─── Mock question bank (replace with API) ───────────────────────────────────

const QUESTIONS = [
  "Tell me about yourself and your background.",
  "Describe a challenging project you worked on and how you handled it.",
  "Where do you see yourself in 5 years?",
  "What is your greatest technical strength?",
  "How do you handle working under pressure or tight deadlines?",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(sec: number): string {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function buildIdleWave(): number[] {
  return Array.from({ length: WAVE_COUNT }, () => 8);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated waveform bar display */
const Waveform: React.FC<{ wave: number[]; isListening: boolean }> = ({ wave, isListening }) => (
  <Stack
    direction="row"
    spacing={0.5}
    justifyContent="center"
    alignItems="flex-end"
    sx={{ height: 70, px: 2 }}
    aria-label={isListening ? "Microphone active — recording" : "Microphone inactive"}
    role="img"
  >
    {wave.map((h, i) => (
      <Box
        key={i}
        sx={{
          width: 3,
          height: `${h}px`,
          background: isListening
            ? `linear-gradient(to top, ${PRIMARY}, #b39dff)`
            : "#d1d5db",
          borderRadius: 2,
          transition: "height 120ms ease-in-out, background 300ms",
        }}
      />
    ))}
  </Stack>
);

/** Progress indicator across all questions */
const QuestionProgress: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <Stack spacing={0.75}>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        Question {current + 1} of {total}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {Math.round(((current) / total) * 100)}% complete
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={(current / total) * 100}
      sx={{
        height: 6,
        borderRadius: 3,
        backgroundColor: "#e5e7eb",
        "& .MuiLinearProgress-bar": { backgroundColor: PRIMARY, borderRadius: 3 },
      }}
    />
  </Stack>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AIPractice: React.FC = () => {
  const navigate = useNavigate();

  // ── Session state ──────────────────────────────────────────────────────────
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isListening, setIsListening]     = useState(false);
  const [seconds, setSeconds]             = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  // ── Waveform ───────────────────────────────────────────────────────────────
  const [wave, setWave] = useState<number[]>(buildIdleWave);
  const waveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isListening) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isListening]);

  // Auto-stop when max answer time reached
  useEffect(() => {
    if (seconds >= MAX_SECONDS && isListening) {
      setIsListening(false);
    }
  }, [seconds, isListening]);

  // ── Waveform animation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isListening) {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
      setWave(buildIdleWave());
      return;
    }

    waveIntervalRef.current = setInterval(() => {
      setWave((prev) =>
        prev.map((h) => {
          const random = Math.random() * 35 + 5;
          return h * 0.7 + random * 0.3;
        })
      );
    }, 120);

    return () => {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
    };
  }, [isListening]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const currentQuestion = QUESTIONS[questionIndex];
  const isLastQuestion  = questionIndex === QUESTIONS.length - 1;
  const timeWarning     = seconds >= MAX_SECONDS * 0.8 && isListening; // warn at 80%

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleToggleMic = useCallback(() => {
    setIsListening((prev) => !prev);
  }, []);

  const handleFinishAnswer = useCallback(() => {
    setIsListening(false);
    setAnsweredCount((c) => c + 1);

    if (isLastQuestion) {
      setSessionComplete(true);
      return;
    }

    // Advance to next question
    setSeconds(0);
    setQuestionIndex((i) => i + 1);
    setWave(buildIdleWave());
  }, [isLastQuestion]);

  const handleEndSession = useCallback(() => {
    setIsListening(false);
    setEndDialogOpen(false);
    navigate("/mentee/dashboard");
  }, [navigate]);

  // ── Session Complete Screen ────────────────────────────────────────────────
  if (sessionComplete) {
    return (
      <Fade in>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#f8f9fb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
          }}
        >
          
          <Stack spacing={3} alignItems="center" maxWidth={480} textAlign="center">
            <Avatar sx={{ width: 80, height: 80, backgroundColor: `${SUCCESS}18` }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 48, color: SUCCESS }} />
            </Avatar>
            <Typography variant="h5" fontWeight={800}>
              Interview Complete! 🎉
            </Typography>
            <Typography color="text.secondary">
              You answered {answeredCount} of {QUESTIONS.length} questions. Your AI feedback report is being generated.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => navigate("/mentee/dashboard")}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600, borderColor: PRIMARY, color: PRIMARY }}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/mentee/feedback")}
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600, backgroundColor: PRIMARY, "&:hover": { backgroundColor: "#6a4ee6" } }}
              >
                View Feedback
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    );
  }

  // ── Main Interview UI ──────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 3,
        backgroundColor: "#FFFFFF",
        color: "#05050B",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* backgroundColor: "#f8f9fb" */}
      {/* ── Top bar ──────────────────────────────── */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: PRIMARY, width: 40, height: 40 }}>
            <SmartToyOutlinedIcon sx={{ fontSize: 22 }} />
          </Avatar>
          <Box>
            <Typography fontWeight={700} lineHeight={1.2}>AI Interviewer</Typography>
            <Typography variant="caption" color="text.secondary">
              Mock Interview Session
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          {isListening && (
            <Chip
              icon={<FiberManualRecordIcon sx={{ fontSize: 10, color: DANGER }} />}
              label="Recording"
              size="small"
              sx={{ backgroundColor: "#fef2f2", color: DANGER, fontWeight: 600, animation: "pulse 1.5s infinite" }}
            />
          )}
          <Tooltip title="End this session">
            <Button
              onClick={() => setEndDialogOpen(true)}
              size="small"
              sx={{
                backgroundColor: "#fef2f2",
                color: DANGER,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#fee2e2" },
              }}
            >
              End Interview
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      {/* ── Progress bar ─────────────────────────── */}
      <Box mb={4}>
        <QuestionProgress current={questionIndex} total={QUESTIONS.length} />
      </Box>

      {/* ── Question area ─────────────────────────── */}
      <Fade in key={questionIndex}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems={{ md: "center" }} mb={4}>
          <Avatar
            sx={{
              width: { xs: 80, md: 120 },
              height: { xs: 80, md: 120 },
              border: `3px solid ${PRIMARY}`,
              backgroundColor: `${PRIMARY}14`,
              flexShrink: 0,
            }}
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: { xs: 40, md: 56 }, color: PRIMARY }} />
          </Avatar>

          <Box>
            <Typography
              variant="caption"
              fontWeight={600}
              color={PRIMARY}
              textTransform="uppercase"
              letterSpacing={1}
              display="block"
              mb={1}
            >
              Question {questionIndex + 1}
            </Typography>
            <Typography fontSize={{ xs: 20, md: 36 }} fontWeight={700} lineHeight={1.3}>
              {currentQuestion}
            </Typography>
          </Box>
        </Stack>
      </Fade>

      {/* ── Waveform + status ─────────────────────── */}
      <Stack spacing={1.5} alignItems="center" mt="auto" mb={2}>
        <Typography
          variant="body2"
          color={isListening ? PRIMARY : "text.secondary"}
          fontWeight={isListening ? 600 : 400}
          sx={{ transition: "color 0.3s" }}
        >
          {isListening ? "Listening — speak your answer clearly…" : "Press the mic button when you're ready to answer"}
        </Typography>

        <Waveform wave={wave} isListening={isListening} />

        {timeWarning && (
          <Typography variant="caption" color={DANGER} fontWeight={600}>
            ⚠️ {formatTime(MAX_SECONDS - seconds)} remaining
          </Typography>
        )}
      </Stack>

      {/* ── Controls bar ─────────────────────────── */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        pb={2}
      >
        {/* Timer */}
        <Stack direction="row" spacing={1} alignItems="center" minWidth={70}>
          <FiberManualRecordIcon
            sx={{
              fontSize: 10,
              color: isListening ? SUCCESS : "#9ca3af",
              animation: isListening ? "pulse 1.5s infinite" : "none",
            }}
          />
          <Typography variant="body2" fontWeight={600} color={timeWarning ? DANGER : "text.primary"}>
            {formatTime(seconds)}
          </Typography>
        </Stack>

        {/* Mic button */}
        <Tooltip title={isListening ? "Stop recording" : "Start recording"}>
          <IconButton
            onClick={handleToggleMic}
            aria-label={isListening ? "Stop recording" : "Start recording"}
            sx={{
              width: 72,
              height: 72,
              backgroundColor: isListening ? DANGER : PRIMARY,
              color: "#fff",
              boxShadow: isListening
                ? `0 0 0 8px ${DANGER}22`
                : `0 4px 20px ${PRIMARY}44`,
              transition: "background-color 0.2s, box-shadow 0.2s",
              "&:hover": {
                backgroundColor: isListening ? "#dc2626" : "#6a4ee6",
              },
            }}
          >
            {isListening ? <StopIcon sx={{ fontSize: 28 }} /> : <MicIcon sx={{ fontSize: 28 }} />}
          </IconButton>
        </Tooltip>

        {/* Finish / Next */}
        <Tooltip title={isLastQuestion ? "Submit final answer" : "Move to next question"}>
          <Button
            onClick={handleFinishAnswer}
            endIcon={isLastQuestion ? <CheckCircleOutlineIcon /> : <NavigateNextIcon />}
            sx={{
              backgroundColor: isLastQuestion ? SUCCESS : "#1e293b",
              color: "#fff",
              textTransform: "none",
              borderRadius: 2.5,
              fontWeight: 600,
              px: 2.5,
              py: 1,
              "&:hover": {
                backgroundColor: isLastQuestion ? "#16a34a" : "#0f172a",
              },
            }}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </Tooltip>
      </Stack>

      {/* ── Pulse keyframes ───────────────────────── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      {/* ── End session confirm dialog ────────────── */}
      <Dialog
        open={endDialogOpen}
        onClose={() => setEndDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle fontWeight={700}>End interview session?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You've answered {answeredCount} of {QUESTIONS.length} questions. Your progress will not be saved if you leave now.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setEndDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Continue Interview
          </Button>
          <Button
            onClick={handleEndSession}
            variant="contained"
            color="error"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            End Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIPractice;