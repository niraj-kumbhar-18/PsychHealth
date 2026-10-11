/* ============================================================
   PsychHealth — Screen Rendering Engine
   Clean, minimal, clinical design following GEMINI.md.
   Strictly Mobile-First Responsive Layouts with Touch Optimization.
   ============================================================ */

const Screens = {
    pssCurrentQuestion: 1,
    onboardingStep: 1,

    formatRealDateTime(dateStr) {
        if (!dateStr) return 'Not recorded';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const now = new Date();
        const isToday = d.toDateString() === now.toDateString();
        const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (isToday) {
            return `Today at ${timeStr}`;
        }
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        if (d.toDateString() === yesterday.toDateString()) {
            return `Yesterday at ${timeStr}`;
        }
        const datePart = d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
        return `${datePart} at ${timeStr}`;
    },

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

                <!-- CTA Bottom -->
                <div class="welcome-bottom">
                    ${AppState.isLoggedIn() ? `
                        <div class="p-xs mb-xs text-center" style="background: rgba(13,148,136,0.08); border-radius: 8px;">
                            <span class="text-xs font-semibold text-accent">Logged in as ${AppState.getProfile().name || 'Student'} (${AppState.getActiveStudentId()})</span>
                        </div>
                        <a href="#/dashboard" class="btn btn-primary btn-lg btn-block mb-xs" style="min-height: 50px; font-size: 1rem; border-radius: 12px;">
                            <span>Go to Dashboard →</span>
                        </a>
                        <div class="flex gap-xs mt-xs">
                            <a href="#/pss" class="btn btn-secondary btn-block text-xs" style="min-height: 40px;">
                                Take Assessment
                            </a>
                            <button type="button" id="btn-splash-logout" class="btn btn-ghost btn-block text-xs" style="min-height: 40px;">
                                Log Out
                            </button>
                        </div>
                    ` : `
                        <a href="#/register" class="btn btn-primary btn-lg btn-block mb-xs" style="min-height: 52px; font-size: 1rem; border-radius: 12px;">
                            <span>Get Started (New Student) →</span>
                        </a>
                        <a href="#/login" class="btn btn-secondary btn-block text-sm" style="min-height: 44px; border-radius: 10px;">
                            <span>Sign In to Existing Account</span>
                        </a>
                        <div class="welcome-caption mt-xs">A Student Research Assessment Platform</div>
                    `}
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       AUTH SCREEN A — Student Login
       ------------------------------------------------------------ */
    renderLogin() {
        return `
            <div class="auth-wrap animate-fade-in">
                <div class="auth-header">
                    <div class="auth-logo-badge">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    </div>
                    <h1 class="text-xl font-bold mb-xs">Student Account Login</h1>
                    <p class="text-xs text-secondary">Sign in to access your personal assessment history and habit logs.</p>
                </div>

                <div class="card p-lg mb-sm">
                    <div class="auth-tabs">
                        <a href="#/login" class="auth-tab-btn active">Sign In</a>
                        <a href="#/register" class="auth-tab-btn">Register New</a>
                    </div>

                    <form id="form-student-login">
                        <div class="form-group mb-sm">
                            <label class="form-label text-xs block mb-xs" for="login-student-id">Student ID / Roll No</label>
                            <input type="text" id="login-student-id" name="student_id" class="form-control" placeholder="e.g. STU-101" required autofocus>
                        </div>

                        <div class="form-group mb-md">
                            <label class="form-label text-xs block mb-xs" for="login-password">Password</label>
                            <input type="password" id="login-password" name="password" class="form-control" placeholder="Enter password" required>
                        </div>

                        <div id="login-error-msg" class="text-xs text-danger font-medium mb-sm" style="display:none;"></div>

                        <button type="submit" class="btn btn-primary btn-block btn-lg" style="min-height: 48px;">
                            <span>Log In to Dashboard →</span>
                        </button>
                    </form>

                    </div>

                <div class="text-center text-xs text-secondary">
                    Don't have an account yet? <a href="#/register" class="text-accent font-semibold">Register as New Student →</a>
                </div>
            </div>
        `;
    },

    /* ------------------------------------------------------------
       AUTH SCREEN B — Student Registration
       ------------------------------------------------------------ */
    renderRegister() {
        return `
            <div class="auth-wrap animate-fade-in" style="max-width: 480px;">
                <div class="auth-header">
                    <div class="auth-logo-badge">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                    </div>
                    <h1 class="text-xl font-bold mb-xs">New Student Registration</h1>
                    <p class="text-xs text-secondary">Create your dedicated student account. All your data is strictly private.</p>
                </div>

                <div class="card p-lg mb-sm">
                    <div class="auth-tabs">
                        <a href="#/login" class="auth-tab-btn">Sign In</a>
                        <a href="#/register" class="auth-tab-btn active">Register New</a>
                    </div>

                    <form id="form-student-register">
                        <div class="font-semibold text-xs text-accent uppercase tracking-wider mb-xs">Step 1 — Credentials</div>
                        
                        <div class="form-group mb-xs">
                            <label class="form-label text-xs block mb-xs" for="reg-student-id">Student ID / Roll No *</label>
                            <input type="text" id="reg-student-id" name="student_id" class="form-control" placeholder="e.g. STU-202" required>
                        </div>

                        <div class="form-group mb-xs">
                            <label class="form-label text-xs block mb-xs" for="reg-name">Full Name / Alias *</label>
                            <input type="text" id="reg-name" name="name" class="form-control" placeholder="e.g. Rahul Sharma" required>
                        </div>

                        <div class="form-group mb-md">
                            <label class="form-label text-xs block mb-xs" for="reg-password">Password *</label>
                            <input type="password" id="reg-password" name="password" class="form-control" placeholder="Choose a password" required>
                        </div>

                        <div class="font-semibold text-xs text-accent uppercase tracking-wider mb-xs pt-xs border-t">Step 2 — Academic Context</div>

                        <div class="form-group mb-xs">
                            <label class="form-label text-xs block mb-xs" for="reg-course">Course / Stream *</label>
                            <select id="reg-course" name="course" class="form-control" required>
                                <option value="" disabled selected>Select Course</option>
                                <option value="B.Sc. Computer Science">B.Sc. Computer Science</option>
                                <option value="BCA">BCA</option>
                                <option value="B.Com">B.Com</option>
                                <option value="B.A.">B.A.</option>
                                <option value="B.Sc.">B.Sc.</option>
                                <option value="B.E./B.Tech.">B.E./B.Tech.</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-xs mb-xs">
                            <div class="form-group">
                                <label class="form-label text-xs block mb-xs" for="reg-year">Year of Study *</label>
                                <select id="reg-year" name="year" class="form-control" required>
                                    <option value="" disabled selected>Select Year</option>
                                    <option value="First Year">First Year</option>
                                    <option value="Second Year">Second Year</option>
                                    <option value="Third Year">Third Year</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label text-xs block mb-xs" for="reg-performance">Latest CGPA</label>
                                <select id="reg-performance" name="academic_performance" class="form-control">
                                    <option value="" disabled selected>Select CGPA</option>
                                    <option value="9.0–10.0">9.0–10.0</option>
                                    <option value="8.0–8.9">8.0–8.9</option>
                                    <option value="7.0–7.9">7.0–7.9</option>
                                    <option value="6.0–6.9">6.0–6.9</option>
                                    <option value="5.0–5.9">5.0–5.9</option>
                                    <option value="Below 5.0">Below 5.0</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-xs mb-md">
                            <div class="form-group">
                                <label class="form-label text-xs block mb-xs" for="reg-age">Age Group</label>
                                <select id="reg-age" name="age_group" class="form-control">
                                    <option value="18–20">18–20</option>
                                    <option value="21–23" selected>21–23</option>
                                    <option value="24 or above">24 or above</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label class="form-label text-xs block mb-xs" for="reg-gender">Gender</label>
                                <select id="reg-gender" name="gender" class="form-control">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary / Other">Non-binary / Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div id="reg-error-msg" class="text-xs text-danger font-medium mb-sm" style="display:none;"></div>

                        <button type="submit" class="btn btn-primary btn-block btn-lg" style="min-height: 48px;">
                            <span>Register &amp; Begin Assessment →</span>
                        </button>
                    </form>
                </div>

                <div class="text-center text-xs text-secondary">
                    Already have an account? <a href="#/login" class="text-accent font-semibold">Log In here →</a>
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
                        <label class="form-label mb-xs block" for="prof-name">Name / Preferred Alias</label>
                        <input type="text" id="prof-name" name="name" class="form-control" placeholder="e.g. Alex M. or Student-04" value="${p.name || ''}" required>
                        <span class="text-xs text-tertiary">Used for personalizing your dashboard greeting and progress tracking.</span>
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
       SCREEN 5 — Home Dashboard
       ------------------------------------------------------------ */
    renderDashboard() {
        const latest = AppState.getLatestAssessment();
        const p = AppState.getProfile();
        const count = AppState.getAssessments().length;

        // Real-time greeting calculation
        const hour = new Date().getHours();
        let greetingTime = 'Good morning';
        if (hour >= 12 && hour < 17) {
            greetingTime = 'Good afternoon';
        } else if (hour >= 17) {
            greetingTime = 'Good evening';
        }
        const studentName = p.name ? p.name : 'Student';
        const greeting = `${greetingTime}, ${studentName} 👋`;

        if (!latest) {
            // First time student state
            return `
                <div class="dashboard-wrap animate-fade-in">
                    <div class="dash-header">
                        <div>
                            <h1 class="text-2xl font-bold">${greeting}</h1>
                            <p class="text-sm text-secondary">Student ID: <span class="font-mono font-medium text-primary">${AppState.getActiveStudentId()}</span> · Track perceived stress &amp; academic resilience.</p>
                        </div>
                        <div class="flex gap-xs items-center">
                            <button type="button" id="btn-dash-logout" class="btn btn-ghost btn-sm text-tertiary" title="Log Out" style="border: 1px solid var(--border);">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Log Out
                            </button>
                        </div>
                    </div>

                    <div class="card p-xl mb-lg text-center" style="border-top: 4px solid var(--accent); background: linear-gradient(180deg, rgba(13,148,136,0.05) 0%, var(--surface) 100%);">
                        <span class="badge badge-accent mb-sm">No Active Assessment</span>
                        <h2 class="text-xl font-bold mb-xs">Welcome to PsychHealth, ${p.name || 'Student'}</h2>
                        <p class="text-secondary max-w-md mx-auto mb-md text-sm">
                            You have not completed an assessment yet. Complete the standardized 10-question PSS-10 questionnaire along with your lifestyle variables to generate personalized recommendations.
                        </p>
                        <a href="#/pss" class="btn btn-primary btn-lg">Start First Assessment →</a>
                    </div>

                    <div class="kpi-grid">
                        <div class="card" style="border-left: 4px solid #0d9488;">
                            <h3 class="font-semibold text-sm mb-xs text-accent">Standardized PSS-10</h3>
                            <p class="text-xs text-secondary">Measures unpredictability, overload, and confidence under the Cohen scale.</p>
                        </div>
                        <div class="card" style="border-left: 4px solid #6366f1;">
                            <h3 class="font-semibold text-sm mb-xs" style="color:#6366f1;">Actionable Guidance</h3>
                            <p class="text-xs text-secondary">Deterministic rule-based recommendations for sleep, screen, and study hygiene.</p>
                        </div>
                        <div class="card" style="border-left: 4px solid #f59e0b;">
                            <h3 class="font-semibold text-sm mb-xs" style="color:#f59e0b;">What-If Simulation</h3>
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
                        <h1 class="text-2xl font-bold">${greeting}</h1>
                        <p class="text-sm text-secondary">
                            ${p.course ? `${p.course} · ${p.year || 'Student'}` : 'Participant Overview'} · Last assessed: <span class="font-medium text-primary">${this.formatRealDateTime(latest.date)}</span>
                        </p>
                    </div>
                    <div class="flex gap-xs flex-wrap items-center">
                        <a href="#/pss" class="btn btn-primary btn-sm">Retake Assessment</a>
                        <a href="#/simulator" class="btn btn-secondary btn-sm">What-If Simulator</a>
                        <button type="button" id="btn-dash-logout" class="btn btn-ghost btn-sm text-tertiary" title="Log Out" style="border: 1px solid var(--border);">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Log Out
                        </button>
                    </div>
                </div>

                <!-- Quick Actions for Instant Access (Returning User Hub) -->
                <div class="dash-quick-actions mb-md">
                    <a href="#/pss" class="quick-action-card highlight">
                        <div class="quick-action-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </div>
                        <div class="quick-action-content">
                            <span class="quick-action-title">Take PSS Assessment</span>
                            <span class="quick-action-desc">Direct 10-question checkup</span>
                        </div>
                        <span class="quick-action-arrow">→</span>
                    </a>

                    <a href="#/tracking" class="quick-action-card">
                        <div class="quick-action-icon icon-blue">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        </div>
                        <div class="quick-action-content">
                            <span class="quick-action-title">Daily Habit Log</span>
                            <span class="quick-action-desc">Record sleep &amp; screen</span>
                        </div>
                        <span class="quick-action-arrow">→</span>
                    </a>

                    <a href="#/plan" class="quick-action-card">
                        <div class="quick-action-icon icon-green">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        </div>
                        <div class="quick-action-content">
                            <span class="quick-action-title">7-Day Experiment</span>
                            <span class="quick-action-desc">Targeted wellness goal</span>
                        </div>
                        <span class="quick-action-arrow">→</span>
                    </a>

                    <a href="#/progress" class="quick-action-card">
                        <div class="quick-action-icon icon-amber">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                        </div>
                        <div class="quick-action-content">
                            <span class="quick-action-title">Progress Trends</span>
                            <span class="quick-action-desc">Longitudinal curve</span>
                        </div>
                        <span class="quick-action-arrow">→</span>
                    </a>
                </div>

                <!-- Responsive 1-3 Column KPI Grid with Rich Vibrant Visual Accents -->
                <div class="kpi-grid">
                    <!-- Hero KPI Card: PSS-10 Primary Score -->
                    <div class="kpi-card hero-kpi" style="border-left: 4px solid var(--accent); background: linear-gradient(135deg, rgba(13,148,136,0.08) 0%, var(--surface) 100%);">
                        <div>
                            <div class="flex justify-between items-center mb-xs">
                                <span class="kpi-label" style="color: var(--accent);">Perceived Stress (PSS-10)</span>
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

                    <!-- Sleep Duration KPI Card -->
                    <div class="kpi-card" style="border-left: 4px solid #6366f1; background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, var(--surface) 100%);">
                        <div>
                            <span class="kpi-label" style="color: #6366f1;">Average Sleep</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.sleep_hours || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">${latest.responses.sleep_quality ? `Day fatigue: ${latest.responses.sleep_quality}` : 'Self-reported'}</div>
                    </div>

                    <!-- Screen Time KPI Card -->
                    <div class="kpi-card" style="border-left: 4px solid #f59e0b; background: linear-gradient(135deg, rgba(245,158,11,0.06) 0%, var(--surface) 100%);">
                        <div>
                            <span class="kpi-label" style="color: #f59e0b;">Screen Time (Non-Acad)</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.screen_time || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">${latest.responses.screen_interference ? `Interference: ${latest.responses.screen_interference}` : 'Recreational'}</div>
                    </div>

                    <!-- Academic Pressure KPI Card -->
                    <div class="kpi-card" style="border-left: 4px solid #ec4899; background: linear-gradient(135deg, rgba(236,72,153,0.06) 0%, var(--surface) 100%);">
                        <div>
                            <span class="kpi-label" style="color: #ec4899;">Academic Pressure</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.academic_pressure || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">${latest.responses.academic_stress_source ? `Source: ${latest.responses.academic_stress_source}` : 'Coursework'}</div>
                    </div>

                    <!-- Physical Activity KPI Card -->
                    <div class="kpi-card" style="border-left: 4px solid #10b981; background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, var(--surface) 100%);">
                        <div>
                            <span class="kpi-label" style="color: #10b981;">Physical Activity</span>
                            <div class="kpi-value text-base mt-xs">${latest.responses.physical_activity || 'Not recorded'}</div>
                        </div>
                        <div class="kpi-sub">30+ min exercise / week</div>
                    </div>

                    <!-- Longitudinal Assessment Count Card -->
                    <div class="kpi-card" style="border-left: 4px solid #06b6d4; background: linear-gradient(135deg, rgba(6,182,212,0.06) 0%, var(--surface) 100%);">
                        <div>
                            <span class="kpi-label" style="color: #06b6d4;">Assessment History</span>
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
        const displayText = q.text.replace(/^In the last month,\s*/i, '');

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
                    <h2 class="question-text">${displayText}</h2>

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

        const assessments = AppState.getAssessments();
        const prev = assessments.length > 1 ? assessments[assessments.length - 2] : null;
        const levelBadgeClass = latest.pss_level === 'Low' ? 'badge-success' : latest.pss_level === 'Moderate' ? 'badge-warning' : 'badge-danger';
        const pssPct = Math.round((latest.pss_score / 40) * 100);

        return `
            <div class="results-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Assessment Report</h1>
                        <span class="text-xs text-tertiary">Assessed on ${this.formatRealDateTime(latest.date)}</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Home Dashboard</a>
                </div>

                <!-- Half-Circle Speedometer Scoring Gauge -->
                <div class="gauge-meter-card mb-md">
                    <div class="text-xs text-tertiary mb-xs font-semibold uppercase tracking-wider">Perceived Stress Assessment (Cohen PSS-10)</div>
                    
                    <div class="gauge-container">
                        <svg class="gauge-svg" viewBox="0 0 320 180">
                            <!-- Background Arc Track -->
                            <path d="M 45 145 A 115 115 0 0 1 275 145" fill="none" stroke="var(--subtle)" stroke-width="22" stroke-linecap="round" />
                            
                            <!-- Zone 1: Low (0 to 13) Green -->
                            <path d="M 45 145 A 115 115 0 0 1 100 53" fill="none" stroke="#10b981" stroke-width="16" stroke-linecap="round" opacity="0.9" />
                            
                            <!-- Zone 2: Moderate (14 to 26) Amber -->
                            <path d="M 103 49 A 115 115 0 0 1 217 49" fill="none" stroke="#f59e0b" stroke-width="16" opacity="0.9" />
                            
                            <!-- Zone 3: High (27 to 40) Coral Red -->
                            <path d="M 220 53 A 115 115 0 0 1 275 145" fill="none" stroke="#ef4444" stroke-width="16" stroke-linecap="round" opacity="0.9" />
                            
                            <!-- Cohen Scale Calibration Marks & Labels -->
                            <text x="36" y="165" font-size="11" font-weight="700" fill="var(--text-3)" text-anchor="middle">0</text>
                            <text x="92" y="38" font-size="11" font-weight="700" fill="#10b981" text-anchor="middle">13</text>
                            <text x="228" y="38" font-size="11" font-weight="700" fill="#f59e0b" text-anchor="middle">26</text>
                            <text x="284" y="165" font-size="11" font-weight="700" fill="#ef4444" text-anchor="middle">40</text>

                            <!-- Rotating Needle Indicator Group -->
                            <g class="gauge-needle-group gauge-needle-calculating" style="--target-angle: ${Math.round(-90 + (Math.max(0, Math.min(40, latest.pss_score)) / 40) * 180)}deg;">
                                <!-- Needle Pointer -->
                                <path d="M 157 145 L 159.2 40 L 160.8 40 L 163 145 Z" fill="var(--text-1)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
                                <polygon points="157.5,43 160,32 162.5,43" fill="var(--accent)" />
                                <!-- Central Pivot Hub -->
                                <circle cx="160" cy="145" r="14" fill="var(--surface)" stroke="var(--accent)" stroke-width="4" />
                                <circle cx="160" cy="145" r="5" fill="var(--text-1)" />
                            </g>
                        </svg>

                        <div class="gauge-readout-overlay">
                            <div class="gauge-digital-score">
                                <span id="gauge-score-counter">${latest.pss_score}</span>
                                <span class="gauge-digital-max">/ 40</span>
                            </div>
                            <div class="gauge-status-badge ${latest.pss_level.toLowerCase()}">
                                <span class="gauge-pulse-dot"></span>
                                <span>${latest.pss_level} Perceived Stress</span>
                            </div>
                        </div>
                    </div>

                    <!-- Scale Legend Tiers -->
                    <div class="scale-legend mt-sm">
                        <span><span class="scale-dot" style="background:#10b981"></span> 0–13 Low Stress</span>
                        <span><span class="scale-dot" style="background:#f59e0b"></span> 14–26 Moderate</span>
                        <span><span class="scale-dot" style="background:#ef4444"></span> 27–40 High Stress</span>
                    </div>

                    <p class="text-xs text-secondary max-w-md mx-auto mt-md">
                        ${latest.description || 'Standardized Cohen PSS-10 score measuring degree of unpredictability, uncontrollability, and perceived coping efficacy.'}
                    </p>
                </div>

                ${prev ? `
                    <div class="card mb-md" style="border-left: 4px solid var(--accent); background: linear-gradient(180deg, rgba(13,148,136,0.04) 0%, var(--surface) 100%);">
                        <div class="flex justify-between items-center mb-xs flex-wrap gap-xs">
                            <span class="badge badge-accent">Longitudinal Comparison</span>
                            <span class="text-xs text-tertiary">Session #${assessments.length - 1} vs Session #${assessments.length}</span>
                        </div>
                        <h3 class="font-bold text-base mb-xs">Previous vs Current Assessment Comparison</h3>
                        <p class="text-xs text-secondary mb-md">
                            Comparing your previous session (${new Date(prev.date).toLocaleDateString()}) with today's results:
                        </p>

                        <div class="table-container mb-sm">
                            <table class="table-clean text-xs">
                                <thead>
                                    <tr>
                                        <th>Metric / Factor</th>
                                        <th>Previous Score</th>
                                        <th>Current Score</th>
                                        <th>Observed Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="font-semibold">PSS-10 Total Score</td>
                                        <td>${prev.pss_score} / 40 (${prev.pss_level})</td>
                                        <td class="font-bold">${latest.pss_score} / 40 (${latest.pss_level})</td>
                                        <td>
                                            ${latest.pss_score < prev.pss_score ? `
                                                <span class="badge badge-success">-${prev.pss_score - latest.pss_score} pts ↓ (Improved)</span>
                                            ` : latest.pss_score > prev.pss_score ? `
                                                <span class="badge badge-danger">+${latest.pss_score - prev.pss_score} pts ↑</span>
                                            ` : `
                                                <span class="badge badge-secondary">0 pts (Unchanged)</span>
                                            `}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Average Sleep</td>
                                        <td>${prev.responses?.sleep_hours || 'Not recorded'}</td>
                                        <td class="font-semibold">${latest.responses?.sleep_hours || 'Not recorded'}</td>
                                        <td>${prev.responses?.sleep_hours === latest.responses?.sleep_hours ? '<span class="text-tertiary">Same</span>' : '<span class="text-accent font-medium">Updated</span>'}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Screen Time (Non-Acad)</td>
                                        <td>${prev.responses?.screen_time || 'Not recorded'}</td>
                                        <td class="font-semibold">${latest.responses?.screen_time || 'Not recorded'}</td>
                                        <td>${prev.responses?.screen_time === latest.responses?.screen_time ? '<span class="text-tertiary">Same</span>' : '<span class="text-accent font-medium">Updated</span>'}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Academic Pressure</td>
                                        <td>${prev.responses?.academic_pressure || 'Not recorded'}</td>
                                        <td class="font-semibold">${latest.responses?.academic_pressure || 'Not recorded'}</td>
                                        <td>${prev.responses?.academic_pressure === latest.responses?.academic_pressure ? '<span class="text-tertiary">Same</span>' : '<span class="text-accent font-medium">Updated</span>'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-xs text-tertiary flex justify-between items-center flex-wrap gap-xs">
                            <span>*Personal longitudinal trajectory across repeated evaluations.</span>
                            <a href="#/progress" class="text-accent font-semibold">View Full Progress Trends Curve →</a>
                        </div>
                    </div>
                ` : ''}

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
        const lastExp = AppState.getLastCompletedExperiment();
        const experiments = DATA.experiments;

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">7-Day Habit Experiments</h1>
                        <span class="text-xs text-tertiary">Recommendation → Structured 7-day intervention → Completion → Observation</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                ${activeExp ? `
                    <div class="card mb-lg" style="border-left: 4px solid var(--accent); background: linear-gradient(180deg, rgba(13,148,136,0.04) 0%, var(--surface) 100%);">
                        <div class="flex justify-between items-center mb-xs flex-wrap gap-xs">
                            <span class="badge badge-accent">Active Protocol</span>
                            <span class="text-xs font-semibold text-accent">Day ${activeExp.days.length + 1} of 7</span>
                        </div>
                        <h3 class="font-bold text-base mb-xs">
                            ${experiments.find(e => e.id === activeExp.experimentId)?.title || '7-Day Experiment'}
                        </h3>
                        <p class="text-xs text-secondary mb-sm">
                            <strong>Goal:</strong> ${experiments.find(e => e.id === activeExp.experimentId)?.goal || 'Improve consistency'}
                        </p>

                        <div class="p-xs bg-subtle rounded text-xs text-secondary mb-md">
                            <strong>Daily Protocol:</strong> Consistent schedule · Zero recreational screens 30 min before bed · Record daily target
                        </div>

                        <div class="progress-bar mb-md">
                            <div class="progress-bar-fill" style="width: ${(activeExp.days.length / 7) * 100}%;"></div>
                        </div>

                        <div class="mb-md">
                            <div class="text-xs font-semibold mb-xs">Protocol Progression:</div>
                            <div class="flex gap-xs flex-wrap">
                                ${[1, 2, 3, 4, 5, 6, 7].map(d => `
                                    <div class="p-xs text-center border rounded flex-1 min-w-[42px] text-xs ${d <= activeExp.days.length ? 'bg-accent text-white font-bold' : ''}">
                                        ${d <= activeExp.days.length ? `Day ${d} ✓` : `Day ${d}`}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <form id="form-log-exp-day" class="p-sm bg-subtle rounded-md flex items-center justify-between gap-sm flex-wrap">
                            <div class="text-xs font-medium">Log Day ${activeExp.days.length + 1} Target:</div>
                            <div class="flex items-center gap-xs">
                                <input type="number" id="exp-daily-val" step="0.5" min="0" max="24" class="form-control" style="width: 100px;" placeholder="e.g. 7.0" required>
                                <span class="text-xs text-tertiary">hrs</span>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm">Record Day ${activeExp.days.length + 1} →</button>
                        </form>
                    </div>
                ` : ''}

                ${(!activeExp && lastExp) ? `
                    <div class="card mb-lg" style="border-left: 4px solid #16a34a; background: linear-gradient(180deg, rgba(22,163,74,0.05) 0%, var(--surface) 100%);">
                        <div class="flex justify-between items-center mb-xs flex-wrap gap-xs">
                            <span class="badge badge-success">Protocol Completed 🎉</span>
                            <span class="text-xs text-tertiary">Finished ${this.formatRealDateTime(lastExp.completionDate)}</span>
                        </div>
                        <h3 class="font-bold text-base mb-xs">
                            ${experiments.find(e => e.id === lastExp.experimentId)?.title || '7-Day Sleep Experiment'}
                        </h3>
                        <p class="text-xs text-secondary mb-md">
                            <strong>Goal Achieved:</strong> ${experiments.find(e => e.id === lastExp.experimentId)?.goal || 'Target consistency'}
                        </p>

                        <div class="flex gap-xs mb-md flex-wrap">
                            ${[1, 2, 3, 4, 5, 6, 7].map(d => `
                                <div class="p-xs text-center border rounded flex-1 min-w-[42px] text-xs bg-success text-white font-bold" style="background:#16a34a;">
                                    Day ${d} ✓
                                </div>
                            `).join('')}
                        </div>

                        <div class="kpi-grid mb-md">
                            <div class="kpi-card" style="border-left: 3px solid var(--text-3);">
                                <div class="kpi-label">Before Experiment</div>
                                <div class="kpi-value text-base mt-xs">${lastExp.baselineValue} hrs</div>
                                <div class="kpi-sub">Baseline average</div>
                            </div>
                            <div class="kpi-card" style="border-left: 3px solid #16a34a;">
                                <div class="kpi-label" style="color:#16a34a;">During Experiment</div>
                                <div class="kpi-value text-base mt-xs">${lastExp.duringAverage} hrs</div>
                                <div class="kpi-sub">7-day completed average</div>
                            </div>
                            <div class="kpi-card" style="border-left: 3px solid var(--accent);">
                                <div class="kpi-label" style="color:var(--accent);">Observed Shift</div>
                                <div class="kpi-value text-base mt-xs">
                                    ${lastExp.delta >= 0 ? `+${lastExp.delta.toFixed(1)} hrs ↑` : `${lastExp.delta.toFixed(1)} hrs ↓`}
                                </div>
                                <div class="kpi-sub">Net behavioral change</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between flex-wrap gap-sm pt-xs border-t">
                            <span class="text-xs text-secondary">Observations ready to review in your longitudinal trends.</span>
                            <a href="#/progress" class="btn btn-primary">View Progress & Trends →</a>
                        </div>
                    </div>
                ` : ''}

                <h3 class="font-semibold text-sm mb-xs">Available Experiment Protocols</h3>
                <p class="text-xs text-secondary mb-md">Select one structured micro-intervention to focus on for 7 consecutive days:</p>

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
                    <strong>Research Architecture Note:</strong> 7-Day Experiments represent structured micro-interventions. At completion, observations flow directly into Progress Trends to assess subjective change without claiming medical causality.
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
                        <span class="text-xs text-tertiary">Database of daily lifestyle observations</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <div class="card p-sm bg-subtle mb-md flex items-center gap-sm flex-wrap" style="border-left: 4px solid #6366f1;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
                    <span class="text-xs text-secondary">
                        <strong>Data Flow:</strong> Your daily entries here feed directly into <a href="#/progress" class="text-accent font-semibold">Progress Trends</a> charts and the <a href="#/simulator" class="text-accent font-semibold">What-If Simulator</a>.
                    </span>
                </div>

                <div class="kpi-grid mb-md">
                    <div class="kpi-card" style="border-left: 3px solid var(--accent);">
                        <div class="kpi-label">Active Streak</div>
                        <div class="kpi-value">${streak} <span class="text-xs font-normal text-tertiary">days</span></div>
                    </div>
                    <div class="kpi-card" style="border-left: 3px solid #6366f1;">
                        <div class="kpi-label">7-Day Avg Sleep</div>
                        <div class="kpi-value">${summary.avgSleep} <span class="text-xs font-normal text-tertiary">hrs</span></div>
                    </div>
                    <div class="kpi-card" style="border-left: 3px solid #f59e0b;">
                        <div class="kpi-label">7-Day Avg Screen</div>
                        <div class="kpi-value">${summary.avgScreen} <span class="text-xs font-normal text-tertiary">hrs</span></div>
                    </div>
                </div>

                <form id="form-log-habit" class="card mb-md">
                    <div class="flex items-center justify-between mb-sm flex-wrap gap-xs">
                        <h3 class="font-semibold text-sm">Record Daily Observation</h3>
                        <div class="flex items-center gap-xs">
                            <label class="text-xs text-secondary font-medium" for="h-date">Date:</label>
                            <input type="date" id="h-date" class="form-control" style="padding: 4px 8px; font-size: 12px; height: 32px; width: auto;" value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                    </div>
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
                    <div class="mb-md">
                        <label class="text-xs font-medium block mb-xs">Daily Perceived Stress (Optional, 1–5)</label>
                        <div class="flex gap-xs flex-wrap">
                            ${[1,2,3,4,5].map(v => `
                                <label class="radio-chip">
                                    <input type="radio" name="daily_stress" value="${v}">
                                    <span>${v} — ${['Very Low','Low','Moderate','High','Very High'][v-1]}</span>
                                </label>
                            `).join('')}
                        </div>
                        <span class="text-xs text-tertiary">Quick daily mood check — not a validated scale, used for personal trend observation only.</span>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Save Today's Entry ✓</button>
                </form>

                <div class="card">
                    <div class="flex justify-between items-center mb-xs">
                        <h3 class="font-semibold text-sm">Recent Entries</h3>
                        <a href="#/progress" class="text-xs text-accent font-medium">View Trends →</a>
                    </div>
                    ${logs.length > 0 ? `
                        <div class="flex flex-col gap-xs mt-sm">
                            ${logs.slice(-7).reverse().map(l => `
                                <div class="flex items-center justify-between p-xs border-b text-xs">
                                    <span class="font-medium">${this.formatRealDateTime(l.timestamp || l.date)}</span>
                                    <span class="text-secondary">
                                        ${l.sleep_hours}h sleep · ${l.screen_hours}h screen · ${l.study_hours}h study · ${l.exercise_minutes}m exercise${l.daily_stress ? ` · Stress: ${l.daily_stress}/5` : ''}
                                    </span>
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
        const comparison = AppState.getBeforeAfterComparison();
        const habits = AppState.getHabitLog();

        return `
            <div class="assessment-wrap animate-fade-in">
                <div class="dash-header mb-md">
                    <div>
                        <h1 class="text-2xl font-bold">Progress & Trends</h1>
                        <span class="text-xs text-tertiary">How have I changed? — Longitudinal observation across assessments and daily habits</span>
                    </div>
                    <a href="#/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
                </div>

                <!-- PSS-10 Stress Curve -->
                <div class="card mb-md">
                    <h3 class="font-semibold text-sm mb-xs">PSS-10 Stress Trend</h3>
                    <p class="text-xs text-secondary mb-md">Perceived stress scores tracked across repeated assessments with Cohen normative zones:</p>
                    
                    <div style="height: 200px; position: relative;">
                        <canvas id="progress-curve-canvas"></canvas>
                    </div>
                </div>

                <!-- Lifestyle Trends Over Time -->
                <div class="card mb-md">
                    <div class="flex items-center justify-between mb-xs flex-wrap gap-xs">
                        <h3 class="font-semibold text-sm">Lifestyle Trends Over Time</h3>
                        <div class="flex items-center gap-xs text-xs flex-wrap">
                            <span class="badge" style="background: rgba(59, 130, 246, 0.12); color: #2563eb; font-weight: 600;">● Sleep (hrs)</span>
                            <span class="badge" style="background: rgba(168, 85, 247, 0.12); color: #9333ea; font-weight: 600;">● Screen (hrs)</span>
                            <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; font-weight: 600;">● Study (hrs)</span>
                        </div>
                    </div>
                    <p class="text-xs text-secondary mb-md">Daily sleep, screen time, and study hours tracked longitudinally:</p>
                    ${habits.length >= 1 ? `
                        <div style="height: 180px; position: relative;">
                            <canvas id="lifestyle-trend-canvas"></canvas>
                        </div>
                    ` : `
                        <div class="p-sm bg-subtle rounded-md text-xs text-tertiary text-center">
                            No daily habit logs recorded yet. Log your entries in the <a href="#/tracking" class="text-accent font-semibold">Daily Habit Log</a> to see lifestyle trends here.
                        </div>
                    `}
                </div>

                <!-- Before vs After Comparison Table -->
                ${comparison && comparison.hasMultiple ? `
                    <div class="card mb-md" style="border-left: 4px solid var(--accent);">
                        <h3 class="font-semibold text-sm mb-xs">Before vs After Comparison</h3>
                        <p class="text-xs text-secondary mb-md">
                            Comparing your first assessment (${new Date(comparison.baseline.date).toLocaleDateString()}) with your most recent (${new Date(comparison.current.date).toLocaleDateString()}):
                        </p>

                        <div class="table-container mb-sm">
                            <table class="table-clean text-xs">
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>Baseline (First)</th>
                                        <th>Current (Latest)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="font-semibold">PSS-10 Score</td>
                                        <td>${comparison.baseline.pss} / 40 (${comparison.baseline.pss_level})</td>
                                        <td class="font-bold">${comparison.current.pss} / 40 (${comparison.current.pss_level})</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Average Sleep</td>
                                        <td>${comparison.baseline.sleep}</td>
                                        <td>${comparison.current.sleep}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Screen Time</td>
                                        <td>${comparison.baseline.screen}</td>
                                        <td>${comparison.current.screen}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Physical Activity</td>
                                        <td>${comparison.baseline.activity}</td>
                                        <td>${comparison.current.activity}</td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">Study Hours</td>
                                        <td>${comparison.baseline.study}</td>
                                        <td>${comparison.current.study}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="p-xs bg-subtle rounded text-xs text-tertiary">
                            ⚠️ <strong>Personal observation — not proof of causation.</strong> These numbers reflect your self-reported data over time. Changes may be coincidental.
                        </div>
                    </div>
                ` : ''}

                <!-- Assessment History Timeline -->
                <div class="card mb-md">
                    <h3 class="font-semibold text-sm mb-xs">Assessment Timeline</h3>
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

                <div class="flex justify-between items-center gap-sm flex-wrap">
                    <a href="#/pss" class="btn btn-primary">Retake PSS-10 →</a>
                    <div class="flex gap-xs">
                        <a href="#/tracking" class="btn btn-secondary">Daily Habit Log</a>
                        <a href="#/simulator" class="btn btn-ghost">What-If Simulator</a>
                    </div>
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
       RESEARCHER / ADMIN VIEW — Restricted Portal & Cohort Analysis (N=234)
       ------------------------------------------------------------ */
    renderResearcher() {
        if (!AppState.isAdminAuthenticated()) {
            return `
                <div class="assessment-wrap animate-fade-in" style="max-width: 480px; margin: 40px auto;">
                    <div class="card p-xl text-center" style="border-top: 4px solid var(--accent); box-shadow: var(--shadow-md);">
                        <div class="mb-sm flex justify-center">
                            <div style="width: 58px; height: 58px; border-radius: 50%; background: rgba(13,148,136,0.12); display: flex; align-items: center; justify-content: center; color: var(--accent);">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                        </div>
                        <span class="badge badge-accent mb-xs">Restricted Access</span>
                        <h2 class="text-xl font-bold mb-xs">Admin Research Portal</h2>
                        <p class="text-xs text-secondary mb-md">
                            Restricted access for academic researchers, faculty mentors, and project evaluators. Contains raw cohort responses (N=234), statistical covariance matrices, and dataset exports.
                        </p>

                        <form id="form-admin-login" class="mb-sm">
                            <div class="mb-sm text-left">
                                <label class="form-label mb-xs block text-xs" for="admin-key-input">Admin / Researcher Key</label>
                                <input type="password" id="admin-key-input" class="form-control" placeholder="Enter researcher passcode" autocomplete="current-password" required>
                            </div>
                            <div id="admin-login-error" class="text-xs text-danger mb-sm font-medium" style="display: none;">
                                Invalid key. Please check your passcode.
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" style="min-height: 44px;">
                                <span>Unlock Research Portal →</span>
                            </button>
                        </form>

                        <a href="#/dashboard" class="btn btn-ghost btn-sm text-secondary">← Return to Student Dashboard</a>
                    </div>
                </div>
            `;
        }

        if (window.DashboardEDA && typeof DashboardEDA.renderHTML === 'function') {
            return DashboardEDA.renderHTML();
        }

        return `
            <div class="dashboard-wrap animate-fade-in text-center p-xl">
                <p class="text-secondary">Dashboard EDA module is loading...</p>
            </div>
        `;
    }
};
