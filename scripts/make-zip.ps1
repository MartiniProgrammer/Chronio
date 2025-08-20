# scripts/make-zip.ps1
# Creates a clean source ZIP for Chronio and puts it in download/files/
# Run from project root (where package.json lives)

$ErrorActionPreference = "Stop"

# --- settings ---
$ver = (Get-Date).ToString('yyyyMMdd-HHmm')   # e.g. 20250820-1412
$destDir = "download/files"
$zipName = "chronio_starter_$ver.zip"
$zipPath = Join-Path $destDir $zipName

# include the /download site? (usually false)
$includeDownload = $false

# ensure destination exists
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

# build the include list based on your repo
$include = @(
  "index.html",
  "public",
  "src",
  "package.json",
  "package-lock.json",
  "vite.config.js",
  "tailwind.config.js",
  "postcss.config.js"
)

# optional files if present
$optional = @("CNAME","README.md","README.txt","tsconfig.json","jsconfig.json",
              "eslint.config.js",".eslintrc",".eslintrc.json",".prettierrc",".prettierrc.json")

foreach ($f in $optional) {
  if (Test-Path $f) { $include += $f }
}

if ($includeDownload -and (Test-Path "download")) {
  $include += "download"
}

# sanity checks
foreach ($p in $include) {
  if (-not (Test-Path $p)) { Write-Host "⚠️  Skipping missing: $p" }
}

# create zip (only from explicit list; node_modules/dist are not included)
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path $include -DestinationPath $zipPath -Force

Write-Host "✅ ZIP created: $zipPath"
Write-Host "   You can now link to: ./files/$zipName"
