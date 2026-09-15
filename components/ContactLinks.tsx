import { profile } from "@/lib/content";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  FileIcon,
} from "@/components/icons";

const outline =
  "group inline-flex items-center gap-2 rounded-lg border border-navy/20 bg-surface px-4 py-2 text-sm font-medium text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-red/50 hover:text-red";

const primary =
  "group inline-flex items-center gap-2 rounded-lg border border-navy bg-navy px-4 py-2 text-sm font-medium text-surface shadow-sticker transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy/90";

export function ContactLinks({ className }: { className?: string }) {
  const { links } = profile;
  return (
    <div className={className}>
      <a
        href={links.resume}
        className={primary}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileIcon className="h-4 w-4" />
        Resume
      </a>
      <a
        href={links.github}
        className={outline}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon className="h-4 w-4 text-navy/60 transition-colors group-hover:text-red" />
        GitHub
      </a>
      <a
        href={links.linkedin}
        className={outline}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon className="h-4 w-4 text-navy/60 transition-colors group-hover:text-red" />
        LinkedIn
      </a>
      <a href={`mailto:${links.email}`} className={outline}>
        <MailIcon className="h-4 w-4 text-navy/60 transition-colors group-hover:text-red" />
        Email
      </a>
    </div>
  );
}
