"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/client";

const EVENT = "learn:progress-changed";

/** Signed-in user + completed lessons for a course, kept in sync across components. */
export function useProgress(courseSlug: string) {
  const supabase = getSupabaseBrowser();
  const [user, setUser] = useState<User | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!supabase) return setLoading(false);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_slug")
        .eq("course_slug", courseSlug);
      setCompleted(new Set((data ?? []).map((r) => r.lesson_slug as string)));
    }
    setLoading(false);
  }, [supabase, courseSlug]);

  useEffect(() => {
    load();
    const onChange = () => load();
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, [load]);

  const setDone = useCallback(
    async (lessonSlug: string, done: boolean) => {
      if (!supabase || !user) return;
      setCompleted((prev) => {
        const next = new Set(prev);
        if (done) next.add(lessonSlug);
        else next.delete(lessonSlug);
        return next;
      });
      if (done) {
        await supabase.from("lesson_progress").upsert({ user_id: user.id, course_slug: courseSlug, lesson_slug: lessonSlug });
      } else {
        await supabase.from("lesson_progress").delete().match({ user_id: user.id, course_slug: courseSlug, lesson_slug: lessonSlug });
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [supabase, user, courseSlug]
  );

  return { enabled: !!supabase, user, completed, loading, setDone };
}
