import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { RiskItem, RiskSeverity } from '../types';

interface RiskPanelProps {
  risks: RiskItem[];
}

export const RiskPanel: React.FC<RiskPanelProps> = ({ risks }) => {
  const severityConfig: Record<RiskSeverity, { label: string; badge: string }> = {
    low: {
      label: 'مخاطرة منخفضة',
      badge: 'bg-[#797979]/20 text-[#C8C5BA] border-[#797979]/30',
    },
    medium: {
      label: 'مخاطرة متوسطة',
      badge: 'bg-[#4A2F15]/50 text-[#F5BF1E] border-[#A7690C]/40',
    },
    high: {
      label: 'مخاطرة مرتفعة',
      badge: 'bg-[#4A2F15] text-[#FBD052] border-[#F5BF1E]/50 font-bold',
    },
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#F5BF1E]" />
          <h3 className="text-lg font-bold text-[#FCFCFA]">
            إيه اللي يقلقني في العرض؟ (Main Risks & Friction)
          </h3>
        </div>
        <span className="text-xs text-[#797979]">
          تحديد محايد لمناطق الاحتكاك
        </span>
      </div>

      <div className="space-y-3">
        {risks.map((item, idx) => {
          const sev = severityConfig[item.severity] || severityConfig.medium;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#A7690C] shrink-0 mt-0.5" />
                  <h4 className="text-sm font-bold text-[#FCFCFA]">
                    {item.risk}
                  </h4>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded border inline-block w-fit ${sev.badge}`}>
                  {sev.label}
                </span>
              </div>

              <div className="pr-6 text-xs text-[#C8C5BA] leading-relaxed">
                <span className="text-[#797979] font-medium ml-1">تأثيرها عليك:</span>
                <span>{item.whyItMatters}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
