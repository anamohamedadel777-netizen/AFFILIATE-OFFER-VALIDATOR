import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { OfferFormData, OfferAssessmentResult, DimensionScore } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

/**
 * SSRF & Security validation for URL fetching
 */
function isSafePublicUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const host = parsed.hostname.toLowerCase();

    // Block localhost, link-local, loopbacks
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      host.endsWith('.arpa')
    ) {
      return false;
    }

    // Block private IPv4 ranges: 10.x, 172.16-31.x, 192.168.x, 169.254.x
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = host.match(ipv4Regex);
    if (match) {
      const b1 = parseInt(match[1], 10);
      const b2 = parseInt(match[2], 10);
      if (b1 === 10) return false;
      if (b1 === 172 && b2 >= 16 && b2 <= 31) return false;
      if (b1 === 192 && b2 === 168) return false;
      if (b1 === 169 && b2 === 254) return false;
      if (b1 === 127) return false;
      if (b1 === 0) return false;
    }

    // Block cloud metadata addresses
    if (host.includes('metadata.google.internal') || host.includes('169.254.169.254')) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Simple HTML text cleaner for public sales pages
 */
function cleanHtmlText(html: string): { title: string; text: string } {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Remove script, style, noscript, svg, nav, footer, form tags and their contents
  let stripped = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  // Replace block tags with newlines
  stripped = stripped.replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|tr|section|article)>/gi, '\n');
  // Strip remaining HTML tags
  stripped = stripped.replace(/<[^>]+>/g, ' ');
  // Unescape basic entities
  stripped = stripped
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Clean extra whitespace
  const clean = stripped
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  // Limit to 12,000 characters to keep analysis fast and focused
  const truncated = clean.slice(0, 12000);

  return { title, text: truncated };
}

/**
 * Route: /api/fetch-url
 * Secure public URL content retrieval with strict fallback
 */
app.post('/api/fetch-url', async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'الرجاء إدخال رابط صحيح.' });
  }

  const trimmedUrl = url.trim();
  if (!isSafePublicUrl(trimmedUrl)) {
    return res.status(422).json({
      error: 'مش قادر أقرأ محتوى الصفحة مباشرة. الرابط غير مسموح به أو خاص.',
      allowManual: true
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(trimmedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 AffiliateOfferValidator/1.0',
        'Accept': 'text/html,application/xhtml+xml,text/plain;q=0.9',
        'Accept-Language': 'ar,en-US,en;q=0.9',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(422).json({
        error: `مش قادر أقرأ محتوى الصفحة مباشرة (كود الاستجابة: ${response.status}).`,
        allowManual: true
      });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text') && !contentType.includes('html')) {
      return res.status(422).json({
        error: 'مش قادر أقرأ محتوى الصفحة مباشرة، نوع الملف غير نصي.',
        allowManual: true
      });
    }

    const rawHtml = await response.text();
    const cleaned = cleanHtmlText(rawHtml);

    if (!cleaned.text || cleaned.text.length < 50) {
      return res.status(422).json({
        error: 'مش قادر أقرأ محتوى الصفحة مباشرة (الصفحة لا تحتوي على نصوص كافية أو تعتمد على JavaScript بالكامل).',
        allowManual: true
      });
    }

    return res.json({
      title: cleaned.title,
      content: cleaned.text,
      url: trimmedUrl
    });
  } catch (err: any) {
    return res.status(422).json({
      error: 'مش قادر أقرأ محتوى الصفحة مباشرة. قد تكون الصفحة محمية أو تستغرق وقتاً طويلاً.',
      allowManual: true
    });
  }
});

/**
 * Deterministic completeness calculation for Analysis Confidence (0-100%)
 */
