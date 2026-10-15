import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageRoute =
  | { type: 'home' }
  | { type: 'blog'; category?: string; query?: string }
  | { type: 'article'; slug: string }
  | { type: 'workouts' }
  | { type: 'nutrition' }
  | { type: 'wellness' }
  | { type: 'about' }
  | { type: 'contact' };

interface RouterContextType {
  route: PageRoute;
  navigate: (path: string) => void;
  navigateToArticle: (slug: string) => void;
  navigateToCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<PageRoute>(() => parsePath(window.location.pathname + window.location.hash));
  const [searchQuery, setSearchQuery] = useState<string>('');

  function parsePath(fullPath: string): PageRoute {
    // Check hash first (for iframe/preview friendliness)
    const hash = window.location.hash.replace('#', '');
    const path = hash || window.location.pathname;

    if (path.startsWith('/article/')) {
      const slug = path.replace('/article/', '').split('?')[0];
      return { type: 'article', slug };
    }
    if (path === '/blog' || path.startsWith('/blog/')) {
      return { type: 'blog' };
    }
    if (path === '/workouts') {
      return { type: 'workouts' };
    }
    if (path === '/nutrition') {
      return { type: 'nutrition' };
    }
    if (path === '/wellness') {
      return { type: 'wellness' };
    }
    if (path === '/about') {
      return { type: 'about' };
    }
    if (path === '/contact') {
      return { type: 'contact' };
    }
    return { type: 'home' };
  }

  const navigate = (path: string) => {
    // Update hash for seamless preview hosting without 404 on refresh
    window.location.hash = path.startsWith('/') ? path : `/${path}`;
    const newRoute = parsePath(path);
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  const navigateToCategory = (category: string) => {
    if (category === 'Fitness and Workouts' || category === 'Beginner Fitness') {
      navigate('/workouts');
    } else if (category === 'Healthy Nutrition') {
      navigate('/nutrition');
    } else if (category === 'Recovery and Sleep' || category === 'Everyday Wellness' || category === 'Weight Management') {
      navigate('/wellness');
    } else {
      navigate('/blog');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname + window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <RouterContext.Provider
      value={{
        route,
        navigate,
        navigateToArticle,
        navigateToCategory,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
