import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { 
  BlogPost, 
  PortfolioProject, 
  QuoteRequest, 
  QuoteStatus, 
  ClientRecord, 
  ClientInteraction, 
  SiteAnalytics, 
  GlobalSettings, 
  AdminUser 
} from '../types';
import { 
  initialAnalytics, 
  initialGlobalSettings
} from '../data/adminInitialData';
import { supabase } from '../lib/supabase';
import type { Json } from '../types/database';
import { 
  checkRateLimit, 
  recordFailedLogin, 
  resetRateLimit, 
  sanitizeText, 
  sanitizePhone, 
  isValidEmail, 
  sanitizeUrl 
} from '../utils/security';

export type AdminTab = 'analytics' | 'quotes' | 'clients' | 'blog' | 'projects' | 'settings';

interface ToastNotice {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface SiteDataContextType {
  // Admin View State
  isAdminOpen: boolean;
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  activeAdminTab: AdminTab;
  openAdmin: (tab?: AdminTab) => void;
  closeAdmin: () => void;
  loginAdmin: (email?: string, password?: string) => Promise<boolean>;
  logoutAdmin: () => void;
  changeMasterPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  setActiveAdminTab: (tab: AdminTab) => void;

  // Blog Posts
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<BlogPost | null>;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<boolean>;
  deleteBlogPost: (id: string) => Promise<void>;
  duplicateBlogPost: (id: string) => Promise<void>;

  // Portfolio Projects
  projects: PortfolioProject[];
  addProject: (project: Omit<PortfolioProject, 'id'>) => Promise<PortfolioProject | null>;
  updateProject: (id: string, updates: Partial<PortfolioProject>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;

  // Quotes (Devis)
  quotes: QuoteRequest[];
  unreadQuotesCount: number;
  addQuote: (data: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    company?: string;
    services: string[];
    budget: string;
    timeline: string;
    description: string;
  }) => Promise<QuoteRequest>;
  updateQuoteStatus: (id: string, status: QuoteStatus) => Promise<boolean>;
  updateQuote: (id: string, updates: Partial<QuoteRequest>) => Promise<boolean>;
  deleteQuote: (id: string) => Promise<void>;
  convertQuoteToClient: (quoteId: string) => Promise<ClientRecord | null>;

  // Client Tracking (CRM)
  clients: ClientRecord[];
  addClient: (client: Omit<ClientRecord, 'id' | 'interactions'> & { initialNote?: string }) => Promise<ClientRecord | null>;
  updateClient: (id: string, updates: Partial<ClientRecord>) => Promise<boolean>;
  deleteClient: (id: string) => Promise<void>;
  addClientInteraction: (clientId: string, note: string, type?: ClientInteraction['type']) => Promise<boolean>;

  // Analytics & Visits
  analytics: SiteAnalytics;
  refreshAnalytics: () => void;

  // Global Settings
  globalSettings: GlobalSettings;
  updateGlobalSettings: (updates: Partial<GlobalSettings>) => Promise<boolean>;
  resetToDefaults: () => void;

  // Announcement Banner
  isBannerDismissed: boolean;
  dismissBanner: () => void;

  // Toast System
  toasts: ToastNotice[];
  showToast: (message: string, type?: ToastNotice['type']) => void;
  removeToast: (id: string) => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

type ContentRow = { id: string; data: Json; created_at?: string };

function fromContentRow<T extends { id: string }>(row: ContentRow, dateField?: 'date'): T {
  if (!row.data || typeof row.data !== 'object' || Array.isArray(row.data)) {
    throw new Error(`Invalid Supabase data for record ${row.id}.`);
  }

  return {
    ...row.data,
    id: row.id,
    ...(dateField && row.created_at ? { [dateField]: row.created_at } : {})
  } as T;
}

function toJson(value: object): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin portal UI state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('analytics');
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);

  const [analytics, setAnalytics] = useState<SiteAnalytics>(initialAnalytics);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(initialGlobalSettings);

