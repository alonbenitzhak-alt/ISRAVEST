"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AgentRegisterPage() {
  const { signIn, signUp, user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [agreedToPartnership, setAgreedToPartnership] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (user) {
    router.push("/dashboard/agent");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "webp"];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const validateFile = (file: File): string | null => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return t("register.agent.errorInvalidFileType");
      }
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return t("register.agent.errorInvalidExtension");
      }
      if (file.size > MAX_FILE_SIZE) {
        return t("register.agent.errorFileTooLarge");
      }
      return null;
    };

    if (mode === "register") {
      if (!licenseFile) {
        setError(t("register.agent.errorNoLicense"));
        setLoading(false);
        return;
      }
      const licenseErr = validateFile(licenseFile);
      if (licenseErr) { setError(licenseErr); setLoading(false); return; }

      if (!idFile) {
        setError(t("register.agent.errorNoId"));
        setLoading(false);
        return;
      }
      const idErr = validateFile(idFile);
      if (idErr) { setError(idErr); setLoading(false); return; }
      if (!agreedToPartnership) {
        setError(t("register.agent.errorNoPartnership"));
        setLoading(false);
        return;
      }

      const { error: signUpError } = await signUp(email, password, "agent");
      if (signUpError) {
        setError(signUpError);
        setLoading(false);
        return;
      }

      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setSubmitted(true);
        setLoading(false);
        return;
      }

      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          const updates: Record<string, unknown> = {
            approved: false,
            full_name: fullName,
            phone,
            company,
            partnership_signed: agreedToPartnership,
          };

          // Upload license (store path only — admin accesses via signed URL)
          const licenseExt = licenseFile.name.split(".").pop()?.toLowerCase();
          const licensePath = `${currentUser.id}/license.${licenseExt}`;
          const { data: licenseUpload } = await supabase.storage
            .from("agent-licenses")
            .upload(licensePath, licenseFile, { upsert: true });
          if (licenseUpload) {
            updates.license_url = licensePath;
          }

          // Upload ID card (store path only — admin accesses via signed URL)
          const idExt = idFile.name.split(".").pop()?.toLowerCase();
          const idPath = `${currentUser.id}/id.${idExt}`;
          const { data: idUpload } = await supabase.storage
            .from("agent-licenses")
            .upload(idPath, idFile, { upsert: true });
          if (idUpload) {
            updates.id_url = idPath;
          }

          await supabase.from("profiles").update(updates).eq("id", currentUser.id);

          fetch("/api/notify-admin-new-agent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name: fullName || email, company }),
          }).catch(() => null);
        }
      } catch {
        // Storage not configured — registration still proceeds
      }

      setSubmitted(true);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
      else router.push("/dashboard/agent");
    }
    setLoading(false);
  };

  const fileInputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100";

  return (
    /* Modal overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.svg" alt="MANAIO" className="h-12 w-auto mx-auto" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "register" ? t("register.agent.title") : t("auth.signIn")}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {mode === "register" ? t("register.agent.subtitle") : t("auth.signInDesc")}
            </p>
          </div>

          {/* Pending approval screen */}
          {submitted ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">
                {t("register.agent.pending")}
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed mb-4">
                {t("register.agent.pendingDesc")}
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "972586836555"}?text=${encodeURIComponent("היי, נרשמתי כסוכן ב-MANAIO ויש לי שאלה")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors mt-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("register.agent.questions")}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.name")} *</label>
                      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("form.namePlaceholder")} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.phone")} *</label>
                      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("form.phonePlaceholder")} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("register.agent.companyName")} *
                    </label>
                    <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("register.agent.companyNamePlaceholder")} />
                  </div>

                  {/* Document uploads */}
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("register.agent.brokerLicense")} *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                        className={fileInputClass}
                        required
                      />
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t("register.agent.fileFormats")}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("register.agent.idCard")} *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                        className={fileInputClass}
                        required
                      />
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t("register.agent.fileFormats")}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("form.email")} *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("form.emailPlaceholder")} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("auth.password")} *</label>
                <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none" placeholder={t("auth.passwordPlaceholder")} />
              </div>

              {/* Partnership Agreement */}
              {mode === "register" && (
                <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <input
                    type="checkbox"
                    id="partnership"
                    checked={agreedToPartnership}
                    onChange={(e) => setAgreedToPartnership(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-primary-600 rounded"
                  />
                  <label htmlFor="partnership" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    {t("register.agent.partnershipAgree")}{" "}
                    <Link href="/partnership" target="_blank" className="text-primary-600 font-semibold hover:underline">
                      {t("register.agent.partnershipName")}
                    </Link>{" "}
                    {t("register.agent.partnershipWith")}
                  </label>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading} className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50">
                {loading ? t("auth.pleaseWait") : mode === "register" ? t("register.agent.submit") : t("auth.signIn")}
              </button>
            </form>
          )}

          {!submitted && (
            <>
              <div className="mt-5 text-center text-sm text-gray-500">
                {mode === "register" ? (
                  <>
                    {t("auth.hasAccount")}{" "}
                    <button onClick={() => { setMode("login"); setError(""); }} className="text-primary-600 font-semibold hover:underline">{t("auth.signIn")}</button>
                  </>
                ) : (
                  <>
                    {t("auth.noAccount")}{" "}
                    <button onClick={() => { setMode("register"); setError(""); }} className="text-primary-600 font-semibold hover:underline">{t("auth.signUp")}</button>
                  </>
                )}
              </div>
              <div className="mt-3 text-center">
                <Link href="/register/buyer" className="text-sm text-gray-400 hover:text-primary-600 transition-colors">
                  {t("register.agent.investorLink")}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
