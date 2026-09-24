"use client";

import { FAQ_ITEMS } from "@/data/faq";
import { Reveal } from "@/components/shared/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Everything you need to know about the redesigned EchoGPT.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/70 px-5 shadow-soft sm:px-6">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
