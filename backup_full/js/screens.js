/* ============================================================
   PsychHealth — Screen Rendering Engine
   Clean, minimal, clinical design following GEMINI.md.
   Strictly Mobile-First Responsive Layouts with Touch Optimization.
   ============================================================ */

const Screens = {
    pssCurrentQuestion: 1,
    onboardingStep: 1,

    /* ------------------------------------------------------------
       SCREEN 1 — Welcome / Landing Screen (Redesigned)
       ------------------------------------------------------------ */
    renderSplash() {
        return `
            <div class="welcome-wrap animate-fade-in">
                <!-- Top Brand Header -->
                <div class="welcome-top">
                    <div class="welcome-logo-badge">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);">
                            <path d="M12 2a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.7 8.6L12 22l2.3-2.4C18.2 18.6 21 15.1 21 11a9 9 0 0 0-9-9z"/>
                            <path d="M9 10a3 3 0 1 1 6 0c0 1.7-1.3 2.5-2 3.2-.4.4-.8.8-1 1.8"/>
                            <circle cx="12" cy="17" r=".5" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="welcome-brand-name">PsychHealth <span>AI</span></div>
                    <div class="welcome-tagline">Smarter Minds · Brighter Futures</div>
                </div>

                <!-- Center Calm Botanical / Focus Mind Illustration -->
                <div class="welcome-illustration">
                    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="130" cy="195" rx="70" ry="12" fill="var(--subtle)" />
                        <!-- Calming Botanical Leaf Wings -->
                        <path d="M60 145 C40 100 50 65 90 60 C80 90 85 125 60 145 Z" fill="var(--accent-light)" opacity="0.8" />
                        <path d="M200 145 C220 100 210 65 170 60 C180 90 175 125 200 145 Z" fill="var(--accent-light)" opacity="0.8" />
                        <path d="M45 130 C28 95 40 70 70 68 C62 90 68 115 45 130 Z" fill="var(--green-light)" opacity="0.7" />
                        <path d="M215 130 C232 95 220 70 190 68 C198 90 192 115 215 130 Z" fill="var(--green-light)" opacity="0.7" />

                        <!-- Inner Focus Aura Ring -->
                        <circle cx="130" cy="105" r="54" fill="var(--surface)" stroke="var(--border)" stroke-width="1.5" />
                        <circle cx="130" cy="105" r="46" fill="var(--subtle)" opacity="0.6" />

                        <!-- Floating Mind & Mood Accents -->
                        <circle cx="95" cy="75" r="4" fill="#3b82f6" />
                        <circle cx="165" cy="75" r="4" fill="#10b981" />
                        <circle cx="130" cy="48" r="3.5" fill="#f59e0b" />

                        <!-- Serene Student Figure -->
                        <circle cx="130" cy="85" r="16" fill="#fcd34d" />
                        <!-- Hair -->
                        <path d="M115 84 C115 72 145 72 145 84 C140 75 120 75 115 84 Z" fill="#1e293b" />
                        <!-- Spectacles -->
                        <circle cx="125" cy="85" r="3" stroke="#0f172a" stroke-width="1.2" />
                        <circle cx="135" cy="85" r="3" stroke="#0f172a" stroke-width="1.2" />
                        <line x1="128" y1="85" x2="132" y2="85" stroke="#0f172a" stroke-width="1" />
                        <!-- Gentle smile -->
                        <path d="M127 92 Q130 95 133 92" stroke="#0f172a" stroke-width="1" stroke-linecap="round" fill="none" />

                        <!-- Body & Laptop in Meditative Focus -->
                        <path d="M112 110 C112 102 148 102 148 110 L152 142 C152 146 108 146 108 142 Z" fill="#2563eb" />
                        <path d="M100 138 C100 130 115 130 120 138 L122 146 C112 146 100 144 100 138 Z" fill="#1d4ed8" />
                        <path d="M160 138 C160 130 145 130 140 138 L138 146 C148 146 160 144 160 138 Z" fill="#1d4ed8" />
                        <!-- Glowing Laptop -->
                        <rect x="117" y="124" width="26" height="17" rx="2" fill="#38bdf8" />
                        <rect x="123" y="129" width="14" height="8" rx="1" fill="#ffffff" opacity="0.9" />
                        <path d="M114 142 L146 142 L144 145 L116 145 Z" fill="#94a3b8" />
                    </svg>
                </div>

                <!-- Hero Copy -->
                <div class="welcome-hero-content">
                    <span class="welcome-pretitle">Your Companion for</span>
                    <h1 class="welcome-headline">
                        Mental Wellbeing &amp;
                        <strong>Academic Success</strong>
                    </h1>
                </div>

                <!-- Single CTA Bottom -->
                <div class="welcome-bottom">
                    <a href="#/onboarding" class="btn btn-primary btn-lg btn-block" style="min-height: 52px; font-size: 1rem; border-radius: 12px;">
                        <span>Get Started</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <div class="welcome-caption">A Student Research Assessment Platform</div>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 2 — How It Works / Onboarding (Multi-step Walkthrough)
       ------------------------------------------------------------ */
    renderOnboarding() {
        const step = this.onboardingStep || 1;
        const buttonLabel = step === 3 ? 'Proceed to Consent →' : 'Next →';

        return `
            <div class="assessment-wrap animate-fade-in">
                <!-- Top Navigation with Back & Skip -->
                <div class="onboard-top-bar">
                    <button id="btn-onboard-back" class="btn btn-ghost btn-sm" aria-label="Back">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <a href="#/consent" class="btn-skip">Skip</a>
                </div>

                <div class="text-center mb-sm">
                    <span class="badge badge-accent mb-xs">Research Pillar ${step} of 3</span>
                    <h1 class="text-2xl font-bold mb-xs">Welcome to PsychHealth</h1>
                    <p class="text-xs text-secondary max-w-sm mx-auto">
                        Take a step towards a healthier, happier and more productive you!
                    </p>
                </div>

                <!-- Central Student Avatar with Accents -->
                <div class="onboard-avatar-circle">
                    <div class="floating-icon floating-icon-1">🌸</div>
                    <div class="floating-icon floating-icon-2">🎓</div>
                    <div class="floating-icon floating-icon-3">💚</div>
                    <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="30" fill="var(--accent-light)" />
                        <circle cx="32" cy="24" r="12" fill="#fcd34d" />
                        <path d="M20 22 C20 12 44 12 44 22 C40 14 24 14 20 22 Z" fill="#1e293b" />
                        <circle cx="28" cy="25" r="1.5" fill="#1e293b" />
                        <circle cx="36" cy="25" r="1.5" fill="#1e293b" />
                        <path d="M30 29 Q32 31 34 29" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round" fill="none" />
                        <path d="M18 50 C18 40 46 40 46 50 Z" fill="#0d9488" />
                    </svg>
                </div>

                <!-- 3 Stepped Pillar Cards -->
                <div class="flex flex-col gap-xs mb-sm">
                    <div class="pillar-card ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}" data-step="1">
                        <div class="pillar-number">${step > 1 ? '✓' : '1'}</div>
                        <div class="flex-1">
                            <div class="pillar-title">
                                <span>ASSESS</span>
                                ${step === 1 ? '<span class="badge badge-accent" style="font-size: .65rem;">Validated Cohen Scale</span>' : ''}
                            </div>
                            <div class="pillar-desc">
                                Understand psychological wellbeing and perceived stress using validated psychometric scales (PSS-10).
                            </div>
                        </div>
                    </div>

                    <div class="pillar-card ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}" data-step="2">
                        <div class="pillar-number">${step > 2 ? '✓' : '2'}</div>
                        <div class="flex-1">
                            <div class="pillar-title">
                                <span>ANALYSE</span>
                                ${step === 2 ? '<span class="badge badge-accent" style="font-size: .65rem;">Correlation Engine</span>' : ''}
                            </div>
                            <div class="pillar-desc">
                                Explore relationships between psychological wellbeing, sleep habits, daily screen time, and academic performance.
                            </div>
                        </div>
                    </div>

                    <div class="pillar-card ${step === 3 ? 'active' : ''}" data-step="3">
                        <div class="pillar-number">3</div>
                        <div class="flex-1">
                            <div class="pillar-title">
                                <span>IMPROVE</span>
                                ${step === 3 ? '<span class="badge badge-accent" style="font-size: .65rem;">Evidence-Based Plan</span>' : ''}
                            </div>
                            <div class="pillar-desc">
                                Receive personalized 7-day wellness guidance, complete micro-habits, and objectively measure progress.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stepper Dots -->
                <div class="stepper-dots">
                    <span class="step-dot ${step === 1 ? 'active' : ''}"></span>
                    <span class="step-dot ${step === 2 ? 'active' : ''}"></span>
                    <span class="step-dot ${step === 3 ? 'active' : ''}"></span>
                </div>

                <div class="mt-md">
                    <button id="btn-onboard-next" class="btn btn-primary btn-lg btn-block" style="min-height: 50px; border-radius: 12px;">
                        <span>${buttonLabel}</span>
                    </button>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 3 — Research Consent (Redesigned matching inspiration)
       ------------------------------------------------------------ */
    renderConsent() {
        return `
            <div class="assessment-wrap animate-fade-in">
                <!-- Top Navigation -->
                <div class="onboard-top-bar">
                    <a href="#/onboarding" class="btn btn-ghost btn-sm" aria-label="Back">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                    </a>
                    <span class="text-xs text-tertiary">Step 2 of 3</span>
                </div>

                <!-- Shield Badge Icon -->
                <div class="consent-shield-wrap">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                    </svg>
                </div>

                <div class="text-center mb-md">
                    <h1 class="text-xl font-bold mb-xs">Research Participation Consent</h1>
                    <p class="text-xs text-secondary max-w-sm mx-auto">
                        Please review the research parameters below before proceeding with the PsychHealth evaluation platform.
                    </p>
                </div>

                <!-- 4 Research Information Cards -->
                <div class="flex flex-col gap-xs mb-sm">
                    <div class="consent-row-card">
                        <div class="consent-check-circle">✓</div>
                        <div class="flex-1">
                            <div class="font-bold text-xs text-primary">Study Purpose</div>
                            <div class="text-xs text-secondary mt-xs">
                                Investigate student perceived stress and its correlation with academic performance in college students.
                            </div>
                        </div>
                    </div>

                    <div class="consent-row-card">
                        <div class="consent-check-circle">✓</div>
                        <div class="flex-1">
                            <div class="font-bold text-xs text-primary">Information Collected</div>
                            <div class="text-xs text-secondary mt-xs">
                                Validated PSS-10 stress responses, self-reported CGPA, study volume, sleep habits, and screen time.
                            </div>
                        </div>
                    </div>

                    <div class="consent-row-card">
                        <div class="consent-check-circle">✓</div>
                        <div class="flex-1">
                            <div class="font-bold text-xs text-primary">Voluntary &amp; Anonymous</div>
                            <div class="text-xs text-secondary mt-xs">
                                Participation is voluntary. All data is de-identified using anonymous session tokens. You can withdraw anytime.
                            </div>
                        </div>
                    </div>

                    <div class="consent-row-card">
                        <div class="consent-check-circle">✓</div>
                        <div class="flex-1">
                            <div class="font-bold text-xs text-primary">Non-Diagnostic Nature</div>
                            <div class="text-xs text-secondary mt-xs">
                                PsychHealth provides educational wellbeing guidance, not a medical or psychiatric diagnosis.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Single Confirmation Checkbox Card -->
                <label class="consent-agree-box cursor-pointer">
                    <input type="checkbox" id="consent-agree">
                    <span class="text-xs font-semibold text-primary">
                        I have read and understood the information above.
                    </span>
                </label>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-sm">
                    <a href="#/onboarding" class="btn btn-secondary btn-lg" style="border-radius: 12px;">Decline</a>
                    <button id="btn-consent-agree" class="btn btn-primary btn-lg" style="border-radius: 12px;" disabled>
                        Agree &amp; Continue →
                    </button>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 4 — Student Profile (Redesigned)
       ------------------------------------------------------------ */
    renderProfile() {
        const p = AppState.getProfile();
        const courses = DATA.profileFields.course.options;
        const cgpaRanges = DATA.profileFields.academic_performance.options;
        const years = DATA.profileFields.year.options;
        const ages = DATA.profileFields.age_group.options;
        const genders = DATA.profileFields.gender.options;

        return `
            <div class="assessment-wrap animate-fade-in">
                <!-- Top Navigation -->
                <div class="onboard-top-bar">
                    <a href="#/consent" class="btn btn-ghost btn-sm" aria-label="Back">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                    </a>
                    <span class="text-xs text-tertiary">Step 3 of 3</span>
                </div>

                <div class="text-center mb-sm">
                    <h1 class="text-xl font-bold">Create Your Profile</h1>
                    <span class="text-xs text-tertiary">(Research Context)</span>
                </div>

                <!-- Avatar Motif -->
                <div class="profile-avatar-wrap">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>

                <form id="form-profile-setup" class="card">
                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block" for="prof-course">Course / Stream</label>
                        <select id="prof-course" name="course" class="form-control" required>
                            <option value="">Select course...</option>
                            ${courses.map(c => `
                                <option value="${c}" ${p.course === c ? 'selected' : ''}>${c}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">Current Year of Study</label>
                        <div class="flex flex-wrap gap-xs">
                            ${years.map(y => `
                                <label class="radio-chip">
                                    <input type="radio" name="year" value="${y}" ${p.year === y ? 'checked' : ''} required>
                                    <span>${y}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">Gender</label>
                        <div class="flex flex-wrap gap-xs">
                            ${genders.map(g => `
                                <label class="radio-chip">
                                    <input type="radio" name="gender" value="${g}" ${p.gender === g ? 'checked' : ''} required>
                                    <span>${g}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">Age Group</label>
                        <div class="flex flex-wrap gap-xs">
                            ${ages.map(a => `
                                <label class="radio-chip">
                                    <input type="radio" name="age_group" value="${a}" ${p.age_group === a ? 'checked' : ''} required>
                                    <span>${a}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-lg">
                        <label class="form-label mb-xs block">Latest Academic Performance (CGPA)</label>
                        <div class="flex flex-wrap gap-xs">
                            ${cgpaRanges.map(cg => `
                                <label class="radio-chip">
                                    <input type="radio" name="academic_performance" value="${cg}" ${p.academic_performance === cg ? 'checked' : ''} required>
                                    <span>${cg}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="pt-sm border-t">
                        <button type="submit" class="btn btn-primary btn-lg btn-block" style="border-radius: 12px;">
                            Save &amp; Continue →
                        </button>
                    </div>
                </form>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 5 — Home Dashboard
       ------------------------------------------------------------ */
    renderDashboard() {
        const latest = AppState.getLatestAssessment();
        const p = AppState.getProfile();
        const count = AppState.getAssessments().length;

        if (!latest) {
            // First time student state
            return `
                <div class="dashboard-wrap animate-fade-in">
                    <div class="dash-header">
                        <div>
                            <h1 class="text-2xl font-bold">Student Wellness Dashboard</h1>
                            <p class="text-sm text-secondary">Track perceived stress, lifestyle covariance, and academic resilience.</p>
                        </div>
                    </div>

                    <div class="card p-xl mb-lg text-center">
                        <span class="badge badge-accent mb-sm">No Active Assessment</span>
                        <h2 class="text-xl font-bold mb-xs">Welcome to PsychHealth</h2>
                        <p class="text-secondary max-w-md mx-auto mb-md text-sm">
                            You have not completed an assessment yet. Complete the standardized 10-question PSS-10 questionnaire along with your lifestyle variables to generate personalized recommendations.
                        </p>
                        <a href="#/onboarding" class="btn btn-primary btn-lg">Start First Assessment →</a>
                    </div>

                    <div class="kpi-grid">
                        <div class="card">
                            <h3 class="font-semibold text-sm mb-xs">Standardized PSS-10</h3>
                            <p class="text-xs text-secondary">Measures unpredictability, overload, and confidence under the Cohen scale.</p>
                        </div>
                        <div class="card">
                            <h3 class="font-semibold text-sm mb-xs">Actionable Guidance</h3>
                            <p class="text-xs text-secondary">Deterministic rule-based recommendations for sleep, screen, and study hygiene.</p>
                        </div>
                        <div class="card">
                            <h3 class="font-semibold text-sm mb-xs">What-If Simulation</h3>
                            <p class="text-xs text-secondary">Test how adjusting your sleep duration or screen time alters stress patterns.</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Active student dashboard with real saved data
        const levelBadgeClass = latest.pss_level === 'Low' ? 'badge-success' : latest.pss_level === 'Moderate' ? 'badge-warning' : 'badge-danger';
        const pssPct = Math.round((latest.pss_score / 40) * 100);

        return `
            <div class="dashboard-wrap animate-fade-in">
                <div class="dash-header">
                    <div>
                        <h1 class="text-2xl font-bold">Student Wellness Overview</h1>
                        <p class="text-sm text-secondary">
                            ${p.course ? `${p.course} · ${p.year || 'Student'}` : 'Participant Overview'} · Last assessed: ${new Date(latest.date).toLocaleDateString()}
                        </p>
                    </div>
                    <div class="flex gap-xs flex-wrap">
                        <a href="#/pss" class="btn btn-primary btn-sm">Retake Assessment</a>
                        <a href="#/simulator" class="btn btn-secondary btn-sm">What-If Simulator</a>
                    </div>
                </div>

                <!-- Responsive 1-3 Column KPI Grid -->
                <div class="kpi-grid">
                    <!-- Hero KPI Card: PSS-10 Primary Score -->
                    <div class="kpi-card hero-kpi">
                        <div>
                            <div class="flex justify-between items-center mb-xs">
                                <span class="kpi-label">Perceived Stress (PSS-10)</span>
                                <span class="badge ${levelBadgeClass}">${latest.pss_level} Stress</span>
                            </div>
                            <div class="kpi-value">${latest.pss_score} <span class="text-sm font-normal text-tertiary">/ 40</span></div>
                        </div>
                        <div class="mt-xs">
                            <div class="progress-bar mb-xs">
                                <div class="progress-bar-fill" style="width: ${pssPct}%;"></div>
                            </div>
                            <div class="kpi-sub">Standard Cohen Normative Index</div>
                        </div>
                    </div>

                    <div class="kpi-card">
                        <div>
                            <span class="kpi-label">Average Sleep</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.sleep_hours || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">${latest.responses.sleep_quality ? `Day fatigue: ${latest.responses.sleep_quality}` : 'Self-reported'}</div>
                    </div>

                    <div class="kpi-card">
                        <div>
                            <span class="kpi-label">Screen Time (Non-Acad)</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.screen_time || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">${latest.responses.screen_interference ? `Interference: ${latest.responses.screen_interference}` : 'Recreational'}</div>
                    </div>

                    <div class="kpi-card">
                        <div>
                            <span class="kpi-label">Academic Pressure</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.academic_pressure || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">${latest.responses.academic_stress_source ? `Source: ${latest.responses.academic_stress_source}` : 'Coursework'}</div>
                    </div>

                    <div class="kpi-card">
                        <div>
                            <span class="kpi-label">Physical Activity</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.physical_activity || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">30+ min exercise / week</div>
                    </div>

                    <div class="kpi-card">
                        <div>
                            <span class="kpi-label">Assessment History</span>
                            <div class="kpi-value mt-xs">${count} <span class="text-sm font-normal text-tertiary">sessions</span></div>
                        </div>
                        <div class="kpi-sub"><a href="#/progress" class="text-accent font-medium">View longitudinal trend →</a></div>
                    </div>
                </div>

                <!-- 2-Column Responsive Section: Factors & Priority Guidance -->
                <div class="dashboard-columns">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold text-base">Key Identified Factors</h3>
                            <a href="#/results" class="text-xs text-accent">Full report →</a>
                        </div>
                        ${(latest.factors && latest.factors.length > 0) ? `
                            <div class="flex flex-col gap-xs">
                                ${latest.factors.slice(0, 4).map(f => `
                                    <div class="flex items-center justify-between p-xs border-b">
                                        <span class="text-sm text-primary">${f.title}</span>
                                        <span class="badge ${f.impact === 'High' ? 'badge-danger' : 'badge-warning'}">${f.impact}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <p class="text-xs text-secondary">No acute risk factors identified in your latest baseline.</p>
                        `}
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold text-base">Priority Guidance Strategy</h3>
                            <a href="#/recommendations" class="text-xs text-accent">All recommendations →</a>
                        </div>
                        ${(latest.recommendations && latest.recommendations.length > 0) ? `
                            <div class="rec-preview">
                                <div class="font-semibold text-sm text-primary mb-xs">${latest.recommendations[0].title}</div>
                                <p class="text-xs text-secondary mb-sm">${latest.recommendations[0].summary}</p>
                                <a href="#/recommendations" class="btn btn-secondary btn-sm">Explore Strategy →</a>
                            </div>
                        ` : `
                            <p class="text-xs text-secondary">Balanced lifestyle patterns observed.</p>
                        `}
                    </div>
                </div>

                <!-- 7-Day Habit Track Banner -->
                <div class="card flex justify-between items-center flex-wrap gap-md p-md bg-subtle">
                    <div>
                        <div class="font-semibold text-sm">7-Day Habit Experiments</div>
                        <div class="text-xs text-secondary">Engage in structured micro-interventions to improve sleep consistency or reduce screen interference.</div>
                    </div>
                    <div class="flex gap-xs flex-wrap">
                        <a href="#/plan" class="btn btn-primary btn-sm">Open 7-Day Plan</a>
                        <a href="#/tracking" class="btn btn-secondary btn-sm">Daily Habit Log</a>
                    </div>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 6 — PSS-10 Assessment (Strict 1-to-10 Sequential)
       ------------------------------------------------------------ */
    renderPSS() {
        const qIndex = this.pssCurrentQuestion;
        const q = DATA.pssQuestions.find(item => item.id === qIndex);
        const savedVal = AppState.getAssessmentField(`pss_q${qIndex}`);
        const pct = Math.round((qIndex / 10) * 100);
        const qCode = `PSS-${String(qIndex).padStart(2, '0')}`;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="flex justify-between items-center mb-xs">
                    <span class="text-xs text-tertiary">Standardized PSS-10 Assessment</span>
                    <span class="text-xs font-semibold text-accent">${qCode} · Question ${qIndex} of 10</span>
                </div>

                <div class="progress-bar mb-lg">
                    <div class="progress-bar-fill" style="width: ${pct}%;"></div>
                </div>

                <div class="card mb-md">
                    <div class="mb-xs">
                        <span class="badge badge-accent font-mono font-bold" style="font-size: 0.72rem; padding: 2px 8px; letter-spacing: 0.04em;">${qCode}</span>
                    </div>
                    <h2 class="question-text">${q.text}</h2>

                    <div id="pss-radio-options" class="flex flex-col gap-xs mt-sm">
                        ${DATA.pssOptions.map(opt => `
                            <label class="radio-card ${savedVal === opt.value ? 'selected' : ''}" data-val="${opt.value}">
                                <input type="radio" name="pss_current" value="${opt.value}" ${savedVal === opt.value ? 'checked' : ''}>
                                <span class="font-medium text-sm">${opt.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="flex justify-between items-center gap-sm">
                    <button id="btn-pss-prev" class="btn btn-secondary" ${qIndex === 1 ? 'disabled' : ''}>
                        ← Prev
                    </button>

                    <div class="dot-indicators">
                        ${DATA.pssQuestions.map(item => `
                            <span class="dot ${item.id === qIndex ? 'active' : AppState.getAssessmentField(`pss_q${item.id}`) !== null ? 'done' : ''}"></span>
                        `).join('')}
                    </div>

                    <button id="btn-pss-next" class="btn btn-primary" ${savedVal === null ? 'disabled' : ''}>
                        ${qIndex === 10 ? 'Next Section →' : 'Next →'}
                    </button>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 7 — Lifestyle Assessment
       ------------------------------------------------------------ */
    renderLifestyle() {
        const ca = AppState.getCurrentAssessment();
        const lf = DATA.lifestyleFields;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="flex justify-between items-center mb-xs">
                    <span class="text-xs text-tertiary">Section 3 of 5 · Lifestyle &amp; Habits</span>
                    <span class="text-xs font-semibold text-accent">5 Questions</span>
                </div>

                <div class="progress-bar mb-lg">
                    <div class="progress-bar-fill" style="width: 70%;"></div>
                </div>

                <h1 class="text-xl font-bold mb-xs">Sleep &amp; Daily Lifestyle</h1>
                <p class="text-sm text-secondary mb-md">Evaluating sleep patterns and digital habits known to correlate with student stress.</p>

                <form id="form-lifestyle-data" class="card">
                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${lf.sleep_hours.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${lf.sleep_hours.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="sleep_hours" value="${opt}" ${ca.sleep_hours === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${lf.sleep_quality.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${lf.sleep_quality.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="sleep_quality" value="${opt}" ${ca.sleep_quality === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${lf.screen_time.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${lf.screen_time.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="screen_time" value="${opt}" ${ca.screen_time === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${lf.screen_interference.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${lf.screen_interference.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="screen_interference" value="${opt}" ${ca.screen_interference === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-lg">
                        <label class="form-label mb-xs block">${lf.physical_activity.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${lf.physical_activity.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="physical_activity" value="${opt}" ${ca.physical_activity === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="flex justify-between items-center gap-sm pt-sm border-t">
                        <a href="#/pss" class="btn btn-secondary">← Back</a>
                        <button type="submit" class="btn btn-primary btn-lg">Next: Academic Factors →</button>
                    </div>
                </form>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 8 — Academic & Behaviour Assessment
       ------------------------------------------------------------ */
    renderAcademic() {
        const ca = AppState.getCurrentAssessment();
        const af = DATA.academicFields;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="flex justify-between items-center mb-xs">
                    <span class="text-xs text-tertiary">Section 4 of 5 · Academic Factors</span>
                    <span class="text-xs font-semibold text-accent">5 Questions</span>
                </div>

                <div class="progress-bar mb-lg">
                    <div class="progress-bar-fill" style="width: 85%;"></div>
                </div>

                <h1 class="text-xl font-bold mb-xs">Academic Pressure &amp; Study Behaviour</h1>
                <p class="text-sm text-secondary mb-md">Assessing workload stress, concentration strain, and study patterns.</p>

                <form id="form-academic-data" class="card">
                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${af.academic_pressure.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${af.academic_pressure.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="academic_pressure" value="${opt}" ${ca.academic_pressure === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${af.academic_stress_source.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${af.academic_stress_source.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="academic_stress_source" value="${opt}" ${ca.academic_stress_source === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${af.study_hours.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${af.study_hours.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="study_hours" value="${opt}" ${ca.study_hours === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${af.procrastination.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${af.procrastination.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="procrastination" value="${opt}" ${ca.procrastination === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-lg">
                        <label class="form-label mb-xs block">${af.concentration_difficulty.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${af.concentration_difficulty.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="concentration_difficulty" value="${opt}" ${ca.concentration_difficulty === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="flex justify-between items-center gap-sm pt-sm border-t">
                        <a href="#/lifestyle" class="btn btn-secondary">← Back</a>
                        <button type="submit" class="btn btn-primary btn-lg">Next: Campus Support →</button>
                    </div>
                </form>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 9 — Support & Help-Seeking
       ------------------------------------------------------------ */
    renderSupport() {
        const ca = AppState.getCurrentAssessment();
        const sf = DATA.supportFields;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="flex justify-between items-center mb-xs">
                    <span class="text-xs text-tertiary">Section 5 of 5 · Campus Support</span>
                    <span class="text-xs font-semibold text-accent">Final Section</span>
                </div>

                <div class="progress-bar mb-lg">
                    <div class="progress-bar-fill" style="width: 100%;"></div>
                </div>

                <h1 class="text-xl font-bold mb-xs">Support &amp; Help-Seeking Behaviour</h1>
                <p class="text-sm text-secondary mb-md">Understanding institutional support awareness and willingness to seek guidance.</p>

                <form id="form-support-data" class="card">
                    <div class="form-group mb-md">
                        <label class="form-label mb-xs block">${sf.support_awareness.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${sf.support_awareness.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="support_awareness" value="${opt}" ${ca.support_awareness === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-group mb-lg">
                        <label class="form-label mb-xs block">${sf.help_seeking_comfort.label}</label>
                        <div class="flex flex-wrap gap-xs">
                            ${sf.help_seeking_comfort.options.map(opt => `
                                <label class="radio-chip">
                                    <input type="radio" name="help_seeking_comfort" value="${opt}" ${ca.help_seeking_comfort === opt ? 'checked' : ''} required>
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="p-sm bg-subtle rounded-md mb-lg">
                        <p class="text-xs text-tertiary">
                            Your responses will be compiled locally to calculate your standardized Cohen PSS-10 score and generate rule-based lifestyle recommendations.
                        </p>
                    </div>

                    <div class="flex justify-between items-center gap-sm pt-sm border-t">
                        <a href="#/academic" class="btn btn-secondary">← Back</a>
                        <button type="submit" class="btn btn-primary btn-lg">Submit Assessment ✓</button>
                    </div>
                </form>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 10 — Processing Animation (Interactive 4-Stage Workflow)
       ------------------------------------------------------------ */
    renderProcessing() {
        return `
            <div class="assessment-wrap text-center py-lg animate-fade-in" style="max-width: 480px;">
                <!-- Animated Focus Motif -->
                <div class="proc-head-wrap mb-md">
                    <div class="proc-head-pulse"></div>
                    <div class="proc-head-icon">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin-slow">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                    </div>
                </div>

                <h1 class="text-xl font-bold mb-xs">Analyzing Your Assessment</h1>
                <p class="text-xs text-secondary mb-lg">
                    Executing Cohen psychometric validation, lifestyle covariance modeling, and clinical guidance rules.
                </p>

                <!-- Interactive 4-Stage Sequential Checklist -->
                <div class="card p-sm text-left flex flex-col gap-xs mb-md">
                    <!-- Stage 1 -->
                    <div id="proc-stage-1" class="proc-row active">
                        <div class="proc-badge">
                            <span class="proc-spin"></span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="proc-label">1. Validating &amp; Reverse-Scoring PSS-10</div>
                            <div class="proc-desc">Computing items 4, 5, 7, and 8 per Cohen protocol</div>
                        </div>
                    </div>

                    <!-- Stage 2 -->
                    <div id="proc-stage-2" class="proc-row pending">
                        <div class="proc-badge">2</div>
                        <div class="flex-1 min-w-0">
                            <div class="proc-label">2. Analyzing Lifestyle Covariates</div>
                            <div class="proc-desc">Correlating sleep duration, screen habits, and activity</div>
                        </div>
                    </div>

                    <!-- Stage 3 -->
                    <div id="proc-stage-3" class="proc-row pending">
                        <div class="proc-badge">3</div>
                        <div class="flex-1 min-w-0">
                            <div class="proc-label">3. Evaluating Academic Pressure Impact</div>
                            <div class="proc-desc">Assessing study volume, focus difficulty, and CGPA trends</div>
                        </div>
                    </div>

                    <!-- Stage 4 -->
                    <div id="proc-stage-4" class="proc-row pending">
                        <div class="proc-badge">4</div>
                        <div class="flex-1 min-w-0">
                            <div class="proc-label">4. Synthesizing Targeted Guidance</div>
                            <div class="proc-desc">Calibrating personalized 7-day micro-interventions</div>
                        </div>
                    </div>
                </div>

                <div class="text-xs text-tertiary flex items-center justify-center gap-xs">
                    <span class="proc-indicator-dot"></span>
                    <span>Processing real-time research inference...</span>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 11 — Results Dashboard
       ------------------------------------------------------------ */
    renderResults() {
        const latest = AppState.getLatestAssessment();
        if (!latest) {
            return `
                <div class="card text-center p-xl">
                    <h2 class="text-lg font-bold mb-sm">No Assessment Results Found</h2>
                    <p class="text-sm text-secondary mb-md">Please complete the questionnaire first.</p>
                    <a href="#/onboarding" class="btn btn-primary">Start Assessment</a>
                </div>
            `;
        }

        const levelBadgeClass = latest.pss_level === 'Low' ? 'badge-success' : latest.pss_level === 'Moderate' ? 'badge-warning' : 'badge-danger';
        const pssPct = Math.round((latest.pss_score / 40) * 100);

        return `
            <div class="results-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Assessment Report</h1>
                        <span class="text-xs text-tertiary">Assessed on ${new Date(latest.date).toLocaleDateString()}</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Home Dashboard</a>
                </div>

                <div class="card mb-md text-center p-lg">
                    <div class="text-xs text-tertiary mb-xs">Standardized Cohen PSS-10 Score</div>
                    <div class="score-number">${latest.pss_score} <span class="score-max">/ 40</span></div>
                    
                    <div class="mt-xs mb-sm">
                        <span class="badge ${levelBadgeClass} text-sm px-md py-xs">${latest.pss_level} Perceived Stress Level</span>
                    </div>

                    <div class="progress-bar max-w-sm mx-auto mb-xs">
                        <div class="progress-bar-fill" style="width: ${pssPct}%;"></div>
                    </div>

                    <div class="scale-legend">
                        <span><span class="scale-dot" style="background:#16a34a"></span> 0–13 Low</span>
                        <span><span class="scale-dot" style="background:#d97706"></span> 14–26 Moderate</span>
                        <span><span class="scale-dot" style="background:#dc2626"></span> 27–40 High</span>
                    </div>

                    <p class="text-xs text-secondary max-w-md mx-auto mt-md">
                        ${latest.description || 'Your score reflects your self-reported feelings of overload, unpredictability, and perceived coping efficacy during the past month.'}
                    </p>
                </div>

                <div class="card mb-md">
                    <div class="flex items-center justify-between mb-sm flex-wrap gap-xs">
                        <h3 class="font-semibold text-sm">Academic Performance Prediction (ML Status)</h3>
                        <span class="badge badge-accent">Research Validation In Progress</span>
                    </div>
                    <div class="p-sm bg-subtle rounded-md">
                        <p class="text-xs text-secondary">
                            <strong>Note on Machine Learning Pipeline:</strong> In accordance with GEMINI.md research integrity rules, the ML model for academic performance prediction is trained strictly on validated empirical datasets. Pilot dataset (N=16) is active for exploratory analysis; automated inference will be unlocked upon cohort scale completion.
                        </p>
                    </div>
                </div>

                <div class="card mb-md">
                    <h3 class="font-semibold text-base mb-xs">Identified Contributory Factors</h3>
                    <p class="text-xs text-secondary mb-md">Lifestyle and behavioural indicators derived from your questionnaire responses:</p>

                    ${(latest.factors && latest.factors.length > 0) ? `
                        <div class="flex flex-col gap-xs">
                            ${latest.factors.map(f => `
                                <div class="flex items-center justify-between p-sm border rounded-md">
                                    <div>
                                        <div class="font-semibold text-sm">${f.title}</div>
                                        <div class="text-xs text-tertiary">${f.detail}</div>
                                    </div>
                                    <span class="badge ${f.impact === 'High' ? 'badge-danger' : 'badge-warning'}">${f.impact} Contributor</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="p-sm bg-subtle rounded-md text-xs text-secondary">
                            No high-risk lifestyle indicators were triggered in this assessment.
                        </div>
                    `}
                </div>

                <div class="flex justify-between items-center flex-wrap gap-sm">
                    <a href="#/recommendations" class="btn btn-primary btn-lg">View Guidance →</a>
                    <div class="flex gap-xs">
                        <a href="#/simulator" class="btn btn-secondary">What-If Simulator</a>
                        <a href="#/pss" class="btn btn-ghost">Retake PSS-10</a>
                    </div>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 12 — Personalized Recommendations
       ------------------------------------------------------------ */
    renderRecommendations() {
        const latest = AppState.getLatestAssessment();
        if (!latest || !latest.recommendations) {
            return `
                <div class="card text-center p-xl">
                    <h2 class="text-lg font-bold mb-sm">No Recommendations Generated</h2>
                    <p class="text-sm text-secondary mb-md">Please complete an assessment to generate guidance.</p>
                    <a href="#/onboarding" class="btn btn-primary">Start Assessment</a>
                </div>
            `;
        }

        return `
            <div class="results-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Personalized Guidance</h1>
                        <span class="text-xs text-tertiary">Deterministic, rule-based strategies matched to your assessment</span>
                    </div>
                    <a href="#/results" class="btn btn-secondary btn-sm">← Back to Results</a>
                </div>

                <div class="flex flex-col gap-md mb-lg">
                    ${latest.recommendations.map(rec => `
                        <div class="card">
                            <div class="flex justify-between items-center mb-xs">
                                <span class="badge badge-accent">${rec.category}</span>
                                <span class="badge ${rec.badgeColor ? `badge-${rec.badgeColor}` : 'badge-secondary'}">${rec.priority} Priority</span>
                            </div>

                            <h3 class="font-bold text-base mt-xs mb-xs">${rec.title}</h3>
                            <p class="text-xs text-secondary mb-sm">${rec.summary}</p>

                            <div class="bg-subtle p-sm rounded-md mb-sm">
                                <div class="text-xs font-semibold text-primary mb-xs">Actionable Steps:</div>
                                <ul class="list-disc pl-md text-xs text-secondary flex flex-col gap-xs">
                                    ${rec.actionItems.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>

                            ${rec.linkedExperiment ? `
                                <div class="flex justify-end">
                                    <a href="#/plan" class="btn btn-secondary btn-sm">Try 7-Day ${rec.linkedExperiment} Experiment →</a>
                                </div>
                            ` : ''}

                            ${rec.disclaimer ? `
                                <div class="text-xs text-tertiary mt-xs pt-xs border-t">${rec.disclaimer}</div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>

                <div class="card p-md bg-subtle">
                    <h4 class="font-semibold text-sm mb-xs">Campus &amp; National Support Resources</h4>
                    <p class="text-xs text-secondary mb-xs">
                        If stress or academic burnout feels unmanageable, connect with campus counsellors or reach out to India's verified 24/7 mental health helpline:
                    </p>
                    <div class="flex items-center gap-md mt-xs flex-wrap">
                        <span class="badge badge-success font-semibold">Tele-MANAS: 14416 (Toll-Free)</span>
                        <span class="text-xs text-tertiary">Available 24/7 across all official languages</span>
                    </div>
                </div>

                <div class="flex justify-between mt-md">
                    <a href="#/dashboard" class="btn btn-secondary">Home Dashboard</a>
                    <a href="#/plan" class="btn btn-primary">Open 7-Day Plan →</a>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 13 — 7-Day Wellness Experiment
       ------------------------------------------------------------ */
    renderPlan() {
        const activeExp = AppState.getActiveExperiment();
        const experiments = DATA.experiments;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">7-Day Habit Experiments</h1>
                        <span class="text-xs text-tertiary">Structured micro-interventions to test empirical stress reduction</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                ${activeExp ? `
                    <div class="card mb-lg" style="border-color: var(--accent);">
                        <div class="flex justify-between items-center mb-xs">
                            <span class="badge badge-accent">Active Experiment</span>
                            <span class="text-xs font-semibold text-accent">Day ${activeExp.days.length + 1} of 7</span>
                        </div>
                        <h3 class="font-bold text-base mb-xs">
                            ${experiments.find(e => e.id === activeExp.experimentId)?.title || 'Current Experiment'}
                        </h3>
                        <p class="text-xs text-secondary mb-md">
                            ${experiments.find(e => e.id === activeExp.experimentId)?.goal || 'Daily micro-intervention.'}
                        </p>

                        <div class="progress-bar mb-md">
                            <div class="progress-bar-fill" style="width: ${(activeExp.days.length / 7) * 100}%;"></div>
                        </div>

                        <div class="mb-md">
                            <div class="text-xs font-semibold mb-xs">Completed Days:</div>
                            <div class="flex gap-xs">
                                ${[1, 2, 3, 4, 5, 6, 7].map(d => `
                                    <div class="p-xs text-center border rounded flex-1 text-xs ${d <= activeExp.days.length ? 'bg-accent text-white font-bold' : ''}">
                                        D${d}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <form id="form-log-exp-day" class="p-sm bg-subtle rounded-md flex items-center justify-between gap-sm flex-wrap">
                            <div class="text-xs font-medium">Log Today's Target:</div>
                            <input type="number" id="exp-daily-val" step="0.5" class="form-control" style="width: 100px;" placeholder="e.g. 7.5" required>
                            <button type="submit" class="btn btn-primary btn-sm">Record Day ${activeExp.days.length + 1}</button>
                        </form>
                    </div>
                ` : ''}

                <h3 class="font-semibold text-sm mb-xs">Available Experiment Protocols</h3>
                <p class="text-xs text-secondary mb-md">Select one habit track to focus on for the next 7 days:</p>

                <div class="flex flex-col gap-sm mb-lg">
                    ${experiments.map(exp => `
                        <div class="card p-md flex items-center justify-between flex-wrap gap-sm">
                            <div class="max-w-md">
                                <div class="font-semibold text-sm">${exp.title}</div>
                                <div class="text-xs text-secondary">${exp.goal}</div>
                            </div>
                            <button class="btn btn-secondary btn-sm btn-start-exp" data-id="${exp.id}" ${activeExp ? 'disabled' : ''}>
                                ${activeExp && activeExp.experimentId === exp.id ? 'In Progress' : 'Start 7-Day Protocol'}
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="card p-sm bg-subtle text-xs text-tertiary">
                    These 7-day micro-interventions allow tracking individual baseline shifts before and after behavioural changes.
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 14 — Habit Tracking
       ------------------------------------------------------------ */
    renderTracking() {
        const logs = AppState.getHabitLog();
        const streak = Tracking.getStreak();
        const summary = Tracking.getWeeklySummary();

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Daily Habit Log</h1>
                        <span class="text-xs text-tertiary">Empirical tracking of sleep, screen, study, and physical activity</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <div class="kpi-grid mb-md">
                    <div class="kpi-card">
                        <div class="kpi-label">Active Streak</div>
                        <div class="kpi-value">${streak} <span class="text-xs font-normal text-tertiary">days</span></div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-label">7-Day Avg Sleep</div>
                        <div class="kpi-value">${summary.avgSleep} <span class="text-xs font-normal text-tertiary">hrs</span></div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-label">7-Day Avg Screen</div>
                        <div class="kpi-value">${summary.avgScreen} <span class="text-xs font-normal text-tertiary">hrs</span></div>
                    </div>
                </div>

                <form id="form-log-habit" class="card mb-md">
                    <h3 class="font-semibold text-sm mb-sm">Record Today's Entry</h3>
                    <div class="grid grid-cols-2 gap-sm mb-md">
                        <div>
                            <label class="text-xs font-medium block mb-xs">Sleep Last Night (hours)</label>
                            <input type="number" id="h-sleep" step="0.5" min="0" max="14" class="form-control" placeholder="e.g. 7.0" required>
                        </div>
                        <div>
                            <label class="text-xs font-medium block mb-xs">Screen Time (non-acad, hrs)</label>
                            <input type="number" id="h-screen" step="0.5" min="0" max="16" class="form-control" placeholder="e.g. 3.5" required>
                        </div>
                        <div>
                            <label class="text-xs font-medium block mb-xs">Study Hours (outside class)</label>
                            <input type="number" id="h-study" step="0.5" min="0" max="12" class="form-control" placeholder="e.g. 2.0" required>
                        </div>
                        <div>
                            <label class="text-xs font-medium block mb-xs">Exercise / Workout (mins)</label>
                            <input type="number" id="h-exercise" step="5" min="0" max="180" class="form-control" placeholder="e.g. 30" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Save Today's Entry ✓</button>
                </form>

                <div class="card">
                    <h3 class="font-semibold text-sm mb-xs">Recent Entries</h3>
                    ${logs.length > 0 ? `
                        <div class="flex flex-col gap-xs mt-sm">
                            ${logs.slice(-5).reverse().map(l => `
                                <div class="flex items-center justify-between p-xs border-b text-xs">
                                    <span class="font-medium">${l.date}</span>
                                    <span class="text-secondary">${l.sleep_hours}h sleep · ${l.screen_hours}h screen · ${l.study_hours}h study · ${l.exercise_minutes}m exercise</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p class="text-xs text-secondary mt-xs">No daily logs recorded yet. Submit your first entry above.</p>
                    `}
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 15 — Progress & Reassessment
       ------------------------------------------------------------ */
    renderProgress() {
        const assessments = AppState.getAssessments();

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Progress Tracking</h1>
                        <span class="text-xs text-tertiary">Longitudinal stress evaluation across repeated assessments</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <div class="card mb-md">
                    <h3 class="font-semibold text-sm mb-xs">PSS-10 Longitudinal Trend</h3>
                    <p class="text-xs text-secondary mb-md">Scores tracked across time intervals:</p>
                    
                    <div style="height: 180px; position: relative;">
                        <canvas id="progress-curve-canvas"></canvas>
                    </div>
                </div>

                <div class="card mb-md">
                    <h3 class="font-semibold text-sm mb-xs">Assessment History</h3>
                    ${assessments.length > 0 ? `
                        <div class="flex flex-col gap-xs mt-sm">
                            ${assessments.map((a, idx) => `
                                <div class="flex items-center justify-between p-sm border rounded-md">
                                    <div>
                                        <div class="font-semibold text-sm">Assessment #${idx + 1}</div>
                                        <div class="text-xs text-tertiary">${new Date(a.date).toLocaleDateString()}</div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-base font-bold">${a.pss_score} / 40</span>
                                        <span class="badge ${a.pss_level === 'Low' ? 'badge-success' : a.pss_level === 'Moderate' ? 'badge-warning' : 'badge-danger'} ml-xs">
                                            ${a.pss_level}
                                        </span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p class="text-xs text-secondary mt-xs">No prior assessments on record.</p>
                    `}
                </div>

                <div class="flex justify-between items-center gap-sm">
                    <a href="#/pss" class="btn btn-primary">Retake PSS-10 →</a>
                    <a href="#/simulator" class="btn btn-secondary">What-If Simulator</a>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 16 — What-If Factor Simulator
       ------------------------------------------------------------ */
    renderSimulator() {
        const latest = AppState.getLatestAssessment();
        const baseScore = latest ? latest.pss_score : 20;
        const baseline = Simulator.mapAssessmentToNumeric(latest);

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">What-If Factor Simulator</h1>
                        <span class="text-xs text-tertiary">Interactive scenario exploration based on covariance weights</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <div class="sim-display">
                    <div>
                        <div class="sim-label">Baseline PSS</div>
                        <div class="sim-value">${baseScore}</div>
                        <span class="badge badge-secondary">Current Score</span>
                    </div>
                    <div>
                        <div class="sim-label">Simulated Projection</div>
                        <div class="sim-value" id="sim-projected-val">${baseScore}</div>
                        <span id="sim-projected-badge" class="badge badge-secondary">Simulated</span>
                    </div>
                </div>

                <div class="card mb-md">
                    <h3 class="font-semibold text-sm mb-md">Adjust Lifestyle Factors</h3>

                    <div class="slider-group">
                        <div class="slider-header">
                            <label>Sleep Duration (hours/night)</label>
                            <span id="val-slider-sleep">${baseline.sleep_hours}h</span>
                        </div>
                        <input type="range" id="slider-sleep" min="4" max="9" step="0.5" value="${baseline.sleep_hours}">
                    </div>

                    <div class="slider-group">
                        <div class="slider-header">
                            <label>Non-Academic Screen Time (hrs/day)</label>
                            <span id="val-slider-screen">${baseline.screen_time}h</span>
                        </div>
                        <input type="range" id="slider-screen" min="1" max="9" step="0.5" value="${baseline.screen_time}">
                    </div>

                    <div class="slider-group">
                        <div class="slider-header">
                            <label>Physical Activity (days/week)</label>
                            <span id="val-slider-activity">${baseline.physical_activity} days</span>
                        </div>
                        <input type="range" id="slider-activity" min="0" max="7" step="1" value="${baseline.physical_activity}">
                    </div>

                    <div class="slider-group mb-xs">
                        <div class="slider-header">
                            <label>Study Hours (hours/day outside class)</label>
                            <span id="val-slider-study">${baseline.study_hours}h</span>
                        </div>
                        <input type="range" id="slider-study" min="0" max="5" step="0.5" value="${baseline.study_hours}">
                    </div>
                </div>

                <div class="card p-sm bg-subtle text-xs text-tertiary">
                    <strong>Research Simulation Notice:</strong> Projected values are simulated heuristic estimates based on observational regression weights. They indicate directional tendencies rather than clinical guarantees.
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       RESEARCHER VIEW — Pilot Cohort (N=16 Dataset)
       ------------------------------------------------------------ */
    renderResearcher() {
        const cohort = DATA.cohortResponses;
        const avgPSS = (cohort.reduce((sum, c) => sum + c.pss_score, 0) / cohort.length).toFixed(1);
        const highCount = cohort.filter(c => c.pss_level === 'High').length;
        const modCount = cohort.filter(c => c.pss_level === 'Moderate').length;
        const lowCount = cohort.filter(c => c.pss_level === 'Low').length;

        return `
            <div class="dashboard-wrap animate-fade-in">
                <div class="card mb-md p-md" style="background: var(--text-1); color: var(--canvas);">
                    <span class="badge badge-accent mb-xs">Student Pilot Dataset</span>
                    <h2 class="text-xl font-bold" style="color: inherit;">Research Cohort Inspection (N=16)</h2>
                    <p class="text-xs" style="color: inherit; opacity: .8;">
                        Working exploratory pilot dataset collected under standardized Cohen PSS-10 protocol. Used to calibrate ML preprocessing and baseline distribution.
                    </p>
                </div>

                <div class="kpi-grid mb-md">
                    <div class="kpi-card">
                        <div class="kpi-label">Sample Size</div>
                        <div class="kpi-value">${cohort.length} <span class="text-xs font-normal text-tertiary">students</span></div>
                        <div class="kpi-sub">Pilot baseline</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-label">Mean PSS Score</div>
                        <div class="kpi-value">${avgPSS} <span class="text-xs font-normal text-tertiary">/ 40</span></div>
                        <div class="kpi-sub">Moderate cohort baseline</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-label">Distribution</div>
                        <div class="kpi-value text-sm mt-xs">
                            <span class="text-green font-bold">${lowCount} Low</span> · 
                            <span class="text-amber font-bold">${modCount} Mod</span> · 
                            <span class="text-red font-bold">${highCount} High</span>
                        </div>
                        <div class="kpi-sub">Cohen normative tiers</div>
                    </div>
                </div>

                <div class="text-xs text-tertiary mb-xs flex items-center justify-between">
                    <span>Survey Responses Table (N=16)</span>
                    <span class="text-accent">← Swipe horizontally to view all variables →</span>
                </div>

                <div class="table-container mb-md">
                    <table class="table-clean">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>CGPA</th>
                                <th>PSS</th>
                                <th>Level</th>
                                <th>Sleep</th>
                                <th>Screen</th>
                                <th>Primary Stressor</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cohort.map(c => `
                                <tr>
                                    <td class="font-mono font-medium">${c.id}</td>
                                    <td>${c.age}</td>
                                    <td>${c.gender}</td>
                                    <td>${c.course}</td>
                                    <td class="font-semibold">${c.cgpa}</td>
                                    <td class="font-bold">${c.pss_score}</td>
                                    <td>
                                        <span class="badge ${c.pss_level === 'Low' ? 'badge-success' : c.pss_level === 'Moderate' ? 'badge-warning' : 'badge-danger'}">
                                            ${c.pss_level}
                                        </span>
                                    </td>
                                    <td>${c.sleep}</td>
                                    <td>${c.screen}</td>
                                    <td>${c.source}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="card p-sm bg-subtle text-xs text-tertiary">
                    This pilot table reflects authentic student survey responses. The dataset is used to calibrate preprocessing and feature engineering pipelines. Additional responses will expand the sample size before final zonal rounds.
                </div>
            </div>
        `;
    }
};
