export const REVALIDATE_TIME_IN_SECONDS = 4;

export const TRPC_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  : "http://localhost:3000/api/trpc";
