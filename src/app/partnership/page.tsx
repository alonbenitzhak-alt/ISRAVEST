"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function PartnershipPage() {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <div className="mb-8 text-center">
          <img src="/logo.svg" alt="MANAIO" className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900">
            {isHe ? "הסכם שותפות — סוכן נדל\"ן" : "Partnership Agreement — Real Estate Agent"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {isHe ? "גרסה 2.0 | בתוקף מ-1 בינואר 2025" : "Version 2.0 | Effective January 1, 2025"}
          </p>
        </div>

        <div dir={isHe ? "rtl" : "ltr"} className="prose prose-sm max-w-none text-gray-700 space-y-6">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "1. על מי אנחנו" : "1. Who We Are"}
            </h2>
            <p>
              {isHe
                ? "MANAIO היא פלטפורמה הקשרים שמובילה משקיעים ישראלים איכותיים אל סוכני נדל\"ן בחו\"ל. אנחנו מאמינים שהעצמת סוכנים מקומיים עם לידים כשרים היא המפתח להצלחה הדדית. אתה בעל הקשר עם הלקוח, ואנחנו כאן כדי לעזור לך למצוא אותם."
                : "MANAIO is a connection platform that brings quality Israeli investors to real estate agents abroad. We believe that empowering local agents with qualified leads is the key to mutual success. You own the client relationship, and we're here to help you find them."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "2. איך זה עובד" : "2. How It Works"}
            </h2>
            <p className="font-semibold text-gray-900">
              {isHe ? "שלב 1: הנחתת ה-Lead" : "Step 1: Lead Introduction"}
            </p>
            <p>
              {isHe
                ? "אנחנו מגדלים לידים מהתקשרות יישראליות שמאומתות כמשקיעות רציניות. כשיש לנו lead שמתאים לנכסים שלך, אנחנו מעבירים אותו ישירות אליך עם כל המידע הרלוונטי."
                : "We cultivate leads from Israeli contacts verified as serious investors. When we have a lead that matches your properties, we pass them directly to you with all relevant information."}
            </p>
            <p className="font-semibold text-gray-900 mt-4">
              {isHe ? "שלב 2: הקשר שלך עם הלקוח" : "Step 2: Your Client Relationship"}
            </p>
            <p>
              {isHe
                ? "מרגע ש-lead מועבר אליך, המשא ומתן, הסיורים, והעסקה כולה היא בינך ובין הקונה בישירות. אין לא מה שלנו בקשר הזה. הצלחה שלך היא הצלחתנו."
                : "Once a lead is handed off to you, negotiations, viewings, and the entire transaction happen directly between you and the buyer. We step out of the picture. Your success is our success."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "3. מי יכול להצטרף" : "3. Who Can Join"}
            </h2>
            <p>
              {isHe
                ? "אנחנו עובדים עם סוכנים מקצועיים שיש להם:"
                : "We work with professional agents who have:"}
            </p>
            <ul className="list-disc ps-5 space-y-1">
              <li>{isHe ? "רישיון תיווך בתוקף בישראל או במדינת הנכסים" : "Valid broker license in Israel or the country where you operate"}</li>
              <li>{isHe ? "ניסיון של שנה לפחות בתחום הנדל\"ן" : "At least 1 year of real estate experience"}</li>
              <li>{isHe ? "כמה נכסים מעניינים שיכולים לעניין משקיעים ישראלים" : "A few interesting properties that appeal to Israeli investors"}</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              {isHe
                ? "רק זה. לא צריך בדיקות רקע מסובכות או תהליך של חודשים. אנחנו מאמינים בפשטות."
                : "That's it. No complicated background checks or months-long process. We believe in simplicity."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "4. מה אנחנו מצפים ממך" : "4. What We Expect From You"}
            </h2>
            <ul className="list-disc ps-5 space-y-2">
              <li>
                <span className="font-semibold">{isHe ? "היה מגיב:" : "Be responsive:"}</span>
                {isHe
                  ? " התחל לדבר עם leads תוך 24 שעות. אנחנו מביאים לך קונים רציניים — לא בזבוז הזמן שלך."
                  : " Start conversations with leads within 24 hours. We bring you serious buyers—don't waste their time."}
              </li>
              <li>
                <span className="font-semibold">{isHe ? "דיוק:" : "Be honest:"}</span>
                {isHe
                  ? " פרסום מידע מדויק ותמונות על הנכסים. אתה כבר יודע זה חשוב."
                  : " Post accurate information and real photos about your properties. You know this already."}
              </li>
              <li>
                <span className="font-semibold">{isHe ? "שמור סודיות:" : "Respect confidentiality:"}</span>
                {isHe
                  ? " לקוחות שלך צריכים להרגיש בטוחים שהנתונים שלהם בטוחים. זה בסיסי."
                  : " Your clients need to feel their data is secure. That's basic."}
              </li>
              <li>
                <span className="font-semibold">{isHe ? "עדכן אותנו:" : "Keep listings fresh:"}</span>
                {isHe
                  ? " אם משהו השתנה (מחיר, זמינות), הזמן לעדכן את הפלטפורמה הוא עכשיו, לא בעוד שבועות."
                  : " If something changes (price, availability), update us now, not weeks later."}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "5. עמלות וכסף" : "5. Fees & Money"}
            </h2>
            <p>
              {isHe
                ? "כרגע? **ללא עלות**. זה השלב של הבניה, ואנחנו משקיעים בסוכנים טובים."
                : "Right now? **Free**. We're in the building phase, and we're investing in good agents."}
            </p>
            <p className="mt-3">
              {isHe
                ? "אם נתיים מהיום אנחנו נרצה לעדכן את המודל, נתן לך הודעה של 30 יום. זה יחול רק על לידים חדשים, לא על כל מה שכבר קיים."
                : "If down the road we introduce fees, you'll get 30 days' notice. It'll only apply to new leads, not anything already in progress."}
            </p>
            <p className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm">
              {isHe
                ? "🛡️ **הבהרה חשובה:** MANAIO לא אחראית לתוצאות העסקאות. אתה מנהל את הקשר עם הקונה, ואתה ממנהל את ההשקעה. אנחנו רק מביאים את הוא לשולחן."
                : "🛡️ **Important note:** MANAIO isn't responsible for transaction outcomes. You manage the buyer relationship and the investment—we just make the introduction."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "6. הנקודה החיונית: לא על bypass" : "6. The One Thing: No Bypassing"}
            </h2>
            <p>
              {isHe
                ? "הדרך היחידה שאנחנו מגנים את עצמנו — וזה הוגן לחלוטין — היא זו:"
                : "The only way we protect ourselves—and it's completely fair—is this:"}
            </p>
            <p className="p-4 bg-amber-50 border border-amber-200 rounded-lg mt-3">
              {isHe
                ? "אם קונה פנה אליך דרך MANAIO, אל תנסה לעקוף את הפלטפורמה ו\"להעביר\" אותו לעסקה בחוץ. זה לא הוגן לנו, וזה לא הוגן להם."
                : "If a buyer reaches you through MANAIO, don't try to bypass the platform and 'move' them to a transaction outside. It's not fair to us, and it's not fair to them."}
            </p>
            <p className="mt-3">
              {isHe
                ? "בדרך כלל? אל תדאג על זה. אם אתה טוב בעבודתך, המשקיעים יהיו מאושרים, ויהם יחזרו עם חברים. זו הצמיחה האמיתית."
                : "Normally? Don't even worry about it. If you're good at what you do, investors will be happy and they'll come back with friends. That's real growth."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "7. אם משהו לא עובד" : "7. If Something Goes Wrong"}
            </h2>
            <p>
              {isHe
                ? "לכל אחד יש רע יום. אם אתה לא מגיב למשקיעים, או אתה משקר בתרשום נכס, או אתה עוקף את הפלטפורמה בעובדה — אנחנו צריכים לצעוד בחזרה."
                : "Everyone has a bad day. If you're not responding to investors, or you're being dishonest about listings, or you're systematically bypassing the platform—we need to step back."}
            </p>
            <p className="mt-3">
              {isHe
                ? "אנחנו לא יעשה דרמה. אנחנו פשוט נעצור את שליחת לידים חדשים. אם זה משהו חמור (דרמה משפטית או מצדקות בעתים), אנחנו רשאים לסגור את החשבון שלך מיד."
                : "We won't make drama. We'll just stop sending new leads. If it's serious (legal issues or ethical violations), we can close your account immediately."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "8. סיום" : "8. Ending This"}
            </h2>
            <p>
              {isHe
                ? "אתה או אנחנו יכולים לסיים את הקשר בהודעה של 30 יום. לא צריך להיות זה מסובך."
                : "You or we can end this relationship with 30 days' notice. Doesn't need to be complicated."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "9. מהו חוק חל" : "9. Which Law Applies"}
            </h2>
            <p>
              {isHe ? "דיני ישראל." : "The laws of Israel."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {isHe ? "10. שאלות?" : "10. Questions?"}
            </h2>
            <p>
              {isHe
                ? "אנחנו אנשים, לא עורכי דין. השאלות שלך חשובות לנו. יצרו קשר דרך וואצאפ:"
                : "We're people, not lawyers. Your questions matter to us. Hit us up on WhatsApp:"}
              {" "}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "972586836555"}?text=${encodeURIComponent(isHe ? "היי, יש לי שאלה לגבי הסכם השותפות" : "Hi, I have a question about the partnership agreement")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 font-semibold hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </section>

          <section className="p-4 bg-green-50 border border-green-200 rounded-lg mt-8">
            <p className="text-sm text-green-900">
              {isHe
                ? "💚 **בקצרה**: אנחנו כאן כדי לעזור לך למצוא משקיעים טובים. אתה בעלך את הקשר. בואו נבנה משהו ביחד."
                : "💚 **In short**: We're here to help you find good investors. You own the relationship. Let's build something together."}
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Link
            href="/register/agent"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors"
          >
            {isHe ? "חזרה להרשמה" : "Back to Registration"}
          </Link>
        </div>
      </div>
    </div>
  );
}
