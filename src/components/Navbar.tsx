import React, { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';

interface NavbarProps {
  onOpenVideoDemo: () => void;
  onOpenAddSlackModal: () => void;
  onOpenBookModal?: () => void;
}

const links = [
  ['#the-problem', 'The problem'],
  ['#model', 'The model'],
  ['#capabilities', 'Capabilities'],
  ['#workspace-ai', 'See it work'],
  ['#calculator', 'Calculator'],
  ['#pricing', 'Pricing'],
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenVideoDemo, onOpenAddSlackModal, onOpenBookModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <a href="#how-it-works" className="group flex min-w-0 items-center gap-3" aria-label="Hercules overview">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-sky-500/10 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900 text-lg font-black text-white">H</div>
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600">HERCULES</span>
              <span className="hidden shrink-0 rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 font-mono text-[10px] font-bold text-sky-700 xl:inline-flex">Fractional CHRO + AI</span>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-xs font-semibold uppercase tracking-wider text-slate-600 lg:flex" aria-label="Primary navigation">
            {links.map(([href, label]) => <a key={href} href={href} className="transition-colors hover:text-slate-900">{label}</a>)}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            {onOpenBookModal && <button type="button" onClick={onOpenBookModal} className="rounded-full border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs font-bold text-sky-800 shadow-sm transition-all hover:bg-sky-100">Talk to a CHRO</button>}
            <button type="button" onClick={onOpenVideoDemo} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200" aria-label="Watch how Hercules works">
              <Play className="h-3 w-3 fill-sky-600 text-sky-600" />
              <span>Watch demo</span>
            </button>
            <button type="button" onClick={onOpenAddSlackModal} className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95">Get started</button>
          </div>

          <div className="lg:hidden">
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" className="p-2 text-slate-600 hover:text-slate-900">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="space-y-3 border-b border-slate-200 bg-white px-4 pb-5 pt-3 lg:hidden" role="navigation" aria-label="Mobile navigation">
          {links.map(([href, label]) => <a key={href} href={href} onClick={closeMobileMenu} className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900">{label}</a>)}
          <div className="grid gap-2 pt-2">
            <button type="button" onClick={() => { closeMobileMenu(); onOpenVideoDemo(); }} className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 py-3 text-xs font-semibold text-slate-800">
              <Play className="h-3.5 w-3.5 fill-sky-600 text-sky-600" /> Watch demo
            </button>
            {onOpenBookModal && <button type="button" onClick={() => { closeMobileMenu(); onOpenBookModal(); }} className="w-full rounded-full border border-sky-200 bg-sky-50 py-3 text-xs font-bold text-sky-900">Talk to a CHRO</button>}
            <button type="button" onClick={() => { closeMobileMenu(); onOpenAddSlackModal(); }} className="w-full rounded-full bg-slate-900 py-3 text-xs font-bold text-white">Get started with Hercules</button>
          </div>
        </div>
      )}
    </header>
  );
};
