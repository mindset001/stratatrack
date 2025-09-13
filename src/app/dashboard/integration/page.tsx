'use client'
import React, { useState } from "react";

const importedSources = [
  { source: "Wellsite Geologist", type: "Mud Log", entries: 12, lastImport: "2025-09-10", details: "Mud log data collected by geologist at wellsite. Includes lithology, gas readings, and drilling parameters.", entryList: ["Interval 0-10m: Sand", "Interval 10-20m: Shale", "Interval 20-30m: Limestone", "Interval 30-40m: Shale", "Interval 40-50m: Sand", "Interval 50-60m: Shale", "Interval 60-70m: Sand", "Interval 70-80m: Limestone", "Interval 80-90m: Shale", "Interval 90-100m: Sand", "Interval 100-110m: Shale", "Interval 110-120m: Limestone"] },
  { source: "Core Lab", type: "Core Log", entries: 5, lastImport: "2025-09-12", details: "Core samples analyzed in laboratory. Includes porosity, permeability, and mineral composition.", entryList: ["Core 1: Sandstone", "Core 2: Shale", "Core 3: Limestone", "Core 4: Shale", "Core 5: Sandstone"] },
  { source: "External CSV", type: "Striplog", entries: 8, lastImport: "2025-09-09", details: "Striplog data imported from external CSV file. Contains depth intervals and lithology types.", entryList: ["0-25m: Sand", "25-50m: Shale", "50-75m: Limestone", "75-100m: Shale", "100-125m: Sand", "125-150m: Shale", "150-175m: Limestone", "175-200m: Sand"] },
];

export default function IntegrationPage() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<typeof importedSources[0] | null>(null);

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const rows = text.split(/\r?\n/).map(row => row.split(","));
      setCsvData(rows.filter(r => r.length > 1));
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Data Integration</h1>
      <p className="mb-6 text-gray-700 text-lg">
        This page summarizes imported data from wellsite geologists, mud logs, core logs, and external sources. Integration helps combine multiple datasets for a complete geological analysis.
      </p>
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="font-semibold text-xl mb-4">Imported Sources</h2>
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b">Source</th>
              <th className="p-3 text-left border-b">Type</th>
              <th className="p-3 text-left border-b">Entries</th>
              <th className="p-3 text-left border-b">Last Import</th>
            </tr>
          </thead>
          <tbody>
            {importedSources.map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedSource(row); setModalOpen(true); }}>
                <td className="p-3 border-b">{row.source}</td>
                <td className="p-3 border-b">{row.type}</td>
                <td className="p-3 border-b">{row.entries}</td>
                <td className="p-3 border-b">{row.lastImport}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Import CSV</label>
          <input type="file" accept=".csv" onChange={handleCSVImport} className="border p-2 rounded" />
        </div>
        {csvData.length > 0 && (
          <div className="overflow-auto">
            <h3 className="font-semibold mb-2">Imported CSV Preview</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {csvData[0].map((col, idx) => (
                    <th key={idx} className="p-2 border-b bg-gray-100 text-left">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(1).map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="p-2 border-b">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {modalOpen && selectedSource && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', maxWidth: '90vw', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
              <h2 style={{ marginBottom: '1rem' }}>{selectedSource.source} Details</h2>
              <p><strong>Type:</strong> {selectedSource.type}</p>
              <p><strong>Entries:</strong> {selectedSource.entries}</p>
              <p><strong>Last Import:</strong> {selectedSource.lastImport}</p>
              <p className="mt-4 text-gray-700">{selectedSource.details}</p>
              <div className="mt-4">
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>All Entries</h3>
                <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: 20 }}>
                  {selectedSource.entryList.map((entry, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{entry}</li>
                  ))}
                </ul>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button onClick={() => setModalOpen(false)} style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
