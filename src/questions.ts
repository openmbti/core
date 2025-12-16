import type { QuestionPair, DimensionQuestions } from './types';

/**
 * OEJTS 1.2 - 32 Questions
 * Based on the Open Extended Jungian Type Scales 1.2
 * Source: https://openpsychometrics.org/tests/OEJTS/
 * Credit: Open Psychometrics (https://openpsychometrics.org/)
 *
 * Each question is a bipolar trait pair scored on a 1-5 scale
 * 1 = Strongly left trait, 5 = Strongly right trait
 */
export const questions: QuestionPair[] = [
  // JP dimension (Questions 1, 5, 9, 13, 17, 21, 25, 29)
  {
    id: 1,
    dimension: 'JP',
    leftTrait: { en: 'Makes lists', zh: '制定清单', ja: 'リストを作る', ko: '목록을 만든다', 'zh-tw': '制定清單' },
    rightTrait: { en: 'Relies on memory', zh: '依靠记忆', ja: '記憶に頼る', ko: '기억에 의존한다', 'zh-tw': '依靠記憶' },
  },
  {
    id: 5,
    dimension: 'JP',
    leftTrait: { en: 'Keeps a clean room', zh: '保持房间整洁', ja: '部屋をきれいに保つ', ko: '방을 깨끗이 유지한다', 'zh-tw': '保持房間整潔' },
    rightTrait: { en: 'Just puts stuff wherever', zh: '随手放置东西', ja: '物をどこにでも置く', ko: '물건을 아무데나 둔다', 'zh-tw': '隨手放置東西' },
  },
  {
    id: 9,
    dimension: 'JP',
    leftTrait: { en: 'Organized', zh: '有条理', ja: '整理整頓されている', ko: '체계적이다', 'zh-tw': '有條理' },
    rightTrait: { en: 'Chaotic', zh: '随性混乱', ja: '混沌としている', ko: '혼란스럽다', 'zh-tw': '隨性混亂' },
  },
  {
    id: 13,
    dimension: 'JP',
    leftTrait: { en: 'Plans far ahead', zh: '提前规划', ja: '先の計画を立てる', ko: '미리 계획한다', 'zh-tw': '提前規劃' },
    rightTrait: { en: 'Plans at the last minute', zh: '最后一刻才计划', ja: '直前に計画する', ko: '마지막에 계획한다', 'zh-tw': '最後一刻才計劃' },
  },
  {
    id: 17,
    dimension: 'JP',
    leftTrait: { en: 'Commits', zh: '做出承诺', ja: '約束を守る', ko: '약속한다', 'zh-tw': '做出承諾' },
    rightTrait: { en: 'Keeps options open', zh: '保留选择', ja: '選択肢を残す', ko: '선택지를 열어둔다', 'zh-tw': '保留選擇' },
  },
  {
    id: 21,
    dimension: 'JP',
    leftTrait: { en: 'Gets work done right away', zh: '立即完成工作', ja: 'すぐに仕事を終わらせる', ko: '일을 바로 끝낸다', 'zh-tw': '立即完成工作' },
    rightTrait: { en: 'Procrastinates', zh: '拖延', ja: '先延ばしにする', ko: '미룬다', 'zh-tw': '拖延' },
  },
  {
    id: 25,
    dimension: 'JP',
    leftTrait: { en: 'Prepares', zh: '提前准备', ja: '準備する', ko: '준비한다', 'zh-tw': '提前準備' },
    rightTrait: { en: 'Improvises', zh: '即兴发挥', ja: '即興で対応する', ko: '즉흥적으로 한다', 'zh-tw': '即興發揮' },
  },
  {
    id: 29,
    dimension: 'JP',
    leftTrait: { en: 'Works hard', zh: '努力工作', ja: '一生懸命働く', ko: '열심히 일한다', 'zh-tw': '努力工作' },
    rightTrait: { en: 'Plays hard', zh: '尽情玩乐', ja: '思い切り遊ぶ', ko: '열심히 논다', 'zh-tw': '盡情玩樂' },
  },

  // TF dimension (Questions 2, 6, 10, 14, 18, 22, 26, 30)
  {
    id: 2,
    dimension: 'TF',
    leftTrait: { en: 'Wants to believe', zh: '愿意相信', ja: '信じたい', ko: '믿고 싶어한다', 'zh-tw': '願意相信' },
    rightTrait: { en: 'Skeptical', zh: '持怀疑态度', ja: '懐疑的', ko: '회의적이다', 'zh-tw': '持懷疑態度' },
  },
  {
    id: 6,
    dimension: 'TF',
    leftTrait: { en: 'Thinks "robotic" is an insult', zh: '认为"像机器人"是侮辱', ja: '「ロボットみたい」は侮辱だと思う', ko: '"로봇 같다"는 말을 모욕으로 여긴다', 'zh-tw': '認為「像機器人」是侮辱' },
    rightTrait: { en: 'Strives to have a mechanical mind', zh: '追求机械般的思维', ja: '機械的な思考を目指す', ko: '기계적인 사고를 추구한다', 'zh-tw': '追求機械般的思維' },
  },
  {
    id: 10,
    dimension: 'TF',
    leftTrait: { en: 'Easily hurt', zh: '容易受伤', ja: '傷つきやすい', ko: '쉽게 상처받는다', 'zh-tw': '容易受傷' },
    rightTrait: { en: 'Thick-skinned', zh: '脸皮厚', ja: '図太い', ko: '둔감하다', 'zh-tw': '臉皮厚' },
  },
  {
    id: 14,
    dimension: 'TF',
    leftTrait: { en: "Wants people's love", zh: '渴望他人的爱', ja: '人々の愛を求める', ko: '사람들의 사랑을 원한다', 'zh-tw': '渴望他人的愛' },
    rightTrait: { en: "Wants people's respect", zh: '渴望他人的尊重', ja: '人々の尊敬を求める', ko: '사람들의 존경을 원한다', 'zh-tw': '渴望他人的尊重' },
  },
  {
    id: 18,
    dimension: 'TF',
    leftTrait: { en: 'Wants to be good at fixing people', zh: '想擅长帮助他人', ja: '人を助けることが得意になりたい', ko: '사람을 돕는 것을 잘하고 싶다', 'zh-tw': '想擅長幫助他人' },
    rightTrait: { en: 'Wants to be good at fixing things', zh: '想擅长修理事物', ja: '物を修理することが得意になりたい', ko: '물건을 고치는 것을 잘하고 싶다', 'zh-tw': '想擅長修理事物' },
  },
  {
    id: 22,
    dimension: 'TF',
    leftTrait: { en: 'Follows the heart', zh: '跟随内心', ja: '心に従う', ko: '마음을 따른다', 'zh-tw': '跟隨內心' },
    rightTrait: { en: 'Follows the head', zh: '跟随理性', ja: '頭に従う', ko: '이성을 따른다', 'zh-tw': '跟隨理性' },
  },
  {
    id: 26,
    dimension: 'TF',
    leftTrait: { en: 'Bases morality on compassion', zh: '道德基于同情', ja: '道徳は思いやりに基づく', ko: '도덕은 동정심에 기반한다', 'zh-tw': '道德基於同情' },
    rightTrait: { en: 'Bases morality on justice', zh: '道德基于正义', ja: '道徳は正義に基づく', ko: '도덕은 정의에 기반한다', 'zh-tw': '道德基於正義' },
  },
  {
    id: 30,
    dimension: 'TF',
    leftTrait: { en: 'Values emotions', zh: '重视情感', ja: '感情を大切にする', ko: '감정을 중시한다', 'zh-tw': '重視情感' },
    rightTrait: { en: 'Uncomfortable with emotions', zh: '对情感感到不自在', ja: '感情に居心地の悪さを感じる', ko: '감정이 불편하다', 'zh-tw': '對情感感到不自在' },
  },

  // EI dimension (Questions 3, 7, 11, 15, 19, 23, 27, 31)
  {
    id: 3,
    dimension: 'EI',
    leftTrait: { en: 'Bored by time alone', zh: '独处时感到无聊', ja: '一人の時間は退屈', ko: '혼자 있으면 지루하다', 'zh-tw': '獨處時感到無聊' },
    rightTrait: { en: 'Needs time alone', zh: '需要独处时间', ja: '一人の時間が必要', ko: '혼자만의 시간이 필요하다', 'zh-tw': '需要獨處時間' },
  },
  {
    id: 7,
    dimension: 'EI',
    leftTrait: { en: 'Energetic', zh: '精力充沛', ja: 'エネルギッシュ', ko: '활기차다', 'zh-tw': '精力充沛' },
    rightTrait: { en: 'Mellow', zh: '平静温和', ja: '穏やか', ko: '차분하다', 'zh-tw': '平靜溫和' },
  },
  {
    id: 11,
    dimension: 'EI',
    leftTrait: { en: 'Works best in groups', zh: '在团队中表现最佳', ja: 'グループで働くのが得意', ko: '팀에서 일할 때 최고다', 'zh-tw': '在團隊中表現最佳' },
    rightTrait: { en: 'Works best alone', zh: '独自工作表现最佳', ja: '一人で働くのが得意', ko: '혼자 일할 때 최고다', 'zh-tw': '獨自工作表現最佳' },
  },
  {
    id: 15,
    dimension: 'EI',
    leftTrait: { en: 'Gets fired up by parties', zh: '因聚会而兴奋', ja: 'パーティーで盛り上がる', ko: '파티에서 흥분한다', 'zh-tw': '因聚會而興奮' },
    rightTrait: { en: 'Gets worn out by parties', zh: '因聚会而疲惫', ja: 'パーティーで疲れる', ko: '파티에서 지친다', 'zh-tw': '因聚會而疲憊' },
  },
  {
    id: 19,
    dimension: 'EI',
    leftTrait: { en: 'Talks more', zh: '话比较多', ja: 'よく話す', ko: '말을 많이 한다', 'zh-tw': '話比較多' },
    rightTrait: { en: 'Listens more', zh: '更善于倾听', ja: 'よく聞く', ko: '듣는 편이다', 'zh-tw': '更善於傾聽' },
  },
  {
    id: 23,
    dimension: 'EI',
    leftTrait: { en: 'Goes out on the town', zh: '喜欢外出活动', ja: '外出を楽しむ', ko: '외출을 즐긴다', 'zh-tw': '喜歡外出活動' },
    rightTrait: { en: 'Stays at home', zh: '喜欢待在家里', ja: '家にいるのが好き', ko: '집에 있는 것을 좋아한다', 'zh-tw': '喜歡待在家裡' },
  },
  {
    id: 27,
    dimension: 'EI',
    leftTrait: { en: 'Yelling comes naturally', zh: '自然而然大声说话', ja: '大声で話すのが自然', ko: '큰 소리가 자연스럽다', 'zh-tw': '自然而然大聲說話' },
    rightTrait: { en: 'Finds it difficult to yell loudly', zh: '很难大声喊叫', ja: '大声を出すのが苦手', ko: '큰 소리를 내기 어렵다', 'zh-tw': '很難大聲喊叫' },
  },
  {
    id: 31,
    dimension: 'EI',
    leftTrait: { en: 'Likes to perform', zh: '喜欢表演', ja: 'パフォーマンスが好き', ko: '공연하는 것을 좋아한다', 'zh-tw': '喜歡表演' },
    rightTrait: { en: 'Avoids public speaking', zh: '避免公开演讲', ja: '人前で話すのを避ける', ko: '대중 앞에서 말하기를 피한다', 'zh-tw': '避免公開演講' },
  },

  // SN dimension (Questions 4, 8, 12, 16, 20, 24, 28, 32)
  {
    id: 4,
    dimension: 'SN',
    leftTrait: { en: 'Accepts things as they are', zh: '接受事物的本来面目', ja: 'あるがままを受け入れる', ko: '있는 그대로 받아들인다', 'zh-tw': '接受事物的本來面目' },
    rightTrait: { en: 'Unsatisfied with the way things are', zh: '对现状不满足', ja: '現状に満足しない', ko: '현 상황에 만족하지 않는다', 'zh-tw': '對現狀不滿足' },
  },
  {
    id: 8,
    dimension: 'SN',
    leftTrait: { en: 'Prefers multiple choice test', zh: '喜欢选择题', ja: '選択問題を好む', ko: '객관식을 선호한다', 'zh-tw': '喜歡選擇題' },
    rightTrait: { en: 'Prefers essay answers', zh: '喜欢论述题', ja: '論述問題を好む', ko: '서술형을 선호한다', 'zh-tw': '喜歡論述題' },
  },
  {
    id: 12,
    dimension: 'SN',
    leftTrait: { en: 'Focused on the past', zh: '关注过去', ja: '過去に焦点を当てる', ko: '과거에 집중한다', 'zh-tw': '關注過去' },
    rightTrait: { en: 'Focused on the future', zh: '关注未来', ja: '未来に焦点を当てる', ko: '미래에 집중한다', 'zh-tw': '關注未來' },
  },
  {
    id: 16,
    dimension: 'SN',
    leftTrait: { en: 'Fits in', zh: '融入群体', ja: '周りに溶け込む', ko: '어울린다', 'zh-tw': '融入群體' },
    rightTrait: { en: 'Stands out', zh: '与众不同', ja: '目立つ', ko: '눈에 띈다', 'zh-tw': '與眾不同' },
  },
  {
    id: 20,
    dimension: 'SN',
    leftTrait: { en: 'Describes what happened', zh: '描述发生了什么', ja: '何が起きたかを説明する', ko: '무슨 일이 있었는지 설명한다', 'zh-tw': '描述發生了什麼' },
    rightTrait: { en: 'Describes what it meant', zh: '描述这意味着什么', ja: 'それが何を意味するかを説明する', ko: '그것이 무엇을 의미하는지 설명한다', 'zh-tw': '描述這意味著什麼' },
  },
  {
    id: 24,
    dimension: 'SN',
    leftTrait: { en: 'Wants the details', zh: '想要细节', ja: '詳細を求める', ko: '세부사항을 원한다', 'zh-tw': '想要細節' },
    rightTrait: { en: 'Wants the big picture', zh: '想要大局观', ja: '全体像を求める', ko: '큰 그림을 원한다', 'zh-tw': '想要大局觀' },
  },
  {
    id: 28,
    dimension: 'SN',
    leftTrait: { en: 'Empirical', zh: '经验主义', ja: '経験主義的', ko: '경험주의적이다', 'zh-tw': '經驗主義' },
    rightTrait: { en: 'Theoretical', zh: '理论主义', ja: '理論的', ko: '이론적이다', 'zh-tw': '理論主義' },
  },
  {
    id: 32,
    dimension: 'SN',
    leftTrait: { en: 'Likes to know "who/what/when"', zh: '想知道"谁/什么/何时"', ja: '「誰が/何を/いつ」を知りたい', ko: '"누가/무엇을/언제"를 알고 싶다', 'zh-tw': '想知道「誰/什麼/何時」' },
    rightTrait: { en: 'Likes to know "why"', zh: '想知道"为什么"', ja: '「なぜ」を知りたい', ko: '"왜"를 알고 싶다', 'zh-tw': '想知道「為什麼」' },
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
