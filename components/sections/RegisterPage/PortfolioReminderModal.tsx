"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface PortfolioReminderModalProps {
  open: boolean;
  onClose: () => void;
  /** Durasi modal tampil (ms) sebelum tertutup otomatis. */
  duration?: number;
}

/**
 * Modal pengingat portofolio — muncul saat pendaftar yang memilih divisi
 * SMM/Website masuk ke tahap Upload Berkas. Tertutup otomatis setelah
 * `duration` (default 3 detik) atau saat backdrop diklik.
 *
 * Dirender via portal ke document.body agar tidak terpengaruh transform
 * scale pada container halaman register. `open` hanya menjadi true lewat
 * interaksi user (pasti sisi klien), sehingga createPortal aman dipanggil.
 */
export const PortfolioReminderModal = ({
  open,
  onClose,
  duration = 3000,
}: PortfolioReminderModalProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-reminder-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative max-w-[420px] w-full rounded-2xl border-4 border-[#7E0202] bg-[#F4F0E6] shadow-2xl px-6 py-7 sm:px-8 sm:py-9 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ikon peringatan */}
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#7E0202] text-white">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2
          id="portfolio-reminder-title"
          className="font-crosner text-2xl sm:text-3xl uppercase tracking-widest text-[#7E0202]"
        >
          Perhatian!
        </h2>

        <p className="mt-3 font-body text-sm sm:text-base text-gray-800 leading-relaxed">
          Khusus yang memilih sub divisi-divisi berikut:
        </p>

        <div className="mt-2 space-y-1.5 text-left font-body text-sm sm:text-base text-gray-800 leading-relaxed">
          <p>
            <span className="font-bold">1. Divisi SMM</span> (MedPro, CnD, Branding)
          </p>
          <p>
            <span className="font-bold">2. Divisi Website</span> (Front-End, Back-End, dan UI/UX)
          </p>
        </div>

        <p className="mt-4 font-body text-base sm:text-lg font-bold text-[#7E0202]">
          Wajib mencantumkan portofolio!
        </p>
      </motion.div>
    </motion.div>,
    document.body
  );
};
