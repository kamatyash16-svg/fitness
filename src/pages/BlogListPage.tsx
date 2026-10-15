import React, { useState, useMemo } from 'react';
import { ARTICLES, CATEGORIES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Search, Filter, SlidersHorizontal, RotateCcw, BookOpen, Tag } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'readingTime' | 'featured'>('newest');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((art) => {
      const matchCat =
        selectedCategory === 'All' || art.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.mainKeyword.toLowerCase().includes(q) ||
        art.relatedKeyword1.toLowerCase().includes(q) ||
        art.relatedKeyword2.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q);

      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === 'readingTime') {
        const timeA = parseInt(a.readingTime) || 5;
        const timeB = parseInt(b.readingTime) || 5;
        return timeA - timeB;
      }
      // default newest: by id or date
      return parseInt(b.id) - parseInt(a.id);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleReset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Mission */}
      <div className="mb-10 text-center sm:text-left max-w-3xl">
        <span className="text-xs uppercase font-semibold text-forest-800 tracking-wider">
          Articles Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1 mb-3">
          All Educational Blog Articles
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Explore all 10 in-depth guides spanning beginner training splits, balanced nutrition frameworks, restorative sleep science, and mindful weight management.
        </p>
      </div>

      {/* Search and Filter Controls Toolbar */}
      <div className="mb-8 rounded-2xl bg-white border border-stone-200 p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, keyword (e.g. 'beginner workout plan')..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:bg-white transition-all"
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest-700"
                aria-label="Sort articles"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="featured">Sort: Featured Highlights</option>
                <option value="readingTime">Sort: Shortest Read Time</option>
              </select>
            </div>
          </div>

          {/* Reset Action */}
          <div className="md:col-span-3 flex justify-end">
            {(searchQuery || selectedCategory !== 'All' || sortBy !== 'newest') && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Interactive filter controls: buttons allowed with active states per design constitution) */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Category:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-forest-800 text-white shadow-xs font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Count & Keyword Hint */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-xs text-stone-500">
        <div>
          Showing <span className="font-semibold text-stone-800">{filteredArticles.length}</span> of {ARTICLES.length} educational articles
          {selectedCategory !== 'All' && <span> in <strong className="text-forest-800">{selectedCategory}</strong></span>}
        </div>
        {searchQuery && (
          <div className="flex items-center gap-1 font-mono text-[11px] bg-stone-100 px-2.5 py-1 rounded-md text-stone-700">
            <Tag className="w-3 h-3 text-forest-700" />
            <span>Keyword query: "{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* Articles Grid or Clear Empty State */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      ) : (
        <div className="my-16 text-center rounded-2xl border border-dashed border-stone-300 bg-white p-10 max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-800 mb-1">
            No Articles Found
          </h3>
          <p className="text-xs text-stone-500 mb-6 leading-relaxed">
            We couldn’t find any articles matching your search query "{searchQuery}" in category "{selectedCategory}".
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-semibold hover:bg-forest-900 transition-colors"
          >
            Clear All Filters & Reset
          </button>
        </div>
      )}
    </div>
  );
};
