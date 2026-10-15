import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ShieldCheck, BookOpen, GraduationCap, Heart, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <header className="text-center mb-12 sm:mb-16">
        <span className="text-xs uppercase font-semibold text-forest-800 tracking-wider">
          About FitLife Journal
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight mt-2 mb-4">
          Move Better. Eat Better. Live Better.
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          FitLife Journal is an educational health and fitness publication founded to make evidence-informed wellness guidance accessible, practical, and welcoming for everyone.
        </p>
      </header>

      {/* Mission & Purpose */}
      <section className="mb-14 rounded-2xl bg-white border border-stone-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Heart className="w-5 h-5 text-forest-800" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Our Purpose & Vision
          </h2>
        </div>

        <p className="text-stone-700 leading-relaxed text-base mb-4">
          The wellness sphere is cluttered with extreme thirty-day transformation challenges, restrictive fad diets, and sensationalist claims that prioritize clicks over sustainable human wellbeing. FitLife Journal was created as an antidote to this noise.
        </p>

        <p className="text-stone-700 leading-relaxed text-base">
          Our articles bridge the gap between academic exercise physiology, clinical nutrition guidelines, and everyday practicality. We believe that true fitness is not a temporary sprint to an arbitrary scale number, but a gentle, lifelong craft built upon fundamental human movements, balanced whole foods, and restorative recovery.
        </p>
      </section>

      {/* College Assignment Attribution */}
      <section className="mb-14 rounded-2xl bg-stone-100/80 border border-stone-200/90 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-lime-300" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Academic Project Specification & Scope
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
              This website was engineered as a comprehensive capstone assignment on modern responsive website design, blogging architecture, digital content marketing, and structured SEO (Search Engine Optimization).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                <span>10 Complete In-Depth Articles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                <span>Explicit 1 Main + 2 Related Keyword Panels</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                <span>Semantic H1-H3 Heading Hierarchies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                <span>Article & BlogPosting JSON-LD Structured Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Standards & Content Safety */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">
          Our Editorial & Safety Constitution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-forest-700" />
              <span>Evidence-Informed Principles</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We draw directly on established exercise science (progressive overload, movement patterns) and accredited nutrition frameworks (the visual plate method, whole-food protein diversity). We never invent fake studies or exaggerate findings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>Zero Extreme Fads or Guarantees</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We never endorse rapid weight loss promises, severe caloric deficits, or unsafe gym challenges. Beginners are always encouraged to progress gradually and adapt movements to their individual anatomical capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Author Profile: FitLife Editorial Team */}
      <section className="mb-14 rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-forest-800 text-lime-300 flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
          FL
        </div>
        <div>
          <span className="text-xs uppercase font-semibold text-forest-800 tracking-wider">
            Primary Author & Curators
          </span>
          <h3 className="text-xl font-bold text-stone-900 mt-0.5 mb-2">
            FitLife Editorial Team
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
            The FitLife Editorial Team is a collegiate collaborative of digital content strategists, kinesiology students, and wellness advocates dedicated to producing transparent, helpful, and accessible health educational resources.
          </p>
          <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
            <span>Published: 10 Comprehensive Guides</span>
            <span>·</span>
            <span>Focus: Movement, Nutrition, Recovery</span>
          </div>
        </div>
      </section>

      {/* Medical Boundary Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-amber-950 text-xs leading-relaxed mb-12">
        <strong className="text-amber-900">Health Information Disclaimer: </strong>
        FitLife Journal is an educational publication and not a healthcare clinic or medical provider. Information provided across all articles, guides, and checklists is not personalized medical advice, physical therapy rehabilitation, or medical nutrition therapy. Always consult with a licensed physician or registered dietitian regarding specific health conditions or symptoms.
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-800 text-white text-sm font-semibold hover:bg-forest-900 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore Our Educational Articles</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
