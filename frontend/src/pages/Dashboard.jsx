import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  PlayCircle,
  Code2,
  Brain,
  TrendingUp,
  Award,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ExternalLink,
  Sparkles,
  GitBranch,
  Zap,
  Target,
  Flame,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();

  // Multi-topic competency matrix
  const radarData = [
    { topic: 'DSA & Arrays', score: 84 },
    { topic: 'Trees & Graphs', score: 72 },
    { topic: 'Dynamic Prog', score: 60 },
    { topic: 'Quantitative', score: 88 },
    { topic: 'Logical Reasoning', score: 92 },
    { topic: 'Core CS (OS/DBMS)', score: 78 },
  ];

  // Difficulty adaptation trajectory
  const convergenceData = [
    { question: 'Q1 (Burst)', difficulty: 3.0 },
    { question: 'Q2 (Burst)', difficulty: 3.5 },
    { question: 'Q3 (Burst)', difficulty: 3.2 },
    { question: 'Q4 (Live)', difficulty: 3.8 },
    { question: 'Q5 (Live)', difficulty: 4.2 },
    { question: 'Q6 (Live)', difficulty: 4.0 },
    { question: 'Q7 (Live)', difficulty: 4.5 },
    { question: 'Q8 (Converged)', difficulty: 4.4 },
  ];

  const recentSessions = [
    {
      id: 'sess-101',
      type: 'CODING',
      title: 'Technical Mock: Trees & Dynamic Programming',
      date: '19 Nov 2026',
      score: '86%',
      levelReached: 'Band 4.4 (Advanced)',
      status: 'Completed',
    },
    {
      id: 'sess-102',
      type: 'APTITUDE',
      title: 'Adaptive Aptitude Diagnostic (Speed & Logic)',
      date: '16 Nov 2026',
      score: '92%',
      levelReached: 'Band 5.0 (Mastery)',
      status: 'Completed',
    },
    {
      id: 'sess-103',
      type: 'CODING',
      title: 'Cold-Start Calibration Assessment',
      date: '12 Nov 2026',
      score: '78%',
      levelReached: 'Band 3.5 (Intermediate)',
      status: 'Completed',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* FULL-WIDTH HERO BANNER WITH MIXED GRADIENT ACCENTS */}
      <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10 bg-gradient-to-r from-slate-900 via-blue-950/40 to-indigo-950/50 border border-blue-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
        {/* Soft atmospheric ambient glow orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            {/* Multi-color tag pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-amber-500/10 border border-blue-500/30 text-xs font-bold text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>DevReady v1.1 • Adaptive Engineering Preparation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                {user?.fullName || 'Ankita Utture'}
              </span>{' '}
              👋
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your cold-start calibration engine is active. Live difficulty adapts after every submission, recording code execution process signals and pinpointing exact topic boundaries.
            </p>
          </div>

          {/* Quick CTA Action */}
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Link
              to="/session/new"
              className="inline-flex items-center space-x-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlayCircle className="w-5 h-5 text-amber-300" />
              <span>Start New Assessment</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH STATS KPI GRID (Multi-Colored Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Electric Blue / Cyan */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-blue-500/20 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Calibrated Band
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">Band 4.4</div>
          <p className="text-xs text-cyan-400 mt-1.5 flex items-center space-x-1.5 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>92nd Percentile (AMGOI Benchmark)</span>
          </p>
        </div>

        {/* Card 2: Emerald / Mint */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-emerald-500/20 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assessment Accuracy
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">84.6%</div>
          <p className="text-xs text-emerald-400 mt-1.5 font-semibold">
            5 / 6 Questions Solved Correctly
          </p>
        </div>

        {/* Card 3: Sunset Amber / Orange */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-amber-500/20 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Process Efficiency
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">1.2 Runs/Q</div>
          <p className="text-xs text-amber-400 mt-1.5 font-semibold">
            High First-Attempt Solution Ratio
          </p>
        </div>

        {/* Card 4: Indigo / Purple */}
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-indigo-500/20 shadow-lg relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Integrity Index
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">99.4%</div>
          <p className="text-xs text-indigo-400 mt-1.5 font-semibold">
            Verified Clean Test Compliance
          </p>
        </div>
      </div>

      {/* FULL-WIDTH ANALYTICS & CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-Topic Competency Matrix */}
        <div className="rounded-[24px] p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span>Multi-Topic Competency Radar</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrated across Data Structures, Algorithms, Aptitude and Core CS
              </p>
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Live Blend
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="topic" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                <Radar
                  name="Ability"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="#3b82f6"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-Time Adaptive Difficulty Convergence Chart */}
        <div className="rounded-[24px] p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Adaptive Difficulty Convergence Curve</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Visualizing difficulty stepping from cold-start burst to converged band
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Stabilized at Band 4.4
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={convergenceData}>
                <defs>
                  <linearGradient id="diffAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="question" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[1, 5]} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '14px',
                    color: '#fff',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="difficulty"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#diffAreaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH RECENT SESSIONS TABLE */}
      <div className="rounded-[24px] p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>Recent Assessment Records</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review code execution timelines, test pass rates, and AI feedback
            </p>
          </div>
          <Link
            to="/session/new"
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>Launch Another Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Session Title</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Level Reached</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {recentSessions.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4 font-semibold text-slate-200 flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        s.type === 'CODING'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}
                    >
                      {s.type === 'CODING' ? <Code2 className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                    </div>
                    <span>{s.title}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        s.type === 'CODING'
                          ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {s.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-xs">{s.date}</td>
                  <td className="py-4 px-4 text-slate-300 text-xs font-semibold">{s.levelReached}</td>
                  <td className="py-4 px-4 font-extrabold text-white">{s.score}</td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/session/${s.id}/report`}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition"
                    >
                      <span>View Report</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
