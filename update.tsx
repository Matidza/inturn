import React from "react";
import { Box, Typography, Divider, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      {title}
    </Typography>
    <Typography sx={{ lineHeight: 1.9 }}>
      {children}
    </Typography>
  </Box>
);

const PrivacyPolicy = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, background: "#FFFFFF", color: "#05050B" }}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Privacy Policy
      </Typography>

      <Typography sx={{ mb: 2, lineHeight: 1.9 }}>
        Last updated: 05 April 2026
      </Typography>

      <Typography sx={{ mb: 4, lineHeight: 1.9 }}>
        InTurn ("we", "us", "our") is committed to protecting your personal
        information and your right to privacy. This Privacy Policy explains how
        we collect, use, disclose, and safeguard your information when you use
        our platform.
      </Typography>

      <Divider />

      <Section title="1. Information We Collect">
        We collect personal data that you provide directly, including your name,
        email address, CV/resume data, interview responses, and account details.
        We also collect usage data such as interaction behavior, analytics, IP
        address, device type, and browser information. Payment data is processed
        securely through third-party providers and is not stored directly by us.
      </Section>

      <Section title="2. How We Use Your Information">
        We use your information to:
        <br />• Provide AI-powered interview simulations
        <br />• Analyze and improve your CV for ATS systems
        <br />• Connect you with professionals and employers
        <br />• Improve platform performance and user experience
        <br />• Ensure security and prevent fraud
      </Section>

      <Section title="3. Legal Basis for Processing">
        We process your data based on:
        <br />• Your consent
        <br />• Contractual necessity
        <br />• Legal obligations
        <br />• Legitimate business interests
      </Section>

      <Section title="4. Data Sharing and Disclosure">
        We do not sell your personal data. We may share your information with:
        <br />• Professionals you choose to interact with
        <br />• Employers when you apply for opportunities
        <br />• Service providers (hosting, analytics, payments)
        <br />
        All third parties are required to maintain confidentiality and data
        protection standards.
      </Section>

      <Section title="5. Data Security">
        We implement appropriate technical and organizational measures to
        protect your personal data. However, no system is completely secure, and
        we cannot guarantee absolute security.
      </Section>

      <Section title="6. Data Retention">
        We retain your personal data only for as long as necessary to fulfill the
        purposes outlined in this policy, unless a longer retention period is
        required by law.
      </Section>

      <Section title="7. Your Rights">
        Under applicable laws (including POPIA), you have the right to:
        <br />• Access your personal data
        <br />• Request correction or deletion
        <br />• Object to processing
        <br />• Withdraw consent at any time
      </Section>

      <Section title="8. International Data Transfers">
        Your information may be transferred and processed outside your country,
        subject to appropriate safeguards and legal protections.
      </Section>

      <Section title="9. Cookies and Tracking">
        We use cookies and similar technologies to enhance your experience,
        analyze usage, and improve our services.
      </Section>

      <Section title="10. Updates to This Policy">
        We may update this Privacy Policy periodically. Continued use of the
        platform constitutes acceptance of any updates.
      </Section>

      <Section title="11. Contact Us">
        <Stack direction="column" spacing={1}>
          If you have questions about this Privacy Policy, contact us at:
            <br />
          matidza46@gmail.com
          <Button
          component={Link}
          to="/contact-us"
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#7f42e7ff",
            borderRadius: "20px",
            fontWeight: 600,
            "&:hover": {
              background: "#b893f6ff", color: "#FFFFFF"
            },
            width: "10%"
          }}
        >
          Contact us
        </Button>
        </Stack>
        
        
      </Section>
    </Box>
  );
};

export default PrivacyPolicy;







import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Stack,
  Paper,
} from "@mui/material";

