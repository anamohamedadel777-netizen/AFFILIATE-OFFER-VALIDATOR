import React from 'react';
import { PlayCircle, ArrowLeft, Layers, Compass, CheckCircle } from 'lucide-react';
import { MINI_COURSE_URL } from '../config/constants';

export const MiniCourseCTA: React.FC = () => {
  const isUrlAvailable = typeof MINI_COURSE_URL === 'string' && MINI_COURSE_URL.trim().length > 0;

  return (
    <div className="relative p-7 sm:p-10 rounded-3xl bg-gradient-to-br from-[#23170D] via-[#4A2F15]/40 to-[#040405] border border-[#F5BF1E]/40 shadow-2xl overflow-hidden text-right">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5BF1E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040405] border border-[#4A2F15] text-xs text-[#F5BF1E] font-bold">
          <PlayCircle className="w-3.5 h-3.5 text-[#F5BF1E]" />
          <span>MINI COURSE BRIDGE</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[#FCFCFA] leading-tight">
          اختيار الـOffer جزء واحد من السيستم
        </h3>

        <div className="text-sm sm:text-base text-[#C8C5BA] leading-relaxed space-y-3">
          <p>
            دلوقتي أنت عرفت إزاي تبص للعرض بشكل أذكى، وتفصل بين مجرد رقم العمولة وبين الجودة الحقيقية للعرض.
          </p>
          <p className="font-bold text-[#FCFCFA]">
            لكن الـOffer لوحده مش المشروع بالكامل:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 text-xs">
            <div className="p-3.5 rounded-xl bg-[#040405]/80 border border-[#23170D] space-y-1">
              <span className="font-bold text-[#FBD052] block">قبل العرض عندك:</span>
              <ul className="text-[#C8C5BA] space-y-1">
                <li>• <strong className="text-[#FCFCFA]">Market</strong> (السوق المناسب)</li>
                <li>• <strong className="text-[#FCFCFA]">Audience</strong> (الجمهور المستهدف بدقة)</li>
                <li>• <strong className="text-[#FCFCFA]">Problem</strong> (المشكلة الحقيقية الملحة)</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#040405]/80 border border-[#23170D] space-y-1">
              <span className="font-bold text-[#FBD052] block">وبعد العرض عندك:</span>
              <ul className="text-[#C8C5BA] space-y-1">
                <li>• <strong className="text-[#FCFCFA]">Message & Funnel</strong> (الرسالة ومسار التحويل)</li>
                <li>• <strong className="text-[#FCFCFA]">Traffic</strong> (استراتيجية جلب الزوار)</li>
                <li>• <strong className="text-[#FCFCFA]">Tracking & Learning</strong> (التتبع والتعلم المستمر)</li>
              </ul>
            </div>
          </div>

          <p>
            عشان كده عامل ميني كورس مجاني من 3 فيديوهات يوريك الصورة الكاملة لمنظومة التسويق بالعمولة وكيف تبني نظاماً حقيقياً ومستداماً.
          </p>
        </div>

        {/* CTA Button or Placeholder */}
        <div className="pt-2">
          {isUrlAvailable ? (
            <a
              href={MINI_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-black text-base shadow-lg shadow-[#F5BF1E]/20 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>ابدأ الميني كورس مجانًا</span>
              <ArrowLeft className="w-5 h-5" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#23170D] border border-[#4A2F15] text-xs text-[#797979]">
              <span className="w-2 h-2 rounded-full bg-[#797979]" />
              <span>سيتم إضافة رابط الميني كورس هنا قريباً</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
