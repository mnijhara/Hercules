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
import { WorkspaceAIDemoSection } from './components/WorkspaceAIDemoSection';
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
      <Navbar
        onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
        onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
        onOpenBookModal={() => setIsBookChroOpen(true)}
      />

      <main>
        <div className="bg-white">
          <HeroSection
            onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          <TestimonialsAndLogosSection />

          <ProblemSection
            onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
          />

          <ProductOverviewSection
            onOpenAddSlackModal={() => setIsAddSlackOpen(true)}
            onOpenBookModal={() => setIsBookChroOpen(true)}
          />
          <FeaturesPillarsSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
          <FounderCalculatorSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
        </div>

        <div className="bg-slate-950 text-white">
          <HumanHandoverSection onOpenAddSlackModal={() => setIsBookChroOpen(true)} />
          <HrAuditSection
            onOpenBookModal={() => setIsBookChroOpen(true)}
            onOpenSlackModal={() => setIsAddSlackOpen(true)}
          />
          <WorkspaceAIDemoSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
          <VoiceScreenSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
          <ComplianceSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
          <PricingSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
          <CallbackFormSection />
        </div>
      </main>

      <Footer onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />

      <button
        type="button"
        onClick={() => setIsAddSlackOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-2xl shadow-slate-900/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-slate-700 group"
        id="floating-add-slack-widget"
        title="Request Hercules workspace setup"
        aria-label="Request Hercules workspace setup"
      >
        <MessageSquare className="w-5 h-5 text-sky-400" />
        <span className="text-xs uppercase tracking-wider font-extrabold pr-1 hidden sm:inline">Request workspace setup</span>
      </button>

      <VideoDemoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onOpenAddSlackModal={() => {
          setIsVideoDemoOpen(false);
          setIsAddSlackOpen(true);
        }}
      />

      <AddSlackModal isOpen={isAddSlackOpen} onClose={() => setIsAddSlackOpen(false)} />
      <BookChroModal isOpen={isBookChroOpen} onClose={() => setIsBookChroOpen(false)} />
    </div>
  );
}
