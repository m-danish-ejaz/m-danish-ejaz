import { useState, useEffect, useRef } from "react";
import { 
  Building2, 
  Layers, 
  Database, 
  TrendingUp, 
  FileSpreadsheet, 
  Terminal, 
  Upload, 
  Play, 
  Mail, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  Search, 
  ArrowUpDown, 
  Cpu, 
  Download, 
  RefreshCw,
  Plus,
  Trash2,
  CalendarCheck
} from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  category: "Healthcare" | "Banking" | "Logistics";
  dbHost: string;
  primaryColor: string;
  metrics: {
    revenue: string;
    transactions: string;
    activeUsers: string;
    queriesPerSec: string;
  };
  sampleData: Array<Record<string, string | number>>;
}

const TEMPLATE_TENANTS: Tenant[] = [
  {
    id: "st-elizabeth-med",
    name: "St. Elizabeth Hospital Systems",
    category: "Healthcare",
    dbHost: "pg-pool-04.hospital-tenant.internal",
    primaryColor: "emerald",
    metrics: {
      revenue: "$1,420,900 USD",
      transactions: "432,910 API calls",
      activeUsers: "1,240 medical staff",
      queriesPerSec: "148 qps"
    },
    sampleData: [
      { id: "TX-101", division: "Cardiology Center", patients: 120, operatingCost: 45000, status: "Active" },
      { id: "TX-102", division: "Pediatric Care", patients: 280, operatingCost: 32000, status: "Active" },
      { id: "TX-104", division: "Intensive Care Unit", patients: 64, operatingCost: 112000, status: "Warning" },
      { id: "TX-105", division: "Outpatient Surgical", patients: 145, operatingCost: 28000, status: "Active" },
      { id: "TX-109", division: "Neurology Wing", patients: 45, operatingCost: 89000, status: "Maintenance" }
    ]
  },
  {
    id: "apex-finance-corp",
    name: "Apex Global FinTech",
    category: "Banking",
    dbHost: "pg-pool-12.fin-tenant.internal",
    primaryColor: "blue",
    metrics: {
      revenue: "$12,850,200 USD",
      transactions: "4,192,800 operations",
      activeUsers: "12,980 active accounts",
      queriesPerSec: "840 qps"
    },
    sampleData: [
      { id: "TX-301", division: "Asset Advisory", patients: 1402, operatingCost: 189000, status: "Active" },
      { id: "TX-302", division: "Treasury Holdings", patients: 840, operatingCost: 520000, status: "Active" },
      { id: "TX-304", division: "Retail Operations", patients: 8920, operatingCost: 142000, status: "Active" },
      { id: "TX-305", division: "Risk Governance", patients: 154, operatingCost: 95000, status: "Active" },
      { id: "TX-309", division: "Equity Arbitrage", patients: 450, operatingCost: 1105000, status: "Warning" }
    ]
  },
  {
    id: "supply-chain-intl",
    name: "Vanguard Global Logistics",
    category: "Logistics",
    dbHost: "pg-pool-08.logistics-tenant.internal",
    primaryColor: "amber",
    metrics: {
      revenue: "$3,620,400 USD",
      transactions: "1,894,200 checkpoints",
      activeUsers: "3,110 dispatch units",
      queriesPerSec: "312 qps"
    },
    sampleData: [
      { id: "TX-501", division: "Airways Cargo Hub", patients: 450, operatingCost: 240000, status: "Active" },
      { id: "TX-502", division: "Maritime Terminals", patients: 1120, operatingCost: 680000, status: "Active" },
      { id: "TX-504", division: "Inland Express Rail", patients: 2320, operatingCost: 155000, status: "Active" },
      { id: "TX-505", division: "Cold Chain Storage", patients: 85, operatingCost: 78000, status: "Warning" },
      { id: "TX-509", division: "Urban Fleet Route", patients: 5410, operatingCost: 98000, status: "Active" }
    ]
  }
];

