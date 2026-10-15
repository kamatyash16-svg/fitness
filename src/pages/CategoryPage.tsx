import React from 'react';
import { Article } from '../types/blog';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { useRouter } from '../context/RouterContext';
import { Dumbbell, Apple, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CategoryPageProps {
  pageType: 'workouts' | 'nutrition' | 'wellness';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ pageType }) => {
  const { navigate } = useRouter();

  const configs = {
    workouts: {
      title: 'Workout Guides & Movement Fundamentals',
      subtitle: 'Build functional strength, aerobic stamina, and joint mobility with sustainable beginner routines.',
      icon: Dumbbell,
      categories: ['Fitness and Workouts', 'Beginner Fitness', 'Everyday Wellness'],
      matchingSlugs: [
        'beginner-workout-plan-how-to-start-exercising',
        'strength-training-for-beginners-exercises-and-benefits',
        'cardio-workouts-at-home-easy-exercises-to-get-moving',
        'how-to-build-a-consistent-fitness-routine',
        'stretching-for-beginners-simple-stretches-for-everyday-movement'
      ],
      corePrinciples: [
        'Neuromuscular adaptation precedes heavy progressive resistance',
        'Master the 5 fundamental movement patterns: squat, hinge, push, pull, core',
        'Low-impact home cardio provides identical cardiovascular health benefits without joint strain',
        'Rest and sleep are non-negotiable for muscular protein rebuilding'
      ]
    },
    nutrition: {
      title: 'Nutrition Guides & Balanced Fueling',
      subtitle: 'Evidence-informed nutrition principles, whole-food protein sources, and optimal hydration strategies.',
      icon: Apple,
      categories: ['Healthy Nutrition', 'Weight Management'],
      matchingSlugs: [
        'healthy-eating-for-beginners-guide-to-balanced-nutrition',
        'protein-rich-foods-everyday-options-for-balanced-diet',
        'hydration-and-exercise-why-drinking-water-matters',
        'healthy-weight-management-sustainable-habits-that-help'
      ],
      corePrinciples: [
        'The visual plate method: 1/2 vegetables, 1/4 protein, 1/4 whole grains',
        'Prioritize 20 to 35 grams of protein per meal for satiety and tissue maintenance',
        'Hydrate with pure water before workouts to avoid cardiovascular drift',
        'Embrace 80/20 balance over restrictive, short-lived diet fads'
      ]
    },
    wellness: {
      title: 'Everyday Wellness, Sleep & Recovery',
      subtitle: 'Restorative sleep habits, daily habit formation, and stress management for lifelong physical health.',
      icon: Sparkles,
      categories: ['Recovery and Sleep', 'Everyday Wellness', 'Weight Management'],
      matchingSlugs: [
        'better-sleep-and-fitness-how-rest-supports-your-goals',
        'healthy-weight-management-sustainable-habits-that-help',
        'stretching-for-beginners-simple-stretches-for-everyday-movement',
        'how-to-build-a-consistent-fitness-routine'
      ],
      corePrinciples: [
        'Deep slow-wave sleep secretes over 70% of human growth hormone',
        'Gentle desk mobility reduces sedentary spinal compression',
        'Sustainable weight balance depends on lifestyle habits, not starvation',
        'Practice daily nasal breathing to balance autonomic nervous system tone'
      ]
    }
  };

  const current = configs[pageType];
  const Icon = current.icon;

  const filteredArticles = ARTICLES.filter((art) =>
    current.matchingSlugs.includes(art.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-forest-900 text-white p-8 sm:p-12 mb-12 border border-forest-800 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800/80 text-lime-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-lime-400/20">
            <Icon className="w-3.5 h-3.5" />
            <span>Dedicated Learning Track</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white mb-3 text-balance">
            {current.title}
          </h1>
          <p className="text-stone-200 text-base sm:text-lg leading-relaxed mb-6">
            {current.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-forest-200">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              Evidence-Informed
            </span>
            <span aria-hidden="true" className="text-forest-600">·</span>
            <span>{filteredArticles.length} Complete Educational Articles</span>
          </div>
        </div>
      </div>

      {/* Core Principles Strip */}
      <div className="mb-12 rounded-2xl bg-white border border-stone-200 p-6 sm:p-8">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-forest-700" />
          <span>Core Educational Pillars</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-sm text-stone-700">
          {current.corePrinciples.map((principle, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-forest-700 font-bold text-xs mt-0.5">●</span>
              <span className="leading-relaxed">{principle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Articles in This Track ({filteredArticles.length})
          </h2>
          <button
            onClick={() => navigate('/blog')}
            className="text-xs font-semibold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            <span>View all articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </div>
    </div>
  );
};
