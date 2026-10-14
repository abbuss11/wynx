import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { X, Check, Share2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WynxLogo } from './brand/WynxLogo';

interface ArticleModalProps {
  article: BlogPost | null;
  onClose: () => void;
  onDiscussTopic: (topic: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onDiscussTopic }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + article.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#10141E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0C0E14] sticky top-0 z-10">
          <div className="flex items-center gap-2.5 text-xs text-neutral-400">
            <WynxLogo variant="emblem-gold" height="20px" />
            <span className="text-[#FF5500] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} {t('blog.readTime')}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors flex items-center gap-1.5 text-xs"
              title="Copy article link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? t('blog.copied') : t('blog.share')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <h1 id="article-modal-title" className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          {/* Author byline */}
          <div className="flex items-center gap-3 py-3 border-y border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-[#181D2C] border border-white/10 flex items-center justify-center text-xs font-bold text-white">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white">{article.author.name}</div>
              <div className="text-[11px] text-neutral-400">{article.author.role}</div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-[#090A0D]">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* SEO Keywords tags */}
          <div className="p-4 rounded-lg bg-[#141824] border border-white/[0.06]">
            <div className="text-xs uppercase font-semibold text-neutral-400 mb-2">
              {t('blog.seoKeywords')}
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono-data text-neutral-300">
              {(article.seoKeywords || []).map((kw, i) => (
                <span key={i} className="bg-[#0D1017] px-2.5 py-1 rounded border border-white/[0.06]">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Article Main Body */}
          <div className="prose prose-invert max-w-none text-neutral-300 space-y-4 text-sm sm:text-base leading-relaxed">
            {(article.content || '').split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display text-xl font-bold text-white pt-4">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-display text-lg font-semibold text-[#FF5500] pt-2">
                    {trimmed.replace('#### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').map(li => li.replace(/^- /, ''));
                return (
                  <ul key={idx} className="space-y-2 my-2 list-disc list-inside text-neutral-300">
                    {items.map((it, i) => (
                      <li key={i} className="text-sm sm:text-base">{it}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-neutral-300">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 bg-[#0C0E14] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="text-xs text-neutral-400">
            {t('blog.modalPrompt')}
          </div>
          <button
            onClick={() => {
              onClose();
              onDiscussTopic(article.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>{t('blog.modalCta')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
