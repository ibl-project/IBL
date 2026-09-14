import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

/**
 * DashboardLayout
 *
 * Catatan untuk staff:
 * - Layout wrapper bersama untuk halaman-halaman dashboard (Teams, Scoring, dll).
 * - Menggabungkan:
 *   1. DashboardSidebar di sisi kiri
 *   2. DashboardTopbar di sisi atas
 *   3. Main content ({children}) di area tengah/konten utama
 *
 * Staff dapat menerapkan styling flex/grid, responsive drawer, dan warna latar di sini.
 */
export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen w-full bg-[#E3EDE8] overflow-hidden font-sans">
      {/* 1. Sidebar Navigasi */}
      <DashboardSidebar />

      {/* 2. Konten Utama (Topbar + Halaman) */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardTopbar />
        <main className="flex-1 px-8 md:px-12 pb-8 md:pb-12 pt-0">{children}</main>
      </div>
    </div>
  );
};
