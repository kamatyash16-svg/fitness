import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface NewsletterFormProps {
  layout?: 'card' | 'inline';
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ layout = 'card' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email format (e.g., student@university.edu).');
      return;
    }

    // Success state (Client-side demonstration)
    setStatus('success');
    setErrorMessage('');
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div
      className={`rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 text-white ${
        layout === 'card' ? 'p-6 sm:p-10 shadow-lg' : 'p-6'
      }`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest-700/60 text-lime-300 mb-4 border border-lime-400/20">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Subscribe to FitLife Weekly
        </h2>

        <p className="text-sm sm:text-base text-forest-100/90 leading-relaxed mb-6 max-w-xl mx-auto">
          Get evidence-informed workout guides, dietitian-reviewed meal ideas, and actionable habits delivered directly to your inbox every Sunday morning.
        </p>

        {status === 'success' ? (
          <div className="rounded-xl bg-forest-950/80 border border-lime-400/30 p-5 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-lime-400 text-forest-950 p-1 shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Subscription Confirmed!
                </h4>
                <p className="text-xs text-forest-200 mt-1 leading-relaxed">
                  Welcome aboard! We’ve registered <span className="font-mono text-lime-300">{email}</span> for weekly FitLife digests.
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-forest-800 text-[11px] text-forest-300">
                  <span className="font-semibold text-lime-300">Course Demonstration Notice:</span> This application runs entirely on the client-side for academic presentation. No personal data is stored on remote servers.
                </div>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs text-lime-300 underline underline-offset-4 hover:text-white"
                >
                  Enter another email
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-forest-200/60 border border-forest-600/60 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:bg-white/15 transition-all"
                  aria-label="Email address for weekly newsletter"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-lime-400 text-forest-950 text-sm font-semibold hover:bg-lime-300 active:scale-98 transition-all whitespace-nowrap shadow-xs"
              >
                Subscribe Free
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-red-200 mt-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-300 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-[11px] text-forest-300/80 pt-1">
              Zero spam. Unsubscribe anytime with 1-click. Educational demonstration project.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
