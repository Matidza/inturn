import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

const PRIMARY = "#7B61FF";
const SUCCESS = "#22c55e";
const WARNING = "#f59e0b";
const DANGER = "#ef4444";

// Shape of a stored CV + its report
interface CVReport {
  id: number;
  name: string;
  size: string;
  uploadedAt: string;
  score: number;
  scoreLabel: string;
  feedback: string[];
  improvements: string[];
  removals: string[];
  sections: { title: string; score: string }[];
  recommendation: string;
}

// Mock CVs already uploaded (simulates returning user)
// Set this to [] to simulate a NEW user with no CVs
const MOCK_CVS: CVReport[] = [
  {
    id: 1,
    name: "John_Doe_CV_2024.pdf",
    size: "214 KB",
    uploadedAt: "2 Apr 2026",
    score: 92,
    scoreLabel: "Strong CV!",
    feedback: [
      "Good structure",
      "Relevant skills found",
      "Clear experience",
      "Add more achievements",
    ],
    improvements: [
      "Add measurable achievements (numbers, results)",
      "Improve summary section clarity",
      "Include more technical skills",
    ],
    removals: [
      "Outdated or irrelevant experience",
      "Unnecessary personal details (age, address)",
      "Generic statements like 'hardworking'",
    ],
    sections: [
      { title: "Summary", score: "Good" },
      { title: "Experience", score: "Strong" },
      { title: "Skills", score: "Needs Improvement" },
      { title: "Education", score: "Good" },
    ],
    recommendation:
      "Your CV is strong, but adding measurable achievements and refining your skills section will significantly improve your chances of passing ATS systems and impressing recruiters.",
  },
  {
    id: 2,
    name: "John_Doe_CV_Updated.pdf",
    size: "198 KB",
    uploadedAt: "28 Apr 2026",
    score: 76,
    scoreLabel: "Good CV",
    feedback: [
      "Solid experience section",
      "Keywords present",
      "Needs stronger summary",
      "Skills section too short",
    ],
    improvements: [
      "Expand your skills section",
      "Add a stronger professional summary",
      "Quantify your impact in each role",
    ],
    removals: [
      "Remove references section (share on request)",
      "Remove photo — not needed for SA tech roles",
    ],
    sections: [
      { title: "Summary", score: "Needs Improvement" },
      { title: "Experience", score: "Good" },
      { title: "Skills", score: "Needs Improvement" },
      { title: "Education", score: "Strong" },
    ],
    recommendation:
      "You have a decent foundation. Focus on your summary and skills section to push past ATS filters and grab recruiter attention.",
  },
];

// ── Empty state for new users ──
const EmptyState = ({ onUploadClick }: { onUploadClick: () => void }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      textAlign: "center",
      gap: 2,
    }}
  >
    <Box
      sx={{
        width: 90,
        height: 90,
        borderRadius: "50%",
        backgroundColor: "#f5f0fd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 1,
      }}
    >
      <ArticleOutlinedIcon sx={{ fontSize: 44, color: PRIMARY }} />
    </Box>

    <Typography variant="h6" fontWeight={700}>
      No CVs uploaded yet
    </Typography>

    <Typography color="text.secondary" fontSize={14} maxWidth={360}>
      Upload your CV and our AI will analyze it — checking for ATS compatibility,
      structure, keywords, and giving you a detailed improvement report.
    </Typography>

    <Button
      variant="contained"
      startIcon={<UploadFileIcon />}
      onClick={onUploadClick}
      sx={{
        mt: 1,
        backgroundColor: PRIMARY,
        borderRadius: 3,
        textTransform: "none",
        fontWeight: 600,
        px: 4,
        "&:hover": { backgroundColor: "#6a4ee6" },
      }}
    >
      Upload your first CV
    </Button>
  </Box>
);

