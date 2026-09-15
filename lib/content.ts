export const profile = {
  name: "Omar El-Banna",
  roles: ["AI Researcher.", "Software Engineer.", "Team Lead."],
  subline:
    "AI researcher and CS student at the University of Minnesota, Honors Program.",
  links: {
    resume: "/omar-elbanna-resume.pdf",
    github: "https://github.com/omar-elbanna",
    linkedin: "https://www.linkedin.com/in/omarel-banna",
    email: "oelbanna1014@gmail.com",
  },
};

export const about = {
  paragraph:
    "I'm a computer science student at the University of Minnesota, currently an incoming junior thanks to about 60 transfer credits from PSEO. Currently, I am studying how multimodal language models process conflicting audio and visual evidence, work that's earned three ICML 2026 workshop acceptances. I have a genuine passion for building things, whether that's research infrastructure, an RL agent that plays Cuphead, or a real-time app for picking movie night, and I like turning ideas into working systems from scratch.",
};

export type ResearchItem = {
  venue: string;
  year: string;
  description: string;
  repo: string;
};

export const research: ResearchItem[] = [
  {
    venue: "CompLearn workshop",
    year: "ICML 2026",
    description:
      "Studied prior dominance in audio-visual LLMs: models override multimodal evidence with learned generative priors at a consistent layer.",
    repo: "https://github.com/omar-elbanna/research-papers/blob/main/CompLearn.pdf",
  },
  {
    venue: "FoGen workshop",
    year: "ICML 2026",
    description:
      "Localized the “snap layer” where this override happens (layer 25.5 ± 1) and isolated 21 conflict-resolution attention heads in layers 15 to 18.",
    repo: "https://github.com/omar-elbanna/research-papers/blob/main/PriorDominance.pdf",
  },
  {
    venue: "ML for Audio workshop",
    year: "ICML 2026",
    description:
      "Benchmarked VideoLLaMA2 and InternVideo2 across 6,300+ AVHBench samples, quantifying a 32.3% accuracy drop and 17.3% instruction failure rate under cross-modal conflict.",
    repo: "https://github.com/omar-elbanna/research-papers/blob/main/ML_For_Audio_Paper.pdf",
  },
];

export const researchNote =
  "Being part of the ICML workshop program meant presenting research alongside graduate students and faculty from leading labs, valuable experience this early in a CS degree. Throughout, I was mentored by researchers affiliated with Stanford and UC Berkeley, who shaped both the direction of the work and how I communicate it.";

export type Project = {
  name: string;
  timeframe: string;
  intro: string;
  points: string[];
  tags: string[];
  repo?: string;
  sticker: "cup" | "clapper";
};

export const projects: Project[] = [
  {
    name: "Reinforcement learning on Cuphead",
    timeframe: "May 2026 to present",
    sticker: "cup",
    repo: "https://github.com/omar-elbanna/cuphead-rl",
    intro:
      "I built an AI agent that learns to play Cuphead, a notoriously difficult platformer, by watching the screen and deciding what to do next, the same way a person would, without hooking into the game's code.",
    points: [
      "Built a custom training environment that lets the agent practice against real Cuphead boss fights, handling input timing so it doesn't get stuck spamming keys, which made training about 4x faster.",
      "Trained a small object detector to spot enemies and projectiles on screen in real time, accurate 99% of the time and fast enough to react in about 30 milliseconds.",
      "Since I couldn't access the game's internal data, I built a vision system that reads on-screen health bars and game state directly from the video feed, accurate enough that the agent learned to clear the first boss.",
    ],
    tags: ["PyTorch", "YOLOv8", "Gymnasium", "Computer vision"],
  },
  {
    name: "Flick",
    timeframe: "June 2026",
    sticker: "clapper",
    repo: "https://github.com/omar-elbanna/flick",
    intro:
      "Flick is an app I built so a group of friends can pick a movie without the usual back and forth. Everyone joins a live session, the app suggests five movies, the group votes, and the winner pops up on every screen at once.",
    points: [
      "Built the whole thing end to end: a Python backend (FastAPI), a Next.js frontend, and GPT-4o-mini to generate the movie suggestions.",
      "The AI's first picks were often wrong, so I added a check that verifies every suggested movie against a real film database before showing it, which took accuracy from around 20% to nearly perfect.",
      "Added real login security (encrypted sessions with token rotation, Google sign-in) and a CI pipeline that automatically tests and scans the code for issues every time I push a change.",
    ],
    tags: ["FastAPI", "Next.js", "TypeScript", "GPT-4o-mini"],
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  timeframe: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "AI researcher",
    org: "Algoverse",
    timeframe: "Jan 2026 to present",
    description:
      "Researching why multimodal AI models sometimes ignore what they're actually seeing and hearing in favor of a memorized guess. This work led to three ICML 2026 workshop acceptances, including a breakthrough finding, prior dominance, that pinpoints where in the model this override happens.",
  },
  {
    role: "Team Lead",
    org: "Best Buy",
    timeframe: "Jun 2025 to present",
    description:
      "Lead a team of sales advisors in consumer electronics, helping raise the store's customer experience scorecard and shape team culture, while certified as an advisor on Apple's ecosystem across iPhone, Mac, and iPad. Ranked top 10 in the market with $550K+ in quarterly revenue.",
  },
];

export const skills = [
  "Python",
  "Java",
  "TypeScript",
  "PyTorch",
  "Next.js",
  "FastAPI",
  "Docker",
  "Git/GitHub",
];

export const involvement: ExperienceItem[] = [
  {
    role: "Founding board member",
    org: "Minorities in STEM",
    timeframe: "Oct 2025 to present",
    description:
      "Helped start a new student organization from scratch as an underclassman, building a platform for minority voices on campus. Grew it into events reaching 200+ students, while leading the teams responsible for event coordination and social media.",
  },
];
