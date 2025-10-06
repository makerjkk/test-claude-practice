# 동기 부여 시트 - Supabase 설정 가이드

이 프로젝트는 Next.js와 Supabase를 사용하여 사용자의 생각을 저장하고 격려 메시지를 제공하는 애플리케이션입니다.

## 설정 방법

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정을 만들고 새 프로젝트를 생성합니다.
2. 프로젝트 설정에서 다음 정보를 확인합니다:
   - Project URL
   - Publishable (anon) key

### 2. 환경 변수 설정

`.env.local` 파일을 열고 Supabase 프로젝트의 URL과 키를 입력합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 3. 데이터베이스 테이블 생성

Supabase 대시보드의 SQL Editor에서 다음 SQL을 실행하거나, `supabase/migrations/20250101000000_create_thoughts_table.sql` 파일의 내용을 복사하여 실행합니다:

```sql
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
CREATE POLICY "Enable read access for all users" ON public.thoughts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON public.thoughts
  FOR INSERT WITH CHECK (true);

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
```

### 4. 애플리케이션 실행

```bash
npm install
npm run dev
```

애플리케이션이 `http://localhost:8080`에서 실행됩니다.

## 프로젝트 구조

- `src/lib/supabase/client.ts` - 클라이언트 측 Supabase 클라이언트
- `src/lib/supabase/server.ts` - 서버 측 Supabase 클라이언트
- `src/app/page.tsx` - 메인 페이지 (Supabase 연동 포함)
- `supabase/migrations/` - 데이터베이스 마이그레이션 파일

## 기능

- 사용자의 생각을 입력하고 Supabase에 저장
- 저장된 생각 목록을 실시간으로 표시
- 각 생각에 대한 랜덤 격려 메시지 제공
- 저장 시 격려 메시지 팝업 표시 (3초간)

## 데이터베이스 스키마

### thoughts 테이블

| 컬럼          | 타입                        | 설명                |
| ------------- | --------------------------- | ------------------- |
| id            | UUID                        | 기본 키             |
| text          | TEXT                        | 사용자가 입력한 생각 |
| encouragement | TEXT                        | 격려 메시지         |
| created_at    | TIMESTAMP WITH TIME ZONE    | 생성 시간           |
| updated_at    | TIMESTAMP WITH TIME ZONE    | 수정 시간           |

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
