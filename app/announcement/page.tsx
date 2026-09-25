import React from "react";
import Texture from "@/public/images/announcement/Texture.svg";
import Image from "next/image";
import TwoSixSection from "@/components/sections/Announcement/TwoSixSection";
import PageScaleWrapper from "@/components/sections/Announcement/PageScaleWrapper";
import PlayersAnimationWrapper from "@/components/sections/Announcement/PlayersAnimationWrapper";
import LandingSection from "@/components/sections/Announcement/LandingSectionAnnouncement";
import HeightSpacer from "@/components/sections/Announcement/HeightSpacer";

const page = () => {
  return (
    <div className="h-dvh min-[1440px]:h-auto min-[1440px]:min-h-dvh bg-bone relative w-full overflow-hidden min-[1440px]:overflow-y-auto min-[1440px]:overflow-x-hidden">
      {/* Invisible spacer to push page height dynamically on large screens */}
      <HeightSpacer />

      {/* === LAYER 1: Players & TwoSix (z-5 di root saat large screen) === */}
      <PageScaleWrapper zIndex={5}>
        <div className="relative min-h-full flex flex-col items-center w-full">
          {/* TwoSix — DOM pertama di dalam wrapper = z paling bawah di atas texture */}
          <TwoSixSection />
          {/* Client animation wrapper for players SVGs */}
          <PlayersAnimationWrapper />
        </div>
      </PageScaleWrapper>

      {/* === LAYER 2: Texture (z-20 di root, absolute — tidak ikut scroll) === */}
      <div className="absolute inset-0 z-[20] pointer-events-none">
        <Image
          src={Texture}
          alt="Background texture"
          fill
          className="object-cover"
        />
      </div>

      {/* === LAYER 3: LandingSection (z-30 di root saat large screen) === */}
      <PageScaleWrapper zIndex={30}>
        <div className="relative min-h-full flex flex-col items-center w-full">
          <LandingSection />
        </div>
      </PageScaleWrapper>
    </div>
  );
};

export default page;
