// Types
export type {
  TestAnswers,
  Dimension,
  DimensionScores,
  DimensionPercentages,
  TestResult,
  BilingualText,
  QuestionPair,
  DimensionQuestions,
} from './types';

// Questions data
export {
  questions,
  dimensionQuestions,
  sortedQuestions,
  TOTAL_QUESTIONS,
  QUESTIONS_PER_DIMENSION,
} from './questions';

// Scoring functions
export {
  calculateScores,
  determineType,
  calculatePercentages,
  generateResult,
  isTestComplete,
} from './scoring';
