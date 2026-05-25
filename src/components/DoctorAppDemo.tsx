import { useState } from "react";
import { 
  Smartphone, 
  MessageSquare, 
  Mic, 
  Calendar, 
  Check, 
  User, 
  Clock, 
  Activity, 
  Stethoscope, 
  Send,
  Video,
  ClipboardList
} from "lucide-react";

const APPOINTMENTS = [
  { id: 1, docName: "Dr. Muhammad Wasif Nisar", specialty: "Computer Medicine / neurology", time: "10:00 AM", date: "Today", status: "Accepted" },
  { id: 2, docName: "Dr. Samia Riaz", specialty: "Psychiatry Expert", time: "02:30 PM", date: "Tomorrow", status: "Pending" }
];

const PRESET_MESSAGES = [
  { sender: "patient", text: "Hello doctor, I have been experiencing dull migraine pain on my left temple for three days now." },
  { sender: "doctor", text: "Hello! Did this pain develop suddenly or did it gradually intensify? Are you having visual sensitivity?" },
  { sender: "patient", text: "Gradually intensified. Bright monitors definitely make it feel more intense." }
];

export default function DoctorAppDemo() {
  const [role, setRole] = useState<"doctor" | "patient">("patient");
  const [activeTab, setActiveTab] = useState<"appointments" | "chat" | "dictation" | "records">("chat");
  const [messages, setMessages] = useState(PRESET_MESSAGES);
  const [typedMsg, setTypedMsg] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState<string[]>([]);
  const [isSlotBooked, setIsSlotBooked] = useState(false);

  const handleSendMessage = () => {
    if (!typedMsg.trim()) return;
    setMessages(prev => [...prev, { sender: role, text: typedMsg }]);
    setTypedMsg("");

    if (role === "patient") {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: "doctor", 
          text: "Understood. Avoid look screens. Let's schedule a brief video check-up in the clinical slot." 
        }]);
      }, 1000);
    }
  };

  const handleDictationToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordedNotes(prev => [
        "Patient exhibits left-side migraine, sensitivity to light level 4, pulse rate 72bps. Clinical recommendations limit monitor screen exposure to 1 hour daily, administer sumatriptan and review progress during video check-up.",
        ...prev
      ]);
    } else {
      setIsRecording(true);
    }
  };

  const [slots, setSlots] = useState([
    { id: "09:00", text: "09:00 AM", taken: true },
    { id: "10:30", text: "10:30 AM", taken: false },
    { id: "11:00", text: "11:00 AM", taken: false },
    { id: "14:00", text: "02:00 PM", taken: true },
    { id: "15:30", text: "03:30 PM", taken: false }
  ]);

  const handleBookSlot = (id: string) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, taken: true } : s));
    setIsSlotBooked(true);
    setTimeout(() => setIsSlotBooked(false), 3000);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-195" id="doctor-app-root">
      
      {/* Sidebar explanation panel */}
      <div className="w-full md:w-80 bg-slate-950 p-5 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col gap-5 justify-between">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-1 uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Mobile Simulation</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 font-sans tracking-tight">Doctor Consultation</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Danish developed this healthcare platform in Flutter (integrated with a Flask/Postgres backend). Switch roles and test actual app modules in simulated real-time screens.
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest block">Simulation Persona</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setRole("patient")}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  role === "patient" 
                    ? "bg-cyan-600 text-slate-950 font-bold" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Patient View
              </button>
              <button
                onClick={() => setRole("doctor")}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  role === "doctor" 
                    ? "bg-cyan-600 text-slate-950 font-bold" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Doctor View
              </button>
            </div>
          </div>

          <div className="space-y-3 bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-mono text-slate-400 border-b border-slate-800 pb-1 mb-1.5 uppercase">Highlighted Features</h4>
            <ul className="space-y-2 text-[11px] text-slate-400 leading-normal">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span><strong>Voice Dictation:</strong> Simulated AI transcription that creates clean doctor prescriptions automatically.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span><strong>Role-based dashboard:</strong> Customized workflows for healthcare practitioners and care-seekers.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span><strong>Real-time scheduling:</strong> Multi-role calendar bookings without race conditions.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-600 border-t border-slate-800 pt-3">
          Technologies: Flutter, Provider State Management, Python Flask, SQL Alchemy, REST APIs
        </div>
      </div>

      {/* Smartphone frame container */}
      <div className="flex-1 bg-slate-900/60 p-4 flex items-center justify-center relative overflow-hidden">
        
        {/* Aesthetic background mesh glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />

        {/* Outer phone container layout */}
        <div className="w-85 h-170 bg-slate-950 rounded-[40px] border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col relative z-10 ring-12 ring-slate-900">
          
          {/* Speaker, camera notch */}
          <div className="w-full h-6 bg-slate-950 flex items-center justify-center relative">
            <div className="w-28 h-4 bg-slate-900 rounded-b-xl flex items-center justify-center gap-1.5">
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
              <div className="w-2 h-2 bg-slate-800 rounded-full" />
            </div>
            <div className="absolute right-4 text-[9px] font-mono text-slate-500">LTE 100%</div>
          </div>

          {/* App Header */}
          <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">HealSync Mobile</span>
            </div>
            <div className="text-[9px] px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-mono capitalize">
              Role: {role}
            </div>
          </div>

          {/* Active Screen Tab View */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/40 relative">
            
            {activeTab === "appointments" && (
              <div className="p-4 space-y-4 overflow-y-auto h-full flex flex-col justify-start">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs text-slate-200 font-bold uppercase tracking-wider font-mono">Consolidated Consultations</h4>
                  <Calendar className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="space-y-3">
                  {APPOINTMENTS.map((ap) => (
                    <div key={ap.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-200">{ap.docName}</div>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                          ap.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400" : "bg-cyan-500/10 text-cyan-400"
                        }`}>
                          {ap.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">{ap.specialty}</div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900 font-mono">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ap.time}</span>
                        <span>{ap.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-3 mt-1">
                  <div className="text-xs font-medium text-slate-300">Book New Dynamic Appointment</div>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map(s => (
                      <button
                        key={s.id}
                        disabled={s.taken}
                        onClick={() => handleBookSlot(s.id)}
                        className={`p-2 rounded-lg border text-xs font-mono transition-all text-center leading-tight ${
                          s.taken
                            ? "bg-slate-900 border-slate-800/80 text-slate-600 cursor-not-allowed"
                            : "bg-cyan-950/10 border-cyan-800 hover:border-cyan-500 text-cyan-400 hover:scale-105"
                        }`}
                      >
                        {s.text}
                        <div className="text-[8px] text-slate-500 block leading-none pt-0.5">{s.taken ? "Full" : "Available"}</div>
                      </button>
                    ))}
                  </div>

                  {isSlotBooked && (
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] rounded-lg border border-emerald-500/20 text-center animate-bounce">
                      ✔ Appointment Slot Confirmed on DB!
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col overflow-hidden h-full">
                {/* Doctor profile card inside chat */}
                <div className="p-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  {role === "patient" ? (
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-cyan-700/60 font-bold font-sans text-xs text-slate-100 flex items-center justify-center">
                        W
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-200">Dr. Muhammad Wasif Nisar</div>
                        <div className="text-[8px] text-slate-500 font-mono">Online Consultations</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-emerald-700/60 font-bold font-sans text-xs text-slate-100 flex items-center justify-center">
                        D
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-200">Danish Ejaz (Patient context)</div>
                        <div className="text-[8px] text-slate-500 font-mono">Mobile App user</div>
                      </div>
                    </div>
                  )}
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                </div>

                {/* Chat items scroll box */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col justify-end">
                  {messages.map((m, index) => {
                    const isSelf = m.sender === role;
                    return (
                      <div 
                        key={index} 
                        className={`max-w-[80%] p-2.5 rounded-2xl text-[11px] leading-relaxed ${
                          isSelf 
                            ? "bg-cyan-600 text-slate-950 self-end rounded-br-none font-medium" 
                            : "bg-slate-950 text-slate-300 border border-slate-800 self-start rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                    );
                  })}
                </div>

                {/* Chat input box */}
                <div className="p-2 bg-slate-950 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={typedMsg}
                    onChange={(e) => setTypedMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Enter chat message..."
                    className="flex-1 bg-slate-900 border border-slate-800 text-[11px] rounded-lg px-2.5 py-1.5 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-700"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="p-1 px-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "dictation" && (
              <div className="p-4 space-y-4 overflow-y-auto h-full flex flex-col justify-start">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs text-slate-200 font-bold uppercase tracking-wider font-mono">Doctor Dictation AI</h4>
                  <Mic className="w-4 h-4 text-cyan-400" />
                </div>

                <p className="text-[11px] text-slate-400 leading-normal">
                  Allows clinical doctors to record voice symptoms that the backend automatically processes into clean digital prescription cards. Try recording.
                </p>

                {/* Recorder area */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center gap-3">
                  <button 
                    onClick={handleDictationToggle}
                    className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                      isRecording 
                        ? "bg-red-600 text-slate-100 animate-pulse scale-105" 
                        : "bg-cyan-600 hover:bg-cyan-500 text-slate-950"
                    }`}
                  >
                    <Mic className="w-6 h-6 font-bold" />
                  </button>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{isRecording ? "Recording symptoms live..." : "Start Clinician Memo"}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{isRecording ? "Tap button to parse transcription" : "Preloaded with speech-to-next pipeline"}</div>
                  </div>

                  {isRecording && (
                    <div className="flex items-center gap-1 h-6 pt-1">
                      <span className="w-1 bg-cyan-500 h-2 rounded animate-bounce delay-100" />
                      <span className="w-1 bg-cyan-500 h-4 rounded animate-bounce delay-200" />
                      <span className="w-1 bg-cyan-500 h-1.5 rounded animate-bounce" />
                      <span className="w-1 bg-cyan-500 h-5 rounded animate-bounce delay-300" />
                      <span className="w-1 bg-cyan-500 h-3.5 rounded animate-bounce delay-150" />
                      <span className="w-1 bg-cyan-500 h-2 rounded animate-bounce delay-75" />
                    </div>
                  )}
                </div>

                {/* Recorded transcription files */}
                {recordedNotes.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Transcribed Digital Prescriptions ({recordedNotes.length})</div>
                    {recordedNotes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-cyan-950/20 border border-cyan-900 rounded-xl space-y-1">
                        <div className="text-[10px] text-cyan-400 font-mono font-bold">Transcription #{recordedNotes.length - idx}</div>
                        <p className="text-[10px] text-slate-300 leading-normal font-sans italic">
                          "{note}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "records" && (
              <div className="p-4 space-y-3 overflow-y-auto h-full flex flex-col justify-start">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs text-slate-200 font-bold uppercase tracking-wider font-mono">Diagnostics Vault</h4>
                  <ClipboardList className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl">
                    <div className="text-[10px] font-mono text-slate-500">22 Nov, 2025 - Infyntrix Medical Hub</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">Left Migraine Diagnosis Report</div>
                    <div className="text-[10px] text-slate-400 mt-1">Status: Sumatriptan treatment cycle, review on consultation node.</div>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl">
                    <div className="text-[10px] font-mono text-slate-500">14 Aug, 2025 - GOFTech clinic</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">General Dental Roster Checklist</div>
                    <div className="text-[10px] text-slate-400 mt-1">Status: Regular checkup confirmed. Records migrated to database platform.</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Smartphone Bottom Navigation Bar */}
          <div className="bg-slate-950/90 border-t border-slate-800 py-2.5 flex items-center justify-around select-none">
            <button 
              onClick={() => setActiveTab("appointments")}
              className={`flex flex-col items-center gap-1 ${activeTab === "appointments" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-[9px] font-mono leading-none">Schedule</span>
            </button>

            <button 
              onClick={() => setActiveTab("chat")}
              className={`flex flex-col items-center gap-1 ${activeTab === "chat" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[9px] font-mono leading-none">Consult</span>
            </button>

            <button 
              onClick={() => setActiveTab("dictation")}
              className={`flex flex-col items-center gap-1 ${activeTab === "dictation" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Mic className="w-4 h-4" />
              <span className="text-[9px] font-mono leading-none">Dictate</span>
            </button>

            <button 
              onClick={() => setActiveTab("records")}
              className={`flex flex-col items-center gap-1 ${activeTab === "records" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              <ClipboardList className="w-4 h-4" />
              <span className="text-[9px] font-mono leading-none">Health</span>
            </button>
          </div>

          {/* Phone Speaker Home Button Area */}
          <div className="w-full h-4 bg-slate-950 flex items-center justify-center p-1">
            <div className="w-24 h-1 bg-slate-800 rounded-full" />
          </div>

        </div>

      </div>

    </div>
  );
}
