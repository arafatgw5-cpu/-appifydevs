"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useNavigation } from "@/store/navigation";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { goToLandingSection, setView } = useNavigation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = () => {
    setMobileOpen(false);
    setView("landing");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (section: string) => {
    setMobileOpen(false);
    goToLandingSection(section);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo onClick={handleLogoClick} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button
              key={link.section}
              type="button"
              onClick={() => handleNavClick(link.section)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setView("extension")}
          >
            Install Extension
          </Button>
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setView("app")}
          >
            <Sparkles className="h-4 w-4" />
            Get Started
          </Button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/60 text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.section}
                  type="button"
                  onClick={() => handleNavClick(link.section)}
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -6 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-3 flex flex-col gap-2"
              >
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    setView("extension");
                  }}
                >
                  Install Extension
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    setView("app");
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  Get Started
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
