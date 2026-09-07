import { SlackMessage, FeaturePillar, DemoSlide, PricingPlan } from '../types';

export const FOUNDER_CHRO_NOTE = {
  author: "Hercules Fractional CHRO Team",
  role: "Fractional CHRO & Strategic HRBP",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
  headline: "AI handles the repeatable HR work. Your Fractional CHRO handles judgement, strategy, and leadership.",
  quote: "Hercules combines an AI HR workforce for always-on execution with a Fractional CHRO for the decisions that need context, judgement, and founder alignment. The AI can prepare work, surface issues, draft options, and keep workflows moving; your CHRO owns the strategic call."
};

export const AI_HUMAN_HANDOVER_MATRIX = [
  {
    category: "Strategic HRBP & Org Architecture",
    aiTask: "Hercules AI organizes people data, surfaces workforce signals, prepares planning inputs, and turns recurring HR work into clear next steps.",
    handoverTrigger: "Headcount planning, org changes, leadership decisions, compensation philosophy, or other consequential people decisions.",
    humanTask: "Your Fractional CHRO works with founders and leaders on org design, leadership decisions, people strategy, and board-level preparation.",
    icon: "Briefcase"
  },
  {
    category: "Executive Recruiting & High-Stakes Offers",
    aiTask: "Hercules AI can structure candidate information, prepare interview summaries, draft offer materials, and keep hiring workflows moving.",
    handoverTrigger: "Executive candidates, sensitive negotiations, exceptions to hiring policy, or decisions where context matters more than automation.",
    humanTask: "Your Fractional CHRO advises on executive hiring, closing strategy, compensation decisions, and founder alignment.",
    icon: "Rocket"
  },
  {
    category: "Employee Relations & Culture",
    aiTask: "Hercules AI organizes employee requests, prepares documentation, tracks follow-ups, and surfaces issues that need attention.",
    handoverTrigger: "Sensitive employee relations matters, investigations, performance exits, leadership conflict, or other high-impact situations.",
    humanTask: "Your Fractional CHRO provides confidential judgement, coaching, process guidance, and leadership support when a human decision is required.",
    icon: "Users"
  }
];

export const HUMAN_CHRO_PARTNERS = [
  {
    name: "Your Fractional CHRO",
    title: "Dedicated strategic HR leadership",
    exCompany: "Experienced HR leadership matched to your needs",
    expertise: "HR strategy, org design, founder coaching, leadership hiring, performance and people decisions",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    badges: ["Fractional CHRO", "Strategic HRBP"]
  }
];

export const INITIAL_SLACK_MESSAGES: SlackMessage[] = [
  {
    id: 'msg-1',
    sender: 'founder',
    authorName: 'Founder',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    text: 'Can Hercules help me prepare an offer for a new engineering hire?',
    timestamp: '10:31 AM',
    reactions: [{ emoji: '👀', count: 2 }]
  },
  {
    id: 'msg-2',
    sender: 'atlas',
    authorName: 'Hercules AI',
    text: "Yes. I can help structure the offer inputs, flag missing information, draft a review-ready offer, and surface anything your Fractional CHRO should decide before it is sent.",
    timestamp: '10:31 AM',
    attachment: {
      title: '📄 Offer draft — ready for review',
      description: 'Illustrative draft from the information provided. Compensation, policy and legal terms remain subject to human review before sending.',
      type: 'template'
    },
    reactions: [{ emoji: '🙌', count: 3 }]
  }
];

