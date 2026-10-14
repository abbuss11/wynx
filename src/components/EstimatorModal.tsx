import React, { useState, useMemo } from 'react';
import { X, Calculator, Check, ArrowRight, Zap } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { WynxLogo } from './brand/WynxLogo';

interface EstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (data: { service: string; budget: string; details: string }) => void;
}

export const EstimatorModal: React.FC<EstimatorModalProps> = ({ isOpen, onClose, onApplyEstimate }) => {
  const { language, t } = useLanguage();

  const projectTypesByLang: Record<Language, Array<{ label: string; basePrice: number; weeks: number }>> = {
    en: [
      { label: 'SaaS & Web Application Platform', basePrice: 4500, weeks: 4 },
      { label: 'Mobile App (iOS & Android Native/Cross)', basePrice: 5500, weeks: 5 },
      { label: 'High-Converting Headless E-Commerce', basePrice: 4000, weeks: 3 },
      { label: 'UI/UX Redesign & Product Ergonomics', basePrice: 2800, weeks: 2 },
      { label: 'Technical SEO & Performance Engineering', basePrice: 2200, weeks: 2 }
    ],
    fr: [
      { label: 'Plateforme SaaS & Web', basePrice: 4500, weeks: 4 },
      { label: 'Application Mobile (iOS & Android)', basePrice: 5500, weeks: 5 },
      { label: 'E-Commerce Headless Haut de Gamme', basePrice: 4000, weeks: 3 },
      { label: 'Refonte UI/UX & Audit Produit', basePrice: 2800, weeks: 2 },
      { label: 'Campagne SEO Technique & Performance', basePrice: 2200, weeks: 2 }
    ]
  };

  const featureOptionsByLang: Record<Language, Array<{ label: string; price: number }>> = {
    en: [
      { label: 'Secure Auth & Role-Based Access Control', price: 600 },
      { label: 'Payment Gateway (Stripe / In-App Purchases)', price: 800 },
      { label: 'Interactive Real-Time Analytics Dashboard', price: 900 },
      { label: 'Real-Time Sync (WebSockets / Streams)', price: 1100 },
      { label: 'Internationalization & Multi-Language', price: 500 },
      { label: 'Automated PDF Engine & Data Exports', price: 600 },
      { label: 'Hardened CI/CD & Cloud Infrastructure (AWS/GCP)', price: 800 }
    ],
    fr: [
      { label: 'Authentification & Rôles sécurisés', price: 600 },
      { label: 'Passerelle de Paiement (Stripe / In-App)', price: 800 },
      { label: 'Dashboard Analytique interactif', price: 900 },
      { label: 'Synchronisation Temps Réel (WebSockets)', price: 1100 },
      { label: 'Internationalisation & Multi-langues', price: 500 },
      { label: 'Génération de Rapports PDF & Exports', price: 600 },
      { label: 'CI/CD & Infrastructure Cloud AWS/GCP', price: 800 }
    ]
  };

  const designOptionsByLang: Record<Language, Array<{ label: string; multiplier: number }>> = {
    en: [
      { label: 'Client already provides complete Figma specs', multiplier: 0.85 },
      { label: 'Custom WYNX Design System & full UI/UX prototyping', multiplier: 1.0 },
      { label: 'Complete brand universe + 3D/Motion graphics identity', multiplier: 1.25 }
    ],
    fr: [
      { label: 'Maquettes Figma déjà fournies par le client', multiplier: 0.85 },
      { label: 'Design System sur-mesure complet WYNX', multiplier: 1.0 },
      { label: 'Identité de marque complète + 3D/Motion', multiplier: 1.25 }
    ]
  };

  const projectTypes = projectTypesByLang[language] || projectTypesByLang.en;
  const featureOptions = featureOptionsByLang[language] || featureOptionsByLang.en;
  const designOptions = designOptionsByLang[language] || designOptionsByLang.en;

  const [projectType, setProjectType] = useState<string>(projectTypes[0].label);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([featureOptions[0].label, featureOptions[2].label]);
  const [designLevel, setDesignLevel] = useState<string>(designOptions[1].label);

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const calculatedEstimate = useMemo(() => {
    const base = projectTypes.find((p) => p.label === projectType) || projectTypes[0];
    const featuresCost = selectedFeatures.reduce((acc, featName) => {
      const found = featureOptions.find((f) => f.label === featName);
      return acc + (found ? found.price : 0);
    }, 0);
    const designMod = designOptions.find((d) => d.label === designLevel)?.multiplier || 1.0;

    const rawTotal = Math.round((base.basePrice + featuresCost) * designMod);
    const minBudget = Math.round(rawTotal * 0.9);
    const maxBudget = Math.round(rawTotal * 1.15);
    const estimatedWeeks = Math.max(3, Math.round(base.weeks + selectedFeatures.length * 0.5));

    return {
      minBudget,
      maxBudget,
      weeks: estimatedWeeks
    };
  }, [projectType, selectedFeatures, designLevel, projectTypes, featureOptions, designOptions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#111522] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#0C0E15]">
          <div className="flex items-center gap-3.5">
            <div className="shrink-0 p-1.5 rounded-xl bg-[#171C2B] border border-[#FF5500]/20">
              <WynxLogo variant="emblem-gold" height="30px" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                {t('estimator.title')}
              </h2>
              <p className="text-xs text-neutral-400">
                {t('estimator.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Step 1: Project Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              {t('estimator.step1')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {projectTypes.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setProjectType(p.label)}
                  className={`p-3 rounded-lg text-left text-xs font-medium border transition-all cursor-pointer ${
                    projectType === p.label
                      ? 'bg-[#FF5500]/15 border-[#FF5500] text-white shadow-sm'
                      : 'bg-[#141825] border-white/[0.06] text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold">{p.label}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">{t('estimator.from')} {p.basePrice.toLocaleString()} €</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Key Features */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              {t('estimator.step2')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {featureOptions.map((f) => {
                const isSelected = selectedFeatures.includes(f.label);
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => toggleFeature(f.label)}
                    className={`p-2.5 rounded-lg text-left text-xs border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#181D2E] border-[#FF5500] text-white'
                        : 'bg-[#141825] border-white/[0.06] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#FF5500] text-white' : 'border border-neutral-600'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Design Level */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              {t('estimator.step3')}
            </label>
            <select
              value={designLevel}
              onChange={(e) => setDesignLevel(e.target.value)}
              className="w-full bg-[#141825] border border-white/10 rounded-lg p-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
            >
              {designOptions.map((d) => (
                <option key={d.label} value={d.label}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Live Estimate Results Box */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#171D2D] to-[#121624] border border-[#FF5500]/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF5500] font-semibold mb-1">
                <WynxLogo variant="chevrons" height="14px" />
                <span>{t('estimator.resultTitle')}</span>
              </div>
              <div className="font-mono-data text-2xl sm:text-3xl font-bold text-white">
                {calculatedEstimate.minBudget.toLocaleString()} € – {calculatedEstimate.maxBudget.toLocaleString()} €
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {t('estimator.deliveryTime').replace('{weeks}', calculatedEstimate.weeks.toString())}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onApplyEstimate({
                  service: projectType,
                  budget: `${calculatedEstimate.minBudget.toLocaleString()} € – ${calculatedEstimate.maxBudget.toLocaleString()} €`,
                  details: `Estimate: ${projectType} | Modules: ${selectedFeatures.join(', ')} | Design: ${designLevel} | Timeline: ${calculatedEstimate.weeks} weeks.`
                });
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#FF5500] hover:bg-[#E64D00] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF5500]/20 whitespace-nowrap"
            >
              <span>{t('estimator.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
