import React from 'react';
import { Users, ArrowDown, Target, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AudienceFitMapData } from '../types';

interface AudienceFitMapProps {
  fitMap: AudienceFitMapData;
}

export const AudienceFitMap: React.FC<AudienceFitMapProps> = ({ fitMap }) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-6 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#23170D] pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#FCFCFA] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#F5BF1E]" />
            <span>هل العرض مناسب لجمهورك؟ (Audience-Offer Fit Map)</span>
          </h3>
          <p className="text-xs text-[#797979] mt-0.5">
            تتبع مسار القيمة من واقع الجمهور حتى وعد العرض
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#C8C5BA]">مستوى التوافق:</span>
          <span className="text-xs px-2.5 py-1 rounded-md bg-[#4A2F15]/40 border border-[#F5BF1E]/40 text-[#FBD052] font-black font-mono">
            {fitMap.alignmentScore} / 10
          </span>
        </div>
      </div>

      {/* Visual Alignment Flow: Audience -> Problem -> Outcome -> Offer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {/* Step 1: Audience */}
        <div className="p-4 rounded-xl bg-[#040405] border border-[#23170D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#797979] font-bold mb-2">
              <span>1. الجمهور (Audience)</span>
              <Users className="w-3.5 h-3.5 text-[#F5BF1E]" />
            </div>
            <p className="text-xs text-[#FCFCFA] leading-relaxed">
              {fitMap.audience}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#23170D] text-[10px] text-[#797979]">
            منطلق الاحتياج
          </div>
        </div>

        {/* Step 2: Problem */}
        <div className="p-4 rounded-xl bg-[#040405] border border-[#23170D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#797979] font-bold mb-2">
              <span>2. المشكلة الحقيقية (Problem)</span>
              <AlertTriangle className="w-3.5 h-3.5 text-[#A7690C]" />
            </div>
            <p className="text-xs text-[#C8C5BA] leading-relaxed">
              {fitMap.problem}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#23170D] text-[10px] text-[#797979]">
            نقطة الألم الدافعة
          </div>
        </div>

        {/* Step 3: Desired Outcome */}
        <div className="p-4 rounded-xl bg-[#040405] border border-[#23170D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#797979] font-bold mb-2">
              <span>3. النتيجة المرغوبة (Outcome)</span>
              <Target className="w-3.5 h-3.5 text-[#FBD052]" />
            </div>
            <p className="text-xs text-[#C8C5BA] leading-relaxed">
              {fitMap.desiredOutcome}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#23170D] text-[10px] text-[#797979]">
            التحول المطلوب
          </div>
        </div>

        {/* Step 4: Offer Promise */}
        <div className="p-4 rounded-xl bg-[#040405] border border-[#4A2F15] flex flex-col justify-between bg-gradient-to-b from-[#23170D]/40 to-[#040405]">
          <div>
            <div className="flex items-center justify-between text-xs text-[#F5BF1E] font-bold mb-2">
              <span>4. وعد العرض (Offer Promise)</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5BF1E]" />
            </div>
            <p className="text-xs text-[#FCFCFA] font-medium leading-relaxed">
              {fitMap.offerPromise}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#23170D] text-[10px] text-[#F5BF1E]">
            الحل المقدم
          </div>
        </div>
      </div>

      {/* Alignment Verdict and Mismatch Analysis */}
      <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#F5BF1E]" />
          <span className="text-xs font-bold text-[#FCFCFA]">
            خلاصة التوافق:
          </span>
          <span className="text-xs text-[#C8C5BA]">
            {fitMap.alignmentVerdict}
          </span>
        </div>

        {fitMap.mismatchNotes && (
          <div className="text-xs text-[#FBD052] bg-[#4A2F15]/30 p-2.5 rounded-lg border border-[#A7690C]/30 leading-relaxed">
            <span className="font-bold ml-1">تنبيه نقطة الانفصال المحتملة (Mismatch):</span>
            {fitMap.mismatchNotes}
          </div>
        )}
      </div>
    </div>
  );
};
