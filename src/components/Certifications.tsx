import { CERTIFICATIONS } from "../data";
import { Award, ExternalLink, Calendar } from "lucide-react";

export default function Certifications() {
  return (
    <section className="py-16 md:py-24 border-t border-white/5" id="certifications-section">
      <div className="space-y-4 mb-10 md:mb-16">
        <div className="text-emerald-400 font-mono text-sm uppercase tracking-[0.3em] font-bold">Industry Recognition</div>
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
          Honours & <span className="italic font-mono text-emerald-400 font-medium">Certifications</span>
        </h2>
        <p className="text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Complementary technical education issued by IBM Security team, University of Michigan, and Microsoft platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert, index) => {
          return (
            <div 
              key={index}
              id={`cert-card-${index}`}
              className="bg-zinc-900/10 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <Award className="w-5 h-5 font-bold" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-450 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-medium text-white text-sm md:text-base font-sans tracking-tight leading-snug">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1.5 tracking-wide">{cert.issuer}</div>
                </div>

                {/* Scope items / Skills tagged */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((s, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 text-[10px] font-sans border border-white/10 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {cert.link && (
                <div className="pt-4 mt-5 border-t border-white/5 flex justify-end">
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 hover:text-emerald-400 flex items-center gap-1.5 uppercase hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
