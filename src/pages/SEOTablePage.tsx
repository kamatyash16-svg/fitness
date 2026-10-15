import React from 'react';
import { SPORTS_ARTICLES } from '../data/sportsArticles';
import { useRouter } from '../context/RouterContext';
import { TableProperties, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SEOTablePage: React.FC = () => {
  const { navigate } = useRouter();

  const allPages = [
    {
      pageName: 'Homepage',
      url: '/',
      titleTag: 'India Sports Hub: Olympic Medals, Schedules & Star Heroes',
      primaryKeyword: 'Indian sport news',
      relatedKeyword1: 'Indian sports achievements',
      relatedKeyword2: 'Indian sports cricket',
      h1: 'India Sports Hub: Championing Indian Sports Achievements and Heroes',
      metaDescription:
        'Comprehensive Indian sport news hub tracking Indian sports achievements, Olympic schedules, medal tallies, and star heroes across Indian sports cricket and games.',
      imageAlt:
        'Indian athletes celebrating an international tournament victory in blue jerseys with national tricolor flag'
    },
    ...SPORTS_ARTICLES.map((art) => ({
      pageName: `Article: ${art.title}`,
      url: art.urlPath,
      titleTag: art.seoTitle,
      primaryKeyword: art.mainKeyword,
      relatedKeyword1: art.relatedKeyword1,
      relatedKeyword2: art.relatedKeyword2,
      h1: art.h1,
      metaDescription: art.metaDescription,
      imageAlt: art.heroImageAlt
    }))
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          <TableProperties className="w-3.5 h-3.5 text-amber-700" />
          <span>Academic Assignment Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
          Master Page-by-Page SEO Keyword Mapping Table
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Comprehensive SEO architecture table for <strong>Murtaza Abeezar Ali SEO Project Final</strong>. Every page targets a distinct search intent, includes exact primary and related keywords, custom title tags, unique meta descriptions, and accessible image alt text.
        </p>
      </div>

      {/* Compliance Overview Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>11 Unique Clean URLs</span>
          </div>
          <p className="text-xs text-slate-500">
            Homepage + 10 dedicated article routes with zero duplicates.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Exact Keywords Mapped</span>
          </div>
          <p className="text-xs text-slate-500">
            Homepage and first 3 articles strictly match assignment table.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>AEO Q&amp;A Formatted</span>
          </div>
          <p className="text-xs text-slate-500">
            At least 2 question-format H2 headings with direct answers.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Images Under 100 KB</span>
          </div>
          <p className="text-xs text-slate-500">
            WebP/SVG optimized assets for Core Web Vitals speed.
          </p>
        </div>
      </div>

      {/* Responsive Master Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white font-bold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3.5 whitespace-nowrap">Page &amp; Clean URL</th>
              <th className="px-4 py-3.5 whitespace-nowrap">SEO Title Tag (50–60 chars)</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Primary Keyword</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Related Keywords</th>
              <th className="px-4 py-3.5 whitespace-nowrap">H1 Heading</th>
              <th className="px-4 py-3.5 min-w-[280px]">Meta Description (150–160 chars)</th>
              <th className="px-4 py-3.5 min-w-[240px]">Image Alt Text</th>
              <th className="px-4 py-3.5 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-sans">
            {allPages.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-bold text-slate-900">{row.pageName}</div>
                  <div className="font-mono text-[11px] text-blue-700">{row.url}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900 max-w-[200px]">
                  {row.titleTag}
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    ({row.titleTag.length} chars)
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-mono font-bold text-blue-900 bg-blue-50/50">
                  {row.primaryKeyword}
                </td>
                <td className="px-4 py-3 text-[11px] text-slate-700 space-y-1 font-mono">
                  <div className="text-slate-900">• {row.relatedKeyword1}</div>
                  <div className="text-slate-900">• {row.relatedKeyword2}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-800 max-w-[220px]">
                  {row.h1}
                </td>
                <td className="px-4 py-3 text-slate-600 leading-relaxed text-[11px]">
                  {row.metaDescription}
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    ({row.metaDescription.length} chars)
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 text-[11px] italic">
                  "{row.imageAlt}"
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => navigate(row.url)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 font-bold hover:bg-blue-100 transition-colors text-[11px]"
                  >
                    <span>View Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
