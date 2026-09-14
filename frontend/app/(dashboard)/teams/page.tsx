"use client";

import React, { useState } from "react";
import { TeamsLandingSection } from "@/components/sections/TeamsPage/TeamsLandingSection";
import { TeamDetailSection } from "@/components/sections/TeamsPage/TeamDetailSection";
import { TeamEditSection } from "@/components/sections/TeamsPage/TeamEditSection";

export default function TeamsPage() {
  const [currentView, setCurrentView] = useState<"landing" | "detail" | "edit">("landing");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam(teamName);
    setCurrentView("detail");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
    setSelectedTeam(null);
  };

  const handleGoToEdit = () => {
    setCurrentView("edit");
  };

  const handleBackToDetail = () => {
    setCurrentView("detail");
  };

  return (
    <div className="w-full h-full">
      {currentView === "landing" && (
        <TeamsLandingSection onTeamClick={handleTeamClick} />
      )}

      {currentView === "detail" && selectedTeam && (
        <TeamDetailSection 
          teamName={selectedTeam} 
          onBack={handleBackToLanding} 
          onEdit={handleGoToEdit} 
        />
      )}

      {currentView === "edit" && selectedTeam && (
        <TeamEditSection 
          teamName={selectedTeam} 
          onBack={handleBackToDetail} 
          onCancel={handleBackToDetail}
          onSave={handleBackToDetail}
        />
      )}
    </div>
  );
}
