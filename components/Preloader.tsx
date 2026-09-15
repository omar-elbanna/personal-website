"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TRACK = 224; // px
const BALL = 20; // px

export function Preloader() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => setLoading(false), reduce ? 350 : 1750);
    return () => clearTimeout(id);
  }, [reduce]);

  useEffect(() => {
    if (loading) return;
    const id = setTimeout(() => {
      document.body.style.overflow = "";
    }, 650);
    return () => clearTimeout(id);
  }, [loading]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        // Tell the scroll ball to drop into the page now that the curtain is up.
        window.dispatchEvent(new Event("preloader:done"));
      }}
    >
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="mb-6 font-mono text-sm tracking-wide text-navy"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Omar El-Banna
          </motion.p>

          <div className="relative" style={{ width: TRACK, height: BALL }}>
            <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-border" />
            {/* red fill following the ball */}
            <motion.div
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded bg-red"
              initial={{ width: 0 }}
              animate={{ width: reduce ? TRACK : TRACK - BALL / 2 }}
              transition={{ duration: reduce ? 0.2 : 1.25, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 flex items-center justify-center rounded-full bg-navy"
              style={{ width: BALL, height: BALL }}
              initial={{ x: 0, rotate: 0 }}
              animate={{ x: reduce ? TRACK - BALL : TRACK - BALL, rotate: reduce ? 0 : 900 }}
              transition={{ duration: reduce ? 0.2 : 1.25, ease: "easeInOut" }}
            >
              <span className="h-2 w-[2px] rounded bg-red" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
