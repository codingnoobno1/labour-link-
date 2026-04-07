-- Add employer_id column to works table
ALTER TABLE public.works 
ADD COLUMN IF NOT EXISTS employer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable RLS (already enabled but good to ensure)
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they conflict (optional, but safer)
-- DROP POLICY IF EXISTS "Works are viewable by everyone." ON public.works;

-- Policy for employers to manage their own job posts
CREATE POLICY "Employers can manage their own jobs." 
ON public.works 
FOR ALL 
USING (auth.uid() = employer_id);

-- Update profile policies to allow users to update their own avatar_url
CREATE POLICY "Users can update their own avatar_url." 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
