import React from 'react';

const Sidebar = () => (
	<aside
		style={{
			width: '220px',
			background: '#fff',
			boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
			padding: '2rem 1rem',
			display: 'flex',
			flexDirection: 'column',
			gap: '2rem',
			minHeight: '100vh',
		}}
	>
		<h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem', color: '#0070f3' }}>StrataTrack</h2>
		<nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<a href="/dashboard" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Dashboard</a>
			<a href="/dashboard/striplog" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Strip Log</a>
			<a href="/dashboard/lithology" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Lithology</a>
			<a href="/dashboard/integration" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Integration</a>
			<a href="/dashboard#export" style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>Export</a>
		</nav>
		<div style={{ marginTop: 'auto', fontSize: '0.85rem', color: '#aaa' }}>
			&copy; {new Date().getFullYear()} StrataTrack
		</div>
	</aside>
);

export default Sidebar;
