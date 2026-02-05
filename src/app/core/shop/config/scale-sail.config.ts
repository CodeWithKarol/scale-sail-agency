import { ScaleSailTemplate } from '../models/scale-sail.model';

export const SCALE_SAIL_TEMPLATES: readonly ScaleSailTemplate[] = [
  {
    id: 'mintly',
    name: 'Mintly — AI Fintech',
    bestFor: ['AI personal finance', 'fintech MVPs', 'investor-ready demos'],
    description:
      'A fast, trust-first fintech landing page with a strong hero and credibility sections—designed to make modern finance products feel reliable from the first scroll.',
    chips: ['Responsive', 'Trust sections', 'CSS variables', 'Zero dependencies'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/elqnvn?layout=profile',
    // previewUrl: 'https://...', // add when you have it
    price: { amountMinor: 0, currency: 'EUR', label: '€0+' },
  },
  {
    id: 'cleanfleet',
    name: 'CleanFleet Solutions — EV Fleet SaaS (ROI Calculator)',
    bestFor: ['EV fleet leasing', 'charging solutions', 'ESG / sustainability'],
    description:
      'A conversion-focused landing page built for fleet decision-makers—includes an interactive ROI calculator to make savings obvious and drive demo requests.',
    chips: ['ROI calculator', 'Lead capture', 'Mobile-first', 'Modular sections'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/rqxkhj?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
  {
    id: 'eco-vest',
    name: 'Eco‑Vest — Sustainable FinTech',
    bestFor: ['ESG investing', 'sustainable finance', 'impact-driven fintech'],
    description:
      'A premium, credibility-forward layout built around impact metrics and trust signals—optimized for performance and accessibility.',
    chips: ['Lighthouse-focused', 'Impact metrics', 'Glass UI', 'Zero dependencies'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/lqyffs?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
  {
    id: 'innovatetech',
    name: 'InnovateTech — AI / EdTech SaaS',
    bestFor: ['AI startups', 'EdTech platforms', 'course / product launches'],
    description:
      'A modern SaaS landing page with polished motion and strong CTA placement—built to look premium while staying lightweight and easy to deploy.',
    chips: ['Modal CTA', 'Sticky nav', 'Fast load', 'Theming via CSS vars'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/anumr?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
  {
    id: 'skillswap',
    name: 'SkillSwap Hub — Community / Skill Exchange',
    bestFor: ['communities', 'mentorship', 'marketplaces', 'skill exchange'],
    description:
      'A clean community-focused layout designed to build trust fast and capture signups—simple to rebrand and deploy without tooling.',
    chips: ['Signup-ready', 'Accessible structure', 'Smooth interactions', 'Lightweight'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/ccept?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
  {
    id: 'smartcare',
    name: 'SmartCare Home — Elderly Care / Health Tech',
    bestFor: ['health tech', 'elderly care', 'privacy-first monitoring'],
    description:
      'A trust-building landing page tailored for sensitive health contexts—clear benefits, strong CTAs, and a privacy-forward narrative.',
    chips: ['Modals/forms', 'Trust sections', 'Responsive', 'Performance-minded'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/jqqmzw?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
  {
    id: 'coinquest',
    name: 'CoinQuest — Gamified Finance',
    bestFor: ['gamified apps', 'rewards', 'leaderboards', 'community-led growth'],
    description:
      'A playful but conversion-structured landing page featuring gamification patterns (stats, community, momentum) without heavy frameworks.',
    chips: ['Counters/reveals', 'Community sections', 'Mobile-first', 'Fast'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/cjggfe?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
  {
    id: 'budgy',
    name: 'Budgy — FinTech SaaS',
    bestFor: ['budgeting apps', 'personal finance tools', 'fintech lead gen'],
    description:
      'A sleek fintech layout with modern UI patterns and clear CTA flow—built for quick customization and frictionless deployment.',
    chips: ['Bento-style layout', 'Forms-ready', 'CSS variables', 'Zero build step'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/rqjofn?layout=profile',
    price: { amountMinor: 999, currency: 'EUR' },
  },
] as const;
