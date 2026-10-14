import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Search, 
  X, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Calculator, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Coins,
  Code2,
  Layers
} from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WynxLogo } from './brand/WynxLogo';
import { WynxMotif } from './brand/WynxMotif';

export interface FAQItem {
  id: string;
  category: 'pricing' | 'process' | 'ownership' | 'tech';
  question: {
    en: string;
    fr: string;
  };
  answer: {
    en: string;
    fr: string;
  };
  highlightKey?: {
    en: string;
    fr: string;
  };
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'pricing-structure',
    category: 'pricing',
    question: {
      en: 'How much does a typical project cost with WYNX and how is pricing calculated?',
      fr: 'Combien coûte un projet avec WYNX et comment vos tarifs sont-ils calculés ?'
    },
    answer: {
      en: 'We operate on transparent, milestone-gated pricing with zero hidden fees. High-converting landing pages and brand MVP platforms start at $3,500. Comprehensive custom web applications, SaaS MVPs, and complex e-commerce platforms typically range between $8,000 and $25,000+. Mobile applications (iOS & Android native) range from $10,000+. Every quote includes UI/UX design, edge-native deployment, technical SEO, and full QA testing. You can also use our interactive price simulator to test real estimates in seconds.',
      fr: 'Nous appliquons une tarification transparente et forfaitaire par jalons, sans aucun coût caché. Les sites vitrines et plateformes MVP démarrent à partir de 3 200 € / 3 500 $. Les applications web sur-mesure, SaaS et boutiques e-commerce complexes oscillent généralement entre 8 000 € et 25 000 €+. Les applications mobiles (iOS & Android) débutent à 10 000 €+. Chaque proposition intègre le design UI/UX, le développement, le SEO technique et les tests d\'assurance qualité. Vous pouvez simuler votre tarif instantanément grâce à notre simulateur en ligne.'
    },
    highlightKey: {
      en: 'Milestone-gated · Zero hidden fees · Turnkey deliverables',
      fr: 'Forfaits par jalons · Zéro frais cachés · Livrables clés en main'
    }
  },
  {
    id: 'delivery-timelines',
    category: 'process',
    question: {
      en: 'What are typical project turnaround times and delivery timelines?',
      fr: 'Quels sont vos délais moyens de réalisation et de livraison ?'
    },
    answer: {
      en: 'Fast time-to-market is one of our defining advantages. Turnkey marketing platforms and brand revamps take 2 to 3 weeks. Custom web platforms, client portals, and SaaS MVPs are deployed in 4 to 8 weeks. Native mobile apps take 6 to 10 weeks. We work in disciplined 2-week agile sprints, providing private staging links, video progress demos, and roadmap checkpoints at every stage.',
      fr: 'La vélocité d\'exécution est l\'un de nos atouts majeurs. Les sites vitrines d\'envergure et refontes de marque sont livrés en 2 à 3 semaines. Les applications web sur-mesure et plateformes SaaS MVP sont déployées en 4 à 8 semaines. Les applications mobiles natives nécessitent 6 à 10 semaines. Nous fonctionnons par sprints agiles de 2 semaines avec accès à des environnements de préproduction privés et points d\'avancement réguliers.'
    },
    highlightKey: {
      en: '2–3 weeks for brand sites · 4–8 weeks for custom platforms',
      fr: '2–3 semaines pour sites vitrines · 4–8 semaines pour SaaS/Web apps'
    }
  },
  {
    id: 'ip-ownership',
    category: 'ownership',
    question: {
      en: 'Who owns the code, design assets, and intellectual property upon completion?',
      fr: 'Qui est propriétaire du code source, du design et des créations ?'
    },
    answer: {
      en: 'You own 100% of all intellectual property, source code, database architectures, Figma prototypes, and design systems from day one of final delivery. We never impose proprietary platform locks, licensing penalties, or vendor lock-in. Everything is transferred cleanly to your private GitHub or GitLab organizations alongside thorough documentation and deployment runbooks.',
      fr: 'Vous êtes propriétaire à 100 % de l\'ensemble du code source, des bases de données, des composants Figma et des systèmes de design dès la livraison finale. Aucun système propriétaire verrouillé, aucune redevance cachée. L\'ensemble du code est transféré directement sur vos dépôts privés (GitHub, GitLab) avec une documentation technique complète.'
    },
    highlightKey: {
      en: '100% full intellectual property transfer · Private Git repository',
      fr: 'Cession totale des droits à 100 % · Dépôt Git privé & documentation'
    }
  },
  {
    id: 'post-launch-maintenance',
    category: 'ownership',
    question: {
      en: 'What happens after launch? Do you provide maintenance, support, and SLAs?',
      fr: 'Que se passe-t-il après la mise en ligne ? Proposez-vous un support et une maintenance ?'
    },
    answer: {
      en: 'Every deployed product includes a complimentary 30-day post-launch warranty with priority bug resolution and infrastructure monitoring. After launch, we offer monthly maintenance and continuous evolution retainers covering security updates, serverless scaling, database backups, performance monitoring, and iterative feature development with a guaranteed 4-hour emergency SLA.',
      fr: 'Chaque projet bénéficie d\'une garantie de 30 jours offerte après mise en ligne, couvrant la correction immédiate des anomalies et le monitoring. Ensuite, nous proposons des contrats de maintenance préventive et d\'évolution continue incluant les mises à jour de sécurité, le scaling d\'infrastructure, les sauvegardes et un SLA garanti avec prise en charge sous 4h ouvrées.'
    },
    highlightKey: {
      en: '30-day free warranty · 4-hour SLA response for active retainers',
      fr: 'Garantie 30 jours offerte · SLA d\'intervention sous 4h'
    }
  },
  {
    id: 'existing-codebase',
    category: 'process',
    question: {
      en: 'Can you take over, audit, or accelerate an existing codebase or work with our internal team?',
      fr: 'Pouvez-vous auditer, refondre ou accélérer un code existant avec notre équipe ?'
    },
    answer: {
      en: 'Absolutely. Over 40% of our engagements involve taking over existing repositories, modernizing legacy systems, or augmenting in-house engineering teams. We start with a comprehensive 48-hour technical architecture audit (analyzing performance bottlenecks, security flaws, UI inconsistencies, and code quality) before establishing an actionable refactoring and scaling plan.',
      fr: 'Absolument. Plus de 40 % de nos missions consistent à auditer, refactoriser ou accélérer des projets existants, ou à intervenir en renfort d\'équipes internes. Nous réalisons un audit d\'architecture complet sous 48h (détection des goulots d\'étranglement, failles de sécurité, dette technique et ergonomie) avant de poser une feuille de route claire.'
    },
    highlightKey: {
      en: '48h technical audit · Seamless GitHub/Jira integration',
      fr: 'Audit technique sous 48h · Intégration fluide à vos processus'
    }
  },
  {
    id: 'tech-stack-performance',
    category: 'tech',
    question: {
      en: 'What technologies do you use and how do you guarantee performance and SEO?',
      fr: 'Quelles technologies utilisez-vous et comment garantissez-vous la performance et le SEO ?'
    },
    answer: {
      en: 'We build exclusively on modern, resilient stacks: React, Next.js, TypeScript, Tailwind CSS, Node.js, Go, PostgreSQL, Redis, and edge serverless infrastructures (Vercel, AWS, Cloudflare). We enforce a 95+ score on Google PageSpeed Insights, sub-100ms TTFB, and full compliance with Core Web Vitals, Schema.org rich markup, and OpenGraph standards to ensure high conversion rates and search rankings.',
      fr: 'Nous développons exclusivement avec des technologies modernes et éprouvées : React, Next.js, TypeScript, Tailwind CSS, Node.js, Go, PostgreSQL, Redis et architectures serverless (Vercel, AWS, Cloudflare). Nous garantissons un score de 95+ sur Google PageSpeed Insights, un temps de réponse sub-100ms et le respect strict des critères Core Web Vitals et balises sémantiques Schema.org.'
    },
    highlightKey: {
      en: 'React / Next.js / TypeScript · 95+ PageSpeed & sub-100ms TTFB',
      fr: 'React / Next.js / TypeScript · Score 95+ PageSpeed garanti'
    }
  },
  {
    id: 'contracts-nda-payments',
    category: 'pricing',
    question: {
      en: 'How are NDAs, contractual agreements, and payment schedules structured?',
      fr: 'Comment sont encadrés les accords de confidentialité (NDA), contrats et paiements ?'
    },
    answer: {
      en: 'All client consultations and project briefs are automatically protected under our mutual Non-Disclosure Agreement (NDA). Payments are structured strictly around validated delivery milestones: typically 30% initial deposit at kickoff, 30% upon approval of the interactive staging prototype, and 40% after final QA and domain deployment signoff.',
      fr: 'Chaque collaboration débute sous la protection d\'un accord de confidentialité bilatéral (NDA). Les paiements sont échelonnés en fonction de jalons concrets et validés : généralement 30 % au démarrage, 30 % à la validation de la préproduction interactive, et 40 % après validation des recettes finales et mise en production.'
    },
    highlightKey: {
      en: 'Automated NDA · Milestone-based staged payments (30/30/40)',
      fr: 'NDA systématique · Règlements échelonnés par jalons réels'
    }
  },
  {
    id: 'why-wynx-vs-freelancers',
    category: 'ownership',
    question: {
      en: 'Why choose WYNX over freelance marketplaces or large traditional consulting firms?',
      fr: 'Pourquoi choisir WYNX plutôt que des freelances ou de grands cabinets traditionnels ?'
    },
    answer: {
      en: 'Freelancers often lack multi-disciplinary cohesion across design, DevOps, and SEO. Big legacy agencies, on the other hand, charge exorbitant management overhead and delegate your critical code to junior hires. WYNX offers the best of both worlds: boutique responsiveness, direct access to senior architects and designers who actually code, uncompromising velocity, and institutional-grade reliability.',
      fr: 'Les freelances manquent souvent de vision transversale entre design, DevOps et SEO. À l\'inverse, les grandes agences traditionnelles facturent des frais de structure astronomiques et délèguent vos projets à des profils juniors. Chez WYNX, vous traitez directement avec des experts seniors passionnés qui conçoivent et codent, avec une agilité maximale et une garantie contractuelle.'
    },
    highlightKey: {
      en: 'Direct senior architect contact · Zero junior delegation',
      fr: 'Contact direct avec les experts seniors · Zéro dilution de qualité'
    }
  }
];

