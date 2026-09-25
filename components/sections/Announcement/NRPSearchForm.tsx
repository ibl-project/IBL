"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import VideoLoadingOverlay from "./VideoLoadingOverlay";

export default function NRPSearchForm() {
  const router = useRouter();
  const [nrp, setNrp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState<{
    status: "lolos" | "tidak_lolos" | "tidak_terdaftar";
    nama?: string;
    subdivisi?: string;
    cp_name?: string;
    cp_phone?: string;
  } | null>(null);

  const handleSearch = async () => {
    const trimmedNrp = nrp.trim();
    if (!trimmedNrp) return;

    try {
      const response = await fetch(`/api/announcement/check?nrp=${encodeURIComponent(trimmedNrp)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch NRP status");
      }
      const data = await response.json();

      if (data.status === "tidak_terdaftar") {
        setIsLoading(false);
        const params = new URLSearchParams();
        params.set("nrp", trimmedNrp);
        params.set("status", data.status);
        if (data.cp_name) params.set("cpName", data.cp_name);
        if (data.cp_phone) params.set("cpPhone", data.cp_phone);
        
        router.push(`/announcement/result?${params.toString()}`);
        return;
      }

      setResultData(data);
      setIsLoading(true);
    } catch (err) {
      console.error("Failed to fetch NRP status:", err);
      setResultData({ status: "tidak_lolos" });
      setIsLoading(true);
    }
  };

  const handleVideoEnd = () => {
    if (resultData) {
      const params = new URLSearchParams();
      params.set("nrp", nrp.trim());
      params.set("status", resultData.status);
      if (resultData.nama) params.set("name", resultData.nama);
      if (resultData.subdivisi) params.set("subdivisi", resultData.subdivisi);
      if (resultData.cp_name) params.set("cpName", resultData.cp_name);
      if (resultData.cp_phone) params.set("cpPhone", resultData.cp_phone);
      
      router.push(`/announcement/result?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full sm:w-auto justify-center min-h-[96px] sm:min-h-[88px]">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <h1 className="font-drowner text-[24px] sm:text-[30px] md:text-[36px] tracking-wider mb-2 sm:mb-0 leading-none">
            Masukkan NRP
          </h1>
          <input
            type="tel"
            value={nrp}
            onChange={(e) => {
               const value = e.target.value;
               // Hanya menerima angka (0-9) dan panjangnya maksimal 10 karakter
               if (/^\d*$/.test(value) && value.length <= 10) {
                 setNrp(value);
               }
            }}
            onKeyDown={handleKeyDown}
            className="bg-white w-full sm:w-[248px] h-[40px] sm:h-[44px] text-[18px] sm:text-[24px] border-1 border-gray-300 shadow-xl font-medium text-muted-foreground px-2 hover:border-bone active:border-bone mt-2 sm:mt-1"
            placeholder="502xxxxxxx"
            suppressHydrationWarning
          />
        </div>
        <div className="pt-0 sm:pt-[44px]">
          <Button onClick={handleSearch}>Cari</Button>
        </div>
      </div>

      {isLoading && resultData && (
        <VideoLoadingOverlay 
          onVideoEnd={handleVideoEnd} 
          videoType={resultData.status === "lolos" ? "lolos" : "tidak_lolos"} 
        />
      )}
    </>
  );
}
