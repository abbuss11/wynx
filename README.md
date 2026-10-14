# ⚡ WYNX – Agence Digitale & Studio d'Innovation

> **"Dare to see further. Dare WYNX."**  
> Plateforme web officielle et console d'administration de l'agence WYNX : ingénierie logicielle sur-mesure, plateformes SaaS haute performance, applications mobiles cross-platform, identités de marque et UI/UX design systems.

---

## 📋 Table des Matières

1. [Aperçu & Vision du Projet](#-aperçu--vision-du-projet)
2. [Stack Technologique & Design Language](#-stack-technologique--design-language)
3. [Architecture du Code Source](#-architecture-du-code-source)
4. [Fonctionnalités Principales](#-fonctionnalités-principales)
   - [Portail Public](#1-portail-public)
   - [Portail d'Administration (Console WYNX)](#2-portail-dadministration-console-wynx)
5. [Installation & Démarrage en Local](#-installation--démarrage-en-local)
6. [Scripts NPM Disponibles](#-scripts-npm-disponibles)
7. [Guides de Déploiement en Production](#-guides-de-déploiement-en-production)
   - [Option A : Hébergement Statique / Edge (Vercel, Netlify, Cloudflare Pages)](#option-a--hébergement-statique--edge-vercel-netlify-cloudflare-pages)
   - [Option B : Conteneurisation Docker (Nginx Multi-stage)](#option-b--conteneurisation-docker-nginx-multi-stage)
   - [Option C : Google Cloud Run & GCP](#option-c--google-cloud-run--gcp)
   - [Option D : Déploiement VPS Dédié (Ubuntu, Nginx, SSL Let's Encrypt)](#option-d--déploiement-vps-dédié-ubuntu-nginx-ssl-lets-encrypt)
8. [Optimisations SEO & Performance (Core Web Vitals)](#-optimisations-seo--performance-core-web-vitals)
9. [Sauvegarde, Export & Restauration des Données](#-sauvegarde-export--restauration-des-données)
10. [Licence & Contact](#-licence--contact)

---

## 🌟 Aperçu & Vision du Projet

WYNX est une agence digitale et un studio d'innovation technologique basée à Niamey avec un rayonnement international. Ce projet regroupe une **vitrine vitale à fort taux de conversion** et une **console d'administration complète (ERP / CRM / CMS / Analytics)** permettant à l'équipe de gérer en toute autonomie :
- Le trafic et les visites en direct,
- Les articles de veille technologique (Blog SEO),
- Le portfolio d'études de cas clients,
- Le pipeline des demandes de devis et estimations financières,
- Le suivi des projets clients en production (CRM, livrables, jalons, facturation),
- Les paramètres globaux du site (coordonnées, bandeau d'alerte, SEO, devises).

---

## 🛠 Stack Technologique & Design Language

### Framework & Outils Frontend
- **React 19** : Architecture déclarative moderne avec hooks personnalisés et gestion d'état contextuelle.
- **TypeScript 7** : Typage statique strict sur l'ensemble des modules (types de données, props, états d'administration).
- **Vite 8** : Bundler ESM ultra-rapide avec compilation instantanée et optimisation du build de production.
- **Tailwind CSS v4** : Framework utilitaire moderne compilé avec `@tailwindcss/vite` pour des styles denses, réactifs et sans surcoût CSS.
- **D3.js (Data-Driven Documents)** : Moteur de visualisation vectorielle interactive pour les métriques de conversion, volumes financiers et tendances de devis mensuels.
- **Lucide React** : Bibliothèque d'icônes vectorielles légères et cohérentes.
- **Motion (Framer Motion)** : Micro-animations ergonomiques, transitions fluides et animations de révélation (Reveal).

### Charte Graphique & Typographies WYNX
- **Typographie Titres (Display)** : `Syne` (500, 600, 700, 800) – typographie distinctive, architecturale et audacieuse.
- **Typographie Corps (Body)** : `Plus Jakarta Sans` (300, 400, 500, 600, 700) – lisibilité optimale sur écrans rétina.
- **Typographie Données & Code** : `JetBrains Mono` – chiffres tabulaires pour les métriques, finances et compteurs.
- **Couleurs Principales** :
  - Fond Sombre Obsidienne : `#090A0D` / `#07080B`
  - Cartes & Conteneurs Élevés : `#11141E` / `#131722`
  - Accent Électrique WYNX : `#FF5500` (Hover: `#E64D00`)
  - Accent Doré / Ambre : `#F59E0B`
  - Fond Mode Clair : `#F8F9FC`
  - Bordures Subtiles : `rgba(255, 255, 255, 0.08)` (Dark) / `rgba(0, 0, 0, 0.08)` (Light)

---

## 📁 Architecture du Code Source

```text
/
├── index.html                 # Point d'entrée HTML, balises SEO OpenGraph, JSON-LD Schema.org
├── vite.config.ts             # Configuration Vite avec alias @ et plugins React / Tailwind
├── tsconfig.json              # Règles de compilation TypeScript
├── package.json               # Dépendances et scripts de build
├── metadata.json              # Métadonnées applicatives AI Studio
├── .env.example               # Modèle des variables d'environnement
├── public/                    # Fichiers statiques servis à la racine
│   └── assets/brand/          # Logos et motifs SVG officiels de l'agence WYNX
└── src/
    ├── main.tsx               # Point d'entrée React et injection du DOM
    ├── App.tsx                # Composant racine, orchestration public / admin et routage
    ├── index.css              # Directive Tailwind CSS v4, polices et classes utilitaires
    ├── types/
    │   └── index.ts           # Types TypeScript : BlogPost, Project, QuoteRequest, Client, Analytics, etc.
    ├── context/
    │   ├── ThemeContext.tsx    # Gestion du thème sombre/clair avec détection système et persistance
    │   ├── LanguageContext.tsx # Gestion bilingue Français / Anglais (i18n complet)
    │   └── SiteDataContext.tsx # Store maître unifié (CRUD Blog, Projets, Devis, CRM, Analytics, Settings)
    ├── data/
    │   ├── blogData.ts        # Données initiales des articles de blog
    │   ├── portfolioData.ts   # Données initiales des études de cas
    │   ├── servicesData.ts    # Définition des 6 disciplines majeures de l'agence
    │   └── adminInitialData.ts# Données initiales d'administration (CRM, devis, analytics, settings)
    └── components/
        ├── Navbar.tsx         # Barre de navigation fixe avec sélecteur de langue, thème et accès admin
        ├── Hero.tsx           # En-tête avec promesse de valeur, métriques chiffrées et CTA magnétiques
        ├── ServicesSection.tsx# Présentation interactive des services (vue Master-Detail)
        ├── PortfolioSection.tsx# Galerie de réalisations avec filtres par catégorie et vue étude de cas
        ├── ProcessSection.tsx # Déroulé de la méthodologie en 5 étapes
        ├── TestimonialsSection.tsx # Témoignages vérifiés de dirigeants
        ├── BlogSection.tsx    # Grille d'articles techniques avec modal de lecture complète
        ├── AboutSection.tsx   # Présentation de l'ADN, de l'équipe et des valeurs de l'agence
        ├── FAQSection.tsx     # Accordéon des questions fréquentes et traitement des objections
        ├── ContactSection.tsx # Formulaire de contact avec devis instantané et enregistrement admin
        ├── EstimatorModal.tsx # Estimateur interactif de coût et de planning projet en 3 étapes
        ├── AnnouncementBanner.tsx # Bandeau d'annonce supérieur contrôlable depuis l'administration
        ├── CustomCursor.tsx   # Curseur fluide à attraction magnétique sur les boutons
        ├── ThemeToggle.tsx    # Sélecteur de mode Sombre / Clair
        ├── LanguageSwitcher.tsx # Sélecteur de langue FR / EN
        ├── Footer.tsx         # Pied de page avec liens légaux, réseaux sociaux et accès console
        ├── brand/             # Composants logos et motifs SVG vectoriels WYNX
        └── admin/             # Console d'administration WYNX
            ├── AdminLayout.tsx         # Shell d'administration avec sidebar, header et notifications toasts
            ├── AdminAnalytics.tsx      # Dashboard analytique, visites live, sources de trafic et graphiques
            ├── MonthlyQuotesD3Chart.tsx# Visualisation interactive D3.js des devis mensuels, volumes et conversions
            ├── AdminBlog.tsx           # Gestionnaire d'articles, éditeur Markdown et mots-clés SEO
            ├── AdminProjects.tsx       # Gestionnaire des projets portfolio et métriques d'impact
            ├── AdminQuotes.tsx         # Gestionnaire de devis, pipeline Kanban et générateur de propositions
            ├── AdminClients.tsx        # CRM de suivi clients, barres d'avancement, jalons et journal des échanges
            ├── AdminSettings.tsx       # Configuration générale, coordonnées, devises et exports JSON
            └── SudoLoginView.tsx       # Passerelle de connexion sécurisée exclusive /sudo
```

---

## ⚡ Fonctionnalités Principales

### 1. Portail Public
- **Hero & Identité Visuelle** : Accroche percutante bilingue, badges de performance Core Web Vitals, 4 métriques de croissance (+140%, 62ms TTFB, 45k+ utilisateurs).
- **Services d'Ingénierie** : Découverte détaillée (Web & SaaS, Apps Mobiles, UI/UX Systems, Branding, SEO Technique, Cloud/DevOps) avec fonctionnalités, livrables et technologies associées.
- **Portfolio & Modales d'Études de Cas** : Filtrage par industrie (*SaaS*, *E-commerce*, *Mobile*, *Branding*), recherche par mot-clé, et modale présentant Problème / Solution / Résultats chiffrés.
- **Estimateur de Projet Interactif** : Calculateur en 3 étapes (Type de projet, Modules techniques, Niveau de design) générant une fourchette budgétaire et un délai prévisionnel en semaines.
- **Formulaire de Devis Haute Conversion** : Prise de contact avec pré-remplissage automatique des services sélectionnés et injecté instantanément dans le CRM d'administration.
- **Blog Tech & Insights** : Articles d'expertise technique avec mots-clés SEO, temps de lecture et modale de lecture immersive.
- **Accessibilité & Personnalisation** : Toggle Light/Dark natif préservant les contrastes WCAG AAA, bilinguisme total Français / Anglais (`LanguageContext`), et curseur fluide avec adhérence magnétique.

### 2. Portail d'Administration Sécurisé (Route Dédiée `/sudo`)

> 🔒 **Cloisonnement & Discrétion Absolue** : Aucun bouton ou lien vers l'administration n'est affiché sur le site public. L'accès est strictement réservé aux opérateurs habilités via la route dédiée **`/sudo`** (ou le raccourci clavier `Ctrl + Alt + S` / `Cmd + Alt + S`).

- **Architecture de Sécurité & Protection Renforcée** :
  - **Hachage Cryptographique SHA-256** : Authentification calculée via `crypto.subtle.digest` sans transit en clair.
  - **Protection Anti-Brute-Force & Rate Limiting** : Verrouillage automatique temporaire (10 minutes) au bout de 5 tentatives infructueuses consécutives avec décompte en direct.
  - **Isolation des Sessions & Tokens Éphémères** : Session sécurisée avec jeton aléatoire cryptographique stocké en `sessionStorage` avec expiration automatique (TTL 8 heures).
  - **Assainissement des Entrées & Défense XSS** : Filtrage strict des protocoles d'URL (`javascript:`, `data:` et `vbscript:` rejetés), nettoyage des caractères dangereux sur tous les formulaires publics.
  - **En-têtes de Sécurité & Méta** : `X-Content-Type-Options: nosniff` et `Referrer-Policy: strict-origin-when-cross-origin`.
  - **Gestion de la Passphrase Maître** : Modification sécurisée du mot de passe maître directement depuis l'onglet **Gestion Globale**.
- **Analytics & Trafic Visiteurs** :
  - Total visiteurs (28 450+), visiteurs uniques, pages vues, taux de rebond (32.4%), temps moyen de session.
  - **Indicateur temps réel de visiteurs actifs** avec animation pulsante.
  - Graphique d'évolution quotidienne du trafic (filtres 7 jours, 30 jours, 1 an).
  - **Visualisation D3.js des Demandes de Devis Mensuelles** :
    - 3 modes de projection : *Volume & Signatures* (barres groupées + courbe de transformation), *Valeur Financière Estimée (€ HT)* (courbe spline lissée avec gradient WYNX) et *Taux de Conversion (%)* avec ligne d'objectif commercial (30%).
    - Filtres temporels 6 mois / 12 mois, infobulle interactive D3 au survol, vue tabulaire détaillée et export des données au format CSV.
  - Canaux d'acquisition (Google SEO 44%, Direct 26%, LinkedIn 18%, Twitter 8%, Partenaires 4%).
  - Répartition géographique (France, Niger, Côte d'Ivoire, USA, Sénégal, etc.) et ventilation par appareils & navigateurs.
- **Gestion du Blog** :
  - Création, modification, duplication et suppression d'articles.
  - Éditeur Markdown complet avec bascule d'aperçu en direct (*Live Preview*).
  - Gestion des statuts (*Publié* / *Brouillon*) – les brouillons sont automatiquement masqués du site public.
  - Sélection d'images dans la bibliothèque de l'agence ou via URL externe.
- **Gestion des Projets Portfolio** :
  - Publication et mise à jour des réalisations clients.
  - Éditeur de résultats mesurés chiffrés (3 KPIs par projet).
  - Toggle de mise en avant (*Featured*) pour propulser un projet en tête du portfolio public.
- **Gestion des Devis (Pipeline)** :
  - Capture en temps réel des leads soumis via le formulaire de contact et l'estimateur.
  - Filtres par statut : *Nouveau* (badge de notification), *En analyse*, *Devis envoyé*, *Accepté*, *Refusé*.
  - **Générateur de Proposition Commerciale** : calcul automatique du prix HT, durée en semaines et génération d'un email personnalisé prêt à copier.
  - **Conversion en 1 clic** d'un devis vers le CRM client.
- **Suivi Clients & CRM de Production** :
  - Vue financière agrégée : Volume signé, Facturé, Encaissé, Reste dû.
  - Fiche de suivi par client avec jalon de livraison actif et barre d'avancement (0 - 100%).
  - Journal horodaté des interactions (réunions de cadrage, appels, validations de sprint).
- **Gestion Globale du Site** :
  - Modification des coordonnées de l'agence, adresses du siège et réseaux sociaux.
  - Activation et personnalisation du bandeau supérieur d'annonce publique.
  - Sélection de la devise de travail (€ EUR, $ USD, FCFA).
  - Paramètres SEO (Meta Title, Description, Google Analytics ID, robots.txt).
  - Exportation de l'ensemble des données au format JSON et bouton de réinitialisation sécurisé.

---

## 💻 Installation & Démarrage en Local

### Prérequis
- **Node.js** : version `18.x`, `20.x` ou `22.x` recommandée.
- **Gestionnaire de paquets** : `npm`, `pnpm` ou `bun`.

### 1. Cloner le Répertoire
```bash
git clone https://github.com/votre-compte/wynx-agency.git
cd wynx-agency
```

### 2. Configurer les Variables d'Environnement
Copiez le fichier d'exemple pour créer votre fichier `.env` local :
```bash
cp .env.example .env
```

Contenu type de `.env` :
```env
# Clé API Gemini (optionnel si des fonctionnalités d'IA serveur sont activées)
GEMINI_API_KEY="votre_cle_api_gemini"

# URL d'hébergement public
APP_URL="http://localhost:3000"
```

### 3. Installer les Dépendances
```bash
npm install
```

### 4. Lancer le Serveur de Développement
```bash
npm run dev
```
L'application est accessible à l'adresse suivante :  
👉 **`http://localhost:3000`**

---

## 📜 Scripts NPM Disponibles

| Commande | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | Lance le serveur local Vite | Démarrage sur le port `3000` (`--host=0.0.0.0`) avec rechargement à chaud. |
| `npm run build` | Compile pour la production | Génère les fichiers statiques optimisés dans le dossier `dist/`. |
| `npm run preview` | Prévisualise la build | Démarre un serveur local servant les assets du dossier `dist/`. |
| `npm run lint` | Validation TypeScript | Exécute `tsc --noEmit` pour vérifier l'absence d'erreurs de typage. |
| `npm run clean` | Nettoyage des builds | Supprime le dossier `dist/` et les fichiers temporaires. |

---

## 🚀 Guides de Déploiement en Production

### Option A : Hébergement Statique / Edge (Vercel, Netlify, Cloudflare Pages)

Ce projet étant une Single Page Application (SPA) optimisée, il se déploie nativement sur les plateformes de CDN Edge mondiales.

#### Déploiement sur Vercel
1. Connectez votre dépôt Git sur [Vercel](https://vercel.com).
2. Configurez le projet avec les réglages suivants :
   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
3. Créez un fichier `vercel.json` à la racine pour assurer le routage SPA si nécessaire :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Déploiement sur Netlify
1. Connectez votre dépôt sur [Netlify](https://netlify.com).
2. Paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Créez un fichier `public/_redirects` avec la règle suivante :
```text
/*    /index.html   200
```

---

### Option B : Conteneurisation Docker (Nginx Multi-stage)

Pour un déploiement sécurisé et standardisé sur n'importe quel orchestrateur (Kubernetes, AWS ECS, Docker Swarm), utilisez ce `Dockerfile` multi-étapes :

#### 1. Créer le `Dockerfile`
```dockerfile
# Étape 1 : Build de l'application
FROM node:20-alpine AS builder
WORKDIR /app

# Mise en cache des dépendances
COPY package*.json ./
RUN npm ci

# Copie des sources et compilation
COPY . .
RUN npm run build

# Étape 2 : Serveur web Nginx de production (ultra-léger < 25Mo)
FROM nginx:alpine-slim

# Copie de la configuration Nginx optimisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers compilés
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Créer la configuration `nginx.conf`
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Compression gzip pour accélérer le chargement
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_vary on;

    # Gestion du cache des assets immuables
    location ~* \.(?:css|js|jpg|jpeg|gif|png|ico|svg|webp|avif|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Redirection SPA : toutes les routes renvoient sur index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Sécurité : masquage des fichiers cachés
    location ~ /\. {
        deny all;
    }
}
```

#### 3. Commandes de Build et Exécution Docker
```bash
# Construction de l'image
docker build -t wynx-agency:latest .

# Lancement du conteneur sur le port 80
docker run -d -p 80:80 --name wynx-web wynx-agency:latest
```

---

### Option C : Google Cloud Run & GCP

Le projet est nativement compatible avec Google Cloud Run (conteneur stateless avec scaling automatique jusqu'à zéro).

```bash
# 1. Authentification Google Cloud
gcloud auth login
gcloud config set project [VOTRE_PROJECT_ID]

# 2. Build et déploiement direct via Cloud Build & Cloud Run
gcloud run deploy wynx-agency \
  --source . \
  --platform managed \
  --region europe-west2 \
  --allow-unauthenticated \
  --port 80
```

---

### Option D : Déploiement VPS Dédié (Ubuntu, Nginx, SSL Let's Encrypt)

Pour un déploiement sur un serveur virtuel dédié (ex. OVH, DigitalOcean, Hetzner, AWS EC2) :

```bash
# 1. Mise à jour du serveur et installation de Nginx & Certbot
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx git nodejs npm

# 2. Cloner et construire le projet sur le serveur
git clone https://github.com/votre-compte/wynx-agency.git /var/www/wynx
cd /var/www/wynx
npm install
npm run build

# 3. Configurer le virtual host Nginx
sudo nano /etc/nginx/sites-available/wynx.agency
```

Contenu de `/etc/nginx/sites-available/wynx.agency` :
```nginx
server {
    server_name wynx.agency www.wynx.agency;
    root /var/www/wynx/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
}
```

```bash
# 4. Activer le site et recharger Nginx
sudo ln -s /etc/nginx/sites-available/wynx.agency /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. Activer le certificat SSL HTTPS gratuit avec Let's Encrypt
sudo certbot --nginx -d wynx.agency -d www.wynx.agency
```

---

### Option E : Pipeline d'Intégration et Déploiement Continu (CI/CD GitHub Actions)

Pour automatiser les tests et le déploiement continu à chaque `git push` sur la branche `main`, créez le fichier `.github/workflows/ci-cd.yml` :

```yaml
name: WYNX CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-build:
    name: Type-Check & Production Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run TypeScript Strict Lint
        run: npm run lint

      - name: Build Production Assets
        run: npm run build

      - name: Upload Build Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist-artifacts
          path: dist/
          retention-days: 7
```

---

## 🔒 Matrice de Sécurité & Protection du Point d'Entrée `/sudo`

| Vecteur d'Attaque | Risque | Mécanisme de Défense Implémenté dans WYNX |
| :--- | :--- | :--- |
| **Attaque Brute-force & Dictionnaire** | Élevé | Verrouillage persistant multi-onglets (10 min) dès 5 tentatives infructueuses (`localStorage` + `sessionStorage` synchronisés). |
| **Rainbow Tables & Dictionnaire Hash** | Moyen | Salage cryptographique fort (`wynx_sec_salt_v2_2026_`) avant le calcul du condensat SHA-256 via Web Crypto. |
| **XSS (Cross-Site Scripting)** | Critique | Assainissement des balises HTML (`sanitizeText`), neutralisation des octets nuls `\0`, et échappement des scripts JSON-LD (`\u003c`). |
| **Attaque par URL Malveillante** | Critique | Whitelist stricte (`https:`, `http:`, `mailto:`, `tel:`), blocage des schémas `javascript:`, `data:`, `vbscript:` et des bypasses relatifs (`//`, `/\`). |
| **Vol de Session & Hijacking** | Moyen | Jetons de session aléatoires à haute entropie (32 octets via `crypto.getRandomValues`), TTL d'expiration stricte (8h) et stockage isolé. |
| **Divulgation de l'Espace Admin** | Moyen | Cloisonnement absolu : **aucun bouton ou lien admin sur le site public**. L'administration n'est accessible que via saisie directe de `/sudo` ou raccourci clavier chiffré (`Ctrl + Alt + S`). |
| **MIME Sniffing & Clickjacking** | Moyen | En-têtes `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` et `Referrer-Policy: strict-origin-when-cross-origin`. |

---

## ✅ Checklist de Mise en Production

Avant de pointer votre nom de domaine en production sur l'instance :

1. [ ] **Clonage et build propre** : Exécuter `npm run lint` et `npm run build` pour vérifier l'intégrité sans warning.
2. [ ] **Changement du mot de passe maître `/sudo`** : Se connecter à `/sudo`, accéder à l'onglet **Gestion Globale**, et remplacer le mot de passe initial par une passphrase robuste (12+ caractères).
3. [ ] **Redirections SPA configurées** : Vérifier la présence de `public/_redirects` (Netlify), `vercel.json` (Vercel) ou la directive `try_files` (Nginx).
4. [ ] **Activation SSL / TLS** : Forcer HTTPS avec certificat Let's Encrypt ou certificat géré par le CDN.
5. [ ] **Vérification des en-têtes HTTP** : Contrôler `X-Content-Type-Options: nosniff` et `Referrer-Policy` via `curl -I https://wynx.agency`.
6. [ ] **Paramètres Agence & SEO** : Personnaliser l'adresse de contact, numéro de téléphone, devise par défaut et ID Google Analytics depuis l'administration.

---

## ⚡ Optimisations SEO & Performance (Core Web Vitals)

- **Score Google PageSpeed visé : 95 - 100**
- **LCP (Largest Contentful Paint) < 1.2s** : Pré-chargement des polices critiques (`Syne`, `Plus Jakarta Sans`), dimensions fixes sur les images et formats d'images modernes compressés.
- **CLS (Cumulative Layout Shift) = 0.00** : Emplacements réservés pour les composants asynchrones et hauteurs minimales définies sur les conteneurs.
- **Balises Meta Complètes** : OpenGraph (`og:title`, `og:image`, `og:description`) et Twitter Cards intégrés dans `index.html`.
- **Données Structurées JSON-LD** : Balisage Schema.org de type `ProfessionalService` incluant géolocalisation, coordonnées et disciplines d'ingénierie.
- **Bilinguisme Indexable** : Balises linguistiques dynamiques et gestion des routes conformes aux standards Google Search Central.

---

## 💾 Sauvegarde, Export & Restauration des Données

L'application intègre un moteur de stockage résilient basé sur `localStorage` avec synchronisation automatique réactive :
1. **Sauvegarde Automatique** : Toute modification apportée dans l'administration (ajout d'article, de projet, mise à jour de devis ou de statut client) est sauvegardée en temps réel.
2. **Exportation JSON** : Rendez-vous dans **Admin > Gestion Globale** et cliquez sur **"Exporter JSON"** pour télécharger une copie intégrale de sauvegarde.
3. **Réinitialisation d'Urgence** : Un bouton de réinitialisation sécurisé avec fenêtre de confirmation permet de restaurer instantanément le catalogue de démonstration officiel de WYNX.

---

## 📞 Support & Contact

- **Agence** : WYNX Agency – Studio d'Ingénierie & d'Innovation Numérique
- **Siège** : Boulevard de la République, Plateau I, Niamey, Niger
- **Email Commercial** : [contact@wynx.agency](mailto:contact@wynx.agency)
- **Téléphone Direct** : `+227 1 23 45 67 8`
- **Site Web** : [https://wynx.agency](https://wynx.agency)

---

*Développé avec exigence et passion par l'équipe d'ingénierie WYNX.*
