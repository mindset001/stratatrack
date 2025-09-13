import React, { createContext, useContext, useState, ReactNode } from 'react';

export type IntegrationSource = {
  source: string;
  type: string;
  entries: number;
  lastImport: string;
  details: string;
  entryList: string[];
};

interface IntegrationContextType {
  sources: IntegrationSource[];
  setSources: React.Dispatch<React.SetStateAction<IntegrationSource[]>>;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

const initialSources: IntegrationSource[] = [
  { source: "Wellsite Geologist", type: "Mud Log", entries: 12, lastImport: "2025-09-10", details: "Mud log data collected by geologist at wellsite. Includes lithology, gas readings, and drilling parameters.", entryList: ["Interval 0-10m: Sand", "Interval 10-20m: Shale", "Interval 20-30m: Limestone", "Interval 30-40m: Shale", "Interval 40-50m: Sand", "Interval 50-60m: Shale", "Interval 60-70m: Sand", "Interval 70-80m: Limestone", "Interval 80-90m: Shale", "Interval 90-100m: Sand", "Interval 100-110m: Shale", "Interval 110-120m: Limestone"] },
  { source: "Core Lab", type: "Core Log", entries: 5, lastImport: "2025-09-12", details: "Core samples analyzed in laboratory. Includes porosity, permeability, and mineral composition.", entryList: ["Core 1: Sandstone", "Core 2: Shale", "Core 3: Limestone", "Core 4: Shale", "Core 5: Sandstone"] },
  { source: "External CSV", type: "Striplog", entries: 8, lastImport: "2025-09-09", details: "Striplog data imported from external CSV file. Contains depth intervals and lithology types.", entryList: ["0-25m: Sand", "25-50m: Shale", "50-75m: Limestone", "75-100m: Shale", "100-125m: Sand", "125-150m: Shale", "150-175m: Limestone", "175-200m: Sand"] },
];

export const IntegrationProvider = ({ children }: { children: ReactNode }) => {
  const [sources, setSources] = useState<IntegrationSource[]>(initialSources);
  return (
    <IntegrationContext.Provider value={{ sources, setSources }}>
      {children}
    </IntegrationContext.Provider>
  );
};

export const useIntegration = () => {
  const context = useContext(IntegrationContext);
  if (!context) throw new Error('useIntegration must be used within IntegrationProvider');
  return context;
};
