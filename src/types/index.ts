export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
  impactMetric: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: 'saas' | 'ecommerce' | 'mobile' | 'branding';
  summary: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  tags: string[];
  image: string;
  year: string;
  techStack: string[];
  link?: string;
  featured?: boolean;
  status?: 'live' | 'in_progress' | 'archived';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'SEO & Visibilité' | 'Architecture Web' | 'UI/UX & Produit' | 'Mobile';
  readingTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  seoKeywords: string[];
  image: string;
  status?: 'published' | 'draft' | 'archived';
  views?: number;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceNeeded: string[];
  budgetRange: string;
  timeline: string;
  projectDetails: string;
}

export type QuoteStatus = 'new' | 'reviewing' | 'quoted' | 'accepted' | 'declined';
export type QuotePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface QuoteRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  date: string;
  status: QuoteStatus;
  priority: QuotePriority;
  estimatedAmount?: number;
  currency?: string;
  deliveryWeeks?: number;
  internalNotes?: string;
  convertedToClientId?: string;
}

export interface MonthlyQuoteStat {
  monthKey: string;      // e.g. '2025-10', '2026-03'
  monthLabel: string;    // e.g. 'Oct 25', 'Mar 26'
  fullMonthName: string; // e.g. 'Octobre 2025'
  totalQuotes: number;
  acceptedQuotes: number;
  declinedQuotes: number;
  pendingQuotes: number;
  totalValue: number;    // In Euros (EUR)
  avgTicketValue: number;
  conversionRate: number;// percentage 0-100
}

export type ClientStatus = 'lead' | 'negotiation' | 'active' | 'maintenance' | 'completed';

export interface ClientInteraction {
  id: string;
  date: string;
  type: 'call' | 'email' | 'meeting' | 'review' | 'note';
  note: string;
  author: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  avatar?: string;
  status: ClientStatus;
  projectName: string;
  totalBudget: number;
  invoicedAmount: number;
  paidAmount: number;
  currency: string;
  progress: number; // 0 - 100
  currentMilestone: string;
  startDate: string;
  deadline: string;
  interactions: ClientInteraction[];
  notes?: string;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
  color: string;
}

export interface VisitedPageStat {
  path: string;
  title: string;
  views: number;
  avgTime: string;
  bounceRate: string;
}

export interface CountryStat {
  country: string;
  code: string;
  visits: number;
  percentage: number;
}

export interface DeviceStat {
  device: string;
  percentage: number;
  count: number;
}

export interface BrowserStat {
  browser: string;
  percentage: number;
}

export interface DailyVisitStat {
  date: string;
  label: string;
  visits: number;
  unique: number;
  pageViews: number;
}

export interface SiteAnalytics {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: string;
  liveVisitors: number;
  quotesGenerated: number;
  conversionRate: number;
  dailyStats: DailyVisitStat[];
  trafficSources: TrafficSource[];
  topPages: VisitedPageStat[];
  topCountries: CountryStat[];
  devices: DeviceStat[];
  browsers: BrowserStat[];
}

export interface GlobalSettings {
  agencyName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  country: string;
  announcementActive: boolean;
  announcementText: string;
  announcementLink: string;
  announcementBadge: string;
  maintenanceMode: boolean;
  defaultCurrency: 'EUR' | 'USD' | 'XOF';
  minBudgetThreshold: number;
  socialLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
    github: string;
    dribbble?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    googleAnalyticsId: string;
    indexRobots: boolean;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'editor' | 'viewer';
  avatar?: string;
}
