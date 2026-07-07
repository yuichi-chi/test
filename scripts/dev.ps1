$projectRoot = Split-Path -Parent $PSScriptRoot
$drive = "P:"

if (Test-Path (Join-Path $projectRoot ".next")) {
  Remove-Item (Join-Path $projectRoot ".next") -Recurse -Force
}

subst $drive /d 2>$null | Out-Null
subst $drive $projectRoot 2>$null | Out-Null
Set-Location "$drive\"

try {
  node node_modules/next/dist/bin/next dev --webpack -p 3000 @args
} finally {
  Set-Location $projectRoot
  subst $drive /d 2>$null | Out-Null
}
