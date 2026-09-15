/*
 * Original inline-SVG stickers in the site palette (navy / red / cream).
 * No external images, so they load instantly and cause no layout shift.
 * All use viewBox 0 0 120 120 and inherit sizing from a className.
 */

const NAVY = "#17325c";
const RED = "#d1402f";
const CREAM = "#fffdf8";

type P = { className?: string };

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 120 120",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Original cup character. A friendly nod to the Cuphead project, not the game art. */
export function CupChar({ className }: P) {
  return (
    <svg {...base} className={className}>
      {/* straw */}
      <path d="M60 40 L60 22 Q60 15 70 14" fill="none" stroke={RED} strokeWidth="6" />
      {/* body */}
      <path
        d="M38 44 L82 44 L76 100 Q75 106 69 106 L51 106 Q45 106 44 100 Z"
        fill={CREAM}
        stroke={NAVY}
        strokeWidth="5"
      />
      {/* rim */}
      <ellipse cx="60" cy="44" rx="24" ry="7" fill={CREAM} stroke={NAVY} strokeWidth="5" />
      {/* handle */}
      <path d="M82 58 Q102 60 100 76 Q98 90 82 88" fill="none" stroke={NAVY} strokeWidth="5" />
      {/* cheeks */}
      <circle cx="48" cy="74" r="4.5" fill={RED} opacity="0.8" />
      <circle cx="72" cy="74" r="4.5" fill={RED} opacity="0.8" />
      {/* eyes */}
      <circle cx="53" cy="64" r="4.5" fill={NAVY} />
      <circle cx="67" cy="64" r="4.5" fill={NAVY} />
      {/* smile */}
      <path d="M51 78 Q60 87 69 78" fill="none" stroke={NAVY} strokeWidth="4" />
    </svg>
  );
}

export function GameController({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="16" y="42" width="88" height="40" rx="20" fill={NAVY} />
      {/* d-pad */}
      <rect x="34" y="55" width="18" height="6" rx="2" fill={CREAM} />
      <rect x="40" y="49" width="6" height="18" rx="2" fill={CREAM} />
      {/* buttons */}
      <circle cx="78" cy="55" r="5" fill={RED} />
      <circle cx="90" cy="66" r="5" fill={CREAM} />
      <circle cx="78" cy="66" r="4" fill={RED} opacity="0.7" />
    </svg>
  );
}

export function Keyboard({ className }: P) {
  const keys = [
    [26, 46],
    [42, 46],
    [58, 46],
    [74, 46],
    [90, 46],
    [26, 60],
    [42, 60],
    [58, 60],
    [74, 60],
    [90, 60],
  ];
  return (
    <svg {...base} className={className}>
      <rect x="14" y="38" width="92" height="46" rx="8" fill={CREAM} stroke={NAVY} strokeWidth="5" />
      {keys.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="10" height="9" rx="2" fill={NAVY} opacity="0.85" />
      ))}
      {/* spacebar */}
      <rect x="38" y="72" width="44" height="7" rx="2" fill={RED} opacity="0.85" />
    </svg>
  );
}

export function Laptop({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="26" y="26" width="68" height="46" rx="5" fill={NAVY} />
      <rect x="32" y="32" width="56" height="34" rx="2" fill={CREAM} />
      {/* code brackets on screen */}
      <path d="M46 44 L41 51 L46 58 M74 44 L79 51 L74 58 M62 42 L58 60" fill="none" stroke={NAVY} strokeWidth="3.5" />
      {/* base */}
      <path d="M18 78 L102 78 L110 88 L10 88 Z" fill={NAVY} />
      <rect x="50" y="80" width="20" height="3.5" rx="1.75" fill={CREAM} opacity="0.6" />
    </svg>
  );
}

