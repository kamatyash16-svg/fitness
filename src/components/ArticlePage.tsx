import React, { useState, useEffect } from 'react';
import { Article } from '../types/blog';
import { ARTICLES } from '../data/articles';
import { useRouter } from '../context/RouterContext';
import { SEOKeywordPanel } from './SEOKeywordPanel';
import { ArticleCard } from './ArticleCard';
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ArrowLeft,
  ShieldAlert,
  BookmarkCheck,
  CheckCircle,
  Info,
  AlertTriangle,
  Lightbulb,
  ImageOff
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  const { navigate, navigateToArticle, navigateToCategory } = useRouter();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Update document title and canonical tags dynamically
  useEffect(() => {
    document.title = `${article.title} – FitLife Journal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.metaDescription);
    }
  }, [article]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const currentProgress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} – via FitLife Journal`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  // Find related articles by matching slugs
  const relatedArticles = ARTICLES.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  return (
    <article className="min-h-screen bg-stone-50/50 pb-20">
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-200 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-forest-700 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Breadcrumb Navigation (Requirement 5.8) */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-stone-200/70 bg-white py-3.5"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
            <li>
              <button
                onClick={() => navigate('/')}
                className="hover:text-forest-800 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </li>
            <li>
              <button
                onClick={() => navigate('/blog')}
                className="hover:text-forest-800 transition-colors"
              >
                Blog
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </li>
            <li>
              <button
                onClick={() => navigateToCategory(article.category)}
                className="hover:text-forest-800 transition-colors"
              >
                {article.category}
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </li>
            <li className="text-stone-800 font-medium truncate max-w-[200px] sm:max-w-xs" aria-current="page">
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Back Link */}
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-forest-800 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Articles</span>
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-forest-800 tracking-wide uppercase mb-3">
            <span>{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4 text-balance">
            {article.title}
          </h1>

          {/* Byline & Metadata (Unboxed typography, anti-pill discipline) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-500 pb-6 border-b border-stone-200">
            <span className="flex items-center gap-1.5 font-medium text-stone-700">
              <User className="w-3.5 h-3.5 text-forest-700" />
              {article.author}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              {article.publishedDate}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readingTime}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-forest-700 font-medium">
              Evidence-Informed Review
            </span>
          </div>
        </header>

        {/* Hero Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-8 bg-stone-100">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-stone-100 text-stone-400">
              <ImageOff className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium text-stone-600">{article.heroImageAlt}</p>
            </div>
          )}
          <div className="px-4 py-2.5 bg-stone-100/90 border-t border-stone-200/80 text-[11px] text-stone-500 italic">
            Figure: {article.heroImageAlt}
          </div>
        </div>

        {/* Mandatory Dedicated SEO Keyword Panel (Prompt Section 5) */}
        <SEOKeywordPanel
          mainKeyword={article.mainKeyword}
          relatedKeyword1={article.relatedKeyword1}
          relatedKeyword2={article.relatedKeyword2}
          seoTitle={article.seoTitle}
          metaDescription={article.metaDescription}
          readingTime={article.readingTime}
        />

        {/* Introduction */}
        <div className="prose prose-stone max-w-none mb-10">
          {article.intro.map((p, idx) => (
            <p
              key={idx}
              className={`text-base sm:text-lg text-stone-700 leading-relaxed mb-4 ${
                idx === 0
                  ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-forest-800 first-letter:float-left first-letter:mr-3 first-letter:mt-1'
                  : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Table of Contents for Long-Form Readability */}
        <div className="my-8 rounded-xl bg-white border border-stone-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
            <BookmarkCheck className="w-4 h-4 text-forest-700" />
            <span>Table of Contents</span>
          </div>
          <ol className="space-y-2 text-sm text-stone-600">
            {article.sections.map((sec, idx) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  className="hover:text-forest-800 hover:underline flex items-start gap-2"
                >
                  <span className="font-mono text-xs text-stone-400 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <span>{sec.heading.replace(/^\d+\.\s*/, '')}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* 5+ Detailed H2 Sections with Practical Examples */}
        <div className="space-y-12">
          {article.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-b border-stone-200/70 pb-10"
            >
              <h2 className="text-2xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-4">
                {section.heading}
              </h2>

              <div className="space-y-4 text-stone-700 leading-relaxed text-base">
                {section.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Actionable Checklist if present */}
              {section.checklist && (
                <div className="mt-5 rounded-xl bg-stone-100/70 border border-stone-200 p-4 sm:p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-forest-800 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-forest-700" />
                    <span>Actionable Checkpoints</span>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {section.checklist.map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="text-forest-700 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Callout box (tip, info, caution) without thick left borders */}
              {section.callout && (
                <div
                  className={`mt-5 rounded-xl p-4 sm:p-5 border text-xs sm:text-sm leading-relaxed ${
                    section.callout.type === 'caution'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : section.callout.type === 'tip'
                      ? 'bg-forest-50/70 border-forest-200 text-forest-900'
                      : 'bg-stone-100 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {section.callout.type === 'caution' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    ) : section.callout.type === 'tip' ? (
                      <Lightbulb className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold uppercase tracking-wider text-[11px] block mb-1">
                        {section.callout.type === 'caution'
                          ? 'Safety Consideration'
                          : section.callout.type === 'tip'
                          ? 'FitLife Pro-Tip'
                          : 'Educational Note'}
                      </span>
                      <span>{section.callout.text}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion Section */}
        <section className="my-10 pt-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            Summary & Moving Forward
          </h2>
          <p className="text-base text-stone-700 leading-relaxed mb-6">
            {article.conclusion}
          </p>

          {/* Key Takeaways Box */}
          <div className="rounded-2xl border border-forest-200 bg-forest-50/50 p-6 sm:p-7">
            <h3 className="text-sm font-bold text-forest-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-forest-700" />
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-forest-950">
              {article.takeawayChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="rounded-full bg-forest-200 text-forest-800 w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Share & Social Links Bar */}
        <div className="my-8 py-5 border-y border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-stone-500" />
            <span>Share This Article</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <span>Copy Link</span>
              )}
            </button>
            <button
              onClick={handleShareTwitter}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Share on 𝕏
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
            >
              LinkedIn
            </button>
          </div>
        </div>

        {/* Article-Level Medical Disclaimer */}
        <div className="my-8 rounded-xl border border-stone-200 bg-stone-100/60 p-4 text-xs text-stone-600 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-800">Medical Notice: </span>
            This article was written by the FitLife Editorial Team for general educational purposes and does not replace individual clinical care or personalized physical therapy. Consult a physician before starting any rigorous training program.
          </div>
        </div>

        {/* Related Articles Section (Prompt Requirement 5.7 & 6) */}
        <section aria-labelledby="related-articles-heading" className="mt-14 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-semibold text-forest-800 tracking-wider">
                Continue Reading
              </span>
              <h2
                id="related-articles-heading"
                className="text-2xl font-bold text-stone-900 mt-1"
              >
                Related Educational Guides
              </h2>
            </div>
            <button
              onClick={() => navigate('/blog')}
              className="text-xs font-semibold text-forest-800 hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.slice(0, 3).map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>

        {/* Final Back to Blog Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Blog Articles</span>
          </button>
        </div>
      </div>
    </article>
  );
};
