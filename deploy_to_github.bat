@echo off
echo ==========================================
echo   BPsynergies Website Deployment Script
echo   Deploys to GitHub Pages
echo ==========================================
echo.
echo Make sure you have created a repository on GitHub first!
echo.
set /p repo_url="Enter your GitHub Repository URL (e.g., https://github.com/username/repo.git): "

if "%repo_url%"=="" goto error

echo.
echo Initializing Git repository...
git init
git add .
git commit -m "Deploying BPsynergies Landing Page"
git branch -M main
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================
echo   Deployment Complete!
echo   Go to your repository Settings -> Pages to activate.
echo ==========================================
pause
exit

:error
echo Error: Repository URL is required.
pause
