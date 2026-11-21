import React from 'react';

export const DevReadyMark = ({ className = 'w-12 h-12' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="drMarkGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="drMarkGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="drCoreGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <filter id="drGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#drGlow)">
        {/* Outer Hexagonal Tech Frame */}
        <path
          d="M28 4L48 15.5V38.5L28 50L8 38.5V15.5L28 4Z"
          stroke="url(#drMarkGrad1)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dynamic Left Code Bracket < */}
        <path
          d="M21 19L14 27L21 35"
          stroke="url(#drMarkGrad2)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Right Code Bracket > */}
        <path
          d="M35 19L42 27L35 35"
          stroke="url(#drMarkGrad1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Rising Adaptive Arrow / Crystal */}
        <path
          d="M28 17L23 25H33L28 17Z"
          fill="url(#drCoreGrad)"
        />
        <path
          d="M28 25V37"
          stroke="url(#drCoreGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="28" cy="37" r="2.5" fill="#f59e0b" />
      </g>
    </svg>
  );
};

export const DevReadyLogo = ({
  theme = 'dark', // 'dark' or 'light'
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  showTagline = true,
  className = '',
}) => {
  const isLight = theme === 'light';

  const markSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  return (
    <div className={`inline-flex items-center space-x-3.5 select-none ${className}`}>
      {/* Backgroundless High-Impact SVG Mark */}
      <div className="flex-shrink-0 transition-transform hover:scale-105 duration-300">
        <DevReadyMark className={markSizes[size]} />
      </div>

      {/* Stylized Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight font-extrabold leading-none">
          <span
            className={`${textSizes[size]} font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              letterSpacing: '-0.03em',
            }}
          >
            DEV
          </span>
          <span
            className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent ml-1`}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              letterSpacing: '-0.03em',
            }}
          >
            READY
          </span>
          <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-sm shadow-amber-500/50 ml-1.5 animate-pulse" />
        </div>

        {showTagline && (
          <span
            className={`text-xs font-bold tracking-widest uppercase mt-1 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Adaptive Technical Assessment
          </span>
        )}
      </div>
    </div>
  );
};

export default DevReadyLogo;
