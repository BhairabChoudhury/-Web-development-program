import React, { useEffect, useState } from 'react';

/**
 * Premium, animated toast notification displaying a green success message.
 * Features an auto-dismiss countdown progress bar.
 */
export const Toast = ({ message, show, onClose, duration = 5000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!show) return;

    setProgress(100);
    const intervalTime = 50; // Update progress every 50ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    const progressInterval = setInterval(() => {
      currentStep += 1;
      const percentageRemaining = Math.max(0, 100 - (currentStep / totalSteps) * 100);
      setProgress(percentageRemaining);
      if (percentageRemaining === 0) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slideIn">
      <div className="relative overflow-hidden w-96 max-w-[90vw] bg-emerald-950/80 backdrop-blur-xl border border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.3)] rounded-2xl p-4 flex gap-3 text-white transition-all duration-300">
        
        {/* Glow behind icon */}
        <div className="absolute top-0 left-0 w-24 h-full bg-emerald-500/10 blur-xl pointer-events-none" />

        {/* Success Icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Message Content */}
        <div className="flex-grow flex flex-col justify-center">
          <h4 className="font-bold text-sm text-emerald-300 tracking-wide">Application Submitted!</h4>
          <p className="text-xs text-emerald-100/90 mt-0.5 leading-relaxed">{message}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 text-emerald-300 hover:text-emerald-100 transition-all duration-200 self-start"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Countdown Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
