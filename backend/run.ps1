# Factory Shift Management System - Startup Script
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Factory Shift Management System      " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if PostgreSQL is running
Write-Host "`nChecking PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql-x64-*" -ErrorAction SilentlyContinue

if (-not $pgService) {
    Write-Host "❌ PostgreSQL service not found!" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

if ($pgService.Status -ne "Running") {
    Write-Host "Starting PostgreSQL service..." -ForegroundColor Yellow
    Start-Service -Name $pgService.Name
    Start-Sleep -Seconds 3
}

Write-Host "✅ PostgreSQL is running" -ForegroundColor Green

# Check Python dependencies
Write-Host "`nChecking Python dependencies..." -ForegroundColor Yellow

# Install requirements
try {
    pip install -r requirements.txt
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not install dependencies" -ForegroundColor Yellow
}

# Create database if not exists
Write-Host "`nSetting up database..." -ForegroundColor Yellow
try {
    # First check if psql is available
    $psqlPath = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
    if (Test-Path $psqlPath) {
        # Set password for this session
        $env:PGPASSWORD = "admin123"
        
        # Check if database exists
        $output = & $psqlPath -U postgres -h localhost -c "SELECT 1 FROM pg_database WHERE datname='factory_shift_db'" 2>$null
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Creating database 'factory_shift_db'..." -ForegroundColor Yellow
            & $psqlPath -U postgres -h localhost -c "CREATE DATABASE factory_shift_db;" 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Database created" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Could not create database" -ForegroundColor Yellow
            }
        } else {
            Write-Host "✅ Database already exists" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  psql not found at $psqlPath" -ForegroundColor Yellow
        Write-Host "Please create database manually:" -ForegroundColor Yellow
        Write-Host "1. Open pgAdmin" -ForegroundColor Yellow
        Write-Host "2. Right-click Databases -> Create -> Database" -ForegroundColor Yellow
        Write-Host "3. Name: factory_shift_db" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Database setup skipped: $_" -ForegroundColor Yellow
}

# Check if backend is already running
Write-Host "`nChecking if backend is running..." -ForegroundColor Yellow
$backendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 2 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $backendRunning = $true
    }
} catch {
    $backendRunning = $false
}

if ($backendRunning) {
    Write-Host "✅ Backend is already running" -ForegroundColor Green
} else {
    Write-Host "Starting Backend API..." -ForegroundColor Yellow
    
    # Start backend in new window
    $backendScript = @'
        cd "$PSScriptRoot"
        Write-Host "Starting Backend on http://localhost:8000" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
        python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
'@
    
    $backendScript | Out-File -FilePath "start_backend.ps1" -Encoding UTF8
    
    Start-Process powershell -ArgumentList "-NoExit", "-File", "start_backend.ps1" -WindowStyle Normal
    
    Start-Sleep -Seconds 5
    Write-Host "✅ Backend started" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "           SYSTEM IS READY!              " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "`n🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor Cyan

Write-Host "`n🔑 Default Logins:" -ForegroundColor Yellow
Write-Host "   Admin:          admin / admin123" -ForegroundColor White
Write-Host "   Employee:       john.doe / password123" -ForegroundColor White
Write-Host "   Division Manager: division.manager / password123" -ForegroundColor White
Write-Host "   Department Manager: dept.manager / password123" -ForegroundColor White

Write-Host "`n📊 Database: PostgreSQL (factory_shift_db)" -ForegroundColor Magenta
Write-Host "💾 Connection: postgresql://postgres:admin123@localhost:5432/factory_shift_db" -ForegroundColor Magenta

Write-Host "`nPress Ctrl+C in backend window to stop" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Green

# Wait for user input
Write-Host "`nPress Enter to exit this window (backend will continue running)..." -ForegroundColor Gray
Read-Host