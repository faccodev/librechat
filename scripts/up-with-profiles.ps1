# scripts/up-with-profiles.ps1
# ------------------------------------------------------------------
# Convenience wrapper around `docker compose up` that activates the
# OmniRoute / Rclone profiles based on the ENABLE_* flags in .env.
#
# Usage:
#   pwsh ./scripts/up-with-profiles.ps1              # up -d, reads ENABLE_* from .env
#   pwsh ./scripts/up-with-profiles.ps1 -Foreground  # up (attached, Ctrl-C to stop)
#   pwsh ./scripts/up-with-profiles.ps1 -NoBuild     # skip building api image
#
# Equivalent manual invocation (what this script generates):
#   COMPOSE_PROFILES=omniroute,rclone docker compose up -d
# ------------------------------------------------------------------
[CmdletBinding()]
param(
    [switch]$Foreground,   # `up` (attached) instead of `up -d`
    [switch]$NoBuild       # skip --build (faster on subsequent runs)
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $ScriptDir "..")
Set-Location $RepoRoot

if (-not (Test-Path ".env")) {
    Write-Host ".env not found in $RepoRoot" -ForegroundColor Red
    Write-Host "Copy .env.example to .env first." -ForegroundColor Yellow
    exit 1
}

# Parse .env without dotnet/extra deps — grep-style line filter.
$envLines = Get-Content .env | Where-Object {
    $_ -notmatch '^\s*#' -and $_ -match '='
}

function Get-EnvFlag($name) {
    $line = $envLines | Where-Object { $_ -match "^$([regex]::Escape($name))=" } | Select-Object -First 1
    if ($null -eq $line) { return $false }
    $value = ($line -split '=', 2)[1].Trim().ToLower()
    return ($value -eq 'true' -or $value -eq '1' -or $value -eq 'yes')
}

$profiles = @()
if (Get-EnvFlag "ENABLE_OMNIROUTE") { $profiles += "omniroute" }
if (Get-EnvFlag "ENABLE_RCLONE")    { $profiles += "rclone" }

$composeArgs = @("compose")
if ($profiles.Count -gt 0) {
    $composeArgs += "--profile"
    $composeArgs += ($profiles -join ",")
    Write-Host "Activating profiles: $($profiles -join ', ')" -ForegroundColor Cyan
} else {
    Write-Host "No optional profiles enabled (ENABLE_OMNIROUTE / ENABLE_RCLONE both false)." -ForegroundColor DarkGray
}

$composeArgs += "up"
if (-not $Foreground) { $composeArgs += "-d" }
if (-not $NoBuild)    { $composeArgs += "--build" }

Write-Host "Running: docker $($composeArgs -join ' ')" -ForegroundColor Green
& docker @composeArgs
exit $LASTEXITCODE