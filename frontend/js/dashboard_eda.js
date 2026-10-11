/* ============================================================
   PsychHealth — Avishkar Research EDA Dashboard
   Exact Design & Layout from dashboard (10).html
   Powered strictly by the real empirical cohort dataset (N=234)
   ============================================================ */

const DashboardEDA = {
    charts: {},
    sortKey: null,
    sortDir: 1,
    prevShownCount: 234,
    kpiPrevValues: {},
    state: {
        course: "ALL",
        year: "ALL",
        wellbeing: "ALL",
        stress: "ALL",
        search: ""
    },

    getDataset() {
        return (window.COHORT_DATA && window.COHORT_DATA.length > 0)
            ? window.COHORT_DATA
            : (DATA.cohortResponses || []);
    },

    getFiltered() {
        const rows = this.getDataset();
        return rows.filter(r => {
            if (this.state.course !== "ALL" && r.course !== this.state.course) return false;
            if (this.state.year !== "ALL" && r.year !== this.state.year) return false;
            if (this.state.wellbeing !== "ALL" && r.pss_level !== this.state.wellbeing) return false;
            const stressSource = r.academic_stress_source || r.stressSource || '';
            if (this.state.stress !== "ALL" && stressSource !== this.state.stress) return false;
            if (this.state.search) {
                const q = this.state.search.toLowerCase();
                const match = (r.id || '').toLowerCase().includes(q) ||
                              (r.course || '').toLowerCase().includes(q) ||
                              (r.year || '').toLowerCase().includes(q) ||
                              (r.academic_stress_source || '').toLowerCase().includes(q) ||
                              (r.cgpa || '').toLowerCase().includes(q);
                if (!match) return false;
            }
            return true;
        });
    },

    pct(n, total) {
        return total ? Math.round((n / total) * 100) : 0;
    },

    animateNumber(el, from, to, duration = 500) {
        if (!el) return;
        const startVal = Number(from) || 0;
        const endVal = Number(to) || 0;
        const start = performance.now();
        function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(startVal + (endVal - startVal) * eased);
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = endVal;
        }
        requestAnimationFrame(tick);
    },

    renderHTML() {
        const allRows = this.getDataset();
        const totalN = allRows.length;

        return `
            <div class="eda-container animate-fade-in">
                <div class="eda-bg-mesh" aria-hidden="true">
                    <div class="field f1"></div>
                    <div class="field f2"></div>
                    <div class="field f3"></div>
                </div>

                <!-- Admin Session Control Topbar -->
                <div class="eda-admin-bar">
                    <div class="flex items-center gap-xs">
                        <span class="badge" style="background: rgba(16,185,129,0.2); color: #34d399; font-family: var(--font-data); font-size: 11px; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(16,185,129,0.3);">
                            ● Admin Session Active
                        </span>
                        <span class="text-xs text-secondary hidden sm:inline" style="color: #94a3b8;">
                            Restricted Researcher Mode · Avishkar Zonal Research
                        </span>
                    </div>
                    <div class="flex items-center gap-sm">
                        <button id="btn-eda-export-csv" class="btn btn-sm" style="background: var(--teal-600); color: #fff; font-size: 12px; padding: 6px 14px; border-radius: 6px; border:none; cursor:pointer;">
                            ↓ Export CSV (${totalN} records)
                        </button>
                        <button id="btn-eda-logout" class="btn btn-sm" style="background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); font-size: 12px; padding: 6px 12px; border-radius: 6px; cursor:pointer;">
                            Lock Portal
                        </button>
                        <a href="#/dashboard" class="btn btn-sm" style="background: rgba(255,255,255,0.1); color: #e2e8f0; font-size: 12px; padding: 6px 12px; border-radius: 6px; text-decoration:none;">
                            ← Student View
                        </a>
                    </div>
                </div>

                <!-- MASTHEAD -->
                <div class="eda-masthead">
                    <div class="eda-masthead-inner">
                        <div>
                            <div class="eda-badge"><span class="dot"></span>AVISHKAR • ZONAL LEVEL RESEARCH PROJECT</div>
                            <h1 class="eda-title">Student Mental Wellbeing Index</h1>
                            <p class="eda-subtitle">Academic Stress, Sleep, Screen Time &amp; Psychological Wellbeing Analysis</p>
                        </div>
                        <div class="eda-masthead-stats">
                            <div class="eda-mstat">
                                <div class="mstat-value" id="headerCount">${totalN}</div>
                                <div class="mstat-label">Survey Responses</div>
                                <div class="mstat-footnote">Empirical Cohen PSS-10 Dataset</div>
                            </div>
                            <div class="eda-mstat">
                                <div class="mstat-value">Akurdi · PCMC</div>
                                <div class="mstat-label">Study Area</div>
                            </div>
                            <div class="eda-mstat">
                                <div class="mstat-value">Descriptive</div>
                                <div class="mstat-label">Research Design</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="eda-shell">
                    <!-- RESEARCH OVERVIEW STRIP -->
                    <div class="eda-overview-strip">
                        <div class="eda-ov-card"><div class="ov-label">Research Focus</div><div class="ov-value">Academic Stress &amp; Psychological Wellbeing</div></div>
                        <div class="eda-ov-card"><div class="ov-label">Population</div><div class="ov-value">College Students</div></div>
                        <div class="eda-ov-card"><div class="ov-label">Study Area</div><div class="ov-value">Akurdi &amp; PCMC</div></div>
                        <div class="eda-ov-card"><div class="ov-label">Sample Size</div><div class="ov-value">n = <span id="sampleSizeStat">${totalN}</span></div></div>
                    </div>

                    <!-- STICKY SECTION NAV -->
                    <nav class="eda-section-nav">
                        <a href="#sec-overview"><b>01</b>Research Overview</a>
                        <a href="#sec-insights"><b>02</b>Key Research Insights</a>
                        <a href="#sec-stress"><b>03</b>Academic Stress Analysis</a>
                        <a href="#sec-wellbeing"><b>04</b>Mental Wellbeing Overview</a>
                        <a href="#sec-digital"><b>05</b>Digital &amp; Sleep Behaviour</a>
                        <a href="#sec-counselling"><b>06</b>Counselling &amp; Student Support</a>
                        <a href="#sec-data"><b>07</b>Respondent-Level Data</a>
                    </nav>

                    <!-- DATA EXPLORER FILTER BAR -->
                    <div class="eda-filterbar">
                        <div class="eda-filterbar-head">
                            <h2>Data Explorer</h2>
                            <span>Filters apply across all sections</span>
                        </div>
                        <div class="eda-filter-row">
                            <div class="eda-filter-group">
                                <label for="f-course">Course / Stream</label>
                                <select id="f-course"><option value="ALL">All courses</option></select>
                            </div>
                            <div class="eda-filter-group">
                                <label for="f-year">Year of Study</label>
                                <select id="f-year"><option value="ALL">All years</option></select>
                            </div>
                            <div class="eda-filter-group">
                                <label for="f-wellbeing">Perceived Stress Level</label>
                                <select id="f-wellbeing"><option value="ALL">All stress levels</option></select>
                            </div>
                            <div class="eda-filter-group">
                                <label for="f-stress">Academic Stress Source</label>
                                <select id="f-stress"><option value="ALL">All sources</option></select>
                            </div>
                            <div class="eda-filter-group" style="min-width: 180px;">
                                <label for="f-search">Search Respondent</label>
                                <input id="f-search" type="text" placeholder="Type ID, stream…">
                            </div>
                            <button class="eda-filter-reset" id="resetBtn">Reset Filters</button>
                            <div class="eda-filter-count">
                                Showing <strong id="shownCount">${totalN}</strong> of <span id="ofCount">${totalN}</span> respondents
                            </div>
                        </div>
                    </div>

                    <!-- 01 RESEARCH OVERVIEW -->
                    <section class="eda-section" id="sec-overview">
                        <div class="eda-section-head">
                            <span class="eda-section-num">01</span>
                            <h2>Research Overview</h2>
                            <span class="eda-section-sub">High-level sample metrics and standardized PSS distributions</span>
                        </div>

                        <div class="eda-kpi-row" id="kpiRow"></div>

                        <div class="eda-grid-2">
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Academic Pressure Frequency</h3>
                                    <span class="eda-panel-note">Self-Reported Pressure</span>
                                </div>
                                <div class="eda-chart-wrap tall"><canvas id="chartStressFreq"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Overall PSS-10 Stress Level Distribution</h3>
                                    <span class="eda-panel-note">Cohen Standardized Norms</span>
                                </div>
                                <div class="eda-chart-wrap tall"><canvas id="chartWellbeingDonut"></canvas></div>
                            </div>
                        </div>
                    </section>

                    <!-- 02 KEY RESEARCH INSIGHTS -->
                    <section class="eda-section" id="sec-insights">
                        <div class="eda-section-head">
                            <span class="eda-section-num">02</span>
                            <h2>Key Research Insights</h2>
                            <span class="eda-section-sub">Dynamically computed statistical highlights from respondent data</span>
                        </div>
                        <div class="eda-insight-grid" id="insightGrid"></div>
                    </section>

                    <!-- 03 ACADEMIC STRESS ANALYSIS -->
                    <section class="eda-section" id="sec-stress">
                        <div class="eda-section-head">
                            <span class="eda-section-num">03</span>
                            <h2>Academic Stress Analysis</h2>
                            <span class="eda-section-sub">Bivariate relationships across workload, deadlines, and concentration</span>
                        </div>
                        <div class="eda-grid-2x2">
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Academic Pressure Severity</h3>
                                    <span class="eda-panel-note">Pressure Categories</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartStressFreq2"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Procrastination Frequency</h3>
                                    <span class="eda-panel-note">Study Behaviour</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartExamAnxiety"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Primary Academic Stress Source</h3>
                                    <span class="eda-panel-note">Share of respondents</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartStressSource"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Concentration Difficulty</h3>
                                    <span class="eda-panel-note">During study sessions</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartConcentration"></canvas></div>
                            </div>
                        </div>
                    </section>

                    <!-- 04 MENTAL WELLBEING OVERVIEW -->
                    <section class="eda-section" id="sec-wellbeing">
                        <div class="eda-section-head">
                            <span class="eda-section-num">04</span>
                            <h2>Mental Wellbeing Overview</h2>
                            <span class="eda-section-sub">Perceived Stress Scale (PSS-10) Categorization Benchmarks</span>
                        </div>
                        <div class="eda-wellbeing-highlight" id="wellbeingHighlight"></div>
                    </section>

                    <!-- 05 DIGITAL & SLEEP BEHAVIOUR -->
                    <section class="eda-section" id="sec-digital">
                        <div class="eda-section-head">
                            <span class="eda-section-num">05</span>
                            <h2>Digital &amp; Sleep Behaviour</h2>
                            <span class="eda-section-sub">Lifestyle covariances and screen interference patterns</span>
                        </div>
                        <div class="eda-grid-2x2">
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Sleep Duration</h3>
                                    <span class="eda-panel-note">Hours / night</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartSleep"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Non-Academic Screen Time</h3>
                                    <span class="eda-panel-note">Hours / day</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartScreen"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Sleep vs. Screen Time Distribution</h3>
                                    <span class="eda-panel-note">Comparative cohort breakdown</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartSleepScreen"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Screen Interference with Study</h3>
                                    <span class="eda-panel-note">Focus Disruption</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartScreenConcentration"></canvas></div>
                            </div>
                        </div>
                    </section>

                    <!-- 06 COUNSELLING & STUDENT SUPPORT -->
                    <section class="eda-section" id="sec-counselling">
                        <div class="eda-section-head">
                            <span class="eda-section-num">06</span>
                            <h2>Counselling &amp; Student Support</h2>
                            <span class="eda-section-sub">Institutional awareness and professional help-seeking comfort</span>
                        </div>
                        <div class="eda-grid-1-2">
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Support Facility Awareness by Stream</h3>
                                    <span class="eda-panel-note">Yes / Not sure / No</span>
                                </div>
                                <div class="eda-chart-wrap tall"><canvas id="chartAwareness"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Comfort Seeking Professional Support</h3>
                                    <span class="eda-panel-note">Self-reported comfort level</span>
                                </div>
                                <div class="eda-chart-wrap tall"><canvas id="chartWillingness"></canvas></div>
                            </div>
                        </div>
                        <div class="eda-grid-2" style="margin-top: 16px;">
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Physical Activity Days Per Week</h3>
                                    <span class="eda-panel-note">Days with ≥30 mins activity</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartImportance"></canvas></div>
                            </div>
                            <div class="eda-panel">
                                <div class="eda-panel-head">
                                    <h3 class="eda-panel-title">Awareness vs. Help-Seeking Comfort</h3>
                                    <span class="eda-panel-note">Cross-tabulated covariance</span>
                                </div>
                                <div class="eda-chart-wrap"><canvas id="chartAwareVsWilling"></canvas></div>
                            </div>
                        </div>
                    </section>

                    <!-- 07 RESPONDENT-LEVEL DATA -->
                    <section class="eda-section" id="sec-data">
                        <div class="eda-section-head">
                            <span class="eda-section-num">07</span>
                            <h2>Respondent-Level Data</h2>
                            <span class="eda-section-sub">Individual survey responses • n = <span id="tableSubN">${totalN}</span></span>
                        </div>
                        <div class="eda-dataset-note">
                            <strong>Dataset Note:</strong> Full empirical dataset (N=234) collected under institutional survey protocol. Standardized Perceived Stress Scale (PSS-10) scored after reverse-coding items 4, 5, 7, and 8. Anonymous student identifiers protect respondent confidentiality.
                        </div>
                        <div class="eda-panel" style="padding: 12px;">
                            <div class="eda-table-scroll">
                                <table class="eda-table" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th data-key="id">ID <span class="arrow"></span></th>
                                            <th data-key="age_group">Age Group</th>
                                            <th data-key="year">Year</th>
                                            <th data-key="course">Course</th>
                                            <th data-key="cgpa">CGPA</th>
                                            <th data-key="pss_score">PSS Score</th>
                                            <th data-key="pss_level">Stress Level</th>
                                            <th data-key="sleep_hours">Sleep</th>
                                            <th data-key="screen_time">Screen</th>
                                            <th data-key="academic_stress_source">Stress Source</th>
                                            <th data-key="support_awareness">Awareness</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody"></tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <!-- FOOTER -->
                    <div class="eda-footer">
                        <div>
                            <div class="eda-footer-title">Student Mental Wellbeing Index — Research Dashboard</div>
                            <div class="eda-footer-meta">
                                Avishkar Zonal Level Student Research Competition<br>
                                Study Area: Akurdi &amp; PCMC &nbsp;·&nbsp; Research Design: Descriptive Cross-Sectional Survey<br>
                                Sample Size: n = <span id="footerN">${totalN}</span> verified respondents &nbsp;·&nbsp; Population: Undergraduate &amp; Postgraduate College Students
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <a href="#/dashboard" class="btn btn-secondary btn-sm" style="font-size: 11px;">Return to Student Portal →</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        const allRows = this.getDataset();
        const totalN = allRows.length;

        // 1. Populate Dropdown Filters
        const populateSelect = (id, values) => {
            const sel = document.getElementById(id);
            if (!sel) return;
            sel.innerHTML = `<option value="ALL">All</option>`;
            values.forEach(v => {
                if (!v) return;
                const opt = document.createElement('option');
                opt.value = v;
                opt.textContent = v;
                sel.appendChild(opt);
            });
        };

        const uniqueSorted = (arr, key) => [...new Set(arr.map(r => r[key]).filter(Boolean))].sort();

        populateSelect('f-course', uniqueSorted(allRows, 'course'));
        populateSelect('f-year', uniqueSorted(allRows, 'year'));
        populateSelect('f-wellbeing', ['Low', 'Moderate', 'High']);
        populateSelect('f-stress', uniqueSorted(allRows, 'academic_stress_source'));

        // 2. Set Static Header Counters
        ['ofCount', 'headerCount', 'sampleSizeStat', 'tableSubN', 'footerN'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = totalN;
        });

        // 3. Setup Chart.js Palette & Orders
        this.palette = {
            navy: "#15395E", navyDeep: "#132339", teal: "#166359", tealPale: "#CDE8E4",
            blue: "#4C6FA0", bluePale: "#D9E2F0", amber: "#B8822A", amberText: "#8C5F18", amberPale: "#F0DDB4",
            red: "#BE5347", redText: "#A2453A", redPale: "#F0CFC9"
        };

        this.pressureOrder = ["Very low", "Low", "Moderate", "High", "Very high"];
        this.pssLevelOrder = ["Low", "Moderate", "High"];
        this.concentrationOrder = ["Never", "Rarely", "Sometimes", "Often", "Very often"];
        this.sleepOrder = ["Less than 5 hours", "5–6 hours", "6–7 hours", "7–8 hours", "More than 8 hours"];
        this.screenOrder = ["Less than 2 hours", "2–4 hours", "4–6 hours", "6–8 hours", "More than 8 hours"];
        this.screenInterferenceOrder = ["Never", "Rarely", "Sometimes", "Often", "Very often"];
        this.stressSourceOrder = ["Examinations", "Assignments/projects", "Deadlines/workload", "Competition/comparison with others", "Fear of poor grades", "Family expectations", "Other"];
        this.comfortOrder = ["Very uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very comfortable"];
        this.activityOrder = ["0 days", "1–2 days", "3–4 days", "5–7 days"];

        // 4. Initialize Charts & Render Everything
        this.initCharts();
        this.refreshAll();
        this.bindEvents();
    },

    countBy(rows, key, order) {
        const counts = {};
        order.forEach(o => counts[o] = 0);
        rows.forEach(r => {
            const val = r[key] || r[key.toLowerCase()];
            if (counts[val] !== undefined) counts[val]++;
        });
        return order.map(o => counts[o] || 0);
    },

    makeBar(ctx, labels, data, color, horizontal = false) {
        if (!ctx) return null;
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: color,
                    borderRadius: 3,
                    maxBarThickness: 38
                }]
            },
            options: {
                indexAxis: horizontal ? 'y' : 'x',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: "#132339", padding: 10, titleFont: { weight: 600 } }
                },
                scales: horizontal
                    ? { x: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#EEF1F4" } }, y: { grid: { display: false } } }
                    : { y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#EEF1F4" } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } }
            }
        });
    },

    makeDonut(ctx, labels, data, colors) {
        if (!ctx) return null;
        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderColor: "#FFFFFF",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: window.innerWidth < 640 ? 'bottom' : 'right',
                        labels: { boxWidth: 10, padding: 9, font: { size: 11 } }
                    },
                    tooltip: { backgroundColor: "#132339", padding: 10 }
                }
            }
        });
    },

    initCharts() {
        if (typeof Chart === 'undefined') return;

        // Destroy existing instances if any
        Object.values(this.charts).forEach(c => { if (c && typeof c.destroy === 'function') c.destroy(); });
        this.charts = {};

        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.font.size = 11;
        Chart.defaults.color = "#51607A";
        Chart.defaults.animation = { duration: 600, easing: 'easeOutQuart' };

        const allRows = this.getDataset();

        // 1. Overview Charts
        this.charts.stressFreq = this.makeBar(document.getElementById('chartStressFreq'), this.pressureOrder, this.countBy(allRows, 'academic_pressure', this.pressureOrder), this.palette.navy);
        this.charts.wellbeingDonut = this.makeDonut(document.getElementById('chartWellbeingDonut'), this.pssLevelOrder, this.countBy(allRows, 'pss_level', this.pssLevelOrder), [this.palette.teal, this.palette.amber, this.palette.red]);

        // 2. Academic Stress Charts
        this.charts.stressFreq2 = this.makeBar(document.getElementById('chartStressFreq2'), this.pressureOrder, this.countBy(allRows, 'academic_pressure', this.pressureOrder), this.palette.navy);
        this.charts.examAnxiety = this.makeBar(document.getElementById('chartExamAnxiety'), this.concentrationOrder, this.countBy(allRows, 'procrastination', this.concentrationOrder), this.palette.blue);
        this.charts.stressSource = this.makeBar(document.getElementById('chartStressSource'), this.stressSourceOrder, this.countBy(allRows, 'academic_stress_source', this.stressSourceOrder), this.palette.teal, true);
        this.charts.concentration = this.makeBar(document.getElementById('chartConcentration'), this.concentrationOrder, this.countBy(allRows, 'concentration_difficulty', this.concentrationOrder), this.palette.amber);

        // 3. Digital & Sleep Charts
        this.charts.sleep = this.makeBar(document.getElementById('chartSleep'), this.sleepOrder, this.countBy(allRows, 'sleep_hours', this.sleepOrder), this.palette.navy);
        this.charts.screen = this.makeBar(document.getElementById('chartScreen'), this.screenOrder, this.countBy(allRows, 'screen_time', this.screenOrder), this.palette.red);

        // Sleep vs Screen dual comparison
        const ctxSS = document.getElementById('chartSleepScreen');
        if (ctxSS) {
            this.charts.sleepScreen = new Chart(ctxSS, {
                type: 'bar',
                data: {
                    labels: ["Tier 1 (<5h / <2h)", "Tier 2 (5-6h / 2-4h)", "Tier 3 (6-7h / 4-6h)", "Tier 4 (7-8h / 6-8h)", "Tier 5 (>8h)"],
                    datasets: [
                        { label: 'Sleep Duration', data: this.countBy(allRows, 'sleep_hours', this.sleepOrder), backgroundColor: this.palette.navy, borderRadius: 3, maxBarThickness: 24 },
                        { label: 'Non-Acad Screen', data: this.countBy(allRows, 'screen_time', this.screenOrder), backgroundColor: this.palette.blue, borderRadius: 3, maxBarThickness: 24 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 10.5 } } },
                        tooltip: { backgroundColor: "#132339", padding: 10 }
                    },
                    scales: {
                        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#EEF1F4" } },
                        x: { grid: { display: false }, ticks: { font: { size: 9.5 } } }
                    }
                }
            });
        }

        this.charts.screenConcentration = this.makeBar(document.getElementById('chartScreenConcentration'), this.screenInterferenceOrder, this.countBy(allRows, 'screen_interference', this.screenInterferenceOrder), this.palette.amber);

        // 4. Support Charts
        const streams = [...new Set(allRows.map(r => r.course).filter(Boolean))].slice(0, 5);
        const ctxAware = document.getElementById('chartAwareness');
        if (ctxAware) {
            this.charts.awareness = new Chart(ctxAware, {
                type: 'bar',
                data: {
                    labels: streams.map(s => s.length > 20 ? s.slice(0, 18) + '…' : s),
                    datasets: [
                        { label: 'Yes', data: streams.map(s => allRows.filter(r => r.course === s && r.support_awareness === 'Yes').length), backgroundColor: this.palette.teal, stack: 's' },
                        { label: 'Not sure', data: streams.map(s => allRows.filter(r => r.course === s && r.support_awareness === 'Not sure').length), backgroundColor: this.palette.amber, stack: 's' },
                        { label: 'No', data: streams.map(s => allRows.filter(r => r.course === s && r.support_awareness === 'No').length), backgroundColor: this.palette.red, stack: 's' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 10.5 } } },
                        tooltip: { backgroundColor: "#132339", padding: 10 }
                    },
                    scales: {
                        x: { stacked: true, beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#EEF1F4" } },
                        y: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 } } }
                    }
                }
            });
        }

        this.charts.willingness = this.makeBar(document.getElementById('chartWillingness'), this.comfortOrder, this.countBy(allRows, 'help_seeking_comfort', this.comfortOrder), this.palette.teal, true);
        this.charts.importance = this.makeBar(document.getElementById('chartImportance'), this.activityOrder, this.countBy(allRows, 'physical_activity', this.activityOrder), this.palette.navy);

        const ctxAW = document.getElementById('chartAwareVsWilling');
        if (ctxAW) {
            this.charts.awareVsWilling = new Chart(ctxAW, {
                type: 'bar',
                data: {
                    labels: ['Aware of Support', 'Unaware / Unsure'],
                    datasets: [
                        {
                            label: 'Comfortable (Comfortable/Very Comfortable)',
                            data: [
                                allRows.filter(r => r.support_awareness === 'Yes' && ['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length,
                                allRows.filter(r => r.support_awareness !== 'Yes' && ['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length
                            ],
                            backgroundColor: this.palette.teal,
                            borderRadius: 3
                        },
                        {
                            label: 'Uncomfortable / Neutral',
                            data: [
                                allRows.filter(r => r.support_awareness === 'Yes' && !['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length,
                                allRows.filter(r => r.support_awareness !== 'Yes' && !['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length
                            ],
                            backgroundColor: this.palette.redPale,
                            borderRadius: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 10 } } },
                        tooltip: { backgroundColor: "#132339", padding: 10 }
                    },
                    scales: {
                        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#EEF1F4" } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }
    },

    updateCharts() {
        const rows = this.getFiltered();
        if (!this.charts.stressFreq) return;

        this.charts.stressFreq.data.datasets[0].data = this.countBy(rows, 'academic_pressure', this.pressureOrder);
        this.charts.stressFreq.update();

        this.charts.wellbeingDonut.data.datasets[0].data = this.countBy(rows, 'pss_level', this.pssLevelOrder);
        this.charts.wellbeingDonut.update();

        this.charts.stressFreq2.data.datasets[0].data = this.countBy(rows, 'academic_pressure', this.pressureOrder);
        this.charts.stressFreq2.update();

        this.charts.examAnxiety.data.datasets[0].data = this.countBy(rows, 'procrastination', this.concentrationOrder);
        this.charts.examAnxiety.update();

        this.charts.stressSource.data.datasets[0].data = this.countBy(rows, 'academic_stress_source', this.stressSourceOrder);
        this.charts.stressSource.update();

        this.charts.concentration.data.datasets[0].data = this.countBy(rows, 'concentration_difficulty', this.concentrationOrder);
        this.charts.concentration.update();

        this.charts.sleep.data.datasets[0].data = this.countBy(rows, 'sleep_hours', this.sleepOrder);
        this.charts.sleep.update();

        this.charts.screen.data.datasets[0].data = this.countBy(rows, 'screen_time', this.screenOrder);
        this.charts.screen.update();

        if (this.charts.sleepScreen) {
            this.charts.sleepScreen.data.datasets[0].data = this.countBy(rows, 'sleep_hours', this.sleepOrder);
            this.charts.sleepScreen.data.datasets[1].data = this.countBy(rows, 'screen_time', this.screenOrder);
            this.charts.sleepScreen.update();
        }

        if (this.charts.screenConcentration) {
            this.charts.screenConcentration.data.datasets[0].data = this.countBy(rows, 'screen_interference', this.screenInterferenceOrder);
            this.charts.screenConcentration.update();
        }

        if (this.charts.willingness) {
            this.charts.willingness.data.datasets[0].data = this.countBy(rows, 'help_seeking_comfort', this.comfortOrder);
            this.charts.willingness.update();
        }

        if (this.charts.importance) {
            this.charts.importance.data.datasets[0].data = this.countBy(rows, 'physical_activity', this.activityOrder);
            this.charts.importance.update();
        }

        if (this.charts.awareVsWilling) {
            this.charts.awareVsWilling.data.datasets[0].data = [
                rows.filter(r => r.support_awareness === 'Yes' && ['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length,
                rows.filter(r => r.support_awareness !== 'Yes' && ['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length
            ];
            this.charts.awareVsWilling.data.datasets[1].data = [
                rows.filter(r => r.support_awareness === 'Yes' && !['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length,
                rows.filter(r => r.support_awareness !== 'Yes' && !['Comfortable', 'Very comfortable'].includes(r.help_seeking_comfort)).length
            ];
            this.charts.awareVsWilling.update();
        }
    },

    renderKPIs() {
        const rows = this.getFiltered();
        const container = document.getElementById('kpiRow');
        if (!container) return;
        const firstRender = container.children.length === 0;

        const kpiDefs = [
            {
                key: 'total', label: 'Total Respondents', icon: '◆', accent: this.palette.navy,
                compute: r => ({ value: r.length, unit: '', sub: 'Verified Empirical Dataset' })
            },
            {
                key: 'stressed', label: 'Elevated Perceived Stress', icon: '▲', accent: this.palette.red,
                compute: r => {
                    const n = r.filter(x => x.pss_level === 'High' || ['High', 'Very high'].includes(x.academic_pressure)).length;
                    return { value: this.pct(n, r.length), unit: '%', sub: `${n} of ${r.length} report high pressure/PSS` };
                }
            },
            {
                key: 'sleep', label: 'Sleeping Below 6h', icon: '●', accent: this.palette.blue,
                compute: r => {
                    const n = r.filter(x => ['Less than 5 hours', '5–6 hours'].includes(x.sleep_hours)).length;
                    return { value: this.pct(n, r.length), unit: '%', sub: `${n} report insufficient sleep duration` };
                }
            },
            {
                key: 'screen', label: 'Heavy Screen Use (>6h)', icon: '■', accent: this.palette.amber,
                compute: r => {
                    const n = r.filter(x => ['6–8 hours', 'More than 8 hours'].includes(x.screen_time)).length;
                    return { value: this.pct(n, r.length), unit: '%', sub: `${n} exceed 6h non-academic screen use` };
                }
            },
            {
                key: 'willing', label: 'Aware of Campus Support', icon: '✓', accent: this.palette.teal,
                compute: r => {
                    const n = r.filter(x => x.support_awareness === 'Yes').length;
                    return { value: this.pct(n, r.length), unit: '%', sub: `${n} confirm counselling awareness` };
                }
            }
        ];

        kpiDefs.forEach((def, i) => {
            const r = def.compute(rows);
            const prevVal = this.kpiPrevValues[def.key] ?? 0;

            if (firstRender) {
                const card = document.createElement('div');
                card.className = 'eda-kpi-card';
                card.style.setProperty('--kpi-accent', def.accent);
                card.innerHTML = `
                    <div class="eda-kpi-label"><span>${def.label}</span><span class="eda-kpi-icon">${def.icon}</span></div>
                    <div class="eda-kpi-value"><span class="kpi-num" id="kpi-num-${def.key}">0</span><span class="unit">${r.unit}</span></div>
                    <div class="eda-kpi-sub" id="kpi-sub-${def.key}">${r.sub}</div>
                `;
                container.appendChild(card);
                this.animateNumber(document.getElementById('kpi-num-' + def.key), 0, r.value);
            } else {
                this.animateNumber(document.getElementById('kpi-num-' + def.key), prevVal, r.value);
                const subEl = document.getElementById('kpi-sub-' + def.key);
                if (subEl) subEl.textContent = r.sub;
            }
            this.kpiPrevValues[def.key] = r.value;
        });
    },

    renderInsights() {
        const rows = this.getFiltered();
        const container = document.getElementById('insightGrid');
        if (!container) return;
        container.innerHTML = '';

        const insightDefs = [
            {
                key: 'stress', label: 'Academic Pressure & PSS', accent: this.palette.redText,
                compute: r => {
                    const n = r.filter(x => x.pss_level === 'High' || ['High', 'Very high'].includes(x.academic_pressure)).length;
                    const p = this.pct(n, r.length);
                    return `<span class="num">${p}%</span> of students experience high perceived stress or acute academic workload pressure.`;
                }
            },
            {
                key: 'sleep', label: 'Sleep Deprivation', accent: this.palette.blue,
                compute: r => {
                    const n = r.filter(x => ['Less than 5 hours', '5–6 hours'].includes(x.sleep_hours)).length;
                    const p = this.pct(n, r.length);
                    return `<span class="num">${p}%</span> report sleeping under 6 hours nightly, correlating with morning cognitive fatigue.`;
                }
            },
            {
                key: 'screen', label: 'Digital Disruption', accent: this.palette.amberText,
                compute: r => {
                    const n = r.filter(x => ['Often', 'Very often'].includes(x.screen_interference)).length;
                    const p = this.pct(n, r.length);
                    return `<span class="num">${p}%</span> report non-academic screen use directly disrupts study concentration.`;
                }
            },
            {
                key: 'awareness', label: 'Counselling Awareness', accent: this.palette.teal,
                compute: r => {
                    const n = r.filter(x => x.support_awareness === 'Yes').length;
                    const p = this.pct(n, r.length);
                    return `<span class="num">${p}%</span> of respondents are aware of available institutional counselling support.`;
                }
            }
        ];

        insightDefs.forEach((def, i) => {
            const card = document.createElement('div');
            card.className = 'eda-insight-card';
            card.style.setProperty('--insight-accent', def.accent);
            card.innerHTML = `<div class="eda-insight-label">${def.label}</div><div class="eda-insight-text">${def.compute(rows)}</div>`;
            container.appendChild(card);
        });
    },

    renderWellbeingHighlight() {
        const rows = this.getFiltered();
        const container = document.getElementById('wellbeingHighlight');
        if (!container) return;

        const wbColors = { Low: this.palette.teal, Moderate: this.palette.amber, High: this.palette.red };
        const wbRanges = { Low: 'PSS 0–13 (Mild / Regulated)', Moderate: 'PSS 14–26 (Moderate Perceived Stress)', High: 'PSS 27–40 (High Perceived Stress)' };

        container.innerHTML = this.pssLevelOrder.map((label) => {
            const n = rows.filter(r => r.pss_level === label).length;
            const p = this.pct(n, rows.length);
            return `
                <div class="eda-wb-row">
                    <div>
                        <div class="eda-wb-name">${label} Stress</div>
                        <div style="font-size: 10px; color: var(--ink-faint); font-family: var(--font-data);">${wbRanges[label]}</div>
                    </div>
                    <div class="eda-wb-track"><div class="eda-wb-fill" style="width:${p}%; background:${wbColors[label]};"></div></div>
                    <div class="eda-wb-stats"><strong>${n}</strong> · ${p}%</div>
                </div>`;
        }).join('');
    },

    renderTable() {
        let rows = this.getFiltered();
        const tbody = document.getElementById('tableBody');
        const shownCount = document.getElementById('shownCount');
        if (!tbody) return;

        if (this.sortKey) {
            rows = [...rows].sort((a, b) => {
                let av = a[this.sortKey], bv = b[this.sortKey];
                if (this.sortKey === 'pss_score') return (Number(av) - Number(bv)) * this.sortDir;
                return String(av || '').localeCompare(String(bv || '')) * this.sortDir;
            });
        }

        if (shownCount) {
            this.animateNumber(shownCount, this.prevShownCount, rows.length, 300);
            this.prevShownCount = rows.length;
        }

        if (rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; padding: 32px; color: var(--ink-soft);">No cohort records match these active filters. Try widening your filter selection.</td></tr>';
            return;
        }

        tbody.innerHTML = rows.map((r) => `
            <tr>
                <td class="font-bold">${r.id}</td>
                <td>${r.age_group || ''}</td>
                <td>${r.year || ''}</td>
                <td>${r.course || ''}</td>
                <td>${r.cgpa || ''}</td>
                <td class="font-bold" style="color: var(--navy-900);">${r.pss_score}</td>
                <td>
                    <span class="eda-pill ${r.pss_level === 'Low' ? 'good' : r.pss_level === 'Moderate' ? 'avg' : 'poor'}">
                        ${r.pss_level}
                    </span>
                </td>
                <td>${r.sleep_hours || ''}</td>
                <td>${r.screen_time || ''}</td>
                <td>${r.academic_stress_source || ''}</td>
                <td>${r.support_awareness || ''}</td>
            </tr>
        `).join('');
    },

    refreshAll() {
        this.renderKPIs();
        this.renderInsights();
        this.renderWellbeingHighlight();
        this.updateCharts();
        this.renderTable();
    },

    bindEvents() {
        const selCourse = document.getElementById('f-course');
        const selYear = document.getElementById('f-year');
        const selWellbeing = document.getElementById('f-wellbeing');
        const selStress = document.getElementById('f-stress');
        const inpSearch = document.getElementById('f-search');
        const btnReset = document.getElementById('resetBtn');

        if (selCourse) selCourse.onchange = e => { this.state.course = e.target.value; this.refreshAll(); };
        if (selYear) selYear.onchange = e => { this.state.year = e.target.value; this.refreshAll(); };
        if (selWellbeing) selWellbeing.onchange = e => { this.state.wellbeing = e.target.value; this.refreshAll(); };
        if (selStress) selStress.onchange = e => { this.state.stress = e.target.value; this.refreshAll(); };
        if (inpSearch) inpSearch.oninput = e => { this.state.search = e.target.value; this.refreshAll(); };

        if (btnReset) {
            btnReset.onclick = () => {
                this.state = { course: "ALL", year: "ALL", wellbeing: "ALL", stress: "ALL", search: "" };
                if (selCourse) selCourse.value = 'ALL';
                if (selYear) selYear.value = 'ALL';
                if (selWellbeing) selWellbeing.value = 'ALL';
                if (selStress) selStress.value = 'ALL';
                if (inpSearch) inpSearch.value = '';
                this.refreshAll();
            };
        }

        // Table Header Click Sorting
        document.querySelectorAll('#dataTable thead th').forEach(th => {
            th.onclick = () => {
                const key = th.dataset.key;
                if (!key) return;
                if (this.sortKey === key) {
                    this.sortDir *= -1;
                } else {
                    this.sortKey = key;
                    this.sortDir = 1;
                }
                document.querySelectorAll('#dataTable thead th .arrow').forEach(a => a.textContent = '');
                const arrow = th.querySelector('.arrow');
                if (arrow) arrow.textContent = this.sortDir === 1 ? ' ▲' : ' ▼';
                this.renderTable();
            };
        });

        // CSV Export button
        const btnExport = document.getElementById('btn-eda-export-csv');
        if (btnExport) {
            btnExport.onclick = () => {
                const rows = this.getFiltered();
                const headers = ["id","timestamp","age_group","year","course","gender","cgpa","pss_score","pss_level","sleep_hours","sleep_quality","screen_time","screen_interference","physical_activity","academic_pressure","academic_stress_source","study_hours","procrastination","concentration_difficulty","support_awareness","help_seeking_comfort"];
                const csvLines = [headers.join(',')];
                rows.forEach(r => {
                    const line = headers.map(h => {
                        const val = String(r[h] ?? '').replace(/"/g, '""');
                        return `"${val}"`;
                    }).join(',');
                    csvLines.push(line);
                });
                const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `PsychHealth_Cohort_N${rows.length}_Export.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            };
        }

        // Lock / Logout Admin
        const btnLogout = document.getElementById('btn-eda-logout');
        if (btnLogout) {
            btnLogout.onclick = () => {
                AppState.setAdminAuthenticated(false);
                if (window.App && typeof window.App.handleRoute === 'function') {
                    window.App.handleRoute();
                } else {
                    window.location.hash = '#/researcher';
                }
            };
        }
    }
};

window.DashboardEDA = DashboardEDA;
