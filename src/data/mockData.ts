import {
  UserProfile,
  CareerRoadmap,
  Course,
  CodingChallenge,
  Internship,
  ResumeData,
  InterviewQuestion
} from '../types';

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'user_alex',
    name: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    avatar: '/src/assets/images/avatar_student_male_1790694919249.jpg',
    university: 'University of California, Berkeley',
    major: 'Computer Science & Data Science',
    academicYear: 'Junior',
    graduationYear: 2027,
    gpa: '3.86',
    targetRole: 'Full Stack Software Engineer',
    bio: 'Passionate about building resilient web distributed systems and full-stack developer tools. Seeking Summer 2027 SWE Internships.',
    skills: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Git'],
    dreamCompanies: ['Google', 'Stripe', 'Figma', 'Datadog'],
    streakDays: 14,
    xpPoints: 2450,
    completedRoadmapItemIds: ['fs_1_1', 'fs_1_2', 'fs_1_3', 'fs_2_1', 'fs_2_2'],
    completedCourseIds: ['course_fullstack'],
    completedLessonIds: ['fs_l1', 'fs_l2', 'fs_l3', 'fs_l4'],
    completedCodingChallengeIds: ['prob_two_sum', 'prob_valid_paren'],
    savedInternshipIds: ['intern_stripe', 'intern_google', 'intern_figma'],
    applications: [
      {
        id: 'app_1',
        internshipId: 'intern_stripe',
        company: 'Stripe',
        role: 'Software Engineering Intern (Summer)',
        location: 'San Francisco, CA / Hybrid',
        stipend: '$62 / hr + housing',
        appliedDate: '2026-09-12',
        status: 'Interview',
        notes: 'Round 1 technical phone screen completed on Sept 22. Next is system design & code walkthrough.',
        deadline: '2026-10-15'
      },
      {
        id: 'app_2',
        internshipId: 'intern_google',
        company: 'Google',
        role: 'SWE Intern - Core Infrastructure',
        location: 'Mountain View, CA / On-site',
        stipend: '$58 / hr + stipend',
        appliedDate: '2026-09-04',
        status: 'Screening',
        notes: 'OA submitted with 100% test cases passed. Awaiting recruiter match.',
        deadline: '2026-10-01'
      },
      {
        id: 'app_3',
        internshipId: 'intern_datadog',
        company: 'Datadog',
        role: 'Cloud Platforms Intern',
        location: 'New York, NY / Hybrid',
        stipend: '$55 / hr + housing',
        appliedDate: '2026-09-18',
        status: 'Applied',
        notes: 'Applied through university campus careers fair referral.',
        deadline: '2026-10-25'
      }
    ],
    weeklyHours: [3.5, 4.0, 5.5, 2.0, 6.0, 4.5, 3.0]
  },
  {
    id: 'user_maya',
    name: 'Maya Patel',
    email: 'maya.patel@gatech.edu',
    avatar: '/src/assets/images/avatar_student_female_1790694932408.jpg',
    university: 'Georgia Institute of Technology',
    major: 'Computer Science (AI & Robotics)',
    academicYear: 'Senior',
    graduationYear: 2026,
    gpa: '3.92',
    targetRole: 'Machine Learning Engineer',
    bio: 'Researcher in applied transformer architectures and efficient model evaluation. Preparing for Fall new-grad interviews.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'CUDA', 'C++', 'FastAPI'],
    dreamCompanies: ['Anthropic', 'DeepMind', 'Meta', 'Microsoft Research'],
    streakDays: 28,
    xpPoints: 3820,
    completedRoadmapItemIds: ['ai_1_1', 'ai_1_2', 'ai_1_3', 'ai_2_1', 'ai_2_2', 'ai_2_3'],
    completedCourseIds: ['course_ml_foundations'],
    completedLessonIds: ['ml_l1', 'ml_l2', 'ml_l3'],
    completedCodingChallengeIds: ['prob_two_sum', 'prob_binary_search', 'prob_valid_paren', 'prob_max_subarray'],
    savedInternshipIds: ['intern_microsoft', 'intern_meta'],
    applications: [
      {
        id: 'app_m1',
        internshipId: 'intern_microsoft',
        company: 'Microsoft',
        role: 'Applied AI & Copilot Intern',
        location: 'Redmond, WA / Hybrid',
        stipend: '$56 / hr',
        appliedDate: '2026-08-28',
        status: 'Offer',
        notes: 'Offer letter received! Decision deadline Oct 10th.',
        deadline: '2026-10-10'
      }
    ],
    weeklyHours: [5.0, 6.5, 4.0, 5.0, 7.0, 8.0, 4.5]
  }
];

