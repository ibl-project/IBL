"use client";

import React, { useState } from "react";
import { ScoringLandingSection } from "@/components/sections/ScoringPage/ScoringLandingSection";
import { ScoringSearchTeamSection } from "@/components/sections/ScoringPage/ScoringSearchTeamSection";
import { ScoringBoxScoreSection } from "@/components/sections/ScoringPage/ScoringBoxScoreSection";

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

  const handleAddMatch = () => {
    const newMatch: Match = { id: nextId, mode: "SEARCH" };
    setMatches([...matches, newMatch]);
    setActiveMatchId(nextId);
    setNextId(nextId + 1);
  };

  const handleRemoveMatch = (id: number) => {
    const newMatches = matches.filter(m => m.id !== id);
    setMatches(newMatches);
    if (newMatches.length === 0) {
      setNextId(1);
    }
    if (activeMatchId === id) {
      setActiveMatchId(newMatches.length > 0 ? newMatches[newMatches.length - 1].id : null);
    }
  };

  const handleCreateMatch = (team1: string, team2: string, players1: any[], players2: any[]) => {
    setMatches(matches.map(m => {
      if (m.id === activeMatchId) {
        return {
          ...m,
          mode: "BOX_SCORE",
          team1,
          team2,
          players1,
          players2
        };
      }
      return m;
    }));
  };

  const activeMatch = matches.find(m => m.id === activeMatchId);

  return (
    <div className="bg-[#e1e7ea] min-h-screen w-full px-6 py-6 md:px-[46px]">
      {matches.length === 0 ? (
        <ScoringLandingSection onAddScoring={handleAddMatch} />
      ) : activeMatch?.mode === "BOX_SCORE" ? (
        <ScoringBoxScoreSection 
          matches={matches}
          activeMatchId={activeMatchId}
          onAddScoring={handleAddMatch}
          onRemoveMatch={handleRemoveMatch}
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
          onRemoveMatch={handleRemoveMatch}
          onSelectMatch={setActiveMatchId}
          onCreate={handleCreateMatch}
        />
      )}
    </div>
  );
}
