import React, { useCallback, useReducer, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Tooltip,
  IconButton,
  FormHelperText,
  Chip,
} from "@mui/material";

import {
  Person,
  Lock,
  CreditCard,
  Notifications,
  Security,
  ChevronRight,
  CameraAlt,
  Visibility,
  VisibilityOff,
  InfoOutlined,
} from "@mui/icons-material";

import showli from "../../assets/showli.jpeg";
import { useLogout, useGetIdentity } from "@refinedev/core";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIMARY = "#7B61FF";

type TabValue = "profile" | "account" | "billing" | "notifications" | "privacy";

const TABS: { icon: React.ReactNode; label: string; value: TabValue }[] = [
  { icon: <Person />, label: "Profile", value: "profile" },
  { icon: <Lock />, label: "Account", value: "account" },
  { icon: <CreditCard />, label: "Billing", value: "billing" },
  { icon: <Notifications />, label: "Notifications", value: "notifications" },
  { icon: <Security />, label: "Privacy", value: "privacy" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileForm {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  bio: string;
}

interface AccountForm {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface BillingForm {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

interface NotificationPrefs {
  emailAlerts: boolean;
  interviewReminders: boolean;
  paymentNotifications: boolean;
  platformUpdates: boolean;
}

interface PrivacyPrefs {
  showProfilePublicly: boolean;
  allowDirectMessages: boolean;
}

// ─── Feedback hook ────────────────────────────────────────────────────────────

function useFeedback() {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const show = useCallback(
    (message: string, severity: "success" | "error" = "success") =>
      setSnackbar({ open: true, message, severity }),
    []
  );
  const hide = useCallback(() => setSnackbar((s) => ({ ...s, open: false })), []);

  return { snackbar, show, hide };
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("profile");
  const { snackbar, show, hide } = useFeedback();
  const { data: user }          = useGetIdentity<any>();

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 4, backgroundColor: "#FFFFFF", color: "#05050B", }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Settings
      </Typography>

      <Grid container spacing={3}>

        {/* ── Sidebar ─────────────────────────────────── */}
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
            <CardContent sx={{ p: 1.5 }}>
              <List disablePadding>
                {TABS.map((tab) => (
                  <SettingTab
                    key={tab.value}
                    icon={tab.icon}
                    title={tab.label}
                    value={tab.value}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Content ─────────────────────────────────── */}
        <Grid item xs={12} md={9}>
          <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e5e7eb" }}>
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              {activeTab === "profile" && <ProfileSettings onSave={show} />}
              {activeTab === "account" && <AccountSettings onSave={show} />}
              {activeTab === "billing" && <BillingSettings onSave={show} />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "privacy" && <PrivacySettings onDelete={() => show("Account deleted", "error")} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ── Global feedback snackbar ─────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={hide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={hide} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;

// ─── Tab ─────────────────────────────────────────────────────────────────────

interface SettingTabProps {
  icon: React.ReactNode;
  title: string;
  value: TabValue;
  activeTab: TabValue;
  setActiveTab: (v: TabValue) => void;
}

const SettingTab: React.FC<SettingTabProps> = ({ icon, title, value, activeTab, setActiveTab }) => (
  <ListItemButton
    selected={activeTab === value}
    onClick={() => setActiveTab(value)}
    sx={{
      borderRadius: 2,
      mb: 0.5,
      "&.Mui-selected": {
        backgroundColor: `${PRIMARY}14`,
        color: PRIMARY,
        "& .MuiListItemIcon-root": { color: PRIMARY },
      },
      "&.Mui-selected:hover": { backgroundColor: `${PRIMARY}20` },
    }}
  >
    <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
    <ListItemText primary={title} primaryTypographyProps={{ fontWeight: activeTab === value ? 600 : 400 }} />
    <ChevronRight fontSize="small" sx={{ color: "text.disabled" }} />
  </ListItemButton>
);

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Box mb={3}>
    <Typography variant="h6" fontWeight={700}>{title}</Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" mt={0.5}>{subtitle}</Typography>
    )}
    <Divider sx={{ mt: 2 }} />
  </Box>
);

// ─── Profile Settings ─────────────────────────────────────────────────────────

const ProfileSettings: React.FC<{ onSave: (msg: string) => void }> = ({ onSave }) => {
  const { data: user }          = useGetIdentity<any>();
  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>(showli);
  const [errors, setErrors] = useState<Partial<ProfileForm>>({});

  const handleChange = (field: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const newErrors: Partial<ProfileForm> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      // TODO: await api.patch("/user/profile", form);
      await new Promise((r) => setTimeout(r, 800)); // simulate
      onSave("Profile updated successfully.");
    } catch {
      onSave("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={3}>
      <SectionHeader title="Profile Settings" subtitle="Update your public-facing information." />

      {/* Avatar */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ position: "relative" }}>
          {/* <Avatar
            src={user?.avatar}
            sx={{
              width: 36, height: 36,
              border: `2px solid ${t.avatarBorder}`,
              flexShrink: 0, cursor: "default",
              transition: "border-color 0.2s",
            }}
          /> */}
          <Avatar 
            // src={user?.avatar}
            src={avatarPreview} 
            sx={{ 
              width: 80, height: 80 
            }} 
          />
          <Tooltip title="Change photo">
            <IconButton
              component="label"
              size="small"
              sx={{
                position: "absolute",
                bottom: -4,
                right: -4,
                backgroundColor: PRIMARY,
                color: "#fff",
                "&:hover": { backgroundColor: "#6950e0" },
                width: 28,
                height: 28,
              }}
            >
              <CameraAlt sx={{ fontSize: 15 }} />
              <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600}>Profile Photo</Typography>
          <Typography variant="caption" color="text.secondary">JPG, PNG or GIF · Max 5MB</Typography>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            value={form.firstName}
            onChange={handleChange("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={form.lastName}
            onChange={handleChange("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </Grid>
      </Grid>

      <TextField fullWidth label="Job Title" value={form.jobTitle} onChange={handleChange("jobTitle")} />
      <TextField fullWidth label="Company" value={form.company} onChange={handleChange("company")} />
      <TextField
        fullWidth
        label="Bio"
        multiline
        rows={4}
        value={form.bio}
        onChange={handleChange("bio")}
        inputProps={{ maxLength: 500 }}
        helperText={`${form.bio.length}/500`}
      />

      <Box>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.25,
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: PRIMARY,
            "&:hover": { backgroundColor: "#6950e0" },
          }}
        >
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </Box>
    </Stack>
  );
};

// ─── Account Settings ─────────────────────────────────────────────────────────

const AccountSettings: React.FC<{ onSave: (msg: string) => void }> = ({ onSave }) => {
  const [form, setForm] = useState<AccountForm>({ email: "", newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<AccountForm>>({});

  const handleChange = (field: keyof AccountForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<AccountForm> = {};
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (form.newPassword && form.newPassword.length < 8)
      newErrors.newPassword = "Password must be at least 8 characters.";
    if (form.newPassword && form.newPassword !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      onSave("Account updated successfully.");
    } catch {
      onSave("Failed to update account.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={3}>
      <SectionHeader title="Account Settings" subtitle="Manage your login credentials." />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        error={!!errors.email}
        helperText={errors.email}
        required
      />

      <TextField
        fullWidth
        label="New Password"
        type={showPassword ? "text" : "password"}
        value={form.newPassword}
        onChange={handleChange("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword || "Leave blank to keep your current password."}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword((p) => !p)} edge="end" size="small">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />

      {form.newPassword && (
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      )}

      <Box>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{ borderRadius: 2, px: 3, py: 1.25, fontWeight: 600, textTransform: "none", backgroundColor: PRIMARY, "&:hover": { backgroundColor: "#6950e0" } }}
        >
          {saving ? "Updating…" : "Update Account"}
        </Button>
      </Box>
    </Stack>
  );
};

// ─── Billing Settings ─────────────────────────────────────────────────────────

const BillingSettings: React.FC<{ onSave: (msg: string) => void }> = ({ onSave }) => {
  const [form, setForm] = useState<BillingForm>({ bankName: "", accountNumber: "", accountHolder: "" });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<BillingForm>>({});

  const handleChange = (field: keyof BillingForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<BillingForm> = {};
    if (!form.bankName.trim()) newErrors.bankName = "Bank name is required.";
    if (!form.accountNumber.trim()) newErrors.accountNumber = "Account number is required.";
    else if (!/^\d+$/.test(form.accountNumber)) newErrors.accountNumber = "Account number must be numeric.";
    if (!form.accountHolder.trim()) newErrors.accountHolder = "Account holder name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      onSave("Billing information saved.");
    } catch {
      onSave("Failed to save billing info.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={3}>
      <SectionHeader title="Billing & Payments" subtitle="Your payout details for completed sessions." />

      <Alert severity="info" icon={<InfoOutlined />} sx={{ borderRadius: 2 }}>
        Your banking details are encrypted and stored securely.
      </Alert>

      <TextField
        fullWidth
        label="Bank Name"
        value={form.bankName}
        onChange={handleChange("bankName")}
        error={!!errors.bankName}
        helperText={errors.bankName}
        required
      />
      <TextField
        fullWidth
        label="Account Number"
        value={form.accountNumber}
        onChange={handleChange("accountNumber")}
        error={!!errors.accountNumber}
        helperText={errors.accountNumber}
        inputProps={{ inputMode: "numeric" }}
        required
      />
      <TextField
        fullWidth
        label="Account Holder Name"
        value={form.accountHolder}
        onChange={handleChange("accountHolder")}
        error={!!errors.accountHolder}
        helperText={errors.accountHolder}
        required
      />

      <Box>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
          sx={{ borderRadius: 2, px: 3, py: 1.25, fontWeight: 600, textTransform: "none", backgroundColor: PRIMARY, "&:hover": { backgroundColor: "#6950e0" } }}
        >
          {saving ? "Saving…" : "Save Billing Info"}
        </Button>
      </Box>
    </Stack>
  );
};

// ─── Notification Settings ────────────────────────────────────────────────────

const NOTIFICATION_ITEMS: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  { key: "emailAlerts", label: "Email Alerts", description: "Receive important updates via email." },
  { key: "interviewReminders", label: "Interview Reminders", description: "Get reminders before upcoming sessions." },
  { key: "paymentNotifications", label: "Payment Notifications", description: "Be notified when payments are processed." },
  { key: "platformUpdates", label: "Platform Updates", description: "News about new features and improvements." },
];

const NotificationSettings: React.FC = () => {
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    emailAlerts: true,
    interviewReminders: true,
    paymentNotifications: true,
    platformUpdates: false,
  });

  const handleToggle = (key: keyof NotificationPrefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Stack spacing={3}>
      <SectionHeader title="Notifications" subtitle="Control how and when we contact you." />
      <Stack spacing={0} divider={<Divider />}>
        {NOTIFICATION_ITEMS.map(({ key, label, description }) => (
          <Stack
            key={key}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>{label}</Typography>
              <Typography variant="caption" color="text.secondary">{description}</Typography>
            </Box>
            <Switch
              checked={prefs[key]}
              onChange={() => handleToggle(key)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: PRIMARY },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: PRIMARY },
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

// ─── Privacy Settings ─────────────────────────────────────────────────────────

const PRIVACY_ITEMS: { key: keyof PrivacyPrefs; label: string; description: string }[] = [
  { key: "showProfilePublicly", label: "Public Profile", description: "Allow anyone to view your profile." },
  { key: "allowDirectMessages", label: "Direct Messages", description: "Let mentees message you directly." },
];

const PrivacySettings: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const [prefs, setPrefs] = useState<PrivacyPrefs>({ showProfilePublicly: true, allowDirectMessages: true });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleToggle = (key: keyof PrivacyPrefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleDeleteConfirmed = () => {
    setConfirmOpen(false);
    onDelete();
    // TODO: await api.delete("/user") then signOut()
  };

  return (
    <Stack spacing={3}>
      <SectionHeader title="Privacy & Security" subtitle="Control your visibility and data." />

      <Stack spacing={0} divider={<Divider />}>
        {PRIVACY_ITEMS.map(({ key, label, description }) => (
          <Stack
            key={key}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Box>
              <Typography variant="body2" fontWeight={600}>{label}</Typography>
              <Typography variant="caption" color="text.secondary">{description}</Typography>
            </Box>
            <Switch
              checked={prefs[key]}
              onChange={() => handleToggle(key)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: PRIMARY },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: PRIMARY },
              }}
            />
          </Stack>
        ))}
      </Stack>

      <Divider />

      <Box>
        <Typography variant="body2" fontWeight={600} color="error" mb={0.5}>
          Danger Zone
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          Deleting your account is permanent and cannot be undone.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setConfirmOpen(true)}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
          Delete Account
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove all your data, sessions, and earnings history. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setConfirmOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained" sx={{ textTransform: "none", fontWeight: 600 }}>
            Yes, delete my account
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
