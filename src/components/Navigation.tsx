import { useState, useEffect } from "react";
import { 
  Terminal, 
  Download, 
  Menu, 
  X,
  Code,
  Sparkles,
  Award,
  Contact,
  LayoutGrid
} from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface NavigationProps {
  activeSection: string;
  onNavigateToSection: (sectionId: string) => void;
  onDownloadResume: () => void;
}

export const NAV_ITEMS = [
  { id: "about-section", label: "About" },
  { id: "experience-section", label: "Experience" },
  { id: "skills-section", label: "Skills" },
  { id: "projects-section", label: "Portfolio" },
  { id: "playgrounds-panel", label: "Playgrounds" },
  { id: "certifications-section", label: "Certifications" },
  { id: "contact-section", label: "Contact" }
];

export default function Navigation({ activeSection, onNavigateToSection, onDownloadResume }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavigateToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-sans ${
      scrolled 
        ? "bg-[#1d1d1d]/90 backdrop-blur-md border-b border-white/5 py-4" 
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <button 
          onClick={() => handleItemClick("about-section")}
          className="flex items-center gap-3 group text-left select-none outline-none focus:outline-none"
        >
          <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-teal-600 rounded-lg transition-transform duration-300 group-hover:scale-105 flex items-center justify-center text-black font-semibold text-sm font-mono">
            DE
          </div>
          <div>
            <div className="font-semibold text-white text-base tracking-normal transition-colors">Danish Ejaz</div>
            <div className="text-xs text-zinc-500 font-medium tracking-[0.15em] mt-0.5 leading-none font-mono">SOFTWARE ENGINEER</div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6 bg-zinc-900/30 px-6 py-2 rounded-full border border-white/5 select-none text-base font-semibold tracking-wider font-mono uppercase">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`py-1 text-xs tracking-[0.18em] transition-all select-none ${
                  isActive
                    ? "text-white border-b border-emerald-400 pb-0.5"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onDownloadResume}
            className="hidden sm:inline-flex px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white tracking-widest text-xs font-bold uppercase rounded-full items-center gap-2 transition-all select-none font-mono"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Interactive Resume</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900/40 border border-white/5 text-zinc-400 hover:text-zinc-200 transition-all focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Lists */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1d1d1d]/95 backdrop-blur-xl border-b border-white/5 py-4 px-4 space-y-3 animate-fade-in z-50">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full p-3 text-left text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : "bg-zinc-900/20 border border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>{item.label}</span>
                  <Code className="w-3.5 h-3.5 opacity-50 text-emerald-400" />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onDownloadResume();
            }}
            className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all select-none"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Interactive Resume</span>
          </button>
        </div>
      )}

    </header>
  );
}
