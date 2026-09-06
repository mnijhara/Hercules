import React, { useState } from 'react';
import { SLACK_PRESET_PROMPTS, INITIAL_SLACK_MESSAGES } from '../data/herculesData';
import { SlackMessage } from '../types';
import { Send, Sparkles, MessageSquare, Check, ShieldCheck, FileText, CheckSquare, AlertTriangle, RefreshCw, Bot, Video, Mail, Phone, MoreVertical, Paperclip, CheckCheck, Play } from 'lucide-react';

interface SlackDemoSectionProps {
  onOpenAddSlackModal: () => void;
}

export const SlackDemoSection: React.FC<SlackDemoSectionProps> = ({ onOpenAddSlackModal }) => {
  const [activeTab, setActiveTab] = useState<'slack' | 'whatsapp' | 'gmeet' | 'email'>('slack');
  const [messages, setMessages] = useState<SlackMessage[]>(INITIAL_SLACK_MESSAGES);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleSendPrompt = (promptText: string, customResponse?: string, attachment?: any) => {
    const userMsg: SlackMessage = {
      id: `user-${Date.now()}`,
      sender: 'founder',
      authorName: 'You (Founder)',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setCustomInput('');
    setIsTyping(true);

    setTimeout(() => {
      const atlasMsg: SlackMessage = {
        id: `atlas-${Date.now()}`,
        sender: 'hercules',
        authorName: 'Hercules AI (Virtual HR Lead)',
        text: customResponse || `I've analyzed your HR request regarding "${promptText}". Hercules AI has generated a compliant template and step-by-step checklist ready for execution in Slack, WhatsApp & Email.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: attachment || {
          title: '⚡ Automated HR Action Execution',
          description: 'Document generated based on statutory labor laws, POSH Act, and Shops & Establishments Act standards.',
          type: 'template',
          actions: ['Execute in Slack', 'Send via WhatsApp', 'Send PDF Email']
        },
        reactions: [{ emoji: '🚀', count: 1 }]
      };

      setMessages((prev) => [...prev, atlasMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const preset = SLACK_PRESET_PROMPTS.find(p => p.prompt.toLowerCase().includes(customInput.toLowerCase()));
    if (preset) {
      handleSendPrompt(preset.prompt, preset.response, preset.attachment);
    } else {
      handleSendPrompt(customInput);
    }
  };

  return (
    <section id="slack-demo" className="py-12 sm:py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>MULTI-CHANNEL WORKSPACE AI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Meet your virtual HR lead <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-emerald-600 to-blue-600">
              in Slack, WhatsApp & Google Meet.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Because startup teams operate seamlessly across WhatsApp groups, Slack channels, Google Meet calls, and Email.
          </p>

          {/* Action Feedback Banner */}
          {actionFeedback && (
            <div className="mt-4 p-3 rounded-2xl bg-emerald-900/90 border border-emerald-400 text-emerald-100 text-xs font-bold flex items-center justify-center gap-2 max-w-lg mx-auto shadow-xl animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Channel Tabs Selector */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm gap-1 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('slack')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'slack'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Slack (#ask-hercules)</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Business</span>
            </button>

            <button
              onClick={() => setActiveTab('gmeet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'gmeet'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Video className="w-4 h-4 text-rose-600" />
              <span>Google Meet Co-Pilot</span>
            </button>

            <button
              onClick={() => setActiveTab('email')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'email'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>Gmail / Offer Dispatch</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'slack' && (
          <div className="max-w-4xl mx-auto bg-[#1a1d28] border border-[#2e354a] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            {/* Slack Window Top Bar */}
            <div className="bg-[#121520] px-4 py-3 border-b border-[#292f44] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="ml-2 flex items-center gap-2 text-white font-bold text-xs font-mono">
                  <span className="text-slate-500">#</span>
                  <span className="text-sky-300">ask-hercules</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-[#1e2436] text-sky-400 font-semibold">● Hercules AI Online</span>
                <button
                  onClick={() => setMessages(INITIAL_SLACK_MESSAGES)}
                  className="p-1 hover:text-white transition-colors"
                  title="Reset Chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Preset Prompt Pills */}
            <div className="bg-[#151824] px-4 py-2.5 border-b border-[#252b3d] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 font-bold">
                Try Prompt:
              </span>
              {SLACK_PRESET_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPrompt(p.prompt, p.response, p.attachment)}
                  className="px-3 py-1 rounded-full bg-[#1f2638] hover:bg-[#2a344d] text-sky-300 border border-[#333e5c] text-xs font-medium shrink-0 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Slack Message History Area */}
            <div className="p-4 sm:p-6 space-y-6 max-h-[460px] overflow-y-auto bg-[#1a1d28]">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3.5 group animate-in fade-in duration-200">
                  {msg.sender === 'atlas' ? (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5 shrink-0 shadow-md">
                      <div className="w-full h-full bg-[#0b0e18] rounded-[10px] flex items-center justify-center text-white font-bold text-xs">
                        <Bot className="w-5 h-5 text-sky-400" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={msg.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt="Founder Avatar"
                      className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-700"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-xs font-bold ${msg.sender === 'atlas' ? 'text-sky-300' : 'text-white'}`}>
                        {msg.authorName}
                      </span>
                      {msg.sender === 'atlas' && (
                        <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded uppercase font-semibold">
                          APP
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {msg.text}
                    </p>

                    {msg.attachment && (
                      <div className="mt-3 p-4 rounded-xl bg-[#121520] border-l-4 border-sky-400 border-t border-r border-b border-[#2a3147] space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <FileText className="w-4 h-4 text-sky-400" />
                          <span>{msg.attachment.title}</span>
                        </div>
                        <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-light">
                          {msg.attachment.description}
                        </p>
                        {msg.attachment.actions && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {msg.attachment.actions.map((act, ai) => (
                              <button
                                key={ai}
                                onClick={() => triggerFeedback(`Action "${act}" executed via Hercules AI Bot!`)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                  ai === 0
                                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
                                    : 'bg-[#1e2538] hover:bg-[#28324a] text-slate-200 border border-[#333e5c]'
                                }`}
                              >
                                {act}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2">
                        {msg.reactions.map((r, ri) => (
                          <span key={ri} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#23293c] border border-[#303850] text-xs font-mono text-slate-300">
                            <span>{r.emoji}</span>
                            <span className="text-[10px] text-sky-300 font-bold">{r.count}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-sky-400 font-mono animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>Hercules AI is typing response...</span>
                </div>
              )}
            </div>

            {/* Input Box */}
            <div className="p-3 sm:p-4 bg-[#131622] border-t border-[#252b3d]">
              <form onSubmit={handleSubmitCustom} className="flex items-center gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Ask Hercules AI anything (e.g. Draft ₹28L CTC offer letter, POSH policy, 60-day notice buyout)..."
                  className="w-full bg-[#1b2030] border border-[#2c354d] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shrink-0 flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* WhatsApp Tab View */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-xl mx-auto bg-[#0b141a] border border-[#1f2c34] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            {/* WhatsApp Header */}
            <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between border-b border-[#2a3942]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Hercules AI HR Lead</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded font-mono">OFFICIAL</span>
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-mono">Online • +1 800-HERCULES-AI</p>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-slate-400 cursor-pointer" />
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[380px] max-h-[440px] overflow-y-auto bg-[radial-gradient(#111b21_1px,transparent_1px)] [background-size:16px_16px]">
              {/* WhatsApp Message 1 */}
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-xs shadow-md">
                  <p>Send CTC offer letter for Senior Engineer in Bengaluru (₹28 LPA + ESOPs)</p>
                  <span className="text-[9px] text-emerald-200 text-right block mt-1">10:31 AM <CheckCheck className="w-3 h-3 inline text-sky-300" /></span>
                </div>
              </div>

              {/* WhatsApp Message 2 */}
              <div className="flex justify-start">
                <div className="bg-[#202c33] text-slate-100 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-xs shadow-md space-y-2">
                  <p className="font-semibold text-emerald-400">📄 Hercules AI Virtual HR (WhatsApp Bot):</p>
                  <p>I've generated a tax-friendly Indian CTC offer letter for your Bengaluru candidate:</p>
                  <div className="bg-[#111b21] p-3 rounded-xl border border-[#2a3942] space-y-1 font-mono text-[11px]">
                    <p className="text-white font-bold">Total CTC: ₹28,00,000</p>
                    <p className="text-slate-300">• Basic Salary (50%): ₹11.20L</p>
                    <p className="text-slate-300">• HRA (50% of Basic): ₹5.60L</p>
                    <p className="text-slate-300">• Special Allowance: ₹8.40L</p>
                    <p className="text-slate-300">• EPF + Gratuity + ESOPs included</p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button onClick={() => triggerFeedback('WhatsApp offer PDF dispatched!')} className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px]">
                      Send PDF via WhatsApp
                    </button>
                    <button onClick={() => triggerFeedback('Offer sent to candidate email!')} className="px-3 py-1.5 rounded-lg bg-[#2a3942] hover:bg-[#374853] text-white font-medium text-[11px]">
                      Send to Candidate Email
                    </button>
                  </div>
                  <span className="text-[9px] text-slate-400 text-right block">10:31 AM</span>
                </div>
              </div>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-[#202c33] border-t border-[#2a3942] flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-slate-400 cursor-pointer" />
              <input
                type="text"
                placeholder="Type WhatsApp HR request (e.g. Check POSH rule, EPF filing)..."
                className="flex-1 bg-[#2a3942] border-none rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Google Meet Tab View */}
        {activeTab === 'gmeet' && (
          <div className="max-w-3xl mx-auto bg-[#181a1f] border border-[#2d313a] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            {/* GMeet Top Header */}
            <div className="bg-[#202124] px-4 py-3 flex items-center justify-between border-b border-[#3c4043]">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400" />
                <span className="text-xs font-bold text-white font-mono">
                  Google Meet: Senior Full Stack Engineer Interview (Indiranagar)
                </span>
              </div>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold animate-pulse">
                REC • HERCULES AI CO-PILOT
              </span>
            </div>

            {/* Video Screen Placeholder & Live Transcript */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#111318]">
              {/* Video Grid */}
              <div className="md:col-span-7 bg-[#202124] rounded-xl p-4 flex flex-col justify-between min-h-[260px] relative border border-[#30333d]">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Candidate: Ananya Sharma</span>
                  <span>60-Day Notice Period</span>
                </div>

                <div className="text-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 mx-auto flex items-center justify-center text-white text-xl font-bold shadow-xl mb-2">
                    AS
                  </div>
                  <span className="text-xs font-bold text-white block">Ananya (Bengaluru)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Audio Active</span>
                </div>

                <div className="flex justify-center gap-2 pt-2 border-t border-[#30333d]">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-sky-400" />
                </div>
              </div>

              {/* Hercules AI Live Interview Scorecard */}
              <div className="md:col-span-5 bg-[#1a1d24] rounded-xl p-4 border border-[#2d323e] space-y-3">
                <div className="flex items-center justify-between border-b border-[#2a2f3d] pb-2">
                  <span className="text-xs font-bold text-sky-400 font-mono flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hercules GMeet Notes</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">Live Sync</span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="p-2 rounded bg-[#11131a] border border-[#222838]">
                    <span className="text-slate-400 font-mono text-[9px] block">CANDIDATE EXPECTATION:</span>
                    <span className="font-bold text-white">₹28.5 LPA (Current: ₹22 LPA)</span>
                  </div>
                  <div className="p-2 rounded bg-[#11131a] border border-[#222838]">
                    <span className="text-slate-400 font-mono text-[9px] block">NOTICE PERIOD & BUYOUT:</span>
                    <span className="font-bold text-emerald-400">60 days (Negotiable to 30 days buyout)</span>
                  </div>
                  <div className="p-2 rounded bg-[#11131a] border border-[#222838]">
                    <span className="text-slate-400 font-mono text-[9px] block">COMPLIANCE STATUS:</span>
                    <span className="text-sky-300">PF, ESI & ESOPs eligible</span>
                  </div>
                </div>

                <button onClick={() => triggerFeedback('GMeet interview summary & scorecard saved!')} className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs">
                  Generate Post-Interview Scorecard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Tab View */}
        {activeTab === 'email' && (
          <div className="max-w-3xl mx-auto bg-[#131722] border border-[#273046] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in">
            {/* Email Header */}
            <div className="bg-[#0e111a] px-5 py-3 border-b border-[#212a3e] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white font-mono">
                  Gmail Dispatch • Senior Backend Developer CTC Offer
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                READY TO DISPATCH
              </span>
            </div>

            {/* Email Body Preview */}
            <div className="p-6 space-y-4 font-sans text-xs text-slate-200">
              <div className="space-y-1 pb-3 border-b border-[#212a3e]">
                <p><span className="text-slate-500">To:</span> candidate@example.com</p>
                <p><span className="text-slate-500">Subject:</span> Offer Letter - Senior Backend Engineer at Hercules HR</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0d14] border border-[#1e2638] space-y-3 font-light leading-relaxed">
                <p className="font-semibold text-white">Dear Candidate,</p>
                <p>We are delighted to offer you the position of **Senior Backend Engineer** at our Bengaluru tech office.</p>
                <div className="p-3 bg-[#111624] rounded-lg border border-[#252e44] font-mono text-[11px] text-sky-200 space-y-1">
                  <p className="font-bold text-emerald-400">Fixed CTC: ₹28,00,000 per annum</p>
                  <p>• Basic Salary: ₹11,20,000 (50% of CTC)</p>
                  <p>• House Rent Allowance (HRA): ₹5,60,000</p>
                  <p>• Special Allowance: ₹8,40,000</p>
                  <p>• ESOP Pool Allocation: 0.15% equity (4-year vesting, 1-year cliff)</p>
                  <p>• Statutory: EPF, Gratuity, Health Insurance & POSH coverage</p>
                </div>
                <p>Please find attached the formal offer letter & IP assignment agreement.</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <Paperclip className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Offer_Letter_Hercules_HR.pdf (420 KB)</span>
                </div>

                <button onClick={() => triggerFeedback('CTC Offer Email sent via Gmail!')} className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch via Gmail</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA below Demo */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenAddSlackModal}
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
          >
            Deploy Hercules AI to Slack, WhatsApp, GMeet & Gmail
          </button>
        </div>
      </div>
    </section>
  );
};
