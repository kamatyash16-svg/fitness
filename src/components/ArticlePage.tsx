import React, { useState } from 'react';
import { SportsArticle } from '../types/sports';
import { SPORTS_ARTICLES } from '../data/sportsArticles';
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
  ExternalLink,
  HelpCircle,
  Award,
  Layers,
  ImageOff
} from 'lucide-react';

interface ArticlePageProps {
  article: SportsArticle;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyLink = () => {
    const fullUrl = `https://indiasportshub.vercel.app${article.urlPath}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} | India Sports Hub`);
    const url = encodeURIComponent(`https://indiasportshub.vercel.app${article.urlPath}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(`https://indiasportshub.vercel.app${article.urlPath}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const relatedArticles = SPORTS_ARTICLES.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  return (
    <article className="min-h-screen bg-slate-50/60 pb-20">
      {/* Breadcrumb Navigation (Technical SEO & Accessibility) */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200/80 bg-white py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <li>
              <button
                onClick={() => navigate('/')}
                className="hover:text-blue-900 font-medium transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            <li>
              <button
                onClick={() => navigate(`/category/${article.category.toLowerCase().replace(' ', '-')}/`)}
                className="hover:text-blue-900 font-medium transition-colors"
              >
                {article.category}
              </button>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            <li className="text-slate-900 font-bold truncate max-w-[220px] sm:max-w-xs" aria-current="page">
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-900 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home &amp; All Indian Sports Guides</span>
        </button>

        {/* Article Header */}
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{article.category}</span>
          </div>

          {/* Exactly ONE clear H1 heading per page (Requirement 3) */}
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4 text-balance">
            {article.h1}
          </h1>

          {/* Author, Dates, Reading Time */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pb-5 border-b border-slate-200">
            <span className="flex items-center gap-1.5 font-bold text-slate-800">
              <User className="w-3.5 h-3.5 text-blue-700" />
              {article.author}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Published: {article.publishedDate}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readingTime}
            </span>
          </div>
        </header>

        {/* Featured Hero Image (Compressed WebP/SVG under 100KB with descriptive alt text) */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8 bg-slate-900">
          {!imgError ? (
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              loading="eager"
              width="800"
              height="500"
              onError={() => setImgError(true)}
              className="w-full h-auto max-h-[460px] object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-900 text-slate-400">
              <ImageOff className="w-10 h-10 mb-2 text-slate-600" />
              <p className="text-sm font-medium text-slate-300">{article.heroImageAlt}</p>
            </div>
          )}
          <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-600 italic">
            Photo/Illustration: {article.heroImageAlt}
          </div>
        </div>

        {/* Mandatory Dedicated SEO Keyword Information Panel (Requirement 2 & 5) */}
        <SEOKeywordPanel
          mainKeyword={article.mainKeyword}
          relatedKeyword1={article.relatedKeyword1}
          relatedKeyword2={article.relatedKeyword2}
          seoTitle={article.seoTitle}
          metaDescription={article.metaDescription}
          urlPath={article.urlPath}
        />

        {/* Introduction */}
        <div className="prose prose-slate max-w-none mb-10">
          {article.intro.map((p, idx) => (
            <p
              key={idx}
              className={`text-base sm:text-lg text-slate-800 leading-relaxed mb-4 ${
                idx === 0
                  ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-blue-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1'
                  : ''
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        {/* AEO: Question-and-Answer Content Section (Requirement 5) */}
        <section
          aria-label="Direct Answer Engine Optimization Q&A Section"
          className="my-10 rounded-2xl bg-amber-50/70 border border-amber-200/90 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-5">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Answer Engine Optimization (AEO) · Direct Q&amp;A Highlights</span>
          </div>

          <div className="space-y-6">
            {article.aeoQuestions.map((aeo, qIdx) => (
              <div key={qIdx} className="bg-white rounded-xl p-5 border border-amber-200/70 shadow-xs">
                {/* Question-format H2 heading */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3 flex items-start gap-2">
                  <span className="text-amber-600 font-extrabold text-lg sm:text-xl">Q:</span>
                  <span>{aeo.question}</span>
                </h2>

                {/* Direct concise answer immediately beneath question */}
                <div className="p-3.5 rounded-lg bg-blue-50/80 border-l-4 border-blue-700 text-sm font-semibold text-blue-950 mb-3 leading-relaxed">
                  <span className="text-blue-900 font-bold block text-xs uppercase mb-1">
                    Direct Answer:
                  </span>
                  {aeo.directAnswer}
                </div>

                {/* Expanded factual details */}
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-2">
                  {aeo.expandedDetails.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-blue-700 font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* In-Depth H2 & H3 Sections */}
        <div className="space-y-12">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="border-b border-slate-200 pb-10">
              <h2 className="text-2xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-4">
                {section.heading}
              </h2>

              <div className="space-y-4 text-slate-800 leading-relaxed text-base">
                {section.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Data Table if applicable */}
              {section.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-2.5 whitespace-nowrap font-medium text-slate-700">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Callout */}
              {section.callout && (
                <div className="mt-5 rounded-xl p-4 bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider text-[11px] block mb-0.5 text-slate-900">
                        Historical Fact &amp; Record
                      </span>
                      <span>{section.callout.text}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <section className="my-10 pt-4">
          <h2 className="text-2xl font-bold text-slate-950 mb-3">
            Summary &amp; Future Outlook
          </h2>
          <p className="text-base text-slate-800 leading-relaxed mb-6">
            {article.conclusion}
          </p>

          {/* Key Takeaways */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
            <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-700" />
              Key Statistical Highlights
            </h3>
            <ul className="space-y-2 text-sm text-slate-800">
              {article.takeawayHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="rounded-full bg-blue-200 text-blue-900 w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Credible External Sources (Requirement 4 & 7) */}
        {article.officialSources && article.officialSources.length > 0 && (
          <section className="my-8 rounded-xl bg-slate-100/90 border border-slate-200 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Official &amp; Verified Authoritative Sources</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {article.officialSources.map((source, sIdx) => (
                <li key={sIdx} className="flex items-center justify-between">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:text-blue-950 hover:underline flex items-center gap-1.5 font-medium"
                  >
                    <span>{source.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {source.publisher}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Share Section */}
        <div className="my-8 py-4 border-y border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Share This Guide</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <span>Copy URL</span>
              )}
            </button>
            <button
              onClick={handleShareTwitter}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Share on 𝕏
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              LinkedIn
            </button>
          </div>
        </div>

        {/* Contextual Related Articles Grid (Internal Links Requirement 7) */}
        <section aria-labelledby="related-articles-heading" className="mt-14 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-blue-800 tracking-wider">
                Internal Links
              </span>
              <h2 id="related-articles-heading" className="text-2xl font-bold text-slate-950 mt-1">
                Related Indian Sports Articles
              </h2>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-xs font-bold text-blue-800 hover:underline"
            >
              Browse All 10 Articles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.slice(0, 3).map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>

        {/* Back to Home CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to India Sports Hub Homepage</span>
          </button>
        </div>
      </div>
    </article>
  );
};
