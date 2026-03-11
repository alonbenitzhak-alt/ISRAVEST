-- ISRAVEST Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  price INTEGER NOT NULL,
  expected_roi DECIMAL(5,2) NOT NULL,
  bedrooms INTEGER NOT NULL,
  property_type TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  agent_name TEXT NOT NULL,
  agent_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  investment_budget TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public read access to properties
CREATE POLICY "Properties are publicly readable"
  ON properties FOR SELECT
  USING (true);

-- Allow public insert access to leads
CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Index for filtering
CREATE INDEX idx_properties_country ON properties(country);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_price ON properties(price);