export const SLACK_PRESET_PROMPTS = [
  {
    label: 'Prepare an offer',
    prompt: 'Help me prepare an offer for a new hire. What information do you need?',
    response: "I can help structure the offer and prepare a review-ready draft. I’ll first collect the role, location, compensation, start date, employment terms, and any company-specific requirements. Your team should review the final terms before sending.",
    attachment: {
      title: '📄 Offer preparation checklist',
      description: 'Role • location • compensation • start date • employment terms • company policies',
      type: 'template' as const
    }
  },
  {
    label: 'Handle an employee request',
    prompt: 'An employee has a people question. Help me decide what to do next.',
    response: "Share the situation without unnecessary personal information. I can organize the facts, identify the policy or process that may apply, and suggest next steps. Sensitive or consequential matters should be reviewed by your Fractional CHRO.",
    attachment: {
      title: '🧭 People issue triage',
      description: 'Context → relevant policy/process → options → human review where judgement is required',
      type: 'checklist' as const
    }
  },
  {
    label: 'Prepare for a leadership hire',
    prompt: 'We are hiring a senior leader. Help me prepare the hiring and closing plan.',
    response: "I can organize the role brief, interview plan, candidate evaluation, compensation inputs, and closing checklist. Your Fractional CHRO can then advise on the high-stakes judgement calls and final negotiation strategy.",
    attachment: {
      title: '👤 Leadership hiring brief',
      description: 'Role scorecard • interview plan • candidate risks • compensation inputs • closing decisions',
      type: 'document' as const
    }
  },
  {
    label: 'Review a people policy',
    prompt: 'Help me review an HR policy before we share it with employees.',
    response: "I can summarize the policy, identify unclear sections, compare it with the information you provide, and prepare questions for human review. I won’t present legal or regulatory conclusions as guaranteed outcomes.",
    attachment: {
      title: '📋 Policy review',
      description: 'Summary • clarity checks • missing inputs • review questions',
      type: 'document' as const
    }
  },
  {
    label: 'Escalate to human CHRO',
    prompt: 'This is a sensitive people decision. I need Fractional CHRO guidance.',
    response: "This is the right point to involve your Fractional CHRO. I can prepare a concise decision brief with the context, open questions, options, and relevant documents so the human conversation starts with the work already organized.",
    attachment: {
      title: '👤 Fractional CHRO handover brief',
      description: 'Context • facts • open questions • options • documents for human review',
      type: 'alert' as const
    }
  }
];

export const VIDEO_DEMO_SLIDES: DemoSlide[] = [
  {
    id: 1,
    title: "Stop losing founder time to people problems.",
    subtitle: "Hercules gives you an AI HR workforce for the everyday work, backed by Fractional CHRO leadership when judgement matters.",
    videoPlaceholderBg: "from-[#111827] via-[#0f172a] to-[#020617]",
    speakerText: "Stop losing founder time to people problems.",
    caption: "THE HERCULES SOLUTION",
    activeFeature: "AI Workforce + Fractional CHRO"
  },
  {
    id: 2,
    title: "AI handles the work that keeps pulling founders into HR.",
    subtitle: "Requests, follow-ups, drafts, hiring workflows and people operations can keep moving without turning the founder into the HR helpdesk.",
    videoPlaceholderBg: "from-[#1e1b4b] via-[#0f172a] to-[#030712]",
    speakerText: "AI handles the work that keeps pulling founders into HR.",
    caption: "THE EVERYDAY WORK",
    activeFeature: "Always-on HR execution"
  },
  {
    id: 3,
    title: "Hercules works where your team already works.",
    subtitle: "The experience is designed around workspace conversations and connected workflows, with the AI preparing work for people to review.",
    videoPlaceholderBg: "from-[#030712] via-[#1e293b] to-[#0f172a]",
    speakerText: "Hercules works where your team already works.",
    caption: "WORKSPACE AI",
    activeFeature: "Connected workflow context"
  },
  {
    id: 4,
    title: "When the decision is consequential, the CHRO steps in.",
    subtitle: "Hercules prepares the context and options; your Fractional CHRO owns the judgement on sensitive people and leadership decisions.",
    videoPlaceholderBg: "from-[#020617] via-[#172554] to-[#0b1329]",
    speakerText: "When the decision is consequential, the CHRO steps in.",
    caption: "HUMAN JUDGEMENT",
    activeFeature: "AI prepares • CHRO decides"
  },
  {
    id: 5,
    title: "One HR function. AI working 24/7.",
    subtitle: "Start with the AI workforce and bring in Fractional CHRO leadership as your people decisions become more complex.",
    videoPlaceholderBg: "from-[#0f172a] via-[#1e1b4b] to-[#020617]",
    speakerText: "One HR function. AI working 24/7.",
    caption: "THE HERCULES MODEL",
    activeFeature: "Start with Hercules"
  }
];

