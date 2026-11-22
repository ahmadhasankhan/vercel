import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServer();
  if (supabase) await supabase.auth.signOut();
  const back = req.headers.get("referer") ?? new URL("/learn", req.url).toString();
  return NextResponse.redirect(back, { status: 303 });
}
