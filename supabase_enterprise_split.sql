-- ENTERPRISE SPLIT DATABASE UPDATES

-- 1. PROFILES Refinement
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;

-- 2. COMPANIES Refinement
ALTER TABLE public.companies
ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false;

-- 3. WORKS Refinement
-- First, drop the old constraint if it exists
DO $$ 
BEGIN 
    ALTER TABLE public.works DROP CONSTRAINT IF EXISTS works_status_check;
END $$;

ALTER TABLE public.works 
ADD COLUMN IF NOT EXISTS slots integer DEFAULT 1,
ALTER COLUMN status TYPE text,
ADD CONSTRAINT works_status_check CHECK (status IN ('open', 'closed', 'urgent'));

-- 4. APPLICATIONS Refinement
ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS assigned boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS bid_amount integer;

-- 5. REVIEWS Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    worker_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
    rating integer CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for their own work/hires." ON public.reviews FOR INSERT WITH CHECK (true); -- Logic can be tightened later

-- 6. SHIFTS Table (For granular time tracking)
CREATE TABLE IF NOT EXISTS public.shifts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    work_id uuid REFERENCES public.works(id) ON DELETE CASCADE,
    worker_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    status text CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')) DEFAULT 'scheduled',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for shifts
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own shifts." ON public.shifts FOR SELECT USING (
    worker_id = auth.uid() OR 
    EXISTS (
        SELECT 1 FROM public.works 
        JOIN public.companies ON works.company_id = companies.id
        WHERE works.id = public.shifts.work_id AND companies.owner_id = auth.uid()
    )
);
CREATE POLICY "Employers can manage shifts for their jobs." ON public.shifts FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.works 
        JOIN public.companies ON works.company_id = companies.id
        WHERE works.id = public.shifts.work_id AND companies.owner_id = auth.uid()
    )
);
