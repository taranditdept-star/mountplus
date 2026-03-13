# Refactor Colors for Nimo Clone
$targetColor = "#000f05"
$surfaceGreen = "#012812"
$borderGreen = "#054d24"
$gradientEnd = "#022e15"
$baseDir = "$PWD"

# File patterns to process
$files = Get-ChildItem -Path $baseDir -Include *.html, *.css -Recurse

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..." -ForegroundColor Cyan
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # 1. Global Replacements
    
    # Base Backgrounds (Blacks) -> #000f05
    $content = $content -replace "#000000", $targetColor
    $content = $content -replace "#000(?![0-9a-fA-F])", $targetColor
    $content = $content -replace "#0a0a0a", $targetColor
    $content = $content -replace ":\s*black", ": $targetColor"

    # Surface Backgrounds (Dark Grays) -> #012812
    $content = $content -replace "#111111", $surfaceGreen
    $content = $content -replace "#111(?![0-9a-fA-F])", $surfaceGreen
    $content = $content -replace "#1a1a1a", $surfaceGreen
    $content = $content -replace "#1d1d1d", $surfaceGreen
    $content = $content -replace "#222222", $surfaceGreen
    $content = $content -replace "#222(?![0-9a-fA-F])", $surfaceGreen
    $content = $content -replace "#2b2b2b", $surfaceGreen
    # Found during debug:
    $content = $content -replace "#171619", $surfaceGreen
    $content = $content -replace "#282828", $surfaceGreen
    $content = $content -replace "#1c1c1c", $surfaceGreen
    $content = $content -replace "#252525", $surfaceGreen
    
    # Border Colors (Mid Grays) -> #054d24
    $content = $content -replace "#333333", $borderGreen
    $content = $content -replace "#333(?![0-9a-fA-F])", $borderGreen
    $content = $content -replace "#343434", $borderGreen
    $content = $content -replace "#444444", $borderGreen
    $content = $content -replace "#444(?![0-9a-fA-F])", $borderGreen
    $content = $content -replace "#2e2e2e", $borderGreen

    # 3. RGB/RGBA Replacements (Specific patterns found in CSS)
    # Mapping dark RGBs to Base Green
    $content = $content -replace "rgb\(6, 6, 6\)", $targetColor
    $content = $content -replace "rgb\(10, 10, 10\)", $targetColor
    
    # Mapping surface RGBs to Surface Green
    $content = $content -replace "rgb\(14, 14, 14\)", $surfaceGreen
    $content = $content -replace "rgb\(20, 20, 20\)", $surfaceGreen
    
    # Mapping lighter gradient stops to Gradient End / Surface
    $content = $content -replace "rgb\(46, 46, 46\)", $gradientEnd
    $content = $content -replace "rgb\(67, 67, 67\)", $gradientEnd
    $content = $content -replace "rgb\(45, 45, 45\)", $surfaceGreen

    # 4. Gradient Logic
    $content = $content -replace "#022b12", $gradientEnd
    
    $content | Set-Content -Path $file.FullName -Encoding UTF8
}

Write-Host "Surface and Tint Shift complete." -ForegroundColor Green
