import React, { useState, useMemo } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { BlogPost } from '../types';
import { ArticleModal } from './ArticleModal';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';

interface BlogSectionProps {
  onDiscussArticle: (topic: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onDiscussArticle }) => {
  const { language, t } = useLanguage();
  const { blogPosts } = useSiteData();
  const articles = blogPosts.filter((article) => article.status !== 'draft');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: t('blog.all') },
    { id: 'SEO & Visibilité', label: 'SEO & Growth' },
    { id: 'Architecture Web', label: 'Architecture & Jamstack' },
    { id: 'UI/UX & Produit', label: 'UI/UX & Design Systems' },
    { id: 'Mobile', label: 'Mobile Engineering' }
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.seoKeywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <section id="blog" className="py-24 md:py-32 bg-[#F1F3F8] dark:bg-[#0C0E14] border-t border-black/[0.06] dark:border-white/[0.06] relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <Reveal direction="up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-3">
                {t('blog.kicker')}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight [text-wrap:balance] transition-colors">
                {t('blog.title')}
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed transition-colors">
              {t('blog.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Filter controls and Search */}
        <Reveal direction="up" delayMs={100}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
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

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="w-full bg-white dark:bg-[#121620] border border-neutral-300 dark:border-white/[0.08] focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-md pl-10 pr-4 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>
        </Reveal>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center rounded-xl bg-neutral-100 dark:bg-[#10141D] border border-black/[0.06] dark:border-white/[0.06]">
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
              {t('blog.noArticles')}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#FF5500] hover:underline cursor-pointer"
            >
              {t('blog.reset')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article, idx) => (
              <Reveal key={article.id} direction="up" delayMs={idx * 100}>
                <article
                  onClick={() => setActiveArticle(article)}
                  data-cursor="project"
                  data-cursor-label={language === 'fr' ? 'LIRE' : 'READ'}
                  className="group bg-white dark:bg-[#111520] border border-black/[0.08] dark:border-white/[0.08] hover:border-[#FF5500]/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Visual Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200 dark:bg-[#0A0D14]">
                      <img
                        src={article.image}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#111520] via-transparent to-transparent opacity-80" />
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                        <span className="font-semibold text-[#FF5500]">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                          <span>{article.readingTime} {t('blog.readTime')}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white group-hover:text-[#FF5500] transition-colors mb-3 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-6">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 text-[11px] font-mono-data text-neutral-500 dark:text-neutral-400">
                        {article.seoKeywords.slice(0, 3).map((kw, i) => (
                          <span key={i} className="text-neutral-400 dark:text-neutral-500">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-4 border-t border-black/[0.06] dark:border-white/[0.06] bg-neutral-50 dark:bg-[#0E1119] flex items-center justify-between text-xs">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {t('blog.by')} <strong className="text-neutral-950 dark:text-white">{article.author.name}</strong>
                    </span>
                    <span className="font-semibold text-[#FF5500] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {t('blog.readFull')} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onDiscussTopic={onDiscussArticle}
      />
    </section>
  );
};
