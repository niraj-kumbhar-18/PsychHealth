import sqlite3

conn = sqlite3.connect('backend/psychhealth.db')
c = conn.cursor()
tables = [t[0] for t in c.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
print("TABLES:", tables)
for t in tables:
    if t == 'sqlite_sequence': continue
    cols = [col[1] for col in c.execute(f"PRAGMA table_info({t})").fetchall()]
    count = c.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
    print(f"Table: {t}")
    print(f"  Columns: {cols}")
    print(f"  Row Count: {count}")
conn.close()
