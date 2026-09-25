"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Nikola from "@/public/images/announcement/nikola.svg";
import Icaz from "@/public/images/announcement/icaz.svg";
import KobeBryant2 from "@/public/images/announcement/Kobe Bryant 2.svg";
import KobeBryant from "@/public/images/announcement/Kobe Bryant.svg";
import LeBronJames1 from "@/public/images/announcement/LeBron James 1.svg";
import LeBronJames2 from "@/public/images/announcement/LeBron James 2.svg";
import LukaDoncic from "@/public/images/announcement/Luka Doncic.svg";
import Michael from "@/public/images/announcement/michael.svg";

export default function PlayersAnimationResult() {
  return (
    <div className="relative h-0 w-[1440px] left-1/2 -translate-x-1/2 pointer-events-none">
      {/* SVG Kiri — slide in from left after 0.9s delay */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <Image
          src={KobeBryant2}
          alt="Kobe Bryant 2"
          className="absolute z-5 top-0 left-0 max-w-none"
        />
        <Image
          src={LeBronJames1}
          alt="LeBron James 1"
          className="absolute top-[14px] z-[2] max-w-none"
        />
        <Image
          src={Nikola}
          alt="Nikola"
          className="absolute top-[551px] left-[183px] z-6 max-w-none"
        />
        <Image
          src={LukaDoncic}
          alt="Luka Doncic"
          className="absolute top-[666px] z-10 left-0 max-w-none"
        />
      </motion.div>

      {/* SVG Kanan — slide in from right after 0.9s delay */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <Image
          src={KobeBryant}
          alt="Kobe Bryant"
          className="absolute top-0 right-0 z-4 max-w-none"
        />
        <Image
          src={Michael}
          alt="Michael"
          className="absolute right-0 top-[75px] max-w-none"
        />
        <Image
          src={Icaz}
          alt="Icaz"
          className="absolute right-0 max-w-none top-[429px] z-5"
        />
        <Image
          src={LeBronJames2}
          alt="LeBron James 2"
          className="absolute z-10 top-[633px] right-0 max-w-none"
        />
      </motion.div>
    </div>
  );
}
