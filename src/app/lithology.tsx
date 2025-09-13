import { useState } from "react";
import { Button } from "../components/ui/button";


type LithologyEntry = {
  type: string;
  color: string;
  symbol: string;
  pattern: string;
  top: string;
  base: string;
};

const lithologyOptions: Omit<LithologyEntry, 'top' | 'base'>[] = [
  { type: "Sand", color: "#FFD700", symbol: "🟨", pattern: "dots" },
  { type: "Shale", color: "#8B4513", symbol: "🟫", pattern: "stripes" },
  { type: "Limestone", color: "#C0C0C0", symbol: "⬜", pattern: "solid" },
];

export default function LithologyForm() {
  const [entries, setEntries] = useState<LithologyEntry[]>([]);
  const [form, setForm] = useState({
    type: "Sand",
    top: "",
    base: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd() {
    const selected = lithologyOptions.find((l) => l.type === form.type) || lithologyOptions[0];
    setEntries([
      ...entries,
      {
        type: form.type,
        top: form.top,
        base: form.base,
        color: selected.color,
        symbol: selected.symbol,
        pattern: selected.pattern,
      },
    ]);
    setForm({ type: "Sand", top: "", base: "" });
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Lithology Descriptions</h2>
      <div className="flex gap-2 mb-4">
        <select name="type" value={form.type} onChange={handleChange} className="border rounded px-2 py-1">
          {lithologyOptions.map((l) => (
            <option key={l.type} value={l.type}>{l.type}</option>
          ))}
        </select>
        <input name="top" value={form.top} onChange={handleChange} placeholder="Top Depth" className="border rounded px-2 py-1 w-24" />
        <input name="base" value={form.base} onChange={handleChange} placeholder="Base Depth" className="border rounded px-2 py-1 w-24" />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="border p-2 rounded bg-gray-50">
        <div className="flex flex-col gap-2">
          {entries.map((entry, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span style={{ color: entry.color, fontSize: 24 }}>{entry.symbol}</span>
              <span className="font-semibold">{entry.type}</span>
              <span>({entry.top}m - {entry.base}m)</span>
              <span className="text-xs text-gray-500">{entry.pattern}</span>
            </div>
          ))}
        </div>
        {/* Strip log column visualization */}
        <div className="mt-4 border-l-4 border-black h-64 relative">
          {entries.map((entry, idx) => {
            const height = Math.max(10, (parseInt(entry.base) - parseInt(entry.top)) * 2);
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: `${(parseInt(entry.top) || 0) * 2}px`,
                  left: 0,
                  width: "32px",
                  height: `${height}px`,
                  background: entry.color,
                  border: "1px solid #333",
                  opacity: 0.8,
                }}
                title={`${entry.type} (${entry.top}m-${entry.base}m)`}
              >
                <span style={{ fontSize: 18, position: "absolute", left: 4 }}>{entry.symbol}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
