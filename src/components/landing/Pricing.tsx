"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { PRICING_PLANS } from "@/data/pricing";
import { useNavigation } from "@/store/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export function Pricing() {
  const { setView } = useNavigation();
  const [billing, setBilling] = React.useState<Billing>("monthly");

  return (
    <section
      id="pricing"
      className="relative scroll-mt-12 py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="pricing-heading"
    >
      <Reveal className="mx-auto max-w-2xl text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest">Plans</span>
        </div>
        <h2
          id="pricing-heading"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-stone-900 dark:text-white"
        >
          Simple pricing that scales with you.
        </h2>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          Start free. Upgrade when you need more power. Cancel anytime.
        </p>
      </Reveal>

      {/* Billing toggle */}
      <Reveal className="flex justify-center mb-12">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex items-center rounded-full p-1 border shadow-sm dark:shadow-none bg-white dark:bg-[#15131F] border-black/5 dark:border-white/5"
        >
          {(["monthly", "yearly"] as const).map((b) => {
            const active = billing === b;
            return (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setBilling(b)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                  active
                    ? "text-white"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full bg-violet-600 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {b === "monthly" ? "Monthly" : "Yearly"}
                  {b === "yearly" && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        active
                          ? "bg-white/20 text-white"
                          : "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
                      )}
                    >
                      Save 20%
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Stagger
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        gap={0.1}
      >
        {PRICING_PLANS.map((plan) => {
          const isPro = plan.highlighted;
          const price = billing === "monthly" ? plan.monthly : plan.yearly;
          const isEnterprise = plan.id === "enterprise";
          const isFree = plan.id === "free";

          return (
            <StaggerItem key={plan.id} className="h-full">
              <div
                className={cn(
                  "relative flex flex-col h-full rounded-3xl p-8 transition-all duration-300",
                  isPro
                    ? "bg-[#15131F] dark:bg-[#1C1A27] border-2 border-violet-500/50 shadow-2xl shadow-violet-500/20 lg:-mt-4 lg:mb-4"
                    : "bg-white dark:bg-[#15131F] border border-black/5 dark:border-white/5 shadow-xl shadow-stone-200/40 dark:shadow-black/40 hover:-translate-y-1 hover:shadow-2xl"
                )}
              >
                {isPro && (
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent rounded-3xl pointer-events-none" />
                )}

                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white shadow-md shadow-violet-500/30 uppercase tracking-widest">
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className={cn("text-xl font-bold", isPro ? "text-white" : "text-stone-900 dark:text-white")}>
                    {plan.name}
                  </h3>
                  <p className={cn("mt-2 text-sm leading-relaxed min-h-[40px]", isPro ? "text-stone-300" : "text-stone-500 dark:text-stone-400")}>
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex h-14 items-baseline gap-1">
                    {isEnterprise ? (
                      <span className={cn("text-4xl font-extrabold tracking-tight", isPro ? "text-white" : "text-stone-900 dark:text-white")}>
                        Custom
                      </span>
                    ) : (
                      <>
                        <span className="text-xl font-semibold text-stone-400">$</span>
                        <span className={cn("text-5xl font-extrabold tracking-tight", isPro ? "text-white" : "text-stone-900 dark:text-white")}>
                          {price}
                        </span>
                        <span className={cn("text-sm font-medium ml-1", isPro ? "text-stone-400" : "text-stone-500 dark:text-stone-500")}>
                          /mo
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="h-4 mt-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={billing + plan.id}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={cn("text-xs font-medium", isPro ? "text-stone-400" : "text-stone-500")}
                      >
                        {isEnterprise
                          ? "Tailored to your organization"
                          : isFree
                            ? "Free forever, no card required"
                            : billing === "yearly"
                              ? "Billed annually"
                              : "Billed monthly"}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => setView("app")}
                    className={cn(
                      "mt-8 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2",
                      isPro
                        ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/25 hover:-translate-y-0.5"
                        : "bg-stone-100 text-stone-900 hover:bg-stone-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    )}
                  >
                    {plan.cta}
                  </button>

                  <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 flex-1">
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <div className={cn("mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center", isPro ? "bg-violet-500/20" : "bg-violet-500/10")}>
                            <Check className={cn("h-3 w-3", isPro ? "text-violet-400" : "text-violet-600 dark:text-violet-400")} />
                          </div>
                          <span className={cn("text-sm leading-snug", isPro ? "text-stone-200" : "text-stone-600 dark:text-stone-300")}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
