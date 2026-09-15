"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Wraps a block and reveals it (fade + slight rise) the first time it scrolls
 * into view. Children marked with <RevealItem> stagger in one after another.
 */
export function Reveal({
  children,
  className,
  as = "div",
  stagger = 0.08,
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
  stagger?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      // Trigger the reveal later (well up into the viewport) so a section pops in
      // roughly as the rolling ball reaches it on the first scroll, rather than
      // the moment it peeks in from the bottom.
      viewport={{ once: true, margin: "-200px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "h2" | "p" | "span";
}) {
  const reduce = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  };

  const MotionTag = motion[as] as ElementType;

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
