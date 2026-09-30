import React from 'react';
import { FileSearch, CheckCircle2, XCircle, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { SalesPageEvaluation } from '../types';

interface SalesPageAnalysisProps {
  evaluation?: SalesPageEvaluation;
}

export const SalesPageAnalysis: React.FC<SalesPageAnalysisProps> = ({ evaluation }) => {
  if (!evaluation) return null;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-6 text-right">
      <div className="flex items-center justify-between border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              تشريح صفحة البيع (Sales Page Deep Dive)
            </h3>
            <p className="text-xs text-[#797979]">
              فحص العناصر الإقناعية ونقاط الاحتكاك التي تحسم قرار الشراء
            </p>
          </div>
        </div>
        <span className="text-xs text-[#797979]">
          مراجعة نصوص وعناصر الصفحة
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strongest element */}
        <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#FCFCFA] block mb-1">
              أقوى عنصر في الصفحة (Strongest Element):
            </span>
            <p className="text-[#C8C5BA] leading-relaxed">
              {evaluation.strongestElement || 'العنوان الرئيسي واضح ويحدد المستفيد.'}
            </p>
          </div>
        </div>

        {/* Weakest element */}
        <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3">
          <XCircle className="w-4 h-4 text-[#A7690C] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#FCFCFA] block mb-1">
              أضعف حلقة في الصفحة (Weakest Element):
            </span>
            <p className="text-[#C8C5BA] leading-relaxed">
              {evaluation.weakestElement || 'غياب تفاصيل كافية حول سياسة الإلغاء أو الضمان.'}
            </p>
          </div>
        </div>

        {/* Main Promise */}
        <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#FBD052] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#FCFCFA] block mb-1">
              الوعد الرئيسي (Main Promise):
            </span>
            <p className="text-[#C8C5BA] leading-relaxed">
              {evaluation.mainPromise || 'مساعدة العميل على حل المشكلة بأقل مجهود وتكلفة.'}
            </p>
          </div>
        </div>

        {/* Handled objection */}
        <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#FCFCFA] block mb-1">
              اعتراض تم التعامل معه بنجاح:
            </span>
            <p className="text-[#C8C5BA] leading-relaxed">
              {evaluation.mainObjectionHandled || 'اعتراض صعوبة الاستخدام أو الوقت المستغرق.'}
            </p>
          </div>
        </div>

        {/* Unhandled objection */}
        <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-[#797979] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#FCFCFA] block mb-1">
              اعتراض جوهري أهملته الصفحة:
            </span>
            <p className="text-[#C8C5BA] leading-relaxed">
              {evaluation.mainObjectionNotHandled || 'ماذا يحدث لو لم يحقق المنتج النتيجة المرجوة؟'}
            </p>
          </div>
        </div>

        {/* Risk reversal */}
        <div className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-[#FCFCFA] block mb-1">
              عكس المخاطرة والضمان (Risk Reversal):
            </span>
            <p className="text-[#C8C5BA] leading-relaxed">
              {evaluation.riskReversalQuality || 'مستوى الضمان ووضوح الشروط للعميل.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
