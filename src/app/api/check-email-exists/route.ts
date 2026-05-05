import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Try with service role key first (better for auth.users check)
  if (supabaseUrl && supabaseServiceKey) {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers();

      if (!error && data?.users) {
        const exists = data.users.some(
          (u) => u.email?.toLowerCase() === email.toLowerCase()
        );
        console.log(`[EMAIL-CHECK] Service role: ${email} → ${exists}`);
        return NextResponse.json({ exists });
      }
    } catch (err) {
      console.error("[EMAIL-CHECK] Service role error:", err);
    }
  }

  // Fallback: check profiles table with anon key
  if (supabaseUrl) {
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseAnonKey) {
      console.error("[EMAIL-CHECK] No anon key available for fallback");
      return NextResponse.json({ exists: false });
    }

    const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { data, error } = await supabaseAnon
        .from("profiles")
        .select("id")
        .eq("email", email.toLowerCase())
        .limit(1);

      if (error) {
        console.error("[EMAIL-CHECK] Profiles check error:", error);
        return NextResponse.json({ exists: false });
      }

      const exists = (data && data.length > 0) || false;
      console.log(`[EMAIL-CHECK] Profiles fallback: ${email} → ${exists}`);
      return NextResponse.json({ exists });
    } catch (err) {
      console.error("[EMAIL-CHECK] Fallback error:", err);
      return NextResponse.json({ exists: false });
    }
  }

  console.error("[EMAIL-CHECK] No Supabase configuration available");
  return NextResponse.json({ exists: false });
}
