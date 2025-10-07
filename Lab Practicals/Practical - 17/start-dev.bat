@echo off
echo ================================================
echo   TUITION CLASS ADMIN PANEL - DEVELOPMENT
echo ================================================
echo.
echo Starting both Backend and Frontend servers...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo ================================================
echo.

REM Start backend server in a new command prompt
start "Backend Server - Port 5000" cmd /k "cd /d server && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend server in a new command prompt  
start "Frontend Server - Port 5173" cmd /k "cd /d client\practical17 && npm run dev"

echo.
echo Both servers are starting...
echo Check the new command prompt windows for server status
echo.
pause