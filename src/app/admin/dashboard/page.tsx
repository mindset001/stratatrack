'use client'

import React, { useState } from "react";

const initialUsers = [
  { name: "Jane Doe", email: "jane@acme.com", role: "Admin", status: "Active" },
  { name: "John Smith", email: "john@acme.com", role: "Editor", status: "Active" },
  { name: "Alice Brown", email: "alice@acme.com", role: "Viewer", status: "Inactive" },
];

const logs = [
  { action: "User login", user: "Jane Doe", time: "2 min ago", details: "IP: 192.168.1.1, Browser: Chrome" },
  { action: "Changed settings", user: "John Smith", time: "10 min ago", details: "Theme changed to Dark" },
  { action: "Added user", user: "Alice Brown", time: "1 hour ago", details: "Role: Viewer, Status: Inactive" },
];

const notifications = [
  { message: "New user registered: Alice Brown", time: "1 hour ago" },
  { message: "System update available", time: "Yesterday" },
];

const loginTrend = [2, 4, 3, 5, 6, 4, 7]; // Sample logins per day

export default function AdminDashboard() {
  const [users] = useState(initialUsers);
  const [logEntries] = useState(logs);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<typeof logs[0] | null>(null);

  // Sample data for graph: users by role
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const roles = Object.keys(roleCounts);
  const counts = Object.values(roleCounts);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">{users.length}</span>
          <span className="text-gray-500">Users</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-600">{logEntries.length}</span>
          <span className="text-gray-500">Logs</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-red-600">{notifications.length}</span>
          <span className="text-gray-500">Notifications</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <ul>
            {logs.map((log, idx) => (
              <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0 cursor-pointer hover:bg-blue-50" onClick={() => { setSelectedLog(log); setModalOpen(true); }}>
                <span className="font-medium text-gray-700">{log.action}</span>
                <span className="text-gray-500">{log.user}</span>
                <span className="text-xs text-gray-400">{log.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Notifications</h2>
          <ul>
            {notifications.map((n, idx) => (
              <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="text-gray-700">{n.message}</span>
                <span className="text-xs text-gray-400">{n.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <h2 className="font-semibold text-lg mb-4">Login Trend (Last 7 Days)</h2>
          <svg width="220" height="120">
            {loginTrend.map((val, idx) => {
              const barHeight = val * 16;
              return (
                <g key={idx}>
                  <rect
                    x={20 + idx * 28}
                    y={100 - barHeight}
                    width={20}
                    height={barHeight}
                    fill="#10b981"
                    rx={4}
                  />
                  <text
                    x={30 + idx * 28}
                    y={110}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#333"
                  >{`Day ${idx + 1}`}</text>
                  <text
                    x={30 + idx * 28}
                    y={100 - barHeight - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#555"
                  >{val}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6 max-w-xl">
        <h2 className="font-semibold text-lg mb-4">Users by Role</h2>
        <svg width="220" height="120">
          {roles.map((role, idx) => {
            const barHeight = counts[idx] * 24;
            return (
              <g key={role}>
                <rect
                  x={20 + idx * 60}
                  y={100 - barHeight}
                  width={40}
                  height={barHeight}
                  fill="#3b82f6"
                  rx={6}
                />
                <text
                  x={40 + idx * 60}
                  y={110}
                  textAnchor="middle"
                  fontSize="14"
                  fill="#333"
                >{role}</text>
                <text
                  x={40 + idx * 60}
                  y={100 - barHeight - 8}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#555"
                >{counts[idx]}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {modalOpen && selectedLog && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Log Details</h2>
            <p><strong>Action:</strong> {selectedLog.action}</p>
            <p><strong>User:</strong> {selectedLog.user}</p>
            <p><strong>Time:</strong> {selectedLog.time}</p>
            <p className="mt-4 text-gray-700"><strong>Details:</strong> {selectedLog.details}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button onClick={() => setModalOpen(false)} style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
