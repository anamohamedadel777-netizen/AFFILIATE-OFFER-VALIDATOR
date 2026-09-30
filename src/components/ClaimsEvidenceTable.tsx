import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { ClaimsEvidenceItem } from '../types';

interface ClaimsEvidenceTableProps {
  claims: ClaimsEvidenceItem[];
}

export const ClaimsEvidenceTable: React.FC<ClaimsEvidenceTableProps> = ({ claims }) => {
  if (!claims || claims.length === 0) return null;

  const statusBadge = (status: 'yes' | 'partial' | 'no') => {
    switch (status) {
      case 'yes':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-[#F5BF1E]/15 border border-[#F5BF1E]/40 text-[#FBD052] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>نعم - موثق بأدلة</span>
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-[#4A2F15]/40 border border-[#A7690C]/40 text-[#F5BF1E]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>دليل جزئي / محدود</span>
          </span>
        );
      case 'no':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-[#23170D] border border-[#797979]/40 text-[#C8C5BA]">
            <XCircle className="w-3.5 h-3.5 text-[#797979]" />
            <span>مجرد ادعاء بدون إثبات</span>
          </span>
        );
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              الادعاءات مقابل الأدلة (Claims vs. Evidence)
            </h3>
            <p className="text-xs text-[#797979]">
              التمييز بين ما تقوله صفحة البيع تسويقياً وبين ما تقدمه من براهين فعلية
            </p>
          </div>
        </div>
        <span className="text-xs text-[#797979]">
          حماية من الوعود المبالغ فيها
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-[#23170D] text-xs text-[#797979]">
              <th className="py-2.5 px-3 font-bold">الادعاء الوارد في العرض (Claim)</th>
              <th className="py-2.5 px-3 font-bold whitespace-nowrap">هل وُجد دليل ملموس؟</th>
              <th className="py-2.5 px-3 font-bold">تحليل الإثبات والواقعية</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#23170D] text-xs">
            {claims.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#040405]/50 transition-colors">
                <td className="py-3 px-3 font-medium text-[#FCFCFA] max-w-xs sm:max-w-sm">
                  "{item.claim}"
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {statusBadge(item.evidenceStatus)}
                </td>
                <td className="py-3 px-3 text-[#C8C5BA] leading-relaxed">
                  {item.evidenceExplanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
