import React, { useState } from 'react';
import { Search, Compass, Code, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WynxLogo } from './brand/WynxLogo';
import { WynxMotif } from './brand/WynxMotif';

export const ProcessSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepsByLang: Record<Language, Array<{
    num: string;
    title: string;
    duration: string;
    description: string;
    details: string[];
    icon: React.ReactNode;
  }>> = {
    en: [
      {
        num: '01',
        title: 'Deep Immersion & Strategic Scoping',
        duration: '1 to 2 weeks',
        description: 'We dissect your commercial ambitions, target personas, and market rivals to architect a foolproof technical and ergonomic blueprint.',
        details: [
          'Strategic scoping workshop with your core engineering & executive team',
          'Comprehensive tech debt audit or competitive benchmark analysis',
          'Clear definition of measurable North Star KPIs & Core Web Vitals targets'
        ],
        icon: <Search className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '02',
        title: 'System Architecture & High-Fidelity UI',
        duration: '2 to 3 weeks',
        description: 'We craft interactive prototypes tested with real users while specifying resilient data schemas (PostgreSQL / Redis / GraphQL) and cloud architectures.',
        details: [
          'Comprehensive Figma Design System aligned with WCAG AA accessibility',
          'Clickable, realistic mobile & desktop interactive user journeys',
          'Modular software architecture & threat modeling specification'
        ],
        icon: <Compass className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '03',
        title: 'Agile Engineering & Sprint Iterations',
        duration: '3 to 6 weeks',
        description: 'Writing clean, typed, and unit-tested code in React, TypeScript, and Node.js. You get 24/7 access to an automated staging environment updated with every merge.',
        details: [
          'Private staging preview URL updated in real time',
          'Automated CI testing suites (unit, regression, and end-to-end)',
          'Weekly video syncs with working code demonstrations'
        ],
        icon: <Code className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '04',
        title: 'Cloud Orchestration & Security Audits',
        duration: '1 week',
        description: 'Coordinated production rollout on self-healing cloud infrastructure (AWS / Edge CDN). Configuration of SSL certificates, automated encrypted backups, and load tests.',
        details: [
          'High-concurrency load testing simulating peak production traffic',
          '24/7 telemetry monitoring, latency alerting & automatic failover',
          'Zero-downtime data migration and DNS cutover runbooks'
        ],
        icon: <Rocket className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '05',
        title: 'Technical SEO & Ongoing Velocity',
        duration: 'Continuous',
        description: 'Validating Google search indexation, deploying rich Schema.org semantic data, and fine-tuning conversion paths to maintain your competitive lead.',
        details: [
          'Lighthouse 95+ mobile and desktop compliance audits',
          'Privacy-compliant product analytics setup and funnel attribution',
          'Priority engineering support & proactive architecture maintenance'
        ],
        icon: <TrendingUp className="w-5 h-5 text-[#FF5500]" />
      }
    ],
    fr: [
      {
        num: '01',
        title: 'Immersion & Cadrage Stratégique',
        duration: '1 à 2 semaines',
        description: 'Nous disséquons vos objectifs commerciaux, vos personas cibles et vos concurrents directs pour définir un cahier des charges technique et ergonomique infaillible.',
        details: [
          'Atelier de cadrage stratégique avec vos parties prenantes',
          'Audit de la dette technique ou benchmark concurrentiel',
          'Définition des métriques de succès (KPIs et Core Web Vitals)'
        ],
        icon: <Search className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '02',
        title: 'Architecture & Design Haute Fidélité',
        duration: '2 à 3 semaines',
        description: 'Conception de prototypes interactifs sous Figma testés auprès d\'utilisateurs réels et définition de l\'architecture des données (schéma PostgreSQL/NoSQL, API).',
        details: [
          'Design System complet aux standards d\'accessibilité WCAG AA',
          'Prototypes cliquables haute fidélité mobile & desktop',
          'Spécification de l\'architecture logicielle & sécurité'
        ],
        icon: <Compass className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '03',
        title: 'Développement Agile & Sprints',
        duration: '3 à 6 semaines',
        description: 'Écriture d\'un code propre, testé et typé sous React, TypeScript et Node.js. Vous avez accès à un environnement de staging mis à jour en continu à chaque sprint.',
        details: [
          'Environnement de pré-visualisation privatif mis à jour en temps réel',
          'Tests automatisés (unitaires et end-to-end)',
          'Point de synchronisation vidéo hebdomadaire avec vos équipes'
        ],
        icon: <Code className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '04',
        title: 'Déploiement Cloud & Audit Sécurité',
        duration: '1 semaine',
        description: 'Mise en production orchestrée sur une infrastructure Cloud résiliente (AWS / Edge CDN). Configuration des certificats SSL, sauvegardes et tests de charge.',
        details: [
          'Tests de résistance aux pics de trafic (Load testing)',
          'Mise en place de la surveillance applicative et alertes 24/7',
          'Migration des données sans coupure de service'
        ],
        icon: <Rocket className="w-5 h-5 text-[#FF5500]" />
      },
      {
        num: '05',
        title: 'Optimisation SEO & Croissance',
        duration: 'Continu',
        description: 'Validation de l\'indexation sur Google, déploiement des balises sémantiques Schema.org et suivi de la vitesse de conversion pour pérenniser l\'avance acquise.',
        details: [
          'Audit Lighthouse 95+ sur mobile et desktop',
          'Configuration du tracking analytique respectueux de la confidentialité',
          'Support technique prioritaire et maintenance proactive'
        ],
        icon: <TrendingUp className="w-5 h-5 text-[#FF5500]" />
      }
    ]
  };

  const steps = stepsByLang[language] || stepsByLang.en;

  return (
    <section id="process" className="py-24 md:py-32 bg-[#F1F3F8] dark:bg-[#0C0E14] border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-200">
      {/* Official WYNX Motif Gold Ambient Pattern */}
      <WynxMotif variant="gold" opacity={0.03} density="large" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <Reveal direction="up" delayMs={50}>
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
              {t('process.kicker')}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] transition-colors">
              {t('process.title')}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed transition-colors">
              {t('process.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Horizontal interactive timeline */}
        <Reveal direction="up" delayMs={100}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-white dark:bg-[#151924] border-[#FF5500] shadow-md dark:shadow-lg shadow-[#FF5500]/10'
                      : 'bg-white/70 dark:bg-[#10131B]/60 border-black/[0.06] dark:border-white/[0.06] hover:bg-white dark:hover:bg-[#131620] hover:border-black/[0.12] dark:hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono-data text-xs font-bold ${isCurrent ? 'text-[#FF5500]' : 'text-neutral-400 dark:text-neutral-500'}`}>
                      {t('process.stepPrefix')} {step.num}
                    </span>
                    <div className={`p-1.5 rounded-md ${isCurrent ? 'bg-[#FF5500]/10' : 'bg-neutral-100 dark:bg-white/[0.04]'}`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className={`text-xs font-semibold line-clamp-1 transition-colors ${isCurrent ? 'text-neutral-950 dark:text-white' : 'text-neutral-700 dark:text-neutral-300'}`}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Selected Step Deep Dive Card */}
        <Reveal direction="up" delayMs={150}>
          <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#121622] border border-black/[0.08] dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
            {/* Subtle background emblem watermark in deep dive card */}
            <div className="absolute -top-10 -right-10 w-64 h-64 pointer-events-none opacity-[0.03]">
              <WynxLogo variant="emblem-gold" height="240px" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/[0.08] dark:border-white/[0.08] mb-6 gap-4 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono-data text-sm font-bold text-[#FF5500]">
                    {t('process.phasePrefix')} {steps[activeStep].num}
                  </span>
                  <span aria-hidden="true" className="text-neutral-400 dark:text-neutral-600">·</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('process.durationPrefix')} {steps[activeStep].duration}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white transition-colors">
                  {steps[activeStep].title}
                </h3>
              </div>

              {/* Official Progression Indicator (Tracé1) */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-[#0E1119] border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-semibold text-neutral-500 dark:text-neutral-400 tracking-wider">Progression</div>
                  <div className="text-xs font-mono-data font-bold text-neutral-900 dark:text-white">Phase {steps[activeStep].num} / 05</div>
                </div>
                <WynxLogo variant="chevrons" height="26px" />
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl transition-colors">
              {steps[activeStep].description}
            </p>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                {t('process.deliverablesTitle')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {steps[activeStep].details.map((detail, i) => (
                  <div key={i} className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0E1119] border border-black/[0.06] dark:border-white/[0.06] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
