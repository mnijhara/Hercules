import { SlackMessage, FeaturePillar, DemoSlide, PricingPlan } from '../types';

export const INITIAL_SLACK_MESSAGES: SlackMessage[] = [
  {
    id: 'msg-1',
    sender: 'founder',
    authorName: 'Rohan (Founder, Bengaluru)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    text: 'Can we send a CTC offer letter to the new Senior Backend Engineer in Indiranagar?',
    timestamp: '10:31 AM',
    reactions: [{ emoji: '👀', count: 2 }]
  },
  {
    id: 'msg-2',
    sender: 'hercules',
    authorName: 'Hercules AI (Virtual HR Lead)',
    text: "Absolutely! I've generated a compliant Indian CTC offer letter (₹28 LPA + ESOPs) with standard tax-optimized components (Basic, HRA, Special Allowance, PF Employer contribution, Gratuity) and 60-day notice period terms. Click below to review and send to candidate.",
    timestamp: '10:31 AM',
    attachment: {
      title: '📄 Senior Backend Engineer CTC Offer Letter (Bengaluru)',
      description: 'Breakup: ₹28,00,000 CTC • ₹11.2L Basic • ₹5.6L HRA • ₹8.4L Special Allowance • PF & Gratuity • 4-year ESOP vesting (1-year cliff).',
      type: 'template',
      actions: ['Review & Send', 'Customize ESOPs', 'Download PDF']
    },
    reactions: [{ emoji: '🙌', count: 3 }]
  }
];

export const SLACK_PRESET_PROMPTS = [
  {
    label: 'Send Indian CTC Offer',
    prompt: 'Can we draft a ₹28 LPA Senior Backend Engineer offer letter for Bengaluru with ESOPs?',
    response: "Done! I've created a compliant Indian CTC offer letter with standard components (Basic, HRA, Special Allowance, EPF, Gratuity) and a 4-year ESOP vesting schedule.",
    attachment: {
      title: '📄 Senior Backend Developer CTC Offer Letter (₹28 LPA)',
      description: 'Includes 60-day notice period clause, IP assignment agreement, and tax-optimized HRA/Special Allowance breakdown.',
      type: 'template' as const,
      actions: ['Review & Send', 'Modify Salary Components', 'Download PDF']
    }
  },
  {
    label: '60-Day Notice Period Buyout',
    prompt: 'How do we handle a 60-day notice period buyout for our incoming Tech Lead joining from enterprise?',
    response: "I've drafted a Notice Period Buyout Agreement and reimbursement agreement with a 1-year retention clawback clause.",
    attachment: {
      title: '📋 Notice Period Buyout & Clawback Agreement',
      description: '1. Specify buyout amount (₹2.4 Lakhs)\n2. Add 12-month retention clawback clause\n3. Issue formal confirmation letter to candidate',
      type: 'checklist' as const,
      actions: ['Generate Buyout Agreement', 'Edit Terms']
    }
  },
  {
    label: 'POSH Act Compliance',
    prompt: 'Do we need a POSH Internal Complaints Committee for our 12-person startup in Gurugram?',
    response: "Yes! Under the POSH Act 2013, any Indian organization with 10+ employees must constitute an Internal Complaints Committee (ICC) with an external member.",
    attachment: {
      title: '🛡️ POSH Policy & ICC Committee Constitution Pack',
      description: 'Includes mandatory POSH policy document, ICC appointment letters, and annual compliance report template for District Officer.',
      type: 'alert' as const,
      actions: ['Draft POSH Policy', 'Appoint External Member', 'Download Template']
    }
  },
  {
    label: 'Shops & Est. Leave Policy',
    prompt: 'What is the mandatory leave policy for tech startups under Karnataka Shops & Establishments Act?',
    response: "In Karnataka, employees are entitled to 18 days Earned Leave (Privilege Leave), 12 days Casual/Sick Leave, and 10 festival national holidays annually.",
    attachment: {
      title: '💡 Indian Startup Leave & Holiday Policy (Karnataka & Delhi NCR)',
      description: 'Standardized Leave Policy covering PL, SL/CL, Maternity Leave (26 weeks), and Paternity Leave provisions.',
      type: 'document' as const,
      actions: ['Apply to Slack Leave Bot', 'Copy Policy Document']
    }
  }
];

