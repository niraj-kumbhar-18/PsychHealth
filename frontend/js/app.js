/* ============================================================
   PsychHealth — Core Application Controller & Router
   Mobile-First SPA with Responsive Sidebar Drawer & Touch Handlers
   ============================================================ */

const App = {
    currentRoute: '',

    init() {
        AppState.init();
        this.setupNavigation();
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    setupNavigation() {
        // Mobile Drawer Toggle Buttons
        const menuBtn = document.getElementById('btn-mobile-menu');
        const closeBtn = document.getElementById('btn-sidebar-close');
        const backdrop = document.getElementById('sidebar-backdrop');
        const sidebar = document.getElementById('app-sidebar');

        const openDrawer = () => {
            if (sidebar) sidebar.classList.add('open');
            if (backdrop) backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeDrawer = () => {
            if (sidebar) sidebar.classList.remove('open');
            if (backdrop) backdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (menuBtn) menuBtn.onclick = openDrawer;
        if (closeBtn) closeBtn.onclick = closeDrawer;
        if (backdrop) backdrop.onclick = closeDrawer;

        // Theme Toggle Buttons (Sidebar & Mobile Header)
        const themeBtnDesktop = document.getElementById('btn-theme');
        const themeBtnMobile = document.getElementById('btn-theme-mobile');

        const handleThemeToggle = () => {
            const next = AppState.toggleTheme();
            this.updateThemeButtons(next);
        };

        if (themeBtnDesktop) themeBtnDesktop.onclick = handleThemeToggle;
        if (themeBtnMobile) themeBtnMobile.onclick = handleThemeToggle;
        this.updateThemeButtons(AppState.getTheme());

        // Reset Session Button
        const resetBtn = document.getElementById('btn-reset-data');
        if (resetBtn) {
            resetBtn.onclick = () => {
                if (confirm('Reset all assessment session data and habit logs?')) {
                    AppState.clearAll();
                }
            };
        }

        // Render Sidebar Navigation Links
        this.renderSidebarNav();
    },

    updateThemeButtons(theme) {
        const themeBtnDesktop = document.getElementById('btn-theme');
        const themeBtnMobile = document.getElementById('btn-theme-mobile');
        const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
        const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

        const icon = theme === 'dark' ? sunIcon : moonIcon;
        const title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

        if (themeBtnDesktop) {
            themeBtnDesktop.innerHTML = icon;
            themeBtnDesktop.setAttribute('title', title);
        }
        if (themeBtnMobile) {
            themeBtnMobile.innerHTML = icon;
            themeBtnMobile.setAttribute('title', title);
        }
    },

    renderSidebarNav() {
        const nav = document.getElementById('sidebar-nav');
        if (!nav) return;
        const hasAssessed = AppState.hasCompletedAssessment();
        const p = AppState.getProfile();

        // Update profile badge
        const sub = document.getElementById('sidebar-profile-sub');
        const activeId = AppState.getActiveStudentId();
        if (sub) {
            sub.textContent = AppState.isLoggedIn() ? (p.course ? `${p.course} (${activeId})` : `Active (${activeId})`) : 'Not Logged In';
        }
        const partTitle = document.querySelector('.participant-title');
        if (partTitle) {
            partTitle.textContent = AppState.isLoggedIn() ? (p.name || 'Student Account') : 'Guest Session';
        }
        const partBadge = document.getElementById('sidebar-participant');
        if (partBadge) {
            partBadge.style.cursor = 'pointer';
            partBadge.setAttribute('title', AppState.isLoggedIn() ? 'View / Edit Student Profile' : 'Log In to Account');
            partBadge.onclick = () => {
                window.location.hash = AppState.isLoggedIn() ? '#/profile' : '#/login';
            };
        }

        nav.innerHTML = `
            <div class="nav-section-title">Core</div>
            <a href="#/dashboard" class="sidebar-link" data-route="dashboard">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                <span>Dashboard</span>
            </a>
            <a href="#/pss" class="sidebar-link" data-route="pss">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span>Take PSS Assessment</span>
            </a>
            <a href="#/profile" class="sidebar-link" data-route="profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Student Profile</span>
            </a>

            <div class="nav-section-title mt-xs">Insights</div>
            <a href="#/results" class="sidebar-link ${!hasAssessed ? 'opacity-50' : ''}" data-route="results">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Results Report</span>
            </a>
            <a href="#/recommendations" class="sidebar-link ${!hasAssessed ? 'opacity-50' : ''}" data-route="recommendations">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
                <span>Personalized Guidance</span>
            </a>
            <a href="#/simulator" class="sidebar-link" data-route="simulator">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12H3"/><path d="m15 6 6 6-6 6"/><path d="M3 12a9 9 0 0 1 9-9"/></svg>
                <span>What-If Simulator</span>
            </a>

            <div class="nav-section-title mt-xs">Interventions</div>
            <a href="#/plan" class="sidebar-link" data-route="plan">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span>7-Day Experiments</span>
            </a>
            <a href="#/tracking" class="sidebar-link" data-route="tracking">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                <span>Daily Habit Log</span>
            </a>
            <a href="#/progress" class="sidebar-link" data-route="progress">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                <span>Progress Trends</span>
            </a>

            <div class="nav-section-title mt-xs">Administration</div>
            <a href="#/researcher" class="sidebar-link" data-route="researcher">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Research Portal (Admin)</span>
            </a>

            <div class="nav-section-title mt-xs">Account</div>
            ${AppState.isLoggedIn() ? `
                <a href="#/login" class="sidebar-link" id="btn-sidebar-logout" style="color: #ef4444;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    <span>Log Out (${AppState.getActiveStudentId()})</span>
                </a>
            ` : `
                <a href="#/login" class="sidebar-link" data-route="login">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    <span>Student Login</span>
                </a>
                <a href="#/register" class="sidebar-link" data-route="register">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                    <span>Register New</span>
                </a>
            `}
        `;

        // Automatically close mobile drawer when any link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.onclick = (e) => {
                if (link.id === 'btn-sidebar-logout') {
                    e.preventDefault();
                    AppState.logoutStudent();
                    window.location.hash = '#/login';
                    return;
                }
                const sidebar = document.getElementById('app-sidebar');
                const backdrop = document.getElementById('sidebar-backdrop');
                if (sidebar) sidebar.classList.remove('open');
                if (backdrop) backdrop.classList.remove('active');
                document.body.style.overflow = '';
            };
        });
    },

    handleRoute() {
        const rawHash = window.location.hash.slice(1);
        let route = rawHash.startsWith('/') ? rawHash.slice(1) : rawHash;

        // Smart route default for Logged in vs Logged out user
        if (!route) {
            if (AppState.isLoggedIn()) {
                window.location.hash = '#/dashboard';
                return;
            } else {
                route = 'landing';
            }
        }

        // Protected routes check
        const protectedRoutes = ['dashboard', 'pss', 'lifestyle', 'academic', 'support', 'processing', 'results', 'plan', 'tracking', 'progress', 'simulator', 'profile'];
        if (protectedRoutes.includes(route) && !AppState.isLoggedIn()) {
            window.location.hash = '#/login';
            return;
        }

        // Keep pss question in valid range when entering assessment
        if (route === 'pss') {
            if (!Screens.pssCurrentQuestion || Screens.pssCurrentQuestion < 1 || Screens.pssCurrentQuestion > 10) {
                Screens.pssCurrentQuestion = 1;
            }
        }

        this.currentRoute = route;

        const main = document.getElementById('main');
        if (!main) return;

        // Re-render sidebar to update active indicators
        this.renderSidebarNav();
        this.updateNavLinks(route);

        switch (route) {
            case 'landing':
            case '':
                main.innerHTML = Screens.renderSplash();
                this.bindSplashEvents();
                break;

            case 'login':
                main.innerHTML = Screens.renderLogin();
                this.bindLoginEvents();
                break;

            case 'register':
                main.innerHTML = Screens.renderRegister();
                this.bindRegisterEvents();
                break;

            case 'onboarding':
                main.innerHTML = Screens.renderOnboarding();
                this.bindOnboardingEvents();
                break;

            case 'consent':
                main.innerHTML = Screens.renderConsent();
                this.bindConsentEvents();
                break;

            case 'profile':
                main.innerHTML = Screens.renderProfile();
                this.bindProfileEvents();
                break;

            case 'dashboard':
                main.innerHTML = Screens.renderDashboard();
                this.bindDashboardEvents();
                break;

            case 'pss':
                main.innerHTML = Screens.renderPSS();
                this.bindPSSEvents();
                break;

            case 'lifestyle':
                main.innerHTML = Screens.renderLifestyle();
                this.bindLifestyleEvents();
                break;

            case 'academic':
                main.innerHTML = Screens.renderAcademic();
                this.bindAcademicEvents();
                break;

            case 'support':
                main.innerHTML = Screens.renderSupport();
                this.bindSupportEvents();
                break;

            case 'processing':
                main.innerHTML = Screens.renderProcessing();
                this.animateProcessingStages();
                break;

            case 'results':
                main.innerHTML = Screens.renderResults();
                this.animateGaugeCounter();
                break;

            case 'recommendations':
                main.innerHTML = Screens.renderRecommendations();
                break;

            case 'plan':
                main.innerHTML = Screens.renderPlan();
                this.bindPlanEvents();
                break;

            case 'tracking':
                main.innerHTML = Screens.renderTracking();
                this.bindTrackingEvents();
                break;

            case 'progress':
                main.innerHTML = Screens.renderProgress();
                setTimeout(() => {
                    Charts.renderStressTrend('progress-curve-canvas', AppState.getAssessments());
                    Charts.renderLifestyleTrends('lifestyle-trend-canvas', AppState.getHabitLog());
                }, 60);
                break;

            case 'simulator':
                main.innerHTML = Screens.renderSimulator();
                this.bindSimulatorEvents();
                break;

            case 'researcher':
                main.innerHTML = Screens.renderResearcher();
                this.bindResearcherEvents();
                break;

            case 'methodology':
                window.location.hash = '#/researcher';
                return;

            default:
                window.location.hash = '#/';
                break;
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
    },

    updateNavLinks(route) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            const r = link.getAttribute('data-route');
            if (r === route) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    /* --- Event Bindings --- */

    bindSplashEvents() {
        const btnLogout = document.getElementById('btn-splash-logout');
        if (btnLogout) {
            btnLogout.onclick = () => {
                AppState.logoutStudent();
                window.location.hash = '#/login';
            };
        }
    },

    bindLoginEvents() {
        const form = document.getElementById('form-student-login');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const idInput = document.getElementById('login-student-id');
                const pwdInput = document.getElementById('login-password');
                const errDiv = document.getElementById('login-error-msg');

                const sid = idInput ? idInput.value.trim() : '';
                const pwd = pwdInput ? pwdInput.value.trim() : '';

                const res = await AppState.loginStudent(sid, pwd);
                if (res.success) {
                    window.location.hash = '#/dashboard';
                } else {
                    if (errDiv) {
                        errDiv.textContent = res.message || 'Invalid Student ID or password.';
                        errDiv.style.display = 'block';
                    }
                }
            };
        }
    },

    bindRegisterEvents() {
        const form = document.getElementById('form-student-register');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const sid = formData.get('student_id');
                const pwd = formData.get('password');
                const name = formData.get('name');
                const errDiv = document.getElementById('reg-error-msg');

                const profileData = {
                    name: name,
                    course: formData.get('course'),
                    year: formData.get('year'),
                    gender: formData.get('gender'),
                    age_group: formData.get('age_group'),
                    academic_performance: formData.get('academic_performance')
                };

                const res = AppState.registerStudent(sid, pwd, profileData);
                if (res.success) {
                    Screens.onboardingStep = 1;
                    Screens.pssCurrentQuestion = 1;
                    window.location.hash = '#/onboarding';
                } else {
                    if (errDiv) {
                        errDiv.textContent = res.message || 'Registration failed.';
                        errDiv.style.display = 'block';
                    }
                }
            };
        }
    },

    bindDashboardEvents() {
        const btnLogout = document.getElementById('btn-dash-logout');
        if (btnLogout) {
            btnLogout.onclick = () => {
                AppState.logoutStudent();
                window.location.hash = '#/login';
            };
        }
    },

    bindResearcherEvents() {
        // Admin Login Form
        const formLogin = document.getElementById('form-admin-login');
        if (formLogin) {
            formLogin.onsubmit = (e) => {
                e.preventDefault();
                const keyInput = document.getElementById('admin-key-input');
                const errDiv = document.getElementById('admin-login-error');
                const val = keyInput ? keyInput.value.trim() : '';
                // Accepted passcodes: admin123, admin, research2026
                if (val === 'admin123' || val === 'admin' || val === 'research2026') {
                    AppState.setAdminAuthenticated(true);
                    this.handleRoute();
                } else {
                    if (errDiv) errDiv.style.display = 'block';
                    if (keyInput) keyInput.focus();
                }
            };
            return;
        }

        // Authenticated Researcher Portal Controls
        const btnLogout = document.getElementById('btn-admin-logout');
        if (btnLogout) {
            btnLogout.onclick = () => {
                AppState.setAdminAuthenticated(false);
                this.handleRoute();
            };
        }

        // CSV Export functionality
        const btnExport = document.getElementById('btn-export-cohort-csv');
        if (btnExport) {
            btnExport.onclick = () => {
                const cohort = DATA.cohortResponses;
                const headers = ['ID', 'Age', 'Gender', 'Course', 'CGPA', 'PSS_Score', 'PSS_Level', 'Sleep', 'Screen', 'Primary_Stressor'];
                const rows = cohort.map(c => [
                    c.id,
                    `"${c.age}"`,
                    `"${c.gender}"`,
                    `"${c.course}"`,
                    `"${c.cgpa}"`,
                    c.pss_score,
                    `"${c.pss_level}"`,
                    `"${c.sleep}"`,
                    `"${c.screen}"`,
                    `"${c.source}"`
                ]);
                const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `psychhealth_cohort_n16_${new Date().toISOString().slice(0, 10)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        }

        // Search & Filter in Cohort Table
        const searchInput = document.getElementById('cohort-search');
        const filterSelect = document.getElementById('cohort-filter-level');
        const countLabel = document.getElementById('cohort-count-label');
        const rows = document.querySelectorAll('#cohort-data-table tbody tr');

        const filterTable = () => {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const selectedLevel = filterSelect ? filterSelect.value : 'All';
            let visibleCount = 0;

            rows.forEach(row => {
                const level = row.dataset.level || '';
                const searchData = row.dataset.search || '';
                const matchesLevel = (selectedLevel === 'All' || level === selectedLevel);
                const matchesSearch = (!query || searchData.includes(query) || row.textContent.toLowerCase().includes(query));

                if (matchesLevel && matchesSearch) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });

            if (countLabel) {
                countLabel.textContent = `Displaying ${visibleCount} of ${rows.length} students`;
            }
        };

        if (searchInput) searchInput.oninput = filterTable;
        if (filterSelect) filterSelect.onchange = filterTable;
    },

    bindConsentEvents() {
        const agreeCheckbox = document.getElementById('consent-agree');
        const checkboxes = [
            document.getElementById('consent-1'),
            document.getElementById('consent-2'),
            document.getElementById('consent-3'),
            document.getElementById('consent-4')
        ];
        const agreeBtn = document.getElementById('btn-consent-agree');

        if (agreeCheckbox && agreeBtn) {
            agreeCheckbox.onchange = () => {
                agreeBtn.disabled = !agreeCheckbox.checked;
            };
        } else if (agreeBtn && checkboxes.some(cb => cb)) {
            const checkAll = () => {
                const allChecked = checkboxes.every(cb => cb && cb.checked);
                agreeBtn.disabled = !allChecked;
            };
            checkboxes.forEach(cb => {
                if (cb) cb.onchange = checkAll;
            });
        }

        if (agreeBtn) {
            agreeBtn.onclick = () => {
                AppState.setConsented(true);
                const p = AppState.getProfile();
                if (p && p.name && p.course) {
                    Screens.pssCurrentQuestion = 1;
                    window.location.hash = '#/pss';
                } else {
                    window.location.hash = '#/profile';
                }
            };
        }
    },

    bindProfileEvents() {
        const form = document.getElementById('form-profile-setup');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const rawName = formData.get('name') ? formData.get('name').trim() : '';
                const p = {
                    name: rawName,
                    age_group: formData.get('age_group'),
                    gender: formData.get('gender'),
                    year: formData.get('year'),
                    course: formData.get('course'),
                    academic_performance: formData.get('academic_performance')
                };
                AppState.setProfile(p);
                Screens.pssCurrentQuestion = 1;
                window.location.hash = '#/pss';
            };
        }
    },

    bindOnboardingEvents() {
        const nextBtn = document.getElementById('btn-onboard-next');
        const backBtn = document.getElementById('btn-onboard-back');
        const cards = document.querySelectorAll('.pillar-card');
        const dots = document.querySelectorAll('.step-dot');

        if (nextBtn) {
            nextBtn.onclick = () => {
                const currentStep = Screens.onboardingStep || 1;
                if (currentStep < 3) {
                    Screens.onboardingStep = currentStep + 1;
                    this.handleRoute();
                } else {
                    Screens.onboardingStep = 1;
                    window.location.hash = '#/consent';
                }
            };
        }

        if (backBtn) {
            backBtn.onclick = () => {
                const currentStep = Screens.onboardingStep || 1;
                if (currentStep > 1) {
                    Screens.onboardingStep = currentStep - 1;
                    this.handleRoute();
                } else {
                    window.location.hash = '#/landing';
                }
            };
        }

        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.onclick = () => {
                const s = parseInt(card.dataset.step, 10);
                if (s && s >= 1 && s <= 3) {
                    Screens.onboardingStep = s;
                    this.handleRoute();
                }
            };
        });

        dots.forEach((dot, idx) => {
            dot.style.cursor = 'pointer';
            dot.onclick = () => {
                Screens.onboardingStep = idx + 1;
                this.handleRoute();
            };
        });
    },

    bindPSSEvents() {
        const qIndex = Screens.pssCurrentQuestion;
        const options = document.querySelectorAll('#pss-radio-options .radio-card');
        const nextBtn = document.getElementById('btn-pss-next');
        const prevBtn = document.getElementById('btn-pss-prev');

        // Clear any lingering timer from previous question
        if (this._pssTimer) {
            clearTimeout(this._pssTimer);
            this._pssTimer = null;
        }
        this._advancingPSS = false;

        options.forEach(card => {
            card.onclick = (e) => {
                e.preventDefault();
                if (this._advancingPSS) return;

                options.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;

                const val = parseInt(card.dataset.val, 10);
                AppState.setAssessmentField(`pss_q${qIndex}`, val);

                if (nextBtn) nextBtn.disabled = false;

                // Visually update the active indicator dot
                const dots = document.querySelectorAll('.dot-indicators .dot');
                if (dots && dots[qIndex - 1]) {
                    dots[qIndex - 1].classList.add('done');
                }

                // Smooth auto-advance with pleasant 320ms feedback delay
                this._advancingPSS = true;
                const currentQ = Screens.pssCurrentQuestion;
                this._pssTimer = setTimeout(() => {
                    this._advancingPSS = false;
                    this._pssTimer = null;
                    if (Screens.pssCurrentQuestion === currentQ) {
                        if (Screens.pssCurrentQuestion < 10) {
                            Screens.pssCurrentQuestion = currentQ + 1;
                            this.handleRoute();
                        } else {
                            window.location.hash = '#/lifestyle';
                        }
                    }
                }, 320);
            };
        });

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                this.advancePSS();
            };
        }

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                if (this._pssTimer) {
                    clearTimeout(this._pssTimer);
                    this._pssTimer = null;
                }
                this._advancingPSS = false;
                if (Screens.pssCurrentQuestion > 1) {
                    Screens.pssCurrentQuestion--;
                    this.handleRoute();
                }
            };
        }
    },

    advancePSS() {
        if (this._advancingPSS) return;
        const qIndex = Screens.pssCurrentQuestion;
        const val = AppState.getAssessmentField(`pss_q${qIndex}`);
        if (val === null || val === undefined) {
            return;
        }

        if (this._pssTimer) {
            clearTimeout(this._pssTimer);
            this._pssTimer = null;
        }
        this._advancingPSS = true;
        const currentQ = Screens.pssCurrentQuestion;
        if (currentQ < 10) {
            Screens.pssCurrentQuestion = currentQ + 1;
            this.handleRoute();
        } else {
            window.location.hash = '#/lifestyle';
        }
        this._advancingPSS = false;
    },

    bindLifestyleEvents() {
        const form = document.getElementById('form-lifestyle-data');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                AppState.setAssessmentField('sleep_hours', formData.get('sleep_hours'));
                AppState.setAssessmentField('sleep_quality', formData.get('sleep_quality'));
                AppState.setAssessmentField('screen_time', formData.get('screen_time'));
                AppState.setAssessmentField('screen_interference', formData.get('screen_interference'));
                AppState.setAssessmentField('physical_activity', formData.get('physical_activity'));

                window.location.hash = '#/academic';
            };
        }
    },

    bindAcademicEvents() {
        const form = document.getElementById('form-academic-data');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                AppState.setAssessmentField('academic_pressure', formData.get('academic_pressure'));
                AppState.setAssessmentField('academic_stress_source', formData.get('academic_stress_source'));
                AppState.setAssessmentField('study_hours', formData.get('study_hours'));
                AppState.setAssessmentField('procrastination', formData.get('procrastination'));
                AppState.setAssessmentField('concentration_difficulty', formData.get('concentration_difficulty'));

                window.location.hash = '#/support';
            };
        }
    },

    bindSupportEvents() {
        const form = document.getElementById('form-support-data');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                AppState.setAssessmentField('support_awareness', formData.get('support_awareness'));
                AppState.setAssessmentField('help_seeking_comfort', formData.get('help_seeking_comfort'));

                // Standardized PSS Calculation & Contributory Factors
                const responses = AppState.getCurrentAssessment();
                const pss = PSS.calculate(responses);
                const factors = PSS.identifyFactors(responses, pss.score);
                const recs = Recommendations.generate(responses, pss, factors);

                AppState.saveAssessment({
                    pss_score: pss.score,
                    pss_level: pss.level,
                    description: pss.description,
                    factors,
                    recommendations: recs
                });

                window.location.hash = '#/processing';
            };
        }
    },

    bindPlanEvents() {
        document.querySelectorAll('.btn-start-exp').forEach(btn => {
            btn.onclick = () => {
                const expId = btn.dataset.id;
                AppState.startExperiment(expId);
                this.handleRoute();
            };
        });

        const logForm = document.getElementById('form-log-exp-day');
        if (logForm) {
            logForm.onsubmit = (e) => {
                e.preventDefault();
                const valInput = document.getElementById('exp-daily-val');
                const val = parseFloat(valInput ? valInput.value : '');
                if (isNaN(val) || val < 0) {
                    alert('Please enter a valid non-negative number for the experiment observation.');
                    return;
                }
                AppState.logExperimentDay({ recordedValue: val });
                this.handleRoute();
            };
        }
    },

    bindTrackingEvents() {
        const form = document.getElementById('form-log-habit');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const sleep = parseFloat(document.getElementById('h-sleep').value);
                const screen = parseFloat(document.getElementById('h-screen').value);
                const study = parseFloat(document.getElementById('h-study').value);
                const exercise = parseInt(document.getElementById('h-exercise').value, 10);
                const stressRadio = document.querySelector('input[name="daily_stress"]:checked');
                const stressVal = stressRadio ? parseInt(stressRadio.value, 10) : null;

                if (sleep < 0 || screen < 0 || study < 0 || exercise < 0) {
                    alert('Negative values are not allowed in daily habit observations.');
                    return;
                }

                const entry = {
                    sleep_hours: Math.max(0, isNaN(sleep) ? 0 : sleep),
                    screen_hours: Math.max(0, isNaN(screen) ? 0 : screen),
                    study_hours: Math.max(0, isNaN(study) ? 0 : study),
                    exercise_minutes: Math.max(0, isNaN(exercise) ? 0 : exercise),
                    daily_stress: stressVal && stressVal >= 1 && stressVal <= 5 ? stressVal : null
                };
                AppState.logHabit(entry);
                this.handleRoute();
            };
        }
    },

    bindSimulatorEvents() {
        const latest = AppState.getLatestAssessment();
        const baseScore = latest ? latest.pss_score : 20;
        const baseline = Simulator.mapAssessmentToNumeric(latest);

        const sSleep = document.getElementById('slider-sleep');
        const sScreen = document.getElementById('slider-screen');
        const sActivity = document.getElementById('slider-activity');
        const sStudy = document.getElementById('slider-study');

        const vSleep = document.getElementById('val-slider-sleep');
        const vScreen = document.getElementById('val-slider-screen');
        const vActivity = document.getElementById('val-slider-activity');
        const vStudy = document.getElementById('val-slider-study');

        const outProjected = document.getElementById('sim-projected-val');
        const outBadge = document.getElementById('sim-projected-badge');

        const updateSim = () => {
            const cur = {
                sleep_hours: parseFloat(sSleep.value),
                screen_time: parseFloat(sScreen.value),
                physical_activity: parseFloat(sActivity.value),
                study_hours: parseFloat(sStudy.value)
            };

            if (vSleep) vSleep.textContent = `${cur.sleep_hours}h`;
            if (vScreen) vScreen.textContent = `${cur.screen_time}h`;
            if (vActivity) vActivity.textContent = `${cur.physical_activity} days`;
            if (vStudy) vStudy.textContent = `${cur.study_hours}h`;

            const sim = Simulator.simulate(baseline, cur, baseScore);
            if (outProjected) outProjected.textContent = sim.projectedScore;
            if (outBadge) {
                const diffStr = sim.scoreDifference > 0 ? `+${sim.scoreDifference}` : `${sim.scoreDifference}`;
                outBadge.textContent = `${sim.projectedLevel} (${diffStr})`;
                outBadge.className = `badge badge-${sim.projectedColor}`;
            }
        };

        if (sSleep && sScreen && sActivity && sStudy) {
            sSleep.oninput = updateSim;
            sScreen.oninput = updateSim;
            sActivity.oninput = updateSim;
            sStudy.oninput = updateSim;
        }
    },

    animateProcessingStages() {
        const setStage = (id, state) => {
            const row = document.getElementById(id);
            if (!row) return;
            row.className = `proc-row ${state}`;
            const badge = row.querySelector('.proc-badge');
            if (badge) {
                if (state === 'active') {
                    badge.innerHTML = '<span class="proc-spin"></span>';
                } else if (state === 'completed') {
                    badge.innerHTML = '✓';
                }
            }
        };

        // Sequence: Stage 1 starts active
        // After 750ms: Stage 1 checked -> Stage 2 active
        setTimeout(() => {
            setStage('proc-stage-1', 'completed');
            setStage('proc-stage-2', 'active');
        }, 750);

        // After 1550ms: Stage 2 checked -> Stage 3 active
        setTimeout(() => {
            setStage('proc-stage-2', 'completed');
            setStage('proc-stage-3', 'active');
        }, 1550);

        // After 2350ms: Stage 3 checked -> Stage 4 active
        setTimeout(() => {
            setStage('proc-stage-3', 'completed');
            setStage('proc-stage-4', 'active');
        }, 2350);

        // After 3150ms: Stage 4 checked
        setTimeout(() => {
            setStage('proc-stage-4', 'completed');
        }, 3150);

        // After 3650ms: Smooth navigation to results
        setTimeout(() => {
            window.location.hash = '#/results';
        }, 3650);
    },

    animateGaugeCounter() {
        const counter = document.getElementById('gauge-score-counter');
        const latest = AppState.getLatestAssessment();
        if (!counter || !latest) return;

        const target = latest.pss_score;
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();

        const step = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = Math.round(easeOut * target);
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(step);
    }
};

// Start application on DOM ready or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
