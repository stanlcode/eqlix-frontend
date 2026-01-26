$baseDir = "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
$htmlFiles = Get-ChildItem -Path $baseDir -Filter *.html -Recurse

$replacements = @{
    "Ã©" = "é"
    "Ã " = "à"
    "Ã€" = "À"
    "Ã‰" = "É"
    "Ãˆ" = "È"
    "Ã§" = "ç"
    "Ãª" = "ê"
    "Ã«" = "ë"
    "Ã®" = "î"
    "Ã¯" = "ï"
    "Ã´" = "ô"
    "Ã»" = "û"
    "Ã¹" = "ù"
}

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)..."
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false
    
    foreach ($key in $replacements.Keys) {
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $replacements[$key])
            $modified = $true
        }
    }
    
    if ($modified) {
        Write-Host "  Updated $($file.Name)"
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    }
}
