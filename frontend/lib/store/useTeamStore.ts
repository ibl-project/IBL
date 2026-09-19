import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * ============================================================================
 * CATATAN ARSITEKTUR & PENGEMBANGAN:
 * ============================================================================
 * Middleware `persist` (localStorage) di bawah ini digunakan SEMENTARA untuk
 * kebutuhan pengujian (test case), simulasi konsistensi data antar-halaman (Teams & Scoring),
 * serta prototyping di sisi Frontend tanpa ketergantungan server.
 *
 * KETIKA BACKEND & DATABASE SUDAH TERHUBUNG:
 * 1. Hapus middleware `persist` dan storage localStorage ini.
 * 2. Store Zustand ini cukup difungsikan sebagai caching client-state atau cukup fetch data
 *    langsung menggunakan TanStack Query / SWR / Server Components.
 * 3. Aksi save / edit (updateTeam, updatePlayers, dsb) nantinya akan memanggil REST/GraphQL API
 *    (e.g., PUT /api/teams/:id) untuk persistensi langsung ke Database.
 * ============================================================================
 */

export interface PlayerStats {
  game: string;
  point: string;
  assist: string;
  rebound: string;
  ppg: string;
  apg: string;
  rpg: string;
  fgPercent: string;
  threePPercent: string;
  twoPPercent: string;
  ftPercent: string;
}

export interface Player {
  id: number;
  name: string;
  nopung?: string;
  isCaptain?: boolean;
  stats: PlayerStats;
}

export interface TeamStats {
  G: string;
  W: string;
  L: string;
  PM: string;
  PA: string;
  PD: string;
  PTS: string;
}

export interface Team {
  id: string;
  name: string;
  group: string;
  logo: string;
  teamStats: TeamStats;
  players: Player[];
}

interface TeamState {
  teams: Team[];
  // Actions
  updateTeam: (teamId: string, updatedData: Partial<Team>) => void;
  updateTeamStats: (teamId: string, stats: TeamStats) => void;
  updatePlayers: (teamId: string, players: Player[]) => void;
  getTeamById: (teamId: string) => Team | undefined;
  getTeamByName: (teamName: string) => Team | undefined;
  resetToDefault: () => void;
}

const DEFAULT_INDONESIAN_NAMES = [
  "Budi Santoso",
  "Agus Setiawan",
  "Rizky Aditya",
  "Ahmad Fauzi",
  "Dimas Pratama",
  "Reza Rahadian",
  "Dika Saputra",
  "Wahyu Hidayat",
  "Ilham Akbar",
  "Kevin Sanjaya",
  "Bagas Maulana",
  "Putra Andika",
  "Irfan Kurniawan",
  "Hendra Setiawan",
  "Rendi Pangalila",
];

const createDefaultStats = (): PlayerStats => ({
  game: "-",
  point: "-",
  assist: "-",
  rebound: "-",
  ppg: "-",
  apg: "-",
  rpg: "-",
  fgPercent: "-",
  threePPercent: "-",
  twoPPercent: "-",
  ftPercent: "-",
});

const createDefaultTeamStats = (): TeamStats => ({
  G: "-",
  W: "-",
  L: "-",
  PM: "-",
  PA: "-",
  PD: "-",
  PTS: "-",
});

const createInitialPlayersForTeam = (): Player[] => {
  return DEFAULT_INDONESIAN_NAMES.map((name, index) => ({
    id: index + 1,
    name,
    nopung: String(index + 1),
    isCaptain: index === 0,
    stats: createDefaultStats(),
  }));
};

const createInitialTeams = (): Team[] => {
  return Array.from({ length: 18 }, (_, index) => {
    const id = String(index + 1);
    const group = index < 6 ? "Group A" : index < 12 ? "Group B" : "Group C";
    return {
      id,
      name: `HMD ${index + 1}`,
      group,
      logo: "/images/LOGO_1.svg",
      teamStats: createDefaultTeamStats(),
      players: createInitialPlayersForTeam(),
    };
  });
};

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teams: createInitialTeams(),

      updateTeam: (teamId: string, updatedData: Partial<Team>) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, ...updatedData } : team
          ),
        }));
      },

      updateTeamStats: (teamId: string, stats: TeamStats) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, teamStats: stats } : team
          ),
        }));
      },

      updatePlayers: (teamId: string, players: Player[]) => {
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, players } : team
          ),
        }));
      },

      getTeamById: (teamId: string) => {
        return get().teams.find((team) => team.id === teamId);
      },

      getTeamByName: (teamName: string) => {
        return get().teams.find(
          (team) => team.name.toLowerCase() === teamName.toLowerCase()
        );
      },

      resetToDefault: () => {
        set({ teams: createInitialTeams() });
      },
    }),
    {
      name: "ibl_teams_storage_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
