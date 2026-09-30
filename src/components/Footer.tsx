import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';
import { BRAND_CONFIG } from '../config/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#23170D] bg-[#040405] text-[#C8C5BA] pt-14 pb-12 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Analytical Disclaimer */}
        <div className="p-4 sm:p-5 rounded-xl border border-[#4A2F15]/50 bg-[#23170D]/40 backdrop-blur-sm mb-12">
          <div className="flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[#F5BF1E] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#C8C5BA] leading-relaxed space-y-1">
              <span className="font-bold text-[#FCFCFA] block">
                تنبيه منهجي وأمان قراري (Decision Safety):
              </span>
              <p>
                هذا التحليل هو <span className="text-[#FBD052] font-semibold">Offer Quality Assessment</span> (تقييم جودة العرض) بناءً على المعلومات المتاحة والأدلة المقدمة فقط، وليس توقعًا أو وعدًا بتحقيق أي أرباح. الأداء التسويقي الفعلي يعتمد دائماً على عوامل متكاملة تشمل جودة الترافيك المستهدف، عمق فهم الجمهور، زوايا الرسالة التسويقية، ديناميكية السوق، كفاءة صفحة البيع، دقة التتبع، وجودة التنفيذ المستمر.
              </p>
            </div>
          </div>
        </div>

        {/* Brand identity signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#23170D]/80">
          <div className="flex items-center gap-3 text-center sm:text-right">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4A2F15] to-[#040405] border border-[#F5BF1E]/40 flex items-center justify-center">
              <span className="text-[#F5BF1E] font-black text-sm">MA</span>
            </div>
            <div>
              <p className="font-bold text-[#FCFCFA] text-base">{BRAND_CONFIG.name}</p>
              <p className="text-xs text-[#797979]">
                {BRAND_CONFIG.taglineEn}
              </p>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-[#FBD052] tracking-wide">
              {BRAND_CONFIG.taglineAr}
            </p>
            <p className="text-xs text-[#797979] mt-0.5">
              مبني وفق مبادئ التحليل القائم على الأدلة والحقائق
            </p>
          </div>
        </div>

        <div className="text-center mt-10 text-xs text-[#797979]">
          © {new Date().getFullYear()} AFFILIATE OFFER VALIDATOR — تم التطوير وفق منهجية الأنظمة المستدامة.
        </div>
      </div>
    </footer>
  );
};
