import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types';
import { useSiteData } from '../context/SiteDataContext';
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WynxLogo } from './brand/WynxLogo';
import { WynxMotif } from './brand/WynxMotif';

interface ContactSectionProps {
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledService }) => {
  const { language, t } = useLanguage();
  const { addQuote, globalSettings } = useSiteData();

  const servicesListByLang: Record<Language, string[]> = {
    en: [
      'Web Engineering & SaaS Platforms',
      'Mobile Apps (iOS & Android)',
      'UI/UX Design & Prototyping',
      'Branding & Digital Identity',
      'Technical SEO & Growth Strategy',
      'Cloud Architecture & DevOps'
    ],
    fr: [
      'Ingénierie Web & Plateformes SaaS',
      'Applications Mobiles (iOS & Android)',
      'UI/UX Design & Prototypage',
      'Branding & Identité Numérique',
      'SEO Technique & Croissance Organique',
      'Cloud, DevOps & Hébergement'
    ]
  };

  const budgetOptionsByLang: Record<Language, string[]> = {
    en: [
      '< $3,500 / €3,000',
      '$3,500 – $11,000 (€3,000 – €10,000)',
      '$11,000 – $28,000 (€10,000 – €25,000)',
      '> $28,000 / €25,000'
    ],
    fr: [
      '< 3 000 €',
      '3 000 € – 10 000 €',
      '10 000 € – 25 000 €',
      '> 25 000 €'
    ]
  };

  const timelineOptionsByLang: Record<Language, string[]> = {
    en: [
      'Urgent (< 1 month)',
      '1 to 3 months',
      '3 to 6 months',
      'Flexible roadmap'
    ],
    fr: [
      'Urgent (< 1 mois)',
      '1 à 3 mois',
      '3 à 6 mois',
      'Flexible'
    ]
  };

  const servicesList = servicesListByLang[language] || servicesListByLang.en;
  const budgetOptions = budgetOptionsByLang[language] || budgetOptionsByLang.en;
  const timelineOptions = timelineOptionsByLang[language] || timelineOptionsByLang.en;

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceNeeded: [servicesList[0]],
    budgetRange: budgetOptions[1],
    timeline: timelineOptions[1],
    projectDetails: ''
  });

  // When language switches, ensure initial options adapt gracefully
  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: [prefilledService] }));
    }
  }, [prefilledService]);

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const toggleService = (srv: string) => {
    setFormData((prev) => {
      const exists = prev.serviceNeeded.includes(srv);
      if (exists) {
        return {
          ...prev,
          serviceNeeded: prev.serviceNeeded.filter((s) => s !== srv)
        };
      } else {
        return {
          ...prev,
          serviceNeeded: [...prev.serviceNeeded, srv]
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectDetails.trim()) {
      setErrorMsg(t('contact.errorEmpty'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg(t('contact.errorEmail'));
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const quote = await addQuote({
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        company: formData.company,
        services: formData.serviceNeeded,
        budget: formData.budgetRange,
        timeline: formData.timeline,
        description: formData.projectDetails
      });
      setSubmittedQuoteId(quote.id);
      setLoading(false);
      setSubmitted(true);
    } catch {
      setErrorMsg(t('contact.errorSubmit'));
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F8F9FC] dark:bg-[#090A0D] border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-200">
      {/* Official WYNX Motif Ambient Pattern */}
      <WynxMotif variant="gold" opacity={0.03} density="compact" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact Details */}
          <Reveal direction="up" delayMs={50} className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
                {t('contact.kicker')}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] transition-colors">
                {t('contact.title')}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed transition-colors">
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4 pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.06] shadow-xs">
                <div className="p-2.5 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{t('contact.emailLabel')}</div>
                  <a href={`mailto:${globalSettings.contactEmail}`} className="text-sm font-semibold text-neutral-950 dark:text-white hover:text-[#FF5500] transition-colors">
                    {globalSettings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.06] shadow-xs">
                <div className="p-2.5 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{t('contact.phoneLabel')}</div>
                  <a href={`tel:${globalSettings.contactPhone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-neutral-950 dark:text-white hover:text-[#FF5500] transition-colors">
                    {globalSettings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.06] shadow-xs">
                <div className="p-2.5 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{t('contact.hqLabel')}</div>
                  <div className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {globalSettings.address ? `${globalSettings.address} · ${globalSettings.country}` : t('contact.hqVal')}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust and SLA notice with official WYNX emblem seal */}
            <div className="p-5 rounded-xl bg-neutral-100 dark:bg-[#0D1017] border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-800 dark:text-neutral-300 space-y-2 relative overflow-hidden transition-colors">
              <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
                <WynxLogo variant="emblem-gold" height="70px" />
              </div>
              <div className="flex items-center gap-2 text-neutral-950 dark:text-white font-semibold relative z-10">
                <ShieldCheck className="w-4 h-4 text-[#FF5500]" />
                <span>{t('contact.ndaTitle')}</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed relative z-10">
                {t('contact.ndaDesc')}
              </p>
            </div>
          </Reveal>

          {/* Right Column: Lead Capture Form */}
          <Reveal direction="up" delayMs={120} className="lg:col-span-7">
            <div className="bg-white dark:bg-[#111520] border border-black/[0.08] dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl dark:shadow-2xl relative transition-colors">
            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-neutral-950 dark:text-white mb-2">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {t('contact.successDesc')
                      .replace('{name}', formData.fullName)
                      .replace('{services}', formData.serviceNeeded.join(', '))}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-[#161B28] border border-black/[0.08] dark:border-white/[0.08] max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono-data">
                  {submittedQuoteId && (
                    <div className="text-neutral-600 dark:text-neutral-400">
                      {t('contact.refLabel')} <span className="text-[#FF5500]">{submittedQuoteId}</span>
                    </div>
                  )}
                  <div className="text-neutral-600 dark:text-neutral-400">{t('contact.budgetLabel')} <span className="text-neutral-950 dark:text-white">{formData.budgetRange}</span></div>
                  <div className="text-neutral-600 dark:text-neutral-400">{t('contact.timelineLabel')} <span className="text-neutral-950 dark:text-white">{formData.timeline}</span></div>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      company: '',
                      serviceNeeded: [servicesList[0]],
                      budgetRange: budgetOptions[1],
                      timeline: timelineOptions[1],
                      projectDetails: ''
                    });
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-neutral-200 dark:bg-[#1A2030] rounded-md transition-colors cursor-pointer"
                >
                  {t('contact.newRequest')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Services Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
                    {t('contact.step1')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {servicesList.map((srv) => {
                      const isSelected = formData.serviceNeeded.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`p-3 text-left rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#FF5500]/15 border-[#FF5500] text-[#FF5500] font-semibold shadow-xs'
                              : 'bg-neutral-50 dark:bg-[#151925]/70 border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#181D2C]'
                          }`}
                        >
                          <span className="line-clamp-1">{srv}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#FF5500] bg-[#FF5500]' : 'border-neutral-400 dark:border-neutral-600'}`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget & Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      {t('contact.step2')}
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white focus:border-[#FF5500] focus:outline-none transition-colors"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-[#11141E] text-neutral-900 dark:text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      {t('contact.step3')}
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white focus:border-[#FF5500] focus:outline-none transition-colors"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-[#11141E] text-neutral-900 dark:text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. User Identity Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-1.5">
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t('contact.namePlaceholder')}
                      className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-[#FF5500] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-1.5">
                      {t('contact.emailFieldLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-[#FF5500] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-1.5">
                      {t('contact.phoneFieldLabel')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+227 90 00 00 00"
                      className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-[#FF5500] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-1.5">
                      {t('contact.companyLabel')}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('contact.companyPlaceholder')}
                      className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-[#FF5500] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 4. Project description */}
                <div>
                  <label className="block text-xs text-neutral-700 dark:text-neutral-300 font-medium mb-1.5">
                    {t('contact.detailsLabel')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder={t('contact.detailsPlaceholder')}
                    className="w-full bg-neutral-50 dark:bg-[#151925] border border-neutral-300 dark:border-white/10 rounded-lg p-3.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-[#FF5500] focus:outline-none transition-colors"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="magnetic"
                  className="btn-magnetic w-full py-4 bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-xl shadow-[#FF5500]/25 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 will-change-transform"
                >
                  {loading ? (
                    <span>{t('contact.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('contact.submitBtn')}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
