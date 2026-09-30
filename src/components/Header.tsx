import React from 'react';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../config/constants';

interface HeaderProps {
  onReset?: () => void;
  hasResult?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, hasResult }) => {
  return (
    <header className="border-b border-[#23170D] bg-[#040405]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4A2F15] via-[#23170D] to-[#040405] border border-[#F5BF1E]/40 flex items-center justify-center shadow-lg shadow-black/60">
            <span className="text-[#F5BF1E] font-black text-lg tracking-wider">MA</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FCFCFA] text-base tracking-wide">{BRAND_CONFIG.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#4A2F15]/40 border border-[#A7690C]/30 text-[#FBD052] font-semibold">
                SYSTEMS
              </span>
            </div>
            <p className="text-xs text-[#797979] hidden sm:block">
              {BRAND_CONFIG.taglineAr}
            </p>
          </div>
        </div>

        {/* Center Philosophy badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#23170D]/70 border border-[#4A2F15]/60 text-xs text-[#C8C5BA]">
          <Compass className="w-3.5 h-3.5 text-[#F5BF1E]" />
          <span>العمولة العالية وحدها لا تعني إن العرض جيد</span>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          {hasResult && (
            <button
              onClick={onReset}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#4A2F15] hover:border-[#F5BF1E]/60 text-[#C8C5BA] hover:text-[#FCFCFA] bg-[#23170D]/40 transition-all cursor-pointer"
            >
              فحص عرض آخر
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#797979] px-2.5 py-1 rounded bg-[#040405] border border-[#23170D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span className="hidden sm:inline">أداة تحليل محايدة</span>
          </div>
        </div>
      </div>
    </header>
  );
};
