import React, { useState, useEffect } from 'react';
import { VIDEO_DEMO_SLIDES } from '../data/herculesData';
import { X, Play, Pause, ChevronRight, ChevronLeft, Sparkles, MessageSquare } from 'lucide-react';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddSlackModal: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenAddSlackModal,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : VIDEO_DEMO_SLIDES.length - 1));
      if (event.key === 'ArrowRight') setCurrentSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSlide = VIDEO_DEMO_SLIDES[currentSlideIndex];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="hercules-walkthrough-title">
      <div className="bg-white border border-slate-200/90 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
        <button
          onClick={onClose}
          aria-label="Close Hercules walkthrough"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`p-8 sm:p-12 min-h-[420px] flex flex-col justify-between bg-gradient-to-br ${currentSlide.videoPlaceholderBg} relative`}>
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between pr-12">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono text-sky-400 font-bold bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
                HERCULES INTERACTIVE WALKTHROUGH
              </span>
            </div>
          </div>

          <div className="relative z-10 max-w-xl my-8 space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-500/30">
              {currentSlide.caption}
            </span>

            <h3 id="hercules-walkthrough-title" className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {currentSlide.title}
            </h3>

            <p className="text-sm text-slate-300 font-light leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {currentSlide.id === 5 && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAddSlackModal();
                  }}
                  className="px-6 py-3 rounded-full bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-400/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Explore the AI workforce</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
                aria-pressed={isPlaying}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-sky-400" /> : <Play className="w-4 h-4 text-sky-400" />}
              </button>
              <span className="text-xs font-mono text-slate-400">
                {String(currentSlideIndex + 1).padStart(2, '0')} / {String(VIDEO_DEMO_SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : VIDEO_DEMO_SLIDES.length - 1))}
                aria-label="Previous walkthrough step"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % VIDEO_DEMO_SLIDES.length)}
                aria-label="Next walkthrough step"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
