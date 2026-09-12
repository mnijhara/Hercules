import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  FileText,
  Bot,
  UserRound,
  MessageSquare,
  Building2,
  DollarSign,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Tv,
  Cpu,
  Layers,
  Check
} from 'lucide-react';
import { track } from '../analytics';

const PRODUCT_VIDEO_URL =
  'https://github.com/mnijhara/Hercules/releases/download/hercules-product-video/hercules-product-video.mp4';

interface HerculesProductVideoProps {
  onOpenAddSlackModal?: () => void;
}

interface Scene {
  id: string;
  number: string;
  label: string;
  durationMs: number;
}

const SCENES: Scene[] = [
  { id: 'slack', number: '01', label: 'Slack Trigger', durationMs: 7000 },
  { id: 'ai-benchmarks', number: '02', label: 'AI Intelligence', durationMs: 8000 },
  { id: 'chro-review', number: '03', label: 'CHRO Sign-Off', durationMs: 8000 },
  { id: 'execution', number: '04', label: 'Auto-Execution', durationMs: 7000 },
  { id: 'roi', number: '05', label: 'Founder ROI', durationMs: 7000 },
];

export const HerculesProductVideo: React.FC<HerculesProductVideoProps> = ({ onOpenAddSlackModal }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'video'>('interactive');
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<1 | 1.5 | 2>(1);
  const [sceneElapsedMs, setSceneElapsedMs] = useState(0);
  const [activeBenchmarkTab, setActiveBenchmarkTab] = useState<'comp' | 'esop' | 'compliance'>('comp');
  const [candidateApproved, setCandidateApproved] = useState(true);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const activeScene = SCENES[currentSceneIdx];

  // Calculate cumulative progress (0% to 100%)
  const totalDuration = SCENES.reduce((acc, s) => acc + s.durationMs, 0);
  const precedingDuration = SCENES.slice(0, currentSceneIdx).reduce((acc, s) => acc + s.durationMs, 0);
  const currentTotalElapsed = precedingDuration + sceneElapsedMs;
  const overallProgressPercent = Math.min(100, Math.max(0, (currentTotalElapsed / totalDuration) * 100));

  // Time display (e.g. 00:14 / 00:37)
  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Step to a specific scene
  const goToScene = (index: number) => {
    setCurrentSceneIdx(index);
    setSceneElapsedMs(0);
    track('cta_click', `demo_scene_jump:${SCENES[index].id}`);
  };

  // Play / Pause toggle
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    track('cta_click', !isPlaying ? 'demo_playback:play' : 'demo_playback:pause');
  };

  // Speed toggle
  const cycleSpeed = () => {
    const nextSpeed = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
    setSpeed(nextSpeed);
  };

  // Restart from beginning
  const restart = () => {
    setCurrentSceneIdx(0);
    setSceneElapsedMs(0);
    setIsPlaying(true);
    track('cta_click', 'demo_restart');
  };

  // Main animation loop
  useEffect(() => {
    if (viewMode !== 'interactive' || !isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) * speed;
        setSceneElapsedMs((prev) => {
          const next = prev + delta;
          if (next >= activeScene.durationMs) {
            // Advance to next scene or loop back to 0
            if (currentSceneIdx < SCENES.length - 1) {
              setCurrentSceneIdx((idx) => idx + 1);
              return 0;
            } else {
              // Reached the end: pause and stay at end
              setIsPlaying(false);
              return activeScene.durationMs;
            }
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [viewMode, isPlaying, speed, currentSceneIdx, activeScene.durationMs]);

  return (
    <div className="w-full select-none overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-white/10 shadow-2xl">
      {/* Top macOS App Frame Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/90 px-3.5 py-2.5 sm:px-4">
        {/* Left: Window Controls + Mode Badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-rose-500/80 ring-1 ring-rose-600/30" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80 ring-1 ring-amber-600/30" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80 ring-1 ring-emerald-600/30" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wide text-slate-300">
            Hercules HR OS <span className="text-sky-400 font-semibold">· Workflow Engine</span>
          </span>
          {viewMode === 'interactive' && (
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 ring-1 ring-emerald-500/30 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isPlaying ? 'LIVE SIMULATION' : 'PAUSED'}
            </span>
          )}
        </div>

        {/* Right: View Switcher (Interactive vs MP4 Video) */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-950/80 p-0.5 ring-1 ring-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode('interactive')}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
              viewMode === 'interactive'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="h-3 w-3" />
            <span>Interactive Demo</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('video');
              setIsPlaying(false);
              track('cta_click', 'demo_mode:video');
            }}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
              viewMode === 'video'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="h-3 w-3" />
            <span>Full Video</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'interactive' ? (
        <div className="flex flex-col">
          {/* Chapter Navigation Pills */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-white/5 bg-slate-950/60 px-3 py-2 sm:px-4">
            {SCENES.map((scene, idx) => {
              const isActive = idx === currentSceneIdx;
              const isPassed = idx < currentSceneIdx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => goToScene(idx)}
                  className={`group relative flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/40 shadow-sm'
                      : isPassed
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isActive ? 'text-sky-400' : isPassed ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  >
                    {isPassed ? '✓' : scene.number}
                  </span>
                  <span>{scene.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-sky-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Viewport */}
          <div className="relative min-h-[380px] bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 p-3 sm:min-h-[420px] sm:p-5 flex flex-col justify-between">
            {/* SCENE 01: Slack Trigger */}
            {currentSceneIdx === 0 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">#executive-hr</span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">Slack</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">11:42 AM IST · Confidential</span>
                </div>

                {/* Founder message */}
                <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 font-bold font-mono text-xs ring-1 ring-sky-400/30">
                    AP
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Arjun Patel</span>
                      <span className="rounded bg-sky-950 px-1.5 py-0.2 text-[9px] font-mono font-bold text-sky-400">Founder & CEO</span>
                      <span className="text-[10px] text-slate-500">11:42 AM</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-200 sm:text-sm leading-relaxed">
                      <span className="font-semibold text-sky-400">@Hercules</span> We found our Principal Architect candidate (<span className="text-white font-semibold">Amit Sharma</span>). Fast-track offer packet: <strong className="text-emerald-400">₹52,00,000 CTC</strong> + <strong className="text-purple-300">0.75% ESOP pool</strong>. Ready for Fractional CHRO review.
                    </p>
                  </div>
                </div>

                {/* Hercules bot reaction & response */}
                <div className="flex items-start gap-3 rounded-xl border border-sky-500/30 bg-sky-950/20 p-3.5 shadow-lg ring-1 ring-sky-400/20">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-slate-950 shadow-md">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Hercules AI</span>
                      <span className="rounded bg-sky-400/20 px-1.5 py-0.2 text-[9px] font-mono font-bold text-sky-300">AI WORKFORCE</span>
                      <span className="text-[10px] text-slate-500">11:42 AM (1.2s response)</span>
                    </div>
                    <div className="mt-1.5 space-y-2 text-xs sm:text-sm text-slate-200">
                      <p>
                        ⚡ <strong className="text-sky-300">Request Triaged.</strong> Initializing autonomous workflow for Amit Sharma:
                      </p>
                      <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3">
                        <div className="rounded-lg bg-slate-900/80 p-2 border border-white/5">
                          <div className="text-[10px] font-mono text-slate-400">MARKET COMP</div>
                          <div className="text-xs font-bold text-emerald-400">Bengaluru Tier-1 P75</div>
                        </div>
                        <div className="rounded-lg bg-slate-900/80 p-2 border border-white/5">
                          <div className="text-[10px] font-mono text-slate-400">ESOP DILUTION</div>
                          <div className="text-xs font-bold text-purple-300">0.75% (35K options)</div>
                        </div>
                        <div className="rounded-lg bg-slate-900/80 p-2 border border-white/5">
                          <div className="text-[10px] font-mono text-slate-400">CHRO ESCALATION</div>
                          <div className="text-xs font-bold text-amber-300">Briefing Radha Nair</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
                  <span>Preparing executive briefing docket for Fractional CHRO…</span>
                </div>
              </div>
            )}

            {/* SCENE 02: AI Intelligence & Benchmarks */}
            {currentSceneIdx === 1 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sky-400" />
                    <span className="text-xs font-bold text-white font-mono">Autonomous HR Intelligence Docket</span>
                  </div>
                  {/* Interactive Subtabs */}
                  <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-0.5 ring-1 ring-white/10 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveBenchmarkTab('comp')}
                      className={`rounded px-2 py-0.5 transition ${
                        activeBenchmarkTab === 'comp' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Comp Benchmark
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveBenchmarkTab('esop')}
                      className={`rounded px-2 py-0.5 transition ${
                        activeBenchmarkTab === 'esop' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ESOP Pool
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveBenchmarkTab('compliance')}
                      className={`rounded px-2 py-0.5 transition ${
                        activeBenchmarkTab === 'compliance' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Statutory Clauses
                    </button>
                  </div>
                </div>

                {activeBenchmarkTab === 'comp' && (
                  <div className="space-y-3 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white">Principal Software Architect · Bengaluru Tech</span>
                        <div className="text-[11px] text-slate-400">Dataset: 1,420 Indian Venture-Backed Startups (Series A–C)</div>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-mono font-bold text-emerald-400 border border-emerald-500/20">
                        Competitive (68th %ile)
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>P25: ₹42L</span>
                        <span className="text-white font-bold">P50 (Median): ₹48L</span>
                        <span className="text-emerald-400 font-bold">Offer: ₹52,00,000</span>
                        <span>P75: ₹56L</span>
                        <span>P90: ₹65L</span>
                      </div>
                      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="absolute inset-y-0 left-0 bg-sky-500/40" style={{ width: '45%' }} />
                        <div className="absolute inset-y-0 left-[45%] bg-emerald-500" style={{ width: '23%' }} />
                        <div className="absolute inset-y-0 left-[68%] w-1 bg-white shadow-lg shadow-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] sm:grid-cols-4">
                      <div className="rounded-lg bg-slate-950/80 p-2">
                        <div className="text-slate-500 text-[10px]">Fixed Base CTC</div>
                        <div className="font-bold text-slate-200">₹45,00,000</div>
                      </div>
                      <div className="rounded-lg bg-slate-950/80 p-2">
                        <div className="text-slate-500 text-[10px]">Performance Bonus</div>
                        <div className="font-bold text-slate-200">₹7,00,000 (Annual)</div>
                      </div>
                      <div className="rounded-lg bg-slate-950/80 p-2">
                        <div className="text-slate-500 text-[10px]">Notice Period Buyout</div>
                        <div className="font-bold text-amber-300">30 Days (₹3.75L max)</div>
                      </div>
                      <div className="rounded-lg bg-slate-950/80 p-2">
                        <div className="text-slate-500 text-[10px]">Recruitment Fee Saved</div>
                        <div className="font-bold text-emerald-400">₹9,36,000 (18%)</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeBenchmarkTab === 'esop' && (
                  <div className="space-y-3 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white">Employee Stock Option Pool Dilution Model</span>
                        <div className="text-[11px] text-slate-400">Current Unallocated Pool: 8.45% of Fully Diluted Shares</div>
                      </div>
                      <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-mono font-bold text-purple-300 border border-purple-500/20">
                        Cap Table Safe
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      <div className="rounded-lg bg-slate-950/80 p-3 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400">EQUITY GRANT</div>
                        <div className="text-base font-bold text-white mt-0.5">0.75%</div>
                        <div className="text-[10px] text-slate-400">35,000 Equity Options</div>
                      </div>
                      <div className="rounded-lg bg-slate-950/80 p-3 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400">VESTING SCHEDULE</div>
                        <div className="text-base font-bold text-sky-400 mt-0.5">4-Year / 1-Yr Cliff</div>
                        <div className="text-[10px] text-slate-400">25% Year 1, Monthly thereafter</div>
                      </div>
                      <div className="rounded-lg bg-slate-950/80 p-3 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400">REMAINING POOL</div>
                        <div className="text-base font-bold text-emerald-400 mt-0.5">7.70%</div>
                        <div className="text-[10px] text-slate-400">Reserve for 5+ senior hires</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeBenchmarkTab === 'compliance' && (
                  <div className="space-y-2.5 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                    <div className="text-xs font-bold text-white">Indian Statutory & Labour Law Shield</div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                      <div className="flex items-center gap-2 rounded-lg bg-slate-950/80 p-2.5 border border-white/5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-300">Shops & Commercial Establishments Act Compliant</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-slate-950/80 p-2.5 border border-white/5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-300">Proprietary Information & IP Assignment (India)</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-slate-950/80 p-2.5 border border-white/5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-300">PF, Gratuity & Tax Withholding Structure</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-slate-950/80 p-2.5 border border-white/5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-300">Non-Solicitation & 60-Day Notice Period Covenants</span>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 italic">
                  💡 Hercules AI calculated the optimal compensation package and submitted to human Fractional CHRO.
                </p>
              </div>
            )}

            {/* SCENE 03: Fractional CHRO Strategic Review & Decision */}
            {currentSceneIdx === 2 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-white font-mono">Executive CHRO Decision Brief</span>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/20">
                    Human-in-the-Loop Sign-Off
                  </span>
                </div>

                {/* Fractional CHRO Profile */}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/80 p-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-sky-500 text-slate-950 font-extrabold text-sm shadow-md">
                    RN
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-white">Radha Nair</span>
                      <span className="rounded bg-sky-900/60 px-2 py-0.5 text-[10px] font-mono font-bold text-sky-300">
                        Fractional CHRO Partner
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Ex-VP People (InMobi & Swiggy) · 18 yrs scaling Indian tech unicorns
                    </p>
                  </div>
                </div>

                {/* Strategic Executive Annotation */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">CHRO Strategic Annotation & Executive Counsel:</span>
                    <span className="text-[10px] font-mono text-slate-400">Signed 11:58 AM IST</span>
                  </div>
                  <blockquote className="text-xs sm:text-sm leading-relaxed text-slate-200 border-l-2 border-amber-400/60 pl-3">
                    &ldquo;Base comp of ₹52L is well-positioned against counter-offers. Candidate has competing discussions with a US seed startup. <strong className="text-white">I added clause 4.2 for hybrid flexibility</strong> and <strong className="text-white">structured a ₹4L retention bonus at Month 12</strong> linked to core architecture delivery. This preserves cap table equity while locking in candidate commitment.&rdquo;
                  </blockquote>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-bold font-mono text-emerald-400">
                        OFFER DOCKET DIGITALLY APPROVED
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCandidateApproved(!candidateApproved)}
                      className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                      {candidateApproved ? '✓ Verified by Radha Nair' : 'Re-sign Offer'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 04: Automated Candidate Execution & Sign-off */}
            {currentSceneIdx === 3 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">Autonomous Execution Pipeline</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Zero Founder Overhead</span>
                </div>

                {/* Candidate digital execution step */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
                      <CheckCircle2 className="h-4 w-4" /> 1. DocuSign Dispatched
                    </div>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Dispatched via WhatsApp & Email to Amit Sharma with 72h expiry.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-300">✓ Viewed & Signed via OTP</div>
                  </div>

                  <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400 font-mono">
                      <CheckCircle2 className="h-4 w-4" /> 2. Payroll & HRIS Sync
                    </div>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Automated profile creation in <strong>RazorpayX</strong> & <strong>Keka HR</strong>.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-sky-300">✓ Employee ID #H-0842 Issued</div>
                  </div>

                  <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300 font-mono">
                      <CheckCircle2 className="h-4 w-4" /> 3. IT & Day-1 Ready
                    </div>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Google Workspace provisioned (`amit.s@company.com`) & welcome box scheduled.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-purple-300">✓ Start Date: Oct 1st</div>
                  </div>
                </div>

                {/* Live Slack Notification to Founder */}
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Bot className="h-4 w-4 text-sky-400" />
                    <span>Hercules AI · Ping in #executive-hr</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-200">
                    🎉 <strong className="text-emerald-400">Offer Accepted & Executed!</strong> Candidate Amit Sharma has signed the Principal Architect offer docket. Joining date confirmed for <strong>1st Oct</strong>. Zero recruiter commissions spent.
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-slate-400">
                    <span>Turnaround: 3.5 Hours</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">Saved ₹9,36,000</span>
                    <span>•</span>
                    <span>All Legalities Cleared</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 05: Founder ROI Dashboard */}
            {currentSceneIdx === 4 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-sky-400" />
                    <span className="text-xs font-bold text-white font-mono">Executive Impact & ROI Summary</span>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/20">
                    Pre-Customer Ready
                  </span>
                </div>

                {/* 4 Big Numbers */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <Clock className="h-3 w-3 text-sky-400" /> TIME TO OFFER
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-white">3.5 Hrs</div>
                    <div className="text-[10px] text-emerald-400 font-medium">vs 14-day industry avg</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <DollarSign className="h-3 w-3 text-emerald-400" /> AGENCY FEES SAVED
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-emerald-400">₹9,36,000</div>
                    <div className="text-[10px] text-slate-400 font-medium">18% agency cost avoided</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <UserRound className="h-3 w-3 text-purple-400" /> FOUNDER TIME RECLAIMED
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-purple-300">22.5 Hrs</div>
                    <div className="text-[10px] text-slate-400 font-medium">Saved per month</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <ShieldCheck className="h-3 w-3 text-sky-400" /> COMPLIANCE AUDIT
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-sky-400">100%</div>
                    <div className="text-[10px] text-slate-400 font-medium">Due diligence ready</div>
                  </div>
                </div>

                {/* Final Callout & Next Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-950 p-3.5">
                  <div>
                    <div className="text-xs font-bold text-white">This is how your startup will run HR.</div>
                    <div className="text-[11px] text-slate-400">
                      Fractional CHRO judgement + Hercules AI workforce. Setup takes under 48 hours.
                    </div>
                  </div>

                  <div className="flex w-full sm:w-auto items-center gap-2">
                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Replay Demo
                    </button>
                    {onOpenAddSlackModal && (
                      <button
                        type="button"
                        onClick={onOpenAddSlackModal}
                        className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-lg bg-sky-400 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-sky-300 transition shadow-sm"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Request Setup
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Player Controls & Scrub Bar */}
          <div className="border-t border-white/10 bg-slate-950 px-3.5 py-2.5 sm:px-5 sm:py-3">
            {/* Timeline Progress Bar */}
            <div className="relative mb-2.5 flex items-center">
              <div
                className="group relative h-1.5 w-full cursor-pointer rounded-full bg-slate-800 hover:h-2 transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  const targetTime = ratio * totalDuration;
                  let acc = 0;
                  for (let i = 0; i < SCENES.length; i++) {
                    if (targetTime <= acc + SCENES[i].durationMs || i === SCENES.length - 1) {
                      setCurrentSceneIdx(i);
                      setSceneElapsedMs(targetTime - acc);
                      break;
                    }
                    acc += SCENES[i].durationMs;
                  }
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 to-sky-300 transition-all duration-75"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              {/* Left: Play/Pause, Step, Timecode */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400 text-slate-950 hover:bg-sky-300 transition"
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => goToScene(Math.max(0, currentSceneIdx - 1))}
                  disabled={currentSceneIdx === 0}
                  aria-label="Previous scene"
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => goToScene(Math.min(SCENES.length - 1, currentSceneIdx + 1))}
                  disabled={currentSceneIdx === SCENES.length - 1}
                  aria-label="Next scene"
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30 transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="font-mono text-[11px] text-slate-300">
                  <span>{formatTime(currentTotalElapsed)}</span>
                  <span className="text-slate-500"> / </span>
                  <span className="text-slate-500">{formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Center: Current Scene Title */}
              <div className="hidden sm:block text-xs font-semibold text-slate-300">
                <span className="text-sky-400 font-mono mr-1.5">{activeScene.number}</span>
                <span>{activeScene.label}</span>
              </div>

              {/* Right: Speed & Restart */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  aria-label="Toggle playback speed"
                  className="rounded-md border border-white/10 bg-slate-900 px-2 py-1 font-mono text-[10px] font-bold text-slate-300 hover:bg-slate-800 transition"
                >
                  {speed}x
                </button>

                <button
                  type="button"
                  onClick={restart}
                  aria-label="Restart walkthrough"
                  className="rounded-md border border-white/10 bg-slate-900 p-1.5 text-slate-400 hover:text-white transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Video Mode (Raw MP4 Player) */
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 sm:aspect-video">
          <video
            className="h-full w-full object-cover"
            src={PRODUCT_VIDEO_URL}
            controls
            playsInline
            muted
            autoPlay
            preload="auto"
            poster="/assets/hercules-product-poster.svg"
            aria-label="Hercules product video"
          />
        </div>
      )}
    </div>
  );
};

