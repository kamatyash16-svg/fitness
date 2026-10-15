export type SportsCategory =
  | 'Olympics'
  | 'Asian Games'
  | 'Cricket'
  | 'Badminton'
  | 'Hockey'
  | 'Athletics'
  | 'Records';

export interface ExternalSource {
  title: string;
  url: string;
  publisher: string;
}

export interface AEOQuestion {
  question: string;
  directAnswer: string;
  expandedDetails: string[];
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string[];
  checklist?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: 'fact' | 'record' | 'source';
    text: string;
  };
}

export interface SportsArticle {
  id: string;
  slug: string;
  urlPath: string; // e.g., '/india-at-olympics/'
  title: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  h1: string;

  // Exact Keyword Mapping Table
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;

  category: SportsCategory;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;

  heroImage: string;
  heroImageAlt: string;
  featured?: boolean;

  excerpt: string;
  intro: string[];

  // Answer Engine Optimization (AEO) Questions with Direct Answers
  aeoQuestions: AEOQuestion[];

  sections: ArticleSection[];
  conclusion: string;
  takeawayHighlights: string[];

  // Internal and External Linking Architecture
  relatedArticleSlugs: string[];
  officialSources: ExternalSource[];
}
