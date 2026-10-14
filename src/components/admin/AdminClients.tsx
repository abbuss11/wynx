import React, { useState, useMemo } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { ClientRecord, ClientStatus, ClientInteraction } from '../../types';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Calendar, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  Layers, 
  X, 
  Check 
} from 'lucide-react';

const CLIENT_STATUS_CONFIG: Record<ClientStatus, { label: string; bg: string; text: string }> = {
  lead: { label: 'Prospect Chaud', bg: 'bg-amber-500/10', text: 'text-amber-500' },
  negotiation: { label: 'En Négociation', bg: 'bg-blue-500/10', text: 'text-blue-500' },
  active: { label: 'Projet Actif', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  maintenance: { label: 'En Maintenance SLA', bg: 'bg-purple-500/10', text: 'text-purple-500' },
  completed: { label: 'Livré & Clôturé', bg: 'bg-neutral-500/10', text: 'text-neutral-400' }
};

export const AdminClients: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient, addClientInteraction, globalSettings } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);
  const [interactionClientId, setInteractionClientId] = useState<string | null>(null);
  const [newInteractionText, setNewInteractionText] = useState('');
  const [interactionType, setInteractionType] = useState<ClientInteraction['type']>('meeting');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'active' as ClientStatus,
    projectName: '',
    totalBudget: 25000,
    invoicedAmount: 10000,
    paidAmount: 10000,
    progress: 40,
    currentMilestone: 'Sprint 2 : Maquettes UX & Spécifications API',
    startDate: new Date().toISOString().split('T')[0],
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
  });

  // Financial aggregates
  const totalVolume = clients.reduce((acc, c) => acc + c.totalBudget, 0);
  const totalInvoiced = clients.reduce((acc, c) => acc + c.invoicedAmount, 0);
  const totalPaid = clients.reduce((acc, c) => acc + c.paidAmount, 0);
  const activeProjectsCount = clients.filter((c) => c.status === 'active').length;

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.projectName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [clients, searchQuery, selectedStatus]);

  const handleOpenCreate = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'active',
      projectName: 'Plateforme Web & SaaS sur-mesure',
      totalBudget: 20000,
      invoicedAmount: 8000,
      paidAmount: 8000,
      progress: 25,
      currentMilestone: 'Phase 1 : Cadrage technique & Architecture',
      startDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: ''
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (client: ClientRecord) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      status: client.status,
      projectName: client.projectName,
      totalBudget: client.totalBudget,
      invoicedAmount: client.invoicedAmount,
      paidAmount: client.paidAmount,
      progress: client.progress,
      currentMilestone: client.currentMilestone,
      startDate: client.startDate,
      deadline: client.deadline,
      notes: client.notes || ''
    });
    setIsEditorOpen(true);
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) return;

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      projectName: formData.projectName,
      totalBudget: Number(formData.totalBudget),
      invoicedAmount: Number(formData.invoicedAmount),
      paidAmount: Number(formData.paidAmount),
      currency: globalSettings.defaultCurrency || 'EUR',
      progress: Number(formData.progress),
      currentMilestone: formData.currentMilestone,
      startDate: formData.startDate,
      deadline: formData.deadline,
      notes: formData.notes
    };

    if (editingClient) {
      if (!(await updateClient(editingClient.id, payload))) return;
    } else {
      if (!(await addClient(payload))) return;
    }

    setIsEditorOpen(false);
  };

  const handleAddInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactionClientId || !newInteractionText.trim()) return;
    if (await addClientInteraction(interactionClientId, newInteractionText, interactionType)) {
      setNewInteractionText('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Suivi Clients & CRM de Production
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Gestion des contrats, avancement des livrables de développement, facturation et interactions clients.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-lg shadow-md shadow-[#FF5500]/20 flex items-center justify-center gap-2 cursor-pointer transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Client</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Total Clients Enregistrés</div>
          <div className="mt-2 font-mono-data text-2xl font-bold text-neutral-950 dark:text-white">
            {clients.length}
          </div>
          <div className="mt-1 text-[11px] text-emerald-500 font-semibold">
            {activeProjectsCount} projets en production active
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Volume Contractuel Signé</div>
          <div className="mt-2 font-mono-data text-2xl font-bold text-neutral-950 dark:text-white">
            {totalVolume.toLocaleString()} €
          </div>
          <div className="mt-1 text-[11px] text-neutral-400">
            Moyenne : ~{Math.round(totalVolume / (clients.length || 1)).toLocaleString()} € / client
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Montant Déjà Encaissé</div>
          <div className="mt-2 font-mono-data text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {totalPaid.toLocaleString()} €
          </div>
          <div className="mt-1 text-[11px] text-neutral-400">
            {Math.round((totalPaid / (totalVolume || 1)) * 100)}% du total recouvré
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">Encours à Facturer / Payer</div>
          <div className="mt-2 font-mono-data text-2xl font-bold text-[#FF5500]">
            {(totalVolume - totalPaid).toLocaleString()} €
          </div>
          <div className="mt-1 text-[11px] text-neutral-400">
            Facturé en attente : {(totalInvoiced - totalPaid).toLocaleString()} €
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un client, une entreprise ou un projet..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5500]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
              selectedStatus === 'all'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
            }`}
          >
            Tous ({clients.length})
          </button>
          {(['active', 'negotiation', 'maintenance', 'completed'] as ClientStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-[#FF5500] text-white font-semibold shadow-xs'
                  : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {CLIENT_STATUS_CONFIG[st].label}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#11141E] rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 text-sm">
            <Users className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
            Aucun dossier client trouvé.
          </div>
        ) : (
          filteredClients.map((client) => {
            const stMeta = CLIENT_STATUS_CONFIG[client.status];

            return (
              <div
                key={client.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-4 hover:border-[#FF5500]/40 transition-all"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                        {client.company}
                      </h3>
                      <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md ${stMeta.bg} ${stMeta.text}`}>
                        {stMeta.label}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-3 mt-1">
                      <span>Contact : <strong className="text-neutral-900 dark:text-white">{client.name}</strong></span>
                      <span>·</span>
                      <a href={`mailto:${client.email}`} className="hover:text-[#FF5500]">{client.email}</a>
                      <span>·</span>
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setInteractionClientId(client.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5"
                      title="Journal des échanges"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Journal ({client.interactions?.length || 0})</span>
                    </button>

                    <button
                      onClick={() => handleOpenEdit(client)}
                      className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(client.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Project & Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      Projet : {client.projectName}
                    </span>
                    <span className="font-mono-data font-bold text-[#FF5500]">
                      {client.progress}% accompli
                    </span>
                  </div>

                  <div className="h-2 w-full bg-neutral-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF5500] to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                      Jalon actif : <em>{client.currentMilestone}</em>
                    </div>
                    <div className="font-mono-data">
                      Livraison ciblée : <strong>{client.deadline}</strong>
                    </div>
                  </div>
                </div>

                {/* Financial bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-[#151923] text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Budget Contrat</span>
                    <span className="font-mono-data font-bold text-neutral-950 dark:text-white">
                      {client.totalBudget.toLocaleString()} €
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Facturé</span>
                    <span className="font-mono-data font-bold text-neutral-950 dark:text-white">
                      {client.invoicedAmount.toLocaleString()} €
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Encaissé</span>
                    <span className="font-mono-data font-bold text-emerald-600 dark:text-emerald-400">
                      {client.paidAmount.toLocaleString()} €
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Reste Dû</span>
                    <span className="font-mono-data font-bold text-[#FF5500]">
                      {(client.totalBudget - client.paidAmount).toLocaleString()} €
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Interactions / Timeline Log Drawer */}
      {interactionClientId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {(() => {
            const currentClient = clients.find((c) => c.id === interactionClientId);
            if (!currentClient) return null;

            return (
              <div className="bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                      Journal des Échanges – {currentClient.company}
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Historique des appels, réunions de cadrage et validations client
                    </p>
                  </div>
                  <button
                    onClick={() => setInteractionClientId(null)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                  {/* Add Interaction Form */}
                  <form onSubmit={handleAddInteraction} className="p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Consigner une nouvelle interaction
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={interactionType}
                        onChange={(e) => setInteractionType(e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                      >
                        <option value="meeting">Réunion / Visioconférence</option>
                        <option value="call">Appel Téléphonique</option>
                        <option value="email">Échange Email</option>
                        <option value="review">Revue de Sprint / Démo</option>
                        <option value="note">Note Interne</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      value={newInteractionText}
                      onChange={(e) => setNewInteractionText(e.target.value)}
                      placeholder="Résumé des échanges, décisions actées, prochaines étapes..."
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-lg cursor-pointer"
                    >
                      Ajouter au journal
                    </button>
                  </form>

                  {/* Timeline */}
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Historique chronologique
                    </div>
                    {(!currentClient.interactions || currentClient.interactions.length === 0) ? (
                      <div className="text-neutral-400 italic py-4">Aucune interaction enregistrée pour ce client.</div>
                    ) : (
                      currentClient.interactions.map((item) => (
                        <div key={item.id} className="p-3.5 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-neutral-400">
                            <span className="font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                              {item.type}
                            </span>
                            <span className="font-mono-data">{item.date} · Par {item.author}</span>
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs">
                            {item.note}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Create / Edit Client Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                  {editingClient ? 'Modifier le Dossier Client' : 'Ajouter un Nouveau Client CRM'}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Suivi financier et opérationnel de la relation client WYNX
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ex: Novacare Labs"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Contact principal (Nom & Prénom) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Aïcha Oumarou"
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Téléphone direct
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Statut du client
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  >
                    <option value="active">Projet Actif (En cours de prod)</option>
                    <option value="negotiation">En Négociation</option>
                    <option value="lead">Prospect Chaud</option>
                    <option value="maintenance">Maintenance SLA</option>
                    <option value="completed">Livré & Clôturé</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Intitulé du projet
                  </label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Financial inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Budget Contrat Total (€)
                  </label>
                  <input
                    type="number"
                    value={formData.totalBudget}
                    onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white font-mono-data"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Montant Facturé (€)
                  </label>
                  <input
                    type="number"
                    value={formData.invoicedAmount}
                    onChange={(e) => setFormData({ ...formData, invoicedAmount: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white font-mono-data"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Montant Encaissé (€)
                  </label>
                  <input
                    type="number"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white font-mono-data"
                  />
                </div>
              </div>

              {/* Progress and Milestone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Pourcentage d'avancement ({formData.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                    className="w-full accent-[#FF5500]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Jalon en cours (Description)
                  </label>
                  <input
                    type="text"
                    value={formData.currentMilestone}
                    onChange={(e) => setFormData({ ...formData, currentMilestone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Date de démarrage
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Date limite de livraison
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                  Notes de cadrage ou consignes spéciales
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                />
              </div>

              <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-lg shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer le client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-display font-bold text-neutral-950 dark:text-white text-base">
                Retirer le client
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Voulez-vous supprimer ce dossier client et l'ensemble de son journal d'interactions ?
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
                  deleteClient(deleteConfirmId);
                  setDeleteConfirmId(null);
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
