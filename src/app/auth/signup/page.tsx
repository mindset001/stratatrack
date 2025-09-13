'use client'
import React, { useState } from 'react'

function page() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Signup successful!");
        setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
   <div>
     <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        width: '100vw',
        background: '#f5f6fa',
        overflow: 'hidden',
      }}
    >
      <div
        className="signup-image-desktop"
        style={{
          flex: 1,
          display: 'none',
          height: '100%',
          position: 'relative',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Signup Illustration"
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <form
          style={{
            background: '#fff',
            padding: '2.5rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
            minWidth: '340px',
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          onSubmit={handleSubmit}
        >
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign Up</h2>
          <div>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem' }}>First Name</label>
            <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Enter your first name" className="signup-input" />
          </div>
          <div>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem' }}>Last Name</label>
            <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Enter your last name" className="signup-input" />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email address" className="signup-input" />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required placeholder="Create a password" className="signup-input" />
          </div>
          <div>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Re-enter your password" className="signup-input" />
          </div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {message && <div className="mt-4 text-center text-blue-700">{message}</div>}
        </form>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .signup-image-desktop {
            display: block !important;
          }
        }
        .signup-input {
          width: 100%;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .signup-input:focus {
          border-color: #0070f3;
          box-shadow: 0 0 0 2px #eaf0fb;
          outline: none;
        }
        .signup-btn {
          width: 100%;
          padding: 0.75rem;
          background: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .signup-btn:hover {
          background: #005bb5;
        }
      `}</style>

    
    </div>
      {/* <Footer/> */}
   </div>
  );
}

export default page