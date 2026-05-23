import React from 'react';
import { JobApplicationForm } from './components/JobApplicationForm/JobApplicationForm';

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370c_1px,transparent_1px),linear-gradient(to_bottom,#1f29370c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Gradient Background Spheres */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Global Header */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {/* Corporate style logo */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-900/30 border border-violet-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-wide">NEXUS</span>
            <span className="text-xs text-violet-400 font-bold ml-1 tracking-widest uppercase">Technologies</span>
          </div>
        </div>

        {/* Action badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-slate-800/40 border border-slate-700/50 rounded-full px-4 py-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          We are actively hiring!
        </div>
      </header>

      {/* Main Container */}
      <main className="relative flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 z-10">
        <JobApplicationForm />
      </main>

      {/* Global Footer */}
      <footer className="relative w-full py-8 text-center text-xs text-slate-500 border-t border-slate-900/80 bg-black/20 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Nexus Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors duration-250">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors duration-250">Terms of Service</a>
            <a href="#support" className="hover:text-slate-300 transition-colors duration-250">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
