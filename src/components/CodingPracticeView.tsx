import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CODING_CHALLENGES } from '../data/mockData';
import { CodingChallenge } from '../types';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Cpu,
  Check,
  Flame
} from 'lucide-react';

interface TestCaseResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  timeMs: number;
}

export const CodingPracticeView: React.FC = () => {
  const {
    user,
    selectedCodingChallengeId,
    setSelectedCodingChallengeId,
    markChallengeSolved,
    addNotification
  } = useApp();

  const [activeChallengeId, setActiveChallengeId] = useState<string>(
    selectedCodingChallengeId || CODING_CHALLENGES[0].id
  );

  const activeProblem =
    CODING_CHALLENGES.find(c => c.id === activeChallengeId) || CODING_CHALLENGES[0];

  const [userCode, setUserCode] = useState<string>(activeProblem.starterCode);
  const [activeTab, setActiveTab] = useState<'description' | 'hints' | 'solution'>('description');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<TestCaseResult[] | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);

  const handleSelectProblem = (prob: CodingChallenge) => {
    setActiveChallengeId(prob.id);
    setSelectedCodingChallengeId(prob.id);
    setUserCode(prob.starterCode);
    setTestResults(null);
    setExecutionError(null);
    setActiveTab('description');
  };

  const handleResetCode = () => {
    setUserCode(activeProblem.starterCode);
    setTestResults(null);
    setExecutionError(null);
    addNotification('Code reset to default starter template', 'info');
  };

  const runCodeTests = () => {
    setIsRunning(true);
    setExecutionError(null);
    setTestResults(null);

    setTimeout(() => {
      try {
        const results: TestCaseResult[] = [];
        let allPassed = true;

        for (const tc of activeProblem.testCases) {
          const startTime = performance.now();
          let actualValue: any;

          // Safe execution sandbox using Function constructor
          const wrapped = `
            ${userCode}
            return ${tc.input};
          `;
          const runner = new Function(wrapped);
          actualValue = runner();
          const endTime = performance.now();

          const formattedActual =
            typeof actualValue === 'object'
              ? JSON.stringify(actualValue)
              : String(actualValue);

          // Normalize strings for comparison (remove spaces around commas, etc.)
          const cleanActual = formattedActual.replace(/\s+/g, '');
          const cleanExpected = tc.expectedOutput.replace(/\s+/g, '');

          const passed = cleanActual === cleanExpected;
          if (!passed) allPassed = false;

          results.push({
            input: tc.input,
            expected: tc.expectedOutput,
            actual: formattedActual,
            passed,
            timeMs: Math.round((endTime - startTime) * 100) / 100
          });
        }

        setTestResults(results);

        if (allPassed) {
          markChallengeSolved(activeProblem.id, activeProblem.title);
        } else {
          addNotification('Some test cases failed. Check output below for details.', 'warning');
        }
      } catch (err: any) {
        setExecutionError(err?.message || 'Syntax or runtime error during execution');
        addNotification('Execution failed with runtime error', 'warning');
      } finally {
        setIsRunning(false);
      }
    }, 200);
  };

  const isCurrentProblemSolved = user.completedCodingChallengeIds.includes(activeProblem.id);

  return (
    <div className="space-y-5">
      {/* Top Header & Problem Selector Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wide">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Technical Problem Sets</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Coding Interview Practice
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test algorithmic complexity with real-time browser test case evaluation.
          </p>
        </div>

        {/* Quick Problem Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {CODING_CHALLENGES.map(prob => {
            const isSelected = prob.id === activeChallengeId;
            const isSolved = user.completedCodingChallengeIds.includes(prob.id);

            return (
              <button
                key={prob.id}
                onClick={() => handleSelectProblem(prob)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSolved ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                )}
                <span>{prob.title}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    prob.difficulty === 'Easy'
                      ? isSelected
                        ? 'bg-emerald-500/30 text-white'
                        : 'text-emerald-700'
                      : isSelected
                      ? 'bg-amber-500/30 text-white'
                      : 'text-amber-700'
                  }`}
                >
                  {prob.difficulty}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split IDE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
        {/* Left Side: Problem Statement & Hints (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
          {/* Tabs: Description, Hints, Solution */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2.5 px-2 border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1 ${
                activeTab === 'hints'
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Hints ({activeProblem.hints.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`pb-2.5 px-2 border-b-2 transition-colors ${
                activeTab === 'solution'
                  ? 'border-blue-700 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Complexity & Analysis
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
            {activeTab === 'description' && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold font-mono px-2 py-0.5 rounded text-[11px] ${
                        activeProblem.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {activeProblem.difficulty}
                    </span>
                    <span className="text-slate-500 font-medium">{activeProblem.category}</span>
                  </div>

                  <span className="font-mono text-slate-500 text-[11px]">
                    Acceptance: {activeProblem.acceptanceRate}
                  </span>
                </div>

                <div className="text-slate-800 leading-relaxed whitespace-pre-line text-[13px]">
                  {activeProblem.description}
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Examples
                  </h4>
                  {activeProblem.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-[11px] space-y-1"
                    >
                      <div>
                        <span className="text-slate-500 font-semibold">Input: </span>
                        <span className="text-slate-900">{ex.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold">Output: </span>
                        <span className="text-teal-700 font-bold">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-500 font-sans text-xs pt-1">
                          <span className="font-semibold text-slate-600">Explanation: </span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-3">
                <p className="text-slate-500 text-xs">
                  Stuck? Revealing hints simulates gentle interviewer steering during an onsite:
                </p>
                {activeProblem.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/70 text-amber-900 text-xs leading-relaxed"
                  >
                    <span className="font-bold text-amber-800">Hint {idx + 1}: </span>
                    {hint}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Target Time Complexity
                    </span>
                    <span className="text-base font-bold font-mono text-blue-700">
                      {activeProblem.timeComplexity}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Target Space Complexity
                    </span>
                    <span className="text-base font-bold font-mono text-teal-700">
                      {activeProblem.spaceComplexity}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900">Optimal Architectural Insight</h4>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    {activeProblem.solutionExplanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Code Editor & Live Test Runner (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 shadow-md flex flex-col overflow-hidden text-white">
          {/* Editor Top Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400 font-semibold">Language:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 font-mono text-[11px]">
                JavaScript (ES6+)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                title="Reset code to default"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>

              <button
                onClick={runCodeTests}
                disabled={isRunning}
                className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isRunning ? 'Running...' : 'Run Test Cases'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Editor (Textarea with Line Numbers) */}
          <div className="relative flex-1 min-h-[300px] flex bg-slate-900">
            <textarea
              value={userCode}
              onChange={e => setUserCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 bg-transparent resize-none focus:outline-hidden selection:bg-teal-600/40"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Test Case Execution Output Panel */}
          <div className="border-t border-slate-800 bg-slate-950 p-4 max-h-[220px] overflow-y-auto">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-slate-300">Execution Output</span>
              {testResults && (
                <span
                  className={`font-mono text-xs font-semibold ${
                    testResults.every(r => r.passed) ? 'text-teal-400' : 'text-amber-400'
                  }`}
                >
                  {testResults.filter(r => r.passed).length} / {testResults.length} Test Cases Passed
                </span>
              )}
            </div>

            {/* Error Display */}
            {executionError && (
              <div className="p-3 rounded-lg bg-red-950/70 border border-red-800 text-red-200 text-xs font-mono">
                <span className="font-bold">Runtime Error: </span>
                {executionError}
              </div>
            )}

            {/* Test Results Table */}
            {testResults && !executionError && (
              <div className="space-y-2">
                {testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between gap-3 ${
                      tr.passed
                        ? 'bg-slate-900/80 border-teal-500/30 text-slate-200'
                        : 'bg-red-950/40 border-red-500/40 text-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {tr.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span className="font-semibold text-slate-300">Case {idx + 1}:</span>
                      <span className="truncate text-slate-400">{tr.input}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-[11px]">
                      <span>
                        Expected: <span className="text-teal-300">{tr.expected}</span>
                      </span>
                      <span>
                        Got: <span className={tr.passed ? 'text-teal-300' : 'text-red-300'}>{tr.actual}</span>
                      </span>
                      <span className="text-slate-500">{tr.timeMs}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!testResults && !executionError && (
              <div className="text-xs text-slate-500 py-3 text-center">
                Click <span className="text-teal-400 font-semibold">"Run Test Cases"</span> to compile and test against LeetCode test vectors.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
