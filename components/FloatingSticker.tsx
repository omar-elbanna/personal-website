"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Positions a sticker (via className) and gives it a gentle idle float plus a
 * playful hover. It pops in the first time it scrolls into view. Motion is
 * dropped entirely for reduced-motion users, leaving a static sticker.
 */
export function FloatingSticker({
  children,
  className,
  rotate = 0,
  delay = 0,
  float = 9,
  duration = 5,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  delay?: number;
  float?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 12 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 140, damping: 12, delay }}
    >
      <motion.div
        className="pointer-events-auto drop-shadow-sticker"
        animate={
          reduce
            ? undefined
            : { y: [0, -float, 0], rotate: [rotate, rotate + 3, rotate] }
        }
        transition={
          reduce
            ? undefined
            : { duration, repeat: Infinity, ease: "easeInOut", delay }
        }
        whileHover={reduce ? undefined : { scale: 1.15, rotate: rotate + 8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
