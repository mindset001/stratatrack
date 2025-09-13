import React, { createContext, useContext, useState, ReactNode } from 'react';

export type StriplogEntry = {
  from: string;
  to: string;
  lithology: string;
  description: string;
};

interface StriplogContextType {
  striplog: StriplogEntry[];
  addStriplog: (entry: StriplogEntry) => void;
}

const StriplogContext = createContext<StriplogContextType | undefined>(undefined);

const initialStriplog: StriplogEntry[] = [
  { from: '0', to: '50', lithology: 'Sand', description: 'Coarse-grained sedimentary rock.' },
  { from: '50', to: '120', lithology: 'Shale', description: 'Fine-grained sedimentary rock.' },
  { from: '120', to: '200', lithology: 'Limestone', description: 'Sedimentary rock mainly composed of calcite.' },
];

export const StriplogProvider = ({ children }: { children: ReactNode }) => {
  const [striplog, setStriplog] = useState<StriplogEntry[]>(initialStriplog);

  const addStriplog = (entry: StriplogEntry) => {
    setStriplog(prev => [...prev, entry]);
  };

  return (
    <StriplogContext.Provider value={{ striplog, addStriplog }}>
      {children}
    </StriplogContext.Provider>
  );
};

export const useStriplog = () => {
  const context = useContext(StriplogContext);
  if (!context) throw new Error('useStriplog must be used within StriplogProvider');
  return context;
};
