# Script pour retirer les boutons de langue FR/EN de tous les fichiers HTML

$files = @(
    "pricing.html",
    "faq.html",
    "register.html",
    "client-space.html",
    "services\identite.html",
    "services\photo.html",
    "services\design.html",
    "services\impression.html",
    "legal\mentions-legales.html",
    "legal\cgv.html",
    "legal\confidentialite.html",
    "legal\cookies.html"
)

$rootPath = "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

foreach ($file in $files) {
    $filePath = Join-Path $rootPath $file
    
    if (Test-Path $filePath) {
        Write-Host "Processing: $file"
        
        # Lire le contenu
        $content = Get-Content $filePath -Raw
        
        # Pattern pour trouver et retirer le div language-selector
        $pattern = '(?s)\s*<div class="language-selector">.*?</div>\s*'
        
        # Remplacer
        $newContent = $content -replace $pattern, "`r`n"
        
        # Sauvegarder
        Set-Content -Path $filePath -Value $newContent -NoNewline
        
        Write-Host "  ✓ Boutons de langue retirés" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Fichier non trouvé: $filePath" -ForegroundColor Red
    }
}

Write-Host "`nTerminé! Tous les boutons de langue ont été retirés." -ForegroundColor Cyan
