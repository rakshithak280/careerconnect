import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INTERVIEW_QUESTIONS } from '../data/mockData';
import { InterviewQuestion } from '../types';
import {
  MessageSquareCode,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Award,
  ChevronRight,
  Eye,
  CheckSquare
} from 'lucide-react';

export const InterviewPrepView: React.FC = () => {
  const { addNotification } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion>(INTERVIEW_QUESTIONS[0]);

  // Mock Interview Simulator State
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [rubricScores, setRubricScores] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSelectQuestion = (q: InterviewQuestion) => {
    setActiveQuestion(q);
    setUserAnswer('');
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setShowModelAnswer(false);
    setRubricScores({});
  };

  const handleResetSimulator = () => {
    setUserAnswer('');
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setShowModelAnswer(false);
    setRubricScores({});
    addNotification('Simulator reset for a fresh attempt', 'info');
  };

  const toggleRubricItem = (idx: number) => {
    setRubricScores(prev => {
      const next = { ...prev, [idx]: !prev[idx] };
      const checkedCount = Object.values(next).filter(Boolean).length;
      if (checkedCount === activeQuestion.keyRubricPoints.length) {
        addNotification('All rubric criteria satisfied! +30 XP earned', 'success');
      }
      return next;
    });
  };

  const categories = ['All', 'Behavioral & STAR', 'Data Structures & Algorithms', 'System Architecture', 'Web & Backend API'];

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q =>
    selectedCategory === 'All' ? true : q.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wide">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Collegiate Technical & Behavioral Rehearsal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Interview Preparation & Mock Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Master standard tech questions, time your responses, and audit your answers against real recruiter evaluation rubrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/70 px-3 py-1.5 rounded-lg">
            High Frequency Question Bank
          </span>
        </div>
      </div>

      {/* Main Grid: Question List on Left, Mock Simulator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Question Bank List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Categories
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    selectedCategory === c
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredQuestions.map(q => {
              const isSelected = q.id === activeQuestion.id;

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-blue-700">{q.category}</span>
                    <span className="font-mono font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                      {q.frequency} Frequency
                    </span>
                  </div>

                  <h4
                    className={`text-xs font-bold line-clamp-2 leading-snug ${
                      isSelected ? 'text-blue-900' : 'text-slate-800'
                    }`}
                  >
                    {q.question}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Mock Simulator (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-5">
          {/* Active Question Display */}
          <div className="pb-4 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-blue-700">{activeQuestion.category}</span>
              <span className="font-mono text-slate-400">{activeQuestion.difficulty} Level</span>
            </div>

            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {activeQuestion.question}
            </h2>

            {/* STAR Framework Hint (if behavioral) */}
            {activeQuestion.starFrameworkTip && (
              <div className="mt-3 p-3 rounded-lg bg-teal-50 border border-teal-200/70 text-xs text-teal-950 space-y-1">
                <span className="font-bold flex items-center gap-1 text-teal-800">
                  <Sparkles className="w-3.5 h-3.5" /> STAR Response Strategy:
                </span>
                <p className="text-[11.5px] leading-relaxed text-teal-900">
                  <strong>S & T:</strong> {activeQuestion.starFrameworkTip.situation} ·{' '}
                  <strong>Action:</strong> {activeQuestion.starFrameworkTip.action} ·{' '}
                  <strong>Result:</strong> {activeQuestion.starFrameworkTip.result}
                </p>
              </div>
            )}
          </div>

          {/* Simulator Controls & Timer */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-md shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>

              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1 transition-colors ${
                  isTimerRunning
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" /> Start Timer
                  </>
                )}
              </button>

              <button
                onClick={handleResetSimulator}
                className="text-slate-500 hover:text-slate-800 p-1.5 transition-colors"
                title="Reset response & timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] text-slate-500">
              Recommended duration: <strong className="font-mono text-slate-800">2:00 – 3:00 mins</strong>
            </span>
          </div>

          {/* User Answer Text Area */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Draft Your Live Spoken or Written Response:
            </label>
            <textarea
              rows={5}
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Outline your situation, diagnosis, concrete technical decisions, and quantifiable outcome..."
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-hidden focus:border-blue-600 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Recruiter Evaluation Rubric Checklist */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-teal-600" /> Recruiter Evaluation Rubric
              </h4>
              <span className="font-mono text-xs font-semibold text-slate-600">
                {Object.values(rubricScores).filter(Boolean).length} / {activeQuestion.keyRubricPoints.length} Satisfied
              </span>
            </div>

            <div className="space-y-2">
              {activeQuestion.keyRubricPoints.map((point, idx) => {
                const isChecked = !!rubricScores[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleRubricItem(idx)}
                    className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-white transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className={isChecked ? 'text-teal-900 font-medium' : 'text-slate-700'}>
                      {point}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reveal Benchmark Model Answer Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-blue-700" />
              <span>{showModelAnswer ? 'Hide Model Answer' : 'Reveal Staff Engineer Benchmark Answer'}</span>
            </button>
          </div>

          {/* Benchmark Model Answer Display */}
          {showModelAnswer && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 text-xs leading-relaxed space-y-2 border border-slate-800">
              <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" /> Staff Engineer Benchmark Answer:
              </div>
              <p className="text-slate-200 text-[12.5px] leading-relaxed">
                {activeQuestion.modelAnswer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
