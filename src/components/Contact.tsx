import { useState, ChangeEvent, FormEvent } from "react";
import { Send, Check, AlertCircle, Sparkles, MessageCircle, Mail } from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Enterprise Consultation Scope",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" >("idle");
  const [submittedRequests, setSubmittedRequests] = useState<any[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setSubmittedRequests(prev => [formData, ...prev]);
      setFormData({
        name: "",
        email: "",
        subject: "Enterprise Consultation Scope",
        message: ""
      });
      // reset success after a while
      setTimeout(() => setStatus("idle"), 5000);
    }, 1200);
  };

  return (
    <section className="py-16 md:py-24 border-t border-white/5" id="contact-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side Info Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Contact Node</div>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Let's Establish <span className="italic font-serif text-emerald-400 font-medium">Connection</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
              I am open to formal employment positions, client-side web consulting, project setups, or technical collaborations. Drop me a line!
            </p>
          </div>

          <div className="space-y-4 pt-2 text-sm font-sans">
            <div className="p-5 bg-zinc-900/10 border border-white/5 rounded-3xl flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
                <Mail className="w-5 h-5 font-bold" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">Direct Email Node</div>
                <a href={`mailto:${PERSONAL_INFO.emails[0]}`} className="text-zinc-200 hover:text-emerald-400 hover:underline block font-normal truncate mt-1.5 text-sm">
                  {PERSONAL_INFO.emails[0]}
                </a>
                <a href={`mailto:${PERSONAL_INFO.emails[1]}`} className="text-zinc-400 hover:text-emerald-400 hover:underline block font-normal truncate mt-1 text-xs">
                  {PERSONAL_INFO.emails[1]}
                </a>
              </div>
            </div>

            <div className="p-5 bg-zinc-900/10 border border-white/5 rounded-3xl flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
                <MessageCircle className="w-5 h-5 font-bold" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">Instant Messaging Channels</div>
                <a 
                  href={`https://wa.me/${PERSONAL_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-200 hover:text-emerald-400 hover:underline block font-normal mt-1.5 text-sm"
                >
                  WhatsApp: +92 302 8933706
                </a>
                <div className="text-[10px] text-zinc-500 font-mono tracking-wider mt-1">Response Time: Within 2 hours standards.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High-fidelity contact form */}
        <div className="lg:col-span-7 bg-zinc-900/10 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 select-none font-sans">
          <div className="border-b border-white/5 pb-4 mb-4">
            <h3 className="text-lg font-medium text-white font-sans tracking-tight">Structured Inquiry Form</h3>
            <p className="text-xs text-zinc-450 mt-1.5">Fields are checked through static validation checks instantly.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs md:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Your Name / Organization</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Jane Doe from Infyntrix"
                  className="w-full bg-zinc-950/40 border border-white/5 rounded-xl p-3 text-zinc-300 outline-none focus:outline-none focus:border-emerald-500/40 font-sans text-xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Inquiry Email Node</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., manager@infyntrix.com"
                  className="w-full bg-zinc-950/40 border border-white/5 rounded-xl p-3 text-zinc-300 outline-none focus:outline-none focus:border-emerald-500/40 font-sans text-xs transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Topic Class Parameters</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-zinc-950/40 border border-white/5 rounded-xl p-3 text-zinc-300 outline-none focus:outline-none focus:border-emerald-500/40 font-sans text-xs transition-all"
              >
                <option value="Enterprise Consultation Scope" className="bg-zinc-950 text-zinc-300">Enterprise Code / AG-Grid Audit</option>
                <option value="Full-stack Role Opportunity" className="bg-zinc-950 text-zinc-300">Full-time Roles Availability</option>
                <option value="Technical Collaboration" className="bg-zinc-950 text-zinc-300">Technical Collaboration Ideas</option>
                <option value="Personal Greeting" className="bg-zinc-950 text-zinc-300">Informal Catch-up Session</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest font-bold">Details Description</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Formulate your request with metrics or specs..."
                className="w-full bg-zinc-950/40 border border-white/5 rounded-xl p-3 text-zinc-300 outline-none focus:outline-none focus:border-emerald-500/40 font-sans text-xs resize-none transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] tracking-widest uppercase rounded-full transition-all shadow-md shadow-emerald-950/25 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{status === "sending" ? "Transmitting..." : "Transmit Inquiry"}</span>
              </button>
            </div>

            {status === "success" && (
              <div className="p-3.5 bg-emerald-500/10 text-emerald-400 font-mono text-[11px] tracking-wider rounded-xl border border-emerald-500/20 text-center animate-pulse flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Inquiry dispatched securely. Thank you!</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-3.5 bg-rose-500/10 text-rose-400 font-mono text-[11px] tracking-wider rounded-xl border border-rose-500/20 text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Verification failed. Please complete all fields.</span>
              </div>
            )}
          </form>

          {/* Submitted inquiries log */}
          {submittedRequests.length > 0 && (
            <div className="border-t border-white/5 pt-5 space-y-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Inquiry Records ({submittedRequests.length})</span>
              </div>
              <div className="space-y-2 h-24 overflow-y-auto pr-1">
                {submittedRequests.map((req, rIdx) => (
                  <div key={rIdx} className="p-3 bg-zinc-950/40 border border-white/5 rounded-2xl text-[10px] font-mono text-zinc-400 space-y-1">
                    <div className="flex justify-between font-bold text-zinc-300">
                      <span>Sender: {req.name}</span>
                      <span className="text-emerald-400 font-bold">Sent</span>
                    </div>
                    <div>Email: {req.email} | Subject: {req.subject}</div>
                    <div className="text-zinc-500 italic mt-1">" {req.message} "</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
