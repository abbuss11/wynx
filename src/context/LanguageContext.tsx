import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.services': 'Services',
    'nav.portfolio': 'Work',
    'nav.process': 'Methodology',
    'nav.blog': 'Tech Insights',
    'nav.faq': 'FAQ',
    'nav.about': 'About',
    'nav.estimate': 'Estimate Project',
    'nav.mobileEstimate': 'Estimate project online',

    // Hero
    'hero.kicker': 'Digital Engineering & Product Strategy Studio',
    'hero.location': 'Niamey & Global Reach',
    'hero.titleLine1': 'Dare to see ',
    'hero.titleLine1Highlight': 'Further',
    'hero.titleLine2': 'Dare ',
    'hero.description': 'We engineer scalable web platforms, high-performance mobile apps, and iconic brand identities. We transform bold visions into dominant digital products.',
    'hero.ctaLaunch': 'Start Your Project',
    'hero.ctaWork': 'Explore Our Work',
    'hero.perfBadge': 'Performance & 2026 Standards',
    'hero.perfDesc': 'JAMstack & Edge native architecture. 100% of our production apps hit 95+ Google PageSpeed and sub-100ms response times.',
    'hero.metric1': 'Digital products deployed',
    'hero.metric2': 'Client satisfaction rate',
    'hero.metric3': 'Time to first byte (TTFB)',
    'hero.metric4': 'Average growth multiplier',

    // Services
    'services.kicker': 'Tailored Software Solutions',
    'services.title': 'Our Core Disciplines',
    'services.subtitle': 'A holistic engineering approach where design, clean code, and business conversion converge into unfair competitive advantage.',
    'services.serviceLabel': 'Service',
    'services.guaranteedImpact': 'Guaranteed Impact',
    'services.keyFeatures': 'Key Capabilities & Specifications',
    'services.deliverables': 'Deliverables Provided',
    'services.techStack': 'Tech Stack',
    'services.ctaPrompt': 'Ready to integrate this discipline into your roadmap?',
    'services.ctaButton': 'Request a proposal for this service',

    // Portfolio
    'portfolio.kicker': 'Interactive Portfolio & Case Studies',
    'portfolio.title': 'Client Success Stories',
    'portfolio.subtitle': 'Discover how we helped early-stage startups and high-growth companies overhaul their tech stacks and accelerate revenue.',
    'portfolio.all': 'All Case Studies',
    'portfolio.saas': 'SaaS & Platforms',
    'portfolio.ecommerce': 'E-Commerce',
    'portfolio.mobile': 'Mobile Apps',
    'portfolio.branding': 'Branding & Strategy',
    'portfolio.searchPlaceholder': 'Search by tech or keyword (React, Stripe, Mobile...)...',
    'portfolio.noResults': 'No projects match your search criteria.',
    'portfolio.reset': 'Reset filters',
    'portfolio.viewCaseStudy': 'Case study',
    'portfolio.modalTag': 'Case Study',
    'portfolio.modalResults': 'Quantified Metrics & Business Impact',
    'portfolio.modalProblem': 'The Initial Challenge',
    'portfolio.modalSolution': 'The WYNX Solution',
    'portfolio.modalTech': 'Technologies & Tools Employed',
    'portfolio.modalPrompt': 'Need a similar outcome for your digital product?',
    'portfolio.modalQuoteBtn': 'Request similar project quote',

    // Process
    'process.kicker': 'Engineering Rigor & Speed',
    'process.title': 'Our 5-Phase Methodology',
    'process.subtitle': 'A transparent engineering process eliminating "black box" uncertainties while locking in timeline and budget guarantees.',
    'process.stepPrefix': 'Step',
    'process.phasePrefix': 'Phase',
    'process.durationPrefix': 'Estimated duration:',
    'process.deliverablesTitle': 'Key Milestones & Concrete Deliverables',

    // Testimonials
    'testimonials.kicker': 'Proven Impact & Client Trust',
    'testimonials.title': 'What Our Partners Say',
    'testimonials.subtitle': 'Built on transparency, engineering excellence, and measurable economic lift.',
    'testimonials.resultPrefix': 'Result:',

    // Blog
    'blog.kicker': 'Engineering & Growth Insights',
    'blog.title': 'Technical Blog & Resources',
    'blog.subtitle': 'In-depth architecture breakdowns, technical SEO strategies, and product design heuristics for resilient digital platforms.',
    'blog.all': 'All Articles',
    'blog.searchPlaceholder': 'Search articles by topic or keyword...',
    'blog.readTime': 'read',
    'blog.by': 'By',
    'blog.readFull': 'Read full article',
    'blog.noArticles': 'No articles found matching your query.',
    'blog.reset': 'View all articles',
    'blog.share': 'Share',
    'blog.copied': 'Copied',
    'blog.seoKeywords': 'Targeted SEO Keywords & Semantic Schema',
    'blog.modalPrompt': 'Want to implement this strategy in your company?',
    'blog.modalCta': 'Discuss with our SEO & Tech Lead',

    // About
    'about.kicker': 'Our DNA & Philosophy',
    'about.title': 'Who We Are',
    'about.p1': 'Founded to elevate standards in software craftsmanship and product design, WYNX is a digital engineering agency and product studio based in Niamey, serving ambitious startups and established enterprises worldwide.',
    'about.p2': 'We bring together top-tier engineering talent: cloud architects, full-stack engineers specializing in web performance (React, Next.js, TypeScript), UX product designers, and technical SEO analysts. Our motto: "Think Sharp. Build Smarter."',
    'about.stat1Label': 'Engineering hub & global client operations',
    'about.stat2Label': 'Year of founding & rapid expansion',

    // Contact
    'contact.kicker': 'Instant Project Scoping',
    'contact.title': "Let's Build Your Next Breakthrough",
    'contact.subtitle': 'Receive a technical audit and tailored estimate within 24 business hours. No aggressive sales reps: you talk directly with a lead architect and product designer.',
    'contact.emailLabel': 'Direct Email',
    'contact.phoneLabel': 'Phone Line',
    'contact.hqLabel': 'Headquarters',
    'contact.hqVal': 'Niamey, Niger · Global Availability',
    'contact.ndaTitle': 'Strict Confidentiality Guarantee',
    'contact.ndaDesc': 'All information shared is automatically safeguarded under our Non-Disclosure Agreement (NDA) upon submission.',
    'contact.step1': '1. What type of expertise do you need?',
    'contact.step2': '2. Target budget range',
    'contact.step3': '3. Desired timeline',
    'contact.nameLabel': 'Full name *',
    'contact.namePlaceholder': 'e.g. Alex Morgan',
    'contact.emailFieldLabel': 'Work email *',
    'contact.emailPlaceholder': 'e.g. alex@company.com',
    'contact.phoneFieldLabel': 'Phone number',
    'contact.companyLabel': 'Company / Brand',
    'contact.companyPlaceholder': 'e.g. Acme Tech',
    'contact.detailsLabel': 'Briefly describe your goals or existing challenges *',
    'contact.detailsPlaceholder': 'Key objectives? Do you have existing code, design specs, or an API?',
    'contact.submitBtn': 'Get My Quote & Technical Audit within 24h',
    'contact.submitting': 'Submitting request...',
    'contact.successTitle': 'Request Successfully Transmitted!',
    'contact.successDesc': 'Thank you {name}. Our lead architect is reviewing your project ({services}) and will get back to you within 24 hours with a preliminary timeline.',
    'contact.refLabel': 'Project Ref:',
    'contact.budgetLabel': 'Estimated budget:',
    'contact.timelineLabel': 'Target timeline:',
    'contact.newRequest': 'Submit another request',
    'contact.errorEmpty': 'Please provide your name, a valid email address, and a brief project description.',
    'contact.errorEmail': 'Please enter a valid email address.',
    'contact.errorSubmit': 'Your request could not be sent. Please try again later.',

    // Estimator
    'estimator.title': 'Project Budget & Timeline Estimator',
    'estimator.subtitle': 'Get an instant realistic simulation tailored to your technical requirements.',
    'estimator.step1': '1. Software Solution Type',
    'estimator.step2': '2. Required Modules & Features',
    'estimator.step3': '3. UX/UI & Product Design Scope',
    'estimator.from': 'Starting from',
    'estimator.resultTitle': 'Preliminary Budget Estimate',
    'estimator.deliveryTime': 'Estimated timeline: {weeks} weeks turnkey',
    'estimator.cta': 'Confirm & Request Formal Proposal',

    // Footer
    'footer.tagline': 'Software engineering studio, mobile applications, and avant-garde design. Partnering with visionary founders and leaders.',
    'footer.servicesTitle': 'Services',
    'footer.navTitle': 'Navigation',
    'footer.socialTitle': 'Networks & Ecosystem',
    'footer.socialDesc': 'Follow our technical engineering logs and software architecture insights:',
    'footer.rights': 'WYNX Agency. All rights reserved. Think Sharp. Build Smarter.',
    'footer.backToTop': 'Back to top',

    // Newsletter
    'newsletter.badge': 'WYNX Engineering Dispatch',
    'newsletter.title': 'Stay ahead with our latest innovation insights',
    'newsletter.subtitle': 'Join 2,400+ founders, CTOs, and product leaders receiving our bi-weekly breakdown of cloud architecture, AI engineering, and web performance.',
    'newsletter.placeholder': 'Enter your work email address...',
    'newsletter.button': 'Subscribe',
    'newsletter.submitting': 'Subscribing...',
    'newsletter.successTitle': 'Welcome to the WYNX Insider Circle!',
    'newsletter.successDesc': 'We\'ve added {email} to our dispatch list. You will receive our latest technical report in your inbox shortly.',
    'newsletter.subscribeAnother': 'Register another email',
    'newsletter.privacy': 'Strict zero-spam policy. Unsubscribe in 1-click anytime.',
    'newsletter.errorEmpty': 'Please provide your work email address.',
    'newsletter.errorInvalid': 'Please enter a valid email address (e.g. name@company.com).',
    'newsletter.alreadySubscribed': 'This email is already subscribed to our newsletter.',
    'newsletter.subscriberCount': '2,400+ innovators subscribed',

    // FAQ
    'faq.kicker': 'Clear Answers & Client Assurance',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our engineering standards, timelines, pricing transparency, and IP ownership before getting started.',
    'faq.searchPlaceholder': 'Search answers (pricing, timeline, ownership, maintenance...)...',
    'faq.all': 'All Questions',
    'faq.cat.pricing': 'Pricing & Budgets',
    'faq.cat.process': 'Timelines & Process',
    'faq.cat.ownership': 'IP & Guarantees',
    'faq.cat.tech': 'Tech Stack & Security',
    'faq.noMatch': 'No questions match your search query.',
    'faq.resetSearch': 'View all questions',
    'faq.unansweredTitle': 'Have a specific question about your project?',
    'faq.unansweredDesc': 'Our lead architect and product strategist are available for a direct 15-minute technical review with zero sales pressure.',
    'faq.contactBtn': 'Ask Us in Contact Form',
    'faq.estimatorBtn': 'Test Price Simulator'
  },
  fr: {
    // Nav
    'nav.services': 'Services',
    'nav.portfolio': 'Réalisations',
    'nav.process': 'Méthodologie',
    'nav.blog': 'Blog SEO',
    'nav.faq': 'FAQ',
    'nav.about': 'À propos',
    'nav.estimate': 'Estimer mon projet',
    'nav.mobileEstimate': 'Estimer mon projet en ligne',

    // Hero
    'hero.kicker': "Studio d'Ingénierie Digitale & Stratégie Produit",
    'hero.location': 'Niamey & International',
    'hero.titleLine1': 'Dare to see ',
    'hero.titleLine1Highlight': 'Further',
    'hero.titleLine2': 'Dare ',
    'hero.description': 'Nous concevons des plateformes web scalables, des applications mobiles d\'exception et des identités visuelles fortes. Nous transformons votre vision audacieuse en produit technologique dominant.',
    'hero.ctaLaunch': 'Lancer votre projet',
    'hero.ctaWork': 'Explorer nos réalisations',
    'hero.perfBadge': 'Performance & Standard 2026',
    'hero.perfDesc': 'Architecture JAMstack & Edge native. 100% de nos applications obtiennent un score de 95+ sur Google PageSpeed et des temps de rendu sub-100ms.',
    'hero.metric1': 'Projets digitaux déployés',
    'hero.metric2': 'Taux de satisfaction client',
    'hero.metric3': 'Latence au premier octet (TTFB)',
    'hero.metric4': 'Multiplicateur de croissance moyen',

    // Services
    'services.kicker': 'Solutions Technologiques Sur-Mesure',
    'services.title': "Nos Domaines d'Excellence",
    'services.subtitle': 'Une approche d\'ingénierie holistique où le design, le code et la performance business convergent pour créer des avantages concurrentiels durables.',
    'services.serviceLabel': 'Service',
    'services.guaranteedImpact': 'Impact Garanti',
    'services.keyFeatures': 'Fonctionnalités & Spécifications Clés',
    'services.deliverables': 'Livrables Fournis',
    'services.techStack': 'Stack Technologique',
    'services.ctaPrompt': 'Prêt à intégrer ce service dans votre roadmap ?',
    'services.ctaButton': 'Demander un devis pour ce service',

    // Portfolio
    'portfolio.kicker': 'Portfolio Dynamique & Études de Cas',
    'portfolio.title': 'Nos Réalisations Clients',
    'portfolio.subtitle': 'Découvrez comment nous avons aidé des startups et des entreprises établies à repenser leur technologie et accélérer leur croissance.',
    'portfolio.all': 'Toutes nos réalisations',
    'portfolio.saas': 'SaaS & Plateformes',
    'portfolio.ecommerce': 'E-Commerce',
    'portfolio.mobile': 'Applications Mobiles',
    'portfolio.branding': 'Branding & Stratégie',
    'portfolio.searchPlaceholder': 'Rechercher par technologie ou mot-clé (React, Stripe...)...',
    'portfolio.noResults': 'Aucun projet ne correspond à vos critères de recherche.',
    'portfolio.reset': 'Réinitialiser les filtres',
    'portfolio.viewCaseStudy': 'Étude de cas',
    'portfolio.modalTag': 'Étude de Cas',
    'portfolio.modalResults': 'Résultats Chiffrés & Impact Business',
    'portfolio.modalProblem': 'Le Défi Initial',
    'portfolio.modalSolution': 'La Solution WYNX',
    'portfolio.modalTech': 'Technologies & Outils Employés',
    'portfolio.modalPrompt': 'Besoin d\'un résultat similaire pour votre produit ?',
    'portfolio.modalQuoteBtn': 'Demander un devis similaire',

    // Process
    'process.kicker': "Rigueur & Vélocité d'Exécution",
    'process.title': 'Notre Processus en 5 Étapes',
    'process.subtitle': 'Une méthodologie transparente qui élimine l\'effet « boîte noire » et garantit le respect strict de vos délais et budgets.',
    'process.stepPrefix': 'Étape',
    'process.phasePrefix': 'Phase',
    'process.durationPrefix': 'Durée estimée :',
    'process.deliverablesTitle': 'Actions Concrètes & Livrables de la Phase',

    // Testimonials
    'testimonials.kicker': "Preuves d'Impact & Confiance",
    'testimonials.title': 'Ce Que Disent Nos Partenaires',
    'testimonials.subtitle': 'Des collaborations fondées sur la transparence, le respect des engagements et des résultats économiques mesurables.',
    'testimonials.resultPrefix': 'Résultat :',

    // Blog
    'blog.kicker': 'Ingénierie & Croissance Digitale',
    'blog.title': 'Blog & Ressources Techniques',
    'blog.subtitle': 'Analyses pointues, bonnes pratiques d\'architecture logicielle et stratégies de référencement naturel pour bâtir des produits digitaux résilients.',
    'blog.all': 'Tous les articles',
    'blog.searchPlaceholder': 'Rechercher par thématique ou mot-clé...',
    'blog.readTime': 'de lecture',
    'blog.by': 'Par',
    'blog.readFull': "Lire l'article complet",
    'blog.noArticles': 'Aucun article ne correspond à votre recherche.',
    'blog.reset': 'Voir tous les articles',
    'blog.share': 'Partager',
    'blog.copied': 'Copié',
    'blog.seoKeywords': 'Mots-clés ciblés & Optimisations sémantiques (SEO)',
    'blog.modalPrompt': 'Vous souhaitez appliquer cette stratégie à votre entreprise ?',
    'blog.modalCta': 'Échanger avec notre expert SEO & Tech',

    // About
    'about.kicker': 'Notre ADN & Philosophie',
    'about.title': 'Qui Sommes-Nous ?',
    'about.p1': 'Fondée avec la volonté d\'élever les standards de production logicielle et de design, WYNX est une agence digitale d\'ingénierie et de design produit basée à Niamey, intervenant pour des startups, scale-ups et entreprises innovantes à l\'échelle internationale.',
    'about.p2': 'Nous réunissons sous un même toit les compétences les plus exigeantes : architectes cloud, ingénieurs full-stack spécialisés en performance web (React, Next.js, TypeScript), ergonomes produit (UI/UX) et stratèges SEO. Notre mot d\'ordre : « Think Sharp. Build Smarter. »',
    'about.stat1Label': 'Hub d\'ingénierie & présence globale',
    'about.stat2Label': 'Année de fondation & expansion',

    // Contact
    'contact.kicker': 'Conversion & Devis Immédiat',
    'contact.title': 'Parlons de Votre Prochain Projet',
    'contact.subtitle': 'Obtenez une analyse personnalisée et une estimation sous 24h ouvrées. Aucun commercial agressif : vous échangez directement avec un lead tech et un product designer.',
    'contact.emailLabel': 'Email Direct',
    'contact.phoneLabel': 'Ligne Téléphonique',
    'contact.hqLabel': 'Siège Principal',
    'contact.hqVal': 'Niamey, Niger · Disponibilité mondiale',
    'contact.ndaTitle': 'Nos Engagements de Confidentialité',
    'contact.ndaDesc': 'Toutes les informations partagées sont couvertes par un accord de non-divulgation (NDA) automatique dès la prise de contact.',
    'contact.step1': '1. Quel type d\'expertise recherchez-vous ?',
    'contact.step2': '2. Enveloppe budgétaire',
    'contact.step3': '3. Calendrier souhaité',
    'contact.nameLabel': 'Nom complet *',
    'contact.namePlaceholder': 'ex. Jean Dupont',
    'contact.emailFieldLabel': 'Email professionnel *',
    'contact.emailPlaceholder': 'ex. j.dupont@entreprise.com',
    'contact.phoneFieldLabel': 'Numéro de téléphone',
    'contact.companyLabel': 'Entreprise / Marque',
    'contact.companyPlaceholder': 'ex. Acme Corp',
    'contact.detailsLabel': 'Décrivez brièvement votre besoin ou vos objectifs *',
    'contact.detailsPlaceholder': 'Quels sont les objectifs clés ? Existe-t-il déjà une base de code ou une maquette Figma ?',
    'contact.submitBtn': 'Recevoir mon devis & audit sous 24h',
    'contact.submitting': 'Transmission en cours...',
    'contact.successTitle': 'Demande transmise avec succès !',
    'contact.successDesc': 'Merci {name}. Notre lead architecte examine votre projet ({services}) et vous répondra sous 24h avec un calendrier prévisionnel.',
    'contact.refLabel': 'Réf. Projet :',
    'contact.budgetLabel': 'Budget envisagé :',
    'contact.timelineLabel': 'Délai estimé :',
    'contact.newRequest': 'Envoyer une autre demande',
    'contact.errorEmpty': 'Veuillez renseigner votre nom, votre adresse email et quelques mots sur votre projet.',
    'contact.errorEmail': 'Veuillez renseigner une adresse email valide.',
    'contact.errorSubmit': 'Votre demande n’a pas pu être envoyée. Veuillez réessayer plus tard.',

    // Estimator
    'estimator.title': 'Simulateur de Budget & Délais de Projet',
    'estimator.subtitle': 'Calculez instantanément une estimation réaliste pour votre produit digital.',
    'estimator.step1': '1. Type de solution logicielle',
    'estimator.step2': '2. Modules et fonctionnalités requises',
    'estimator.step3': '3. Niveau d\'accompagnement ergonomique & design',
    'estimator.from': 'À partir de',
    'estimator.resultTitle': 'Estimation Budgétaire Prévisionnelle',
    'estimator.deliveryTime': 'Délai estimé : {weeks} semaines clés en main',
    'estimator.cta': 'Valider et Demander le Devis',

    // Footer
    'footer.tagline': 'Studio d\'ingénierie logicielle, applications mobiles et design d\'avant-garde. Nous accompagnons les créateurs et dirigeants exigeants.',
    'footer.servicesTitle': 'Services',
    'footer.navTitle': 'Navigation',
    'footer.socialTitle': 'Réseaux & Partenariats',
    'footer.socialDesc': 'Suivez nos veilles technologiques et publications d\'architecture logicielle :',
    'footer.rights': 'WYNX Agency. Tous droits réservés. Think Sharp. Build Smarter.',
    'footer.backToTop': 'Haut de page',

    // Newsletter
    'newsletter.badge': 'WYNX Engineering Dispatch',
    'newsletter.title': 'Gardez une longueur d\'avance sur l\'innovation tech',
    'newsletter.subtitle': 'Rejoignez plus de 2 400 fondateurs, CTOs et leaders produit recevant nos analyses bimensuelles sur l\'architecture cloud, l\'IA appliquée et la performance web.',
    'newsletter.placeholder': 'Entrez votre adresse email professionnelle...',
    'newsletter.button': 'S\'abonner',
    'newsletter.submitting': 'Inscription en cours...',
    'newsletter.successTitle': 'Bienvenue dans le cercle d\'initiés WYNX !',
    'newsletter.successDesc': 'L\'adresse {email} a bien été ajoutée à notre liste. Vous recevrez notre prochain rapport technique directement par email.',
    'newsletter.subscribeAnother': 'Inscrire une autre adresse',
    'newsletter.privacy': 'Garantie zéro spam. Désabonnement en 1 clic à tout moment.',
    'newsletter.errorEmpty': 'Veuillez saisir votre adresse email professionnelle.',
    'newsletter.errorInvalid': 'Veuillez saisir une adresse email valide (ex. nom@entreprise.com).',
    'newsletter.alreadySubscribed': 'Cette adresse email est déjà inscrite à notre veille.',
    'newsletter.subscriberCount': '+2 400 innovateurs abonnés',

    // FAQ
    'faq.kicker': 'Transparence & Réponses Claires',
    'faq.title': 'Questions Fréquentes & Rassurance',
    'faq.subtitle': 'Tout ce que vous devez savoir sur nos standards d\'ingénierie, nos délais, nos tarifs et la propriété intellectuelle avant de démarrer.',
    'faq.searchPlaceholder': 'Rechercher une question (tarifs, délais, propriété, maintenance...)...',
    'faq.all': 'Toutes les questions',
    'faq.cat.pricing': 'Tarifs & Budgets',
    'faq.cat.process': 'Délais & Processus',
    'faq.cat.ownership': 'Propriété & Garanties',
    'faq.cat.tech': 'Stack & Sécurité',
    'faq.noMatch': 'Aucune question ne correspond à votre recherche.',
    'faq.resetSearch': 'Afficher toutes les questions',
    'faq.unansweredTitle': 'Vous avez une question spécifique sur votre projet ?',
    'faq.unansweredDesc': 'Notre lead architecte et notre designer produit sont disponibles pour un échange de cadrage sans engagement commercial.',
    'faq.contactBtn': 'Poser votre question via le formulaire',
    'faq.estimatorBtn': 'Tester le simulateur de devis'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to EN as primary language for international business growth
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('wynx_language') as Language;
    return saved === 'fr' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('wynx_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
