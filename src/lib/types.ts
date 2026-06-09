export type Category =
  | "Business English Core"
  | "Accounting Basics"
  | "Audit Basics"
  | "Advanced Audit / Assurance"
  | "CFA / Finance Basics"
  | "Market Vocabulary";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type QuestionType =
  | "meaning-mcq"
  | "context-mcq"
  | "reverse-mcq"
  | "similar-distinction";

export type WrongQuestionStatus = "wrong" | "reviewing" | "mastered";

export interface User {
  id: string;
  name: string;
  createdAt: string;
}

export interface VocabWord {
  id: string;
  word: string;
  chineseMeaning: string;
  englishDefinition: string;
  category: Category;
  difficulty: Difficulty;
  exampleSentence: string;
  relatedWords: string[];
  commonMistake: string;
}

export interface Unit {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  orderIndex: number;
  wordIds: string[];
}

export interface Question {
  id: string;
  unitId: string;
  vocabWordId: string;
  questionType: QuestionType;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface UnitAttempt {
  id: string;
  userId: string;
  unitId: string;
  startedAt: string;
  completedAt: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpentSeconds: number;
}

export interface QuestionAttempt {
  id: string;
  userId: string;
  unitAttemptId: string;
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  attemptedAt: string;
}

export interface WrongQuestion {
  id: string;
  userId: string;
  questionId: string;
  vocabWordId: string;
  wrongCount: number;
  correctReviewCount: number;
  status: WrongQuestionStatus;
  lastWrongAt: string;
  nextReviewAt: string;
}

export interface AppProgress {
  user: User;
  unitAttempts: UnitAttempt[];
  questionAttempts: QuestionAttempt[];
  wrongQuestions: WrongQuestion[];
  lastUnitId?: string;
}
