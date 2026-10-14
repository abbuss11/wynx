import { ServiceItem } from '../types';
import { Language } from '../context/LanguageContext';

export const servicesDataByLang: Record<Language, ServiceItem[]> = {
  en: [
    {
      id: 'web-engineering',
      number: '01',
      title: 'Web Engineering & SaaS Platforms',
      tagline: 'Software architectures tailored for raw speed, conversions, and effortless scaling.',
      description: 'We architect and build bespoke web applications, enterprise SaaS platforms, and lightning-fast corporate applications using modern frameworks (React, Next.js, Node.js, GraphQL, PostgreSQL). Every build is systematically audited for a 95+ Core Web Vitals score.',
      features: [
        'Multi-tenant SaaS architectures & real-time analytics dashboards',
        'Bespoke client portals with role-based enterprise authentication',
        'High-converting headless e-commerce & unified Stripe/PayPal checkout',
        'Progressive Web Apps (PWA) with offline caching and instant load'
      ],
      deliverables: ['Documented TypeScript codebase', 'Unit & End-to-End test suites', 'Automated CI/CD pipelines', '95+ Google Lighthouse speed SLA'],
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      impactMetric: '< 150ms average server response',
      icon: 'Terminal'
    },
    {
      id: 'mobile-apps',
      number: '02',
      title: 'Native & Cross-Platform Mobile Apps',
      tagline: 'Fluid, tactile touch experiences on iOS and Android without performance bottlenecks.',
      description: 'Crafting responsive mobile experiences with React Native and Flutter. We manage the full app lifecycle: offline-first local storage, background audio/sync engines, push notification infrastructure, and App Store / Google Play release management.',
      features: [
        'High-fidelity iOS (Swift) and Android native/hybrid apps',
        'Offline-first architecture with instant conflict resolution',
        'In-app purchases, biometrics authentication, and geolocation APIs',
        'Full App Store Review Guidelines compliance & continuous deployments'
      ],
      deliverables: ['Signed release binaries (iOS IPA & Android AAB)', 'Crash monitoring & real-time telemetry console', 'Comprehensive API documentation', 'Post-launch rollout support'],
      techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
      impactMetric: '99.9% crash-free user sessions',
      icon: 'Smartphone'
    },
    {
      id: 'ui-ux-design',
      number: '03',
      title: 'UI/UX Design & Product Strategy',
      tagline: 'Intuitive user-centered interfaces that drastically cut churn and drive higher ARPU.',
      description: 'We deconstruct complex business workflows into clear, frictionless interfaces. Our design sprint methodology combines user interviews, interactive high-fidelity Figma prototyping, cognitive ergonomics, and long-term design systems.',
      features: [
        'Ergonomic audits & usability testing with real target users',
        'Interactive Figma prototypes with realistic micro-animations',
        'Scalable Design Systems & semantic token libraries for dev handoff',
        'Fitts & Hick laws cognitive optimizations for maximum conversion'
      ],
      deliverables: ['Figma Design System with component tokens', 'User-tested interactive prototypes', 'Exhaustive UX technical specs', 'Production-ready vector assets'],
      techStack: ['Figma', 'Framer', 'Protopie', 'Design Tokens', 'Tailwind', 'Storybook'],
      impactMetric: '+42% avg user engagement lift',
      icon: 'Layout'
    },
    {
      id: 'branding-identity',
      number: '04',
      title: 'Branding & Digital Identity',
      tagline: 'An unforgettable visual identity that elevates your market positioning instantly.',
      description: 'Your brand is your primary trust vector. We shape distinctive, modern, and memorable brand universes: adaptive logotypes, proprietary color harmonies, intentional typography, motion guidelines, and high-end pitch decks.',
      features: [
        'Brand positioning strategy, value proposition & manifestos',
        'Modern vector logomark systems with multi-scale legibility',
        'Comprehensive brand guidelines for digital and physical touchpoints',
        'Investor pitch deck design & social media visual kits'
      ],
      deliverables: ['50+ page Brand Bible', 'Vector logos across all web/print formats', 'Custom icon sets & typography guides', 'Motion design assets'],
      techStack: ['Adobe Illustrator', 'Photoshop', 'After Effects', 'Figma', 'Blender 3D'],
      impactMetric: '100% vector & distinctive brand voice',
      icon: 'Compass'
    },
    {
      id: 'seo-growth',
      number: '05',
      title: 'Technical SEO & Organic Visibility',
      tagline: 'Earn top rankings on Google through resilient, engineering-led organic search.',
      description: 'Search engine optimization is an engineering discipline. We optimize source code structure (Schema.org JSON-LD structured data, SSR, Core Web Vitals, semantic silos) and architect authoritative content strategies that generate qualified organic pipeline.',
      features: [
        'In-depth crawlability, indexability & rendering speed audit',
        'Rich Schema.org JSON-LD markup deployment for Google Rich Snippets',
        'High-intent commercial keyword clustering & topical authority mapping',
        'Automated ranking dashboards and conversion attribution tracking'
      ],
      deliverables: ['Prioritized technical SEO remediation roadmap', 'Validated JSON-LD markup integration', 'Search-intent editorial calendar', 'Google Search Console monitoring dashboard'],
      techStack: ['Schema.org', 'Google Search Console', 'Ahrefs', 'Semrush', 'Next.js SEO', 'Lighthouse'],
      impactMetric: '+180% organic qualified traffic in 6mo',
      icon: 'TrendingUp'
    },
    {
      id: 'cloud-devops',
      number: '06',
      title: 'Cloud Architecture, DevOps & Security',
      tagline: 'Resilient, self-healing cloud infrastructure engineered for zero-downtime scalability.',
      description: 'Deployment and orchestration on AWS, Google Cloud, or modern containerized cloud fabrics. We build automated continuous deployment pipelines (CI/CD), implement automated encrypted backups, and harden systems against security exploits.',
      features: [
        'Serverless & Docker/Kubernetes container orchestration',
        'Hardened GitHub Actions CI/CD with automated vulnerability scans',
        'Automated multi-region backups and disaster recovery runbooks',
        '24/7 uptime monitoring, telemetry alerting & secret management'
      ],
      deliverables: ['Infrastructure as Code (Terraform)', 'Turnkey automated CI/CD pipelines', 'Real-time telemetry and health monitoring', 'Security audit compliance report'],
      techStack: ['AWS', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
      impactMetric: '99.99% guaranteed uptime SLA',
      icon: 'ShieldCheck'
    }
  ],
  fr: [
    {
      id: 'web-engineering',
      number: '01',
      title: 'Ingénierie Web & Plateformes SaaS',
      tagline: 'Des architectures logicielles taillées pour la vitesse, la conversion et le passage à l\'échelle.',
      description: 'Nous concevons et développons des applications web sur-mesure, des plateformes SaaS complexes et des sites institutionnels ultra-performants combinant les technologies modernes (React, Next.js, Node.js, GraphQL, PostgreSQL). Chaque projet est optimisé pour un score Core Web Vitals de 95+.',
      features: [
        'Plateformes SaaS multi-tenants & tableaux de bord analytiques',
        'Portails clients sur-mesure avec authentification sécurisée',
        'E-commerce headless performant & parcours de paiement Stripe/PayPal',
        'Progressive Web Apps (PWA) navigables hors-ligne et ultra-rapides'
      ],
      deliverables: ['Code source TypeScript documenté', 'Tests unitaires & end-to-end', 'CI/CD automatisé', 'Garantie de performance 95+'],
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      impactMetric: '< 150ms temps de réponse moyen',
      icon: 'Terminal'
    },
    {
      id: 'mobile-apps',
      number: '02',
      title: 'Applications Mobiles Natives & Cross-Platform',
      tagline: 'Des expériences tactiles fluides sur iOS et Android sans compromis de performance.',
      description: 'Création d\'applications mobiles élégantes et réactives avec React Native et Flutter. Nous gérons l\'intégralité du cycle de vie : architecture offline-first, synchronisation temps réel, notifications push ciblées et publication sur l\'App Store et Google Play.',
      features: [
        'Développement iOS (Swift) et Android natif ou hybride haute fidélité',
        'Gestion hors-ligne (Offline-first) et synchronisation instantanée',
        'Intégration d\'API de paiement in-app, biométrie et géolocalisation',
        'Publication complète et conformité aux standards des Stores'
      ],
      deliverables: ['Fichiers de build signés iOS & Android', 'Console de monitoring crash & analytics', 'Documentation API', 'Accompagnement post-lancement'],
      techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
      impactMetric: '99.9% de sessions sans crash',
      icon: 'Smartphone'
    },
    {
      id: 'ui-ux-design',
      number: '03',
      title: 'UI/UX Design & Product Strategy',
      tagline: 'Des interfaces centrées sur l\'utilisateur qui réduisent le churn et maximisent le ROI.',
      description: 'Nous transformons la complexité fonctionnelle en interfaces évidentes et agréables. Notre démarche s\'appuie sur la recherche utilisateur approfondie, le prototypage interactif haute-fidélité sur Figma et l\'élaboration de Design Systems modulaires pérennes.',
      features: [
        'Audits ergonomiques et tests d\'utilisabilité avec utilisateurs réels',
        'Wireframing & prototypes interactifs ultra-réalistes',
        'Design Systems modulaires adaptés aux équipes produit',
        'Micro-interactions et transitions fluides basées sur l\'ergonomie cognitive'
      ],
      deliverables: ['Design System Figma complet & tokens', 'Prototypes testés avec de vrais utilisateurs', 'Spécifications UX exhaustives', 'Assets prêts pour la production'],
      techStack: ['Figma', 'Framer', 'Protopie', 'Design Tokens', 'Tailwind', 'Storybook'],
      impactMetric: '+42% d\'engagement utilisateur moyen',
      icon: 'Layout'
    },
    {
      id: 'branding-identity',
      number: '04',
      title: 'Branding & Identité Numérique',
      tagline: 'Une signature de marque inoubliable pour vous distinguer instantanément de la concurrence.',
      description: 'Votre identité est votre premier vecteur de confiance. Nous construisons des univers de marque singuliers, modernes et percutants : logotype, typographie sur-mesure, palette chromatique intentionnelle, motion branding et supports digitaux et print haut de gamme.',
      features: [
        'Stratégie de positionnement et manifeste de marque',
        'Création de logotype moderne, vectoriel et responsive',
        'Charte graphique exhaustive pour le digital et l\'imprimé',
        'Assets de communication pour réseaux sociaux et présentations investisseurs'
      ],
      deliverables: ['Brand Book complet de 50+ pages', 'Logotype vectorisé en formats tous supports', 'Iconographie & templates de pitch deck', 'Guides de style éditorial'],
      techStack: ['Adobe Illustrator', 'Photoshop', 'After Effects', 'Figma', 'Blender 3D'],
      impactMetric: '100% vectoriel & univers mémorable',
      icon: 'Compass'
    },
    {
      id: 'seo-growth',
      number: '05',
      title: 'SEO Technique & Croissance Organique',
      tagline: 'Dominez les premières positions sur Google grâce à un référencement naturel pérenne.',
      description: 'Le SEO n\'est pas de la magie, c\'est de l\'ingénierie. Nous optimisons le code source de vos applications (balisage Schema.org, SSR, Core Web Vitals, architecture de cocon sémantique) et concevons des stratégies de contenu à forte autorité de domaine.',
      features: [
        'Audit technique approfondi : crawl, indexabilité, vitesse de chargement',
        'Implémentation Schema.org JSON-LD riche pour Google Rich Snippets',
        'Stratégie de mots-clés transactionnels & structuration en cocons sémantiques',
        'Reporting automatisé du positionnement et du trafic qualifié'
      ],
      deliverables: ['Plan d\'action SEO technique priorisé', 'Balisage JSON-LD déployé', 'Calendrier éditorial optimisé', 'Tableau de bord de suivi Google Search Console'],
      techStack: ['Schema.org', 'Google Search Console', 'Ahrefs', 'Semrush', 'Next.js SEO', 'Lighthouse'],
      impactMetric: '+180% de trafic organique en 6 mois',
      icon: 'TrendingUp'
    },
    {
      id: 'cloud-devops',
      number: '06',
      title: 'Cloud, DevOps & Sécurité Infrastructure',
      tagline: 'Une infrastructure cloud résiliente, scalable à coût maîtrisé et zéro downtime.',
      description: 'Déploiement et orchestration de vos applications sur AWS, Google Cloud ou des infrastructures conteneurisées modernes. Nous automatisons vos pipelines de déploiement continu (CI/CD) et sécurisons vos bases de données contre les vulnérabilités.',
      features: [
        'Architecture cloud Serverless & conteneurs Docker/Kubernetes',
        'Pipelines CI/CD GitHub Actions sécurisés et automatisés',
        'Sauvegardes chiffrées automatiques et haute disponibilité multi-région',
        'Surveillance 24/7, alertes de santé et gestion des secrets'
      ],
      deliverables: ['Infrastructure as Code (Terraform)', 'Pipelines CI/CD opérationnels', 'Dashboard d\'alerting et métriques de santé', 'Rapport d\'audit sécurité'],
      techStack: ['AWS', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
      impactMetric: '99.99% de disponibilité garantie',
      icon: 'ShieldCheck'
    }
  ]
};

export const getServicesData = (lang: Language): ServiceItem[] => {
  return servicesDataByLang[lang] || servicesDataByLang.en;
};
