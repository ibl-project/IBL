"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
  placeholder = "Pilih...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col w-full text-left relative" ref={dropdownRef}>
      <label 
        className="font-bold text-[#2D2D2D] font-drowner tracking-widest"
        style={{ 
          fontSize: "var(--form-font-size)",
          marginBottom: "var(--form-margin-bottom)"
        }}
      >
        {label}
      </label>
      
      {/* Selection Box */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 text-gray-800 text-left outline-none flex justify-between items-center cursor-pointer shadow-sm"
        style={{
          fontSize: "var(--form-font-size)",
          paddingTop: "var(--form-padding-y)",
          paddingBottom: "var(--form-padding-y)",
          paddingLeft: "var(--form-padding-x)",
          paddingRight: "var(--form-padding-x)",
          borderRadius: "calc(var(--form-font-size) * 0.43)" // proportional to ~6px rounded-md
        }}
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected || placeholder}
        </span>
        <span 
          className="text-gray-400 transform transition-transform duration-200"
          style={{ fontSize: "calc(var(--form-font-size) * 0.85)" }}
        >
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Options Panel */}
      {isOpen && (
        <div 
          className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg z-50 overflow-hidden"
          style={{
            top: "calc(100% + var(--form-margin-bottom))",
            borderRadius: "calc(var(--form-font-size) * 0.43)"
          }}
        >
          <ul className="flex flex-col m-0 p-0 list-none">
            {options.map((option, idx) => (
              <li key={idx} className="m-0 p-0 border-b border-gray-100 last:border-b-0">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="w-full font-body text-gray-700 hover:bg-gray-50 text-left transition-colors cursor-pointer"
                  style={{
                    fontSize: "var(--form-font-size)",
                    paddingTop: "calc(var(--form-padding-y) * 1.2)",
                    paddingBottom: "calc(var(--form-padding-y) * 1.2)",
                    paddingLeft: "var(--form-padding-x)",
                    paddingRight: "var(--form-padding-x)"
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
