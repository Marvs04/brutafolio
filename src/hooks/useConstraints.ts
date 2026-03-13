import { useState, useMemo } from "react";
import { Constraints } from "../types";
import { INITIAL_CONSTRAINTS } from "../constants";
import { architectureService } from "../services/architectureService";
import { projectService } from "../services/projectService";

export function useConstraints() {
  const [constraints, setConstraints] = useState<Constraints>(INITIAL_CONSTRAINTS);
  const [riskMode, setRiskMode] = useState(false);

  const decisions = useMemo(() => architectureService.getDecisions(constraints), [constraints]);
  const projects = useMemo(() => projectService.calculateRelevance(constraints), [constraints]);

  const updateConstraint = <K extends keyof Constraints>(key: K, value: Constraints[K]) => {
    setConstraints(prev => ({ ...prev, [key]: value }));
  };

  const toggleRiskMode = () => setRiskMode(prev => !prev);

  return {
    constraints,
    updateConstraint,
    riskMode,
    toggleRiskMode,
    decisions,
    projects
  };
}
