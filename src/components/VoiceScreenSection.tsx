import React from 'react';
import { Mic, Video, Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface VoiceScreenSectionProps {
  onOpenAddSlackModal: () => void;
}

export const VoiceScreenSection: React.FC<VoiceScreenSectionProps> = ({ onOpenAddSlackModal }) => {
  return (
    <section id="voice-screen" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Video Mockup Column matching Screenshot 5 */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative text-white">
              {/* Screen Header */}
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-slate-200 font-bold">Senior Backend Engineer · Screen</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold">14:02 • REC</span>
                </div>
              </div>

              {/* Video Grid */}
              <div className="p-6 bg-slate-950 min-h-[300px] flex flex-col justify-between relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* Speaker 1: Jordan M. */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between items-center text-center relative">
                    <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-lg mb-2">
                      JM
                    </div>
                    <span className="text-xs font-bold text-slate-200">JM (Jordan M.)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Candidate</span>
                  </div>

                  {/* Speaker 2: Hercules AI */}
                  <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-4 flex flex-col justify-between items-center text-center relative shadow-lg shadow-sky-500/10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg mb-2 relative">
                      <Mic className="w-6 h-6 text-white" />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
                    </div>
                    <span className="text-xs font-bold text-sky-400">Hercules</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Speaking Live...</span>
                  </div>
                </div>

                {/* Realtime Dialogue Subtitle */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed shadow-inner">
                  <span className="text-sky-400 font-bold block mb-1">Hercules (Voice Co-Pilot):</span>
                  "Walk me through the last system you took from prototype to production at scale — what broke first, and how did you decide what to fix?"
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Features matching Screenshot 5 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-sky-800 text-xs font-mono font-bold uppercase tracking-[0.2em] bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>AUTOMATED CANDIDATE SCREENING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hercules runs the screen for you.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              When a candidate clears the resume bar, Hercules joins a Zoom or Google Meet call as a participant, runs a structured interview by voice, and DMs the founder a scored summary before the next meeting starts.
            </p>

            <ul className="space-y-3.5 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Builds a custom candidate profile from the founder's actual needs — not a generic JD</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Real spoken interaction — TTS in, transcript out</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>ICP-tuned questions per role and company stage</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>Scored against the rubric the founder actually cares about</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenAddSlackModal}
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <span>Enable GMeet Voice Screenings</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
