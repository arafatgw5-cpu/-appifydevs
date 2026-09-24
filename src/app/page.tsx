"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useNavigation } from "@/store/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { WebAppShell } from "@/components/web-app/WebAppShell";
import { ExtensionExperience } from "@/components/extension/ExtensionExperience";

export default function Home() {
  const view = useNavigation((s) => s.view);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[100dvh]"
      >
        {view === "landing" && <LandingPage />}
        {view === "app" && <WebAppShell />}
        {view === "extension" && <ExtensionExperience />}
      </motion.div>
    </AnimatePresence>
  );
}
