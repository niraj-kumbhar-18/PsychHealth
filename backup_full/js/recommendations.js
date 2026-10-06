/* ============================================================
   PsychHealth — Evidence-Based Recommendation Engine
   Deterministic, rule-based wellness and academic strategies.
   Strictly non-diagnostic and non-medical.
   ============================================================ */

const Recommendations = {
    /**
     * Generate customized guidance based on responses, PSS score, and identified factors.
     * @param {Object} responses - Form responses
     * @param {Object} pssResult - Output of PSS.calculate()
     * @param {Array} factors - Identified contributory factors
     * @returns {Array} List of recommendation objects
     */
    generate(responses, pssResult, factors) {
        const recommendations = [];

        // 1. High Perceived Stress Guidance (Standardized Support Protocol)
        if (pssResult.score >= 27) {
            recommendations.push({
                category: 'Stress Regulation & Support',
                title: 'High Perceived Stress Strategy',
                icon: '🌿',
                priority: 'High',
                badgeColor: 'danger',
                summary: 'Your responses indicate elevated tension and feelings of overload during the past month.',
                actionItems: [
                    'Engage in 5–10 minutes of physiological sigh breathing (two quick inhales through the nose, long slow exhale through the mouth) to down-regulate acute nervous arousal.',
                    'Consider connecting with your college student counselling centre or student welfare coordinator for confidential academic guidance.',
                    'If feeling overwhelmed, utilize verified national student support resources such as Tele-MANAS (Govt. of India toll-free 14416 / 1800-891-4416).',
                    'Discuss coursework deadlines with your academic advisor or course coordinator early rather than letting assignments accumulate.'
                ],
                disclaimer: 'Guidance is provided for educational and well-being promotion purposes only and does not constitute psychological therapy or clinical treatment.'
            });
        }

        // 2. Sleep Health & Insufficiency
        const sleepHours = responses.sleep_hours;
        const sleepQuality = responses.sleep_quality;
        if (sleepHours === 'Less than 5 hours' || sleepHours === '5–6 hours' || sleepQuality === 'Often' || sleepQuality === 'Very often') {
            recommendations.push({
                category: 'Sleep Hygiene',
                title: 'Restorative Sleep Protocol',
                icon: '😴',
                priority: sleepHours === 'Less than 5 hours' ? 'High' : 'Medium',
                badgeColor: sleepHours === 'Less than 5 hours' ? 'danger' : 'warning',
                summary: `You reported ${sleepHours || 'irregular'} average sleep with frequent daytime exhaustion. Consistent sleep architecture is essential for memory consolidation.`,
                actionItems: [
                    'Anchor a consistent wake-up time 7 days a week, regardless of when you slept, to stabilize circadian rhythm.',
                    'Power down non-academic screen devices at least 30–45 minutes prior to turning off lights to allow natural melatonin secretion.',
                    'Reserve your bed solely for sleep; relocate late-night exam cramming and smartphone browsing to a desk.'
                ],
                linkedExperiment: 'sleep'
            });
        }

        // 3. Digital Distraction & Screen Time
        const screenTime = responses.screen_time;
        const screenInterference = responses.screen_interference;
        if (screenTime === '6–8 hours' || screenTime === 'More than 8 hours' || screenInterference === 'Often' || screenInterference === 'Very often') {
            recommendations.push({
                category: 'Digital Habit & Screen Ergonomics',
                title: 'Focused Screen Boundaries',
                icon: '📱',
                priority: 'Medium',
                badgeColor: 'warning',
                summary: `High recreational screen use (${screenTime}) was reported, frequently disrupting academic focus.`,
                actionItems: [
                    'Designate 90-minute "phone-in-drawer" deep work study blocks during peak study hours.',
                    'Enable built-in grayscale mode or app timer limits (30 min max) on short-form video and social media feeds.',
                    'Replace bed-time smartphone scrolling with reading printed study materials or listening to relaxing audio.'
                ],
                linkedExperiment: 'screen'
            });
        }

        // 4. Academic Pressure & Workload Management
        const pressure = responses.academic_pressure;
        const stressSource = responses.academic_stress_source || 'Coursework';
        if (pressure === 'High' || pressure === 'Very high') {
            recommendations.push({
                category: 'Academic Workload Strategy',
                title: 'Structured Workload Deconstruction',
                icon: '📚',
                priority: 'High',
                badgeColor: 'danger',
                summary: `High pressure driven primarily by ${stressSource.toLowerCase()} can trigger task paralysis.`,
                actionItems: [
                    'Implement the Eisenhower Priority Matrix: Categorize your weekly tasks into Urgent vs. Important to eliminate low-value academic stress.',
                    'Deconstruct major assignments or syllabus units into 25-minute sub-milestones with defined end conditions.',
                    'Schedule weekly "buffer periods" to accommodate unexpected syllabus delays without encroaching on personal rest.'
                ]
            });
        }

        // 5. Procrastination & Concentration Difficulty
        const procrastination = responses.procrastination;
        const concentration = responses.concentration_difficulty;
        if (procrastination === 'Often' || procrastination === 'Very often' || concentration === 'Often' || concentration === 'Very often') {
            recommendations.push({
                category: 'Cognitive Focus & Study Habit',
                title: 'Concentration Sprint & Anti-Procrastination',
                icon: '🎯',
                priority: 'Medium',
                badgeColor: 'warning',
                summary: 'Frequent concentration strain or task delay was noted in your self-report.',
                actionItems: [
                    'Use the "5-Minute Action Rule": Commit to opening the textbook or notebook for only 5 minutes. The activation friction is usually the hardest hurdle.',
                    'Adopt the Pomodoro technique: 25 minutes of single-task immersion followed by a strictly timed 5-minute offline break.',
                    'Clear your study workspace of non-relevant tabs, notes, and notifications before opening study modules.'
                ],
                linkedExperiment: 'study'
            });
        }

        // 6. Physical Activity & Movement
        const physicalActivity = responses.physical_activity;
        if (physicalActivity === '0 days' || physicalActivity === '1–2 days') {
            recommendations.push({
                category: 'Physical Movement',
                title: 'Circulation & Stress Relief Routine',
                icon: '🏃',
                priority: 'Low',
                badgeColor: 'info',
                summary: `Reported physical activity was ${physicalActivity} per week. Mild aerobic activity is one of the most effective non-pharmacological stress reducers.`,
                actionItems: [
                    'Aim for a brisk 20–30 minute campus walk between lectures or in the early morning.',
                    'Take a 2-minute standing and stretching intermission every hour of prolonged desk sitting.',
                    'Join an informal college recreational sport or evening walking group with classmates.'
                ],
                linkedExperiment: 'activity'
            });
        }

        // 7. General Well-being Baseline (if low stress & good habits)
        if (recommendations.length === 0) {
            recommendations.push({
                category: 'Maintenance & Well-being',
                title: 'Sustaining Healthy Study-Life Equilibrium',
                icon: '✨',
                priority: 'Low',
                badgeColor: 'success',
                summary: 'Your responses indicate a balanced lifestyle and manageable stress profile.',
                actionItems: [
                    'Maintain your regular sleep and physical activity schedules during upcoming mid-terms and finals.',
                    'Support fellow peers by sharing balanced study techniques and peer encouragement.',
                    'Continue periodic self-check-ins every month to detect emerging academic fatigue early.'
                ]
            });
        }

        return recommendations;
    }
};
