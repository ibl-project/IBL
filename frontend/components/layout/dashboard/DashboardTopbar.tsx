import React from "react";

/**
 * DashboardTopbar
 *
 * Catatan untuk staff:
 * - Komponen topbar navigasi atas untuk halaman dashboard (Photo 1 s/d Photo 5).
 * - Berisi:
 *   1. Tombol toggle menu untuk mobile (opsional)
 *   2. Profil pengguna di kanan atas (Avatar, nama role misal "Damen" atau "Event", dan "IBL 2K26")
 */
export const DashboardTopbar = () => {
  return (
    <header>
      {/* 1. Tombol Toggle Sidebar Mobile */}
      <div>
        <button type="button" aria-label="Toggle menu">
          ☰
        </button>
      </div>

      {/* 2. User Profile Info */}
      <div>
        <div>
          <span>Damen</span>
          <span>IBL 2K26</span>
        </div>
        <div>
          <span>Avatar</span>
        </div>
      </div>
    </header>
  );
};
