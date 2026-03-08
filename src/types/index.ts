export enum TeamSize {
  SOLO = "solo",
  SMALL = "small",
  LARGE = "large",
}

export enum Budget {
  BOOTSTRAPPED = "bootstrapped",
  VENTURE = "venture",
  ENTERPRISE = "enterprise",
}

export enum Scale {
  MVP = "mvp",
  REGIONAL = "regional",
  GLOBAL = "global",
}

export interface Constraints {
  teamSize: TeamSize;
  budget: Budget;
  scale: Scale;
  realtime: boolean;
  deadline: number;
}

export interface ArchitectureDecision {
  category: string;
  category_es?: string;
  choice: string;
  rationale: string;
  rationale_es?: string;
  tradeOffs: string[];
  tradeOffs_es?: string[];
  riskLevel: "low" | "medium" | "high";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  description_es?: string;
  techStack: string[];
  relevanceScore: number;
  link?: string;
  status: "WIP" | "SHIPPED" | "ARCHIVED";
  teamRole: "solo" | "team";
  year: string;
  problem: string;
  problem_es?: string;
  currentChallenge?: string;
  currentChallenge_es?: string;
  lessonLearned?: string;
  lessonLearned_es?: string;
  /** Raw markdown content rendered as a README reader */
  readme?: string;
  /** Public GitHub repository URL (solo-owned projects only) */
  githubUrl?: string;
}

export type TabType = "architecture" | "lab";
