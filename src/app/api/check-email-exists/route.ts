import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseServiceKey) {
    return NextResponse.json(
      { error: "Service role key not configured" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  try {
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error("Supabase listUsers error:", error);
      throw error;
    }

    if (!data || !data.users) {
      console.error("No users data returned from Supabase");
      return NextResponse.json({ exists: false });
    }

    const exists = data.users.some((u) => u.email?.toLowerCase() === email.toLowerCase());
    console.log(`Email check for ${email}: ${exists}`);
    return NextResponse.json({ exists });
  } catch (error) {
    console.error("Error checking email:", error);
    // Return false on error to prevent accidental password resets
    return NextResponse.json({ exists: false });
  }
}
