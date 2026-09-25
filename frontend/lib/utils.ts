// Utility / helper functions
// Tambahkan fungsi-fungsi pembantu di sini

import type { FileData } from "@/types/register";

/**
 * Membuka berkas (base64) pada tab baru untuk pratinjau.
 * Memakai Blob URL agar mendukung berkas besar tanpa batas panjang data URL.
 * Gambar (PNG/JPG) & PDF akan tampil langsung di browser;
 * berkas lain (DOC/DOCX/ZIP/RAR) akan terunduh oleh browser.
 */
export const previewFileData = (file: FileData): void => {
  try {
    const binary = atob(file.base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], {
      type: file.mimeType || "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (err) {
    console.error("Gagal mempratinjau berkas:", err);
  }
};
