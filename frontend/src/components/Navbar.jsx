import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DevReadyLogo } from './DevReadyLogo';
import {
  LayoutDashboard,
  PlayCircle,
  User,
  LogOut,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar on Login/Register since they have their own full-page split hero
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Session', path: '/session/new', icon: PlayCircle },
    { name: 'Profile & Ability', path: '/profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with backgroundless SVG */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <DevReadyLogo theme="dark" size="sm" showTagline={true} />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20 text-white border border-blue-500/30 shadow-md shadow-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info, Quick Action, and Logout */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/session/new"
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition hover:scale-105"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Take Test</span>
                </Link>

                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {user.fullName || 'Ankita Utture'}
                  </span>
                  <span className="text-[11px] font-medium text-blue-400">
                    {user.yearOfStudy ? `Year ${user.yearOfStudy} CSE` : 'Year 4 CSE'}
                  </span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-bold text-sm">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
