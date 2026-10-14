import { 
  QuoteRequest, 
  ClientRecord, 
  SiteAnalytics, 
  GlobalSettings, 
  AdminUser 
} from '../types';

export const initialAdminUser: AdminUser = {
  id: 'usr_wynx_01',
  name: 'Abbuss Idriss',
  email: 'admin@wynx.agency',
  role: 'superadmin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

export const initialQuotes: QuoteRequest[] = [
  {
    id: 'DEV-2026-089',
    clientName: 'Sarah Benali',
    clientEmail: 's.benali@novafinance.africa',
    clientPhone: '+227 90 45 12 88',
    company: 'NovaFinance Africa',
    services: ['Ingénierie Web & Plateformes SaaS', 'UI/UX Design & Prototypage'],
    budget: '10 000 € – 25 000 €',
    timeline: '1 à 3 mois',
    description: 'Conception et développement complet de notre portail de micro-crédits B2B avec dashboard analytique en temps réel et signature électronique conforme aux réglementations de l\'UEMOA.',
    date: '2026-03-27T14:32:00Z',
    status: 'new',
    priority: 'urgent',
    estimatedAmount: 18500,
    currency: 'EUR',
    deliveryWeeks: 8,
    internalNotes: 'Lead qualifié via recommandation bancaire. Présentation de la maquette préliminaire prévue vendredi.'
  },
  {
    id: 'DEV-2026-088',
    clientName: 'Alexandre Dupont',
    clientEmail: 'alex@aero-express.fr',
    clientPhone: '+33 6 42 19 88 02',
    company: 'AeroExpress Logistique',
    services: ['Applications Mobiles (iOS & Android)', 'Cloud, DevOps & Hébergement'],
    budget: '> 25 000 €',
    timeline: '3 à 6 mois',
    description: 'Application mobile cross-platform (React Native) pour nos 120 chauffeurs et superviseurs de fret, avec suivi GPS temps réel et scan QR de colis hors-connexion.',
    date: '2026-03-26T09:15:00Z',
    status: 'reviewing',
    priority: 'high',
    estimatedAmount: 32000,
    currency: 'EUR',
    deliveryWeeks: 12,
    internalNotes: 'En attente de validation du cahier des charges d\'intégration API ERP SAP.'
  },
  {
    id: 'DEV-2026-087',
    clientName: 'Khadija Amadou',
    clientEmail: 'contact@sahelbio.ne',
    clientPhone: '+227 96 11 22 33',
    company: 'Sahel Bio Naturals',
    services: ['Ingénierie Web & Plateformes SaaS', 'Branding & Identité Numérique', 'SEO Technique & Croissance Organique'],
    budget: '3 000 € – 10 000 €',
    timeline: '1 à 3 mois',
    description: 'Boutique e-commerce headless bilingue (FR/EN) pour l\'exportation de cosmétiques naturels et beurre de karité certifié avec paiement par Mobile Money et cartes internationales Stripe.',
    date: '2026-03-24T18:40:00Z',
    status: 'quoted',
    priority: 'medium',
    estimatedAmount: 8500,
    currency: 'EUR',
    deliveryWeeks: 5,
    internalNotes: 'Devis envoyé le 25 mars. Proposition à 8 500 € comprenant l\'intégration PayTech / Flooz / TMoney.'
  },
  {
    id: 'DEV-2026-086',
    clientName: 'Jean-Marc Lemoine',
    clientEmail: 'jm.lemoine@veritas-audit.eu',
    clientPhone: '+32 2 543 90 11',
    company: 'Veritas Compliance Group',
    services: ['UI/UX Design & Prototypage', 'SEO Technique & Croissance Organique'],
    budget: '10 000 € – 25 000 €',
    timeline: 'Flexible',
    description: 'Refonte de l\'image de marque et refonte du site institutionnel pour renforcer l\'autorité SEO sur les mots-clés d\'audit ESG en Europe francophone.',
    date: '2026-03-21T11:20:00Z',
    status: 'accepted',
    priority: 'medium',
    estimatedAmount: 14200,
    currency: 'EUR',
    deliveryWeeks: 6,
    internalNotes: 'Acompte de 40% encaissé. Projet démarré et transféré dans le CRM Clients.'
  },
  {
    id: 'DEV-2026-085',
    clientName: 'Moussa Traoré',
    clientEmail: 'mtraore@agritech-mali.com',
    clientPhone: '+223 76 89 00 12',
    company: 'AgriTech Solutions',
    services: ['Applications Mobiles (iOS & Android)'],
    budget: '< 3 000 €',
    timeline: 'Urgent (< 1 mois)',
    description: 'Besoin d\'un prototype d\'application météo agricole pour pitch investisseurs sous 2 semaines.',
    date: '2026-03-18T16:05:00Z',
    status: 'declined',
    priority: 'low',
    estimatedAmount: 2800,
    currency: 'EUR',
    deliveryWeeks: 2,
    internalNotes: 'Budget insuffisant par rapport à la complexité exigée. Recommandé une solution no-code temporaire.'
  }
];

export const initialClients: ClientRecord[] = [
  {
    id: 'cli_01',
    name: 'TechFlow Inc.',
    company: 'TechFlow Inc.',
    email: 'direction@techflow.io',
    phone: '+1 (415) 890-3321',
    status: 'active',
    projectName: 'Plateforme SaaS B2B v2.0',
    totalBudget: 48000,
    invoicedAmount: 36000,
    paidAmount: 36000,
    currency: 'EUR',
    progress: 75,
    currentMilestone: 'Sprint 6 : Optimisation de la virtualisation des données & Tests de charge',
    startDate: '2026-01-15',
    deadline: '2026-04-30',
    interactions: [
      {
        id: 'int_01',
        date: '2026-03-25',
        type: 'meeting',
        note: 'Point hebdomadaire de revue de sprint : validation du dashboard temps réel. Équipe client très satisfaite des 62ms de TTFB.',
        author: 'Abbuss Idriss'
      },
      {
        id: 'int_02',
        date: '2026-03-10',
        type: 'email',
        note: 'Envoi du rapport intermédiaire et confirmation du déploiement en staging.',
        author: 'Thomas Morel'
      }
    ],
    notes: 'Client stratégique. Extension de contrat possible pour l\'application mobile compagnon au Q3.'
  },
  {
    id: 'cli_02',
    name: 'Heritage Luxury Group',
    company: 'LuxeStore International',
    email: 'digital@heritageluxury.fr',
    phone: '+33 1 42 68 55 00',
    status: 'maintenance',
    projectName: 'Boutique Headless Shopify Plus & Stripe Elements',
    totalBudget: 34500,
    invoicedAmount: 34500,
    paidAmount: 34500,
    currency: 'EUR',
    progress: 100,
    currentMilestone: 'Contrat SLA & Optimisations SEO mensuelles',
    startDate: '2025-10-01',
    deadline: '2026-02-15',
    interactions: [
      {
        id: 'int_03',
        date: '2026-03-22',
        type: 'review',
        note: 'Revue trimestrielle des performances : +185% de ventes en ligne et score PageSpeed maintenu à 98/100.',
        author: 'Abbuss Idriss'
      }
    ],
    notes: 'Support de maintenance niveau 1 actif (15h/mois).'
  },
  {
    id: 'cli_03',
    name: 'FinMetrics Global',
    company: 'FinMetrics Global Ltd',
    email: 'engineering@finmetrics.com',
    phone: '+44 20 7946 0992',
    status: 'completed',
    projectName: 'DataViz Pro Real-Time Analytics Engine',
    totalBudget: 62000,
    invoicedAmount: 62000,
    paidAmount: 62000,
    currency: 'EUR',
    progress: 100,
    currentMilestone: 'Projet livré avec succès – Clôture définitive',
    startDate: '2025-08-10',
    deadline: '2025-12-20',
    interactions: [
      {
        id: 'int_04',
        date: '2026-01-14',
        type: 'call',
        note: 'Appel de suivi à 1 mois : aucun bug critique recensé, satisfaction globale 5/5.',
        author: 'Abbuss Idriss'
      }
    ],
    notes: 'Étude de cas publiée sur le site portfolio WYNX.'
  },
  {
    id: 'cli_04',
    name: 'Jean-Marc Lemoine',
    company: 'Veritas Compliance Group',
    email: 'jm.lemoine@veritas-audit.eu',
    phone: '+32 2 543 90 11',
    status: 'negotiation',
    projectName: 'Refonte Identité & Plateforme ESG Compliance',
    totalBudget: 14200,
    invoicedAmount: 5680,
    paidAmount: 5680,
    currency: 'EUR',
    progress: 25,
    currentMilestone: 'Phase 1 : Wireframes UX & Validation de la charte graphique',
    startDate: '2026-03-22',
    deadline: '2026-05-15',
    interactions: [
      {
        id: 'int_05',
        date: '2026-03-24',
        type: 'meeting',
        note: 'Kickoff meeting avec l\'équipe marketing de Veritas. Validation du calendrier prévisionnel.',
        author: 'Abbuss Idriss'
      }
    ],
    notes: 'Acompte de 40% reçu par virement bancaire.'
  }
];

export const initialAnalytics: SiteAnalytics = {
  totalVisitors: 28450,
  uniqueVisitors: 19230,
  pageViews: 84910,
  bounceRate: 32.4,
  avgSessionDuration: '3m 42s',
  liveVisitors: 38,
  quotesGenerated: 128,
  conversionRate: 4.8,
  dailyStats: [
    { date: '2026-03-22', label: 'Dim', visits: 820, unique: 690, pageViews: 2410 },
    { date: '2026-03-23', label: 'Lun', visits: 1340, unique: 1050, pageViews: 4120 },
    { date: '2026-03-24', label: 'Mar', visits: 1580, unique: 1210, pageViews: 4890 },
    { date: '2026-03-25', label: 'Mer', visits: 1690, unique: 1340, pageViews: 5240 },
    { date: '2026-03-26', label: 'Jeu', visits: 1820, unique: 1460, pageViews: 5710 },
    { date: '2026-03-27', label: 'Ven', visits: 1940, unique: 1580, pageViews: 6180 },
    { date: '2026-03-28', label: 'Aujourd\'hui', visits: 1420, unique: 1180, pageViews: 4490 }
  ],
  trafficSources: [
    { source: 'SEO Organique (Google)', visits: 12518, percentage: 44, color: '#FF5500' },
    { source: 'Accès Direct & Marque', visits: 7397, percentage: 26, color: '#3B82F6' },
    { source: 'LinkedIn & Réseaux Sociaux', visits: 5121, percentage: 18, color: '#10B981' },
    { source: 'Twitter / X', visits: 2276, percentage: 8, color: '#F59E0B' },
    { source: 'Partenaires & Référents', visits: 1138, percentage: 4, color: '#8B5CF6' }
  ],
  topPages: [
    { path: '/', title: 'Accueil – Studio Digital WYNX', views: 34120, avgTime: '2m 10s', bounceRate: '28%' },
    { path: '#services', title: 'Services & Disciplines d\'ingénierie', views: 18450, avgTime: '3m 45s', bounceRate: '24%' },
    { path: '#portfolio', title: 'Études de Cas & Réalisations', views: 16290, avgTime: '4m 12s', bounceRate: '21%' },
    { path: '#blog', title: 'Tech Insights & Guides SEO', views: 11320, avgTime: '5m 30s', bounceRate: '35%' },
    { path: '#contact', title: 'Demande de Devis & Contact', views: 4730, avgTime: '3m 50s', bounceRate: '18%' }
  ],
  topCountries: [
    { country: 'France', code: 'FR', visits: 10811, percentage: 38 },
    { country: 'Niger', code: 'NE', visits: 6828, percentage: 24 },
    { country: 'Côte d\'Ivoire', code: 'CI', visits: 3983, percentage: 14 },
    { country: 'États-Unis / Canada', code: 'US', visits: 3414, percentage: 12 },
    { country: 'Sénégal', code: 'SN', visits: 2276, percentage: 8 },
    { country: 'Autres pays', code: 'WW', visits: 1138, percentage: 4 }
  ],
  devices: [
    { device: 'Mobile (Smartphones)', percentage: 59, count: 16785 },
    { device: 'Desktop (Ordinateurs)', percentage: 36, count: 10242 },
    { device: 'Tablettes', percentage: 5, count: 1423 }
  ],
  browsers: [
    { browser: 'Google Chrome', percentage: 63 },
    { browser: 'Apple Safari', percentage: 24 },
    { browser: 'Mozilla Firefox', percentage: 8 },
    { browser: 'Microsoft Edge', percentage: 5 }
  ]
};

export const initialGlobalSettings: GlobalSettings = {
  agencyName: 'WYNX – Agence Digitale & Studio d\'Innovation',
  tagline: 'Dare to see further. Dare WYNX.',
  description: 'Ingénierie logicielle sur-mesure, plateformes SaaS haute performance, applications mobiles et identités visuelles d\'exception.',
  contactEmail: 'contact@wynx.agency',
  contactPhone: '+227 1 23 45 67 8',
  address: 'Plateau I, Boulevard de la République',
  country: 'Niamey, Niger',
  announcementActive: true,
  announcementText: '🚀 WYNX nommé Studio Tech de l\'année – Créneaux de développement Q2/Q3 2026 désormais ouverts',
  announcementLink: '#contact',
  announcementBadge: 'NOUVEAU',
  maintenanceMode: false,
  defaultCurrency: 'EUR',
  minBudgetThreshold: 3000,
  socialLinks: {
    linkedin: 'https://linkedin.com/company/wynx-agency',
    twitter: 'https://x.com/wynx_agency',
    instagram: 'https://instagram.com/wynx.agency',
    github: 'https://github.com/wynx-agency',
    dribbble: 'https://dribbble.com/wynx'
  },
  seo: {
    metaTitle: 'WYNX – Agence Digitale & Studio d\'Innovation | SaaS, Mobile & Web',
    metaDescription: 'Refonte officielle de l\'agence WYNX : ingénierie web moderne, applications mobiles, UI/UX design sur-mesure, portfolio interactif et blog SEO.',
    googleAnalyticsId: 'G-WYNX2026PROD',
    indexRobots: true
  }
};
