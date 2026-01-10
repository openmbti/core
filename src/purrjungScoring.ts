import { purrjungDimensionQuestions, PURRJUNG_TOTAL_QUESTIONS, PURRJUNG_QUESTIONS_PER_DIMENSION } from './purrjungQuestions';
import type { TestAnswers, DimensionScores, DimensionPercentages, TestResult } from './types';

/**
 * PurrJung Cat Personality Test Scoring
 *
 * Each dimension has 4 questions scored 1-5
 * Total range per dimension: 4-20
 *
 * Dimension scoring direction (same as human OEJTS):
 * - EI: Low (4-12) = Social (E), High (13-20) = Solitary (I)
 * - SN: Low (4-12) = Routine (S), High (13-20) = Novelty (N)
 * - TF: Low (4-12) = Independent (T), High (13-20) = Bonded (F)
 * - JP: Low (4-12) = Structured (J), High (13-20) = Spontaneous (P)
 */

// Score range constants
export const PURRJUNG_SCORE_MIN = 4;  // 4 questions × 1 = 4
export const PURRJUNG_SCORE_MAX = 20; // 4 questions × 5 = 20
export const PURRJUNG_THRESHOLD = 12; // Midpoint of 4-20 range

/**
 * Calculate dimension scores from PurrJung test answers
 * Each dimension has 4 questions scored 1-5
 * Total range per dimension: 4-20
 */
export function calculatePurrjungScores(answers: TestAnswers): DimensionScores {
  const scores: DimensionScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

  for (const [dimension, questionIds] of Object.entries(purrjungDimensionQuestions)) {
    scores[dimension as keyof DimensionScores] = questionIds.reduce(
      (sum, qId) => sum + (answers[qId] ?? 3), // Default to neutral (3) if missing
      0
    );
  }

  return scores;
}

/**
 * Determine cat personality type from dimension scores
 *
 * Scoring direction matches human OEJTS:
 * - EI: Low = E (Social), High = I (Solitary)
 * - SN: Low = S (Routine), High = N (Novelty)
 * - TF: Low = T (Independent), High = F (Bonded)
 * - JP: Low = J (Structured), High = P (Spontaneous)
 *
 * Threshold: 12 (midpoint of 4-20 range)
 */
export function determinePurrjungType(scores: DimensionScores): string {
  const e_i = scores.EI > PURRJUNG_THRESHOLD ? 'I' : 'E';
  const s_n = scores.SN > PURRJUNG_THRESHOLD ? 'N' : 'S';
  const t_f = scores.TF > PURRJUNG_THRESHOLD ? 'F' : 'T';
  const j_p = scores.JP > PURRJUNG_THRESHOLD ? 'P' : 'J';

  return `${e_i}${s_n}${t_f}${j_p}`;
}

/**
 * Calculate percentage preference for each trait pole
 * Converts raw scores (4-20) to percentages (0-100)
 */
export function calculatePurrjungPercentages(scores: DimensionScores): DimensionPercentages {
  const toRightPercentage = (score: number): number => {
    // Convert 4-20 range to 0-100
    // Score 4 = 0% right, Score 20 = 100% right
    const normalized = ((score - PURRJUNG_SCORE_MIN) / (PURRJUNG_SCORE_MAX - PURRJUNG_SCORE_MIN)) * 100;
    return Math.round(normalized);
  };

  const eiRight = toRightPercentage(scores.EI); // I (Solitary) percentage
  const snRight = toRightPercentage(scores.SN); // N (Novelty) percentage
  const tfRight = toRightPercentage(scores.TF); // F (Bonded) percentage
  const jpRight = toRightPercentage(scores.JP); // P (Spontaneous) percentage

  return {
    E: 100 - eiRight,  // Social
    I: eiRight,        // Solitary
    S: 100 - snRight,  // Routine
    N: snRight,        // Novelty
    T: 100 - tfRight,  // Independent
    F: tfRight,        // Bonded
    J: 100 - jpRight,  // Structured
    P: jpRight,        // Spontaneous
  };
}

/**
 * Generate complete PurrJung test result from answers
 */
export function generatePurrjungResult(answers: TestAnswers): TestResult {
  const scores = calculatePurrjungScores(answers);
  const type = determinePurrjungType(scores);
  const percentages = calculatePurrjungPercentages(scores);

  return { type, scores, percentages };
}

/**
 * Validate if all PurrJung test questions are answered
 */
export function isPurrjungTestComplete(answers: TestAnswers): boolean {
  return Object.keys(answers).length === PURRJUNG_TOTAL_QUESTIONS;
}

/**
 * Get the question IDs for a specific dimension
 */
export function getPurrjungDimensionQuestionIds(dimension: keyof DimensionScores): readonly number[] {
  return purrjungDimensionQuestions[dimension];
}
