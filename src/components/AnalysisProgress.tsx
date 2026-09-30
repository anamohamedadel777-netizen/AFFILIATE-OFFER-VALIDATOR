import React, { useEffect, useState } from 'react';
import { Loader2, Check, Search, Users, Coins, ShieldAlert, FileCheck } from 'lucide-react';

interface AnalysisProgressProps {
  isLoading: boolean;
}

const STAGES = [
  { label: 'جاري قراءة وتحليل بيانات العرض المتاحة', icon: Search },
  { label: 'جاري تحليل تطابق الجمهور والمشكلة والنتيجة', icon: Users },
  { label: 'جاري فحص اقتصاديات العمولة ومعدلات التحويل المحتملة', icon: Coins },
  { label: 'جاري مراجعة المخاطر وشروط التتبع وسياسة الاسترجاع', icon: ShieldAlert },
  { label: 'جاري تدقيق الأدلة وتجهيز تقرير فحص العرض النهائي', icon: FileCheck },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ isLoading }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStage(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#040405]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#23170D] border border-[#4A2F15] shadow-2xl shadow-black text-center relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#F5BF1E] to-transparent" />

        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#4A2F15] to-[#040405] border border-[#F5BF1E]/40 flex items-center justify-center text-[#F5BF1E] shadow-lg shadow-black/60">
          <Loader2 className="w-7 h-7 animate-spin text-[#F5BF1E]" />
        </div>

        <h3 className="text-lg font-black text-[#FCFCFA] mb-2">
          جاري فحص وتقييم العرض بدقة منهجية...
        </h3>
        <p className="text-xs text-[#C8C5BA] mb-6">
          يتم فحص العرض عبر 8 أبعاد تسويقية استناداً إلى الحقائق والأدلة فقط.
        </p>

        {/* Stages list */}
        <div className="space-y-3 text-right">
          {STAGES.map((stg, idx) => {
            const Icon = stg.icon;
            const isCompleted = idx < currentStage;
            const isCurrent = idx === currentStage;
            const isPending = idx > currentStage;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  isCurrent
                    ? 'bg-[#4A2F15]/30 border-[#F5BF1E]/60 text-[#FCFCFA] shadow-md shadow-[#F5BF1E]/5'
                    : isCompleted
                    ? 'bg-[#040405]/50 border-[#4A2F15]/40 text-[#FBD052]'
                    : 'bg-[#040405]/30 border-[#23170D] text-[#797979] opacity-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold ${
                    isCompleted
                      ? 'bg-[#F5BF1E] text-[#040405]'
                      : isCurrent
                      ? 'bg-[#A7690C] text-[#FCFCFA] animate-pulse'
                      : 'bg-[#23170D] text-[#797979]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </div>

                <div className="flex-1">
                  <span className="text-xs font-medium block">
                    {stg.label}
                  </span>
                </div>

                {isCurrent && (
                  <span className="text-[10px] text-[#F5BF1E] font-bold animate-pulse">
                    جاري العمل...
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-full h-1.5 bg-[#040405] rounded-full overflow-hidden border border-[#4A2F15]/50">
          <div
            className="h-full bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] transition-all duration-700"
            style={{ width: `${((currentStage + 1) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
