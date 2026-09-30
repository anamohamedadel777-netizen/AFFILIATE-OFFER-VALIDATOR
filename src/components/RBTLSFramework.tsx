import React from 'react';
import { RBTLS_FRAMEWORK } from '../config/constants';

export const RBTLSFramework: React.FC = () => {
  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl text-right space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23170D] pb-3">
        <h4 className="text-sm font-bold text-[#FCFCFA] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5BF1E]" />
          <span>منهجية الأنظمة R.B.T.L.S في التسويق بالعمولة</span>
        </h4>
        <span className="text-xs text-[#F5BF1E] font-semibold">
          تقييم الـOffer جزء من مرحلة Research (البحث)
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {RBTLS_FRAMEWORK.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border text-center transition-all ${
              item.isCurrent
                ? 'bg-[#4A2F15]/40 border-[#F5BF1E] text-[#FCFCFA] shadow-md shadow-[#F5BF1E]/10 ring-1 ring-[#F5BF1E]/40'
                : 'bg-[#040405]/80 border-[#23170D] text-[#797979]'
            }`}
          >
            <div className="text-xl font-black font-mono text-[#FBD052] mb-0.5">
              {item.letter}
            </div>
            <div className="text-xs font-bold text-[#FCFCFA]">
              {item.titleAr}
            </div>
            <div className="text-[10px] text-[#797979] font-mono mt-0.5">
              {item.titleEn}
            </div>
            {item.isCurrent && (
              <span className="inline-block mt-2 text-[9px] px-1.5 py-0.5 rounded bg-[#F5BF1E] text-[#040405] font-black">
                أنت هنا
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-[#C8C5BA] text-center pt-2">
        العرض القوي يوفر عليك 80% من الجهد الإعلاني لاحقاً لأنه يركز على المشكلة الصحيحة للجمهور الصحيح.
      </p>
    </div>
  );
};
