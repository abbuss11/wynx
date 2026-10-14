import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import { sanitizeUrl } from '../utils/security';

export const AnnouncementBanner: React.FC = () => {
  const { globalSettings, isBannerDismissed, dismissBanner } = useSiteData();

  if (!globalSettings.announcementActive || isBannerDismissed) {
    return null;
  }

  const safeLink = sanitizeUrl(globalSettings.announcementLink, '#contact');

  return (
    <div className="bg-gradient-to-r from-[#FF5500] via-[#E64D00] to-[#FF6B1A] text-white py-2 px-4 sm:px-6 relative z-50 text-xs font-medium shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center truncate">
          {globalSettings.announcementBadge && (
            <span className="px-2 py-0.5 text-[10px] uppercase font-mono-data font-bold rounded bg-black/30 text-white shrink-0 tracking-wider">
              {globalSettings.announcementBadge}
            </span>
          )}
          <span className="truncate">{globalSettings.announcementText}</span>
          {globalSettings.announcementLink && (
            <a
              href={safeLink}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold underline hover:opacity-80 transition-opacity shrink-0"
            >
              <span>Découvrir</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>

        <button
          onClick={dismissBanner}
          className="p-1 text-white/80 hover:text-white rounded-md hover:bg-black/10 transition-colors shrink-0"
          aria-label="Fermer l'annonce"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