export const VIDEO_DEMO_SLIDES: DemoSlide[] = [
  {
    id: 1,
    title: "Stop losing founder time to people problems.",
    subtitle: "Hercules helps founders hire better, keep their best people, and handle team issues — without hiring HR.",
    videoPlaceholderBg: "from-[#111827] via-[#0f172a] to-[#020617]",
    speakerText: "Stop losing founder time to people problems.",
    caption: "THE HERCULES SOLUTION",
    activeFeature: "Proactive Workspace Intelligence"
  },
  {
    id: 2,
    title: "Founders are stuck doing the one job they don't want to outsource.",
    subtitle: "Software ate finance, sales, marketing, and engineering. People decisions still land on the founder.",
    videoPlaceholderBg: "from-[#1e1b4b] via-[#0f172a] to-[#030712]",
    speakerText: "Founders are stuck doing the one job they don't want to outsource.",
    caption: "THE 3 TIME TRAPS",
    activeFeature: "High-Stakes Offers • Silent Compliance • Mismatched Options"
  },
  {
    id: 3,
    title: "Hercules lives in Slack, WhatsApp & GMeet and acts before founders ask.",
    subtitle: "Hercules watches headcount, comp, runway, and DRDA/POSH & 50-state statutory compliance 24/7.",
    videoPlaceholderBg: "from-[#030712] via-[#1e293b] to-[#0f172a]",
    speakerText: "Hercules lives in Slack, WhatsApp & GMeet and acts before founders ask.",
    caption: "HERCULES PROACTIVE INTELLIGENCE",
    activeFeature: "Instant Workspace Integration"
  },
  {
    id: 4,
    title: "Compliance comes to the founder, not the other way around.",
    subtitle: "Detects new hires, handles DRDA, POSH Act, CA EDD, and EPF/ESI registrations automatically.",
    videoPlaceholderBg: "from-[#020617] via-[#172554] to-[#0b1329]",
    speakerText: "Compliance comes to the founder, not the other way around.",
    caption: "AUTOMATED COMPLIANCE",
    activeFeature: "DRDA & 50-State Real-time Auditing"
  },
  {
    id: 5,
    title: "Stop losing founder time, and start growing your team with Hercules.",
    subtitle: "Get proactive hiring, automated DRDA/POSH compliance, and voice candidate screening inside Slack, WhatsApp, Google Meet & Email.",
    videoPlaceholderBg: "from-[#0f172a] via-[#1e1b4b] to-[#020617]",
    speakerText: "Stop losing founder time, and start growing your team with Hercules.",
    caption: "TRANSFORM YOUR WORKSPACE",
    activeFeature: "Get Started Free"
  }
];

