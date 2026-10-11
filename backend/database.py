"""
PsychHealth — SQLite Database Layer
Handles student accounts, PSS-10 assessments, daily habit logs, and 7-day experiments.
Strictly isolates student data by student_id / user_id.
"""

import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "psychhealth.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Students Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            course TEXT,
            year TEXT,
            gender TEXT,
            age_group TEXT,
            cgpa TEXT,
            created_at TEXT NOT NULL
        )
    """)

    # 2. Assessments Table (Longitudinal PSS-10 + Covariates)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            pss_score INTEGER NOT NULL,
            pss_level TEXT NOT NULL,
            responses_json TEXT NOT NULL,
            factors_json TEXT,
            recommendations_json TEXT,
            date TEXT NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students(student_id)
        )
    """)

    # 3. Daily Habit Logs Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS habit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            date TEXT NOT NULL,
            sleep_hours REAL NOT NULL,
            screen_hours REAL NOT NULL,
            study_hours REAL NOT NULL,
            exercise_minutes REAL NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students(student_id)
        )
    """)

    # 4. 7-Day Structured Experiments Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS experiments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            experiment_id TEXT NOT NULL,
            baseline_value TEXT,
            days_json TEXT NOT NULL,
            status TEXT NOT NULL,
            start_date TEXT NOT NULL,
            completed_at TEXT,
            FOREIGN KEY (student_id) REFERENCES students(student_id)
        )
    """)

    conn.commit()

    # Pre-seed sample returning student STU-101 for quick verification
    cursor.execute("SELECT id FROM students WHERE student_id = 'STU-101'")
    if not cursor.fetchone():
        cursor.execute("""
            INSERT INTO students (student_id, password, name, course, year, gender, age_group, cgpa, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            'STU-101', 'pass123', 'Demo Student', 'B.Sc. Computer Science', 'Third Year',
            'Male', '21–23', '7.0–7.9', datetime.now().isoformat()
        ))
        
        # Seed 1 baseline assessment for the demo student
        cursor.execute("""
            INSERT INTO assessments (student_id, pss_score, pss_level, responses_json, factors_json, recommendations_json, date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            'STU-101', 19, 'Moderate',
            json.dumps({'sleep_hours': '6–7 hours', 'screen_time': '4–6 hours', 'academic_pressure': 'Moderate'}),
            json.dumps([{'title': 'Moderate Screen Overload', 'impact': 'Moderate'}]),
            json.dumps([{'title': 'Restorative Sleep Protocol', 'summary': 'Consistent bedtime schedule.'}]),
            datetime.now().isoformat()
        ))
        conn.commit()

    conn.close()

# --- Database Operations ---

def register_student(student_id, password, name, course="", year="", gender="", age_group="", cgpa=""):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO students (student_id, password, name, course, year, gender, age_group, cgpa, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (student_id, password, name, course, year, gender, age_group, cgpa, datetime.now().isoformat()))
        conn.commit()
        return True, "Registration successful"
    except sqlite3.IntegrityError:
        return False, "Student ID already exists"
    finally:
        conn.close()

def authenticate_student(student_id, password):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students WHERE student_id = ? AND password = ?", (student_id, password))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

def get_student_data(student_id):
    conn = get_connection()
    cursor = conn.cursor()

    # Profile
    cursor.execute("SELECT * FROM students WHERE student_id = ?", (student_id,))
    student = cursor.fetchone()
    if not student:
        conn.close()
        return None

    profile = dict(student)
    del profile['password']
    profile['academic_performance'] = profile.get('cgpa') or ''

    # Assessments
    cursor.execute("SELECT * FROM assessments WHERE student_id = ? ORDER BY date ASC", (student_id,))
    assessments = []
    for r in cursor.fetchall():
        item = dict(r)
        item['profile'] = dict(profile)
        item['responses'] = json.loads(item['responses_json']) if item['responses_json'] else {}
        item['factors'] = json.loads(item['factors_json']) if item['factors_json'] else []
        item['recommendations'] = json.loads(item['recommendations_json']) if item['recommendations_json'] else []
        assessments.append(item)

    # Habit Logs
    cursor.execute("SELECT * FROM habit_logs WHERE student_id = ? ORDER BY date ASC", (student_id,))
    habit_logs = [dict(r) for r in cursor.fetchall()]

    # Active Experiment
    cursor.execute("SELECT * FROM experiments WHERE student_id = ? AND status = 'active' ORDER BY id DESC LIMIT 1", (student_id,))
    exp_row = cursor.fetchone()
    active_exp = None
    if exp_row:
        active_exp = dict(exp_row)
        active_exp['days'] = json.loads(active_exp['days_json']) if active_exp['days_json'] else []

    conn.close()
    return {
        "profile": profile,
        "assessments": assessments,
        "habit_logs": habit_logs,
        "active_experiment": active_exp
    }

def add_assessment(student_id, pss_score, pss_level, responses, factors=None, recommendations=None):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO assessments (student_id, pss_score, pss_level, responses_json, factors_json, recommendations_json, date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        student_id, pss_score, pss_level,
        json.dumps(responses or {}),
        json.dumps(factors or []),
        json.dumps(recommendations or []),
        now
    ))
    conn.commit()
    conn.close()
    return True

def add_habit_log(student_id, date, sleep_hours, screen_hours, study_hours, exercise_minutes):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO habit_logs (student_id, date, sleep_hours, screen_hours, study_hours, exercise_minutes, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (student_id, date, sleep_hours, screen_hours, study_hours, exercise_minutes, now))
    conn.commit()
    conn.close()
    return True

def save_experiment(student_id, experiment_id, baseline_value, days, status="active", completed_at=None):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.now().isoformat()
    # Check if there is an existing active experiment for this student
    cursor.execute("SELECT id FROM experiments WHERE student_id = ? AND status = 'active'", (student_id,))
    row = cursor.fetchone()
    if row:
        cursor.execute("""
            UPDATE experiments 
            SET experiment_id = ?, baseline_value = ?, days_json = ?, status = ?, completed_at = ?
            WHERE id = ?
        """, (str(experiment_id), str(baseline_value), json.dumps(days or []), status, completed_at, row['id']))
    else:
        cursor.execute("""
            INSERT INTO experiments (student_id, experiment_id, baseline_value, days_json, status, start_date, completed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (student_id, str(experiment_id), str(baseline_value), json.dumps(days or []), status, now, completed_at))
    conn.commit()
    conn.close()
    return True

if __name__ == '__main__':
    init_db()
    print(f"PsychHealth SQLite Database initialized at: {DB_PATH}")
