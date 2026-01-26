import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\script.js"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

new_lines = []
skip = False

# We want to keep everything up to line 565
# Then skip the spaced out garbage
# Then keep the clean version I added at the end

for i, line in enumerate(lines):
    # Stop before the corruption starts (line 567 in the view)
    if i < 566:
        new_lines.append(line)
        continue
    
    # Skip the corruption (starts with spaces and spaced text)
    if "S T A T S" in line or "f u n c t i o n" in line:
        continue
        
    # Skip the first duplicate block if it's the spaced one
    if line.strip().startswith("/ / ") and "S T A T S" in line:
        continue

    # Keep the good code I added
    if "function initStatsCounter() {" in line:
        # We found the clean function start, keep from here
        new_lines.append("// ===== STATS COUNTER ANIMATION =====\n") # ensure header
        new_lines.append(line)
        # Add the rest of the file from here (assuming it's the good part)
        new_lines.extend(lines[i+1:])
        break

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("script.js cleaned of duplication and corruption.")
