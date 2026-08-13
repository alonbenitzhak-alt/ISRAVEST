"use client";

import { useState } from "react";

interface Player {
  name: string;
  position: string;
  number: number;
}

interface Squad {
  id: string;
  season: number;
  coach: string;
  players: Player[];
}

const squads: Squad[] = [
  {
    id: "1",
    season: 2023,
    coach: "ודים שייטנברג",
    players: [
      { name: "גיא טקה", position: "שוער", number: 1 },
      { name: "טלי בן", position: "בחזית", number: 3 },
      { name: "יבגני גולברג", position: "בחזית", number: 13 },
      { name: "יונתן טל", position: "קשר", number: 5 },
      { name: "דוד מדז'יצי", position: "קשר", number: 20 },
      { name: "דן פנג", position: "הגנה", number: 4 },
      { name: "סנטגו לומאס", position: "הגנה", number: 2 },
      { name: "נואל מוני", position: "הגנה", number: 6 },
      { name: "קנאן ברייקט", position: "קשר", number: 23 },
      { name: "אילי אלמלח", position: "בחזית", number: 11 },
      { name: "דקל כהן", position: "בחזית", number: 17 },
    ],
  },
  {
    id: "2",
    season: 2022,
    coach: "פאבול אינגור",
    players: [
      { name: "גיא טקה", position: "שוער", number: 1 },
      { name: "סנטיאגו לומאס", position: "הגנה", number: 2 },
      { name: "טלי בן", position: "בחזית", number: 3 },
      { name: "יונתן טל", position: "קשר", number: 5 },
      { name: "איתן הדרי", position: "קשר", number: 8 },
      { name: "טלי ברקוביץ", position: "בחזית", number: 11 },
      { name: "דוד מדז'יצי", position: "קשר", number: 20 },
      { name: "יבגני גולברג", position: "בחזית", number: 13 },
      { name: "דן פנג", position: "הגנה", number: 4 },
      { name: "דודו צ'ופו", position: "בחזית", number: 9 },
    ],
  },
  {
    id: "3",
    season: 2020,
    coach: "ירון קלינקוביץ",
    players: [
      { name: "גיא טקה", position: "שוער", number: 1 },
      { name: "אורן ניסים", position: "הגנה", number: 2 },
      { name: "טלי בן", position: "הגנה", number: 3 },
      { name: "ירון גולברג", position: "קשר", number: 4 },
      { name: "פיני בודו", position: "קשר", number: 5 },
      { name: "דודו צ'ופו", position: "בחזית", number: 9 },
      { name: "דרור פריאור", position: "בחזית", number: 10 },
      { name: "שחר טיטי", position: "בחזית", number: 7 },
      { name: "איתן מקבי", position: "קשר", number: 6 },
      { name: "בר סלום", position: "הגנה", number: 30 },
    ],
  },
  {
    id: "4",
    season: 2018,
    coach: "פטריק אולסן",
    players: [
      { name: "גיא טקה", position: "שוער", number: 1 },
      { name: "אורן ניסים", position: "הגנה", number: 2 },
      { name: "רנאן רובך", position: "הגנה", number: 3 },
      { name: "אהוד זמורה", position: "קשר", number: 4 },
      { name: "דוד בן-אדם", position: "קשר", number: 5 },
      { name: "יוסי ליברמן", position: "בחזית", number: 7 },
      { name: "דודו צ'ופו", position: "בחזית", number: 9 },
      { name: "עמי רסקו", position: "בחזית", number: 11 },
      { name: "גיא זוקרמן", position: "קשר", number: 8 },
      { name: "פיני בודו", position: "קשר", number: 6 },
    ],
  },
];

export default function SquadsPage() {
  const [selectedSeason, setSelectedSeason] = useState<number>(squads[0].season);
  const squad = squads.find((s) => s.season === selectedSeason);

  const positions = ["שוער", "הגנה", "קשר", "בחזית"];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">👥 סגלי הפועל</h1>
          <p className="text-red-100">שחקנים ומאמנים לאורך השנים</p>
        </div>
      </section>

      <div className="container py-12">
        {/* Season Selector */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {squads.map((s) => (
            <button
              key={s.season}
              onClick={() => setSelectedSeason(s.season)}
              className={`px-6 py-3 rounded font-bold transition ${
                selectedSeason === s.season
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              עונת {s.season}/{s.season + 1}
            </button>
          ))}
        </div>

        {squad && (
          <>
            {/* Coach Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-bold mb-2">🎯 מאמן</h2>
              <p className="text-4xl font-bold">{squad.coach}</p>
            </div>

            {/* Players by Position */}
            {positions.map((position) => {
              const playersInPosition = squad.players.filter(
                (p) => p.position === position
              );
              if (playersInPosition.length === 0) return null;

              return (
                <div key={position} className="mb-12">
                  <h3 className="text-2xl font-bold mb-4">{position}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {playersInPosition.map((player, i) => (
                      <div
                        key={i}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                            {player.number}
                          </div>
                          <span className="text-gray-500 text-sm">
                            #{player.number}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold">{player.name}</h4>
                        <p className="text-gray-600">{player.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Stats */}
        {squad && (
          <div className="bg-gray-50 p-8 rounded-lg mt-12">
            <h3 className="text-2xl font-bold mb-6">📊 סטטיסטיקות</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded text-center">
                <div className="text-3xl font-bold text-red-600">
                  {squad.players.length}
                </div>
                <div className="text-gray-600">שחקנים</div>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {squad.players.filter((p) => p.position === "שוער").length}
                </div>
                <div className="text-gray-600">שוערים</div>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <div className="text-3xl font-bold text-green-600">
                  {squad.players.filter((p) => p.position === "הגנה").length}
                </div>
                <div className="text-gray-600">הגנה</div>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {
                    squad.players.filter(
                      (p) => p.position === "קשר" || p.position === "בחזית"
                    ).length
                  }
                </div>
                <div className="text-gray-600">התקפה</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
