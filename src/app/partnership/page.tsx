"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function PartnershipPage() {
  const { t, lang, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
        <div className="mb-8 text-center">
          <img src="/logo.svg" alt="MANAIO" className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900">
            {t("partnership.title")}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {t("partnership.version")}
          </p>
        </div>

        <div dir={dir} className="prose prose-sm max-w-none text-gray-700 space-y-6">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section1.title")}
            </h2>
            <p>
              {t("partnership.section1.content")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section2.title")}
            </h2>
            <p className="font-semibold text-gray-900">
              {t("partnership.section2.step1.title")}
            </p>
            <p>
              {t("partnership.section2.step1.content")}
            </p>
            <p className="font-semibold text-gray-900 mt-4">
              {t("partnership.section2.step2.title")}
            </p>
            <p>
              {t("partnership.section2.step2.content")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section3.title")}
            </h2>
            <p>
              {t("partnership.section3.intro")}
            </p>
            <ul className="list-disc ps-5 space-y-1">
              <li>{t("partnership.section3.req1")}</li>
              <li>{t("partnership.section3.req2")}</li>
              <li>{t("partnership.section3.req3")}</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              {t("partnership.section3.note")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section4.title")}
            </h2>
            <ul className="list-disc ps-5 space-y-2">
              <li>
                <span className="font-semibold">{t("partnership.section4.item1.label")}</span>
                {" " + t("partnership.section4.item1.content")}
              </li>
              <li>
                <span className="font-semibold">{t("partnership.section4.item2.label")}</span>
                {" " + t("partnership.section4.item2.content")}
              </li>
              <li>
                <span className="font-semibold">{t("partnership.section4.item3.label")}</span>
                {" " + t("partnership.section4.item3.content")}
              </li>
              <li>
                <span className="font-semibold">{t("partnership.section4.item4.label")}</span>
                {" " + t("partnership.section4.item4.content")}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section5.title")}
            </h2>
            <p>
              {t("partnership.section5.free")}
            </p>
            <p className="mt-3">
              {t("partnership.section5.future")}
            </p>
            <p className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm">
              {t("partnership.section5.disclaimer")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section6.title")}
            </h2>
            <p>
              {t("partnership.section6.intro")}
            </p>
            <p className="p-4 bg-amber-50 border border-amber-200 rounded-lg mt-3">
              {t("partnership.section6.protection")}
            </p>
            <p className="mt-3">
              {t("partnership.section6.normal")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section7.title")}
            </h2>
            <p>
              {t("partnership.section7.content1")}
            </p>
            <p className="mt-3">
              {t("partnership.section7.content2")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section8.title")}
            </h2>
            <p>
              {t("partnership.section8.content")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section9.title")}
            </h2>
            <p>{t("partnership.section9.content")}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {t("partnership.section10.title")}
            </h2>
            <p>
              {t("partnership.section10.contact")}
              {" "}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "972586836555"}?text=${encodeURIComponent(t("partnership.section10.contactQuestion"))}`}
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
              {t("partnership.footer.callout")}
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Link
            href="/register/agent"
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors"
          >
            {t("partnership.button.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
