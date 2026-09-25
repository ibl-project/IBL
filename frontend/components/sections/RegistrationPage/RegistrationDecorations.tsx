"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { popSpringVariants } from "@/lib/animations";

export const RegistrationDecorations = () => {
  return (
    <>
      {/* 1. Lightning Left: top: 557.58px, left: 118.9px, size: 154.12px + Floating Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={popSpringVariants}
        custom={0.1}
        className="absolute pointer-events-none select-none z-10"
        style={{
          top: "min(calc(100vw * 557.58 / 1440), 557.58px)",
          left: "min(calc(100% * 118.9 / 1440), 118.9px)",
          width: "min(calc(100% * 154.12 / 1440), 154.12px)",
        }}
      >
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-2, 2.5, -2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-auto"
        >
          <Image
            src="/images/registration/lightning-right.webp"
            alt="Lightning Left"
            width={315}
            height={809}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      {/* 2. Lightning Right: top: 742px, right: 96.32px, size: 159.08px + Asymmetric Floating Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={popSpringVariants}
        custom={0.16}
        className="absolute pointer-events-none select-none z-10"
        style={{
          top: "min(calc(100vw * 742 / 1440), 742px)",
          right: "min(calc(100% * 96.32 / 1440), 96.32px)",
          width: "min(calc(100% * 159.08 / 1440), 159.08px)",
        }}
      >
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [2.5, -2, 2.5] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="w-full h-auto"
        >
          <Image
            src="/images/registration/lightning-left.webp"
            alt="Lightning Right"
            width={378}
            height={700}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      {/* 3. Basket: top: 805px, left: -219px, width: 438.71px + Weighty Floating Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
        variants={popSpringVariants}
        custom={0.22}
        className="absolute pointer-events-none select-none z-0 max-md:opacity-30 md:opacity-100 md:z-10"
        style={{
          top: "min(calc(100vw * 805 / 1440), 805px)",
          left: "max(calc(100% * -219 / 1440), -219px)",
          width: "min(calc(100% * 438.71 / 1440), 438.71px)",
        }}
      >
        <motion.div
          animate={{ y: [-12, 10, -12], rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-auto"
        >
          <Image
            src="/images/registration/ball-left.webp"
            alt="Basketball Left"
            width={870}
            height={1160}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </>
  );
};
