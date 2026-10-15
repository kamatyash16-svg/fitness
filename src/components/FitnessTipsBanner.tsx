import React from 'react';
import { Footprints, Salad, Moon, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const FitnessTipsBanner: React.FC = () => {
  const { navigate } = useRouter();

  const tips = [
    {
      icon: Footprints,
      number: '01',
      title: 'The 10-Minute Post-Meal Stroll',
      description:
        'Walking briskly for just 10 minutes following lunch or dinner blunts postprandial glucose spikes by up to 22% and aids natural gastric digestion.',
      linkPath: '/workouts',
      linkLabel: 'Explore Workouts'
    },
    {
      icon: Salad,
      number: '02',
      title: 'The Visual Half-Plate Rule',
      description:
        'Fill half of your plate with colorful vegetables before adding protein or complex carbohydrates to guarantee diverse micronutrient and fiber intake.',
      linkPath: '/nutrition',
      linkLabel: 'Nutrition Guides'
    },
    {
      icon: Moon,
      number: '03',
      title: 'Prioritize 7+ Restful Hours',
      description:
        'Over 70% of human growth hormone (HGH) secretion occurs during slow-wave deep sleep. Exercise breaks muscle down; sleep actually rebuilds it.',
      linkPath: '/wellness',
      linkLabel: 'Wellness Tips'
    }
  ];

  return (
    <section aria-labelledby="habits-banner-heading" className="my-16 sm:my-20">
      <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-forest-800/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mb-10 sm:mb-14">
          <div className="text-xs uppercase font-semibold text-lime-400 tracking-wider mb-2">
            Evidence-Informed Habit Architecture
          </div>
          <h2
            id="habits-banner-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Small Habits. Stronger You.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Monumental health transformations rarely start with extreme overhauls. They compound from microscopic daily rituals repeated consistently over seasons.
          </p>
        </div>

        {/* 3 Practical Tips Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.number}
                className="flex flex-col justify-between rounded-2xl bg-stone-800/80 border border-stone-700/60 p-6 transition-all hover:bg-stone-800 hover:border-lime-400/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-forest-800/80 text-lime-300 flex items-center justify-center border border-lime-400/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-stone-500">
                      {tip.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-700/50">
                  <button
                    onClick={() => navigate(tip.linkPath)}
                    className="text-xs font-medium text-lime-300 hover:text-lime-200 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{tip.linkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
