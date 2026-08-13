"use client";

import Link from "next/link";

export default function Home() {
  const stats = [
    { number: "1924", label: "שנת ייסוד" },
    { number: "100+", label: "שנות היסטוריה" },
    { number: "1000+", label: "משחקים מתוועדים" },
    { number: "50+", label: "שירים קלאסיים" },
  ];

  const features = [
    {
      icon: "🎵",
      title: "שירים",
      description: "אוסף מושלם של שירי הפועל לאורך השנים",
      href: "/songs",
    },
    {
      icon: "⚽",
      title: "משחקים",
      description: "ארכיון מלא של משחקים, תוצאות וסטטיסטיקות",
      href: "/matches",
    },
    {
      icon: "👕",
      title: "חולצות",
      description: "גלריה של חולצות הפועל לאורך העונות",
      href: "/jerseys",
    },
    {
      icon: "👥",
      title: "סגלים",
      description: "שחקנים ומאמנים שהובילו את הפועל בכל העידנים",
      href: "/squads",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">🏛️ מוזיאום הפועל הדיגיטלי</h1>
          <p className="text-xl text-red-100 mb-8">
            מוזיאום דיגיטלי כולל של הפועל - 100 שנות היסטוריה, שירים, משחקים וחזון
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/songs"
              className="bg-white text-red-600 px-8 py-3 rounded font-bold hover:bg-red-50 transition"
            >
              🎵 חזה שירים
            </Link>
            <Link
              href="/matches"
              className="bg-red-700 text-white px-8 py-3 rounded font-bold hover:bg-red-800 transition border border-white"
            >
              ⚽ ארכיון משחקים
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">מספרים מעניינים</h2>
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">מה תוכלו למצוא</h2>
          <div className="grid grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <Link
                key={i}
                href={feature.href}
                className="bg-white p-8 rounded-lg shadow hover:shadow-lg hover:translate-y-[-4px] transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <span className="text-red-600 font-bold">לחץ להמשך →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">אודות המוזיאום</h2>
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-lg text-gray-700 mb-4">
              מוזיאום הפועל הדיגיטלי הוא פרויקט מטרתו תיעוד ושימור המורשת של הפועל בירושלים.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              המוזיאום כולל ארכיון שלם של משחקים לאורך השנים, אוסף של שירי הפועל הקלאסיים,
              גלריה של חולצות ועיצובים לאורך הסיסון, וסגלים של שחקנים במאמנים שהובילו את הקבוצה.
            </p>
            <p className="text-lg text-gray-700">
              זו דרך להנציח את הזיכרון של הקבוצה הגדולה של ירושלים ולהנחיל לדורות הבאים את
              הגאווה של להיות אוהד של הפועל.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