interface FAQSectionProps {
  onAskQuestionInContact: (topic: string) => void;
  onOpenEstimator: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onAskQuestionInContact,
  onOpenEstimator
}) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'pricing' | 'process' | 'ownership' | 'tech'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['pricing-structure', 'delivery-timelines']);

  // Toggle accordion item
  const toggleItem = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter items by category and search
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const questionText = item.question[language].toLowerCase();
      const answerText = item.answer[language].toLowerCase();
      const highlight = item.highlightKey?.[language]?.toLowerCase() || '';

      return questionText.includes(q) || answerText.includes(q) || highlight.includes(q);
    });
  }, [activeCategory, searchQuery, language]);

  // Schema.org FAQPage Structured Data for Rich Snippets SEO
  const faqSchemaData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_ITEMS.map(item => ({
        '@type': 'Question',
        'name': item.question[language],
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer[language]
        }
      }))
    };
  }, [language]);

  const categories = [
    { key: 'all', label: t('faq.all'), icon: <Layers className="w-3.5 h-3.5" /> },
    { key: 'pricing', label: t('faq.cat.pricing'), icon: <Coins className="w-3.5 h-3.5" /> },
    { key: 'process', label: t('faq.cat.process'), icon: <Clock className="w-3.5 h-3.5" /> },
    { key: 'ownership', label: t('faq.cat.ownership'), icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { key: 'tech', label: t('faq.cat.tech'), icon: <Code2 className="w-3.5 h-3.5" /> }
  ] as const;

  return (
    <section 
      id="faq" 
      className="py-24 md:py-32 bg-[#F8F9FC] dark:bg-[#090A0D] border-t border-black/[0.06] dark:border-white/[0.06] relative overflow-hidden transition-colors duration-200"
      aria-labelledby="faq-heading"
    >
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData).replace(/</g, '\\u003c') }}
      />

      {/* Subtle brand texture backdrop */}
      <WynxMotif variant="gold" opacity={0.03} density="large" />

      {/* Ambient glowing gradient orbs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header Section */}
        <Reveal direction="up" delayMs={40}>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>{t('faq.kicker')}</span>
            </div>
            <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-4 transition-colors">
              {t('faq.title')}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed transition-colors">
              {t('faq.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Filter Toolbar: Search Bar + Category Pills */}
        <Reveal direction="up" delayMs={80} className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Live Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#121622] border border-neutral-300 dark:border-white/[0.08] focus:border-[#FF5500]/60 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/25'
                        : 'bg-neutral-100 dark:bg-[#121622] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300/80 dark:border-white/[0.06] hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Accordion List */}
        <div className="space-y-4 mb-16 max-w-4xl">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-6 bg-neutral-100 dark:bg-[#111420] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl">
              <HelpCircle className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
              <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm mb-3">
                {t('faq.noMatch')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 dark:hover:bg-white/15 text-neutral-900 dark:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {t('faq.resetSearch')}
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isOpen = openIds.includes(item.id);
              const headingId = `faq-q-${item.id}`;
              const panelId = `faq-a-${item.id}`;

              return (
                <Reveal key={item.id} direction="up" delayMs={Math.min(idx * 40, 200)}>
                  <div
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen
                        ? 'bg-white dark:bg-[#121624] border-[#FF5500]/50 shadow-md dark:shadow-xl shadow-[#FF5500]/5'
                        : 'bg-white dark:bg-[#0E111A] hover:bg-neutral-50 dark:hover:bg-[#121522] border-black/[0.08] dark:border-white/[0.07] hover:border-black/20 dark:hover:border-white/[0.15]'
                    }`}
                  >
                    {/* Accordion Question Trigger Header */}
                    <button
                      type="button"
                      id={headingId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none group"
                    >
                      <div className="space-y-1.5 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-data text-[11px] font-bold text-[#FF5500] uppercase tracking-wider">
                            0{idx + 1}
                          </span>
                          <span className="text-neutral-400 dark:text-neutral-500 text-xs">·</span>
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                            {item.category === 'pricing' && t('faq.cat.pricing')}
                            {item.category === 'process' && t('faq.cat.process')}
                            {item.category === 'ownership' && t('faq.cat.ownership')}
                            {item.category === 'tech' && t('faq.cat.tech')}
                          </span>
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 dark:text-white group-hover:text-[#FF5500] dark:group-hover:text-amber-100 transition-colors leading-snug">
                          {item.question[language]}
                        </h3>
                      </div>

                      {/* Rotating Chevron Indicator */}
                      <div
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#FF5500] text-white border-[#FF5500] rotate-180'
                            : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-white/10 group-hover:text-black dark:group-hover:text-white group-hover:border-black/20 dark:group-hover:border-white/20'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                      </div>
                    </button>

                    {/* Expandable Accordion Answer Panel */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-black/[0.06] dark:border-white/[0.04] text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed space-y-4">
                          <p>{item.answer[language]}</p>

                          {item.highlightKey && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF6600] dark:text-[#FF8800] text-[11px] font-mono-data font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                              <span>{item.highlightKey[language]}</span>
                            </div>
                          )}

                          {/* Quick prefill direct ask link */}
                          <div className="pt-2 flex items-center gap-4 text-xs">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAskQuestionInContact(item.question[language]);
                              }}
                              className="text-[#FF5500] hover:text-[#FFA000] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer group/link"
                            >
                              <span>
                                {language === 'fr' 
                                  ? 'Poser une question spécifique sur ce sujet' 
                                  : 'Ask a specific question regarding this topic'}
                              </span>
                              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })
          )}
        </div>

        {/* High-Converting Pre-Contact Friction Buster Callout */}
        <Reveal direction="up" delayMs={120}>
          <div className="relative rounded-2xl bg-gradient-to-r from-neutral-100 via-white to-neutral-100 dark:from-[#141928] dark:via-[#101420] dark:to-[#151A29] border border-black/[0.08] dark:border-[#FF5500]/30 p-7 sm:p-10 shadow-lg dark:shadow-2xl overflow-hidden transition-colors">
            {/* Background Emblem Accent */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none hidden sm:block">
              <WynxLogo variant="emblem-gold" height="180px" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-2.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FF5500]/15 border border-[#FF5500]/30 text-[#FF6600] text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'fr' ? 'Échange Direct avec un Lead Tech' : 'Direct Conversation with a Lead Architect'}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white transition-colors">
                  {t('faq.unansweredTitle')}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed transition-colors">
                  {t('faq.unansweredDesc')}
                </p>
              </div>

              {/* Action Buttons with magnetic physics support */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  onClick={onOpenEstimator}
                  data-cursor="magnetic"
                  className="btn-magnetic px-5 py-3.5 bg-white dark:bg-[#171D2D] hover:bg-neutral-100 dark:hover:bg-[#1E253A] border border-neutral-300 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20 text-neutral-800 dark:text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm dark:shadow-lg whitespace-nowrap will-change-transform"
                >
                  <Calculator className="w-4 h-4 text-[#FF5500]" />
                  <span>{t('faq.estimatorBtn')}</span>
                </button>

                <button
                  onClick={() => onAskQuestionInContact(language === 'fr' ? 'Question générale sur vos services' : 'General inquiry regarding your services')}
                  data-cursor="magnetic"
                  className="btn-magnetic px-6 py-3.5 bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-semibold rounded-xl shadow-xl shadow-[#FF5500]/25 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap will-change-transform"
                >
                  <span>{t('faq.contactBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
