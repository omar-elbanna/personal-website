import { projects } from "@/lib/content";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FloatingSticker } from "@/components/FloatingSticker";
import { ArrowIcon } from "@/components/icons";
import { CupChar, Clapperboard, Rocket, Bolt } from "@/components/Stickers";

const stickers = {
  cup: CupChar,
  clapper: Clapperboard,
};

export function Projects() {
  return (
    <Reveal as="section" id="projects" className="scroll-mt-24 px-6 py-20">
      <div className="relative mx-auto max-w-content">
        <FloatingSticker
          className="-top-4 left-56 hidden w-16 sm:block sm:left-64 md:left-72 md:w-20"
          rotate={10}
          duration={6}
        >
          <Rocket className="h-full w-full" />
        </FloatingSticker>
        <FloatingSticker
          className="-top-2 left-60 hidden w-7 lg:block"
          rotate={-8}
          float={11}
          duration={4.5}
        >
          <Bolt className="h-full w-full" />
        </FloatingSticker>

        <SectionHeading index="03">Selected Projects</SectionHeading>

        <div className="grid gap-6">
          {projects.map((project) => {
            const Sticker = stickers[project.sticker];
            return (
              <RevealItem key={project.name}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-xl border border-border bg-surface p-6 shadow-[0_1px_0_rgba(23,50,92,0.04)] transition-all duration-200 hover:-translate-y-1.5 hover:border-red/50 hover:shadow-sticker sm:p-8"
                >
                  {/* washi tape corner, scrapbook style */}
                  <span className="tape -top-3 left-8 -rotate-6" aria-hidden="true" />

                  {/* project sticker, tucked in the top-right corner */}
                  <FloatingSticker
                    className="-right-3 -top-6 hidden w-16 sm:block md:w-20"
                    rotate={10}
                    duration={6}
                  >
                    <Sticker className="h-full w-full" />
                  </FloatingSticker>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pr-16 sm:pr-20">
                    <h3 className="inline-flex items-center gap-1.5 text-lg font-semibold text-navy group-hover:text-red">
                      {project.name}
                      <ArrowIcon className="h-4 w-4 text-navy/50 transition-colors group-hover:text-red" />
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {project.timeframe}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg/90">
                    {project.intro}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {project.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-fg/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-navy/15 bg-navy/5 px-2.5 py-1 font-mono text-xs text-navy"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </a>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
