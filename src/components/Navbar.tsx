import React from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { Flame, Award, Menu, X, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { user, activeTab, setActiveTab, setIsAuthModalOpen, setAuthMode } = useApp();

  const navItems: Array<{ id: AppTab; label: string }> = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'courses', label: 'Courses' },
    { id: 'coding', label: 'Coding' },
    { id: 'internships', label: 'Internships' },
    { id: 'resume', label: 'Resume' },
    { id: 'interview', label: 'Interview' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 py-3 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm font-black text-base">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              Ascend
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 transition-colors whitespace-nowrap relative ${
                  isActive
                    ? 'text-blue-700 font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions & student profile */}
        <div className="flex items-center gap-3">
          {/* Quick Streak & XP indicator */}
          <div className="hidden sm:flex items-center gap-3 text-xs font-medium text-slate-600 border-r border-slate-200 pr-3">
            <div className="flex items-center gap-1.5" title={`${user.streakDays} Day Study Streak`}>
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-mono tabular-nums font-semibold text-slate-800">{user.streakDays}d</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${user.xpPoints} Career XP earned`}>
              <Award className="w-4 h-4 text-teal-600" />
              <span className="font-mono tabular-nums font-semibold text-slate-800">{user.xpPoints} XP</span>
            </div>
          </div>

          {/* Student Profile Button */}
          <button
            onClick={() => {
              setAuthMode('switch');
              setIsAuthModalOpen(true);
            }}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
            title="Switch or edit student profile"
          >
            <div className="w-7 h-7 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-slate-500" />
              )}
            </div>
            <div className="hidden md:block max-w-[120px]">
              <p className="text-xs font-semibold text-slate-900 truncate leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate leading-tight">{user.academicYear}</p>
            </div>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
