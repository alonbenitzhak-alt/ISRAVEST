-- Add agent-specific columns to profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS license_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS id_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS partnership_signed BOOLEAN DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS company TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS company_url TEXT DEFAULT NULL;

-- Index for fast pending-agent queries
CREATE INDEX IF NOT EXISTS idx_profiles_role_approved ON profiles(role, approved);
