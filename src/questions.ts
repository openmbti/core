import type { QuestionPair, DimensionQuestions } from './types';

/**
 * OEJTS 1.2 - 32 Questions
 * Each question is a bipolar trait pair scored on a 1-5 scale
 * 1 = Strongly left trait, 5 = Strongly right trait
 */
export const questions: QuestionPair[] = [
  // JP dimension (Questions 1, 5, 9, 13, 17, 21, 25, 29)
  {
    id: 1,
    dimension: 'JP',
    leftTrait: { en: 'Makes lists', zh: '制定清单' },
    rightTrait: { en: 'Relies on memory', zh: '依靠记忆' },
  },
  {
    id: 5,
    dimension: 'JP',
    leftTrait: { en: 'Keeps a clean room', zh: '保持房间整洁' },
    rightTrait: { en: 'Just puts stuff wherever', zh: '随手放置东西' },
  },
  {
    id: 9,
    dimension: 'JP',
    leftTrait: { en: 'Organized', zh: '有条理' },
    rightTrait: { en: 'Chaotic', zh: '随性混乱' },
  },
  {
    id: 13,
    dimension: 'JP',
    leftTrait: { en: 'Plans far ahead', zh: '提前规划' },
    rightTrait: { en: 'Plans at the last minute', zh: '最后一刻才计划' },
  },
  {
    id: 17,
    dimension: 'JP',
    leftTrait: { en: 'Commits', zh: '做出承诺' },
    rightTrait: { en: 'Keeps options open', zh: '保留选择' },
  },
  {
    id: 21,
    dimension: 'JP',
    leftTrait: { en: 'Gets work done right away', zh: '立即完成工作' },
    rightTrait: { en: 'Procrastinates', zh: '拖延' },
  },
  {
    id: 25,
    dimension: 'JP',
    leftTrait: { en: 'Prepares', zh: '提前准备' },
    rightTrait: { en: 'Improvises', zh: '即兴发挥' },
  },
  {
    id: 29,
    dimension: 'JP',
    leftTrait: { en: 'Works hard', zh: '努力工作' },
    rightTrait: { en: 'Plays hard', zh: '尽情玩乐' },
  },

  // TF dimension (Questions 2, 6, 10, 14, 18, 22, 26, 30)
  {
    id: 2,
    dimension: 'TF',
    leftTrait: { en: 'Skeptical', zh: '持怀疑态度' },
    rightTrait: { en: 'Wants to believe', zh: '愿意相信' },
  },
  {
    id: 6,
    dimension: 'TF',
    leftTrait: { en: 'Thinks "robotic" is an insult', zh: '认为"像机器人"是侮辱' },
    rightTrait: { en: 'Strives to have a mechanical mind', zh: '追求机械般的思维' },
  },
  {
    id: 10,
    dimension: 'TF',
    leftTrait: { en: 'Easily hurt', zh: '容易受伤' },
    rightTrait: { en: 'Thick-skinned', zh: '脸皮厚' },
  },
  {
    id: 14,
    dimension: 'TF',
    leftTrait: { en: "Wants people's love", zh: '渴望他人的爱' },
    rightTrait: { en: "Wants people's respect", zh: '渴望他人的尊重' },
  },
  {
    id: 18,
    dimension: 'TF',
    leftTrait: { en: 'Wants to be good at fixing people', zh: '想擅长帮助他人' },
    rightTrait: { en: 'Wants to be good at fixing things', zh: '想擅长修理事物' },
  },
  {
    id: 22,
    dimension: 'TF',
    leftTrait: { en: 'Follows the heart', zh: '跟随内心' },
    rightTrait: { en: 'Follows the head', zh: '跟随理性' },
  },
  {
    id: 26,
    dimension: 'TF',
    leftTrait: { en: 'Bases morality on compassion', zh: '道德基于同情' },
    rightTrait: { en: 'Bases morality on justice', zh: '道德基于正义' },
  },
  {
    id: 30,
    dimension: 'TF',
    leftTrait: { en: 'Values emotions', zh: '重视情感' },
    rightTrait: { en: 'Uncomfortable with emotions', zh: '对情感感到不自在' },
  },

  // EI dimension (Questions 3, 7, 11, 15, 19, 23, 27, 31)
  {
    id: 3,
    dimension: 'EI',
    leftTrait: { en: 'Bored by time alone', zh: '独处时感到无聊' },
    rightTrait: { en: 'Needs time alone', zh: '需要独处时间' },
  },
  {
    id: 7,
    dimension: 'EI',
    leftTrait: { en: 'Energetic', zh: '精力充沛' },
    rightTrait: { en: 'Mellow', zh: '平静温和' },
  },
  {
    id: 11,
    dimension: 'EI',
    leftTrait: { en: 'Works best in groups', zh: '在团队中表现最佳' },
    rightTrait: { en: 'Works best alone', zh: '独自工作表现最佳' },
  },
  {
    id: 15,
    dimension: 'EI',
    leftTrait: { en: 'Gets fired up by parties', zh: '因聚会而兴奋' },
    rightTrait: { en: 'Gets worn out by parties', zh: '因聚会而疲惫' },
  },
  {
    id: 19,
    dimension: 'EI',
    leftTrait: { en: 'Talks more', zh: '话比较多' },
    rightTrait: { en: 'Listens more', zh: '更善于倾听' },
  },
  {
    id: 23,
    dimension: 'EI',
    leftTrait: { en: 'Goes out on the town', zh: '喜欢外出活动' },
    rightTrait: { en: 'Stays at home', zh: '喜欢待在家里' },
  },
  {
    id: 27,
    dimension: 'EI',
    leftTrait: { en: 'Yelling comes naturally', zh: '自然而然大声说话' },
    rightTrait: { en: 'Finds it difficult to yell loudly', zh: '很难大声喊叫' },
  },
  {
    id: 31,
    dimension: 'EI',
    leftTrait: { en: 'Likes to perform', zh: '喜欢表演' },
    rightTrait: { en: 'Avoids public speaking', zh: '避免公开演讲' },
  },

  // SN dimension (Questions 4, 8, 12, 16, 20, 24, 28, 32)
  {
    id: 4,
    dimension: 'SN',
    leftTrait: { en: 'Accepts things as they are', zh: '接受事物的本来面目' },
    rightTrait: { en: 'Unsatisfied with the way things are', zh: '对现状不满足' },
  },
  {
    id: 8,
    dimension: 'SN',
    leftTrait: { en: 'Prefers multiple choice test', zh: '喜欢选择题' },
    rightTrait: { en: 'Prefers essay answers', zh: '喜欢论述题' },
  },
  {
    id: 12,
    dimension: 'SN',
    leftTrait: { en: 'Focused on the past', zh: '关注过去' },
    rightTrait: { en: 'Focused on the future', zh: '关注未来' },
  },
  {
    id: 16,
    dimension: 'SN',
    leftTrait: { en: 'Fits in', zh: '融入群体' },
    rightTrait: { en: 'Stands out', zh: '与众不同' },
  },
  {
    id: 20,
    dimension: 'SN',
    leftTrait: { en: 'Describes what happened', zh: '描述发生了什么' },
    rightTrait: { en: 'Describes what it meant', zh: '描述这意味着什么' },
  },
  {
    id: 24,
    dimension: 'SN',
    leftTrait: { en: 'Wants the details', zh: '想要细节' },
    rightTrait: { en: 'Wants the big picture', zh: '想要大局观' },
  },
  {
    id: 28,
    dimension: 'SN',
    leftTrait: { en: 'Empirical', zh: '经验主义' },
    rightTrait: { en: 'Theoretical', zh: '理论主义' },
  },
  {
    id: 32,
    dimension: 'SN',
    leftTrait: { en: 'Likes to know "who/what/when"', zh: '想知道"谁/什么/何时"' },
    rightTrait: { en: 'Likes to know "why"', zh: '想知道"为什么"' },
  },
];

// Question IDs grouped by dimension for scoring
export const dimensionQuestions: DimensionQuestions = {
  EI: [3, 7, 11, 15, 19, 23, 27, 31],
  SN: [4, 8, 12, 16, 20, 24, 28, 32],
  TF: [2, 6, 10, 14, 18, 22, 26, 30],
  JP: [1, 5, 9, 13, 17, 21, 25, 29],
} as const;

// Get questions sorted by ID for test presentation
export const sortedQuestions = [...questions].sort((a, b) => a.id - b.id);

// Total number of questions
export const TOTAL_QUESTIONS = 32;

// Questions per dimension
export const QUESTIONS_PER_DIMENSION = 8;
