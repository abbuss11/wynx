import { PortfolioProject } from '../types';
import { Language } from '../context/LanguageContext';

export const portfolioDataByLang: Record<Language, PortfolioProject[]> = {
  en: [
    {
      id: 'techflow-platform',
      title: 'TechFlow Platform',
      client: 'TechFlow Inc.',
      industry: 'B2B SaaS & Engineering Workflow',
      category: 'saas',
      summary: 'Complete architectural and frontend overhaul of a mission-critical B2B SaaS platform used daily by 45,000+ engineers.',
      problem: 'The legacy system experienced severe rendering bottlenecks on massive dependency graphs, suffered a 38% onboarding churn rate, and had tech debt impeding deployments.',
      solution: 'WYNX re-engineered the front-end with React 19 and TypeScript, implemented high-performance data virtualization, crafted an ergonomic obsidian Design System, and unified API queries with cached GraphQL.',
      results: [
        { metric: '+140%', label: 'Onboarding conversion surge' },
        { metric: '62ms', label: 'Dashboard average load time' },
        { metric: '45k+', label: 'Daily active software engineers' }
      ],
      tags: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'AWS'],
      image: '/src/assets/images/project_saas_techflow_1790354919470.jpg',
      year: '2025',
      techStack: ['React 19', 'Next.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Docker'],
      link: 'https://techflow-demo.example.com'
    },
    {
      id: 'luxestore-international',
      title: 'LuxeStore International',
      client: 'Heritage Luxury Group',
      industry: 'High-End Luxury E-Commerce',
      category: 'ecommerce',
      summary: 'Custom headless e-commerce experience for a luxury leather goods house, uniting editorial aesthetics with a 2-click friction-free checkout.',
      problem: 'Monolithic legacy e-commerce framework yielded a 34/100 Google PageSpeed mobile score, 4.8s initial load times, and stagnating mobile cart conversions.',
      solution: 'Bespoke headless storefront powered by Next.js connected to Shopify Plus and Stripe Elements, with edge CDN rendering, micro-interactions, and 3D product previews.',
      results: [
        { metric: '+185%', label: 'Online gross merchandise sales' },
        { metric: '98/100', label: 'Google Mobile PageSpeed score' },
        { metric: '-42%', label: 'Checkout abandonment reduction' }
      ],
      tags: ['Next.js', 'Shopify Headless', 'Stripe', 'Figma', 'Edge CDN'],
      image: '/src/assets/images/project_luxestore_ecommerce_1790354929393.jpg',
      year: '2025',
      techStack: ['Next.js', 'Shopify Storefront API', 'Stripe Elements', 'Tailwind CSS', 'Vercel Edge'],
      link: 'https://luxestore-demo.example.com'
    },
    {
      id: 'dataviz-pro',
      title: 'DataViz Pro Analytics',
      client: 'FinMetrics Global',
      industry: 'Fintech & Capital Markets Intelligence',
      category: 'saas',
      summary: 'Institutional-grade real-time financial portfolio analytics dashboard tracking millions of live market events and risk vectors.',
      problem: 'Financial traders and portfolio managers were juggling slow, fragmented desktop tools with frequent sync delays and manual reconciliation errors.',
      solution: 'WYNX delivered a unified interface with live WebSocket-streamed vector visualizations, smooth manipulation of 3M+ data points, and sub-second report generation.',
      results: [
        { metric: '3.2M', label: 'Data points refreshed / sec' },
        { metric: '-65%', label: 'Time required for portfolio audits' },
        { metric: '99.99%', label: 'Financial system availability' }
      ],
      tags: ['React', 'D3.js', 'WebSockets', 'Python API', 'PostgreSQL'],
      image: '/src/assets/images/project_saas_techflow_1790354919470.jpg',
      year: '2024',
      techStack: ['React', 'D3.js', 'FastAPI', 'TimescaleDB', 'Tailwind CSS'],
      link: 'https://dataviz-demo.example.com'
    },
    {
      id: 'musicstream-connect',
      title: 'MusicStream Mobile',
      client: 'SonicWave Media',
      industry: 'Media Streaming & Digital Audio',
      category: 'mobile',
      summary: 'Next-gen audio streaming mobile app with offline listening engine, smart discovery recommendations, and gestural tactile controls.',
      problem: 'Competing against entrenched streaming giants required a lean (<25MB) app with zero audio stutter across heterogeneous iOS and Android devices.',
      solution: 'Built an optimized React Native audio architecture with local caching, uninterrupted background playback engine, and high-contrast dark theme.',
      results: [
        { metric: '1.2M+', label: 'Combined App Store & Play downloads' },
        { metric: '4.9/5', label: 'Average rating across 12,000+ reviews' },
        { metric: '< 20ms', label: 'Audio playback start latency' }
      ],
      tags: ['React Native', 'Audio Engine', 'Firebase', 'iOS & Android'],
      image: '/src/assets/images/hero_digital_agency_1790354908664.jpg',
      year: '2025',
      techStack: ['React Native', 'TypeScript', 'Native Audio Module', 'Firebase Auth', 'GraphQL'],
      link: 'https://musicstream-demo.example.com'
    },
    {
      id: 'healthcare-connect',
      title: 'HealthCare Connect',
      client: 'SantePlus Global',
      industry: 'Digital Health & Telemedicine',
      category: 'saas',
      summary: 'Compliant telehealth portal supporting encrypted HD video consultations and instantaneous prescription dispatch.',
      problem: 'Practitioners and patients suffered through clunky, outdated software that failed new medical data sovereignty and encryption regulations.',
      solution: 'Engineered an end-to-end encrypted WebRTC virtual waiting room and consultation platform with digital certified signatures and calendar sync.',
      results: [
        { metric: '180k+', label: 'Secure video consultations completed' },
        { metric: '100%', label: 'HIPAA & GDPR verified compliance' },
        { metric: '94%', label: 'Practitioner satisfaction rate' }
      ],
      tags: ['WebRTC', 'End-to-End Encryption', 'React', 'Node.js', 'Audit HDS'],
      image: '/src/assets/images/blog_seo_architecture_1790354943672.jpg',
      year: '2024',
      techStack: ['React', 'WebRTC', 'Node.js', 'PostgreSQL', 'Docker'],
      link: 'https://healthcare-demo.example.com'
    },
    {
      id: 'ecotrack-impact',
      title: 'EcoTrack Carbon Suite',
      client: 'EcoTrack Global',
      industry: 'ClimateTech & ESG Compliance',
      category: 'branding',
      summary: 'Brand identity redesign and carbon tracking SaaS simulator for multinational enterprises and certified B-Corps.',
      problem: 'Existing brand was perceived as overly dry and technical, resulting in low C-suite engagement and sluggish corporate sales cycles.',
      solution: 'Crafted a fresh, energetic brand universe: bold logo, modular 3D graphics, interactive emissions estimator, and automated PDF ESG reporting.',
      results: [
        { metric: '+210%', label: 'Corporate demo requests' },
        { metric: '450+', label: 'Enterprises onboarded' },
        { metric: '1.8M t', label: 'CO2 equivalent verified & tracked' }
      ],
      tags: ['Branding', 'Design System', 'Carbon Simulator', 'ESG Engine'],
      image: '/src/assets/images/project_luxestore_ecommerce_1790354929393.jpg',
      year: '2025',
      techStack: ['Figma', 'Illustrator', 'React', 'Tailwind CSS', 'PDF Engine'],
      link: 'https://ecotrack-demo.example.com'
    }
  ],
  fr: [
    {
      id: 'techflow-platform',
      title: 'TechFlow Platform',
      client: 'TechFlow Inc.',
      industry: 'Productivité SaaS & Gestion de Projets',
      category: 'saas',
      summary: 'Refonte complète de l\'architecture et de l\'interface d\'une plateforme SaaS B2B utilisée par plus de 45 000 ingénieurs au quotidien.',
      problem: 'La plateforme originelle souffrait de lenteurs majeures lors du rendu de graphes complexes, d\'un taux d\'abandon de 38% lors de l\'onboarding et d\'une dette technique accumulée bloquant les déploiements.',
      solution: 'WYNX a reconstruit le front-end sous React et TypeScript avec virtualisation des flux de données, conçu un Design System sombre épuré et mis en place une API GraphQL unifiée avec cache distribué.',
      results: [
        { metric: '+140%', label: 'Hausse de conversion onboarding' },
        { metric: '62ms', label: 'Temps de chargement des dashboards' },
        { metric: '45k+', label: 'Utilisateurs actifs quotidiens' }
      ],
      tags: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'AWS'],
      image: '/src/assets/images/project_saas_techflow_1790354919470.jpg',
      year: '2025',
      techStack: ['React 19', 'Next.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Docker'],
      link: 'https://techflow-demo.example.com'
    },
    {
      id: 'luxestore-international',
      title: 'LuxeStore International',
      client: 'Groupe Luxe & Héritage',
      industry: 'Commerce Électronique de Luxe',
      category: 'ecommerce',
      summary: 'Expérience e-commerce headless sur-mesure pour une maison de haute maroquinerie, alliant esthétique raffinée et tunnel d\'achat fluide en 2 clics.',
      problem: 'Le site e-commerce traditionnel sous plateforme monolithique affichait un score Google PageSpeed de 34/100, un temps de chargement de 4,8 secondes et un panier moyen en stagnation.',
      solution: 'Création d\'un front-end e-commerce headless haute performance connecté aux API Shopify Plus et Stripe, avec rendu Edge CDN instantané, animations subtiles et présentation 3D des pièces maîtresses.',
      results: [
        { metric: '+185%', label: 'Augmentation du volume de ventes' },
        { metric: '98/100', label: 'Score Google Mobile PageSpeed' },
        { metric: '-42%', label: 'Diminution des abandons de panier' }
      ],
      tags: ['Next.js', 'Shopify Headless', 'Stripe', 'Figma', 'Edge CDN'],
      image: '/src/assets/images/project_luxestore_ecommerce_1790354929393.jpg',
      year: '2025',
      techStack: ['Next.js', 'Shopify Storefront API', 'Stripe Elements', 'Tailwind CSS', 'Vercel Edge'],
      link: 'https://luxestore-demo.example.com'
    },
    {
      id: 'dataviz-pro',
      title: 'DataViz Pro Analytics',
      client: 'FinMetrics Global',
      industry: 'Fintech & Intelligence Financière',
      category: 'saas',
      summary: 'Tableau de bord haute fidélité pour l\'analyse de portefeuilles d\'actifs et flux de transactions en temps réel avec graphiques interactifs.',
      problem: 'Les analystes financiers devaient naviguer entre plusieurs tableurs lourds et des interfaces déconnectées, générant des retards d\'arbitrage et des erreurs manuelles fréquentes.',
      solution: 'WYNX a conçu une interface centralisée intégrant des visualisations vectorielles temps réel via WebSockets, une manipulation fluide de millions de points de données et des exports en 1 clic.',
      results: [
        { metric: '3.2M', label: 'Points de données rafraîchis / sec' },
        { metric: '-65%', label: 'Temps nécessaire pour générer un rapport' },
        { metric: '99.99%', label: 'Disponibilité du système financier' }
      ],
      tags: ['React', 'D3.js', 'WebSockets', 'Python API', 'PostgreSQL'],
      image: '/src/assets/images/project_saas_techflow_1790354919470.jpg',
      year: '2024',
      techStack: ['React', 'D3.js', 'FastAPI', 'TimescaleDB', 'Tailwind CSS'],
      link: 'https://dataviz-demo.example.com'
    },
    {
      id: 'musicstream-connect',
      title: 'MusicStream Mobile',
      client: 'SonicWave Media',
      industry: 'Divertissement & Audio Streaming',
      category: 'mobile',
      summary: 'Application mobile audio nouvelle génération avec moteur de recommandation intelligent, mode hors-connexion et interface gestuelle immersive.',
      problem: 'Nécessité de rivaliser avec les géants du streaming en proposant une application légère (< 25 Mo), extrêmement fluide sur les smartphones de toutes gammes et sans coupure de lecture.',
      solution: 'Développement d\'une application React Native ultra-optimisée avec gestion de cache audio local, lecteur en tâche de fond résilient et design dark mode avec accents dynamiques.',
      results: [
        { metric: '1.2M+', label: 'Téléchargements sur les stores' },
        { metric: '4.9/5', label: 'Note moyenne sur 12 000 avis' },
        { metric: '< 20ms', label: 'Latence de démarrage audio' }
      ],
      tags: ['React Native', 'Audio Engine', 'Firebase', 'iOS & Android'],
      image: '/src/assets/images/hero_digital_agency_1790354908664.jpg',
      year: '2025',
      techStack: ['React Native', 'TypeScript', 'Native Audio Module', 'Firebase Auth', 'GraphQL'],
      link: 'https://musicstream-demo.example.com'
    },
    {
      id: 'healthcare-connect',
      title: 'HealthCare Connect',
      client: 'SantéPlus Solutions',
      industry: 'Santé Digitale & Télémédecine',
      category: 'saas',
      summary: 'Portail médical conforme HDS permettant les téléconsultations sécurisées en haute définition et le partage instantané d\'ordonnances cryptées.',
      problem: 'Les médecins et patients perdaient un temps précieux sur des logiciels archaïques non conformes aux nouvelles réglementations de protection des données de santé.',
      solution: 'Conception d\'une solution web et mobile chiffrée de bout en bout avec salle d\'attente virtuelle WebRTC, signature électronique certifiée et synchronisation avec les agendas médicaux.',
      results: [
        { metric: '180k+', label: 'Téléconsultations réalisées' },
        { metric: '100%', label: 'Conformité HDS & RGPD validée' },
        { metric: '94%', label: 'Taux de satisfaction des praticiens' }
      ],
      tags: ['WebRTC', 'Chiffrement E2E', 'React', 'Node.js', 'Audit HDS'],
      image: '/src/assets/images/blog_seo_architecture_1790354943672.jpg',
      year: '2024',
      techStack: ['React', 'WebRTC', 'Node.js', 'PostgreSQL', 'Docker'],
      link: 'https://healthcare-demo.example.com'
    },
    {
      id: 'ecotrack-impact',
      title: 'EcoTrack Carbon Suite',
      client: 'EcoTrack Global',
      industry: 'CleanTech & Reporting RSE',
      category: 'branding',
      summary: 'Refonte d\'identité de marque et plateforme digitale de calcul d\'empreinte carbone pour entreprises certifiées B-Corp et multinationales.',
      problem: 'Une marque perçue comme austère et technique, générant peu d\'adhésion auprès des comités de direction et collaborateurs non spécialistes.',
      solution: 'Création d\'un univers de marque moderne et engageant : nouveau logotype, illustrations 3D modulaires, simulateur d\'émissions interactif et générateur de rapport ESG automatisé.',
      results: [
        { metric: '+210%', label: 'Demandes de démonstrations corporate' },
        { metric: '450+', label: 'Grandes entreprises accompagnées' },
        { metric: '1.8M t', label: 'Équivalent CO2 tracé et optimisé' }
      ],
      tags: ['Branding', 'Design System', 'Simulateur Web', 'Reporting ESG'],
      image: '/src/assets/images/project_luxestore_ecommerce_1790354929393.jpg',
      year: '2025',
      techStack: ['Figma', 'Illustrator', 'React', 'Tailwind CSS', 'PDF Engine'],
      link: 'https://ecotrack-demo.example.com'
    }
  ]
};

export const getPortfolioData = (lang: Language): PortfolioProject[] => {
  return portfolioDataByLang[lang] || portfolioDataByLang.en;
};
