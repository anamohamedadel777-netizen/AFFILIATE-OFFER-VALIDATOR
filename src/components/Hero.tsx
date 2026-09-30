import React from 'react';
import { ArrowDown, CheckCircle2, XCircle, Sparkles, BookOpen } from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/presets';
import { OfferFormData } from '../types';

interface HeroProps {
  onStartClick: () => void;
  onSelectPreset: (presetData: OfferFormData) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick, onSelectPreset }) => {
  return (
    <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#F5BF1E]/5 via-[#4A2F15]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Small top label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-semibold tracking-widest uppercase mb-6 shadow-md shadow-black/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5BF1E] animate-pulse" />
          AFFILIATE OFFER VALIDATOR
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FCFCFA] tracking-tight leading-[1.25] mb-6">
          قبل ما تسوّق أي Offer…
          <span className="block mt-2 bg-gradient-to-r from-[#FBD052] via-[#F5BF1E] to-[#A7690C] bg-clip-text text-transparent">
            افحصه الأول
          </span>
        </h1>

        {/* Supporting copy */}
        <p className="text-base sm:text-xl text-[#C8C5BA] max-w-2xl mx-auto leading-relaxed mb-8">
          دخل رابط العرض أو بياناته، والأداة هتحلله من ناحية الجمهور، المشكلة، العمولة، صفحة البيع، الثقة، سياسة الاسترجاع والمخاطر.
        </p>

        {/* Philosophy Comparison Box */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#23170D]/90 to-[#040405] border border-[#4A2F15]/60 mb-10 text-right shadow-xl">
          <div className="p-3.5 rounded-xl bg-[#040405]/60 border border-[#23170D] flex items-start gap-3">
            <XCircle className="w-5 h-5 text-[#797979] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#797979] font-medium block">مش الهدف إن الأداة تقولك:</span>
              <p className="text-sm font-bold text-[#C8C5BA] mt-0.5">"هتكسب كام أو كام في المية؟"</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#4A2F15]/30 border border-[#F5BF1E]/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#F5BF1E] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#FBD052] font-semibold block">الهدف إنها تساعدك تعرف:</span>
              <p className="text-sm font-bold text-[#FCFCFA] mt-0.5">هل العرض يستحق وقتك واختبارك أصلًا؟</p>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-black text-base sm:text-lg shadow-lg shadow-[#F5BF1E]/15 hover:shadow-[#F5BF1E]/30 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ابدأ تقييم العرض</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* Quick Sample Presets Bar */}
        <div className="mt-10 pt-8 border-t border-[#23170D] max-w-xl mx-auto">
          <span className="text-xs text-[#797979] block mb-3 font-medium">
            أو جرب بنقرة واحدة نماذج حقيقية مدروسة:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPreset(preset.data)}
                className="text-xs px-3.5 py-2 rounded-lg bg-[#23170D]/60 hover:bg-[#23170D] border border-[#4A2F15]/70 hover:border-[#F5BF1E]/50 text-[#C8C5BA] hover:text-[#FBD052] transition-all flex items-center gap-1.5 cursor-pointer text-right"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5BF1E]" />
                <span>{preset.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
