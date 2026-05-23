import React from 'react';

/**
 * Reusable, premium textarea component for cover letters, messages, or detailed descriptions.
 * Includes a real-time character counter and smooth glassmorphic active states.
 */
export const FormTextarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  maxLength = 1000,
}) => {
  const hasError = touched && error;
  const currentLength = value ? value.length : 0;

  return (
    <div className="flex flex-col w-full gap-1.5 group">
      {/* Label & Character Count Row */}
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="text-sm font-semibold text-slate-300 group-focus-within:text-violet-400 transition-colors duration-200"
        >
          {label}
        </label>
        <span className="text-xs text-slate-500 font-medium">
          {currentLength} / {maxLength} chars
        </span>
      </div>

      {/* Textarea Container */}
      <div className="relative flex">
        {/* Document Icon in top-left */}
        <div className="absolute left-4 top-3.5 pointer-events-none">
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              hasError ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-violet-400'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Textarea Control */}
        <textarea
          id={name}
          name={name}
          rows="5"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maxLength}
          className={`w-full pl-12 pr-4 py-3 bg-slate-900/60 backdrop-blur-md border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 resize-none ${
            hasError
              ? 'border-rose-500/70 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20 shadow-rose-950/10'
              : 'border-slate-700/60 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 focus:bg-slate-900/80'
          } shadow-inner`}
        />
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
