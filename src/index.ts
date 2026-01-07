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
  // Quick test
  quickTestQuestionIds,
  quickTestQuestions,
  QUICK_TEST_TOTAL,
  QUICK_TEST_PER_DIMENSION,
} from './questions';

// Scoring functions
export {
  calculateScores,
  determineType,
  calculatePercentages,
  generateResult,
  isTestComplete,
  // Quick test scoring
  calculateQuickScores,
  determineQuickType,
  calculateQuickPercentages,
  generateQuickResult,
  isQuickTestComplete,
} from './scoring';
