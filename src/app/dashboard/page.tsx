'use client';


import { useLithology } from "../../context/LithologyContext";
import { useStriplog } from "../../context/StriplogContext";
import { useIntegration } from "../../context/IntegrationContext";

const importedSources = [
  { source: "Wellsite Geologist", type: "Mud Log", entries: 12 },
  { source: "Core Lab", type: "Core Log", entries: 5 },
  { source: "External CSV", type: "Striplog", entries: 8 },
];

export default function Dashboard() {
  const { lithology } = useLithology();
  const { striplog } = useStriplog();
  const { sources: integrationSources } = useIntegration();
  // Example recent activity
  const recentActivity = [
    { type: 'Added Lithology', detail: lithology[0]?.type ? `${lithology[0].type}` : 'Sand', time: '2 min ago' },
    { type: 'Exported Logs', detail: 'Striplog.csv', time: '10 min ago' },
    { type: 'Added Striplog Entry', detail: lithology[1]?.type ? `${lithology[1].type}` : 'Shale', time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">{lithology.length}</span>
            <span className="text-gray-500">Lithologies</span>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">{striplog.length}</span>
            <span className="text-gray-500">Striplog Entries</span>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-600">2</span>
            <span className="text-gray-500">Exports</span>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600">{integrationSources.length}</span>
            <span className="text-gray-500">Integration Sources</span>
            <span className="text-xs text-gray-400 mt-2">Total Entries: {integrationSources.reduce((sum, s) => sum + s.entries, 0)}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700 transition">Add Lithology</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition">Add Striplog Entry</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-purple-700 transition">Export Logs</button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded shadow p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <ul>
            {recentActivity.map((a, idx) => (
              <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="font-medium text-gray-700">{a.type}</span>
                <span className="text-gray-500">{a.detail}</span>
                <span className="text-xs text-gray-400">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lithology Distribution Bar Chart */}
        <div className="bg-white rounded shadow p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">Lithology Distribution</h2>
          <div className="flex justify-center items-center h-48">
            <svg width="320" height="160">
              {(() => {
                // Fallback for demo: add top/base/pattern if missing
                const fallback = [
                  { pattern: "dots", top: 0, base: 50 },
                  { pattern: "stripes", top: 50, base: 120 },
                  { pattern: "solid", top: 120, base: 200 },
                ];
                const lithos = lithology.map((l, i) => ({ ...l, ...fallback[i] }));
                const total = lithos.reduce((sum, l) => sum + (l.base - l.top), 0);
                const barWidth = 60;
                const gap = 20;
                return lithos.map((l, idx) => {
                  const thickness = l.base - l.top;
                  const percent = ((thickness / total) * 100).toFixed(1);
                  const barHeight = (thickness / total) * 120;
                  return (
                    <g key={l.type}>
                      <rect
                        x={gap + idx * (barWidth + gap)}
                        y={140 - barHeight}
                        width={barWidth}
                        height={barHeight}
                        fill={l.color}
                        rx={8}
                      />
                      <text
                        x={gap + idx * (barWidth + gap) + barWidth / 2}
                        y={150}
                        textAnchor="middle"
                        fontSize="14"
                        fill="#333"
                      >{l.type}</text>
                      <text
                        x={gap + idx * (barWidth + gap) + barWidth / 2}
                        y={140 - barHeight - 8}
                        textAnchor="middle"
                        fontSize="13"
                        fill="#555"
                      >{percent}%</text>
                    </g>
                  );
                });
              })()}
            </svg>
          </div>
        </div>

        {/* Existing Sections */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div id="lithology" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Lithology Summary</h2>
            <ul className="text-sm">
              {lithology.map((l, idx) => (
                <li key={idx} className="flex items-center gap-2 mb-1">
                  <span style={{ color: l.color, fontSize: 20 }}>{l.symbol}</span>
                  <span>{l.type}</span>
                  <span className="text-xs text-gray-500">{l.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="striplog" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Strip Log</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>From (m)</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>To (m)</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>Lithology</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {striplog.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.from}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.to}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.lithology}</td>
                    {/* <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.description}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="integration" className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Data Integration</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>Source</th>
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>Type</th>
                  {/* <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>Entries</th> */}
                  <th style={{ borderBottom: '1px solid #ccc', padding: '0.75rem', textAlign: 'left' }}>Last Import</th>
                </tr>
              </thead>
              <tbody>
                {integrationSources.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.source}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.type}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.entries}</td>
                    <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.lastImport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
