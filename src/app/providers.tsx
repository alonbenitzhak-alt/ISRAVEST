"use client";

import { ReactNode } from "react";
import { FavoritesProvider } from "@/lib/FavoritesContext";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import { PropertiesProvider } from "@/lib/PropertiesContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <PropertiesProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </PropertiesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
