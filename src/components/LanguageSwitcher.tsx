import React from 'react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  isCompact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', isCompact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center p-0.5 rounded-md bg-neutral-100 dark:bg-[#131722] border border-neutral-300/80 dark:border-white/10 transition-colors ${className}`}>
      {!isCompact && (
        <span className="px-2 text-neutral-500">
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-[11px] font-semibold tracking-wider uppercase rounded transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-[#FF5500] text-white shadow-sm'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/[0.04]'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-neutral-400 dark:text-neutral-700 text-xs px-0.5" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 text-[11px] font-semibold tracking-wider uppercase rounded transition-all cursor-pointer ${
          language === 'fr'
            ? 'bg-[#FF5500] text-white shadow-sm'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/[0.04]'
        }`}
        aria-label="Passer au Français"
      >
        FR
      </button>
    </div>
  );
};
