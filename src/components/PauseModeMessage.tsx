"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { pauseModeMessages } from "@/lib/pauseMode";

export default function PauseModeMessage() {
  const { lang } = useLanguage();
  const msg = pauseModeMessages[lang as "he" | "en"];

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto my-8">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {msg.title}
      </h1>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        {msg.message}
      </p>

      <div className="flex items-center justify-center gap-2 text-gray-700">
        <span>{msg.contact}</span>
        <a
          href={`mailto:${msg.email}`}
          className="font-semibold text-primary-600 hover:text-primary-700 underline"
        >
          {msg.email}
        </a>
      </div>

      <div className="mt-8 pt-8 border-t border-amber-200">
        <p className="text-sm text-gray-500">
          {lang === "he"
            ? "תודה על הסבלנות שלכם 🙏"
            : "Thank you for your patience 🙏"}
        </p>
      </div>
    </div>
  );
}
