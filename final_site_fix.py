import os
import re

# Mapping of characters to HTML entities
entity_map = {
    "é": "&eacute;",
    "É": "&Eacute;",
    "à": "&agrave;",
    "À": "&Agrave;",
    "è": "&egrave;",
    "È": "&Egrave;",
    "ê": "&ecirc;",
    "Ê": "&Ecirc;",
    "ë": "&euml;",
    "î": "&icirc;",
    "ï": "&iuml;",
    "ô": "&ocirc;",
    "û": "&ucirc;",
    "ù": "&ugrave;",
    "ç": "&ccedil;",
    "œ": "&oelig;",
}

# Common corrupted patterns (e.g. "opportunit " or "opportunitéé")
corruptions = {
    "opportunitéé": "opportunité",
    "identitéée": "identité",
    "opportunit ": "opportunité ",
    "créativit ": "créativité ",
    "stratéigie": "stratégie",
    "opportunit&eacute;&eacute;": "opportunit&eacute;",
}

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, base_dir).replace("\\", "/")
            
            if "node_modules" in rel_path:
                continue
                
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            original_content = content
            
            # 1. First fix known double accents or gaps
            for wrong, right in corruptions.items():
                content = content.replace(wrong, right)
            
            # 2. Fix specific missing trailings found in previous audits
            content = content.replace("opportunit ", "opportunité ")
            content = content.replace("crativit ", "créativité ")
            content = content.replace("Identit ", "Identité ")
            
            # 3. Convert all accented characters to HTML entities
            for char, entity in entity_map.items():
                content = content.replace(char, entity)
            
            # 4. Clean up structural issues leftover from previous script runs
            # Remove duplicate Header Sticky comments
            content = re.sub(r'(<!-- Header Sticky -->\s*)+', '<!-- Header Sticky -->\n', content)
            
            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Entities applied to {rel_path}")

print("Site-wide entity conversion complete.")
