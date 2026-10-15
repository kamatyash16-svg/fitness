import React, { useState, useEffect, useRef } from 'react';
import { ARTICLES } from '../data/articles';
import { useRouter } from '../context/RouterContext';
import { Search, X, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigateToArticle } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // trigger opening if parent allows, or let user click
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = searchTerm.trim().toLowerCase();
  const results = normalized
    ? ARTICLES.filter((art) => {
        return (
          art.title.toLowerCase().includes(normalized) ||
          art.mainKeyword.toLowerCase().includes(normalized) ||
          art.relatedKeyword1.toLowerCase().includes(normalized) ||
          art.relatedKeyword2.toLowerCase().includes(normalized) ||
          art.category.toLowerCase().includes(normalized) ||
          art.excerpt.toLowerCase().includes(normalized)
        );
      })
    : [];

  const handleSelect = (slug: string) => {
    navigateToArticle(slug);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search FitLife Journal articles"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-stone-200 px-4 py-3.5">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by article title, keyword (e.g. 'beginner workout plan'), or topic..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-medium text-stone-500 hover:text-stone-800 px-2 py-1 bg-stone-100 rounded"
          >
            Esc
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-stone-100">
          {normalized === '' ? (
            <div className="py-6 text-center text-sm text-stone-500">
              <div className="flex justify-center mb-2">
                <BookOpen className="w-8 h-8 text-stone-300" />
              </div>
              <p className="font-medium text-stone-700">Search all 10 educational health guides</p>
              <p className="text-xs text-stone-400 mt-1">
                Try searching for keywords like <span className="text-forest-700 font-mono">strength training</span>, <span className="text-forest-700 font-mono">healthy eating</span>, or <span className="text-forest-700 font-mono">hydration</span>.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2 py-1">
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Found {results.length} article{results.length === 1 ? '' : 's'}
              </div>
              {results.map((art) => (
                <div
                  key={art.id}
                  onClick={() => handleSelect(art.slug)}
                  className="group flex items-start justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-emerald-800">{art.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-stone-400">
                        <Tag className="w-3 h-3" />
                        {art.mainKeyword}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 group-hover:text-forest-800 transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                      {art.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-forest-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-stone-500">
              <p className="font-medium text-stone-700">No articles matched "{searchTerm}"</p>
              <p className="text-xs text-stone-400 mt-1">
                Check spelling or browse through our Workouts, Nutrition, or Wellness categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
