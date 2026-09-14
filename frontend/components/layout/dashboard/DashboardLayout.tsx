"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#E3EDE8] overflow-hidden font-sans">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 1. Sidebar Navigasi */}
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 2. Konten Utama (Topbar + Halaman) */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardTopbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 px-4 md:px-12 pb-8 md:pb-12 pt-0">{children}</main>
      </div>
    </div>
  );
};
