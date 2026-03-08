import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface BlueprintContextType {
  blueprintMode: boolean;
  toggleBlueprintMode: () => void;
}

const BlueprintContext = createContext<BlueprintContextType>({
  blueprintMode: false,
  toggleBlueprintMode: () => {},
});

export const BlueprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blueprintMode, setBlueprintMode] = useState(false);
  const toggleBlueprintMode = useCallback(() => setBlueprintMode(prev => !prev), []);

  // Keyboard shortcut: B (ignored when focus is in a form field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "b" || e.key === "B") toggleBlueprintMode();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleBlueprintMode]);

  return (
    <BlueprintContext.Provider value={{ blueprintMode, toggleBlueprintMode }}>
      {children}
    </BlueprintContext.Provider>
  );
};

export const useBlueprint = () => useContext(BlueprintContext);