  // Toast manager
  const showToast = (message: string, type: ToastNotice['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let active = true;
    const syncAdminSession = async (session: Session | null) => {
      if (!session) {
        if (active) {
          setIsAdminLoggedIn(false);
          setAdminUser(null);
        }
        return;
      }

      const { data: isAdmin, error } = await client.rpc('is_wynx_admin');
      if (error) {
        if (active) showToast(`Impossible de vérifier les droits administrateur : ${error.message}`, 'error');
        return;
      }

      if (!isAdmin) {
        await client.auth.signOut();
        if (active) {
          setIsAdminLoggedIn(false);
          setAdminUser(null);
          showToast('Ce compte Supabase ne possède pas les droits administrateur WYNX.', 'error');
        }
        return;
      }

      if (active) {
        setIsAdminLoggedIn(true);
        setAdminUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name || session.user.email || 'WYNX Admin',
          email: session.user.email || '',
          role: 'superadmin'
        });
      }
    };

    void client.auth.getSession().then(({ data, error }) => {
      if (error) {
        showToast(`Impossible de restaurer la session Supabase : ${error.message}`, 'error');
        return;
      }
      return syncAdminSession(data.session);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        void syncAdminSession(session);
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let active = true;
    const loadSiteData = async () => {
      try {
        const [blogResult, projectResult, settingsResult] = await Promise.all([
          client.from('site_blog_posts').select('id, data, created_at').order('created_at', { ascending: false }),
          client.from('site_projects').select('id, data, created_at').order('created_at', { ascending: false }),
          client.from('site_settings').select('data').eq('id', 1).maybeSingle()
        ]);

        if (blogResult.error) throw blogResult.error;
        if (projectResult.error) throw projectResult.error;
        if (settingsResult.error) throw settingsResult.error;
        if (!active) return;

        setBlogPosts((blogResult.data || []).map((row) => fromContentRow<BlogPost>(row)));
        setProjects((projectResult.data || []).map((row) => fromContentRow<PortfolioProject>(row)));
        if (settingsResult.data?.data && typeof settingsResult.data.data === 'object' && !Array.isArray(settingsResult.data.data)) {
          setGlobalSettings(settingsResult.data.data as unknown as GlobalSettings);
        }

        if (isAdminLoggedIn) {
          const [quoteResult, clientResult] = await Promise.all([
            client.from('site_quotes').select('id, data, created_at').order('created_at', { ascending: false }),
            client.from('site_clients').select('id, data, created_at').order('created_at', { ascending: false })
          ]);

          if (quoteResult.error) throw quoteResult.error;
          if (clientResult.error) throw clientResult.error;
          if (!active) return;

          setQuotes((quoteResult.data || []).map((row) => fromContentRow<QuoteRequest>(row, 'date')));
          setClients((clientResult.data || []).map((row) => fromContentRow<ClientRecord>(row)));
        } else {
          setQuotes([]);
          setClients([]);
        }
      } catch (error) {
        if (active) {
          const message = error instanceof Error ? error.message : 'Erreur Supabase inconnue.';
          showToast(`Chargement des données Supabase impossible : ${message}`, 'error');
        }
      }
    };

    void loadSiteData();
    return () => {
      active = false;
    };
  }, [isAdminLoggedIn]);

  // Supabase Auth protects the administrator session; the local rate limit is only an extra UX safeguard.
  const openAdmin = (tab?: AdminTab) => {
    if (tab) setActiveAdminTab(tab);
    setIsAdminOpen(true);
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
  };

