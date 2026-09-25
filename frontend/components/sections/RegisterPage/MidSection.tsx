"use client";

import React from "react";
import OpenRecr from "@/public/texts/OPEN_RECRUITMENT_STAFF.svg";
import TimeCard from "@/public/images/TimeCard.webp";
import Jam from "@/public/texts/JAM.svg";
import Menit from "@/public/texts/MENIT.svg";
import Hari from "@/public/texts/HARI.svg";
import { motion } from "framer-motion";

import Image from "next/image";
import { useCountdown } from "@/lib/hooks/useCountdown";

// Tenggat penutupan pendaftaran staff IBL 2K26: 10 Juli 2026, 23:59 WIB (UTC+7)
export const REGISTRATION_DEADLINE = new Date("2026-07-10T23:59:59+07:00");

const padTwo = (value: number) => String(value).padStart(2, "0");

export const MidSection = () => {
  const { time } = useCountdown(REGISTRATION_DEADLINE);

  // Urutan unit mengikuti desain: HARI | JAM | MENIT (masing-masing 2 digit)
  const units = [
    { digits: padTwo(time.days), label: Hari, alt: "Hari" },
    { digits: padTwo(time.hours), label: Jam, alt: "Jam" },
    { digits: padTwo(time.minutes), label: Menit, alt: "Menit" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative top-[1023px] flex flex-col items-center gap-[35px]"
    >
      <Image src={OpenRecr} alt="Open Recruitment Staff" />
      <div className="flex flex-row gap-[50.16px] items-start">
        {units.map((unit, index) => (
          <div key={index} className="flex flex-col items-center gap-[22px]">
            <div className="flex gap-[23.95px]">
              {unit.digits.split("").map((digit, digitIndex) => (
                <div
                  key={digitIndex}
                  className="relative flex justify-center items-center"
                >
                  <Image src={TimeCard} alt="" />
                  <p
                    className="absolute inset-0 flex items-center justify-center text-[60px] font-['crosner'] text-black top-2"
                    style={{ fontFamily: "crosner" }}
                  >
                    {digit}
                  </p>
                </div>
              ))}
            </div>
            <Image src={unit.label} alt={unit.alt} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
