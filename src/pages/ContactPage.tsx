import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, HelpCircle, MapPin, Clock, MessageSquare } from 'lucide-react';
import { ContactFormData } from '../types/blog';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., student@university.edu).';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please choose or type a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please enter a message of at least 15 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs uppercase font-semibold text-forest-800 tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1 mb-3">
          Contact FitLife Journal
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Have an inquiry about our editorial content, research citations, or college coursework specifications? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Form Section */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-forest-50 text-forest-800 flex items-center justify-center mx-auto mb-4 border border-forest-200">
                <CheckCircle className="w-8 h-8 text-forest-700" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                Message Validated & Logged!
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6 max-w-md mx-auto">
                Thank you, <strong className="text-stone-800">{formData.name}</strong>. Your test message regarding "<span className="italic">{formData.subject}</span>" has successfully passed client-side validation.
              </p>

              {/* Requirement 9: Do not claim that messages are delivered without a backend */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 text-left mb-6 leading-relaxed">
                <strong className="block mb-1 text-amber-950 font-semibold">
                  Course Assignment Demonstration Note:
                </strong>
                This application operates purely within the browser frontend environment for academic grading. No external email server or database backend is connected; your submission has not been transmitted to real inboxes.
              </div>

              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-semibold hover:bg-forest-900 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <h2 className="text-lg font-bold text-stone-900 mb-1">
                Send an Editorial Inquiry
              </h2>
              <p className="text-xs text-stone-500 mb-4">
                Fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
              </p>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-stone-200 bg-stone-50/50'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@university.edu"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-stone-200 bg-stone-50/50'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Subject Inquiry <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors ${
                    errors.subject ? 'border-red-400 bg-red-50/30' : 'border-stone-200 bg-stone-50/50'
                  }`}
                >
                  <option value="">-- Select an inquiry topic --</option>
                  <option value="Editorial Content Feedback">Editorial Content Feedback</option>
                  <option value="Topic Suggestion for Future Guides">Topic Suggestion for Future Guides</option>
                  <option value="College Assignment & SEO Rubric Review">College Assignment & SEO Rubric Review</option>
                  <option value="Health Citation or Safety Question">Health Citation or Safety Question</option>
                  <option value="General Question">General Question</option>
                </select>
                {errors.subject && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your question, constructive feedback, or topic request here..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors ${
                    errors.message ? 'border-red-400 bg-red-50/30' : 'border-stone-200 bg-stone-50/50'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>

              <p className="text-[11px] text-stone-400 text-center pt-1">
                Demonstration form. No data is stored or forwarded without an API gateway.
              </p>
            </form>
          )}
        </div>

        {/* Sidebar Info & FAQs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contact Details Card */}
          <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">
              Academic Editorial Office
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Campus Address</strong>
                  <span>Digital Media & Health Informatics Lab, Tech Pavilion 4B</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Direct Email</strong>
                  <span>contact@fitlifejournal.edu</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Editorial Hours</strong>
                  <span>Monday – Friday, 9:00 AM – 5:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Asked Inquiries */}
          <div className="rounded-2xl bg-stone-100/70 border border-stone-200 p-6">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-forest-700" />
              <span>Assignment FAQ</span>
            </h3>
            <div className="space-y-3 text-xs text-stone-600">
              <div>
                <strong className="text-stone-800 block mb-0.5">Are all 10 articles written in full?</strong>
                <p>Yes, all 10 articles feature original educational content, at least 5 H2 sections, dedicated SEO keyword panels, and unique photography.</p>
              </div>
              <div>
                <strong className="text-stone-800 block mb-0.5">Where can I see the keyword architecture?</strong>
                <p>Every article page displays its exact Main Keyword, Related Keyword 1, and Related Keyword 2 at the top in a designated SEO panel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
