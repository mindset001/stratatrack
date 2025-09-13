'use client'
import React, { useState } from 'react';

type Lithology = {
	type: string;
	color: string;
	symbol: string;
	description: string;
};

const initialLithology: Lithology[] = [
	{ type: 'Sand', color: '#FFD700', symbol: '🟨', description: 'Coarse-grained sedimentary rock.' },
	{ type: 'Shale', color: '#8B4513', symbol: '🟫', description: 'Fine-grained sedimentary rock.' },
	{ type: 'Limestone', color: '#C0C0C0', symbol: '⬜', description: 'Sedimentary rock mainly composed of calcite.' },
];


const symbolOptions = [
	{ label: 'Sand', value: '🟨' },
	{ label: 'Shale', value: '🟫' },
	{ label: 'Limestone', value: '⬜' },
	{ label: 'Clay', value: '🟧' },
	{ label: 'Silt', value: '🟦' },
	{ label: 'Gravel', value: '🟩' },
	{ label: 'Other', value: '🔲' },
];

const LithologyPage: React.FC = () => {
		const [lithology, setLithology] = useState<Lithology[]>(initialLithology);
		const [form, setForm] = useState<Lithology>({ type: '', color: '', symbol: '', description: '' });
		const [editIdx, setEditIdx] = useState<number | null>(null);
		const [editForm, setEditForm] = useState<Lithology>({ type: '', color: '', symbol: '', description: '' });

		const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setForm({ ...form, [e.target.name]: e.target.value });
		};

		const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setEditForm({ ...editForm, [e.target.name]: e.target.value });
		};

		const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setLithology([...lithology, form]);
			setForm({ type: '', color: '', symbol: '', description: '' });
		};

		const handleEdit = (idx: number) => {
			setEditIdx(idx);
			setEditForm(lithology[idx]);
		};

		const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (editIdx !== null) {
				const updated = [...lithology];
				updated[editIdx] = editForm;
				setLithology(updated);
				setEditIdx(null);
			}
		};

		const handleEditCancel = () => {
			setEditIdx(null);
		};

		return (
			<div style={{ minHeight: '100vh', background: '#f5f6fa', width: '80vw', padding: '2rem' }}>
				<div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.10)', padding: '2rem' }}>
					<h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0070f3', marginBottom: '2rem', textAlign: 'left' }}>Lithology Summary</h1>
					<form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
					<input
						type="text"
						name="type"
						value={form.type}
						onChange={handleChange}
						placeholder="Type"
						required
						style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '120px' }}
					/>
					<input
						type="text"
						name="color"
						value={form.color}
						onChange={handleChange}
						placeholder="Color (hex)"
						required
						style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '120px' }}
					/>
								<select
									name="symbol"
									value={form.symbol}
									onChange={handleChange}
									required
									style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '120px', background: '#fff' }}
								>
									<option value="" disabled>Select Symbol</option>
									{symbolOptions.map(opt => (
										<option key={opt.value} value={opt.value}>{opt.label} {opt.value}</option>
									))}
								</select>
					<input
						type="text"
						name="description"
						value={form.description}
						onChange={handleChange}
						placeholder="Description"
						required
						style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' }}
					/>
					<button type="submit" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Add Lithology</button>
				</form>
						<table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', fontSize: '1rem', marginTop: '1rem' }}>
							<thead>
								<tr style={{ background: '#eaf0fb' }}>
									<th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Symbol</th>
									<th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Type</th>
									<th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Color</th>
									<th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Description</th>
									<th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{lithology.map((l, idx) => (
									editIdx === idx ? (
										<tr key={idx} style={{ background: '#fffbe6' }}>
											<td style={{ padding: '0.75rem', textAlign: 'center', color: editForm.color, fontSize: '1.5rem' }}>
												<select
													name="symbol"
													value={editForm.symbol}
													onChange={handleEditChange}
													required
													style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '120px', background: '#fff' }}
												>
													<option value="" disabled>Select Symbol</option>
													{symbolOptions.map(opt => (
														<option key={opt.value} value={opt.value}>{opt.label} {opt.value}</option>
													))}
												</select>
											</td>
											<td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 500 }}>
												<input type="text" name="type" value={editForm.type} onChange={handleEditChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '100px' }} />
											</td>
											<td style={{ padding: '0.75rem', textAlign: 'center', color: editForm.color }}>
												<input type="text" name="color" value={editForm.color} onChange={handleEditChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '100px' }} />
											</td>
											<td style={{ padding: '0.75rem', textAlign: 'center' }}>
												<input type="text" name="description" value={editForm.description} onChange={handleEditChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' }} />
											</td>
											<td style={{ padding: '0.75rem', textAlign: 'center' }}>
												<form onSubmit={handleEditSubmit} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
													<button type="submit" style={{ padding: '0.4rem 0.8rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Save</button>
													<button type="button" onClick={handleEditCancel} style={{ padding: '0.4rem 0.8rem', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
												</form>
											</td>
										</tr>
									) : (
										<tr key={idx} style={{ background: idx % 2 === 0 ? '#f9fafe' : '#fff' }}>
											<td style={{ padding: '0.75rem', textAlign: 'center', color: l.color, fontSize: '1.5rem' }}>{l.symbol}</td>
											<td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 500 }}>{l.type}</td>
											<td style={{ padding: '0.75rem', textAlign: 'center', color: l.color }}>{l.color}</td>
											<td style={{ padding: '0.75rem', textAlign: 'center' }}>{l.description}</td>
											<td style={{ padding: '0.75rem', textAlign: 'center' }}>
												<button onClick={() => handleEdit(idx)} style={{ padding: '0.4rem 0.8rem', background: '#eaf0fb', color: '#0070f3', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
											</td>
										</tr>
									)
								))}
							</tbody>
						</table>
			</div>
		</div>
	);
};

export default LithologyPage;
