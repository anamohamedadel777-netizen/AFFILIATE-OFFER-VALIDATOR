import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { StrengthItem } from '../types';
import { EvidenceBadge } from './EvidenceBadge';

interface StrengthsPanelProps {
  strengths: StrengthItem[];
}

export const StrengthsPanel: React.FC<StrengthsPanelProps> = ({ strengths }) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#F5BF1E]" />
          <h3 className="text-lg font-bold text-[#FCFCFA]">
            أقوى نقاط العرض (Top Strengths)
          </h3>
        </div>
        <span className="text-xs text-[#797979]">
          {strengths.length} نقاط مؤكدة
        </span>
      </div>

      <div className="space-y-3">
        {strengths.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
                <h4 className="text-sm font-bold text-[#FCFCFA]">
                  {item.finding}
                </h4>
              </div>
              <EvidenceBadge
                classification={item.classification || 'VERIFIED'}
                customText={item.evidenceSource ? `مصدر: ${item.evidenceSource}` : undefined}
                size="sm"
              />
            </div>

            <div className="pr-6 text-xs text-[#C8C5BA] leading-relaxed">
              <span className="text-[#797979] font-medium ml-1">لماذا هذا مهم؟:</span>
              <span>{item.whyItMatters}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
