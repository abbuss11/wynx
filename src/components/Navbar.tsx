import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { WynxLogo } from './brand/WynxLogo';

interface NavbarProps {
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.blog'), href: '#blog' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.about'), href: '#about' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#090A0D]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] py-3.5 shadow-lg dark:shadow-2xl'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Official Brand Logo & Wordmark (LogoStyleIntégré) */}
        <a
          href="#"
          className="group flex items-center focus:outline-none"
          aria-label="WYNX Agency Homepage"
        >
          <WynxLogo variant="full" height="34px" />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-black dark:hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5500] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions + ThemeToggle + Language Switcher */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />
          <LanguageSwitcher />

          <button
            onClick={onOpenEstimator}
            data-cursor="magnetic"
            className="btn-magnetic px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] active:scale-[0.98] transition-colors rounded-md shadow-lg shadow-[#FF5500]/20 flex items-center gap-1.5 whitespace-nowrap cursor-pointer will-change-transform"
          >
            <span>{t('nav.estimate')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle isCompact />
          <LanguageSwitcher isCompact />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0D0F14]/95 backdrop-blur-md border-b border-black/[0.08] dark:border-white/10 px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-800 dark:text-neutral-300 hover:text-[#FF5500] dark:hover:text-white py-2 border-b border-black/[0.05] dark:border-white/[0.05]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('nav.mobileEstimate')}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
