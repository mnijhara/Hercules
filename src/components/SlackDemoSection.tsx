import React, { useState } from 'react';
import { SLACK_PRESET_PROMPTS, INITIAL_SLACK_MESSAGES } from '../data/herculesData';
import { Send, Sparkles, MessageSquare, FileText, RefreshCw, Bot, Video, Mail, Phone } from 'lucide-react';

interface SlackDemoSectionProps {
  onOpenAddSlackModal: () => void;
}

type Channel = 'slack' | 'whatsapp' | 'gmeet' | 'email';

const CHANNEL_LABELS: Record<Channel, string> = {
  slack: 'Slack context',
  whatsapp: 'WhatsApp context',
  gmeet: 'Google Meet context',
  email: 'Email context',
};

export const SlackDemoSection: React.FC<SlackDemoSectionProps> = ({ onOpenAddSlackModal }) => {
  const [activeTab, setActiveTab] = useState<Channel>('slack');
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [messages, setMessages] = useState(INITIAL_SLACK_MESSAGES);

  const prompt = SLACK_PRESET_PROMPTS[selectedPrompt];

  const resetDemo = () => {
    setMessages(INITIAL_SLACK_MESSAGES);
    setSelectedPrompt(0);
  };

  return (
    <section id="slack-demo" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>WORKSPACE AI — INTERACTIVE PREVIEW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            See how Hercules fits into your team’s workflow.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore representative Slack, WhatsApp, meeting and email contexts. This preview is illustrative; provider messages are not sent from this page.
          </p>

          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm gap-1 flex-wrap justify-center">
            {(Object.keys(CHANNEL_LABELS) as Channel[]).map((channel) => (
              <button
                key={channel}
                type="button"
                onClick={() => setActiveTab(channel)}
                aria-pressed={activeTab === channel}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === channel
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {channel === 'slack' && <MessageSquare className="w-4 h-4" />}
                {channel === 'whatsapp' && <Phone className="w-4 h-4" />}
                {channel === 'gmeet' && <Video className="w-4 h-4" />}
                {channel === 'email' && <Mail className="w-4 h-4" />}
                <span>{CHANNEL_LABELS[channel]}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'slack' && (
          <div className="max-w-4xl mx-auto bg-[#1a1d28] border border-[#2e354a] rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#121520] px-4 py-3 border-b border-[#292f44] flex items-center justify-between">
              <div className="flex items-center gap-3 text-white font-bold text-xs font-mono">
                <span className="text-slate-500">#</span>
                <span className="text-sky-300">ask-hercules</span>
                <span className="text-[10px] text-slate-500 font-normal">Illustrative workspace view</span>
              </div>
              <button type="button" onClick={resetDemo} className="p-1 text-slate-400 hover:text-white transition-colors" title="Reset preview" aria-label="Reset preview">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#151824] px-4 py-2.5 border-b border-[#252b3d] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 font-bold">Explore:</span>
              {SLACK_PRESET_PROMPTS.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedPrompt(index)}
                  aria-pressed={selectedPrompt === index}
                  className={`px-3 py-1 rounded-full border text-xs font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                    selectedPrompt === index
                      ? 'bg-sky-600 text-white border-sky-500'
                      : 'bg-[#1f2638] hover:bg-[#2a344d] text-sky-300 border-[#333e5c]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 space-y-6 bg-[#1a1d28]">
              {messages.slice(0, 2).map((msg) => (
                <div key={msg.id} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5 shrink-0 shadow-md">
                    <div className="w-full h-full bg-[#0b0e18] rounded-[10px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-sky-300">Hercules AI</span>
                      <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded uppercase font-semibold">Preview</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-xl bg-[#121520] border border-sky-400/30 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Representative request</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{prompt?.prompt}</p>
                <p className="mt-3 text-[10px] text-slate-500 font-mono">Illustrative response preview — no external action is executed.</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-[#131622] border-t border-[#252b3d] flex items-center gap-2">
              <div className="flex-1 bg-[#1b2030] border border-[#2c354d] rounded-xl px-4 py-2.5 text-xs text-slate-500">
                Ask Hercules in your configured workspace…
              </div>
              <button
                type="button"
                onClick={onOpenAddSlackModal}
                className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shrink-0 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Set up</span>
              </button>
            </div>
          </div>
        )}

        {activeTab !== 'slack' && (
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4">
              {activeTab === 'whatsapp' && <Phone className="w-5 h-5 text-emerald-600" />}
              {activeTab === 'gmeet' && <Video className="w-5 h-5 text-rose-600" />}
              {activeTab === 'email' && <Mail className="w-5 h-5 text-indigo-600" />}
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">{CHANNEL_LABELS[activeTab]}</p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">A representative Hercules workflow in {activeTab === 'gmeet' ? 'meetings' : activeTab === 'email' ? 'email' : 'messaging'}.</h3>
            <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">This view demonstrates the intended workflow context only. It does not claim a live provider connection or send messages.</p>
            <button type="button" onClick={onOpenAddSlackModal} className="mt-6 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all">
              Discuss workspace setup
            </button>
          </div>
        )}

        <div className="text-center mt-10">
          <button type="button" onClick={onOpenAddSlackModal} className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105">
            Explore Hercules workspace setup
          </button>
        </div>
      </div>
    </section>
  );
};
