"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

/**
 * DashboardLayout
 *
 * Layout wrapper bersama untuk halaman-halaman dashboard (Teams, Scoring, dll).
 * Menggabungkan:
 * 1. DashboardSidebar fixed full-height di sisi kiri dengan transisi width (w-64 <-> w-0)
 * 2. DashboardTopbar di sisi atas yang mengambil sisa lebar
 * 3. Main content ({children}) yang otomatis melebar ketika sidebar ditutup (tanpa scroll horizontal)
 */
export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Auto-collapse pada viewport mobile saat inisialisasi
  useEffect(() => {
    const width =
      window.innerWidth || document.documentElement.clientWidth || 0;
    if (width > 0 && width < 1024) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  return (
    <div
      id="dashboard-layout"
      className="min-h-screen flex bg-slate-50 font-poppins relative overflow-x-hidden"
    >
      {/* 1. Sidebar Navigasi Fixed Full-Height */}
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* 2. Konten Utama (Topbar + Halaman) - Transisi margin-left smooth mengikuti sidebar */}
      <div
        id="dashboard-main-area"
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-[margin] duration-300 ease-in-out ${
          isSidebarCollapsed ? "ml-0" : "ml-0 lg:ml-64"
        }`}
      >
        <DashboardTopbar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};

