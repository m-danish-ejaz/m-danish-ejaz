import { X, Printer, Mail, Phone, MapPin, Award } from "lucide-react";
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../data";

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" id="resume-modal-overlay">
      
      <div 
        className="bg-zinc-950 border border-white/5 rounded-3xl w-full max-w-4xl max-h-[90vh ] overflow-hidden flex flex-col shadow-2xl animate-scale-up print:p-0 print:border-0 print:bg-white print:max-h-full print:overflow-visible print:relative print:shadow-none"
        id="resume-modal-body"
      >
        
        {/* Top bar controls (Hidden in print templates) */}
        <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 tracking-wider uppercase">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Printable Developer CV Link</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
               onClick={handlePrint}
               className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-widest font-mono rounded-full transition-all flex items-center gap-1.5 shadow shadow-emerald-950/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Send to PDF (System Printer)</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-1 px-3.5 rounded-full border border-white/10 text-zinc-400 hover:text-white transition-all text-xs cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Major Printable Paper Section */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-zinc-950 print:bg-white print:p-0 print:text-slate-950 print:overflow-visible text-sans">
          
          {/* Header Area */}
          <div className="border-b border-white/5 pb-6 text-center md:text-left flex flex-col md:flex-row justify-between items-start gap-4 print:border-slate-350 print:pb-4">
            <div>
              <h1 className="text-3xl font-light text-white font-sans tracking-tight leading-none print:text-black">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm font-mono text-emerald-400 font-semibold mt-1.5 uppercase tracking-wider print:text-slate-700">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-xs text-zinc-300 mt-2 font-sans max-w-xl leading-relaxed print:text-slate-600 print:mt-1">
                {PERSONAL_INFO.profileSummary}
              </p>
            </div>

            {/* Resume Metadata Contact lines */}
            <div className="space-y-1.5 text-xs font-mono text-zinc-400 self-stretch md:self-auto flex flex-col items-center md:items-end print:text-slate-800 tracking-wider">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-zinc-650 print:text-slate-400" /> {PERSONAL_INFO.emails[0]}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-zinc-650 print:text-slate-400" /> {PERSONAL_INFO.emails[1]}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-zinc-650 print:text-slate-400" /> {PERSONAL_INFO.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-zinc-650 print:text-slate-400" /> {PERSONAL_INFO.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 print:grid-cols-12 print:gap-6">
            
            {/* Left Column (Work Experience, Education) */}
            <div className="md:col-span-8 space-y-6 md:space-y-8 print:col-span-8 print:space-y-6">
              
              {/* Experiences block */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold border-b border-white/5 pb-2 print:text-slate-600 print:border-slate-350">
                  Professional Work History
                </h3>
                
                <div className="space-y-6 print:space-y-4">
                  {WORK_EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="space-y-2">
                       <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium text-white text-sm md:text-base font-sans print:text-black">
                            {exp.role} <span className="text-emerald-400 italic font-serif print:text-slate-800 font-medium">@ {exp.company}</span>
                          </h4>
                          <span className="text-xs font-mono text-zinc-550">{exp.location}</span>
                        </div>
                        <span className="text-xs font-mono font-medium text-emerald-400 print:text-slate-700 whitespace-nowrap tracking-wider">{exp.period}</span>
                      </div>

                      <ul className="list-disc list-inside text-xs md:text-sm text-zinc-400 leading-relaxed font-sans space-y-1 pl-1 print:text-slate-800">
                        {exp.description.slice(0, 3).map((bull, bIdx) => (
                          <li key={bIdx} className="items-start gap-1">
                            {bull}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Block */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold border-b border-white/5 pb-2 print:text-slate-600 print:border-slate-350">
                  Academic Milestones
                </h3>

                <div className="space-y-3.5">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="text-xs md:text-sm">
                      <div className="flex justify-between font-medium text-zinc-200 print:text-black font-sans">
                        <span>{edu.degree}</span>
                        <span className="font-mono text-emerald-400 print:text-slate-700 tracking-wider">{edu.period}</span>
                      </div>
                      <div className="text-xs font-mono text-zinc-450 mt-1">{edu.institution}</div>
                      <p className="text-[11px] text-zinc-400 mt-1 pl-1 leading-normal print:text-slate-700 italic">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Skills & Certs) */}
            <div className="md:col-span-4 space-y-6 md:space-y-8 print:col-span-4 print:space-y-6">
              
              {/* Technical skills */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold border-b border-white/5 pb-2 print:text-slate-600 print:border-slate-350">
                  Skills Index
                </h3>

                <div className="space-y-4 text-xs font-mono text-zinc-400 leading-relaxed">
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-450 print:text-slate-800">Frontend Stack:</div>
                    <div className="text-zinc-500 print:text-slate-600">React, TypeScript, Next.js, HTML5, CSS3, Tailwind, Redux, motion</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-450 print:text-slate-800">Backend Systems:</div>
                    <div className="text-zinc-500 print:text-slate-600">Django, Flask, Python, PostgreSQL, SQLAlchemy ORM, PHP, ASP.NET Core MVC</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-450 print:text-slate-800">Mobile Hub:</div>
                    <div className="text-zinc-500 print:text-slate-600">Flutter, Dart, Firebase, Provider</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-450 print:text-slate-800">Tools:</div>
                    <div className="text-zinc-500 print:text-slate-600">Git/GitHub, Docker, Clean Code, Agile logs, Figma</div>
                  </div>
                </div>
              </div>

              {/* Major selected certifications */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold border-b border-white/5 pb-2 print:text-slate-600 print:border-slate-350">
                  Key Credentials
                </h3>

                <div className="space-y-3 font-sans text-xs">
                  {CERTIFICATIONS.slice(0, 4).map((c, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="font-medium text-zinc-200 print:text-black tracking-tight">{c.title}</div>
                      <div className="text-[10px] font-mono text-zinc-550 mt-1">{c.issuer} ({c.date})</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
