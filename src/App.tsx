import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EstimatorModal } from './components/EstimatorModal';
import { CustomCursor } from './components/CustomCursor';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { AdminLayout } from './components/admin/AdminLayout';
import { SudoLoginView } from './components/admin/SudoLoginView';

function MainApp() {
  const { language } = useLanguage();
  const { isAdminLoggedIn } = useSiteData();
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>(
    language === 'fr' ? 'Ingénierie Web & Plateformes SaaS' : 'Web Engineering & SaaS Platforms'
  );

  // Dedicated Route Detection for /sudo
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/sudo' || path.startsWith('/sudo') || hash === '#/sudo' || hash.startsWith('#/sudo')) {
      return '/sudo';
    }
    return '/';
  });

  const navigateTo = (route: string) => {
    try {
      window.history.pushState({}, '', route);
    } catch {
      window.location.hash = '#' + route;
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/sudo' || path.startsWith('/sudo') || hash === '#/sudo' || hash.startsWith('#/sudo')) {
        setCurrentRoute('/sudo');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Covert keyboard shortcut Ctrl+Alt+S (or Cmd+Alt+S) for authorized operators
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        navigateTo('/sudo');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    scrollToContact();
  };

  const handleApplyEstimate = (data: { service: string; budget: string; details: string }) => {
    setPrefilledService(data.service);
    scrollToContact();
  };

  // ROUTE: /sudo — completely quarantined from public site
  if (currentRoute === '/sudo') {
    if (isAdminLoggedIn) {
      return <AdminLayout onExit={() => navigateTo('/')} />;
    }
    return <SudoLoginView onReturnToPublic={() => navigateTo('/')} />;
  }

  // ROUTE: / (Public Agency Website - zero public admin buttons or traces)
  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#090A0D] text-[#0B0D13] dark:text-[#ECEFF4] font-body flex flex-col selection:bg-[#FF5500]/30 selection:text-white transition-colors duration-200">
      {/* Public Announcement Banner (controlled via Admin Settings) */}
      <AnnouncementBanner />

      {/* Public Navigation */}
      <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onContactClick={scrollToContact}
          onPortfolioClick={scrollToPortfolio}
        />

        {/* Services Section with Master-Detail View */}
        <ServicesSection
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Dynamic Portfolio with Case Study Modal */}
        <PortfolioSection
          onSelectProjectForQuote={(title) => {
            setPrefilledService(language === 'fr' ? `Projet similaire à ${title}` : `Project similar to ${title}`);
            scrollToContact();
          }}
        />

        {/* 5-Step Methodology */}
        <ProcessSection />

        {/* Testimonials & Verified Proof */}
        <TestimonialsSection />

        {/* SEO-Optimized Blog with Reader Modal */}
        <BlogSection
          onDiscussArticle={(topic) => {
            setPrefilledService(language === 'fr' ? `Question suite à l'article : ${topic}` : `Inquiry regarding article: ${topic}`);
            scrollToContact();
          }}
        />

        {/* About WYNX / Startup Identity */}
        <AboutSection />

        {/* Interactive FAQ & Objection-Handling Accordion */}
        <FAQSection
          onAskQuestionInContact={(topic) => {
            setPrefilledService(language === 'fr' ? `Question spécifique : ${topic}` : `Inquiry regarding: ${topic}`);
            scrollToContact();
          }}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
        />

        {/* High-Converting Lead Capture & Quote Form */}
        <ContactSection
          key={`${prefilledService}-${language}`}
          prefilledService={prefilledService}
        />
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Interactive Project Cost & Timeline Estimator Modal */}
      <EstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplyEstimate={handleApplyEstimate}
      />

      {/* Custom Magnetic Follower Cursor */}
      <CustomCursor />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SiteDataProvider>
          <MainApp />
        </SiteDataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
