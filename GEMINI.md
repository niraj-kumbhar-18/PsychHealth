# GEMINI.md — Project Master Context

## 1. Project Identity

**Project Title:** Psychological Health Assessment of College Students and Its Impact on Academic Performance

**Competition:** Avishkar — Maharashtra student research project competition

**Current stage:** Zonal level

**Next competition date:** 12 October 2026

**Project type:** Research + Machine Learning + Web Application

This file is the primary context file for the AI assistant working on this project. Read it before making project decisions. Do not assume missing details. If something is uncertain, clearly label it as an assumption and discuss it with the project team.

---

## 2. Why This Project Exists

The project was originally created as a college semester/CEP project. The original version was largely AI-generated, had weak research validation, and contained unreliable charts/data.

It was unexpectedly selected for the first Avishkar round.

The goal now is to transform it into a real, defensible student research project with a working application and legitimate ML pipeline.

We are rebuilding it properly:
- collect/clean real student data,
- use a standardized stress instrument,
- perform genuine analysis,
- build and evaluate ML models,
- create a working application,
- generate evidence-based recommendations,
- present limitations honestly.

Do NOT hide weaknesses by fabricating results.

---

## 3. Competition Requirements

The current presentation/flex must contain EXACTLY these main sections:

1. Title
2. Abstract
3. Problem Statement
4. Objectives
5. System Architecture
6. Recommendation
7. Conclusion
8. References

The second round expects a buildable/working solution, model, or similar implementation. The working web application is therefore important.

---

## 4. Research Direction

The project studies relationships among:

### Psychological/stress factors
- Perceived stress
- Academic pressure
- Concentration difficulty
- Procrastination
- Help-seeking behaviour

### Lifestyle factors
- Sleep duration
- Sleep quality/insufficient sleep
- Non-academic screen time
- Screen interference with study
- Physical activity

### Academic factors
- Study hours
- Academic pressure
- Academic stress source
- Latest/current academic performance

Attendance was considered earlier but has been removed from the final questionnaire.

### Demographic/context factors
- Age group
- Gender
- Year of study
- Course/stream

---

## 5. PSS-10

We use the **Perceived Stress Scale (PSS-10)** as the standardized stress measurement.

PSS-10 measures perceived stress. It is NOT a diagnosis of a psychological disorder.

Use:
- perceived stress
- perceived stress level
- stress-related risk pattern
- wellbeing-related factors

Do NOT claim:
- diagnosis of depression/anxiety
- diagnosis of mental illness
- medical treatment

PSS-10 response scale:

- 0 — Never
- 1 — Almost never
- 2 — Sometimes
- 3 — Fairly often
- 4 — Very often

Reverse-scored items:

- Q4
- Q5
- Q7
- Q8

Reverse scoring:
- 0 -> 4
- 1 -> 3
- 2 -> 2
- 3 -> 1
- 4 -> 0

Calculate the total PSS score after reverse scoring.

Do not modify standardized PSS-10 wording when using the instrument.

---

## 6. Final Questionnaire

### Section 1 — Basic Academic Information

**Q1. Age group**
- 18–20
- 21–23
- 24 or above

Field: `age_group`

**Q2. Current year of study**
- First Year
- Second Year
- Third Year
- Postgraduate
- Other

Field: `year`

**Q3. Course/stream**
Current example:
- B.Sc. Computer Science
- BCA
- B.Com
- B.A.
- B.Sc.
- B.E./B.Tech.
- Other

Field: `course`

Customize these options to the actual respondent population if needed.

**Q4. Gender**
- Male
- Female
- Non-binary / Other
- Prefer not to say

Field: `gender`

**Q5. Latest/current academic performance**
Current working format is CGPA:
- Below 5.0
- 5.0–5.9
- 6.0–6.9
- 7.0–7.9
- 8.0–8.9
- 9.0–10.0
- Prefer not to say

Field: `academic_performance`

If the population uses another grading system, reconsider this rather than mixing CGPA and percentage silently.

### Section 2 — PSS-10

Q6–Q15 are the 10 PSS-10 items.

Fields: `pss_q1` through `pss_q10`

Derived field: `pss_score`

### Section 3 — Sleep & Lifestyle

