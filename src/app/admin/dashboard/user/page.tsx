'use client'

import React, { useState } from "react";

const initialUsers = [
  { name: "Jane Doe", email: "jane@acme.com", role: "Admin", status: "Active" },
  { name: "John Smith", email: "john@acme.com", role: "Editor", status: "Active" },
  { name: "Alice Brown", email: "alice@acme.com", role: "Viewer", status: "Inactive" },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer", status: "Active" });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && editIdx !== null) {
      const updated = [...users];
      updated[editIdx] = form;
      setUsers(updated);
      setEditMode(false);
      setEditIdx(null);
      notify("User updated successfully");
    } else {
      setUsers([...users, form]);
      notify("User added successfully");
    }
    setForm({ name: "", email: "", role: "Viewer", status: "Active" });
    setModalOpen(false);
  };

  const handleEdit = (idx: number) => {
    setForm(users[idx]);
    setEditMode(true);
    setEditIdx(idx);
    setModalOpen(true);
  };

  const handleDelete = (idx: number) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((_, i) => i !== idx));
      notify("User deleted successfully");
    }
  };

  const notify = (msg: string) => {
    setNotifications((prev) => [msg, ...prev]);
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {toastMsg}
        </div>
      )}
      {/* Notification history section */}
      {notifications.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-2">Notifications</h2>
          <ul>
            {notifications.map((msg, idx) => (
              <li key={idx} className="text-blue-700 text-sm mb-1">{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button onClick={() => { setModalOpen(true); setEditMode(false); setForm({ name: "", email: "", role: "Viewer", status: "Active" }); }} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700 transition">Add User</button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>
      <div className="bg-white rounded shadow p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b">Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Role</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3 border-b">{user.name}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{user.role}</td>
                <td className="p-3 border-b">{user.status}</td>
                <td className="p-3 border-b">
                  <button onClick={() => handleEdit(idx)} className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(idx)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
            <h2 style={{ marginBottom: '1rem' }}>{editMode ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem' }}>Role</label>
                <select id="role" name="role" value={form.role} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="status" style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
                <select id="status" name="status" value={form.status} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => { setModalOpen(false); setEditMode(false); setEditIdx(null); }} style={{ padding: '0.5rem 1rem', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{editMode ? "Save" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
