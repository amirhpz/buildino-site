[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$releaseBase = Join-Path $projectRoot 'release'
$releaseRoot = Join-Path $releaseBase 'parspack'
$appRoot = Join-Path $releaseRoot 'buildino'
$publicRoot = Join-Path $releaseRoot 'public_html'
$zipPath = Join-Path $releaseBase 'buildino-parspack.zip'

if (-not $releaseRoot.StartsWith($releaseBase, [StringComparison]::OrdinalIgnoreCase)) {
    throw 'Release directory escaped the project release folder.'
}

Push-Location $projectRoot
try {
    npm.cmd ci
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed.' }

    npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Frontend build failed.' }

    if (Test-Path -LiteralPath $releaseRoot) {
        Remove-Item -LiteralPath $releaseRoot -Recurse -Force
    }
    if (Test-Path -LiteralPath $zipPath) {
        Remove-Item -LiteralPath $zipPath -Force
    }

    New-Item -ItemType Directory -Force -Path $appRoot, $publicRoot | Out-Null
    Copy-Item -LiteralPath (Join-Path $projectRoot 'DEPLOY.md') -Destination (Join-Path $releaseRoot 'README-DEPLOY.md') -Force

    $appDirectories = @('app', 'bootstrap', 'config', 'database', 'resources', 'routes', 'storage')
    foreach ($directory in $appDirectories) {
        Copy-Item -LiteralPath (Join-Path $projectRoot $directory) -Destination $appRoot -Recurse -Force
    }

    $appFiles = @('artisan', 'composer.json', 'composer.lock')
    foreach ($file in $appFiles) {
        Copy-Item -LiteralPath (Join-Path $projectRoot $file) -Destination $appRoot -Force
    }

    Copy-Item -LiteralPath (Join-Path $projectRoot 'public') -Destination $appRoot -Recurse -Force
    Copy-Item -Path (Join-Path $projectRoot 'public\*') -Destination $publicRoot -Recurse -Force
    Copy-Item -LiteralPath (Join-Path $projectRoot 'public\.htaccess') -Destination $publicRoot -Force
    Copy-Item -LiteralPath (Join-Path $projectRoot '.env.example') -Destination (Join-Path $appRoot '.env.example') -Force
    Copy-Item -LiteralPath (Join-Path $projectRoot 'deploy\parspack\public-index.php') -Destination (Join-Path $publicRoot 'index.php') -Force

    composer install --working-dir=$appRoot --no-dev --optimize-autoloader --classmap-authoritative --no-interaction --prefer-dist
    if ($LASTEXITCODE -ne 0) { throw 'Production Composer install failed.' }

    New-Item -ItemType Directory -Force -Path $releaseBase | Out-Null
    tar.exe -a -c -f $zipPath -C $releaseRoot .
    if ($LASTEXITCODE -ne 0) { throw 'Could not create deployment ZIP.' }

    Write-Host "ParsPack package created: $zipPath"
}
finally {
    Pop-Location
}
