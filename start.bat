@echo off
echo ========================================================
echo   Starting CanvasCraft MERN Art Gallery Application
echo ========================================================
echo.

start "CanvasCraft Backend Server" cmd /k "cd backend && node server.js"
start "CanvasCraft Frontend Vite" cmd /k "cd frontend && npm run dev"

echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:5173
echo.
pause
