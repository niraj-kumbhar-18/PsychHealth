/* ============================================================
   PsychHealth — Central State Management
   Pure state store adhering strictly to GEMINI.md.
   No fabricated users, no hardcoded scores.
   ============================================================ */

const AppState = {
    _state: {
        theme: 'light',
        consented: false,

        // Section 1: Student Profile (GEMINI.md §6)
        profile: {
            age_group: null,
            year: null,
            course: null,
            gender: null,
            academic_performance: null
        },

        // Current in-progress assessment (Sections 2–5)
        currentAssessment: {
            // PSS-10
            pss_q1: null, pss_q2: null, pss_q3: null, pss_q4: null, pss_q5: null,
            pss_q6: null, pss_q7: null, pss_q8: null, pss_q9: null, pss_q10: null,
            // Lifestyle
            sleep_hours: null,
            sleep_quality: null,
            screen_time: null,
            screen_interference: null,
            physical_activity: null,
            // Academic
            academic_pressure: null,
            academic_stress_source: null,
            study_hours: null,
            procrastination: null,
            concentration_difficulty: null,
            // Support
            support_awareness: null,
            help_seeking_comfort: null
        },

        // Completed assessments history (never fabricated)
        assessments: [],

        // 7-day experiment tracking
        activeExperiment: null,
        completedExperiments: [],

        // Habit log entries
        habitLog: []
    },

    STORAGE_KEY: 'psychhealth_v4',

    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this._state = this._deepMerge(this._state, parsed);
            } catch (e) {
                console.warn('Could not parse saved state.');
            }
        }
        document.documentElement.setAttribute('data-theme', this._state.theme || 'light');
    },

    _deepMerge(target, source) {
        const result = { ...target };
        for (const key of Object.keys(source)) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && key in target) {
                result[key] = this._deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }
        return result;
    },

    // Theme
    getTheme() { return this._state.theme; },
    toggleTheme() {
        this._state.theme = this._state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this._state.theme);
        this._persist();
        return this._state.theme;
    },

    // Consent
    isConsented() { return !!this._state.consented; },
    setConsented(val) {
        this._state.consented = !!val;
        this._persist();
    },

    // Profile
    getProfile() { return { ...this._state.profile }; },
    setProfile(data) {
        Object.assign(this._state.profile, data);
        this._persist();
    },
    hasProfile() {
        const p = this._state.profile;
        return !!(p.age_group && p.year && p.course && p.gender && p.academic_performance);
    },

    // Assessment
    getCurrentAssessment() { return { ...this._state.currentAssessment }; },
    getAssessmentField(field) { return this._state.currentAssessment[field]; },
    setAssessmentField(field, val) {
        if (field in this._state.currentAssessment) {
            this._state.currentAssessment[field] = val;
            this._persist();
        }
    },
    resetCurrentAssessment() {
        const ca = this._state.currentAssessment;
        for (const k in ca) ca[k] = null;
        this._persist();
    },

    getAssessments() { return [...this._state.assessments]; },
    getLatestAssessment() {
        const list = this._state.assessments;
        return list.length > 0 ? { ...list[list.length - 1] } : null;
    },
    hasCompletedAssessment() { return this._state.assessments.length > 0; },

    saveAssessment(result) {
        const record = {
            id: 'assessment_' + Date.now(),
            date: new Date().toISOString(),
            profile: { ...this._state.profile },
            responses: { ...this._state.currentAssessment },
            ...result
        };
        this._state.assessments.push(record);
        this.resetCurrentAssessment();
        this._persist();
        return record;
    },

    // 7-Day Experiments
    getActiveExperiment() {
        return this._state.activeExperiment ? { ...this._state.activeExperiment } : null;
    },
    getCompletedExperiments() {
        return [...this._state.completedExperiments];
    },
    startExperiment(expId) {
        this._state.activeExperiment = {
            experimentId: expId,
            startDate: new Date().toISOString(),
            days: []
        };
        this._persist();
    },
    logExperimentDay(data) {
        if (!this._state.activeExperiment) return;
        const currentDays = this._state.activeExperiment.days;
        const dayNumber = currentDays.length + 1;
        currentDays.push({
            day: dayNumber,
            date: new Date().toISOString(),
            ...data
        });
        if (currentDays.length >= 7) {
            this._state.completedExperiments.push({
                ...this._state.activeExperiment,
                completedDate: new Date().toISOString()
            });
            this._state.activeExperiment = null;
        }
        this._persist();
    },

    // Daily Habit Log
    getHabitLog() { return [...this._state.habitLog]; },
    logHabit(entry) {
        const todayStr = new Date().toISOString().split('T')[0];
        const existingIdx = this._state.habitLog.findIndex(e => e.date === todayStr);
        const record = { date: todayStr, timestamp: new Date().toISOString(), ...entry };
        if (existingIdx >= 0) {
            this._state.habitLog[existingIdx] = record;
        } else {
            this._state.habitLog.push(record);
        }
        this._persist();
    },

    // Reset / Dev clear
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
        location.reload();
    },

    _persist() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._state));
        } catch (e) {
            console.warn('localStorage write failed.');
        }
    }
};