export function Clapperboard({ className }: P) {
  return (
    <svg {...base} className={className}>
      {/* board */}
      <rect x="22" y="52" width="76" height="42" rx="5" fill={NAVY} />
      {/* play button */}
      <path d="M54 64 L54 82 L70 73 Z" fill={RED} />
      {/* clapper bar */}
      <g transform="rotate(-6 60 44)">
        <rect x="20" y="36" width="80" height="14" rx="3" fill={CREAM} stroke={NAVY} strokeWidth="3" />
        <path d="M32 36 L26 50 M48 36 L42 50 M64 36 L58 50 M80 36 L74 50 M96 36 L90 50" stroke={NAVY} strokeWidth="5" />
      </g>
    </svg>
  );
}

export function NeuralNet({ className }: P) {
  const nodes: [number, number][] = [
    [30, 40],
    [30, 80],
    [60, 30],
    [60, 60],
    [60, 90],
    [90, 45],
    [90, 75],
  ];
  const edges: [number, number][] = [
    [0, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 5],
    [3, 6],
    [4, 6],
  ];
  return (
    <svg {...base} className={className}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={i % 3 === 0 ? RED : NAVY}
          strokeWidth="2.5"
          opacity="0.7"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={CREAM} stroke={NAVY} strokeWidth="4" />
      ))}
    </svg>
  );
}

export function Sparkle({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M60 20 Q64 54 96 60 Q64 66 60 100 Q56 66 24 60 Q56 54 60 20 Z" fill={RED} />
    </svg>
  );
}

export function Star({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path
        d="M60 22 L71 48 L99 50 L77 68 L84 96 L60 80 L36 96 L43 68 L21 50 L49 48 Z"
        fill={NAVY}
      />
    </svg>
  );
}