export default function CostwiseDemo() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(TEMPLATE_TENANTS[0]);
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapLogs, setSwapLogs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("id");
  const [sortAsc, setSortAsc] = useState(true);
  
  // SQL Terminal State
  const [sqlQuery, setSqlQuery] = useState(`SELECT * FROM tenant_divisions WHERE status = 'Active';`);
  const [terminalOutput, setTerminalOutput] = useState<any[]>([]);
  const [terminalStatus, setTerminalStatus] = useState<"idle" | "success" | "evaluating">("success");

  // Excel Streaming Parser Simulator State
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);
  const [processedRows, setProcessedRows] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  // SMTP Settings State
  const [smtpServer, setSmtpServer] = useState("smtp.microsoft-graph.com");
  const [smtpPort, setSmtpPort] = useState(587);
  const [smtpStatus, setSmtpStatus] = useState<"verified" | "unverified" | "testing">("verified");
  const [isolationLevel, setIsolationLevel] = useState("READ_COMMITTED");
  const [sessionTimeout, setSessionTimeout] = useState(20); // mins

  // Pivot Mode State
  const [pivotMode, setPivotMode] = useState(false);

  // Logs ref
  const logTerminalEndRef = useRef<HTMLDivElement>(null);
  const streamTerminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (logTerminalEndRef.current) {
      logTerminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [swapLogs]);

  useEffect(() => {
    if (streamTerminalEndRef.current) {
      streamTerminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamLogs]);

  const handleTenantChange = (tenant: Tenant) => {
    if (tenant.id === selectedTenant.id) return;
    setIsSwapping(true);
    setSwapLogs([]);
    const logs = [
      `[INFO] Intercepting request for domain: ${tenant.id}.costwise-enterprise.com ...`,
      `[INFO] Extracting host parameters & security session cookies (Isolated Session Context)...`,
      `[RESOLVER] DNS request resolved. Dynamic routing table targeting tenant cluster.`,
      `[SECURITY] Activating Secure Multi-Tenant Context Resolver...`,
      `[DB-SWITCH] Releasing database hook on current cluster: ${selectedTenant.dbHost}`,
      `[DB-SWITCH] Opening connection request to target database host: ${tenant.dbHost}`,
      `[DB-POOL] Spawning connection nodes, isolation mode: ${isolationLevel}`,
      `[SUCCESS] Swapping complete! Database switched to ${tenant.category} isolated schema.`,
      `[METRICS] Polling telemetry data on target container...`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setSwapLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setSelectedTenant(tenant);
          setIsSwapping(false);
          // Set terminal data
          setTerminalOutput(tenant.sampleData);
        }
      }, (index + 1) * 220);
    });
  };

  useEffect(() => {
    // Initial load
    setTerminalOutput(selectedTenant.sampleData);
  }, []);

  const handleRunSQL = () => {
    setTerminalStatus("evaluating");
    setTimeout(() => {
      const q = sqlQuery.toLowerCase().trim();
      let res = [...selectedTenant.sampleData];
      
      if (q.includes("active")) {
        res = selectedTenant.sampleData.filter(d => d.status === "Active");
      } else if (q.includes("warning")) {
        res = selectedTenant.sampleData.filter(d => d.status === "Warning");
      } else if (q.includes("maintenance")) {
        res = selectedTenant.sampleData.filter(d => d.status === "Maintenance");
      }

      setTerminalOutput(res);
      setTerminalStatus("success");
    }, 400);
  };

  const handleExcelStream = () => {
    setIsStreaming(true);
    setStreamProgress(0);
    setProcessedRows(0);
    setErrorCount(0);
    setStreamLogs(["[PIPELINE] Starting multi-million row Excel streaming ingestion..."]);

    const steps = [
      { prog: 5, rows: 230, errs: 0, text: "[INIT] Opening stream. Buffer blocks allocated in heap: 64MB" },
      { prog: 15, rows: 42000, errs: 0, text: "[PARSING] Streaming block chunks 1..5. Parsing binary records to JSON structures..." },
      { prog: 30, rows: 128901, errs: 3, text: "[VALIDATION] Verifying staging lines. Found 3 schema alignment overrides. Routing to staging fallback index" },
      { prog: 48, rows: 450000, errs: 5, text: "[DB-INSERTER] Running bulk copy operations in database. Executing in transacted chunks..." },
      { prog: 65, rows: 890421, errs: 18, text: "[INTEGRITY_CHECK] Ensuring unique constraints on Division ID parameters. Isolated thread pool active" },
      { prog: 80, rows: 1205312, errs: 41, text: "[STREAMERS] Buffers streaming complete. Row count: 1,205,312. Finalizing database index re-builds" },
      { prog: 95, rows: 2000000, errs: 41, text: "[POST-VALIDATION] Flushing staging queues. Reclaiming local container node disk buffers..." },
      { prog: 100, rows: 2000000, errs: 41, text: "[COMPLETED] Stream parser closed safely. 2M record pipeline ingested. Target DB indexes optimization complete." }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setStreamProgress(step.prog);
        setProcessedRows(step.rows);
        setErrorCount(step.errs);
        setStreamLogs(prev => [...prev, step.text]);
        if (index === steps.length - 1) {
          setIsStreaming(false);

          // Add simple simulated record to divisions
          const newRow = { id: `TX-${Math.floor(Math.random() * 800) + 600}`, division: "Ingested Stream Hub", patients: 1205, operatingCost: 245000, status: "Active" };
          setTerminalOutput(prev => [newRow, ...prev]);
        }
      }, (index + 1) * 800);
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedData = [...terminalOutput]
    .filter(row => {
      const query = searchQuery.toLowerCase();
      return (
        String(row.id).toLowerCase().includes(query) ||
        String(row.division).toLowerCase().includes(query) ||
        String(row.status).toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const va = a[sortField];
      const vb = b[sortField];
      if (typeof va === "number" && typeof vb === "number") {
        return sortAsc ? va - vb : vb - va;
      }
      return sortAsc
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[780px]" id="costwise-sandbox-root">
      
      {/* Sandbox Controller Sidebar */}
      <div className="w-full md:w-80 bg-slate-950 p-4 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col gap-5 overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs mb-1 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Enterprise Environment</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 font-sans tracking-tight">Costwise SaaS Engine</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Switch isolated corporate tenants and simulate real-time database swaps instantly.
          </p>
        </div>

        {/* Tenant Switcher */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">Active Tenants</label>
          {TEMPLATE_TENANTS.map(tenant => {
            const isActive = selectedTenant.id === tenant.id;
            return (
              <button
                key={tenant.id}
                id={`btn-tenant-${tenant.id}`}
                onClick={() => handleTenantChange(tenant)}
                disabled={isSwapping}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                  isActive
                    ? "border-emerald-500/50 bg-slate-900 shadow-lg text-slate-100"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                } disabled:opacity-50`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${
                    isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-800 text-slate-400"
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium font-sans leading-tight">{tenant.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">{tenant.category} context</div>
                  </div>
                </div>
                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping absolute right-3" />}
              </button>
            );
          })}
        </div>

        {/* Tenant Swapping Telemetry Logs */}
        <div className="flex-1 flex flex-col min-h-[140px] bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-[10px] leading-relaxed text-slate-400 relative">
          <div className="text-slate-500 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between border-b border-slate-800 pb-1">
            <span>Dynamic Router Logs</span>
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isSwapping ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
              <span className="text-[9px] lowercase font-medium">{isSwapping ? "resolving" : "ready"}</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 max-h-[110px]">
            {swapLogs.length === 0 ? (
              <span className="text-slate-600 block">System idle. Select a tenant above to execute runtime DB resolutions.</span>
            ) : (
              swapLogs.map((log, index) => (
                <div key={index} className={log.includes("[SUCCESS]") ? "text-emerald-400 font-semibold" : log.includes("[DB-") ? "text-cyan-400" : "text-slate-400"}>
                  {log}
                </div>
              ))
            )}
            <div ref={logTerminalEndRef} />
          </div>
        </div>

        {/* Safeguards & Tenant Controls */}
        <div className="space-y-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
          <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-2">DB Commits Guard</div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-slate-500" /> Isolation Mode:</span>
              <span className="font-mono text-emerald-400 text-[10px]">{isolationLevel}</span>
            </div>
            <select
              value={isolationLevel}
              onChange={(e) => setIsolationLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-[11px] rounded-lg p-1.5 text-slate-300 font-mono outline-none focus:border-slate-700"
            >
              <option value="READ_COMMITTED">Read Committed</option>
              <option value="SERIALIZABLE">Serializable (Strict)</option>
              <option value="REPEATABLE_READ">Repeatable Read</option>
            </select>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Session Timeout:</span>
              <span className="font-mono text-slate-100">{sessionTimeout} mins</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="120" 
              step="5"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Main Work Space Dashboard */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-900">
        
        {/* Dynamic Tenant Info Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800/80 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {selectedTenant.category} Tenant
              </span>
              <span className="text-slate-500 font-mono text-xs">ID: {selectedTenant.id}</span>
            </div>
            <h4 id="curr-tenant-display" className="text-lg font-semibold text-slate-100 font-sans mt-0.5">{selectedTenant.name}</h4>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500">Live Volume</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{selectedTenant.metrics.revenue}</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500">Node Queries</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{selectedTenant.metrics.queriesPerSec}</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500">Users Authenticated</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{selectedTenant.metrics.activeUsers}</div>
            </div>
          </div>
        </div>

        {/* Split Panels: Reporting Grid vs Bulk Pipeline */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left Columns - High-fidelity AG Grid Emulator */}
          <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 overflow-hidden">
            
            {/* AG Grid Header controls */}
            <div className="p-3.5 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <div className="relative max-w-xs flex-1">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Server-side filter divisions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900/60 border border-slate-800 text-xs rounded-lg text-slate-300 placeholder-slate-500 font-sans focus:outline-none focus:border-slate-700"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPivotMode(!pivotMode)}
                  className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-1 ${
                    pivotMode
                      ? "bg-emerald-950/40 border-emerald-800 hover:border-emerald-700 text-emerald-400"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Pivot {pivotMode ? "ON" : "OFF"}</span>
                </button>

                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + ["Division ID,Division / Segment,Patients / Invoices,Cost,Status"].join(",") + "\n"
                      + sortedData.map(r => `${r.id},${r.division},${r.patients},${r.operatingCost},${r.status}`).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `${selectedTenant.id}_divisions_export.csv`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                  }}
                  className="px-2.5 py-1.5 text-xs font-mono bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-300 rounded-lg hover:border-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Streaming Export</span>
                </button>
              </div>
            </div>

            {/* Simulated Server-Rendered grid container */}
            <div className="flex-1 overflow-auto bg-slate-900 p-2">
              {isSwapping ? (
                <div id="costwise-pivot-loading" className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                  <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                  <span className="font-mono text-xs">Switching schemas. Re-fetching server dataset...</span>
                </div>
              ) : (
                <div className="w-full min-w-[500px] border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                  
                  {/* Table headers with sort controls */}
                  <div className="grid grid-cols-12 bg-slate-950 font-mono text-[10px] text-slate-400 border-b border-slate-800 uppercase tracking-wider select-none">
                    <div 
                      onClick={() => handleSort("id")}
                      className="col-span-2 p-2.5 hover:bg-slate-900 flex items-center gap-1 cursor-pointer transition-all border-r border-slate-800/60"
                    >
                      <span>Row ID</span>
                      <ArrowUpDown className="w-2.5 h-2.5 text-slate-600" />
                    </div>
                    <div 
                      onClick={() => handleSort("division")}
                      className="col-span-4 p-2.5 hover:bg-slate-900 flex items-center gap-1 cursor-pointer transition-all border-r border-slate-800/60"
                    >
                      <span>{pivotMode ? "Group Category" : "Division / Project"}</span>
                      <ArrowUpDown className="w-2.5 h-2.5 text-slate-600" />
                    </div>
                    <div 
                      onClick={() => handleSort("patients")}
                      className="col-span-2 p-2.5 text-right hover:bg-slate-900 flex items-center justify-end gap-1 cursor-pointer transition-all border-r border-slate-800/60"
                    >
                      <span>Volume</span>
                      <ArrowUpDown className="w-2.5 h-2.5 text-slate-600" />
                    </div>
                    <div 
                      onClick={() => handleSort("operatingCost")}
                      className="col-span-2 p-2.5 text-right hover:bg-slate-900 flex items-center justify-end gap-1 cursor-pointer transition-all border-r border-slate-800/60"
                    >
                      <span>Costs</span>
                      <ArrowUpDown className="w-2.5 h-2.5 text-slate-600" />
                    </div>
                    <div 
                      onClick={() => handleSort("status")}
                      className="col-span-2 p-2.5 hover:bg-slate-900 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <span>Status</span>
                      <ArrowUpDown className="w-2.5 h-2.5 text-slate-600" />
                    </div>
                  </div>

                  {/* Table body */}
                  <div className="divide-y divide-slate-800 bg-slate-900">
                    {sortedData.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 hover:bg-slate-800/45 text-xs text-slate-300 font-sans items-center transition-all">
                        <div className="col-span-2 p-3 font-mono text-[11px] text-slate-500 border-r border-slate-800/40">
                          {row.id}
                        </div>
                        <div className="col-span-4 p-3 font-semibold text-slate-200 border-r border-slate-800/40">
                          {pivotMode ? `[SaaS_Cluster_Group] ➔ ${row.division}` : row.division}
                        </div>
                        <div className="col-span-2 p-3 text-right font-mono text-slate-300 border-r border-slate-800/40">
                          {Number(row.patients).toLocaleString()}
                        </div>
                        <div className="col-span-2 p-3 text-right font-mono font-medium text-emerald-400 border-r border-slate-800/40">
                          ${Number(row.operatingCost).toLocaleString()}
                        </div>
                        <div className="col-span-2 p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                            row.status === "Active" 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : row.status === "Warning"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${row.status === "Active" ? "bg-emerald-400" : row.status === "Warning" ? "bg-amber-400" : "bg-slate-400"}`} />
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {sortedData.length === 0 && (
                      <div className="p-8 text-center text-slate-500 font-mono text-xs">
                        No lines found matching query. Try querying wildcard characters or run SQL setup.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SQL Terminal Console */}
            <div className="h-56 border-t border-slate-800 flex flex-col bg-slate-950 font-mono">
              <div className="p-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-emerald-500" /> Active Dynamic-SQL Stored Procedure</span>
                <span className="text-[10px] text-slate-500">ReadOnly Context</span>
              </div>
              <div className="flex-1 p-2 flex gap-2">
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800/60 rounded p-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-slate-700 resize-none"
                />
                <button
                  onClick={handleRunSQL}
                  disabled={terminalStatus === "evaluating"}
                  className="px-3.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded flex flex-col items-center justify-center gap-1 transition-all disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span className="text-[10px] tracking-wider uppercase">Execute</span>
                </button>
              </div>
              <div className="h-10 px-3 bg-slate-900/60 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Staging resolution check passed</span>
                </div>
                <div className="text-slate-500">
                  Time: <span className="text-emerald-400">0.02 ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns - Bulk Ingestion / Microsoft Integration Config */}
          <div className="lg:col-span-5 flex flex-col overflow-y-auto p-4 gap-4">
            
            {/* Multi-Million Excel Streaming Block */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 font-sans">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Bulk Streaming Pipeline</span>
                </h5>
                <span className="text-[10px] font-mono text-slate-500 uppercase">File Parser Node</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Costwise uses dynamic heap chunks to parse multi-million records without memory limits. Play the engine simulator.
              </p>

              {/* Streaming File Box */}
              <div 
                onClick={handleExcelStream}
                className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isStreaming 
                    ? "border-emerald-500/40 bg-emerald-950/5 text-slate-300" 
                    : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400 hover:text-slate-300"
                }`}
              >
                <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center mb-2 text-slate-500 group-hover:text-slate-300">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold">Simulate Excel Upload</span>
                <span className="text-[10px] text-slate-500 mt-1">Accepts oversized structured assets (.xlsx, .csv)</span>
              </div>

              {/* Progress telemetries */}
              {isStreaming || processedRows > 0 ? (
                <div className="space-y-2 pt-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-xs text-slate-200 font-semibold">
                    <span>Streaming Status:</span>
                    <span className={isStreaming ? "text-amber-400 animate-pulse" : "text-emerald-400"}>
                      {isStreaming ? "Streaming Chunks..." : "Completed ✔"}
                    </span>
                  </div>
                  
                  {/* Dynamic Progress scale */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${streamProgress}%` }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-800/50">
                    <div>Rows parsed: <strong className="text-slate-200">{processedRows.toLocaleString()}</strong></div>
                    <div className="text-right">Skipped / Errs: <strong className="text-amber-500">{errorCount}</strong></div>
                  </div>
                </div>
              ) : null}

              {/* Parser log box */}
              {(isStreaming || streamLogs.length > 1) && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[10px] text-slate-400 h-32 overflow-y-auto">
                  <div className="space-y-1">
                    {streamLogs.map((l, index) => (
                      <div key={index} className={l.includes("[SUCCESS]") || l.includes("[COMPLETED]") ? "text-emerald-400" : l.includes("[VALIDATION]") ? "text-amber-400" : "text-slate-500"}>
                        {l}
                      </div>
                    ))}
                    <div ref={streamTerminalEndRef} />
                  </div>
                </div>
              )}
            </div>

            {/* Admin Integrations module */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 font-sans">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>SMTP & Microsoft Graph</span>
                </h5>
                <span className="px-2 py-0.5 rounded text-[8px] tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono uppercase">
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centralized gateway logs to verify client SMTP configurations and exchange graph permissions.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Graph Auth Endpoint Host</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={smtpServer}
                      onChange={(e) => setSmtpServer(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-300 font-mono outline-none"
                    />
                    <input
                      type="number"
                      value={smtpPort}
                      onChange={(e) => setSmtpPort(Number(e.target.value))}
                      className="w-16 bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-slate-300 font-mono text-center outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 p-2 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-300">Microsoft Graph API Status</div>
                      <div className="text-[9px] text-slate-500 font-mono">Tenant token verified (2FA active)</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSmtpStatus("testing");
                      setTimeout(() => setSmtpStatus("verified"), 800);
                    }}
                    className="px-2 py-1 text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-300 rounded hover:bg-slate-900 transition-all uppercase"
                  >
                    {smtpStatus === "testing" ? "Testing..." : "Verify Hook"}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
