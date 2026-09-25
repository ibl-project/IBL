"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TwoSix from "@/public/images/announcement/26.svg";

export default function TwoSixSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none"
    >
      <Image
        src={TwoSix}
        alt="26"
        className="absolute top-1/2 -translate-y-1/2 sm:top-0 sm:translate-y-0 left-1/2 -translate-x-1/2 w-[100vw] sm:w-[1440px] max-w-[100vw] sm:max-w-[1440px] h-auto pointer-events-none"
      />
    </motion.div>
  );
}
