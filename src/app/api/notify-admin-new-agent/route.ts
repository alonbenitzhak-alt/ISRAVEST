import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "alon.benitzhak@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "MANAIO <noreply@mymanaio.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

export async function POST(req: NextRequest) {
  try {
    const { email, name, company } = await req.json();
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ ok: true });

    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `MANAIO - סוכן חדש ממתין לאישור: ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">סוכן חדש הגיש בקשת הצטרפות</h2>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>שם:</strong> ${name}</p>
            <p style="margin: 4px 0;"><strong>אימייל:</strong> ${email}</p>
            ${company ? `<p style="margin: 4px 0;"><strong>חברה:</strong> ${company}</p>` : ""}
          </div>
          <p>יש לבדוק את רישיון התיווך ולאשר או לדחות את הבקשה בפאנל הניהול:</p>
          <a href="${SITE_URL}/admin" style="display: inline-block; padding: 14px 28px; background-color: #1e3a5f; color: white; text-decoration: none; border-radius: 10px; margin-top: 12px; font-weight: bold;">לפאנל הניהול</a>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">הודעה אוטומטית מפלטפורמת MANAIO</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
