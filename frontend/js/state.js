/* ============================================================
   PsychHealth — Central State Management & Multi-Student Store
   Strictly isolates student accounts per GEMINI.md.
   Syncs with SQLite Backend (http://localhost:8000/api) with
   graceful client-side partitioned persistence.
   ============================================================ */

const AppState = {
    API_URL: 'http://localhost:8000/api',
    REGISTRY_KEY: 'psychhealth_users_registry_v7',
    ACTIVE_KEY: 'psychhealth_active_user_v7',
    THEME_KEY: 'psychhealth_theme_v7',

    // Global in-memory cache
    _users: {},
    _activeStudentId: null,
    _theme: 'light',
    _adminMode: false,

    // In-progress assessment temporary response buffer
    _currentAssessment: {
        pss_q1: null, pss_q2: null, pss_q3: null, pss_q4: null, pss_q5: null,
        pss_q6: null, pss_q7: null, pss_q8: null, pss_q9: null, pss_q10: null,
        sleep_hours: null,
        sleep_quality: null,
        screen_time: null,
        screen_interference: null,
        physical_activity: null,
        academic_pressure: null,
        academic_stress_source: null,
        study_hours: null,
        procrastination: null,
        concentration_difficulty: null,
        support_awareness: null,
        help_seeking_comfort: null
    },

    init() {
        this._theme = localStorage.getItem(this.THEME_KEY) || 'light';
        document.documentElement.setAttribute('data-theme', this._theme);

        // Load users registry
        const savedRegistry = localStorage.getItem(this.REGISTRY_KEY);
        if (savedRegistry) {
            try {
                this._users = JSON.parse(savedRegistry);
            } catch (e) {
                console.warn('Failed to parse user registry.');
                this._users = {};
            }
        }

        // Initialize default returning demo student STU-101 if empty
        if (!this._users['STU-101']) {
            this._users['STU-101'] = {
                student_id: 'STU-101',
                password: 'pass123',
                profile: {
                    id: 'STU-101',
                    name: 'Demo Student',
                    course: 'B.Sc. Computer Science',
                    year: 'Third Year',
                    gender: 'Male',
                    age_group: '21–23',
                    academic_performance: '7.0–7.9'
                },
                consented: true,
                assessments: [
                    {
                        id: 'assessment_demo_1',
                        date: '2026-09-24T10:00:00.000Z',
                        pss_score: 21,
                        pss_level: 'Moderate',
                        profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                        responses: { sleep_hours: '5–6 hours', screen_time: '4–6 hours', academic_pressure: 'Moderate' },
                        factors: [{ id: 'sleep', title: 'Short Sleep Duration', impact: 'Moderate' }],
                        recommendations: [{ title: 'Sleep Rhythm Stabilization', summary: 'Consistent 11 PM bedtime anchor.' }]
                    },
                    {
                        id: 'assessment_demo_2',
                        date: new Date(Date.now() - 3600000 * 24).toISOString(),
                        pss_score: 18,
                        pss_level: 'Moderate',
                        profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                        responses: { sleep_hours: '6–7 hours', screen_time: '2–4 hours', academic_pressure: 'Moderate' },
                        factors: [{ id: 'screen', title: 'Evening Screen Usage', impact: 'Moderate' }],
                        recommendations: [{ title: 'Evening Digital Curfew', summary: 'Power down devices 45m before bed.' }]
                    }
                ],
                habitLog: [
                    { date: '2026-10-08', timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), sleep_hours: 6.0, screen_hours: 3.5, study_hours: 2.5, exercise_minutes: 30, daily_stress: 3 },
                    { date: '2026-10-09', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), sleep_hours: 6.5, screen_hours: 3.0, study_hours: 3.0, exercise_minutes: 20, daily_stress: 2 }
                ],
                activeExperiment: {
                    experimentId: 'Sleep',
                    startDate: new Date(Date.now() - 3600000 * 48).toISOString(),
                    baselineValue: 5.5,
                    days: [
                        { day: 1, date: new Date(Date.now() - 3600000 * 48).toISOString(), value: 6.5, targetMet: true },
                        { day: 2, date: new Date(Date.now() - 3600000 * 24).toISOString(), value: 7.0, targetMet: true }
                    ]
                },
                completedExperiments: []
            };
            this._persistRegistry();
        }

        // Restore active user session
        const activeId = sessionStorage.getItem(this.ACTIVE_KEY) || localStorage.getItem(this.ACTIVE_KEY);
        if (activeId && this._users[activeId]) {
            this._activeStudentId = activeId;
        } else {
            // Default to demo student if present, or null
            this._activeStudentId = 'STU-101';
            this._setActiveSession('STU-101');
        }
    },

    // --- Authentication & User Lifecycle ---

    registerStudent(studentId, password, profileData) {
        const sid = (studentId || '').trim().toUpperCase();
        const pwd = (password || '').trim();
        if (!sid || !pwd) {
            return { success: false, message: 'Student ID and password are required.' };
        }

        if (this._users[sid]) {
            return { success: false, message: `Student ID "${sid}" is already registered. Please log in.` };
        }

        // Create new isolated student account with ZERO previous data
        const newStudent = {
            student_id: sid,
            password: pwd,
            profile: {
                id: sid,
                name: (profileData.name || '').trim(),
                course: profileData.course || '',
                year: profileData.year || '',
                gender: profileData.gender || '',
                age_group: profileData.age_group || '',
                academic_performance: profileData.academic_performance || ''
            },
            consented: true,
            assessments: [], // ZERO DATA!
            habitLog: [],    // ZERO DATA!
            activeExperiment: null,
            completedExperiments: []
        };

        this._users[sid] = newStudent;
        this._persistRegistry();
        this._setActiveSession(sid);
        this.resetCurrentAssessment();

        // Asynchronous sync with SQLite server if running
        this._syncWithServer('POST', '/auth/register', {
            student_id: sid,
            password: pwd,
            ...newStudent.profile
        });

        return { success: true, student: newStudent };
    },

    loginStudent(studentId, password) {
        const sid = (studentId || '').trim().toUpperCase();
        const pwd = (password || '').trim();

        if (this._users[sid] && this._users[sid].password === pwd) {
            this._setActiveSession(sid);
            this.resetCurrentAssessment();
            return { success: true, student: this._users[sid] };
        }

        // If not in local cache, attempt server authentication
        return this._remoteLogin(sid, pwd);
    },

    async _remoteLogin(sid, pwd) {
        try {
            const res = await fetch(`${this.API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: sid, password: pwd })
            });
            if (res.ok) {
                const json = await res.json();
                const d = json.data;
                this._users[sid] = {
                    student_id: sid,
                    password: pwd,
                    profile: d.profile,
                    consented: true,
                    assessments: d.assessments || [],
                    habitLog: d.habit_logs || [],
                    activeExperiment: d.active_experiment || null,
                    completedExperiments: []
                };
                this._persistRegistry();
                this._setActiveSession(sid);
                return { success: true, student: this._users[sid] };
            }
        } catch (e) {
            // Server offline
        }
        return { success: false, message: 'Invalid Student ID or password.' };
    },

    logoutStudent() {
        this._activeStudentId = null;
        sessionStorage.removeItem(this.ACTIVE_KEY);
        localStorage.removeItem(this.ACTIVE_KEY);
        this.resetCurrentAssessment();
    },

    isLoggedIn() {
        return !!this._activeStudentId && !!this._users[this._activeStudentId];
    },

    getActiveStudentId() {
        return this._activeStudentId;
    },

    _getUser() {
        if (!this._activeStudentId || !this._users[this._activeStudentId]) {
            return null;
        }
        return this._users[this._activeStudentId];
    },

    _setActiveSession(sid) {
        this._activeStudentId = sid;
        sessionStorage.setItem(this.ACTIVE_KEY, sid);
        localStorage.setItem(this.ACTIVE_KEY, sid);
    },

    _persistRegistry() {
        try {
            localStorage.setItem(this.REGISTRY_KEY, JSON.stringify(this._users));
        } catch (e) {
            console.warn('Could not persist users registry to localStorage.');
        }
    },

    // --- Profile & Demographics ---

    getProfile() {
        const u = this._getUser();
        if (!u) {
            return {
                id: '',
                name: '',
                course: '',
                year: '',
                gender: '',
                age_group: '',
                academic_performance: ''
            };
        }
        return { ...u.profile };
    },

    setProfile(data) {
        const u = this._getUser();
        if (u) {
            Object.assign(u.profile, data);
            u.consented = true;
            this._persistRegistry();
        }
    },

    isConsented() {
        const u = this._getUser();
        return u ? !!u.consented : false;
    },

    setConsented(val) {
        const u = this._getUser();
        if (u) {
            u.consented = !!val;
            this._persistRegistry();
        }
    },

    // --- PSS In-Progress Buffer ---

    getCurrentAssessment() {
        return { ...this._currentAssessment };
    },

    getAssessmentField(field) {
        return this._currentAssessment[field];
    },

    setAssessmentField(field, val) {
        if (field in this._currentAssessment) {
            this._currentAssessment[field] = val;
        }
    },

    resetCurrentAssessment() {
        for (const k in this._currentAssessment) {
            this._currentAssessment[k] = null;
        }
    },

    // --- Longitudinal Assessments ---

    getAssessments() {
        const u = this._getUser();
        return u ? [...(u.assessments || [])] : [];
    },

    getLatestAssessment() {
        const list = this.getAssessments();
        return list.length > 0 ? { ...list[list.length - 1] } : null;
    },

    hasCompletedAssessment() {
        return this.getAssessments().length > 0;
    },

    saveAssessment(result) {
        const u = this._getUser();
        if (!u) return null;

        const record = {
            id: 'assessment_' + Date.now(),
            date: new Date().toISOString(),
            profile: { ...u.profile },
            responses: { ...this._currentAssessment },
            ...result
        };

        if (!u.assessments) u.assessments = [];
        u.assessments.push(record);
        this.resetCurrentAssessment();
        this._persistRegistry();

        // Asynchronously sync with SQLite server
        this._syncWithServer('POST', '/assessments', {
            student_id: u.student_id,
            pss_score: record.pss_score,
            pss_level: record.pss_level,
            responses: record.responses,
            factors: record.factors,
            recommendations: record.recommendations
        });

        return record;
    },

    // --- 7-Day Structured Experiments ---

    getActiveExperiment() {
        const u = this._getUser();
        return (u && u.activeExperiment) ? { ...u.activeExperiment } : null;
    },

    getCompletedExperiments() {
        const u = this._getUser();
        return u ? [...(u.completedExperiments || [])] : [];
    },

    getLastCompletedExperiment() {
        const u = this._getUser();
        if (!u) return null;
        if (u.lastCompletedExperiment) return { ...u.lastCompletedExperiment };
        const completed = u.completedExperiments || [];
        return completed.length > 0 ? { ...completed[completed.length - 1] } : null;
    },

    startExperiment(expId) {
        const u = this._getUser();
        if (!u) return;

        const latest = this.getLatestAssessment();
        let baseline = 5.5;
        if (latest && latest.responses && latest.responses.sleep_hours) {
            const parsed = parseFloat(latest.responses.sleep_hours);
            if (!isNaN(parsed)) baseline = parsed;
        }

        u.activeExperiment = {
            experimentId: expId,
            startDate: new Date().toISOString(),
            baselineValue: baseline,
            days: []
        };
        u.lastCompletedExperiment = null;
        this._persistRegistry();
    },

    logExperimentDay(data) {
        const u = this._getUser();
        if (!u || !u.activeExperiment) return;

        const currentDays = u.activeExperiment.days;
        const dayNumber = currentDays.length + 1;
        const rawVal = parseFloat(data.value ?? data.recordedValue);
        const safeVal = isNaN(rawVal) ? 0 : Math.max(0, rawVal);

        currentDays.push({
            day: dayNumber,
            date: new Date().toISOString(),
            value: safeVal,
            targetMet: safeVal > 0
        });

        if (currentDays.length >= 7) {
            const vals = currentDays.map(d => d.value);
            const avgDuring = parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1));
            const baseline = u.activeExperiment.baselineValue || 0;
            const finishedExp = {
                ...u.activeExperiment,
                duringAverage: avgDuring,
                completionDate: new Date().toISOString(),
                delta: parseFloat((avgDuring - baseline).toFixed(1))
            };

            if (!u.completedExperiments) u.completedExperiments = [];
            u.completedExperiments.push(finishedExp);
            u.lastCompletedExperiment = finishedExp;
            u.activeExperiment = null;
        }

        this._persistRegistry();
    },

    // --- Daily Habit Log ---

    getHabitLog() {
        const u = this._getUser();
        return u ? [...(u.habitLog || [])] : [];
    },

    logHabit(entry) {
        const u = this._getUser();
        if (!u) return null;

        const todayStr = new Date().toISOString().split('T')[0];
        if (!u.habitLog) u.habitLog = [];
        const existingIdx = u.habitLog.findIndex(e => e.date === todayStr);

        const record = {
            date: todayStr,
            timestamp: new Date().toISOString(),
            sleep_hours: Math.max(0, parseFloat(entry.sleep_hours) || 0),
            screen_hours: Math.max(0, parseFloat(entry.screen_hours) || 0),
            study_hours: Math.max(0, parseFloat(entry.study_hours) || 0),
            exercise_minutes: Math.max(0, parseInt(entry.exercise_minutes, 10) || 0),
            daily_stress: entry.daily_stress ? Math.max(1, Math.min(5, parseInt(entry.daily_stress, 10))) : 3
        };

        if (existingIdx >= 0) {
            u.habitLog[existingIdx] = record;
        } else {
            u.habitLog.push(record);
        }

        this._persistRegistry();

        // Sync with SQLite server
        this._syncWithServer('POST', '/habits', {
            student_id: u.student_id,
            date: record.date,
            sleep_hours: record.sleep_hours,
            screen_hours: record.screen_hours,
            study_hours: record.study_hours,
            exercise_minutes: record.exercise_minutes
        });

        return record;
    },

    // --- Before vs After Longitudinal Trends ---

    getBeforeAfterComparison() {
        const assessments = this.getAssessments();
        if (assessments.length === 0) return null;
        const baseline = assessments[0];
        const latest = assessments[assessments.length - 1];
        const habits = this.getHabitLog();

        let avgSleep = 0;
        let avgScreen = 0;
        let avgStudy = 0;
        if (habits.length > 0) {
            avgSleep = (habits.reduce((acc, h) => acc + (h.sleep_hours || 0), 0) / habits.length).toFixed(1);
            avgScreen = (habits.reduce((acc, h) => acc + (h.screen_hours || 0), 0) / habits.length).toFixed(1);
            avgStudy = (habits.reduce((acc, h) => acc + (h.study_hours || 0), 0) / habits.length).toFixed(1);
        }

        return {
            hasMultiple: assessments.length > 1,
            assessmentCount: assessments.length,
            baseline: {
                date: baseline.date,
                pss: baseline.pss_score,
                pss_level: baseline.pss_level,
                sleep: baseline.responses?.sleep_hours || '5.5 hrs',
                screen: baseline.responses?.screen_time || '6.0 hrs',
                activity: baseline.responses?.physical_activity || '1–2 days',
                study: baseline.responses?.study_hours || '2.0 hrs'
            },
            current: {
                date: latest.date,
                pss: latest.pss_score,
                pss_level: latest.pss_level,
                sleep: avgSleep > 0 ? `${avgSleep} hrs` : (latest.responses?.sleep_hours || '7.0 hrs'),
                screen: avgScreen > 0 ? `${avgScreen} hrs` : (latest.responses?.screen_time || '4.0 hrs'),
                activity: latest.responses?.physical_activity || '3–4 days',
                study: avgStudy > 0 ? `${avgStudy} hrs` : (latest.responses?.study_hours || '3.0 hrs')
            },
            deltaPss: baseline.pss_score - latest.pss_score,
            improved: latest.pss_score <= baseline.pss_score
        };
    },

    // --- Theme & Admin ---

    getTheme() { return this._theme; },
    toggleTheme() {
        this._theme = this._theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this._theme);
        localStorage.setItem(this.THEME_KEY, this._theme);
        return this._theme;
    },

    isAdminAuthenticated() {
        return sessionStorage.getItem('ph_admin_token') === 'verified' || !!this._adminMode;
    },

    setAdminAuthenticated(val) {
        if (val) {
            sessionStorage.setItem('ph_admin_token', 'verified');
            this._adminMode = true;
        } else {
            sessionStorage.removeItem('ph_admin_token');
            this._adminMode = false;
        }
    },

    // --- SQLite Background Sync Helper ---

    async _syncWithServer(method, endpoint, body) {
        try {
            await fetch(`${this.API_URL}${endpoint}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch (e) {
            // Silently fall back to client-side partitioned storage
        }
    },

    clearAll() {
        localStorage.removeItem(this.REGISTRY_KEY);
        localStorage.removeItem(this.ACTIVE_KEY);
        sessionStorage.removeItem(this.ACTIVE_KEY);
        location.reload();
    }
};
