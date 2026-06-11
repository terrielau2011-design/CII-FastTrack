// CII FastTrack — Subject Data (v2)
// Source: CII 2026 Qualifications Brochure + CII Results Information page
// Covers BOTH Insurance and Financial Planning pathways

// ===== Career Pathways =====
const CAREER_PATHWAYS = [
  {
    id: 'insurance',
    label: '🛡️ Insurance 保險',
    description: 'General Insurance, Claims, Underwriting, Broking, Risk Management',
    qualification: 'Advanced Diploma in Insurance (ACII)',
    targetCredits: 290,
    charteredTitles: ['Chartered Insurer', 'Chartered Insurance Broker', 'Chartered Insurance Practitioner', 'Chartered Insurance Risk Manager', 'Chartered Insurance Underwriting Agent'],
    memberDesignation: 'ACII'
  },
  {
    id: 'financial-planning',
    label: '💰 Financial Planning 財務規劃',
    description: 'Investment, Pensions, Tax Planning, Mortgage, Retirement',
    qualification: 'Advanced Diploma in Financial Planning (APFS)',
    targetCredits: 290,
    charteredTitles: ['Chartered Financial Planner'],
    memberDesignation: 'APFS'
  }
];

// ===== Insurance Sub-Directions =====
const INSURANCE_DIRECTIONS = [
  { id: 'claims', label: '📋 Claims 理賠', recommendedUnits: ['820', '996'], description: '適合理賠方向的從業員' },
  { id: 'broking', label: '🤝 Broking 經紀', recommendedUnits: ['930'], description: '適合保險經紀方向的從業員' },
  { id: 'underwriting', label: '✍️ Underwriting 核保', recommendedUnits: ['960', '995'], description: '適合核保方向的從業員' },
  { id: 'risk', label: '⚖️ Risk Management 風險管理', recommendedUnits: ['992', '993', '997'], description: '適合風險管理方向的從業員' },
  { id: 'general', label: '🌐 General 通用', recommendedUnits: [], description: '尚未確定方向，系統推薦最優路徑' }
];

