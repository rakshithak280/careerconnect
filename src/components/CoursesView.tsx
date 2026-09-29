import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURATED_COURSES } from '../data/mockData';
import { Course, CourseLesson } from '../types';
import {
  BookOpen,
  Search,
  Star,
  Clock,
  Users,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Code2,
  Award,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CoursesView: React.FC = () => {
  const { user, toggleCourseLesson, addNotification } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<Course | null>(null);

  const categories = ['All', 'Software Engineering', 'Data & AI', 'Career Foundations'];

  const filteredCourses = CURATED_COURSES.filter(course => {
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCourseProgress = (course: Course) => {
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    const completedCount = allLessonIds.filter(id => user.completedLessonIds.includes(id)).length;
    const percent = Math.round((completedCount / Math.max(1, allLessonIds.length)) * 100);
    return { completedCount, totalCount: allLessonIds.length, percent };
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wide">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Academic & Industry Syllabi</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Curated Technical Courses
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              High-yield, project-driven modules authored by top faculty and industry staff engineers to bridge university theory with production engineering.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/60 px-3 py-1.5 rounded-lg">
              {user.completedLessonIds.length} Lessons Completed
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map(course => {
          const { completedCount, totalCount, percent } = getCourseProgress(course);
          const isComplete = percent === 100;

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-blue-700">{course.category}</span>
                  <div className="flex items-center gap-1 text-amber-600 font-semibold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400">({course.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {course.instructor} · <span className="text-slate-600">{course.institution}</span>
                </p>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {course.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.durationHours} hrs total
                  </span>
                  <span className="font-semibold text-slate-700">
                    {course.level} Level
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {course.studentsCount.toLocaleString()} enrolled
                  </span>
                </div>
              </div>

              {/* Course Footer Progress & CTA */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex-1 max-w-[180px]">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                    <span>Progress</span>
                    <span className="font-mono font-semibold text-teal-700">{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-teal-600 h-1.5 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isComplete && (
                    <button
                      onClick={() => setShowCertificateModal(course)}
                      className="px-2.5 py-1.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold hover:bg-emerald-200 transition-colors flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-700" /> Certificate
                    </button>
                  )}
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="px-3 py-1.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>{percent > 0 ? 'Resume Lessons' : 'Start Course'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail & Lesson Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  {activeCourseModal.category} · {activeCourseModal.level}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">{activeCourseModal.title}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Instructor: {activeCourseModal.instructor} ({activeCourseModal.institution})
                </p>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Syllabus Modules */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 rounded-lg bg-teal-50 border border-teal-200/60 text-xs text-teal-900">
                <span className="font-bold">Course Syllabus:</span> Click the checkmark to mark lessons as completed. Completing all lessons generates your verified Ascend Course Certificate!
              </div>

              {activeCourseModal.modules.map(module => (
                <div key={module.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 text-xs font-bold text-slate-800">
                    {module.title}
                  </div>
                  <div className="divide-y divide-slate-100">
                    {module.lessons.map(lesson => {
                      const isLessonDone = user.completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              onClick={() =>
                                toggleCourseLesson(activeCourseModal.id, lesson.id, lesson.title)
                              }
                              className="text-teal-600 shrink-0 hover:scale-110 transition-transform"
                            >
                              {isLessonDone ? (
                                <CheckCircle2 className="w-4 h-4 fill-teal-500 text-white" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-300 hover:text-teal-600" />
                              )}
                            </button>

                            <div className="min-w-0">
                              <p
                                className={`text-xs font-medium truncate ${
                                  isLessonDone ? 'line-through text-slate-400' : 'text-slate-800'
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                <span className="capitalize">{lesson.type}</span>
                                <span>·</span>
                                <span className="font-mono">{lesson.durationMinutes} mins</span>
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            <span className="text-[11px] font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                              +20 XP
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {getCourseProgress(activeCourseModal).completedCount} / {getCourseProgress(activeCourseModal).totalCount} lessons completed
              </span>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
            <button
              onClick={() => setShowCertificateModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Elegant Certificate Border */}
            <div className="p-6 border-4 border-double border-teal-600/60 rounded-xl bg-gradient-to-b from-teal-50/30 to-white">
              <div className="w-12 h-12 mx-auto rounded-full bg-teal-600 text-white flex items-center justify-center mb-3 shadow-md">
                <Award className="w-7 h-7" />
              </div>

              <span className="text-[11px] font-mono tracking-widest text-teal-700 uppercase font-bold">
                Certificate of Academic Excellence
              </span>

              <h2 className="text-xl font-black text-slate-900 mt-2">
                {user.name}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Student of {user.university}
              </p>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed max-w-md mx-auto">
                Has successfully completed all technical lab modules, problem sets, and production architecture evaluations for:
              </p>

              <h3 className="text-base font-extrabold text-blue-900 mt-2">
                {showCertificateModal.title}
              </h3>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <div>
                  <p className="font-bold text-slate-800">{showCourseDate()}</p>
                  <p>Issue Date</p>
                </div>
                <div>
                  <p className="font-bold text-slate-800">ASCEND-VERIFIED-{Math.floor(Math.random()*900000 + 100000)}</p>
                  <p>Credential ID</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  addNotification('Certificate added to your Student Profile & Resume', 'success');
                  setShowCertificateModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold text-xs hover:bg-teal-700 transition-colors"
              >
                Add to Resume Credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function showCourseDate() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
