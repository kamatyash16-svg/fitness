/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { BlogListPage } from './pages/BlogListPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArticlePage } from './components/ArticlePage';
import { ARTICLES } from './data/articles';
import { BookOpen, ArrowLeft } from 'lucide-react';

function AppContent() {
  const { route, navigate } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut '/' to trigger search anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isSearchOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Render current view based on active route
  const renderView = () => {
    switch (route.type) {
      case 'home':
        return <HomePage />;

      case 'blog':
        return <BlogListPage />;

      case 'workouts':
        return <CategoryPage pageType="workouts" />;

      case 'nutrition':
        return <CategoryPage pageType="nutrition" />;

      case 'wellness':
        return <CategoryPage pageType="wellness" />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'article': {
        const article = ARTICLES.find((a) => a.slug === route.slug);
        if (article) {
          return <ArticlePage article={article} />;
        }
        return (
          <div className="max-w-2xl mx-auto px-4 py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-2">
              Article Not Found
            </h1>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              We couldn’t find an article matching the requested address: "<span className="font-mono text-xs">{route.slug}</span>". Please choose from our available catalog below.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-semibold hover:bg-forest-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View All 10 Articles</span>
              </button>
            </div>
          </div>
        );
      }

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1F2937]">
      {/* Top Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Bottom Footer with Mandatory Health Disclaimer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
