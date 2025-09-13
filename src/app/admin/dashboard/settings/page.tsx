'use client'

import React, { useState } from "react";

const initialSettings = {
  appName: "StrataTrack",
  theme: "Light",
  notifications: true,
  autoExport: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    alert("Settings saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded shadow p-6 max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="appName" className="block font-semibold mb-2">App Name</label>
            <input type="text" id="appName" name="appName" value={settings.appName} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="theme" className="block font-semibold mb-2">Theme</label>
            <select id="theme" name="theme" value={settings.theme} onChange={handleChange} className="border p-2 rounded w-full">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="notifications" name="notifications" checked={settings.notifications} onChange={handleChange} className="mr-2" />
            <label htmlFor="notifications" className="font-semibold">Enable Notifications</label>
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="autoExport" name="autoExport" checked={settings.autoExport} onChange={handleChange} className="mr-2" />
            <label htmlFor="autoExport" className="font-semibold">Auto Export Logs</label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700 transition">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