**Q16. Average sleep per night**
- Less than 5 hours
- 5–6 hours
- 6–7 hours
- 7–8 hours
- More than 8 hours

Field: `sleep_hours`

**Q17. Sleep insufficiency/tiredness**
- Never
- Rarely
- Sometimes
- Often
- Very often

Field: `sleep_quality`

**Q18. Non-academic screen time**
- Less than 2 hours
- 2–4 hours
- 4–6 hours
- 6–8 hours
- More than 8 hours

Field: `screen_time`

**Q19. Screen interference with study/concentration**
- Never
- Rarely
- Sometimes
- Often
- Very often

Field: `screen_interference`

**Q20. Physical activity**
Days per week with at least 30 minutes:
- 0 days
- 1–2 days
- 3–4 days
- 5–7 days

Field: `physical_activity`

### Section 4 — Academic Factors

**Q21. Current academic pressure**
- Very low
- Low
- Moderate
- High
- Very high

Field: `academic_pressure`

**Q22. Main academic stress source**
- Examinations
- Assignments/projects
- Deadlines/workload
- Competition/comparison with others
- Fear of poor grades
- Family expectations
- Other

Field: `academic_stress_source`

Primarily useful for analysis/recommendations; do not automatically force it into ML.

**Q23. Study hours outside college/classes**
- Less than 1 hour
- 1–2 hours
- 2–3 hours
- 3–4 hours
- More than 4 hours

Field: `study_hours`

**Q24. Procrastination**
- Never
- Rarely
- Sometimes
- Often
- Very often

Field: `procrastination`

**Q25. Concentration difficulty**
- Never
- Rarely
- Sometimes
- Often
- Very often

Field: `concentration_difficulty`

### Section 5 — Support & Help-Seeking

**Q26. Awareness of psychological/counselling support**
- Yes
- No
- Not sure

Field: `support_awareness`

**Q27. Comfort seeking professional support**
- Very uncomfortable
- Uncomfortable
- Neutral
- Comfortable
- Very comfortable

Field: `help_seeking_comfort`

---

## 7. Application Workflow

The application is NOT simply a Google Form.

1. Student opens the application.
2. Reads purpose/disclaimer.
3. Completes basic information.
4. Completes PSS-10.
5. Completes lifestyle questions.
6. Completes academic/behaviour questions.
7. Completes support/help-seeking questions.
8. Submits.
9. Backend validates/processes the response.
10. PSS score is calculated.
11. Perceived stress level is determined.
12. ML model processes selected features when a validated model is available.
13. Academic-performance prediction/output is generated.
14. Recommendation engine identifies relevant areas.
15. Student sees a result dashboard.

### Core data flow

```text
Student
   |
   v
Web Application
   |
   v
Questionnaire
   |
   v
Backend API
   |
   +--------------------+
   |                    |
   v                    v
PSS Scoring         Feature Processing
   |                    |
   v                    v
Stress Level        ML Model
                        |
                        v
              Academic Performance
                  Prediction
                        |
                        v
              Recommendation Engine
                        |
                        v
                Result Dashboard
```

---

## 8. Planned Application Features

### Student assessment
- Basic demographic/academic information
- PSS-10 assessment
- Lifestyle assessment
- Academic pressure assessment
- Study behaviour assessment
- Help-seeking assessment

### Automated PSS assessment
- Convert PSS answers to numerical values
- Reverse-score required items
- Calculate PSS total
- Produce perceived-stress level

### ML prediction
Analyze selected features to identify patterns related to academic performance.

The exact target/model must be finalized after inspecting real data.

### Factor identification
Potential factors:
- high academic pressure
- insufficient sleep
- high non-academic screen time
- concentration difficulty
- procrastination
- low physical activity
- high perceived stress

### Recommendation engine
Initially rule-based, not random LLM-generated medical advice.

Example:

```text
IF sleep is insufficient
    -> sleep recommendation

IF screen time is high
    -> screen-management recommendation

IF academic pressure is high
    -> workload/time-management recommendation

IF concentration difficulty is frequent
    -> focus/study-environment recommendation

IF PSS level is high
    -> stress-management and appropriate support guidance
```

---

## 9. Result Dashboard

The student-facing dashboard should contain:

