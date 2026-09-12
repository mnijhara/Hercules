export interface SlackMessage {
  id: string;
  sender: 'founder' | 'hercules' | 'system';
  authorName: string;
  avatarUrl?: string;
  text: string;
  timestamp: string;
  attachment?: {
    title: string;
    description: string;
    type: 'template' | 'checklist' | 'alert' | 'document' | 'action';
    actions?: string[];
  };
  reactions?: { emoji: string; count: number }[];
}

export interface FeaturePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  highlights: string[];
  metrics: string;
}

export interface DemoSlide {
  id: number;
  title: string;
  subtitle: string;
  videoPlaceholderBg: string;
  speakerText: string;
  caption: string;
  activeFeature: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  priceMonthlyUsd?: number;
  priceAnnualUsd?: number;
  teamSizeLimit: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'hercules';
  text: string;
  timestamp: string;
  options?: string[];
  codeSnippet?: string;
}

export interface DemoModalState {
  isOpen: boolean;
  activeTab: 'video' | 'interactive' | 'slack';
}
