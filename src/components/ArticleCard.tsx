import React, { useState } from 'react';
import { SportsArticle } from '../types/sports';
import { useRouter } from '../context/RouterContext';
import { ArrowUpRight, Calendar, Clock, Tag, ImageOff } from 'lucide-react';

interface ArticleCardProps {
  article: SportsArticle;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const { navigate } = useRouter();
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(article.urlPath);
  };

  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/90 transition-all duration-200 hover:border-blue-700/60 hover:shadow-lg ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <a
        href={article.urlPath}
        onClick={handleClick}
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-2xl"
      >
        {/* Media Frame with Alt Text and Fallback */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="lazy"
              width="800"
              height="500"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-104"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 p-4 text-slate-400">
              <ImageOff className="w-8 h-8 mb-2 text-slate-500" />
              <span className="text-xs text-slate-300 font-medium">{article.title}</span>
            </div>
          )}
          {/* Subtle category badge on top left */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            {article.category}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Metadata (Unboxed text with typographic separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {article.publishedDate}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {article.readingTime}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug mb-2.5">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
              {article.excerpt}
            </p>
          </div>

          {/* Footer of Card with Primary Keyword */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
            <span className="text-xs font-bold text-blue-800 group-hover:text-blue-900 flex items-center gap-1 transition-colors">
              Read Guide
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <Tag className="w-2.5 h-2.5 text-amber-600" />
              {article.mainKeyword}
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};
