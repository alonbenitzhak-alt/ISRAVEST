"use client";

import { useState } from "react";

interface Jersey {
  id: string;
  season: number;
  design: string;
  colors: string;
  description: string;
  image?: string;
  manufacturer?: string;
}

const jerseys: Jersey[] = [
  {
    id: "1",
    season: 2023,
    design: "אדום מלא",
    colors: "אדום, לבן",
    description: "חולצה כלאסית אדומה עם פסים לבנים",
    manufacturer: "ספורטיה",
  },
  {
    id: "2",
    season: 2022,
    design: "אדום עם שחור",
    colors: "אדום, שחור",
    description: "עיצוב מודרני עם פרטים שחורים",
    manufacturer: "ספורטיה",
  },
  {
    id: "3",
    season: 2020,
    design: "אדום ולבן חלוקה",
    colors: "אדום, לבן",
    description: "חולצה עם חלוקה אנכית",
    manufacturer: "אדידס",
  },
  {
    id: "4",
    season: 2018,
    design: "אדום נקי",
    colors: "אדום",
    description: "עיצוב קלאסי וטהור",
    manufacturer: "אדידס",
  },
  {
    id: "5",
    season: 2015,
    design: "אדום עם צהוב",
    colors: "אדום, צהוב",
    description: "עיצוב נוסטלגי מהשנות 90",
    manufacturer: "ריבוק",
  },
  {
    id: "6",
    season: 2010,
    design: "אדום וזהב",
    colors: "אדום, זהב",
    description: "עיצוב מיוחד לאתגרים בינלאומיים",
    manufacturer: "ריבוק",
  },
];

export default function JerseysPage() {
  const [selectedJersey, setSelectedJersey] = useState<Jersey | null>(null);

  const decades = [
    { name: "2020s", years: [2023, 2022, 2020] },
    { name: "2010s", years: [2018, 2015] },
    { name: "2010", years: [2010] },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">👕 ארכיון חולצות</h1>
          <p className="text-red-100">גלריה של חולצות הפועל לאורך השנים</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Sidebar */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow sticky top-20">
              <h3 className="text-lg font-bold mb-4">לפי תקופה</h3>
              {decades.map((decade, i) => (
                <div key={i} className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-2">{decade.name}</h4>
                  {decade.years.map((year) => {
                    const count = jerseys.filter((j) => j.season === year).length;
                    return (
                      <button
                        key={year}
                        className="w-full text-right py-1 px-3 text-sm hover:bg-gray-100 rounded transition"
                      >
                        {year} ({count})
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            {selectedJersey && (
              <div className="bg-white p-8 rounded-lg shadow mb-8">
                <button
                  onClick={() => setSelectedJersey(null)}
                  className="text-red-600 font-bold mb-4"
                >
                  ← חזור
                </button>

                <div className="grid grid-cols-2 gap-8">
                  {/* Image Placeholder */}
                  <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-6xl">👕</div>
                  </div>

                  {/* Details */}
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      עונת {selectedJersey.season}
                    </h2>
                    <p className="text-gray-600 mb-6">{selectedJersey.design}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-700">עיצוב</h4>
                        <p className="text-gray-600">
                          {selectedJersey.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-700">צבעים</h4>
                        <p className="text-gray-600">{selectedJersey.colors}</p>
                      </div>

                      {selectedJersey.manufacturer && (
                        <div>
                          <h4 className="font-bold text-gray-700">יצרן</h4>
                          <p className="text-gray-600">
                            {selectedJersey.manufacturer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedJersey && (
              <>
                <h2 className="text-2xl font-bold mb-6">כל החולצות</h2>
                <div className="grid grid-cols-2 gap-6">
                  {jerseys.map((jersey) => (
                    <button
                      key={jersey.id}
                      onClick={() => setSelectedJersey(jersey)}
                      className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:translate-y-[-2px] transition text-right"
                    >
                      <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mb-4">
                        <div className="text-5xl">👕</div>
                      </div>
                      <h3 className="text-lg font-bold mb-1">
                        עונת {jersey.season}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {jersey.design}
                      </p>
                      <p className="text-gray-500 text-xs">{jersey.colors}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
