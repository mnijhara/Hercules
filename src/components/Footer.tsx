import React from 'react';
import { MessageSquare, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAddSlackModal: () => void;
  onOpenVideoDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAddSlackModal, onOpenVideoDemo }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5 shadow-sm">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-black text-sm">
                  H
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                HERCULES HR
              </span>
            </div>

            <p className="text-xs text-slate-400 font-normal leading-relaxed max-w-sm">
              Hercules HR is the virtual HR lead in Slack, WhatsApp, Google Meet, and Email. Helping tech founders hire top talent, protect runway, automate DRDA & POSH compliance, and run voice candidate screens without hiring HR.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-sky-400 font-mono text-[10px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Hercules AI in Production
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                DRDA & STATUTORY COMPLIANT
              </span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Product & Integrations
            </h4>
            <ul className="space-y-2 text-xs font-normal text-slate-400">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
              </li>
              <li>
                <a href="#the-product" className="hover:text-white transition-colors">The Product</a>
              </li>
              <li>
                <a href="#voice-screen" className="hover:text-white transition-colors">GMeet Voice Screening</a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">DRDA & POSH Compliance</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Stay Focused on Growth
            </h4>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Stop losing founder time to people problems. Deploy Hercules inside Slack, WhatsApp & Google Meet.
            </p>

            <button
              onClick={onOpenAddSlackModal}
              className="px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Deploy Hercules to Workspace</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <span>© 2026 Hercules HR · Virtual HR Lead in Slack, WhatsApp, GMeet & Email</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 font-semibold text-sky-400">Slack, WhatsApp & GMeet Native</span>
            <span className="hover:text-slate-300 cursor-pointer">Find us on LinkedIn ↗</span>
            <span className="hover:text-slate-300 cursor-pointer">DRDA & POSH Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
