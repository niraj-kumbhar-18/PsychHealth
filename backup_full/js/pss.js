/* ============================================================
   PsychHealth — PSS-10 Scoring & Factor Identification Engine
   Standardized Perceived Stress Scale (Cohen et al., 1983)
   Exact scoring rules, reverse-scoring, and scientific subscales.
   ============================================================ */

const PSS = {
    // Reverse-scored item numbers in PSS-10 (1-indexed)
    REVERSE_ITEMS: [4, 5, 7, 8],

    /**
     * Calculate standardized PSS-10 score from user responses.
     * @param {Object} responses - Form responses with keys pss_q1 through pss_q10
     * @returns {Object} { score, level, color, description, breakdown, subscales }
     */
    calculate(responses) {
        let totalScore = 0;
        let answeredCount = 0;
        const breakdown = [];
        let helplessnessScore = 0;
        let selfEfficacyScore = 0;

        for (let i = 1; i <= 10; i++) {
            const rawVal = responses[`pss_q${i}`];
            if (rawVal !== null && rawVal !== undefined) {
                const numericVal = parseInt(rawVal, 10);
                const isReverse = this.REVERSE_ITEMS.includes(i);
                const scoredVal = isReverse ? (4 - numericVal) : numericVal;

                totalScore += scoredVal;
                answeredCount++;

                if (isReverse) {
                    selfEfficacyScore += (4 - scoredVal); // higher raw = higher coping
                } else {
                    helplessnessScore += scoredVal;
                }

                breakdown.push({
                    item: i,
                    raw: numericVal,
                    scored: scoredVal,
                    reverse: isReverse
                });
            }
        }

        const levelInfo = this.getLevel(totalScore);

        return {
            score: totalScore,
            maxScore: 40,
            answeredCount,
            level: levelInfo.level,
            color: levelInfo.color,
            description: levelInfo.description,
            breakdown,
            subscales: {
                helplessness: helplessnessScore, // 0 to 24 (items 1,2,3,6,9,10)
                copingEfficacy: selfEfficacyScore // 0 to 16 (items 4,5,7,8)
            }
        };
    },

    /**
     * Map numeric score to standardized Perceived Stress category.
     * Note: PSS-10 norms specify 0-13 Low, 14-26 Moderate, 27-40 High.
     */
    getLevel(score) {
        if (score <= 13) {
            return {
                level: 'Low',
                color: 'success',
                description: 'Your responses indicate a low perceived stress level during the past month. Your stress responses appear well within manageable coping ranges.'
            };
        } else if (score <= 26) {
            return {
                level: 'Moderate',
                color: 'warning',
                description: 'Your responses indicate a moderate perceived stress level. This is common among college students juggling coursework, examinations, and personal routines.'
            };
        } else {
            return {
                level: 'High',
                color: 'danger',
                description: 'Your responses indicate an elevated perceived stress level over the past month. Targeted lifestyle adjustments and campus support resources can help restore balance.'
            };
        }
    },

    /**
     * Identify key contributory lifestyle and academic factors.
     * Evaluates responses against research thresholds.
     */
    identifyFactors(responses, pssScore) {
        const factors = [];

        // 1. Sleep Duration
        const sleepHours = responses.sleep_hours;
        if (sleepHours === 'Less than 5 hours' || sleepHours === '5–6 hours') {
            factors.push({
                id: 'sleep_duration',
                category: 'Lifestyle',
                title: 'Insufficient Sleep Duration',
                detail: `Reported sleep: ${sleepHours}`,
                impact: 'High',
                color: 'danger',
                icon: '😴',
                recommendationKey: 'sleep'
            });
        }

        // 2. Sleep Tiredness / Insufficiency
        const sleepQuality = responses.sleep_quality;
        if (sleepQuality === 'Often' || sleepQuality === 'Very often') {
            factors.push({
                id: 'sleep_quality',
                category: 'Lifestyle',
                title: 'Frequent Daytime Sleep Fatigue',
                detail: `Tiredness frequency: ${sleepQuality}`,
                impact: 'Moderate',
                color: 'warning',
                icon: '😫',
                recommendationKey: 'sleep'
            });
        }

        // 3. Screen Time
        const screenTime = responses.screen_time;
        if (screenTime === '6–8 hours' || screenTime === 'More than 8 hours') {
            factors.push({
                id: 'screen_time',
                category: 'Digital Habit',
                title: 'Elevated Non-Academic Screen Time',
                detail: `Reported screen time: ${screenTime}`,
                impact: 'High',
                color: 'warning',
                icon: '📱',
                recommendationKey: 'screen'
            });
        }

        // 4. Screen Interference
        const screenInterference = responses.screen_interference;
        if (screenInterference === 'Often' || screenInterference === 'Very often') {
            factors.push({
                id: 'screen_interference',
                category: 'Study Behaviour',
                title: 'Screen Interference with Study',
                detail: `Interference frequency: ${screenInterference}`,
                impact: 'High',
                color: 'danger',
                icon: '📵',
                recommendationKey: 'screen'
            });
        }

        // 5. Physical Activity
        const physicalActivity = responses.physical_activity;
        if (physicalActivity === '0 days' || physicalActivity === '1–2 days') {
            factors.push({
                id: 'physical_activity',
                category: 'Lifestyle',
                title: 'Low Physical Activity',
                detail: `Active days: ${physicalActivity}/week`,
                impact: 'Moderate',
                color: 'warning',
                icon: '🏃',
                recommendationKey: 'activity'
            });
        }

        // 6. Academic Pressure
        const academicPressure = responses.academic_pressure;
        if (academicPressure === 'High' || academicPressure === 'Very high') {
            factors.push({
                id: 'academic_pressure',
                category: 'Academic',
                title: 'High Academic Workload Pressure',
                detail: `Pressure level: ${academicPressure}`,
                impact: 'High',
                color: 'danger',
                icon: '📚',
                recommendationKey: 'pressure'
            });
        }

        // 7. Procrastination
        const procrastination = responses.procrastination;
        if (procrastination === 'Often' || procrastination === 'Very often') {
            factors.push({
                id: 'procrastination',
                category: 'Study Behaviour',
                title: 'Frequent Study Procrastination',
                detail: `Frequency: ${procrastination}`,
                impact: 'Moderate',
                color: 'warning',
                icon: '⏳',
                recommendationKey: 'procrastination'
            });
        }

        // 8. Concentration Difficulty
        const concentration = responses.concentration_difficulty;
        if (concentration === 'Often' || concentration === 'Very often') {
            factors.push({
                id: 'concentration',
                category: 'Cognitive / Focus',
                title: 'Frequent Concentration Strain',
                detail: `Frequency: ${concentration}`,
                impact: 'High',
                color: 'danger',
                icon: '🎯',
                recommendationKey: 'concentration'
            });
        }

        // 9. Help-Seeking / Support Comfort
        const helpComfort = responses.help_seeking_comfort;
        if (helpComfort === 'Very uncomfortable' || helpComfort === 'Uncomfortable') {
            factors.push({
                id: 'help_seeking',
                category: 'Support',
                title: 'Reluctance Toward Professional Support',
                detail: `Comfort level: ${helpComfort}`,
                impact: 'Moderate',
                color: 'info',
                icon: '🤝',
                recommendationKey: 'support'
            });
        }

        return factors;
    }
};
