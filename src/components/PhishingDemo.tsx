import { useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  HelpCircle, 
  Link2, 
  Zap, 
  CheckCircle,
  Network
} from "lucide-react";

interface FeatureLog {
  feature: string;
  value: string | number;
  weight: string;
  verdict: "suspicious" | "neutral" | "safe";
}

export default function PhishingDemo() {
  const [url, setUrl] = useState("http://secure-login-prestige-banking-pakistan-auth.info/user-credential");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<{
    phishingProb: number;
    verdict: "Safe" | "Phishing" | "Suspicious";
    features: FeatureLog[];
    latencyMs: number;
  } | null>(null);

  const handleScanURL = () => {
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const q = url.toLowerCase().trim();
      let prob = 5; // Default safe prob
      const features: FeatureLog[] = [];

      // Feature 1: Protocol Presence
      const hasHttps = q.startsWith("https://");
      features.push({
        feature: "SSL/HTTPS Encryption Schema",
        value: hasHttps ? "HTTPS present" : "HTTP present (No SSL)",
        weight: "15%",
        verdict: hasHttps ? "safe" : "suspicious"
      });
      if (!hasHttps) prob += 20;

      // Feature 2: Sub-domain depth count
      let domainPart = q.replace("https://", "").replace("http://", "").split("/")[0];
      let dotCount = (domainPart.match(/\./g) || []).length;
      features.push({
        feature: "Sub-domain Cluster Depth",
        value: `${dotCount} dots detected`,
        weight: "25%",
        verdict: dotCount > 3 ? "suspicious" : dotCount > 1 ? "neutral" : "safe"
      });
      if (dotCount > 3) prob += 25;
      else if (dotCount > 1) prob += 10;

      // Feature 3: Suspicious Keyword Matching
      const suspiciousWords = ["login", "secure", "bank", "verification", "update", "signin", "infyntrix", "credential", "auth", "prestige", "free", "gift"];
      const matchedWords = suspiciousWords.filter(word => q.includes(word));
      features.push({
        feature: "Lexical Suspicious Keywords Match",
        value: matchedWords.length > 0 ? `Matched: [${matchedWords.join(", ")}]` : "No alert patterns",
        weight: "35%",
        verdict: matchedWords.length > 2 ? "suspicious" : matchedWords.length > 0 ? "neutral" : "safe"
      });
      prob += matchedWords.length * 15;

      // Feature 4: URL Total Suffix Length
      features.push({
        feature: "Total String Suffix Sizing",
        value: `${q.length} chars`,
        weight: "25%",
        verdict: q.length > 55 ? "suspicious" : q.length > 30 ? "neutral" : "safe"
      });
      if (q.length > 55) prob += 15;

      // Cap probability
      prob = Math.min(prob, 99);
      if (prob < 20 && hasHttps) {
        prob = Math.max(2, prob - 5);
      }

      let verdict: "Safe" | "Phishing" | "Suspicious" = "Safe";
      if (prob > 65) verdict = "Phishing";
      else if (prob > 30) verdict = "Suspicious";

      setResult({
        phishingProb: prob,
        verdict,
        features,
        latencyMs: Math.floor(Math.random() * 25) + 12
      });
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[780px]" id="phishing-root">
      
      {/* Intro info sidebar */}
      <div className="w-full md:w-80 bg-slate-950 p-5 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col gap-5 justify-between">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs mb-1 uppercase tracking-wider">
              <Network className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Security Service</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 font-sans tracking-tight">Phishing Link Detector</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Danish developed this Python Flask AI web service to analyze URL strings and extract lexical profiles for Gradient Boosting classifier models.
            </p>
          </div>

          <div className="space-y-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800/80">
            <h4 className="text-xs font-mono font-bold text-slate-400 border-b border-slate-850 pb-1 mb-1.5 uppercase">Test URL Suggestions</h4>
            <div className="space-y-2 text-[11px] font-mono">
              <button 
                onClick={() => setUrl("http://secure-login-prestige-banking-pakistan-auth.info/user-credential")}
                className="w-full text-left font-mono truncate text-[10px] text-rose-400 hover:underline block"
              >
                http://secure-login-prestige-banking-pakistan-auth.info/user-credential
              </button>
              <button 
                onClick={() => setUrl("https://cuiwah.edu.pk/AcademicRecord/Registration.aspx")}
                className="w-full text-left font-mono truncate text-[10px] text-emerald-400 hover:underline block"
              >
                https://cuiwah.edu.pk/AcademicRecord/Registration.aspx
              </button>
              <button 
                onClick={() => setUrl("http://verified-update-netflix-login-reset.click/index.html")}
                className="w-full text-left font-mono truncate text-[10px] text-rose-400 hover:underline block"
              >
                http://verified-update-netflix-login-reset.click/index.html
              </button>
              <button 
                onClick={() => setUrl("https://github.com/Anonymous-codes512")}
                className="w-full text-left font-mono truncate text-[10px] text-emerald-400 hover:underline block"
              >
                https://github.com/Anonymous-codes512
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-normal bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            The scanner decomposes URLs into token weights and scores metrics through client feature engineering trees.
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-600 border-t border-slate-800 pt-3">
          Technologies: Python, Flask REST API, Random Forest, Gradient Boosting, Token Parsing, Feature Slices
        </div>
      </div>

      {/* Main interactive terminal area */}
      <div className="flex-1 bg-slate-900 p-6 flex flex-col justify-start overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
          <div>
            <h4 className="text-base font-semibold text-slate-200">Interactive ML Link Inference</h4>
            <div className="text-xs text-slate-400 mt-0.5">Input raw URI string to extract ML decision parameters.</div>
          </div>
          <HelpCircle className="w-5 h-5 text-slate-500" />
        </div>

        {/* URL Input Box */}
        <div className="bg-slate-950 p-4 border border-slate-850 rounded-2xl flex flex-col gap-3.5 mb-5 shadow-lg">
          <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Inference Target URL String</label>
          <div className="flex gap-3">
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-rose-400 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste url link here..."
                className="flex-1 bg-transparent text-xs text-slate-200 outline-none font-mono placeholder-slate-600"
              />
            </div>
            <button
              onClick={handleScanURL}
              disabled={isScanning}
              className="px-5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow p-2 flex items-center gap-2 font-sans select-none disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isScanning ? "Predicting..." : "Run ML Scan"}</span>
            </button>
          </div>
        </div>

        {/* Prediction Results Display */}
        {isScanning && (
          <div id="phishing-scanner-loading" className="flex-1 min-h-[300px] flex flex-col items-center justify-center text-slate-400 gap-4">
            <div className="relative">
              <div className="animate-ping absolute -inset-0.5 rounded-full bg-rose-500/10" />
              <div className="h-12 w-12 rounded-full border-2 border-t-rose-500 border-slate-800 animate-spin" />
            </div>
            <div className="text-center font-mono text-xs text-slate-500">
              [API] Posting URL payload to Python microservice...<br/>
              [ML] token extraction and gradient trees active...
            </div>
          </div>
        )}

        {result && !isScanning && (
          <div id="phishing-output-card" className="space-y-5 animate-fade-in">
            
            {/* Top overview widget */}
            <div className={`p-4 border rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 ${
              result.verdict === "Phishing" 
                ? "bg-rose-950/15 border-rose-800/55" 
                : result.verdict === "Suspicious"
                ? "bg-amber-950/15 border-amber-800/55"
                : "bg-emerald-950/15 border-emerald-800/55"
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${
                  result.verdict === "Phishing" 
                    ? "bg-rose-650/10 text-rose-500" 
                    : result.verdict === "Suspicious"
                    ? "bg-amber-650/10 text-amber-500"
                    : "bg-emerald-650/10 text-emerald-500"
                }`}>
                  {result.verdict === "Phishing" ? <AlertTriangle className="w-8 h-8" /> : result.verdict === "Suspicious" ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500">Model Inference Verdict</div>
                  <h5 className="text-2xl font-bold font-sans text-slate-100 flex items-center gap-2">
                    {result.verdict} Links Model Check
                  </h5>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Flask Endpoint Latency: <strong className="text-emerald-400">{result.latencyMs} ms</strong> (Low Latency pipeline)
                  </div>
                </div>
              </div>

              {/* Progress dial slider */}
              <div className="text-center md:text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Phishing probability</div>
                <div className={`text-4xl font-extrabold font-mono mt-1 ${
                  result.phishingProb > 65 ? "text-rose-400" : result.phishingProb > 30 ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {result.phishingProb}%
                </div>
              </div>
            </div>

            {/* Feature slicing variables table */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">Lexical Token Feature Extraction Logs</div>
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 bg-slate-950 text-[10px] font-mono text-slate-400 p-2.5 border-b border-slate-800 uppercase">
                  <div className="col-span-5 border-r border-slate-850">Target Structural Param</div>
                  <div className="col-span-4 border-r border-slate-850 px-2">Parsed Value Result</div>
                  <div className="col-span-1.5 border-r border-slate-850 text-center px-1">Weight</div>
                  <div className="col-span-1.5 text-center">Threat</div>
                </div>

                <div className="divide-y divide-slate-800 bg-slate-900/40">
                  {result.features.map((feat, idx) => (
                    <div key={idx} className="grid grid-cols-12 text-[11px] p-2.5 font-sans items-center">
                      <div className="col-span-5 font-medium text-slate-300 border-r border-slate-800/40 font-mono">
                        {feat.feature}
                      </div>
                      <div className="col-span-4 text-slate-400 border-r border-slate-800/40 px-2 font-mono truncate">
                        {feat.value}
                      </div>
                      <div className="col-span-1.5 text-center font-mono text-slate-500 border-r border-slate-800/40 px-1">
                        {feat.weight}
                      </div>
                      <span className="col-span-1.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-mono leading-none ${
                          feat.verdict === "suspicious"
                            ? "bg-rose-500/10 text-rose-400"
                            : feat.verdict === "neutral"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          {feat.verdict}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated terminal logging output */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-slate-500">
                <Terminal className="w-3.5 h-3.5 text-rose-500" />
                <span>Microservice Tree Decisions Terminal Logs</span>
              </div>
              <div className="font-mono text-[10px] text-slate-500 space-y-1">
                <div>[Inference_Post] received query body string length={url.length}</div>
                <div>[Features] tokenizer tokens parsed. feature array mapped [x1_length, x2_ssl, x3_subdomains_count, x4_matches]</div>
                <div>[GradientBooster] evaluated tree node 0..498. Resulting branch index returns weight score: {result.phishingProb/100}</div>
                <div>[Response] HTTP code 200 payload returned status={result.verdict} in {result.latencyMs}ms</div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
