import React, { useState } from 'react';
import { Share2, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { OfferAssessmentResult } from '../types';
import { BRAND_CONFIG } from '../config/constants';

interface ShareableCardProps {
  result: OfferAssessmentResult;
}

export const ShareableCard: React.FC<ShareableCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const topStrength = result.strengths?.[0]?.finding || 'تطابق جيد بين المشكلة والجمهور';
  const mainRisk = result.risks?.[0]?.risk || 'شروط التتبع أو الاسترجاع تحتاج تدقيق';

  const summaryText = `📊 تقرير فحص عرض الأفلييت (Affiliate Offer Validator)
━━━━━━━━━━━━━━━━━━━━
📦 العرض: ${result.productName}
⭐ مؤشر جودة العرض: ${result.overallScore} / 100
🛡️ درجة الثقة بالتحليل: ${result.confidenceScore}%
🎯 قرار الخطوة التالية: ${result.decision === 'TEST' ? 'اختبر (TEST)' : result.decision === 'VERIFY_FIRST' ? 'تحقق أولًا (VERIFY FIRST)' : 'توقف مؤقتًا (HOLD)'}
━━━━━━━━━━━━━━━━━━━━
✅ أقوى نقطة: ${topStrength}
⚠️ نقطة القلق الأهم: ${mainRisk}
━━━━━━━━━━━━━━━━━━━━
💡 ${BRAND_CONFIG.name} — ${BRAND_CONFIG.taglineAr}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              بطاقة الملخص القابلة للمشاركة (Shareable Summary Card)
            </h3>
            <p className="text-xs text-[#797979]">
              ملخص احترافي جاهز للقطة الشاشة (Screenshot) أو النسخ والمشاركة مع فريقك
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23170D] border border-[#4A2F15] hover:border-[#F5BF1E]/50 text-xs font-bold text-[#FCFCFA] hover:text-[#FBD052] transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#F5BF1E]" />
              <span>تم نسخ الملخص!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>نسخ الملخص</span>
            </>
          )}
        </button>
      </div>

      {/* The Screenshot-Ready Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#23170D] via-[#040405] to-[#23170D] border border-[#F5BF1E]/40 shadow-2xl relative overflow-hidden max-w-lg mx-auto">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5BF1E]/10 rounded-bl-full pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#4A2F15]/60 pb-3 mb-4">
          <span className="text-[11px] font-mono tracking-widest text-[#F5BF1E] font-bold uppercase">
            AFFILIATE OFFER VALIDATOR
          </span>
          <span className="text-xs text-[#797979] font-semibold">
            {BRAND_CONFIG.name}
          </span>
        </div>

        {/* Offer Name */}
        <div className="mb-4">
          <span className="text-[11px] text-[#797979] block">اسم العرض (Offer):</span>
          <h4 className="text-xl font-black text-[#FCFCFA] mt-0.5">
            {result.productName}
          </h4>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-xl bg-[#040405]/80 border border-[#23170D]">
          <div>
            <span className="text-[11px] text-[#797979] block">جودة العرض (Offer Quality):</span>
            <span className="text-2xl font-black text-[#FBD052] font-mono">
              {result.overallScore} <span className="text-xs text-[#797979]">/ 100</span>
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#797979] block">الثقة في التحليل (Confidence):</span>
            <span className="text-2xl font-black text-[#FCFCFA] font-mono">
              {result.confidenceScore}%
            </span>
          </div>
        </div>

        {/* Decision Badge */}
        <div className="mb-4 flex items-center justify-between p-2.5 rounded-lg bg-[#23170D]/60 border border-[#4A2F15]">
          <span className="text-xs text-[#C8C5BA]">قرار الخطوة التالية:</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F5BF1E]/20 text-[#FBD052] border border-[#F5BF1E]/40">
            {result.decision === 'TEST' ? 'اختبر (TEST)' : result.decision === 'VERIFY_FIRST' ? 'تحقق أولًا (VERIFY FIRST)' : 'توقف مؤقتًا (HOLD)'}
          </span>
        </div>

        {/* Key Findings */}
        <div className="space-y-2 mb-5 text-xs text-[#C8C5BA]">
          <div className="flex items-start gap-2">
            <span className="text-[#F5BF1E] font-bold">✓</span>
            <div>
              <span className="text-[#797979] ml-1">أقوى ميزة:</span>
              <span className="text-[#FCFCFA]">{topStrength}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-[#A7690C] font-bold">⚠</span>
            <div>
              <span className="text-[#797979] ml-1">أهم مخاطرة:</span>
              <span className="text-[#FCFCFA]">{mainRisk}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-[#4A2F15]/60 flex items-center justify-between text-[11px] text-[#797979]">
          <span className="font-semibold text-[#C8C5BA]">Mohamed Adel</span>
          <span className="text-[#FBD052]">{BRAND_CONFIG.taglineEn}</span>
        </div>
      </div>
    </div>
  );
};
