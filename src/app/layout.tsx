import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מוזיאום הפועל הדיגיטלי | Hapoel Digital Museum",
  description: "מוזיאום דיגיטלי של הפועל - שירים, משחקים, סגלים וחולצות לאורך ההיסטוריה",
  openGraph: {
    title: "מוזיאום הפועל הדיגיטלי",
    description: "מוזיאום דיגיטלי של הפועל - שירים, משחקים, סגלים וחולצות",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-white">
        <nav className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
          <div className="container flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">
              🔴 הפועל | Hapoel
            </Link>
            <div className="flex gap-6">
              <Link href="/songs" className="hover:bg-red-700 px-3 py-2 rounded transition">
                🎵 שירים
              </Link>
              <Link href="/matches" className="hover:bg-red-700 px-3 py-2 rounded transition">
                ⚽ משחקים
              </Link>
              <Link href="/jerseys" className="hover:bg-red-700 px-3 py-2 rounded transition">
                👕 חולצות
              </Link>
              <Link href="/squads" className="hover:bg-red-700 px-3 py-2 rounded transition">
                👥 סגלים
              </Link>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-gray-900 text-white mt-20 py-12">
          <div className="container">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">מוזיאום הפועל</h3>
                <p className="text-gray-400">
                  מוזיאום דיגיטלי כולל של הפועל - היסטוריה, שירים, משחקים וסגלים
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">קטגוריות</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><Link href="/songs" className="hover:text-white">שירים</Link></li>
                  <li><Link href="/matches" className="hover:text-white">משחקים</Link></li>
                  <li><Link href="/jerseys" className="hover:text-white">חולצות</Link></li>
                  <li><Link href="/squads" className="hover:text-white">סגלים</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">אודות</h3>
                <p className="text-gray-400">
                  תיעוד המורשת של הפועל - פרויקט חברות מעריצים
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              <p>&copy; 2024 מוזיאום הפועל. כל הזכויות שמורות.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
