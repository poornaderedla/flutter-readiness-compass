export interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
  category: string;
  weight?: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  maxScore: number;
}

export interface AssessmentResponse {
  questionId: string;
  optionId: string;
  value: number;
}

export interface AssessmentScores {
  psychometric: number;
  technical: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overall: number;
}

export interface CareerRecommendation {
  role: string;
  description: string;
  fit: number;
  requirements: string[];
  nextSteps: string[];
}

export interface AssessmentResult {
  scores: AssessmentScores;
  recommendation: 'YES' | 'NO' | 'MAYBE';
  confidence: number;
  reasoning: string;
  careerPaths: CareerRecommendation[];
  skillGaps: {
    skill: string;
    current: number;
    required: number;
    status: 'GOOD' | 'NEEDS_WORK' | 'CRITICAL';
  }[];
  learningPath: {
    stage: string;
    topics: string[];
    tools: string[];
  }[];
}