-- Migration: Add WhatsApp fields to properties table + whatsapp_leads table
-- Run this in Supabase SQL Editor for existing databases

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS agent_whatsapp TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_enabled BOOLEAN DEFAULT false;

CREATE TABLE IF NOT EXISTS whatsapp_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT,
  property_title TEXT,
  agent_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE whatsapp_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can read whatsapp leads" ON whatsapp_leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Agents can read own whatsapp leads" ON whatsapp_leads FOR SELECT USING (agent_id = auth.uid());
CREATE POLICY "Anyone can insert whatsapp lead" ON whatsapp_leads FOR INSERT WITH CHECK (true);
