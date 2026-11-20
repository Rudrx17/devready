import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Download,
  BookOpen,
  Code2,
  Activity,
  Flame,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

export const SessionReport = () => {
  const { id } = useParams();

  // Difficulty progression data (Simulating the adaptive convergence)
  const adaptationCurve = [
    { question: 'Q1', difficulty: 3.0, status: 'Correct (+0.5)' },
    { question: 'Q2', difficulty: 3.5, status: 'Correct (+0.5)' },
    { question: 'Q3', difficulty: 4.0, status: 'Correct (+0.5)' },
    { question: 'Q4', difficulty: 4.5, status: 'Wrong (-0.3)' },
    { question: 'Q5', difficulty: 4.2, status: 'Correct (+0.2)' },
    { question: 'Q6', difficulty: 4.4, status: 'Converged' },
  ];

  const topicBreakdown = [
    { topic: 'Arrays & Two Pointers', score: 92, status: 'Mastered', color: '#10b981' },
    { topic: 'Sliding Window', score: 85, status: 'Proficient', color: '#3b82f6' },
    { topic: 'Binary Search', score: 75, status: 'Competent', color: '#06b6d4' },
    { topic: 'Dynamic Programming', score: 54, status: 'Needs Focus', color: '#f59e0b' },
    { topic: 'Graph Traversals', score: 48, status: 'Critical Gap', color: '#f43f5e' },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Performance Header (Full-Width) */}
      <div className="p-8 sm:p-10 rounded-[28px] border border-blue-500/20 bg-gradient-to-r from-slate-900 via-blue-950/40 to-indigo-950/40 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Assessment Completed • ID: {id}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Performance Evaluation Report
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your evaluation converged at <span className="text-white font-bold">Band 4.4 (Advanced)</span>. The adaptive algorithm identified strong analytical fundamentals with targeted opportunities in Dynamic Programming.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/session/new"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Assessment</span>
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition"
            >
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards (Full-Width Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-2xl p-6 bg-slate-900/80 border border-blue-500/20 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Converged Ability
          </span>
          <div className="text-3xl font-extrabold text-white mt-2">Band 4.4</div>
          <span className="text-xs text-blue-400 font-bold">92nd Percentile (AMGOI Benchmark)</span>
        </div>

        <div className="rounded-2xl p-6 bg-slate-900/80 border border-emerald-500/20 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Accuracy & Efficiency
          </span>
          <div className="text-3xl font-extrabold text-white mt-2">83.3%</div>
          <span className="text-xs text-emerald-400 font-bold">5 / 6 Questions Solved</span>
        </div>

        <div className="rounded-2xl p-6 bg-slate-900/80 border border-amber-500/20 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Process Signals
          </span>
          <div className="text-3xl font-extrabold text-white mt-2">1.1 Runs</div>
          <span className="text-xs text-amber-400 font-bold">High First-Run Precision</span>
        </div>

        <div className="rounded-2xl p-6 bg-slate-900/80 border border-cyan-500/20 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Integrity Status
          </span>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">Verified</div>
          <span className="text-xs text-cyan-400 font-bold">0 Fullscreen Violations</span>
        </div>
      </div>

      {/* Adaptive Convergence Visualizer */}
      <div className="rounded-[28px] p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span>Adaptive Difficulty Trajectory</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Shows how the DevReady engine raised or lowered difficulty after each answer to find your true boundary
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Converged
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adaptationCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="question" stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis domain={[1, 5]} stroke="#475569" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="difficulty"
                stroke="#3b82f6"
                strokeWidth={3.5}
                dot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak Topic & Skill Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Breakdown Bar Card */}
        <div className="rounded-[28px] p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span>Topic Mastery Breakdown</span>
          </h2>
          <p className="text-xs text-slate-400">
            Per-topic scores evaluated by the WeakTopicAnalyzer module
          </p>

          <div className="space-y-4 pt-2">
            {topicBreakdown.map((t) => (
              <div key={t.topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{t.topic}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold" style={{ color: t.color }}>
                      {t.status}
                    </span>
                    <span className="text-slate-400 font-mono">{t.score}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${t.score}%`, backgroundColor: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Action Plan (Gemini Integration) */}
        <div className="rounded-[28px] p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-blue-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">AI-Powered Action Plan</h2>
            </div>
            <p className="text-xs text-slate-400">
              Synthesized by the DevReady Feedback Engine based on your submission attempts, runtime, and failure points.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                <p className="font-bold text-blue-300">1. Target 2D Dynamic Programming</p>
                <p className="text-slate-300">
                  Focus on memoization table transitions for Subsequence and Knapsack problems. Practice recognizing optimal substructure before writing code.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <p className="font-bold text-slate-200">2. Graph Cycle Detection</p>
                <p className="text-slate-400">
                  Strengthen Breadth-First and Depth-First Search for directed graphs using Kahn's algorithm or recursion stacks.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/session/new"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 transition"
            >
              <span>Practice Recommended Topics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
