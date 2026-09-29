import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ApplicationItem,
  ResumeData
} from '../types';
import {
  DEMO_PROFILES,
  INITIAL_RESUME_DATA
} from '../data/mockData';

export type AppTab =
  | 'dashboard'
  | 'roadmaps'
  | 'courses'
  | 'coding'
  | 'internships'
  | 'resume'
  | 'interview'
  | 'progress';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  user: UserProfile;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  activeRoadmapId: string;
  setActiveRoadmapId: (id: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedCodingChallengeId: string | null;
  setSelectedCodingChallengeId: (id: string | null) => void;
  toggleRoadmapItem: (itemId: string, itemTitle?: string) => void;
  toggleCourseLesson: (courseId: string, lessonId: string, lessonTitle?: string) => void;
  markChallengeSolved: (challengeId: string, challengeTitle?: string) => void;
  toggleSaveInternship: (internshipId: string, companyName?: string) => void;
  addApplication: (item: Omit<ApplicationItem, 'id' | 'appliedDate'>) => void;
  updateApplicationStatus: (id: string, status: ApplicationItem['status'], notes?: string) => void;
  deleteApplication: (id: string) => void;
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
  notifications: ToastNotification[];
  addNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeNotification: (id: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'switch';
  setAuthMode: (mode: 'login' | 'signup' | 'switch') => void;
  switchProfile: (profileId: string) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  signupUser: (data: Partial<UserProfile>) => void;
  allProfiles: UserProfile[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'ascend_student_profile_v2';
const RESUME_STORAGE_KEY = 'ascend_student_resume_v2';
const PROFILES_STORAGE_KEY = 'ascend_all_profiles_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>(() => {
    try {
      const stored = localStorage.getItem(PROFILES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return DEMO_PROFILES;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return DEMO_PROFILES[0];
  });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(RESUME_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_RESUME_DATA;
  });

  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>('roadmap_fullstack');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCodingChallengeId, setSelectedCodingChallengeId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'switch'>('login');

  // Sync user state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      // update user in allProfiles
      setAllProfiles(prev => {
        const next = prev.map(p => (p.id === user.id ? user : p));
        localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    } catch {
      // storage unavailable
    }
  }, [user]);

  // Sync resume state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resumeData));
    } catch {
      // storage unavailable
    }
  }, [resumeData]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setNotifications(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const switchProfile = (profileId: string) => {
    const target = allProfiles.find(p => p.id === profileId);
    if (target) {
      setUser(target);
      addNotification(`Switched profile to ${target.name} (${target.major})`, 'info');
      setIsAuthModalOpen(false);
    }
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...data
    }));
    addNotification('Profile updated successfully', 'success');
  };

  const signupUser = (data: Partial<UserProfile>) => {
    const newProfile: UserProfile = {
      id: 'user_' + Date.now(),
      name: data.name || 'New Student',
      email: data.email || 'student@university.edu',
      avatar: '/src/assets/images/avatar_student_male_1790694919249.jpg',
      university: data.university || 'State University',
      major: data.major || 'Computer Science',
      academicYear: data.academicYear || 'Freshman',
      graduationYear: data.graduationYear || 2028,
      gpa: data.gpa || '3.50',
      targetRole: data.targetRole || 'Software Engineer',
      bio: 'Enthusiastic student building my career foundation.',
      skills: ['Python', 'Git', 'Problem Solving'],
      dreamCompanies: ['Google', 'Microsoft', 'Stripe'],
      streakDays: 1,
      xpPoints: 100,
      completedRoadmapItemIds: [],
      completedCourseIds: [],
      completedLessonIds: [],
      completedCodingChallengeIds: [],
      savedInternshipIds: [],
      applications: [],
      weeklyHours: [1.0, 1.5, 2.0, 1.0, 1.5, 2.0, 1.0]
    };
    setAllProfiles(prev => [...prev, newProfile]);
    setUser(newProfile);
    setIsAuthModalOpen(false);
    addNotification(`Welcome to Ascend, ${newProfile.name}! +100 Welcome XP`, 'success');
  };

  const toggleRoadmapItem = (itemId: string, itemTitle?: string) => {
    setUser(prev => {
      const exists = prev.completedRoadmapItemIds.includes(itemId);
      const nextItems = exists
        ? prev.completedRoadmapItemIds.filter(id => id !== itemId)
        : [...prev.completedRoadmapItemIds, itemId];

      const xpDelta = exists ? -25 : 25;
      const nextXp = Math.max(0, prev.xpPoints + xpDelta);

      if (!exists) {
        addNotification(`Completed: "${itemTitle || 'Roadmap Step'}" (+25 XP)`, 'success');
      }

      return {
        ...prev,
        completedRoadmapItemIds: nextItems,
        xpPoints: nextXp
      };
    });
  };

  const toggleCourseLesson = (courseId: string, lessonId: string, lessonTitle?: string) => {
    setUser(prev => {
      const exists = prev.completedLessonIds.includes(lessonId);
      const nextLessons = exists
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];

      const completedCourses = prev.completedCourseIds;
      if (!exists && !completedCourses.includes(courseId)) {
        // mark enrolled/started
      }

      if (!exists) {
        addNotification(`Lesson completed: "${lessonTitle || 'Course lesson'}" (+20 XP)`, 'success');
      }

      return {
        ...prev,
        completedLessonIds: nextLessons,
        xpPoints: prev.xpPoints + (exists ? -20 : 20)
      };
    });
  };

  const markChallengeSolved = (challengeId: string, challengeTitle?: string) => {
    setUser(prev => {
      if (prev.completedCodingChallengeIds.includes(challengeId)) {
        addNotification(`Re-tested: "${challengeTitle || 'Challenge'}" - All test cases passed!`, 'success');
        return prev;
      }
      addNotification(`Challenge solved: "${challengeTitle || 'Problem'}" (+50 XP)`, 'success');
      return {
        ...prev,
        completedCodingChallengeIds: [...prev.completedCodingChallengeIds, challengeId],
        xpPoints: prev.xpPoints + 50,
        streakDays: prev.streakDays + 1
      };
    });
  };

  const toggleSaveInternship = (internshipId: string, companyName?: string) => {
    setUser(prev => {
      const exists = prev.savedInternshipIds.includes(internshipId);
      const nextSaved = exists
        ? prev.savedInternshipIds.filter(id => id !== internshipId)
        : [...prev.savedInternshipIds, internshipId];

      addNotification(
        exists ? `Removed ${companyName || 'internship'} from saved` : `Saved ${companyName || 'internship'} to watchlist`,
        'info'
      );

      return {
        ...prev,
        savedInternshipIds: nextSaved
      };
    });
  };

  const addApplication = (item: Omit<ApplicationItem, 'id' | 'appliedDate'>) => {
    const newApp: ApplicationItem = {
      ...item,
      id: 'app_' + Date.now(),
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setUser(prev => ({
      ...prev,
      applications: [newApp, ...prev.applications]
    }));
    addNotification(`Added application for ${item.company} (${item.status})`, 'success');
  };

  const updateApplicationStatus = (id: string, status: ApplicationItem['status'], notes?: string) => {
    setUser(prev => ({
      ...prev,
      applications: prev.applications.map(app => {
        if (app.id === id) {
          return {
            ...app,
            status,
            notes: notes !== undefined ? notes : app.notes
          };
        }
        return app;
      })
    }));
    addNotification(`Application status updated to "${status}"`, 'info');
  };

  const deleteApplication = (id: string) => {
    setUser(prev => ({
      ...prev,
      applications: prev.applications.filter(a => a.id !== id)
    }));
    addNotification('Application removed from tracker', 'info');
  };

  const updateResumeData = (patch: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...patch
    }));
  };

  const resetResumeData = () => {
    setResumeData(INITIAL_RESUME_DATA);
    addNotification('Loaded top-tier collegiate template resume', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeTab,
        setActiveTab,
        activeRoadmapId,
        setActiveRoadmapId,
        selectedCourseId,
        setSelectedCourseId,
        selectedCodingChallengeId,
        setSelectedCodingChallengeId,
        toggleRoadmapItem,
        toggleCourseLesson,
        markChallengeSolved,
        toggleSaveInternship,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        resumeData,
        updateResumeData,
        resetResumeData,
        notifications,
        addNotification,
        removeNotification,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        switchProfile,
        updateUserProfile,
        signupUser,
        allProfiles
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