### Perceived Stress
- PSS score
- Perceived stress level

### Academic Prediction
Only display when the ML model has been properly trained and evaluated.

### Key Factors
Example:
- High academic pressure
- Short sleep duration
- High screen time
- Frequent concentration difficulty

### Recommendations
Targeted recommendations based on identified factors.

### Support Guidance
If stress is high or the student indicates concern, guide them toward trusted people, college counselling, or appropriate professional support.

Do not diagnose or prescribe treatment.

---

## 10. ML Strategy

Initial candidate algorithms:

1. Logistic Regression
2. Random Forest
3. Gradient Boosting / XGBoost if justified

These are candidates, NOT guaranteed final models.

Select the final model based on:
- data size
- target distribution
- class balance
- evaluation metrics
- generalization
- interpretability
- suitability

Never claim the "best accuracy" from inadequate data.

### Intended direction

```text
PSS score
+
Sleep
+
Screen time
+
Physical activity
+
Academic pressure
+
Study behaviour
+
Demographic/context features
        |
        v
     ML model
        |
        v
Academic performance prediction
```

The final feature set must be decided after EDA.

Avoid target leakage. If academic performance is the target, do not use it as an input feature.

---

## 11. Data Pipeline

### Collection

```text
Google Form / Application
        |
        v
Raw response data
```

### Preprocessing

```text
Raw responses
        |
        v
Data cleaning
        |
        v
Categorical encoding
        |
        v
PSS reverse scoring
        |
        v
PSS score
        |
        v
Feature engineering
        |
        v
ML-ready dataset
```

### Training

```text
ML-ready dataset
        |
        v
Train/validation/test strategy
        |
        v
Candidate models
        |
        v
Evaluation
        |
        v
Selected model
        |
        v
Saved model artifact
```

### Inference

```text
New student response
        |
        v
Same preprocessing pipeline
        |
        v
Saved ML model
        |
        v
Prediction
```

Training and inference must use the same preprocessing logic.

---

## 12. Important Rule About New Data

A new application response does NOT automatically train the model.

Correct workflow:

```text
New responses
    |
    v
Stored data
    |
    v
Quality check
    |
    v
Cleaning/preprocessing
    |
    v
Training pipeline
    |
    v
Model evaluation
    |
    v
Deploy new model only if acceptable
```

Do not implement automatic self-training from every response.

---

## 13. Current Dataset Status

Current temporary dataset: **16 responses**.

Treat it as the current working/pilot dataset.

It is NOT sufficient to claim a reliable ML model.

Use it to:
- build preprocessing
- test PSS scoring
- inspect distributions
- develop the application
- develop the ML pipeline
- test end-to-end flow

When the user provides an updated dataset, replace the temporary dataset and rerun the pipeline.

Do not repeatedly ask whether new responses have arrived. The user will provide updates when available.

---

## 14. Current Data Quality

The inspected 16-row dataset:
- follows the intended questionnaire structure,
- has no obvious missing-value problem,
- contains PSS-10 responses,
- contains lifestyle variables,
- contains academic variables,
- contains help-seeking variables,
- has variation in PSS scores.

Some responses may deserve quality review if they have identical answers across all PSS items, but do not automatically delete them without a defensible reason.

---

## 15. Old Project Data

Older data existed from the original semester project.

Important:
- It was collected before the current research design.
- Some original charts/data were unreliable.
- It must NOT automatically be treated as valid research evidence.
- Do not reuse fake charts.
- Do not fabricate replacements.
- If old data is used, inspect and map it carefully.
- Clearly distinguish old data from newly collected data.

The project is being rebuilt, not cosmetically edited.

---

## 16. Research Integrity Rules

Never:
- fabricate responses
- duplicate responses to inflate sample size
- invent results
- create fake charts
- claim unsupported ML accuracy
- call PSS a diagnosis
- claim causality from observational data
- hide limitations
- use academic performance as both feature and target
- automatically train on unverified new data

If the dataset is small, say so.

If a model performs poorly, report it honestly.

---

## 17. Technology Direction

Preferred web architecture:

```text
Frontend
    |
    v
FastAPI Backend
    |
    +---- PSS scoring
    |
    +---- Feature preprocessing
    |
    +---- ML inference
    |
    +---- Recommendation engine
    |
    v
Database
```

