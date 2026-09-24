import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
  accent: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  highlighted?: boolean;
  cta: string;
  features: string[];
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
}
