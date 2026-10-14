import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteDataContext';
import { Newsletter } from './Newsletter';
import { WynxLogo } from './brand/WynxLogo';
import { WynxMotif } from './brand/WynxMotif';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { globalSettings } = useSiteData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080B] border-t border-white/[0.08] text-neutral-400 text-xs py-16 relative overflow-hidden">
      {/* Ambient Pattern Motif watermark */}
      <WynxMotif variant="white" opacity={0.03} density="large" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Newsletter Lead Capture Card */}
        <div className="mb-16">
          <Newsletter variant="card" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="inline-block group focus:outline-none" aria-label="WYNX Homepage">
              <WynxLogo variant="full" height="36px" />
            </a>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {globalSettings.description || t('footer.tagline')}
            </p>
            <div className="text-neutral-300 font-mono-data text-xs">
              {globalSettings.contactEmail} · {globalSettings.address ? `${globalSettings.address}, ${globalSettings.country}` : 'Niamey, Niger'}
            </div>
          </div>

          {/* Quick Navigation: Services */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {t('footer.servicesTitle')}
            </div>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Web & SaaS Engineering</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mobile Applications</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">UI/UX Design Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Technical SEO</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cloud & DevOps</a></li>
            </ul>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {t('footer.navTitle')}
            </div>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="hover:text-white transition-colors">{t('nav.portfolio')}</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">{t('nav.process')}</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">{t('nav.blog')}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t('nav.faq')}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('contact.title')}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {t('footer.socialTitle')}
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {t('footer.socialDesc')}
            </p>
            <div className="flex items-center gap-4 text-xs pt-1">
              <a href={globalSettings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-[#FF5500] transition-colors">
                LinkedIn
              </a>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <a href={globalSettings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-[#FF5500] transition-colors">
                X / Twitter
              </a>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <a href={globalSettings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-[#FF5500] transition-colors">
                Instagram
              </a>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <a href={globalSettings.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-[#FF5500] transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-neutral-500">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer p-2 rounded-lg hover:bg-white/[0.04]"
            aria-label="Back to top"
          >
            <span>{t('footer.backToTop')}</span>
            <div className="w-4 h-4 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <WynxLogo variant="chevrons" height="15px" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
