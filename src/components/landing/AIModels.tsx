"use client";

import { AI_MODELS } from "@/data/models";
import { ModelIcon } from "@/components/shared/Logo";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export function AIModels() {
  return (
    <section
      id="models"
      className="relative scroll-mt-12 py-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="models-heading"
    >
      <Reveal className="mb-12 md:flex md:items-end md:justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest">Intelligence</span>
          </div>
          <h2
            id="models-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-6 md:mb-0"
          >
            The world's best models.<br />
            <span className="text-violet-600 dark:text-violet-500">In one beautiful canvas.</span>
          </h2>
        </div>
        <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md md:text-right">
          Switch providers mid-conversation. Each model brings its own strengths — pick the right one for the job without ever juggling tabs.
        </p>
      </Reveal>

      <Stagger
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        gap={0.08}
      >
        {AI_MODELS.map((model) => (
          <StaggerItem key={model.id} className="h-full">
            <div
              className={cn(
                "group relative flex flex-col h-full rounded-[24px] p-6 sm:p-8 transition-all duration-300",
                "bg-white dark:bg-[#15131F] border border-black/5 dark:border-white/5",
                "shadow-xl shadow-stone-200/40 dark:shadow-black/40 hover:-translate-y-1 hover:shadow-2xl hover:border-violet-500/30"
              )}
            >
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: model.accent }}
                    >
                      <ModelIcon iconKey={model.iconKey} size={22} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        {model.name}
                      </h3>
                      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-0.5">
                        {model.provider}
                      </p>
                    </div>
                  </div>
                  {model.badge && (
                    <div className="rounded-full bg-violet-100 dark:bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                      {model.badge}
                    </div>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 flex-1">
                  {model.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                  {model.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center rounded-lg bg-stone-100 dark:bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-stone-700 dark:text-stone-300 transition-colors group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 group-hover:text-violet-700 dark:group-hover:text-violet-300"
                    >
                      {cap}
                    </span>
                  ))}
                  {model.contextWindow && (
                    <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-600" />
                      {model.contextWindow} ctx
                    </span>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
