


import React, { useState } from "react";
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
} from "@mui/material";

import {
  Person,
  Lock,
  CreditCard,
  Notifications,
  Security,
  ChevronRight,
} from "@mui/icons-material";

import showli from "../../assets/ty.jpg";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Box >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        
        {/* SIDEBAR */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <List>
                <SettingTab
                  icon={<Person />}
                  title="Profile"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  value="profile"
                />
                <SettingTab
                  icon={<Lock />}
                  title="Account"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  value="account"
                />
                <SettingTab
                  icon={<CreditCard />}
                  title="Billing"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  value="billing"
                />
                <SettingTab
                  icon={<Notifications />}
                  title="Notifications"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  value="notifications"
                />
                <SettingTab
                  icon={<Security />}
                  title="Privacy"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  value="privacy"
                />
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* MAIN CONTENT */}
        <Grid item xs={12} md={9}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "account" && <AccountSettings />}
              {activeTab === "billing" && <BillingSettings />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "privacy" && <PrivacySettings />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;





/* ================= TAB COMPONENT ================= */
const SettingTab = ({ icon, title, value, activeTab, setActiveTab }: any) => (
  <ListItemButton
    selected={activeTab === value}
    onClick={() => setActiveTab(value)}
    sx={{ borderRadius: 2, mb: 1 }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
    <ChevronRight fontSize="small" />
  </ListItemButton>
);





/* ================= PROFILE ================= */
const ProfileSettings = () => (
  <Stack spacing={3}>
    <Typography variant="h6">Profile Settings</Typography>

    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar src={showli} sx={{ width: 70, height: 70 }} />
      <Button variant="contained">Change</Button>
    </Stack>

    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="First Name" />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField fullWidth label="Last Name" />
      </Grid>
    </Grid>

    <TextField fullWidth label="Job Title" />
    <TextField fullWidth label="Company" />

    <TextField
      fullWidth
      label="Bio"
      multiline
      rows={4}
    />

    <Button variant="contained">Save Changes</Button>
  </Stack>
);





/* ================= ACCOUNT ================= */
const AccountSettings = () => (
  <Stack spacing={3}>
    <Typography variant="h6">Account Settings</Typography>

    <TextField fullWidth label="Email Address" />
    <TextField fullWidth label="New Password" type="password" />

    <Button variant="contained">Update Account</Button>
  </Stack>
);





/* ================= BILLING ================= */
const BillingSettings = () => (
  <Stack spacing={3}>
    <Typography variant="h6">Billing & Payments</Typography>

    <TextField fullWidth label="Bank Name" />
    <TextField fullWidth label="Account Number" />
    <TextField fullWidth label="Account Holder" />

    <Button variant="contained">Save Billing Info</Button>
  </Stack>
);





/* ================= NOTIFICATIONS ================= */
const NotificationSettings = () => (
  <Stack spacing={2}>
    <Typography variant="h6">Notifications</Typography>

    <Toggle label="Email Alerts" />
    <Toggle label="Interview Reminders" />
    <Toggle label="Payment Notifications" />
    <Toggle label="Platform Updates" />
  </Stack>
);





/* ================= PRIVACY ================= */
const PrivacySettings = () => (
  <Stack spacing={2}>
    <Typography variant="h6">Privacy & Security</Typography>

    <Toggle label="Show profile publicly" />
    <Toggle label="Allow direct messages" />

    <Divider />

    <Button color="error" variant="contained">
      Delete Account
    </Button>
  </Stack>
);





/* ================= TOGGLE ================= */
const Toggle = ({ label }: any) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
  >
    <Typography>{label}</Typography>
    <Switch />
  </Stack>
);