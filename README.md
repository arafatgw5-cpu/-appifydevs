# EchoGPT Redesign

A premium, production-quality frontend redesign of the EchoGPT ecosystem — a modern AI workspace that brings leading AI models together in one fast, simple and beautiful place.

## Overview

This project is a complete frontend redesign of the EchoGPT product family, built as a single unified Next.js application. It covers three major surfaces as one cohesive product:

1. **EchoGPT Landing Page** — a premium marketing site with hero, features, model showcase, interactive product preview, pricing, testimonials and FAQ.
2. **EchoGPT Web App** — a redesigned AI workspace with a sidebar, dashboard, chat, history, models and settings.
3. **EchoGPT Chrome Extension** — a concept redesign presented inside a realistic browser-extension frame with popup, history, models and settings screens.

The redesign takes inspiration from the visual quality of Linear, Stripe, Vercel, Raycast, Notion and Apple — clean, minimal, premium, spacious and professional.

> This is a **frontend-focused redesign** that uses mock / placeholder data. It is not connected to a real AI backend. The original product idea is used only as a reference; the UI/UX has been redesigned from scratch.

## Features

- Modern, responsive **landing page** (hero, features, AI models, product tour, why-choose, pricing, testimonials, FAQ, CTA, footer)
- Redesigned **web application** with sidebar navigation, chat workspace, history management, model gallery and settings
- **Chrome extension concept** presented in a realistic 380px popup frame with four switchable screens
- Fully **responsive design** (mobile, tablet, desktop) — tested from 320px up to 1920px
- Real **dark mode** with light / dark / system preference, persisted to `localStorage`
- **Framer Motion** animations for entrances, scroll reveals, view transitions, accordion, mobile menu and the product preview switcher
- Accessible UI: semantic sections, ARIA labels, keyboard-friendly controls, visible focus states, reduced-motion support
- **Reusable component system** (Button, Card, Badge, Model Selector, Chat Message, Quick Action, Theme Toggle, etc.)
- Centralized **data architecture** — models, features, pricing, testimonials and FAQ live in `src/data/*` and are consumed everywhere
- **Interactive model selector** shared across the web app and extension
- **Interactive FAQ accordion**, pricing toggle, product preview switcher, settings toggles and selects
- TypeScript throughout, strict mode

## Technologies

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS 4** with a custom EchoGPT design token system
- **shadcn/ui** component primitives (Radix-based)
- **Framer Motion** for animation
- **lucide-react** for icons
- **Zustand** for navigation and chat state
- **next/font** (Geist Sans + Geist Mono) for optimized typography
- **next-themes** patterns (custom ThemeProvider) for theme persistence

## Routes

The application is implemented as a single-page experience that swaps between three views using a small Zustand navigation store. Conceptually the product surfaces map to the following routes:

| Route                  | Surface                          |
| ---------------------- | -------------------------------- |
| `/`                    | Landing page (default view)      |
| `/app`                 | Web App — Home / Dashboard       |
| `/app/chat`            | Web App — Chat conversation     |
| `/app/history`         | Web App — History management     |
| `/app/models`          | Web App — AI Models gallery      |
| `/app/settings`        | Web App — Settings               |
| `/extension`           | Chrome Extension showcase        |
| `/extension/popup`     | Extension — Popup chat UI        |
| `/extension/history`   | Extension — History & prompts    |
| `/extension/models`    | Extension — Model selector       |
| `/extension/settings`  | Extension — Settings             |

In this implementation all of the above live under the single `/` route and are switched client-side (no full navigation), which keeps transitions instant and the bundle lean.

## Project structure

```
src/
  app/
    layout.tsx          # Root layout, metadata, fonts, ThemeProvider
    page.tsx            # View orchestrator (landing / app / extension)
    globals.css         # Design tokens, dark mode, utilities
  components/
    landing/            # Navbar, Hero, Features, AIModels, ProductPreview, WhyChoose,
                        # Pricing, Testimonials, FAQ, CTA, Footer, LandingPage
    web-app/            # WebAppShell, Sidebar, Topbar, ModelSelector, ChatInput,
                        # ChatMessage, QuickActions, RecentChats, PopularModels,
                        # EmptyState + views (Home, Chat, History, Models, Settings)
    extension/          # ExtensionExperience, ExtensionNav, ExtensionHeader,
                        # ExtensionModelSelector, PromptInput, QuickActions,
                        # ConversationHistory, ExtensionSettings + screens
                        # (Popup, History, Models, Settings)
    shared/             # Logo, ModelIcon, ThemeToggle, Reveal/Stagger
    theme/              # ThemeProvider (light/dark/system)
    ui/                 # shadcn/ui primitives
  data/                 # models, features, pricing, testimonials, faq, quickActions, chats
  store/                # navigation.ts (view state), chat.ts (active model)
  lib/                  # utils.ts (cn), constants.ts (SITE, NAV_LINKS, FOOTER_LINKS)
  types/                # model.ts, chat.ts, common.ts
```

## Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open the preview in your browser (the app runs on port 3000).

## Build

```bash
npm run build
```

The project uses Next.js 16 with Turbopack. Builds are static-friendly and deployment-ready for Vercel.

## Design system

- **Background:** white / very light neutral (`oklch(0.99 0.001 240)`)
- **Foreground:** dark navy (`oklch(0.18 0.02 260)`)
- **Primary accent:** purple
- **Secondary accent:** blue
- **Rounded corners:** 14–20px (`rounded-xl` / `rounded-2xl`)
- **Borders:** thin, soft
- **Shadows:** subtle, layered (`shadow-soft`, `shadow-soft-lg`)
- **Typography:** Geist Sans (body), Geist Mono (code), strong hierarchy

Dark mode uses near-black backgrounds, dark cards, light text and muted borders, with the same purple accent.

## Assumptions

- This is a **frontend-focused redesign**. There is no production backend or real AI API. All data (models, conversations, pricing, testimonials) is mock / placeholder content clearly marked as demo where appropriate.
- Testimonials use fictional placeholder names and are not implied to be real customers.
- Pricing values are realistic placeholders and do not represent actual product billing.
- AI model descriptions are brief demo copy, not official provider marketing.
- The Chrome extension is presented as a **concept redesign** inside a realistic popup frame — it is not a packaged extension.
- All "Add to Chrome" / "Install Extension" actions are demo-only and surface a notification rather than performing a real install.

## Additional features

- **Dark mode** with light / dark / system preference persisted across sessions
- **Responsive design** from 320px to 1920px with no horizontal scrolling
- **Framer Motion** animations (entrances, scroll reveals, view transitions, accordion, mobile menu, product preview)
- **Reusable component system** — shared UI primitives, model selector, chat message, quick actions
- **Interactive model selector** shared across the web app and the Chrome extension
- **Interactive FAQ** accordion with single-open behavior
- **Product preview** with thumbnail-driven screen switching
- **Extension concept UI** presented inside a realistic 380px popup frame
- **Accessibility** — semantic sections, ARIA labels, keyboard navigation, visible focus, reduced-motion support

## Quality

- Strict TypeScript with zero errors in `src/`
- ESLint clean
- No console errors at runtime
- No horizontal scroll on mobile
- Dark mode verified across all surfaces
- All interactive states verified in the browser

---

Built as a frontend redesign assignment. All product names, model names and brand references belong to their respective owners; this project is a design exercise and is not affiliated with the original EchoGPT product.
