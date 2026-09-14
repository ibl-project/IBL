"use client";

import React from "react";
import Image from "next/image";

interface TeamEditSectionProps {
  teamName?: string;
  onBack?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const NumberInput = () => {
  const [val, setVal] = React.useState("-");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const sanitized = e.target.value.replace(/[^0-9]/g, "");
    setVal(sanitized);
  };

  const handleFocus = () => {
    if (val === "-") {
      setVal("");
    }
  };

  const handleBlur = () => {
    if (val === "") {
      setVal("-");
    }
  };

  return (
    <input
      type="text"
      value={val}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="w-full h-full min-w-[40px] py-1 text-center bg-transparent border-none focus:ring-0 focus:outline-none focus:bg-blue-50 text-gray-700 transition-colors"
    />
  );
};

export const TeamEditSection = ({ teamName = "NAMA HMD", onBack, onCancel, onSave }: TeamEditSectionProps) => {
  const indonesianNames = [
    "Budi Santoso", "Agus Setiawan", "Rizky Aditya", "Ahmad Fauzi", "Dimas Pratama", 
    "Reza Rahadian", "Dika Saputra", "Wahyu Hidayat", "Ilham Akbar", "Kevin Sanjaya", 
    "Bagas Maulana", "Putra Andika", "Irfan Kurniawan", "Hendra Setiawan", "Rendi Pangalila"
  ];
  
  const players = indonesianNames.map((name, i) => ({
    id: i,
    name: name
  }));

  return (
    <div className="w-full max-w-6xl flex flex-col gap-6 pb-12">
      <h1 className="text-4xl font-bold text-[#2d3748] mb-2">Teams</h1>
      
      {/* Main White Card Container (With Blue Border as in design) */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-[#1E88E5] p-8 w-full">
        
        {/* Card Header: Logo & Team Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16">
            <Image 
              src="/images/LOGO_1.svg" 
              alt="Team Logo"
              fill
              className="object-contain drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-[#2d3748] tracking-wide uppercase">{teamName}</h2>
            <p className="text-gray-500 font-medium">Group A</p>
          </div>
        </div>

        <hr className="border-t border-[#94B8BC] opacity-50 mb-8" />

        {/* 1. Team Statistic Table */}
        <div className="mb-10">
          <h3 className="text-base font-extrabold text-[#2d3748] mb-3">Team Statistic</h3>
          <div className="overflow-x-auto border border-black rounded-lg max-w-2xl">
            <table className="w-full text-center text-sm">
              <thead className="bg-[#D9CDBF] font-bold text-[#2d3748]">
                <tr>
                  <th className="p-3 w-1/4 border-r border-white/50 bg-white"></th>
                  <th className="p-3 border-b border-white/50">G</th>
                  <th className="p-3 border-b border-white/50">W</th>
                  <th className="p-3 border-b border-white/50">L</th>
                  <th className="p-3 border-b border-white/50">PM</th>
                  <th className="p-3 border-b border-white/50">PA</th>
                  <th className="p-3 border-b border-white/50">PD</th>
                  <th className="p-3 border-b border-white/50">PTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-bold bg-[#D9CDBF] border-r border-white/50 text-[#2d3748]">Value</td>
                  <td className="p-1 bg-white border-r border-gray-200"><NumberInput /></td>
                  <td className="p-1 bg-white border-r border-gray-200"><NumberInput /></td>
                  <td className="p-1 bg-white border-r border-gray-200"><NumberInput /></td>
                  <td className="p-1 bg-white border-r border-gray-200"><NumberInput /></td>
                  <td className="p-1 bg-white border-r border-gray-200"><NumberInput /></td>
                  <td className="p-1 bg-white border-r border-gray-200"><NumberInput /></td>
                  <td className="p-1 bg-white"><NumberInput /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Player Total Statistic Table */}
        <div className="mb-10">
          <h3 className="text-base font-extrabold text-[#2d3748] mb-3">Player Total Statistic</h3>
          <div className="overflow-x-auto rounded-lg border border-black">
            <table className="w-full text-center text-sm border-collapse">
              <thead className="bg-[#D9CDBF] font-bold text-[#2d3748]">
                <tr>
                  <th className="p-3 border-b border-r border-white/50">NAME</th>
                  <th className="p-3 border-b border-r border-white/50">GAME</th>
                  <th className="p-3 border-b border-r border-white/50">POINT</th>
                  <th className="p-3 border-b border-r border-white/50">ASSIST</th>
                  <th className="p-3 border-b">REBOUND</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F3EFE9]"}>
                    <td className="p-3 border-r border-gray-200 font-medium text-gray-700">{player.name}</td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1"><NumberInput /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Player Average Statistic Table */}
        <div className="mb-12">
          <h3 className="text-base font-extrabold text-[#2d3748] mb-3">Player Average Statistic</h3>
          <div className="overflow-x-auto rounded-lg border border-black">
            <table className="w-full text-center text-sm border-collapse">
              <thead className="bg-[#D9CDBF] font-bold text-[#2d3748]">
                <tr>
                  <th className="p-3 border-b border-r border-white/50">NAME</th>
                  <th className="p-3 border-b border-r border-white/50">PPG</th>
                  <th className="p-3 border-b border-r border-white/50">APG</th>
                  <th className="p-3 border-b border-r border-white/50">RPG</th>
                  <th className="p-3 border-b border-r border-white/50">FG%</th>
                  <th className="p-3 border-b border-r border-white/50">3P%</th>
                  <th className="p-3 border-b border-r border-white/50">2P%</th>
                  <th className="p-3 border-b">FT%</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F3EFE9]"}>
                    <td className="p-3 border-r border-gray-200 font-medium text-gray-700">{player.name}</td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1 border-r border-gray-200"><NumberInput /></td>
                    <td className="p-1"><NumberInput /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={onBack}
            className="bg-[#389F9D] hover:bg-[#2C7D7B] text-white px-8 py-2.5 rounded-full font-semibold transition-colors shadow-sm"
          >
            Back
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onCancel}
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-8 py-2.5 rounded-full font-semibold transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-2.5 rounded-full font-semibold transition-colors shadow-sm"
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
