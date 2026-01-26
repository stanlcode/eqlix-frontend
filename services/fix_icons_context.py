import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\photo.html"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    
    # Check for the icon div
    if '<div class="why-icon">' in line:
        # Look ahead to see what section this is
        # The next few lines should contain the h3
        context_found = False
        for j in range(1, 4): # check next 3 lines
            if i + j < len(lines):
                next_line = lines[i+j]
                if "Equipement Pro" in next_line or "quipement Pro" in next_line:
                    # It's the camera
                    new_lines.append('                    <div class="why-icon">📸</div>\n')
                    context_found = True
                    break
                elif "Retouche Expert" in next_line:
                    # It's the sparkles
                    new_lines.append('                    <div class="why-icon">✨</div>\n')
                    context_found = True
                    break
                elif "Approche Personnalis" in next_line:
                    # It's the target
                    new_lines.append('                    <div class="why-icon">🎯</div>\n')
                    context_found = True
                    break
        
        if not context_found:
            # If we couldn't match context, keep original (shouldn't happen based on file view)
            new_lines.append(line)
    
    # Check for the typo line "style Ã  vos"
    elif "style Ã  vos" in line:
        new_lines.append(line.replace("style Ã  vos", "style à vos"))
    
    else:
        new_lines.append(line)
    
    i += 1

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Fixed icons by context in photo.html")
