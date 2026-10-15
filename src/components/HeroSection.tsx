import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { ArrowRight, Sparkles, BookOpen, Dumbbell, ShieldCheck, ImageOff } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();
  const [imgError, setImgError] = useState(false);

  return (
    <section aria-label="Welcome to FitLife Journal" className="relative mb-14 sm:mb-18">
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
        {/* Background Image with Fallback and Scrim */}
        <div className="absolute inset-0 z-0">
          {!imgError ? (
            <img
              src="/images/hero_fitness_outdoor_1792029497983.jpg"
              alt="An athletic runner jogging along a scenic green park trail at golden hour sunrise"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-forest-950 via-forest-900 to-stone-900 flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-forest-700" />
            </div>
          )}
          {/* Measured multi-stop gradient scrim to ensure WCAG AA 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/45 sm:bg-gradient-to-r sm:from-stone-950/95 sm:via-stone-950/80 sm:to-stone-950/30" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-20 lg:py-24 lg:px-16 max-w-3xl">
          {/* Unboxed Kicker (anti-pill discipline) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>FitLife Journal · Move Better. Eat Better. Live Better.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5 text-balance">
            Your Journey to a Healthier, Fitter You Starts Here.
          </h1>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed mb-8 max-w-2xl">
            Discover practical workout guides, balanced nutrition tips, and simple habits to help you build a healthier lifestyle.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-3.5 rounded-xl bg-forest-700 text-white font-semibold text-sm hover:bg-forest-600 active:scale-98 transition-all flex items-center gap-2 shadow-lg shadow-forest-950/30 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/workouts')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs border border-white/20 active:scale-98 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Dumbbell className="w-4 h-4 text-lime-300" />
              <span>Discover Workout Guides</span>
            </button>
          </div>

          {/* Trust proof indicators (clean unboxed text with tabular dots) */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              Evidence-Informed Principles
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>10 Complete In-Depth Guides</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Zero Extreme Crash Diets</span>
          </div>
        </div>
      </div>
    </section>
  );
};
