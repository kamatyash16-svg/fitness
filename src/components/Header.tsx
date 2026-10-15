import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Search, Menu, X, Activity, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { route, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Workouts', path: '/workouts' },
    { label: 'Nutrition', path: '/nutrition' },
    { label: 'Wellness', path: '/wellness' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isCurrentActive = (path: string) => {
    if (path === '/' && route.type === 'home') return true;
    if (path === '/blog' && route.type === 'blog') return true;
    if (path === '/workouts' && route.type === 'workouts') return true;
    if (path === '/nutrition' && route.type === 'nutrition') return true;
    if (path === '/wellness' && route.type === 'wellness') return true;
    if (path === '/about' && route.type === 'about') return true;
    if (path === '/contact' && route.type === 'contact') return true;
    return false;
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          
          {/* Zone 1: Brand Wordmark & Abstract Fitness/Leaf Icon */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
            aria-label="FitLife Journal Homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-xs group-hover:bg-forest-900 transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-lime-300"
              >
                {/* Stylized leaf & movement curve */}
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-forest-800 transition-colors">
                FitLife<span className="text-forest-700">Journal</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 ${
                    active ? 'text-forest-800 font-semibold' : 'text-stone-600'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search & Mobile Hamburger) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles and keywords"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 rounded-lg transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Search articles...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-stone-200 rounded text-stone-400">
                /
              </kbd>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    active
                      ? 'bg-forest-50 text-forest-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <Search className="w-4 h-4 text-stone-500" />
              <span>Search All 10 Articles</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
