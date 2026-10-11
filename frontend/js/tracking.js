/* ============================================================
   PsychHealth — Habit & 7-Day Experiment Tracking Engine
   Empirical micro-interventions and daily wellness logs.
   ============================================================ */

const Tracking = {
    /**
     * Get list of all experiment protocols with current active status.
     */
    getExperimentList() {
        const active = AppState.getActiveExperiment();
        const completed = AppState.getCompletedExperiments();

        return DATA.experiments.map(exp => {
            const isActive = active && active.experimentId === exp.id;
            const isCompleted = completed.some(c => c.experimentId === exp.id);
            const activeData = isActive ? active : null;

            return {
                ...exp,
                isActive,
                isCompleted,
                daysDone: activeData ? activeData.days.length : 0,
                daysTotal: 7
            };
        });
    },

    /**
     * Start a new 7-day experiment.
     */
    startExperiment(expId) {
        AppState.startExperiment(expId);
    },

    /**
     * Log a day's check-in for the currently active experiment.
     */
    logExperimentDay(value) {
        AppState.logExperimentDay(value);
    },

    /**
     * Daily Habit Log
     */
    logHabit(entry) {
        AppState.logHabit(entry);
    },

    getTodayHabit() {
        const today = new Date().toISOString().split('T')[0];
        const logs = AppState.getHabitLog();
        return logs.find(l => l.date === today) || null;
    },

    /**
     * Calculate continuous streak of logged days.
     */
    getStreak() {
        const logs = AppState.getHabitLog();
        if (logs.length === 0) return 0;

        const uniqueDates = Array.from(new Set(logs.map(l => (l.date || '').split('T')[0]))).filter(Boolean);
        if (uniqueDates.length === 0) return 0;

        // Sort descending by date
        const sorted = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Check if most recent is today or yesterday
        if (sorted[0] !== today && sorted[0] !== yesterday) {
            return 0;
        }

        let streak = 0;
        let expected = new Date(sorted[0]);

        for (const dateStr of sorted) {
            const logDate = new Date(dateStr);
            const diffDays = Math.round((expected - logDate) / 86400000);
            if (diffDays === 0) {
                streak++;
                expected = new Date(expected.getTime() - 86400000);
            } else {
                break;
            }
        }

        return streak;
    },

    /**
     * Calculate 7-day rolling averages for sleep, screen, study, exercise.
     */
    getWeeklySummary() {
        const logs = AppState.getHabitLog();
        if (logs.length === 0) {
            return {
                daysLogged: 0,
                avgSleep: 0,
                avgScreen: 0,
                avgStudy: 0,
                avgExercise: 0
            };
        }

        const recent = logs.slice(-7);
        const count = recent.length;

        const sum = recent.reduce((acc, curr) => {
            acc.sleep += parseFloat(curr.sleep_hours || 0);
            acc.screen += parseFloat(curr.screen_hours || 0);
            acc.study += parseFloat(curr.study_hours || 0);
            acc.exercise += parseFloat(curr.exercise_minutes || 0);
            return acc;
        }, { sleep: 0, screen: 0, study: 0, exercise: 0 });

        return {
            daysLogged: count,
            avgSleep: (sum.sleep / count).toFixed(1),
            avgScreen: (sum.screen / count).toFixed(1),
            avgStudy: (sum.study / count).toFixed(1),
            avgExercise: Math.round(sum.exercise / count)
        };
    }
};
