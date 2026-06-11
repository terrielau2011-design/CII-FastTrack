// CII FastTrack — Subject Data (v3)
// Source: CII 2026 Qualifications Brochure + CII Results Information page
// Covers ALL levels: Award → Certificate → Diploma → Advanced Diploma → Fellowship
// Covers BOTH Insurance and Financial Planning pathways

// ===== Qualification Levels =====
const QUALIFICATION_LEVELS = [
  { id: 'award', label: '🏅 Award', creditsRequired: 15, designation: 'CII (Award)', description: '入門級 — 基礎知識，適合新入職或支援角色' },
  { id: 'certificate', label: '📜 Certificate', creditsRequired: 40, designation: 'Cert CII / CertPFS', description: '初級 — 保險/理財規劃核心知識，可執業' },
  { id: 'diploma', label: '🎓 Diploma', creditsRequired: 120, designation: 'Dip CII / DipPFS', description: '中級 — 技術與管理知識，專業認可' },
  { id: 'advanced-diploma', label: '🎯 Advanced Diploma', creditsRequired: 290, designation: 'ACII / APFS', description: '高級 — 深度專業知識，可申請 Chartered' },
  { id: 'fellowship', label: '👑 Fellowship', creditsRequired: 350, designation: 'FCII / FPFS', description: '最高級 — 行業領袖級別' }
];

// ===== Career Pathways =====
const CAREER_PATHWAYS = [
  {
    id: 'insurance',
    label: '🛡️ Insurance 保險',
    description: 'General Insurance, Claims, Underwriting, Broking, Risk Management, London Market',
    pathwayLabel: 'Insurance',
    charteredTitles: ['Chartered Insurer', 'Chartered Insurance Broker', 'Chartered Insurance Practitioner', 'Chartered Insurance Risk Manager', 'Chartered Insurance Underwriting Agent']
  },
  {
    id: 'financial-planning',
    label: '💰 Financial Planning 財務規劃',
    description: 'Investment, Pensions, Tax Planning, Mortgage, Retirement, Paraplanning',
    pathwayLabel: 'Personal Finance',
    charteredTitles: ['Chartered Financial Planner']
  }
];

