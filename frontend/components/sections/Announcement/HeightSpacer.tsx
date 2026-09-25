"use client";

import { useEffect, useState } from "react";

export default function HeightSpacer() {
  const [height, setHeight] = useState<string>("100dvh");

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw >= 1440) {
        const scale = vw / 1440;
        // Figma design ratio: 1440px width : 1024px height
        // Scale the height dynamically based on the width scale factor
        setHeight(`${1024 * scale}px`);
      } else {
        setHeight("1024px");
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return <div style={{ height, pointerEvents: "none" }} aria-hidden="true" />;
}
