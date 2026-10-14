import React, { useState } from 'react';
import { useSiteData, AdminTab } from '../../context/SiteDataContext';
import { WynxLogo } from '../brand/WynxLogo';
import { ThemeToggle } from '../ThemeToggle';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminQuotes } from './AdminQuotes';
import { AdminClients } from './AdminClients';
import { AdminBlog } from './AdminBlog';
import { AdminProjects } from './AdminProjects';
import { AdminSettings } from './AdminSettings';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Users, 
  BookOpen, 
  Briefcase, 
  Settings, 
  ArrowLeft, 
  LogOut, 
  Radio, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X, 
  Menu, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface AdminLayoutProps {
  onExit?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExit }) => {
  const { 
    activeAdminTab, 
    setActiveAdminTab, 
    closeAdmin, 
    logoutAdmin, 
    adminUser, 
    unreadQuotesCount,
    blogPosts,
    projects,
    clients,
    analytics,
    toasts,
    removeToast
  } = useSiteData();

  const handleReturnToSite = () => {
    closeAdmin();
    if (onExit) onExit();
  };

  const handleLogout = () => {
    logoutAdmin();
    if (onExit) onExit();
  };

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: any; badge?: number | string; badgeColor?: string }[] = [
    { 
      id: 'analytics', 
      label: 'Analytics & Trafic', 
      icon: BarChart3,
      badge: `${analytics.liveVisitors} live`,
      badgeColor: 'bg-emerald-500/10 text-emerald-500'
    },
    { 
      id: 'quotes', 
      label: 'Gestion des Devis', 
      icon: FileSpreadsheet,
      badge: unreadQuotesCount > 0 ? unreadQuotesCount : undefined,
      badgeColor: 'bg-[#FF5500] text-white'
    },
    { 
      id: 'clients', 
      label: 'Suivi Clients & CRM', 
      icon: Users,
      badge: clients.length,
      badgeColor: 'bg-blue-500/10 text-blue-500'
    },
    { 
      id: 'blog', 
      label: 'Articles & Blog', 
      icon: BookOpen,
      badge: blogPosts.length,
      badgeColor: 'bg-neutral-500/10 text-neutral-400'
    },
    { 
      id: 'projects', 
      label: 'Projets Portfolio', 
      icon: Briefcase,
      badge: projects.length,
      badgeColor: 'bg-neutral-500/10 text-neutral-400'
    },
    { 
      id: 'settings', 
      label: 'Gestion Globale', 
      icon: Settings 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#07080B] text-[#0B0D13] dark:text-[#ECEFF4] font-body flex transition-colors duration-200">
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium border backdrop-blur-md animate-in slide-in-from-top-2 duration-200 ${
              toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-500/30'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-amber-200 border-amber-500/30'
                : toast.type === 'info'
                ? 'bg-blue-950/90 text-blue-200 border-blue-500/30'
                : 'bg-neutral-900/95 text-white dark:bg-white/95 dark:text-neutral-900 border-[#FF5500]/40'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0" />
            )}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-white dark:bg-[#0A0C12] border-r border-black/[0.08] dark:border-white/[0.08] shrink-0 sticky top-0 h-screen select-none z-20">
        {/* Brand & Console Title */}
        <div className="p-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <WynxLogo variant="full" height="30px" />
            <span className="px-2 py-0.5 text-[10px] font-mono-data font-semibold rounded bg-[#FF5500]/10 text-[#FF5500] uppercase tracking-wider">
              ADMIN v2.4
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Portail de Gestion Sécurisé</span>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-mono-data uppercase tracking-wider text-neutral-400 font-semibold">
            Modules d'Administration
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeAdminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveAdminTab(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/25'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04] hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono-data font-bold rounded-md ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile and Return */}
        <div className="p-4 border-t border-black/[0.08] dark:border-white/[0.08] space-y-3">
          <button
            onClick={handleReturnToSite}
            className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voir le site public</span>
          </button>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#11141E] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FF5500]/15 text-[#FF5500] flex items-center justify-center font-bold text-xs shrink-0">
                AI
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                  {adminUser?.name || 'Abbuss Idriss'}
                </div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono-data">
                  {adminUser?.role || 'Super Admin'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-neutral-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
              title="Déconnexion sécurisée"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white dark:bg-[#0A0C12] h-full flex flex-col z-10 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
              <WynxLogo variant="full" height="28px" />
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="py-4 space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeAdminTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveAdminTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FF5500] text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="px-2 py-0.5 text-[10px] rounded bg-white/20 font-mono-data">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => {
                setIsMobileSidebarOpen(false);
                handleReturnToSite();
              }}
              className="w-full py-2.5 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-white/[0.06] text-neutral-800 dark:text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au site public</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#07080B]/80 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.08] px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.06]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400 hidden sm:inline">Portail /sudo</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 hidden sm:inline" />
              <span className="font-semibold text-neutral-900 dark:text-white">
                {navItems.find((n) => n.id === activeAdminTab)?.label}
              </span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono-data">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{analytics.liveVisitors} visiteurs en direct</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle isCompact />

            {/* Quick Switch to Public Site */}
            <button
              onClick={handleReturnToSite}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Site Public</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Tab Body Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeAdminTab === 'analytics' && <AdminAnalytics />}
          {activeAdminTab === 'quotes' && <AdminQuotes />}
          {activeAdminTab === 'clients' && <AdminClients />}
          {activeAdminTab === 'blog' && <AdminBlog />}
          {activeAdminTab === 'projects' && <AdminProjects />}
          {activeAdminTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
