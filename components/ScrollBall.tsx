"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const R = 11; // ball radius, px
const NAVY = "#17325c";
const RED = "#d1402f";
const LEFT_X = 32; // where the ball parks on the left rail
const INSET = 16; // how close the curve's peaks get to the screen edges

type MeasuredAnchor = { right: boolean; y: number };

// The anchors the curve threads through, top to bottom. `right` picks which edge
// the line hugs (chosen to sit clear of that block's text); `at` places the
// anchor at the block's center or just below its bottom. Involvement gets its
// own anchor, held on the right, so the line stays clear of its text and only
// swings back toward center below it instead of cutting through the words.
type AnchorSpec = { id: string; right: boolean; at: "center" | "bottom" };
const ANCHOR_SPECS: AnchorSpec[] = [
  { id: "top", right: true, at: "center" },
  { id: "about", right: false, at: "center" },
  { id: "research", right: true, at: "center" },
  { id: "projects", right: false, at: "center" },
  { id: "experience", right: true, at: "center" },
  { id: "involvement", right: true, at: "bottom" },
  { id: "contact", right: false, at: "center" },
];

// Document-relative top, summed up the offsetParent chain so it is correct even
// for anchors nested inside positioned containers and unaffected by transforms.
function docTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

type PathData = {
  w: number;
  h: number;
  d: string;
  total: number;
  pts: { x: number; y: number }[];
  cum: number[];
};

/**
 * Builds one long, smooth curve that sweeps from edge to edge of the screen.
 * It sits at an anchor near the left or right edge through the vertical span of
 * each section (so it stays in the margins, clear of the centered text) and
 * crosses the middle only in the gaps between sections. Because it renders
 * behind the page, those center crossings also land behind the opaque cards.
 */
