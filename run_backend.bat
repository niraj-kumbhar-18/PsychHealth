@echo off
echo Starting PsychHealth SQLite Server...
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python backend\server.py
    pause
    exit /b
)

if exist "%LOCALAPPDATA%\Programs\Python\Python3*\python.exe" (
    for /d %%i in ("%LOCALAPPDATA%\Programs\Python\Python3*") do (
        "%%i\python.exe" backend\server.py
        pause
        exit /b
    )
)

if exist "%USERPROFILE%\anaconda3\python.exe" (
    "%USERPROFILE%\anaconda3\python.exe" backend\server.py
    pause
    exit /b
)

echo Python was not found in PATH or standard folders. Please install Python or add it to PATH.
pause
