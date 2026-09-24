"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ScreenHeader } from "@/components/extension/ScreenHeader";
import { ExtensionSettings } from "@/components/extension/ExtensionSettings";

/**
 * Settings screen for the extension. Renders the shared `ExtensionSettings`
 * panel inside a ScrollArea, wrapped by the standard extension screen header.
 * The back button returns to the chat popup.
 */
export function SettingsScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Settings" subtitle="Preferences" />
      <ScrollArea className="flex-1">
        <ExtensionSettings className="p-3" />
      </ScrollArea>
    </div>
  );
}
