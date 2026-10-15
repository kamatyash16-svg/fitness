import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Dumbbell, Apple, Scale, Compass, Moon, Sparkles, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface CategoryBrowseProps {
  onSelectCategory?: (category: string) => void;
}

export const CategoryBrowse: React.FC<CategoryBrowseProps> = ({ onSelectCategory }) => {
  const { navigate, navigateToCategory } = useRouter();

  const categories = [
    {
      name: 'Fitness and Workouts',
      description: 'Strength fundamentals, home cardio, progressive resistance, and movement mechanics.',
      icon: Dumbbell,
      path: '/workouts',
      accentColor: 'border-emerald-200 hover:border-emerald-700 bg-white'
    },
    {
      name: 'Healthy Nutrition',
      description: 'Balanced macronutrients, whole foods, protein-rich staples, and smart hydration.',
      icon: Apple,
      path: '/nutrition',
      accentColor: 'border-emerald-200 hover:border-emerald-700 bg-white'
    },
    {
      name: 'Weight Management',
      description: 'Sustainable metabolic habits, mindful eating, non-exercise activity, and body trust.',
      icon: Scale,
      path: '/wellness',
      accentColor: 'border-emerald-200 hover:border-emerald-700 bg-white'
    },
    {
      name: 'Beginner Fitness',
      description: 'Confidence-building routines, the 5 movement patterns, and frictionless exercise habits.',
      icon: Compass,
      path: '/workouts',
      accentColor: 'border-emerald-200 hover:border-emerald-700 bg-white'
    },
    {
      name: 'Recovery and Sleep',
      description: 'Slow-wave sleep architecture, active recovery protocols, and stress regulation.',
      icon: Moon,
      path: '/wellness',
      accentColor: 'border-emerald-200 hover:border-emerald-700 bg-white'
    },
    {
      name: 'Everyday Wellness',
      description: 'Mobility routines, desk stretches, nasal breathing, and long-term vitality.',
      icon: Sparkles,
      path: '/wellness',
      accentColor: 'border-emerald-200 hover:border-emerald-700 bg-white'
    }
  ];

  const getArticleCount = (catName: string) => {
    return ARTICLES.filter((a) => a.category === catName).length;
  };

  const handleCategoryClick = (categoryName: string, path: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    } else {
      navigateToCategory(categoryName);
    }
  };

  return (
    <section aria-labelledby="browse-categories-heading" className="my-14 sm:my-18">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <span className="text-xs uppercase font-semibold text-emerald-800 tracking-wider">
            Explore Topics
          </span>
          <h2
            id="browse-categories-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 mt-1"
          >
            Browse by Health & Fitness Category
          </h2>
        </div>
        <button
          onClick={() => navigate('/blog')}
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 shrink-0 group"
        >
          <span>View all topics</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const count = getArticleCount(cat.name);
          return (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name, cat.path)}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:border-emerald-700 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-forest-50 text-forest-800 group-hover:bg-forest-800 group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-stone-400">
                    {count} {count === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-emerald-800">
                <span>Browse category</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
