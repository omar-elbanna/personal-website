"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 65;
const DELETE_MS = 35;
const HOLD_MS = 1600;

export function RotatingText({ phrases }: { phrases: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Reduced motion: show the phrases cycling with a plain swap, no typing.
  useEffect(() => {
    if (!reduce) return;
    setText(phrases[0]);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, HOLD_MS + 400);
    return () => clearInterval(id);
  }, [reduce, phrases]);

  useEffect(() => {
    if (reduce) return;
    const current = phrases[index];

    if (!deleting && text === current) {
      const id = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(id);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const id = setTimeout(
      () => {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      },
      deleting ? DELETE_MS : TYPE_MS
    );
    return () => clearTimeout(id);
  }, [text, deleting, index, phrases, reduce]);

  const shown = reduce ? phrases[index] : text;

  return (
    <span className="text-red">
      {/* Visible, animated line for sighted users */}
      <span aria-hidden="true">{shown}</span>
      {!reduce && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-[2px] translate-y-[2px] self-stretch bg-red animate-pulse"
          style={{ height: "1em" }}
        />
      )}
      {/* Full, static list for screen readers and no-JS */}
      <span className="sr-only">{phrases.join(" ")}</span>
    </span>
  );
}
