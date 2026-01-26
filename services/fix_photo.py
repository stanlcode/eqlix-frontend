import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\photo.html"

# Read in binary to see exactly what we have, or utf-8
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# The corrupted string
# We know it starts with <p> and ends with Les contenus
# Let's use a regex or string split to be safe
# content = content.replace("ðŸ“¸", "📸") 
# But python script might have encoding issues if I write "ðŸ“¸" directly in this file 
# unless I save this python file as utf-8 (which the tool does).
# Let's try to find the line by context.

new_lines = []
for line in content.splitlines():
    if "Les contenus visuels" in line and "94%" in line:
        # Replace everything before "Les contenus" inside the <p>
        # Line is: <p>ðŸ“¸ Les contenus...
        # We want: <p>📸 Les contenus...
        
        # simplified replace
        line = line.replace("ðŸ“¸", "📸")
        
        # Fallback if the characters are different
        if "ðŸ“¸" not in line and "Les contenus" in line:
            # Maybe it's not matching exactly.
            # Let's just reconstruct the line.
            # Assuming the line structure is consistent
            parts = line.split("Les contenus")
            if len(parts) > 1:
                # Keep indentation
                indent = parts[0].split("<p>")[0]
                line = indent + "<p>📸 Les contenus" + parts[1]
    
    new_lines.append(line)

with open(file_path, "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines))

print("Fixed photo.html encoding.")
