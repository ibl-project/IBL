import React from "react";
import { ScoringLandingSection } from "@/components/sections/ScoringPage/ScoringLandingSection";
import { ScoringSearchTeamSection } from "@/components/sections/ScoringPage/ScoringSearchTeamSection";
import { ScoringBoxScoreSection } from "@/components/sections/ScoringPage/ScoringBoxScoreSection";
import { ScoringEditSection } from "@/components/sections/ScoringPage/ScoringEditSection";

/**
 * Scoring Page
 * Path: /scoring
 *
 * Catatan untuk staff:
 * Halaman ini menyusun komponen-komponen section Scoring:
 * 1. ScoringLandingSection: Tampilan awal "Belum ada scoring" & tombol "+ Add Scoring" (Photo 4)
 * 2. ScoringSearchTeamSection: Tampilan cari Tim 1 vs Tim 2 setelah menekan Add Scoring (Photo 5)
 * 3. ScoringBoxScoreSection: Tampilan live box score tabel setelah kedua tim dipilih (Photo 2)
 * 4. ScoringEditSection: Tampilan mode edit skor manual (Photo 2 Mode Edit)
 *
 * Staff dapat mengatur alur pergantian antar section (state / conditional rendering) di sini.
 */
export default function ScoringPage() {
  return (
    <div>
      {/* 1. Landing Scoring (Photo 4) */}
      <ScoringLandingSection />

      {/* 2. Search Team 1 vs Team 2 (Photo 5) */}
      <ScoringSearchTeamSection />

      {/* 3. Live Box Score Table (Photo 2) */}
      <ScoringBoxScoreSection />

      {/* 4. Edit Box Score (Photo 2 Mode Edit) */}
      <ScoringEditSection />
    </div>
  );
}
