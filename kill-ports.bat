@echo off
echo Killing processes on ports 3000, 3001, 3002, 5000, 5001, 5002...
netstat -ano | findstr :3000 | findstr LISTENING > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /PID %%a /F 2>nul
netstat -ano | findstr :3001 | findstr LISTENING > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /PID %%a /F 2>nul
netstat -ano | findstr :3002 | findstr LISTENING > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /PID %%a /F 2>nul
netstat -ano | findstr :5000 | findstr LISTENING > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /PID %%a /F 2>nul
netstat -ano | findstr :5001 | findstr LISTENING > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /PID %%a /F 2>nul
netstat -ano | findstr :5002 | findstr LISTENING > temp.txt
for /f "tokens=5" %%a in (temp.txt) do taskkill /PID %%a /F 2>nul
del temp.txt 2>nul
echo Done! All ports cleared.
pause