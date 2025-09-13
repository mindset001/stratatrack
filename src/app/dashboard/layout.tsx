'use client';
import React from "react";
import Sidebar from "../components/Sidebar";
import { LithologyProvider } from "@/context/LithologyContext";
import { StriplogProvider } from "@/context/StriplogContext";
import { IntegrationProvider } from "@/context/IntegrationContext";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
   <LithologyProvider>
    <StriplogProvider>
        <IntegrationProvider>
             <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
        </IntegrationProvider>
    </StriplogProvider>
   </LithologyProvider>
  )
}
