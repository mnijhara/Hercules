import React, { useState } from 'react';
import { MessageSquare, Sparkles, ArrowRight, Shield, ChevronRight, Menu, X, Play } from 'lucide-react';

interface NavbarProps {
  onOpenVideoDemo: () => void;
  onOpenAddSlackModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVideoDemo, onOpenAddSlackModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 p-0.5 shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-black text-lg">
                H
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                HERCULES
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-mono font-bold">
                Hercules AI
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#human-chro" className="text-sky-700 font-bold hover:text-sky-900 transition-colors flex items-center gap-1">
              <span>AI + Human CHRO</span>
            </a>
            <a href="#the-product" className="hover:text-slate-900 transition-colors">The Product</a>
            <a href="#voice-screen" className="hover:text-slate-900 transition-colors">Voice Screen</a>
            <a href="#compliance" className="hover:text-slate-900 transition-colors">DRDA & POSH</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenVideoDemo}
              className="px-3.5 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 text-sky-600 fill-sky-600" />
              <span>Watch Video</span>
            </button>

            <button
              onClick={onOpenAddSlackModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-md flex items-center gap-1.5 active:scale-95"
            >
              <span>Log in</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            How it works
          </a>
          <a
            href="#the-problem"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            The Problem
          </a>
          <a
            href="#slack-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Channels
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Pricing
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVideoDemo();
              }}
              className="w-full py-3 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
              <span>Watch how it works</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddSlackModal();
              }}
              className="w-full py-3 rounded-full text-xs font-bold text-white bg-slate-900"
            >
              Log in / Deploy Hercules AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
