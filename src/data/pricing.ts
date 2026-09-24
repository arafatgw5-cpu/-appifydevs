import type { PricingPlan } from "@/types/common";

/**
 * Demo pricing tiers. Pricing values are placeholders for the redesign
 * and do not represent actual product billing.
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For trying things out",
    monthly: 0,
    yearly: 0,
    cta: "Start for free",
    features: [
      "Up to 3 AI models",
      "100 messages / day",
      "Chat history (7 days)",
      "Chrome extension included",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For everyday power users",
    monthly: 18,
    yearly: 14,
    highlighted: true,
    badge: "Most popular",
    cta: "Get Pro",
    features: [
      "All AI models",
      "Unlimited messages",
      "Unlimited chat history",
      "Web search & attachments",
      "Quick actions & shortcuts",
      "Priority response speed",
    ],
  },
  {
    id: "team",
    name: "Team",
    tagline: "For small teams that ship",
    monthly: 39,
    yearly: 32,
    cta: "Start team trial",
    features: [
      "Everything in Pro",
      "Shared model presets",
      "Team chat history",
      "Admin & billing controls",
      "5 seats included",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organizations at scale",
    monthly: 0,
    yearly: 0,
    cta: "Contact sales",
    features: [
      "Custom model routing",
      "SSO & SAML",
      "Audit logs & data residency",
      "Dedicated support",
      "Custom MSA & SLA",
    ],
  },
];
