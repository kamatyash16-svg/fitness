import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ShieldAlert, ArrowUp, Heart, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, navigateToCategory } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 text-left group mb-4 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-forest-800 text-white flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="w-4 h-4 text-lime-300"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                FitLife<span className="text-forest-700">Journal</span>
              </span>
            </button>

            <p className="text-xs font-semibold uppercase tracking-wider text-forest-700 mb-3">
              Move Better. Eat Better. Live Better.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed mb-6 max-w-sm">
              An educational health, fitness, and lifestyle publication created for academic coursework in web architecture, SEO strategy, and evidence-informed digital wellness journalism.
            </p>

            <div className="space-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Department of Digital Media & Health Communications, Campus Hall</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span>editorial@fitlifejournal.edu</span>
              </div>
            </div>
          </div>

          {/* Col 3: Website Pages */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
              Website Pages
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-600">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-forest-800 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="hover:text-forest-800 transition-colors"
                >
                  All Blog Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/workouts')}
                  className="hover:text-forest-800 transition-colors"
                >
                  Workout Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/nutrition')}
                  className="hover:text-forest-800 transition-colors"
                >
                  Nutrition Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/wellness')}
                  className="hover:text-forest-800 transition-colors"
                >
                  Wellness Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-forest-800 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-forest-800 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Blog Categories */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
              Blog Topics
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-600">
              <li>
                <button
                  onClick={() => navigateToCategory('Fitness and Workouts')}
                  className="hover:text-forest-800 transition-colors text-left"
                >
                  Fitness & Workouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Healthy Nutrition')}
                  className="hover:text-forest-800 transition-colors text-left"
                >
                  Healthy Nutrition
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Weight Management')}
                  className="hover:text-forest-800 transition-colors text-left"
                >
                  Weight Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Beginner Fitness')}
                  className="hover:text-forest-800 transition-colors text-left"
                >
                  Beginner Fitness
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Recovery and Sleep')}
                  className="hover:text-forest-800 transition-colors text-left"
                >
                  Recovery & Sleep
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Everyday Wellness')}
                  className="hover:text-forest-800 transition-colors text-left"
                >
                  Everyday Wellness
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Social & Back to Top */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-4">
              Community & Academic Note
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Follow FitLife Journal across academic discussion forums and campus health resources.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-forest-50 hover:text-forest-800 transition-colors cursor-pointer" title="Social placeholder">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-forest-50 hover:text-forest-800 transition-colors cursor-pointer" title="Social placeholder">
                in
              </span>
              <span className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-forest-50 hover:text-forest-800 transition-colors cursor-pointer" title="Social placeholder">
                fb
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Section 10 Mandatory Medical & Health Disclaimer Banner */}
        <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-amber-900 text-xs leading-relaxed">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900">Health Information Disclaimer: </span>
              The content published on FitLife Journal is prepared solely for general educational and informational purposes as part of a college assignment on website design, blogging, content marketing, and SEO. It does not constitute medical advice, physical therapy diagnosis, personalized nutritional counseling, or exercise prescription. Always consult a qualified physician or registered healthcare provider regarding personal health concerns or prior to starting any new physical training or dietary program.
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer Copyright Bar */}
      <div className="border-t border-stone-200 bg-stone-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 FitLife Journal. All rights reserved. Academic Project Demonstration.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/about')} className="hover:underline">
              Editorial Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('/about')} className="hover:underline">
              Privacy Notice
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('/contact')} className="hover:underline">
              Student Assignment Attribution
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
