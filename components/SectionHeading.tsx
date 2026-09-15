import { RevealItem } from "@/components/Reveal";
import { Squiggle } from "@/components/Stickers";

export function SectionHeading({
  children,
  index,
}: {
  children: string;
  index: string;
}) {
  return (
    <RevealItem as="div" className="mb-8">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-medium text-red">{index}</span>
        <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          {children}
        </h2>
      </div>
      <Squiggle className="mt-1 ml-8 h-2.5 w-24 text-red" />
    </RevealItem>
  );
}
