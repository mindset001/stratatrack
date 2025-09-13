'use client';
import { useLithology } from '@/context/LithologyContext';
import { useStriplog } from '@/context/StriplogContext';
import React, { useState } from 'react';

type StriplogData = {
  from: string;
  to: string;
  lithology: string;
  description: string;
};

const StriplogPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<StriplogData>({
    from: '',
    to: '',
    lithology: '',
    description: '',
  });
  const { striplog, addStriplog } = useStriplog();
  const { lithology } = useLithology();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStriplog(form);
    setForm({ from: '', to: '', lithology: '', description: '' });
    setModalOpen(false);
  };

  const exportCSV = () => {
    const csvRows = [
      ['From (m)', 'To (m)', 'Lithology', 'Description'],
      ...striplog.map(row => [row.from, row.to, row.lithology, row.description]),
    ];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'striplog.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Strip Log</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
          <button
            style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => setModalOpen(true)}
          >
            Add New Data
          </button>
          <button
            style={{ padding: '0.5rem 1rem', background: '#eaf0fb', color: '#0070f3', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>
      </div>
      <div style={{ marginTop: '2rem', width: '100%' }}>
        {striplog.length === 0 ? (
          <p>No strip log data yet.</p>
        ) : (
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
                  <td style={{ borderBottom: '1px solid #eee', padding: '0.75rem', textAlign: 'left' }}>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Add Strip Log Data</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="from" style={{ display: 'block', marginBottom: '0.5rem' }}>From (m)</label>
                  <input type="number" id="from" name="from" value={form.from} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="to" style={{ display: 'block', marginBottom: '0.5rem' }}>To (m)</label>
                  <input type="number" id="to" name="to" value={form.to} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="lithology" style={{ display: 'block', marginBottom: '0.5rem' }}>Lithology</label>
                <select
                  id="lithology"
                  name="lithology"
                  value={form.lithology}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
                >
                  <option value="" disabled>Select lithology</option>
                  {lithology.map((l, idx) => (
                    <option key={idx} value={l.type}>{l.type} {l.symbol}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.5rem 1rem', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StriplogPage;