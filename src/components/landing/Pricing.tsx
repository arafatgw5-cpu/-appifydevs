"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { PRICING_PLANS } from "@/data/pricing";
import { useNavigation } from "@/store/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export function Pricing() {
  const { setView } = useNavigation();
  const [billing, setBilling] = React.useState<Billing>("monthly");

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 border-y border-border bg-muted/30 py-20 sm:py-24 lg:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Simple Pricing That Scales With You
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>
        </Reveal>

        {/* Billing toggle */}
        <Reveal className="mt-8 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="inline-flex items-center rounded-full border border-border bg-background p-1 shadow-soft"
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
                    "relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-primary shadow-soft"
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative">
                    {b === "monthly" ? "Monthly" : "Yearly"}
                    {b === "yearly" ? (
                      <span
                        className={cn(
                          "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                          active
                            ? "bg-white/15 text-primary-foreground"
                            : "bg-primary/10 text-primary",
                        )}
                      >
                        -20%
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Stagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          gap={0.05}
        >
          {PRICING_PLANS.map((plan) => {
            const isPro = plan.highlighted;
            const price =
              billing === "monthly" ? plan.monthly : plan.yearly;
            const isEnterprise = plan.id === "enterprise";
            const isFree = plan.id === "free";

            return (
              <StaggerItem key={plan.id} className="h-full">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border bg-card/70 p-6 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg",
                    isPro
                      ? "border-primary/40 ring-1 ring-primary/20 lg:-my-2 lg:py-8"
                      : "border-border",
                  )}
                >
                  {plan.badge ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="rounded-full bg-primary text-primary-foreground shadow-soft">
                        <Sparkles className="h-3 w-3" />
                        {plan.badge}
                      </Badge>
                    </div>
                  ) : null}

                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.tagline}
                  </p>

                  <div className="mt-5 flex h-12 items-baseline gap-1">
                    {isEnterprise ? (
                      <span className="text-3xl font-semibold tracking-tight text-foreground">
                        Custom
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-semibold tracking-tight text-foreground">
                          ${price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /mo
                        </span>
                      </>
                    )}
                  </div>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={billing + plan.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="h-4 text-[11px] text-muted-foreground"
                    >
                      {isEnterprise
                        ? "Tailored to your org"
                        : isFree
                          ? "Free forever"
                          : billing === "yearly"
                            ? "billed annually"
                            : "billed monthly"}
                    </motion.p>
                  </AnimatePresence>

                  <Button
                    className="mt-5 w-full"
                    variant={isPro ? "default" : "outline"}
                    onClick={() => setView("app")}
                  >
                    {plan.cta}
                  </Button>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-border pt-5 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span
                          className={cn(
                            "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                            isPro
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary",
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Demo pricing — values are placeholders for the redesign.
        </p>
      </div>
    </section>
  );
}
