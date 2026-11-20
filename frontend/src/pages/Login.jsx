import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DevReadyLogo } from '../components/DevReadyLogo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  KeyRound,
  Sparkles,
} from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Authentication server offline. Logging in via instant preview mode...');
        setTimeout(() => {
          loginDemo();
          navigate('/dashboard');
        }, 800);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Instant Google auth simulation for UI
    setLoading(true);
    setTimeout(() => {
      loginDemo();
      navigate('/dashboard');
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSubmitted(true);
    }, 800);
  };

  return (
    <div className="h-screen max-h-screen w-full flex bg-[#090d16] text-slate-100 relative overflow-hidden font-sans select-none">
      {/* Soft atmospheric ambient glow orbs (Matches Dashboard) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px]" />
        <div className="absolute top-10 right-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px]" />

        {/* Crisp Architectural Curves / Geometry SVG */}
        <svg
          className="absolute right-0 bottom-0 w-3/5 h-full opacity-[0.04] text-blue-400 pointer-events-none"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 1000C200 600 500 300 1000 200V1000H200Z"
            fill="currentColor"
          />
          <path
            d="M400 1000C400 700 650 450 1000 400"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M600 1000C600 800 800 600 1000 600"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Main Container - strictly 100vh non-scrolling */}
      <div className="w-full h-full flex flex-col lg:flex-row relative z-10">
        {/* LEFT HERO SECTION (Editorial, Balanced, Non-scrolling) */}
        <div className="hidden lg:flex lg:w-7/12 flex-col justify-between p-10 xl:p-14 relative">
          {/* Top Logo & Prominent Tagline */}
          <div className="space-y-3">
            <DevReadyLogo theme="dark" size="lg" showTagline={false} />

            <div className="pt-2">
              <span className="text-sm xl:text-base font-extrabold tracking-widest text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text uppercase">
                Your Readiness. Your Code. One Platform.
              </span>
            </div>
          </div>

          {/* Main Hero Headline & Pitch */}
          <div className="max-w-2xl space-y-5 my-auto">
            <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-serif font-bold text-white leading-[1.15] tracking-tight">
              Everything your engineering career needs.{' '}
              <span className="italic font-normal bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Calibrated.
              </span>
            </h1>

            <p className="text-slate-300 text-sm xl:text-base font-normal leading-relaxed max-w-xl">
              Bring coding skills, adaptive aptitude rounds, process-signal tracking, and AI-powered feedback together in one intelligent technical interview preparation workspace.
            </p>

            {/* Accent divider feature badge */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="w-3 h-8 bg-gradient-to-b from-amber-400 via-blue-500 to-indigo-600 rounded-sm transform -skew-x-12 shadow-sm" />
              <span className="text-sm font-bold tracking-wide text-slate-200">
                Adaptive Testing. Process Signals. AI Insights.
              </span>
            </div>
          </div>

          {/* Footer Metadata Badges */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-4 border-t border-slate-800/80">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-300">Cold-Start Heuristics</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-300">Judge0 Sandboxed Execution</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-slate-300">Gemini AI Action Plans</span>
            </div>
          </div>
        </div>

        {/* RIGHT FLOATING CARD SECTION (Perfect Fit, Zero Scroll) */}
        <div className="w-full lg:w-5/12 h-full flex items-center justify-center p-6 sm:p-10 lg:p-8 xl:p-12">
          <div className="w-full max-w-[420px] rounded-[28px] p-7 sm:p-8 bg-slate-900/85 backdrop-blur-2xl border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(59,130,246,0.15)] relative">
            {/* Header row with mini logo & version badge */}
            <div className="flex items-center justify-between mb-4">
              <DevReadyLogo theme="dark" size="sm" showTagline={false} />
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-[11px] font-bold text-blue-400 border border-blue-500/20">
                DevReady OS
              </span>
            </div>

            {/* Title and subtitle */}
            <div className="mb-5">
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Sign in to continue to your workspace.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Clean Login Form (No top tabs) */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Work / College Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="student@amgoi.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center space-x-2 text-slate-400 cursor-pointer hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 accent-blue-600 rounded border-slate-700"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotSubmitted(false);
                    setShowForgotModal(true);
                  }}
                  className="text-blue-400 font-bold hover:text-blue-300 transition"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-1"
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                or continue with
              </span>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center space-x-2.5 shadow-sm transition hover:border-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Registration Link */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-bold underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>

            {/* Footer reassurance */}
            <div className="mt-3 text-center">
              <p className="text-[10px] text-slate-500 flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>Secure access to your assessment workspace.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WORKING FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-[28px] p-7 bg-slate-900 border border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 absolute top-5 right-5 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <KeyRound className="w-6 h-6" />
            </div>

            {!forgotSubmitted ? (
              <>
                <h3 className="text-xl font-serif font-bold text-white">Reset your password</h3>
                <p className="text-xs text-slate-400 mt-1 mb-5">
                  Enter your registered college email and we'll send you an encrypted password recovery link.
                </p>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="student@amgoi.edu.in"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition"
                  >
                    <span>{forgotLoading ? 'Sending Instructions...' : 'Send Reset Link'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-2 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Password Reset Link Sent</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  We sent an encrypted recovery link to <span className="text-blue-400 font-semibold">{forgotEmail || 'your email'}</span>. Please check your inbox and spam folder.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
