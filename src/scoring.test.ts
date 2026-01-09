import { describe, it, expect } from 'vitest';
import {
  calculateScores,
  determineType,
  calculatePercentages,
  generateResult,
  isTestComplete,
  // Single dimension functions
  calculateDimensionScore,
  determineDimensionPreference,
  calculateDimensionPercentages,
  generateDimensionResult,
  isDimensionTestComplete,
  getDimensionQuestionIds,
  DIMENSION_QUESTIONS_COUNT,
  DIMENSION_SCORE_MIN,
  DIMENSION_SCORE_MAX,
  DIMENSION_THRESHOLD,
} from './scoring';
import type { TestAnswers, DimensionScores, Dimension } from './types';
import { dimensionQuestions, TOTAL_QUESTIONS } from './questions';

describe('calculateScores', () => {
  it('returns minimum scores (8) when all answers are 1', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 1;
    }
    const scores = calculateScores(answers);
    expect(scores.EI).toBe(8);
    expect(scores.SN).toBe(8);
    expect(scores.TF).toBe(8);
    expect(scores.JP).toBe(8);
  });

  it('returns maximum scores (40) when all answers are 5', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 5;
    }
    const scores = calculateScores(answers);
    expect(scores.EI).toBe(40);
    expect(scores.SN).toBe(40);
    expect(scores.TF).toBe(40);
    expect(scores.JP).toBe(40);
  });

  it('returns neutral scores (24) when all answers are 3', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 3;
    }
    const scores = calculateScores(answers);
    expect(scores.EI).toBe(24);
    expect(scores.SN).toBe(24);
    expect(scores.TF).toBe(24);
    expect(scores.JP).toBe(24);
  });

  it('defaults missing answers to neutral (3)', () => {
    const answers: TestAnswers = {};
    const scores = calculateScores(answers);
    // All defaults to 3, so 8 questions * 3 = 24 per dimension
    expect(scores.EI).toBe(24);
    expect(scores.SN).toBe(24);
    expect(scores.TF).toBe(24);
    expect(scores.JP).toBe(24);
  });

  it('correctly calculates scores for mixed answers', () => {
    const answers: TestAnswers = {};
    // Set EI questions (3, 7, 11, 15, 19, 23, 27, 31) all to 1
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 1;
    });
    // Set SN questions (4, 8, 12, 16, 20, 24, 28, 32) all to 5
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 5;
    });
    // Set TF questions (2, 6, 10, 14, 18, 22, 26, 30) all to 2
    dimensionQuestions.TF.forEach((id) => {
      answers[id] = 2;
    });
    // Set JP questions (1, 5, 9, 13, 17, 21, 25, 29) all to 4
    dimensionQuestions.JP.forEach((id) => {
      answers[id] = 4;
    });

    const scores = calculateScores(answers);
    expect(scores.EI).toBe(8); // 8 * 1 = 8
    expect(scores.SN).toBe(40); // 8 * 5 = 40
    expect(scores.TF).toBe(16); // 8 * 2 = 16
    expect(scores.JP).toBe(32); // 8 * 4 = 32
  });

  it('calculates each dimension independently', () => {
    const answers: TestAnswers = {};
    // Only answer EI questions, leave others to default
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 5;
    });

    const scores = calculateScores(answers);
    expect(scores.EI).toBe(40);
    expect(scores.SN).toBe(24); // default
    expect(scores.TF).toBe(24); // default
    expect(scores.JP).toBe(24); // default
  });
});

