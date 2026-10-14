import React, { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { PortfolioProject } from '../types';
import { ProjectModal } from './ProjectModal';
import { Search, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';

interface PortfolioSectionProps {
  onSelectProjectForQuote: (title: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProjectForQuote }) => {
  const { language, t } = useLanguage();
  const { projects: allProjects } = useSiteData();
  const projects = allProjects.filter((p) => p.status !== 'archived');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const categories = [
    { id: 'all', label: t('portfolio.all') },
    { id: 'saas', label: t('portfolio.saas') },
    { id: 'ecommerce', label: t('portfolio.ecommerce') },
    { id: 'mobile', label: t('portfolio.mobile') },
    { id: 'branding', label: t('portfolio.branding') }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#F8F9FC] dark:bg-[#090A0D] border-t border-black/[0.06] dark:border-white/[0.06] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal direction="up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
                {t('portfolio.kicker')}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] transition-colors">
                {t('portfolio.title')}
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
              {t('portfolio.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Dynamic Controls Bar */}
        <Reveal direction="up" delayMs={100}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
            {/* Functional Button Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5500] text-white shadow-md shadow-[#FF5500]/20'
                        : 'bg-neutral-100 dark:bg-[#121620] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-[#181D2A] border border-neutral-300/80 dark:border-white/[0.06]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('portfolio.searchPlaceholder')}
                className="w-full bg-white dark:bg-[#121620] border border-neutral-300 dark:border-white/[0.08] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-md pl-10 pr-4 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-xl bg-[#10141D] border border-white/[0.06]">
            <p className="text-neutral-400 text-sm mb-4">
              {t('portfolio.noResults')}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#FF5500] hover:underline"
            >
              {t('portfolio.reset')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} direction="up" delayMs={idx * 80}>
                <div
                  onClick={() => setActiveProject(project)}
                  data-cursor="project"
                  data-cursor-label={language === 'fr' ? 'VOIR' : 'VIEW'}
                  className="group bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] hover:border-[#FF5500]/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                >
                  {/* Visual Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-[#0C0E14]">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#11141E] via-transparent to-transparent opacity-70" />
                    
                    {/* Floating Action Hint */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white group-hover:bg-[#FF5500] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                        <span className="font-semibold text-[#FF5500]">{project.client}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-data">{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{project.category}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-neutral-950 dark:text-white group-hover:text-[#FF5500] transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Quantified Result Highlight */}
                    <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="font-mono-data text-lg font-bold text-neutral-950 dark:text-white">
                          {project.results[0].metric}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {project.results[0].label}
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-[#FF5500] group-hover:underline">
                        {t('portfolio.viewCaseStudy')} &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onSelectProjectForQuote={onSelectProjectForQuote}
      />
    </section>
  );
};