function calculateDeterministicConfidence(formData: OfferFormData): { confidence: number; filledCount: number; notice?: string } {
  let score = 0;
  let filledCount = 0;

  // 1. Audience (15 pts)
  if (formData.targetAudience && formData.targetAudience.trim().length >= 10) {
    score += 15;
    filledCount++;
  } else if (formData.targetAudience?.trim()) {
    score += 8;
  }

  // 2. Problem (15 pts)
  if (formData.problemSolved && formData.problemSolved.trim().length >= 10) {
    score += 15;
    filledCount++;
  } else if (formData.problemSolved?.trim()) {
    score += 8;
  }

  // 3. Desired Outcome (10 pts)
  if (formData.desiredOutcome && formData.desiredOutcome.trim().length >= 5) {
    score += 10;
    filledCount++;
  }

  // 4. Product Price (10 pts)
  if (formData.productPrice && formData.productPrice.trim().length > 0) {
    score += 10;
    filledCount++;
  }

  // 5. Commission info (10 pts)
  if (formData.commissionValue && formData.commissionValue.trim().length > 0) {
    score += 10;
    filledCount++;
  }

  // 6. Sales page copy (20 pts)
  if (formData.salesPageText && formData.salesPageText.trim().length > 150) {
    score += 20;
    filledCount++;
  } else if (formData.salesPageText && formData.salesPageText.trim().length > 30) {
    score += 10;
    filledCount++;
  }

  // 7. Refund policy (10 pts)
  if (formData.refundPeriod && formData.refundPeriod.trim().length > 0 && !formData.refundPeriod.includes('غير معروف')) {
    score += 5;
    filledCount++;
  }
  if (formData.refundCancelsCommission !== 'unknown') {
    score += 5;
    filledCount++;
  }

  // 8. Cookie Duration (5 pts)
  if (formData.cookieDuration && formData.cookieDuration.trim().length > 0 && !formData.cookieDuration.includes('غير معروف')) {
    score += 5;
    filledCount++;
  }

  // 9. Affiliate program terms (5 pts)
  if (
    (formData.affiliateNetwork && formData.affiliateNetwork.trim().length > 0) ||
    formData.paidAdsAllowed !== 'unknown' ||
    formData.brandBiddingAllowed !== 'unknown' ||
    (formData.payoutThreshold && formData.payoutThreshold.trim().length > 0)
  ) {
    score += 5;
    filledCount++;
  }

  const confidence = Math.min(100, Math.max(10, score));
  return { confidence, filledCount };
}

/**
 * Route: /api/analyze-offer
 * Evidence-based Affiliate Offer Validator
 */
