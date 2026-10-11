/* ============================================================
   PsychHealth — API Service Layer
   Abstracts data operations between UI and storage/backend.
   In Phase 1: Interacts with AppState + localStorage.
   In Phase 2: Switch URLs/fetch to FastAPI endpoints seamlessly.
   ============================================================ */

const API = {
    // Flag to enable actual network requests once FastAPI is deployed
    useBackend: false,
    baseUrl: 'http://localhost:8000/api',

    /* --- Profile --- */
    async getProfile() {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/profile`);
            return await res.json();
        }
        return AppState.getProfile();
    },

    async saveProfile(profileData) {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });
            return await res.json();
        }
        AppState.setProfile(profileData);
        return { success: true, profile: AppState.getProfile() };
    },

    /* --- Assessment Submission --- */
    async submitAssessment(responses) {
        // responses is { pss_q1..pss_q10, sleep_hours, screen_time, ... }
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/assessment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profile: AppState.getProfile(),
                    responses
                })
            });
            return await res.json();
        }

        // Local processing (PSS Scoring & Factor Analysis)
        const pssResult = PSS.calculate(responses);
        const factors = PSS.identifyFactors(responses, pssResult.score);
        const recommendations = Recommendations.generate(responses, pssResult, factors);

        const record = AppState.saveAssessment({
            pss_score: pssResult.score,
            pss_level: pssResult.level,
            pss_breakdown: pssResult.breakdown,
            factors,
            recommendations,
            ml_prediction: {
                status: 'model_in_training',
                message: 'Academic correlation model is in pilot training phase with student cohort survey responses.',
                confidence: 'Evaluating validation curves'
            }
        });

        return { success: true, record };
    },

    /* --- Assessment History --- */
    async getAssessments() {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/progress`);
            return await res.json();
        }
        return AppState.getAssessments();
    },

    async getLatestAssessment() {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/results/latest`);
            return await res.json();
        }
        return AppState.getLatestAssessment();
    },

    /* --- Experiments --- */
    async startExperiment(experimentId) {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/experiment/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ experimentId })
            });
            return await res.json();
        }
        AppState.startExperiment(experimentId);
        return { success: true, experiment: AppState.getActiveExperiment() };
    },

    async logExperimentDay(value) {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/experiment/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value })
            });
            return await res.json();
        }
        AppState.logExperimentDay(value);
        return { success: true, experiment: AppState.getActiveExperiment() };
    },

    /* --- Habits --- */
    async logHabit(entry) {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/habits`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });
            return await res.json();
        }
        AppState.logHabit(entry);
        return { success: true, habits: AppState.getHabitLog() };
    },

    async getHabits() {
        if (this.useBackend) {
            const res = await fetch(`${this.baseUrl}/habits`);
            return await res.json();
        }
        return AppState.getHabitLog();
    }
};
