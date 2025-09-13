"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const router = useRouter();
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Username and password required.");
      return;
    }
    // TODO: Integrate with backend authentication
    setError("");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}
