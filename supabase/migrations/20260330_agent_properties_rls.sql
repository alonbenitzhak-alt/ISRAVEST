-- ============================================================
-- Migration: Add agent_id column + RLS policies for agents on properties table
-- Run this in your Supabase SQL editor
-- ============================================================

-- Add agent_id column if it doesn't exist
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- Enable RLS (safe to run even if already enabled)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Agents can insert own properties" ON properties;
DROP POLICY IF EXISTS "Agents can update own properties" ON properties;
DROP POLICY IF EXISTS "Agents can delete own properties" ON properties;
DROP POLICY IF EXISTS "Admins can manage all properties" ON properties;
DROP POLICY IF EXISTS "Anyone can view active properties" ON properties;

-- Allow approved agents to insert their own properties
CREATE POLICY "Agents can insert own properties"
  ON properties FOR INSERT
  WITH CHECK (
    agent_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role = 'agent'
        AND approved = true
    )
  );

-- Allow agents to update their own properties
CREATE POLICY "Agents can update own properties"
  ON properties FOR UPDATE
  USING (agent_id = auth.uid())
  WITH CHECK (agent_id = auth.uid());

-- Allow agents to delete their own properties
CREATE POLICY "Agents can delete own properties"
  ON properties FOR DELETE
  USING (agent_id = auth.uid());

-- Allow admins full access
CREATE POLICY "Admins can manage all properties"
  ON properties FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow everyone to read properties (public listings)
CREATE POLICY "Anyone can view active properties"
  ON properties FOR SELECT
  USING (true);
