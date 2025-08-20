# scripts/deploy-gh-pages.ps1
# # notes: copy Vite dist to repo root for GitHub Pages

$ErrorActionPreference = "Stop"
$dist = "dist"

if (-not (Test-Path $dist)) {
  Write-Error "dist/ not found. Run 'npm run build' first."
}

# 404 fallback voor SPA-routes
Copy-Item "$dist\index.html" "404.html" -Force

# .nojekyll voorkomt rare GH Pages verwerking
New-Item -ItemType File -Force -Path ".nojekyll" | Out-Null

# Copy alle build files naar root (laat /download/ met rust)
Copy-Item "$dist\*" "." -Recurse -Force

Write-Host "✅ Build copied to repo root. Commit & push these changes."