export function Squiggle({ className }: P) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24" aria-hidden className={className}>
      <path
        d="M4 14 Q26 2 48 14 T92 14 T136 14 T180 14 L196 14"
        fill="none"
        stroke={RED}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Bolt({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M66 18 L36 66 L58 66 L52 102 L86 50 L62 50 Z" fill={RED} stroke={NAVY} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function Headphones({ className }: P) {
  return (
    <svg {...base} className={className}>
      {/* headband */}
      <path d="M28 66 V56 a32 32 0 0 1 64 0 V66" fill="none" stroke={NAVY} strokeWidth="5" />
      {/* ear cups */}
      <rect x="20" y="62" width="16" height="28" rx="6" fill={RED} />
      <rect x="84" y="62" width="16" height="28" rx="6" fill={RED} />
      <rect x="24" y="66" width="8" height="20" rx="3" fill={CREAM} opacity="0.5" />
    </svg>
  );
}

export function Bulb({ className }: P) {
  return (
    <svg {...base} className={className}>
      {/* rays */}
      <path d="M60 14 V4 M92 26 L99 19 M28 26 L21 19 M100 56 H110 M20 56 H10" stroke={RED} strokeWidth="4" />
      {/* glass */}
      <path d="M60 24 a28 28 0 0 1 18 49 q-4 4 -4 10 H46 q0 -6 -4 -10 A28 28 0 0 1 60 24 Z" fill={CREAM} stroke={NAVY} strokeWidth="5" />
      {/* filament */}
      <path d="M52 66 L60 54 L68 66" fill="none" stroke={RED} strokeWidth="3.5" />
      {/* base */}
      <rect x="48" y="86" width="24" height="7" rx="2" fill={NAVY} />
      <rect x="51" y="95" width="18" height="6" rx="2" fill={NAVY} />
    </svg>
  );
}

export function Terminal({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="16" y="26" width="88" height="68" rx="8" fill={NAVY} />
      <rect x="16" y="26" width="88" height="16" rx="8" fill={NAVY} />
      <circle cx="28" cy="34" r="3" fill={RED} />
      <circle cx="40" cy="34" r="3" fill={CREAM} opacity="0.7" />
      {/* prompt */}
      <path d="M30 58 L40 66 L30 74" fill="none" stroke={CREAM} strokeWidth="4" />
      <path d="M48 76 H74" stroke={RED} strokeWidth="4" />
    </svg>
  );
}

export function Rocket({ className }: P) {
  return (
    <svg {...base} className={className}>
      {/* body */}
      <path d="M60 14 C74 26 80 44 80 62 L40 62 C40 44 46 26 60 14 Z" fill={CREAM} stroke={NAVY} strokeWidth="5" />
      {/* window */}
      <circle cx="60" cy="44" r="8" fill={RED} />
      {/* fins */}
      <path d="M40 60 L28 78 L44 72 Z" fill={NAVY} />
      <path d="M80 60 L92 78 L76 72 Z" fill={NAVY} />
      {/* flame */}
      <path d="M52 66 Q60 96 68 66 Z" fill={RED} />
    </svg>
  );
}

/**
 * The hero centerpiece: a cartoon person typing at a laptop with one finger
 * raised and a lit lightbulb beside them. A wider viewBox holds the whole scene.
 */
export function PersonAtLaptop({ className }: P) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 180"
      aria-hidden
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* desk */}
      <path d="M18 152 H184" stroke={NAVY} strokeWidth="5" fill="none" />

      {/* body / sweater */}
      <path
        d="M78 84 Q76 74 87 73 L129 73 Q140 74 138 84 L150 152 L66 152 Z"
        fill={CREAM}
        stroke={NAVY}
        strokeWidth="5"
      />

      {/* raised arm, drawn as an outlined tube */}
      <path d="M86 88 Q69 78 69 59 Q69 47 77 41" fill="none" stroke={NAVY} strokeWidth="13" />
      <path d="M86 88 Q69 78 69 59 Q69 47 77 41" fill="none" stroke={CREAM} strokeWidth="6" />
      {/* fist + pointing finger */}
      <circle cx="78" cy="37" r="8" fill={CREAM} stroke={NAVY} strokeWidth="4.5" />
      <path d="M78 33 V19" stroke={NAVY} strokeWidth="7" fill="none" />
      <path d="M78 32 V21" stroke={CREAM} strokeWidth="2.6" fill="none" />

      {/* head */}
      <circle cx="108" cy="47" r="20" fill={CREAM} stroke={NAVY} strokeWidth="5" />
      <path
        d="M88 47 Q88 25 108 25 Q128 25 128 47 Q119 39 108 40 Q97 39 88 47 Z"
        fill={NAVY}
      />
      <circle cx="101" cy="48" r="2.6" fill={NAVY} />
      <circle cx="115" cy="48" r="2.6" fill={NAVY} />
      <circle cx="108" cy="57" r="3" fill="none" stroke={NAVY} strokeWidth="2.6" />

      {/* laptop lid (in front of the lower body) */}
      <path d="M94 152 L146 152 L140 114 L100 114 Z" fill={NAVY} />
      <circle cx="120" cy="133" r="5" fill={CREAM} opacity="0.55" />
      <path d="M84 152 L156 152 L162 160 L78 160 Z" fill={NAVY} />

      {/* arm reaching to the laptop, over the lid */}
      <path d="M130 86 Q145 98 149 118" fill="none" stroke={NAVY} strokeWidth="13" />
      <path d="M130 86 Q145 98 149 118" fill="none" stroke={CREAM} strokeWidth="6" />
      <circle cx="149" cy="120" r="7" fill={CREAM} stroke={NAVY} strokeWidth="4.5" />

      {/* lightbulb */}
      <path
        d="M172 26 v-7 M187 33 l5 -4 M157 33 l-5 -4 M190 49 h6 M154 49 h-6"
        stroke={RED}
        strokeWidth="3.5"
        fill="none"
      />
      <circle cx="172" cy="46" r="13" fill={CREAM} stroke={NAVY} strokeWidth="4.5" />
      <path d="M166 47 l6 -7 l6 7" fill="none" stroke={RED} strokeWidth="3" />
      <rect x="165" y="57" width="14" height="5" rx="2" fill={NAVY} />
      <rect x="167" y="63.5" width="10" height="4" rx="2" fill={NAVY} />
    </svg>
  );
}
