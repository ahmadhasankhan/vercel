import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/** Server Supabase client bound to the request cookies. Returns null when not configured. */
export async function getSupabaseServer() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* called from a Server Component — middleware refreshes the session instead */
        }
      },
    },
  });
}

/** Current user + whether they're enrolled in a course (premium access). */
export async function getCourseAccess(courseSlug: string) {
  const supabase = await getSupabaseServer();
  if (!supabase) return { user: null, enrolled: false };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, enrolled: false };
  const { data } = await supabase
    .from("enrollments")
    .select("status")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .maybeSingle();
  return { user, enrolled: data?.status === "active" };
}
