# Script pour retirer les boutons de langue FR/EN
# EQLIX MEDIA CREATION

$files = @(
    "services\photo.html",
    "services\design.html",
    "services\impression.html",
    "legal\mentions-legales.html",
    "legal\cgv.html",
    "legal\confidentialite.html",
    "legal\cookies.html"
)

$workingDir = "c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

Write-Host "=== Retrait des boutons de langue FR/EN ===" -ForegroundColor Cyan
Write-Host ""

foreach ($file in $files) {
    $fullPath = Join-Path $workingDir $file
    
    if (Test-Path $fullPath) {
        Write-Host "Traitement de: $file" -ForegroundColor Yellow
        
        try {
            # Lire toutes les lignes
            $lines = Get-Content -Path $fullPath -Encoding UTF8
            
            # Trouver et retirer le bloc language-selector
            $newLines = @()
            $skipLines = 0
            
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($skipLines -gt 0) {
                    $skipLines--
                    continue
                }
                
                # Détecter le début du bloc language-selector
                if ($lines[$i] -match 'class="language-selector"') {
                    # Sauter cette ligne et les 3 suivantes (boutons FR, EN, et </div>)
                    $skipLines = 3
                    Write-Host "  - Bloc trouvé à la ligne $($i + 1)" -ForegroundColor Gray
                    continue
                }
                
                $newLines += $lines[$i]
            }
            
            # Sauvegarder le fichier
            $newLines | Set-Content -Path $fullPath -Encoding UTF8
            
            Write-Host "  ✓ Boutons retirés avec succès" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Erreur: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "  ✗ Fichier non trouvé: $fullPath" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "=== Traitement terminé ===" -ForegroundColor Cyan
Write-Host "Vérification des résultats..." -ForegroundColor Cyan

# Vérifier qu'il ne reste plus de language-selector
$remaining = Select-String -Path "$workingDir\services\*.html", "$workingDir\legal\*.html" -Pattern "language-selector" -ErrorAction SilentlyContinue

if ($remaining) {
    Write-Host ""
    Write-Host "⚠ Fichiers contenant encore 'language-selector':" -ForegroundColor Yellow
    $remaining | ForEach-Object { Write-Host "  - $($_.Path):$($_.LineNumber)" -ForegroundColor Yellow }
}
else {
    Write-Host ""
    Write-Host "✓ Tous les boutons de langue ont été retirés avec succès!" -ForegroundColor Green
}
