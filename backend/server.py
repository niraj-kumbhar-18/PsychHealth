"""
PsychHealth — REST API Server with SQLite Backend
Lightweight, zero-external-dependency HTTP Server compatible with Python 3.8+.
Provides CORS headers and JSON endpoints for Student Login, Assessment, Habits, and Experiments.
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import sys

# Ensure backend directory is in path
sys.path.insert(0, os.path.dirname(__file__))
import database

PORT = 8000
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))

class PsychHealthHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self._send_cors_headers()
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def _read_json_body(self):
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            return {}
        raw = self.rfile.read(content_length).decode('utf-8')
        try:
            return json.loads(raw)
        except Exception:
            return {}

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == '/api/health':
            self._send_json(200, {"status": "ok", "service": "PsychHealth API", "database": "SQLite"})
            return

        elif path == '/api/student/data':
            student_id = query.get('student_id', [None])[0]
            if not student_id:
                self._send_json(400, {"error": "Missing student_id parameter"})
                return
            data = database.get_student_data(student_id)
            if data is None:
                self._send_json(404, {"error": "Student not found"})
                return
            self._send_json(200, data)
            return

        # Fallback to serving frontend static files
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self._read_json_body()

        if path == '/api/auth/register':
            student_id = body.get('student_id', '').strip()
            password = body.get('password', '').strip()
            name = body.get('name', '').strip()
            if not student_id or not password or not name:
                self._send_json(400, {"error": "student_id, password, and name are required"})
                return

            ok, msg = database.register_student(
                student_id=student_id,
                password=password,
                name=name,
                course=body.get('course', ''),
                year=body.get('year', ''),
                gender=body.get('gender', ''),
                age_group=body.get('age_group', ''),
                cgpa=body.get('cgpa', '')
            )
            if not ok:
                self._send_json(409, {"error": msg})
                return

            student_data = database.get_student_data(student_id)
            self._send_json(201, {"message": msg, "data": student_data})
            return

        elif path == '/api/auth/login':
            student_id = body.get('student_id', '').strip()
            password = body.get('password', '').strip()
            user = database.authenticate_student(student_id, password)
            if not user:
                self._send_json(401, {"error": "Invalid student ID or password"})
                return

            student_data = database.get_student_data(student_id)
            self._send_json(200, {"message": "Login successful", "data": student_data})
            return

        elif path == '/api/assessments':
            student_id = body.get('student_id')
            pss_score = body.get('pss_score')
            pss_level = body.get('pss_level')
            responses = body.get('responses', {})
            factors = body.get('factors', [])
            recs = body.get('recommendations', [])

            if not student_id or pss_score is None:
                self._send_json(400, {"error": "student_id and pss_score are required"})
                return

            database.add_assessment(student_id, pss_score, pss_level, responses, factors, recs)
            updated = database.get_student_data(student_id)
            self._send_json(201, {"message": "Assessment recorded", "data": updated})
            return

        elif path == '/api/habits':
            student_id = body.get('student_id')
            date = body.get('date')
            sleep_hours = body.get('sleep_hours', 0.0)
            screen_hours = body.get('screen_hours', 0.0)
            study_hours = body.get('study_hours', 0.0)
            exercise_minutes = body.get('exercise_minutes', 0.0)

            if not student_id or not date:
                self._send_json(400, {"error": "student_id and date are required"})
                return

            database.add_habit_log(student_id, date, sleep_hours, screen_hours, study_hours, exercise_minutes)
            updated = database.get_student_data(student_id)
            self._send_json(201, {"message": "Habit log saved", "data": updated})
            return

        else:
            self._send_json(404, {"error": "Endpoint not found"})

def run_server():
    database.init_db()
    with socketserver.TCPServer(("", PORT), PsychHealthHandler) as httpd:
        print(f"============================================================")
        print(f" PsychHealth Server running at: http://localhost:{PORT}")
        print(f" SQLite Database: {database.DB_PATH}")
        print(f" Frontend Root:   {FRONTEND_DIR}")
        print(f"============================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == '__main__':
    run_server()
