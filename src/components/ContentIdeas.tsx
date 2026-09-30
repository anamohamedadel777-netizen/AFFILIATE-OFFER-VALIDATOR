import React from 'react';
import { BookOpen, Video, FileText, CheckCircle, Flame } from 'lucide-react';
import { ContentIdea } from '../types';

interface ContentIdeasProps {
  ideas: ContentIdea[];
}

export const ContentIdeas: React.FC<ContentIdeasProps> = ({ ideas }) => {
  if (!ideas || ideas.length === 0) return null;

  const categoryBadges: Record<string, { label: string; color: string }> = {
    educational: { label: 'تعليمي (Educational)', color: 'bg-[#FCFCFA]/10 text-[#FCFCFA] border-[#FCFCFA]/20' },
    problem_aware: { label: 'وعي بالمشكلة (Problem-Aware)', color: 'bg-[#A7690C]/20 text-[#F5BF1E] border-[#A7690C]/30' },
    comparison: { label: 'مقارنة وبدائل (Comparison)', color: 'bg-[#4A2F15]/40 text-[#FBD052] border-[#F5BF1E]/30' },
    review: { label: 'مراجعة وتجربة (Review)', color: 'bg-[#F5BF1E]/15 text-[#FBD052] border-[#F5BF1E]/40' },
    buyer_intent: { label: 'نية شراء مباشرة (Buyer Intent)', color: 'bg-[#F5BF1E]/20 text-[#FCFCFA] border-[#F5BF1E]/50 font-bold' },
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#23170D] to-[#040405] border border-[#4A2F15]/80 shadow-xl space-y-5 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23170D] pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#F5BF1E]" />
          <div>
            <h3 className="text-lg font-bold text-[#FCFCFA]">
              أفكار محتوى تبني الثقة وتمهد للعرض (Content Opportunities)
            </h3>
            <p className="text-xs text-[#797979]">
              5 مسارات محتوى نوعية تربط المشكلة بالحل بذكاء دون أن يكون كل محتوى إعلاناً فجاً
            </p>
          </div>
        </div>
        <span className="text-xs text-[#797979]">
          تدرج في مراحل وعي العميل
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {ideas.map((idea, idx) => {
          const badge = categoryBadges[idea.category] || {
            label: idea.categoryAr || 'محتوى توعوي',
            color: 'bg-[#4A2F15]/30 text-[#C8C5BA] border-[#4A2F15]'
          };

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#040405]/80 border border-[#23170D] hover:border-[#4A2F15] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] px-2 py-0.5 rounded border ${badge.color}`}>
                    {badge.label}
                  </span>
                  <span className="text-[10px] text-[#797979] font-mono">#{idx + 1}</span>
                </div>

                <h4 className="text-sm font-bold text-[#FCFCFA] mb-2 leading-snug">
                  {idea.title}
                </h4>

                <div className="text-xs text-[#C8C5BA] leading-relaxed mb-3">
                  <span className="text-[#797979] block text-[11px] font-bold mb-0.5">
                    زاوية التناول:
                  </span>
                  <p>{idea.contentAngle}</p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#23170D] text-[11px] text-[#FBD052] bg-[#23170D]/30 p-2 rounded-lg">
                <span className="font-bold text-[#FCFCFA] block mb-0.5">
                  أين يظهر العرض طبيعياً؟:
                </span>
                <p>{idea.offerPlacement}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
