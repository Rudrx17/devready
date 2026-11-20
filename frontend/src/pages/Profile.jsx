import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  GraduationCap,
  Mail,
  GitBranch,
  Award,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Code,
  TrendingUp,
  Brain,
  Sliders,
  Save,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export const Profile = () => {
  const { user } = useAuth();

  // Connected accounts state
  const [githubHandle, setGithubHandle] = useState('ankita-dev');
  const [leetcodeHandle, setLeetcodeHandle] = useState('ankita_cse');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Self-report skill levels for cold-start fallback
  const [dsaSkill, setDsaSkill] = useState(4);
  const [aptitudeSkill, setAptitudeSkill] = useState(4);
  const [sysDesignSkill, setSysDesignSkill] = useState(3);

  const radarData = [
    { topic: 'Data Structures', score: 85 },
    { topic: 'Algorithms', score: 80 },
    { topic: 'Quantitative Aptitude', score: 88 },
    { topic: 'Logical Reasoning', score: 90 },
    { topic: 'Core CS (OS/DBMS/CN)', score: 75 },
    { topic: 'System Design', score: 65 },
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Profile Header Card (Full-Width) */}
      <div className="p-8 sm:p-10 rounded-[28px] border border-blue-500/20 bg-gradient-to-r from-slate-900 via-blue-950/40 to-indigo-950/40 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-1 shadow-xl shadow-blue-600/30 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center text-3xl font-extrabold text-white">
              {user?.fullName ? user.fullName[0].toUpperCase() : 'A'}
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {user?.fullName || 'Ankita Utture'}
              </h1>
              <span className="px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold">
                CSE Final Year
              </span>
            </div>

            <p className="text-sm text-slate-300 flex items-center justify-center sm:justify-start space-x-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Ashokrao Mane Group of Institutions • Dept. of CSE</span>
            </p>

            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start space-x-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email || 'ankita@amgoi.edu.in'}</span>
            </p>
          </div>

          <div className="text-right hidden md:block">
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Overall Calibrated Band
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent mt-1">
              Band 4.4
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Ready for Technical Rounds</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Connected Platforms & Self Report */}
        <div className="lg:col-span-2 space-y-6">
          {/* External Profiles Sync Card */}
          <div className="rounded-[28px] p-8 bg-slate-900/70 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                  <span>Coding Profile Integrations</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Used by DevReady to seed initial difficulty and avoid cold-start delays
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Connected
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {/* GitHub */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">GitHub Profile</p>
                    <p className="text-xs text-slate-400">@{githubHandle} • 24 Repositories</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                  Synced
                </span>
              </div>

              {/* LeetCode */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">LeetCode Sync</p>
                    <p className="text-xs text-slate-400">@{leetcodeHandle} • 285 Solved (Rating: 1740)</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Self-Reported Ability Fallback */}
          <div className="rounded-[28px] p-8 bg-slate-900/70 border border-slate-800 space-y-5 shadow-xl">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>Self-Reported Skill Calibration</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust baseline competence when external profile sync is unavailable (PRD Section 7.3)
              </p>
            </div>

            {savedSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Profile preferences updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold">Data Structures & Algorithms</span>
                  <span className="font-mono text-blue-400 font-bold">Band {dsaSkill} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={dsaSkill}
                  onChange={(e) => setDsaSkill(e.target.value)}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold">Aptitude & Analytical Speed</span>
                  <span className="font-mono text-cyan-400 font-bold">Band {aptitudeSkill} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={aptitudeSkill}
                  onChange={(e) => setAptitudeSkill(e.target.value)}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold">System Design & Core CS</span>
                  <span className="font-mono text-indigo-400 font-bold">Band {sysDesignSkill} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={sysDesignSkill}
                  onChange={(e) => setSysDesignSkill(e.target.value)}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-2 border border-slate-700 transition"
              >
                <Save className="w-3.5 h-3.5 text-blue-400" />
                <span>Save Calibration Settings</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Historical Ability Radar */}
        <div className="space-y-6">
          <div className="rounded-[28px] p-8 bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-400" />
                <span>Ability Distribution</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-domain evaluation across historical sessions
              </p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="topic" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                  <Radar
                    name="Skill"
                    dataKey="score"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="#06b6d4"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-blue-300">Ready for Campus Drives</p>
              <p className="text-slate-400 text-[11px]">
                Your aptitude and DSA metrics satisfy eligibility thresholds for Product and MNC placement rounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