app.post('/api/analyze-offer', async (req: Request, res: Response) => {
  const formData: OfferFormData = req.body;

  if (!formData.productName || !formData.productName.trim()) {
    return res.status(400).json({ error: 'الرجاء إدخال اسم المنتج أو العرض.' });
  }

  // Calculate deterministic confidence
  const { confidence } = calculateDeterministicConfidence(formData);

  // System instruction as per user specification
  const systemInstruction = `You are an evidence-based affiliate offer analyst.
Your job is not to predict earnings.
Evaluate only the information supplied.
Separate verified facts from inference.
Never invent missing information.
When evidence is insufficient, say so.
Assess offer quality, audience alignment, risk, clarity, proof, affiliate economics, and program transparency.
Be commercially useful, skeptical, fair, and specific.
Avoid generic advice.

IMPORTANT SAFETY & HONESTY RULE:
Never say:
"هذا العرض مربح."
"هذا العرض سيكسبك."
"فرصة مضمونة."
"هذا المنتج سيحقق مبيعات."

Instead use objective, evidence-based language such as:
"العرض يبدو قويًا في..."
"هناك إشارات إيجابية في..."
"هناك مخاطر تحتاج إلى التحقق منها."
"البيانات الحالية غير كافية للحكم على..."
"العرض يستحق اختبارًا أوليًا."
"قبل التنفيذ، تحقق من..."

Primary language: Arabic (Egyptian/Gulf/standard friendly, professional, practical).
Whenever important English marketing terms appear, provide Arabic meaning immediately (e.g. Offer (العرض), Audience Fit (ملاءمة الجمهور), Commission (العمولة), Refund Policy (سياسة الاسترجاع), Sales Page (صفحة البيع), Cookie Duration (مدة التتبع), Conversion Rate (معدل التحويل), Proof (الدليل), Risk (المخاطر)).

For every important finding or evidence item, classify it as one of:
- "VERIFIED": مؤكد من البيانات المرفقة
- "INFERRED": استنتاج منطقي من السياق
- "MISSING": معلومة ناقصة
- "NEEDS_VERIFICATION": يحتاج تحقق من صاحب العرض

You MUST evaluate the offer across 8 specific dimensions, scoring each strictly from 0 to 10:
1. audienceFit (ملاءمة الجمهور)
2. problemStrength (قوة المشكلة)
3. offerClarity (وضوح العرض)
4. salesPageQuality (جودة صفحة البيع)
5. trustProof (الثقة والأدلة)
6. affiliateEconomics (اقتصاديات الأفلييت)
7. programQuality (جودة برنامج الأفلييت)
8. riskFriction (المخاطر والاحتكاك)

Also determine the decision out of 3 options:
- "TEST": اختبر (Enough information exists and major dimensions show reasonable alignment for a low-risk test)
- "VERIFY_FIRST": تحقق أولًا (Potential exists but important terms or information are missing)
- "HOLD": توقف مؤقتًا (Clear mismatch or major risk appears in supplied data)
Provide exactly 3 clear, evidence-based reasons for this decision.`;

  // Build the user prompt with all available fields clearly delineated
  const promptData = `
بيانات العرض المُقدمة للتحليل:
===================================
اسم المنتج/العرض (Product Name): ${formData.productName || 'غير محدد'}
رابط المنتج (Product URL): ${formData.productUrl || 'غير متوفر'}
سعر المنتج (Product Price): ${formData.productPrice || 'غير متوفر / غير محدد'}
نوع العمولة (Commission Type): ${formData.commissionType || 'غير محدد'}
قيمة العمولة (Commission Value): ${formData.commissionValue || 'غير متوفر'}
تكرار العمولة (Recurring Frequency): ${formData.recurringFrequency || 'غير متكرر / غير محدد'}
مدة التتبع (Cookie Duration): ${formData.cookieDuration || 'غير معروف'}
فترة الاسترجاع (Refund Period): ${formData.refundPeriod || 'غير محدد'}
هل الاسترجاع يلغي العمولة؟ (Refund cancels commission?): ${formData.refundCancelsCommission}

المشكلة الأساسية التي يحلها (Problem Solved):
${formData.problemSolved || 'لم يتم إدخالها'}

النتيجة المرغوبة للعميل (Desired Outcome):
${formData.desiredOutcome || 'لم يتم إدخالها'}

الجمهور المستهدف (Target Audience):
${formData.targetAudience || 'لم يتم إدخاله'}

مستوى وعي الجمهور (Audience Awareness):
${formData.audienceAwareness || 'غير معروف'}

نص صفحة البيع (Sales Page Content):
${formData.salesPageText ? formData.salesPageText.slice(0, 8000) : 'غير متوفر (لم يتم توفير نص صفحة البيع)'}

بيانات برنامج الأفلييت الإضافية:
شبكة الأفلييت: ${formData.affiliateNetwork || 'غير محدد'}
الحد الأدنى للسحب (Payout Threshold): ${formData.payoutThreshold || 'غير معروف'}
موعد الصرف (Payout Frequency): ${formData.payoutFrequency || 'غير معروف'}
هل الإعلانات الممولة مسموحة؟ (Paid Ads): ${formData.paidAdsAllowed}
هل المزايدة على اسم البراند مسموحة؟ (Brand Bidding): ${formData.brandBiddingAllowed}
هل التسويق بالبريد مسموح؟ (Email Marketing): ${formData.emailMarketingAllowed}
قيود جغرافية (Geo Restrictions): ${formData.geoRestrictions || 'غير معروف'}
شروط أخرى: ${formData.otherTerms || 'لا يوجد'}
===================================

قم بالتحليل الدقيق والمحايد بناءً على ما سبق فقط. لا تخترع بيانات غير مذكورة.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptData,
      config: {
        systemInstruction,
        temperature: 0.2, // low temperature for analytical accuracy and stability
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: [
            'summary',
            'audienceFit',
            'problemStrength',
            'offerClarity',
            'salesPageQuality',
            'trustProof',
            'affiliateEconomics',
            'programQuality',
            'riskFriction',
            'strengths',
            'risks',
            'missingInformation',
            'questionsToVerify',
            'audienceFitMap',
            'marketingAngles',
            'contentIdeas',
            'claimsVsEvidence',
            'nextTestPlan',
            'decision',
            'decisionReasons'
          ],
          properties: {
            summary: {
              type: Type.STRING,
              description: 'Concise, sharp analytical summary in Arabic (Egyptian-friendly), avoiding generic praise.'
            },
            audienceFit: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            problemStrength: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            offerClarity: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            salesPageQuality: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            trustProof: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            affiliateEconomics: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            programQuality: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            riskFriction: {
              type: Type.OBJECT,
              required: ['score', 'reason', 'evidence'],
              properties: {
                score: { type: Type.INTEGER, description: 'Score between 0 and 10' },
                reason: { type: Type.STRING },
                evidence: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ['text', 'classification'],
                    properties: {
                      text: { type: Type.STRING },
                      classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED', 'MISSING', 'NEEDS_VERIFICATION'] }
                    }
                  }
                }
              }
            },
            strengths: {
              type: Type.ARRAY,
              description: '3 to 5 top strengths grounded in evidence',
              items: {
                type: Type.OBJECT,
                required: ['finding', 'whyItMatters', 'evidenceSource', 'classification'],
                properties: {
                  finding: { type: Type.STRING },
                  whyItMatters: { type: Type.STRING },
                  evidenceSource: { type: Type.STRING },
                  classification: { type: Type.STRING, enum: ['VERIFIED', 'INFERRED'] }
                }
              }
            },
            risks: {
              type: Type.ARRAY,
              description: '3 to 5 meaningful risks',
              items: {
                type: Type.OBJECT,
                required: ['risk', 'whyItMatters', 'severity'],
                properties: {
                  risk: { type: Type.STRING },
                  whyItMatters: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
                }
              }
            },
            missingInformation: {
              type: Type.ARRAY,
              description: 'Missing items needed before making a solid test decision',
              items: { type: Type.STRING }
            },
            questionsToVerify: {
              type: Type.ARRAY,
              description: '5 to 10 specific questions to verify with offer owner or program',
              items: { type: Type.STRING }
            },
            audienceFitMap: {
              type: Type.OBJECT,
              required: ['audience', 'problem', 'desiredOutcome', 'offerPromise', 'alignmentScore', 'alignmentVerdict'],
              properties: {
                audience: { type: Type.STRING },
                problem: { type: Type.STRING },
                desiredOutcome: { type: Type.STRING },
                offerPromise: { type: Type.STRING },
                alignmentScore: { type: Type.INTEGER },
                alignmentVerdict: { type: Type.STRING },
                mismatchNotes: { type: Type.STRING }
              }
            },
            marketingAngles: {
              type: Type.ARRAY,
              description: 'Exactly 3 marketing angles based only on provided data',
              items: {
                type: Type.OBJECT,
                required: ['title', 'angleType', 'hook', 'coreMessage'],
                properties: {
                  title: { type: Type.STRING },
                  angleType: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  coreMessage: { type: Type.STRING }
                }
              }
            },
            contentIdeas: {
              type: Type.ARRAY,
              description: '5 content ideas across educational, problem-aware, comparison, review, buyer intent',
              items: {
                type: Type.OBJECT,
                required: ['title', 'category', 'categoryAr', 'contentAngle', 'offerPlacement'],
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING, enum: ['educational', 'problem_aware', 'comparison', 'review', 'buyer_intent'] },
                  categoryAr: { type: Type.STRING },
                  contentAngle: { type: Type.STRING },
                  offerPlacement: { type: Type.STRING }
                }
              }
            },
            salesPageAnalysis: {
              type: Type.OBJECT,
              properties: {
                strongestElement: { type: Type.STRING },
                weakestElement: { type: Type.STRING },
                mainPromise: { type: Type.STRING },
                mainObjectionHandled: { type: Type.STRING },
                mainObjectionNotHandled: { type: Type.STRING },
                ctaClarity: { type: Type.STRING },
                proofQuality: { type: Type.STRING },
                riskReversalQuality: { type: Type.STRING },
                potentialFriction: { type: Type.STRING }
              }
            },
            claimsVsEvidence: {
              type: Type.ARRAY,
              description: 'Claims extracted from sales page vs evidence',
              items: {
                type: Type.OBJECT,
                required: ['claim', 'evidenceStatus', 'evidenceExplanation'],
                properties: {
                  claim: { type: Type.STRING },
                  evidenceStatus: { type: Type.STRING, enum: ['yes', 'partial', 'no'] },
                  evidenceExplanation: { type: Type.STRING }
                }
              }
            },
            nextTestPlan: {
              type: Type.ARRAY,
              description: '3 to 5 low-risk initial testing steps',
              items: {
                type: Type.OBJECT,
                required: ['stepNumber', 'actionTitle', 'description', 'metricToWatch'],
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  actionTitle: { type: Type.STRING },
                  description: { type: Type.STRING },
                  metricToWatch: { type: Type.STRING }
                }
              }
            },
            decision: {
              type: Type.STRING,
              enum: ['TEST', 'VERIFY_FIRST', 'HOLD']
            },
            decisionReasons: {
              type: Type.ARRAY,
              description: 'Exactly 3 reasons for the decision',
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');

    // Deterministic Dimension Bounds & Aggregation
    const clampScore = (s: any) => Math.max(0, Math.min(10, Number(s) || 5));

    const dimensions: DimensionScore[] = [
      {
        id: 'audienceFit',
        titleAr: 'ملاءمة الجمهور',
        titleEn: 'Audience Fit',
        score: clampScore(parsedJson.audienceFit?.score),
        reason: parsedJson.audienceFit?.reason || 'توافق الجمهور مع المشكلة المطروحة.',
        evidenceSources: parsedJson.audienceFit?.evidence || []
      },
      {
        id: 'problemStrength',
        titleAr: 'قوة المشكلة',
        titleEn: 'Problem Strength',
        score: clampScore(parsedJson.problemStrength?.score),
        reason: parsedJson.problemStrength?.reason || 'مدى وضوح وأهمية المشكلة.',
        evidenceSources: parsedJson.problemStrength?.evidence || []
      },
      {
        id: 'offerClarity',
        titleAr: 'وضوح العرض',
        titleEn: 'Offer Clarity',
        score: clampScore(parsedJson.offerClarity?.score),
        reason: parsedJson.offerClarity?.reason || 'مدى فهم القيمة بسرعة.',
        evidenceSources: parsedJson.offerClarity?.evidence || []
      },
      {
        id: 'salesPageQuality',
        titleAr: 'جودة صفحة البيع',
        titleEn: 'Sales Page Quality',
        score: clampScore(parsedJson.salesPageQuality?.score),
        reason: parsedJson.salesPageQuality?.reason || 'هيكل صفحة البيع ومحفزات الشراء.',
        evidenceSources: parsedJson.salesPageQuality?.evidence || []
      },
      {
        id: 'trustProof',
        titleAr: 'الثقة والأدلة',
        titleEn: 'Trust & Proof',
        score: clampScore(parsedJson.trustProof?.score),
        reason: parsedJson.trustProof?.reason || 'توفر دراسات حالة أو إثباتات حقيقية.',
        evidenceSources: parsedJson.trustProof?.evidence || []
      },
      {
        id: 'affiliateEconomics',
        titleAr: 'اقتصاديات الأفلييت',
        titleEn: 'Affiliate Economics',
        score: clampScore(parsedJson.affiliateEconomics?.score),
        reason: parsedJson.affiliateEconomics?.reason || 'جدوى العمولة مقارنة بسعر المنتج.',
        evidenceSources: parsedJson.affiliateEconomics?.evidence || []
      },
      {
        id: 'programQuality',
        titleAr: 'جودة برنامج الأفلييت',
        titleEn: 'Affiliate Program Quality',
        score: clampScore(parsedJson.programQuality?.score),
        reason: parsedJson.programQuality?.reason || 'شفافية شروط البرنامج والتتبع.',
        evidenceSources: parsedJson.programQuality?.evidence || []
      },
      {
        id: 'riskFriction',
        titleAr: 'المخاطر والاحتكاك',
        titleEn: 'Risk & Friction',
        score: clampScore(parsedJson.riskFriction?.score),
        reason: parsedJson.riskFriction?.reason || 'مستوى القيود وصعوبة قرار الشراء.',
        evidenceSources: parsedJson.riskFriction?.evidence || []
      }
    ];

    // Total score formula: (sum of 8 dimension scores / 80) * 100
    const sumScores = dimensions.reduce((acc, d) => acc + d.score, 0);
    const overallScore = Math.round((sumScores / 80) * 100);

    // Score category label
    let categoryLabel = 'العرض يستحق دراسة واختبار محدود';
    if (overallScore <= 39) {
      categoryLabel = 'بيانات أو أساس العرض يحتاج مراجعة كبيرة';
    } else if (overallScore <= 59) {
      categoryLabel = 'العرض يحتاج تحقق وتحسين قبل اختبار جاد';
    } else if (overallScore <= 74) {
      categoryLabel = 'العرض يستحق دراسة واختبار محدود';
    } else if (overallScore <= 89) {
      categoryLabel = 'مؤشرات العرض قوية نسبيًا — اختبره ببيانات حقيقية';
    } else {
      categoryLabel = 'العرض واضح وقوي بناءً على المعلومات المتاحة — لكن ما زال يحتاج اختبار سوق فعلي';
    }

    // Low confidence notice rule
    let confidenceNotice: string | undefined = undefined;
    if (overallScore >= 70 && confidence < 50) {
      confidenceNotice = 'النتيجة تبدو إيجابية، لكن البيانات ناقصة.';
    }

    // Ensure 3 decision reasons
    const reasons = Array.isArray(parsedJson.decisionReasons) && parsedJson.decisionReasons.length >= 3
      ? [parsedJson.decisionReasons[0], parsedJson.decisionReasons[1], parsedJson.decisionReasons[2]]
      : [
          'توافق الجمهور والمشكلة المطروحة.',
          'وضوح عناصر القيمة وصفحة البيع بناءً على المتاح.',
          'ضرورة التحقق من شروط التتبع وسياسة الاسترجاع قبل التوسع.'
        ];

    const result: OfferAssessmentResult = {
      productName: formData.productName,
      overallScore,
      confidenceScore: confidence,
      categoryLabel,
      summary: parsedJson.summary || 'تم فحص العرض استناداً إلى المعطيات المُدخلة وبيانات التوافق.',
      dimensions,
      strengths: parsedJson.strengths || [],
      risks: parsedJson.risks || [],
      missingInformation: parsedJson.missingInformation || [],
      questionsToVerify: parsedJson.questionsToVerify || [],
      audienceFitMap: parsedJson.audienceFitMap || {
        audience: formData.targetAudience || 'غير محدد',
        problem: formData.problemSolved || 'غير محدد',
        desiredOutcome: formData.desiredOutcome || 'غير محدد',
        offerPromise: formData.productName || 'غير محدد',
        alignmentScore: dimensions[0].score,
        alignmentVerdict: 'يحتاج إلى مزيد من التدقيق في نقطة التقاء الجمهور والمشكلة.'
      },
      marketingAngles: parsedJson.marketingAngles || [],
      contentIdeas: parsedJson.contentIdeas || [],
      salesPageAnalysis: parsedJson.salesPageAnalysis,
      claimsVsEvidence: parsedJson.claimsVsEvidence || [],
      nextTestPlan: parsedJson.nextTestPlan || [],
      decision: (['TEST', 'VERIFY_FIRST', 'HOLD'].includes(parsedJson.decision) ? parsedJson.decision : 'VERIFY_FIRST') as any,
      decisionReasons: reasons as [string, string, string],
      confidenceNotice
    };

    return res.json(result);
  } catch (error: any) {
    console.error('Gemini Analysis Error:', error);
    return res.status(500).json({
      error: 'تعذر إكمال التحليل، حاول مرة أخرى.',
      details: error.message
    });
  }
});

// Vite & Static middleware
async function setupApp() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Affiliate Offer Validator running on http://0.0.0.0:${PORT}`);
  });
}

setupApp().catch(err => {
  console.error('Failed to start server:', err);
});
