import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { RoadmapsView } from './components/RoadmapsView';
import { CoursesView } from './components/CoursesView';
import { CodingPracticeView } from './components/CodingPracticeView';
import { InternshipsView } from './components/InternshipsView';
import { ResumeBuilderView } from './components/ResumeBuilderView';
import { InterviewPrepView } from './components/InterviewPrepView';
import { ProgressView } from './components/ProgressView';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Top Bar Header */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Navigation Sidebar */}
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic View Port */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'roadmaps' && <RoadmapsView />}
          {activeTab === 'courses' && <CoursesView />}
          {activeTab === 'coding' && <CodingPracticeView />}
          {activeTab === 'internships' && <InternshipsView />}
          {activeTab === 'resume' && <ResumeBuilderView />}
          {activeTab === 'interview' && <InterviewPrepView />}
          {activeTab === 'progress' && <ProgressView />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 sm:px-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-700 text-white font-black text-xs flex items-center justify-center">
              A
            </div>
            <span className="font-bold text-slate-800">Ascend Student Career Hub</span>
            <span className="text-slate-300">·</span>
            <span>Accelerating university engineers & technologists</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <button
              onClick={() => setActiveTab('roadmaps')}
              className="hover:text-slate-900 transition-colors"
            >
              Roadmaps
            </button>
            <button
              onClick={() => setActiveTab('coding')}
              className="hover:text-slate-900 transition-colors"
            >
              Code Practice
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className="hover:text-slate-900 transition-colors"
            >
              Internships
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className="hover:text-slate-900 transition-colors"
            >
              Resume ATS
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <AuthModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
