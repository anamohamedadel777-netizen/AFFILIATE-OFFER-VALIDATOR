export type EvidenceClassification = 'VERIFIED' | 'INFERRED' | 'MISSING' | 'NEEDS_VERIFICATION';

export type CommissionType = 'percentage' | 'fixed' | 'recurring' | 'hybrid';

export type AudienceAwareness = 'cold' | 'problem_aware' | 'solution_aware' | 'product_aware' | 'unknown';

export type DecisionType = 'TEST' | 'VERIFY_FIRST' | 'HOLD';

export type RiskSeverity = 'low' | 'medium' | 'high';

export interface EvidenceSource {
  text: string;
  classification: EvidenceClassification;
}

export interface DimensionScore {
  id: string;
  titleAr: string;
  titleEn: string;
  score: number; // 0-10
  reason: string;
  evidenceSources: EvidenceSource[];
}

export interface StrengthItem {
  finding: string;
  whyItMatters: string;
  evidenceSource: string;
  classification: 'VERIFIED' | 'INFERRED';
}

export interface RiskItem {
  risk: string;
  whyItMatters: string;
  severity: RiskSeverity;
}

export interface ClaimsEvidenceItem {
  claim: string;
  evidenceStatus: 'yes' | 'partial' | 'no';
  evidenceExplanation: string;
}

export interface MarketingAngle {
  title: string;
  angleType: string;
  hook: string;
  coreMessage: string;
}

export interface ContentIdea {
  title: string;
  category: 'educational' | 'problem_aware' | 'comparison' | 'review' | 'buyer_intent';
  categoryAr: string;
  contentAngle: string;
  offerPlacement: string;
}

export interface AudienceFitMapData {
  audience: string;
  problem: string;
  desiredOutcome: string;
  offerPromise: string;
  alignmentScore: number;
  alignmentVerdict: string;
  mismatchNotes?: string;
}

export interface SalesPageEvaluation {
  strongestElement: string;
  weakestElement: string;
  mainPromise: string;
  mainObjectionHandled: string;
  mainObjectionNotHandled: string;
  ctaClarity: string;
  proofQuality: string;
  riskReversalQuality: string;
  potentialFriction: string;
}

export interface NextTestStep {
  stepNumber: number;
  actionTitle: string;
  description: string;
  metricToWatch: string;
}

export interface OfferAssessmentResult {
  productName: string;
  overallScore: number; // 0-100
  confidenceScore: number; // 0-100%
  categoryLabel: string;
  summary: string;
  dimensions: DimensionScore[];
  strengths: StrengthItem[];
  risks: RiskItem[];
  missingInformation: string[];
  questionsToVerify: string[];
  audienceFitMap: AudienceFitMapData;
  marketingAngles: MarketingAngle[];
  contentIdeas: ContentIdea[];
  salesPageAnalysis?: SalesPageEvaluation;
  claimsVsEvidence: ClaimsEvidenceItem[];
  nextTestPlan: NextTestStep[];
  decision: DecisionType;
  decisionReasons: [string, string, string];
  confidenceNotice?: string;
}

export interface OfferFormData {
  productName: string;
  productUrl: string;
  productPrice: string;
  commissionType: CommissionType;
  commissionValue: string;
  recurringFrequency: 'monthly' | 'annual' | 'other' | '';
  cookieDuration: string;
  refundPeriod: string;
  refundCancelsCommission: 'yes' | 'no' | 'unknown';
  problemSolved: string;
  desiredOutcome: string;
  targetAudience: string;
  audienceAwareness: AudienceAwareness;
  salesPageText: string;
  affiliateNetwork: string;
  payoutThreshold: string;
  payoutFrequency: string;
  paidAdsAllowed: 'yes' | 'no' | 'unknown';
  brandBiddingAllowed: 'yes' | 'no' | 'unknown';
  emailMarketingAllowed: 'yes' | 'no' | 'unknown';
  geoRestrictions: string;
  otherTerms: string;
}
