// CII FastTrack v3 — Full qualification levels + Career Pathways + RPL

(function() {
  'use strict';

  const state = {
    pathway: null, // 'insurance' or 'financial-planning'
    targetLevel: 'advanced-diploma', // default to Adv Diploma
    insuranceDirection: 'general',
    passedSubjects: new Set(),
    diplomaCredits: 0,
    rplCredits: 0,
    rplQualifications: new Set(),
    yearsExp: 5,
    registeredStudent: null
  };

  function getTargetCredits() {
    const level = QUALIFICATION_LEVELS.find(l => l.id === state.targetLevel);
    if (state.targetLevel === 'fellowship') return 290; // Fellowship base is Adv Diploma 290, plus programme
    return level ? level.creditsRequired : 290;
  }

  function getActiveSubjects() {
    // Return ALL subjects for the pathway based on target level
    if (state.pathway === 'insurance') {
      const all = [...INSURANCE_AWARD_CERT_SUBJECTS, ...INSURANCE_SUBJECTS];
      return all.filter(s => {
        if (state.targetLevel === 'award') return s.levelGroup === 'award' || s.level <= 3;
        if (state.targetLevel === 'certificate') return s.level <= 3;
        if (state.targetLevel === 'diploma') return s.level <= 4;
        return true; // advanced-diploma: show all
      });
    }
    if (state.pathway === 'financial-planning') {
      const all = [...FP_AWARD_CERT_DIP_SUBJECTS, ...FP_SUBJECTS];
      return all.filter(s => {
        if (state.targetLevel === 'award') return s.levelGroup === 'award' || s.level <= 3;
        if (state.targetLevel === 'certificate') return s.level <= 3;
        if (state.targetLevel === 'diploma') return s.level <= 4;
        return true;
      });
    }
    return [];
  }

  function getActiveCoreRules() {
    if (state.pathway === 'insurance') return INSURANCE_CORE_RULES;
    if (state.pathway === 'financial-planning') return FP_CORE_RULES;
    return {};
  }

  // ========== Tab Navigation ==========
  function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const mobileNav = document.getElementById('mobileNav');
    const mobileBtn = document.getElementById('mobileMenuBtn');

    function switchTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('tab-' + tabName).classList.add('active');
      document.querySelectorAll(`.nav-tab[data-tab="${tabName}"]`).forEach(t => t.classList.add('active'));
      mobileNav.classList.remove('open');
    }

    tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    document.querySelectorAll('#mobileNav .nav-tab').forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
    mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  // ========== Pathway Selection ==========
  function renderPathwaySelection() {
    const container = document.getElementById('pathwayCards');
    container.innerHTML = CAREER_PATHWAYS.map(p => `
      <div class="pathway-card ${state.pathway === p.id ? 'selected' : ''}" data-pathway="${p.id}">
        <div class="pc-label">${p.label}</div>
        <div class="pc-desc">${p.description}</div>
        <div class="pc-chartered">Chartered: ${p.charteredTitles.join(' / ')}</div>
      </div>
    `).join('');

    container.querySelectorAll('.pathway-card').forEach(card => {
      card.addEventListener('click', () => {
        state.pathway = card.dataset.pathway;
        renderPathwaySelection();
        renderDirectionSelection();
        renderLevelCards();
        renderSubjectGrid();
        updateCalculator();
      });
    });
  }

  function renderLevelCards() {
    const container = document.getElementById('levelCards');
    const pathway = CAREER_PATHWAYS.find(p => p.id === state.pathway);
    const pathwayLabel = pathway ? pathway.pathwayLabel : '';

    container.innerHTML = QUALIFICATION_LEVELS.map(l => {
      const isSelected = state.targetLevel === l.id;
      const isAccessible = state.pathway !== null;
      const fellowshipNote = l.isProgram ? '⚠️ 非純學分制，需額外 Programme' : '';
      return `
        <div class="level-card ${isSelected ? 'selected' : ''} ${!isAccessible ? 'disabled' : ''}" data-level="${l.id}">
          <div class="lc-label">${l.label}</div>
          <div class="lc-credits">${l.isProgram ? '290+ Programme' : l.creditsRequired + ' credits'}</div>
          <div class="lc-designation">${l.designation}</div>
          <div class="lc-desc">${l.description}</div>
          ${fellowshipNote ? `<div class="lc-note">${fellowshipNote}</div>` : ''}
        </div>
      `;
    }).join('');

    container.querySelectorAll('.level-card:not(.disabled)').forEach(card => {
      card.addEventListener('click', () => {
        state.targetLevel = card.dataset.level;
        state.diplomaCredits = 0;
        renderLevelCards();
        renderSubjectGrid();
        updateCalculator();
      });
    });
  }

  function renderDirectionSelection() {
    const container = document.getElementById('directionSection');
    if (state.pathway !== 'insurance') {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';
    const dirGrid = document.getElementById('directionGrid');
    dirGrid.innerHTML = INSURANCE_DIRECTIONS.map(d => `
      <div class="direction-card ${state.insuranceDirection === d.id ? 'selected' : ''}" data-dir="${d.id}">
        <div class="dc-label">${d.label}</div>
        <div class="dc-desc">${d.description}</div>
      </div>
    `).join('');

    dirGrid.querySelectorAll('.direction-card').forEach(card => {
      card.addEventListener('click', () => {
        state.insuranceDirection = card.dataset.dir;
        renderDirectionSelection();
        renderSubjectGrid();
        updateCalculator();
      });
    });
  }

  // ========== RPL Section ==========
  function renderRPLSection() {
    const container = document.getElementById('rplGrid');
    container.innerHTML = RPL_QUALIFICATIONS.map(q => `
      <div class="rpl-card ${state.rplQualifications.has(q.id) ? 'selected' : ''}" data-rpl="${q.id}">
        <div class="rpl-label">${q.label}</div>
        <div class="rpl-range">估算學分：${q.estimatedCredits}</div>
        <div class="rpl-note">${q.notes}</div>
      </div>
    `).join('');

    container.querySelectorAll('.rpl-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.rpl;
        if (state.rplQualifications.has(id)) {
          state.rplQualifications.delete(id);
        } else {
          state.rplQualifications.add(id);
        }
        calculateRPLCredits();
        renderRPLSection();
        updateCalculator();
      });
    });

    renderRPLSummary();
  }

  function calculateRPLCredits() {
    // Use estimated mid-point of each RPL credit range as a conservative estimate
    let total = 0;
    state.rplQualifications.forEach(id => {
      const q = RPL_QUALIFICATIONS.find(r => r.id === id);
      if (q) {
        const range = q.estimatedCredits.split('-');
        const min = parseInt(range[0]);
        const max = parseInt(range[1]);
        total += Math.round((min + max) / 2); // midpoint estimate
      }
    });
    // Cap at Advanced Diploma RPL max
    const maxCap = RPL_MAX_CAPS.advancedDiploma.maxRPLCredits;
    state.rplCredits = Math.min(total, maxCap);
  }

  function renderRPLSummary() {
    const summary = document.getElementById('rplSummary');
    if (state.rplQualifications.size === 0) {
      summary.innerHTML = '<p class="rpl-empty">未選擇任何外部資格。如你持有相關學位或其他專業資格，選擇後可估算豁免學分。</p>';
      return;
    }

    const items = [];
    state.rplQualifications.forEach(id => {
      const q = RPL_QUALIFICATIONS.find(r => r.id === id);
      if (q) items.push(q);
    });

    summary.innerHTML = `
      <div class="rpl-selected-list">
        ${items.map(q => `<div class="rpl-item">✅ ${q.label} — 估算 ${q.estimatedCredits} 學分</div>`).join('')}
      </div>
      <div class="rpl-total">
        估算 RPL 學分：<strong>${state.rplCredits}</strong>（上限 ${RPL_MAX_CAPS.advancedDiploma.maxRPLCredits}）
      </div>
      <div class="rpl-warning">⚠️ 這只是估算值。實際豁免學分需向 CII 申請確認：<a href="https://www.cii.co.uk/learning/accreditation/recognition-of-prior-learning/check-your-eligibility-and-apply/" target="_blank">cii.co.uk/prior-learning</a></div>
    `;
  }

  // ========== Subject Grid ==========
  function renderSubjectGrid() {
    const grid = document.getElementById('subjectGrid');
    if (!state.pathway) {
      grid.innerHTML = '<p class="path-empty">請先選擇你的職業方向（Insurance 或 Financial Planning）</p>';
      return;
    }

    const subjects = getActiveSubjects();
    grid.innerHTML = '';

    // Group by levelGroup first, then by category within each level
    const levelOrder = ['award', 'certificate', 'diploma', 'advanced-diploma'];
    const groups = {};
    subjects.forEach(s => {
      const lg = s.levelGroup || 'diploma'; // fallback for subjects without levelGroup
      const cat = s.category || 'general';
      const groupKey = lg + '|' + cat;
      const catLabel = s.categoryLabel || (lg === 'award' ? '🏅 Award' : lg === 'certificate' ? '📜 Certificate' : lg === 'diploma' ? '🎓 Diploma' : '📘 General');
      const lgLabel = lg === 'award' ? '🏅 Award 級別' : lg === 'certificate' ? '📜 Certificate 級別' : lg === 'diploma' ? '🎓 Diploma 級別' : '🎯 Advanced Diploma 級別';
      if (!groups[groupKey]) groups[groupKey] = { lg, cat, lgLabel, catLabel, subjects: [] };
      groups[groupKey].subjects.push(s);
    });

    // Sort groups by level order
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      const lgA = groups[a].lg, lgB = groups[b].lg;
      return (levelOrder.indexOf(lgA) || 99) - (levelOrder.indexOf(lgB) || 99);
    });

    // For Insurance pathway, highlight direction-recommended subjects
    const recommendedCodes = state.pathway === 'insurance'
      ? (INSURANCE_DIRECTIONS.find(d => d.id === state.insuranceDirection)?.recommendedUnits || [])
      : [];

    sortedKeys.forEach(key => {
      const g = groups[key];
      const groupDiv = document.createElement('div');
      groupDiv.className = 'subject-group';
      groupDiv.innerHTML = `<h3 class="group-title">${g.lgLabel} — ${g.catLabel}</h3>`;

      g.subjects.forEach(s => {
        const isRecommended = recommendedCodes.includes(s.code);
        const card = document.createElement('div');
        card.className = 'subject-card' + (s.withdrawing ? ' withdrawing' : '') + (state.passedSubjects.has(s.code) ? ' selected' : '') + (isRecommended ? ' recommended' : '');
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
          ${isRecommended ? '<div class="sc-recommend">⭐ 推薦</div>' : ''}
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
      const subjects = getActiveSubjects();
      const s = subjects.find(sub => sub.code === code);
      if (s) total += s.credits;
    });
    return total;
  }

  function getTotalCredits() {
    return state.diplomaCredits + getEarnedAdvancedCredits() + state.rplCredits;
  }

  function checkCoreRules() {
    const rules = getActiveCoreRules();
    const passed = state.passedSubjects;
    const results = {};

    Object.keys(rules).forEach(key => {
      const rule = rules[key];
      if (rule.choose) {
        results[key] = rule.codes.some(c => passed.has(c));
      } else {
        results[key] = rule.codes.every(c => passed.has(c));
      }
    });

    return results;
  }

  function calculateRecommendedPath() {
    if (!state.pathway) return { gap: getTargetCredits(), subjects: [], message: '請先選擇職業方向' };

    const target = getTargetCredits();
    const totalCredits = getTotalCredits();
    const gap = Math.max(target - totalCredits, 0);

    if (gap <= 0) {
      return { gap: 0, subjects: [], totalWeeks: 0, message: `🎉 你已達到 ${target} 學分！${state.targetLevel === 'advanced-diploma' ? '可申請 Chartered 資格' : QUALIFICATION_LEVELS.find(l => l.id === state.targetLevel)?.designation}` };
    }

    const subjects = getActiveSubjects();
    const rules = checkCoreRules();
    const recommended = [];

    // Add missing core subjects
    const coreRules = getActiveCoreRules();
    Object.keys(coreRules).forEach(key => {
      const rule = coreRules[key];
      if (!rules[key]) {
        if (rule.choose) {
          // Pick the best option based on direction
          let bestCode;
          if (state.pathway === 'insurance') {
            if (key === 'm92or530') {
              bestCode = state.insuranceDirection === 'general' ? 'M92' : '530';
            } else if (key === '820or930or960') {
              const dirMap = { claims: '820', broking: '930', underwriting: '960', risk: '820', general: '820' };
              bestCode = dirMap[state.insuranceDirection] || '820';
            }
          } else {
            bestCode = rule.codes[0]; // AF5 for FP
          }
          const subj = subjects.find(s => s.code === bestCode);
          if (subj) recommended.push(subj);
        } else {
          rule.codes.forEach(code => {
            const subj = subjects.find(s => s.code === code);
            if (subj) recommended.push(subj);
          });
        }
      }
    });

    // Fill with electives
    const coreCredits = recommended.reduce((sum, s) => sum + s.credits, 0);
    const remainingGap = gap - coreCredits;

    if (remainingGap > 0) {
      const availableElectives = subjects.filter(s =>
        s.category === 'elective' &&
        !s.withdrawing &&
        !state.passedSubjects.has(s.code) &&
        !recommended.find(r => r.code === s.code)
      );

      // Prioritize direction-recommended units first
      if (state.pathway === 'insurance' && state.insuranceDirection !== 'general') {
        const dir = INSURANCE_DIRECTIONS.find(d => d.id === state.insuranceDirection);
        const dirUnits = availableElectives.filter(s => dir.recommendedUnits.includes(s.code));
        const otherUnits = availableElectives.filter(s => !dir.recommendedUnits.includes(s.code));
        otherUnits.sort((a, b) => (b.credits / b.studyHours) - (a.credits / a.studyHours));
        const sorted = [...dirUnits, ...otherUnits];

        let electiveCredits = 0;
        for (const s of sorted) {
          if (electiveCredits >= remainingGap) break;
          recommended.push(s);
          electiveCredits += s.credits;
        }
      } else {
        availableElectives.sort((a, b) => (b.credits / b.studyHours) - (a.credits / a.studyHours));
        let electiveCredits = 0;
        for (const s of availableElectives) {
          if (electiveCredits >= remainingGap) break;
          recommended.push(s);
          electiveCredits += s.credits;
        }
      }
    }

    const totalWeeks = recommended.reduce((sum, s) => sum + s.recommendedWeeks, 0);
    const totalNewCredits = recommended.reduce((sum, s) => sum + s.credits, 0);

    return {
      gap, subjects: recommended, totalWeeks, totalNewCredits,
      newTotal: totalCredits + totalNewCredits,
      message: `你需要再獲得 ${gap} 學分。推薦 ${recommended.length} 科，預計 ${totalWeeks} 週完成。`
    };
  }

  function updateCalculator() {
    const earnedAdvCredits = getEarnedAdvancedCredits();
    const totalCredits = getTotalCredits();
    const target = getTargetCredits();
    const gap = Math.max(target - totalCredits, 0);
    const pct = Math.min(Math.round(totalCredits / target * 100), 100);
    const levelInfo = QUALIFICATION_LEVELS.find(l => l.id === state.targetLevel);

    // Update overview
    document.querySelector('.credit-card.target .credit-value').textContent = target;
    document.getElementById('earnedCredits').textContent = totalCredits;
    document.getElementById('creditGap').textContent = gap;

    // Chartered status
    const charteredEl = document.getElementById('charteredStatus');
    const canBeChartered = state.targetLevel === 'advanced-diploma' && totalCredits >= 290 && state.yearsExp >= 5 && state.pathway;
    if (canBeChartered) {
      const titles = CAREER_PATHWAYS.find(p => p.id === state.pathway)?.charteredTitles || [];
      charteredEl.textContent = `✅ ${titles[0]}！`;
      charteredEl.className = 'credit-value chartered-status eligible';
    } else if (state.targetLevel !== 'advanced-diploma') {
      charteredEl.textContent = `${levelInfo?.designation || '—'}`;
      charteredEl.className = 'credit-value chartered-status';
    } else if (totalCredits >= 290) {
      charteredEl.textContent = '⚠️ 學分達標，年資未夠';
      charteredEl.className = 'credit-value chartered-status partial';
    } else {
      charteredEl.textContent = `❌ 差 ${gap}`;
      charteredEl.className = 'credit-value chartered-status';
    }

    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('progressPct').textContent = pct + '%';

    document.getElementById('creditBreakdown').innerHTML = `
      <div class="cb-row"><span class="cb-dot existing"></span> 已有學分: <strong>${state.diplomaCredits}</strong></div>
      <div class="cb-row"><span class="cb-dot advanced"></span> 科目學分: <strong>${earnedAdvCredits}</strong></div>
      <div class="cb-row"><span class="cb-dot rpl"></span> RPL (估): <strong>${state.rplCredits}</strong></div>
      <div class="cb-row"><span class="cb-dot gap"></span> 差距: <strong>${gap}</strong></div>
      <div class="cb-row"><span class="cb-dot target"></span> 目標: <strong>${target} (${levelInfo?.label})</strong></div>
    `;

    // ===== Calculator Summary Bar (always visible near subject grid) =====
    document.getElementById('csbGap').textContent = gap;
    document.getElementById('csbTarget').textContent = target;
    document.getElementById('csbEarned').textContent = totalCredits;
    document.getElementById('csbPct').textContent = pct + '%';
    document.getElementById('csbBarFill').style.width = pct + '%';

    // Show recommended subjects in summary bar
    const csbRec = document.getElementById('csbRecommend');
    if (!state.pathway) {
      csbRec.innerHTML = '<div class="csb-rec-empty">請先選擇職業方向</div>';
    } else if (gap <= 0) {
      csbRec.innerHTML = `<div class="csb-rec-complete">🎉 已達標！${levelInfo?.designation} 資格完成</div>`;
    } else {
      const path = calculateRecommendedPath();
      if (path.subjects.length > 0) {
        csbRec.innerHTML = `
          <div class="csb-rec-title">📌 推薦你需要考的科目：</div>
          <div class="csb-rec-subjects">
            ${path.subjects.map(s => `
              <div class="csb-rec-item ${s.category.startsWith('core') ? 'core' : 'elective'}">
                <span class="csb-code">${s.code}</span>
                <span class="csb-name">${s.nameEN}</span>
                <span class="csb-credits">${s.credits}cr</span>
                <span class="csb-type">${s.category.startsWith('core') ? '核心' : '選修'}</span>
              </div>
            `).join('')}
          </div>
          <div class="csb-rec-total">新增 ${path.totalNewCredits} 學分 | 完成後總計 ${path.newTotal} | ~${path.totalWeeks} 週</div>
        `;
      } else {
        csbRec.innerHTML = '<div class="csb-rec-empty">選擇已通過科目後，即時顯示推薦路徑</div>';
      }
    }

    // Core checklist
    const rules = checkCoreRules();
    const checklist = document.getElementById('coreChecklist');
    const activeRules = getActiveCoreRules();

    if (!state.pathway) {
      checklist.innerHTML = '<p class="path-empty">請先選擇職業方向</p>';
    } else {
      checklist.innerHTML = Object.keys(activeRules).map(key => {
        const rule = activeRules[key];
        const passed = rules[key];
        return `
          <div class="checklist-item">
            <div class="check-icon">${passed ? '✅' : '⬜'}</div>
            <div class="check-text">
              <strong>${rule.label}</strong>
            </div>
          </div>
        `;
      }).join('');
    }

    // Recommended path
    renderRecommendedPath();
  }

  function renderRecommendedPath() {
    const container = document.getElementById('recommendedPath');
    if (!state.pathway) {
      container.innerHTML = '<p class="path-empty">請先選擇職業方向並輸入已通過科目</p>';
      return;
    }

    const path = calculateRecommendedPath();
    if (path.subjects.length === 0 && path.gap === 0) {
      container.innerHTML = `<div class="path-complete">${path.message}</div>`;
      return;
    }

    let html = `<div class="path-summary">${path.message}</div><div class="path-subjects">`;
    path.subjects.forEach((s, i) => {
      const coreTag = s.category.startsWith('core') ? '<span class="path-tag core">核心</span>' : '<span class="path-tag elective">選修</span>';
      html += `
        <div class="path-subject">
          <div class="ps-number">${i + 1}</div>
          <div class="ps-info">
            <div class="ps-header"><strong>${s.code}</strong> ${s.nameEN} ${coreTag}</div>
            <div class="ps-detail">${s.credits} credits | ${s.assessmentLabel} | ${s.recommendedWeeks} weeks</div>
            ${s.mcqPassMark ? `<div class="ps-pass">MCQ pass: ${s.mcqPassMark}%</div>` : ''}
            ${s.cwPassMark ? `<div class="ps-pass">Coursework pass: ${s.cwPassMark}%</div>` : ''}
            ${s.writtenPassMark ? `<div class="ps-pass">Written exam pass: ${s.writtenPassMark}%</div>` : ''}
          </div>
        </div>
      `;
    });
    html += `</div><div class="path-result">New credits: ${path.totalNewCredits} | Total: ${path.newTotal} | ~${path.totalWeeks} weeks</div>`;
    container.innerHTML = html;
  }

  // ========== Subject Table ==========
  // ===== Multi-dimensional Subject Table Filter =====
  const tableFilters = { pathway: 'all', level: 'all', assessment: 'all' };

  function renderSubjectTable() {
    const tbody = document.getElementById('subjectTableBody');
    const allSubjects = [...INSURANCE_AWARD_CERT_SUBJECTS, ...INSURANCE_SUBJECTS, ...FP_AWARD_CERT_DIP_SUBJECTS, ...FP_SUBJECTS];

    let filtered = allSubjects;

    // Apply pathway filter
    if (tableFilters.pathway !== 'all') {
      filtered = filtered.filter(s => s.pathway === tableFilters.pathway);
    }
    // Apply level filter
    if (tableFilters.level !== 'all') {
      if (tableFilters.level === 'award-cert') {
        filtered = filtered.filter(s => s.levelGroup === 'award' || s.levelGroup === 'certificate');
      } else if (tableFilters.level === 'diploma') {
        filtered = filtered.filter(s => s.levelGroup === 'diploma');
      } else if (tableFilters.level === 'advanced-diploma') {
        filtered = filtered.filter(s => s.levelGroup === 'advanced-diploma');
      }
    }
    // Apply assessment filter
    if (tableFilters.assessment !== 'all') {
      filtered = filtered.filter(s => s.assessmentMode === tableFilters.assessment);
    }

    tbody.innerHTML = filtered.map(s => {
      const levelBadge = s.levelGroup === 'award' ? '🏅 Award' :
                         s.levelGroup === 'certificate' ? '📜 Cert' :
                         s.levelGroup === 'diploma' ? '🎓 Dip' :
                         (s.level >= 6 ? '🎯 AdvDip' : '🎓 Dip');
      return `
        <tr class="${s.withdrawing ? 'withdrawing-row' : ''}">
          <td><strong>${s.code}</strong></td>
          <td>${s.nameEN}<br><span class="zh-name">${s.nameZH}</span></td>
          <td>${s.pathway === 'insurance' ? '🛡️ Ins' : '💰 FP'}</td>
          <td><span class="cat-badge ${s.levelGroup || 'adv-dip'}">${levelBadge}</span></td>
          <td><strong>${s.credits}</strong></td>
          <td>${s.level}</td>
          <td>${s.assessmentLabel}</td>
          <td>${s.mcqPassMark ? s.mcqPassMark + '%' : '—'}</td>
          <td>${s.cwPassMark ? s.cwPassMark + '%' : '—'}</td>
          <td>${s.writtenPassMark ? s.writtenPassMark + '%' : '—'}</td>
          <td>${s.studyHours}</td>
          <td class="notes-cell">${s.notes || s.description || '—'}</td>
        </tr>
      `;
    }).join('');
  }

  function initFilterButtons() {
    // Each filter group can have ONE active button within its group
    // But multiple groups can be active simultaneously
    document.querySelectorAll('.filter-btn-multi').forEach(btn => {
      btn.addEventListener('click', () => {
        const filterType = btn.dataset.filterType;
        const filterValue = btn.dataset.filterValue;

        // Deactivate only siblings in same group
        const siblings = btn.parentElement.querySelectorAll('.filter-btn-multi');
        siblings.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update filter state
        tableFilters[filterType] = filterValue;
        renderSubjectTable();
      });
    });
  }

  // ========== Registration Form ==========
  function renderRegSubjectsGrid() {
    const grid = document.getElementById('regSubjectsGrid');
    const allSubjects = [...INSURANCE_SUBJECTS, ...FP_SUBJECTS];
    grid.innerHTML = allSubjects.map(s => `
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
      const pathway = document.getElementById('regPathway').value;

      const passedSubjects = [];
      document.querySelectorAll('#regSubjectsGrid input:checked').forEach(cb => passedSubjects.push(cb.value));

      const qualifications = [];
      document.querySelectorAll('#regQualifications input:checked').forEach(cb => qualifications.push(cb.value));

      let advCredits = 0;
      passedSubjects.forEach(code => {
        const allS = [...INSURANCE_SUBJECTS, ...FP_SUBJECTS];
        const s = allS.find(sub => sub.code === code);
        if (s) advCredits += s.credits;
      });

      state.registeredStudent = { name, email, company, role, location, years, diplomaCredits: diplomaCr, passedSubjects, qualifications, target, pathway, totalCredits: diplomaCr + advCredits, advCredits, gap: Math.max(TARGET_CREDITS - diplomaCr - advCredits, 0) };
      state.diplomaCredits = diplomaCr;
      state.yearsExp = years;
      state.passedSubjects = new Set(passedSubjects);
      state.pathway = pathway;

      const summary = document.getElementById('regSummary');
      summary.innerHTML = `
        <div class="summary-row"><span>Name:</span><strong>${name}</strong></div>
        <div class="summary-row"><span>Role:</span><strong>${role} @ ${company}</strong></div>
        <div class="summary-row"><span>Pathway:</span><strong>${pathway === 'insurance' ? '🛡️ Insurance' : '💰 Financial Planning'}</strong></div>
        <div class="summary-row"><span>Diploma credits:</span><strong>${diplomaCr}</strong></div>
        <div class="summary-row"><span>Adv Dip credits:</span><strong>${advCredits}</strong></div>
        <div class="summary-row"><span>Total:</span><strong>${diplomaCr + advCredits}</strong></div>
        <div class="summary-row"><span>Gap:</span><strong class="highlight">${Math.max(TARGET_CREDITS - diplomaCr - advCredits, 0)}</strong></div>
      `;

      document.getElementById('regSuccessModal').classList.add('show');
      updateCalculator();
      updateDashboard();
      renderSubjectGrid();
    });
  }

  window.closeModal = () => document.getElementById('regSuccessModal').classList.remove('show');

  // ========== Dashboard ==========
  function updateDashboard() {
    const student = state.registeredStudent;
    if (!student) return;

    const totalCredits = getTotalCredits();
    const advCredits = getEarnedAdvancedCredits();
    const gap = Math.max(TARGET_CREDITS - totalCredits, 0);
    const pct = Math.min(Math.round(totalCredits / TARGET_CREDITS * 100), 100);

    document.getElementById('dashName').textContent = student.name;
    document.getElementById('dashRole').textContent = `${student.role} @ ${student.company}`;
    document.getElementById('dashTotalCredits').textContent = totalCredits;
    document.getElementById('dashGap').textContent = gap;
    document.getElementById('dashChartered').textContent = totalCredits >= TARGET_CREDITS && state.yearsExp >= 5 ? '✅' : '❌';

    const circumference = 2 * Math.PI * 85;
    const offset = circumference - (pct / 100) * circumference;
    document.getElementById('ringFill').style.strokeDashoffset = offset;
    document.getElementById('ringPct').textContent = pct + '%';

    document.getElementById('legendDiploma').textContent = state.diplomaCredits;
    document.getElementById('legendAdvanced').textContent = advCredits;
    document.getElementById('legendGap').textContent = gap;

    renderProgressList();
    renderTimeline();
  }

  function renderProgressList() {
    const container = document.getElementById('progressList');
    const subjects = getActiveSubjects();
    if (subjects.length === 0) {
      container.innerHTML = '<p class="path-empty">請先選擇職業方向</p>';
      return;
    }

    let html = '<div class="progress-group"><h3>核心科目</h3>';
    subjects.filter(s => s.category.startsWith('core')).forEach(s => {
      html += `<div class="progress-item ${state.passedSubjects.has(s.code) ? 'passed' : 'not-started'}">
        <div class="pi-status">${state.passedSubjects.has(s.code) ? '✅' : '📋'}</div>
        <div class="pi-info"><div class="pi-header"><strong>${s.code}</strong> ${s.nameEN}</div><div class="pi-detail">${s.credits} credits | ${s.assessmentLabel}</div></div>
        <div class="pi-credits">${state.passedSubjects.has(s.code) ? '+' + s.credits : '0'}</div>
      </div>`;
    });
    html += '</div>';

    html += '<div class="progress-group"><h3>選修科目</h3>';
    subjects.filter(s => s.category === 'elective' && !s.withdrawing).forEach(s => {
      html += `<div class="progress-item ${state.passedSubjects.has(s.code) ? 'passed' : 'not-started'}">
        <div class="pi-status">${state.passedSubjects.has(s.code) ? '✅' : '📋'}</div>
        <div class="pi-info"><div class="pi-header"><strong>${s.code}</strong> ${s.nameEN}</div><div class="pi-detail">${s.credits} credits | ${s.assessmentLabel}</div></div>
        <div class="pi-credits">${state.passedSubjects.has(s.code) ? '+' + s.credits : '0'}</div>
      </div>`;
    });
    html += '</div>';

    container.innerHTML = html;
  }

  function renderTimeline() {
    const container = document.getElementById('timeline');
    const path = calculateRecommendedPath();
    if (!path.subjects || path.subjects.length === 0) {
      container.innerHTML = path.gap === 0 ? '<div class="timeline-complete">🎉 已達標！</div>' : '<p class="path-empty">請先設定學員資料</p>';
      return;
    }

    let html = '';
    let weekOffset = 1;
    path.subjects.forEach((s, i) => {
      const endWeek = weekOffset + s.recommendedWeeks - 1;
      const isCore = s.category.startsWith('core');
      html += `
        <div class="timeline-item ${isCore ? 'core' : 'elective'}">
          <div class="tl-marker">${i + 1}</div>
          <div class="tl-content">
            <div class="tl-header"><strong>${s.code}</strong> ${s.nameEN} <span class="tl-tag ${isCore ? 'core' : 'elective'}">${isCore ? '核心' : '選修'}</span></div>
            <div class="tl-detail">${s.credits} credits | Week ${weekOffset}-${endWeek}</div>
          </div>
        </div>
      `;
      weekOffset = endWeek + 1;
    });
    html += `<div class="timeline-item finish"><div class="tl-marker">🏁</div><div class="tl-content"><div class="tl-header"><strong>完成！~${path.totalWeeks} 週</strong></div></div></div>`;
    container.innerHTML = html;
  }

  // ========== Event Listeners ==========
  function initEventListeners() {
    document.getElementById('diplomaCredits').addEventListener('input', function() {
      state.diplomaCredits = parseInt(this.value) || 0;
      updateCalculator();
    });
    document.getElementById('yearsExp').addEventListener('input', function() {
      state.yearsExp = parseInt(this.value) || 0;
      updateCalculator();
    });
  }

  // ========== Initialize ==========
  function init() {
    initTabs();
    renderPathwaySelection();
    renderLevelCards();
    renderDirectionSelection();
    renderRPLSection();
    renderSubjectGrid();
    renderSubjectTable(); // uses tableFilters state
    initFilterButtons();
    initRegisterForm();
    initEventListeners();
    updateCalculator();
  }

  document.addEventListener('DOMContentLoaded', init);
})();