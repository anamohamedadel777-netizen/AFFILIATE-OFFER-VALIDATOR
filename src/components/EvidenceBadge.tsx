import React from 'react';
import { EvidenceClassification } from '../types';

interface EvidenceBadgeProps {
  classification: EvidenceClassification;
  customText?: string;
  size?: 'sm' | 'md';
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  classification,
  customText,
  size = 'sm'
}) => {
  const configs = {
    VERIFIED: {
      text: 'مؤكد من البيانات',
      subtext: 'VERIFIED',
      // Gold
      bg: 'bg-[#F5BF1E]/10',
      border: 'border-[#F5BF1E]/30',
      textCol: 'text-[#FBD052]',
      dot: 'bg-[#F5BF1E]',
    },
    INFERRED: {
      text: 'استنتاج منطقي',
      subtext: 'INFERRED',
      // Warm white
      bg: 'bg-[#FCFCFA]/10',
      border: 'border-[#FCFCFA]/25',
      textCol: 'text-[#FCFCFA]',
      dot: 'bg-[#FCFCFA]',
    },
    MISSING: {
      text: 'معلومة ناقصة',
      subtext: 'MISSING',
      // Muted gray
      bg: 'bg-[#797979]/15',
      border: 'border-[#797979]/30',
      textCol: 'text-[#C8C5BA]',
      dot: 'bg-[#797979]',
    },
    NEEDS_VERIFICATION: {
      text: 'يحتاج تحقق',
      subtext: 'NEEDS VERIFICATION',
      // Bronze
      bg: 'bg-[#4A2F15]/40',
      border: 'border-[#A7690C]/40',
      textCol: 'text-[#F5BF1E]/90',
      dot: 'bg-[#A7690C]',
    },
  };

  const config = configs[classification] || configs.MISSING;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors ${config.bg} ${config.border} ${config.textCol} ${padding}`}
      title={config.subtext}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{customText || config.text}</span>
    </span>
  );
};
