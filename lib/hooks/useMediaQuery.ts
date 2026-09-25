import { useEffect, useState } from "react";

/**
 * Mengembalikan `true` saat `query` cocok dengan viewport (client-side).
 * Aman dari hydration mismatch: nilai awal selalu `false` (sesuai render SSR),
 * lalu diperbarui setelah mount — pola yang sama dengan `useScaleRatio`.
 *
 * Dipakai untuk menonaktifkan animasi `framer-motion` berat (loop `repeat: Infinity`)
 * pada layar kecil, mengurangi beban GPU/compositing di WebKit (Safari/iOS WKWebView)
 * yang rentan jetsam-crash.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};
