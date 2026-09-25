import React from "react";
import { UploadData, FileData, RegisterFormData } from "@/types/register";
import { noiseBg } from "@/constants/registerStyles";
import { previewFileData } from "@/lib/utils";
import { PORTFOLIO_REQUIRED_DIVISIONS } from "@/constants/registerForm";

interface UploadSlotProps {
  title: string;
  value: string;
  onChange: (fileName: string, fileData?: FileData) => void;
  className?: string;
  accept?: string;
  allowedExtensions?: string[];
  allowedExtensionsLabel?: string;
  maxSizeMB?: number;
  fileData?: FileData;
  onRemove?: () => void;
}

const UploadSlot: React.FC<UploadSlotProps> = ({
  title,
  value,
  onChange,
  className = "",
  accept,
  allowedExtensions,
  allowedExtensionsLabel,
  maxSizeMB = 10,
  fileData,
  onRemove,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Buka berkas yang sudah di-upload di tab baru untuk pratinjau.
  // stopPropagation agar tidak memicu dialog pilih file milik container.
  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileData) previewFileData(fileData);
  };

  // Hapus berkas: kosongkan nama file di state parent + reset input file
  // agar file yang sama bisa dipilih ulang.
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Validate File Size
      const maxBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxBytes) {
        setLocalError(`Maksimal ukuran file: ${maxSizeMB}MB`);
        // Reset file value to prevent leaving it set
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // 2. Validate File Extension
      if (allowedExtensions && allowedExtensions.length > 0) {
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!fileExt || !allowedExtensions.includes(fileExt)) {
          setLocalError(`Harap upload format: ${allowedExtensionsLabel || allowedExtensions.join(', ')}`);
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }
      }

      setLocalError(null);
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        onChange(file.name, {
          name: file.name,
          mimeType: file.type,
          base64: base64
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-1 sm:gap-1.5 md:gap-2 select-none cursor-pointer group hover:bg-[#D1EAE5]/20 transition-all duration-300 ease-out ${className}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="absolute pointer-events-none opacity-0 w-px h-px"
        accept={accept}
      />
      <h4 className="font-crosner text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal text-black uppercase tracking-widest text-center leading-tight mb-1 sm:mb-2 lg:mb-3 group-hover:-translate-y-0.5 group-hover:scale-103 transition-all duration-300 ease-out">
        {title}
      </h4>
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 text-center">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-[#D1EAE5] flex items-center justify-center border border-[#864B4D] group-hover:bg-[#2B918E] group-hover:border-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#2B918E] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {localError ? (
          <span className="font-body text-[10px] sm:text-xs text-red-600 font-semibold px-2 py-0.5 max-w-[140px] sm:max-w-[180px] bg-red-50 border border-red-200 rounded leading-snug">
            {localError}
          </span>
        ) : value ? (
          <div className="flex items-center gap-1 max-w-[180px] sm:max-w-[220px]">
            <span className="font-body text-[10px] sm:text-xs text-gray-700 font-semibold bg-white border border-gray-300 rounded px-2 py-0.5 truncate flex-1 min-w-0 shadow-sm group-hover:border-gray-400 group-hover:shadow-md transition-all duration-300 ease-out">
              {value}
            </span>
            {fileData && (
              <button
                type="button"
                onClick={handlePreview}
                title="Lihat berkas"
                aria-label="Lihat berkas"
                className="shrink-0 p-1 rounded text-gray-500 hover:text-[#2B918E] hover:bg-[#D1EAE5]/40 transition-colors duration-200"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={handleRemove}
                title="Hapus berkas"
                aria-label="Hapus berkas"
                className="shrink-0 p-1 rounded text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-body text-[9px] sm:text-xs text-gray-500">Drop files here or click to upload</span>
            {allowedExtensionsLabel && (
              <span className="font-body text-[8px] sm:text-[10px] text-gray-400 mt-0.5">
                Format: {allowedExtensionsLabel} (Max {maxSizeMB}MB)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface UploadStepProps {
  formData: RegisterFormData;
  uploadData: UploadData;
  rawFiles: { [key in keyof UploadData]?: FileData };
  updateUploadField: (field: keyof UploadData, value: string, fileData?: FileData) => void;
  removeUploadField: (field: keyof UploadData) => void;
  submitError?: string | null;
  style?: React.CSSProperties;
}

export const UploadStep: React.FC<UploadStepProps> = ({ formData, uploadData, rawFiles, updateUploadField, removeUploadField, submitError, style }) => {
  const isPortfolioRequired = React.useMemo(() => {
    if (!formData || !formData.informasiUmum) return false;
    const p1 = formData.informasiUmum.subdivisi1;
    const p2 = formData.informasiUmum.subdivisi2;
    return PORTFOLIO_REQUIRED_DIVISIONS.includes(p1) || PORTFOLIO_REQUIRED_DIVISIONS.includes(p2);
  }, [formData]);

  return (
    <div
      style={{
        width: "863px",
        height: "1230px",
        top: "1843px",
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute",
        border: "12px solid transparent",
        backgroundImage: `${noiseBg}, linear-gradient(#EFE8DE, #EFE8DE), linear-gradient(to bottom, #F4631E, #B93310, #7E0202)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, padding-box, border-box",
        ...style,
      }}
      className="overflow-hidden flex flex-col shadow-[10px_10px_0px_0px_#000]/50"
    >
      {submitError && (
        <div className="absolute top-2 left-2 right-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded font-body text-xs z-50">
          <strong className="font-bold">Error: </strong>
          <span>{submitError}</span>
        </div>
      )}
      {/* Slanted Dividers */}
      <div className="absolute top-[33.33%] -left-4 -right-4 h-[8px] bg-[#B93310] origin-center rotate-[3deg] pointer-events-none z-10" />
      <div className="absolute top-[66.66%] -left-4 -right-4 h-[8px] bg-[#B93310] origin-center -rotate-[3deg] pointer-events-none z-10" />
      {/* Vertical Divider 1 (Row 1) - Slanted right */}
      <div
        className="absolute left-1/2 w-[8px] bg-[#B93310] origin-center pointer-events-none z-10"
        style={{
          top: "-4px",
          height: "calc(33.33% + 8px)",
          marginLeft: "-4px",
          transform: "rotate(-6deg)",
        }}
      />
      {/* Vertical Divider 2 (Row 2) - Slanted left */}
      <div
        className="absolute left-1/2 w-[8px] bg-[#B93310] origin-center pointer-events-none z-10"
        style={{
          top: "calc(33.33% - 4px)",
          height: "calc(33.33% + 8px)",
          marginLeft: "-4px",
          transform: "rotate(6deg)",
        }}
      />

      {/* Row 1 - CV & KTM */}
      <div className="flex h-1/3 relative z-20">
        <UploadSlot
          title="CV *"
          value={uploadData.cv}
          onChange={(name, data) => updateUploadField("cv", name, data)}
          fileData={rawFiles.cv}
          onRemove={() => removeUploadField("cv")}
          className="w-1/2"
          accept=".pdf,.doc,.docx"
          allowedExtensions={["pdf", "doc", "docx"]}
          allowedExtensionsLabel="PDF, DOC, DOCX"
        />
        <UploadSlot
          title="KTM *"
          value={uploadData.ktm}
          onChange={(name, data) => updateUploadField("ktm", name, data)}
          fileData={rawFiles.ktm}
          onRemove={() => removeUploadField("ktm")}
          className="w-1/2"
          accept=".pdf,.png,.jpg,.jpeg"
          allowedExtensions={["pdf", "png", "jpg", "jpeg"]}
          allowedExtensionsLabel="PDF, PNG, JPG, JPEG"
        />
      </div>

      {/* Row 2 - TWIBBON & BUKTI FOLLOW & REPOST */}
      <div className="flex h-1/3 relative z-20">
        <UploadSlot
          title="TWIBBON *"
          value={uploadData.twibbon}
          onChange={(name, data) => updateUploadField("twibbon", name, data)}
          fileData={rawFiles.twibbon}
          onRemove={() => removeUploadField("twibbon")}
          className="w-1/2"
          accept=".png,.jpg,.jpeg"
          allowedExtensions={["png", "jpg", "jpeg"]}
          allowedExtensionsLabel="PNG, JPG, JPEG"
        />
        <UploadSlot
          title="BUKTI FOLLOW DAN REPOST *"
          value={uploadData.buktiFollow}
          onChange={(name, data) => updateUploadField("buktiFollow", name, data)}
          fileData={rawFiles.buktiFollow}
          onRemove={() => removeUploadField("buktiFollow")}
          className="w-1/2"
          accept=".pdf,.doc,.docx,.zip,.rar"
          allowedExtensions={["pdf", "doc", "docx", "zip", "rar"]}
          allowedExtensionsLabel="PDF, DOC, DOCX, ZIP, RAR"
        />
      </div>

      {/* Row 3 - PORTOFOLIO */}
      <div className="flex h-1/3 relative z-20">
        <UploadSlot
          title={isPortfolioRequired ? "PORTOFOLIO *" : "PORTOFOLIO (Opsional)"}
          value={uploadData.portofolio}
          onChange={(name, data) => updateUploadField("portofolio", name, data)}
          fileData={rawFiles.portofolio}
          onRemove={() => removeUploadField("portofolio")}
          className="w-full"
          accept=".pdf,.doc,.docx,.zip,.rar"
          allowedExtensions={["pdf", "doc", "docx", "zip", "rar"]}
          allowedExtensionsLabel="PDF, DOC, DOCX, ZIP, RAR"
        />
      </div>
    </div>
  );
};
