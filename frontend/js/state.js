/* ============================================================
   PsychHealth — Central State Management & Multi-Student Store
   Strictly isolates student accounts per GEMINI.md.
   Syncs with SQLite Backend (http://localhost:8000/api) with
   graceful client-side partitioned persistence.
   ============================================================ */

const AppState = {
    API_URL: (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && window.location.protocol.startsWith('http')) 
        ? `${window.location.origin}/api` 
        : 'http://localhost:8000/api',
    REGISTRY_KEY: 'psychhealth_users_registry_v7',
    ACTIVE_KEY: 'psychhealth_active_user_v7',
    THEME_KEY: 'psychhealth_theme_v7',

    // Global in-memory cache
    _users: {},
    _activeStudentId: null,
    _theme: 'light',
    _adminMode: false,

    // In-progress assessment temporary response buffer
    _currentAssessment: {
        pss_q1: null, pss_q2: null, pss_q3: null, pss_q4: null, pss_q5: null,
        pss_q6: null, pss_q7: null, pss_q8: null, pss_q9: null, pss_q10: null,
        sleep_hours: null,
        sleep_quality: null,
        screen_time: null,
        screen_interference: null,
        physical_activity: null,
        academic_pressure: null,
        academic_stress_source: null,
        study_hours: null,
        procrastination: null,
        concentration_difficulty: null,
        support_awareness: null,
        concentration_difficulty: null,
        support_awareness: null,
        help_seeking_comfort: null
    },

    sha256Sync(ascii) {
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        }
        const words = [];
        const asciiBitLength = ascii.length * 8;
        let hash = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
            0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        const k = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        for (let i = 0; i < ascii.length; i++) {
            words[i >> 2] |= (ascii.charCodeAt(i) & 0xff) << ((3 - (i % 4)) * 8);
        }
        words[ascii.length >> 2] |= 0x80 << ((3 - (ascii.length % 4)) * 8);
        words[(((ascii.length + 8) >> 6) << 4) + 15] = asciiBitLength;
        for (let i = 0; i < words.length; i += 16) {
            const w = [];
            for (let j = 0; j < 16; j++) w[j] = words[i + j] | 0;
            for (let j = 16; j < 64; j++) {
                const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
                const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
                w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
            }
            let a = hash[0], b = hash[1], c = hash[2], d = hash[3];
            let e = hash[4], f = hash[5], g = hash[6], h = hash[7];
            for (let j = 0; j < 64; j++) {
                const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
                const ch = (e & f) ^ ((~e) & g);
                const temp1 = (h + S1 + ch + k[j] + w[j]) | 0;
                const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
                const maj = (a & b) ^ (a & c) ^ (b & c);
                const temp2 = (S0 + maj) | 0;
                h = g; g = f; f = e; e = (d + temp1) | 0;
                d = c; c = b; b = a; a = (temp1 + temp2) | 0;
            }
            hash[0] = (hash[0] + a) | 0;
            hash[1] = (hash[1] + b) | 0;
            hash[2] = (hash[2] + c) | 0;
            hash[3] = (hash[3] + d) | 0;
            hash[4] = (hash[4] + e) | 0;
            hash[5] = (hash[5] + f) | 0;
            hash[6] = (hash[6] + g) | 0;
            hash[7] = (hash[7] + h) | 0;
        }
        let result = '';
        for (let i = 0; i < 8; i++) {
            for (let j = 3; j >= 0; j--) {
                const b = (hash[i] >> (j * 8)) & 255;
                result += (b < 16 ? '0' : '') + b.toString(16);
            }
        }
        return result;
    },

    hashPassword(str) {
        if (!str) return '';
        if (str.length === 64 && /^[0-9a-fA-F]{64}$/.test(str)) {
            return str.toLowerCase();
        }
        return this.sha256Sync(str);
    },

    init() {
        this._theme = localStorage.getItem(this.THEME_KEY) || 'light';
        document.documentElement.setAttribute('data-theme', this._theme);

        // Load users registry
        const savedRegistry = localStorage.getItem(this.REGISTRY_KEY);
        if (savedRegistry) {
            try {
                this._users = JSON.parse(savedRegistry);
            } catch (e) {
                console.warn('Failed to parse user registry.');
                this._users = {};
            }
        }

        // Initialize empty registry if no users exist
        if (!this._users) {
            this._users = {};
        }

        // Restore active user session if previously logged in
        const activeId = sessionStorage.getItem(this.ACTIVE_KEY) || localStorage.getItem(this.ACTIVE_KEY);
        if (activeId && this._users[activeId]) {
            this._activeStudentId = activeId;
        } else {
            // Fresh visitor - nobody is logged in yet!
            this._activeStudentId = null;
        }
    },

    // --- Authentication & User Lifecycle ---

    registerStudent(studentId, password, profileData) {
        const sid = (studentId || '').trim().toUpperCase();
        const pwd = (password || '').trim();
        if (!sid || !pwd) {
            return { success: false, message: 'Student ID and password are required.' };
        }

        if (this._users[sid]) {
            return { success: false, message: `Student ID "${sid}" is already registered. Please log in.` };
        }

        // Create new isolated student account with ZERO previous data
        const hashedPwd = this.hashPassword(pwd);
        const newStudent = {
            student_id: sid,
            password: hashedPwd,
            profile: {
                id: sid,
                name: (profileData.name || '').trim(),
                course: profileData.course || '',
                year: profileData.year || '',
                gender: profileData.gender || '',
                age_group: profileData.age_group || '',
                academic_performance: profileData.academic_performance || ''
            },
            consented: true,
            assessments: [], // ZERO DATA!
            habitLog: [],    // ZERO DATA!
            activeExperiment: null,
            completedExperiments: []
        };

        this._users[sid] = newStudent;
        this._persistRegistry();
        this._setActiveSession(sid);
        this.resetCurrentAssessment();

        // Asynchronous sync with SQLite server if running
        this._syncWithServer('POST', '/auth/register', {
            student_id: sid,
            password: hashedPwd,
            ...newStudent.profile
        });

        return { success: true, student: newStudent };
    },

    loginStudent(studentId, password) {
        const sid = (studentId || '').trim().toUpperCase();
        const pwd = (password || '').trim();
        const hashedPwd = this.hashPassword(pwd);

        if (this._users[sid] && (this._users[sid].password === hashedPwd || this._users[sid].password === pwd)) {
            this._users[sid].password = hashedPwd;
            this._persistRegistry();
            this._setActiveSession(sid);
            this.resetCurrentAssessment();
            this._refreshUserDataFromServer(sid);
            return { success: true, student: this._users[sid] };
        }

        // If not in local cache, attempt server authentication
        return this._remoteLogin(sid, hashedPwd);
    },

    async _refreshUserDataFromServer(sid) {
        try {
            const res = await fetch(`${this.API_URL}/student/data?student_id=${encodeURIComponent(sid)}`);
            if (res.ok) {
                const d = await res.json();
                if (d && this._users[sid]) {
                    if (d.assessments && d.assessments.length > 0) {
                        this._users[sid].assessments = d.assessments;
                    }
                    if (d.habit_logs && d.habit_logs.length > 0) {
                        this._users[sid].habitLog = d.habit_logs;
                    }
                    if (d.active_experiment) {
                        this._users[sid].activeExperiment = d.active_experiment;
                    }
                    this._persistRegistry();
                }
            }
        } catch (e) {
            // Server offline fallback
        }
    },

    async _remoteLogin(sid, pwd) {
        try {
            const res = await fetch(`${this.API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: sid, password: pwd })
            });
            if (res.ok) {
                const json = await res.json();
                const d = json.data;
                this._users[sid] = {
                    student_id: sid,
                    password: pwd,
                    profile: {
                        id: sid,
                        name: d.profile.name || '',
                        course: d.profile.course || '',
                        year: d.profile.year || '',
                        gender: d.profile.gender || '',
                        age_group: d.profile.age_group || '',
                        academic_performance: d.profile.academic_performance || d.profile.cgpa || '',
                        cgpa: d.profile.cgpa || d.profile.academic_performance || ''
                    },
                    consented: true,
                    assessments: d.assessments || [],
                    habitLog: d.habit_logs || [],
                    activeExperiment: d.active_experiment || null,
                    completedExperiments: []
                };
                this._persistRegistry();
                this._setActiveSession(sid);
                return { success: true, student: this._users[sid] };
            }
        } catch (e) {
            // Server offline
        }
        return { success: false, message: 'Invalid Student ID or password.' };
    },

    logoutStudent() {
        this._activeStudentId = null;
        sessionStorage.removeItem(this.ACTIVE_KEY);
        localStorage.removeItem(this.ACTIVE_KEY);
        this.resetCurrentAssessment();
    },

    isLoggedIn() {
        return !!this._activeStudentId && !!this._users[this._activeStudentId];
    },

    getActiveStudentId() {
        return this._activeStudentId;
    },

    _getUser() {
        if (!this._activeStudentId || !this._users[this._activeStudentId]) {
            return null;
        }
        return this._users[this._activeStudentId];
    },

    _setActiveSession(sid) {
        this._activeStudentId = sid;
        sessionStorage.setItem(this.ACTIVE_KEY, sid);
        localStorage.setItem(this.ACTIVE_KEY, sid);
    },

    _persistRegistry() {
        try {
            localStorage.setItem(this.REGISTRY_KEY, JSON.stringify(this._users));
        } catch (e) {
            console.warn('Could not persist users registry to localStorage.');
        }
    },

    // --- Profile & Demographics ---

    getProfile() {
        const u = this._getUser();
        if (!u) {
            return {
                id: '',
                name: '',
                course: '',
                year: '',
                gender: '',
                age_group: '',
                academic_performance: ''
            };
        }
        return { ...u.profile };
    },

    setProfile(data) {
        const u = this._getUser();
        if (u) {
            Object.assign(u.profile, data);
            u.consented = true;
            this._persistRegistry();
        }
    },

    isConsented() {
        const u = this._getUser();
        return u ? !!u.consented : false;
    },

    setConsented(val) {
        const u = this._getUser();
        if (u) {
            u.consented = !!val;
            this._persistRegistry();
        }
    },

    // --- PSS In-Progress Buffer ---

    getCurrentAssessment() {
        return { ...this._currentAssessment };
    },

    getAssessmentField(field) {
        return this._currentAssessment[field];
    },

    setAssessmentField(field, val) {
        if (field in this._currentAssessment) {
            this._currentAssessment[field] = val;
        }
    },

    resetCurrentAssessment() {
        for (const k in this._currentAssessment) {
            this._currentAssessment[k] = null;
        }
    },

    // --- Longitudinal Assessments ---

    getAssessments() {
        const u = this._getUser();
        return u ? [...(u.assessments || [])] : [];
    },

    getLatestAssessment() {
        const list = this.getAssessments();
        return list.length > 0 ? { ...list[list.length - 1] } : null;
    },

    hasCompletedAssessment() {
        return this.getAssessments().length > 0;
    },

    saveAssessment(result) {
        const u = this._getUser();
        if (!u) return null;

        const record = {
            id: 'assessment_' + Date.now(),
            date: new Date().toISOString(),
            profile: { ...u.profile },
            responses: { ...this._currentAssessment },
            ...result
        };

        if (!u.assessments) u.assessments = [];
        u.assessments.push(record);
        this.resetCurrentAssessment();
        this._persistRegistry();

        // Asynchronously sync with SQLite server
        this._syncWithServer('POST', '/assessments', {
            student_id: u.student_id,
            pss_score: record.pss_score,
            pss_level: record.pss_level,
            responses: record.responses,
            factors: record.factors,
            recommendations: record.recommendations
        });

        return record;
    },

    // --- 7-Day Structured Experiments ---

    getActiveExperiment() {
        const u = this._getUser();
        return (u && u.activeExperiment) ? { ...u.activeExperiment } : null;
    },

    getCompletedExperiments() {
        const u = this._getUser();
        return u ? [...(u.completedExperiments || [])] : [];
    },

    getLastCompletedExperiment() {
        const u = this._getUser();
        if (!u) return null;
        if (u.lastCompletedExperiment) return { ...u.lastCompletedExperiment };
        const completed = u.completedExperiments || [];
        return completed.length > 0 ? { ...completed[completed.length - 1] } : null;
    },

    startExperiment(expId) {
        const u = this._getUser();
        if (!u) return;

        const latest = this.getLatestAssessment();
        let baseline = 5.5;
        if (latest && latest.responses && latest.responses.sleep_hours) {
            const parsed = parseFloat(latest.responses.sleep_hours);
            if (!isNaN(parsed)) baseline = parsed;
        }

        u.activeExperiment = {
            experimentId: expId,
            startDate: new Date().toISOString(),
            baselineValue: baseline,
            days: []
        };
        u.lastCompletedExperiment = null;
        this._persistRegistry();

        // Sync with SQLite server
        this._syncWithServer('POST', '/experiments', {
            student_id: u.student_id,
            experiment_id: expId,
            baseline_value: baseline,
            days: [],
            status: 'active'
        });
    },

    logExperimentDay(data) {
        const u = this._getUser();
        if (!u || !u.activeExperiment) return;

        const currentDays = u.activeExperiment.days;
        const dayNumber = currentDays.length + 1;
        const rawVal = parseFloat(data.value ?? data.recordedValue);
        const safeVal = isNaN(rawVal) ? 0 : Math.max(0, rawVal);

        currentDays.push({
            day: dayNumber,
            date: new Date().toISOString(),
            value: safeVal,
            targetMet: safeVal > 0
        });

        let isComplete = false;
        let finishedExp = null;

        if (currentDays.length >= 7) {
            isComplete = true;
            const vals = currentDays.map(d => d.value);
            const avgDuring = parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1));
            const baseline = u.activeExperiment.baselineValue || 0;
            finishedExp = {
                ...u.activeExperiment,
                duringAverage: avgDuring,
                completionDate: new Date().toISOString(),
                delta: parseFloat((avgDuring - baseline).toFixed(1))
            };

            if (!u.completedExperiments) u.completedExperiments = [];
            u.completedExperiments.push(finishedExp);
            u.lastCompletedExperiment = finishedExp;
            u.activeExperiment = null;
        }

        this._persistRegistry();

        // Sync with SQLite server
        this._syncWithServer('POST', '/experiments', {
            student_id: u.student_id,
            experiment_id: isComplete ? finishedExp.experimentId : u.activeExperiment.experimentId,
            baseline_value: isComplete ? finishedExp.baselineValue : u.activeExperiment.baselineValue,
            days: isComplete ? finishedExp.days : u.activeExperiment.days,
            status: isComplete ? 'completed' : 'active',
            completed_at: isComplete ? finishedExp.completionDate : null
        });
    },

    // --- Daily Habit Log ---

    getHabitLog() {
        const u = this._getUser();
        return u ? [...(u.habitLog || [])] : [];
    },

    logHabit(entry) {
        const u = this._getUser();
        if (!u) return null;

        const todayStr = new Date().toISOString().split('T')[0];
        if (!u.habitLog) u.habitLog = [];
        const existingIdx = u.habitLog.findIndex(e => e.date === todayStr);

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
            u.habitLog[existingIdx] = record;
        } else {
            u.habitLog.push(record);
        }

        this._persistRegistry();

        // Sync with SQLite server
        this._syncWithServer('POST', '/habits', {
            student_id: u.student_id,
            date: record.date,
            sleep_hours: record.sleep_hours,
            screen_hours: record.screen_hours,
            study_hours: record.study_hours,
            exercise_minutes: record.exercise_minutes
        });

        return record;
    },

    // --- Before vs After Longitudinal Trends ---

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

    // --- Theme & Admin ---

    getTheme() { return this._theme; },
    toggleTheme() {
        this._theme = this._theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this._theme);
        localStorage.setItem(this.THEME_KEY, this._theme);
        return this._theme;
    },

    isAdminAuthenticated() {
        return sessionStorage.getItem('ph_admin_token') === 'verified' || !!this._adminMode;
    },

    setAdminAuthenticated(val) {
        if (val) {
            sessionStorage.setItem('ph_admin_token', 'verified');
            this._adminMode = true;
        } else {
            sessionStorage.removeItem('ph_admin_token');
            this._adminMode = false;
        }
    },

    // --- SQLite Background Sync Helper ---

    async _syncWithServer(method, endpoint, body) {
        try {
            await fetch(`${this.API_URL}${endpoint}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch (e) {
            // Silently fall back to client-side partitioned storage
        }
    },

    clearAll() {
        localStorage.removeItem(this.REGISTRY_KEY);
        localStorage.removeItem(this.ACTIVE_KEY);
        sessionStorage.removeItem(this.ACTIVE_KEY);
        location.reload();
    }
};
