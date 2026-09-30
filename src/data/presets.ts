import { OfferFormData } from '../types';

export const SAMPLE_PRESETS: { title: string; subtitle: string; data: OfferFormData }[] = [
  {
    title: "أداة AI لصناع محتوى المتاجر (SaaS)",
    subtitle: "اشتراك شهري $49 بعمولة متكررة 30%",
    data: {
      productName: "ShopVideo AI",
      productUrl: "https://example.com/shopvideo",
      productPrice: "$49 / شهر",
      commissionType: "recurring",
      commissionValue: "30%",
      recurringFrequency: "monthly",
      cookieDuration: "60 يوم",
      refundPeriod: "14 يوم تجربة مجانية بدون بطاقة ائتمان",
      refundCancelsCommission: "yes",
      problemSolved: "أصحاب المتاجر الإلكترونية الصغيرة ينفقون ساعات وأموالاً طائلة لإنتاج فيديوهات إعلانية لتيك توك وإنستجرام بدون نتائج واضحة، ولا يملكون ميزانية لتوظيف مصمم فيديو محترف.",
      desiredOutcome: "إنشاء 20 فيديو إعلاني عالي الجودة لمنتجات المتجر في دقائق معدودة جاهزة للنشر بنقرة زر واحدة وزيادة مبيعات المتجر.",
      targetAudience: "أصحاب المتاجر الإلكترونية الصغيرة والمتوسطة (Shopify / Salla / Zid) الذين يديرون إعلاناتهم بأنفسهم ولديهم كتالوج منتجات جاهز لكن يفتقرون لفريق ميديا.",
      audienceAwareness: "problem_aware",
      salesPageText: `Headline: حول صور منتجاتك إلى فيديوهات إعلانية فيروسية تحقق مبيعات خلال 60 ثانية باستخدام الذكاء الاصطناعي.
Promise: وفّر أكثر من 1500 دولار شهرياً من تكاليف المونتير والمصمم.
Proof: أكثر من 4,200 متجر إلكتروني يستخدم الأداة شهرياً. متوسط زيادة المبيعات 34%.
Features: قوالب جاهزة لتيك توك وريلز، تعليق صوتي بالذكاء الاصطناعي بلهجات عربية متعددة، تكامل مباشر مع شوبيفاي وسلة وزد.
Guarantee: ضمان استرداد الأموال لمدة 14 يوماً بدون أسئلة.
Pricing: باقة البداية 49 دولار شهرياً، الباقة الاحترافية 99 دولار شهرياً.
Call To Action: ابدأ تجربتك المجانية لمدة 7 أيام الآن.`,
      affiliateNetwork: "FirstPromoter / مستقل",
      payoutThreshold: "$100",
      payoutFrequency: "شهري في الأول من كل شهر عبر PayPal أو التحويل البنكي",
      paidAdsAllowed: "yes",
      brandBiddingAllowed: "no",
      emailMarketingAllowed: "yes",
      geoRestrictions: "متاح لجميع الدول العربية والعالم",
      otherTerms: "ممنوع استخدام اسم البراند المباشر في إعلانات جوجل سيرش، ويشترط ألا يتم عمل إعلانات مضللة."
    }
  },
  {
    title: "برنامج تدريبي مكثف في التجارة الإلكترونية",
    subtitle: "منتج رقمي $497 بعمولة 40% لمرة واحدة",
    data: {
      productName: "E-Commerce Masterclass Pro",
      productUrl: "https://example.com/masterclass",
      productPrice: "$497 لمرة واحدة",
      commissionType: "percentage",
      commissionValue: "40%",
      recurringFrequency: "",
      cookieDuration: "30 يوم",
      refundPeriod: "30 يوم بشرط إثبات التطبيق",
      refundCancelsCommission: "yes",
      problemSolved: "المبتدئون يتخبطون بين مئات الفيديوهات المجانية المتناثرة ويخسرون ميزانياتهم الإعلانية بسبب غياب خارطة طريق تنفيذية واضحة ومنظومة متكاملة لاختيار المنتجات.",
      desiredOutcome: "بناء متجر إلكتروني رابح خطوة بخطوة من الصفر حتى أول 100 طلب مع قوالب جاهزة ومتابعة أسبوعية في مجتمع خاص.",
      targetAudience: "موظفون ورواد أعمال يبحثون عن مصدر دخل إضافي جاد ولديهم ميزانية استثمار أولية بين 500 إلى 2000 دولار للبدء في التجارة الإلكترونية.",
      audienceAwareness: "solution_aware",
      salesPageText: `Headline: نظام بناء متجر إلكتروني مستدام بدون مخاطرة حرق الميزانية في منتجات خاسرة.
Promise: خلال 6 أسابيع ستتعلم كيف تختار المنتج الرابح، تبني المتجر، وتطلق أول حملة إعلانية ناجحة.
Proof: دراسات حالة موثقة بالفيديو مع طلاب حققوا أكثر من 50,000 دولار في أول سنة، تقييم 4.9 من 5 على Trustpilot.
Guarantee: ضمان استرجاع 30 يوماً مشروط بإتمام المهام العملية.
Price: 497 دولار مع إمكانية التقسيط على 3 دفعات.
CTA: انضم للدفعة الجديدة (الأماكن محدودة).`,
      affiliateNetwork: "Kajabi / Stripe",
      payoutThreshold: "$150",
      payoutFrequency: "كل 15 يوم بعد انقضاء فترة الاسترجاع",
      paidAdsAllowed: "unknown",
      brandBiddingAllowed: "no",
      emailMarketingAllowed: "yes",
      geoRestrictions: "الشرق الأوسط وشمال أفريقيا",
      otherTerms: "تُلغى العمولة بالكامل في حال استرداد العميل للمبلغ خلال فترة الـ 30 يوماً."
    }
  }
];
