import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAntiCheat } from '../hooks/useAntiCheat';
import {
  Clock,
  Play,
  Send,
  AlertTriangle,
  Maximize2,
  CheckCircle,
  XCircle,
  Code2,
  ChevronRight,
  Terminal,
  Brain,
  ShieldAlert,
  Zap,
} from 'lucide-react';

const SAMPLE_CODING_QUESTIONS = [
  {
    id: 1,
    title: 'Two Sum - Target Indices',
    topic: 'Arrays & Hashing',
    difficulty: 2.5,
    band: 'Band 2 (Foundational)',
    phase: 'Burst Phase (1/6)',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists.'],
    starterCode: {
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your optimal solution here
        
    }
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your optimal solution here
    pass`,
      javascript: `function twoSum(nums, target) {
    // Write your optimal solution here
    
}`,
    },
  },
  {
    id: 2,
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    difficulty: 3.8,
    band: 'Band 4 (Intermediate-High)',
    phase: 'Burst Phase (2/6)',
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    starterCode: {
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your optimal sliding window solution
        return 0;
    }
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    # Write your optimal solution here
    return 0`,
      javascript: `function lengthOfLongestSubstring(s) {
    // Write your optimal solution here
    return 0;
}`,
    },
  },
];

const SAMPLE_APTITUDE_QUESTIONS = [
  {
    id: 1,
    topic: 'Quantitative Aptitude',
    subtopic: 'Time and Work',
    difficulty: 3.0,
    band: 'Band 3 (Standard)',
    question: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:',
    options: ['7/15', '8/15', '1/10', '1/3'],
    correct: 1,
  },
  {
    id: 2,
    topic: 'Logical Reasoning',
    subtopic: 'Coding-Decoding',
    difficulty: 3.5,
    band: 'Band 3.5 (Analytical)',
    question: 'In a certain code language, "ROSE" is written as "6821", "CHAIR" is written as "73456" and "PREACH" is written as "961473". What will be the code for "SEARCH"?',
    options: ['214673', '214763', '241673', '214637'],
    correct: 0,
  },
];

