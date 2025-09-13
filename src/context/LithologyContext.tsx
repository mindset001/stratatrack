import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lithology = {
  type: string;
  color: string;
  symbol: string;
  description: string;
};

interface LithologyContextType {
  lithology: Lithology[];
  addLithology: (l: Lithology) => void;
  editLithology: (idx: number, l: Lithology) => void;
}

const LithologyContext = createContext<LithologyContextType | undefined>(undefined);

const initialLithology: Lithology[] = [
  { type: 'Sand', color: '#FFD700', symbol: '🟨', description: 'Coarse-grained sedimentary rock.' },
  { type: 'Shale', color: '#8B4513', symbol: '🟫', description: 'Fine-grained sedimentary rock.' },
  { type: 'Limestone', color: '#C0C0C0', symbol: '⬜', description: 'Sedimentary rock mainly composed of calcite.' },
];

export const LithologyProvider = ({ children }: { children: ReactNode }) => {
  const [lithology, setLithology] = useState<Lithology[]>(initialLithology);

  const addLithology = (l: Lithology) => {
    setLithology(prev => [...prev, l]);
  };

  const editLithology = (idx: number, l: Lithology) => {
    setLithology(prev => {
      const updated = [...prev];
      updated[idx] = l;
      return updated;
    });
  };

  return (
    <LithologyContext.Provider value={{ lithology, addLithology, editLithology }}>
      {children}
    </LithologyContext.Provider>
  );
};

export const useLithology = () => {
  const context = useContext(LithologyContext);
  if (!context) throw new Error('useLithology must be used within LithologyProvider');
  return context;
}
