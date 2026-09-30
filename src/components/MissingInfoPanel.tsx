import React from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';

interface MissingInfoPanelProps {
  missingItems: string[];
}

export const MissingInfoPanel: React.FC<MissingInfoPanelProps> = ({ missingItems }) => {
  if (!missingItems || missingItems.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-4 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#C8C5BA]" />
          <h3 className="text-lg font-bold text-[#FCFCFA]">
            معلومات ناقصة قبل ما تاخد قرار (Missing Information)
          </h3>
        </div>
        <span className="text-xs text-[#797979]">
          تزيد من مخاطرة الاختبار إذا أُهملت
        </span>
      </div>

      <p className="text-xs text-[#C8C5BA] leading-relaxed">
        البيانات التالية لم تكن متوفرة أثناء التحليل، ونوصي بعدم بدء أي حملة إعلانية أو استثمار ساعات طويلة قبل معرفتها بدقة:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {missingItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-center gap-2.5 text-xs text-[#C8C5BA]"
          >
            <span className="w-2 h-2 rounded-full bg-[#797979] shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