function buildPath(w: number, h: number, measured: MeasuredAnchor[]): PathData {
  const cx = w / 2;
  const leftX = INSET;
  const rightX = w - INSET;

  // Start centered at the top, thread through each measured anchor at its chosen
  // edge, and finish centered at the bottom. Every side-to-side move is spread
  // across the full distance between two anchors, so the horizontal motion stays
  // gentle and paced to the scroll instead of darting across.
  const anchors: { x: number; y: number }[] = [{ x: cx, y: 0 }];
  measured.forEach((a) => {
    anchors.push({ x: a.right ? rightX : leftX, y: a.y });
  });
  anchors.push({ x: cx, y: h });

  let d = `M${anchors[0].x.toFixed(1)} ${anchors[0].y.toFixed(1)}`;
  const pts: { x: number; y: number }[] = [{ x: anchors[0].x, y: anchors[0].y }];

  for (let s = 1; s < anchors.length; s++) {
    const A = anchors[s - 1];
    const B = anchors[s];
    const my = (A.y + B.y) / 2;
    // Control points share A's / B's x, so the curve is vertical at every
    // anchor. That keeps the joins smooth and the crossing centered in the gap.
    const c1 = { x: A.x, y: my };
    const c2 = { x: B.x, y: my };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${B.x.toFixed(1)} ${B.y.toFixed(1)}`;

    const steps = 40;
    for (let k = 1; k <= steps; k++) {
      const u = k / steps;
      const mu = 1 - u;
      const x =
        mu * mu * mu * A.x +
        3 * mu * mu * u * c1.x +
        3 * mu * u * u * c2.x +
        u * u * u * B.x;
      const y =
        mu * mu * mu * A.y +
        3 * mu * mu * u * c1.y +
        3 * mu * u * u * c2.y +
        u * u * u * B.y;
      pts.push({ x, y });
    }
  }

  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }

  return { w, h, d, total: cum[cum.length - 1], pts, cum };
}

/**
 * Finds the point on the curve at a given scroll fraction. Y is looked up
 * directly (the curve is monotonic in Y), so the ball's document-Y always
 * equals progress * height and stays inside the viewport as it weaves.
 */
function sampleAt(pd: PathData, p: number) {
  const targetY = Math.min(1, Math.max(0, p)) * pd.h;
  const pts = pd.pts;

  let lo = 1;
  let hi = pts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].y < targetY) lo = mid + 1;
    else hi = mid;
  }
  const a = pts[lo - 1];
  const b = pts[lo];
  const f = b.y === a.y ? 0 : (targetY - a.y) / (b.y - a.y);
  const x = a.x + (b.x - a.x) * f;
  const len = pd.cum[lo - 1] + (pd.cum[lo] - pd.cum[lo - 1]) * f;
  return { x, y: targetY, len };
}

/** The simple left-rail ball, used once the journey is complete. */
function RailBall() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });
  const top = useTransform(progress, [0, 1], ["1%", "94%"]);
  const rotate = useTransform(progress, [0, 1], [0, 1440]);
  const fillHeight = useTransform(progress, [0, 1], ["1%", "97%"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-none fixed left-5 top-0 z-30 hidden h-screen w-6 lg:block"
    >
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded bg-navy/10" />
      <motion.div
        style={{ height: fillHeight }}
        className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded bg-navy/25"
      />
      <motion.div
        style={{ top, rotate }}
        className="absolute left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-navy shadow-sticker"
      >
        <span className="h-2 w-[2px] rounded bg-red" />
      </motion.div>
    </motion.div>
  );
}

export function ScrollBall() {
  // Only mount the scroll/motion machinery after hydration. Running it during
  // the initial hydration commit trips React's "cannot update while rendering"
  // guard (framer's useScroll measures on mount). A post-hydration mount is a
  // clean client render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <ScrollBallInner />;
}

function ScrollBallInner() {
  const reduce = useReducedMotion();
  const [dims, setDims] = useState<{
    w: number;
    h: number;
    anchors: MeasuredAnchor[];
  } | null>(null);
  const [rail, setRail] = useState(false);
  const completedRef = useRef(false);

  const ballX = useMotionValue(0);
  const ballY = useMotionValue(0);
  const spin = useMotionValue(0);
  const dashOffset = useMotionValue(0);
  const enterY = useMotionValue(-90);
  const enterOpacity = useMotionValue(0);
  const overlayOpacity = useMotionValue(1);

  const path = useMemo(
    () => (dims ? buildPath(dims.w, dims.h, dims.anchors) : null),
    [dims]
  );
  const pathRef = useRef<PathData | null>(null);
  pathRef.current = path;

  const { scrollYProgress } = useScroll();

  // Measure the document + section centers, and rebuild on resize / reflow.
  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      const w = window.innerWidth;
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      // One anchor per block, placed at its center (or just below its bottom),
      // on the chosen edge.
      const anchors: MeasuredAnchor[] = [];
      for (const spec of ANCHOR_SPECS) {
        const el = document.getElementById(spec.id);
        if (!el) continue;
        const top = docTop(el);
        const bottom = top + el.offsetHeight;
        const y = spec.at === "center" ? (top + bottom) / 2 : bottom - 4;
        anchors.push({ right: spec.right, y });
      }

      setDims((prev) => {
        if (
          prev &&
          prev.w === w &&
          Math.abs(prev.h - h) < 6 &&
          prev.anchors.length === anchors.length &&
          prev.anchors.every(
            (a, i) =>
              a.right === anchors[i].right &&
              Math.abs(a.y - anchors[i].y) < 6
          )
        ) {
          return prev;
        }
        return { w, h, anchors };
      });
    };
    // Defer observer-driven measures to the next frame so a synchronous
    // ResizeObserver callback never sets state mid-render.
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [reduce]);

  // Place the ball at the current scroll position when the path (re)builds.
  useEffect(() => {
    const pd = pathRef.current;
    if (!pd) return;
    const s = sampleAt(pd, scrollYProgress.get());
    ballX.set(s.x);
    ballY.set(s.y);
    dashOffset.set(pd.total - s.len);
    spin.set((s.len / (2 * Math.PI * R)) * 360);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // Drive the ball along the curve as the page scrolls.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const pd = pathRef.current;
    if (!pd || rail) return;

    const s = sampleAt(pd, p);
    ballX.set(s.x);
    ballY.set(s.y);
    dashOffset.set(pd.total - s.len);
    spin.set((s.len / (2 * Math.PI * R)) * 360);

    if (p >= 0.992 && !completedRef.current) {
      completedRef.current = true;
      // Journey done: glide to the left edge, fade the trail, hand off to rail.
      animate(ballX, LEFT_X, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
      animate(overlayOpacity, 0, { duration: 0.45, delay: 0.3 });
      window.setTimeout(() => setRail(true), 780);
    }
  });

  // Ball drops into the page once the preloader curtain has lifted.
  useEffect(() => {
    if (reduce) return;
    let started = false;
    const enter = () => {
      if (started) return;
      started = true;
      animate(enterOpacity, 1, { duration: 0.3 });
      animate(enterY, 0, { type: "spring", stiffness: 170, damping: 12 });
    };
    window.addEventListener("preloader:done", enter);
    const fallback = window.setTimeout(enter, 4000);
    return () => {
      window.removeEventListener("preloader:done", enter);
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  if (reduce) return null;
  if (rail) return <RailBall />;
  if (!path) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: overlayOpacity, height: path.h }}
      className="pointer-events-none absolute inset-x-0 top-0 -z-[5] overflow-hidden"
    >
      <svg width={path.w} height={path.h} className="block">
        <path
          d={path.d}
          fill="none"
          stroke={NAVY}
          strokeOpacity={0.08}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <motion.path
          d={path.d}
          fill="none"
          stroke={NAVY}
          strokeOpacity={0.3}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={path.total}
          style={{ strokeDashoffset: dashOffset }}
        />
        <motion.g style={{ x: ballX, y: ballY }}>
          <motion.g style={{ y: enterY, opacity: enterOpacity, rotate: spin }}>
            <circle r={R} fill={NAVY} />
            <rect
              x={-1.25}
              y={-R + 2}
              width={2.5}
              height={R - 1}
              rx={1.25}
              fill={RED}
            />
            <circle
              r={R - 1}
              fill="none"
              stroke="#ffffff"
              strokeOpacity={0.18}
              strokeWidth={2}
            />
          </motion.g>
        </motion.g>
      </svg>
    </motion.div>
  );
}
