export const SITE = {
  name: "EchoGPT",
  tagline: "All your AI models in one place",
  description:
    "A modern AI workspace bringing powerful AI models together in one fast, simple and beautiful place.",
  url: "https://echogpt.example",
  trustCount: "100,000+",
} as const;

export const NAV_LINKS = [
  { label: "Features", section: "features" },
  { label: "AI Models", section: "models" },
  { label: "Product", section: "product" },
  { label: "Pricing", section: "pricing" },
  { label: "FAQ", section: "faq" },
] as const;

export const FOOTER_LINKS = {
  Product: [
    { label: "Features", section: "features" },
    { label: "AI Models", section: "models" },
    { label: "Pricing", section: "pricing" },
    { label: "Chrome Extension", section: "extension" },
  ],
  Resources: [
    { label: "FAQ", section: "faq" },
    { label: "Documentation", section: "docs" },
    { label: "Support", section: "support" },
  ],
  Company: [
    { label: "About", section: "about" },
    { label: "Careers", section: "careers" },
    { label: "Contact", section: "contact" },
  ],
} as const;

export const PRODUCT_PREVIEW_SCREENS = [
  { id: "home", label: "Home" },
  { id: "chat", label: "Chat" },
  { id: "models", label: "Models" },
  { id: "history", label: "History" },
] as const;
