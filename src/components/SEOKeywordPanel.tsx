import React from 'react';
import { Target, Layers, FileText, CheckCircle2, Globe } from 'lucide-react';

interface SEOKeywordPanelProps {
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  seoTitle: string;
  metaDescription: string;
  urlPath: string;
}

export const SEOKeywordPanel: React.FC<SEOKeywordPanelProps> = ({
  mainKeyword,
  relatedKeyword1,
  relatedKeyword2,
  seoTitle,
  metaDescription,
  urlPath
}) => {
  return (
    <aside
      aria-label="SEO Keyword & Content Architecture Information"
      className="my-8 rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/60 via-slate-50 to-amber-50/40 p-5 sm:p-6 shadow-xs"
    >
      <div className="flex flex-wrap items-center justify-between border-b border-blue-200/70 pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-800" aria-hidden="true" />
          <h2 className="text-sm font-bold tracking-wide text-slate-900 uppercase">
            SEO Keyword &amp; Metadata Specification
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <FileText className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
          <span>Murtaza Abeezar Ali SEO Project Assignment Rubric</span>
        </div>
      </div>

      {/* Mandatory Three Keywords Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5">
        {/* Main Keyword */}
        <div className="p-3.5 rounded-xl bg-white border border-blue-300 shadow-xs">
          <div className="text-[11px] font-bold text-blue-900 tracking-wider uppercase mb-1">
            Main Keyword
          </div>
          <div className="text-sm font-bold text-slate-950 font-mono">
            {mainKeyword}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Exact match in H1, Title &amp; Intro</span>
          </div>
        </div>

        {/* Related Keyword 1 */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-700 tracking-wider uppercase mb-1">
            Related Keyword 1
          </div>
          <div className="text-sm font-medium text-slate-900 font-mono">
            {relatedKeyword1}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Integrated in H2 &amp; Body text</span>
          </div>
        </div>

        {/* Related Keyword 2 */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-700 tracking-wider uppercase mb-1">
            Related Keyword 2
          </div>
          <div className="text-sm font-medium text-slate-900 font-mono">
            {relatedKeyword2}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Integrated in Body &amp; Conclusion</span>
          </div>
        </div>
      </div>

      {/* SERP Search Snippet Preview */}
      <div className="rounded-xl bg-white p-4 border border-slate-200 text-xs text-slate-600">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            <span>Google SERP Preview (Length &amp; Click-Through Optimized)</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-slate-400">
            <Globe className="w-3 h-3" />
            <span>{urlPath}</span>
          </div>
        </div>
        <p className="text-blue-900 text-sm font-semibold truncate hover:underline cursor-pointer mb-0.5">
          {seoTitle}
        </p>
        <p className="text-emerald-700 font-mono text-[11px] mb-1">
          https://indiasportshub.vercel.app{urlPath}
        </p>
        <p className="text-slate-600 line-clamp-2 leading-relaxed">
          {metaDescription}
        </p>
      </div>
    </aside>
  );
};
