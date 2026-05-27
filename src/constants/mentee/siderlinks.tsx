import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Sparkles } from "lucide-react";

export const navbarLinks = [
  { label: "Dashboard", icon: DashboardOutlinedIcon, path: "/mentee",  },
  { label: "AI Practice", icon: Sparkles, path: "/mentee/ai-home" },
  { label: "CV Analysis", icon: DescriptionOutlinedIcon, path: "/mentee/cv-analyzer" },
  { label: "Professionals", icon: GroupsOutlinedIcon, path: "/mentee/professionals" },
  { label: "Interviews", icon: PersonOutlineOutlinedIcon, path: "/mentee/interviews" },
  { label: "Applications", icon: AssignmentOutlinedIcon, path: "/mentee/applications" },
  // { label: "Jobs", icon: WorkOutlineOutlinedIcon, path: "/mentee/jobs" },
  // { label: "Jobs", icon: WorkOutlineOutlinedIcon, path: "/mentee/jobs" },
  { label: "Settings", icon: SettingsOutlinedIcon, path: "/mentee/settings" },
];