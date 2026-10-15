import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryBrowse } from '../components/CategoryBrowse';
import { FitnessTipsBanner } from '../components/FitnessTipsBanner';
import { NewsletterForm } from '../components/NewsletterForm';
import { ArticleCard } from '../components/ArticleCard';
import { ARTICLES } from '../data/articles';
import { useRouter } from '../context/RouterContext';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  // At least 3 featured articles
  const featuredArticles = ARTICLES.filter((a) => a.featured).slice(0, 3);

  // All 10 articles for Latest Blog Posts section
  const allArticles = ARTICLES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Section A: Hero Banner */}
      <HeroSection />

      {/* Section B: Featured Articles (At least 3 featured articles with images, categories, titles, descriptions, read links) */}
      <section aria-labelledby="featured-heading" className="my-14 sm:my-18">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-forest-800 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-lime-600" />
              <span>Curated Highlights</span>
            </div>
            <h2
              id="featured-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1"
            >
              Featured Health & Fitness Guides
            </h2>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="text-sm font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1 group"
          >
            <span>Browse all articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} featured />
          ))}
        </div>
      </section>

      {/* Section C: Browse Categories */}
      <CategoryBrowse />

      {/* Section D: Latest Blog Posts (All 10 articles in a responsive card grid) */}
      <section aria-labelledby="all-articles-heading" className="my-14 sm:my-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-forest-800 tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Complete Publication Catalog</span>
            </div>
            <h2
              id="all-articles-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1"
            >
              Latest Blog Posts ({allArticles.length})
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-xs">
            Every article features unique imagery, 5+ in-depth sections, and verified SEO keyword architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {allArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:border-forest-700 hover:text-forest-800 transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Advanced Filter & Search View</span>
          </button>
        </div>
      </section>

      {/* Section E: Fitness Tips Banner ("Small Habits. Stronger You.") */}
      <FitnessTipsBanner />

      {/* Section F: Newsletter Subscription */}
      <section aria-label="Newsletter Subscription" className="my-14 sm:my-18">
        <NewsletterForm layout="card" />
      </section>
    </div>
  );
};
