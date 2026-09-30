import React from 'react';
import { CheckCircle2, AlertCircle, PauseCircle, Compass } from 'lucide-react';
import { DecisionType } from '../types';

interface DecisionPanelProps {
  decision: DecisionType;
  reasons: [string, string, string];
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({ decision, reasons }) => {
  const configs = {
    TEST: {
      titleAr: 'اختبر (TEST)',
      subtitle: 'تتوافر مؤشرات كافية وملاءمة مقبولة للبدء باختبار أولي منخفض التكلفة.',
      badgeBg: 'bg-[#F5BF1E]/15 border-[#F5BF1E]/40 text-[#FBD052]',
      icon: CheckCircle2,
      dotCol: 'bg-[#F5BF1E]',
    },
    VERIFY_FIRST: {
      titleAr: 'تحقق أولًا (VERIFY FIRST)',
      subtitle: 'العرض يحمل إشارات واعدة، ولكن توجد بنود وشروط غائبة يلزم التثبت منها قبل أي استثمار.',
      badgeBg: 'bg-[#A7690C]/25 border-[#F5BF1E]/30 text-[#FBD052]',
      icon: AlertCircle,
      dotCol: 'bg-[#A7690C]',
    },
    HOLD: {
      titleAr: 'توقف مؤقتًا (HOLD)',
      subtitle: 'هناك عدم تطابق جوهري بين العرض والجمهور أو مخاطر شروط غير واضحة.',
      badgeBg: 'bg-[#4A2F15]/60 border-[#A7690C]/50 text-[#C8C5BA]',
      icon: PauseCircle,
      dotCol: 'bg-[#797979]',
    },
  };

  const current = configs[decision] || configs.VERIFY_FIRST;
  const Icon = current.icon;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15] shadow-xl text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23170D] pb-5 mb-6">
        <div>
          <span className="text-xs font-bold text-[#797979] uppercase tracking-wider block mb-1">
            قرار الخطوة التالية (Next Step Decision)
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#FCFCFA] flex items-center gap-2.5">
            <Icon className="w-6 h-6 text-[#F5BF1E] shrink-0" />
            <span>{current.titleAr}</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1">
            {current.subtitle}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#040405] border border-[#23170D] text-xs text-[#797979]">
          <Compass className="w-3.5 h-3.5 text-[#F5BF1E]" />
          <span>قرار منهجي وليس تنبؤ أرباح</span>
        </div>
      </div>

      {/* 3 Reasons list */}
      <div>
        <h4 className="text-xs font-bold text-[#FBD052] uppercase tracking-wider mb-3">
          أسباب هذا القرار (3 محاور رئيسية):
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-md bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-[#C8C5BA] leading-relaxed">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
