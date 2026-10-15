import React, { useState } from 'react';
import { Article } from '../types/blog';
import { useRouter } from '../context/RouterContext';
import { ArrowUpRight, Clock, Calendar, ImageOff } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const { navigateToArticle } = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToArticle(article.slug);
  };

  return (
    <article
      onClick={handleClick}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-stone-200/90 transition-all duration-200 hover:border-emerald-800/40 hover:shadow-md cursor-pointer ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div>
        {/* Featured Image with Fallback */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-stone-100 p-4 text-stone-400">
              <ImageOff className="w-8 h-8 mb-2" />
              <span className="text-xs text-stone-500 font-medium">{article.title}</span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 md:p-6">
          {/* Metadata: Clean unboxed text with typographic separators (anti-pill discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-3">
            <span className="font-semibold text-emerald-800 tracking-wide">
              {article.category}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              {article.publishedDate}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {article.readingTime}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-stone-900 group-hover:text-emerald-850 transition-colors line-clamp-2 leading-snug mb-2.5">
            {article.title}
          </h3>

          <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-auto">
        <span className="text-xs font-semibold text-stone-800 group-hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
          Read Article
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        <span className="text-[11px] text-stone-400 font-mono">
          {article.mainKeyword}
        </span>
      </div>
    </article>
  );
};
