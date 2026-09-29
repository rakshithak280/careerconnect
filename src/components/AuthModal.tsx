import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicYear, GraduationYear, UserProfile } from '../types';
import {
  X,
  User,
  GraduationCap,
  Building,
  Mail,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Edit2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    user,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    switchProfile,
    signupUser,
    updateUserProfile,
    allProfiles,
    addNotification
  } = useApp();

  // Signup / Edit form states
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [university, setUniversity] = useState<string>(user.university);
  const [major, setMajor] = useState<string>(user.major);
  const [academicYear, setAcademicYear] = useState<AcademicYear>(user.academicYear);
  const [graduationYear, setGraduationYear] = useState<GraduationYear>(user.graduationYear);
  const [gpa, setGpa] = useState<string>(user.gpa);
  const [targetRole, setTargetRole] = useState<string>(user.targetRole);
  const [bio, setBio] = useState<string>(user.bio);

  if (!isAuthModalOpen) return null;

  const handleSaveProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      university,
      major,
      academicYear,
      graduationYear,
      gpa,
      targetRole,
      bio
    });
    setIsAuthModalOpen(false);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupUser({
      name,
      email,
      university,
      major,
      academicYear,
      graduationYear,
      gpa,
      targetRole
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Tabs */}
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <button
            onClick={() => setAuthMode('switch')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              authMode === 'switch'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Switch Profile
          </button>
          <button
            onClick={() => {
              setAuthMode('login');
              setName(user.name);
              setEmail(user.email);
              setUniversity(user.university);
              setMajor(user.major);
              setAcademicYear(user.academicYear);
              setGraduationYear(user.graduationYear);
              setGpa(user.gpa);
              setTargetRole(user.targetRole);
              setBio(user.bio);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              authMode === 'login'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              setAuthMode('signup');
              setName('');
              setEmail('');
              setUniversity('');
              setMajor('');
              setGpa('3.80');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              authMode === 'signup'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            + Create Account
          </button>
        </div>

        {/* SWITCH PROFILE VIEW */}
        {authMode === 'switch' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Switch Student Profile</h3>
              <p className="text-xs text-slate-500">
                Experience Ascend as different collegiate profiles with saved progress.
              </p>
            </div>

            <div className="space-y-2.5">
              {allProfiles.map(p => {
                const isCurrent = p.id === user.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => switchProfile(p.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-teal-50/70 border-teal-300 ring-2 ring-teal-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-teal-700 bg-teal-100/70 px-1.5 py-0.2 rounded">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{p.university}</p>
                        <p className="text-[11px] text-blue-700 font-medium truncate mt-0.5">
                          {p.academicYear} · {p.targetRole}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-teal-700">{p.xpPoints} XP</span>
                      <span className="text-[11px] text-slate-400 block font-mono">{p.streakDays}d streak</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Want to create your own college profile?</span>
              <button
                onClick={() => setAuthMode('signup')}
                className="text-blue-700 font-bold hover:underline"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        )}

        {/* EDIT PROFILE VIEW */}
        {authMode === 'login' && (
          <form onSubmit={handleSaveProfileEdit} className="space-y-3.5 text-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Edit Student Profile</h3>
              <p className="text-xs text-slate-500">Customize your collegiate details and target aspirations.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Student Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">University / College</label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Major & Concentration</label>
                <input
                  type="text"
                  required
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Year</label>
                <select
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value as AcademicYear)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Graduation Year</label>
                <select
                  value={graduationYear}
                  onChange={e => setGraduationYear(Number(e.target.value) as GraduationYear)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2028}>2028</option>
                  <option value={2029}>2029</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">GPA</label>
                <input
                  type="text"
                  value={gpa}
                  onChange={e => setGpa(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Career Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack SWE, AI Engineer"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* SIGNUP VIEW */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Create Student Account</h3>
              <p className="text-xs text-slate-500">
                Join Ascend to track roadmaps, solve code challenges, and build an ATS-ready resume.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">University Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jordan@stanford.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford University"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Major / Program *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Academic Year</label>
                <select
                  value={academicYear}
                  onChange={e => setAcademicYear(e.target.value as AcademicYear)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Graduation Year</label>
                <select
                  value={graduationYear}
                  onChange={e => setGraduationYear(Number(e.target.value) as GraduationYear)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value={2026}>2026</option>
                  <option value={2027}>2027</option>
                  <option value={2028}>2028</option>
                  <option value={2029}>2029</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Dream Career Role</label>
              <input
                type="text"
                placeholder="e.g. Full Stack SWE, AI Engineer"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors"
              >
                Complete Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
