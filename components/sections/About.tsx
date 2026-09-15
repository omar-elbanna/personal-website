import { about } from "@/lib/content";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FloatingSticker } from "@/components/FloatingSticker";
import { Bulb, Headphones, Star } from "@/components/Stickers";

export function About() {
  return (
    <Reveal as="section" id="about" className="scroll-mt-24 px-6 py-20">
      <div className="relative mx-auto max-w-content">
        {/* Stickers fill the open space to the right of the paragraph. */}
        <FloatingSticker
          className="right-2 top-4 hidden w-16 md:block md:w-20"
          rotate={9}
          duration={6}
        >
          <Bulb className="h-full w-full" />
        </FloatingSticker>
        <FloatingSticker
          className="bottom-2 right-10 hidden w-20 lg:block"
          rotate={-8}
          duration={5.5}
        >
          <Headphones className="h-full w-full" />
        </FloatingSticker>
        <FloatingSticker
          className="bottom-16 right-52 hidden w-8 lg:block"
          rotate={0}
          float={12}
          duration={4}
        >
          <Star className="h-full w-full" />
        </FloatingSticker>

        <SectionHeading index="01">About</SectionHeading>
        <RevealItem>
          <p className="max-w-2xl text-lg leading-relaxed text-fg/85 sm:text-xl">
            {about.paragraph}
          </p>
        </RevealItem>
      </div>
    </Reveal>
  );
}
