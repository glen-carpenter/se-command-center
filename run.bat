@echo off
echo Starting SE Command Center...
start "SE Command Center - Server" cmd /k "cd /d %~dp0server && npm run dev"
start "SE Command Center - Client" cmd /k "cd /d %~dp0client && npm run dev"
echo.
echo Server starting on http://localhost:3001
echo Client starting on http://localhost:5173
echo.
timeout /t 3 /nobreak >nul
start http://localhost:5173
