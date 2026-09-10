import React from 'react';
import { X, Sparkles, MessageSquare } from 'lucide-react';
import { useModalFocus } from './useModalFocus';
import { HerculesProductVideo } from './HerculesProductVideo';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddSlackModal: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ isOpen, onClose, onOpenAddSlackModal }) => {
  const dialogRef = useModalFocus(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-3 backdrop-blur-md sm:p-4" role="dialog" aria-modal="true" aria-labelledby="hercules-video-title">
      <div ref={dialogRef} tabIndex={-1} className="relative my-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl outline-none sm:my-8 sm:rounded-3xl">
        <button type="button" onClick={onClose} aria-label="Close Hercules product video" className="absolute right-3 top-3 z-30 rounded-full bg-slate-950/80 p-2 text-white ring-1 ring-white/15 hover:bg-slate-900">
          <X className="h-5 w-5" />
        </button>
        <div className="border-b border-white/10 px-5 pb-4 pt-5 sm:px-7 sm:pb-5 sm:pt-6">
          <div className="flex items-center gap-2 text-sky-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-mono font-bold tracking-[.18em]">HERCULES PRODUCT VIDEO</span>
          </div>
          <h2 id="hercules-video-title" className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">See how Hercules works.</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-400">A 12-second product film: Fractional CHRO judgment amplified by an AI HR workforce.</p>
        </div>
        <div className="p-3 sm:p-5">
          <HerculesProductVideo />
          <p className="mt-3 text-center text-xs text-slate-500">AI prepares · CHRO decides · approved work gets executed</p>
          <button type="button" onClick={() => { onClose(); onOpenAddSlackModal(); }} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-sky-300">
            <MessageSquare className="h-3.5 w-3.5" /> Request workspace setup
          </button>
        </div>
      </div>
    </div>
  );
};
