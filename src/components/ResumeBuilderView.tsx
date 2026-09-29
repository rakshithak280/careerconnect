import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ResumeData } from '../types';
import {
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RotateCcw,
  Eye,
  Edit3,
  ExternalLink,
  Target
} from 'lucide-react';

export const ResumeBuilderView: React.FC = () => {
  const { resumeData, updateResumeData, resetResumeData, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [editorSection, setEditorSection] = useState<'personal' | 'education' | 'experience' | 'projects' | 'skills'>('personal');

  // Real-time ATS Resume Scanner & Impact Scorer
  const atsAnalysis = useMemo(() => {
    let score = 0;
    const tips: string[] = [];

    // 1. Personal contact info completeness (20 pts)
    const { fullName, email, phone, location, github, linkedin } = resumeData.personalInfo;
    let contactPoints = 0;
    if (fullName) contactPoints += 5;
    if (email) contactPoints += 5;
    if (phone) contactPoints += 3;
    if (github || linkedin) contactPoints += 7;
    score += contactPoints;
    if (contactPoints < 20) tips.push('Add both your GitHub and LinkedIn profiles to boost ATS candidate discovery.');

    // 2. Education with GPA (15 pts)
    if (resumeData.education.length > 0) {
      score += 10;
      if (resumeData.education.some(e => e.gpa)) {
        score += 5;
      } else {
        tips.push('Include your cumulative or in-major GPA if it is 3.0 or higher.');
      }
    } else {
      tips.push('Add your undergraduate university and expected graduation date.');
    }

    // 3. Strong Action Verbs in Experience & Projects (30 pts)
    const strongVerbs = [
      'architected', 'engineered', 'built', 'developed', 'optimized',
      'implemented', 'spearheaded', 'reduced', 'increased', 'accelerated',
      'designed', 'deployed', 'scaled', 'automated', 'authored', 'mentored'
    ];

    const allBullets = [
      ...resumeData.experience.flatMap(e => e.bullets),
      ...resumeData.projects.flatMap(p => p.bullets)
    ];

    let bulletsWithActionVerbs = 0;
    let bulletsWithNumbers = 0;

    allBullets.forEach(b => {
      const lower = b.toLowerCase();
      if (strongVerbs.some(v => lower.includes(v))) {
        bulletsWithActionVerbs++;
      }
      // Check for numbers or metrics (%, $, digits)
      if (/[\d%+$]/.test(b)) {
        bulletsWithNumbers++;
      }
    });

    const actionRatio = allBullets.length > 0 ? bulletsWithActionVerbs / allBullets.length : 0;
    const numberRatio = allBullets.length > 0 ? bulletsWithNumbers / allBullets.length : 0;

    score += Math.round(actionRatio * 20);
    score += Math.round(numberRatio * 15);

    if (actionRatio < 0.7) {
      tips.push('Begin each bullet point with high-impact power verbs (e.g. "Architected", "Engineered", "Optimized").');
    }
    if (numberRatio < 0.6) {
      tips.push('Quantify project outcomes with numbers (e.g. "% latency reduction", "user count", "dataset size").');
    }

    // 4. Technical Skills density (20 pts)
    if (resumeData.skills.languages && resumeData.skills.frameworks) {
      score += 20;
    } else {
      tips.push('Categorize your technical skills into Languages, Frameworks, and Cloud/Developer Tools.');
    }

    return {
      score: Math.min(100, Math.max(25, score)),
      tips
    };
  }, [resumeData]);

  const handlePrintResume = () => {
    addNotification('Opening print dialog. Set margins to "None" or "Default" for clean PDF export.', 'info');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Helper updates for personal info
  const handlePersonalChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    updateResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  // Helper updates for skills
  const handleSkillsChange = (field: keyof ResumeData['skills'], value: string) => {
    updateResumeData({
      skills: {
        ...resumeData.skills,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">
            <FileText className="w-3.5 h-3.5" />
            <span>Collegiate Tech Resume Architecture</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            ATS-Optimized Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Engineered to pass recruiter screeners and Applicant Tracking Systems with quantifiable bullet points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Tab Toggle */}
          <div className="flex lg:hidden items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 rounded text-xs font-semibold ${
                activeTab === 'editor' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              <Edit3 className="w-3 h-3 inline mr-1" /> Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded text-xs font-semibold ${
                activeTab === 'preview' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3 h-3 inline mr-1" /> Preview
            </button>
          </div>

          <button
            onClick={resetResumeData}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1"
            title="Reset to UC Berkeley CS template"
          >
            <RotateCcw className="w-3 h-3" /> Template
          </button>

          <button
            onClick={handlePrintResume}
            className="print-include px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF / Print</span>
          </button>
        </div>
      </div>

      {/* ATS Health Check Bar (No-Print) */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
            <span className="font-mono text-xl font-bold text-teal-400">
              {atsAnalysis.score}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                ATS Recruiter Readiness Score
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {atsAnalysis.score >= 85
                ? 'Excellent: Strong action verbs, quantified results, and complete tech stack.'
                : 'Good start: Follow suggestions below to elevate recruiter response rates.'}
            </p>
          </div>
        </div>

        {atsAnalysis.tips.length > 0 && (
          <div className="text-xs text-amber-200 bg-amber-950/40 border border-amber-500/30 rounded-lg p-2.5 max-w-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{atsAnalysis.tips[0]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Split Workspace: Editor on Left, Live Resume Paper on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Resume Editor Form (No-Print) */}
        <div
          className={`lg:col-span-6 space-y-4 no-print ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'personal', label: 'Contact Info' },
              { id: 'education', label: 'Education' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setEditorSection(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  editorSection === tab.id
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Fields Container */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs text-xs space-y-4">
            {/* PERSONAL INFO SECTION */}
            {editorSection === 'personal' && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.fullName}
                      onChange={e => handlePersonalChange('fullName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={e => handlePersonalChange('email', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.phone}
                      onChange={e => handlePersonalChange('phone', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={e => handlePersonalChange('location', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.github}
                      onChange={e => handlePersonalChange('github', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.linkedin}
                      onChange={e => handlePersonalChange('linkedin', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Executive / Academic Summary</label>
                  <textarea
                    rows={3}
                    value={resumeData.personalInfo.summary}
                    onChange={e => handlePersonalChange('summary', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* EDUCATION SECTION */}
            {editorSection === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Education</h3>
                </div>

                {resumeData.education.map((edu, idx) => (
                  <div key={edu.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">University / College</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={e => {
                            const next = [...resumeData.education];
                            next[idx].school = e.target.value;
                            updateResumeData({ education: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Degree & Major</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={e => {
                            const next = [...resumeData.education];
                            next[idx].degree = e.target.value;
                            updateResumeData({ education: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">GPA</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={e => {
                            const next = [...resumeData.education];
                            next[idx].gpa = e.target.value;
                            updateResumeData({ education: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Graduation Date</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={e => {
                            const next = [...resumeData.education];
                            next[idx].endDate = e.target.value;
                            updateResumeData({ education: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Relevant Coursework</label>
                      <input
                        type="text"
                        value={edu.coursework}
                        onChange={e => {
                          const next = [...resumeData.education];
                          next[idx].coursework = e.target.value;
                          updateResumeData({ education: next });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EXPERIENCE SECTION */}
            {editorSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Work & Internship Experience</h3>
                </div>

                {resumeData.experience.map((exp, expIdx) => (
                  <div key={exp.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={e => {
                            const next = [...resumeData.experience];
                            next[expIdx].title = e.target.value;
                            updateResumeData({ experience: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={e => {
                            const next = [...resumeData.experience];
                            next[expIdx].company = e.target.value;
                            updateResumeData({ experience: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        Action-Oriented Bullet Points (Quantified)
                      </label>
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={e => {
                              const next = [...resumeData.experience];
                              next[expIdx].bullets[bIdx] = e.target.value;
                              updateResumeData({ experience: next });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white leading-relaxed"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PROJECTS SECTION */}
            {editorSection === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Technical Projects</h3>
                </div>

                {resumeData.projects.map((proj, pIdx) => (
                  <div key={proj.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={e => {
                            const next = [...resumeData.projects];
                            next[pIdx].name = e.target.value;
                            updateResumeData({ projects: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Technologies Used</label>
                        <input
                          type="text"
                          value={proj.technologies}
                          onChange={e => {
                            const next = [...resumeData.projects];
                            next[pIdx].technologies = e.target.value;
                            updateResumeData({ projects: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Project Bullet Points</label>
                      {proj.bullets.map((b, bIdx) => (
                        <textarea
                          key={bIdx}
                          rows={2}
                          value={b}
                          onChange={e => {
                            const next = [...resumeData.projects];
                            next[pIdx].bullets[bIdx] = e.target.value;
                            updateResumeData({ projects: next });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white leading-relaxed"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS SECTION */}
            {editorSection === 'skills' && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Technical Skills & Competencies
                </h3>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Languages</label>
                  <input
                    type="text"
                    value={resumeData.skills.languages}
                    onChange={e => handleSkillsChange('languages', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Frameworks & Libraries</label>
                  <input
                    type="text"
                    value={resumeData.skills.frameworks}
                    onChange={e => handleSkillsChange('frameworks', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Developer Tools & Platforms</label>
                  <input
                    type="text"
                    value={resumeData.skills.tools}
                    onChange={e => handleSkillsChange('tools', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Engineering Concepts</label>
                  <input
                    type="text"
                    value={resumeData.skills.concepts}
                    onChange={e => handleSkillsChange('concepts', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Crisp Resume Document Preview (Prints Pure White) */}
        <div
          className={`lg:col-span-6 w-full ${
            activeTab === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="print-only-container bg-white text-slate-900 p-8 sm:p-10 rounded-xl shadow-md border border-slate-200 font-sans min-h-[850px] leading-normal text-[12px]">
            {/* Header: Name & Contact Details */}
            <div className="text-center pb-3 border-b-2 border-slate-900">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                {resumeData.personalInfo.fullName || 'Student Name'}
              </h1>

              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-700">
                {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                {resumeData.personalInfo.phone && <span>· {resumeData.personalInfo.phone}</span>}
                {resumeData.personalInfo.location && <span>· {resumeData.personalInfo.location}</span>}
                {resumeData.personalInfo.linkedin && (
                  <span>· {resumeData.personalInfo.linkedin}</span>
                )}
                {resumeData.personalInfo.github && <span>· {resumeData.personalInfo.github}</span>}
              </div>
            </div>

            {/* Summary (if present) */}
            {resumeData.personalInfo.summary && (
              <div className="mt-3 text-xs text-slate-700 leading-relaxed text-justify">
                {resumeData.personalInfo.summary}
              </div>
            )}

            {/* Education Section */}
            {resumeData.education.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-mono">
                  Education
                </h2>
                {resumeData.education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{edu.school}</span>
                      <span className="font-normal text-slate-600 font-mono text-[11px]">{edu.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-800 text-[11.5px]">
                      <span>{edu.degree}</span>
                      <span className="font-mono text-slate-600 text-[11px]">{edu.endDate}</span>
                    </div>
                    {edu.gpa && (
                      <div className="text-[11px] text-slate-600">
                        Cumulative GPA: <strong className="font-mono">{edu.gpa}</strong>
                      </div>
                    )}
                    {edu.coursework && (
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        <span className="font-semibold text-slate-700">Relevant Coursework: </span>
                        {edu.coursework}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Experience Section */}
            {resumeData.experience.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-mono">
                  Experience
                </h2>
                {resumeData.experience.map(exp => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{exp.company}</span>
                      <span className="font-normal text-slate-600 font-mono text-[11px]">{exp.location}</span>
                    </div>
                    <div className="flex items-center justify-between italic text-slate-800 text-[11.5px] mb-1">
                      <span>{exp.title}</span>
                      <span className="font-mono not-italic text-slate-600 text-[11px]">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-[11.5px] leading-relaxed">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {resumeData.projects.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-mono">
                  Technical Projects
                </h2>
                {resumeData.projects.map(proj => (
                  <div key={proj.id} className="mb-3">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>
                        {proj.name} | <span className="font-normal italic text-slate-600 font-mono text-[11px]">{proj.technologies}</span>
                      </span>
                      {proj.githubUrl && (
                        <span className="text-[11px] font-mono text-blue-700">{proj.githubUrl}</span>
                      )}
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-[11.5px] leading-relaxed mt-1">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section */}
            <div className="mt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-mono">
                Technical Skills
              </h2>
              <div className="text-[11.5px] text-slate-700 space-y-1">
                {resumeData.skills.languages && (
                  <div>
                    <strong className="text-slate-900">Languages: </strong>
                    <span>{resumeData.skills.languages}</span>
                  </div>
                )}
                {resumeData.skills.frameworks && (
                  <div>
                    <strong className="text-slate-900">Frameworks & Tools: </strong>
                    <span>{resumeData.skills.frameworks}, {resumeData.skills.tools}</span>
                  </div>
                )}
                {resumeData.skills.concepts && (
                  <div>
                    <strong className="text-slate-900">Core Concepts: </strong>
                    <span>{resumeData.skills.concepts}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
