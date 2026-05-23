import React from 'react';

/**
 * Reusable, premium input component with support for text, email, and tel inputs.
 * Features built-in styling for icons, focus states, and validation error messages.
 */
export const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const hasError = touched && error;

  // Map input names to professional modern icons
  const renderIcon = () => {
    const iconClass = `w-5 h-5 transition-colors duration-300 ${
      hasError ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-violet-400'
    }`;

    switch (name) {
      case 'name':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'email':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full gap-1.5 group">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-semibold text-slate-300 group-focus-within:text-violet-400 transition-colors duration-200"
      >
        {label}
      </label>

      {/* Input container */}
      <div className="relative flex items-center">
        {/* Field Icon */}
        <div className="absolute left-4 pointer-events-none flex items-center justify-center">
          {renderIcon()}
        </div>

        {/* Input Control */}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-12 pr-4 py-3 bg-slate-900/60 backdrop-blur-md border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
            hasError
              ? 'border-rose-500/70 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 shadow-rose-950/10'
              : 'border-slate-700/60 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 focus:bg-slate-900/80'
          } shadow-inner`}
        />

        {/* Error icon overlay */}
        {hasError && (
          <div className="absolute right-4 pointer-events-none flex items-center justify-center">
            <svg className="w-5 h-5 text-rose-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        )}
      </div>

      {/* Red Error Message */}
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? 'max-h-10 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
        <p className="text-xs font-medium text-rose-400 flex items-center gap-1 animate-fadeIn">
          <span>{error}</span>
        </p>
      </div>
    </div>
  );
};