const CookieSettings = () => {
  const [settings, setSettings] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings({
      ...settings,
      [key]: event.target.checked,
    });
  };

  const handleSave = () => {
    // TODO: integrate with backend or localStorage
    localStorage.setItem("cookieSettings", JSON.stringify(settings));
    alert("Your cookie preferences have been saved.");
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#FFFFFF" }}>
      <Paper elevation={0} sx={{ 
          p: { xs: 3, md: 6 }, 
          borderRadius: 4, 
          backgroundColor: "#FFFFFF", 
          color: "#05050B", 
          border: 1, 
          borderColor: "#7d7d7dff" 
        }}
      >
        
        {/* TITLE */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, color: "#05050B" }}
        >
          Cookie Settings
        </Typography>

        {/* INTRO */}
        <Typography sx={{ mb: 4, color: "#444", lineHeight: 1.7 }}>
          At inTurn, we use cookies and similar technologies to enhance your
          experience, analyze platform usage, and deliver personalized content.
          You have full control over how your data is used. You can manage your
          preferences below in compliance with applicable data protection laws
          such as POPIA and GDPR.
        </Typography>

        <Divider sx={{ mb: 4,  color: "#05050B" }} />

        {/* NECESSARY COOKIES */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#05050B" }}>
            Strictly Necessary Cookies
          </Typography>
          <Typography sx={{ mb: 2, color: "#05050B" }}>
            These cookies are essential for the platform to function properly.
            They enable core features such as security, authentication, and
            session management. These cookies cannot be disabled.
          </Typography>

          <FormControlLabel
            control={<Switch checked disabled />}
            label="Always Active"
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* ANALYTICS */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#05050B" }}>
            Analytics Cookies
          </Typography>
          <Typography sx={{ mb: 2, color: "#555" }}>
            These cookies help us understand how users interact with the
            platform by collecting anonymized data. This allows us to improve
            performance and user experience.
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.analytics}
                onChange={handleChange("analytics")}
              />
            }
            label="Enable Analytics Cookies"
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* PREFERENCES */}
        <Box sx={{ mb: 4, color: "#05050B" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Preference Cookies
          </Typography>
          <Typography sx={{ mb: 2, color: "#555" }}>
            These cookies allow us to remember your preferences, such as language
            and region, to provide a more personalized experience.
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.preferences}
                onChange={handleChange("preferences")}
              />
            }
            label="Enable Preference Cookies"
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* MARKETING */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Marketing Cookies
          </Typography>
          <Typography sx={{ mb: 2, color: "#555" }}>
            These cookies are used to deliver relevant advertisements and track
            campaign performance. They may be set by us or third-party providers.
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.marketing}
                onChange={handleChange("marketing")}
              />
            }
            label="Enable Marketing Cookies"
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* ACTIONS */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() =>
              setSettings({
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false,
              })
            }
            sx={{
              textTransform: "none",
              border: 1,
              borderRadius: 25,
              color: "#05050B",
              fontWeight: 500,
              borderColor: "#05050B",
              "&:hover": {
                background: "#b893f6ff", color: "#FFFFFF",
                borderColor: "#FFFFFF",
              },
            }}
          >
            Reject Optional Cookies
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: 5,
              textTransform: "none",
              backgroundColor: "#7f42e7ff",
              "&:hover": {
                background: "#b893f6ff", color: "#FFFFFF"
              },
            }}
          >
            Save Preferences
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CookieSettings;








import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      {title}
    </Typography>
    <Typography sx={{ lineHeight: 1.9 }}>
      {children}
    </Typography>
  </Box>
);

const TermsOfService = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 8, background: "#FFFFFF", color: "#05050B" }}>
      <Typography variant="h4" fontWeight={800} mb={2}>
        Terms of Service
      </Typography>

      <Typography sx={{ mb: 2, lineHeight: 1.9 }}>
        Last updated: 05 April 2026
      </Typography>

      <Typography sx={{ mb: 4, lineHeight: 1.9 }}>
        These Terms of Service ("Terms") govern your use of the InTurn platform.
        By accessing or using our services, you agree to be bound by these Terms.
      </Typography>

      <Divider />

      <Section title="1. Eligibility">
        You must be at least 18 years old or have appropriate legal consent to
        use the platform.
      </Section>

      <Section title="2. User Accounts">
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities under your account.
      </Section>

      <Section title="3. Services Provided">
        InTurn provides AI-powered interview simulations, CV analysis tools, and
        a marketplace connecting students, professionals, and companies.
      </Section>

      <Section title="4. Payments and Pricing">
        Certain services require payment. All pricing is in South African Rand
        (R). Payments are non-refundable unless otherwise required by law.
      </Section>

      <Section title="5. Professional Services Disclaimer">
        InTurn facilitates connections between users and professionals but does
        not guarantee job placement, outcomes, or performance improvements.
      </Section>

      <Section title="6. Acceptable Use">
        You agree not to:
        <br />• Violate any laws or regulations
        <br />• Engage in fraudulent or misleading behavior
        <br />• Attempt to breach platform security
        <br />• Harass or harm other users
      </Section>

      <Section title="7. Intellectual Property">
        All content, trademarks, and technology on the platform are the property
        of InTurn and are protected by intellectual property laws.
      </Section>

      <Section title="8. Termination">
        We reserve the right to suspend or terminate your account if you violate
        these Terms.
      </Section>

      <Section title="9. Limitation of Liability">
        InTurn shall not be liable for indirect, incidental, or consequential
        damages arising from your use of the platform.
      </Section>

      <Section title="10. Indemnification">
        You agree to indemnify and hold InTurn harmless from any claims arising
        from your use of the platform or violation of these Terms.
      </Section>

      <Section title="11. Changes to Terms">
        We may update these Terms at any time. Continued use of the platform
        constitutes acceptance of the revised Terms.
      </Section>

      <Section title="12. Governing Law">
        These Terms are governed by the laws of South Africa.
      </Section>

      <Section title="13. Contact">
        For questions regarding these Terms, contact:
        <br />
        support@inturn.com
      </Section>
    </Box>
  );
};

export default TermsOfService;