import { research, researchNote } from "@/lib/content";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FloatingSticker } from "@/components/FloatingSticker";
import { NeuralNet, Headphones, Sparkle } from "@/components/Stickers";
import { ArrowIcon } from "@/components/icons";

export function Research() {
  return (
    <Reveal as="section" id="research" className="scroll-mt-24 px-6 py-20">
      <div className="relative mx-auto max-w-content">
        <FloatingSticker
          className="-top-2 right-0 hidden w-16 sm:block md:w-20"
          rotate={-8}
          duration={6}
        >
          <NeuralNet className="h-full w-full" />
        </FloatingSticker>
        <FloatingSticker
          className="-bottom-2 right-4 hidden w-16 lg:block"
          rotate={8}
          duration={5.5}
        >
          <Headphones className="h-full w-full" />
        </FloatingSticker>
        <FloatingSticker
          className="right-40 top-1 hidden w-7 lg:block"
          rotate={0}
          float={12}
          duration={4}
        >
          <Sparkle className="h-full w-full" />
        </FloatingSticker>

        <SectionHeading index="02">Research</SectionHeading>

        <div className="grid gap-4 md:grid-cols-3">
          {research.map((item) => (
            <RevealItem key={item.venue}>
              <a
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-[0_1px_0_rgba(23,50,92,0.04)] transition-all duration-200 hover:-translate-y-1.5 hover:border-red/50 hover:shadow-sticker"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:text-red">
                    {item.venue}
                    <ArrowIcon className="h-3.5 w-3.5 text-navy/40 transition-colors group-hover:text-red" />
                  </h3>
                  <span className="shrink-0 rounded-full bg-navy/5 px-2 py-0.5 font-mono text-xs text-navy">
                    {item.year}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-fg/75">
                  {item.description}
                </p>
              </a>
            </RevealItem>
          ))}
        </div>

        <RevealItem>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            {researchNote}
          </p>
        </RevealItem>
      </div>
    </Reveal>
  );
}