  const loginAdmin = async (email = '', password = ''): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré. Vérifiez les variables VITE_SUPABASE_*.', 'error');
      return false;
    }

    const rateLimit = checkRateLimit();
    if (rateLimit.isLocked) {
      showToast(`Accès temporairement verrouillé pour ${Math.ceil(rateLimit.remainingSeconds / 60)} min.`, 'error');
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      recordFailedLogin();
      return false;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    if (!error) {
      resetRateLimit();
      return true;
    }

    const status = recordFailedLogin();
    if (status.isLocked) {
      showToast('Trop d\'échecs répétés. Accès verrouillé pour 10 minutes.', 'error');
    } else {
      showToast(`Connexion Supabase refusée : ${error.message} (${status.attemptsLeft} essai(s) restant(s)).`, 'error');
    }
    return false;
  };

  const logoutAdmin = () => {
    if (!supabase) return;
    void supabase.auth.signOut().then(({ error }) => {
      if (error) {
        showToast(`Erreur à la fermeture de session : ${error.message}`, 'error');
        return;
      }
      setIsAdminLoggedIn(false);
      setAdminUser(null);
      setIsAdminOpen(false);
      showToast('Session /sudo clôturée.', 'info');
    });
  };

  const changeMasterPassword = async (currentPass: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !adminUser?.email) return { success: false, error: 'Session Supabase administrateur absente.' };

    if (newPass.length < 8) {
      return { success: false, error: 'Le nouveau mot de passe doit comporter au moins 8 caractères.' };
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: adminUser.email,
      password: currentPass
    });
    if (signInError) return { success: false, error: 'Le mot de passe actuel est incorrect.' };

    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) return { success: false, error: `Impossible de modifier le mot de passe : ${error.message}` };

    showToast('Mot de passe Supabase modifié avec succès.', 'success');
    return { success: true };
  };

  // Blog CRUD
  const addBlogPost = async (postData: Omit<BlogPost, 'id'>): Promise<BlogPost | null> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return null;
    }
    const id = 'post_' + Date.now();
    const newPost: BlogPost = {
      ...postData,
      id,
      title: sanitizeText(postData.title, 180),
      slug: sanitizeText(postData.slug, 120),
      excerpt: sanitizeText(postData.excerpt, 500),
      image: sanitizeUrl(postData.image),
      views: 1
    };
    const { error } = await supabase.from('site_blog_posts').insert({ id, data: toJson(newPost) });
    if (error) {
      showToast(`Enregistrement de l’article impossible : ${error.message}`, 'error');
      return null;
    }
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast(`Article "${newPost.title}" créé avec succès.`);
    return newPost;
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return false;
    }
    const current = blogPosts.find((item) => item.id === id);
    if (!current) return false;
    const updated = { ...current, ...updates };
    const { error } = await supabase.from('site_blog_posts').update({ data: toJson(updated) }).eq('id', id);
    if (error) {
      showToast(`Mise à jour de l’article impossible : ${error.message}`, 'error');
      return false;
    }
    setBlogPosts((prev) => prev.map((item) => (item.id === id ? updated : item)));
    showToast('Article mis à jour avec succès.');
    return true;
  };

  const deleteBlogPost = async (id: string) => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return;
    }
    const { error } = await supabase.from('site_blog_posts').delete().eq('id', id);
    if (error) {
      showToast(`Suppression de l’article impossible : ${error.message}`, 'error');
      return;
    }
    setBlogPosts((prev) => prev.filter((item) => item.id !== id));
    showToast('Article supprimé.', 'warning');
  };

  const duplicateBlogPost = async (id: string) => {
    const target = blogPosts.find((p) => p.id === id);
    if (!target) return;
    const duplicated: BlogPost = {
      ...target,
      id: 'post_' + Date.now(),
      title: `${target.title} (Copie)`,
      slug: `${target.slug}-copie`,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      views: 0,
      status: 'draft'
    };
    if (await addBlogPost(duplicated)) showToast('Article dupliqué en tant que brouillon.');
  };

  // Projects CRUD
  const addProject = async (projectData: Omit<PortfolioProject, 'id'>): Promise<PortfolioProject | null> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return null;
    }
    const id = 'proj_' + Date.now();
    const newProject: PortfolioProject = {
      ...projectData,
      id,
      title: sanitizeText(projectData.title, 120),
      client: sanitizeText(projectData.client, 100),
      industry: sanitizeText(projectData.industry, 100),
      summary: sanitizeText(projectData.summary, 400),
      link: projectData.link ? sanitizeUrl(projectData.link) : undefined,
      image: sanitizeUrl(projectData.image),
      status: projectData.status || 'live'
    };
    const { error } = await supabase.from('site_projects').insert({ id, data: toJson(newProject) });
    if (error) {
      showToast(`Enregistrement du projet impossible : ${error.message}`, 'error');
      return null;
    }
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Projet "${newProject.title}" ajouté au portfolio.`);
    return newProject;
  };

  const updateProject = async (id: string, updates: Partial<PortfolioProject>): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return false;
    }
    const current = projects.find((item) => item.id === id);
    if (!current) return false;
    const updated = { ...current, ...updates };
    const { error } = await supabase.from('site_projects').update({ data: toJson(updated) }).eq('id', id);
    if (error) {
      showToast(`Mise à jour du projet impossible : ${error.message}`, 'error');
      return false;
    }
    setProjects((prev) => prev.map((item) => (item.id === id ? updated : item)));
    showToast('Projet portfolio mis à jour avec succès.');
    return true;
  };

  const deleteProject = async (id: string) => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return;
    }
    const { error } = await supabase.from('site_projects').delete().eq('id', id);
    if (error) {
      showToast(`Suppression du projet impossible : ${error.message}`, 'error');
      return;
    }
    setProjects((prev) => prev.filter((item) => item.id !== id));
    showToast('Projet retiré du portfolio.', 'warning');
  };

  const duplicateProject = async (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const duplicated: PortfolioProject = {
      ...target,
      id: 'proj_' + Date.now(),
      title: `${target.title} (Copie)`,
      client: `${target.client} (Brouillon)`
    };
    if (await addProject(duplicated)) showToast('Projet dupliqué avec succès.');
  };

  // Quotes CRUD with Strong Input Sanitization
  const unreadQuotesCount = quotes.filter((q) => q.status === 'new').length;

  const addQuote = async (data: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    company?: string;
    services: string[];
    budget: string;
    timeline: string;
    description: string;
  }): Promise<QuoteRequest> => {
    if (!supabase) throw new Error('Supabase n’est pas configuré.');
    const safeName = sanitizeText(data.clientName, 100) || 'Prospect Anonyme';
    const safeEmail = isValidEmail(data.clientEmail) ? data.clientEmail.trim() : 'invalide@email.com';
    const safePhone = sanitizePhone(data.clientPhone || '');
    const safeCompany = sanitizeText(data.company, 120) || 'Non renseigné';
    const safeServices = (data.services || []).map((s) => sanitizeText(s, 80)).filter(Boolean);
    const safeBudget = sanitizeText(data.budget, 80) || 'À définir';
    const safeTimeline = sanitizeText(data.timeline, 80) || 'Flexible';
    const safeDescription = sanitizeText(data.description, 4000);

    const id = `DEV-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const newQuote: QuoteRequest = {
      id,
      clientName: safeName,
      clientEmail: safeEmail,
      clientPhone: safePhone || 'Non renseigné',
      company: safeCompany,
      services: safeServices.length > 0 ? safeServices : ['Ingénierie Web & SaaS'],
      budget: safeBudget,
      timeline: safeTimeline,
      description: safeDescription,
      date: new Date().toISOString(),
      status: 'new',
      priority: 'high',
      currency: globalSettings.defaultCurrency || 'EUR'
    };
    const { error } = await supabase.from('site_quotes').insert({ id, data: toJson(newQuote) });
    if (error) throw new Error(`Enregistrement du devis impossible : ${error.message}`);

    setQuotes((prev) => [newQuote, ...prev]);
    setAnalytics((prev) => ({
      ...prev,
      quotesGenerated: prev.quotesGenerated + 1
    }));
    return newQuote;
  };

  const updateQuoteStatus = async (id: string, status: QuoteStatus): Promise<boolean> => {
    return updateQuote(id, { status });
  };

  const updateQuote = async (id: string, updates: Partial<QuoteRequest>): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return false;
    }
    const current = quotes.find((item) => item.id === id);
    if (!current) return false;
    const updated = { ...current, ...updates };
    const { error } = await supabase.from('site_quotes').update({ data: toJson(updated) }).eq('id', id);
    if (error) {
      showToast(`Mise à jour du devis impossible : ${error.message}`, 'error');
      return false;
    }
    setQuotes((prev) => prev.map((item) => (item.id === id ? updated : item)));
    showToast(`Devis ${id} actualisé.`);
    return true;
  };

  const deleteQuote = async (id: string) => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return;
    }
    const { error } = await supabase.from('site_quotes').delete().eq('id', id);
    if (error) {
      showToast(`Suppression du devis impossible : ${error.message}`, 'error');
      return;
    }
    setQuotes((prev) => prev.filter((item) => item.id !== id));
    showToast(`Devis supprimé de l'historique.`, 'warning');
  };

  const convertQuoteToClient = async (quoteId: string): Promise<ClientRecord | null> => {
    const quote = quotes.find((q) => q.id === quoteId);
    if (!quote) return null;
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return null;
    }

    let numBudget = quote.estimatedAmount || 15000;
    if (!quote.estimatedAmount) {
      if (quote.budget.includes('25 000') || quote.budget.includes('28,000')) numBudget = 30000;
      else if (quote.budget.includes('10 000') || quote.budget.includes('11,000')) numBudget = 18000;
      else if (quote.budget.includes('3 000') || quote.budget.includes('3,500')) numBudget = 7500;
      else numBudget = 3500;
    }

    const newClientId = 'cli_' + crypto.randomUUID();
    const newClient: ClientRecord = {
      id: newClientId,
      name: quote.clientName,
      company: quote.company,
      email: quote.clientEmail,
      phone: quote.clientPhone,
      status: 'active',
      projectName: quote.services[0] || 'Projet Digital WYNX',
      totalBudget: numBudget,
      invoicedAmount: Math.round(numBudget * 0.4),
      paidAmount: 0,
      currency: quote.currency || 'EUR',
      progress: 10,
      currentMilestone: 'Cahier des charges & Ateliers de cadrage initial',
      startDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      interactions: [
        {
          id: 'int_' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          type: 'meeting',
          note: `Converti depuis la demande de devis ${quote.id}. Brief : ${quote.description.slice(0, 140)}...`,
          author: adminUser?.name || 'Administrateur'
        }
      ],
      notes: `Devis d'origine : ${quote.id}. Délai souhaité : ${quote.timeline}. Budget estimé : ${numBudget} €.`
    };

    const { error } = await supabase.rpc('convert_wynx_quote_to_client', {
      p_quote_id: quoteId,
      p_client_id: newClientId,
      p_client_data: toJson(newClient)
    });
    if (error) {
      showToast(`Conversion du devis impossible : ${error.message}`, 'error');
      return null;
    }

    setClients((prev) => [newClient, ...prev]);
    setQuotes((prev) => prev.map((item) =>
      item.id === quoteId ? { ...item, status: 'accepted', convertedToClientId: newClientId } : item
    ));
    showToast(`Prospect ${quote.clientName} converti avec succès dans le CRM Clients !`);
    return newClient;
  };

  // Client CRM CRUD
  const addClient = async (data: Omit<ClientRecord, 'id' | 'interactions'> & { initialNote?: string }): Promise<ClientRecord | null> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return null;
    }
    const id = 'cli_' + crypto.randomUUID();
    const interactions: ClientInteraction[] = data.initialNote
      ? [
          {
            id: 'int_' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            type: 'note',
            note: sanitizeText(data.initialNote, 800),
            author: adminUser?.name || 'Administrateur'
          }
        ]
      : [];

    const newClient: ClientRecord = {
      ...data,
      id,
      name: sanitizeText(data.name, 100),
      company: sanitizeText(data.company, 120),
      email: isValidEmail(data.email) ? data.email.trim() : 'invalide@email.com',
      phone: sanitizePhone(data.phone),
      projectName: sanitizeText(data.projectName, 150),
      currentMilestone: sanitizeText(data.currentMilestone, 200),
      interactions
    };

    const { error } = await supabase.from('site_clients').insert({ id, data: toJson(newClient) });
    if (error) {
      showToast(`Enregistrement du client impossible : ${error.message}`, 'error');
      return null;
    }
    setClients((prev) => [newClient, ...prev]);
    showToast(`Nouveau client "${newClient.company}" ajouté au CRM.`);
    return newClient;
  };

  const updateClient = async (id: string, updates: Partial<ClientRecord>): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return false;
    }
    const current = clients.find((client) => client.id === id);
    if (!current) return false;
    const updated = { ...current, ...updates };
    const { error } = await supabase.from('site_clients').update({ data: toJson(updated) }).eq('id', id);
    if (error) {
      showToast(`Mise à jour du client impossible : ${error.message}`, 'error');
      return false;
    }
    setClients((prev) => prev.map((client) => (client.id === id ? updated : client)));
    showToast(`Dossier client mis à jour.`);
    return true;
  };

  const deleteClient = async (id: string) => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return;
    }
    const { error } = await supabase.from('site_clients').delete().eq('id', id);
    if (error) {
      showToast(`Suppression du client impossible : ${error.message}`, 'error');
      return;
    }
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast(`Client retiré du CRM.`, 'warning');
  };

  const addClientInteraction = async (clientId: string, note: string, type: ClientInteraction['type'] = 'note'): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return false;
    }
    const newInteraction: ClientInteraction = {
      id: 'int_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      type,
      note: sanitizeText(note, 1000),
      author: adminUser?.name || 'Administrateur'
    };

    const current = clients.find((client) => client.id === clientId);
    if (!current) return false;
    const updated = {
      ...current,
      interactions: [newInteraction, ...(current.interactions || [])]
    };
    const { error } = await supabase.from('site_clients').update({ data: toJson(updated) }).eq('id', clientId);
    if (error) {
      showToast(`Enregistrement de l’interaction impossible : ${error.message}`, 'error');
      return false;
    }
    setClients((prev) => prev.map((client) => (client.id === clientId ? updated : client)));
    showToast('Nouvelle interaction consignée.');
    return true;
  };

  // Analytics actions
  const refreshAnalytics = () => {
    showToast('Les statistiques de trafic ne sont pas connectées à Supabase.', 'info');
  };

  // Global Settings CRUD
  const updateGlobalSettings = async (updates: Partial<GlobalSettings>): Promise<boolean> => {
    if (!supabase) {
      showToast('Supabase n’est pas configuré.', 'error');
      return false;
    }
    const updated = {
      ...globalSettings,
      ...updates,
      announcementLink: updates.announcementLink ? sanitizeUrl(updates.announcementLink) : globalSettings.announcementLink,
      contactEmail: updates.contactEmail ? (isValidEmail(updates.contactEmail) ? updates.contactEmail.trim() : globalSettings.contactEmail) : globalSettings.contactEmail
    };
    const { error } = await supabase.from('site_settings').upsert(
      { id: 1, data: toJson(updated) },
      { onConflict: 'id' }
    );
    if (error) {
      showToast(`Enregistrement des paramètres impossible : ${error.message}`, 'error');
      return false;
    }
    setGlobalSettings(updated);
    showToast('Configuration globale enregistrée.');
    return true;
  };

  const resetToDefaults = () => {
    void updateGlobalSettings(initialGlobalSettings);
  };

  const dismissBanner = () => {
    setIsBannerDismissed(true);
  };

  return (
    <SiteDataContext.Provider
      value={{
        isAdminOpen,
        isAdminLoggedIn,
        adminUser,
        activeAdminTab,
        openAdmin,
        closeAdmin,
        loginAdmin,
        logoutAdmin,
        changeMasterPassword,
        setActiveAdminTab,

        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        duplicateBlogPost,

        projects,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,

        quotes,
        unreadQuotesCount,
        addQuote,
        updateQuoteStatus,
        updateQuote,
        deleteQuote,
        convertQuoteToClient,

        clients,
        addClient,
        updateClient,
        deleteClient,
        addClientInteraction,

        analytics,
        refreshAnalytics,

        globalSettings,
        updateGlobalSettings,
        resetToDefaults,

        isBannerDismissed,
        dismissBanner,

        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
