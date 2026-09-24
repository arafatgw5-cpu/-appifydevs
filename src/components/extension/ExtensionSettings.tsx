"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsRowProps {
  title: string;
  description?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

function SettingsRow({ title, description, htmlFor, children, className }: SettingsRowProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0",
        className,
      )}
    >
      <div className="min-w-0">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-foreground"
        >
          {title}
        </label>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-0", className)}>
      <header className="px-1 pb-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-0.5 text-[11px] text-muted-foreground/80">
            {description}
          </p>
        ) : null}
      </header>
      <div className="rounded-xl border border-border bg-card p-3 shadow-soft">
        {children}
      </div>
    </section>
  );
}

const SHORTCUTS = [
  { label: "Open extension", keys: ["Ctrl", "Shift", "E"] },
  { label: "New chat", keys: ["Ctrl", "Shift", "N"] },
  { label: "Quick search", keys: ["Ctrl", "Shift", "Space"] },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-foreground shadow-[0_1px_0_var(--border)]">
      {children}
    </kbd>
  );
}

interface ExtensionSettingsProps {
  className?: string;
}

/**
 * Compact settings panel for the extension. Three sections:
 * - Appearance (dark mode switch + theme select)
 * - General (language select, save chats, notifications, auto-save switches)
 * - Shortcuts (read-only keyboard shortcuts)
 *
 * Designed to be embedded inside the extension's settings screen, but is
 * self-contained enough to be used elsewhere (e.g. in a future embeddable widget).
 */
export function ExtensionSettings({ className }: ExtensionSettingsProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const [language, setLanguage] = React.useState("en");
  const [saveChats, setSaveChats] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(true);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Section
        title="Appearance"
        description="Choose how EchoGPT looks in the popup."
      >
        <SettingsRow
          title="Dark mode"
          description="Quick toggle to flip the current theme."
          htmlFor="dark-mode-switch"
        >
          <Switch
            id="dark-mode-switch"
            checked={resolvedTheme === "dark"}
            onCheckedChange={(checked) => {
              if (checked) {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
            aria-label="Toggle dark mode"
          />
        </SettingsRow>
        <Separator />
        <SettingsRow
          title="Theme"
          description="Light, dark or follow your system."
          htmlFor="theme-select"
        >
          <Select
            value={theme}
            onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
          >
            <SelectTrigger id="theme-select" size="sm" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <span className="inline-flex items-center gap-2">
                  <Sun className="h-3.5 w-3.5" /> Light
                </span>
              </SelectItem>
              <SelectItem value="dark">
                <span className="inline-flex items-center gap-2">
                  <Moon className="h-3.5 w-3.5" /> Dark
                </span>
              </SelectItem>
              <SelectItem value="system">
                <span className="inline-flex items-center gap-2">
                  <Monitor className="h-3.5 w-3.5" /> System
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
      </Section>

      <Section
        title="General"
        description="Application-level preferences."
      >
        <SettingsRow
          title="Language"
          description="Interface language."
          htmlFor="language-select"
        >
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language-select" size="sm" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </SettingsRow>
        <Separator />
        <SettingsRow
          title="Save chats"
          description="Keep your conversations on this device."
          htmlFor="save-chats-switch"
        >
          <Switch
            id="save-chats-switch"
            checked={saveChats}
            onCheckedChange={setSaveChats}
            aria-label="Toggle save chats"
          />
        </SettingsRow>
        <Separator />
        <SettingsRow
          title="Notifications"
          description="Notify when long tasks finish."
          htmlFor="notifications-switch"
        >
          <Switch
            id="notifications-switch"
            checked={notifications}
            onCheckedChange={setNotifications}
            aria-label="Toggle notifications"
          />
        </SettingsRow>
        <Separator />
        <SettingsRow
          title="Auto save"
          description="Save changes as you make them."
          htmlFor="auto-save-switch"
        >
          <Switch
            id="auto-save-switch"
            checked={autoSave}
            onCheckedChange={setAutoSave}
            aria-label="Toggle auto save"
          />
        </SettingsRow>
      </Section>

      <Section
        title="Shortcuts"
        description="Keyboard shortcuts for the extension popup."
      >
        <ul className="flex flex-col gap-0">
          {SHORTCUTS.map((s, i) => (
            <li key={s.label}>
              <div className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="text-sm font-medium text-foreground">
                  {s.label}
                </span>
                <span className="flex items-center gap-1" aria-label={s.label}>
                  {s.keys.map((k, j) => (
                    <React.Fragment key={k}>
                      <Kbd>{k}</Kbd>
                      {j < s.keys.length - 1 ? (
                        <span className="text-xs text-muted-foreground" aria-hidden>
                          +
                        </span>
                      ) : null}
                    </React.Fragment>
                  ))}
                </span>
              </div>
              {i < SHORTCUTS.length - 1 ? <Separator /> : null}
            </li>
          ))}
        </ul>
      </Section>

      <p className="px-1 text-[11px] text-muted-foreground/80">
        Tip: press{" "}
        <button
          type="button"
          onClick={toggleTheme}
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          here
        </button>{" "}
        to flip the theme quickly.
      </p>
    </div>
  );
}
