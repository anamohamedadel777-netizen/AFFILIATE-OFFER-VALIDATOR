import React from 'react';
import { Globe, Edit3 } from 'lucide-react';

interface InputModeSelectorProps {
  mode: 'url' | 'manual';
  onModeChange: (mode: 'url' | 'manual') => void;
}

export const InputModeSelector: React.FC<InputModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center justify-center p-1.5 bg-[#23170D] rounded-xl border border-[#4A2F15]/80 max-w-md mx-auto mb-8">
      <button
        type="button"
        onClick={() => onModeChange('url')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
          mode === 'url'
            ? 'bg-gradient-to-r from-[#A7690C] to-[#F5BF1E] text-[#040405] shadow-md shadow-[#F5BF1E]/20'
            : 'text-[#C8C5BA] hover:text-[#FCFCFA] hover:bg-[#040405]/40'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>حلل رابط العرض</span>
      </button>

      <button
        type="button"
        onClick={() => onModeChange('manual')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all cursor-pointer ${
          mode === 'manual'
            ? 'bg-gradient-to-r from-[#A7690C] to-[#F5BF1E] text-[#040405] shadow-md shadow-[#F5BF1E]/20'
            : 'text-[#C8C5BA] hover:text-[#FCFCFA] hover:bg-[#040405]/40'
        }`}
      >
        <Edit3 className="w-4 h-4" />
        <span>أدخل البيانات يدويًا</span>
      </button>
    </div>
  );
};
