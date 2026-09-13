import React from "react";
import Link from "next/link";

/**
 * DashboardSidebar
 *
 * Catatan untuk staff:
 * - Komponen sidebar kiri untuk dashboard (Photo 1 s/d Photo 5).
 * - Berisi:
 *   1. Logo & teks IBL 2K26 (serta tombol close untuk mobile)
 *   2. Menu navigasi:
 *      - MAIN: Teams (link ke /teams)
 *      - DAMEN: Schedule Result, Playoff
 *      - EVENT: Scoring (link ke /scoring)
 *   3. Tombol Logout di bagian paling bawah
 */
export const DashboardSidebar = () => {
  return (
    <aside>
      {/* 1. Header Logo IBL 2K26 */}
      <div>
        <span>IBL 2K26</span>
      </div>

      {/* 2. Menu Navigasi */}
      <nav>
        {/* Group MAIN */}
        <div>
          <p>MAIN</p>
          <ul>
            <li>
              <Link href="/teams">Teams</Link>
            </li>
          </ul>
        </div>

        {/* Group DAMEN */}
        <div>
          <p>DAMEN</p>
          <ul>
            <li>
              <Link href="#">Schedule Result</Link>
            </li>
            <li>
              <Link href="#">Playoff</Link>
            </li>
          </ul>
        </div>

        {/* Group EVENT */}
        <div>
          <p>EVENT</p>
          <ul>
            <li>
              <Link href="/scoring">Scoring</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 3. Tombol Logout */}
      <div>
        <button type="button">Logout</button>
      </div>
    </aside>
  );
};
