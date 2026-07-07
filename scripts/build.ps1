$projectRoot = Split-Path -Parent $PSScriptRoot
$drive = "P:"

subst $drive $projectRoot 2>$null | Out-Null
Set-Location "$drive\"

try {
  node node_modules/next/dist/bin/next build --webpack @args
  exit $LASTEXITCODE
} finally {
  Set-Location $projectRoot
  subst $drive /d 2>$null | Out-Null
}
