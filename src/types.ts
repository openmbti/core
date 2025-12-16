/**
 * OEJTS Core Types
 * Open Extended Jungian Type Scales
 */

// Test answer type (question ID -> score 1-5)
export interface TestAnswers {
  [questionId: number]: number;
}

// MBTI Dimension type
export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

// Dimension scores (each dimension has 8 questions, range 8-40)
export interface DimensionScores {
  EI: number; // Extroversion-Introversion
  SN: number; // Sensing-Intuition
  TF: number; // Thinking-Feeling
  JP: number; // Judging-Perceiving
}

// Percentage breakdown for each pole
export interface DimensionPercentages {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

// Complete test result
export interface TestResult {
  type: string; // e.g., "ENFP"
  scores: DimensionScores;
  percentages: DimensionPercentages;
}

// Multilingual text (en is required, others optional for fallback)
export interface BilingualText {
  en: string;
  zh?: string;
  ja?: string;
  ko?: string;
  'zh-tw'?: string;
}

// Question pair (bipolar scale)
export interface QuestionPair {
  id: number;
  dimension: Dimension;
  leftTrait: BilingualText;
  rightTrait: BilingualText;
}

// Dimension to question IDs mapping
export type DimensionQuestions = {
  readonly [K in Dimension]: readonly number[];
};