describe('determineType', () => {
  it('returns ESFJ for all minimum scores (8)', () => {
    const scores: DimensionScores = { EI: 8, SN: 8, TF: 8, JP: 8 };
    expect(determineType(scores)).toBe('ESFJ');
  });

  it('returns INTP for all maximum scores (40)', () => {
    const scores: DimensionScores = { EI: 40, SN: 40, TF: 40, JP: 40 };
    expect(determineType(scores)).toBe('INTP');
  });

  it('returns ESFJ for threshold scores (24) - left preference', () => {
    const scores: DimensionScores = { EI: 24, SN: 24, TF: 24, JP: 24 };
    expect(determineType(scores)).toBe('ESFJ');
  });

  it('returns INTP for scores just above threshold (25)', () => {
    const scores: DimensionScores = { EI: 25, SN: 25, TF: 25, JP: 25 };
    expect(determineType(scores)).toBe('INTP');
  });

  // Test all 16 MBTI types
  const typeTests: Array<{ scores: DimensionScores; expected: string }> = [
    { scores: { EI: 8, SN: 8, TF: 8, JP: 8 }, expected: 'ESFJ' },
    { scores: { EI: 8, SN: 8, TF: 8, JP: 40 }, expected: 'ESFP' },
    { scores: { EI: 8, SN: 8, TF: 40, JP: 8 }, expected: 'ESTJ' },
    { scores: { EI: 8, SN: 8, TF: 40, JP: 40 }, expected: 'ESTP' },
    { scores: { EI: 8, SN: 40, TF: 8, JP: 8 }, expected: 'ENFJ' },
    { scores: { EI: 8, SN: 40, TF: 8, JP: 40 }, expected: 'ENFP' },
    { scores: { EI: 8, SN: 40, TF: 40, JP: 8 }, expected: 'ENTJ' },
    { scores: { EI: 8, SN: 40, TF: 40, JP: 40 }, expected: 'ENTP' },
    { scores: { EI: 40, SN: 8, TF: 8, JP: 8 }, expected: 'ISFJ' },
    { scores: { EI: 40, SN: 8, TF: 8, JP: 40 }, expected: 'ISFP' },
    { scores: { EI: 40, SN: 8, TF: 40, JP: 8 }, expected: 'ISTJ' },
    { scores: { EI: 40, SN: 8, TF: 40, JP: 40 }, expected: 'ISTP' },
    { scores: { EI: 40, SN: 40, TF: 8, JP: 8 }, expected: 'INFJ' },
    { scores: { EI: 40, SN: 40, TF: 8, JP: 40 }, expected: 'INFP' },
    { scores: { EI: 40, SN: 40, TF: 40, JP: 8 }, expected: 'INTJ' },
    { scores: { EI: 40, SN: 40, TF: 40, JP: 40 }, expected: 'INTP' },
  ];

  typeTests.forEach(({ scores, expected }) => {
    it(`returns ${expected} for scores EI:${scores.EI} SN:${scores.SN} TF:${scores.TF} JP:${scores.JP}`, () => {
      expect(determineType(scores)).toBe(expected);
    });
  });
});

describe('calculatePercentages', () => {
  it('returns 0% right / 100% left for minimum scores (8)', () => {
    const scores: DimensionScores = { EI: 8, SN: 8, TF: 8, JP: 8 };
    const percentages = calculatePercentages(scores);
    // Left traits (E, S, F, J) should be 100%
    expect(percentages.E).toBe(100);
    expect(percentages.I).toBe(0);
    expect(percentages.S).toBe(100);
    expect(percentages.N).toBe(0);
    expect(percentages.F).toBe(100);
    expect(percentages.T).toBe(0);
    expect(percentages.J).toBe(100);
    expect(percentages.P).toBe(0);
  });

  it('returns 100% right / 0% left for maximum scores (40)', () => {
    const scores: DimensionScores = { EI: 40, SN: 40, TF: 40, JP: 40 };
    const percentages = calculatePercentages(scores);
    // Right traits (I, N, T, P) should be 100%
    expect(percentages.E).toBe(0);
    expect(percentages.I).toBe(100);
    expect(percentages.S).toBe(0);
    expect(percentages.N).toBe(100);
    expect(percentages.F).toBe(0);
    expect(percentages.T).toBe(100);
    expect(percentages.J).toBe(0);
    expect(percentages.P).toBe(100);
  });

  it('returns 50% for neutral scores (24)', () => {
    const scores: DimensionScores = { EI: 24, SN: 24, TF: 24, JP: 24 };
    const percentages = calculatePercentages(scores);
    expect(percentages.E).toBe(50);
    expect(percentages.I).toBe(50);
    expect(percentages.S).toBe(50);
    expect(percentages.N).toBe(50);
    expect(percentages.F).toBe(50);
    expect(percentages.T).toBe(50);
    expect(percentages.J).toBe(50);
    expect(percentages.P).toBe(50);
  });

  it('correctly rounds percentages', () => {
    // Score 9: (9-8)/32*100 = 3.125 -> rounds to 3%
    const scores: DimensionScores = { EI: 9, SN: 9, TF: 9, JP: 9 };
    const percentages = calculatePercentages(scores);
    expect(percentages.I).toBe(3);
    expect(percentages.E).toBe(97);
  });

  it('each pair sums to 100%', () => {
    const scores: DimensionScores = { EI: 20, SN: 30, TF: 15, JP: 35 };
    const percentages = calculatePercentages(scores);
    expect(percentages.E + percentages.I).toBe(100);
    expect(percentages.S + percentages.N).toBe(100);
    expect(percentages.F + percentages.T).toBe(100);
    expect(percentages.J + percentages.P).toBe(100);
  });
});

