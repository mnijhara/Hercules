/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TestimonialsAndLogosSection } from './components/TestimonialsAndLogosSection';
import { ProblemSection } from './components/ProblemSection';
import { ProductOverviewSection } from './components/ProductOverviewSection';
import { FeaturesPillarsSection } from './components/FeaturesPillarsSection';
import { FounderCalculatorSection } from './components/FounderCalculatorSection';
import { HumanHandoverSection } from './components/HumanHandoverSection';
import { HrAuditSection } from './components/HrAuditSection';
import { SlackDemoSection } from './components/SlackDemoSection';
import { VoiceScreenSection } from './components/VoiceScreenSection';
import { ComplianceSection } from './components/ComplianceSection';
import { PricingSection } from './components/PricingSection';
import { CallbackFormSection } from './components/CallbackFormSection';
import { VideoDemoModal } from './components/VideoDemoModal';
import { AddSlackModal } from './components/AddSlackModal';
import { BookChroModal } from './components/BookChroModal';
import { Footer } from './components/Footer';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isAddSlackOpen, setIsAddSlackOpen] = useState<boolean>(false);
  const [isBookChroOpen, setIsBookChroOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-sky-500/20 selection:text-sky-950 overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
        onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        onOpenBookModal={() => setIsBookChroOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* ========================================== */}
        {/* LIGHT MODE SECTION BLOCK (THE WHITE HALF)  */}
        {/* ========================================== */}
        <div className="bg-white">
          {/* Hero Section */}
          <HeroSection
            onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Fake Testimonials, Live Stats & Client Logos */}
          <TestimonialsAndLogosSection />

          {/* Section: The Problem */}
          <ProblemSection
            onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Section: The Product */}
          <ProductOverviewSection
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
        </div>

        {/* ========================================== */}
        {/* DARK MODE SECTION BLOCK (THE BLACK HALF)  */}
        {/* ========================================== */}
        <div className="bg-slate-950 text-white">
          {/* Section: Strategic CHRO Philosophy & Human Fractional CHRO Handover Matrix */}
          <HumanHandoverSection
            onOpenAddSlackModal={() => setIsBookChroOpen(true)}
          />

          {/* Section: Interactive HR Risk & Compliance Audit */}
          <HrAuditSection
            onOpenBookModal={() => setIsBookChroOpen(true)}
            onOpenSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Section: Slack, WhatsApp, GMeet, Email Workspace AI */}
          <SlackDemoSection
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Section: Voice Candidate Screening */}
          <VoiceScreenSection
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Section: DRDA & Statutory Compliance */}
          <ComplianceSection
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Pricing */}
          <PricingSection
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          {/* Callback Onboarding Form */}
          <CallbackFormSection />
        </div>
      </main>

      {/* Footer */}
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

      {/* Book Strategic Fractional CHRO Consultation Modal */}
      <BookChroModal
        isOpen={isBookChroOpen}
        onClose={() => setIsBookChroOpen(false)}
      />
    </div>
  );
}
