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
  addTeam: (teamData: {
    name: string;
    group?: string;
    logo?: string;
    players?: { name: string; nopung?: string; isCaptain?: boolean }[];
  }) => Team;
  deleteTeam: (teamId: string) => void;
  addPlayer: (
    teamId: string,
    player: { name: string; nopung?: string; isCaptain?: boolean }
  ) => void;
  deletePlayer: (teamId: string, playerId: number) => void;
  importTeamsFromRawData: (
    rawRows: Array<{
      teamName: string;
      group?: string;
      playerName?: string;
      nopung?: string;
      isCaptain?: boolean;
    }>
  ) => void;
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

export const createDefaultPlayerStats = (): PlayerStats => ({
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

export const createDefaultTeamStats = (): TeamStats => ({
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
    stats: createDefaultPlayerStats(),
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

      addTeam: ({ name, group = "Group A", logo = "/images/LOGO_1.svg", players = [] }) => {
        const currentTeams = get().teams;
        // Generate new sequential or unique id
        const maxId = currentTeams.reduce((max, t) => {
          const num = parseInt(t.id, 10);
          return !isNaN(num) && num > max ? num : max;
        }, 0);
        const newId = String(maxId + 1);

        const initialPlayers: Player[] =
          players.length > 0
            ? players.map((p, idx) => ({
                id: idx + 1,
                name: p.name,
                nopung: p.nopung || String(idx + 1),
                isCaptain: p.isCaptain ?? idx === 0,
                stats: createDefaultPlayerStats(),
              }))
            : createInitialPlayersForTeam();

        const newTeam: Team = {
          id: newId,
          name,
          group,
          logo,
          teamStats: createDefaultTeamStats(),
          players: initialPlayers,
        };

        set((state) => ({
          teams: [...state.teams, newTeam],
        }));

        return newTeam;
      },

      deleteTeam: (teamId: string) => {
        set((state) => ({
          teams: state.teams.filter((t) => t.id !== teamId),
        }));
      },

      addPlayer: (teamId: string, player) => {
        set((state) => ({
          teams: state.teams.map((team) => {
            if (team.id !== teamId) return team;
            const currentPlayers = team.players || [];
            const maxPlayerId = currentPlayers.reduce((max, p) => (p.id > max ? p.id : max), 0);
            const newPlayer: Player = {
              id: maxPlayerId + 1,
              name: player.name || `Pemain ${currentPlayers.length + 1}`,
              nopung: player.nopung || String(currentPlayers.length + 1),
              isCaptain: player.isCaptain ?? (currentPlayers.length === 0),
              stats: createDefaultPlayerStats(),
            };
            return {
              ...team,
              players: [...currentPlayers, newPlayer],
            };
          }),
        }));
      },

      deletePlayer: (teamId: string, playerId: number) => {
        set((state) => ({
          teams: state.teams.map((team) => {
            if (team.id !== teamId) return team;
            return {
              ...team,
              players: team.players.filter((p) => p.id !== playerId),
            };
          }),
        }));
      },

      importTeamsFromRawData: (rawRows) => {
        // Group raw rows (e.g. from XLSX / CSV export) by teamName
        const teamsMap = new Map<string, { group: string; players: Player[] }>();

        rawRows.forEach((row) => {
          const tName = (row.teamName || "").trim();
          if (!tName) return;

          if (!teamsMap.has(tName)) {
            teamsMap.set(tName, {
              group: row.group || "Group A",
              players: [],
            });
          }

          const teamEntry = teamsMap.get(tName)!;
          if (row.playerName && row.playerName.trim()) {
            const nextPId = teamEntry.players.length + 1;
            teamEntry.players.push({
              id: nextPId,
              name: row.playerName.trim(),
              nopung: row.nopung || String(nextPId),
              isCaptain: Boolean(row.isCaptain),
              stats: createDefaultPlayerStats(),
            });
          }
        });

        const newTeamsList: Team[] = [];
        let index = 1;
        teamsMap.forEach((data, tName) => {
          newTeamsList.push({
            id: String(index),
            name: tName,
            group: data.group,
            logo: "/images/LOGO_1.svg",
            teamStats: createDefaultTeamStats(),
            players: data.players.length > 0 ? data.players : createInitialPlayersForTeam(),
          });
          index++;
        });

        if (newTeamsList.length > 0) {
          set({ teams: newTeamsList });
        }
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