describe('generateResult', () => {
  it('generates complete result with all components', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 3;
    }
    const result = generateResult(answers);
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('scores');
    expect(result).toHaveProperty('percentages');
  });

  it('type matches scores correctly', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 5;
    }
    const result = generateResult(answers);
    expect(result.type).toBe('INTP');
    expect(result.scores.EI).toBe(40);
    expect(result.scores.SN).toBe(40);
    expect(result.scores.TF).toBe(40);
    expect(result.scores.JP).toBe(40);
  });

  it('percentages match scores correctly', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 1;
    }
    const result = generateResult(answers);
    expect(result.percentages.E).toBe(100);
    expect(result.percentages.I).toBe(0);
  });

  it('handles real-world ENFP answers', () => {
    // ENFP: E (low EI), N (high SN), F (low TF), P (high JP)
    const answers: TestAnswers = {};
    // EI questions -> low (E)
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 2;
    });
    // SN questions -> high (N)
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 4;
    });
    // TF questions -> low (F)
    dimensionQuestions.TF.forEach((id) => {
      answers[id] = 2;
    });
    // JP questions -> high (P)
    dimensionQuestions.JP.forEach((id) => {
      answers[id] = 4;
    });

    const result = generateResult(answers);
    expect(result.type).toBe('ENFP');
    expect(result.scores.EI).toBe(16); // E preference
    expect(result.scores.SN).toBe(32); // N preference
    expect(result.scores.TF).toBe(16); // F preference
    expect(result.scores.JP).toBe(32); // P preference
  });

  it('handles real-world ISTJ answers', () => {
    // ISTJ: I (high EI), S (low SN), T (high TF), J (low JP)
    const answers: TestAnswers = {};
    // EI questions -> high (I)
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 4;
    });
    // SN questions -> low (S)
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 2;
    });
    // TF questions -> high (T)
    dimensionQuestions.TF.forEach((id) => {
      answers[id] = 4;
    });
    // JP questions -> low (J)
    dimensionQuestions.JP.forEach((id) => {
      answers[id] = 2;
    });

    const result = generateResult(answers);
    expect(result.type).toBe('ISTJ');
    expect(result.scores.EI).toBe(32); // I preference
    expect(result.scores.SN).toBe(16); // S preference
    expect(result.scores.TF).toBe(32); // T preference
    expect(result.scores.JP).toBe(16); // J preference
  });
});

describe('isTestComplete', () => {
  it('returns false for empty answers', () => {
    expect(isTestComplete({})).toBe(false);
  });

  it('returns false for partial answers', () => {
    const answers: TestAnswers = { 1: 3, 2: 3, 3: 3 };
    expect(isTestComplete(answers)).toBe(false);
  });

  it('returns true for exactly 32 answers', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 32; i++) {
      answers[i] = 3;
    }
    expect(isTestComplete(answers)).toBe(true);
  });

  it('returns false for more than 32 answers', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 33; i++) {
      answers[i] = 3;
    }
    expect(isTestComplete(answers)).toBe(false);
  });

  it('returns false for 31 answers', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= 31; i++) {
      answers[i] = 3;
    }
    expect(isTestComplete(answers)).toBe(false);
  });

  it('respects custom totalQuestions parameter', () => {
    const answers: TestAnswers = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 };
    expect(isTestComplete(answers, 5)).toBe(true);
    expect(isTestComplete(answers, 10)).toBe(false);
  });

  it('uses TOTAL_QUESTIONS constant by default', () => {
    const answers: TestAnswers = {};
    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
      answers[i] = 3;
    }
    expect(isTestComplete(answers)).toBe(true);
  });
});

// ============================================
// Single Dimension Test Functions
// ============================================

describe('Dimension scoring constants', () => {
  it('has correct constant values', () => {
    expect(DIMENSION_QUESTIONS_COUNT).toBe(8);
    expect(DIMENSION_SCORE_MIN).toBe(8);
    expect(DIMENSION_SCORE_MAX).toBe(40);
    expect(DIMENSION_THRESHOLD).toBe(24);
  });
});

