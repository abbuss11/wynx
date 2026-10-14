import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeToggleProps {
  className?: string;
  isCompact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', isCompact = false }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();

  const titleText = isDark
    ? language === 'fr'
      ? 'Passer au mode clair'
      : 'Switch to light mode'
    : language === 'fr'
      ? 'Passer au mode sombre'
      : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="magnetic"
      className={`btn-magnetic group relative inline-flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF5500]/50 will-change-transform ${
        isDark
          ? 'bg-[#131722] hover:bg-[#1A2030] text-amber-400 border border-white/10 hover:border-amber-400/30'
          : 'bg-neutral-100 hover:bg-neutral-200/80 text-amber-600 border border-neutral-300 hover:border-amber-500/40 shadow-xs'
      } ${className}`}
      title={titleText}
      aria-label={titleText}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        {/* Sun Icon for Light Mode transition */}
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-300 transform ${
            isDark
              ? 'translate-y-6 opacity-0 rotate-90 scale-50'
              : 'translate-y-0 opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon Icon for Dark Mode transition */}
        <Moon
          className={`w-4 h-4 text-amber-300 absolute transition-all duration-300 transform ${
            isDark
              ? 'translate-y-0 opacity-100 rotate-0 scale-100'
              : '-translate-y-6 opacity-0 -rotate-90 scale-50'
          }`}
        />
      </div>

      {!isCompact && (
        <span className="sr-only">
          {titleText}
        </span>
      )}
    </button>
  );
};
