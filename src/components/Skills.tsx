import { SKILL_CATEGORIES } from "../data";
import { Terminal, Shield, Layers, Code, Check } from "lucide-react";

export default function Skills() {
  return (
    <section className="py-16 md:py-24 border-t border-white/5" id="skills-section">
      <div className="space-y-4 mb-10 md:mb-16">
        <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Capabilities Matrix</div>
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
          Technical <span className="italic font-serif text-emerald-400">Competencies</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Decomposing programming expertise across multiple environments: frontend design, backend servers, database systems, and mobile layouts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => {
          return (
            <div 
              key={idx} 
              id={`skill-card-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="bg-zinc-900/10 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-5">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    {cat.name === "Frontend" ? <Code className="w-3.5 h-3.5" /> : 
                     cat.name === "UI & Architecture" ? <Layers className="w-3.5 h-3.5" /> : 
                     cat.name === "Backend & DBs" ? <Terminal className="w-3.5 h-3.5" /> : 
                     <Shield className="w-3.5 h-3.5" />}
                  </div>
                  <h3 className="font-semibold text-xs text-zinc-200 uppercase font-mono tracking-widest">{cat.name}</h3>
                </div>

                <ul className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2.5 text-xs md:text-sm text-zinc-300 font-medium font-sans">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skill micro tag */}
              <div className="pt-4 border-t border-white/5 mt-6 font-mono text-[9px] text-zinc-500 flex justify-between uppercase tracking-wider">
                <span>Verified Core</span>
                <span>Active Stack</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
