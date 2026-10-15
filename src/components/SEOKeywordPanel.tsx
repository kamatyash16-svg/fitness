import React from 'react';
import { Target, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface SEOKeywordPanelProps {
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  seoTitle: string;
  metaDescription: string;
  readingTime: string;
}

export const SEOKeywordPanel: React.FC<SEOKeywordPanelProps> = ({
  mainKeyword,
  relatedKeyword1,
  relatedKeyword2,
  seoTitle,
  metaDescription,
  readingTime
}) => {
  return (
    <aside
      aria-label="SEO Keyword & Content Architecture Information"
      className="my-8 rounded-xl border border-stone-200 bg-stone-50/80 p-5 md:p-6 shadow-xs"
    >
      <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-800" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-wide text-stone-900 uppercase">
            SEO Keyword Information
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Curated for Academic SEO & Content Marketing</span>
        </div>
      </div>

      {/* Mandatory Three Keywords Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="p-3.5 rounded-lg bg-white border border-stone-200">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-1">
            Main Keyword
          </div>
          <div className="text-sm font-medium text-stone-900 font-mono">
            {mainKeyword}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Target H1, URL, Intro & Meta</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-stone-200">
          <div className="text-xs font-semibold text-stone-700 tracking-wide uppercase mb-1">
            Related Keyword 1
          </div>
          <div className="text-sm font-medium text-stone-900 font-mono">
            {relatedKeyword1}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Integrated in Article Body</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-white border border-stone-200">
          <div className="text-xs font-semibold text-stone-700 tracking-wide uppercase mb-1">
            Related Keyword 2
          </div>
          <div className="text-sm font-medium text-stone-900 font-mono">
            {relatedKeyword2}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Integrated in Article Body</span>
          </div>
        </div>
      </div>

      {/* Snippet Preview for Search Engines */}
      <div className="rounded-lg bg-white p-3.5 border border-stone-200 text-xs text-stone-600">
        <div className="flex items-center gap-1.5 font-medium text-stone-700 mb-1.5">
          <Layers className="w-3.5 h-3.5 text-stone-500" />
          <span>SERP Snippet & Metadata Reference</span>
        </div>
        <p className="text-emerald-800 font-medium truncate mb-0.5">
          {seoTitle}
        </p>
        <p className="text-stone-500 line-clamp-2 leading-relaxed">
          {metaDescription}
        </p>
      </div>
    </aside>
  );
};
