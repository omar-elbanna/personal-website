# Assets to add

Drop these files into `/public` before shipping. Filenames matter, since the
site references them directly.

- `omar-elbanna-resume.pdf` — your resume. A placeholder is committed so the
  Resume button resolves; replace it with the real file.
- `cuphead-agent.gif` or `cuphead-agent.png` — the RL agent in action. Once
  added, wire it into `components/sections/Projects.tsx` and give it real alt
  text.
- `flick-screenshot.png` — a shot of the Flick app. Same wiring as above.

When you add project media, lazy-load it below the fold with `next/image`
(`loading="lazy"`), keep the intrinsic width/height set so nothing shifts, and
write descriptive alt text.

## Repo links

If the Cuphead and Flick repos are public, add a `repo` URL to each entry in
`lib/content.ts`. The project card will render an arrow link automatically.
