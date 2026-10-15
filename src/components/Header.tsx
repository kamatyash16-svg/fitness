import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Search, Menu, X, Trophy, TableProperties, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Olympics', path: '/india-at-olympics/' },
    { label: 'Asian Games', path: '/india-at-asian-games-2023/' },
    { label: 'Cricket', path: '/indian-cricket-news/' },
    { label: 'Badminton', path: '/india-badminton-lakshya-sen/' },
    { label: 'Hockey', path: '/indian-hockey-achievements/' },
    { label: 'Athletics', path: '/indian-athletics-achievements/' },
    { label: 'SEO Table', path: '/seo-table/' }
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 gap-6">
          
          {/* Brand Logo & Tricolor Motif */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
            aria-label="India Sports Hub Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center relative overflow-hidden shadow-xs group-hover:scale-102 transition-transform">
              {/* Subtle tricolor top and bottom bars */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF9933]" />
              <Trophy className="w-5 h-5 text-amber-400 mt-0.5" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#138808]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-950 group-hover:text-blue-900 transition-colors">
                India<span className="text-blue-700">Sports</span><span className="text-amber-600">Hub</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 -mt-1">
                Olympic Medals · Schedules · Star Heroes
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 ${
                    active ? 'text-blue-800 font-bold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick SEO Rubric button */}
            <button
              onClick={() => handleLinkClick('/seo-table/')}
              aria-label="View SEO Assignment Keyword Table"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg transition-colors whitespace-nowrap"
            >
              <TableProperties className="w-3.5 h-3.5 text-amber-700" />
              <span>Assignment SEO Table</span>
            </button>

            {/* Search Input trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search all 10 sports articles and records"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 rounded-lg transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Search Indian sports...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
                /
              </kbd>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                    active
                      ? 'bg-blue-50 text-blue-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => handleLinkClick('/seo-table/')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-xl"
            >
              <TableProperties className="w-4 h-4 text-amber-700" />
              <span>Open Master SEO Keyword Mapping Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
