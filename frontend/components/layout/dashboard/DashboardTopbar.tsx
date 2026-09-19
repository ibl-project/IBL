import React from "react";

interface DashboardTopbarProps {
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

/**
 * DashboardTopbar
 *
 * Komponen topbar navigasi atas untuk halaman dashboard.
 * Berisi:
 * 1. Tombol toggle menu (tampil ketika sidebar collapsed untuk membuka kembali)
 * 2. Profil pengguna di kanan atas (Role "Damen", "IBL 2K26", dan Avatar)
 */
export const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
  isSidebarCollapsed = false,
  onToggleSidebar,
}) => {
  return (
    <>
      <header
        className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between font-poppins z-30 transition-[left] duration-300 ease-in-out ${
          isSidebarCollapsed ? "left-0" : "left-0 lg:left-64"
        }`}
      >
        {/* 1. Tombol Toggle Buka Sidebar (Tampil saat sidebar ditutup) */}
        <div className="flex items-center gap-3">
          {isSidebarCollapsed && (
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Buka menu sidebar"
              title="Buka menu sidebar"
              className="p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-hidden cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* 2. User Profile Info */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-800 leading-tight">
              Damen
            </span>
            <span className="text-xs text-gray-500 leading-tight">IBL 2K26</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow-xs select-none">
            D
          </div>
        </div>
      </header>

      {/* Spacer elemen setinggi h-16 agar posisi konten di bawahnya tidak bergeser atau tertutup header */}
      <div className="h-16 w-full shrink-0" aria-hidden="true" />
    </>
  );
};
