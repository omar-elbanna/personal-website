"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/content";
import { RotatingText } from "@/components/RotatingText";
import { ContactLinks } from "@/components/ContactLinks";
import { PinIcon } from "@/components/icons";

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center px-6 pt-24"
    >
      {/* Two-column flow: the text always sits in its own column and the
          illustration only appears once there's real room for it, scaling with
          the viewport instead of floating over the text. */}
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 md:flex-row md:items-center md:gap-8">
        <div className="w-full md:flex-1 md:min-w-0">
          <motion.h1
            {...rise(0)}
            className="text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m
            <br />
            <span className="whitespace-nowrap">Omar El-Banna</span>
          </motion.h1>

          <div className="mt-7 border-l-2 border-red/30 pl-5 sm:pl-8">
            <motion.div
              {...rise(0.12)}
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              <RotatingText phrases={profile.roles} />
            </motion.div>

            <motion.p
              {...rise(0.2)}
              className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {profile.subline}
            </motion.p>
          </div>

          <motion.p
            {...rise(0.25)}
            className="mt-5 inline-flex items-center gap-1.5 font-medium text-red"
          >
            <PinIcon className="h-4 w-4" />
            Minneapolis, MN
          </motion.p>

          <motion.div {...rise(0.32)}>
            <ContactLinks className="mt-9 flex flex-wrap gap-x-5 gap-y-3" />
          </motion.div>
        </div>

        {/* Illustration: hidden on phones, then a fluid share of the row at
            larger widths. Uses clamp so it can never blow past its column
            or shrink below a legible size in split-screen. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="pointer-events-none hidden shrink-0 md:block md:w-[38%] lg:w-[42%]"
          style={{ maxWidth: "clamp(14rem, 34vw, 26rem)" }}
        >
          <img
            src="/hero-illustration.png"
            alt=""
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
