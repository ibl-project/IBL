"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  X, 
  LayoutDashboard, 
  History, 
  Map, 
  BarChart2, 
  LogOut 
} from "lucide-react";

/**
 * DashboardSidebar
 *
 * Catatan untuk staff:
 * - Komponen sidebar kiri untuk dashboard (Photo 1 s/d Photo 5).
 */
export const DashboardSidebar = () => {
  const pathname = usePathname();

  const isRouteActive = (route: string) => {
    return pathname === route;
  };

  return (
    <aside className="w-[280px] bg-[#389F9D] flex flex-col h-full text-white shrink-0 shadow-xl z-20">
      {/* 1. Header Logo IBL 2K26 */}
      <div className="flex items-center justify-between px-6 py-8">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Close menu" className="md:hidden">
            <X size={24} className="text-white hover:opacity-80 transition" />
          </button>
          <div className="hidden md:block">
            <X size={24} className="text-white hover:opacity-80 transition cursor-pointer" />
          </div>
          
          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 relative shrink-0">
               <Image src="/images/LOGO_1.svg" alt="IBL Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-xl tracking-wide uppercase">IBL 2K26</span>
          </div>
        </div>
      </div>

      {/* 2. Menu Navigasi */}
      <nav className="flex-1 overflow-y-auto mt-4 flex flex-col gap-8">
        {/* Group MAIN */}
        <div className="px-6">
          <p className="text-xs font-bold mb-3 tracking-wider text-white/90">MAIN</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link 
                href="/teams"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isRouteActive("/teams") 
                    ? "bg-white/20 font-semibold" 
                    : "hover:bg-white/10"
                }`}
              >
                <LayoutDashboard size={20} className={isRouteActive("/teams") ? "text-white" : "text-white/80"} />
                <span className="text-sm">Teams</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Group DAMEN */}
        <div className="px-6">
          <p className="text-xs font-bold mb-3 tracking-wider text-white/90">DAMEN</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link 
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isRouteActive("#") 
                    ? "bg-white/20 font-semibold" 
                    : "hover:bg-white/10"
                }`}
              >
                <History size={20} className="text-white/80" />
                <span className="text-sm">Schedule Result</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isRouteActive("#") 
                    ? "bg-white/20 font-semibold" 
                    : "hover:bg-white/10"
                }`}
              >
                <Map size={20} className="text-white/80" />
                <span className="text-sm">Playoff</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Group EVENT */}
        <div className="px-6">
          <p className="text-xs font-bold mb-3 tracking-wider text-white/90">EVENT</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link 
                href="/scoring"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isRouteActive("/scoring") 
                    ? "bg-white/20 font-semibold" 
                    : "hover:bg-white/10"
                }`}
              >
                <BarChart2 size={20} className={isRouteActive("/scoring") ? "text-white" : "text-white/80"} />
                <span className="text-sm">Scoring</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 3. Tombol Logout */}
      <div className="p-6 mt-auto">
        <button 
          type="button" 
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-white/10 transition-colors text-left"
        >
          <LogOut size={20} className="text-white/80" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
