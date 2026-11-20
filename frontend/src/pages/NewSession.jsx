import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import {
  Code2,
  Brain,
  ShieldAlert,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export const NewSession = () => {
  const [sessionType, setSessionType] = useState('CODING');
  const [duration, setDuration] = useState('45');
  const [calibrationMode, setCalibrationMode] = useState('BURST');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleStartSession = async () => {
    setLoading(true);
    const sessionId = `live-${Date.now().toString().slice(-4)}`;

    try {
      await api.post('/sessions', {
        type: sessionType,
        durationMinutes: parseInt(duration, 10),
        mode: calibrationMode,
      });
    } catch {
      console.info('Backend sessions endpoint is in stub mode, initiating client session');
    } finally {
      setLoading(false);
      navigate(`/session/${sessionId}?type=${sessionType}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-amber-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Cold-Start Adaptive Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Select Your Assessment Track
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Choose your evaluation path. The difficulty adapts in real-time after every single question.
        </p>
      </div>

      {/* Track Selection Cards (Full-width grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Track 1: Coding */}
        <div
          onClick={() => setSessionType('CODING')}
          className={`cursor-pointer rounded-[28px] p-8 border transition-all duration-300 relative overflow-hidden ${
            sessionType === 'CODING'
              ? 'border-blue-500/60 bg-gradient-to-b from-blue-950/40 via-indigo-950/20 to-slate-900/90 shadow-2xl shadow-blue-600/20 scale-[1.01]'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          {sessionType === 'CODING' && (
            <div className="absolute top-6 right-6 text-blue-400">
              <CheckCircle2 className="w-7 h-7 fill-blue-600 text-white" />
            </div>
          )}

          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
            <Code2 className="w-7 h-7" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Technical Coding Round</h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Data Structures & Algorithms with in-browser Monaco IDE, multiple test cases, and process-signal tracking (attempts, time-to-first-run, runtime complexity).
          </p>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Full VS Code editor with syntax highlighting</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Sandboxed compilation & automated test suites (Judge0)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Adaptive difficulty: Bands 1.0 (Basic) to 5.0 (Hard)</span>
            </div>
          </div>
        </div>

        {/* Track 2: Aptitude */}
        <div
          onClick={() => setSessionType('APTITUDE')}
          className={`cursor-pointer rounded-[28px] p-8 border transition-all duration-300 relative overflow-hidden ${
            sessionType === 'APTITUDE'
              ? 'border-cyan-500/60 bg-gradient-to-b from-cyan-950/40 via-teal-950/20 to-slate-900/90 shadow-2xl shadow-cyan-600/20 scale-[1.01]'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          {sessionType === 'APTITUDE' && (
            <div className="absolute top-6 right-6 text-cyan-400">
              <CheckCircle2 className="w-7 h-7 fill-cyan-600 text-white" />
            </div>
          )}

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
            <Brain className="w-7 h-7" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Adaptive Aptitude Round</h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Quantitative, Logical Reasoning, and Verbal ability assessments. High-velocity adaptive diagnostic measuring speed and analytical precision.
          </p>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Quantitative, Logical & Verbal sections</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>3-Band calibration for campus placements</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Deep topic-level diagnostic feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Session Configurations Card */}
      <div className="rounded-[28px] p-8 bg-slate-900/70 border border-slate-800 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white">Session Parameters</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Assessment Time Limit</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '30 Min', value: '30' },
                { label: '45 Min', value: '45' },
                { label: '60 Min', value: '60' },
              ].map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setDuration(t.value)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold border transition ${
                    duration === t.value
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calibration Strategy */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Cold-Start Adaptation Strategy</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCalibrationMode('BURST')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border transition text-left ${
                  calibrationMode === 'BURST'
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="font-extrabold text-white text-sm">6-Question Burst</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Rapid initial calibration</div>
              </button>

              <button
                type="button"
                onClick={() => setCalibrationMode('PROFILE')}
                className={`py-3 px-4 rounded-xl text-xs font-bold border transition text-left ${
                  calibrationMode === 'PROFILE'
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="font-extrabold text-white text-sm">Profile-Seeded</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Blend past abilities</div>
              </button>
            </div>
          </div>
        </div>

        {/* Anti-Cheat Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-200">Assessment Integrity Protocol Active</p>
            <p className="text-amber-300/80">
              The test requires fullscreen mode. Leaving the window, switching tabs, or pasting external code will be flagged and included in your post-test integrity report.
            </p>
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={handleStartSession}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          <span>{loading ? 'Initializing Adaptive Session...' : 'Enter Fullscreen & Begin Assessment'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