export const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: 'hire-better',
    title: 'Hire Talent & Runway Protection',
    subtitle: 'Tax-optimized CTCs, voice screens & notice period management',
    description: 'Screen candidates with automated voice screens, calculate tax-optimized CTC breakdowns (Basic, HRA, PF, Gratuity), and protect runway targets on every offer.',
    iconName: 'Rocket',
    badge: '01 RECRUITING & CTC',
    highlights: [
      'Automated Indian CTC breakup generator (₹28L+ tax-optimized)',
      'Notice period buyout calculator & retention clawback agreement',
      'Voice screening in Zoom & Google Meet with scored summaries'
    ],
    metrics: '65% faster offer acceptance rate'
  },
  {
    id: 'keep-your-best',
    title: 'Keep Your Core Team',
    subtitle: 'ESOP vesting, pulse checks & appraisals',
    description: 'Run weekly Slack pulse checks, track ESOP vesting milestones with 1-year cliffs, and conduct structured 1-on-1 performance appraisals.',
    iconName: 'Sparkles',
    badge: '02 RETENTION & ESOPs',
    highlights: [
      'Weekly automated Slack & WhatsApp pulse surveys',
      'ESOP grant letters & vesting milestone tracking',
      'Proactive retention alerts & market comp benchmarks'
    ],
    metrics: '88% higher team retention rate'
  },
  {
    id: 'stay-compliant',
    title: '100% Statutory & DRDA Compliance',
    subtitle: 'DRDA, POSH, EPF, ESI & Shops & Est. Act',
    description: 'Comply with DRDA guidelines, POSH Act 2013, Shops & Establishments registrations across Karnataka, Delhi NCR, MH, TS & TN, plus US 50-state labor codes.',
    iconName: 'Shield',
    badge: '03 STATUTORY & DRDA',
    highlights: [
      'DRDA compliance filing & District Rural Development Agency audit logs',
      'POSH Internal Complaints Committee (ICC) setup & documentation',
      'Gusto, Rippling, RazorpayX Payroll, & Keka automated sync'
    ],
    metrics: 'Zero compliance penalty guarantee'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'tier-1',
    name: 'TIER 1',
    tagline: 'For early teams making their first critical hires.',
    priceMonthly: 40000,
    priceAnnual: 32000,
    teamSizeLimit: '0 – 20 employees',
    features: [
      '14-day free trial with full feature access',
      'Hercules Virtual HR in Slack (#ask-hercules), WhatsApp & GMeet',
      'Hiring pipeline & automated voice screening co-pilot',
      'DRDA compliance & POSH Act ICC documentation',
      'Indian CTC offer generator & NDA templates',
      'Community HR legal support'
    ]
  },
  {
    id: 'tier-2',
    name: 'TIER 2',
    tagline: 'For growing teams scaling headcount and operations.',
    priceMonthly: 80000,
    priceAnnual: 64000,
    teamSizeLimit: '20 – 50 employees',
    badge: 'Most Popular for Founders',
    highlighted: true,
    features: [
      'Hercules Virtual HR in unlimited Slack channels, WhatsApp & GMeet',
      'Automated DRDA & 50-state labor law compliance',
      'Live runway impact calculations on offer drafts',
      'Custom CTC breakup generator & 60-day notice period buyouts',
      'RazorpayX Payroll, Keka, Gusto & Rippling integration',
      '24/7 Priority founder support hotline'
    ]
  },
  {
    id: 'tier-3',
    name: 'TIER 3',
    tagline: 'For scaling venture-backed companies.',
    priceMonthly: 0,
    priceAnnual: 0,
    teamSizeLimit: '50+ employees (Custom / Enterprise)',
    features: [
      'Everything in Tier 2',
      'Multi-state & DRDA agency filing compliance',
      'Custom ESOP Pool management & grant agreements',
      'Dedicated HR Legal Attorney review for complex disputes',
      'Custom Slack bot triggers & webhook API access',
      'Dedicated account manager & SLA guarantees'
    ]
  }
];

export const FOUNDER_TIME_TRAPS = [
  {
    category: 'CTC Breakups & Negotiations',
    hoursPerWeek: 6.5,
    description: 'Drafting tax-friendly CTC components, calculating PF/Gratuity, negotiating 60-day notice period buyouts.',
    costPerYear: '₹4,20,000'
  },
  {
    category: 'Onboarding & Statutory Admin',
    hoursPerWeek: 4.5,
    description: 'Collecting Aadhaar/PAN, Form 11, setting up EPF/ESI accounts, issuing laptops, organizing orientation.',
    costPerYear: '₹2,70,000'
  },
  {
    category: 'POSH & Labor Compliance',
    hoursPerWeek: 3.5,
    description: 'Drafting POSH policy, appointing ICC members, complying with state Shops & Establishments leave rules.',
    costPerYear: '₹2,10,000'
  },
  {
    category: 'Team Appraisals & Friction',
    hoursPerWeek: 4.0,
    description: 'Answering leave & CTC questions, managing quarterly appraisals, resolving interpersonal team issues.',
    costPerYear: '₹2,40,000'
  }
];


