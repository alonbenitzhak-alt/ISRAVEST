"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setVerified(true);
      } else {
        setError(t("auth.invalidResetLink") || "Invalid or expired reset link. Please request a new password reset.");
      }
    };

    checkSession();
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch") || "Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError(t("auth.passwordTooShort") || "Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(t("auth.passwordUpdated") || "Password updated successfully. Redirecting...");
        setTimeout(() => {
          router.push("/register/buyer");
        }, 2000);
      }
    } catch {
      setError(t("auth.resetError") || "An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.svg" alt="MANAIO" className="h-16 w-auto mx-auto" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            {t("auth.resetPassword")}
          </h2>
          <p className="text-gray-500 mt-2">
            {t("auth.enterNewPassword") || "Enter your new password below."}
          </p>
        </div>

        {!verified ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-700 font-semibold">
              {error || t("auth.invalidResetLink")}
            </p>
            <Link href="/register/buyer" className="text-primary-600 font-semibold hover:underline mt-4 inline-block">
              {t("auth.backToSignIn")}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.newPassword")} *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder={t("auth.passwordPlaceholder")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("auth.confirmPassword")} *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder={t("auth.passwordPlaceholder")}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-accent-600 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {loading ? t("auth.pleaseWait") : t("auth.updatePassword") || "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
