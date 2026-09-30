import React, { useState } from 'react';
import { Globe, ArrowRight, AlertTriangle, CheckCircle, FileText, Loader2 } from 'lucide-react';

interface URLAnalyzerProps {
  url: string;
  onUrlChange: (url: string) => void;
  onContentFetched: (title: string, content: string) => void;
  salesPageText: string;
  onSalesPageTextChange: (text: string) => void;
  onSwitchToManual: () => void;
}

export const URLAnalyzer: React.FC<URLAnalyzerProps> = ({
  url,
  onUrlChange,
  onContentFetched,
  salesPageText,
  onSalesPageTextChange,
  onSwitchToManual
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setFetchError(null);
    setFetchSuccess(null);

    try {
      const response = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFetchError(data.error || 'مش قادر أقرأ محتوى الصفحة مباشرة.');
      } else {
        setFetchSuccess(`تم قراءة الصفحة بنجاح! تم استخراج محتوى نصي بجودة عالية.`);
        onContentFetched(data.title || '', data.content || '');
      }
    } catch (err: any) {
      setFetchError('مش قادر أقرأ محتوى الصفحة مباشرة. تعذر الاتصال بالخادم.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* URL input field */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl">
        <label className="block text-sm font-bold text-[#FCFCFA] mb-2">
          رابط المنتج أو Sales Page (صفحة البيع)
        </label>
        <p className="text-xs text-[#C8C5BA] mb-4">
          أدخل رابط صفحة الهبوط أو صفحة البيع المتاحة للجمهور لقراءة محتواها وتحليل العرض مباشرة.
        </p>

        <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797979]" />
            <input
              type="url"
              dir="ltr"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://example.com/product"
              className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none focus:ring-1 focus:ring-[#F5BF1E] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-bold text-sm hover:shadow-lg hover:shadow-[#F5BF1E]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري قراءة الصفحة...</span>
              </>
            ) : (
              <>
                <span>حلل الرابط</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </form>

        {/* Success indicator */}
        {fetchSuccess && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#F5BF1E]/10 border border-[#F5BF1E]/30 text-xs text-[#FBD052] flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 shrink-0 text-[#F5BF1E]" />
            <span>{fetchSuccess} يمكنك مراجعة وتعديل النص بالأسفل قبل بدء الفحص.</span>
          </div>
        )}

        {/* Fallback state when URL retrieval fails */}
        {fetchError && (
          <div className="mt-4 p-4 rounded-xl bg-[#4A2F15]/40 border border-[#A7690C]/50 text-right space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#F5BF1E] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#FCFCFA]">{fetchError}</p>
                <p className="text-xs text-[#C8C5BA] mt-1">
                  بعض المواقع تمنع القراءة الآلية أو تعتمد على الحماية والتشفير. لن نقوم بتخمين أي بيانات من عندنا!
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#4A2F15]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#FBD052] font-medium">
                الحل البسيط: انسخ نص صفحة البيع والصقه بالأسفل للمتابعة فوراً.
              </span>
              <button
                type="button"
                onClick={onSwitchToManual}
                className="text-xs text-[#C8C5BA] underline hover:text-[#FCFCFA] cursor-pointer"
              >
                أو انتقل للإدخال اليدوي الكامل
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sales Page copy textarea (always editable and active) */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-[#FCFCFA] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#F5BF1E]" />
            <span>الصق نص Sales Page (صفحة البيع)</span>
          </label>
          {salesPageText && (
            <span className="text-xs text-[#797979]">
              {salesPageText.length} حرف
            </span>
          )}
        </div>
        <p className="text-xs text-[#C8C5BA] mb-3">
          يشمل العنوان الرئيسي، الوعد، المشكلة، المميزات، الإثباتات والشهادات، الضمان، والسعر.
        </p>

        <textarea
          rows={6}
          value={salesPageText}
          onChange={(e) => onSalesPageTextChange(e.target.value)}
          placeholder="الصق هنا نص صفحة البيع أو فقرات العرض الأساسية لتقييم جودة الـ Copywriting ومطابقة الوعود بالأدلة..."
          className="w-full p-4 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none focus:ring-1 focus:ring-[#F5BF1E] transition-all resize-y"
        />
      </div>
    </div>
  );
};
