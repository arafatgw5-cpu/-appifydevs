"use client";

import { SITE, FOOTER_LINKS } from "@/lib/constants";
import { useNavigation } from "@/store/navigation";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const { goToLandingSection, setView } = useNavigation();
  const year = new Date().getFullYear();

  const handleLinkClick = (section: string) => {
    if (section === "extension") {
      setView("extension");
      return;
    }
    // In-page sections only — fallback to scroll attempt
    if (typeof document !== "undefined") {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    goToLandingSection(section);
  };

  return (
    <footer
      className="border-t border-border bg-muted/30"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Logo
              onClick={() => {
                setView("landing");
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {SITE.tagline}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <nav key={heading} aria-label={heading} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => handleLinkClick(link.section)}
                      className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
