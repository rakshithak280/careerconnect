import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_ROADMAPS } from '../data/mockData';
import {
  Compass,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  PlayCircle,
  Code2,
  CheckCheck
} from 'lucide-react';

export const RoadmapsView: React.FC = () => {
  const {
    user,
    activeRoadmapId,
    setActiveRoadmapId,
    toggleRoadmapItem,
    addNotification
  } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [expandedStageId, setExpandedStageId] = useState<string>('stage_fs_1');

  const currentRoadmap =
    CAREER_ROADMAPS.find(r => r.id === activeRoadmapId) || CAREER_ROADMAPS[0];

  const allItems = currentRoadmap.stages.flatMap(s => s.items);
  const completedCount = allItems.filter(i =>
    user.completedRoadmapItemIds.includes(i.id)
  ).length;
  const progressPercent = Math.round((completedCount / Math.max(1, allItems.length)) * 100);

  const handleMarkAllInStage = (stageItems: Array<{ id: string; title: string }>) => {
    stageItems.forEach(item => {
      if (!user.completedRoadmapItemIds.includes(item.id)) {
        toggleRoadmapItem(item.id, item.title);
      }
    });
    addNotification('All stage items marked as completed', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header & Track Selector */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">
              <Compass className="w-3.5 h-3.5" />
              <span>Structured Career Pathways</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Collegiate Career Roadmaps
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Curated milestone trajectories designed for college students to land elite internships and new-grad roles.
            </p>
          </div>

          {/* Quick Progress Ring or Bar */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 p-3 rounded-xl min-w-[220px]">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">Track Mastery</span>
                <span className="font-mono text-teal-700 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {completedCount} of {allItems.length} milestones finished
              </span>
            </div>
          </div>
        </div>

        {/* Roadmap Track Tabs (Segmented controls) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CAREER_ROADMAPS.map(roadmap => {
            const isSelected = roadmap.id === activeRoadmapId;
            return (
              <button
                key={roadmap.id}
                onClick={() => {
                  setActiveRoadmapId(roadmap.id);
                  setExpandedStageId(roadmap.stages[0]?.id || '');
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <span>{roadmap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Highlight Details */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Primary Target Roles</span>
            <span className="text-slate-800 font-bold">{currentRoadmap.targetRole}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Est. Completion Timeline</span>
            <span className="text-slate-800 font-bold font-mono">{currentRoadmap.estimatedMonths} Months (Part-time during term)</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block text-[11px]">Average Starting Compensation</span>
            <span className="text-teal-700 font-bold font-mono">{currentRoadmap.averageSalary}</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Milestones ({allItems.length})
          </button>
          <button
            onClick={() => setFilterMode('pending')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterMode === 'pending'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Incomplete ({allItems.length - completedCount})
          </button>
          <button
            onClick={() => setFilterMode('completed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              filterMode === 'completed'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline">
          Click any milestone check to toggle progress & earn +25 XP
        </span>
      </div>

      {/* Stages Accordion List */}
      <div className="space-y-4">
        {currentRoadmap.stages.map((stage, sIdx) => {
          const isExpanded = expandedStageId === stage.id || expandedStageId === '';
          const stageItemIds = stage.items.map(i => i.id);
          const stageDoneCount = stageItemIds.filter(id =>
            user.completedRoadmapItemIds.includes(id)
          ).length;
          const isStageFinished = stageDoneCount === stageItemIds.length;

          const filteredStageItems = stage.items.filter(item => {
            const isDone = user.completedRoadmapItemIds.includes(item.id);
            if (filterMode === 'completed') return isDone;
            if (filterMode === 'pending') return !isDone;
            return true;
          });

          if (filteredStageItems.length === 0 && filterMode !== 'all') {
            return null;
          }

          return (
            <div
              key={stage.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
            >
              {/* Stage Header */}
              <div
                onClick={() => setExpandedStageId(isExpanded ? '' : stage.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors border-b border-slate-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isStageFinished
                        ? 'bg-teal-600 text-white'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {isStageFinished ? <CheckCheck className="w-4 h-4" /> : `0${sIdx + 1}`}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                        {stage.stageName}
                      </h3>
                      <span className="text-slate-400 hidden sm:inline">·</span>
                      <span className="text-xs text-slate-500 hidden sm:inline">{stage.recommendedYear}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{stage.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs text-slate-600 font-semibold bg-slate-100 px-2 py-1 rounded">
                    {stageDoneCount} / {stage.items.length} done
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleMarkAllInStage(stage.items);
                    }}
                    className="hidden sm:inline-flex text-xs font-semibold text-teal-700 hover:text-teal-800 px-2 py-1 rounded hover:bg-teal-50"
                  >
                    Mark stage done
                  </button>
                </div>
              </div>

              {/* Stage Items Grid */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-3 bg-slate-50/40">
                  {filteredStageItems.map(item => {
                    const isDone = user.completedRoadmapItemIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isDone
                            ? 'bg-white/80 border-slate-200/80 shadow-xs'
                            : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <button
                              onClick={() => toggleRoadmapItem(item.id, item.title)}
                              className="mt-0.5 text-teal-600 shrink-0 hover:scale-110 transition-transform"
                              aria-label={`Toggle completion of ${item.title}`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 fill-teal-500 text-white" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300 hover:text-teal-600" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4
                                  className={`text-sm font-bold ${
                                    isDone ? 'line-through text-slate-400' : 'text-slate-900'
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {item.category}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {item.description}
                              </p>

                              {/* Skills Covered (Unboxed metadata with separators) */}
                              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span className="font-semibold text-slate-600">Core Skills:</span>
                                {item.skills.map((skill, skIdx) => (
                                  <React.Fragment key={skill}>
                                    <span className="font-medium text-slate-700">{skill}</span>
                                    {skIdx < item.skills.length - 1 && <span className="text-slate-300">·</span>}
                                  </React.Fragment>
                                ))}
                              </div>

                              {/* Curated Resources */}
                              {item.resources && item.resources.length > 0 && (
                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                                  <span className="text-[11px] font-semibold text-slate-400">
                                    Learning Resources:
                                  </span>
                                  {item.resources.map(res => (
                                    <a
                                      key={res.title}
                                      href={res.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                                    >
                                      {res.type === 'video' && <PlayCircle className="w-3 h-3" />}
                                      {res.type === 'practice' && <Code2 className="w-3 h-3" />}
                                      {res.type === 'guide' && <BookOpen className="w-3 h-3" />}
                                      <span>{res.title}</span>
                                      <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <span className="font-mono text-xs font-semibold text-slate-500 flex items-center gap-1 justify-end">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {item.estimatedHours}h
                            </span>
                            <span className="text-[11px] font-mono text-teal-700 mt-1 block">
                              +25 XP
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
