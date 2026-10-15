import React, { createContext, useContext, useState, useEffect } from 'react';
import { SPORTS_ARTICLES, BASE_CANONICAL_URL } from '../data/sportsArticles';
import { SportsArticle, SportsCategory } from '../types/sports';

export type RouteType =
  | { name: 'home' }
  | { name: 'article'; article: SportsArticle }
  | { name: 'category'; category: SportsCategory }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'seo-table' }
  | { name: '404' };

interface RouterContextType {
  route: RouteType;
  currentPath: string;
  navigate: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function normalizePath(rawPath: string): string {
  // If hash is used (e.g. #/india-at-olympics/), extract it
  let clean = rawPath;
  if (clean.includes('#')) {
    clean = clean.split('#')[1] || '/';
  }
  // Remove query params
  clean = clean.split('?')[0];
  // Ensure leading slash
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }
  return clean;
}

function resolveRoute(pathname: string): { route: RouteType; normalizedPath: string } {
  const path = normalizePath(pathname);

  // Exact home
  if (path === '/' || path === '') {
    return { route: { name: 'home' }, normalizedPath: '/' };
  }

  // Exact static routes
  if (path === '/about' || path === '/about/') {
    return { route: { name: 'about' }, normalizedPath: '/about/' };
  }
  if (path === '/contact' || path === '/contact/') {
    return { route: { name: 'contact' }, normalizedPath: '/contact/' };
  }
  if (path === '/seo-table' || path === '/seo-table/') {
    return { route: { name: 'seo-table' }, normalizedPath: '/seo-table/' };
  }

  // Check category paths: /category/cricket/ or /category/olympics/
  if (path.startsWith('/category/')) {
    const rawCat = path.replace('/category/', '').replace(/\/$/, '').toLowerCase();
    const catMap: Record<string, SportsCategory> = {
      olympics: 'Olympics',
      'asian-games': 'Asian Games',
      cricket: 'Cricket',
      badminton: 'Badminton',
      hockey: 'Hockey',
      athletics: 'Athletics',
      records: 'Records'
    };
    const matched = catMap[rawCat];
    if (matched) {
      return { route: { name: 'category', category: matched }, normalizedPath: `/category/${rawCat}/` };
    }
  }

  // Check clean article slugs: /india-at-olympics/ or /india-at-asian-games-2023/
  // Also strip any leading '/article/' for backwards compatibility
  const slugCandidate = path.replace(/^\/article\//, '').replace(/^\//, '').replace(/\/$/, '');
  const foundArticle = SPORTS_ARTICLES.find(
    (a) => a.slug === slugCandidate || a.urlPath === path || a.urlPath === path + '/'
  );

  if (foundArticle) {
    return { route: { name: 'article', article: foundArticle }, normalizedPath: foundArticle.urlPath };
  }

  return { route: { name: '404' }, normalizedPath: path };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : window.location.pathname;
  });
  const [route, setRoute] = useState<RouteType>(() => resolveRoute(currentPath).route);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = (toPath: string) => {
    const { route: nextRoute, normalizedPath } = resolveRoute(toPath);
    setRoute(nextRoute);
    setCurrentPath(normalizedPath);

    // Update browser URL via history.pushState for clean URLs on Vercel
    try {
      window.history.pushState(null, '', normalizedPath);
    } catch {
      // Fallback for strict iframe sandboxes
      window.location.hash = normalizedPath;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync on browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const activePath = window.location.hash
        ? window.location.hash.replace('#', '')
        : window.location.pathname;
      const { route: nextRoute, normalizedPath } = resolveRoute(activePath);
      setRoute(nextRoute);
      setCurrentPath(normalizedPath);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update Dynamic SEO Meta Tags, Canonical Link, and Schema.org JSON-LD
  useEffect(() => {
    let title = 'India Sports Hub: Olympic Medals, Schedules & Star Heroes';
    let description =
      'Comprehensive Indian sport news hub tracking Indian sports achievements, Olympic schedules, medal tallies, and star heroes across Indian sports cricket and games.';
    let canonical = `${BASE_CANONICAL_URL}/`;
    let ogType = 'website';
    let schemaJson: any = null;

    if (route.name === 'article') {
      const art = route.article;
      title = art.seoTitle;
      description = art.metaDescription;
      canonical = art.canonicalUrl;
      ogType = 'article';

      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'SportsArticle',
        headline: art.h1,
        name: art.title,
        description: art.metaDescription,
        url: art.canonicalUrl,
        image: `${BASE_CANONICAL_URL}${art.heroImage}`,
        datePublished: art.publishedDate,
        dateModified: art.updatedDate,
        author: {
          '@type': 'Person',
          name: art.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'India Sports Hub',
          url: BASE_CANONICAL_URL
        },
        keywords: [art.mainKeyword, art.relatedKeyword1, art.relatedKeyword2].join(', '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': art.canonicalUrl
        }
      };

      // If AEO questions are present, add FAQPage structured data
      if (art.aeoQuestions && art.aeoQuestions.length > 0) {
        const faqJson = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: art.aeoQuestions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.directAnswer
            }
          }))
        };
        schemaJson = [schemaJson, faqJson];
      }
    } else if (route.name === 'category') {
      title = `${route.category} News & Records | India Sports Hub`;
      description = `Read complete coverage of Indian ${route.category.toLowerCase()} achievements, match schedules, tournament updates, and star athlete milestones.`;
      canonical = `${BASE_CANONICAL_URL}/category/${route.category.toLowerCase().replace(' ', '-')}/`;
    } else if (route.name === 'about') {
      title = 'About Us & Editorial Standards | India Sports Hub';
      description = 'Learn about India Sports Hub, our sports journalism mission, verified factual sports reporting, and SEO project academic credentials.';
      canonical = `${BASE_CANONICAL_URL}/about/`;
    } else if (route.name === 'contact') {
      title = 'Contact Editorial Desk | India Sports Hub';
      description = 'Get in touch with the India Sports Hub editorial team for media inquiries, sports citations, and feedback.';
      canonical = `${BASE_CANONICAL_URL}/contact/`;
    } else if (route.name === 'seo-table') {
      title = 'Master SEO Keyword Mapping Table | India Sports Hub';
      description = 'Complete page-by-page SEO keyword mapping, meta tags, H1 headings, and image alt text for India Sports Hub.';
      canonical = `${BASE_CANONICAL_URL}/seo-table/`;
    }

    // Set document title
    document.title = title;

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    }

    // Set OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);

    // Update dynamic JSON-LD in DOM
    const existingScript = document.getElementById('dynamic-schema-ld');
    if (existingScript) {
      existingScript.remove();
    }
    if (schemaJson) {
      const script = document.createElement('script');
      script.id = 'dynamic-schema-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }
  }, [route]);

  return (
    <RouterContext.Provider
      value={{
        route,
        currentPath,
        navigate,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
};
