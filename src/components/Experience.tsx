import { useState } from "react";
import { WORK_EXPERIENCE } from "../data";
import { Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section className="py-16 md:py-24 border-t border-white/5" id="experience-section">
      <div className="space-y-4 mb-10 md:mb-16">
        <div className="text-emerald-400 font-mono text-sm uppercase tracking-[0.25em] font-bold">Career Timeline</div>
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
          Professional <span className="italic font-mono text-emerald-400">Journeys</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-light">
          More than 2 years of professional software engineering history driving enterprise systems, web portals, and mobile applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Professional Timeline Buttons Navigation */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 select-none">
          {WORK_EXPERIENCE.map((exp, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                id={`btn-exp-${idx}`}
                onClick={() => setSelectedIdx(idx)}
                className={`flex-1 lg:flex-none p-4 rounded-2xl border text-left transition-all shrink-0 min-w-60 ${
                  isSelected
                    ? "bg-zinc-900/50 border-emerald-500/30 text-white shadow"
                    : "bg-zinc-950/20 border-white/5 text-zinc-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <div className="font-semibold text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 mb-1">{exp.period}</div>
                <div className="font-medium text-sm text-zinc-200 font-sans leading-snug">{exp.role}</div>
                <div className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5 font-sans font-medium">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="text-zinc-400">{exp.company}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Task Breakdown Card */}
        <div className="lg:col-span-8 bg-zinc-900/10 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-snug animate-fade-in" id="experience-details-box">
          
          {/* Company Title Meta Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white font-sans">
                {WORK_EXPERIENCE[selectedIdx].role} <span className="text-emerald-400 italic font-mono">@ {WORK_EXPERIENCE[selectedIdx].company}</span>
              </h3>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-400 mt-3 font-mono tracking-wider">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> {WORK_EXPERIENCE[selectedIdx].period}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-zinc-500" /> {WORK_EXPERIENCE[selectedIdx].location}</span>
              </div>
            </div>

            {/* Platform indicator badge */}
            <span className="px-3.5 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold">
              Full Stack Active
            </span>
          </div>

          {/* Achievement Bullet Points */}
          <div className="space-y-4">
            <h4 id="experience-achievements-label" className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold mb-3">Key Accomplishments & Scope</h4>
            
            <ul className="space-y-3.5 text-zinc-350 text-sm sm:text-base leading-relaxed font-sans font-light">
              {WORK_EXPERIENCE[selectedIdx].description.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies used in the experience */}
          <div className="border-t border-white/5 pt-5 space-y-3">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">Injected Stack</h4>
            <div className="flex flex-wrap gap-2">
              {WORK_EXPERIENCE[selectedIdx].technologies.map((tech, tIdx) => (
                <span 
                  key={tIdx} 
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-sans text-zinc-400 uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
