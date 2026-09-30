import React from 'react';
import { BarChart3, HelpCircle } from 'lucide-react';
import { DimensionScore } from '../types';
import { EvidenceBadge } from './EvidenceBadge';

interface ScoreBreakdownProps {
  dimensions: DimensionScore[];
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ dimensions }) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-6 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23170D] pb-4">
        <div>
          <h3 className="text-lg font-bold text-[#FCFCFA] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#F5BF1E]" />
            <span>تفصيل الأبعاد الثمانية (8 Dimensions Score)</span>
          </h3>
          <p className="text-xs text-[#797979] mt-0.5">
            تقييم كل بُعد من 0 إلى 10 بناءً على الأدلة والبيانات المتوفرة فقط.
          </p>
        </div>
        <div className="text-xs text-[#C8C5BA] font-mono">
          المجموع: {dimensions.reduce((a, b) => a + b.score, 0)} / 80
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dimensions.map((dim) => {
          const percentage = (dim.score / 10) * 100;
          return (
            <div
              key={dim.id}
              className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#FCFCFA]">
                      {dim.titleAr}
                    </span>
                    <span className="text-[11px] text-[#797979] font-mono">
                      ({dim.titleEn})
                    </span>
                  </div>
                  <span className="text-sm font-black font-mono text-[#FBD052] bg-[#4A2F15]/30 px-2 py-0.5 rounded border border-[#A7690C]/30">
                    {dim.score} / 10
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#23170D] rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-[#A7690C] to-[#F5BF1E] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Dimension Reason */}
                <p className="text-xs text-[#C8C5BA] leading-relaxed mb-3">
                  {dim.reason}
                </p>
              </div>

              {/* Evidence sources */}
              {dim.evidenceSources && dim.evidenceSources.length > 0 && (
                <div className="pt-2 border-t border-[#23170D] flex flex-wrap gap-1.5 items-center">
                  {dim.evidenceSources.map((ev, i) => (
                    <EvidenceBadge
                      key={i}
                      classification={ev.classification}
                      customText={ev.text}
                      size="sm"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
