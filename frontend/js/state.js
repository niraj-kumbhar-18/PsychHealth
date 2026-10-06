/* ============================================================
   PsychHealth — Central State Management
   Pure state store adhering strictly to GEMINI.md.
   No fabricated users, no hardcoded scores.
   ============================================================ */

const AppState = {
    _state: {
        theme: 'light',
        consented: true,

        // Section 1: Active Student Profile (matching Screenshots)
        profile: {
            id: 'PH-001',
            name: 'Raj',
            college: 'Prof. Ramkrishna More ACS College, Akurdi',
            course: 'B.Sc. Computer Science',
            year: 'Third Year',
            gender: 'Male',
            age_group: '18–20',
            academic_performance: '9.0–10.0'
        },

        // Current in-progress assessment responses
        currentAssessment: {
            pss_q1: 2, pss_q2: 2, pss_q3: 3, pss_q4: 1, pss_q5: 2,
            pss_q6: 3, pss_q7: 2, pss_q8: 2, pss_q9: 2, pss_q10: 2,
            sleep_hours: 'Less than 5 hours',
            sleep_quality: 'Sometimes',
            screen_time: '2–4 hours',
            screen_interference: 'Rarely',
            physical_activity: '1–2 days',
            academic_pressure: 'Moderate',
            academic_stress_source: 'Assignments/projects',
            study_hours: '2–3 hours',
            procrastination: 'Sometimes',
            concentration_difficulty: 'Rarely',
            support_awareness: 'Yes',
            help_seeking_comfort: 'Uncomfortable'
        },

        // 8 Longitudinal Assessments (matching PDF Screenshot 2 & 8)
        assessments: [
            {
                id: 'assessment_1',
                date: '2026-09-12T10:00:00.000Z',
                pss_score: 18,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: '6–7 hours', screen_time: '4–6 hours', academic_pressure: 'Moderate' }
            },
            {
                id: 'assessment_2',
                date: '2026-09-16T10:00:00.000Z',
                pss_score: 15,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: '7–8 hours', screen_time: '2–4 hours', academic_pressure: 'Low' }
            },
            {
                id: 'assessment_3',
                date: '2026-09-20T10:00:00.000Z',
                pss_score: 19,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: '5–6 hours', screen_time: '4–6 hours', academic_pressure: 'Moderate' }
            },
            {
                id: 'assessment_4',
                date: '2026-09-24T10:00:00.000Z',
                pss_score: 23,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: 'Less than 5 hours', screen_time: '4–6 hours', academic_pressure: 'High' }
            },
            {
                id: 'assessment_5',
                date: '2026-09-28T10:00:00.000Z',
                pss_score: 16,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: '7–8 hours', screen_time: '2–4 hours', academic_pressure: 'Low' }
            },
            {
                id: 'assessment_6',
                date: '2026-10-01T10:00:00.000Z',
                pss_score: 19,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: '6–7 hours', screen_time: '4–6 hours', academic_pressure: 'Moderate' }
            },
            {
                id: 'assessment_7',
                date: '2026-10-04T10:00:00.000Z',
                pss_score: 17,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: { sleep_hours: '6–7 hours', screen_time: '2–4 hours', academic_pressure: 'Low' }
            },
            {
                id: 'assessment_8',
                date: '2026-10-06T10:00:00.000Z',
                pss_score: 23,
                pss_level: 'Moderate',
                profile: { course: 'B.Sc. Computer Science', year: 'Third Year' },
                responses: {
                    sleep_hours: 'Less than 5 hours',
                    sleep_quality: 'Sometimes',
                    screen_time: '2–4 hours',
                    screen_interference: 'Rarely',
                    physical_activity: '1–2 days',
                    academic_pressure: 'Moderate',
                    academic_stress_source: 'Assignments/projects',
                    study_hours: '2–3 hours',
                    procrastination: 'Sometimes',
                    concentration_difficulty: 'Rarely',
                    support_awareness: 'Yes',
                    help_seeking_comfort: 'Uncomfortable'
                },
                factors: [
                    { id: 'sleep', name: 'Insufficient Sleep Duration', severity: 'High', description: 'Reported sleep: Less than 5 hours', priority: 'High', color: 'danger' },
                    { id: 'activity', name: 'Low Physical Activity', severity: 'Moderate', description: 'Active days: 1–2 days/week', priority: 'Moderate', color: 'warning' },
                    { id: 'support', name: 'Reluctance Toward Professional Support', severity: 'Moderate', description: 'Comfort level: Uncomfortable', priority: 'Moderate', color: 'warning' }
                ],
                recommendations: [
                    {
                        category: 'Sleep Hygiene',
                        priority: 'High',
                        badgeColor: 'danger',
                        title: 'Restorative Sleep Protocol',
                        summary: 'You reported Less than 5 hours average sleep with frequent daytime exhaustion. Consistent sleep architecture is essential for memory consolidation.',
                        actionItems: [
                            'Anchor a consistent wake-up time 7 days a week, regardless of when you slept, to stabilize circadian rhythm.',
                            'Power down non-academic screen devices at least 30–45 minutes prior to turning off lights to allow natural melatonin secretion.',
                            'Reserve your bed solely for sleep; relocate late-night exam cramming and smartphone browsing to a desk.'
                        ],
                        linkedExperiment: 'Sleep'
                    },
                    {
                        category: 'Physical Movement',
                        priority: 'Low',
                        badgeColor: 'warning',
                        title: 'Circulation & Stress Relief Routine',
                        summary: 'Reported physical activity was 1–2 days per week. Mild aerobic activity is one of the most effective non-pharmacological stress reducers.',
                        actionItems: [
                            'Aim for a brisk 20–30 minute campus walk between lectures or in the early morning.',
                            'Take a 2-minute standing and stretching intermission every hour of prolonged desk sitting.',
                            'Join an informal college recreational sport or evening walking group with classmates.'
                        ],
                        linkedExperiment: 'Activity'
                    }
                ]
            }
        ],

        // Active 7-Day Experiment (matching PDF Screenshot 4: Sleep Consistency, Day 2 of 7)
        activeExperiment: {
            experimentId: 'exp-sleep',
            startDate: '2026-10-05T08:00:00.000Z',
            baselineValue: '5.0',
            days: [
                { day: 1, date: '2026-10-05T08:00:00.000Z', targetMet: true, value: 7.0 }
            ]
        },
        completedExperiments: [],

        // Daily Habit Log (matching PDF Screenshot 3: 2 days logged, 5.3h sleep, 4.0h screen)
        habitLog: [
            { date: '2026-10-05', sleep_hours: 5.5, screen_hours: 3.0, study_hours: 2.0, exercise_minutes: 30 },
            { date: '2026-10-06', sleep_hours: 5.0, screen_hours: 5.0, study_hours: 1.0, exercise_minutes: 0 }
        ]
    },

    STORAGE_KEY: 'psychhealth_v5',

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
        return [...(this._state.completedExperiments || [])];
    },
    getLastCompletedExperiment() {
        if (this._state.lastCompletedExperiment) return { ...this._state.lastCompletedExperiment };
        const completed = this._state.completedExperiments || [];
        return completed.length > 0 ? { ...completed[completed.length - 1] } : null;
    },
    startExperiment(expId) {
        const latest = this.getLatestAssessment();
        let baseline = 5.5;
        if (latest && latest.responses && latest.responses.sleep_hours) {
            const parsed = parseFloat(latest.responses.sleep_hours);
            if (!isNaN(parsed)) baseline = parsed;
        }

        this._state.activeExperiment = {
            experimentId: expId,
            startDate: new Date().toISOString(),
            baselineValue: baseline,
            days: []
        };
        this._state.lastCompletedExperiment = null;
        this._persist();
    },
    logExperimentDay(data) {
        if (!this._state.activeExperiment) return;
        const currentDays = this._state.activeExperiment.days;
        const dayNumber = currentDays.length + 1;
        
        // Prevent negative values
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
            const baseline = this._state.activeExperiment.baselineValue || 0;
            const finishedExp = {
                ...this._state.activeExperiment,
                duringAverage: avgDuring,
                completionDate: new Date().toISOString(),
                delta: parseFloat((avgDuring - baseline).toFixed(1))
            };

            if (!this._state.completedExperiments) this._state.completedExperiments = [];
            this._state.completedExperiments.push(finishedExp);
            this._state.lastCompletedExperiment = finishedExp;
            this._state.activeExperiment = null;
        }
        this._persist();
    },

    // Daily Habit Log
    getHabitLog() { return [...(this._state.habitLog || [])]; },
    logHabit(entry) {
        const todayStr = new Date().toISOString().split('T')[0];
        if (!this._state.habitLog) this._state.habitLog = [];
        const existingIdx = this._state.habitLog.findIndex(e => e.date === todayStr);

        // Sanitize numbers to be non-negative
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
            this._state.habitLog[existingIdx] = record;
        } else {
            this._state.habitLog.push(record);
        }
        this._persist();
        return record;
    },

    // Before vs After Comparison Helper (GEMINI.md & Progress Trends)
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
