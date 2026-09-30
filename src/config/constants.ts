/**
 * Centralized Configuration for Affiliate Offer Validator
 * Brand: Mohamed Adel
 */

// Mini Course URL configuration
// If empty or null, the CTA will be disabled and will show "سيتم إضافة رابط الميني كورس هنا"
export const MINI_COURSE_URL: string = "";

export const BRAND_CONFIG = {
  name: "Mohamed Adel",
  nameAr: "محمد عادل",
  taglineEn: "Affiliate Marketing Is a System, Not a Link.",
  taglineAr: "التسويق بالعمولة نظام… مش مجرد رابط.",
  philosophy: "العمولة العالية وحدها لا تعني إن العرض جيد.",
  heroHeadline: "قبل ما تسوّق أي Offer…",
  heroHighlight: "افحصه الأول",
};

export const RBTLS_FRAMEWORK = [
  { letter: "R", titleEn: "Research", titleAr: "ابحث", desc: "تقييم العرض، دراسة السوق، فحص المشكلة والجمهور", isCurrent: true },
  { letter: "B", titleEn: "Build", titleAr: "ابنِ", desc: "بناء مسار التحويل وصفحات الهبوط والأصول التسويقية", isCurrent: false },
  { letter: "T", titleEn: "Traffic", titleAr: "اجلب الترافيك", desc: "توجيه الزوار المؤهلين عبر القنوات المناسبة", isCurrent: false },
  { letter: "L", titleEn: "Learn", titleAr: "تعلم", desc: "تحليل البيانات، نسبة النقر، ومعدلات التحويل", isCurrent: false },
  { letter: "S", titleEn: "Scale", titleAr: "وسع", desc: "مضاعفة ما ثبت نجاحه فقط بالأرقام والأدلة", isCurrent: false },
];

export const DIMENSIONS_META = [
  { id: "audienceFit", titleAr: "ملاءمة الجمهور", titleEn: "Audience Fit", weight: 10 },
  { id: "problemStrength", titleAr: "قوة المشكلة", titleEn: "Problem Strength", weight: 10 },
  { id: "offerClarity", titleAr: "وضوح العرض", titleEn: "Offer Clarity", weight: 10 },
  { id: "salesPageQuality", titleAr: "جودة صفحة البيع", titleEn: "Sales Page Quality", weight: 10 },
  { id: "trustProof", titleAr: "الثقة والأدلة", titleEn: "Trust & Proof", weight: 10 },
  { id: "affiliateEconomics", titleAr: "اقتصاديات الأفلييت", titleEn: "Affiliate Economics", weight: 10 },
  { id: "programQuality", titleAr: "جودة برنامج الأفلييت", titleEn: "Affiliate Program Quality", weight: 10 },
  { id: "riskFriction", titleAr: "المخاطر والاحتكاك", titleEn: "Risk & Friction", weight: 10 },
];

export const SCORE_CATEGORIES = [
  { min: 0, max: 39, label: "بيانات أو أساس العرض يحتاج مراجعة كبيرة", colorClass: "text-[#C8C5BA]" },
  { min: 40, max: 59, label: "العرض يحتاج تحقق وتحسين قبل اختبار جاد", colorClass: "text-[#A7690C]" },
  { min: 60, max: 74, label: "العرض يستحق دراسة واختبار محدود", colorClass: "text-[#F5BF1E]" },
  { min: 75, max: 89, label: "مؤشرات العرض قوية نسبيًا — اختبره ببيانات حقيقية", colorClass: "text-[#FBD052]" },
  { min: 90, max: 100, label: "العرض واضح وقوي بناءً على المعلومات المتاحة — لكن ما زال يحتاج اختبار سوق فعلي", colorClass: "text-[#FBD052]" },
];

export function getCategoryLabel(score: number): string {
  const cat = SCORE_CATEGORIES.find(c => score >= c.min && score <= c.max);
  return cat ? cat.label : "العرض يستحق دراسة واختبار محدود";
}
