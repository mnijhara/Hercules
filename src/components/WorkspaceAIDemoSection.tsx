import React, { useState } from 'react';
import { Bot, MessageSquare, Phone, Video, Mail, Send, Sparkles, UserRound, RotateCcw } from 'lucide-react';
import { track } from '../analytics';

interface WorkspaceAIDemoSectionProps { onOpenAddSlackModal: () => void; }
type Channel = 'slack' | 'whatsapp' | 'gmeet' | 'email';
const channelCopy: Record<Channel, { label: string; icon: React.ReactNode }> = {
  slack: { label: 'Example: Slack', icon: <MessageSquare className="h-4 w-4" /> }, whatsapp: { label: 'Example: WhatsApp', icon: <Phone className="h-4 w-4" /> }, gmeet: { label: 'Example: Google Meet', icon: <Video className="h-4 w-4" /> }, email: { label: 'Example: Email', icon: <Mail className="h-4 w-4" /> },
};
const starterPrompts = ['What people issue should I deal with first this week?', 'Draft a clear follow-up for a candidate who has not responded.', 'Turn our onboarding checklist into a repeatable workflow.'];

export const WorkspaceAIDemoSection: React.FC<WorkspaceAIDemoSectionProps> = ({ onOpenAddSlackModal }) => {
  const [channel, setChannel] = useState<Channel>('slack'); const [replyChannel, setReplyChannel] = useState<Channel | null>(null); const [input, setInput] = useState(''); const [reply, setReply] = useState<string | null>(null); const [isLoading, setIsLoading] = useState(false); const [error, setError] = useState<string | null>(null);
  const askHercules = async (message: string) => { const trimmed = message.trim(); if (!trimmed || isLoading) return; const requestChannel = channel; track('ai_prompt', requestChannel); setInput(''); setError(null); setReply(null); setReplyChannel(null); setIsLoading(true); try { const response = await fetch('/api/concierge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: trimmed, context: { channel: requestChannel, surface: 'website-demo' } }) }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data?.error || 'Hercules AI is temporarily unavailable.'); setReply(data?.reply || 'Hercules AI returned no response. Please try again.'); setReplyChannel(requestChannel); } catch (err) { setError(err instanceof Error ? err.message : 'Hercules AI is temporarily unavailable.'); } finally { setIsLoading(false); } };
  return (
    <section id="workspace-ai" className="relative border-b border-slate-200 bg-white py-9 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-[11px] font-mono font-bold text-sky-800">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />WORKFLOW EXAMPLE
          </div>
          <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">See how Hercules handles an HR task.</h2>
          <p className="mt-3 text-[15px] leading-6 text-slate-600 sm:text-lg sm:leading-relaxed">Try a real AI request. The channel buttons below are examples of where your team could work with Hercules; nothing is connected until you request setup.</p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/80 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5 text-xs font-bold font-mono text-white">
              <Bot className="h-4 w-4 text-sky-400" />
              <span>Hercules AI</span>
              <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] uppercase font-semibold text-sky-300">AI workforce</span>
            </div>
            <button
              type="button"
              onClick={() => { setReply(null); setReplyChannel(null); setError(null); setInput(''); }}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              aria-label="Reset AI demo"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto border-b border-slate-800 bg-slate-950/40 px-4 py-2.5 sm:px-5" aria-label="Workflow examples">
            {(Object.keys(channelCopy) as Channel[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setChannel(item)}
                aria-pressed={channel === item}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  channel === item
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {channelCopy[item].icon}
                {channelCopy[item].label}
              </button>
            ))}
          </div>

          <div className="min-h-[180px] bg-slate-900/60 p-4 sm:min-h-[220px] sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">
                <UserRound className="h-4 w-4 text-slate-300" />
              </div>
              <div className="flex-1">
                <div className="mb-0.5 text-xs font-bold text-white">You · Founder</div>
                <div className="text-[11px] text-slate-400">Try a prompt below, or ask your own question.</div>
              </div>
            </div>

            {reply && (
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/20">
                  <Bot className="h-4 w-4 text-sky-400" />
                </div>
                <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-sm">
                  <div className="mb-2 text-[11px] font-bold text-sky-300">Hercules AI · {channelCopy[replyChannel || channel].label}</div>
                  <p className="whitespace-pre-wrap text-xs leading-5 text-slate-200 sm:text-sm">{reply}</p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-sky-400" role="status" aria-live="polite">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                <span>Hercules AI is preparing the response…</span>
              </div>
            )}

            {error && (
              <div role="alert" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-200">
                {error}
              </div>
            )}

            {!reply && !isLoading && !error && (
              <div className="mt-4 flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => askHercules(prompt)}
                    className="rounded-xl border border-slate-700/70 bg-slate-800/80 px-3 py-2 text-left text-[11px] font-medium text-sky-300 transition-all hover:border-sky-500/50 hover:bg-slate-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); void askHercules(input); }} className="flex items-center gap-2.5 border-t border-slate-800 bg-slate-950 p-3 sm:p-4">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              maxLength={4000}
              aria-label="Ask Hercules AI"
              placeholder={`Ask Hercules AI with ${channelCopy[channel].label.toLowerCase()}…`}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-sky-400 active:scale-95 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          <div className="flex flex-col gap-2 border-t border-slate-800 bg-slate-950/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span className="text-[10px] text-slate-400">AI prepares · CHRO decides · approved work gets executed</span>
            <button type="button" onClick={onOpenAddSlackModal} className="text-xs font-bold text-sky-300 hover:text-white transition">
              Request workspace setup →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