describe('getDimensionQuestionIds', () => {
  it('returns 8 question IDs for each dimension', () => {
    const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
    dimensions.forEach((dim) => {
      const ids = getDimensionQuestionIds(dim);
      expect(ids.length).toBe(8);
    });
  });

  it('returns correct IDs for EI dimension', () => {
    const ids = getDimensionQuestionIds('EI');
    expect(ids).toEqual([3, 7, 11, 15, 19, 23, 27, 31]);
  });

  it('returns correct IDs for SN dimension', () => {
    const ids = getDimensionQuestionIds('SN');
    expect(ids).toEqual([4, 8, 12, 16, 20, 24, 28, 32]);
  });

  it('returns correct IDs for TF dimension', () => {
    const ids = getDimensionQuestionIds('TF');
    expect(ids).toEqual([2, 6, 10, 14, 18, 22, 26, 30]);
  });

  it('returns correct IDs for JP dimension', () => {
    const ids = getDimensionQuestionIds('JP');
    expect(ids).toEqual([1, 5, 9, 13, 17, 21, 25, 29]);
  });
});

describe('calculateDimensionScore', () => {
  it('returns minimum score (8) when all answers are 1', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 1;
    });
    expect(calculateDimensionScore(answers, 'EI')).toBe(8);
  });

  it('returns maximum score (40) when all answers are 5', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 5;
    });
    expect(calculateDimensionScore(answers, 'SN')).toBe(40);
  });

  it('returns neutral score (24) when all answers are 3', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.TF.forEach((id) => {
      answers[id] = 3;
    });
    expect(calculateDimensionScore(answers, 'TF')).toBe(24);
  });

  it('defaults missing answers to neutral (3)', () => {
    const answers: TestAnswers = {};
    expect(calculateDimensionScore(answers, 'JP')).toBe(24);
  });

  it('only considers questions for the specified dimension', () => {
    const answers: TestAnswers = {};
    // Answer EI questions with 5
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 5;
    });
    // Answer SN questions with 1
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 1;
    });

    expect(calculateDimensionScore(answers, 'EI')).toBe(40);
    expect(calculateDimensionScore(answers, 'SN')).toBe(8);
    expect(calculateDimensionScore(answers, 'TF')).toBe(24); // default
    expect(calculateDimensionScore(answers, 'JP')).toBe(24); // default
  });
});

describe('determineDimensionPreference', () => {
  // EI dimension tests
  it('returns E for EI score at or below threshold', () => {
    expect(determineDimensionPreference(8, 'EI')).toBe('E');
    expect(determineDimensionPreference(24, 'EI')).toBe('E');
  });

  it('returns I for EI score above threshold', () => {
    expect(determineDimensionPreference(25, 'EI')).toBe('I');
    expect(determineDimensionPreference(40, 'EI')).toBe('I');
  });

  // SN dimension tests
  it('returns S for SN score at or below threshold', () => {
    expect(determineDimensionPreference(8, 'SN')).toBe('S');
    expect(determineDimensionPreference(24, 'SN')).toBe('S');
  });

  it('returns N for SN score above threshold', () => {
    expect(determineDimensionPreference(25, 'SN')).toBe('N');
    expect(determineDimensionPreference(40, 'SN')).toBe('N');
  });

  // TF dimension tests
  it('returns F for TF score at or below threshold', () => {
    expect(determineDimensionPreference(8, 'TF')).toBe('F');
    expect(determineDimensionPreference(24, 'TF')).toBe('F');
  });

  it('returns T for TF score above threshold', () => {
    expect(determineDimensionPreference(25, 'TF')).toBe('T');
    expect(determineDimensionPreference(40, 'TF')).toBe('T');
  });

  // JP dimension tests
  it('returns J for JP score at or below threshold', () => {
    expect(determineDimensionPreference(8, 'JP')).toBe('J');
    expect(determineDimensionPreference(24, 'JP')).toBe('J');
  });

  it('returns P for JP score above threshold', () => {
    expect(determineDimensionPreference(25, 'JP')).toBe('P');
    expect(determineDimensionPreference(40, 'JP')).toBe('P');
  });
});

