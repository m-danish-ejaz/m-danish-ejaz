import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CostwiseDemo from "./components/CostwiseDemo";
import DoctorAppDemo from "./components/DoctorAppDemo";
import PhishingDemo from "./components/PhishingDemo";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import ResumeModal from "./components/ResumeModal";
import { PERSONAL_INFO } from "./data";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code,
  Sparkles,
  LayoutGrid
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("about-section");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeSandbox, setActiveSandbox] = useState<"costwise" | "doctor" | "phishing">("costwise");

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Keep active section in-sync with scroll frame
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const ids = [
        "about-section",
        "experience-section",
        "skills-section",
        "projects-section",
        "playgrounds-panel",
        "certifications-section",
        "contact-section"
      ];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4d4d8] font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Structural Navigation bar */}
      <Navigation 
        activeSection={activeSection}
        onNavigateToSection={scrollToSection}
        onDownloadResume={() => setShowResumeModal(true)}
      />

      {/* Main Container core frame */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        
        {/* Profile Introduction */}
        <About 
          onNavigateToSection={scrollToSection}
          onDownloadResume={() => setShowResumeModal(true)}
        />

        {/* Experience Timeline */}
        <Experience />

        {/* Skills Competencies */}
        <Skills />

        {/* Portfolio Showcases */}
        <Projects onNavigateToSection={scrollToSection} />

        {/* Interactive Playgrounds Lab Area */}
        <section className="py-16 md:py-24 border-t border-white/5" id="playgrounds-panel">
          
          <div className="space-y-4 mb-8 md:mb-12">
            <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Interactive Sandbox Labs</div>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Live Dev <span className="italic font-serif text-emerald-400">Playgrounds</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
              Skip static lists — test Danish's architectural systems directly inside live client-side emulators built specifically to demonstrate real-world scenarios.
            </p>
          </div>

          {/* Sandbox selector tabs bar */}
          <div className="flex bg-zinc-950/80 p-1.5 rounded-full border border-white/5 max-w-md mb-8 select-none">
            <button
              onClick={() => setActiveSandbox("costwise")}
              className={`flex-1 py-2 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full transition-all border ${
                activeSandbox === "costwise"
                  ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-300 shadow"
                  : "border-transparent text-zinc-500 hover:text-zinc-350"
              }`}
            >
              Costwise SaaS
            </button>
            <button
              onClick={() => setActiveSandbox("doctor")}
              className={`flex-1 py-2 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full transition-all border ${
                activeSandbox === "doctor"
                  ? "bg-cyan-500/15 border-cyan-500/25 text-cyan-300 shadow"
                  : "border-transparent text-zinc-500 hover:text-zinc-350"
              }`}
            >
              Doctor App
            </button>
            <button
              onClick={() => setActiveSandbox("phishing")}
              className={`flex-1 py-2 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full transition-all border ${
                activeSandbox === "phishing"
                  ? "bg-rose-500/15 border-rose-500/25 text-rose-300 shadow"
                  : "border-transparent text-zinc-500 hover:text-zinc-350"
              }`}
            >
              Phishing ML
            </button>
          </div>

          {/* Render Active Sandbox Container */}
          <div className="space-y-2">
            
            {activeSandbox === "costwise" && (
              <div id="costwise-demo-panel" className="animate-fade-in">
                <div className="p-3 bg-emerald-500/5 text-emerald-300 font-mono text-[10px] rounded-xl border border-white/5 mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>Costwise Hub: Simulating isolated tenant resolution schemas & streaming upload pipelines.</span>
                </div>
                <CostwiseDemo />
              </div>
            )}

            {activeSandbox === "doctor" && (
              <div id="doctor-demo-panel" className="animate-fade-in">
                <div className="p-3 bg-cyan-500/5 text-cyan-300 font-mono text-[10px] rounded-xl border border-white/5 mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>HealSync Mobile: Testing dual doctor-patient roles, live chats, & vocal dictation streams.</span>
                </div>
                <DoctorAppDemo />
              </div>
            )}

            {activeSandbox === "phishing" && (
              <div id="phishing-demo-panel" className="animate-fade-in">
                <div className="p-3 bg-rose-500/5 text-rose-300 font-mono text-[10px] rounded-xl border border-white/5 mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  <span>Phishing Analyser: Evaluating SSL encryption, subdomain depths, & ML token weights in real time.</span>
                </div>
                <PhishingDemo />
              </div>
            )}

          </div>

        </section>

        {/* Certifications and credentials list */}
        <Certifications />

        {/* Reach out inquiry form */}
        <Contact />

      </main>

      {/* Elegant minimalist page footer */}
      <footer className="border-t border-white/5 bg-zinc-950/25 py-12 mt-24 text-[10px] font-mono text-zinc-500 tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center text-white italic font-serif font-bold text-sm">
              D
            </div>
            <div>
              <div className="text-zinc-350 font-bold uppercase tracking-[0.1em]">Danish Ejaz</div>
              <div className="text-[8px] text-zinc-500 mt-0.5 tracking-widest font-medium uppercase">Clean Code Practices Verified</div>
            </div>
          </div>

          <div className="flex gap-8 text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href={`mailto:${PERSONAL_INFO.emails[0]}`} className="hover:text-white transition-colors">Email</a>
          </div>

          <div className="text-[9px] text-zinc-650 uppercase tracking-widest">
            © {new Date().getFullYear()} Danish Ejaz. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Interactive Printable Modal */}
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}

    </div>
  );
}
