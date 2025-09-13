const sampleLithology = [
  { type: "Sand", color: "#FFD700", symbol: "🟨", pattern: "dots", top: 0, base: 50 },
  { type: "Shale", color: "#8B4513", symbol: "🟫", pattern: "stripes", top: 50, base: 120 },
  { type: "Limestone", color: "#C0C0C0", symbol: "⬜", pattern: "solid", top: 120, base: 200 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 gap-6">
        <h2 className="text-xl font-bold mb-4">StrataTrack</h2>
        <nav className="flex flex-col gap-4">
          <a href="#lithology" className="text-gray-700 hover:text-blue-600 font-medium">Lithology Summary</a>
          <a href="#striplog" className="text-gray-700 hover:text-blue-600 font-medium">Strip Log</a>
          <a href="#integration" className="text-gray-700 hover:text-blue-600 font-medium">Data Integration</a>
          <a href="#export" className="text-gray-700 hover:text-blue-600 font-medium">Export Logs</a>
        </nav>
        <div className="mt-auto text-xs text-gray-400">© 2025 Striplog App</div>
      </aside>
      {/* Main dashboard content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div id="lithology" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Lithology Summary</h2>
            <ul className="text-sm">
              {sampleLithology.map((l, idx) => (
                <li key={idx} className="flex items-center gap-2 mb-1">
                  <span style={{ color: l.color, fontSize: 20 }}>{l.symbol}</span>
                  <span>{l.type}</span>
                  <span className="text-xs text-gray-500">({l.top}m - {l.base}m)</span>
                  <span className="text-xs text-gray-400">{l.pattern}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="striplog" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Strip Log</h2>
            <div className="relative h-64 border-l-4 border-black mt-4" style={{ width: 48 }}>
              {sampleLithology.map((l, idx) => {
                const height = Math.max(10, (l.base - l.top) * 2);
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      top: `${l.top * 2}px`,
                      left: 0,
                      width: "40px",
                      height: `${height}px`,
                      background: l.color,
                      border: "1px solid #333",
                      opacity: 0.85,
                    }}
                    title={`${l.type} (${l.top}m-${l.base}m)`}
                  >
                    <span style={{ fontSize: 18, position: "absolute", left: 4 }}>{l.symbol}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="integration" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Data Integration</h2>
            <p>Summary of imported data from wellsite geologists, mud logs, and core logs.</p>
          </div>
          <div id="export" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Export Logs</h2>
            <p>Export logs to standard formats for reports, cross-sections, or modeling.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
