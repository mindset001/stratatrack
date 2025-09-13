import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-700">Striplog App</h1>
        <nav className="flex gap-4">
          <Link href="/signup" className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700">Sign Up</Link>
          <Link href="/login" className="px-4 py-2 rounded bg-gray-200 text-blue-700 font-medium hover:bg-gray-300">Login</Link>
        </nav>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Striplog</h2>
        <p className="text-lg text-gray-600 mb-8">Visualize, record, and manage wellbore lithology and strip logs with ease.</p>
        <Link href="/signup" className="px-6 py-3 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700">Get Started</Link>
      </main>
      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-gray-400 bg-white border-t">© 2025 Striplog App</footer>
    </div>
  );
}
