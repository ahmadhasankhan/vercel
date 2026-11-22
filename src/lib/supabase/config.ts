/**
 * Supabase is optional: without these env vars the courses still work, only sign-in/progress are disabled.
 * Values come from next.config.ts (env), which accepts SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY
 * as well as the NEXT_PUBLIC_* / *_ANON_KEY variants.
 */
export const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_KEY ?? "";
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
