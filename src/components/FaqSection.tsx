import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How is Hercules different from hiring a full-time in-house HR manager?',
    answer: 'A junior or mid-level full-time HR hire costs $90K–$140K+ annually and excels at administrative tasks, but often lacks the strategic executive judgement needed for org design, executive compensation, and compliance strategy. Hercules pairs you with an experienced Fractional CHRO for senior decision-making, backed by an autonomous AI HR workforce that executes your everyday documentation, candidate follow-ups, and onboarding in Slack at a fraction of the cost.'
  },
  {
    question: 'How does Hercules work with tools we already use (Slack, Google Workspace, Gusto, Rippling, Deel)?',
    answer: 'Hercules meets your team where work already happens. Our AI operates directly inside your team’s Slack or Teams channels and integrates with leading HRIS and payroll tools (Gusto, Rippling, Deel, and Google Workspace). You don’t need to force your team to learn another complex HR portal.'
  },
  {
    question: 'What happens when we face a sensitive employee, performance, or legal situation?',
    answer: 'Hercules enforces strict human-in-the-loop escalation. While the AI prepares documentation, drafts policies, and tracks timelines, all sensitive decisions—such as performance improvement plans, executive hiring, compensation adjustments, and involuntary separations—are routed directly to your Fractional CHRO for senior guidance and review.'
  },
  {
    question: 'How quickly can our Fractional CHRO start working with us?',
    answer: 'Our onboarding takes under 48 hours. After our initial strategy discovery call, your Fractional CHRO is introduced in your dedicated Slack channel, your workspace AI integrations are configured, and we begin auditing your immediate people priorities.'
  },
  {
    question: 'Can we change plans or pause as our team size fluctuates?',
    answer: 'Yes. Startups grow in stages, and your HR needs will change. All Hercules plans are flexible—you can adjust tiers as your headcount scales or pause during hiring slowdowns with 30 days notice. No lock-in or multi-year enterprise contracts.'
  },
  {
    question: 'How is employee privacy and company confidential data protected?',
    answer: 'We adhere to enterprise-grade data privacy standards. Your company’s internal discussions, candidate resumes, and employee records are strictly isolated and never used to train public foundation models. Access is protected with end-to-end encryption and strict role-based permissions.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="border-b border-slate-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-[11px] font-mono font-bold text-sky-800">
            <HelpCircle className="h-3.5 w-3.5 text-sky-600" />
            <span>FOUNDER QUESTIONS</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Everything founders need to know about working with a Fractional CHRO and an AI HR workforce.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-sky-300 bg-sky-50/30 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 text-left transition sm:p-6"
                >
                  <span className="text-base font-bold text-slate-900 sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-sky-100 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
