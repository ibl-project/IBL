"use client";

import React, { useState } from "react";
import { ScoringLandingSection } from "@/components/sections/ScoringPage/ScoringLandingSection";
import { ScoringSearchTeamSection } from "@/components/sections/ScoringPage/ScoringSearchTeamSection";
import { ScoringBoxScoreSection } from "@/components/sections/ScoringPage/ScoringBoxScoreSection";
import { Trash2, AlertTriangle, X } from "lucide-react";

type Match = {
  id: number;
  mode: "SEARCH" | "BOX_SCORE";
  team1?: string;
  team2?: string;
  players1?: any[];
  players2?: any[];
};

export default function ScoringPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeMatchId, setActiveMatchId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(1);

  // State modal konfirmasi hapus match
  const [matchToDelete, setMatchToDelete] = useState<number | null>(null);

  const handleAddMatch = () => {
    const newMatch: Match = { id: nextId, mode: "SEARCH" };
    setMatches([...matches, newMatch]);
    setActiveMatchId(nextId);
    setNextId(nextId + 1);
  };

  const handleRequestRemoveMatch = (id: number) => {
    setMatchToDelete(id);
  };

  const handleConfirmRemoveMatch = () => {
    if (matchToDelete === null) return;

    const id = matchToDelete;
    const newMatches = matches.filter((m) => m.id !== id);
    setMatches(newMatches);

    if (newMatches.length === 0) {
      setNextId(1);
    }
    if (activeMatchId === id) {
      setActiveMatchId(newMatches.length > 0 ? newMatches[newMatches.length - 1].id : null);
    }

    setMatchToDelete(null);
  };

  const handleCreateMatch = (
    team1: string,
    team2: string,
    players1: any[],
    players2: any[]
  ) => {
    setMatches(
      matches.map((m) => {
        if (m.id === activeMatchId) {
          return {
            ...m,
            mode: "BOX_SCORE",
            team1,
            team2,
            players1,
            players2,
          };
        }
        return m;
      })
    );
  };

  const activeMatch = matches.find((m) => m.id === activeMatchId);
  const matchIndexToDelete =
    matchToDelete !== null
      ? matches.findIndex((m) => m.id === matchToDelete) + 1
      : 1;

  return (
    <div className="bg-[#e1e7ea] min-h-screen w-full px-6 py-6 md:px-[46px] font-poppins relative">
      {matches.length === 0 ? (
        <ScoringLandingSection onAddScoring={handleAddMatch} />
      ) : activeMatch?.mode === "BOX_SCORE" ? (
        <ScoringBoxScoreSection
          matches={matches}
          activeMatchId={activeMatchId}
          onAddScoring={handleAddMatch}
          onRemoveMatch={handleRequestRemoveMatch}
          onSelectMatch={setActiveMatchId}
          team1={activeMatch.team1!}
          team2={activeMatch.team2!}
          players1={activeMatch.players1!}
          players2={activeMatch.players2!}
        />
      ) : (
        <ScoringSearchTeamSection
          matches={matches}
          activeMatchId={activeMatchId}
          onAddScoring={handleAddMatch}
          onRemoveMatch={handleRequestRemoveMatch}
          onSelectMatch={setActiveMatchId}
          onCreate={handleCreateMatch}
          onBack={() => {
            if (activeMatchId) {
              handleRequestRemoveMatch(activeMatchId);
            }
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* MODAL: Konfirmasi Hapus Match */}
      {/* ========================================================================= */}
      {matchToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center relative animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setMatchToDelete(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mt-2 shadow-xs">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Hapus Match {matchIndexToDelete}?
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus Match {matchIndexToDelete}? Data scoring dan pemain pada pertandingan ini akan dihapus secara permanen.
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                onClick={() => setMatchToDelete(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmRemoveMatch}
                className="flex-1 py-2.5 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition-colors cursor-pointer"
              >
                Hapus Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
