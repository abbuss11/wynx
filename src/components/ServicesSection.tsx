import React, { useState } from 'react';
import { getServicesData } from '../data/servicesData';
import { 
  Terminal, 
  Smartphone, 
  Layout, 
  Compass, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const { language, t } = useLanguage();
  const services = getServicesData(language);
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0].id);

  const activeService = services.find((s) => s.id === activeServiceId) || services[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#FF5500]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#FF5500]" />;
      case 'Layout': return <Layout className="w-5 h-5 text-[#FF5500]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#FF5500]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#FF5500]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#FF5500]" />;
      default: return <Layers className="w-5 h-5 text-[#FF5500]" />;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F1F3F8] dark:bg-[#0C0E14] border-t border-black/[0.06] dark:border-white/[0.06] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal direction="up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
                {t('services.kicker')}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] transition-colors">
                {t('services.title')}
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
              {t('services.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Master-Detail Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clean List of Services */}
          <div className="lg:col-span-5 space-y-3">
            {services.map((service, idx) => {
              const isActive = service.id === activeServiceId;
              return (
                <Reveal key={service.id} direction="up" delayMs={idx * 60}>
                  <button
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-5 rounded-lg border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-[#151923] border-[#FF5500] shadow-md dark:shadow-lg shadow-[#FF5500]/10'
                        : 'bg-white/70 dark:bg-[#10131B]/60 border-black/[0.06] dark:border-white/[0.06] hover:bg-white dark:hover:bg-[#131620] hover:border-black/[0.12] dark:hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono-data text-xs font-semibold text-neutral-400 dark:text-neutral-500 group-hover:text-[#FF5500] transition-colors">
                        {service.number}.
                      </span>
                      <div>
                        <h3 className={`text-base font-semibold transition-colors ${isActive ? 'text-neutral-950 dark:text-white' : 'text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white'}`}>
                          {service.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isActive ? 'text-[#FF5500] translate-x-1' : 'text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400'}`} />
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Detailed Interactive Showcase Card */}
          <Reveal direction="up" delayMs={150} className="lg:col-span-7">
            <div className="bg-white dark:bg-[#131722] border border-black/[0.08] dark:border-white/10 rounded-xl p-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/5 blur-3xl rounded-full pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] dark:border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/20">
                    {getServiceIcon(activeService.icon)}
                  </div>
                  <div>
                    <span className="font-mono-data text-xs text-[#FF5500] font-semibold">
                      {t('services.serviceLabel')} {activeService.number}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white transition-colors">
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                {/* Quantified Impact Badge */}
                <div className="hidden sm:block text-right">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{t('services.guaranteedImpact')}</div>
                  <div className="font-mono-data text-sm font-bold text-[#FF5500]">
                    {activeService.impactMetric}
                  </div>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 transition-colors">
                {activeService.description}
              </p>

              {/* Core Capabilities */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                  {t('services.keyFeatures')}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables & Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-black/[0.08] dark:border-white/[0.08] mb-8">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    {t('services.deliverables')}
                  </h4>
                  <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {activeService.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#FF5500]" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                    {t('services.techStack')}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-[#0E1118] border border-black/[0.06] dark:border-white/[0.08] rounded-md font-mono-data"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA specific to this service */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t('services.ctaPrompt')}
                </div>
                <button
                  onClick={() => onSelectServiceForQuote(activeService.title)}
                  className="px-5 py-2.5 bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span>{t('services.ctaButton')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
