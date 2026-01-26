import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\photo.html"

# Mappings based on the mojibake observed
replacements = {
    "ðŸ“·": "📸",  # Camera
    "âœ¨": "✨",    # Sparkles
    "ðŸŽ¯": "🎯",  # Target
    "Ã ": "à"      # Fix "style Ã  vos besoins" seen in line 229
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

for bad, good in replacements.items():
    content = content.replace(bad, good)

# Extra safety check for the camera one which might be tricky if not exact match
# Let's clean up line 229 "style Ã  vos" -> "style à vos"
content = content.replace("style Ã  vos", "style à vos")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed icons in photo.html")
