"use client";

import * as React from "react";

import { useNavigation } from "@/store/navigation";
import { useChatStore } from "@/store/chat";
import { Sidebar } from "@/components/web-app/Sidebar";
import { Topbar } from "@/components/web-app/Topbar";
import { HomeView } from "@/components/web-app/views/HomeView";
import { ChatView } from "@/components/web-app/views/ChatView";
import { HistoryView } from "@/components/web-app/views/HistoryView";
import { ModelsView } from "@/components/web-app/views/ModelsView";
import { SettingsView } from "@/components/web-app/views/SettingsView";

/**
 * The full web app shell. Renders the sidebar (desktop persistent /
 * mobile drawer) and the main content area which switches between
 * the five tabs based on `useNavigation().webAppTab`.
 *
 * Mount this as the default export for the `app` view in page.tsx:
 *   import { WebAppShell } from "@/components/web-app/WebAppShell";
 */
export function WebAppShell() {
  const { webAppTab } = useNavigation();
  const initStore = useChatStore(s => s.initStore);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [historySearch, setHistorySearch] = React.useState("");

  // Initialize IndexedDB Chat history on mount
  React.useEffect(() => {
    initStore();
  }, [initStore]);

  // Close the mobile sidebar whenever the active tab changes.
  React.useEffect(() => {
    setMobileSidebarOpen(false);
  }, [webAppTab]);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground">
      <Sidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          search={historySearch}
          onSearchChange={setHistorySearch}
        />

        <main className="min-h-0 flex-1 overflow-hidden">
          {webAppTab === "home" ? <HomeView /> : null}
          {webAppTab === "chat" ? <ChatView /> : null}
          {webAppTab === "history" ? (
            <HistoryView
              search={historySearch}
              onSearchChange={setHistorySearch}
            />
          ) : null}
          {webAppTab === "models" ? <ModelsView /> : null}
          {webAppTab === "settings" ? <SettingsView /> : null}
        </main>
      </div>
    </div>
  );
}

export default WebAppShell;