// ── Report panel ──
const ReportPanel = ({ cv }: { cv: CVReport }) => {
  const scoreColor =
    cv.score >= 85 ? SUCCESS : cv.score >= 65 ? WARNING : DANGER;

  return (
    <Stack spacing={3}>
      {/* Score + quick feedback */}
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography fontWeight={600} mb={3}>
            Analysis Report
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} gap={3} alignItems="center">
            {/* Score circle */}
            <Box textAlign="center" flexShrink={0}>
              <Box
                sx={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  border: `8px solid ${scoreColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <Typography fontSize={26} fontWeight="bold">
                  {cv.score}%
                </Typography>
              </Box>
              <Typography fontWeight="bold" color={scoreColor} fontSize={14}>
                {cv.scoreLabel}
              </Typography>
            </Box>

            {/* Feedback points */}
            <Stack spacing={1.5} flex={1}>
              {cv.feedback.map((item, i) => (
                <Stack direction="row" spacing={1} key={i} alignItems="center">
                  <CheckCircleIcon sx={{ fontSize: 18, color: SUCCESS }} />
                  <Typography fontSize={14}>{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Improvements */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          What to Improve
        </Typography>
        <Stack spacing={1}>
          {cv.improvements.map((item, i) => (
            <Stack direction="row" spacing={1} key={i} alignItems="flex-start">
              <WarningAmberIcon sx={{ color: WARNING, fontSize: 18, mt: 0.2 }} />
              <Typography fontSize={14}>{item}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Removals */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          What to Remove
        </Typography>
        <Stack spacing={1}>
          {cv.removals.map((item, i) => (
            <Stack direction="row" spacing={1} key={i} alignItems="flex-start">
              <CancelIcon sx={{ color: DANGER, fontSize: 18, mt: 0.2 }} />
              <Typography fontSize={14}>{item}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Section breakdown */}
      <Box>
        <Typography fontWeight={600} mb={2}>
          Section Breakdown
        </Typography>
        <Stack spacing={1.5}>
          {cv.sections.map((sec, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                borderRadius: 2,
                background: "#F7F7FB",
              }}
            >
              <Typography fontSize={14}>{sec.title}</Typography>
              <Chip
                label={sec.score}
                size="small"
                sx={{
                  backgroundColor:
                    sec.score === "Strong"
                      ? "#dcfce7"
                      : sec.score === "Good"
                      ? "#e0f2fe"
                      : "#fef9c3",
                  color:
                    sec.score === "Strong"
                      ? SUCCESS
                      : sec.score === "Good"
                      ? "#0284c7"
                      : WARNING,
                  fontWeight: 600,
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Final recommendation */}
      <Box>
        <Typography fontWeight={600} mb={1}>
          Final Recommendation
        </Typography>
        <Typography fontSize={14} color="text.secondary">
          {cv.recommendation}
        </Typography>
      </Box>
    </Stack>
  );
};

// ── Main component ──
const Analyzer = () => {
  const [cvList, setCvList] = useState<CVReport[]>(MOCK_CVS);
  const [selectedCV, setSelectedCV] = useState<CVReport | null>(
    MOCK_CVS.length > 0 ? MOCK_CVS[0] : null
  );
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isNewUser = cvList.length === 0;

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);

    // Simulate AI analysis delay
    setTimeout(() => {
      const newCV: CVReport = {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadedAt: new Date().toLocaleDateString("en-ZA", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        score: Math.floor(Math.random() * 30) + 65, // 65–95 for demo
        scoreLabel: "Good CV",
        feedback: [
          "Good structure",
          "Relevant skills found",
          "Clear experience section",
          "Add measurable achievements",
        ],
        improvements: [
          "Add measurable achievements (numbers, results)",
          "Improve summary section clarity",
          "Include more technical skills",
        ],
        removals: [
          "Outdated or irrelevant experience",
          "Unnecessary personal details",
          "Generic statements like 'hardworking'",
        ],
        sections: [
          { title: "Summary", score: "Good" },
          { title: "Experience", score: "Strong" },
          { title: "Skills", score: "Needs Improvement" },
          { title: "Education", score: "Good" },
        ],
        recommendation:
          "Your CV shows promise. Focus on quantifying achievements and strengthening your skills section to pass ATS filters more effectively.",
      };

      setCvList((prev) => [newCV, ...prev]);
      setSelectedCV(newCV);
      setFile(null);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 4, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* backgroundColor: "#f8f9fb" */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        CV Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Upload your CV and get instant AI-powered feedback.
      </Typography>

      {/* ── NEW USER: empty state ── */}
      {isNewUser && !file && (
        <>
          <EmptyState onUploadClick={handleUploadClick} />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".pdf"
            onChange={handleFileChange}
          />
        </>
      )}

      {/* ── NEW USER: file selected, ready to analyze ── */}
      {isNewUser && file && (
        <Box maxWidth={480} mx="auto" mt={4}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography fontWeight={600} mb={2}>
                Ready to analyze
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #ddd",
                  borderRadius: 3,
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <DescriptionIcon sx={{ color: PRIMARY }} />
                  <Box>
                    <Typography fontSize={14}>{file.name}</Typography>
                    <Typography fontSize={12} color="text.secondary">
                      {(file.size / 1024).toFixed(0)} KB
                    </Typography>
                  </Box>
                </Stack>
                <CheckCircleIcon sx={{ color: SUCCESS }} />
              </Box>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
              />

              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  sx={{
                    backgroundColor: PRIMARY,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#6a4ee6" },
                  }}
                >
                  {analyzing ? "Analyzing..." : "Analyze CV"}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setFile(null)}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    borderColor: "#ddd",
                    color: "#555",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* ── RETURNING USER: CV list + report ── */}
      {!isNewUser && (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">
          
          {/* LEFT — CV list + upload */}
          <Box sx={{ width: { xs: "100%", md: 280 }, flexShrink: 0 }}>
            {/* Upload new CV */}
            <Box
              onClick={handleUploadClick}
              sx={{
                border: "2px dashed #ddd",
                borderRadius: 3,
                p: 2,
                mb: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                "&:hover": { borderColor: PRIMARY, backgroundColor: "#f5f0fd" },
              }}
            >
              <UploadFileIcon sx={{ color: PRIMARY }} />
              <Box>
                <Typography fontSize={13} fontWeight={600}>
                  {file ? file.name : "Upload new CV"}
                </Typography>
                <Typography fontSize={11} color="text.secondary">
                  {file ? `${(file.size / 1024).toFixed(0)} KB — ready` : "PDF only"}
                </Typography>
              </Box>
            </Box>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".pdf"
              onChange={handleFileChange}
            />

            {file && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleAnalyze}
                disabled={analyzing}
                sx={{
                  backgroundColor: PRIMARY,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  mb: 2,
                  "&:hover": { backgroundColor: "#6a4ee6" },
                }}
              >
                {analyzing ? "Analyzing..." : "Analyze CV"}
              </Button>
            )}

            {/* CV history list */}
            <Typography fontSize={13} fontWeight={600} color="text.secondary" mb={1}>
              YOUR CVs
            </Typography>

            <Stack spacing={1}>
              {cvList.map((cv) => (
                <Box
                  key={cv.id}
                  onClick={() => setSelectedCV(cv)}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    cursor: "pointer",
                    border:
                      selectedCV?.id === cv.id
                        ? `2px solid ${PRIMARY}`
                        : "1px solid #eee",
                    backgroundColor:
                      selectedCV?.id === cv.id ? "#f5f0fd" : "#fff",
                    "&:hover": { boxShadow: 1 },
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <DescriptionIcon sx={{ color: PRIMARY, fontSize: 20 }} />
                    <Box minWidth={0}>
                      <Typography
                        fontSize={13}
                        fontWeight={600}
                        noWrap
                        title={cv.name}
                      >
                        {cv.name}
                      </Typography>
                      <Typography fontSize={11} color="text.secondary">
                        {cv.uploadedAt} · {cv.size}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Chip
                      label={`${cv.score}%`}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        backgroundColor:
                          cv.score >= 85
                            ? "#dcfce7"
                            : cv.score >= 65
                            ? "#fef9c3"
                            : "#fee2e2",
                        color:
                          cv.score >= 85
                            ? SUCCESS
                            : cv.score >= 65
                            ? WARNING
                            : DANGER,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* RIGHT — Selected CV report */}
          <Box flex={1} minWidth={0}>
            {selectedCV ? (
              <ReportPanel cv={selectedCV} />
            ) : (
              <Typography color="text.secondary">
                Select a CV to view its report.
              </Typography>
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Analyzer;











// import React, { useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Stack,
//   Divider,
//   Chip,
//   LinearProgress,
//   Tooltip,
//   Alert,
//   Snackbar,
//   IconButton,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import DescriptionIcon from "@mui/icons-material/Description";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import CancelIcon from "@mui/icons-material/Cancel";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
// import RefreshIcon from "@mui/icons-material/Refresh";

// const PRIMARY = "#7B61FF";
// const SUCCESS = "#22c55e";
// const WARNING = "#f59e0b";
// const DANGER = "#ef4444";

// interface CVReport {
//   id: number;
//   name: string;
//   size: string;
//   uploadedAt: string;
//   score: number;
//   scoreLabel: string;
//   feedback: string[];
//   improvements: string[];
//   removals: string[];
//   sections: { title: string; score: "Strong" | "Good" | "Needs Improvement" }[];
//   recommendation: string;
//   atsKeywords?: string[];
//   atsScore?: number;
// }

// // ── Helpers ──
// const scoreColor = (s: number) => s >= 85 ? SUCCESS : s >= 65 ? WARNING : DANGER;
// const scoreBg = (s: number) => s >= 85 ? "#dcfce7" : s >= 65 ? "#fef9c3" : "#fee2e2";
// const scoreLabel = (s: number) => s >= 85 ? "Strong CV!" : s >= 65 ? "Good CV" : "Needs Work";

// const sectionColor = (score: string) =>
//   score === "Strong" ? SUCCESS : score === "Good" ? "#0284c7" : WARNING;
// const sectionBg = (score: string) =>
//   score === "Strong" ? "#dcfce7" : score === "Good" ? "#e0f2fe" : "#fef9c3";

// // ── Convert file to base64 ──
// const fileToBase64 = (file: File): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve((reader.result as string).split(",")[1]);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });

// // ── Call Claude API ──
// const analyzeWithClaude = async (file: File): Promise<CVReport> => {
//   const base64 = await fileToBase64(file);

//   const systemPrompt = `You are an expert CV/resume analyst and career coach specializing in ATS (Applicant Tracking Systems) optimization and recruiter psychology. 
// Analyze the provided CV and return ONLY a valid JSON object — no markdown, no preamble, no explanation. The JSON must match this exact structure:
// {
//   "score": <number 0-100>,
//   "feedback": [<4 positive observations as strings>],
//   "improvements": [<3-5 specific actionable improvements as strings>],
//   "removals": [<2-4 things to remove as strings>],
//   "sections": [
//     { "title": "Summary", "score": "Strong"|"Good"|"Needs Improvement" },
//     { "title": "Experience", "score": "Strong"|"Good"|"Needs Improvement" },
//     { "title": "Skills", "score": "Strong"|"Good"|"Needs Improvement" },
//     { "title": "Education", "score": "Strong"|"Good"|"Needs Improvement" }
//   ],
//   "recommendation": "<2-3 sentence final recommendation>",
//   "atsKeywords": [<5-8 important keywords found or missing>],
//   "atsScore": <number 0-100 representing ATS compatibility>
// }`;

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-20250514",
//       max_tokens: 1000,
//       system: systemPrompt,
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "document",
//               source: { type: "base64", media_type: "application/pdf", data: base64 },
//             },
//             { type: "text", text: "Analyze this CV thoroughly and return the JSON report." },
//           ],
//         },
//       ],
//     }),
//   });

//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     throw new Error((err as any)?.error?.message || `API error ${response.status}`);
//   }

//   const data = await response.json();
//   const raw = data.content?.map((b: any) => b.text || "").join("") ?? "";
//   const clean = raw.replace(/```json|```/g, "").trim();
//   const parsed = JSON.parse(clean);

//   const s = parsed.score ?? 70;
//   return {
//     id: Date.now(),
//     name: file.name,
//     size: `${(file.size / 1024).toFixed(0)} KB`,
//     uploadedAt: new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }),
//     score: s,
//     scoreLabel: scoreLabel(s),
//     feedback: parsed.feedback ?? [],
//     improvements: parsed.improvements ?? [],
//     removals: parsed.removals ?? [],
//     sections: parsed.sections ?? [],
//     recommendation: parsed.recommendation ?? "",
//     atsKeywords: parsed.atsKeywords ?? [],
//     atsScore: parsed.atsScore ?? s,
//   };
// };

// // ── Empty state ──
// const EmptyState = ({ onUploadClick }: { onUploadClick: () => void }) => (
//   <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", gap: 2 }}>
//     <Box sx={{ width: 90, height: 90, borderRadius: "50%", backgroundColor: "#f5f0fd", display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
//       <ArticleOutlinedIcon sx={{ fontSize: 44, color: PRIMARY }} />
//     </Box>
//     <Typography variant="h6" fontWeight={700}>No CVs analyzed yet</Typography>
//     <Typography color="text.secondary" fontSize={14} maxWidth={360}>
//       Upload your CV and our AI will analyze it — checking ATS compatibility, structure, keywords, and giving you a detailed improvement report.
//     </Typography>
//     <Button variant="contained" startIcon={<UploadFileIcon />} onClick={onUploadClick}
//       sx={{ mt: 1, backgroundColor: PRIMARY, borderRadius: 3, textTransform: "none", fontWeight: 600, px: 4, "&:hover": { backgroundColor: "#6a4ee6" } }}>
//       Upload your first CV
//     </Button>
//   </Box>
// );

// // ── Score ring using SVG ──
// const ScoreRing = ({ score }: { score: number }) => {
//   const r = 44;
//   const circ = 2 * Math.PI * r;
//   const dash = (score / 100) * circ;
//   const color = scoreColor(score);
//   return (
//     <Box textAlign="center" flexShrink={0}>
//       <Box sx={{ position: "relative", width: 110, height: 110, mx: "auto" }}>
//         <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
//           <circle cx="55" cy="55" r={r} fill="none" stroke="#f0f0f0" strokeWidth="9" />
//           <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="9"
//             strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
//             style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }} />
//         </svg>
//         <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//           <Typography fontSize={22} fontWeight={800} color={color}>{score}%</Typography>
//         </Box>
//       </Box>
//       <Typography fontWeight={700} color={color} fontSize={13} mt={0.5}>{scoreLabel(score)}</Typography>
//     </Box>
//   );
// };

// // ── Report panel ──
// const ReportPanel = ({ cv, onReanalyze }: { cv: CVReport; onReanalyze: () => void }) => (
//   <Stack spacing={3}>
//     {/* Score card */}
//     <Card sx={{ borderRadius: 4, boxShadow: "0 2px 12px rgba(123,97,255,0.08)" }}>
//       <CardContent>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
//           <Typography fontWeight={700} fontSize={16}>Analysis Report</Typography>
//           <Tooltip title="Re-analyze this CV">
//             <IconButton size="small" onClick={onReanalyze} sx={{ color: PRIMARY }}>
//               <RefreshIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Stack>

//         <Stack direction={{ xs: "column", sm: "row" }} gap={3} alignItems={{ xs: "center", sm: "flex-start" }}>
//           <ScoreRing score={cv.score} />
//           <Stack spacing={1.5} flex={1} width="100%">
//             {cv.feedback.map((item, i) => (
//               <Stack direction="row" spacing={1} key={i} alignItems="flex-start">
//                 <CheckCircleIcon sx={{ fontSize: 17, color: SUCCESS, mt: 0.15, flexShrink: 0 }} />
//                 <Typography fontSize={13.5}>{item}</Typography>
//               </Stack>
//             ))}
//           </Stack>
//         </Stack>

//         {/* ATS score bar */}
//         {cv.atsScore !== undefined && (
//           <Box mt={3} pt={2.5} sx={{ borderTop: "1px solid #f0f0f0" }}>
//             <Stack direction="row" justifyContent="space-between" mb={0.75}>
//               <Typography fontSize={13} fontWeight={600}>ATS Compatibility</Typography>
//               <Typography fontSize={13} fontWeight={700} color={scoreColor(cv.atsScore)}>{cv.atsScore}%</Typography>
//             </Stack>
//             <LinearProgress variant="determinate" value={cv.atsScore}
//               sx={{ height: 7, borderRadius: 4, bgcolor: "#f0f0f0", "& .MuiLinearProgress-bar": { bgcolor: scoreColor(cv.atsScore), borderRadius: 4 } }} />
//             {(cv.atsKeywords?.length ?? 0) > 0 && (
//               <Stack direction="row" flexWrap="wrap" gap={0.75} mt={1.5}>
//                 {cv.atsKeywords!.map((kw, i) => (
//                   <Chip key={i} label={kw} size="small"
//                     sx={{ fontSize: 11, bgcolor: "#f5f0fd", color: PRIMARY, fontWeight: 600 }} />
//                 ))}
//               </Stack>
//             )}
//           </Box>
//         )}
//       </CardContent>
//     </Card>

//     {/* Improvements */}
//     <Card sx={{ borderRadius: 4, boxShadow: "none", border: "1px solid #fef3c7" }}>
//       <CardContent>
//         <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
//           <WarningAmberIcon sx={{ color: WARNING, fontSize: 18 }} />
//           <Typography fontWeight={700} fontSize={14}>What to Improve</Typography>
//         </Stack>
//         <Stack spacing={1.5}>
//           {cv.improvements.map((item, i) => (
//             <Stack direction="row" spacing={1.5} key={i} alignItems="flex-start">
//               <WarningAmberIcon sx={{ color: WARNING, fontSize: 16, mt: 0.25, flexShrink: 0 }} />
//               <Typography fontSize={13.5}>{item}</Typography>
//             </Stack>
//           ))}
//         </Stack>
//       </CardContent>
//     </Card>

//     {/* Removals */}
//     <Card sx={{ borderRadius: 4, boxShadow: "none", border: "1px solid #fee2e2" }}>
//       <CardContent>
//         <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
//           <CancelIcon sx={{ color: DANGER, fontSize: 18 }} />
//           <Typography fontWeight={700} fontSize={14}>What to Remove</Typography>
//         </Stack>
//         <Stack spacing={1.5}>
//           {cv.removals.map((item, i) => (
//             <Stack direction="row" spacing={1.5} key={i} alignItems="flex-start">
//               <CancelIcon sx={{ color: DANGER, fontSize: 16, mt: 0.25, flexShrink: 0 }} />
//               <Typography fontSize={13.5}>{item}</Typography>
//             </Stack>
//           ))}
//         </Stack>
//       </CardContent>
//     </Card>

//     {/* Section breakdown */}
//     <Box>
//       <Typography fontWeight={700} fontSize={14} mb={1.5}>Section Breakdown</Typography>
//       <Stack spacing={1}>
//         {cv.sections.map((sec, i) => (
//           <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: 2.5, background: "#F7F7FB" }}>
//             <Typography fontSize={14}>{sec.title}</Typography>
//             <Chip label={sec.score} size="small"
//               sx={{ backgroundColor: sectionBg(sec.score), color: sectionColor(sec.score), fontWeight: 700, fontSize: 11 }} />
//           </Box>
//         ))}
//       </Stack>
//     </Box>

//     <Divider />

//     {/* Recommendation */}
//     <Box>
//       <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//         <AutoFixHighIcon sx={{ color: PRIMARY, fontSize: 18 }} />
//         <Typography fontWeight={700} fontSize={14}>Final Recommendation</Typography>
//       </Stack>
//       <Box sx={{ bgcolor: "#f5f0fd", borderRadius: 3, p: 2 }}>
//         <Typography fontSize={13.5} color="#3d2d80" lineHeight={1.7}>{cv.recommendation}</Typography>
//       </Box>
//     </Box>
//   </Stack>
// );

// // ── Analyzing overlay ──
// const AnalyzingState = ({ fileName }: { fileName: string }) => {
//   const steps = ["Reading document...", "Checking ATS compatibility...", "Evaluating structure...", "Generating recommendations..."];
//   const [step, setStep] = React.useState(0);
//   React.useEffect(() => {
//     const interval = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 1400);
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh", gap: 3, textAlign: "center", px: 2 }}>
//       <Box sx={{ width: 80, height: 80, borderRadius: "50%", bgcolor: "#f5f0fd", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <AutoFixHighIcon sx={{ fontSize: 38, color: PRIMARY }} />
//       </Box>
//       <Box>
//         <Typography fontWeight={700} fontSize={18}>Analyzing your CV</Typography>
//         <Typography color="text.secondary" fontSize={13} mt={0.5} noWrap maxWidth={300}>{fileName}</Typography>
//       </Box>
//       <Box width="100%" maxWidth={320}>
//         <LinearProgress sx={{ borderRadius: 4, height: 6, bgcolor: "#f0f0f0", "& .MuiLinearProgress-bar": { bgcolor: PRIMARY, borderRadius: 4 } }} />
//         <Typography fontSize={12} color="text.secondary" mt={1.5}>{steps[step]}</Typography>
//       </Box>
//     </Box>
//   );
// };

// // ── Main component ──
// const Analyzer = () => {
//   const [cvList, setCvList] = useState<CVReport[]>([]);
//   const [selectedCV, setSelectedCV] = useState<CVReport | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const isNewUser = cvList.length === 0;

//   const handleUploadClick = () => { fileInputRef.current?.click(); };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     if (f.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (f.size > 10 * 1024 * 1024) { setError("File must be under 10 MB."); return; }
//     setFile(f);
//     // Reset input so the same file can be re-uploaded
//     e.target.value = "";
//   };

//   const handleAnalyze = async (fileToAnalyze?: File) => {
//     const target = fileToAnalyze ?? file;
//     if (!target) return;
//     setAnalyzing(true);
//     setError(null);
//     try {
//       const report = await analyzeWithClaude(target);
//       setCvList((prev) => [report, ...prev]);
//       setSelectedCV(report);
//       setFile(null);
//     } catch (err: any) {
//       setError(err?.message ?? "Analysis failed. Please try again.");
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const handleDelete = (id: number) => {
//     setCvList((prev) => {
//       const next = prev.filter((c) => c.id !== id);
//       if (selectedCV?.id === id) setSelectedCV(next[0] ?? null);
//       return next;
//     });
//   };

//   return (
//     <Box sx={{ px: { xs: 2, md: 3 }, py: 4, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
//       <Typography variant="h5" fontWeight="bold" mb={0.5}>CV Analysis</Typography>
//       <Typography variant="body2" color="text.secondary" mb={4}>Upload your CV and get instant AI-powered feedback.</Typography>

//       <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert severity="error" onClose={() => setError(null)} sx={{ borderRadius: 3 }}>{error}</Alert>
//       </Snackbar>

//       {/* ── NEW USER ── */}
//       {isNewUser && !file && !analyzing && (
//         <>
//           <EmptyState onUploadClick={handleUploadClick} />
//           <input ref={fileInputRef} type="file" hidden accept=".pdf" onChange={handleFileChange} />
//         </>
//       )}

//       {/* ── Analyzing ── */}
//       {analyzing && file && <AnalyzingState fileName={file.name} />}

//       {/* ── NEW USER: file staged ── */}
//       {isNewUser && file && !analyzing && (
//         <Box maxWidth={480} mx="auto" mt={4}>
//           <Card sx={{ borderRadius: 4 }}>
//             <CardContent>
//               <Typography fontWeight={600} mb={2}>Ready to analyze</Typography>
//               <Box sx={{ border: "2px dashed #ddd", borderRadius: 3, p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <DescriptionIcon sx={{ color: PRIMARY }} />
//                   <Box>
//                     <Typography fontSize={14}>{file.name}</Typography>
//                     <Typography fontSize={12} color="text.secondary">{(file.size / 1024).toFixed(0)} KB</Typography>
//                   </Box>
//                 </Stack>
//                 <CheckCircleIcon sx={{ color: SUCCESS }} />
//               </Box>
//               <input ref={fileInputRef} type="file" hidden accept=".pdf" onChange={handleFileChange} />
//               <Stack spacing={1.5}>
//                 <Button fullWidth variant="contained" onClick={() => handleAnalyze()}
//                   sx={{ backgroundColor: PRIMARY, borderRadius: 3, textTransform: "none", fontWeight: 600, "&:hover": { backgroundColor: "#6a4ee6" } }}>
//                   Analyze CV
//                 </Button>
//                 <Button fullWidth variant="outlined" onClick={() => setFile(null)}
//                   sx={{ borderRadius: 3, textTransform: "none", borderColor: "#ddd", color: "#555" }}>
//                   Cancel
//                 </Button>
//               </Stack>
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       {/* ── RETURNING USER ── */}
//       {!isNewUser && !analyzing && (
//         <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">

//           {/* LEFT */}
//           <Box sx={{ width: { xs: "100%", md: 280 }, flexShrink: 0 }}>
//             <Box onClick={handleUploadClick}
//               sx={{ border: "2px dashed #ddd", borderRadius: 3, p: 2, mb: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 1.5, transition: "all 0.15s", "&:hover": { borderColor: PRIMARY, backgroundColor: "#f5f0fd" } }}>
//               <UploadFileIcon sx={{ color: PRIMARY }} />
//               <Box>
//                 <Typography fontSize={13} fontWeight={600}>{file ? file.name : "Upload new CV"}</Typography>
//                 <Typography fontSize={11} color="text.secondary">{file ? `${(file.size / 1024).toFixed(0)} KB — ready` : "PDF only · max 10 MB"}</Typography>
//               </Box>
//             </Box>
//             <input ref={fileInputRef} type="file" hidden accept=".pdf" onChange={handleFileChange} />

//             {file && (
//               <Button fullWidth variant="contained" onClick={() => handleAnalyze()}
//                 sx={{ backgroundColor: PRIMARY, borderRadius: 3, textTransform: "none", fontWeight: 600, mb: 2, "&:hover": { backgroundColor: "#6a4ee6" } }}>
//                 Analyze CV
//               </Button>
//             )}

//             <Typography fontSize={12} fontWeight={600} color="text.secondary" letterSpacing="0.05em" mb={1}>YOUR CVs</Typography>
//             <Stack spacing={1}>
//               {cvList.map((cv) => (
//                 <Box key={cv.id} onClick={() => setSelectedCV(cv)}
//                   sx={{ p: 1.5, borderRadius: 3, cursor: "pointer", border: selectedCV?.id === cv.id ? `2px solid ${PRIMARY}` : "1px solid #eee", backgroundColor: selectedCV?.id === cv.id ? "#f5f0fd" : "#fff", "&:hover": { boxShadow: 1 }, transition: "all 0.15s" }}>
//                   <Stack direction="row" spacing={1.5} alignItems="center">
//                     <DescriptionIcon sx={{ color: PRIMARY, fontSize: 20, flexShrink: 0 }} />
//                     <Box minWidth={0} flex={1}>
//                       <Typography fontSize={13} fontWeight={600} noWrap title={cv.name}>{cv.name}</Typography>
//                       <Typography fontSize={11} color="text.secondary">{cv.uploadedAt} · {cv.size}</Typography>
//                     </Box>
//                     <Tooltip title="Delete">
//                       <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(cv.id); }} sx={{ color: "#ccc", "&:hover": { color: DANGER } }}>
//                         <DeleteOutlineIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Stack>
//                   <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography fontSize={11} color="text.secondary">ATS: {cv.atsScore ?? cv.score}%</Typography>
//                     <Chip label={`${cv.score}%`} size="small"
//                       sx={{ fontWeight: 700, backgroundColor: scoreBg(cv.score), color: scoreColor(cv.score) }} />
//                   </Box>
//                 </Box>
//               ))}
//             </Stack>
//           </Box>

//           {/* RIGHT */}
//           <Box flex={1} minWidth={0}>
//             {selectedCV
//               ? <ReportPanel cv={selectedCV} onReanalyze={() => { setFile(null); handleUploadClick(); }} />
//               : <Typography color="text.secondary">Select a CV to view its report.</Typography>}
//           </Box>
//         </Stack>
//       )}

//       {/* Analyzing overlay for returning user */}
//       {!isNewUser && analyzing && file && <AnalyzingState fileName={file.name} />}
//     </Box>
//   );
// };

// export default Analyzer;