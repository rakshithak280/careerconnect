import React from 'react';
import { useApp, AppTab } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Code2,
  Briefcase,
  FileText,
  MessageSquareCode,
  TrendingUp,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { user, activeTab, setActiveTab } = useApp();

  const navigation: Array<{
    id: AppTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmaps', label: 'Career Roadmaps', icon: Compass, badge: '5 Tracks' },
    { id: 'courses', label: 'Curated Courses', icon: BookOpen, badge: '4' },
    { id: 'coding', label: 'Coding Practice', icon: Code2, badge: `${user.completedCodingChallengeIds.length}/4` },
    { id: 'internships', label: 'Internships', icon: Briefcase, badge: user.applications.length > 0 ? user.applications.length : undefined },
    { id: 'resume', label: 'Resume Builder', icon: FileText, badge: 'ATS Check' },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquareCode },
    { id: 'progress', label: 'Progress & Stats', icon: TrendingUp }
  ];

  const handleSelectTab = (tab: AppTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } no-print`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          {/* Mobile brand header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-blue-700 text-white font-bold flex items-center justify-center text-sm">
                A
              </div>
              <span className="font-bold text-slate-900 text-lg">Ascend Hub</span>
            </div>
            <button
              onClick={onCloseMobile}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium px-2 py-1"
            >
              Close
            </button>
          </div>

          {/* Student Status Summary Card */}
          <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-white">
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.university}</p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
              <span className="text-[11px] text-slate-500">{user.academicYear} · {user.graduationYear}</span>
              <span className="font-mono font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded text-[11px]">
                {user.gpa} GPA
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Career Workspace
            </p>
            {navigation.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-blue-700' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive
                          ? 'bg-blue-200/70 text-blue-900 font-semibold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info box in sidebar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span className="font-medium">Daily Target</span>
            <span className="font-mono text-teal-700 font-semibold">85% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 h-1.5 rounded-full w-[85%]" />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              {user.streakDays} Day streak
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              {user.xpPoints} XP
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
