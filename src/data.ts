import { Project, Experience, Education, Certification } from "./types";

export const PERSONAL_INFO = {
  name: "Danish Ejaz",
  title: "Software Engineer",
  subtitle: "Frontend-Focused Full-Stack Developer",
  location: "Wah Cantt, Pakistan",
  emails: ["mdanishejaz@outlook.com"],
  phone: "+92 302 8933706",
  github: "https://github.com/Anonymous-codes512",
  linkedin: "https://linkedin.com/in/danish-ejaz512",
  whatsapp: "923028933706",
  about: `I am a dedicated and motivated Software Engineer with hands-on experience in building AI-driven systems, backend APIs, and full-stack applications using React, Next.js, Python, Flask, Django, and PostgreSQL. 

On the frontend, I excel at implementing responsive, highly interactive user interfaces and complex data-driven layouts, utilizing clean architectures and modern JavaScript/TypeScript practices. On the backend, I assist in creating minimal, efficient REST APIs, designing robust database tables, and debugging complex server-side operations.

With a strong foundation in modern frontend architecture and a versatile grasp of supporting backend services, I design and develop secure, accessible, and high-performance applications designed to solve real-world problems.`,
  profileSummary: "Frontend-focused Software Engineer with over 2 years of professional experience developing modern, API-driven web and mobile applications. Strong expertise in React, TypeScript, and component-based frontend architecture. Experienced in building user-centered, accessible, and responsive interfaces in close collaboration with UX, design, and backend teams. Comfortable working in international and interdisciplinary environments."
};

