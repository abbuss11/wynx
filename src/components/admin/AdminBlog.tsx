import React, { useState, useMemo } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { BlogPost } from '../../types';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye, 
  Clock, 
  Tag, 
  X, 
  Check, 
  BookOpen,
  FileText,
  AlertCircle
} from 'lucide-react';

const CATEGORIES: BlogPost['category'][] = [
  'SEO & Visibilité',
  'Architecture Web',
  'UI/UX & Produit',
  'Mobile'
];

const PRESET_IMAGES = [
  { label: 'Architecture & SEO', url: '/src/assets/images/blog_seo_architecture_1790354943672.jpg' },
  { label: 'Plateforme SaaS TechFlow', url: '/src/assets/images/project_saas_techflow_1790354919470.jpg' },
  { label: 'Agence Digitale Hero', url: '/src/assets/images/hero_digital_agency_1790354908664.jpg' },
  { label: 'LuxeStore E-Commerce', url: '/src/assets/images/project_luxestore_ecommerce_1790354929393.jpg' }
];

export const AdminBlog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, duplicateBlogPost } = useSiteData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'SEO & Visibilité' as BlogPost['category'],
    readingTime: '5 min',
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    authorName: 'Abbuss Idriss',
    authorRole: 'Head of Engineering & Growth',
    seoKeywords: 'SEO, Performance, Web 2026',
    image: PRESET_IMAGES[0].url,
    status: 'published' as 'published' | 'draft' | 'archived'
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered Articles
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && post.status !== 'draft') ||
        (statusFilter === 'draft' && post.status === 'draft');
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogPosts, searchQuery, selectedCategory, statusFilter]);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '### Introduction\n\nDéveloppez votre article technique ici...\n\n#### 1. Premier point clé\n- Détail d\'ingénierie\n- Impact business chiffré',
      category: 'Architecture Web',
      readingTime: '5 min',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      authorName: 'Abbuss Idriss',
      authorRole: 'Head of Engineering & Growth',
      seoKeywords: 'Web Performance, Next.js, API, WYNX',
      image: PRESET_IMAGES[0].url,
      status: 'published'
    });
    setPreviewMode(false);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readingTime: post.readingTime,
      date: post.date,
      authorName: post.author?.name || 'Abbuss Idriss',
      authorRole: post.author?.role || 'Head of Engineering & Growth',
      seoKeywords: (post.seoKeywords || []).join(', '),
      image: post.image,
      status: post.status || 'published'
    });
    setPreviewMode(false);
    setIsEditorOpen(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const keywordsArray = formData.seoKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const generatedSlug = formData.slug.trim() 
      ? formData.slug.trim() 
      : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const postPayload = {
      title: formData.title,
      slug: generatedSlug,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      readingTime: formData.readingTime,
      date: formData.date,
      author: {
        name: formData.authorName,
        role: formData.authorRole
      },
      seoKeywords: keywordsArray,
      image: formData.image,
      status: formData.status
    };

    if (editingPost) {
      if (!(await updateBlogPost(editingPost.id, postPayload))) return;
    } else {
      if (!(await addBlogPost(postPayload))) return;
    }

    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Gestion du Blog & Publications
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Rédigez, modifiez et référencez les articles de veille technologique WYNX ({blogPosts.length} articles au total).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#E64D00] rounded-lg shadow-md shadow-[#FF5500]/20 flex items-center justify-center gap-2 cursor-pointer transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvel Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par titre, résumé ou auteur..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5500]"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
          >
            <option value="all">Toutes les catégories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="inline-flex p-1 bg-neutral-100 dark:bg-[#151923] rounded-lg border border-black/[0.06] dark:border-white/[0.06] text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Tous ({blogPosts.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'published'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Publiés
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'draft'
                  ? 'bg-white dark:bg-[#202635] text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Brouillons
            </button>
          </div>
        </div>
      </div>

      {/* Articles Table / Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#11141E] rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-neutral-500 text-sm">
            <BookOpen className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
            Aucun article ne correspond à votre filtre.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-xl bg-white dark:bg-[#11141E] border border-black/[0.08] dark:border-white/[0.08] shadow-xs hover:border-[#FF5500]/40 transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
            >
              {/* Left Info with Image */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-20 rounded-lg object-cover border border-black/[0.08] dark:border-white/[0.08] shrink-0"
                />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-[#FF5500]/10 text-[#FF5500]">
                      {post.category}
                    </span>
                    <span className={`px-2 py-0.5 text-[11px] font-mono-data rounded font-medium ${
                      post.status === 'draft'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {post.status === 'draft' ? 'Brouillon' : 'Publié'}
                    </span>
                    <span className="text-neutral-400 text-xs font-mono-data flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                    <span className="text-neutral-400 text-xs font-mono-data">
                      · {post.date}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-neutral-950 dark:text-white truncate">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
                    <span>Par <strong>{post.author.name}</strong></span>
                    <span>•</span>
                    <span className="font-mono-data text-neutral-500">{post.views || 0} consultations</span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors"
                  title="Modifier l'article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => duplicateBlogPost(post.id)}
                  className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] rounded-lg transition-colors"
                  title="Dupliquer"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(post.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                Confirmer la suppression
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Êtes-vous certain de vouloir supprimer définitivement cet article ? Cette action est irréversible.
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
                  deleteBlogPost(deleteConfirmId);
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

      {/* Create / Edit Article Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-[#0E1119] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-950 dark:text-white">
                  {editingPost ? 'Modifier l\'Article' : 'Rédiger un Nouvel Article'}
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Publication SEO et documentation technique WYNX
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.06] flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{previewMode ? 'Éditer' : 'Aperçu'}</span>
                </button>
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSavePost} className="p-6 overflow-y-auto space-y-5 flex-1">
              {!previewMode ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Titre de l'article *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="ex: Comment concevoir une architecture Edge en 2026"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Slug URL (automatique si vide)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="ex: architecture-edge-2026"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white font-mono-data focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Catégorie
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Reading Time */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Temps de lecture estimé
                      </label>
                      <input
                        type="text"
                        value={formData.readingTime}
                        onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                        placeholder="ex: 5 min"
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Statut de publication
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                      >
                        <option value="published">Publié (En ligne)</option>
                        <option value="draft">Brouillon (Non visible)</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </div>

                    {/* Author Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Auteur
                      </label>
                      <input
                        type="text"
                        value={formData.authorName}
                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    {/* Author Role */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Rôle / Titre de l'auteur
                      </label>
                      <input
                        type="text"
                        value={formData.authorRole}
                        onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                  </div>

                  {/* Image Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Image de couverture (choisissez une image d'agence ou URL)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => setFormData({ ...formData, image: preset.url })}
                          className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            formData.image === preset.url
                              ? 'border-[#FF5500] ring-2 ring-[#FF5500]/20'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={preset.url} alt={preset.label} className="h-16 w-full object-cover" />
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
                      placeholder="URL personnalisée d'image..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Extrait / Chapô d'accroche (affiché dans la grille du blog)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Bref résumé accrocheur de 2 à 3 lignes..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  {/* SEO Keywords */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#FF5500]" />
                      Mots-clés SEO (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                      placeholder="ex: React 19, Architecture SaaS, Optimisation Web Vitals"
                      className="w-full px-3.5 py-2 text-xs rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  {/* Full Content (Markdown format) */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-neutral-400" />
                      Contenu de l'article (Markdown supporté : ### Titres, - Listes, **Gras**)
                    </label>
                    <textarea
                      rows={10}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Rédigez le contenu complet de l'article..."
                      className="w-full px-3.5 py-2.5 text-xs font-mono rounded-lg bg-neutral-50 dark:bg-[#151923] border border-black/[0.08] dark:border-white/[0.08] text-neutral-900 dark:text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </>
              ) : (
                /* Article Live Preview */
                <div className="space-y-6 max-w-2xl mx-auto py-4">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded bg-[#FF5500]/10 text-[#FF5500]">
                      {formData.category}
                    </span>
                    <h1 className="font-display text-2xl font-bold text-neutral-950 dark:text-white">
                      {formData.title || 'Sans titre'}
                    </h1>
                    <div className="text-xs text-neutral-400 font-mono-data">
                      Par {formData.authorName} ({formData.authorRole}) · {formData.readingTime} · {formData.date}
                    </div>
                  </div>

                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-56 object-cover rounded-xl"
                  />

                  <p className="text-sm italic font-medium text-neutral-600 dark:text-neutral-300 border-l-2 border-[#FF5500] pl-4">
                    {formData.excerpt}
                  </p>

                  <div className="prose dark:prose-invert text-xs leading-relaxed whitespace-pre-line text-neutral-700 dark:text-neutral-300">
                    {formData.content}
                  </div>
                </div>
              )}

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
                  <span>Enregistrer l'article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
