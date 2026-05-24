export interface Project {
  id: string;
  title: string;
  platform?: string;
  technologies: string[];
  description: string;
  fullDescription?: string;
  keyFeatures: string[];
  period?: string;
  github?: string;
  link?: string;
  category: "Enterprise" | "AI/ML" | "Mobile" | "Web";
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
  website: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  link?: string;
}