export const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: 'hire-better',
    title: 'Hire with an AI workforce behind you',
    subtitle: 'Structure hiring work, prepare candidates, and keep the process moving',
    description: 'Hercules AI organizes hiring inputs, prepares interview and offer materials, tracks follow-ups, and gives your Fractional CHRO a clean brief when human judgement is needed.',
    iconName: 'Rocket',
    badge: '01 HIRING',
    highlights: [
      'Candidate and interview workflow support',
      'Offer preparation and review-ready drafts',
      'Escalation briefs for high-stakes hiring decisions'
    ],
    metrics: 'AI-assisted execution'
  },
  {
    id: 'keep-your-best',
    title: 'Keep your people work moving',
    subtitle: 'Employee requests, follow-ups and manager support without the HR bottleneck',
    description: 'Use Hercules to organize recurring people operations, prepare manager guidance, track follow-ups, and surface issues that need a human conversation.',
    iconName: 'Sparkles',
    badge: '02 PEOPLE OPERATIONS',
    highlights: [
      'Employee and manager request handling',
      'Recurring follow-ups and workflow coordination',
      'Human escalation for sensitive situations'
    ],
    metrics: 'Always-on HR support'
  },
  {
    id: 'stay-compliant',
    title: 'People risk with human oversight',
    subtitle: 'Organize policies, documentation and review workflows without pretending AI replaces judgement',
    description: 'Hercules can help organize HR policies, documents, reminders and review workflows. Where legal, regulatory or sensitive employee decisions are involved, the AI surfaces the work for appropriate human review.',
    iconName: 'Shield',
    badge: '03 PEOPLE & RISK',
    highlights: [
      'Policy and documentation workflows',
      'Review and follow-up tracking',
      'Fractional CHRO escalation for consequential decisions'
    ],
    metrics: 'Human-in-the-loop'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'tier-1',
    name: 'STARTER AI + CHRO',
    tagline: 'For early teams that want an AI HR workforce with strategic support when needed.',
    priceMonthly: 40000,
    priceAnnual: 32000,
    teamSizeLimit: 'Early-stage teams',
    features: [
      'Hercules AI workspace support',
      'Hiring and people-operations workflows',
      'Review-ready HR drafts and follow-ups',
      'Fractional CHRO office hours',
      'Human escalation for sensitive decisions'
    ]
  },
  {
    id: 'tier-2',
    name: 'GROWTH HYBRID',
    tagline: 'For scaling teams that need an always-on AI HR workforce plus executive HR leadership.',
    priceMonthly: 80000,
    priceAnnual: 64000,
    teamSizeLimit: 'Growing teams',
    badge: 'Recommended',
    highlighted: true,
    features: [
      'Hercules AI across connected HR workflows',
      'Hiring, onboarding and employee support workflows',
      'Dedicated Fractional CHRO leadership',
      'Human-in-the-loop escalation and decision briefs',
      'Priority founder support'
    ]
  },
  {
    id: 'tier-3',
    name: 'ENTERPRISE CHRO',
    tagline: 'For organizations needing a deeper AI HR operating layer and dedicated strategic HR leadership.',
    priceMonthly: 0,
    priceAnnual: 0,
    teamSizeLimit: 'Custom / Enterprise',
    features: [
      'Everything in Growth Hybrid',
      'Dedicated Fractional CHRO capacity',
      'Custom AI workflow design',
      'Leadership and org-design advisory',
      'Integration and workflow requirements scoped to the organization'
    ]
  }
];

export const FOUNDER_TIME_TRAPS = [
  {
    category: 'Hiring administration',
    hoursPerWeek: 0,
    description: 'Offer preparation, interview coordination, candidate follow-ups and hiring workflow administration that Hercules can help organize and execute.',
    costPerYear: 'Model your current cost'
  },
  {
    category: 'Onboarding & employee requests',
    hoursPerWeek: 0,
    description: 'Recurring employee questions, onboarding coordination, documentation and manager follow-ups that can be routed through the AI workforce.',
    costPerYear: 'Model your current cost'
  },
  {
    category: 'People operations',
    hoursPerWeek: 0,
    description: 'Routine HR coordination, reminders, policy questions and operational follow-through that otherwise lands on founders or managers.',
    costPerYear: 'Model your current cost'
  },
  {
    category: 'Leadership & people decisions',
    hoursPerWeek: 0,
    description: 'High-context decisions such as org design, senior hiring, performance situations and leadership coaching where Fractional CHRO judgement adds value.',
    costPerYear: 'Model your current cost'
  }
];

// Kept as a compatibility export for existing sections. Values are intentionally
// qualitative until Hercules has independently verified customer evidence.
export const FAKE_METRICS = [
  { value: "24/7", label: "AI HR workforce", subtext: "Always-on execution layer" },
  { value: "1", label: "Fractional CHRO layer", subtext: "Strategic human judgement when needed" },
  { value: "AI", label: "Execution first", subtext: "Prepare, organize and move work forward" },
  { value: "Human", label: "Decision layer", subtext: "Consequential people decisions stay accountable" }
];

// Kept as a compatibility export. Do not render these as customer logos or proof.
export const FAKE_CLIENT_LOGOS: Array<{ name: string; logoText: string; category: string }> = [];

// Kept as a compatibility export. Do not render these as customer testimonials or evidence.
export const FAKE_TESTIMONIALS: Array<{
  quote: string;
  authorName: string;
  authorTitle: string;
  avatar: string;
  metrics: string;
}> = [];
