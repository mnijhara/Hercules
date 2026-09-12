/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
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
import AdminDashboard from './AdminDashboard';
import { track } from './analytics';

export default function App() {
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [isAddSlackOpen, setIsAddSlackOpen] = useState(false);
  const [isBookChroOpen, setIsBookChroOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/admin') return;
    track('page_view');
    let lastTracked = 0;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || target.closest('input, textarea, select')) return;
      const interactive = target.closest('button, a[href]');
      if (!interactive) return;
      const now = Date.now();
      if (now - lastTracked < 300) return;
      lastTracked = now;
      const label = (interactive.getAttribute('aria-label') || interactive.textContent || '').slice(0, 80).replace(/\s+/g, ' ').trim();
      if (label) track('cta_click', label);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (window.location.pathname === '/admin') return <AdminDashboard />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-sky-500/20 selection:text-sky-950">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-xs focus:font-extrabold focus:text-slate-950 focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-300">
        Skip to main content
      </a>
      <Navbar onOpenVideoDemo={() => setIsVideoDemoOpen(true)} onOpenAddSlackModal={() => setIsAddSlackOpen(true)} onOpenBookModal={() => setIsBookChroOpen(true)} />
      <main id="main-content">
        <HeroSection onOpenVideoDemo={() => setIsVideoDemoOpen(true)} onOpenBookModal={() => setIsBookChroOpen(true)} />
        <ProblemSection />
        <ProductOverviewSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} onOpenBookModal={() => setIsBookChroOpen(true)} />
        <WorkspaceAIDemoSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
        <FounderCalculatorSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
        <PricingSection onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
        <CallbackFormSection />
      </main>
      <Footer onOpenAddSlackModal={() => setIsAddSlackOpen(true)} />
      <button type="button" onClick={() => setIsBookChroOpen(true)} className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 p-3 font-bold text-white shadow-2xl shadow-slate-900/30 transition-all hover:scale-105 hover:bg-slate-800 active:scale-95 lg:bottom-6 lg:right-6 lg:p-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]" id="floating-chro-widget" title="Talk to a Fractional CHRO" aria-label="Talk to a Fractional CHRO"><UserRound className="h-5 w-5 text-sky-400" /><span className="hidden text-xs font-extrabold uppercase tracking-wider lg:inline">Talk to a Fractional CHRO</span></button>
      <VideoDemoModal isOpen={isVideoDemoOpen} onClose={() => setIsVideoDemoOpen(false)} onOpenAddSlackModal={() => { setIsVideoDemoOpen(false); setIsAddSlackOpen(true); }} />
      <AddSlackModal isOpen={isAddSlackOpen} onClose={() => setIsAddSlackOpen(false)} />
      <BookChroModal isOpen={isBookChroOpen} onClose={() => setIsBookChroOpen(false)} />
    </div>
  );
}
