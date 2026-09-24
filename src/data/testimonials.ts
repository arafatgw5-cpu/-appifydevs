import type { Testimonial } from "@/types/common";

/**
 * Demo testimonials. Names are fictional placeholders — not real customers.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mira Halvorsen",
    role: "Product Designer",
    company: "Northwind Studio",
    quote:
      "EchoGPT became my daily cockpit for AI. I love that I can jump between Claude and GPT without leaving the conversation.",
    rating: 5,
    initials: "MH",
    accent: "#8b5cf6",
  },
  {
    id: "t2",
    name: "Daniel Okonkwo",
    role: "Engineering Lead",
    company: "Atlas Labs",
    quote:
      "The redesigned interface is incredibly fast. The model selector and history are exactly where I want them to be.",
    rating: 5,
    initials: "DO",
    accent: "#3b82f6",
  },
  {
    id: "t3",
    name: "Sofia Marchetti",
    role: "Content Strategist",
    company: "Lumen Co.",
    quote:
      "I switched three different AI tools for EchoGPT and never looked back. The extension is genuinely useful during research.",
    rating: 5,
    initials: "SM",
    accent: "#ec4899",
  },
];
