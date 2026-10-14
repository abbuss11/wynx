import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Reveal } from './Reveal';

export const TestimonialsSection: React.FC = () => {
  const { language, t } = useLanguage();

  const testimonialsByLang: Record<Language, Array<{
    name: string;
    role: string;
    company: string;
    metric: string;
    quote: string;
    initials: string;
  }>> = {
    en: [
      {
        name: 'Thomas Martin',
        role: 'CEO & Co-founder',
        company: 'TechFlow Platform',
        metric: '+140% onboarding conversion rate',
        quote: 'WYNX completely modernized our enterprise SaaS platform. Their React and TypeScript architecture delivers blistering performance, and our enterprise buyers immediately felt the difference. Exceptional craftsmanship.',
        initials: 'TM'
      },
      {
        name: 'Sophie Dubois',
        role: 'VP of E-Commerce & Brand',
        company: 'LuxeStore International',
        metric: 'Mobile PageSpeed score leaped from 34 to 98/100',
        quote: 'The WYNX team pairs high-end luxury aesthetics with surgical engineering execution. Deploying our new headless platform surged our checkout volume within the very first week of launch.',
        initials: 'SD'
      },
      {
        name: 'Marc Laurent',
        role: 'Head of Product',
        company: 'SonicWave Media (MusicStream)',
        metric: '1.2M app store downloads',
        quote: 'Finding an agency that can architect a real-time mobile audio engine with sub-20ms latency and 99.9% crash-free sessions was game-changing. WYNX delivered two weeks ahead of schedule.',
        initials: 'ML'
      }
    ],
    fr: [
      {
        name: 'Thomas Martin',
        role: 'CEO & Co-fondateur',
        company: 'TechFlow Platform',
        metric: '+140% de conversion onboarding',
        quote: 'WYNX a complètement métamorphosé notre plateforme SaaS. L\'architecture React/TypeScript est d\'une rapidité foudroyante et nos clients ont immédiatement remarqué la différence. Un niveau d\'exigence rare.',
        initials: 'TM'
      },
      {
        name: 'Sophie Dubois',
        role: 'Directrice E-Commerce & Marque',
        company: 'LuxeStore International',
        metric: 'Score PageSpeed passé de 34 à 98/100',
        quote: 'L\'équipe de WYNX allie une sensibilité artistique de luxe à une maîtrise technique chirurgicale. Le lancement de notre nouveau site headless a fait bondir notre chiffre d\'affaires dès la première semaine.',
        initials: 'SD'
      },
      {
        name: 'Marc Laurent',
        role: 'Head of Product',
        company: 'SonicWave Media (MusicStream)',
        metric: '1.2M de téléchargements stores',
        quote: 'Trouver une agence capable de concevoir une application mobile temps réel avec moins de 20ms de latence et sans crash tenait du miracle. WYNX a livré le projet 2 semaines en avance sur la roadmap.',
        initials: 'ML'
      }
    ]
  };

  const testimonials = testimonialsByLang[language] || testimonialsByLang.en;

  return (
    <section className="py-24 md:py-32 bg-[#F8F9FC] dark:bg-[#090A0D] border-t border-black/[0.06] dark:border-white/[0.06] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal direction="up" delayMs={50}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
              {t('testimonials.kicker')}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] transition-colors">
              {t('testimonials.title')}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-4 transition-colors">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <Reveal key={idx} direction="up" delayMs={idx * 100}>
              <div className="p-8 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] flex flex-col justify-between shadow-md hover:shadow-xl dark:shadow-xl relative hover:border-[#FF5500]/50 transition-all duration-300 h-full">
                <div>
                  <div className="flex items-center gap-1 text-[#FF5500] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF5500]" />
                    ))}
                  </div>

                  <div className="text-xs font-semibold uppercase tracking-wider text-[#FF5500] mb-3">
                    {t('testimonials.resultPrefix')} {item.metric}
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-8">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-[#181D2B] border border-black/[0.08] dark:border-white/10 flex items-center justify-center font-display text-xs font-bold text-neutral-900 dark:text-white">
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-950 dark:text-white">{item.name}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{item.role} · {item.company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
