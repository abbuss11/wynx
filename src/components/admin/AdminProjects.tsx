import React, { useState, useMemo } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { PortfolioProject } from '../../types';
import { sanitizeUrl } from '../../utils/security';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Star, 
  ExternalLink, 
  X, 
  Check, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  AlertCircle 
} from 'lucide-react';

const CATEGORIES: { id: PortfolioProject['category']; label: string }[] = [
  { id: 'saas', label: 'SaaS & Plateformes' },
  { id: 'ecommerce', label: 'E-Commerce Headless' },
  { id: 'mobile', label: 'Applications Mobiles' },
  { id: 'branding', label: 'Identité & Design Systems' }
];

const PRESET_PROJECT_IMAGES = [
  { label: 'SaaS TechFlow Obsidian', url: '/src/assets/images/project_saas_techflow_1790354919470.jpg' },
  { label: 'LuxeStore E-Commerce', url: '/src/assets/images/project_luxestore_ecommerce_1790354929393.jpg' },
  { label: 'Architecture & Visuals', url: '/src/assets/images/blog_seo_architecture_1790354943672.jpg' },
  { label: 'Hero Studio Digital', url: '/src/assets/images/hero_digital_agency_1790354908664.jpg' }
];

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, duplicateProject } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: '',
    category: 'saas' as PortfolioProject['category'],
    year: '2026',
    link: '',
    image: PRESET_PROJECT_IMAGES[0].url,
    summary: '',
    problem: '',
    solution: '',
    tags: 'React, TypeScript, Tailwind',
    techStack: 'React 19, Next.js, PostgreSQL, Docker',
    resultsMetric1: '+120%',
    resultsLabel1: 'Augmentation du taux de conversion',
    resultsMetric2: '45ms',
    resultsLabel2: 'Temps de réponse de l\'API',
    resultsMetric3: '99.9%',
    resultsLabel3: 'Disponibilité SLA en production',
    featured: false,
    status: 'live' as PortfolioProject['status']
  });

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      industry: 'B2B Tech & Digital Services',
      category: 'saas',
      year: new Date().getFullYear().toString(),
      link: 'https://example.com',
      image: PRESET_PROJECT_IMAGES[0].url,
      summary: 'Conception et ingénierie logicielle sur-mesure répondant aux exigences de haute disponibilité.',
      problem: 'Processus manuels lents, goulots d\'étranglement de performance et interface legacy complexe.',
      solution: 'Refonte modulaire avec React 19, design system moderne et synchronisation temps réel.',
      tags: 'React, TypeScript, GraphQL, Cloud',
      techStack: 'React 19, TypeScript, PostgreSQL, Redis, Docker',
      resultsMetric1: '+150%',
      resultsLabel1: 'Efficacité opérationnelle décuplée',
      resultsMetric2: '< 100ms',
      resultsLabel2: 'Vitesse de chargement globale',
      resultsMetric3: '100%',
      resultsLabel3: 'Conformité aux audits de sécurité',
      featured: true,
      status: 'live'
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      client: project.client,
      industry: project.industry,
      category: project.category,
      year: project.year,
      link: project.link || '',
      image: project.image,
      summary: project.summary,
      problem: project.problem,
      solution: project.solution,
      tags: (project.tags || []).join(', '),
      techStack: (project.techStack || []).join(', '),
      resultsMetric1: project.results?.[0]?.metric || '+100%',
      resultsLabel1: project.results?.[0]?.label || 'Impact mesuré',
      resultsMetric2: project.results?.[1]?.metric || '60ms',
      resultsLabel2: project.results?.[1]?.label || 'Performance',
      resultsMetric3: project.results?.[2]?.metric || '10k+',
      resultsLabel3: project.results?.[2]?.label || 'Utilisateurs',
      featured: !!project.featured,
      status: project.status || 'live'
    });
    setIsEditorOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const techArray = formData.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const results = [
      { metric: formData.resultsMetric1, label: formData.resultsLabel1 },
      { metric: formData.resultsMetric2, label: formData.resultsLabel2 },
      { metric: formData.resultsMetric3, label: formData.resultsLabel3 }
    ].filter((r) => r.metric.trim() && r.label.trim());

    const projectPayload = {
      title: formData.title,
      client: formData.client,
      industry: formData.industry,
      category: formData.category,
      year: formData.year,
      link: formData.link.trim() ? formData.link.trim() : undefined,
      image: formData.image,
      summary: formData.summary,
      problem: formData.problem,
      solution: formData.solution,
      tags: tagsArray,
      techStack: techArray,
      results,
      featured: formData.featured,
      status: formData.status
    };

    if (editingProject) {
      if (!(await updateProject(editingProject.id, projectPayload))) return;
    } else {
      if (!(await addProject(projectPayload))) return;
    }

    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Gestion des Projets & Études de Cas
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Gérez les publications de réalisations affichées dans le portfolio public ({projects.length} projets répertoriés).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-lg shadow-md shadow-[#FF5500]/20 flex items-center justify-center gap-2 cursor-pointer transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par client, titre de projet, tag ou secteur..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5500]"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold'
                : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
            }`}
          >
            Tous ({projects.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#FF5500] text-white font-semibold shadow-xs'
                  : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white dark:bg-[#11141E] rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 text-sm">
            <Briefcase className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
            Aucun projet ne correspond à cette recherche.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs overflow-hidden flex flex-col group hover:border-[#FF5500]/50 transition-all"
            >
              {/* Image & Header Overlay */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {project.category}
                  </span>

                  <button
                    onClick={() => updateProject(project.id, { featured: !project.featured })}
                    className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                      project.featured
                        ? 'bg-[#FF5500] text-white'
                        : 'bg-black/50 text-white/60 hover:text-white'
                    }`}
                    title={project.featured ? 'Retirer de la mise en avant' : 'Mettre en avant sur la page d\'accueil'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Bottom title info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] text-[#FF5500] font-mono-data font-semibold">
                    {project.client} · {project.year}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Impact metrics preview */}
                  {project.results && project.results.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/[0.06] dark:border-white/[0.06]">
                      {project.results.slice(0, 2).map((res, i) => (
                        <div key={i} className="text-xs">
                          <span className="font-mono-data font-bold text-[#FF5500] block">{res.metric}</span>
                          <span className="text-[10px] text-neutral-400 line-clamp-1">{res.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-mono-data rounded bg-neutral-100 dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => duplicateProject(project.id)}
                      className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors"
                      title="Dupliquer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {project.link && (
                      <a
                        href={sanitizeUrl(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-[#FF5500] rounded-lg transition-colors"
                        title="Voir le site en direct"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setDeleteConfirmId(project.id)}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-display font-bold text-neutral-950 dark:text-white text-base">
                Supprimer le projet
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Êtes-vous sûr de vouloir retirer ce projet du portfolio ? Il ne sera plus visible par les visiteurs.
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
                  deleteProject(deleteConfirmId);
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

      {/* Create / Edit Project Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                  {editingProject ? 'Modifier le Projet' : 'Publier une Nouvelle Étude de Cas'}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Vitrine d'ingénierie et réalisations clients WYNX
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Titre du projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="ex: TechFlow Platform"
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                {/* Client */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Nom du client / Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="ex: TechFlow Inc."
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Secteur d'activité
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="ex: B2B SaaS & Engineering"
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Catégorie Portfolio
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Année de réalisation
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                {/* Live Link */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Lien live ou démo publique (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Image principale du projet
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {PRESET_PROJECT_IMAGES.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        formData.image === preset.url
                          ? 'border-[#FF5500] ring-2 ring-[#FF5500]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="h-14 w-full object-cover" />
                      <div className="p-1 bg-black/60 text-[10px] text-white truncate text-center">
                        {preset.label}
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="URL d'image personnalisée..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Résumé / Pitch synthétique
                </label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Problématique client (Le défi)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Solution apportée par WYNX
                  </label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              {/* Results / Metrics Builder */}
              <div className="space-y-2 p-4 rounded-xl bg-neutral-50 dark:bg-[#151923] border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-xs font-semibold text-neutral-950 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#FF5500]" />
                  Résultats Chiffrés Clés (3 KPIs mesurés)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Métrique (ex: +140%)"
                      value={formData.resultsMetric1}
                      onChange={(e) => setFormData({ ...formData, resultsMetric1: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-mono-data rounded bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Libellé"
                      value={formData.resultsLabel1}
                      onChange={(e) => setFormData({ ...formData, resultsLabel1: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-[11px] rounded bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Métrique (ex: 62ms)"
                      value={formData.resultsMetric2}
                      onChange={(e) => setFormData({ ...formData, resultsMetric2: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-mono-data rounded bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Libellé"
                      value={formData.resultsLabel2}
                      onChange={(e) => setFormData({ ...formData, resultsLabel2: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-[11px] rounded bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Métrique (ex: 45k+)"
                      value={formData.resultsMetric3}
                      onChange={(e) => setFormData({ ...formData, resultsMetric3: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs font-mono-data rounded bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Libellé"
                      value={formData.resultsLabel3}
                      onChange={(e) => setFormData({ ...formData, resultsLabel3: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-[11px] rounded bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Tags publics (séparés par virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Pile technologique complète (Tech Stack)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#FF5500] focus:ring-[#FF5500]"
                />
                <label htmlFor="featured-toggle" className="text-xs font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer">
                  Mettre en avant ce projet en tête de portfolio et page d'accueil
                </label>
              </div>

              {/* Form Footer */}
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
                  <span>Enregistrer le projet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
