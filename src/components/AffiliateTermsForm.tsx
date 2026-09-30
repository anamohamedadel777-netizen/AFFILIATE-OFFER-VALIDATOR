import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders, ShieldCheck } from 'lucide-react';
import { OfferFormData } from '../types';

interface AffiliateTermsFormProps {
  formData: OfferFormData;
  onChange: (field: keyof OfferFormData, value: any) => void;
}

export const AffiliateTermsForm: React.FC<AffiliateTermsFormProps> = ({ formData, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 overflow-hidden shadow-xl">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-right hover:bg-[#23170D]/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <span className="font-bold text-sm text-[#FCFCFA] block">
              شروط وقوانين برنامج الأفلييت (اختياري - لزيادة دقة التحليل)
            </span>
            <span className="text-xs text-[#797979]">
              شبكة الأفلييت، سياسة الإعلانات الممولة، قيود اسم البراند ومواعيد الدفع.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#F5BF1E]">
          <span>{isOpen ? 'إخفاء' : 'إظهار الشروط'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-2 border-t border-[#23170D] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Affiliate Network */}
            <div>
              <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
                شبكة الأفلييت (Affiliate Network)
              </label>
              <input
                type="text"
                value={formData.affiliateNetwork}
                onChange={(e) => onChange('affiliateNetwork', e.target.value)}
                placeholder="مثال: Impact, ClickBank, FirstPromoter, برمجية خاصة..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
              />
            </div>

            {/* Payout Threshold */}
            <div>
              <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
                الحد الأدنى للسحب (Payout Threshold)
              </label>
              <input
                type="text"
                value={formData.payoutThreshold}
                onChange={(e) => onChange('payoutThreshold', e.target.value)}
                placeholder="مثال: $50 أو $100"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
              />
            </div>

            {/* Payout Frequency */}
            <div>
              <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
                موعد صرف الأرباح (Payout Frequency)
              </label>
              <input
                type="text"
                value={formData.payoutFrequency}
                onChange={(e) => onChange('payoutFrequency', e.target.value)}
                placeholder="مثال: شهري (Net-30)، أسبوعي، أو بعد 45 يوم"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
              />
            </div>

            {/* Geo Restrictions */}
            <div>
              <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
                قيود جغرافية (Geographic Restrictions)
              </label>
              <input
                type="text"
                value={formData.geoRestrictions}
                onChange={(e) => onChange('geoRestrictions', e.target.value)}
                placeholder="مثال: متاح فقط للخليج، أو متاح عالمياً"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
              />
            </div>
          </div>

          {/* Traffic restrictions buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Paid ads */}
            <div className="p-3 rounded-xl bg-[#040405] border border-[#23170D]">
              <span className="block text-xs font-bold text-[#FCFCFA] mb-2">
                هل الإعلانات الممولة مسموحة؟ (Paid Ads)
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['yes', 'no', 'unknown'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onChange('paidAdsAllowed', v)}
                    className={`py-1.5 text-xs rounded border transition-all cursor-pointer ${
                      formData.paidAdsAllowed === v
                        ? 'bg-[#F5BF1E]/20 border-[#F5BF1E] text-[#FBD052] font-bold'
                        : 'border-[#4A2F15] text-[#797979]'
                    }`}
                  >
                    {v === 'yes' ? 'نعم' : v === 'no' ? 'ممنوع' : 'غير محدد'}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand bidding */}
            <div className="p-3 rounded-xl bg-[#040405] border border-[#23170D]">
              <span className="block text-xs font-bold text-[#FCFCFA] mb-2">
                المزايدة على اسم البراند (Brand Bidding)
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['yes', 'no', 'unknown'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onChange('brandBiddingAllowed', v)}
                    className={`py-1.5 text-xs rounded border transition-all cursor-pointer ${
                      formData.brandBiddingAllowed === v
                        ? 'bg-[#F5BF1E]/20 border-[#F5BF1E] text-[#FBD052] font-bold'
                        : 'border-[#4A2F15] text-[#797979]'
                    }`}
                  >
                    {v === 'yes' ? 'مسموح' : v === 'no' ? 'ممنوع' : 'غير محدد'}
                  </button>
                ))}
              </div>
            </div>

            {/* Email marketing */}
            <div className="p-3 rounded-xl bg-[#040405] border border-[#23170D]">
              <span className="block text-xs font-bold text-[#FCFCFA] mb-2">
                التسويق بالإيميل (Email Marketing)
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['yes', 'no', 'unknown'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onChange('emailMarketingAllowed', v)}
                    className={`py-1.5 text-xs rounded border transition-all cursor-pointer ${
                      formData.emailMarketingAllowed === v
                        ? 'bg-[#F5BF1E]/20 border-[#F5BF1E] text-[#FBD052] font-bold'
                        : 'border-[#4A2F15] text-[#797979]'
                    }`}
                  >
                    {v === 'yes' ? 'مسموح' : v === 'no' ? 'ممنوع' : 'غير محدد'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Other terms */}
          <div>
            <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
              أي شروط أو بنود أخرى مهمة (Other Terms)
            </label>
            <input
              type="text"
              value={formData.otherTerms}
              onChange={(e) => onChange('otherTerms', e.target.value)}
              placeholder="مثال: يمنع استخدام ادعاءات غير حقيقية، يشترط وضع إخلاء المسؤولية..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
