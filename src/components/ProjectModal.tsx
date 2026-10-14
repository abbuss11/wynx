import React, { useEffect } from 'react';
import { PortfolioProject } from '../types';
import { X, TrendingUp, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WynxLogo } from './brand/WynxLogo';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectProjectForQuote: (title: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSelectProjectForQuote }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#10141D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0C0E14] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <WynxLogo variant="emblem-gold" height="22px" />
            <span className="text-xs uppercase font-semibold text-[#FF5500] tracking-wider">
              {t('portfolio.modalTag')}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">{project.client}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="font-mono-data text-xs text-neutral-400">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual Banner */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-[#090A0D]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10141D] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <h2 id="modal-title" className="font-display text-2xl sm:text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl">
                {project.summary}
              </p>
            </div>
          </div>

          {/* Key Quantitative Metrics Grid */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF5500]" />
              <span>{t('portfolio.modalResults')}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(project.results || []).map((res, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#141824] border border-white/[0.06]">
                  <div className="font-mono-data text-2xl sm:text-3xl font-bold text-[#FF5500] mb-1">
                    {res.metric}
                  </div>
                  <div className="text-xs text-neutral-300 font-medium">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#141824]/60 border border-white/[0.06]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
                <span>{t('portfolio.modalProblem')}</span>
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#141824]/60 border border-[#FF5500]/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#FF5500] mb-3 flex items-center gap-2">
                <span>{t('portfolio.modalSolution')}</span>
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FF5500]" />
              <span>{t('portfolio.modalTech')}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.techStack || []).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono-data font-medium text-neutral-200 bg-[#161B28] border border-white/10 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#0C0E14] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <div className="text-xs text-neutral-400">
            {t('portfolio.modalPrompt')}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onSelectProjectForQuote(project.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-md transition-colors cursor-pointer"
            >
              {t('portfolio.modalQuoteBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
