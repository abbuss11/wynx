import React from 'react';
import { Target, Lightbulb } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WynxLogo } from './brand/WynxLogo';
import { WynxMotif } from './brand/WynxMotif';

export const AboutSection: React.FC = () => {
  const { language, t } = useLanguage();

  const valuesByLang: Record<Language, Array<{
    title: string;
    description: string;
  }>> = {
    en: [
      {
        title: 'Mission: Value & Measurable Impact First',
        description: 'We refuse decorative deliverables without measurable enterprise ROI. Every line of clean code and every pixel exists to eliminate user friction, surge conversions, and accelerate revenue.'
      },
      {
        title: 'Vision: Technology Without Fragility',
        description: 'We position our clients at the forefront of modern software and cloud architectures, ensuring capital investments yield sustainable long-term value without early technical debt.'
      },
      {
        title: 'Velocity: Radical Clarity in Sprints',
        description: 'No opaque multi-month siloes: weekly automated builds pushed directly to private staging environments with transparent video walkthroughs.'
      }
    ],
    fr: [
      {
        title: 'Mission : L\'Impact Avant Tout',
        description: 'Nous refusons les livrables décoratifs sans valeur mesurable. Chaque ligne de code et chaque pixel a pour but d\'accélérer vos conversions et simplifier l\'usage.'
      },
      {
        title: 'Vision : L\'Excellence Technologique',
        description: 'Nous nous positionnons à la pointe des architectures web, mobiles et cloud pour garantir la pérennité de vos investissements sans refonte prématurée.'
      },
      {
        title: 'Vélocité : Sprints et Clarté',
        description: 'Pas de tunnel opaque de 6 mois : des déploiements continus toutes les semaines sur un environnement de recette privatif consultable en 1 clic.'
      }
    ]
  };

  const values = valuesByLang[language] || valuesByLang.en;
  const icons = [
    <Target className="w-5 h-5 text-[#FF5500]" />,
    <Lightbulb className="w-5 h-5 text-[#FF5500]" />,
    <div className="w-5 h-5 flex items-center justify-center">
      <WynxLogo variant="chevrons" height="18px" />
    </div>
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F8F9FC] dark:bg-[#0A0C12] border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-200">
      {/* Background Motif */}
      <WynxMotif variant="white" opacity={0.03} density="large" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <Reveal direction="up" delayMs={50} className="lg:col-span-6 space-y-6">
            <div>
              {/* Official Outlined Emblem Stamp (LogoTracéOr1) */}
              <div className="inline-flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white dark:bg-[#141824]/80 border border-black/[0.08] dark:border-[#FF5500]/20 shadow-md dark:shadow-lg shadow-[#FF5500]/5">
                <WynxLogo variant="emblem-gold" height="42px" />
                <div>
                  <div className="font-display font-bold text-neutral-950 dark:text-white text-sm">WYNX Creative Engineering</div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono-data">Official Studio Architecture</div>
                </div>
              </div>

              <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
                {t('about.kicker')}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] mb-6 transition-colors">
                {t('about.title')}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 transition-colors">
                {t('about.p1')}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 transition-colors">
                {t('about.p2')}
              </p>

              <div className="pt-6 grid grid-cols-2 gap-6 border-t border-black/[0.08] dark:border-white/[0.08]">
                <div>
                  <div className="font-mono-data text-2xl font-bold text-neutral-950 dark:text-white">Niamey, NE</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{t('about.stat1Label')}</div>
                </div>
                <div>
                  <div className="font-mono-data text-2xl font-bold text-[#FF5500]">2025</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{t('about.stat2Label')}</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Values Bento Cards */}
          <div className="lg:col-span-6 space-y-4">
            {values.map((v, idx) => (
              <Reveal key={idx} direction="up" delayMs={idx * 80 + 100}>
                <div className="p-6 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all flex items-start gap-4 shadow-sm dark:shadow-none">
                  <div className="p-3 rounded-lg bg-neutral-100 dark:bg-[#161B28] border border-black/[0.06] dark:border-white/[0.06] shrink-0">
                    {icons[idx]}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-950 dark:text-white mb-1.5 transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
