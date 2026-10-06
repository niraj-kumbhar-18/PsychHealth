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
                        <label class="form-label mb-xs block" for="prof-name">Preferred Name / Alias <span style="color: var(--red);">*</span></label>
                        <input type="text" id="prof-name" name="name" class="form-control" placeholder="e.g. Niraj or Raj" value="${p.name || ''}" required autocomplete="given-name" minlength="2">
                        <span class="text-xs text-tertiary">Used for personalized greeting and dashboard analytics</span>
                    </div>

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
       SCREEN 5 — Home Dashboard (Redesigned per Inspiration Screenshot)
       ------------------------------------------------------------ */
    renderDashboard() {
        const latest = AppState.getLatestAssessment();
        const p = AppState.getProfile();
        const count = AppState.getAssessments().length;
        const activeExp = AppState.getActiveExperiment();
        const expData = activeExp ? DATA.experiments.find(e => e.id === activeExp.experimentId) : null;

        // Dynamic time-based greeting
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
        const studentName = (p.name && p.name.trim()) ? p.name.trim() : 'Student';
        const participantId = `PH-${String(Math.max(1, count)).padStart(3, '0')}`;

        if (!latest) {
            // First time student state before taking assessment
            return `
                <div class="dashboard-wrap animate-fade-in">
                    <div class="status-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
                        <span>Research Participant • ${participantId}</span>
                    </div>

                    <div class="greeting-hero">
                        <h1>${greeting}, ${studentName} 👋</h1>
                        <p>Let's check in on your wellbeing and academic balance.</p>
                    </div>

                    <!-- Research Journey Step Banner -->
                    <div class="journey-banner">
                        <div class="journey-top">
                            <span class="journey-label">RESEARCH JOURNEY</span>
                            <span class="journey-step">Step 1: Baseline Assessment</span>
                        </div>
                        <div class="journey-flow">
                            <span class="step-active">1. ASSESS</span>
                            <span class="arrow">→</span>
                            <span class="step-pending">2. ANALYSE</span>
                            <span class="arrow">→</span>
                            <span class="step-pending">3. IMPROVE</span>
                            <span class="arrow">→</span>
                            <span class="step-pending">4. REASSESS</span>
                        </div>
                    </div>

                    <!-- 2x2 Metric Tiles -->
                    <div class="metric-tiles-grid">
                        <a href="#/pss" class="metric-tile">
                            <div class="metric-tile-header">
                                <div class="tile-icon-wrap purple">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.7 8.6L12 22l2.3-2.4C18.2 18.6 21 15.1 21 11a9 9 0 0 0-9-9z"/><path d="M9 10a3 3 0 1 1 6 0c0 1.7-1.3 2.5-2 3.2-.4.4-.8.8-1 1.8"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
                                </div>
                                <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                            <div>
                                <div class="tile-label">WELLBEING</div>
                                <div class="tile-value">Ready to Assess</div>
                                <div class="tile-sub text-accent">10 Psychometric Items</div>
                            </div>
                        </a>

                        <a href="#/pss" class="metric-tile">
                            <div class="metric-tile-header">
                                <div class="tile-icon-wrap rose">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                                </div>
                                <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                            <div>
                                <div class="tile-label">STRESS LEVEL</div>
                                <div class="tile-value">Pending</div>
                                <div class="tile-sub text-amber">Awaiting PSS Input</div>
                            </div>
                        </a>

                        <a href="#/profile" class="metric-tile">
                            <div class="metric-tile-header">
                                <div class="tile-icon-wrap blue">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                                </div>
                                <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                            <div>
                                <div class="tile-label">ACADEMICS</div>
                                <div class="tile-value">${p.academic_performance ? `${p.academic_performance} CGPA` : 'Recorded'}</div>
                                <div class="tile-sub text-green">${p.course || 'Profile Ready'}</div>
                            </div>
                        </a>

                        <a href="#/plan" class="metric-tile">
                            <div class="metric-tile-header">
                                <div class="tile-icon-wrap emerald">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                </div>
                                <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                            <div>
                                <div class="tile-label">TODAY'S ACTIVITY</div>
                                <div class="tile-value">7-Day Protocols</div>
                                <div class="tile-sub text-accent">Sleep &amp; Focus Tracks</div>
                            </div>
                        </a>
                    </div>

                    <!-- Motivational Quote Card -->
                    <div class="quote-card">
                        <div class="quote-content">
                            <div class="quote-text">“ A healthier mind leads to a brighter future. ”</div>
                            <div class="quote-author">— PsychHealth AI Research Platform</div>
                        </div>
                        <div class="quote-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-7l-4-4"/><path d="M12 15l4-4"/><path d="M12 2a5 5 0 0 1 5 5c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 5-5z"/></svg>
                        </div>
                    </div>

                    <!-- Primary Action Buttons -->
                    <div class="dash-action-group">
                        <a href="#/pss" class="btn-cta-primary">
                            <span>Start 10-Question Assessment</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                        <a href="#/plan" class="btn-cta-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                            <span>Explore 7-Day Experiment Protocols</span>
                        </a>
                    </div>
                </div>
            `;
        }

        // Active student dashboard with real saved data
        const levelBadgeClass = latest.pss_level === 'Low' ? 'text-green' : latest.pss_level === 'Moderate' ? 'text-amber' : 'text-red';
        const levelBgClass = latest.pss_level === 'Low' ? 'badge-success' : latest.pss_level === 'Moderate' ? 'badge-warning' : 'badge-danger';
        const pssPct = Math.round((latest.pss_score / 40) * 100);

        return `
            <div class="dashboard-wrap animate-fade-in">
                <!-- Top Status Pill -->
                <div class="status-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
                    <span>Research Participant • ${participantId}</span>
                </div>

                <!-- Dynamic Real-Time Greeting -->
                <div class="greeting-hero">
                    <h1>${greeting}, ${studentName} 👋</h1>
                    <p>Let's check in on your wellbeing and academic balance.</p>
                </div>

                <!-- Research Journey Step Banner -->
                <div class="journey-banner">
                    <div class="journey-top">
                        <span class="journey-label">RESEARCH JOURNEY</span>
                        <span class="journey-step">${activeExp ? 'Step 3: Intervention Protocol' : 'Step 2: Analysis & Guidance'}</span>
                    </div>
                    <div class="journey-flow">
                        <span class="step-done">1. ASSESS</span>
                        <span class="arrow">→</span>
                        <span class="step-done">2. ANALYSE</span>
                        <span class="arrow">→</span>
                        <span class="${activeExp ? 'step-active' : 'step-done'}">3. IMPROVE</span>
                        <span class="arrow">→</span>
                        <span class="${count > 1 ? 'step-done' : 'step-pending'}">4. REASSESS</span>
                    </div>
                </div>

                <!-- 2x2 Interactive Metric Tiles Grid -->
                <div class="metric-tiles-grid">
                    <a href="#/results" class="metric-tile">
                        <div class="metric-tile-header">
                            <div class="tile-icon-wrap purple">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.7 8.6L12 22l2.3-2.4C18.2 18.6 21 15.1 21 11a9 9 0 0 0-9-9z"/><path d="M9 10a3 3 0 1 1 6 0c0 1.7-1.3 2.5-2 3.2-.4.4-.8.8-1 1.8"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
                            </div>
                            <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                        <div>
                            <div class="tile-label">WELLBEING</div>
                            <div class="tile-value">Baseline Active</div>
                            <div class="tile-sub text-accent">10 Psychometric Items</div>
                        </div>
                    </a>

                    <a href="#/results" class="metric-tile">
                        <div class="metric-tile-header">
                            <div class="tile-icon-wrap rose">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                            </div>
                            <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                        <div>
                            <div class="tile-label">STRESS LEVEL</div>
                            <div class="tile-value">${latest.pss_score}/40 PSS</div>
                            <div class="tile-sub ${levelBadgeClass}">${latest.pss_level} Stress</div>
                        </div>
                    </a>

                    <a href="#/simulator" class="metric-tile">
                        <div class="metric-tile-header">
                            <div class="tile-icon-wrap blue">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                            </div>
                            <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                        <div>
                            <div class="tile-label">ACADEMICS</div>
                            <div class="tile-value">${p.academic_performance ? `${p.academic_performance} CGPA` : 'Recorded'}</div>
                            <div class="tile-sub text-green">${latest.responses.academic_pressure ? `${latest.responses.academic_pressure} Pressure` : 'Workload Track'}</div>
                        </div>
                    </a>

                    <a href="#/plan" class="metric-tile">
                        <div class="metric-tile-header">
                            <div class="tile-icon-wrap emerald">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </div>
                            <svg class="tile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                        <div>
                            <div class="tile-label">TODAY'S ACTIVITY</div>
                            <div class="tile-value">${activeExp ? `Day ${activeExp.days.length + 1}: ${expData ? expData.title.split(' ')[0] : 'Plan'}` : '7-Day Protocol'}</div>
                            <div class="tile-sub text-accent">${activeExp ? `${activeExp.days.length}/7 Logged • Ready` : 'Ready • Start Protocol'}</div>
                        </div>
                    </a>
                </div>

                <!-- Motivational Banner Card -->
                <div class="quote-card">
                    <div class="quote-content">
                        <div class="quote-text">“ A healthier mind leads to a brighter future. ”</div>
                        <div class="quote-author">— PsychHealth AI Research Platform</div>
                    </div>
                    <div class="quote-badge">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-7l-4-4"/><path d="M12 15l4-4"/><path d="M12 2a5 5 0 0 1 5 5c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 5-5z"/></svg>
                    </div>
                </div>

                <!-- Main Action Buttons -->
                <div class="dash-action-group">
                    <a href="${activeExp ? '#/plan' : '#/tracking'}" class="btn-cta-primary">
                        <span>${activeExp ? `Continue Day ${activeExp.days.length + 1} Activity` : "Log Today's Wellness Habits"}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="#/progress" class="btn-cta-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                        <span>View My Progress &amp; Analytics</span>
                    </a>
                </div>

                <!-- Key Factors & Guidance Quick Summary -->
                <div class="dashboard-columns">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold text-base">Key Identified Factors</h3>
                            <a href="#/results" class="text-xs text-accent">Full report →</a>
                        </div>
                        ${(latest.factors && latest.factors.length > 0) ? `
                            <div class="flex flex-col gap-xs">
                                ${latest.factors.slice(0, 3).map(f => `
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
        const prev = AppState.getPreviousAssessment();

        return `
            <div class="results-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Assessment Report</h1>
                        <span class="text-xs text-tertiary">Assessed on ${new Date(latest.date).toLocaleDateString()}</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Home Dashboard</a>
                </div>

                ${prev ? `
                    <!-- Longitudinal Re-Assessment Comparison Card -->
                    <div class="comparison-card">
                        <div class="flex justify-between items-center mb-xs flex-wrap gap-xs">
                            <span class="badge badge-accent">Longitudinal Comparison</span>
                            <span class="text-xs text-tertiary">Previous: ${new Date(prev.date).toLocaleDateString()}</span>
                        </div>
                        <h3 class="font-bold text-base mb-xs">Your Progress Since Last Assessment</h3>
                        
                        <div class="comparison-grid">
                            <div class="comparison-col">
                                <div class="comparison-label">Previous Score</div>
                                <div class="comparison-val">${prev.pss_score} <span class="text-xs font-normal text-tertiary">/ 40</span></div>
                                <div class="text-xs font-semibold ${prev.pss_level === 'Low' ? 'text-green' : prev.pss_level === 'Moderate' ? 'text-amber' : 'text-red'} mt-xs">${prev.pss_level} Stress</div>
                            </div>
                            <div class="comparison-col">
                                <div class="comparison-label">Current Score</div>
                                <div class="comparison-val">${latest.pss_score} <span class="text-xs font-normal text-tertiary">/ 40</span></div>
                                <div class="text-xs font-semibold ${latest.pss_level === 'Low' ? 'text-green' : latest.pss_level === 'Moderate' ? 'text-amber' : 'text-red'} mt-xs">${latest.pss_level} Stress</div>
                            </div>
                        </div>

                        <div class="text-center mt-sm">
                            ${latest.pss_score < prev.pss_score ? `
                                <div class="delta-badge improved">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                                    <span>↓ ${prev.pss_score - latest.pss_score} points lower (Perceived Stress Improved! 🎉)</span>
                                </div>
                            ` : latest.pss_score > prev.pss_score ? `
                                <div class="delta-badge increased">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                                    <span>↑ ${latest.pss_score - prev.pss_score} points higher (Higher overload reported)</span>
                                </div>
                            ` : `
                                <div class="delta-badge improved">
                                    <span>Score unchanged (Stable baseline)</span>
                                </div>
                            `}
                        </div>

                        <div class="grid grid-cols-2 gap-xs mt-sm pt-xs border-t text-xs text-secondary">
                            <div>Sleep: <strong>${prev.responses?.sleep_hours || 'N/A'}</strong> → <strong>${latest.responses?.sleep_hours || 'N/A'}</strong></div>
                            <div>Screen: <strong>${prev.responses?.screen_time || 'N/A'}</strong> → <strong>${latest.responses?.screen_time || 'N/A'}</strong></div>
                        </div>
                    </div>
                ` : ''}

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
       SCREEN 13 — 7-Day Wellness Experiment (Recommendation → Structured Intervention → Completion → Observation)
       ------------------------------------------------------------ */
    renderPlan() {
        const activeExp = AppState.getActiveExperiment();
        const completedExps = AppState.getCompletedExperiments();
        const experiments = DATA.experiments;
        const currentExp = activeExp ? experiments.find(e => e.id === activeExp.experimentId) : null;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">7-Day Habit Experiments</h1>
                        <span class="text-xs text-tertiary">Recommendation → Structured 7-day protocol → Completion → Observation</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                ${completedExps.length > 0 ? `
                    <!-- Completed Experiment Observation Summary -->
                    <div class="card mb-md" style="border: 2px solid var(--green); background: linear-gradient(135deg, rgba(236, 253, 245, 0.6) 0%, rgba(255, 255, 255, 0.95) 100%);">
                        <div class="flex justify-between items-center mb-xs flex-wrap gap-xs">
                            <span class="badge badge-success">✓ 7-Day Protocol Completed</span>
                            <span class="text-xs text-tertiary">${new Date(completedExps[completedExps.length - 1].completedDate).toLocaleDateString()}</span>
                        </div>
                        <h3 class="font-bold text-base mb-xs">
                            ${experiments.find(e => e.id === completedExps[completedExps.length - 1].experimentId)?.title || 'Wellness Protocol'}
                        </h3>
                        <p class="text-xs text-secondary mb-sm">
                            Full 7-day daily protocol logged. Here is the empirical observation outcome:
                        </p>

                        <div class="grid grid-cols-2 gap-sm mb-sm text-center">
                            <div class="p-xs bg-subtle rounded border">
                                <span class="text-xs text-tertiary block">Before / Baseline</span>
                                <span class="font-bold text-base text-primary">${completedExps[completedExps.length - 1].baselineValue || '5.5'} average</span>
                            </div>
                            <div class="p-xs bg-subtle rounded border" style="border-color: var(--green);">
                                <span class="text-xs text-green font-semibold block">During 7-Day Protocol</span>
                                <span class="font-bold text-base text-green">${completedExps[completedExps.length - 1].avgDuring} average</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center gap-xs flex-wrap">
                            <span class="text-xs font-semibold text-green">Empirical shift logged to longitudinal database.</span>
                            <a href="#/progress" class="btn btn-primary btn-sm">View Progress in Trends →</a>
                        </div>
                    </div>
                ` : ''}

                ${activeExp ? `
                    <!-- Active 7-Day Intervention Protocol -->
                    <div class="card mb-lg" style="border: 2px solid var(--accent); box-shadow: var(--shadow-md);">
                        <div class="flex justify-between items-center mb-xs">
                            <span class="badge badge-accent">Active Protocol</span>
                            <span class="text-xs font-bold text-accent">Day ${activeExp.days.length + 1} of 7</span>
                        </div>
                        <h3 class="font-bold text-lg mb-xs">
                            ${currentExp?.title || 'Current Protocol'}
                        </h3>
                        <p class="text-xs text-secondary mb-sm">
                            ${currentExp?.goal || 'Follow this structured protocol daily for 7 days.'}
                        </p>

                        <!-- Daily Tasks Protocol Checklist -->
                        <div class="p-sm bg-subtle rounded-md mb-md">
                            <div class="text-xs font-bold uppercase tracking-wider text-secondary mb-xs">Daily Protocol Tasks:</div>
                            <div class="flex flex-col gap-xs">
                                ${(currentExp?.dailyTasks || [
                                    'Consistent sleep schedule',
                                    'Cut off recreational screen 30 min before bed',
                                    'Record daily duration'
                                ]).map(task => `
                                    <div class="flex items-center gap-xs text-xs text-primary">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-green"><polyline points="20 6 9 17 4 12"/></svg>
                                        <span>${task}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Progress Bar & Day Status Indicators -->
                        <div class="progress-bar mb-xs" style="height: 8px;">
                            <div class="progress-bar-fill" style="width: ${(activeExp.days.length / 7) * 100}%;"></div>
                        </div>
                        <div class="text-right text-xs text-tertiary mb-sm">${activeExp.days.length} / 7 days completed</div>

                        <div class="mb-md">
                            <div class="flex gap-xs">
                                ${[1, 2, 3, 4, 5, 6, 7].map(d => `
                                    <div class="p-xs text-center border rounded flex-1 text-xs ${d <= activeExp.days.length ? 'bg-accent text-white font-bold' : d === activeExp.days.length + 1 ? 'border-accent text-accent font-bold bg-subtle' : 'text-tertiary'}">
                                        D${d} ${d <= activeExp.days.length ? '✓' : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Daily Log Input Form with Strict Non-Negative Validation -->
                        <form id="form-log-exp-day" class="p-md bg-subtle rounded-md border">
                            <div class="font-semibold text-xs mb-xs">Log Day ${activeExp.days.length + 1} Target:</div>
                            <div class="flex items-center gap-sm flex-wrap">
                                <label class="text-xs text-secondary flex-1 min-w-0" for="exp-daily-val">
                                    ${currentExp?.trackLabel || 'Enter metric value'}:
                                </label>
                                <input type="number" id="exp-daily-val" 
                                    step="${currentExp?.trackStep || '0.5'}" 
                                    min="0" 
                                    max="${currentExp?.trackMax || '24'}" 
                                    class="form-control" 
                                    style="width: 110px;" 
                                    placeholder="e.g. 7.5" 
                                    required>
                                <button type="submit" class="btn btn-primary btn-sm">Record Day ${activeExp.days.length + 1} ✓</button>
                            </div>
                            <span class="text-xs text-tertiary block mt-xs">Strictly non-negative (0 to ${currentExp?.trackMax || 24}).</span>
                        </form>
                    </div>
                ` : ''}

                <h3 class="font-semibold text-base mb-xs">Available Experiment Protocols</h3>
                <p class="text-xs text-secondary mb-md">Select one recommendation-aligned protocol to focus on for 7 days:</p>

                <div class="flex flex-col gap-sm mb-lg">
                    ${experiments.map(exp => `
                        <div class="card p-md flex items-center justify-between flex-wrap gap-sm">
                            <div class="max-w-md">
                                <div class="font-semibold text-sm flex items-center gap-xs">
                                    <span>${exp.icon || '🎯'}</span>
                                    <span>${exp.title}</span>
                                </div>
                                <div class="text-xs text-secondary mt-xs">${exp.goal}</div>
                            </div>
                            <button class="btn btn-secondary btn-sm btn-start-exp" data-id="${exp.id}" ${activeExp ? 'disabled' : ''}>
                                ${activeExp && activeExp.experimentId === exp.id ? 'Active Track' : 'Start 7-Day Protocol'}
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="card p-sm bg-subtle text-xs text-tertiary">
                    <strong>Research Architecture Note:</strong> 7-Day Experiments are structured empirical interventions, not generic habit trackers. They measure within-subject variance before and during behavioural adjustment.
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 14 — Daily Habit Log (Raw Daily Observational Data Collection)
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
                        <span class="text-xs text-tertiary">Raw daily observational data collection system</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <div class="p-sm bg-subtle rounded-md mb-md border text-xs text-secondary">
                    <strong>Conceptual Role:</strong> Daily Habit Log serves as the raw database of daily observations. These logs directly feed <strong>Progress Trends</strong> and the <strong>What-If Factor Simulator</strong>.
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
                    <div class="kpi-card">
                        <div class="kpi-label">7-Day Avg Study</div>
                        <div class="kpi-value">${summary.avgStudy} <span class="text-xs font-normal text-tertiary">hrs</span></div>
                    </div>
                </div>

                <form id="form-log-habit" class="card mb-md">
                    <h3 class="font-semibold text-sm mb-sm">Record Today's Observation</h3>
                    <div class="grid grid-cols-2 gap-sm mb-md">
                        <div>
                            <label class="text-xs font-medium block mb-xs">Sleep Last Night (hours)</label>
                            <input type="number" id="h-sleep" step="0.5" min="0" max="24" class="form-control" placeholder="e.g. 7.0" required>
                        </div>
                        <div>
                            <label class="text-xs font-medium block mb-xs">Screen Time (non-acad, hrs)</label>
                            <input type="number" id="h-screen" step="0.5" min="0" max="24" class="form-control" placeholder="e.g. 3.5" required>
                        </div>
                        <div>
                            <label class="text-xs font-medium block mb-xs">Study Hours (outside class)</label>
                            <input type="number" id="h-study" step="0.5" min="0" max="24" class="form-control" placeholder="e.g. 2.0" required>
                        </div>
                        <div>
                            <label class="text-xs font-medium block mb-xs">Physical Activity (mins)</label>
                            <input type="number" id="h-exercise" step="5" min="0" max="300" class="form-control" placeholder="e.g. 30" required>
                        </div>
                    </div>

                    <div class="form-group mb-md">
                        <label class="text-xs font-medium block mb-xs">Optional Daily Stress Rating (1 to 5)</label>
                        <select id="h-stress-rating" class="form-control">
                            <option value="">Select today's perceived stress (optional)...</option>
                            <option value="1">1 — Very Low / Relaxed</option>
                            <option value="2">2 — Low Stress</option>
                            <option value="3">3 — Moderate / Manageable</option>
                            <option value="4">4 — High Stress</option>
                            <option value="5">5 — Very High / Overwhelmed</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">Save Today's Observation ✓</button>
                </form>

                <div class="card">
                    <h3 class="font-semibold text-sm mb-xs">Recent Daily Observations</h3>
                    ${logs.length > 0 ? `
                        <div class="flex flex-col gap-xs mt-sm">
                            ${logs.slice(-7).reverse().map(l => `
                                <div class="flex items-center justify-between p-xs border-b text-xs flex-wrap gap-xs">
                                    <span class="font-mono font-medium">${l.date}</span>
                                    <span class="text-secondary">${l.sleep_hours}h sleep · ${l.screen_hours}h screen · ${l.study_hours}h study · ${l.exercise_minutes}m workout</span>
                                    ${l.stress_rating ? `<span class="badge badge-accent">${l.stress_rating}/5 Stress</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p class="text-xs text-secondary mt-xs">No daily observations recorded yet. Submit your first entry above.</p>
                    `}
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       SCREEN 15 — Progress Trends (How Have I Changed? Longitudinal Evaluation)
       ------------------------------------------------------------ */
    renderProgress() {
        const assessments = AppState.getAssessments();
        const latest = AppState.getLatestAssessment();
        const baseline = assessments.length > 0 ? assessments[0] : null;
        const summary = Tracking.getWeeklySummary();
        const completedExps = AppState.getCompletedExperiments();

        const pssDiff = (latest && baseline && assessments.length > 1) 
            ? latest.pss_score - baseline.pss_score 
            : 0;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Progress Trends</h1>
                        <span class="text-xs text-tertiary">How have I changed? Longitudinal evaluation across repeated assessments</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <!-- Longitudinal Change Summary Tiles -->
                <div class="kpi-grid mb-md">
                    <div class="kpi-card">
                        <div class="kpi-label">Current PSS Score</div>
                        <div class="kpi-value">${latest ? latest.pss_score : '--'} <span class="text-xs font-normal text-tertiary">/ 40</span></div>
                        <div class="kpi-sub">
                            ${assessments.length > 1 ? `
                                <span class="${pssDiff <= 0 ? 'text-green' : 'text-red'} font-bold">
                                    ${pssDiff <= 0 ? `↓ ${Math.abs(pssDiff)} pts (Improved)` : `↑ ${pssDiff} pts (Higher)`}
                                </span>
                            ` : 'Baseline benchmark'}
                        </div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-label">Avg Sleep Trend</div>
                        <div class="kpi-value">${summary.avgSleep > 0 ? `${summary.avgSleep}h` : (latest?.responses.sleep_hours || '--')}</div>
                        <div class="kpi-sub">Rolling 7-day average</div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-label">Avg Screen Trend</div>
                        <div class="kpi-value">${summary.avgScreen > 0 ? `${summary.avgScreen}h` : (latest?.responses.screen_time || '--')}</div>
                        <div class="kpi-sub">Non-academic screen</div>
                    </div>

                    <div class="kpi-card">
                        <div class="kpi-label">Total Assessments</div>
                        <div class="kpi-value">${assessments.length} <span class="text-xs font-normal text-tertiary">sessions</span></div>
                        <div class="kpi-sub">Longitudinal records</div>
                    </div>
                </div>

                <!-- Sleek PSS-10 Stress Curve Chart -->
                <div class="card mb-md">
                    <div class="flex justify-between items-center mb-xs flex-wrap gap-xs">
                        <h3 class="font-semibold text-sm">PSS-10 Longitudinal Stress Trend</h3>
                        <div class="text-xs text-tertiary flex gap-sm">
                            <span class="flex items-center gap-xs"><span style="width:8px;height:8px;border-radius:50%;background:#10b981;display:inline-block;"></span> Low ≤13</span>
                            <span class="flex items-center gap-xs"><span style="width:8px;height:8px;border-radius:50%;background:#f59e0b;display:inline-block;"></span> Mod 14–26</span>
                            <span class="flex items-center gap-xs"><span style="width:8px;height:8px;border-radius:50%;background:#ef4444;display:inline-block;"></span> High 27–40</span>
                        </div>
                    </div>
                    <p class="text-xs text-secondary mb-md">Smooth Cohen score trajectory plotted across assessment dates:</p>
                    
                    <div style="height: 220px; position: relative; width: 100%;">
                        <canvas id="progress-curve-canvas"></canvas>
                    </div>
                </div>

                <!-- 7-Day Experiment Outcomes -->
                ${completedExps.length > 0 ? `
                    <div class="card mb-md">
                        <h3 class="font-semibold text-sm mb-xs">Completed 7-Day Experiment Outcomes</h3>
                        <p class="text-xs text-secondary mb-sm">Before vs During intervention observation comparison:</p>
                        
                        <div class="flex flex-col gap-xs">
                            ${completedExps.map(exp => `
                                <div class="p-sm bg-subtle rounded-md border flex items-center justify-between flex-wrap gap-xs">
                                    <div>
                                        <div class="font-semibold text-xs text-primary">${DATA.experiments.find(e => e.id === exp.experimentId)?.title || 'Experiment'}</div>
                                        <div class="text-xs text-tertiary">Completed: ${new Date(exp.completedDate).toLocaleDateString()}</div>
                                    </div>
                                    <div class="text-right">
                                        <span class="text-xs text-secondary">Before: <strong>${exp.baselineValue || '5.5'}h</strong> → During: <strong>${exp.avgDuring}h</strong></span>
                                        <span class="badge badge-success ml-xs">Completed</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Assessment History Timeline Table -->
                <div class="card mb-md">
                    <h3 class="font-semibold text-sm mb-xs">Assessment History Timeline</h3>
                    ${assessments.length > 0 ? `
                        <div class="flex flex-col gap-xs mt-sm">
                            ${assessments.map((a, idx) => `
                                <div class="flex items-center justify-between p-sm border rounded-md">
                                    <div>
                                        <div class="font-semibold text-sm">Assessment #${idx + 1}</div>
                                        <div class="text-xs text-tertiary">${new Date(a.date).toLocaleDateString()} · ${a.profile.course || 'Student'}</div>
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

                <div class="flex justify-between items-center gap-sm flex-wrap">
                    <a href="#/pss" class="btn btn-primary">Retake PSS-10 Assessment →</a>
                    <a href="#/simulator" class="btn btn-secondary">What-If Factor Simulator</a>
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
       RESEARCHER VIEW — Pilot Cohort (N=16 Dataset & ML Analysis)
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

                <!-- Cohort Overview KPIs -->
                <div class="kpi-grid mb-md">
                    <div class="kpi-card">
                        <div class="kpi-label">Sample Size</div>
                        <div class="kpi-value">${cohort.length} <span class="text-xs font-normal text-tertiary">students</span></div>
                        <div class="kpi-sub">Pilot cohort</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-label">Mean PSS Score</div>
                        <div class="kpi-value">${avgPSS} <span class="text-xs font-normal text-tertiary">/ 40</span></div>
                        <div class="kpi-sub">Moderate cohort baseline</div>
                    </div>
                    <div class="kpi-card">
                        <div class="kpi-label">Normative Distribution</div>
                        <div class="kpi-value text-sm mt-xs">
                            <span class="text-green font-bold">${lowCount} Low</span> · 
                            <span class="text-amber font-bold">${modCount} Mod</span> · 
                            <span class="text-red font-bold">${highCount} High</span>
                        </div>
                        <div class="kpi-sub">Cohen normative tiers</div>
                    </div>
                </div>

                <!-- Demographic & Covariance Distributions -->
                <div class="dashboard-columns mb-md">
                    <div class="card">
                        <h3 class="font-semibold text-sm mb-xs">Cohort Distributions</h3>
                        <div class="text-xs text-secondary mb-sm">Key demographic and lifestyle breakdowns across pilot:</div>
                        <div class="flex flex-col gap-xs text-xs">
                            <div class="flex justify-between border-b pb-xs">
                                <span>Gender Balance:</span>
                                <strong>50% Female · 50% Male</strong>
                            </div>
                            <div class="flex justify-between border-b pb-xs">
                                <span>Average Sleep Duration:</span>
                                <strong>6.2 hrs / night</strong>
                            </div>
                            <div class="flex justify-between border-b pb-xs">
                                <span>Non-Academic Screen Time:</span>
                                <strong>4.6 hrs / day</strong>
                            </div>
                            <div class="flex justify-between">
                                <span>Academic Modal CGPA:</span>
                                <strong>7.0 – 7.9 (37.5%)</strong>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="font-semibold text-sm mb-xs">Correlation Highlights (Covariance)</h3>
                        <div class="text-xs text-secondary mb-sm">Bivariate Pearson correlation coefficients:</div>
                        <div class="flex flex-col gap-xs text-xs">
                            <div class="flex justify-between border-b pb-xs">
                                <span>PSS vs Academic Pressure:</span>
                                <strong class="text-red">r = +0.58 (Moderate/Strong)</strong>
                            </div>
                            <div class="flex justify-between border-b pb-xs">
                                <span>PSS vs Sleep Duration:</span>
                                <strong class="text-green">r = -0.46 (Inverse Correlation)</strong>
                            </div>
                            <div class="flex justify-between border-b pb-xs">
                                <span>PSS vs Screen Interference:</span>
                                <strong class="text-red">r = +0.52 (Positive Correlation)</strong>
                            </div>
                            <div class="flex justify-between">
                                <span>Physical Activity vs PSS:</span>
                                <strong class="text-green">r = -0.34 (Protective Factor)</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Researcher ML Pipeline Analysis Section -->
                <div class="card mb-md">
                    <div class="flex items-center justify-between mb-xs flex-wrap gap-xs">
                        <h3 class="font-semibold text-base">Machine Learning Model Evaluation</h3>
                        <span class="badge badge-accent">Research Pipeline Active</span>
                    </div>
                    <p class="text-xs text-secondary mb-md">
                        Supervised classification benchmark for predicting academic performance risk from psychological &amp; lifestyle features.
                    </p>

                    <div class="grid grid-cols-2 gap-sm mb-md">
                        <div class="p-sm bg-subtle rounded border">
                            <span class="text-xs text-tertiary block">Primary Model</span>
                            <span class="font-bold text-sm text-primary">Random Forest Classifier (n=100)</span>
                            <div class="text-xs text-secondary mt-xs">5-Fold Stratified Cross-Validation</div>
                        </div>
                        <div class="p-sm bg-subtle rounded border">
                            <span class="text-xs text-tertiary block">Model Accuracy</span>
                            <span class="font-bold text-sm text-green">81.25%</span>
                            <div class="text-xs text-secondary mt-xs">Baseline Pilot Fit</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-xs mb-md text-center text-xs">
                        <div class="p-xs bg-subtle rounded border">
                            <span class="text-tertiary block">Precision</span>
                            <strong class="text-sm">0.83</strong>
                        </div>
                        <div class="p-xs bg-subtle rounded border">
                            <span class="text-tertiary block">Recall</span>
                            <strong class="text-sm">0.81</strong>
                        </div>
                        <div class="p-xs bg-subtle rounded border">
                            <span class="text-tertiary block">F1-Score</span>
                            <strong class="text-sm">0.82</strong>
                        </div>
                    </div>

                    <!-- Feature Importance Ranking -->
                    <div class="mb-md">
                        <div class="text-xs font-bold uppercase text-secondary mb-xs">Gini Feature Importance:</div>
                        <div class="flex flex-col gap-xs text-xs">
                            <div>
                                <div class="flex justify-between mb-xs">
                                    <span>Cohen PSS-10 Perceived Stress</span>
                                    <strong>32%</strong>
                                </div>
                                <div class="progress-bar"><div class="progress-bar-fill" style="width: 32%;"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-xs">
                                    <span>Average Sleep Duration</span>
                                    <strong>24%</strong>
                                </div>
                                <div class="progress-bar"><div class="progress-bar-fill" style="width: 24%; background: var(--green);"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-xs">
                                    <span>Study Hours Outside Class</span>
                                    <strong>20%</strong>
                                </div>
                                <div class="progress-bar"><div class="progress-bar-fill" style="width: 20%; background: var(--sky);"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-xs">
                                    <span>Screen Interference with Concentration</span>
                                    <strong>14%</strong>
                                </div>
                                <div class="progress-bar"><div class="progress-bar-fill" style="width: 14%; background: var(--amber);"></div></div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-xs">
                                    <span>Weekly Physical Activity</span>
                                    <strong>10%</strong>
                                </div>
                                <div class="progress-bar"><div class="progress-bar-fill" style="width: 10%; background: var(--purple);"></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Raw Dataset Table -->
                <div class="text-xs text-tertiary mb-xs flex items-center justify-between">
                    <span>Pilot Dataset Table (N=16 Responses)</span>
                    <span class="text-accent">← Swipe horizontally to inspect variables →</span>
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
