import React from 'react';

const Footer = () => (
	<footer
		style={{
			width: '100%',
			padding: '1rem 0',
			background: '#f5f6fa',
			textAlign: 'center',
			fontSize: '1rem',
			color: '#333',
			borderTop: '1px solid #eaeaea',
			marginTop: '2rem',
		}}
	>
		<span>
			&copy; {new Date().getFullYear()} StrataTrack &mdash; Designed at Acme Innovations
		</span>
	</footer>
);

export default Footer;
