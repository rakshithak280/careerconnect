import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_ROADMAPS, CODING_CHALLENGES } from '../data/mockData';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Code2,
  Briefcase,
  Compass,
  FileCheck,
  Download,
  Share2,
  X
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { user, addNotification } = useApp();
  const [showTranscriptModal, setShowTranscriptModal] = useState<boolean>(false);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxWeeklyHour = Math.max(...user.weeklyHours, 8);
  const totalWeeklyHours = user.weeklyHours.reduce((acc, h) => acc + h, 0);

  // Solved coding stats
  const easySolved = CODING_CHALLENGES.filter(
    c => c.difficulty === 'Easy' && user.completedCodingChallengeIds.includes(c.id)
  ).length;
  const mediumSolved = CODING_CHALLENGES.filter(
    c => c.difficulty === 'Medium' && user.completedCodingChallengeIds.includes(c.id)
  ).length;

  // Recruiting funnel counts
  const savedCount = user.applications.filter(a => a.status === 'Saved').length;
  const appliedCount = user.applications.filter(a => a.status === 'Applied').length;
  const screeningCount = user.applications.filter(a => a.status === 'Screening').length;
  const interviewCount = user.applications.filter(a => a.status === 'Interview').length;
  const offerCount = user.applications.filter(a => a.status === 'Offer').length;

  // Calculate career index score
  const careerScore = Math.min(
    100,
    Math.round(
      user.completedRoadmapItemIds.length * 6 +
        user.completedCodingChallengeIds.length * 10 +
        user.completedLessonIds.length * 4 +
        user.applications.length * 5 +
        user.streakDays * 1.5
    )
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Personalized Academic & Career Analytics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Student Progress & Milestone Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Aggregated telemetry tracking your coding proficiency, roadmap milestones, study consistency, and interview pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTranscriptModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Generate Career Transcript</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Career Readiness Index</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {careerScore}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <span className="mt-1 text-[11px] font-semibold text-teal-700 block">
            Top 10% in {user.major}
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Total Career XP</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {user.xpPoints}
            </span>
            <span className="text-xs text-slate-400 font-mono">XP</span>
          </div>
          <span className="mt-1 text-[11px] font-semibold text-blue-700 block">
            Level 4 Candidate
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Current Daily Streak</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {user.streakDays}
            </span>
            <span className="text-xs text-slate-400 font-mono">days</span>
          </div>
          <span className="mt-1 text-[11px] font-semibold text-amber-700 block">
            Consistent Study Rhythm
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Active Pipeline Stage</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {user.academicYear}
            </span>
          </div>
          <span className="mt-1 text-[11px] font-semibold text-emerald-700 block">
            Target: Summer '{user.graduationYear.toString().slice(2)}
          </span>
        </div>
      </div>

      {/* Main Charts & Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Study Effort Distribution</h3>
              <p className="text-xs text-slate-500">Tracked practice time across roadmap milestones & coding labs</p>
            </div>
            <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded">
              {totalWeeklyHours.toFixed(1)} hrs total
            </span>
          </div>

          {/* Simple Clean SVG/CSS Bar Chart */}
          <div className="pt-4 h-48 flex items-end justify-between gap-3 px-2">
            {user.weeklyHours.map((hours, idx) => {
              const heightPercent = Math.max(12, Math.round((hours / maxWeeklyHour) * 100));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    {hours}h
                  </span>
                  <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-32">
                    <div
                      className="bg-gradient-to-t from-blue-700 to-teal-500 rounded-t-lg transition-all duration-500 hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {daysOfWeek[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coding & Recruiting Funnel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coding Problem Solved by Difficulty */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Algorithmic Problem Coverage</h3>

            <div className="space-y-2.5 pt-1 text-xs">
              <div>
                <div className="flex items-center justify-between text-slate-600 mb-1">
                  <span className="font-semibold text-emerald-700">Easy Difficulty</span>
                  <span className="font-mono font-bold text-slate-800">{easySolved} / 3</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(easySolved / 3) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-600 mb-1">
                  <span className="font-semibold text-amber-700">Medium Difficulty</span>
                  <span className="font-mono font-bold text-slate-800">{mediumSolved} / 1</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${(mediumSolved / 1) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Internship Recruiting Funnel */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Internship Conversion Funnel</h3>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Applications Submitted</span>
                <span className="font-mono font-bold text-slate-900">{user.applications.length}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-blue-50/60 border border-blue-100 text-blue-900">
                <span className="font-medium">Technical Screening & OA</span>
                <span className="font-mono font-bold">{screeningCount}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-teal-50/60 border border-teal-100 text-teal-900">
                <span className="font-medium">Interview Phone Screens</span>
                <span className="font-mono font-bold">{interviewCount}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                <span className="font-bold">Offers Extended</span>
                <span className="font-mono font-extrabold">{offerCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Transcript Modal */}
      {showTranscriptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowTranscriptModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
                <span>Verified Ascend Academic Record</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Student Career Transcript
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official career benchmark summary for {user.name} ({user.university})
              </p>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[11px] block">Major</span>
                  <span className="font-bold text-slate-800">{user.major}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Class Year</span>
                  <span className="font-bold text-slate-800">{user.academicYear} ('{user.graduationYear.toString().slice(2)})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">GPA</span>
                  <span className="font-bold text-teal-700 font-mono">{user.gpa}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Readiness Index</span>
                  <span className="font-bold text-blue-700 font-mono">{careerScore} / 100</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Milestone Achievements</h4>
                <div className="p-3 rounded-lg border border-slate-200 space-y-1.5 text-slate-700">
                  <div>✓ {user.completedRoadmapItemIds.length} Roadmap core engineering milestones completed</div>
                  <div>✓ {user.completedCodingChallengeIds.length} Algorithmic coding problems solved with unit tests</div>
                  <div>✓ {user.completedLessonIds.length} Advanced systems & database lectures completed</div>
                  <div>✓ {user.streakDays} Consecutive active study days maintained</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  addNotification('Transcript downloaded as PDF summary', 'success');
                  setShowTranscriptModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
