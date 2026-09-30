import React from 'react';
import { HelpCircle, MessageSquareQuote, Copy, Check } from 'lucide-react';

interface VerificationQuestionsProps {
  questions: string[];
}

export const VerificationQuestions: React.FC<VerificationQuestionsProps> = ({ questions }) => {
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              قبل ما تبدأ… اسأل عن الحاجات دي (Questions to Verify)
            </h3>
            <p className="text-xs text-[#797979]">
              أسئلة محددة وموجهة لمدير برنامج الأفلييت (Affiliate Manager) أو صاحب المنتج
            </p>
          </div>
        </div>
        <span className="text-xs text-[#FBD052] font-mono">
          {questions.length} أسئلة حاسمة
        </span>
      </div>

      <div className="space-y-2.5">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-[#FCFCFA] font-medium">
                {q}
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(q, idx)}
              className="p-1.5 rounded-lg text-[#797979] hover:text-[#F5BF1E] hover:bg-[#23170D] transition-colors cursor-pointer shrink-0"
              title="نسخ السؤال"
            >
              {copiedIdx === idx ? (
                <Check className="w-4 h-4 text-[#F5BF1E]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
