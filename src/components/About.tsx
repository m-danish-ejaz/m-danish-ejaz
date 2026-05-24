import { PERSONAL_INFO } from "../data";
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowDownCircle, 
  MessageCircle, 
  CalendarCheck2,
  Bookmark
} from "lucide-react";

interface AboutProps {
  onNavigateToSection: (sectionId: string) => void;
  onDownloadResume: () => void;
}

export default function About({ onNavigateToSection, onDownloadResume }: AboutProps) {
  return (
    <section className="py-16 md:py-24 lg:py-28" id="about-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Text Showcase with Elegant Typography */}
        <div className="lg:col-span-7 space-y-8 animate-fade-in">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">
              Software Engineer • Full-Stack Specialist
            </p>
            
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl font-light text-white leading-[1.12] tracking-tight">
              Crafting <span className="italic font-serif text-emerald-400 font-medium">Enterprise</span> <br/>
              SaaS Architectures.
            </h1>
            
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 max-w-2xl">
              I am a dedicated Software Engineer with professional expertise in building modern, interactive systems. 
              On the frontend, I design responsive component architectures with <span className="text-white font-medium">React, Next.js</span>, and <span className="text-white font-medium">TypeScript</span>. 
              On the backend, I implement scalable microservices, relational databases (<span className="text-white font-medium">PostgreSQL</span>), and API gateways.
            </p>
          </div>

          {/* Quick Contact Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400 max-w-xl">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/20 border border-white/5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/20 border border-white/5 truncate">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate text-zinc-300">{PERSONAL_INFO.emails[0]}</span>
            </div>
          </div>

          {/* Navigation Action Buttons Context */}
          <div className="flex flex-wrap items-center gap-4 select-none">
            <button
              onClick={() => onNavigateToSection("playgrounds-panel")}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] tracking-widest uppercase rounded-full shadow-lg shadow-emerald-950/20 active:scale-95 transition-all text-center flex items-center gap-2"
            >
              <CalendarCheck2 className="w-3.5 h-3.5" />
              <span>Test Playgrounds</span>
            </button>

            <button
              onClick={onDownloadResume}
              className="px-6 py-3 bg-zinc-900/40 border border-white/10 hover:border-white/20 text-white font-bold text-[10px] tracking-widest uppercase rounded-full hover:bg-zinc-900 flex items-center gap-2 transition-all"
            >
              <ArrowDownCircle className="w-3.5 h-3.5 text-zinc-450" />
              <span>Interactive CV</span>
            </button>

            <div className="flex items-center gap-2.5 sm:ml-2">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-zinc-900/20 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-all border border-white/5"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-zinc-900/20 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-all border border-white/5"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href={`https://wa.me/${PERSONAL_INFO.whatsapp}`}
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-zinc-900/20 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-all border border-white/5"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Bento Box Design Card (Danish Meta Panel) */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0 animate-scale-up">
          
          {/* Aesthetic visual decoration glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 blur-2xl opacity-60 z-0" />
          
          <div className="relative bg-zinc-900/15 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-inner z-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Currently specialized at</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-serif italic">Infyntrix</span>
            </div>

            {/* Code Switching Block Mock-up */}
            <div className="bg-black/50 rounded-2xl border border-white/5 p-4 font-mono text-[10px] text-emerald-300 overflow-hidden leading-relaxed">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
              </div>
              <p className="text-zinc-650">// Multi-Tenant Resolution Engine</p>
              <p><span className="text-emerald-400">const</span> resolveTenant = (req) =&gt; &#123;</p>
              <p className="pl-4 text-zinc-400">const domain = req.headers['x-tenant-id'];</p>
              <p className="pl-4 text-zinc-400">return dbPool.connect(domain);</p>
              <p>&#125;</p>
              <div className="mt-4 p-3 bg-emerald-500/5 rounded border border-white/5">
                <p className="text-emerald-400">✓ Tenancy Context Switched</p>
                <p className="text-emerald-400">✓ Schema Isolation Active</p>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                 <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                   <div className="h-full w-4/5 bg-emerald-500 rounded-full" />
                 </div>
                 <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-teal-500 rounded-full" />
                 </div>
              </div>
            </div>

            {/* Elegant statistics bar without the AI slop status words */}
            <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5 text-center select-none font-sans">
              <div>
                <div className="text-xl font-light text-white font-serif">2<span className="text-emerald-400 font-sans">+</span></div>
                <div className="text-[8px] font-medium tracking-[0.15em] text-zinc-400 uppercase mt-1">Professional XP</div>
              </div>
              <div className="border-x border-white/5">
                <div className="text-xl font-light text-white font-serif">9<span className="text-emerald-400 font-sans">+</span></div>
                <div className="text-[8px] font-medium tracking-[0.15em] text-zinc-400 uppercase mt-1">Core Projects</div>
              </div>
              <div>
                <div className="text-xl font-light text-white font-serif">7<span className="text-emerald-400 font-sans">+</span></div>
                <div className="text-[8px] font-medium tracking-[0.15em] text-zinc-400 uppercase mt-1">IBM Credentials</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
