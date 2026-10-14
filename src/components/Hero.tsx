import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WynxMotif } from './brand/WynxMotif';
import { WynxLogo } from './brand/WynxLogo';

interface HeroProps {
  onContactClick: () => void;
  onPortfolioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onPortfolioClick }) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Official WYNX Motif Gold Pattern Background */}
      <WynxMotif variant="gold" opacity={0.05} density="standard" />

      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF5500]/12 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Ambient Emblem Watermark */}
      <div className="absolute top-20 right-10 lg:right-24 w-96 h-96 pointer-events-none opacity-[0.04] hidden lg:block -z-10">
        <WynxLogo variant="emblem-gold" height="380px" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Editorial unboxed kicker */}
        <Reveal direction="up" delayMs={50}>
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
            <span>{t('hero.kicker')}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400 normal-case tracking-normal">{t('hero.location')}</span>
          </div>
        </Reveal>

        {/* Main Display Headline */}
        <div className="max-w-5xl">
          <Reveal direction="up" delayMs={150}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-8 [text-wrap:balance] transition-colors">
              {t('hero.titleLine1')}<span className="text-[#FF5500] underline decoration-[#FF5500]/30 decoration-wavy decoration-1 underline-offset-8">{t('hero.titleLine1Highlight')}</span>.<br />
              {t('hero.titleLine2')}<span className="text-neutral-950 dark:text-white bg-clip-text">WYNX</span>.
            </h1>
          </Reveal>
          
          <Reveal direction="up" delayMs={250}>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10 transition-colors">
              {t('hero.description')}
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal direction="up" delayMs={350}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
              <button
                onClick={onContactClick}
                data-cursor="magnetic"
                className="btn-magnetic px-8 py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white text-sm font-semibold rounded-md shadow-xl shadow-[#FF5500]/25 transition-colors flex items-center justify-center gap-2 group cursor-pointer whitespace-nowrap will-change-transform"
              >
                <span>{t('hero.ctaLaunch')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onPortfolioClick}
                data-cursor="magnetic"
                className="btn-magnetic px-8 py-4 bg-white dark:bg-[#141721] hover:bg-neutral-100 dark:hover:bg-[#1C212E] text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-white/10 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap will-change-transform shadow-xs dark:shadow-none"
              >
                <span>{t('hero.ctaWork')}</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Hero Visual Showcase */}
        <Reveal direction="up" delayMs={300} distancePx={36} durationMs={700}>
          <div className="relative rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/10 bg-neutral-100 dark:bg-[#12151D] shadow-xl dark:shadow-2xl glow-orange-subtle mb-16">
            <div className="relative aspect-[16/9] max-h-[540px] w-full overflow-hidden">
              <img
                src="/src/assets/images/hero_digital_agency_1790354908664.jpg"
                alt="WYNX Creative Engineering Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-95 dark:brightness-90 contrast-105 hover:scale-102 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* Contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-[#090A0D] dark:via-[#090A0D]/30" />

              {/* In-hero live performance card */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-5 rounded-lg bg-white/95 dark:bg-[#0E1118]/90 backdrop-blur-md border border-black/[0.08] dark:border-white/10 shadow-2xl flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5500] uppercase tracking-wider mb-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t('hero.perfBadge')}</span>
                  </div>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                    {t('hero.perfDesc')}
                  </p>
                </div>
                {/* Official Ascending Chevrons Motif (Tracé1) */}
                <div className="shrink-0 pl-3 border-l border-black/10 dark:border-white/10 flex flex-col items-center">
                  <WynxLogo variant="chevrons" height="34px" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Claim-to-Proof Quantitative Adjacency with Staggered Fade-In */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-black/[0.08] dark:border-white/[0.08]">
          <Reveal direction="up" delayMs={50}>
            <div className="space-y-1">
              <div className="font-mono-data text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                150<span className="text-[#FF5500]">+</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                {t('hero.metric1')}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delayMs={150}>
            <div className="space-y-1">
              <div className="font-mono-data text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                99.4<span className="text-[#FF5500]">%</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                {t('hero.metric2')}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delayMs={250}>
            <div className="space-y-1">
              <div className="font-mono-data text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                &lt; 60<span className="text-[#FF5500]">ms</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                {t('hero.metric3')}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delayMs={350}>
            <div className="space-y-1">
              <div className="font-mono-data text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                4.8<span className="text-[#FF5500]">x</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                {t('hero.metric4')}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
