/* ============================================================
   PsychHealth — What-If Simulator Engine
   Interactive behavioural scenario exploration.
   Permits students to test hypothetical changes to lifestyle
   and observe projected impact on perceived stress.
   ============================================================ */

const Simulator = {
    // Default factor baseline if student hasn't completed an assessment yet
    defaults: {
        sleep_hours: 6.0,
        screen_time: 5.5,
        physical_activity: 1,
        study_hours: 1.5
    },

    /**
     * Map questionnaire text categories to numeric baseline values.
     */
    mapAssessmentToNumeric(assessment) {
        if (!assessment || !assessment.responses) {
            return { ...this.defaults };
        }

        const r = assessment.responses;
        let sleep = 6.0;
        if (r.sleep_hours === 'Less than 5 hours') sleep = 4.5;
        else if (r.sleep_hours === '5–6 hours') sleep = 5.5;
        else if (r.sleep_hours === '6–7 hours') sleep = 6.5;
        else if (r.sleep_hours === '7–8 hours') sleep = 7.5;
        else if (r.sleep_hours === 'More than 8 hours') sleep = 8.5;

        let screen = 5.0;
        if (r.screen_time === 'Less than 2 hours') screen = 1.5;
        else if (r.screen_time === '2–4 hours') screen = 3.0;
        else if (r.screen_time === '4–6 hours') screen = 5.0;
        else if (r.screen_time === '6–8 hours') screen = 7.0;
        else if (r.screen_time === 'More than 8 hours') screen = 9.0;

        let activity = 1;
        if (r.physical_activity === '0 days') activity = 0;
        else if (r.physical_activity === '1–2 days') activity = 1.5;
        else if (r.physical_activity === '3–4 days') activity = 3.5;
        else if (r.physical_activity === '5–7 days') activity = 6.0;

        let study = 2.0;
        if (r.study_hours === 'Less than 1 hour') study = 0.5;
        else if (r.study_hours === '1–2 hours') study = 1.5;
        else if (r.study_hours === '2–3 hours') study = 2.5;
        else if (r.study_hours === '3–4 hours') study = 3.5;
        else if (r.study_hours === 'More than 4 hours') study = 4.5;

        return {
            sleep_hours: sleep,
            screen_time: screen,
            physical_activity: activity,
            study_hours: study
        };
    },

    /**
     * Compute simulated perceived stress score shift.
     * Evaluates marginal impact of lifestyle adjustments on PSS index.
     * @param {Object} currentBaseline - Current numeric values
     * @param {Object} simulatedValues - Sliders values
     * @param {number} baseScore - Real PSS score
     */
    simulate(currentBaseline, simulatedValues, baseScore = 24) {
        // Delta calculations
        const sleepDelta = simulatedValues.sleep_hours - currentBaseline.sleep_hours;
        const screenDelta = simulatedValues.screen_time - currentBaseline.screen_time;
        const activityDelta = simulatedValues.physical_activity - currentBaseline.physical_activity;
        const studyDelta = simulatedValues.study_hours - currentBaseline.study_hours;

        // Empirical research weighting coefficients for exploratory simulation
        // Optimal sleep target ~7.5 - 8h (each +1h towards optimum reduces stress ~2.2 pts)
        let sleepEffect = 0;
        if (simulatedValues.sleep_hours <= 8.0) {
            sleepEffect = sleepDelta * -2.2;
        } else {
            sleepEffect = (8.0 - currentBaseline.sleep_hours) * -2.2 + (simulatedValues.sleep_hours - 8.0) * 0.5;
        }

        // Screen reduction (each -1h screen reduces stress ~1.4 pts)
        const screenEffect = screenDelta * 1.4;

        // Physical activity (each +1 day of exercise reduces stress ~1.1 pts)
        const activityEffect = activityDelta * -1.1;

        // Structured study (moderate study 2-3.5h reduces panic ~0.8 pts/hr; excessive cramming adds stress)
        let studyEffect = 0;
        if (simulatedValues.study_hours <= 3.5) {
            studyEffect = studyDelta * -0.8;
        } else {
            studyEffect = (3.5 - currentBaseline.study_hours) * -0.8 + (simulatedValues.study_hours - 3.5) * 1.2;
        }

        const totalDelta = sleepEffect + screenEffect + activityEffect + studyEffect;
        let projectedScore = Math.round(baseScore + totalDelta);

        // Clamp to valid PSS range 0 - 40
        projectedScore = Math.max(0, Math.min(40, projectedScore));

        const projectedLevel = PSS.getLevel(projectedScore);

        return {
            baseScore,
            projectedScore,
            scoreDifference: projectedScore - baseScore,
            projectedLevel: projectedLevel.level,
            projectedColor: projectedLevel.color,
            breakdown: {
                sleepImpact: Math.round(sleepEffect * 10) / 10,
                screenImpact: Math.round(screenEffect * 10) / 10,
                activityImpact: Math.round(activityEffect * 10) / 10,
                studyImpact: Math.round(studyEffect * 10) / 10
            }
        };
    }
};
