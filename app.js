// CII FastTrack — App Logic

(function() {
  'use strict';

  // ========== State ==========
  const state = {
    passedSubjects: new Set(),
    diplomaCredits: 120,
    yearsExp: 5,
    registeredStudent: null
  };

  // ========== Tab Navigation ==========
  function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const mobileTabs = document.querySelectorAll('#mobileNav .nav-tab');
    const mobileNav = document.getElementById('mobileNav');
    const mobileBtn = document.getElementById('mobileMenuBtn');

    function switchTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('tab-' + tabName).classList.add('active');
      document.querySelectorAll(`.nav-tab[data-tab="${tabName}"]`).forEach(t => t.classList.add('active'));
      mobileNav.classList.remove('open');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    mobileTabs.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // ========== Subject Grid (Calculator) ==========
  function renderSubjectGrid() {
    const grid = document.getElementById('subjectGrid');
    grid.innerHTML = '';

    // Group by category
    const groups = {
      'core-mandatory': { label: '📕 必修科目', subjects: [] },
      'core-option': { label: '📗 核心選項', subjects: [] },
      'elective': { label: '📘 選修科目', subjects: [] }
    };

    SUBJECTS.forEach(s => {
      if (groups[s.category]) {
        groups[s.category].subjects.push(s);
      }
    });

    Object.keys(groups).forEach(key => {
      const g = groups[key];
      if (g.subjects.length === 0) return;

      const groupDiv = document.createElement('div');
      groupDiv.className = 'subject-group';
      groupDiv.innerHTML = `<h3 class="group-title">${g.label}</h3>`;

      g.subjects.forEach(s => {
        const card = document.createElement('div');
        card.className = 'subject-card' + (s.withdrawing ? ' withdrawing' : '') + (state.passedSubjects.has(s.code) ? ' selected' : '');
        card.dataset.code = s.code;
        card.innerHTML = `
          <div class="sc-header">
            <span class="sc-code">${s.code}</span>
            <span class="sc-credits">${s.credits} credits</span>
          </div>
          <div class="sc-name">${s.nameEN}</div>
          <div class="sc-name-zh">${s.nameZH}</div>
          <div class="sc-meta">
            <span class="sc-assessment">${s.assessmentLabel}</span>
            <span class="sc-level">L${s.level}</span>
          </div>
          ${s.withdrawing ? '<div class="sc-warning">⚠️ 即將退場</div>' : ''}
        `;
        card.addEventListener('click', () => toggleSubject(s.code));
        groupDiv.appendChild(card);
      });

      grid.appendChild(groupDiv);
    });
  }

  function toggleSubject(code) {
    if (state.passedSubjects.has(code)) {
      state.passedSubjects.delete(code);
    } else {
      state.passedSubjects.add(code);
    }
    renderSubjectGrid();
    updateCalculator();
  }

  // ========== Calculator Logic ==========
  function getEarnedAdvancedCredits() {
    let total = 0;
    state.passedSubjects.forEach(code => {
      const s = SUBJECTS.find(sub => sub.code === code);
      if (s) total += s.credits;
    });
    return total;
  }

  function getTotalCredits() {
    return state.diplomaCredits + getEarnedAdvancedCredits();
  }

  function checkCoreRules() {
    const passed = state.passedSubjects;
    return {
      m05: passed.has('M05'),
      m92or530: passed.has('M92') || passed.has('530'),
      '820or930or960': passed.has('820') || passed.has('930') || passed.has('960')
    };
  }

  function calculateRecommendedPath() {
    const totalCredits = getTotalCredits();
    const gap = Math.max(TARGET_CREDITS - totalCredits, 0);

    if (gap <= 0) {
      return { gap: 0, subjects: [], totalWeeks: 0, message: '🎉 你已達到 290 學分！可以申請 Chartered 資格！' };
    }

    const rules = checkCoreRules();
    const recommended = [];

    // Step 1: Add missing core subjects
    if (!rules.m05) {
      recommended.push(SUBJECTS.find(s => s.code === 'M05'));
    }
    if (!rules.m92or530) {
      // Recommend M92 (Level 4, easier) over 530 (Level 6)
      recommended.push(SUBJECTS.find(s => s.code === 'M92'));
    }
    if (!rules['820or930or960']) {
      // Default to 820 (most common)
      recommended.push(SUBJECTS.find(s => s.code === '820'));
    }

    // Calculate credits from core recommendations
    const coreCredits = recommended.reduce((sum, s) => sum + s.credits, 0);
    const remainingGap = gap - coreCredits;

    // Step 2: Fill with electives (excluding withdrawing ones)
    if (remainingGap > 0) {
      const availableElectives = SUBJECTS.filter(s =>
        s.category === 'elective' &&
        !s.withdrawing &&
        !state.passedSubjects.has(s.code) &&
        !recommended.find(r => r.code === s.code)
      );

      // Sort by credit efficiency (credits per study hour) descending
      availableElectives.sort((a, b) => (b.credits / b.studyHours) - (a.credits / a.studyHours));

      let electiveCredits = 0;
      for (const s of availableElectives) {
        if (electiveCredits >= remainingGap) break;
        recommended.push(s);
        electiveCredits += s.credits;
      }
    }

    const totalWeeks = recommended.reduce((sum, s) => sum + s.recommendedWeeks, 0);
    const totalNewCredits = recommended.reduce((sum, s) => sum + s.credits, 0);

    return {
      gap,
      subjects: recommended,
      totalWeeks,
      totalNewCredits,
      newTotal: totalCredits + totalNewCredits,
      message: `你需要再獲得 ${gap} 學分。推薦 ${recommended.length} 科，預計 ${totalWeeks} 週完成。`
    };
  }

  function updateCalculator() {
    const earnedAdvCredits = getEarnedAdvancedCredits();
    const totalCredits = getTotalCredits();
    const gap = Math.max(TARGET_CREDITS - totalCredits, 0);
    const pct = Math.min(Math.round(totalCredits / TARGET_CREDITS * 100), 100);

    // Update overview cards
    document.getElementById('earnedCredits').textContent = totalCredits;
    document.getElementById('creditGap').textContent = gap;

    // Chartered status
    const charteredEl = document.getElementById('charteredStatus');
    if (totalCredits >= TARGET_CREDITS && state.yearsExp >= 5) {
      charteredEl.textContent = '✅ 符合資格！';
      charteredEl.className = 'credit-value chartered-status eligible';
    } else if (totalCredits >= TARGET_CREDITS) {
      charteredEl.textContent = '⚠️ 學分達標，年資未夠';
      charteredEl.className = 'credit-value chartered-status partial';
    } else {
      charteredEl.textContent = '❌ 未達標';
      charteredEl.className = 'credit-value chartered-status';
    }

    // Progress bar
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressPct').textContent = pct + '%';

    // Core checklist
    const rules = checkCoreRules();
    document.getElementById('checkM05').textContent = rules.m05 ? '✅' : '⬜';
    document.getElementById('checkM92or530').textContent = rules.m92or530 ? '✅' : '⬜';
    document.getElementById('check820or930or960').textContent = rules['820or930or960'] ? '✅' : '⬜';

    // Recommended path
    renderRecommendedPath();
  }

  function renderRecommendedPath() {
    const container = document.getElementById('recommendedPath');
    const path = calculateRecommendedPath();

    if (path.subjects.length === 0 && path.gap === 0) {
      container.innerHTML = `<div class="path-complete">${path.message}</div>`;
      return;
    }

    if (path.subjects.length === 0) {
      container.innerHTML = `<p class="path-empty">請先選擇已通過的科目</p>`;
      return;
    }

    let html = `<div class="path-summary">${path.message}</div>`;
    html += `<div class="path-subjects">`;

    path.subjects.forEach((s, i) => {
      const coreTag = s.category.startsWith('core') ? '<span class="path-tag core">核心</span>' : '<span class="path-tag elective">選修</span>';
      html += `
        <div class="path-subject">
          <div class="ps-number">${i + 1}</div>
          <div class="ps-info">
            <div class="ps-header">
              <strong>${s.code}</strong> ${s.nameEN} ${coreTag}
            </div>
            <div class="ps-detail">
              ${s.credits} 學分 | ${s.assessmentLabel} | ${s.recommendedWeeks} 週 | ${s.studyHours} hrs
            </div>
            ${s.mcqPassMark ? `<div class="ps-pass">MCQ 及格: ${s.mcqPassMark}%</div>` : ''}
            <div class="ps-pass">Coursework 及格: ${s.cwPassMark}%</div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    html += `<div class="path-result">
      新增學分：${path.totalNewCredits} | 完成後總學分：${path.newTotal} | 預計總備考時間：~${path.totalWeeks} 週
    </div>`;

    container.innerHTML = html;
  }

  // ========== Subject Table ==========
  function renderSubjectTable(filter) {
    const tbody = document.getElementById('subjectTableBody');
    const filtered = filter === 'all' ? SUBJECTS : SUBJECTS.filter(s => {
      if (filter === 'core-mandatory') return s.category === 'core-mandatory';
      if (filter === 'core-option') return s.category === 'core-option';
      if (filter === 'elective') return s.category === 'elective';
      if (filter === 'mixed') return s.assessmentMode === 'mixed';
      if (filter === 'coursework') return s.assessmentMode === 'coursework';
      return true;
    });

    tbody.innerHTML = filtered.map(s => `
      <tr class="${s.withdrawing ? 'withdrawing-row' : ''}">
        <td><strong>${s.code}</strong></td>
        <td>${s.nameEN}<br><span class="zh-name">${s.nameZH}</span></td>
        <td><span class="cat-badge ${s.category}">${s.categoryLabel}</span></td>
        <td><strong>${s.credits}</strong></td>
        <td>${s.level}</td>
        <td>${s.assessmentLabel}</td>
        <td>${s.mcqPassMark ? s.mcqPassMark + '%' : '—'}</td>
        <td>${s.cwPassMark}%</td>
        <td>${s.studyHours}</td>
        <td class="notes-cell">${s.notes || '—'}</td>
      </tr>
    `).join('');
  }

  function initFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSubjectTable(btn.dataset.filter);
      });
    });
  }

  // ========== Registration Form ==========
  function renderRegSubjectsGrid() {
    const grid = document.getElementById('regSubjectsGrid');
    grid.innerHTML = SUBJECTS.map(s => `
      <label class="reg-subject-label ${s.withdrawing ? 'withdrawing' : ''}">
        <input type="checkbox" value="${s.code}" ${s.withdrawing ? 'disabled' : ''}>
        ${s.code} ${s.nameEN}
      </label>
    `).join('');
  }

  function initRegisterForm() {
    renderRegSubjectsGrid();

    document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const company = document.getElementById('regCompany').value;
      const role = document.getElementById('regRole').value;
      const location = document.getElementById('regLocation').value;
      const years = parseInt(document.getElementById('regYears').value) || 0;
      const diplomaCr = parseInt(document.getElementById('regDiplomaCredits').value) || 0;
      const target = document.getElementById('regTarget').value;

      const passedSubjects = [];
      document.querySelectorAll('#regSubjectsGrid input:checked').forEach(cb => {
        passedSubjects.push(cb.value);
      });

      const qualifications = [];
      document.querySelectorAll('#regQualifications input:checked').forEach(cb => {
        qualifications.push(cb.value);
      });

      // Calculate credits
      let advCredits = 0;
      passedSubjects.forEach(code => {
        const s = SUBJECTS.find(sub => sub.code === code);
        if (s) advCredits += s.credits;
      });
      const totalCredits = diplomaCr + advCredits;
      const gap = Math.max(TARGET_CREDITS - totalCredits, 0);

      state.registeredStudent = {
        name, email, company, role, location, years,
        diplomaCredits: diplomaCr, passedSubjects, qualifications,
        target, totalCredits, advCredits, gap
      };

      // Update state
      state.diplomaCredits = diplomaCr;
      state.yearsExp = years;
      state.passedSubjects = new Set(passedSubjects);

      // Show summary
      const summary = document.getElementById('regSummary');
      summary.innerHTML = `
        <div class="summary-row"><span>姓名：</span><strong>${name}</strong></div>
        <div class="summary-row"><span>現職：</span><strong>${role} @ ${company}</strong></div>
        <div class="summary-row"><span>Diploma 學分：</span><strong>${diplomaCr}</strong></div>
        <div class="summary-row"><span>Adv Dip 學分：</span><strong>${advCredits}</strong></div>
        <div class="summary-row"><span>總學分：</span><strong>${totalCredits}</strong></div>
        <div class="summary-row"><span>學分差距：</span><strong class="highlight">${gap}</strong></div>
        <div class="summary-row"><span>目標：</span><strong>${target === 'chartered' ? 'Chartered Status' : target === 'fellowship' ? 'Fellowship (FCII)' : 'Advanced Diploma'}</strong></div>
      `;

      document.getElementById('regSuccessModal').classList.add('show');

      // Update calculator & dashboard
      updateCalculator();
      updateDashboard();
      renderSubjectGrid();
    });
  }

  function closeModal() {
    document.getElementById('regSuccessModal').classList.remove('show');
  }

  // ========== Dashboard ==========
  function updateDashboard() {
    const student = state.registeredStudent;
    if (!student) return;

    const totalCredits = getTotalCredits();
    const advCredits = getEarnedAdvancedCredits();
    const gap = Math.max(TARGET_CREDITS - totalCredits, 0);
    const pct = Math.min(Math.round(totalCredits / TARGET_CREDITS * 100), 100);

    // Header
    document.getElementById('dashName').textContent = student.name;
    document.getElementById('dashRole').textContent = `${student.role} @ ${student.company}`;
    document.getElementById('dashTotalCredits').textContent = totalCredits;
    document.getElementById('dashGap').textContent = gap;
    document.getElementById('dashChartered').textContent = totalCredits >= TARGET_CREDITS && state.yearsExp >= 5 ? '✅' : '❌';

    // Ring
    const circumference = 2 * Math.PI * 85; // ~534
    const offset = circumference - (pct / 100) * circumference;
    document.getElementById('ringFill').style.strokeDashoffset = offset;
    document.getElementById('ringPct').textContent = pct + '%';

    // Legend
    document.getElementById('legendDiploma').textContent = state.diplomaCredits;
    document.getElementById('legendAdvanced').textContent = advCredits;
    document.getElementById('legendGap').textContent = gap;

    // Progress list
    renderProgressList();
    renderTimeline();
  }

  function renderProgressList() {
    const container = document.getElementById('progressList');
    const rules = checkCoreRules();

    // All subjects the student should care about
    const relevantSubjects = SUBJECTS.filter(s => !s.withdrawing);

    let html = '';

    // Core section
    html += '<div class="progress-group"><h3>📕 核心科目</h3>';

    // M05
    const m05 = SUBJECTS.find(s => s.code === 'M05');
    html += renderProgressItem(m05, state.passedSubjects.has('M05'));

    // M92 or 530
    const m92Passed = state.passedSubjects.has('M92');
    const s530Passed = state.passedSubjects.has('530');
    html += renderProgressItem(SUBJECTS.find(s => s.code === 'M92'), m92Passed, '二選一');
    html += renderProgressItem(SUBJECTS.find(s => s.code === '530'), s530Passed, '二選一');

    // 820/930/960
    html += renderProgressItem(SUBJECTS.find(s => s.code === '820'), state.passedSubjects.has('820'), '三選一');
    html += renderProgressItem(SUBJECTS.find(s => s.code === '930'), state.passedSubjects.has('930'), '三選一');
    html += renderProgressItem(SUBJECTS.find(s => s.code === '960'), state.passedSubjects.has('960'), '三選一');

    html += '</div>';

    // Elective section
    html += '<div class="progress-group"><h3>📘 選修科目</h3>';
    SUBJECTS.filter(s => s.category === 'elective' && !s.withdrawing).forEach(s => {
      html += renderProgressItem(s, state.passedSubjects.has(s.code));
    });
    html += '</div>';

    container.innerHTML = html;
  }

  function renderProgressItem(subject, passed, optionLabel) {
    const status = passed ? 'passed' : 'not-started';
    const statusIcon = passed ? '✅' : '📋';
    const statusText = passed ? '已通過 Passed' : '未開始 Not Started';
    const optionTag = optionLabel ? `<span class="option-tag">${optionLabel}</span>` : '';

    return `
      <div class="progress-item ${status}">
        <div class="pi-status">${statusIcon}</div>
        <div class="pi-info">
          <div class="pi-header">
            <strong>${subject.code}</strong> ${subject.nameEN} ${optionTag}
          </div>
          <div class="pi-detail">
            ${subject.credits} 學分 | ${subject.assessmentLabel} | ${subject.cwPassMark}% pass
          </div>
        </div>
        <div class="pi-credits">${passed ? '+' + subject.credits : '0'}</div>
      </div>
    `;
  }

  function renderTimeline() {
    const container = document.getElementById('timeline');
    const path = calculateRecommendedPath();

    if (path.subjects.length === 0) {
      container.innerHTML = '<div class="timeline-complete">🎉 已達標！無需額外備考。</div>';
      return;
    }

    let html = '';
    let weekOffset = 1;

    path.subjects.forEach((s, i) => {
      const endWeek = weekOffset + s.recommendedWeeks - 1;
      const isCore = s.category.startsWith('core');
      const typeClass = isCore ? 'core' : 'elective';

      html += `
        <div class="timeline-item ${typeClass}">
          <div class="tl-marker">${i + 1}</div>
          <div class="tl-content">
            <div class="tl-header">
              <strong>${s.code}</strong> ${s.nameEN}
              <span class="tl-tag ${typeClass}">${isCore ? '核心' : '選修'}</span>
            </div>
            <div class="tl-detail">
              ${s.credits} 學分 | Week ${weekOffset}-${endWeek} | ${s.assessmentLabel}
            </div>
            <div class="tl-pass-info">
              ${s.mcqPassMark ? `MCQ 及格: ${s.mcqPassMark}% | ` : ''}Coursework 及格: ${s.cwPassMark}%
            </div>
          </div>
        </div>
      `;

      weekOffset = endWeek + 1;
    });

    html += `
      <div class="timeline-item finish">
        <div class="tl-marker">🏁</div>
        <div class="tl-content">
          <div class="tl-header"><strong>完成！預計總時長：${path.totalWeeks} 週</strong></div>
          <div class="tl-detail">完成後總學分：${path.newTotal} | ${path.newTotal >= TARGET_CREDITS ? '✅ 達標！' : '❌ 仍差學分'}</div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // ========== Event Listeners ==========
  function initEventListeners() {
    // Diploma credits input
    document.getElementById('diplomaCredits').addEventListener('input', function() {
      state.diplomaCredits = parseInt(this.value) || 0;
      updateCalculator();
    });

    // Years of experience
    document.getElementById('yearsExp').addEventListener('input', function() {
      state.yearsExp = parseInt(this.value) || 0;
      updateCalculator();
    });
  }

  // ========== Initialize ==========
  function init() {
    initTabs();
    renderSubjectGrid();
    renderSubjectTable('all');
    initFilterButtons();
    initRegisterForm();
    initEventListeners();
    updateCalculator();
    updateDashboard();
  }

  // Make closeModal global
  window.closeModal = closeModal;

  document.addEventListener('DOMContentLoaded', init);
})();
