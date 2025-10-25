import React , { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  extraSidebar: ReactNode | null;
  setExtraSidebar: (node: ReactNode | null) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [extraSidebar, setExtraSidebar] = useState<ReactNode | null>(null);

  return (
    <LayoutContext.Provider value={{ extraSidebar, setExtraSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
