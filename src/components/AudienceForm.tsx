import React from 'react';
import { Users, HelpCircle, Check, Info } from 'lucide-react';
import { OfferFormData, AudienceAwareness } from '../types';

interface AudienceFormProps {
  formData: OfferFormData;
  onChange: (field: keyof OfferFormData, value: any) => void;
}

export const AudienceForm: React.FC<AudienceFormProps> = ({ formData, onChange }) => {
  const awarenessLevels: { id: AudienceAwareness; labelAr: string; labelEn: string; desc: string }[] = [
    { id: 'cold', labelAr: 'جمهور بارد', labelEn: 'Cold', desc: 'لا يعرف المشكلة بوضوح بعد' },
    { id: 'problem_aware', labelAr: 'واعي بالمشكلة', labelEn: 'Problem Aware', desc: 'يعاني من الألم ويبحث عن حل' },
    { id: 'solution_aware', labelAr: 'واعي بالحلول', labelEn: 'Solution Aware', desc: 'يقارن بين الحلول والأدوات' },
    { id: 'product_aware', labelAr: 'عارف المنتج', labelEn: 'Product Aware', desc: 'يعرف اسم المنتج ويحتاج دفعة للشراء' },
    { id: 'unknown', labelAr: 'غير معروف', labelEn: 'Unknown', desc: 'لم يتم تحديد مستوى الوعي' },
  ];

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-6">
      <div className="flex items-center gap-2 border-b border-[#23170D] pb-3">
        <Users className="w-5 h-5 text-[#F5BF1E]" />
        <div>
          <h3 className="text-base font-bold text-[#FCFCFA]">
            الجمهور والمشكلة (Audience & Problem Fit)
          </h3>
          <p className="text-xs text-[#797979]">
            العرض القوي يبدأ من ملاءمة حقيقية لجمهور محدد ومشاكل حقيقية يواجهها.
          </p>
        </div>
      </div>

      {/* Target Audience Question */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-[#FCFCFA] flex items-center gap-1.5">
            <span>مين الجمهور اللي ناوي تسوق له العرض؟</span>
            <span className="text-[#F5BF1E]">*</span>
          </label>
        </div>

        {/* Guidance tip box */}
        <div className="mb-2.5 p-3 rounded-lg bg-[#040405] border border-[#23170D] text-xs text-[#C8C5BA] space-y-1">
          <div className="flex items-center gap-1.5 text-[#797979]">
            <Info className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>نصيحة لتحليل أدق: كن محدداً وتجنب التعميم.</span>
          </div>
          <p className="text-[#797979]">
            ❌ وصف عام ضعيف: <span className="line-through">"ناس مهتمة بالتسويق"</span>
          </p>
          <p className="text-[#FBD052]">
            ✅ وصف محدد قوي: "أصحاب متاجر إلكترونية صغيرة بيعملوا المحتوى بنفسهم ومش عندهم فريق فيديو."
          </p>
        </div>

        <textarea
          rows={3}
          value={formData.targetAudience}
          onChange={(e) => onChange('targetAudience', e.target.value)}
          placeholder="وضح خصائص جمهورك بدقة: مهنتهم، وضعهم المالي، معاناتهم اليومية..."
          className="w-full p-3 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none resize-none"
          required
        />
      </div>

      {/* Problem Solved Question */}
      <div>
        <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
          إيه المشكلة الأساسية اللي المنتج بيحلها؟ (Problem) <span className="text-[#F5BF1E]">*</span>
        </label>
        <p className="text-xs text-[#797979] mb-2">
          مثال: يساعد أصحاب المتاجر الصغيرة على إنشاء فيديوهات إعلانية بدون فريق مونتاج.
        </p>
        <textarea
          rows={3}
          value={formData.problemSolved}
          onChange={(e) => onChange('problemSolved', e.target.value)}
          placeholder="ما هو الألم أو العقبة التي تجعل العميل مستعداً لدفع المال لحلها الآن؟"
          className="w-full p-3 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none resize-none"
          required
        />
      </div>

      {/* Desired Outcome Question */}
      <div>
        <label className="block text-xs font-bold text-[#FCFCFA] mb-1.5">
          إيه النتيجة اللي العميل عايز يوصل لها؟ (Desired Outcome) <span className="text-[#F5BF1E]">*</span>
        </label>
        <p className="text-xs text-[#797979] mb-2">
          العميل لا يشتري "المنتج"، بل يشتري النسخة الأفضل من حياته أو أعماله بعد استخدامه.
        </p>
        <textarea
          rows={2}
          value={formData.desiredOutcome}
          onChange={(e) => onChange('desiredOutcome', e.target.value)}
          placeholder="مثال: مضاعفة المبيعات، توفير 10 ساعات عمل أسبوعياً، بناء متجر جاهز خلال يومين..."
          className="w-full p-3 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none resize-none"
          required
        />
      </div>

      {/* Audience Awareness Level */}
      <div>
        <label className="block text-xs font-bold text-[#FCFCFA] mb-2">
          مستوى وعي الجمهور المستهدف (Audience Awareness Level)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {awarenessLevels.map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              onClick={() => onChange('audienceAwareness', lvl.id)}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                formData.audienceAwareness === lvl.id
                  ? 'bg-[#F5BF1E]/15 border-[#F5BF1E] text-[#FCFCFA] shadow-md shadow-[#F5BF1E]/10'
                  : 'bg-[#040405] border-[#4A2F15] text-[#C8C5BA] hover:border-[#797979]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{lvl.labelAr}</span>
                <span className="text-[10px] text-[#797979] font-mono">{lvl.labelEn}</span>
              </div>
              <p className="text-[11px] text-[#797979] mt-1 leading-snug">{lvl.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
