import { profile } from "@/lib/content";
import { Reveal, RevealItem } from "@/components/Reveal";
import { ContactLinks } from "@/components/ContactLinks";
import { FloatingSticker } from "@/components/FloatingSticker";
import { Sparkle } from "@/components/Stickers";

export function Footer() {
  return (
    <Reveal as="section" id="contact" className="scroll-mt-24 px-6 pb-16 pt-20">
      <div className="relative mx-auto max-w-content overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sticker sm:p-12">
        <FloatingSticker
          className="right-6 top-6 hidden w-12 sm:block"
          rotate={0}
          float={10}
          duration={4}
        >
          <Sparkle className="h-full w-full" />
        </FloatingSticker>

        <RevealItem>
          <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Get in touch
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-3 max-w-md text-muted">
            Open to software engineering internships and research
            collaborations. The fastest way to reach me is email.
          </p>
        </RevealItem>
        <RevealItem>
          <ContactLinks className="mt-7 flex flex-wrap gap-3" />
        </RevealItem>

        <RevealItem>
          <p className="mt-12 font-mono text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </RevealItem>
      </div>
    </Reveal>
  );
}
