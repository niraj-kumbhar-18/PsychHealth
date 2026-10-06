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

        // Participant Profile Badge Click
        const participantBadge = document.getElementById('sidebar-participant');
        if (participantBadge) {
            participantBadge.style.cursor = 'pointer';
            participantBadge.onclick = () => {
                window.location.hash = '#/profile';
                closeDrawer();
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
        if (sub) {
            sub.textContent = p.course ? `${p.course} · ${p.year || 'Student'}` : 'Active · Anonymous';
        }

        nav.innerHTML = `
            <div class="nav-section-title">Core</div>
            <a href="#/dashboard" class="sidebar-link" data-route="dashboard">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                <span>Dashboard</span>
            </a>
            <a href="#/profile" class="sidebar-link" data-route="profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Profile</span>
            </a>
            <a href="#/pss" class="sidebar-link" data-route="pss">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span>Take PSS Assessment</span>
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

            <div class="nav-section-title mt-xs">Research</div>
            <a href="#/researcher" class="sidebar-link" data-route="researcher">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>Pilot Cohort (N=16)</span>
            </a>
        `;

        // Automatically close mobile drawer when any link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
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
        if (!route) route = 'landing';
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
                }, 60);
                break;

            case 'simulator':
                main.innerHTML = Screens.renderSimulator();
                this.bindSimulatorEvents();
                break;

            case 'researcher':
                main.innerHTML = Screens.renderResearcher();
                break;

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

        document.querySelectorAll('.bottom-nav-item').forEach(link => {
            const r = link.getAttribute('data-route');
            if (r === route) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    /* --- Event Bindings --- */

    bindOnboardingEvents() {
        const nextBtn = document.getElementById('btn-onboard-next');
        const backBtn = document.getElementById('btn-onboard-back');
        const dots = document.querySelectorAll('.step-dot');
        const cards = document.querySelectorAll('.pillar-card');

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                if (Screens.onboardingStep < 3) {
                    Screens.onboardingStep++;
                    const main = document.getElementById('main');
                    if (main) {
                        main.innerHTML = Screens.renderOnboarding();
                        this.bindOnboardingEvents();
                    }
                } else {
                    Screens.onboardingStep = 1;
                    window.location.hash = '#/consent';
                }
            };
        }

        if (backBtn) {
            backBtn.onclick = (e) => {
                e.preventDefault();
                if (Screens.onboardingStep > 1) {
                    Screens.onboardingStep--;
                    const main = document.getElementById('main');
                    if (main) {
                        main.innerHTML = Screens.renderOnboarding();
                        this.bindOnboardingEvents();
                    }
                } else {
                    Screens.onboardingStep = 1;
                    window.location.hash = '#/';
                }
            };
        }

        cards.forEach(card => {
            card.onclick = () => {
                const step = parseInt(card.dataset.step, 10);
                if (step && step >= 1 && step <= 3) {
                    Screens.onboardingStep = step;
                    const main = document.getElementById('main');
                    if (main) {
                        main.innerHTML = Screens.renderOnboarding();
                        this.bindOnboardingEvents();
                    }
                }
            };
        });

        dots.forEach((dot, idx) => {
            dot.onclick = () => {
                Screens.onboardingStep = idx + 1;
                const main = document.getElementById('main');
                if (main) {
                    main.innerHTML = Screens.renderOnboarding();
                    this.bindOnboardingEvents();
                }
            };
        });
    },

    bindConsentEvents() {
        const agreeCheckbox = document.getElementById('consent-agree');
        const agreeBtn = document.getElementById('btn-consent-agree');
        const declineBtn = document.getElementById('btn-consent-decline');

        if (agreeCheckbox && agreeBtn) {
            agreeCheckbox.onchange = () => {
                agreeBtn.disabled = !agreeCheckbox.checked;
            };
        }

        if (agreeBtn) {
            agreeBtn.onclick = () => {
                AppState.setConsented(true);
                window.location.hash = '#/profile';
            };
        }

        if (declineBtn) {
            declineBtn.onclick = () => {
                window.location.hash = '#/';
            };
        }
    },

    bindProfileEvents() {
        const form = document.getElementById('form-profile-setup');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const p = {
                    name: formData.get('name')?.trim() || 'Student',
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

    bindPSSEvents() {
        const qIndex = Screens.pssCurrentQuestion;
        const options = document.querySelectorAll('#pss-radio-options .radio-card');
        const nextBtn = document.getElementById('btn-pss-next');
        const prevBtn = document.getElementById('btn-pss-prev');

        options.forEach(card => {
            card.onclick = (e) => {
                if (this._pssLock) return;

                options.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const radio = card.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;

                const val = parseInt(card.dataset.val, 10);
                AppState.setAssessmentField(`pss_q${qIndex}`, val);

                if (nextBtn) {
                    nextBtn.disabled = false;
                }

                // Smooth auto-advance to next question upon selection
                clearTimeout(this._pssAutoAdvanceTimer);
                this._pssAutoAdvanceTimer = setTimeout(() => {
                    this.advancePSS();
                }, 260);
            };
        });

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                clearTimeout(this._pssAutoAdvanceTimer);
                this.advancePSS();
            };
        }

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                clearTimeout(this._pssAutoAdvanceTimer);
                if (this._pssLock) return;
                this._pssLock = true;
                if (Screens.pssCurrentQuestion > 1) {
                    Screens.pssCurrentQuestion--;
                    this.handleRoute();
                }
                setTimeout(() => { this._pssLock = false; }, 260);
            };
        }
    },

    advancePSS() {
        if (this._pssLock) return;
        this._pssLock = true;
        clearTimeout(this._pssAutoAdvanceTimer);

        if (Screens.pssCurrentQuestion < 10) {
            Screens.pssCurrentQuestion++;
            this.handleRoute();
        } else {
            window.location.hash = '#/lifestyle';
        }

        setTimeout(() => {
            this._pssLock = false;
        }, 260);
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
                const latest = AppState.getLatestAssessment();
                let baselineVal = null;
                if (latest && latest.responses) {
                    if (expId === 'sleep') baselineVal = latest.responses.sleep_hours;
                    else if (expId === 'screen') baselineVal = latest.responses.screen_time;
                    else if (expId === 'study') baselineVal = latest.responses.study_hours;
                    else if (expId === 'activity') baselineVal = latest.responses.physical_activity;
                }
                AppState.startExperiment(expId, baselineVal);
                this.handleRoute();
            };
        });

        const logForm = document.getElementById('form-log-exp-day');
        if (logForm) {
            logForm.onsubmit = (e) => {
                e.preventDefault();
                const valInput = document.getElementById('exp-daily-val');
                const val = parseFloat(valInput?.value);
                if (isNaN(val) || val < 0 || val > 24) {
                    alert('Please enter a valid non-negative number between 0 and 24.');
                    return;
                }
                AppState.logExperimentDay({ value: val });
                this.handleRoute();
            };
        }
    },

    bindTrackingEvents() {
        const form = document.getElementById('form-log-habit');
        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const sleep = parseFloat(document.getElementById('h-sleep')?.value);
                const screen = parseFloat(document.getElementById('h-screen')?.value);
                const study = parseFloat(document.getElementById('h-study')?.value);
                const exercise = parseFloat(document.getElementById('h-exercise')?.value);
                const stressRating = document.getElementById('h-stress-rating')?.value;

                if (isNaN(sleep) || sleep < 0 || isNaN(screen) || screen < 0 || isNaN(study) || study < 0 || isNaN(exercise) || exercise < 0) {
                    alert('Values cannot be negative. Please enter valid non-negative numbers.');
                    return;
                }

                const entry = {
                    sleep_hours: sleep,
                    screen_hours: screen,
                    study_hours: study,
                    exercise_minutes: exercise,
                    stress_rating: stressRating ? parseInt(stressRating, 10) : null
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
    }
};

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
