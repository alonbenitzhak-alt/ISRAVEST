"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { useEffect, ReactNode } from "react";

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const { lang, dir } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return <>{children}</>;
}
