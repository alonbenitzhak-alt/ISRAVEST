import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrigin } from "@/lib/csrf";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const FROM_EMAIL = process.env.FROM_EMAIL || "MANAIO <noreply@mymanaio.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mymanaio.com";

export async function POST(req: NextRequest) {
  const originError = validateOrigin(req);
  if (originError) return originError;

  try {
    const { email, agentName, propertyTitle, propertyId, city, country, price, currency } = await req.json();
    if (!email || typeof email !== "string") return NextResponse.json({ ok: true });
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ ok: true });

    const resend = new Resend(key);

    const priceFormatted = price
      ? `${Number(price).toLocaleString()} ${currency || "EUR"}`
      : "";

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "MANAIO — מודעתך הועלתה בהצלחה!",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); padding: 32px 28px; border-radius: 12px 12px 0 0;">
            <img src="${SITE_URL}/logo.svg" alt="MANAIO" style="height: 36px; margin-bottom: 16px; filter: brightness(0) invert(1);" />
            <h1 style="color: white; margin: 0; font-size: 22px;">מודעתך הועלתה בהצלחה לאתר! 🎉</h1>
          </div>
          <div style="background: #ffffff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; color: #374151;">שלום ${escapeHtml(agentName || "")},</p>
            <p style="color: #6b7280;">הנכס שלך פורסם בהצלחה בפלטפורמת MANAIO ועומד לרשות משקיעים ישראלים.</p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <h2 style="font-size: 17px; color: #1e293b; margin: 0 0 10px 0;">${escapeHtml(propertyTitle || "")}</h2>
              ${city || country ? `<p style="color: #64748b; margin: 4px 0; font-size: 14px;">📍 ${escapeHtml(city || "")}${city && country ? ", " : ""}${escapeHtml(country || "")}</p>` : ""}
              ${priceFormatted ? `<p style="color: #64748b; margin: 4px 0; font-size: 14px;">💰 ${escapeHtml(priceFormatted)}</p>` : ""}
            </div>

            ${propertyId ? `
            <a href="${SITE_URL}/properties/${propertyId}"
               style="display: inline-block; padding: 13px 28px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 15px; margin-bottom: 20px;">
              צפה במודעה באתר
            </a>
            ` : ""}

            <p style="font-size: 14px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 8px;">
              לניהול הנכסים שלך: <a href="${SITE_URL}/dashboard/agent" style="color: #2563eb;">לוח הבקרה שלי</a>
            </p>

            <p style="font-size: 12px; color: #d1d5db; margin-top: 20px;">בברכה, צוות MANAIO</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
