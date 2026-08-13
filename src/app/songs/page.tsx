"use client";

import { useState } from "react";
import Link from "next/link";

interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  lyrics: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
}

const songs: Song[] = [
  {
    id: "1",
    title: "אדום לבן וכחול",
    artist: "אלי לנדאו",
    year: 1980,
    lyrics: "אדום לבן וכחול\nלבבות לוהטים כשמש\nהפועל קדימה\nלנצחון תמיד...",
    youtubeUrl: "https://youtube.com",
  },
  {
    id: "2",
    title: "ירושלים של הפועל",
    artist: "הקבוצה",
    year: 1990,
    lyrics: "בירושלים עיר הקודש\nשם הפועל שורר\nהאדום הלבן וכחול\nמרומזים בלבנו...",
  },
  {
    id: "3",
    title: "הקבוצה שלנו",
    artist: "אוהדים",
    year: 2000,
    lyrics: "הקבוצה שלנו היא הטובה\nהפועל בירושלים\nנלך עם הקבוצה\nלנצחון תמיד...",
  },
  {
    id: "4",
    title: "אל התאודור",
    artist: "מילדות",
    year: 2010,
    lyrics: "אל התאודור\nהר הזיתון\nהפועל בחזית\nהקרב התמיד...",
  },
  {
    id: "5",
    title: "חושקים בה",
    artist: "המילדה",
    year: 2015,
    lyrics: "חושקים בה קבוצה\nהפועל שלנו\nהכל בשביל הנצחון\nבירושלים של הפועל...",
  },
  {
    id: "6",
    title: "שיר הבניית",
    artist: "ספקים חדשים",
    year: 2020,
    lyrics: "מהרחובות של ירושלים\nעד לאצטדיון גדול\nהפועל בנו מלובבים\nלנצחון תמיד כל אחד...",
  },
];

export default function SongsPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const years = Array.from(new Set(songs.map((s) => s.year))).sort();
  const filteredSongs = selectedYear
    ? songs.filter((s) => s.year === selectedYear)
    : songs;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">🎵 שירי הפועל</h1>
          <p className="text-red-100">אוסף מושלם של שירי הפועל לאורך השנים</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Sidebar - Years Filter */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow sticky top-20">
              <h3 className="text-lg font-bold mb-4">סינון לפי שנה</h3>
              <button
                onClick={() => setSelectedYear(null)}
                className={`w-full text-right py-2 px-3 rounded mb-2 transition ${
                  selectedYear === null
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                הכל ({songs.length})
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`w-full text-right py-2 px-3 rounded mb-2 transition ${
                    selectedYear === year
                      ? "bg-red-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {year} ({songs.filter((s) => s.year === year).length})
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            {selectedSong && (
              <div className="bg-white p-8 rounded-lg shadow mb-8">
                <button
                  onClick={() => setSelectedSong(null)}
                  className="text-red-600 font-bold mb-4"
                >
                  ← חזור
                </button>
                <h2 className="text-3xl font-bold mb-2">{selectedSong.title}</h2>
                <p className="text-gray-600 mb-4">
                  {selectedSong.artist} • {selectedSong.year}
                </p>
                <div className="whitespace-pre-line text-gray-700 mb-6 font-hebrew">
                  {selectedSong.lyrics}
                </div>
                <div className="flex gap-4">
                  {selectedSong.youtubeUrl && (
                    <a
                      href={selectedSong.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
                    >
                      ▶ YouTube
                    </a>
                  )}
                  {selectedSong.spotifyUrl && (
                    <a
                      href={selectedSong.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition"
                    >
                      🎵 Spotify
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {filteredSongs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:translate-y-[-2px] transition text-right"
                >
                  <h3 className="text-xl font-bold mb-1">{song.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {song.artist} • {song.year}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {song.lyrics.split("\n")[0]}...
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
