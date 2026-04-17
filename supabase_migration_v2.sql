-- ============================================
-- Migration: Extend users table + create audio storage bucket
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add new columns to users table for extended Telegram profile
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS personal_channel TEXT;

-- 2. Create storage bucket for audio files (voice notes)
-- Run this ONLY if the bucket doesn't exist yet.
-- Go to Supabase Dashboard → Storage → New Bucket:
--   Name: audit-files
--   Public: Yes (so we can get public URLs)
--
-- Or use the SQL below (Supabase auto-creates the bucket):
INSERT INTO storage.buckets (id, name, public)
VALUES ('audit-files', 'audit-files', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policy: allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'audit-files');

-- 4. Storage policy: allow public read
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'audit-files');

-- 5. Storage policy: allow authenticated users to update their files
CREATE POLICY "Allow authenticated updates" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'audit-files');