Preferred technologies:
- Frontend: React or HTML/CSS/JavaScript depending on speed/complexity
- Backend: Python + FastAPI
- ML: Python + scikit-learn
- Data processing: pandas
- Database: PostgreSQL
- Model persistence: joblib or appropriate production-safe method

Avoid unnecessary complexity.

---

## 18. Development Strategy

Do NOT wait for the final dataset before starting the application.

Build in parallel.

### Phase 1 — Application foundation
- UI
- Navigation
- Questionnaire pages
- Form validation

### Phase 2 — Backend
- FastAPI
- API endpoints
- Request validation
- PSS calculation

### Phase 3 — Database
- Store assessment responses
- Store processed results where appropriate

### Phase 4 — Recommendation engine
- Rule-based recommendations
- Factor detection

### Phase 5 — ML pipeline
- Cleaning
- Encoding
- EDA
- Feature engineering
- Model training
- Evaluation
- Model saving

### Phase 6 — ML integration
- Load validated model
- Run prediction
- Return prediction to frontend

### Phase 7 — Results dashboard
- PSS score
- Stress level
- Academic prediction
- Important factors
- Recommendations
- Support guidance

### Phase 8 — Testing
- Form validation
- API testing
- PSS scoring verification
- ML prediction testing
- End-to-end testing

### Phase 9 — Avishkar preparation
- Architecture
- Research findings
- Screenshots
- Demo
- Presentation/flex
- References
- Limitations

---

## 19. Current Priority

Move quickly.

Priority:

```text
1. Freeze questionnaire
2. Build application UI
3. Build FastAPI backend
4. Implement PSS scoring
5. Implement recommendation rules
6. Clean current dataset
7. Build ML preprocessing pipeline
8. Train/evaluate candidate ML models when data supports it
9. Integrate validated model
10. Build final result dashboard
11. Test
12. Prepare Avishkar demo/presentation
```

Do not spend days discussing architecture without implementing it.

---

## 20. How the AI Assistant Should Work

Act as a senior AI/ML engineer + research mentor + product engineer.

The team is beginner/intermediate and needs practical guidance.

Be:
- direct
- technically honest
- research-oriented
- implementation-focused

Challenge weak assumptions.

If a feature is useless, say so.

If a model is inappropriate, say so.

If the dataset is too small, say so.

If a research claim is too strong, weaken it.

If something is unknown, do not invent it.

Prefer a simple working system over buzzwords.

---

## 21. What We Are NOT Building

Do not turn this into:
- a generic chatbot
- a therapy chatbot
- a medical diagnosis system
- an LLM pretending to diagnose mental illness
- a random recommendation generator
- a fake high-accuracy ML demo
- an over-engineered microservice architecture

This is a **research-based student assessment and early-guidance system**.

---

## 22. Fixed Terminology

Use consistently:

- **Perceived Stress** — measured using PSS-10
- **PSS Score** — numerical PSS result
- **Perceived Stress Level** — interpretation of PSS score
- **Academic Performance** — current/latest academic outcome
- **Academic Performance Prediction** — ML output, if validated
- **Recommendation Engine** — rule-based guidance system
- **Psychological well-being / perceived stress** — appropriate language
- **Mental-health diagnosis** — NOT a function of this system

---

## 23. Final Goal

By the Avishkar zonal round, demonstrate:

1. Working web application
2. Real questionnaire using PSS-10 + project-specific factors
3. Real student-response data
4. PSS score calculation
5. Data preprocessing
6. Exploratory analysis
7. Defensible ML model, if data supports one
8. Academic-performance prediction
9. Recommendation engine
10. End-to-end architecture
11. Clear limitations and methodology
12. A demo the team actually understands

The goal is not to make the project look impressive through buzzwords.

The goal is to make it **technically functional, scientifically defensible, explainable, and demonstrable**.

---

## 24. Immediate Task

Do not restart planning.

Start building the application foundation while the current 16-response dataset remains the temporary working dataset.

First implement:
1. frontend questionnaire
2. backend API
3. PSS scoring
4. basic result generation
5. recommendation rules

Then integrate ML after the preprocessing/evaluation pipeline is ready.