export const SessionTest = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const track = searchParams.get('type') || 'CODING';
  const navigate = useNavigate();

  // State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [language, setLanguage] = useState('java');
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeTab, setActiveTab] = useState('testcases');
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Anti-cheat
  const { events, enterFullscreen, isFullscreen, violationsCount } = useAntiCheat(id, true);

  // Coding questions / current question
  const isCoding = track === 'CODING';
  const questions = isCoding ? SAMPLE_CODING_QUESTIONS : SAMPLE_APTITUDE_QUESTIONS;
  const currentQ = questions[currentIdx] || questions[0];

  const [codes, setCodes] = useState(() => ({
    java: currentQ.starterCode?.java || '',
    python: currentQ.starterCode?.python || '',
    javascript: currentQ.starterCode?.javascript || '',
  }));

  // Update starter code on question switch
  useEffect(() => {
    if (isCoding && currentQ.starterCode) {
      setCodes({
        java: currentQ.starterCode.java || '',
        python: currentQ.starterCode.python || '',
        javascript: currentQ.starterCode.javascript || '',
      });
    }
    setSelectedOption(null);
    setExecutionOutput(null);
  }, [currentIdx, isCoding, currentQ]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Anti-cheat toast alert
  useEffect(() => {
    if (events.length > 0) {
      const last = events[events.length - 1];
      setToastMessage(`Integrity Flag: ${last.type} detected.`);
      const t = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [events]);

  const handleRunCode = () => {
    setIsRunning(true);
    setActiveTab('output');
    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput({
        status: 'ACCEPTED',
        runtime: '42 ms',
        memory: '38.4 MB',
        passedCount: '2 / 2 Test Cases Passed',
        stdout: 'Solution output verified against initial test suite.',
      });
    }, 900);
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleFinishSession();
    }
  };

  const handleFinishSession = () => {
    navigate(`/session/${id}/report`);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Integrity Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 glass-panel border border-amber-500/40 bg-amber-950/80 text-amber-200 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs animate-bounce">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <p className="font-bold">Anti-Cheat Alert</p>
            <p>{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Fullscreen Prompt Banner if not in fullscreen */}
      {!isFullscreen && (
        <div className="bg-amber-600/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Official Assessment Mode requires Fullscreen for integrity tracking.</span>
          </div>
          <button
            onClick={enterFullscreen}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition flex items-center space-x-1"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Enable Fullscreen</span>
          </button>
        </div>
      )}

      {/* Top Test Header Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/80 px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">DevReady Test</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              {track} Round
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
            <span>•</span>
            <span className="text-indigo-400 font-medium">{currentQ.band || 'Adaptive'}</span>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div className="flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-sm font-bold shadow-inner">
          <Clock className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* Right: Integrity & Finish Button */}
        <div className="flex items-center space-x-3">
          <div
            className={`hidden md:flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              violationsCount === 0
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            <span>Integrity: {violationsCount === 0 ? 'Clean' : `${violationsCount} Flag(s)`}</span>
          </div>

          <button
            onClick={handleFinishSession}
            className="px-4 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white font-semibold text-xs transition shadow-sm"
          >
            Finish Test
          </button>
        </div>
      </header>

      {/* Main Assessment Body: Split Pane */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane: Question Description */}
        <div className="w-full md:w-5/12 border-r border-slate-800 bg-slate-950/60 flex flex-col overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="text-indigo-400 font-semibold">{currentQ.topic}</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {currentQ.title || `Problem ${currentIdx + 1}`}
              </h2>
            </div>

            {/* Coding Question Content */}
            {isCoding ? (
              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <div className="prose prose-invert max-w-none whitespace-pre-line text-slate-300">
                  {currentQ.description}
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Test Examples
                  </h4>
                  {currentQ.examples?.map((ex, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs font-mono">
                      <div>
                        <span className="text-slate-400">Input: </span>
                        <span className="text-slate-200">{ex.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Output: </span>
                        <span className="text-emerald-400">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-400 text-[11px] font-sans">
                          <span className="text-slate-500">Explanation: </span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Constraints
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                    {currentQ.constraints?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              /* Aptitude Question Content */
              <div className="space-y-6 text-sm text-slate-300">
                <p className="text-base text-white leading-relaxed font-medium">
                  {currentQ.question}
                </p>

                <div className="space-y-3 pt-2">
                  {currentQ.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(i)}
                      className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition flex items-center space-x-4 ${
                        selectedOption === i
                          ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                          selectedOption === i
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'border-slate-700 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Monaco Code Editor OR Aptitude Action Area */}
        <div className="w-full md:w-7/12 flex flex-col bg-slate-950">
          {isCoding ? (
            <>
              {/* Code Editor Header */}
              <div className="h-11 border-b border-slate-800 bg-slate-900/60 px-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 px-2.5 py-1 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="java">Java 21</option>
                    <option value="python">Python 3.12</option>
                    <option value="javascript">JavaScript (Node)</option>
                  </select>
                </div>

                <div className="text-xs text-slate-500 font-mono">Monaco IDE v0.52</div>
              </div>

              {/* Monaco Code Editor */}
              <div className="flex-1 min-h-[300px]">
                <Editor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={codes[language]}
                  onChange={(val) => setCodes({ ...codes, [language]: val || '' })}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 12 },
                  }}
                />
              </div>

              {/* Console & Test Case Panel */}
              <div className="h-44 border-t border-slate-800 bg-slate-900/90 flex flex-col flex-shrink-0">
                <div className="h-9 border-b border-slate-800/80 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('testcases')}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md transition ${
                        activeTab === 'testcases'
                          ? 'text-indigo-300 bg-indigo-500/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Test Cases
                    </button>
                    <button
                      onClick={() => setActiveTab('output')}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md transition ${
                        activeTab === 'output'
                          ? 'text-indigo-300 bg-indigo-500/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Output
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center space-x-1.5 transition disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                      <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition"
                    >
                      <span>Submit Solution</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-3 text-xs overflow-y-auto font-mono text-slate-300 flex-1">
                  {activeTab === 'testcases' ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Case 1
                        </span>
                        <span className="text-slate-400">nums = [2,7,11,15], target = 9</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Case 2
                        </span>
                        <span className="text-slate-400">nums = [3,2,4], target = 6</span>
                      </div>
                    </div>
                  ) : executionOutput ? (
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex items-center space-x-3">
                        <span className="text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{executionOutput.status}</span>
                        </span>
                        <span className="text-slate-400">Runtime: {executionOutput.runtime}</span>
                        <span className="text-slate-400">Memory: {executionOutput.memory}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{executionOutput.stdout}</p>
                    </div>
                  ) : (
                    <p className="text-slate-500 text-xs">Run code to inspect output and runtime metrics.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Aptitude Right Pane Footer Action */
            <div className="flex-1 flex flex-col justify-end p-8 border-t border-slate-800">
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {selectedOption !== null ? (
                    <span className="text-emerald-400 font-medium">Option {String.fromCharCode(65 + selectedOption)} Selected</span>
                  ) : (
                    <span>Please select an option to submit</span>
                  )}
                </div>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-cyan-600/30 transition disabled:opacity-50"
                >
                  <span>Submit & Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
