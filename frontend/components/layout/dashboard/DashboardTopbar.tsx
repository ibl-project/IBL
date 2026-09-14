import React from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

/**
 * DashboardTopbar
 *
 * Catatan untuk staff:
 * - Komponen topbar navigasi atas untuk halaman dashboard.
 */
export const DashboardTopbar = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  return (
    <header className="w-full flex items-center justify-between px-4 md:px-12 pt-6 md:pt-8 pb-2">
      {/* 1. Tombol Toggle Sidebar Mobile */}
      <div className="flex items-center md:hidden">
        <button 
          type="button" 
          aria-label="Toggle menu" 
          onClick={onOpenSidebar}
          className="p-1 text-gray-700 hover:bg-black/5 rounded-lg transition-colors"
        >
          <Menu size={28} />
        </button>
      </div>
      
      {/* Spacer for desktop since toggle is hidden */}
      <div className="hidden md:block"></div>

      {/* 2. User Profile Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image 
            src="/images/LOGO_1.svg" 
            alt="Role Logo" 
            fill 
            className="object-contain drop-shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#4A5568] text-lg leading-tight">Damen</span>
          <span className="text-sm text-gray-500 font-medium leading-tight">IBL 2K26</span>
        </div>
      </div>
    </header>
  );
};
