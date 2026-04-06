import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { MainLayout } from "./layouts/MainLayout";
import { useBlueprint } from "./context/BlueprintContext";
import { BlueprintOverlay } from "./components/BlueprintOverlay";

import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { CVPage } from "./pages/CVPage";
import { FundamentalsPage } from "./pages/FundamentalsPage";
import { ReadmePage } from "./pages/ReadmePage";
import { EntreprisePage } from "./pages/EntreprisePage";
import { ModuleDetailPage } from "./pages/ModuleDetailPage";

export default function App() {
  const { blueprintMode, toggleBlueprintMode } = useBlueprint();
  const location = useLocation();

  return (
    <MainLayout blueprintMode={blueprintMode} toggleBlueprintMode={toggleBlueprintMode}>
      <BlueprintOverlay active={blueprintMode} suspended={false} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col flex-grow min-h-0"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ReadmePage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/fundamentals" element={<FundamentalsPage />} />
            <Route path="/enterprise" element={<EntreprisePage />} />
            <Route path="/enterprise/modulo/:id" element={<ModuleDetailPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}