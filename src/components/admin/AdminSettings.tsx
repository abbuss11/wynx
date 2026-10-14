import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { initialGlobalSettings } from '../../data/adminInitialData';
import { 
  Settings, 
  Building, 
  Bell, 
  Sliders, 
  Globe, 
  Share2, 
  Save, 
  RotateCcw, 
  Download, 
  Check, 
  AlertTriangle,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { globalSettings, updateGlobalSettings, resetToDefaults, showToast, changeMasterPassword } = useSiteData();

  const [form, setForm] = useState({ ...globalSettings });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setForm(globalSettings);
  }, [globalSettings]);

  // Security password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPass !== confirmPass) {
      setPassError('Les deux nouveaux mots de passe ne correspondent pas.');
      return;
    }

    if (newPass.length < 8) {
      setPassError('Le mot de passe doit comporter au moins 8 caractères.');
      return;
    }

    const res = await changeMasterPassword(currentPass, newPass);
    if (!res.success) {
      setPassError(res.error || 'Erreur lors de la modification.');
    } else {
      setPassSuccess('Mot de passe Supabase modifié avec succès.');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateGlobalSettings(form);
  };

  const handleExportJson = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      globalSettings: form,
      version: '2.4'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wynx_agency_settings_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Fichier JSON des paramètres exporté avec succès.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Paramètres & Configuration Globale
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Gérez l'identité de l'agence, la bannière d'annonce publique, les coordonnées, les réseaux sociaux et le SEO.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter JSON</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Agency Brand & Identity */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-base text-neutral-950 dark:text-white">
            <Building className="w-4 h-4 text-[#FF5500]" />
            Identité et Siège de l'Agence
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Nom officiel de l'agence
              </label>
              <input
                type="text"
                value={form.agencyName}
                onChange={(e) => setForm({ ...form, agencyName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Slogan de marque (Tagline)
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Description générale
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Email de contact officiel
              </label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Téléphone direct / Standard
              </label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Adresse physique du bureau
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Ville & Pays du siège
              </label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Public Announcement Banner */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-display font-bold text-base text-neutral-950 dark:text-white">
              <Bell className="w-4 h-4 text-[#FF5500]" />
              Bandeau Publicitaire & Annonce en Tête de Site
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.announcementActive}
                onChange={(e) => setForm({ ...form, announcementActive: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF5500]"></div>
            </label>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Affiche un ruban premium au-dessus de la barre de navigation pour les annonces importantes ou créneaux disponibles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Badge du bandeau
              </label>
              <input
                type="text"
                value={form.announcementBadge}
                onChange={(e) => setForm({ ...form, announcementBadge: e.target.value })}
                placeholder="ex: NOUVEAU"
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Texte du message
              </label>
              <input
                type="text"
                value={form.announcementText}
                onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                placeholder="ex: 🚀 WYNX ouvre ses créneaux de développement Q2 2026"
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Lien de redirection du bandeau (ancre ou URL externe)
              </label>
              <input
                type="text"
                value={form.announcementLink}
                onChange={(e) => setForm({ ...form, announcementLink: e.target.value })}
                placeholder="ex: #contact ou https://calendly.com/wynx"
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Commercial & Estimator Settings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-base text-neutral-950 dark:text-white">
            <Sliders className="w-4 h-4 text-[#FF5500]" />
            Tarification & Règles de Chiffrage
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Devise de référence par défaut
              </label>
              <select
                value={form.defaultCurrency}
                onChange={(e) => setForm({ ...form, defaultCurrency: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              >
                <option value="EUR">Euro (€ EUR)</option>
                <option value="USD">Dollar ($ USD)</option>
                <option value="XOF">Franc CFA (FCFA / XOF)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Seuil budgétaire minimal d'engagement (€)
              </label>
              <input
                type="number"
                value={form.minBudgetThreshold}
                onChange={(e) => setForm({ ...form, minBudgetThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white font-mono-data"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Media Links */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-base text-neutral-950 dark:text-white">
            <Share2 className="w-4 h-4 text-[#FF5500]" />
            Liens Réseaux Sociaux & Communauté
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">LinkedIn</label>
              <input
                type="text"
                value={form.socialLinks.linkedin}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">Twitter / X</label>
              <input
                type="text"
                value={form.socialLinks.twitter}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">Instagram</label>
              <input
                type="text"
                value={form.socialLinks.instagram}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, instagram: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">GitHub</label>
              <input
                type="text"
                value={form.socialLinks.github}
                onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Global SEO & Indexing */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-base text-neutral-950 dark:text-white">
            <Globe className="w-4 h-4 text-[#FF5500]" />
            Référencement & Méta-données SEO
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Balise Meta Title globale
              </label>
              <input
                type="text"
                value={form.seo.metaTitle}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Meta Description globale (Google SERP)
              </label>
              <textarea
                rows={2}
                value={form.seo.metaDescription}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Identifiant Google Analytics / Tag Manager
                </label>
                <input
                  type="text"
                  value={form.seo.googleAnalyticsId}
                  onChange={(e) => setForm({ ...form, seo: { ...form.seo, googleAnalyticsId: e.target.value } })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white font-mono-data"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="robots-index"
                  checked={form.seo.indexRobots}
                  onChange={(e) => setForm({ ...form, seo: { ...form.seo, indexRobots: e.target.checked } })}
                  className="rounded text-[#FF5500] focus:ring-[#FF5500]"
                />
                <label htmlFor="robots-index" className="font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer">
                  Autoriser l'indexation par les moteurs (robots.txt index)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Supabase Auth password */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center gap-2 font-display font-bold text-base text-neutral-950 dark:text-white">
            <ShieldCheck className="w-4 h-4 text-[#FF5500]" />
            Sécurité & Mot de passe Supabase
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Modifiez le mot de passe de votre compte Supabase Auth utilisé pour accéder à la console <code>/sudo</code>.
          </p>

          <div className="space-y-4 max-w-xl text-xs">
            {passError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 font-medium">
                {passError}
              </div>
            )}
            {passSuccess && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{passSuccess}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Mot de passe actuel"
                className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min. 8 caractères"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirmez"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleChangePassword}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Mettre à jour la clé maître /sudo
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-6 p-4 rounded-2xl bg-white/95 dark:bg-[#11141E]/95 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-xl flex items-center justify-between z-30">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
            Les paramètres sont enregistrés dans Supabase et partagés entre les appareils.
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-xl shadow-lg shadow-[#FF5500]/25 flex items-center gap-2 cursor-pointer ml-auto transition-transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer la configuration</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-display font-bold text-neutral-950 dark:text-white text-base">
                Rétablir les paramètres par défaut
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Cette action rétablit uniquement les paramètres du site. Elle ne supprime aucun devis, client, article ou projet.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setForm({ ...initialGlobalSettings });
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Rétablir les paramètres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
