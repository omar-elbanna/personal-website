import { experience, involvement, skills } from "@/lib/content";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FloatingSticker } from "@/components/FloatingSticker";
import { Keyboard, Star, Terminal } from "@/components/Stickers";
import type { ExperienceItem } from "@/lib/content";

function TimelineRow({ item }: { item: ExperienceItem }) {
  return (
    <RevealItem>
      <div className="grid gap-1 border-t border-border py-6 md:grid-cols-[10rem_1fr] md:gap-6">
        <div className="font-mono text-xs text-red md:pt-1">
          {item.timeframe}
        </div>
        <div>
          <h3 className="text-base font-semibold text-navy">
            {item.role}
            <span className="font-normal text-muted">, {item.org}</span>
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-fg/80">
            {item.description}
          </p>
        </div>
      </div>
    </RevealItem>
  );
}

export function Experience() {
  return (
    <Reveal as="section" id="experience" className="scroll-mt-24 px-6 py-20">
      <div className="relative mx-auto max-w-content">
        <FloatingSticker
          className="right-1 top-2 hidden w-14 sm:block md:w-16"
          rotate={-8}
          duration={5.5}
        >
          <Terminal className="h-full w-full" />
        </FloatingSticker>
        <FloatingSticker
          className="right-24 top-4 hidden w-7 lg:block"
          rotate={0}
          float={12}
          duration={4}
        >
          <Star className="h-full w-full" />
        </FloatingSticker>

        <SectionHeading index="04">Experience</SectionHeading>
        <div>
          {experience.map((item) => (
            <TimelineRow key={item.org} item={item} />
          ))}
        </div>

        <div className="relative">
          <FloatingSticker
            className="right-0 top-8 hidden w-16 sm:block md:w-20"
            rotate={7}
            duration={6}
          >
            <Keyboard className="h-full w-full" />
          </FloatingSticker>

          <RevealItem>
            <h3 className="mb-4 mt-14 text-sm font-semibold uppercase tracking-wider text-red">
              Skills
            </h3>
          </RevealItem>
          <RevealItem>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-navy/15 bg-surface px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-red/40 hover:text-red"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </RevealItem>
        </div>

        <div id="involvement" className="scroll-mt-24">
          <RevealItem>
            <h3 className="mb-2 mt-14 text-sm font-semibold uppercase tracking-wider text-red">
              Involvement
            </h3>
          </RevealItem>
          <div>
            {involvement.map((item) => (
              <TimelineRow key={item.org} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
