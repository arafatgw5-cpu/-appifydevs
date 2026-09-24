"use client";

import { FAQ_ITEMS } from "@/data/faq";
import { Reveal } from "@/components/shared/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-12 py-12 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <Reveal className="mb-12 text-center">
        <h2
          id="faq-heading"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-6"
        >
          Frequently asked questions.
        </h2>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
          Everything you need to know about the product and billing. Can't find the answer you're looking for? Reach out to our team.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-black/5 dark:border-white/5 last:border-b-0 px-2 sm:px-4"
              >
                <AccordionTrigger className="py-6 sm:py-8 text-left text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 hover:text-violet-600 dark:hover:text-violet-400 hover:no-underline transition-colors group">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 sm:pb-8 text-base leading-relaxed text-stone-500 dark:text-stone-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </section>
  );
}
