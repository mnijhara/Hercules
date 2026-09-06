/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ProductOverviewSection } from './components/ProductOverviewSection';
import { HumanHandoverSection } from './components/HumanHandoverSection';
import { SlackDemoSection } from './components/SlackDemoSection';
import { VoiceScreenSection } from './components/VoiceScreenSection';
import { ComplianceSection } from './components/ComplianceSection';
import { FeaturesPillarsSection } from './components/FeaturesPillarsSection';
import { FounderCalculatorSection } from './components/FounderCalculatorSection';
import { PricingSection } from './components/PricingSection';
import { CallbackFormSection } from './components/CallbackFormSection';
import { VideoDemoModal } from './components/VideoDemoModal';
import { AddSlackModal } from './components/AddSlackModal';
import { Footer } from './components/Footer';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isAddSlackOpen, setIsAddSlackOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500/20 selection:text-sky-950 overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
        onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Section: The Problem */}
        <ProblemSection
          onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Section: The Product (Screenshot 3 & 4) */}
        <ProductOverviewSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Section: Strategic CHRO Philosophy & Human Fractional CHRO Handover Matrix */}
        <HumanHandoverSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Section: Slack, WhatsApp, GMeet, Email Workspace AI */}
        <SlackDemoSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Section: Voice Candidate Screening (Screenshot 5) */}
        <VoiceScreenSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Section: DRDA & Statutory Compliance (Screenshot 6 & 7) */}
        <ComplianceSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Core Capabilities & Features */}
        <FeaturesPillarsSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Founder Time & Cost Wasted Calculator */}
        <FounderCalculatorSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Pricing (Screenshot 8) */}
        <PricingSection
          onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        />

        {/* Callback Onboarding Form (Screenshot 9) */}
        <CallbackFormSection />
      </main>

      {/* Footer (Screenshot 9) */}
      <Footer
        onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
      />

      {/* Floating Action Widget */}
      <button
        onClick={() => setIsAddSlackOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-slate-700 group"
        id="floating-add-slack-widget"
        title="Add Hercules to Slack / WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-sky-400" />
        <span className="text-xs uppercase tracking-wider font-extrabold pr-1 hidden sm:inline">
          Deploy Hercules
        </span>
      </button>

      {/* Video Walkthrough Modal */}
      <VideoDemoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onOpenAddSlackModal={() => {
          setIsVideoDemoOpen(false);
          setIsAddSlackOpen(true);
        }}
      />

      {/* Add Slack Authorization Modal */}
      <AddSlackModal
        isOpen={isAddSlackOpen}
        onClose={() => setIsAddSlackOpen(false)}
      />
    </div>
  );
}
