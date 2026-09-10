/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ProductOverviewSection } from './components/ProductOverviewSection';
import { FounderCalculatorSection } from './components/FounderCalculatorSection';
import { WorkspaceAIDemoSection } from './components/WorkspaceAIDemoSection';
import { PricingSection } from './components/PricingSection';
import { CallbackFormSection } from './components/CallbackFormSection';
import { VideoDemoModal } from './components/VideoDemoModal';
import { AddSlackModal } from './components/AddSlackModal';
import { BookChroModal } from './components/BookChroModal';
import { Footer } from './components/Footer';
import { UserRound } from 'lucide-react';

export default function App() {
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [isAddSlackOpen, setIsAddSlackOpen] = useState(false);
  const [isBookChroOpen, setIsBookChroOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-sky-500/20 selection:text-sky-950">
      <Navbar onOpenVideoDemo={() => setIsVideoDemoOpen(true)} onOpenAddSlackModal={() => setIsAddSlackOpen(true)} onOpenBookModal={() => setIsBookChroOpen(true)} />
      <main>
        <HeroSection onOpenVideoDemo={() => setIsVideoDemoOpen(true)} />
        <ProblemSection />
        <ProductOverviewSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} onOpenBookModal={() => setIsBookChroOpen(true)} />
        <WorkspaceAIDemoSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
        <FounderCalculatorSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
        <div className="bg-slate-950 text-white"><PricingSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} /><CallbackFormSection /></div>
      </main>
      <Footer onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
      <button type="button" onClick={() => setIsBookChroOpen(true)} className="fixed bottom-3 right-3 z-30 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 p-3 font-bold text-white shadow-2xl shadow-slate-900/30 transition-all hover:scale-105 hover:bg-slate-800 active:scale-95 lg:bottom-4 lg:right-4 lg:p-3.5" id="floating-chro-widget" title="Talk to a Fractional CHRO" aria-label="Talk to a Fractional CHRO"><UserRound className="h-5 w-5 text-sky-400" /><span className="hidden text-xs font-extrabold uppercase tracking-wider lg:inline">Talk to a Fractional CHRO</span></button>
      <VideoDemoModal isOpen={isVideoDemoOpen} onClose={() => setIsVideoDemoOpen(false)} onOpenAddSlackModal={() => { setIsVideoDemoOpen(false); setIsAddSlackOpen(true); }} />
      <AddSlackModal isOpen={isAddSlackOpen} onClose={() => setIsAddSlackOpen(false)} />
      <BookChroModal isOpen={isBookChroOpen} onClose={() => setIsBookChroOpen(false)} />
    </div>
  );
}
