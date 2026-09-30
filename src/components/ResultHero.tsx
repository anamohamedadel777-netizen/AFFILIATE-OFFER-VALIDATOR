import React from 'react';
import { Award, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { OfferAssessmentResult } from '../types';

interface ResultHeroProps {
  result: OfferAssessmentResult;
}

export const ResultHero: React.FC<ResultHeroProps> = ({ result }) => {
  return (
    <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#23170D] via-[#23170D]/80 to-[#040405] border border-[#4A2F15] shadow-2xl shadow-black overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#F5BF1E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left / Top: Title & Summary */}
        <div className="flex-1 text-right space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040405] border border-[#4A2F15] text-xs text-[#FBD052] font-semibold">
            <Award className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>OFFER QUALITY ASSESSMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#FCFCFA] leading-tight">
            نتيجة فحص وتقييم العرض: <span className="text-[#F5BF1E]">{result.productName}</span>
          </h2>

          <div className="inline-block px-3.5 py-1.5 rounded-lg bg-[#4A2F15]/40 border border-[#A7690C]/50 text-sm font-bold text-[#FBD052]">
            {result.categoryLabel}
          </div>

          <p className="text-sm sm:text-base text-[#C8C5BA] leading-relaxed max-w-2xl">
            {result.summary}
          </p>

          {/* High Score with Low Confidence Notice */}
          {result.confidenceNotice && (
            <div className="p-3 rounded-xl bg-[#4A2F15]/60 border border-[#A7690C] flex items-center gap-2.5 text-xs text-[#FBD052]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#F5BF1E]" />
              <span className="font-semibold">{result.confidenceNotice}</span>
            </div>
          )}
        </div>

        {/* Right / Score Badge Column */}
        <div className="w-full md:w-auto flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#040405]/80 border border-[#4A2F15] min-w-[260px] text-center shadow-xl">
          <span className="text-xs text-[#797979] font-bold uppercase tracking-wider mb-2">
            مؤشر جودة العرض
          </span>

          <div className="flex items-baseline justify-center gap-1.5 my-1">
            <span className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-[#FBD052] via-[#F5BF1E] to-[#A7690C] bg-clip-text text-transparent">
              {result.overallScore}
            </span>
            <span className="text-lg font-bold text-[#797979]">/ 100</span>
          </div>

          <div className="w-full h-1 bg-[#23170D] rounded-full my-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A7690C] to-[#F5BF1E]"
              style={{ width: `${result.overallScore}%` }}
            />
          </div>

          {/* Confidence Score */}
          <div className="w-full pt-2 border-t border-[#23170D] flex items-center justify-between text-xs">
            <span className="text-[#797979] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5BF1E]" />
              <span>درجة الثقة بالتحليل:</span>
            </span>
            <span className="font-bold text-[#FCFCFA] font-mono">
              {result.confidenceScore}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
