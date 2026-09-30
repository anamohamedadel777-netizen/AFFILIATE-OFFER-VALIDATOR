import React from 'react';
import { DollarSign, Clock, ShieldAlert, Tag, Layers, RefreshCw } from 'lucide-react';
import { OfferFormData, CommissionType } from '../types';

interface ManualOfferFormProps {
  formData: OfferFormData;
  onChange: (field: keyof OfferFormData, value: any) => void;
}

export const ManualOfferForm: React.FC<ManualOfferFormProps> = ({ formData, onChange }) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-6">
      <div className="flex items-center gap-2 border-b border-[#23170D] pb-3">
        <Tag className="w-5 h-5 text-[#F5BF1E]" />
        <h3 className="text-base font-bold text-[#FCFCFA]">
          بيانات العرض والعمولة (Offer & Commission Data)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            اسم المنتج / العرض (Product Name) <span className="text-[#F5BF1E]">*</span>
          </label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => onChange('productName', e.target.value)}
            placeholder="مثال: ShopVideo AI أو دورة التجارة الإلكترونية الشاملة"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
            required
          />
        </div>

        {/* Product URL */}
        <div>
          <label className="block text-xs font-bold text-[#C8C5BA] mb-1.5">
            رابط المنتج (اختياري)
          </label>
          <input
            type="url"
            dir="ltr"
            value={formData.productUrl}
            onChange={(e) => onChange('productUrl', e.target.value)}
            placeholder="https://..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            سعر المنتج (Product Price) <span className="text-[#F5BF1E]">*</span>
          </label>
          <input
            type="text"
            value={formData.productPrice}
            onChange={(e) => onChange('productPrice', e.target.value)}
            placeholder="مثال: $49/شهر أو $297 لمرة واحدة"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
          />
        </div>

        {/* Commission Type */}
        <div>
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            نوع العمولة (Commission Type)
          </label>
          <select
            value={formData.commissionType}
            onChange={(e) => onChange('commissionType', e.target.value as CommissionType)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] focus:outline-none cursor-pointer"
          >
            <option value="percentage">نسبة مئوية (Percentage)</option>
            <option value="fixed">قيمة ثابتة (Fixed Amount)</option>
            <option value="recurring">عمولة متكررة (Recurring)</option>
            <option value="hybrid">مزيج (Hybrid)</option>
          </select>
        </div>

        {/* Commission Value */}
        <div>
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            قيمة / نسبة العمولة (Commission) <span className="text-[#F5BF1E]">*</span>
          </label>
          <input
            type="text"
            value={formData.commissionValue}
            onChange={(e) => onChange('commissionValue', e.target.value)}
            placeholder={
              formData.commissionType === 'percentage'
                ? 'مثال: 40%'
                : formData.commissionType === 'recurring'
                ? 'مثال: 30% شهرياً'
                : 'مثال: $50 لكل مبيعة'
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
          />
        </div>

        {/* If recurring: frequency */}
        {formData.commissionType === 'recurring' && (
          <div>
            <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
              دورية التجديد (Billing Frequency)
            </label>
            <select
              value={formData.recurringFrequency}
              onChange={(e) => onChange('recurringFrequency', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] focus:outline-none cursor-pointer"
            >
              <option value="monthly">شهري (Monthly)</option>
              <option value="annual">سنوي (Annual)</option>
              <option value="other">أخرى (Other)</option>
            </select>
          </div>
        )}

        {/* Cookie Duration */}
        <div>
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            مدة التتبع (Cookie Duration)
          </label>
          <select
            value={formData.cookieDuration}
            onChange={(e) => onChange('cookieDuration', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] focus:outline-none cursor-pointer"
          >
            <option value="24 ساعة">24 ساعة (24 hours)</option>
            <option value="7 أيام">7 أيام (7 days)</option>
            <option value="30 يوم">30 يوم (30 days)</option>
            <option value="60 يوم">60 يوم (60 days)</option>
            <option value="90 يوم">90 يوم (90 days)</option>
            <option value="مدى الحياة (Lifetime)">مدى الحياة (Lifetime)</option>
            <option value="غير معروف">غير معروف (Unknown)</option>
          </select>
        </div>

        {/* Refund Period */}
        <div>
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            سياسة الاسترجاع (Refund Policy)
          </label>
          <input
            type="text"
            value={formData.refundPeriod}
            onChange={(e) => onChange('refundPeriod', e.target.value)}
            placeholder="مثال: 30 يوم استرجاع، أو بدون استرجاع، أو غير معروف"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
          />
        </div>

        {/* Does refund cancel commission? */}
        <div>
          <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
            هل استرجاع العميل يلغي عمولتك؟
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'yes', label: 'نعم' },
              { val: 'no', label: 'لا' },
              { val: 'unknown', label: 'غير معروف' },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => onChange('refundCancelsCommission', opt.val)}
                className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  formData.refundCancelsCommission === opt.val
                    ? 'bg-[#F5BF1E]/20 border-[#F5BF1E] text-[#FBD052]'
                    : 'bg-[#040405] border-[#4A2F15] text-[#C8C5BA] hover:text-[#FCFCFA]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
