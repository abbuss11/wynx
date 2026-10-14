import React, { useState, useMemo } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { QuoteRequest, QuoteStatus, QuotePriority } from '../../types';
import { 
  FileSpreadsheet, 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  UserCheck, 
  Copy, 
  Check, 
  Trash2, 
  Send, 
  Sparkles, 
  Filter, 
  DollarSign, 
  ArrowRight,
  X
} from 'lucide-react';

const STATUS_LABELS: Record<QuoteStatus, { label: string; bg: string; text: string; icon: any }> = {
  new: { label: 'Nouveau', bg: 'bg-[#FF5500]/10', text: 'text-[#FF5500]', icon: AlertCircle },
  reviewing: { label: 'En cours d\'analyse', bg: 'bg-blue-500/10', text: 'text-blue-500', icon: Clock },
  quoted: { label: 'Devis Envoyé', bg: 'bg-purple-500/10', text: 'text-purple-500', icon: Send },
  accepted: { label: 'Accepté / Signé', bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: CheckCircle2 },
  declined: { label: 'Refusé / Sans suite', bg: 'bg-red-500/10', text: 'text-red-500', icon: XCircle }
};

const PRIORITY_LABELS: Record<QuotePriority, { label: string; color: string }> = {
  urgent: { label: 'Urgente', color: 'text-red-500 bg-red-500/10 border-red-500/20' },
  high: { label: 'Haute', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  medium: { label: 'Moyenne', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  low: { label: 'Basse', color: 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20' }
};

import { MonthlyQuotesD3Chart } from './MonthlyQuotesD3Chart';

export const AdminQuotes: React.FC = () => {
  const { 
    quotes, 
    updateQuoteStatus, 
    updateQuote, 
    deleteQuote, 
    convertQuoteToClient, 
    globalSettings, 
    showToast 
  } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [showD3Chart, setShowD3Chart] = useState(false);

  // Proposal Generator state
  const [customPrice, setCustomPrice] = useState<number>(15000);
  const [deliveryWeeks, setDeliveryWeeks] = useState<number>(6);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [internalNoteText, setInternalNoteText] = useState('');

  // Delete confirm
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchesSearch =
        (q.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.clientEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.services || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.id || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || q.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [quotes, searchQuery, selectedStatus]);

  const handleOpenDetail = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setCustomPrice(quote.estimatedAmount || 15000);
    setDeliveryWeeks(quote.deliveryWeeks || 6);
    setInternalNoteText(quote.internalNotes || '');
    setCopiedEmail(false);
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    const saved = await updateQuote(selectedQuote.id, {
      internalNotes: internalNoteText,
      estimatedAmount: customPrice,
      deliveryWeeks: deliveryWeeks
    });
    if (!saved) return;
    setSelectedQuote((prev) =>
      prev
        ? {
            ...prev,
            internalNotes: internalNoteText,
            estimatedAmount: customPrice,
            deliveryWeeks: deliveryWeeks
          }
        : null
    );
  };

  const generateProposalEmail = () => {
    if (!selectedQuote) return '';
    const safeServicesList = (selectedQuote.services || []).join(', ') || 'Projet Digital';
    return `Bonjour ${selectedQuote.clientName},

Nous vous remercions pour l'intérêt accordé à l'agence WYNX concernant votre projet "${safeServicesList}".

Suite à l'analyse approfondie de votre cahier des charges :
- Périmètre : ${safeServicesList}
- Budget estimé : ${customPrice.toLocaleString()} ${globalSettings.defaultCurrency || 'EUR'} HT
- Calendrier de livraison : ${deliveryWeeks} semaines à compter du kickoff
- Architecture : JAMstack haute performance (React 19 / TypeScript / Edge)

Vous trouverez en pièce jointe notre proposition technique détaillée ainsi que la méthodologie de sprint.

Restant à votre entière disposition pour planifier un appel de cadrage.

Bien cordialement,
L'équipe commerciale & ingénierie WYNX
${globalSettings.contactEmail} · ${globalSettings.contactPhone}`;
  };

  const copyToClipboard = () => {
    const text = generateProposalEmail();
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    showToast('Modèle d\'email de proposition copié dans le presse-papiers.');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleConvert = async (quoteId: string) => {
    const client = await convertQuoteToClient(quoteId);
    if (client) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: 'accepted' } : null));
    }
  };

  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
              Gestion des Devis & Prospects
            </h1>
            {newQuotesCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-mono-data font-bold rounded-full bg-[#FF5500] text-white">
                {newQuotesCount} nouveaux
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Pipeline des demandes de chiffrage reçues via l'estimateur de coût et le formulaire de contact ({quotes.length} devis enregistrés).
          </p>
        </div>

        {/* Quick summary badges & D3 chart toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowD3Chart(!showD3Chart)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              showD3Chart
                ? 'bg-[#FF5500] text-white border-[#FF5500] shadow-sm shadow-[#FF5500]/20'
                : 'bg-white dark:bg-[#11141E] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-[#FF5500]/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showD3Chart ? 'Masquer Graphique D3' : 'Statistiques D3 Mensuelles'}</span>
          </button>

          <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">Total pipeline :</span>{' '}
            <strong className="font-mono-data text-neutral-950 dark:text-white">
              {quotes.reduce((acc, q) => acc + (q.estimatedAmount || 10000), 0).toLocaleString()} €
            </strong>
          </div>
        </div>
      </div>

      {/* Optional D3 Monthly Quotes Visual */}
      {showD3Chart && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          <MonthlyQuotesD3Chart />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par référence, prospect, entreprise ou service..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5500]"
          />
        </div>

        {/* Status Pipeline Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
              selectedStatus === 'all'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
            }`}
          >
            Tous ({quotes.length})
          </button>
          {(['new', 'reviewing', 'quoted', 'accepted', 'declined'] as QuoteStatus[]).map((st) => {
            const count = quotes.filter((q) => q.status === st).length;
            const meta = STATUS_LABELS[st];
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedStatus === st
                    ? 'bg-[#FF5500] text-white font-semibold shadow-xs'
                    : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                <span>{meta.label}</span>
                <span className="font-mono-data text-[10px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quotes Cards / Table */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#11141E] rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 text-sm">
            <FileSpreadsheet className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
            Aucun devis ne correspond aux critères sélectionnés.
          </div>
        ) : (
          filteredQuotes.map((quote) => {
            const meta = STATUS_LABELS[quote.status] || STATUS_LABELS.new;
            const StatusIcon = meta.icon;
            const priorityMeta = PRIORITY_LABELS[quote.priority] || PRIORITY_LABELS.medium;

            return (
              <div
                key={quote.id}
                onClick={() => handleOpenDetail(quote)}
                className="p-5 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs hover:border-[#FF5500]/50 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                {/* Left Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono-data text-xs font-bold text-[#FF5500]">
                      {quote.id}
                    </span>
                    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md flex items-center gap-1 ${meta.bg} ${meta.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {meta.label}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-mono-data font-semibold rounded border ${priorityMeta.color}`}>
                      {priorityMeta.label}
                    </span>
                    <span className="text-neutral-400 text-xs font-mono-data flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(quote.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="font-display text-base font-bold text-neutral-950 dark:text-white">
                      {quote.clientName}
                    </h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      {quote.company}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-1">
                    {quote.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {quote.services.map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Summary */}
                <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-black/[0.06] dark:border-white/[0.06] shrink-0">
                  <div className="text-right">
                    <div className="text-[11px] text-neutral-400">Budget annoncé</div>
                    <div className="font-mono-data text-xs font-semibold text-neutral-900 dark:text-white">
                      {quote.budget}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] text-neutral-400">Estimation WYNX</div>
                    <div className="font-mono-data text-sm font-bold text-[#FF5500]">
                      {(quote.estimatedAmount || 15000).toLocaleString()} €
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-400 group-hover:text-[#FF5500] group-hover:bg-[#FF5500]/10 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quote Detail Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-sm font-bold text-[#FF5500]">
                    {selectedQuote.id}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${STATUS_LABELS[selectedQuote.status].bg} ${STATUS_LABELS[selectedQuote.status].text}`}>
                    {STATUS_LABELS[selectedQuote.status].label}
                  </span>
                </div>
                <h2 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                  Détail du Devis – {selectedQuote.clientName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Client & Prospect Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Coordonnées Prospect
                  </div>
                  <div className="font-semibold text-neutral-950 dark:text-white text-sm">
                    {selectedQuote.clientName}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <a href={`mailto:${selectedQuote.clientEmail}`} className="hover:text-[#FF5500] underline">
                      {selectedQuote.clientEmail}
                    </a>
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <a href={`tel:${selectedQuote.clientPhone}`} className="hover:text-[#FF5500]">
                      {selectedQuote.clientPhone}
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Paramètres du Projet
                  </div>
                  <div>Entreprise : <strong className="text-neutral-950 dark:text-white">{selectedQuote.company}</strong></div>
                  <div>Budget annoncé : <strong className="font-mono-data text-neutral-950 dark:text-white">{selectedQuote.budget}</strong></div>
                  <div>Délai souhaité : <strong className="text-neutral-950 dark:text-white">{selectedQuote.timeline}</strong></div>
                  <div>Reçu le : <strong className="font-mono-data text-neutral-950 dark:text-white">{new Date(selectedQuote.date).toLocaleString('fr-FR')}</strong></div>
                </div>
              </div>

              {/* Status & Priority Control */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Changer le statut du devis
                  </label>
                  <select
                    value={selectedQuote.status}
                    onChange={async (e) => {
                      const newSt = e.target.value as QuoteStatus;
                      if (await updateQuoteStatus(selectedQuote.id, newSt)) {
                        setSelectedQuote({ ...selectedQuote, status: newSt });
                      }
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="new">Nouveau (En attente)</option>
                    <option value="reviewing">En cours d'analyse</option>
                    <option value="quoted">Devis envoyé</option>
                    <option value="accepted">Accepté / Gagné</option>
                    <option value="declined">Refusé / Sans suite</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Niveau de priorité
                  </label>
                  <select
                    value={selectedQuote.priority}
                    onChange={(e) => {
                      const newPr = e.target.value as QuotePriority;
                      updateQuote(selectedQuote.id, { priority: newPr });
                      setSelectedQuote({ ...selectedQuote, priority: newPr });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="urgent">Urgente (Lead chaud)</option>
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Cahier des charges / Description des besoins :
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-100 dark:bg-white/[0.04] text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {selectedQuote.description}
                </div>
              </div>

              {/* Proposal Generator & Pricing */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/50 to-white dark:from-[#181B26] dark:to-[#12151F] border border-[#FF5500]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-950 dark:text-white">
                    <Sparkles className="w-4 h-4 text-[#FF5500]" />
                    Générateur de Proposition Commerciale WYNX
                  </div>
                  <span className="text-[11px] font-mono-data text-[#FF5500]">
                    Devise : {globalSettings.defaultCurrency || 'EUR'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
                      Montant du devis (€ HT)
                    </label>
                    <input
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs font-mono-data rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-950 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
                      Durée de réalisation (semaines)
                    </label>
                    <input
                      type="number"
                      value={deliveryWeeks}
                      onChange={(e) => setDeliveryWeeks(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs font-mono-data rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Email copié !' : 'Copier l\'email de devis'}</span>
                  </button>

                  <button
                    onClick={() => handleConvert(selectedQuote.id)}
                    disabled={selectedQuote.status === 'accepted'}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors ${
                      selectedQuote.status === 'accepted'
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                        : 'bg-[#FF5500] hover:bg-[#E64D00] text-white cursor-pointer shadow-sm'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{selectedQuote.status === 'accepted' ? 'Déjà dans le CRM' : 'Convertir en Client CRM'}</span>
                  </button>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Notes internes d'équipe (non visibles par le client)
                </label>
                <textarea
                  rows={3}
                  value={internalNoteText}
                  onChange={(e) => setInternalNoteText(e.target.value)}
                  placeholder="Notes de négociation, points d'attention, historique d'appel..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-3.5 py-1.5 text-[11px] font-semibold rounded-md bg-neutral-200 dark:bg-white/10 hover:bg-neutral-300 text-neutral-800 dark:text-white"
                >
                  Sauvegarder les notes
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setDeleteConfirmId(selectedQuote.id)}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 p-1.5 rounded"
              >
                <Trash2 className="w-4 h-4" />
                <span>Supprimer ce devis</span>
              </button>

              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-display font-bold text-neutral-950 dark:text-white text-base">
                Supprimer le devis
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Voulez-vous supprimer définitivement ce devis de l'historique ?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  deleteQuote(deleteConfirmId);
                  setDeleteConfirmId(null);
                  setSelectedQuote(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
