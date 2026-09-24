"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { AI_MODELS } from "@/data/models";
import { useChatStore } from "@/store/chat";
import { useTheme } from "@/components/theme/theme-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
}

function SettingsRow({ title, description, htmlFor, children }: SettingsRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
          {title}
        </Label>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

const ACCENT_SWATCHES = [
  { name: "Purple", value: "oklch(0.55 0.22 290)" },
  { name: "Blue", value: "oklch(0.6 0.18 235)" },
  { name: "Teal", value: "oklch(0.65 0.16 165)" },
  { name: "Amber", value: "oklch(0.7 0.18 80)" },
];

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const activeModelId = useChatStore((s) => s.activeModelId);
  const setActiveModelId = useChatStore((s) => s.setActiveModelId);

  const [autoSave, setAutoSave] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);
  const [enterToSend, setEnterToSend] = React.useState(true);
  const [timestamps, setTimestamps] = React.useState(false);
  const [language, setLanguage] = React.useState("en");
  const [name, setName] = React.useState("Arafat");
  const [email, setEmail] = React.useState("arafat@example.com");

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your preferences, chat behavior and account.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Appearance */}
        <Card className="gap-0 p-0">
          <CardHeader className="border-b border-border px-5 py-4">
            <CardTitle className="text-base">Appearance</CardTitle>
            <CardDescription className="text-xs">
              Choose how EchoGPT looks to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <SettingsRow
              title="Theme"
              description="Light, dark or follow your system."
              htmlFor="theme-select"
            >
              <Select
                value={theme}
                onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}
              >
                <SelectTrigger id="theme-select" size="sm" className="w-36">
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
            <Separator />
            <SettingsRow
              title="Accent color"
              description="Used for highlights and primary actions (demo only)."
            >
              <div className="flex items-center gap-2">
                {ACCENT_SWATCHES.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    aria-label={`Accent: ${s.name}`}
                    className="h-7 w-7 rounded-full border border-border shadow-soft transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    style={{ backgroundColor: s.value }}
                  />
                ))}
              </div>
            </SettingsRow>
          </CardContent>
        </Card>

        {/* General */}
        <Card className="gap-0 p-0">
          <CardHeader className="border-b border-border px-5 py-4">
            <CardTitle className="text-base">General</CardTitle>
            <CardDescription className="text-xs">
              Application-level preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <SettingsRow
              title="Language"
              description="Interface language."
              htmlFor="language-select"
            >
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language-select" size="sm" className="w-36">
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
              title="Auto-save chats"
              description="Save your conversations as you go."
              htmlFor="auto-save-switch"
            >
              <Switch
                id="auto-save-switch"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </SettingsRow>
            <Separator />
            <SettingsRow
              title="Notifications"
              description="Get notified when long tasks finish."
              htmlFor="notifications-switch"
            >
              <Switch
                id="notifications-switch"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </SettingsRow>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="gap-0 p-0">
          <CardHeader className="border-b border-border px-5 py-4">
            <CardTitle className="text-base">Chat</CardTitle>
            <CardDescription className="text-xs">
              Fine-tune your chat experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <SettingsRow
              title="Press Enter to send"
              description="When off, Enter adds a new line."
              htmlFor="enter-to-send-switch"
            >
              <Switch
                id="enter-to-send-switch"
                checked={enterToSend}
                onCheckedChange={setEnterToSend}
              />
            </SettingsRow>
            <Separator />
            <SettingsRow
              title="Show timestamps"
              description="Display a time next to each message."
              htmlFor="timestamps-switch"
            >
              <Switch
                id="timestamps-switch"
                checked={timestamps}
                onCheckedChange={setTimestamps}
              />
            </SettingsRow>
            <Separator />
            <SettingsRow
              title="Default model"
              description="Used when starting a new conversation."
              htmlFor="default-model-select"
            >
              <Select value={activeModelId} onValueChange={setActiveModelId}>
                <SelectTrigger id="default-model-select" size="sm" className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AI_MODELS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} · {m.provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingsRow>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="gap-0 p-0">
          <CardHeader className="border-b border-border px-5 py-4">
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription className="text-xs">
              Your profile and plan details.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <div className="grid gap-4 py-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name-input" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email-input" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-foreground">Plan</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  You are on the Pro plan. Manage your subscription from the
                  billing portal.
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
                )}
              >
                Pro
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}
