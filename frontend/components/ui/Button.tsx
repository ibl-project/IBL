import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = HTMLMotionProps<"button">;

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <motion.button
      {...props}
      suppressHydrationWarning
      className={`bg-tosca outline outline-black inline-flex justify-center items-center font-hollywood text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${className}`}
      style={{
        width: "var(--btn-width)",
        height: "var(--btn-height)",
        fontSize: "var(--btn-font-size)",
        padding: "calc(var(--btn-height) * 10 / 48)", // proportional padding p-2.5 (10px)
        borderRadius: "calc(var(--btn-height) * 2)", // large pill rounded
        outlineWidth: "var(--btn-border)",
        boxShadow: "var(--btn-shadow) var(--btn-shadow) 0px 0px #000",
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{
        x: 6,
        y: 6,
        boxShadow: "2px 2px 0px 0px #000",
        transition: { type: "spring", stiffness: 450, damping: 15 },
      }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
