export type GraduationYear = 2025 | 2026 | 2027 | 2028 | 2029;
export type AcademicYear = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';

export interface ApplicationItem {
  id: string;
  internshipId: string;
  company: string;
  role: string;
  location: string;
  stipend: string;
  appliedDate: string;
  status: 'Saved' | 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  notes?: string;
  deadline?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  major: string;
  academicYear: AcademicYear;
  graduationYear: GraduationYear;
  gpa: string;
  targetRole: string;
  bio: string;
  skills: string[];
  dreamCompanies: string[];
  streakDays: number;
  xpPoints: number;
  completedRoadmapItemIds: string[];
  completedCourseIds: string[];
  completedLessonIds: string[];
  completedCodingChallengeIds: string[];
  savedInternshipIds: string[];
  applications: ApplicationItem[];
  weeklyHours: number[];
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: 'guide' | 'video' | 'practice' | 'project';
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  estimatedHours: number;
  resources: RoadmapResource[];
}

export interface RoadmapStage {
  id: string;
  stageName: string;
  recommendedYear: string;
  summary: string;
  items: RoadmapItem[];
}

export interface CareerRoadmap {
  id: string;
  title: string;
  slug: string;
  targetRole: string;
  overview: string;
  averageSalary: string;
  estimatedMonths: number;
  primarySkills: string[];
  stages: RoadmapStage[];
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'reading' | 'exercise';
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  institution: string;
  category: 'Software Engineering' | 'Data & AI' | 'Cloud & Systems' | 'Career Foundations';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  rating: number;
  reviewCount: number;
  studentsCount: number;
  summary: string;
  prerequisites: string[];
  modules: CourseModule[];
}

export interface CodingTestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Arrays & Hashing' | 'Strings' | 'Two Pointers' | 'Linked Lists' | 'Trees' | 'Dynamic Programming' | 'System & Logic';
  acceptanceRate: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: string;
  testCases: CodingTestCase[];
  hints: string[];
  solutionExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  workModel: 'Remote' | 'Hybrid' | 'On-site';
  stipend: string;
  duration: string;
  postedDate: string;
  deadline: string;
  eligibleGradYears: number[];
  tags: string[];
  description: string;
  requirements: string[];
  perks: string[];
  companyInitial: string;
  accentColor: string;
  externalLink?: string;
}

export interface ResumeEducation {
  id: string;
  school: string;
  degree: string;
  major: string;
  gpa: string;
  location: string;
  startDate: string;
  endDate: string;
  coursework: string;
}

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ResumeProject {
  id: string;
  name: string;
  technologies: string;
  liveUrl?: string;
  githubUrl?: string;
  bullets: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: {
    languages: string;
    frameworks: string;
    tools: string;
    concepts: string;
  };
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

export interface InterviewQuestion {
  id: string;
  category: 'Data Structures & Algorithms' | 'System Architecture' | 'Behavioral & STAR' | 'Web & Backend API' | 'Database & SQL';
  question: string;
  difficulty: 'Core' | 'Advanced';
  frequency: 'High' | 'Very High' | 'Medium';
  keyRubricPoints: string[];
  modelAnswer: string;
  starFrameworkTip?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}
