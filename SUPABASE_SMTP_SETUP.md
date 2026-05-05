# Supabase SMTP Configuration for Custom Email Sender

## Problem
Supabase Auth sends password reset and email verification emails from `supabaseauth@supabase.io`, revealing our use of Supabase.

## Solution
Configure Supabase to use Resend as a custom SMTP provider. This way, all auth emails will be sent from your custom domain.

## Setup Steps

### 1. Go to Supabase Dashboard
- Navigate to your project
- Go to **Authentication → Providers → Email**

### 2. Enable Custom SMTP
Scroll down to **SMTP Configuration** and enable it.

### 3. Fill in SMTP Details
| Field | Value |
|-------|-------|
| **SMTP Host** | `smtp.resend.com` |
| **SMTP Port** | `587` |
| **SMTP Username** | `default` |
| **SMTP Password** | Your Resend API Key (from `.env` as `RESEND_API_KEY`) - starts with `re_` |
| **Sender Email** | `noreply@mymanaio.com` |
| **Sender Name** | `MANAIO` |
| **Enable TLS** | ✓ (Checked) |

### 4. Important Notes
- The `Sender Email` (`noreply@mymanaio.com`) **must be verified in Resend dashboard**
- Use your actual Resend API Key from the `.env` file
- This affects ALL auth emails: password reset, email verification, magic links, etc.
- After saving, test by requesting a password reset

## Testing
1. Go to `/register/buyer` on your site
2. Click "Forgot Password"
3. Enter an email address
4. Check if the email arrives from `noreply@mymanaio.com` instead of `supabaseauth@supabase.io`

## Security Considerations

### User Enumeration Prevention
The password reset flow now includes a security check:
- Client requests password reset for an email
- Server checks if email exists in the system (via `/api/check-email-exists`)
- If email doesn't exist, the user gets the same success message
- This prevents attackers from discovering registered email addresses

### Implementation Details
- API route: `/src/app/api/check-email-exists/route.ts` (server-side only)
- Uses `SUPABASE_SERVICE_ROLE_KEY` (never exposed to browser)
- Always responds with same message whether email exists or not
- Matches security best practices (like Gmail, Facebook, etc.)

## Troubleshooting

**Issue:** SMTP connection error
- Verify the API key is correct and not expired
- Check that the domain is verified in Resend

**Issue:** Email not arriving
- Check spam folder
- Verify sender email is the one configured in Resend

**Issue:** Still showing supabaseauth
- Hard refresh your browser
- SMTP settings may take a few minutes to apply

**Issue:** Password reset not working for unregistered emails
- This is intentional! We check if the email exists before sending
- See "User Enumeration Prevention" above
