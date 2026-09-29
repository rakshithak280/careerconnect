import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INTERNSHIPS_DATA } from '../data/mockData';
import { Internship, ApplicationItem } from '../types';
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Bookmark,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  ArrowRight,
  ExternalLink,
  Building,
  Filter
} from 'lucide-react';

export const InternshipsView: React.FC = () => {
  const {
    user,
    toggleSaveInternship,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'explore' | 'tracker'>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [workModelFilter, setWorkModelFilter] = useState<string>('All');
  const [gradYearFilter, setGradYearFilter] = useState<string>('All');

  // Custom Application Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newCompany, setNewCompany] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newStipend, setNewStipend] = useState<string>('$55 / hr');
  const [newStatus, setNewStatus] = useState<ApplicationItem['status']>('Applied');
  const [newNotes, setNewNotes] = useState<string>('');

  const filteredInternships = INTERNSHIPS_DATA.filter(intern => {
    const matchesSearch =
      intern.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesModel =
      workModelFilter === 'All' || intern.workModel === workModelFilter;

    const matchesGrad =
      gradYearFilter === 'All' ||
      intern.eligibleGradYears.includes(Number(gradYearFilter));

    return matchesSearch && matchesModel && matchesGrad;
  });

  const handleQuickApplyOrTrack = (intern: Internship) => {
    const alreadyApplied = user.applications.some(a => a.internshipId === intern.id);
    if (alreadyApplied) {
      addNotification(`Already tracking application for ${intern.company}`, 'info');
      setActiveTab('tracker');
      return;
    }

    addApplication({
      internshipId: intern.id,
      company: intern.company,
      role: intern.role,
      location: intern.location,
      stipend: intern.stipend,
      status: 'Applied',
      notes: `Applied on Ascend platform. Deadline: ${intern.deadline}`,
      deadline: intern.deadline
    });

    setActiveTab('tracker');
  };

  const handleCreateCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    addApplication({
      internshipId: 'custom_' + Date.now(),
      company: newCompany.trim(),
      role: newRole.trim(),
      location: newLocation.trim() || 'Remote / Hybrid',
      stipend: newStipend.trim(),
      status: newStatus,
      notes: newNotes.trim()
    });

    setIsAddModalOpen(false);
    setNewCompany('');
    setNewRole('');
    setNewLocation('');
    setNewNotes('');
  };

  const statusColumns: ApplicationItem['status'][] = [
    'Saved',
    'Applied',
    'Screening',
    'Interview',
    'Offer'
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & View Switcher */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wide">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Summer 2027 Recruiting Central</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Collegiate Internships & Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Verified university opportunities with competitive stipends, direct pipeline deadlines, and a real-time status tracker.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'explore'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Roles ({INTERNSHIPS_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'tracker'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>My Applications</span>
              <span className="font-mono text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full">
                {user.applications.length}
              </span>
            </button>
          </div>

          {activeTab === 'tracker' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Application</span>
            </button>
          )}
        </div>
      </div>

      {/* EXPLORE TAB */}
      {activeTab === 'explore' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filters:
              </span>

              {/* Work Model Filter */}
              <select
                value={workModelFilter}
                onChange={e => setWorkModelFilter(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
              >
                <option value="All">All Locations</option>
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>

              {/* Grad Year Filter */}
              <select
                value={gradYearFilter}
                onChange={e => setGradYearFilter(e.target.value)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
              >
                <option value="All">All Grad Years</option>
                <option value="2026">Class of 2026</option>
                <option value="2027">Class of 2027</option>
                <option value="2028">Class of 2028</option>
              </select>
            </div>

            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search companies, roles, skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-hidden focus:border-blue-600 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Internships List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredInternships.map(intern => {
              const isSaved = user.savedInternshipIds.includes(intern.id);
              const isApplied = user.applications.some(a => a.internshipId === intern.id);

              return (
                <div
                  key={intern.id}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Logo initial, Company, Work model, Save toggle */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${intern.accentColor} text-white font-bold flex items-center justify-center text-base shadow-xs shrink-0`}
                        >
                          {intern.companyInitial}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{intern.company}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {intern.location}
                            </span>
                            <span>·</span>
                            <span className="font-semibold text-slate-700">{intern.workModel}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveInternship(intern.id, intern.company)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                        title={isSaved ? 'Saved to Watchlist' : 'Save to Watchlist'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700' : ''}`} />
                      </button>
                    </div>

                    {/* Role Title */}
                    <h4 className="text-base font-bold text-slate-900 mt-3.5 leading-snug">
                      {intern.role}
                    </h4>

                    {/* Stipend & Duration */}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                        {intern.stipend}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {intern.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {intern.description}
                    </p>

                    {/* Eligibility & Tags */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Eligible:</span>
                      {intern.eligibleGradYears.map((yr, idx) => (
                        <span key={yr} className="font-mono">
                          '{yr.toString().slice(2)}{idx < intern.eligibleGradYears.length - 1 ? ',' : ''}
                        </span>
                      ))}
                      <span className="text-slate-300">·</span>
                      {intern.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span className="text-slate-600 font-medium">{tag}</span>
                          {tIdx < intern.tags.length - 1 && <span className="text-slate-300">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> Due: {intern.deadline}
                    </span>

                    {isApplied ? (
                      <span className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-800 font-semibold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Tracking in Pipeline
                      </span>
                    ) : (
                      <button
                        onClick={() => handleQuickApplyOrTrack(intern)}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Apply & Track</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TRACKER TAB */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="text-slate-600">
                Total Applications: <strong className="font-mono text-slate-900">{user.applications.length}</strong>
              </span>
              <span className="text-slate-600">
                In Active Rounds: <strong className="font-mono text-blue-700">
                  {user.applications.filter(a => a.status === 'Screening' || a.status === 'Interview').length}
                </strong>
              </span>
              <span className="text-slate-600">
                Offers Received: <strong className="font-mono text-emerald-700">
                  {user.applications.filter(a => a.status === 'Offer').length}
                </strong>
              </span>
            </div>

            <span className="text-slate-400 text-[11px]">
              Use status selectors below to progress companies through your recruiting funnel.
            </span>
          </div>

          {/* Kanban / Multi-Column View */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {statusColumns.map(status => {
              const items = user.applications.filter(a => a.status === status);

              return (
                <div
                  key={status}
                  className="bg-slate-100/70 rounded-xl p-3 border border-slate-200/70 flex flex-col min-h-[350px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
                    <span className="font-bold text-xs text-slate-800">{status}</span>
                    <span className="font-mono text-xs font-semibold px-1.5 py-0.5 bg-white text-slate-600 rounded">
                      {items.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    {items.map(app => (
                      <div
                        key={app.id}
                        className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900 leading-tight">{app.company}</h4>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{app.role}</p>
                          </div>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="text-slate-300 hover:text-red-500 p-0.5 transition-colors"
                            title="Remove from tracker"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {app.stipend && (
                          <div className="text-[10px] font-mono text-teal-700 font-semibold">
                            {app.stipend}
                          </div>
                        )}

                        {app.notes && (
                          <p className="text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100 leading-relaxed">
                            {app.notes}
                          </p>
                        )}

                        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[10px] text-slate-400">Move:</span>
                          <select
                            value={app.status}
                            onChange={e =>
                              updateApplicationStatus(
                                app.id,
                                e.target.value as ApplicationItem['status']
                              )
                            }
                            className="text-[10px] font-medium bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700"
                          >
                            {statusColumns.map(s => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}

                    {items.length === 0 && (
                      <div className="h-24 flex items-center justify-center text-[11px] text-slate-400 text-center px-2">
                        No applications in {status}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Custom Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Log New Application</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add any campus referral, career fair lead, or direct employer submission.
            </p>

            <form onSubmit={handleCreateCustomApp} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OpenAI, Tesla, Palantir"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SWE Intern, Data Analyst"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New York, Hybrid"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as ApplicationItem['status'])}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden bg-white"
                  >
                    {statusColumns.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Notes / Interview Date</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Reached out on LinkedIn to alumni; OA sent."
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
                >
                  Add to Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
