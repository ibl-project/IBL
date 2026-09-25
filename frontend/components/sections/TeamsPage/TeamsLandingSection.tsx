"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Search, Plus, Upload, FileSpreadsheet, X, Download } from "lucide-react";

import { useTeamStore } from "@/lib/store/useTeamStore";

interface TeamsLandingSectionProps {
  onTeamClick?: (teamId: string, teamName: string) => void;
}

export const TeamsLandingSection = ({ onTeamClick }: TeamsLandingSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { teams, addTeam, importTeamsFromRawData } = useTeamStore();

  // Modals state
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Add Team Form state
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamGroup, setNewTeamGroup] = useState("Group A");
  const [newTeamPlayerCount, setNewTeamPlayerCount] = useState(15);
  const [addTeamError, setAddTeamError] = useState("");

  // Import state
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      setAddTeamError("Nama tim tidak boleh kosong!");
      return;
    }

    // Check duplicate
    const exists = teams.some(
      (t) => t.name.toLowerCase() === newTeamName.trim().toLowerCase()
    );
    if (exists) {
      setAddTeamError(`Tim dengan nama "${newTeamName.trim()}" sudah ada!`);
      return;
    }

    // Generate initial players for this new team
    const initialPlayers = Array.from({ length: Math.max(1, newTeamPlayerCount) }, (_, i) => ({
      name: `Pemain ${i + 1}`,
      nopung: String(i + 1),
      isCaptain: i === 0,
    }));

    addTeam({
      name: newTeamName.trim(),
      group: newTeamGroup,
      logo: "/images/LOGO_1.svg",
      players: initialPlayers,
    });

    setNewTeamName("");
    setNewTeamGroup("Group A");
    setNewTeamPlayerCount(15);
    setAddTeamError("");
    setIsAddTeamModalOpen(false);
  };

  // CSV / Spreadsheet parser compatible with Excel exports
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        // Parse CSV lines
        const lines = text.split(/\r\n|\n/).filter((line) => line.trim() !== "");
        if (lines.length <= 1) {
          setImportStatus("File kosong atau hanya berisi baris judul.");
          return;
        }

        // Expected header format: NAMA_TIM, GROUP, NAMA_PEMAIN, NOPUNG, KAPTEN
        const headers = lines[0].split(",").map((h) => h.trim().toUpperCase());
        const teamNameIdx = headers.findIndex((h) => h.includes("TIM") || h.includes("TEAM"));
        const groupIdx = headers.findIndex((h) => h.includes("GROUP") || h.includes("GRUP"));
        const playerIdx = headers.findIndex((h) => h.includes("PEMAIN") || h.includes("PLAYER") || h.includes("NAMA"));
        const nopungIdx = headers.findIndex((h) => h.includes("NOPUNG") || h.includes("NO") || h.includes("NUMBER"));
        const captainIdx = headers.findIndex((h) => h.includes("KAPTEN") || h.includes("CAPTAIN"));

        const parsedRows: Array<{
          teamName: string;
          group?: string;
          playerName?: string;
          nopung?: string;
          isCaptain?: boolean;
        }> = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
          if (cols.length === 0) continue;

          const teamName = teamNameIdx !== -1 ? cols[teamNameIdx] : cols[0];
          const group = groupIdx !== -1 ? cols[groupIdx] : cols[1];
          const playerName = playerIdx !== -1 ? cols[playerIdx] : cols[2];
          const nopung = nopungIdx !== -1 ? cols[nopungIdx] : cols[3];
          const isCaptain = captainIdx !== -1 ? cols[captainIdx]?.toLowerCase() === "true" || cols[captainIdx] === "1" || cols[captainIdx]?.toLowerCase() === "ya" : false;

          if (teamName) {
            parsedRows.push({
              teamName,
              group: group || "Group A",
              playerName,
              nopung,
              isCaptain,
            });
          }
        }

        if (parsedRows.length > 0) {
          importTeamsFromRawData(parsedRows);
          setImportStatus(`Berhasil mengimpor ${parsedRows.length} data pemain & tim!`);
          setTimeout(() => {
            setIsImportModalOpen(false);
            setImportStatus(null);
          }, 1500);
        } else {
          setImportStatus("Tidak ditemukan data valid dalam file.");
        }
      } catch (err) {
        console.error("Error parsing file:", err);
        setImportStatus("Gagal membaca file. Pastikan format file CSV/Spreadsheet sesuai.");
      }
    };

    reader.readAsText(file);
  };

  const downloadSampleTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "NAMA_TIM,GROUP,NAMA_PEMAIN,NOPUNG,KAPTEN\n" +
      "HMD 1,Group A,Budi Santoso,1,Ya\n" +
      "HMD 1,Group A,Agus Setiawan,2,Tidak\n" +
      "HMD 1,Group A,Rizky Aditya,3,Tidak\n" +
      "HMD 2,Group A,Ahmad Fauzi,1,Ya\n" +
      "HMD 2,Group A,Dimas Pratama,2,Tidak\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Template_Data_Tim_IBL.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col gap-6 pt-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#2d3748]">Teams</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">
            Total {teams.length} Tim Terdaftar dalam IBL 2K26
          </p>
        </div>

        {/* Buttons Tambah Tim & Import */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2.5 rounded-full border border-gray-300 shadow-xs transition-colors cursor-pointer text-sm font-poppins"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Import XLSX / CSV</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAddTeamError("");
              setIsAddTeamModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#389F9D] hover:bg-[#2C7D7B] text-white font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors cursor-pointer text-sm font-poppins"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>+ Tambah Tim</span>
          </button>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-3 bg-white border-none rounded-full shadow-xs focus:ring-2 focus:ring-[#389F9D] focus:outline-none sm:text-sm transition-shadow font-poppins"
          placeholder="Cari nama tim (e.g. HMD 1, Group A)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 3. Teams Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="flex flex-col items-center justify-center cursor-pointer group bg-white/60 hover:bg-white p-4 rounded-2xl border border-transparent hover:border-teal-200 shadow-xs hover:shadow-md transition-all duration-200"
            onClick={() => onTeamClick?.(team.id, team.name)}
          >
            <div className="relative w-20 h-20 mb-3 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={team.logo || "/images/LOGO_1.svg"}
                alt={team.name}
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-[#2d3748] font-bold text-base text-center line-clamp-1 font-poppins">
              {team.name}
            </span>
            <span className="text-xs text-teal-700 font-medium bg-teal-50 px-2.5 py-0.5 rounded-full mt-1 font-poppins">
              {team.group || "Group A"}
            </span>
            <span className="text-[11px] text-gray-400 mt-1 font-poppins">
              {team.players?.length || 0} Pemain
            </span>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-gray-300 text-gray-500 font-poppins">
          Tidak ada tim yang cocok dengan "{searchQuery}"
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Tambah Tim Baru */}
      {/* ========================================================================= */}
      {isAddTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-poppins animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              type="button"
              onClick={() => setIsAddTeamModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Tambah Tim Baru</h3>
                <p className="text-xs text-gray-500">Daftarkan tim baru ke turnamen IBL 2K26</p>
              </div>
            </div>

            <form onSubmit={handleCreateTeam} className="flex flex-col gap-4">
              {addTeamError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                  {addTeamError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Nama Tim <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: HMD 19 / Teknik Mesin"
                  value={newTeamName}
                  onChange={(e) => {
                    setNewTeamName(e.target.value);
                    setAddTeamError("");
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Grup Pertandingan
                </label>
                <select
                  value={newTeamGroup}
                  onChange={(e) => setNewTeamGroup(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm bg-white cursor-pointer"
                >
                  <option value="Group A">Group A</option>
                  <option value="Group B">Group B</option>
                  <option value="Group C">Group C</option>
                  <option value="Group D">Group D</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Jumlah Pemain Awal
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={newTeamPlayerCount}
                  onChange={(e) => setNewTeamPlayerCount(parseInt(e.target.value, 10) || 15)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                />
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Pemain dapat diedit nama dan statistiknya di halaman Edit Tim.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddTeamModalOpen(false)}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full text-sm font-bold bg-[#389F9D] hover:bg-[#2C7D7B] text-white shadow-sm transition-colors cursor-pointer"
                >
                  Simpan Tim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Import Spreadsheet (XLSX / CSV) */}
      {/* ========================================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-poppins animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              type="button"
              onClick={() => {
                setIsImportModalOpen(false);
                setImportStatus(null);
              }}
              className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Import Data Tim & Pemain</h3>
                <p className="text-xs text-gray-500">Kompatibel dengan Spreadsheet / Excel / CSV</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <p className="text-gray-600 text-xs leading-relaxed">
                Anda dapat mengunggah berkas CSV/XLSX yang berisi data tim dan pemain. Format kolom yang didukung:
              </p>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 font-mono text-[11px] text-gray-700 overflow-x-auto">
                <code>NAMA_TIM, GROUP, NAMA_PEMAIN, NOPUNG, KAPTEN</code>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-50/70 p-3 rounded-xl border border-blue-200">
                <span className="text-xs text-blue-800 font-medium">
                  Belum punya formatnya? Unduh template resmi:
                </span>
                <button
                  type="button"
                  onClick={downloadSampleTemplate}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Template</span>
                </button>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-gray-50/50 hover:bg-emerald-50/20"
              >
                <Upload className="w-8 h-8 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Klik untuk Memilih File CSV
                </span>
                <span className="text-xs text-gray-400 text-center">
                  (Simpan file Excel Anda sebagai CSV UTF-8 lalu unggah ke sini)
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv, text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {importStatus && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium text-center ${
                    importStatus.startsWith("Berhasil")
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {importStatus}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportStatus(null);
                }}
                className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
