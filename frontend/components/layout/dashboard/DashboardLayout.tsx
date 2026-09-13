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
    <div id="dashboard-layout">
      {/* 1. Sidebar Navigasi */}
      <DashboardSidebar />

      {/* 2. Konten Utama (Topbar + Halaman) */}
      <div id="dashboard-main-area">
        <DashboardTopbar />
        <main>{children}</main>
      </div>
    </div>
  );
};
