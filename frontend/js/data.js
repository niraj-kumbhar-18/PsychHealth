/* ============================================================
   PsychHealth — Data Definitions
   PSS-10 questions, questionnaire options, experiment configs
   All structured data lives here — single source of truth
   ============================================================ */

const DATA = {
    /* --- PSS-10 Questions (exact standard wording — DO NOT modify) --- */
    pssQuestions: [
        {
            id: 1,
            text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
            reverse: false
        },
        {
            id: 2,
            text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
            reverse: false
        },
        {
            id: 3,
            text: 'In the last month, how often have you felt nervous and "stressed"?',
            reverse: false
        },
        {
            id: 4,
            text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
            reverse: true
        },
        {
            id: 5,
            text: 'In the last month, how often have you felt that things were going your way?',
            reverse: true
        },
        {
            id: 6,
            text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
            reverse: false
        },
        {
            id: 7,
            text: 'In the last month, how often have you been able to control irritations in your life?',
            reverse: true
        },
        {
            id: 8,
            text: 'In the last month, how often have you felt that you were on top of things?',
            reverse: true
        },
        {
            id: 9,
            text: 'In the last month, how often have you been angered because of things that were outside of your control?',
            reverse: false
        },
        {
            id: 10,
            text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
            reverse: false
        }
    ],

    /* PSS response scale */
    pssOptions: [
        { value: 0, label: 'Never' },
        { value: 1, label: 'Almost never' },
        { value: 2, label: 'Sometimes' },
        { value: 3, label: 'Fairly often' },
        { value: 4, label: 'Very often' }
    ],

    /* --- Questionnaire Field Definitions --- */
    profileFields: {
        age_group: {
            label: 'Age group',
            options: ['18–20', '21–23', '24 or above']
        },
        gender: {
            label: 'Gender',
            options: ['Male', 'Female', 'Prefer not to say']
        },
        year: {
            label: 'Current year of study',
            options: ['First Year', 'Second Year', 'Third Year', 'Postgraduate', 'Other']
        },
        course: {
            label: 'Course / Stream',
            type: 'dropdown',
            options: ['B.Sc. Computer Science', 'BCA', 'B.Com', 'B.A.', 'B.Sc.', 'B.E./B.Tech.', 'Other']
        },
        academic_performance: {
            label: 'Latest / current academic performance (CGPA)',
            options: ['Below 5.0', '5.0–5.9', '6.0–6.9', '7.0–7.9', '8.0–8.9', '9.0–10.0', 'Prefer not to say']
        }
    },

    lifestyleFields: {
        sleep_hours: {
            label: 'Average sleep per night',
            icon: '😴',
            options: ['Less than 5 hours', '5–6 hours', '6–7 hours', '7–8 hours', 'More than 8 hours']
        },
        sleep_quality: {
            label: 'How often do you feel tired due to insufficient sleep?',
            icon: '😫',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often']
        },
        screen_time: {
            label: 'Daily non-academic screen time',
            icon: '📱',
            options: ['Less than 2 hours', '2–4 hours', '4–6 hours', '6–8 hours', 'More than 8 hours']
        },
        screen_interference: {
            label: 'Does screen use interfere with your study / concentration?',
            icon: '📵',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often']
        },
        physical_activity: {
            label: 'Days per week with at least 30 min exercise',
            icon: '🏃',
            options: ['0 days', '1–2 days', '3–4 days', '5–7 days']
        }
    },

    academicFields: {
        academic_pressure: {
            label: 'Current academic pressure',
            icon: '📚',
            options: ['Very low', 'Low', 'Moderate', 'High', 'Very high']
        },
        academic_stress_source: {
            label: 'Main source of academic stress',
            icon: '😰',
            options: [
                'Examinations',
                'Assignments/projects',
                'Deadlines/workload',
                'Competition/comparison with others',
                'Fear of poor grades',
                'Family expectations',
                'Other'
            ]
        },
        study_hours: {
            label: 'Study hours outside college / classes',
            icon: '📖',
            options: ['Less than 1 hour', '1–2 hours', '2–3 hours', '3–4 hours', 'More than 4 hours']
        },
        procrastination: {
            label: 'How often do you procrastinate?',
            icon: '⏳',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often']
        },
        concentration_difficulty: {
            label: 'How often do you have difficulty concentrating?',
            icon: '🎯',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often']
        }
    },

    supportFields: {
        support_awareness: {
            label: 'Are you aware of psychological / counselling support at your college?',
            icon: '🏫',
            options: ['Yes', 'No', 'Not sure']
        },
        help_seeking_comfort: {
            label: 'How comfortable are you seeking professional support for stress?',
            icon: '🤝',
            options: ['Very uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very comfortable']
        }
    },

    /* --- 7-Day Experiment Definitions --- */
    experiments: [
        {
            id: 'sleep',
            title: 'Sleep Consistency',
            icon: '😴',
            goal: 'Improve your sleep schedule and aim for 7–8 hours consistently.',
            dailyTasks: [
                'Set a consistent bedtime',
                'No recreational screens 30 min before sleep',
                'Record sleep duration'
            ],
            trackField: 'sleep_hours',
            trackLabel: 'Sleep (hours)',
            trackMin: 0,
            trackMax: 12,
            trackStep: 0.5
        },
        {
            id: 'screen',
            title: 'Screen Reduction',
            icon: '📱',
            goal: 'Reduce non-academic screen time, especially during study sessions.',
            dailyTasks: [
                'Set app timers for social media',
                'Designate screen-free study blocks',
                'Record non-academic screen time'
            ],
            trackField: 'screen_hours',
            trackLabel: 'Screen time (hours)',
            trackMin: 0,
            trackMax: 12,
            trackStep: 0.5
        },
        {
            id: 'activity',
            title: 'Physical Activity',
            icon: '🏃',
            goal: 'Include at least 30 minutes of physical activity each day.',
            dailyTasks: [
                'Choose an activity (walk, jog, sport, gym)',
                'Complete at least 30 minutes',
                'Record activity type'
            ],
            trackField: 'active_minutes',
            trackLabel: 'Active minutes',
            trackMin: 0,
            trackMax: 120,
            trackStep: 5
        },
        {
            id: 'study',
            title: 'Study Routine',
            icon: '📖',
            goal: 'Establish a consistent daily study block outside class hours.',
            dailyTasks: [
                'Set a fixed study time each day',
                'Remove distractions during study',
                'Record study duration'
            ],
            trackField: 'study_hours',
            trackLabel: 'Study (hours)',
            trackMin: 0,
            trackMax: 8,
            trackStep: 0.5
        }
    ],

    /* --- Consent Items --- */
    consentItems: [
        'I understand this is a research-based assessment tool, not a medical diagnosis.',
        'My responses will be used anonymously for research purposes.',
        'I am a college student and I am participating voluntarily.',
        'I understand I can exit at any time without any consequence.'
    ],

    /* --- PSS Score Interpretation (standard ranges) --- */
    pssLevels: [
        { min: 0,  max: 13, level: 'Low',      color: 'success', description: 'Your perceived stress level is within the low range.' },
        { min: 14, max: 26, level: 'Moderate',  color: 'warning', description: 'Your perceived stress level is within the moderate range.' },
        { min: 27, max: 40, level: 'High',      color: 'danger',  description: 'Your perceived stress level is within the high range. Consider exploring the recommendations below.' }
    ],

    /* --- Simulator slider definitions --- */
    simulatorFactors: [
        { id: 'sleep_hours',     label: 'Sleep Duration',    icon: '😴', min: 4,  max: 9,  step: 0.5, unit: 'h',    options: ['Less than 5 hours', '5–6 hours', '6–7 hours', '7–8 hours', 'More than 8 hours'], mapValues: [4.5, 5.5, 6.5, 7.5, 8.5] },
        { id: 'screen_time',     label: 'Screen Time',       icon: '📱', min: 1,  max: 9,  step: 0.5, unit: 'h',    options: ['Less than 2 hours', '2–4 hours', '4–6 hours', '6–8 hours', 'More than 8 hours'], mapValues: [1.5, 3, 5, 7, 8.5] },
        { id: 'physical_activity', label: 'Physical Activity', icon: '🏃', min: 0,  max: 7,  step: 1,   unit: ' days', options: ['0 days', '1–2 days', '3–4 days', '5–7 days'], mapValues: [0, 1.5, 3.5, 6] },
        { id: 'study_hours',     label: 'Study Hours',       icon: '📖', min: 0,  max: 5,  step: 0.5, unit: 'h',    options: ['Less than 1 hour', '1–2 hours', '2–3 hours', '3–4 hours', 'More than 4 hours'], mapValues: [0.5, 1.5, 2.5, 3.5, 4.5] }
    ],

    /* --- 7-Day Wellness Curriculum (Screens 11 & 12 inspiration) --- */
    wellnessPlan7Days: [
        {
            day: 1,
            title: 'Check-in & Plan Study',
            duration: '10 mins',
            summary: 'Strategic scheduling and pacing prevents cognitive overload.',
            category: 'Academic Hygiene',
            completed: true
        },
        {
            day: 2,
            title: 'Relaxation & Breathing',
            duration: '10 mins',
            summary: '4-7-8 diaphragmatic relaxation activates the vagus nerve and lowers sympathetic arousal.',
            category: 'Somatic Calming',
            completed: false,
            isCurrent: true
        },
        {
            day: 3,
            title: 'Improve Sleep Routine',
            duration: '20 mins',
            summary: 'Adequate slow-wave sleep is essential to consolidate syllabus retention.',
            category: 'Circadian Balance',
            completed: false
        },
        {
            day: 4,
            title: 'Digital Balance & Screen Limits',
            duration: '15 mins',
            summary: 'Reducing evening recreational screen time restores natural melatonin curves.',
            category: 'Digital Habit',
            completed: false
        },
        {
            day: 5,
            title: 'Mindfulness & Grounding',
            duration: '10 mins',
            summary: 'Sensory grounding to disengage from ruminative exam pressure.',
            category: 'Attention Regulation',
            completed: false
        },
        {
            day: 6,
            title: 'Cognitive Reframing',
            duration: '15 mins',
            summary: 'Deconstruct overwhelming academic demands into bite-sized achievable tasks.',
            category: 'Cognitive Agility',
            completed: false
        },
        {
            day: 7,
            title: 'Weekly Reflection & Reassessment',
            duration: '10 mins',
            summary: 'Reassess with PSS-10 to objectively evaluate empirical changes.',
            category: 'Progress Review',
            completed: false
        }
    ],

    /* --- Interactive Breathing Exercise (Screen 12) --- */
    breathingExercise: {
        title: '4-7-8 Diaphragmatic Breathing',
        subtitle: 'Somatic Nervous System Calming · 4 Cycles (~3 minutes)',
        estimatedDuration: '10 minutes',
        phases: [
            { name: 'Inhale', duration: 4, instruction: 'Inhale quietly through your nose' },
            { name: 'Hold', duration: 7, instruction: 'Hold your breath gently and comfortably' },
            { name: 'Exhale', duration: 8, instruction: 'Exhale completely through your mouth with a soft whoosh' }
        ],
        steps: [
            '1. Sit comfortably with your spine erect and rest your hands on your lap.',
            '2. Inhale quietly through your nose for a count of 4.',
            '3. Hold your breath gently for a count of 7.',
            '4. Exhale completely through your mouth for a count of 8.',
            '5. Repeat the complete cycle 4 times to regulate autonomic nervous tone.'
        ]
    },

    /* --- Real Cohort Responses (N=16 pilot survey) --- */
    cohortResponses: [
        { id: "PH-001", age: "21–23", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 22, pss_level: "Moderate", sleep: "6–7 hours", screen: "2–4 hours", pressure: "Low", source: "Deadlines/workload" },
        { id: "PH-002", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "7.0–7.9", pss_score: 19, pss_level: "Moderate", sleep: "5–6 hours", screen: "4–6 hours", pressure: "Moderate", source: "Deadlines/workload" },
        { id: "PH-003", age: "21–23", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 16, pss_level: "Moderate", sleep: "Less than 5 hours", screen: "Less than 2 hours", pressure: "Moderate", source: "Assignments/projects" },
        { id: "PH-004", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "9.0–10.0", pss_score: 27, pss_level: "High", sleep: "5–6 hours", screen: "6–8 hours", pressure: "Moderate", source: "Assignments/projects" },
        { id: "PH-005", age: "21–23", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "7.0–7.9", pss_score: 19, pss_level: "Moderate", sleep: "Less than 5 hours", screen: "Less than 2 hours", pressure: "Moderate", source: "Family expectations" },
        { id: "PH-006", age: "18–20", gender: "Female", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "7.0–7.9", pss_score: 17, pss_level: "Moderate", sleep: "7–8 hours", screen: "4–6 hours", pressure: "Moderate", source: "Fear of poor grades" },
        { id: "PH-007", age: "21–23", gender: "Male", year: "Third Year", course: "BCA", cgpa: "9.0–10.0", pss_score: 18, pss_level: "Moderate", sleep: "5–6 hours", screen: "4–6 hours", pressure: "Very low", source: "Examinations" },
        { id: "PH-008", age: "21–23", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 15, pss_level: "Moderate", sleep: "7–8 hours", screen: "2–4 hours", pressure: "High", source: "Assignments/projects" },
        { id: "PH-009", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "6.0–6.9", pss_score: 19, pss_level: "Moderate", sleep: "6–7 hours", screen: "4–6 hours", pressure: "Moderate", source: "Assignments/projects" },
        { id: "PH-010", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 18, pss_level: "Moderate", sleep: "5–6 hours", screen: "4–6 hours", pressure: "Very low", source: "Competition/comparison with others" },
        { id: "PH-011", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "7.0–7.9", pss_score: 10, pss_level: "Low", sleep: "6–7 hours", screen: "4–6 hours", pressure: "Very low", source: "Other" },
        { id: "PH-012", age: "18–20", gender: "Male", year: "Second Year", course: "B.E./B.Tech.", cgpa: "8.0–8.9", pss_score: 18, pss_level: "Moderate", sleep: "6–7 hours", screen: "4–6 hours", pressure: "Moderate", source: "Assignments/projects" },
        { id: "PH-013", age: "18–20", gender: "Female", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 20, pss_level: "Moderate", sleep: "6–7 hours", screen: "2–4 hours", pressure: "Moderate", source: "Fear of poor grades" },
        { id: "PH-014", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 17, pss_level: "Moderate", sleep: "6–7 hours", screen: "2–4 hours", pressure: "Moderate", source: "Other" },
        { id: "PH-015", age: "18–20", gender: "Male", year: "Third Year", course: "B.Sc. Computer Science", cgpa: "8.0–8.9", pss_score: 20, pss_level: "Moderate", sleep: "7–8 hours", screen: "6–8 hours", pressure: "Moderate", source: "Other" },
        { id: "PH-016", age: "24 or above", gender: "Female", year: "Postgraduate", course: "B.E./B.Tech.", cgpa: "7.0–7.9", pss_score: 20, pss_level: "Moderate", sleep: "6–7 hours", screen: "4–6 hours", pressure: "Moderate", source: "Family expectations" }
    ]
};
