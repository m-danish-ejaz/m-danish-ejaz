import { useState } from "react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { 
  Github, 
  ChevronDown, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface ProjectsProps {
  onNavigateToSection: (sectionId: string) => void;
}

export default function Projects({ onNavigateToSection }: ProjectsProps) {
  const [filter, setFilter] = useState<"All" | "Enterprise" | "AI/ML" | "Web" | "Mobile">("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("costwise");

  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const handleToggleExpand = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  return (
    <section className="py-16 md:py-24 border-t border-white/5" id="projects-section">
      <div className="space-y-4 mb-10 md:mb-16">
        <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Selected Portfolio</div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
          Engineering <span className="italic font-serif text-emerald-400">Showcases</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Scroll through Danish Ejaz's custom development work. Expand each showcase to review enterprise metrics, structural pipelines, and live interaction portals.
        </p>
      </div>

      {/* Filter Tabs layout */}
      <div className="flex flex-wrap gap-2.5 mb-10 select-none">
        {(["All", "Enterprise", "AI/ML", "Web", "Mobile"] as const).map(tab => (
          <button
            key={tab}
            id={`btn-filter-${tab.toLowerCase()}`}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-all ${
              filter === tab 
                ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300" 
                : "bg-zinc-950/20 border-white/5 text-zinc-450 hover:text-white hover:border-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Accordion styling of projects */}
      <div className="space-y-4 font-sans">
        {filteredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          return (
            <div 
              key={project.id} 
              id={`project-card-${project.id}`}
              className={`bg-zinc-900/10 border rounded-3xl overflow-hidden transition-all duration-300 ${
                isExpanded 
                  ? "border-emerald-500/30 shadow-lg" 
                  : "border-white/5 bg-zinc-950/10 hover:bg-zinc-900/15 hover:border-white/10"
              }`}
            >
              {/* Collapsed view banner */}
              <div 
                onClick={() => handleToggleExpand(project.id)}
                className="p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-zinc-300 shrink-0 uppercase text-xs">
                    {project.category[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3.5 flex-wrap">
                      <h3 className="font-medium text-base md:text-lg text-white font-sans tracking-tight leading-tight">{project.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[8px] tracking-widest bg-white/5 border border-white/10 text-emerald-450 font-mono uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1.5 truncate max-w-2xl leading-normal">{project.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest hidden sm:inline">{project.period}</span>
                  <div className={`p-1.5 rounded-full border border-white/5 bg-white/5 text-zinc-400 transition-all ${isExpanded ? "rotate-180 text-emerald-400 bg-emerald-500/15 border-emerald-500/25" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Expanded details container */}
              {isExpanded && (
                <div className="px-5 pb-6 md:px-8 md:pb-8 border-t border-white/5 pt-6 space-y-6">
                  
                  {/* Long explanation text */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">Scope Description</h4>
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-4xl font-sans">
                      {project.fullDescription || project.description}
                    </p>
                  </div>

                  {/* Highlights section */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">Injected Engineering Features</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-950/30 border border-white/5 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                          <span className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 flex items-center justify-center text-[9px] font-bold font-mono shrink-0">
                            {fIdx + 1}
                          </span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack badging */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-white/5 pt-6">
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Interactive Technologies Used</div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-sans">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Routing Callout */}
                    <div className="flex flex-wrap gap-2.5">
                      {project.id === "costwise" && (
                        <button
                          onClick={() => onNavigateToSection("costwise-demo-panel")}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] tracking-widest uppercase rounded-full transition-all shadow-md shadow-emerald-950/25 flex items-center gap-2 font-sans"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Interact SaaS</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {project.id === "doctor-app" && (
                        <button
                          onClick={() => onNavigateToSection("doctor-demo-panel")}
                          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] tracking-widest uppercase rounded-full transition-all shadow flex items-center gap-2 font-sans"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Interact App</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {project.id === "phishing-detector" && (
                        <button
                          onClick={() => onNavigateToSection("phishing-demo-panel")}
                          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] tracking-widest uppercase rounded-full transition-all shadow flex items-center gap-2 font-sans"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Interact Detector</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-[10px] tracking-widest uppercase rounded-full flex items-center gap-2 transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
