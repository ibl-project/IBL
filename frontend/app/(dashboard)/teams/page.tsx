import React from "react";
import { TeamsLandingSection } from "@/components/sections/TeamsPage/TeamsLandingSection";
import { TeamDetailSection } from "@/components/sections/TeamsPage/TeamDetailSection";
import { TeamEditSection } from "@/components/sections/TeamsPage/TeamEditSection";

/**
 * Teams Page
 * Path: /teams
 *
 * Catatan untuk staff:
 * Halaman ini menyusun komponen-komponen section Teams:
 * 1. TeamsLandingSection: Tampilan awal grid logo tim & search (Photo 1)
 * 2. TeamDetailSection: Tampilan detail statistik tim setelah logo diklik (Photo 3)
 * 3. TeamEditSection: Tampilan form edit statistik tim & pemain (Photo 3 Edit)
 *
 * Staff dapat mengatur conditional rendering (state / tab) atau alur navigasi antar section di sini.
 */
export default function TeamsPage() {
  return (
    <div>
      {/* 1. Landing Teams (Photo 1) */}
      <TeamsLandingSection />

      {/* 2. Detail Teams (Photo 3) */}
      <TeamDetailSection />

      {/* 3. Edit Detail Teams (Photo 3 Mode Edit) */}
      <TeamEditSection />
    </div>
  );
}
