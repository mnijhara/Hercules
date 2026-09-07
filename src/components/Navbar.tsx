import React, { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';

interface NavbarProps {
  onOpenVideoDemo: () => void;
  onOpenAddSlackModal: () => void;
  onOpenBookModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVideoDemo, onOpenAddSlackModal, onOpenBookModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#how-it-works" className="flex items-center gap-3 group" aria-label="Hercules home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-black text-lg">H</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">HERCULES</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-mono font-bold">Hercules AI</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider text-slate-600" aria-label="Primary navigation">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#human-chro" className="text-sky-700 font-bold hover:text-sky-900 transition-colors">AI + Human CHRO</a>
            <a href="#the-product" className="hover:text-slate-900 transition-colors">The Product</a>
            <a href="#slack-demo" className="hover:text-slate-900 transition-colors">AI Workforce</a>
            <a href="#voice-screen" className="hover:text-slate-900 transition-colors">Voice Screen</a>
            <a href="#risk" className="hover:text-slate-900 transition-colors">People & Risk</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            {onOpenBookModal && <button type="button" onClick={onOpenBookModal} className="px-3.5 py-2 rounded-full text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all flex items-center gap-1.5 shadow-sm">Talk to a CHRO</button>}
            <button type="button" onClick={onOpenVideoDemo} className="px-3 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5" aria-label="Watch how Hercules works">
              <Play className="w-3 h-3 text-sky-600 fill-sky-600" /><span>Watch how it works</span>
            </button>
            <button type="button" onClick={onOpenAddSlackModal} className="px-4 py-2 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md active:scale-95">Get started</button>
          </div>

          <div className="md:hidden">
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="p-2 text-slate-600 hover:text-slate-900">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4" role="navigation" aria-label="Mobile navigation">
          {[
            ['#how-it-works', 'How it works'],
            ['#human-chro', 'AI + Human CHRO'],
            ['#the-product', 'The Product'],
            ['#slack-demo', 'AI Workforce'],
            ['#voice-screen', 'Voice Screen'],
            ['#risk', 'People & Risk'],
            ['#features', 'Capabilities'],
            ['#pricing', 'Pricing'],
          ].map(([href, label]) => <a key={href} href={href} onClick={closeMobileMenu} className="block text-sm font-medium text-slate-700 hover:text-slate-900">{label}</a>)}

          <div className="pt-2 flex flex-col gap-2">
            <button type="button" onClick={() => { closeMobileMenu(); onOpenVideoDemo(); }} className="w-full py-3 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 flex items-center justify-center gap-2">
              <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" /><span>Watch how it works</span>
            </button>
            {onOpenBookModal && <button type="button" onClick={() => { closeMobileMenu(); onOpenBookModal(); }} className="w-full py-3 rounded-full text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200">Talk to a CHRO</button>}
            <button type="button" onClick={() => { closeMobileMenu(); onOpenAddSlackModal(); }} className="w-full py-3 rounded-full text-xs font-bold text-white bg-slate-900">Get started with Hercules</button>
          </div>
        </div>
      )}
    </header>
  );
};
