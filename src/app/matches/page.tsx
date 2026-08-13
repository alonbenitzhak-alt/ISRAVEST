"use client";

import { useState } from "react";

interface Match {
  id: string;
  date: string;
  opponent: string;
  hapoel: number;
  opponent_score: number;
  competition: string;
  season: number;
  notes?: string;
}

const matches: Match[] = [
  {
    id: "1",
    date: "2024-01-15",
    opponent: "מכבי תא",
    hapoel: 2,
    opponent_score: 1,
    competition: "ליגה",
    season: 2023,
    notes: "ניצחון משכנע בדרבי",
  },
  {
    id: "2",
    date: "2024-01-08",
    opponent: "בית"ר",
    hapoel: 1,
    opponent_score: 1,
    competition: "ליגה",
    season: 2023,
    notes: "תיקו בעיר הקודש",
  },
  {
    id: "3",
    date: "2023-12-20",
    opponent: "הפועל באר שבע",
    hapoel: 3,
    opponent_score: 0,
    competition: "ליגה",
    season: 2023,
    notes: "ניצחון חד משמעי",
  },
  {
    id: "4",
    date: "2023-12-10",
    opponent: "מ.ס אשדוד",
    hapoel: 2,
    opponent_score: 1,
    competition: "גביע",
    season: 2023,
    notes: "התקדמות בגביע",
  },
  {
    id: "5",
    date: "2023-11-25",
    opponent: "מכבי חיפה",
    hapoel: 0,
    opponent_score: 2,
    competition: "ליגה",
    season: 2023,
  },
  {
    id: "6",
    date: "2023-11-15",
    opponent: "הפועל קריית שמונה",
    hapoel: 4,
    opponent_score: 0,
    competition: "ליגה",
    season: 2023,
    notes: "ניצחון משימפוני",
  },
];

export default function MatchesPage() {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const seasons = Array.from(new Set(matches.map((m) => m.season))).sort(
    (a, b) => b - a
  );
  const filteredMatches = selectedSeason
    ? matches.filter((m) => m.season === selectedSeason)
    : matches;

  const getResult = (match: Match) => {
    if (match.hapoel > match.opponent_score) return "W";
    if (match.hapoel < match.opponent_score) return "L";
    return "D";
  };

  const getResultColor = (match: Match) => {
    if (match.hapoel > match.opponent_score)
      return "bg-green-100 text-green-800";
    if (match.hapoel < match.opponent_score) return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">⚽ ארכיון משחקים</h1>
          <p className="text-red-100">כל משחקי הפועל לאורך השנים</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Statistics Cards */}
          <div className="col-span-4">
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-green-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">
                  {matches.filter((m) => m.hapoel > m.opponent_score).length}
                </div>
                <div className="text-gray-700">ניצחונות</div>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-yellow-700">
                  {matches.filter((m) => m.hapoel === m.opponent_score).length}
                </div>
                <div className="text-gray-700">תיקוים</div>
              </div>
              <div className="bg-red-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-700">
                  {matches.filter((m) => m.hapoel < m.opponent_score).length}
                </div>
                <div className="text-gray-700">הפסדים</div>
              </div>
              <div className="bg-blue-100 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-700">
                  {matches.reduce((sum, m) => sum + m.hapoel, 0)}
                </div>
                <div className="text-gray-700">שערים</div>
              </div>
            </div>
          </div>

          {/* Sidebar - Season Filter */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow sticky top-20">
              <h3 className="text-lg font-bold mb-4">סינון לפי עונה</h3>
              <button
                onClick={() => setSelectedSeason(null)}
                className={`w-full text-right py-2 px-3 rounded mb-2 transition ${
                  selectedSeason === null
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                הכל ({matches.length})
              </button>
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`w-full text-right py-2 px-3 rounded mb-2 transition ${
                    selectedSeason === season
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {season}/{season + 1} ({matches.filter((m) => m.season === season).length})
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3">
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => setSelectedMatch(match)}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:translate-y-[-2px] transition w-full text-right"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded font-bold ${getResultColor(match)}`}>
                      {getResult(match)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(match.date).toLocaleDateString("he-IL")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl font-bold">
                      {match.hapoel} - {match.opponent_score}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{match.opponent}</h3>
                      <p className="text-gray-500 text-sm">{match.competition}</p>
                    </div>
                  </div>

                  {match.notes && (
                    <p className="text-gray-600 text-sm mt-2">{match.notes}</p>
                  )}
                </button>
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="bg-gray-100 p-12 rounded-lg text-center text-gray-600">
                לא נמצאו משחקים לעונה זו
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
