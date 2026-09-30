import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InputModeSelector } from './components/InputModeSelector';
import { URLAnalyzer } from './components/URLAnalyzer';
import { ManualOfferForm } from './components/ManualOfferForm';
import { AudienceForm } from './components/AudienceForm';
import { AffiliateTermsForm } from './components/AffiliateTermsForm';
import { AnalysisProgress } from './components/AnalysisProgress';
import { ResultHero } from './components/ResultHero';
import { DecisionPanel } from './components/DecisionPanel';
import { ScoreBreakdown } from './components/ScoreBreakdown';
import { StrengthsPanel } from './components/StrengthsPanel';
import { RiskPanel } from './components/RiskPanel';
import { MissingInfoPanel } from './components/MissingInfoPanel';
import { VerificationQuestions } from './components/VerificationQuestions';
import { AudienceFitMap } from './components/AudienceFitMap';
import { MarketingAngles } from './components/MarketingAngles';
import { ContentIdeas } from './components/ContentIdeas';
import { SalesPageAnalysis } from './components/SalesPageAnalysis';
import { ClaimsEvidenceTable } from './components/ClaimsEvidenceTable';
import { NextTestPlan } from './components/NextTestPlan';
import { ShareableCard } from './components/ShareableCard';
import { RBTLSFramework } from './components/RBTLSFramework';
import { MiniCourseCTA } from './components/MiniCourseCTA';
import { Footer } from './components/Footer';
import { OfferFormData, OfferAssessmentResult } from './types';
import { Sparkles, ArrowDown, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

const initialFormData: OfferFormData = {
  productName: '',
  productUrl: '',
  productPrice: '',
  commissionType: 'percentage',
  commissionValue: '',
  recurringFrequency: '',
  cookieDuration: '30 يوم',
  refundPeriod: '30 يوم',
  refundCancelsCommission: 'yes',
  problemSolved: '',
  desiredOutcome: '',
  targetAudience: '',
  audienceAwareness: 'problem_aware',
  salesPageText: '',
  affiliateNetwork: '',
  payoutThreshold: '',
  payoutFrequency: '',
  paidAdsAllowed: 'unknown',
  brandBiddingAllowed: 'unknown',
  emailMarketingAllowed: 'unknown',
  geoRestrictions: '',
  otherTerms: '',
};

export default function App() {
  const [mode, setMode] = useState<'url' | 'manual'>('url');
  const [formData, setFormData] = useState<OfferFormData>(initialFormData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<OfferAssessmentResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const handleFieldChange = (field: keyof OfferFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartClick = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPreset = (presetData: OfferFormData) => {
    setFormData(presetData);
    setMode('manual');
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUrlContentFetched = (title: string, content: string) => {
    setFormData((prev) => ({
      ...prev,
      productName: prev.productName || title || 'منتج مستخرج من الرابط',
      salesPageText: content,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
    setAnalysisError(null);
    setMode('url');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      setAnalysisError('يرجى كتابة اسم المنتج أو العرض للبدء بالتحليل.');
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!formData.problemSolved.trim() && !formData.salesPageText.trim()) {
      setAnalysisError('يرجى توضيح المشكلة التي يحلها المنتج أو لصق نص صفحة البيع.');
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'تعذر إكمال التحليل، حاول مرة أخرى.');
      }

      setResult(data);
      // Wait for DOM update then scroll to result
      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setAnalysisError(err.message || 'تعذر إكمال التحليل، حاول مرة أخرى.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040405] text-[#FCFCFA] flex flex-col selection:bg-[#F5BF1E]/30 selection:text-[#FBD052]">
      {/* Top Header */}
      <Header onReset={handleReset} hasResult={!!result} />

      {/* Hero Section */}
      <Hero onStartClick={handleStartClick} onSelectPreset={handleSelectPreset} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Form Anchor */}
        <div ref={formSectionRef} className="scroll-mt-24 space-y-8">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#FCFCFA]">
              بيانات فحص العرض (Offer Input)
            </h2>
            <p className="text-xs sm:text-sm text-[#C8C5BA]">
              كلما كانت مدخلاتك أكثر دقة، كان التحليل واقعياً ومحايداً بدون أي تخمينات زائفة.
            </p>
          </div>

          {/* Mode Selector */}
          <InputModeSelector mode={mode} onModeChange={setMode} />

          {/* Error Banner */}
          {analysisError && (
            <div className="p-4 rounded-xl bg-[#4A2F15]/80 border border-[#F5BF1E]/50 text-right flex items-start gap-3 text-xs sm:text-sm text-[#FBD052]">
              <AlertTriangle className="w-5 h-5 shrink-0 text-[#F5BF1E]" />
              <div>
                <span className="font-bold block text-[#FCFCFA]">تنبيه في البيانات:</span>
                <span>{analysisError}</span>
              </div>
            </div>
          )}

          {/* Input Form Fields */}
          <form onSubmit={handleAnalyze} className="space-y-6">
            {mode === 'url' ? (
              <URLAnalyzer
                url={formData.productUrl}
                onUrlChange={(url) => handleFieldChange('productUrl', url)}
                onContentFetched={handleUrlContentFetched}
                salesPageText={formData.salesPageText}
                onSalesPageTextChange={(text) => handleFieldChange('salesPageText', text)}
                onSwitchToManual={() => setMode('manual')}
              />
            ) : null}

            {/* Core Offer & Commission Data */}
            <ManualOfferForm formData={formData} onChange={handleFieldChange} />

            {/* Audience & Problem Alignment Data */}
            <AudienceForm formData={formData} onChange={handleFieldChange} />

            {/* If in manual mode, show sales page copy textarea if user wants to add it */}
            {mode === 'manual' && (
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl text-right space-y-2">
                <label className="text-sm font-bold text-[#FCFCFA] block">
                  نص صفحة البيع أو فقرات العرض (اختياري ولكن يُفضل لتدقيق الادعاءات)
                </label>
                <textarea
                  rows={4}
                  value={formData.salesPageText}
                  onChange={(e) => handleFieldChange('salesPageText', e.target.value)}
                  placeholder="الصق نصوص صفحة البيع الرئيسية، المميزات، الضمانات، أو فقرات التسويق..."
                  className="w-full p-3.5 rounded-xl bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] text-sm text-[#FCFCFA] placeholder-[#797979] focus:outline-none"
                />
              </div>
            )}

            {/* Optional Affiliate Program Terms */}
            <AffiliateTermsForm formData={formData} onChange={handleFieldChange} />

            {/* Primary Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full sm:w-auto min-w-[280px] px-10 py-4 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-black text-lg shadow-xl shadow-[#F5BF1E]/20 hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 text-[#040405]" />
                <span>{isAnalyzing ? 'جاري تحليل العرض...' : 'حلل العرض'}</span>
              </button>
              <p className="text-xs text-[#797979] mt-3">
                لن يتم تخمين أي بيانات غائبة • تقييم جودة محايد 100%
              </p>
            </div>
          </form>
        </div>

        {/* Loading Overlay Animation */}
        <AnalysisProgress isLoading={isAnalyzing} />

        {/* Results Container */}
        {result && (
          <div ref={resultSectionRef} className="scroll-mt-24 pt-16 space-y-8">
            {/* 1. Result Hero Score Card */}
            <ResultHero result={result} />

            {/* 2. Next Step Decision Panel (TEST / VERIFY FIRST / HOLD) */}
            <DecisionPanel
              decision={result.decision}
              reasons={result.decisionReasons}
            />

            {/* 3. 8-Dimensions Score Breakdown */}
            <ScoreBreakdown dimensions={result.dimensions} />

            {/* 4. Top Strengths & Main Risks side-by-side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StrengthsPanel strengths={result.strengths} />
              <RiskPanel risks={result.risks} />
            </div>

            {/* 5. Missing Information & Questions to Verify */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MissingInfoPanel missingItems={result.missingInformation} />
              <VerificationQuestions questions={result.questionsToVerify} />
            </div>

            {/* 6. Audience Fit Map */}
            <AudienceFitMap fitMap={result.audienceFitMap} />

            {/* 7. 3 Marketing Angles */}
            <MarketingAngles angles={result.marketingAngles} />

            {/* 8. 5 Content Ideas */}
            <ContentIdeas ideas={result.contentIdeas} />

            {/* 9. Sales Page Analysis (if present) */}
            {result.salesPageAnalysis && (
              <SalesPageAnalysis evaluation={result.salesPageAnalysis} />
            )}

            {/* 10. Claims vs Evidence Table */}
            {result.claimsVsEvidence && result.claimsVsEvidence.length > 0 && (
              <ClaimsEvidenceTable claims={result.claimsVsEvidence} />
            )}

            {/* 11. Low-Risk Next Test Plan */}
            <NextTestPlan steps={result.nextTestPlan} />

            {/* 12. Screenshot-Friendly Shareable Card */}
            <ShareableCard result={result} />

            {/* 13. RBTLS Framework */}
            <RBTLSFramework />

            {/* 14. Mini Course Bridge CTA */}
            <MiniCourseCTA />

            {/* Reset / Analyze Another Button */}
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#23170D] border border-[#4A2F15] hover:border-[#F5BF1E]/60 text-sm font-bold text-[#FCFCFA] hover:text-[#FBD052] transition-all cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>حلل عرض جديد</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
