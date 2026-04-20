-- ============================================
-- Migration: Add voice_url to answers table
-- Run this in Supabase SQL Editor
-- ============================================

ALTER TABLE answers ADD COLUMN IF NOT EXISTS voice_url TEXT;

-- Optional: If you want to ensure the column is searchable/indexable
CREATE INDEX IF NOT EXISTS idx_answers_voice_url ON answers(voice_url);
