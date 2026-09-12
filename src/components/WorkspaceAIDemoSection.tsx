import React, { useState } from 'react';
import {
  Bot,
  MessageSquare,
  Phone,
  Video,
  Mail,
  Send,
  Sparkles,
  UserRound,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';
import { track } from '../analytics';

interface WorkspaceAIDemoSectionProps {
  onOpenAddSlackModal: () => void;
}

type Channel = 'slack' | 'whatsapp' | 'gmeet' | 'email';

const channelCopy: Record<Channel, { label: string; icon: React.ReactNode }> = {
  slack: { label: 'Example: Slack', icon: <MessageSquare className="h-4 w-4" /> },
  whatsapp: { label: 'Example: WhatsApp', icon: <Phone className="h-4 w-4" /> },
  gmeet: { label: 'Example: Google Meet', icon: <Video className="h-4 w-4" /> },
  email: { label: 'Example: Email', icon: <Mail className="h-4 w-4" /> },
};

const starterPrompts = [
  'What people issue should I deal with first this week?',
  'Draft a clear follow-up for a candidate who has not responded.',
  'Turn our onboarding checklist into a repeatable workflow.',
];

/**
 * Parses markdown inline formatting (**bold**, `code`) safely
 */
const renderInlineMarkdown = (text: string, isDark: boolean) => {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong
          key={match.index}
          className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
            isDark ? 'bg-slate-800 text-sky-300' : 'bg-slate-100 text-sky-800'
          }`}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

/**
 * Formatted AI response component that renders headers (###), lists, bolding, and dividers cleanly
 */
const FormattedAiReply: React.FC<{ content: string; isDark: boolean }> = ({ content, isDark }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    // Blank line spacing
    if (!line) {
      elements.push(<div key={`blank-${idx}`} className="h-2" />);
      return;
    }

    // Horizontal Rule (--- or ***)
    if (line === '---' || line === '***') {
      elements.push(
        <hr
          key={`hr-${idx}`}
          className={`my-3 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}
        />
      );
      return;
    }

    // Level 3 Heading (### Title)
    if (line.startsWith('### ')) {
      const headingText = line.replace(/^###\s+/, '');
      elements.push(
        <h4
          key={`h3-${idx}`}
          className={`mt-3.5 mb-1.5 text-xs font-bold uppercase tracking-wider font-mono ${
            isDark ? 'text-sky-300' : 'text-sky-700'
          }`}
        >
          {renderInlineMarkdown(headingText, isDark)}
        </h4>
      );
      return;
    }

    // Level 2 Heading (## Title)
    if (line.startsWith('## ')) {
      const headingText = line.replace(/^##\s+/, '');
      elements.push(
        <h3
          key={`h2-${idx}`}
          className={`mt-4 mb-2 text-sm font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {renderInlineMarkdown(headingText, isDark)}
        </h3>
      );
      return;
    }

    // Numbered List Item (e.g. "1. **Title:** text" or "1. text")
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const itemBody = numberedMatch[2];
      elements.push(
        <div key={`num-${idx}`} className="mt-2 flex items-start gap-2.5 text-xs leading-relaxed sm:text-sm">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold font-mono ${
              isDark
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                : 'bg-sky-100 text-sky-800 border border-sky-200'
            }`}
          >
            {num}
          </span>
          <div className={`flex-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            {renderInlineMarkdown(itemBody, isDark)}
          </div>
        </div>
      );
      return;
    }

    // Bullet List Item (e.g. "- text" or "* text")
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      const itemBody = bulletMatch[1];
      elements.push(
        <div key={`bullet-${idx}`} className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed sm:text-sm">
          <span className={`shrink-0 text-sm ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>•</span>
          <div className={`flex-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            {renderInlineMarkdown(itemBody, isDark)}
          </div>
        </div>
      );
      return;
    }

    // Regular Paragraph
    elements.push(
      <p
        key={`p-${idx}`}
        className={`text-xs leading-relaxed sm:text-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
      >
        {renderInlineMarkdown(line, isDark)}
      </p>
    );
  });

  return <div className="space-y-1">{elements}</div>;
};

export const WorkspaceAIDemoSection: React.FC<WorkspaceAIDemoSectionProps> = ({ onOpenAddSlackModal }) => {
  const [channel, setChannel] = useState<Channel>('slack');
  const [replyChannel, setReplyChannel] = useState<Channel | null>(null);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const isDark = theme === 'dark';

  const askHercules = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) return;
    const requestChannel = channel;
    track('ai_prompt', requestChannel);
    setInput('');
    setError(null);
    setReply(null);
    setReplyChannel(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          context: { channel: requestChannel, surface: 'website-demo' },
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Hercules AI is temporarily unavailable.');
      setReply(data?.reply || 'Hercules AI returned no response. Please try again.');
      setReplyChannel(requestChannel);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hercules AI is temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="workspace-ai" className="relative border-b border-slate-200 bg-white py-9 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-[11px] font-mono font-bold text-sky-800">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            WORKFLOW EXAMPLE
          </div>
          <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            See how Hercules handles an HR task.
          </h2>
          <p className="mt-3 text-[15px] leading-6 text-slate-600 sm:text-lg sm:leading-relaxed">
            Try a real AI request. The channel buttons below are examples of where your team could work with Hercules;
            nothing is connected until you request setup.
          </p>
        </div>

        {/* Outer Demo Card Container */}
        <div
          className={`mx-auto max-w-4xl overflow-hidden rounded-3xl transition-colors duration-200 ${
            isDark
              ? 'border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl ring-1 ring-white/10'
              : 'border border-slate-200/90 bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-900/5'
          }`}
        >
          {/* Card Header with Brand & Theme Switcher */}
          <div
            className={`flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5 ${
              isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-slate-50/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600'
                }`}
              >
                <Bot className="h-4 w-4" />
              </div>
              <span className={`text-xs font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Hercules AI
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase font-semibold font-mono ${
                  isDark ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-100 text-sky-800 border border-sky-200/60'
                }`}
              >
                AI workforce
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle Button (Light / Dark) */}
              <div
                className={`flex items-center rounded-lg p-0.5 text-[10px] font-mono font-bold ${
                  isDark ? 'bg-slate-900 ring-1 ring-white/10' : 'bg-slate-200/70 ring-1 ring-slate-300/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  aria-label="Switch to light UI"
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 transition ${
                    !isDark
                      ? 'bg-white text-slate-900 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="h-3 w-3 text-amber-500" />
                  <span>White UI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  aria-label="Switch to dark UI"
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 transition ${
                    isDark
                      ? 'bg-sky-500 text-slate-950 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Moon className="h-3 w-3" />
                  <span>Dark UI</span>
                </button>
              </div>

              {/* Reset Demo Button */}
              <button
                type="button"
                onClick={() => {
                  setReply(null);
                  setReplyChannel(null);
                  setError(null);
                  setInput('');
                }}
                className={`rounded-full p-1.5 transition ${
                  isDark
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-800'
                }`}
                aria-label="Reset AI demo"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Channel Selector Bar */}
          <div
            className={`flex gap-2 overflow-x-auto border-b px-4 py-2.5 sm:px-5 ${
              isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-100 bg-slate-50/40'
            }`}
            aria-label="Workflow examples"
          >
            {(Object.keys(channelCopy) as Channel[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setChannel(item)}
                aria-pressed={channel === item}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  channel === item
                    ? isDark
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900 text-white shadow-sm'
                    : isDark
                    ? 'border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-sm'
                }`}
              >
                {channelCopy[item].icon}
                {channelCopy[item].label}
              </button>
            ))}
          </div>

          {/* Chat Canvas Viewport */}
          <div
            className={`min-h-[200px] p-4 sm:min-h-[240px] sm:p-6 transition-colors ${
              isDark ? 'bg-slate-900/60' : 'bg-slate-50/50'
            }`}
          >
            {/* User Founder Header */}
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                <UserRound className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className={`mb-0.5 text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  You · Founder
                </div>
                <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Try a prompt below, or ask your own question.
                </div>
              </div>
            </div>

            {/* AI Response Display with Clean Markdown Rendering */}
            {reply && (
              <div className="mt-4 flex items-start gap-3 animate-fadeIn">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    isDark
                      ? 'border border-sky-400/30 bg-sky-500/20 text-sky-400'
                      : 'border border-sky-200 bg-sky-500 text-slate-950 shadow-sm'
                  }`}
                >
                  <Bot className="h-4 w-4" />
                </div>
                <div
                  className={`flex-1 rounded-2xl p-4 sm:p-5 shadow-sm transition-colors ${
                    isDark
                      ? 'border border-slate-800 bg-slate-950/90'
                      : 'border border-sky-100/90 bg-white ring-1 ring-sky-500/10'
                  }`}
                >
                  <div
                    className={`mb-2.5 text-[11px] font-bold font-mono tracking-wide ${
                      isDark ? 'text-sky-300' : 'text-sky-700'
                    }`}
                  >
                    Hercules AI · {channelCopy[replyChannel || channel].label}
                  </div>
                  {/* Clean formatted response without raw ### or ** */}
                  <FormattedAiReply content={reply} isDark={isDark} />
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div
                className={`mt-4 flex items-center gap-2 text-xs font-mono ${
                  isDark ? 'text-sky-400' : 'text-sky-600'
                }`}
                role="status"
                aria-live="polite"
              >
                <span
                  className={`h-2 w-2 rounded-full animate-ping ${isDark ? 'bg-sky-400' : 'bg-sky-600'}`}
                />
                <span>Hercules AI is analyzing and preparing the response…</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-200"
              >
                {error}
              </div>
            )}

            {/* Starter Prompt Chips */}
            {!reply && !isLoading && !error && (
              <div className="mt-4 flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => askHercules(prompt)}
                    className={`rounded-xl px-3 py-2 text-left text-[11px] font-medium transition-all ${
                      isDark
                        ? 'border border-slate-700/70 bg-slate-800/80 text-sky-300 hover:border-sky-500/50 hover:bg-slate-800'
                        : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-900'
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Form Input Bar */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void askHercules(input);
            }}
            className={`flex items-center gap-2.5 border-t p-3 sm:p-4 transition-colors ${
              isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50/60'
            }`}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              maxLength={4000}
              aria-label="Ask Hercules AI"
              placeholder={`Ask Hercules AI with ${channelCopy[channel].label.toLowerCase()}…`}
              className={`w-full rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none focus:ring-1 disabled:opacity-60 ${
                isDark
                  ? 'border border-slate-700 bg-slate-900/90 text-white placeholder-slate-400 focus:border-sky-400 focus:ring-sky-400'
                  : 'border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 shadow-inner'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-sky-400 active:scale-95 disabled:opacity-40 shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          {/* Bottom Card Footer */}
          <div
            className={`flex flex-col gap-2 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 transition-colors ${
              isDark ? 'border-slate-800 bg-slate-950/80' : 'border-slate-100 bg-slate-50/80'
            }`}
          >
            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              AI prepares · CHRO decides · approved work gets executed
            </span>
            <button
              type="button"
              onClick={onOpenAddSlackModal}
              className={`text-xs font-bold transition ${
                isDark ? 'text-sky-300 hover:text-white' : 'text-sky-600 hover:text-sky-700'
              }`}
            >
              Request workspace setup →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

