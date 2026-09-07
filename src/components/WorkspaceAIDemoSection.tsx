import React, { useState } from 'react';
import { Bot, MessageSquare, Phone, Video, Mail, Send, Sparkles, UserRound, RotateCcw } from 'lucide-react';

interface WorkspaceAIDemoSectionProps {
  onOpenAddSlackModal: () => void;
}

type Channel = 'slack' | 'whatsapp' | 'gmeet' | 'email';

const channelCopy: Record<Channel, { label: string; icon: React.ReactNode }> = {
  slack: { label: 'Slack context', icon: <MessageSquare className="w-4 h-4" /> },
  whatsapp: { label: 'WhatsApp context', icon: <Phone className="w-4 h-4" /> },
  gmeet: { label: 'Google Meet context', icon: <Video className="w-4 h-4" /> },
  email: { label: 'Email context', icon: <Mail className="w-4 h-4" /> },
};

const starterPrompts = [
  'What people issue should I deal with first this week?',
  'Draft a clear follow-up for a candidate who has not responded.',
  'Turn our onboarding checklist into a repeatable workflow.',
];

export const WorkspaceAIDemoSection: React.FC<WorkspaceAIDemoSectionProps> = ({ onOpenAddSlackModal }) => {
  const [channel, setChannel] = useState<Channel>('slack');
  const [input, setInput] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askHercules = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    setError(null);
    setReply(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          context: { channel, surface: 'website-demo' },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Hercules AI is temporarily unavailable.');
      setReply(data?.reply || 'Hercules AI returned no response. Please try again.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hercules AI is temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="workspace-ai" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>WORKFLOW CONTEXT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            See how Hercules adapts to your team’s workflow.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Ask Hercules AI for a real HR task. It prepares the work, explains what it needs, and flags when your Fractional CHRO should step in.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#1a1d28] border border-[#2e354a] rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#121520] px-4 py-3 border-b border-[#292f44] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs font-mono">
              <Bot className="w-4 h-4 text-sky-400" />
              <span>Hercules AI</span>
              <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded uppercase">AI workforce</span>
            </div>
            <button type="button" onClick={() => { setReply(null); setError(null); setInput(''); }} className="p-1.5 text-slate-400 hover:text-white" aria-label="Reset AI demo">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#151824] px-4 py-3 border-b border-[#252b3d] flex gap-2 overflow-x-auto" aria-label="Workflow context examples">
            {(Object.keys(channelCopy) as Channel[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setChannel(item)}
                aria-pressed={channel === item}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${channel === item ? 'bg-sky-500 text-slate-950' : 'bg-[#1f2638] text-slate-300 border border-[#333e5c]'}`}
              >
                {channelCopy[item].icon}
                {channelCopy[item].label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 min-h-[250px] bg-[#1a1d28]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center shrink-0"><UserRound className="w-4 h-4 text-slate-300" /></div>
              <div className="flex-1">
                <div className="text-xs font-bold text-white mb-1">You · Founder</div>
                <div className="text-xs text-slate-400">Try one of the prompts below, or ask your own question.</div>
              </div>
            </div>

            {reply && (
              <div className="mt-5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0"><Bot className="w-5 h-5 text-sky-400" /></div>
                <div className="flex-1 rounded-2xl bg-[#121520] border border-[#2a3147] p-4">
                  <div className="text-xs font-bold text-sky-300 mb-2">Hercules AI · {channelCopy[channel].label}</div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{reply}</p>
                </div>
              </div>
            )}

            {isLoading && <div className="mt-5 text-xs text-sky-400 font-mono animate-pulse" role="status" aria-live="polite">Hercules AI is preparing the response…</div>}
            {error && <div role="alert" className="mt-5 rounded-xl bg-rose-950/40 border border-rose-500/30 p-3 text-xs text-rose-200">{error}</div>}

            {!reply && !isLoading && !error && (
              <div className="mt-5 flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => askHercules(prompt)} className="text-left px-3 py-2 rounded-xl bg-[#1f2638] hover:bg-[#2a344d] text-sky-300 border border-[#333e5c] text-xs transition-all">
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); void askHercules(input); }} className="p-3 sm:p-4 bg-[#131622] border-t border-[#252b3d] flex items-center gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              aria-label="Ask Hercules AI"
              placeholder={`Ask Hercules AI with ${channelCopy[channel].label}…`}
              className="w-full bg-[#1b2030] border border-[#2c354d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 disabled:opacity-60"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0">
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          <div className="px-4 py-3 bg-[#11141f] border-t border-[#252b3d] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-[11px] text-slate-500">AI prepares · CHRO decides · approved work gets executed</span>
            <button type="button" onClick={onOpenAddSlackModal} className="text-xs font-bold text-sky-300 hover:text-white">Connect your workspace →</button>
          </div>
        </div>
      </div>
    </section>
  );
};