export const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit", "Framer Motion"]
  },
  {
    name: "UI & Architecture",
    skills: ["Component-Based Design", "React Hooks", "State Management", "Responsive Web Design", "Web Accessibility (a11y)", "AG Grid", "Tailwind UI"]
  },
  {
    name: "Backend & DBs",
    skills: ["Python", "Django", "Flask", "PostgreSQL", "SQLAlchemy ORM", "RESTful APIs", "Laravel", "ASP.NET Core", "Node.js"]
  },
  {
    name: "Mobile & Hybrid",
    skills: ["Flutter", "Dart", "Firebase", "Provider State Management"]
  },
  {
    name: "Tools & Practices",
    skills: ["Git", "GitHub Actions", "Docker", "Clean Code", "Agile / Scrum", "Jira", "Figma Design Integration"]
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    role: "Software Developer",
    company: "Infyntrix",
    period: "Aug 2025 - Present",
    location: "Wah Cantt, Pakistan",
    description: [
      "Work primarily on a React-based frontend and a Django-backed web platform, contributing to both client-side and server-side development.",
      "Implement responsive user interfaces, integrate complex rest APIs, resolve UX/UI anomalies, and ensure fluid component-level rendering.",
      "Building, modifying, and reviewing REST APIs in Django, debugging backend architecture, and structuring relational database interactions.",
      "Contribute directly to Costwise, an enterprise-level SaaS multi-tenant finance platform, building complex widgets, Ag-Grid pivots, and secure isolation filters.",
      "Actively participate in code reviews, troubleshooting critical issues across the stack, and maintaining strict clean architecture standards."
    ],
    technologies: ["React", "TypeScript", "Django", "MSSQL", "AG Grid", "AG Chart", "Tailwind CSS", "REST APIs", "Debugging"]
  },
  {
    role: "Software Developer",
    company: "GOFTech",
    period: "Mar 2025 - Aug 2025",
    location: "Islamabad, Pakistan",
    description: [
      "Developed React and Flutter-based web and mobile applications with a strong focus on absolute usability and performance metrics.",
      "Contributed to a doctor consultation workspace application, building out Python Flask routes, database schema designs in PostgreSQL, and integrating Flutter frontend with REST APIs.",
      "Designed and optimized appointment booking workflows, secure session logs, and role-based client-doctor login gates.",
      "Overcame key production bugs regarding data integrity, enhancing state management logic and improving overall system reliability."
    ],
    technologies: ["React", "Flutter", "Python", "Flask", "PostgreSQL", "REST APIs", "MERN Stack"]
  },
  {
    role: "Web Developer",
    company: "Tachyon Technologies",
    period: "Apr 2024 - Mar 2025",
    location: "Wah Cantt, Pakistan",
    description: [
      "Engineered and maintained robust Laravel-based web applications focused on intricate backend operations and responsive UI views.",
      "Designed retail management dashboards to enable real-time inventory adjustments, scheduled logs, sales analytics, and employee timetables.",
      "Coordinated tightly inside Agile cycles with graphic designers and system engineers to integrate third-party web structures and APIs.",
      "Wrote structured component views, unit testing structures, and technical reports for clean team onboarding and code review sessions."
    ],
    technologies: ["Laravel", "PHP", "JavaScript", "HTML5", "CSS3", "SQL", "Agile Workflows", "API Integration"]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "COMSATS University Islamabad, Wah Campus",
    period: "2021 - 2025",
    location: "Wah Cantt, Pakistan",
    website: "https://cuiwah.edu.pk/",
    details: "Focus on software architecture, database management systems, AI solutions, web development protocols, and software testing practices."
  },
  {
    degree: "Intermediate in Computer Science",
    institution: "Askaria School and College System",
    period: "2019 - 2021",
    location: "Wah Cantt, Pakistan",
    website: "https://askaria.edu.pk/",
    details: "Mathematics, Physics, Computer Science principles."
  },
  {
    degree: "Matriculation in Computer Science",
    institution: "F.G Public School No. 2 (Boys)",
    period: "2017 - 2019",
    location: "Wah Cantt, Pakistan",
    website: "#",
    details: "Computer Science foundation."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Operating Systems: Overview, Administration, and Security",
    issuer: "IBM (Coursera)",
    date: "Nov 2025",
    skills: ["Windows Security", "Linux Hardening", "macOS Admin", "Virtualization", "Cloud Computing"],
    link: "https://coursera.org/share/b749266b0a650a771596a75e10764fcd"
  },
  {
    title: "Introduction to Cybersecurity Tools & Cyberattacks",
    issuer: "IBM (Coursera)",
    date: "Oct 2025",
    skills: ["Threat Actors", "Malware Analysis", "Social Engineering", "Risk Mitigation"],
    link: "https://coursera.org/share/018e6607bdaae37445ede1547300cc6c"
  },
  {
    title: "Introduction to Cybersecurity Essentials",
    issuer: "IBM (Coursera)",
    date: "Oct 2025",
    skills: ["Threat Detection", "Security Best Practices", "Windows Server Security", "Breach Analysis"],
    link: "https://www.coursera.org/account/accomplishments/verify/2XJZ7YWYL94X"
  },
  {
    title: "Flutter and Dart: Developing iOS, Android, and Mobile Apps",
    issuer: "IBM / Coursera",
    date: "Aug 2025",
    skills: ["Flutter UI", "State Management", "API Integrations", "Cross-Platform Deployment"],
    link: "https://www.coursera.org/account/accomplishments/verify/TIQE6NZLNLW7"
  },
  {
    title: "Interactivity with JavaScript",
    issuer: "University of Michigan (Coursera)",
    date: "Dec 2023",
    skills: ["DOM Manipulation", "Event Listeners", "Interactive Animations", "Data Structures"],
    link: "https://www.coursera.org/account/accomplishments/verify/GFVN2P6BQATA"
  },
  {
    title: "Introduction to Web Design and CSS3 Suite",
    issuer: "University of Michigan (Coursera)",
    date: "Oct 2023",
    skills: ["Responsive Layouts", "CSS3 Transitions", "Sizing & Spacing", "Typography Standards"],
    link: "https://www.coursera.org/account/accomplishments/verify/AXTQ837T2A4S"
  },
  {
    title: "C# Foundations",
    issuer: "Microsoft Learn",
    date: "Sep 2023",
    skills: ["C# Basics", "Data Structures", "OOP Concepts", "Type Safety"],
    link: "https://learn.microsoft.com/en-us/users/anonymous4codes/"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "costwise",
    title: "Costwise",
    platform: "International Finance Management Platform",
    technologies: ["React", "Next.js", "TypeScript", "Ag-Grid", "REST APIs", "Django", "MSSQL", "MFA"],
    description: "A large-scale multi-tenant SaaS platform designed for complex enterprise infrastructures such as hospital management and financial management systems.",
    fullDescription: "This project is a large-scale multi-tenant SaaS platform designed for complex enterprise infrastructures such as hospital management and financial management systems. The platform uses a database-per-tenant architecture with centralized tenant resolution and runtime database switching to ensure secure data isolation across organizations. It includes a powerful reporting center supporting dynamic SQL, stored procedures, and database views with fully server-side search, sorting, filtering, pagination, and streaming-based Excel exports for large datasets. The system also provides configurable dashboard and analytics modules with widget-based layouts, drill-down/drill-through reporting, and pivot functionalities using AG Grid. A scalable data center module was implemented to support multi-million row Excel uploads through streaming, staging tables, validation workflows, and failure recovery tracking. Additional enterprise features include admin-controlled SMTP and Microsoft Graph email configurations, session timeout management, multi-factor authentication (MFA), and advanced AG Grid-based CRUD operations with server-side rendering and pivot support across the application.",
    keyFeatures: [
      "Database-per-tenant architecture with dynamic tenant resolution & secure context switching",
      "Robust reporting engine featuring dynamic SQL & server-side streaming Excel downloads",
      "Dynamic data grids with pivoting, grouping, and server-side filtering using AG Grid styles",
      "Multi-million row Excel streaming data pipeline with strict failure staging & logging",
      "SMTP & Microsoft Graph automated e-mail setups, session guards, and multi-factor authentication (MFA)"
    ],
    period: "Aug 2025 - Present",
    link: "https://costwise-dev-v2.ampham.com",
    category: "Enterprise"
  },
  {
    id: "doctor-app",
    title: "Doctor Consultation App",
    platform: "Cross-Platform Mobile Application",
    technologies: ["Flutter", "Python", "Flask", "SQLAlchemy", "PostgreSQL", "REST APIs", "Provider"],
    description: "A cross-platform healthcare mobile app enabling doctors and patients to manage consultations, appointments, and medical histories securely.",
    keyFeatures: [
      "Dual interface role authorization (Doctor & Patient modes)",
      "Smart calendar bookings with automated scheduling constraints",
      "Built-in chat systems supporting real-time secure communication",
      "Speech-to-text dictation module for automated doctor symptom records",
      "Robust backend written in Python Flask using SQLAlchemy schemas"
    ],
    period: "Jun 2025 - Aug 2025",
    github: "https://github.com/Anonymous-codes512/doctor-app",
    category: "Mobile"
  },
  {
    id: "disruptive-duck",
    title: "Disruptive Duck",
    platform: "AI Accessibility Platform",
    technologies: ["React", "TypeScript", "Node.js", "JSON APIs", "Accessibility"],
    description: "An AI-powered web accessibility platform designed to ease and enrich experience for web users with visual or physical challenges.",
    keyFeatures: [
      "WCAG 3.0 level accessibility configurations (font enlarger, contrast controls, voice read)",
      "Interactive components built with absolute screen reader transparency",
      "Simulated AI assistance rendering complex structures into semantic verbal outlines",
      "Inclusive user interface utilizing customized accessible key bindings and prompts"
    ],
    period: "Jul 2025",
    category: "AI/ML"
  },
  {
    id: "debtris",
    title: "Debtris",
    platform: "Debt Management Web Application",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Nestjs", "Components Arch"],
    description: "A modern, developer-crafted tracker designed to help individual users chart, structure, and strategize debt repayments.",
    keyFeatures: [
      "Aesthetic debt breakdown widgets (Snowball / Avalanche payment simulations)",
      "Clean React component structures utilizing tailored custom hooks & state persistency",
      "Visual interest accumulation charts built manually via highly optimized inline layout logic",
      "Prepped REST endpoint mappings ready to bridge to remote database infrastructure"
    ],
    period: "In Development",
    category: "Web"
  },
  {
    id: "invigilation-system",
    title: "CUI WAH Exam Invigilation",
    platform: "Digital Exam Management Suite",
    technologies: ["ASP.NET Core MVC", "Flutter", "Microsoft SQL Server", "C#", "REST APIs"],
    description: "Digital student attendance and examiner schedule planner streamlining local university exam processes.",
    keyFeatures: [
      "Automated attendance records & examiner roster setups mapped on a centralized server",
      "Real-time notifications keeping invigilators updated on schedules & room shifts",
      "Scalable SQL database containing secure credentials for administrators and standard staff",
      "Complete cross-platform sync between .NET Core dashboard services and Flutter mobile apps"
    ],
    period: "Oct 2024 - May 2025",
    github: "https://github.com/Anonymous-codes512/Exam_Invagilation_System",
    category: "Enterprise"
  },
  {
    id: "phishing-detector",
    title: "Phishing Link Detector",
    platform: "AI Security Web Service",
    technologies: ["Python", "Flask", "Gradient Booster", "Random Forest", "Feature Engineering"],
    description: "Machine learning analytical system classifying potentially malicious URLs in real time based on lexical patterns.",
    keyFeatures: [
      "Lexical feature extraction parsing URL tokens, lengths, subdirectory depths, & parameters",
      "Random Forest & Gradient Boosting models deployed directly on a Flask API framework",
      "Low-latency response design (sub-50ms query answers) utilizing pre-processed rules"
    ],
    period: "Sep 2024 - Dec 2024",
    category: "AI/ML"
  },
  {
    id: "traffic-signal",
    title: "Real-Time Traffic Manager",
    platform: "Formal-Methods Infrastructure Service",
    technologies: ["Python", "Formal Verification", "Tkinter", "Simulation Engine"],
    description: "Smart traffic intersection sensor simulator applying rigorous safety rules to optimize vehicle transitions.",
    keyFeatures: [
      "Safety invariant enforcement using logical expressions to ensure multi-lane collision prevention",
      "Responsive schedule switching adjusting signal times dynamically based on vehicle flow data",
      "Built-in simulation panels illustrating simulated traffic intersections under active loads"
    ],
    period: "Apr 2025 - May 2025",
    category: "Enterprise"
  },
  {
    id: "tailorbook",
    title: "TailorBook",
    platform: "Order & Measurement mobile app",
    technologies: ["Flutter", "Firebase", "Cloud Firestore", "WhatsApp API integrations"],
    description: "Administrative aid application crafted for traditional tailors to archive measurements and send automated invoices.",
    keyFeatures: [
      "Tailor-oriented database layout archiving full physical measurements per visitor",
      "Receipt compiler formatting and sending PDF invoice links to numbers via WhatsApp",
      "Offline cache queuing uploads safely during low internet connectivity frames"
    ],
    period: "Apr 2025",
    github: "https://github.com/Anonymous-codes512/darizi-app",
    category: "Mobile"
  },
  {
    id: "crust-house",
    title: "Crust House POS",
    platform: "Complete Hotel CRM & Retail Engine",
    technologies: ["Laravel", "PHP", "JavaScript", "MySQL", "Inventory Triggers"],
    description: "Comprehensive POS inventory control and live sales metrics center tailored for a local hotel.",
    keyFeatures: [
      "Point-of-Sale (POS) dynamic billing terminal tracking live stock deallocations",
      "Automated prompt notification alerts when key baking ingredients slip below threshold counts",
      "Performance metrics graphing daily, weekly, and monthly margin results on elegant reports"
    ],
    period: "Apr 2024 - Feb 2025",
    github: "https://github.com/Anonymous-codes512/CrustHouse",
    category: "Web"
  }
];