export const CAREER_ROADMAPS: CareerRoadmap[] = [
  {
    id: 'roadmap_fullstack',
    title: 'Full Stack Software Engineer',
    slug: 'full-stack-swe',
    targetRole: 'Frontend, Backend & Systems Engineer',
    overview: 'A complete four-stage pathway from programming foundations to distributed systems and production deployment.',
    averageSalary: '$115,000 - $165,000 / yr',
    estimatedMonths: 12,
    primarySkills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'System Design', 'Docker', 'REST/GraphQL'],
    stages: [
      {
        id: 'stage_fs_1',
        stageName: 'Stage 1: Engineering Foundations & Data Structures',
        recommendedYear: 'Freshman / Early Sophomore',
        summary: 'Master imperative programming, Big-O complexity, core data structures, and Git version control.',
        items: [
          {
            id: 'fs_1_1',
            title: 'Modern TypeScript & Asynchronous Programming',
            description: 'Types, interfaces, promises, async/await, closures, event loop mechanics, and DOM fundamentals.',
            category: 'Languages',
            skills: ['TypeScript', 'ES6+', 'Event Loop'],
            estimatedHours: 25,
            resources: [
              { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'guide' },
              { title: 'JavaScript Event Loop Visualizer', url: 'https://jsv9000.app/', type: 'practice' }
            ]
          },
          {
            id: 'fs_1_2',
            title: 'Algorithmic Problem Solving (Arrays, Hash Maps, Pointers)',
            description: 'Analyze time & space complexity, recursion, sliding windows, and binary search.',
            category: 'Algorithms',
            skills: ['Big-O', 'Hash Tables', 'Pointers'],
            estimatedHours: 40,
            resources: [
              { title: 'NeetCode Core Data Structures', url: 'https://neetcode.io/', type: 'practice' },
              { title: 'Algorithms Specialization Lecture Series', url: 'https://coursera.org', type: 'video' }
            ]
          },
          {
            id: 'fs_1_3',
            title: 'Git Architecture & Collaborative Workflows',
            description: 'Branches, rebasing, pull request reviews, merge conflict resolution, and CI/CD basics.',
            category: 'Tooling',
            skills: ['Git', 'GitHub', 'CI/CD'],
            estimatedHours: 10,
            resources: [
              { title: 'Pro Git Book (Free)', url: 'https://git-scm.com/book/en/v2', type: 'guide' }
            ]
          }
        ]
      },
      {
        id: 'stage_fs_2',
        stageName: 'Stage 2: Client Architecture & Server Engineering',
        recommendedYear: 'Sophomore / Early Junior',
        summary: 'Build scalable single-page apps, design RESTful/RPC APIs, and structure relational schemas.',
        items: [
          {
            id: 'fs_2_1',
            title: 'Modern React Architecture & State Management',
            description: 'Component lifecycle, hooks, custom hooks, context, memoization, and accessible UI patterns.',
            category: 'Frontend',
            skills: ['React', 'Tailwind CSS', 'State Machines'],
            estimatedHours: 35,
            resources: [
              { title: 'React Official Documentation', url: 'https://react.dev', type: 'guide' }
            ]
          },
          {
            id: 'fs_2_2',
            title: 'Backend Services with Node.js & Express',
            description: 'Routing, middleware pipelines, JWT authentication, rate limiting, error handling, and testing.',
            category: 'Backend',
            skills: ['Node.js', 'Express', 'JWT', 'REST API'],
            estimatedHours: 30,
            resources: [
              { title: 'Express Production Best Practices', url: 'https://expressjs.com', type: 'guide' }
            ]
          },
          {
            id: 'fs_2_3',
            title: 'Relational Database Design & PostgreSQL',
            description: 'Normalization, joins, indexing strategies, transactions, ACID guarantees, and migrations.',
            category: 'Databases',
            skills: ['PostgreSQL', 'SQL', 'Indexes', 'Transactions'],
            estimatedHours: 25,
            resources: [
              { title: 'Use The Index, Luke (SQL Guide)', url: 'https://use-the-index-luke.com/', type: 'guide' }
            ]
          }
        ]
      },
      {
        id: 'stage_fs_3',
        stageName: 'Stage 3: Full-Stack Integration & Production Deployment',
        recommendedYear: 'Junior / Senior',
        summary: 'Containerize applications, implement cloud storage, caching with Redis, and automated tests.',
        items: [
          {
            id: 'fs_3_1',
            title: 'Containerization with Docker & Multi-stage Builds',
            description: 'Dockerfiles, container networking, compose stacks, volume management, and lightweight Alpine images.',
            category: 'DevOps',
            skills: ['Docker', 'Containers', 'Compose'],
            estimatedHours: 15,
            resources: [
              { title: 'Docker Getting Started Guide', url: 'https://docs.docker.com/get-started/', type: 'guide' }
            ]
          },
          {
            id: 'fs_3_2',
            title: 'Caching Strategies with Redis',
            description: 'Cache invalidation, write-through vs read-through, session storage, and pub/sub queues.',
            category: 'Infrastructure',
            skills: ['Redis', 'Caching', 'PubSub'],
            estimatedHours: 15,
            resources: [
              { title: 'Redis University Courses', url: 'https://university.redis.com/', type: 'guide' }
            ]
          },
          {
            id: 'fs_3_3',
            title: 'End-to-End Testing & Observability',
            description: 'Integration tests with Vitest, E2E testing with Playwright, structured logging, and monitoring.',
            category: 'Quality',
            skills: ['Vitest', 'Playwright', 'Telemetry'],
            estimatedHours: 20,
            resources: [
              { title: 'Playwright Official Docs', url: 'https://playwright.dev/', type: 'guide' }
            ]
          }
        ]
      },
      {
        id: 'stage_fs_4',
        stageName: 'Stage 4: System Design & Campus Placement Readiness',
        recommendedYear: 'Senior / Internship Placement',
        summary: 'Scalability trade-offs, load balancing, sharding, mock interviews, and portfolio project polish.',
        items: [
          {
            id: 'fs_4_1',
            title: 'Distributed System Design Fundamentals',
            description: 'CAP theorem, consistent hashing, message brokers (Kafka/RabbitMQ), CDNs, and horizontal scaling.',
            category: 'System Design',
            skills: ['CAP Theorem', 'Load Balancing', 'Microservices'],
            estimatedHours: 45,
            resources: [
              { title: 'System Design Primer by Donne Martin', url: 'https://github.com/donnemartin/system-design-primer', type: 'guide' }
            ]
          },
          {
            id: 'fs_4_2',
            title: 'Technical Behavioral & Whiteboard Interview Prep',
            description: 'STAR response mastery, communication under pressure, live pairing strategies, and salary negotiation.',
            category: 'Career',
            skills: ['Behavioral Interviews', 'STAR Method', 'Negotiation'],
            estimatedHours: 20,
            resources: [
              { title: 'Cracking the Coding Interview Guide', url: 'https://careercup.com', type: 'guide' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'roadmap_ai',
    title: 'AI & Machine Learning Engineer',
    slug: 'ai-ml-engineer',
    targetRole: 'Machine Learning, Deep Learning & LLM Engineer',
    overview: 'Navigate linear algebra, statistical learning, neural networks, computer vision/NLP, and scalable ML serving.',
    averageSalary: '$125,000 - $180,000 / yr',
    estimatedMonths: 14,
    primarySkills: ['Python', 'PyTorch', 'Linear Algebra', 'Transformers', 'FastAPI', 'MLOps', 'Vector DBs'],
    stages: [
      {
        id: 'stage_ai_1',
        stageName: 'Stage 1: Mathematical Foundations & Python for Data',
        recommendedYear: 'Freshman / Sophomore',
        summary: 'Linear algebra, calculus for gradients, probability distributions, NumPy, and Pandas manipulation.',
        items: [
          {
            id: 'ai_1_1',
            title: 'Vector Calculus & Matrix Decompositions',
            description: 'Eigenvalues, SVD, gradients, Hessians, and multivariate Gaussian modeling.',
            category: 'Math',
            skills: ['Linear Algebra', 'Calculus', 'Probability'],
            estimatedHours: 35,
            resources: [{ title: '3Blue1Brown Essence of Linear Algebra', url: 'https://3blue1brown.com', type: 'video' }]
          },
          {
            id: 'ai_1_2',
            title: 'High-Performance Numerical Python',
            description: 'Vectorized computing with NumPy, memory layout, indexing, and tabular wrangling with Pandas.',
            category: 'Programming',
            skills: ['NumPy', 'Pandas', 'Matplotlib'],
            estimatedHours: 20,
            resources: [{ title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', type: 'guide' }]
          }
        ]
      },
      {
        id: 'stage_ai_2',
        stageName: 'Stage 2: Classical Machine Learning & Neural Networks',
        recommendedYear: 'Sophomore / Junior',
        summary: 'Linear regression, decision trees, backpropagation, and training architectures in PyTorch.',
        items: [
          {
            id: 'ai_2_1',
            title: 'Supervised & Unsupervised Learning',
            description: 'Loss functions, regularization (L1/L2), cross-validation, random forests, and gradient boosting.',
            category: 'Core ML',
            skills: ['Scikit-Learn', 'Gradient Boosting', 'Cross-Validation'],
            estimatedHours: 30,
            resources: [{ title: 'Stanford CS229 Lecture Notes', url: 'https://cs229.stanford.edu', type: 'guide' }]
          },
          {
            id: 'ai_2_2',
            title: 'Deep Learning with PyTorch',
            description: 'Tensors, autograd, forward/backward passes, optimizers (AdamW), CNNs, and sequence models.',
            category: 'Deep Learning',
            skills: ['PyTorch', 'Autograd', 'Backprop'],
            estimatedHours: 40,
            resources: [{ title: 'PyTorch Tutorials', url: 'https://pytorch.org/tutorials/', type: 'practice' }]
          }
        ]
      },
      {
        id: 'stage_ai_3',
        stageName: 'Stage 3: LLM Engineering & Model Serving',
        recommendedYear: 'Junior / Senior',
        summary: 'Attention mechanism, LoRA fine-tuning, embeddings, vector databases, and production inference.',
        items: [
          {
            id: 'ai_3_1',
            title: 'Transformer Architecture & Attention Mechanisms',
            description: 'Self-attention, positional encodings, causal masking, encoder-decoder vs decoder-only models.',
            category: 'Modern AI',
            skills: ['Transformers', 'HuggingFace', 'LoRA'],
            estimatedHours: 35,
            resources: [{ title: 'The Illustrated Transformer by Jay Alammar', url: 'https://jalammar.github.io/', type: 'guide' }]
          },
          {
            id: 'ai_3_2',
            title: 'RAG Systems & Vector Search',
            description: 'Chunking strategies, cosine similarity, hybrid sparse/dense search, and semantic routing.',
            category: 'Applied AI',
            skills: ['Vector DBs', 'RAG', 'Embeddings'],
            estimatedHours: 25,
            resources: [{ title: 'Pinecone Learning Center', url: 'https://pinecone.io/learn/', type: 'guide' }]
          }
        ]
      }
    ]
  },
  {
    id: 'roadmap_cloud',
    title: 'Cloud & DevOps Engineer',
    slug: 'cloud-devops',
    targetRole: 'Site Reliability, Infrastructure & Platform Engineer',
    overview: 'Master infrastructure as code, continuous integration, Kubernetes clusters, and cloud security.',
    averageSalary: '$118,000 - $170,000 / yr',
    estimatedMonths: 10,
    primarySkills: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'AWS/GCP', 'GitHub Actions', 'Prometheus'],
    stages: [
      {
        id: 'stage_cloud_1',
        stageName: 'Stage 1: Linux Kernel Fundamentals & Networking',
        recommendedYear: 'Freshman / Sophomore',
        summary: 'Master Bash scripting, process management, POSIX permissions, TCP/IP, and DNS resolution.',
        items: [
          {
            id: 'cloud_1_1',
            title: 'Linux Systems Administration & Shell Scripting',
            description: 'Processes, signals, systemd services, filesystem permissions, and automation scripts.',
            category: 'Systems',
            skills: ['Linux', 'Bash', 'Systemd'],
            estimatedHours: 25,
            resources: [{ title: 'Linux Journey Guide', url: 'https://linuxjourney.com/', type: 'guide' }]
          }
        ]
      },
      {
        id: 'stage_cloud_2',
        stageName: 'Stage 2: Orchestration & Infrastructure as Code',
        recommendedYear: 'Junior / Senior',
        summary: 'Declarative cluster management with Kubernetes and automated provisioning using Terraform.',
        items: [
          {
            id: 'cloud_2_1',
            title: 'Kubernetes Pods, Services & Ingress Controllers',
            description: 'Deployments, ConfigMaps, Secrets, RBAC policies, and horizontal pod autoscalers.',
            category: 'Orchestration',
            skills: ['Kubernetes', 'Kubelet', 'Helm'],
            estimatedHours: 35,
            resources: [{ title: 'Kubernetes Official Interactive Labs', url: 'https://kubernetes.io/docs/tutorials/', type: 'practice' }]
          }
        ]
      }
    ]
  }
];

export const CURATED_COURSES: Course[] = [
  {
    id: 'course_fullstack',
    title: 'Modern Fullstack Architecture: From Schema to Production',
    instructor: 'Dr. Sarah Lin (ex-Stripe Tech Lead)',
    institution: 'Ascend Engineering Academy',
    category: 'Software Engineering',
    level: 'Intermediate',
    durationHours: 16,
    rating: 4.9,
    reviewCount: 342,
    studentsCount: 2840,
    summary: 'A project-based, collegiate-level course building an end-to-end multi-tenant application with TypeScript, relational schemas, secure auth, and CI/CD pipelines.',
    prerequisites: ['Basic JavaScript / TypeScript', 'Understanding of HTML/CSS', 'Command line basics'],
    modules: [
      {
        id: 'mod_1',
        title: 'Module 1: Relational Schema Design & API Architecture',
        lessons: [
          { id: 'fs_l1', title: 'Data Normalization & Designing ACID Transactions', durationMinutes: 38, type: 'video' },
          { id: 'fs_l2', title: 'Building RESTful Services with Express & TypeScript', durationMinutes: 45, type: 'video' },
          { id: 'fs_l3', title: 'Hands-on Lab: Database Indexing Benchmark', durationMinutes: 30, type: 'exercise' }
        ]
      },
      {
        id: 'mod_2',
        title: 'Module 2: Client State & Resilient UI Components',
        lessons: [
          { id: 'fs_l4', title: 'Context vs Server State with TanStack Query', durationMinutes: 42, type: 'video' },
          { id: 'fs_l5', title: 'Optimistic UI Updates & Error Boundary Strategies', durationMinutes: 35, type: 'video' },
          { id: 'fs_l6', title: 'Hands-on Lab: Build a Resilient Data Grid', durationMinutes: 40, type: 'exercise' }
        ]
      },
      {
        id: 'mod_3',
        title: 'Module 3: Containerization & Cloud Deployment',
        lessons: [
          { id: 'fs_l7', title: 'Multi-stage Docker Builds for Fast Deployments', durationMinutes: 30, type: 'video' },
          { id: 'fs_l8', title: 'Zero-Downtime Releases with GitHub Actions', durationMinutes: 35, type: 'reading' }
        ]
      }
    ]
  },
  {
    id: 'course_ml_foundations',
    title: 'Applied Machine Learning & Neural Networks Foundations',
    instructor: 'Prof. David K. Thorne & Elena Vasquez',
    institution: 'Berkeley AI Research Lab',
    category: 'Data & AI',
    level: 'Intermediate',
    durationHours: 20,
    rating: 4.95,
    reviewCount: 512,
    studentsCount: 4200,
    summary: 'Master the mathematics of backpropagation, build PyTorch neural networks from scratch, and evaluate performance on computer vision and tabular benchmarks.',
    prerequisites: ['Multivariate Calculus', 'Linear Algebra', 'Intermediate Python'],
    modules: [
      {
        id: 'mod_ml_1',
        title: 'Module 1: Tensors, Autograd & Mathematical Primitives',
        lessons: [
          { id: 'ml_l1', title: 'The Computational Graph & Manual Gradient Checking', durationMinutes: 50, type: 'video' },
          { id: 'ml_l2', title: 'Implementing Softmax Cross-Entropy Loss from Zero', durationMinutes: 40, type: 'exercise' },
          { id: 'ml_l3', title: 'Optimization Algorithms: SGD with Momentum vs AdamW', durationMinutes: 45, type: 'video' }
        ]
      },
      {
        id: 'mod_ml_2',
        title: 'Module 2: Convolutional & Transformer Networks',
        lessons: [
          { id: 'ml_l4', title: 'Spatial Invariance with Convolutional Filters', durationMinutes: 48, type: 'video' },
          { id: 'ml_l5', title: 'Scaled Dot-Product Attention Implementation', durationMinutes: 55, type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'course_system_design',
    title: 'System Design for College Interns & New Grads',
    instructor: 'Alex Xu & Martin Kleppmann guest series',
    institution: 'Distributed Systems Institute',
    category: 'Software Engineering',
    level: 'Advanced',
    durationHours: 14,
    rating: 4.88,
    reviewCount: 419,
    studentsCount: 3100,
    summary: 'Learn how to approach real-world system design interviews: rate limiters, URL shorteners, notification services, and feed architectures.',
    prerequisites: ['Basic networking concepts', 'Database fundamentals'],
    modules: [
      {
        id: 'mod_sd_1',
        title: 'Module 1: High-Availability Building Blocks',
        lessons: [
          { id: 'sd_l1', title: 'Consistent Hashing & Partitioning Strategies', durationMinutes: 35, type: 'video' },
          { id: 'sd_l2', title: 'Distributed Rate Limiting with Token Buckets', durationMinutes: 40, type: 'exercise' }
        ]
      }
    ]
  },
  {
    id: 'course_interview_prep',
    title: 'The College Career Blueprint: Behavioral & Tech Interviews',
    instructor: 'Jordan Miller (Career Director)',
    institution: 'Student Career Advisory Board',
    category: 'Career Foundations',
    level: 'Beginner',
    durationHours: 8,
    rating: 4.92,
    reviewCount: 780,
    studentsCount: 6500,
    summary: 'Transform your college experiences, class projects, and student clubs into compelling behavioral stories using the STAR methodology.',
    prerequisites: ['None! Ideal for all academic years'],
    modules: [
      {
        id: 'mod_int_1',
        title: 'Module 1: Crafting Your College Story',
        lessons: [
          { id: 'int_l1', title: 'The STAR Framework with Real Engineering Examples', durationMinutes: 25, type: 'video' },
          { id: 'int_l2', title: 'Handling Failure & Ambiguity Questions Confidently', durationMinutes: 30, type: 'video' }
        ]
      }
    ]
  }
];

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'prob_two_sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '52.4%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]'
      }
    ],
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      { input: 'twoSum([2, 7, 11, 15], 9)', expectedOutput: '[0,1]' },
      { input: 'twoSum([3, 2, 4], 6)', expectedOutput: '[1,2]' },
      { input: 'twoSum([3, 3], 6)', expectedOutput: '[0,1]' }
    ],
    hints: [
      'A brute force solution takes O(N^2) time. Can we do better using a hash table?',
      'As you iterate through the array, check if (target - current_number) has already been seen.'
    ],
    solutionExplanation: 'By using a hash map to record the complement index, we achieve linear O(N) time complexity and O(N) space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 'prob_valid_paren',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Strings',
    acceptanceRate: '41.1%',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    starterCode: `function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
    testCases: [
      { input: 'isValid("()")', expectedOutput: 'true' },
      { input: 'isValid("()[]{}")', expectedOutput: 'true' },
      { input: 'isValid("(]")', expectedOutput: 'false' },
      { input: 'isValid("([)]")', expectedOutput: 'false' }
    ],
    hints: [
      'Think about using a Stack (LIFO data structure) to track unclosed brackets.',
      'When you see a closing bracket, the top of the stack must match its pair.'
    ],
    solutionExplanation: 'Push openers onto a stack; on closing bracket, pop and ensure match. If stack is empty at the end, the string is valid.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  },
  {
    id: 'prob_binary_search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '57.8%',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return -1.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' }
    ],
    starterCode: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
    testCases: [
      { input: 'search([-1,0,3,5,9,12], 9)', expectedOutput: '4' },
      { input: 'search([-1,0,3,5,9,12], 2)', expectedOutput: '-1' },
      { input: 'search([5], 5)', expectedOutput: '0' }
    ],
    hints: [
      'Maintain two pointers: left and right.',
      'Compute the middle index and discard half of the array at each step.'
    ],
    solutionExplanation: 'Binary search halves the search space each iteration, guaranteeing O(log N) time.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'prob_max_subarray',
    title: 'Maximum Subarray (Kadane Algorithm)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptanceRate: '50.3%',
    description: `Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' }
    ],
    starterCode: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}`,
    testCases: [
      { input: 'maxSubArray([-2,1,-3,4,-1,2,1,-5,4])', expectedOutput: '6' },
      { input: 'maxSubArray([1])', expectedOutput: '1' },
      { input: 'maxSubArray([5,4,-1,7,8])', expectedOutput: '23' }
    ],
    hints: [
      'If current running sum becomes negative, is it ever helpful to carry it forward?',
      'Kadane algorithm: currentMax = max(nums[i], currentMax + nums[i]).'
    ],
    solutionExplanation: 'At each position, we decide whether to add to the existing subarray or start fresh from the current element.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)'
  }
];

export const INTERNSHIPS_DATA: Internship[] = [
  {
    id: 'intern_stripe',
    company: 'Stripe',
    role: 'Software Engineering Intern (Summer 2027)',
    location: 'San Francisco, CA / Seattle, WA',
    workModel: 'Hybrid',
    stipend: '$62 / hr ($10,700/mo) + Relocation',
    duration: '12 Weeks (May - Aug 2027)',
    postedDate: '3 days ago',
    deadline: '2026-10-15',
    eligibleGradYears: [2026, 2027, 2028],
    tags: ['Full Stack', 'Payments', 'Distributed Systems', 'Ruby / Go'],
    description: 'Join the infrastructure or product engineering teams building the economic foundation of the internet. You will deploy code to millions of businesses within your first two weeks.',
    requirements: [
      'Currently enrolled in a BS or MS program in Computer Science or related STEM field',
      'Solid command of one programming language (Ruby, Python, Java, Go, or TypeScript)',
      'Demonstrated interest via class projects, open source, or prior work experience'
    ],
    perks: ['Full housing stipend', 'Daily gourmet lunch & dinner', '1-on-1 Senior Staff Engineer mentor', 'High full-time return offer rate'],
    companyInitial: 'S',
    accentColor: 'bg-emerald-600'
  },
  {
    id: 'intern_google',
    company: 'Google',
    role: 'Software Engineering Intern - Cloud & Core',
    location: 'Mountain View, CA / New York, NY',
    workModel: 'On-site',
    stipend: '$58 / hr ($10,050/mo) + Housing',
    duration: '12-14 Weeks',
    postedDate: '1 week ago',
    deadline: '2026-10-01',
    eligibleGradYears: [2026, 2027, 2028],
    tags: ['Cloud', 'C++', 'Go', 'Distributed Storage', 'Scale'],
    description: 'Work on planetary-scale infrastructure supporting Gmail, YouTube, Google Cloud, and search indexing pipelines alongside world-class researchers.',
    requirements: [
      'Enrolled in university degree program in CS, EE, or computational field',
      'Experience with data structures and algorithmic complexity',
      'Familiarity with Unix/Linux environments and version control'
    ],
    perks: ['On-campus wellness facilities', 'Intern hackathon & tech talks', 'Housing provided or $2,500/mo stipend'],
    companyInitial: 'G',
    accentColor: 'bg-blue-600'
  },
  {
    id: 'intern_figma',
    company: 'Figma',
    role: 'Frontend Engineering Intern - Canvas Engine',
    location: 'San Francisco, CA',
    workModel: 'Hybrid',
    stipend: '$60 / hr + $3,000 Housing Allowance',
    duration: '12 Weeks',
    postedDate: '5 days ago',
    deadline: '2026-10-20',
    eligibleGradYears: [2026, 2027],
    tags: ['TypeScript', 'WebGL', 'Wasm', 'Design Systems', 'UI'],
    description: 'Figma is built on real-time multiplayer WebGL canvas technology. Join our web client team to push the limits of modern browser rendering and collaborative creation.',
    requirements: [
      'Deep curiosity for web performance, DOM rendering, or WebGL/WebAssembly',
      'Proficiency in TypeScript or modern JavaScript',
      'Eye for design fidelity and micro-interactions'
    ],
    perks: ['Direct impact on million+ designers', 'Top tier hardware allowance', 'Flexible hybrid schedule'],
    companyInitial: 'F',
    accentColor: 'bg-teal-600'
  },
  {
    id: 'intern_datadog',
    company: 'Datadog',
    role: 'Cloud Platforms & Reliability Intern',
    location: 'New York, NY / Boston, MA',
    workModel: 'Hybrid',
    stipend: '$55 / hr + Relocation Bonus',
    duration: '12 Weeks',
    postedDate: '2 weeks ago',
    deadline: '2026-10-25',
    eligibleGradYears: [2026, 2027, 2028],
    tags: ['Go', 'Kubernetes', 'Telemetry', 'Observability'],
    description: 'Build high-throughput metric pipelines ingesting trillions of events per day. Gain hands-on exposure to Kafka, Cassandra, and Kubernetes orchestration.',
    requirements: [
      'Solid foundations in operating systems and systems programming (Go, Python, C++)',
      'Curiosity about distributed traces, logs, and site reliability engineering'
    ],
    perks: ['Midtown Manhattan office with rooftop terrace', 'Dedicated intern project manager'],
    companyInitial: 'D',
    accentColor: 'bg-sky-600'
  },
  {
    id: 'intern_microsoft',
    company: 'Microsoft',
    role: 'Explore Program & Applied AI Intern',
    location: 'Redmond, WA / Remote Option',
    workModel: 'Remote',
    stipend: '$52 / hr + Housing Support',
    duration: '12 Weeks',
    postedDate: '3 days ago',
    deadline: '2026-11-01',
    eligibleGradYears: [2027, 2028, 2029],
    tags: ['Freshman/Sophomore Priority', 'Python', 'C#', 'Azure'],
    description: 'Designed specifically for Freshman and Sophomore college students to experience both Software Engineering and Product Management rotations before deciding.',
    requirements: [
      'Current 1st or 2nd year undergraduate student',
      'Completed intro to programming coursework (Python, Java, or C++)'
    ],
    perks: ['Executive mentorship sessions', 'Early full SWE internship pipeline return opportunity'],
    companyInitial: 'M',
    accentColor: 'bg-emerald-700'
  },
  {
    id: 'intern_bloomberg',
    company: 'Bloomberg L.P.',
    role: 'Financial Software Engineering Intern',
    location: 'New York, NY',
    workModel: 'On-site',
    stipend: '$57 / hr + Luxury Corporate Housing',
    duration: '12 Weeks',
    postedDate: '4 days ago',
    deadline: '2026-10-30',
    eligibleGradYears: [2026, 2027],
    tags: ['C++', 'Python', 'Low Latency', 'Financial Data'],
    description: 'Engineer high-frequency market data pipelines, real-time analytics engines, and modern terminal applications powering global finance.',
    requirements: [
      'Strong proficiency in C++ or Python',
      'Solid understanding of multi-threading, concurrency, and memory management'
    ],
    perks: ['Corporate apartment overlooking Central Park', 'Comprehensive 2-week technical boot-camp'],
    companyInitial: 'B',
    accentColor: 'bg-blue-700'
  }
];

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@berkeley.edu',
    phone: '(510) 555-0194',
    location: 'Berkeley, CA',
    linkedin: 'linkedin.com/in/alexrivera-tech',
    github: 'github.com/alexrivera',
    portfolio: 'alexrivera.dev',
    summary: 'Junior Computer Science student at UC Berkeley with strong foundations in full-stack architecture, distributed systems, and modern TypeScript. Experienced in shipping production features at scale during internships and leading collegiate open-source teams.'
  },
  education: [
    {
      id: 'edu_1',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      major: 'Computer Science (Honors Track)',
      gpa: '3.86 / 4.00',
      location: 'Berkeley, CA',
      startDate: 'Aug 2024',
      endDate: 'May 2027 (Expected)',
      coursework: 'Data Structures & Algorithms (CS 61B), Operating Systems (CS 162), Database Systems (CS 186), Computer Architecture'
    }
  ],
  experience: [
    {
      id: 'exp_1',
      title: 'Software Engineering Intern',
      company: 'Novatech Labs',
      location: 'San Francisco, CA',
      startDate: 'May 2025',
      endDate: 'Aug 2025',
      current: false,
      bullets: [
        'Architected a distributed background queue using Node.js and Redis, reducing email notification processing latency by 42% for 120,000+ daily active users.',
        'Engineered 14 responsive React components with TypeScript and Tailwind CSS, increasing mobile user onboarding completion rate by 18%.',
        'Implemented end-to-end integration tests using Vitest and Playwright, elevating test coverage from 64% to 89% across core billing workflows.'
      ]
    },
    {
      id: 'exp_2',
      title: 'Undergraduate Teaching Assistant (CS 61B)',
      company: 'UC Berkeley EECS Department',
      location: 'Berkeley, CA',
      startDate: 'Jan 2026',
      endDate: 'Present',
      current: true,
      bullets: [
        'Mentored 60+ undergraduates weekly through complex data structure labs covering balanced search trees, graph algorithms, and asymptotic runtime analysis.',
        'Authored auto-grader grading scripts in Python to evaluate 1,200 student repository submissions with sub-second feedback.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'OmniSync - Real-time Collaborative Document Editor',
      technologies: 'TypeScript, React, WebSockets, Node.js, CRDTs, Docker',
      liveUrl: 'https://omnisync-demo.dev',
      githubUrl: 'https://github.com/alexrivera/omnisync',
      bullets: [
        'Built a peer-to-peer real-time collaborative text editor supporting 50+ concurrent editors using Conflict-free Replicated Data Types (CRDTs).',
        'Achieved sub-20ms synchronization latency by designing an event-driven WebSocket broker with Redis pub/sub backplane.',
        'Containerized multi-service deployment with Docker Compose, receiving 350+ stars on GitHub.'
      ]
    },
    {
      id: 'proj_2',
      name: 'CampusBites - Dining Hall Meal & Nutrition Analytics',
      technologies: 'React Native, Python, FastAPI, PostgreSQL, AWS S3',
      liveUrl: 'https://campusbites.app',
      githubUrl: 'https://github.com/alexrivera/campus-bites',
      bullets: [
        'Developed a campus meal tracking application used by 1,800+ university students to monitor daily macronutrients and dining line wait times.',
        'Optimized SQL query performance with composite B-Tree indexes, reducing average API response times from 340ms to 45ms.'
      ]
    }
  ],
  skills: {
    languages: 'TypeScript, JavaScript (ES6+), Python, C++, SQL, HTML5/CSS3',
    frameworks: 'React, Next.js, Node.js, Express, Tailwind CSS, FastAPI',
    tools: 'Git, Docker, PostgreSQL, Redis, Vitest, Linux/Bash, Vite',
    concepts: 'Data Structures, RESTful APIs, System Design, CI/CD, Asynchronous Programming'
  },
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'Dec 2025'
    }
  ]
};

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int_q1',
    category: 'Behavioral & STAR',
    question: 'Tell me about a challenging technical project you worked on. How did you resolve an unexpected obstacle?',
    difficulty: 'Core',
    frequency: 'Very High',
    keyRubricPoints: [
      'Clarity of Situation and Task context (scope, timeline, team)',
      'Specific technical ownership (Action: did you write the code or diagnose the issue?)',
      'Quantified outcome or measurable Result (latency drop, accuracy boost, launch on time)',
      'Reflection on lessons learned or what you would do differently'
    ],
    modelAnswer: 'In my sophomore software project OmniSync, our team noticed document states desynchronizing when more than 10 users typed simultaneously. (Situation/Task) I profiled the WebSocket packet stream and identified that linear order timestamps suffered from network jitter. (Action) I researched Conflict-free Replicated Data Types (CRDTs) and implemented the Yjs state vector algorithm in TypeScript over 4 days, then validated it with 100 simulated clients. (Result) The synchronization errors dropped to 0%, latency stabilized at 18ms, and the project won 1st prize at the university design showcase.',
    starFrameworkTip: {
      situation: 'State the project context in 2 sentences. Name the tech stack and the stakes.',
      task: 'Identify your explicit responsibility versus the group.',
      action: 'Detail the analytical steps: diagnosis, hypothesis testing, implementation.',
      result: 'Finish with quantitative metrics (time saved, % performance gain, user satisfaction).'
    }
  },
  {
    id: 'int_q2',
    category: 'Data Structures & Algorithms',
    question: 'How does a Hash Table work internally? What happens during a hash collision and how does dynamic resizing maintain O(1) average lookup?',
    difficulty: 'Core',
    frequency: 'Very High',
    keyRubricPoints: [
      'Hash function maps key to an integer index within an underlying array buffer',
      'Collision resolution methods: Chaining (linked lists / red-black trees) vs Open Addressing (linear/quadratic probing)',
      'Load factor threshold (typically 0.75) triggering doubling of array size and rehashing',
      'Worst-case O(N) when all keys hash to the same bucket versus O(1) amortized'
    ],
    modelAnswer: 'A hash table stores key-value pairs in an underlying fixed-size array. A hash function transforms the key into an integer index modulo the capacity. When two keys collide, modern implementations like Java HashMap use separate chaining: entries sharing a bucket are placed in a linked list, which upgrades to a balanced red-black tree (O(log K)) if bucket length exceeds 8. To keep lookups O(1) on average, the table monitors its load factor (num_elements / capacity). When it exceeds 0.75, it allocates a new buffer of 2x size and rehashes all elements, taking O(N) time but amortizing to O(1) per insertion.'
  },
  {
    id: 'int_q3',
    category: 'System Architecture',
    question: 'Design a scalable URL Shortening Service (like TinyURL). What are the key storage, hashing, and scaling considerations?',
    difficulty: 'Advanced',
    frequency: 'High',
    keyRubricPoints: [
      'Capacity estimation (e.g. 100M URLs/month, read-to-write ratio 10:1)',
      'Hash generation: Base62 encoding of an auto-incrementing ID vs MD5/SHA256 truncated',
      'Database choice: NoSQL key-value (DynamoDB / Cassandra) for low-latency partition lookups',
      'Caching layer with Redis (LRU eviction policy) for 20% hot links',
      'Redirection status: 301 Permanent (browser caches) vs 302 Temporary (server captures analytics)'
    ],
    modelAnswer: 'A URL shortener converts long URLs into 7-character Base62 strings (62^7 ≈ 3.5 trillion unique keys). Instead of hashing MD5 and dealing with collisions, the ideal approach is using a distributed unique ID generator (like Snowflake) and converting the 64-bit ID to Base62. For storage, a partitioned Key-Value store (Cassandra or DynamoDB) stores the shortKey as the partition key. Because reads vastly outnumber writes, an in-memory Redis cluster caches hot links with an LRU policy. We use HTTP 302 redirects if we need to log click analytics on every hit, or HTTP 301 if maximum client caching is desired.'
  },
  {
    id: 'int_q4',
    category: 'Web & Backend API',
    question: 'Explain the difference between SQL transactions (ACID properties) and how database isolation levels prevent race conditions.',
    difficulty: 'Advanced',
    frequency: 'High',
    keyRubricPoints: [
      'ACID definition: Atomicity, Consistency, Isolation, Durability',
      'Phenomena: Dirty reads, Non-repeatable reads, Phantom reads',
      'Standard isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable',
      'Performance trade-offs between lock contention and concurrency'
    ],
    modelAnswer: 'ACID ensures reliable database operations: Atomicity (all-or-nothing), Consistency (preserves schema constraints), Isolation (concurrent transactions execute without corrupting each other), and Durability (committed writes persist in WAL/disk). SQL defines four isolation levels to balance concurrency vs consistency: Read Committed prevents dirty reads; Repeatable Read prevents non-repeatable reads via snapshot isolation; Serializable prevents phantom reads by locking ranges or using two-phase locking at the cost of throughput.'
  }
];