// ===== Insurance Subjects =====
const INSURANCE_SUBJECTS = [
  { code: 'M05', nameEN: 'Insurance Law', nameZH: '保險法', category: 'core-mandatory', categoryLabel: '📕 Core 必修', credits: 25, level: 4, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed 混合', mcqPassMark: 65, cwPassMark: 60, mcqQuestions: '50 MCQ (40 standard + 10 MR)', mcqTime: '60 mins', cwCount: 1, studyHours: 120, recommendedWeeks: 8, notes: '必修。Coursework 須前6個月提交 + MCQ 18個月內完成', withdrawing: false },
  { code: 'M92', nameEN: 'Insurance Business and Finance', nameZH: '保險商業與財務', category: 'core-option', categoryLabel: '📗 Core Option 核心選項', credits: 25, level: 4, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed 混合', mcqPassMark: 65, cwPassMark: 60, mcqQuestions: '25 MCQ + 5 case studies', mcqTime: '90 mins', cwCount: 1, studyHours: 100, recommendedWeeks: 7, notes: '與530二選一', withdrawing: false },
  { code: '530', nameEN: 'Economics and Business', nameZH: '經濟學與商業', category: 'core-option', categoryLabel: '📗 Core Option 核心選項', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '與M92二選一', withdrawing: false },
  { code: '820', nameEN: 'Advanced Claims', nameZH: '高級理賠', category: 'core-option', categoryLabel: '📗 Core Option 核心選項', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '與930/960三選一。適合 Claims 方向', withdrawing: false },
  { code: '930', nameEN: 'Advanced Insurance Broking', nameZH: '高級保險經紀', category: 'core-option', categoryLabel: '📗 Core Option 核心選項', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '與820/960三選一。適合 Broking 方向', withdrawing: false },
  { code: '960', nameEN: 'Advanced Underwriting', nameZH: '高級核保', category: 'core-option', categoryLabel: '📗 Core Option 核心選項', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '與820/930三選一。適合 Underwriting 方向', withdrawing: false },
  { code: '945', nameEN: 'Marketing Insurance Products and Services', nameZH: '保險產品與服務營銷', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '', withdrawing: false },
  { code: '990', nameEN: 'Insurance Corporate Management', nameZH: '保險企業管理', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '', withdrawing: false },
  { code: '991', nameEN: 'London Market Insurance Specialisation', nameZH: '倫敦市場保險專業', category: 'elective', categoryLabel: '📘 Elective ⚠️', credits: 50, level: 7, assessmentMode: 'dissertation', assessmentLabel: '📄 Dissertation', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 1, studyHours: 180, recommendedWeeks: 12, notes: '⚠️ 2025/12/31 停止新報名', withdrawing: true },
  { code: '992', nameEN: 'Risk Management in Insurance', nameZH: '保險風險管理', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '適合 Risk Management 方向', withdrawing: false },
  { code: '993', nameEN: 'Advances in Strategic Risk Management', nameZH: '策略風險管理進階', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 50, level: 7, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 180, recommendedWeeks: 12, notes: '高學分效率 50cr/科。適合 Risk 方向', withdrawing: false },
  { code: '994', nameEN: 'Insurance Market Specialisation', nameZH: '保險市場專業', category: 'elective', categoryLabel: '📘 Elective ⚠️', credits: 50, level: 7, assessmentMode: 'dissertation', assessmentLabel: '📄 Dissertation', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 1, studyHours: 180, recommendedWeeks: 12, notes: '⚠️ 2025/12/31 停止新報名', withdrawing: true },
  { code: '995', nameEN: 'Strategic Underwriting', nameZH: '策略核保', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '適合 Underwriting 方向', withdrawing: false },
  { code: '996', nameEN: 'Strategic Claims Management', nameZH: '策略理賠管理', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '適合 Claims 方向', withdrawing: false },
  { code: '997', nameEN: 'Advanced Risk Financing and Transfer', nameZH: '高級風險融資與轉移', category: 'elective', categoryLabel: '📘 Elective 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '適合 Risk Management 方向', withdrawing: false }
];

// ===== Financial Planning Subjects =====
const FP_SUBJECTS = [
  { code: 'AF5', nameEN: 'Financial Planning Process', nameZH: '財務規劃流程', category: 'core-mandatory', categoryLabel: '📕 Core 必修', credits: 30, level: 6, assessmentMode: 'written', assessmentLabel: '📝 Written Exam 書面考試', mcqPassMark: null, cwPassMark: null, writtenPassMark: 55, mcqQuestions: '—', mcqTime: '—', cwCount: 0, studyHours: 150, recommendedWeeks: 10, notes: '必修。基於 fact-find 的書面考試', withdrawing: false },
  { code: 'AF1', nameEN: 'Personal Tax and Trust Planning', nameZH: '個人稅務與信託規劃', category: 'elective', categoryLabel: '📘 Option 選修', credits: 30, level: 6, assessmentMode: 'written', assessmentLabel: '📝 Written Exam 書面考試', mcqPassMark: null, cwPassMark: null, writtenPassMark: 55, mcqQuestions: '—', mcqTime: '—', cwCount: 0, studyHours: 150, recommendedWeeks: 10, notes: '通過率 ~43%', withdrawing: false },
  { code: 'AF4', nameEN: 'Investment Planning', nameZH: '投資規劃', category: 'elective', categoryLabel: '📘 Option 選修', credits: 30, level: 6, assessmentMode: 'written', assessmentLabel: '📝 Written Exam 書面考試', mcqPassMark: null, cwPassMark: null, writtenPassMark: 55, mcqQuestions: '—', mcqTime: '—', cwCount: 0, studyHours: 150, recommendedWeeks: 10, notes: '通過率 ~55%', withdrawing: false },
  { code: 'AF6', nameEN: 'Senior Management and Supervision', nameZH: '高級管理與監督', category: 'elective', categoryLabel: '📘 Option 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, writtenPassMark: null, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '通過率 ~97%', withdrawing: false },
  { code: 'AF7', nameEN: 'Pension Transfers', nameZH: '養老金轉移', category: 'elective', categoryLabel: '📘 Option 選修', credits: 20, level: 6, assessmentMode: 'written', assessmentLabel: '📝 Written Exam 書面考試', mcqPassMark: null, cwPassMark: null, writtenPassMark: 60, mcqQuestions: '—', mcqTime: '—', cwCount: 0, studyHours: 100, recommendedWeeks: 7, notes: '及格線 60%。通過率 ~61%', withdrawing: false },
  { code: 'AF8', nameEN: 'Retirement Income Planning', nameZH: '退休收入規劃', category: 'elective', categoryLabel: '📘 Option 選修', credits: 30, level: 6, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', mcqPassMark: null, cwPassMark: 50, writtenPassMark: null, mcqQuestions: '—', mcqTime: '—', cwCount: 3, studyHours: 150, recommendedWeeks: 10, notes: '通過率 ~83%', withdrawing: false }
];

// ===== FP Core Rules =====
const FP_CORE_RULES = {
  af5: { required: true, codes: ['AF5'], label: 'AF5 Financial Planning Process（必修）' }
};

// ===== RPL (Recognition of Prior Learning) =====
const RPL_QUALIFICATIONS = [
  { id: 'degree-law', label: '⚖️ Law Degree 法律學位', field: 'law', estimatedCredits: '25-55', notes: '可豁免 M05 (25cr) 或部分 Diploma 單元。需向 CII 逐案確認。' },
  { id: 'degree-business', label: '📊 Business Degree 商業學位', field: 'business', estimatedCredits: '15-40', notes: '可豁免 M92 或 IF1 等單元。視課程內容而定。' },
  { id: 'degree-accounting', label: '🔢 Accounting/Finance Degree 會計/金融學位', field: 'accounting', estimatedCredits: '15-40', notes: '可豁免 M92 或 530 的部分內容。視課程內容而定。' },
  { id: 'degree-maths', label: '📐 Mathematics Degree 數學學位', field: 'maths', estimatedCredits: '10-30', notes: '可豁免部分基礎單元。視課程內容而定。' },
  { id: 'acca', label: '🏦 ACCA', field: 'accounting', estimatedCredits: '25-55', notes: '特許公認會計師。可豁免 M05, M92 等。需逐案確認。' },
  { id: 'cfa', label: '📈 CFA', field: 'finance', estimatedCredits: '20-50', notes: '特許金融分析師。對 Financial Planning 路線尤其有幫助。' },
  { id: 'cpa', label: '💼 CPA / CPA Australia', field: 'accounting', estimatedCredits: '15-40', notes: '註冊會計師。可豁免部分商業/財務相關單元。' },
  { id: 'actuarial', label: '🎲 Actuarial Qualifications 精算資格', field: 'actuarial', estimatedCredits: '30-80', notes: 'FIA/FOA 等。高學分豁免可能。需逐案確認。' },
  { id: 'cima', label: '📊 CIMA', field: 'management', estimatedCredits: '15-40', notes: '特許管理會計師。可豁免商業/管理相關單元。' },
  { id: 'other-prof', label: '📋 Other Professional Qualification 其他專業資格', field: 'other', estimatedCredits: '0-40', notes: '其他受監管的專業資格。需向 CII 申請評估。' }
];

const RPL_MAX_CAPS = {
  certificate: { maxRPLCredits: 30, label: 'Certificate (40 credits total)' },
  diploma: { maxRPLCredits: 60, label: 'Diploma (120 credits total)' },
  advancedDiploma: { maxRPLCredits: 80, label: 'Advanced Diploma (290 credits total)' }
};

// ===== Insurance Core Rules =====
const INSURANCE_CORE_RULES = {
  m05: { required: true, codes: ['M05'], label: 'M05 Insurance Law（必修）' },
  m92or530: { required: true, codes: ['M92', '530'], choose: 1, label: 'M92 或 530（二選一）' },
  '820or930or960': { required: true, codes: ['820', '930', '960'], choose: 1, label: '820 / 930 / 960（三選一）' }
};

const TARGET_CREDITS = 290;
