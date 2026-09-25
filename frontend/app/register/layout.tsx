import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | IBL 2K26",
  description: "Form pendaftaran Open Recruitment Staff IBL 2K26 — ITS Basketball League.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*
        Preload full-res 2880x6646 dihapus. Background kini dilayari via next/image
        dengan `priority` + `sizes`, yang sudah memprioritaskan fetch variant webp
        yang sesuai viewport. Preload manual aset full-res justru memaksa WebKit
        men-decode ~19 MP di tiap perangkat (penyebab crash Safari/iOS).
      */}
      {children}
    </>
  );
}
