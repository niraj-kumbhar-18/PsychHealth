/* ============================================================
   PsychHealth AI — Central State Management
   Unified store with demonstrative baseline & localStorage persistence
   ============================================================ */

const AppState = {
    _state: {
        onboarded: true,
        consented: true,
        theme: 'light', // 'light' or 'dark'

        // Active Student Profile (matching Screenshots & real PH-001)
        profile: {
            id: 'PH-001',
            name: 'Raj',
            college: 'Prof. Ramkrishna More ACS College, Akurdi',
            course: 'B.Sc. Computer Science',
            year: 'Third Year (TY)',
            academic_performance: '8.5',
            age_group: '21–23',
            gender: 'Male'
        },

        // Current in-progress assessment responses
        currentAssessment: {
            pss_q1: 2, pss_q2: 1, pss_q3: 1, pss_q4: 0, pss_q5: 1,
            pss_q6: 2, pss_q7: 2, pss_q8: 1, pss_q9: 2, pss_q10: 2,
            sleep_hours: '6–7 hours',
            sleep_quality: 'Rarely',
            screen_time: '2–4 hours',
            screen_interference: 'Sometimes',
            physical_activity: '3–4 days',
            academic_pressure: 'Moderate',
            academic_stress_source: 'Deadlines/workload',
            study_hours: '2–3 hours',
            procrastination: 'Sometimes',
            concentration_difficulty: 'Rarely',
            support_awareness: 'Yes',
            help_seeking_comfort: 'Very comfortable'
        },

        // 7-Day Plan progress (Screens 11 & 12)
        planProgress: {
            currentDay: 2,
            completedDays: [1], // Day 1 completed
            activeExerciseCompleted: false
        },

        // Assessment History (Baseline + Follow-up for Before vs After comparison)
        assessments: [
            {
                id: 'assessment_baseline',
                date: '2026-09-28T10:30:00Z',
                label: 'Baseline Assessment',
                pss_score: 22,
                pss_level: 'Moderate',
                responses: {
                    sleep_hours: '5.2 hours',
                    screen_time: '5.4 hours',
                    study_hours: '2.1 hours',
                    academic_pressure: 'Moderate',
                    academic_stress_source: 'Deadlines/workload'
                },
                factors: [
                    { id: 'workload', category: 'Academic', title: 'Academic Workload Pressure', detail: 'Deadlines & assignments clustering', impact: 'Moderate', color: 'warning', icon: '📚' },
                    { id: 'sleep', category: 'Circadian', title: 'Irregular Sleep Duration', detail: 'Average 5.2h night sleep', impact: 'High', color: 'danger', icon: '😴' },
                    { id: 'screen', category: 'Digital', title: 'Screen Time Exposure', detail: '5.4h non-academic screen use', impact: 'Moderate', color: 'warning', icon: '📱' },
                    { id: 'exam', category: 'Exam', title: 'Exam Pressure Perception', detail: 'Fear of performance drop', impact: 'Moderate', color: 'warning', icon: '🎯' }
                ],
                recommendations: [
                    {
                        category: 'Workload Strategy',
                        title: 'Structured Workload Deconstruction',
                        icon: '📚',
                        priority: 'High',
                        badgeColor: 'warning',
                        summary: 'Pacing coursework into 25-minute Pomodoro study blocks reduces procrastination.',
                        actionItems: [
                            'Deconstruct upcoming syllabus units into 25-minute milestones with defined end conditions.',
                            'Schedule weekly buffer periods to absorb coursework changes without sleep loss.'
                        ]
                    },
                    {
                        category: 'Sleep & Nervous Tone',
                        title: '4-7-8 Diaphragmatic Breathing & Wind-Down',
                        icon: '🌿',
                        priority: 'High',
                        badgeColor: 'primary',
                        summary: 'Somatic down-regulation before sleep stabilizes circadian onset.',
                        actionItems: [
                            'Practice 4 cycles of 4-7-8 breathing before sleep (Day 2 of your wellness plan).',
                            'Power down bright mobile screens 30 minutes before sleep.'
                        ]
                    }
                ]
            },
            {
                id: 'assessment_day7',
                date: '2026-10-05T18:30:00Z',
                label: 'Day 7 Reassessment',
                pss_score: 17,
                pss_level: 'Moderate',
                responses: {
                    sleep_hours: '7.0 hours',
                    screen_time: '3.8 hours',
                    study_hours: '3.3 hours',
                    academic_pressure: 'Low',
                    academic_stress_source: 'Deadlines/workload'
                },
                factors: [
                    { id: 'workload', category: 'Academic', title: 'Stabilized Academic Pace', detail: 'Consistent 3.3h daily study block', impact: 'Low', color: 'success', icon: '📚' },
                    { id: 'sleep', category: 'Circadian', title: 'Improved Sleep Hygiene', detail: '7.0h consistent nightly rest', impact: 'Low', color: 'success', icon: '😴' }
                ]
            }
        ],

        // Daily Habit Logs
        habitLog: [
            { date: '2026-09-30', sleep_hours: 5.5, screen_hours: 5.2, study_hours: 2.0, exercise_minutes: 20 },
            { date: '2026-10-01', sleep_hours: 6.0, screen_hours: 4.8, study_hours: 2.5, exercise_minutes: 30 },
            { date: '2026-10-02', sleep_hours: 6.2, screen_hours: 4.2, study_hours: 2.5, exercise_minutes: 25 },
            { date: '2026-10-03', sleep_hours: 6.8, screen_hours: 3.5, study_hours: 3.0, exercise_minutes: 35 },
            { date: '2026-10-04', sleep_hours: 7.0, screen_hours: 3.2, study_hours: 3.2, exercise_minutes: 40 },
            { date: '2026-10-05', sleep_hours: 7.2, screen_hours: 3.0, study_hours: 3.5, exercise_minutes: 30 }
        ]
    },

    STORAGE_KEY: 'psychhealth_ai_state_v2',

    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this._state = { ...this._state, ...parsed };
            } catch (e) {
                console.warn('Could not parse saved state.');
            }
        }
        // Apply theme
        this.applyTheme(this._state.theme || 'light');
    },

    toggleTheme() {
        const nextTheme = this._state.theme === 'dark' ? 'light' : 'dark';
        this._state.theme = nextTheme;
        this.applyTheme(nextTheme);
        this._persist();
        return nextTheme;
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    },

    getProfile() {
        return { ...this._state.profile };
    },

    setProfile(data) {
        Object.assign(this._state.profile, data);
        this._persist();
    },

    getCurrentAssessment() {
        return { ...this._state.currentAssessment };
    },

    setAssessmentField(field, val) {
        this._state.currentAssessment[field] = val;
        this._persist();
    },

    getAssessments() {
        return [...this._state.assessments];
    },

    getLatestAssessment() {
        const list = this._state.assessments;
        return list.length > 0 ? { ...list[list.length - 1] } : null;
    },

    getBaselineAssessment() {
        const list = this._state.assessments;
        return list.length > 0 ? { ...list[0] } : null;
    },

    hasCompletedAssessment() {
        return this._state.assessments.length > 0;
    },

    getPlanProgress() {
        return { ...this._state.planProgress };
    },

    completeActivity(dayNum = 2) {
        if (!this._state.planProgress.completedDays.includes(dayNum)) {
            this._state.planProgress.completedDays.push(dayNum);
        }
        this._state.planProgress.activeExerciseCompleted = true;
        this._persist();
    },

    saveAssessment(result) {
        const record = {
            id: 'assessment_' + Date.now(),
            date: new Date().toISOString(),
            label: this._state.assessments.length === 0 ? 'Baseline Assessment' : `Reassessment #${this._state.assessments.length}`,
            profile: { ...this._state.profile },
            responses: { ...this._state.currentAssessment },
            ...result
        };
        this._state.assessments.push(record);
        this._persist();
        return record;
    },

    getHabitLog() {
        return [...this._state.habitLog];
    },

    _persist() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._state));
        } catch (e) {
            console.warn('Storage save failed.');
        }
    }
};
