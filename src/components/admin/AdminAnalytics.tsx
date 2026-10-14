import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  Radio, 
  FileSpreadsheet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Globe, 
  RefreshCw, 
  ExternalLink 
} from 'lucide-react';

import { MonthlyQuotesD3Chart } from './MonthlyQuotesD3Chart';

export const AdminAnalytics: React.FC = () => {
  const { analytics, refreshAnalytics, quotes } = useSiteData();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '12m'>('7d');

  // Traffic chart computation
  const maxVisits = Math.max(...analytics.dailyStats.map((d) => d.visits), 2200);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono-data uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Données de démonstration — trafic non connecté
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1">
            Analytics & Trafic Visiteurs
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Performance globale du site, acquisition d'audience, conversions de devis et engagement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time range selector */}
          <div className="inline-flex p-1 bg-neutral-200/70 dark:bg-[#151923] rounded-lg border border-black/[0.06] dark:border-white/[0.06]">
            {(['7d', '30d', '12m'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {range === '7d' ? '7 Jours' : range === '30d' ? '30 Jours' : '1 An'}
              </button>
            ))}
          </div>

          <button
            onClick={refreshAnalytics}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-white dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] rounded-lg hover:border-[#FF5500]/50 transition-colors shadow-xs"
            title="Rafraîchir les métriques"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs font-medium">
            <span>Visiteurs Totaux</span>
            <Users className="w-4 h-4 text-[#FF5500]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-data text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              {analytics.totalVisitors.toLocaleString()}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +18.4%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            {analytics.uniqueVisitors.toLocaleString()} visiteurs uniques
          </div>
        </div>

        {/* Page Views */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs font-medium">
            <span>Pages Vues</span>
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-data text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              {analytics.pageViews.toLocaleString()}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +24.1%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            Ratio de ~3.0 pages par visiteur
          </div>
        </div>

        {/* Bounce Rate & Duration */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs font-medium">
            <span>Taux de Rebond</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-data text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              {analytics.bounceRate}%
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              -3.8%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-neutral-400" />
            Durée moyenne : <strong className="font-mono-data">{analytics.avgSessionDuration}</strong>
          </div>
        </div>

        {/* Live Visitors & Leads */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-white to-orange-50/30 dark:from-[#11141E] dark:to-[#1A1211] border border-[#FF5500]/25 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-[#FF5500] font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              En Direct
            </span>
            <FileSpreadsheet className="w-4 h-4 text-[#FF5500]" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-mono-data text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white flex items-center gap-2">
              {analytics.liveVisitors}
              <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">actifs</span>
            </span>
            <span className="px-2 py-0.5 text-[11px] font-mono-data font-semibold rounded-md bg-[#FF5500]/10 text-[#FF5500]">
              {analytics.conversionRate}% conv.
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            <strong className="font-mono-data text-neutral-900 dark:text-white">{quotes.length}</strong> demandes de devis enregistrées
          </div>
        </div>
      </div>

      {/* Main Interactive Traffic Evolution Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
              Évolution du Trafic (Visites & Pages Vues)
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Historique des sessions enregistrées sur la période sélectionnée
            </p>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#FF5500]" />
              <span className="text-neutral-600 dark:text-neutral-400">Visites quotidiennes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-neutral-300 dark:bg-white/20" />
              <span className="text-neutral-600 dark:text-neutral-400">Pages Vues</span>
            </div>
          </div>
        </div>

        {/* Visual SVG & Bar Chart */}
        <div className="h-64 sm:h-72 w-full flex items-end gap-3 sm:gap-6 pt-6 border-b border-black/[0.08] dark:border-white/[0.08] px-2">
          {analytics.dailyStats.map((item, idx) => {
            const visitHeight = Math.round((item.visits / maxVisits) * 100);
            const pageViewRatio = Math.round((item.pageViews / (maxVisits * 3.5)) * 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                {/* Hover Tooltip */}
                <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-[11px] p-2 rounded-lg shadow-xl whitespace-nowrap z-20 font-mono-data">
                  <div className="font-semibold">{item.date}</div>
                  <div>Visites : {item.visits.toLocaleString()}</div>
                  <div className="text-neutral-400 dark:text-neutral-600">Pages : {item.pageViews.toLocaleString()}</div>
                </div>

                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  {/* Visits Bar */}
                  <div 
                    style={{ height: `${Math.max(12, visitHeight)}%` }} 
                    className="w-full max-w-[28px] bg-gradient-to-t from-[#FF5500] to-[#FF7733] rounded-t-md transition-all duration-300 group-hover:brightness-110 shadow-sm"
                  />
                  {/* Page Views Bar */}
                  <div 
                    style={{ height: `${Math.max(8, pageViewRatio)}%` }} 
                    className="w-full max-w-[14px] bg-neutral-200 dark:bg-white/10 rounded-t-sm transition-all duration-300 group-hover:bg-neutral-300 dark:group-hover:bg-white/20 hidden sm:block"
                  />
                </div>

                {/* Day Label */}
                <span className="mt-3 text-xs font-mono-data text-neutral-500 dark:text-neutral-400 font-medium group-hover:text-[#FF5500] transition-colors">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 text-xs text-neutral-500 dark:text-neutral-400 font-mono-data">
          <span>Point culminant : {Math.max(...analytics.dailyStats.map((d) => d.visits)).toLocaleString()} visites</span>
          <span>Moyenne quotidienne : ~{Math.round(analytics.totalVisitors / 18).toLocaleString()} sessions</span>
        </div>
      </div>

      {/* D3.js Monthly Quotes Analytics Visualization */}
      <MonthlyQuotesD3Chart />

      {/* Grid: Traffic Sources & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Traffic Acquisition Sources */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-6">
          <div>
            <h2 className="font-display text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              Canaux d'Acquisition de Trafic
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Origine des visiteurs qualifiés et des prospects entrants
            </p>
          </div>

          <div className="space-y-4">
            {analytics.trafficSources.map((source, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-neutral-800 dark:text-neutral-200">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: source.color }} 
                    />
                    <span>{source.source}</span>
                  </div>
                  <span className="font-mono-data text-neutral-500 dark:text-neutral-400 font-semibold">
                    {source.percentage}% ({source.visits.toLocaleString()})
                  </span>
                </div>
                <div className="h-2 w-full bg-neutral-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${source.percentage}%`,
                      backgroundColor: source.color 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06] text-xs text-neutral-600 dark:text-neutral-300">
            <strong className="text-neutral-950 dark:text-white">Insight SEO :</strong> Le référencement organique sur les requêtes <em>"Agence web Niamey"</em>, <em>"Ingénierie SaaS Afrique"</em> et <em>"Refonte e-commerce headless"</em> génère 44% du trafic total.
          </div>
        </div>

        {/* Right: Top Visited Pages & Content */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
                Pages les Plus Consultées
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Volume de vues et rétention par section du site
              </p>
            </div>
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-[#FF5500] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Tester le site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-black/[0.08] dark:border-white/[0.08] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3">URL / Section</th>
                  <th className="pb-3 text-right">Vues</th>
                  <th className="pb-3 text-right">Temps Moyen</th>
                  <th className="pb-3 text-right">Rebond</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {analytics.topPages.map((page, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-2">
                      <div className="font-medium text-neutral-900 dark:text-white">{page.title}</div>
                      <div className="font-mono-data text-[11px] text-neutral-400">{page.path}</div>
                    </td>
                    <td className="py-3 text-right font-mono-data font-semibold text-neutral-900 dark:text-white">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-mono-data text-neutral-600 dark:text-neutral-300">
                      {page.avgTime}
                    </td>
                    <td className="py-3 text-right font-mono-data text-emerald-600 dark:text-emerald-400">
                      {page.bounceRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Grid: Geo Distribution & Devices/Browsers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Geography */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-neutral-950 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF5500]" />
              Origine Géographique
            </h3>
            <span className="text-xs text-neutral-400">Top 5</span>
          </div>

          <div className="space-y-3">
            {analytics.topCountries.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-[11px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300">
                    {c.code}
                  </span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">{c.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-neutral-400">{c.visits.toLocaleString()}</span>
                  <span className="font-mono-data font-semibold text-neutral-950 dark:text-white w-10 text-right">
                    {c.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <h3 className="font-display font-bold text-neutral-950 dark:text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-500" />
            Répartition Appareils
          </h3>

          <div className="space-y-3 pt-1">
            {analytics.devices.map((dev, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-1.5">
                    {dev.device.includes('Mobile') ? <Smartphone className="w-3.5 h-3.5 text-neutral-400" /> : dev.device.includes('Desktop') ? <Laptop className="w-3.5 h-3.5 text-neutral-400" /> : <Tablet className="w-3.5 h-3.5 text-neutral-400" />}
                    {dev.device}
                  </span>
                  <span className="font-mono-data font-semibold text-neutral-950 dark:text-white">
                    {dev.percentage}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${dev.percentage}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <h3 className="font-display font-bold text-neutral-950 dark:text-white flex items-center gap-2">
            <Laptop className="w-4 h-4 text-emerald-500" />
            Navigateurs Utilisés
          </h3>

          <div className="space-y-3 pt-1">
            {analytics.browsers.map((b, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                    {b.browser}
                  </span>
                  <span className="font-mono-data font-semibold text-neutral-950 dark:text-white">
                    {b.percentage}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${b.percentage}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
