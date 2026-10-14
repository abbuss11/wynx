import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WynxMotif } from './brand/WynxMotif';

interface NewsletterProps {
  className?: string;
  variant?: 'card' | 'inline';
}

interface NewsletterLead {
  email: string;
  subscribedAt: string;
  source: string;
  language: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({ className = '', variant = 'card' }) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const validateEmail = (val: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus('error');
      setErrorMessage(t('newsletter.errorEmpty'));
      return;
    }

    if (!validateEmail(trimmed)) {
      setStatus('error');
      setErrorMessage(t('newsletter.errorInvalid'));
      return;
    }

    setStatus('loading');

    // Simulate lead capture network round-trip & store in localStorage
    setTimeout(() => {
      try {
        const existingData = localStorage.getItem('wynx_newsletter_leads');
        const leads: NewsletterLead[] = existingData ? JSON.parse(existingData) : [];

        const isDuplicate = leads.some((lead) => lead.email.toLowerCase() === trimmed.toLowerCase());

        if (isDuplicate) {
          setStatus('error');
          setErrorMessage(t('newsletter.alreadySubscribed'));
          return;
        }

        const newLead: NewsletterLead = {
          email: trimmed,
          subscribedAt: new Date().toISOString(),
          source: 'footer_newsletter',
          language
        };

        leads.push(newLead);
        localStorage.setItem('wynx_newsletter_leads', JSON.stringify(leads));

        setRegisteredEmail(trimmed);
        setEmail('');
        setStatus('success');
      } catch (err) {
        console.error('Failed to save newsletter subscription', err);
        // Still treat as success for user experience
        setRegisteredEmail(trimmed);
        setEmail('');
        setStatus('success');
      }
    }, 600);
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setEmail('');
  };

  return (
    <div className={`relative ${className}`}>
      {variant === 'card' ? (
        <Reveal direction="up" delayMs={60}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#131724] to-[#0D101A] border border-white/[0.08] p-7 sm:p-10 shadow-2xl">
            {/* Ambient Background Pattern & Glows */}
            <WynxMotif variant="gold" opacity={0.06} density="compact" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {status === 'success' ? (
                <div className="py-4 text-center max-w-lg mx-auto space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                      {t('newsletter.successTitle')}
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {t('newsletter.successDesc').replace('{email}', registeredEmail)}
                    </p>
                  </div>

                  {/* Topic Badges Preview */}
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-data bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                      #EdgeArchitecture
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-data bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                      #WebPerformance
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-data bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                      #ProductStrategy
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-data bg-white/[0.05] text-neutral-300 border border-white/[0.06]">
                      #AIEngineering
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      {t('newsletter.subscribeAnother')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Heading & Value Proposition */}
                  <div className="lg:col-span-6 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/25 text-[#FF5500] text-[11px] font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('newsletter.badge')}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
                      {t('newsletter.title')}
                    </h3>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md">
                      {t('newsletter.subtitle')}
                    </p>

                    {/* Social proof metric */}
                    <div className="flex items-center gap-2 pt-1 text-xs text-neutral-400">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 ring-2 ring-[#0D101A]" />
                        <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 ring-2 ring-[#0D101A]" />
                        <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 ring-2 ring-[#0D101A]" />
                      </div>
                      <span className="font-mono-data text-neutral-300 font-medium text-[11px]">
                        {t('newsletter.subscriberCount')}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Clean Lead Capture Form */}
                  <div className="lg:col-span-6">
                    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <div className="relative flex-1">
                          <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (status === 'error') {
                                setStatus('idle');
                                setErrorMessage('');
                              }
                            }}
                            placeholder={t('newsletter.placeholder')}
                            disabled={status === 'loading'}
                            aria-label={t('newsletter.placeholder')}
                            className="w-full bg-[#090C14] border border-white/[0.12] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-xl pl-10 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-all disabled:opacity-50"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          data-cursor="magnetic"
                          className="btn-magnetic px-6 py-3.5 bg-[#FF5500] hover:bg-[#E64D00] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-[#FF5500]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 whitespace-nowrap will-change-transform"
                        >
                          {status === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>{t('newsletter.submitting')}</span>
                            </>
                          ) : (
                            <>
                              <span>{t('newsletter.button')}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Error Banner */}
                      {status === 'error' && (
                        <div className="text-rose-400 text-xs flex items-center gap-1.5 animate-in fade-in">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Privacy reassurance note */}
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                        <span>{t('newsletter.privacy')}</span>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      ) : (
        /* Compact inline layout if used in narrow columns */
        <div>
          {status === 'success' ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <div>
                <div className="font-semibold text-white">{t('newsletter.successTitle')}</div>
                <div className="text-[11px] text-neutral-300 mt-0.5">{registeredEmail}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2" noValidate>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder={t('newsletter.placeholder')}
                  disabled={status === 'loading'}
                  className="w-full bg-[#10131E] border border-white/[0.1] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-2.5 bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>{t('newsletter.button')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-rose-400 text-[11px]">{errorMessage}</p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};
