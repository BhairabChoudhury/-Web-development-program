import React from 'react';
import { useForm } from './useForm';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { Toast } from './Toast';

/**
 * JobApplicationForm - Main orchestrator component.
 * Combines FormInput, FormTextarea, and Toast notifications into a premium, responsive form card.
 */
export const JobApplicationForm = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    setSubmitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Background Decorative Glow Spots */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Form Card */}
      <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        
        {/* Colorful Gradient Border Overlay at top */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400" />

        {/* Header Block */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Careers at Nexus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Apply For Position
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
            Fill out the form below to submit your details and cover letter. Our team will review your application shortly.
          </p>
        </div>

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="sm:col-span-2">
              <FormInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />
            </div>

            {/* Email Input */}
            <div className="col-span-1">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />
            </div>

            {/* Phone Number Input */}
            <div className="col-span-1">
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="1234567890"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />
            </div>

            {/* Message / Cover Letter Textarea */}
            <div className="sm:col-span-2">
              <FormTextarea
                label="Cover Letter / Message"
                name="message"
                placeholder="Tell us about yourself, your skills, and why you're a great fit for this position..."
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                touched={touched.message}
                maxLength={800}
              />
            </div>
          </div>

          {/* Submit Button Block */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                isSubmitting
                  ? 'bg-slate-800 border border-slate-700 cursor-not-allowed text-slate-400'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] active:scale-[0.99] border border-violet-500/20'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  {/* Premium Spinner */}
                  <svg className="animate-spin h-5 w-5 text-violet-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Application...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 tracking-wide">
                  Submit Application
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Notification */}
      <Toast
        show={submitSuccess}
        message="Your professional profile has been securely sent. We will reach out to you via email shortly!"
        onClose={() => setSubmitSuccess(false)}
      />
    </div>
  );
};
