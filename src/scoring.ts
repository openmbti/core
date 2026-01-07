import { dimensionQuestions, TOTAL_QUESTIONS, quickTestQuestionIds, QUICK_TEST_TOTAL, QUICK_TEST_PER_DIMENSION } from './questions';
import type { TestAnswers, DimensionScores, DimensionPercentages, TestResult } from './types';

/**
 * Calculate dimension scores from test answers
 * Each dimension has 8 questions scored 1-5
 * Total range per dimension: 8-40
 */
export function calculateScores(answers: TestAnswers): DimensionScores {
  const scores: DimensionScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  for (const [dimension, questionIds] of Object.entries(dimensionQuestions)) {
    scores[dimension as keyof DimensionScores] = questionIds.reduce(
      (sum, qId) => sum + (answers[qId] ?? 3), // Default to neutral (3) if missing
      0
    );
  }

  return scores;
}

/**
 * Determine MBTI type from dimension scores
 *
 * Scoring direction (based on OEJTS design):
 * - EI: Low (8-24) = Extroversion (E), High (25-40) = Introversion (I)
 *       Left traits are E-oriented, right traits are I-oriented
 * - SN: Low (8-24) = Sensing (S), High (25-40) = Intuition (N)
 *       Left traits are S-oriented, right traits are N-oriented
 * - TF: Low (8-24) = Feeling (F), High (25-40) = Thinking (T)
 *       Left traits are F-oriented, right traits are T-oriented
 * - JP: Low (8-24) = Judging (J), High (25-40) = Perceiving (P)
 *       Left traits are J-oriented, right traits are P-oriented
 */
export function determineType(scores: DimensionScores): string {
  const threshold = 24;

  const e_i = scores.EI > threshold ? 'I' : 'E';
  const s_n = scores.SN > threshold ? 'N' : 'S';
  const t_f = scores.TF > threshold ? 'T' : 'F';
  const j_p = scores.JP > threshold ? 'P' : 'J';

  return `${e_i}${s_n}${t_f}${j_p}`;
}

/**
 * Calculate percentage preference for each trait pole
 * Converts raw scores (8-40) to percentages (0-100)
 */
export function calculatePercentages(scores: DimensionScores): DimensionPercentages {
  const toRightPercentage = (score: number): number => {
    // Convert 8-40 range to 0-100
    // Score 8 = 0% right, Score 40 = 100% right
    const normalized = ((score - 8) / 32) * 100;
    return Math.round(normalized);
  };

  const eiRight = toRightPercentage(scores.EI); // I percentage
  const snRight = toRightPercentage(scores.SN); // N percentage
  const tfRight = toRightPercentage(scores.TF); // T percentage
  const jpRight = toRightPercentage(scores.JP); // P percentage

  return {
    E: 100 - eiRight,
    I: eiRight,
    S: 100 - snRight,
    N: snRight,
    F: 100 - tfRight,
    T: tfRight,
    J: 100 - jpRight,
    P: jpRight,
  };
}

/**
 * Generate complete test result from answers
 */
export function generateResult(answers: TestAnswers): TestResult {
  const scores = calculateScores(answers);
  const type = determineType(scores);
  const percentages = calculatePercentages(scores);

  return { type, scores, percentages };
}

/**
 * Validate if all questions are answered
 */
export function isTestComplete(answers: TestAnswers, totalQuestions: number = TOTAL_QUESTIONS): boolean {
  return Object.keys(answers).length === totalQuestions;
}

// ============================================
// Quick Test Mode Functions (8 questions)
// ============================================

/**
 * Calculate dimension scores from quick test answers
 * Each dimension has 2 questions scored 1-5
 * Total range per dimension: 2-10
 */
export function calculateQuickScores(answers: TestAnswers): DimensionScores {
  const scores: DimensionScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  for (const [dimension, questionIds] of Object.entries(quickTestQuestionIds)) {
    scores[dimension as keyof DimensionScores] = questionIds.reduce(
      (sum, qId) => sum + (answers[qId] ?? 3), // Default to neutral (3) if missing
      0
    );
  }

  return scores;
}

/**
 * Determine MBTI type from quick test dimension scores
 * Threshold adjusted for 2-10 range (midpoint = 6)
 */
export function determineQuickType(scores: DimensionScores): string {
  const threshold = 6; // Midpoint of 2-10 range

  const e_i = scores.EI > threshold ? 'I' : 'E';
  const s_n = scores.SN > threshold ? 'N' : 'S';
  const t_f = scores.TF > threshold ? 'T' : 'F';
  const j_p = scores.JP > threshold ? 'P' : 'J';

  return `${e_i}${s_n}${t_f}${j_p}`;
}

/**
 * Calculate percentage preference for each trait pole from quick test
 * Converts raw scores (2-10) to percentages (0-100)
 */
export function calculateQuickPercentages(scores: DimensionScores): DimensionPercentages {
  const toRightPercentage = (score: number): number => {
    // Convert 2-10 range to 0-100
    // Score 2 = 0% right, Score 10 = 100% right
    const normalized = ((score - 2) / 8) * 100;
    return Math.round(normalized);
  };

  const eiRight = toRightPercentage(scores.EI); // I percentage
  const snRight = toRightPercentage(scores.SN); // N percentage
  const tfRight = toRightPercentage(scores.TF); // T percentage
  const jpRight = toRightPercentage(scores.JP); // P percentage

  return {
    E: 100 - eiRight,
    I: eiRight,
    S: 100 - snRight,
    N: snRight,
    F: 100 - tfRight,
    T: tfRight,
    J: 100 - jpRight,
    P: jpRight,
  };
}

/**
 * Generate complete test result from quick test answers
 */
export function generateQuickResult(answers: TestAnswers): TestResult {
  const scores = calculateQuickScores(answers);
  const type = determineQuickType(scores);
  const percentages = calculateQuickPercentages(scores);

  return { type, scores, percentages };
}

/**
 * Validate if all quick test questions are answered
 */
export function isQuickTestComplete(answers: TestAnswers): boolean {
  return Object.keys(answers).length === QUICK_TEST_TOTAL;
}