// ===== Award & Certificate Level Subjects (Insurance) =====
const INSURANCE_AWARD_CERT_SUBJECTS = [
  // Award Level (RQF Level 2-3)
  { code: 'FIT', nameEN: 'Foundation Insurance Test', nameZH: '基礎保險測試', level: 2, credits: 6, studyHours: 40, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'award' },
  { code: 'IF1', nameEN: 'Insurance, Legal and Regulatory', nameZH: '保險法律與監管', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF2', nameEN: 'General Insurance Business', nameZH: '一般保險業務', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF3', nameEN: 'Insurance Underwriting Process', nameZH: '保險核保流程', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF4', nameEN: 'Insurance Claims Handling Process', nameZH: '保險理賠處理流程', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF5', nameEN: 'Motor Insurance Products', nameZH: '汽車保險產品', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF6', nameEN: 'Household Insurance Products', nameZH: '家居保險產品', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF7', nameEN: 'Healthcare Insurance Products', nameZH: '醫療保險產品', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF8', nameEN: 'Packaged Commercial Insurances', nameZH: '商業綜合保險', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'IF9', nameEN: 'Customer Service in Insurance', nameZH: '保險客戶服務', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'I10', nameEN: 'Insurance Broking Fundamentals', nameZH: '保險經紀基礎', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'I11', nameEN: 'Introduction to Risk Management', nameZH: '風險管理入門', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'LM1', nameEN: 'London Market Insurance Essentials', nameZH: '倫敦市場保險基礎', level: 3, credits: 10, studyHours: 40, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'LM2', nameEN: 'London Market Insurance Principles and Practices', nameZH: '倫敦市場保險原理與實務', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'LM3', nameEN: 'London Market Underwriting Principles', nameZH: '倫敦市場核保原理', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  { code: 'W01', nameEN: 'Award in General Insurance (non-UK)', nameZH: '一般保險獎項（非英國）', level: 3, credits: 15, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'award', international: true },
  { code: 'WH1', nameEN: 'Award in General Insurance (Hong Kong)', nameZH: '一般保險獎項（香港）', level: 3, credits: 15, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'award', international: true },
  { code: 'W04', nameEN: 'Award in Customer Service in Insurance (non-UK)', nameZH: '保險客戶服務獎項（非英國）', level: 3, credits: 15, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'award', international: true },
  { code: 'GR1', nameEN: 'Group Risk', nameZH: '團體風險', level: 3, credits: 10, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'insurance', levelGroup: 'certificate' },
  // Diploma Level (RQF Level 4) — non-core units
  { code: 'M80', nameEN: 'Underwriting Practice', nameZH: '核保實務', level: 4, credits: 20, studyHours: 80, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M81', nameEN: 'Insurance Broking Practice', nameZH: '保險經紀實務', level: 4, credits: 20, studyHours: 80, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M85', nameEN: 'Claims Practice', nameZH: '理賠實務', level: 4, credits: 20, studyHours: 80, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M86', nameEN: 'Personal Insurances', nameZH: '個人保險', level: 4, credits: 20, studyHours: 80, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M90', nameEN: 'Cargo and Goods in Transit Insurances', nameZH: '貨運保險', level: 4, credits: 25, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M91', nameEN: 'Aviation and Space Insurance', nameZH: '航空與太空保險', level: 4, credits: 30, studyHours: 120, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M93', nameEN: 'Commercial Property and Business Interruption Insurances', nameZH: '商業財產與營業中斷保險', level: 4, credits: 25, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M94', nameEN: 'Motor Insurance', nameZH: '汽車保險', level: 4, credits: 25, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M96', nameEN: 'Liability Insurances', nameZH: '責任保險', level: 4, credits: 25, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M97', nameEN: 'Reinsurance', nameZH: '再保險', level: 4, credits: 30, studyHours: 120, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M98', nameEN: 'Marine Hull and Associated Liabilities', nameZH: '船舶與相關責任保險', level: 4, credits: 30, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M66', nameEN: 'Delegated Authority', nameZH: '授權承保', level: 4, credits: 25, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
  { code: 'M67', nameEN: 'Fundamentals of Risk Management', nameZH: '風險管理基礎', level: 4, credits: 25, studyHours: 100, assessmentMode: 'mixed', assessmentLabel: '🔄 Mixed', mcqPassMark: 65, cwPassMark: 60, pathway: 'insurance', levelGroup: 'diploma' },
];

// ===== Award & Certificate & Diploma Level Subjects (Financial Planning) =====
const FP_AWARD_CERT_DIP_SUBJECTS = [
  // Level 3 (Certificate/Award)
  { code: 'CF1', nameEN: 'UK Financial Services, Regulation and Ethics', nameZH: '英國金融服務監管與道德', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'certificate' },
  { code: 'CF6', nameEN: 'Mortgage Advice', nameZH: '按揭建議', level: 3, credits: 20, studyHours: 100, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'certificate' },
  { code: 'CF8', nameEN: 'Long Term Care Insurance', nameZH: '長期護理保險', level: 3, credits: 15, studyHours: 70, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'certificate' },
  { code: 'ER1', nameEN: 'Equity Release', nameZH: '資產释放', level: 3, credits: 15, studyHours: 70, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'certificate' },
  { code: 'R05', nameEN: 'Financial Protection', nameZH: '財務保障', level: 3, credits: 10, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'certificate' },
  { code: 'GR1_FP', nameEN: 'Group Risk', nameZH: '團體風險', level: 3, credits: 10, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'certificate' },
  // Level 4 (Diploma)
  { code: 'R01', nameEN: 'Financial Services, Regulation and Ethics', nameZH: '金融服務監管與道德', level: 4, credits: 20, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'R02', nameEN: 'Investment Principles and Risk', nameZH: '投資原理與風險', level: 4, credits: 20, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'R03', nameEN: 'Personal Taxation', nameZH: '個人稅務', level: 4, credits: 10, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'R04', nameEN: 'Pensions and Retirement Planning', nameZH: '退休規劃', level: 4, credits: 10, studyHours: 50, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'R06', nameEN: 'Financial Planning Practice', nameZH: '財務規劃實務', level: 4, credits: 30, studyHours: 100, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'R07', nameEN: 'Advanced Mortgage Advice', nameZH: '進階按揭建議', level: 4, credits: 15, studyHours: 70, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'J02', nameEN: 'Trusts', nameZH: '信託', level: 4, credits: 20, studyHours: 100, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'J05', nameEN: 'Pension Income Options', nameZH: '退休收入選擇', level: 4, credits: 20, studyHours: 100, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'J07', nameEN: 'Supervision in a Regulated Environment', nameZH: '監管環境下的監督', level: 4, credits: 20, studyHours: 100, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'J09', nameEN: 'Paraplanning', nameZH: '理財助理規劃', level: 4, credits: 30, studyHours: 100, assessmentMode: 'coursework', assessmentLabel: '📝 Coursework', cwPassMark: 60, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'J10', nameEN: 'Discretionary Investment Management', nameZH: '委託投資管理', level: 4, credits: 20, studyHours: 80, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  { code: 'J12', nameEN: 'Securities Advice and Dealing', nameZH: '證券建議與交易', level: 4, credits: 20, studyHours: 70, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 65, pathway: 'financial-planning', levelGroup: 'diploma' },
  // International/HK
  { code: 'HFE', nameEN: 'Award in Financial Planning (Hong Kong)', nameZH: '財務規劃獎項（香港）', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'award', international: true },
  { code: 'AWF', nameEN: 'Award in Financial Planning (non-UK)', nameZH: '財務規劃獎項（非英國）', level: 3, credits: 15, studyHours: 60, assessmentMode: 'mcq', assessmentLabel: '📝 MCQ', mcqPassMark: 70, pathway: 'financial-planning', levelGroup: 'award', international: true },
];
// ===== Insurance Sub-Directions =====
const INSURANCE_DIRECTIONS = [
  { id: 'claims', label: '📋 Claims 理賠', recommendedUnits: ['820', '996'], description: '適合理賠方向的從業員' },
  { id: 'broking', label: '🤝 Broking 經紀', recommendedUnits: ['930'], description: '適合保險經紀方向的從業員' },
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
