-- Create thoughts table
CREATE TABLE IF NOT EXISTS public.thoughts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  encouragement TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS thoughts_created_at_idx ON public.thoughts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (public access)
-- Note: 모든 사용자가 모든 레코드를 읽을 수 있도록 설정
CREATE POLICY "Enable read access for all users" ON public.thoughts
  FOR SELECT USING (true);

-- Note: 모든 사용자가 새로운 레코드를 삽입할 수 있도록 설정
CREATE POLICY "Enable insert access for all users" ON public.thoughts
  FOR INSERT WITH CHECK (true);

-- Note: 모든 사용자가 레코드를 삭제할 수 있도록 설정 (선택사항)
CREATE POLICY "Enable delete access for all users" ON public.thoughts
  FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.thoughts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
