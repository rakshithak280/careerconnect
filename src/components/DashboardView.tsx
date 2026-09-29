import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CAREER_ROADMAPS,
  INTERNSHIPS_DATA,
  CODING_CHALLENGES
} from '../data/mockData';
import {
  Compass,
  Code2,
  Briefcase,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Calendar,
  Building2,
  Clock,
  ExternalLink,
  Target
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    user,
    setActiveTab,
    activeRoadmapId,
    setActiveRoadmapId,
    toggleRoadmapItem,
    setSelectedCodingChallengeId,
    addNotification
  } = useApp();

  const [dailyTasks, setDailyTasks] = useState([
    { id: 'dt_1', title: 'Complete Module 1 of Relational Schema Design', completed: false, xp: 20 },
    { id: 'dt_2', title: 'Solve 1 Medium Coding Challenge (Kadane Algorithm)', completed: false, xp: 50 },
    { id: 'dt_3', title: 'Review Stripe Technical Interview question prompts', completed: true, xp: 15 },
    { id: 'dt_4', title: 'Run ATS Resume Scanner & verify quantified bullets', completed: false, xp: 25 }
  ]);

  const toggleDailyTask = (id: string, xp: number) => {
    setDailyTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const nextState = !task.completed;
          if (nextState) {
            addNotification(`Task completed! +${xp} XP`, 'success');
          }
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  const activeRoadmap = CAREER_ROADMAPS.find(r => r.id === activeRoadmapId) || CAREER_ROADMAPS[0];
  const allRoadmapItemIds = activeRoadmap.stages.flatMap(s => s.items.map(i => i.id));
  const completedRoadmapCount = allRoadmapItemIds.filter(id =>
    user.completedRoadmapItemIds.includes(id)
  ).length;
  const roadmapPercent = Math.round((completedRoadmapCount / Math.max(1, allRoadmapItemIds.length)) * 100);

  const totalWeeklyHours = user.weeklyHours.reduce((acc, h) => acc + h, 0);

  // Next up roadmap step
  const nextRoadmapItem = activeRoadmap.stages
    .flatMap(s => s.items)
    .find(i => !user.completedRoadmapItemIds.includes(i.id)) || activeRoadmap.stages[0].items[0];

  return (
    <div className="space-y-6">
      {/* Hero Banner with Campus Image & Dark Scrim */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <img
          src="/src/assets/images/hero_student_campus_1790694900516.jpg"
          alt="University Innovation Campus"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Measured dark scrim to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/60" />

        <div className="relative p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>College Career Accelerator · Fall Term 2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {user.name.split(' ')[0]}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed">
              Targeting <span className="font-semibold text-teal-300">{user.targetRole}</span> for {user.graduationYear} graduation. You have completed {completedRoadmapCount} of {allRoadmapItemIds.length} roadmap milestones in the {activeRoadmap.title} pathway.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('roadmaps')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Continue Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('coding')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition-colors inline-flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" /> Quick Practice
              </button>
              <button
                onClick={() => setActiveTab('internships')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur transition-colors inline-flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5" /> View Internships
              </button>
            </div>
          </div>

          {/* Quick Target Pill & Stats Box */}
          <div className="bg-slate-900/80 backdrop-blur border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Path Progress</span>
              <span className="font-mono text-teal-400 font-bold">{roadmapPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${roadmapPercent}%` }}
              />
            </div>
            <div className="pt-1 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Active Target:</span>
              <span className="font-medium text-white">{activeRoadmap.targetRole.split(',')[0]}</span>
            </div>
            <div className="text-[11px] text-slate-300 flex items-center justify-between">
              <span>Next Checkpoint:</span>
              <span className="font-medium text-teal-300 truncate max-w-[140px]">{nextRoadmapItem?.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Quantitative Metrics (High-legibility, tabular nums) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => setActiveTab('roadmaps')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Roadmap Completion</span>
            <Compass className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {roadmapPercent}%
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {completedRoadmapCount}/{allRoadmapItemIds.length} done
            </span>
          </div>
          <div className="mt-2 text-[11px] text-blue-700 font-medium flex items-center gap-1">
            <span>{activeRoadmap.title}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => setActiveTab('coding')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-teal-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Coding Challenges</span>
            <Code2 className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {user.completedCodingChallengeIds.length}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              / {CODING_CHALLENGES.length} solved
            </span>
          </div>
          <div className="mt-2 text-[11px] text-teal-700 font-medium">
            DSA & System Logic practice
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => setActiveTab('internships')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Applications</span>
            <Briefcase className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {user.applications.length}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              companies tracked
            </span>
          </div>
          <div className="mt-2 text-[11px] text-blue-700 font-medium">
            {user.applications.filter(a => a.status === 'Interview' || a.status === 'Offer').length} in active rounds
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => setActiveTab('progress')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Weekly Study Effort</span>
            <Clock className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {totalWeeklyHours.toFixed(1)}h
            </span>
            <span className="text-xs text-slate-500 font-mono">
              this week
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium">
            {user.streakDays} consecutive study days
          </div>
        </div>
      </div>

      {/* Main Content Split: Action Plan on Left, Roadmaps & Internships on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Daily Action Plan & Today's Schedule */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Action Checklist */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Today's Priority Plan</h3>
                <p className="text-xs text-slate-500">Curated daily tasks to maintain your study streak</p>
              </div>
              <span className="text-xs font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                {dailyTasks.filter(t => t.completed).length} / {dailyTasks.length} done
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {dailyTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleDailyTask(task.id, task.xp)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    task.completed
                      ? 'bg-slate-50/70 border-slate-200/60 text-slate-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <button className="mt-0.5 text-teal-600 shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 fill-teal-500 text-white" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400 hover:text-teal-600" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    <span className="text-[11px] text-teal-700 font-mono mt-0.5 inline-block">
                      +{task.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Want to practice coding now?</span>
              <button
                onClick={() => setActiveTab('coding')}
                className="text-blue-700 font-semibold hover:text-blue-800 inline-flex items-center gap-1"
              >
                Open Challenge Runner <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Quick Resume Readiness Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-xs border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">ATS Resume Scanner</h4>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                Score: 92/100
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Your resume format aligns with top tech recruiters: high action-verb density, GPA listed, and quantified impact metrics.
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>3 projects with GitHub & live URLs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Action verbs in 100% of experience bullets</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => setActiveTab('resume')}
                className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
              >
                Edit & Export Resume <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Roadmap Stage Deep Dive & High-Match Internships */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Roadmap Progress Box */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                  Active Learning Track
                </span>
                <h3 className="text-base font-bold text-slate-900">{activeRoadmap.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('roadmaps')}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  Switch Tracks <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {activeRoadmap.stages.map((stage, idx) => {
                const stageItemIds = stage.items.map(i => i.id);
                const completedInStage = stageItemIds.filter(id =>
                  user.completedRoadmapItemIds.includes(id)
                ).length;
                const isStageComplete = completedInStage === stageItemIds.length;

                return (
                  <div
                    key={stage.id}
                    className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">
                          {stage.stageName.split(':')[0]}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{stage.recommendedYear}</span>
                      </div>
                      <span className="font-mono text-slate-600 font-medium">
                        {completedInStage}/{stageItemIds.length} done
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 mb-2.5">
                      {stage.summary}
                    </p>

                    <div className="space-y-1.5">
                      {stage.items.slice(0, 2).map(item => {
                        const isDone = user.completedRoadmapItemIds.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleRoadmapItem(item.id, item.title)}
                            className="flex items-center justify-between p-2 rounded bg-white border border-slate-200/60 cursor-pointer hover:border-slate-300 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                              )}
                              <span className={`truncate ${isDone ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                {item.title}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-2">
                              {item.estimatedHours}h
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High-Match Internships Spotlight */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Featured Summer 2027 Internships</h3>
                <p className="text-xs text-slate-500">Roles accepting applications for {user.graduationYear} grads</p>
              </div>
              <button
                onClick={() => setActiveTab('internships')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
              >
                Browse All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {INTERNSHIPS_DATA.slice(0, 3).map(intern => {
                const isSaved = user.savedInternshipIds.includes(intern.id);
                const isApplied = user.applications.some(a => a.internshipId === intern.id);

                return (
                  <div key={intern.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg ${intern.accentColor} text-white font-bold flex items-center justify-center text-sm shrink-0`}
                      >
                        {intern.companyInitial}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{intern.company}</h4>
                          <span className="text-slate-400">·</span>
                          <span className="text-[11px] text-slate-500">{intern.workModel}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium truncate">{intern.role}</p>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="text-teal-700 font-semibold font-mono">{intern.stipend.split('(')[0]}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" /> Due {intern.deadline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isApplied ? (
                        <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded">
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => setActiveTab('internships')}
                          className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
