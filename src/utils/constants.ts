export const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const TRPC_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  : "http://localhost:3000/api/trpc";
