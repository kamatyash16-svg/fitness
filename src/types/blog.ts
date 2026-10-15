export type Category =
  | 'Fitness and Workouts'
  | 'Healthy Nutrition'
  | 'Weight Management'
  | 'Beginner Fitness'
  | 'Recovery and Sleep'
  | 'Everyday Wellness';

export interface ArticleSection {
  id: string;
  heading: string;
  content: string[];
  checklist?: string[];
  callout?: {
    type: 'tip' | 'info' | 'caution';
    text: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: Category;
  author: string;
  publishedDate: string;
  readingTime: string;
  heroImage: string;
  heroImageAlt: string;
  featured?: boolean;
  
  // SEO Requirements
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;

  // Article Content
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  conclusion: string;
  takeawayChecklist: string[];
  relatedArticleSlugs: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
