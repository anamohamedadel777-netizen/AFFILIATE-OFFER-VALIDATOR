import React from 'react';
import { Compass, Lightbulb, Sparkles } from 'lucide-react';
import { MarketingAngle } from '../types';

interface MarketingAnglesProps {
  angles: MarketingAngle[];
}

export const MarketingAngles: React.FC<MarketingAnglesProps> = ({ angles }) => {
  if (!angles || angles.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              3 زوايا تسويقية مدروسة (Marketing Angles)
            </h3>
            <p className="text-xs text-[#797979]">
              مبنية حصراً على بيانات الجمهور والمشكلة المطروحة بدون ادعاءات مضللة
            </p>
          </div>
        </div>
        <span className="text-xs text-[#FBD052] font-mono">
          3 زوايا تموضع
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {angles.map((angle, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[#4A2F15]/40 text-[#FBD052] border border-[#A7690C]/30 font-medium">
                  {angle.angleType || `زاوية رقم ${idx + 1}`}
                </span>
                <span className="text-[10px] text-[#797979] font-mono">0{idx + 1}</span>
              </div>

              <h4 className="text-sm font-bold text-[#FCFCFA] mb-2 leading-snug">
                {angle.title}
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#23170D]/40 border border-[#23170D]">
                  <span className="text-[#797979] block text-[11px] mb-0.5 font-bold">
                    الخطاف التسويقي (Hook):
                  </span>
                  <p className="text-[#FBD052] italic">
                    "{angle.hook}"
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#040405] text-[#C8C5BA] leading-relaxed">
                  <span className="text-[#797979] block text-[11px] mb-0.5 font-bold">
                    الرسالة الجوهرية (Core Message):
                  </span>
                  <p>{angle.coreMessage}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