describe('calculateDimensionPercentages', () => {
  it('returns 100% left / 0% right for minimum score (8)', () => {
    const result = calculateDimensionPercentages(8);
    expect(result.left).toBe(100);
    expect(result.right).toBe(0);
  });

  it('returns 0% left / 100% right for maximum score (40)', () => {
    const result = calculateDimensionPercentages(40);
    expect(result.left).toBe(0);
    expect(result.right).toBe(100);
  });

  it('returns 50% / 50% for neutral score (24)', () => {
    const result = calculateDimensionPercentages(24);
    expect(result.left).toBe(50);
    expect(result.right).toBe(50);
  });

  it('percentages sum to 100', () => {
    const testScores = [8, 16, 24, 32, 40];
    testScores.forEach((score) => {
      const result = calculateDimensionPercentages(score);
      expect(result.left + result.right).toBe(100);
    });
  });

  it('correctly rounds percentages', () => {
    // Score 9: (9-8)/32*100 = 3.125 -> rounds to 3%
    const result = calculateDimensionPercentages(9);
    expect(result.right).toBe(3);
    expect(result.left).toBe(97);
  });
});

describe('generateDimensionResult', () => {
  it('generates complete result with all components', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 3;
    });
    const result = generateDimensionResult(answers, 'EI');

    expect(result).toHaveProperty('dimension');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('preference');
    expect(result).toHaveProperty('leftPercent');
    expect(result).toHaveProperty('rightPercent');
  });

  it('returns correct E preference for low EI score', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 1;
    });
    const result = generateDimensionResult(answers, 'EI');

    expect(result.dimension).toBe('EI');
    expect(result.score).toBe(8);
    expect(result.preference).toBe('E');
    expect(result.leftPercent).toBe(100);
    expect(result.rightPercent).toBe(0);
  });

  it('returns correct I preference for high EI score', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 5;
    });
    const result = generateDimensionResult(answers, 'EI');

    expect(result.dimension).toBe('EI');
    expect(result.score).toBe(40);
    expect(result.preference).toBe('I');
    expect(result.leftPercent).toBe(0);
    expect(result.rightPercent).toBe(100);
  });

  it('returns correct N preference for high SN score', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 4;
    });
    const result = generateDimensionResult(answers, 'SN');

    expect(result.dimension).toBe('SN');
    expect(result.score).toBe(32);
    expect(result.preference).toBe('N');
    expect(result.rightPercent).toBeGreaterThan(50);
  });

  it('returns correct T preference for high TF score', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.TF.forEach((id) => {
      answers[id] = 5;
    });
    const result = generateDimensionResult(answers, 'TF');

    expect(result.dimension).toBe('TF');
    expect(result.preference).toBe('T');
  });

  it('returns correct J preference for low JP score', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.JP.forEach((id) => {
      answers[id] = 2;
    });
    const result = generateDimensionResult(answers, 'JP');

    expect(result.dimension).toBe('JP');
    expect(result.preference).toBe('J');
  });
});

describe('isDimensionTestComplete', () => {
  it('returns false for empty answers', () => {
    expect(isDimensionTestComplete({}, 'EI')).toBe(false);
    expect(isDimensionTestComplete({}, 'SN')).toBe(false);
    expect(isDimensionTestComplete({}, 'TF')).toBe(false);
    expect(isDimensionTestComplete({}, 'JP')).toBe(false);
  });

  it('returns false for partial answers', () => {
    const answers: TestAnswers = {
      3: 3, // First EI question
      7: 3, // Second EI question
    };
    expect(isDimensionTestComplete(answers, 'EI')).toBe(false);
  });

  it('returns true when all 8 dimension questions are answered', () => {
    const answers: TestAnswers = {};
    dimensionQuestions.EI.forEach((id) => {
      answers[id] = 3;
    });
    expect(isDimensionTestComplete(answers, 'EI')).toBe(true);
  });

  it('ignores answers from other dimensions', () => {
    const answers: TestAnswers = {};
    // Answer all SN questions
    dimensionQuestions.SN.forEach((id) => {
      answers[id] = 3;
    });
    // EI should still be incomplete
    expect(isDimensionTestComplete(answers, 'EI')).toBe(false);
    expect(isDimensionTestComplete(answers, 'SN')).toBe(true);
  });

  it('works correctly for all dimensions', () => {
    const dimensions: Dimension[] = ['EI', 'SN', 'TF', 'JP'];

    dimensions.forEach((dim) => {
      const answers: TestAnswers = {};
      dimensionQuestions[dim].forEach((id) => {
        answers[id] = 3;
      });
      expect(isDimensionTestComplete(answers, dim)).toBe(true);

      // Other dimensions should be incomplete
      dimensions
        .filter((d) => d !== dim)
        .forEach((otherDim) => {
          expect(isDimensionTestComplete(answers, otherDim)).toBe(false);
        });
    });
  });
});
