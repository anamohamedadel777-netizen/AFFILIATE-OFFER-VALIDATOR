import React from 'react';
import { PlayCircle, ShieldCheck, ArrowRight, Eye, MousePointerClick, BarChart2 } from 'lucide-react';
import { NextTestStep } from '../types';

interface NextTestPlanProps {
  steps: NextTestStep[];
}

export const NextTestPlan: React.FC<NextTestPlanProps> = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              لو هتختبر العرض… اختبره إزاي؟ (Low-Risk Testing Plan)
            </h3>
            <p className="text-xs text-[#797979]">
              خطة اختبار أولي منخفض المخاطر والتكلفة للتحقق من تفاعل الجمهور الحقيقي قبل التوسع
            </p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-[#4A2F15]/40 border border-[#F5BF1E]/30 text-[#FBD052] font-semibold">
          اختبار أولي مرحلي
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#F5BF1E] font-mono">
                  المرحلة {step.stepNumber || idx + 1}
                </span>
                <span className="w-5 h-5 rounded bg-[#23170D] text-[10px] text-[#C8C5BA] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#FCFCFA] mb-2">
                {step.actionTitle}
              </h4>

              <p className="text-xs text-[#C8C5BA] leading-relaxed mb-3">
                {step.description}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[#23170D] text-[11px] bg-[#23170D]/40 p-2 rounded-lg flex items-center gap-1.5 text-[#FBD052]">
              <BarChart2 className="w-3.5 h-3.5 shrink-0 text-[#F5BF1E]" />
              <div>
                <span className="text-[#797979] ml-1">المقياس الأهم للمراقبة:</span>
                <span className="font-bold">{step.metricToWatch}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
