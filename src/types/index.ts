export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'interest' | 'strength' | 'preference' | 'environment';
}

export interface QuizAnswer {
  questionId: number;
  answer: string;
  category: string;
}

export interface TradeMatch {
  rank: number;
  trade: string;
  matchScore: number;
  salaryRange: string;
  whyMatch: string;
  skillGaps: string[];
  actionPlan: ActionStep[];
}

export interface ActionStep {
  step: number;
  title: string;
  detail: string;
  timeEstimate: string;
  cost: string;
  priority: 'high' | 'medium' | 'low';
}

export interface UserProfile {
  id: string;
  email: string;
  quizAnswers: QuizAnswer[];
  matches: TradeMatch[];
  completedSteps: Record<string, number[]>;
  createdAt: string;
}
