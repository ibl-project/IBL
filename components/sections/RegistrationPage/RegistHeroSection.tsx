"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import openTeamRegistrationImg from "@/public/images/registration/Open-Team-Registration.webp";
import { popSpringVariants } from "@/lib/animations";

export const RegistHeroSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center pt-4 md:pt-[11px] z-30 px-4">
      {/* Semantic H1 for SEO and Screen Readers */}
      <h1 className="sr-only">Open Team Registration - ITS Basketball League 2026 (IBL 2K26)</h1>

      {/* Teal Banner / Title */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[928px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={popSpringVariants}
          custom={0.08}
          className="relative w-[82%] max-w-[763px] aspect-[763/288] flex items-center justify-center mb-10"
        >
          <Image 
            src="/images/registration/text-ornament.svg" 
            alt="Teal Banner" 
            width={763} 
            height={288} 
            className="w-full h-auto drop-shadow-2xl" 
          />
          {/* Overlay Open Team Registration (Static Import) with punchy staggered pop */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-[1%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={popSpringVariants}
              custom={0.22}
              className="relative w-[76%] max-w-[579px] aspect-[579/169]"
            >
              <Image 
                src={openTeamRegistrationImg} 
                alt="Open Team Registration" 
                fill
                priority
                sizes="(max-width: 768px) 80vw, 579px"
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
