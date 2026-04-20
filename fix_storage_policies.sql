-- ============================================
-- Migration: Fix Storage Policies & Ensure Column
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Ensure voice_url column exists in answers table
ALTER TABLE answers ADD COLUMN IF NOT EXISTS voice_url TEXT;

-- 2. Drop existing restrictive policies for audit-files
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;

-- 3. Create Relaxed Policies (Allow Anon/Public)
-- IMPORTANT: This allows unauthenticated users to upload to this bucket.
-- Suitable for apps identifying users via Telegram IDs instead of Supabase Auth.

-- Allow PUBLIC/ANON uploads
CREATE POLICY "Allow anon uploads" ON storage.objects
  FOR INSERT TO public
  WITH CHECK (bucket_id = 'audit-files');

-- Allow PUBLIC/ANON read
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'audit-files');

-- Allow PUBLIC/ANON updates (e.g. for re-recording)
CREATE POLICY "Allow public updates" ON storage.objects
  FOR UPDATE TO public
  USING (bucket_id = 'audit-files');
