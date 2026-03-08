import { Constraints, Project, Scale } from "../types";
import { PROJECTS } from "../constants";

export const projectService = {
  calculateRelevance(constraints: Constraints): Project[] {
    return PROJECTS.map(project => {
      let score = 0;
      
      // Real-time relevance
      if (constraints.realtime && project.techStack.includes("WebSockets")) score += 50;
      
      // Scale relevance
      if (constraints.scale === Scale.GLOBAL && project.techStack.includes("Redis")) score += 30;
      if (constraints.scale === Scale.GLOBAL && project.techStack.includes("AWS")) score += 30;
      
      // Tech stack matches
      if (project.techStack.includes("Supabase") && constraints.budget === "bootstrapped") score += 20;
      
      return { ...project, relevanceScore: score };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
};
