import os

replacements = {
    "Ã©": "é",
    "Ã ": "à",
    "Ã€": "À",
    "Ã‰": "É",
    "Ãˆ": "È",
    "Ã§": "ç",
    "Ãª": "ê",
    "Ã«": "ë",
    "Ã®": "î",
    "Ã¯": "ï",
    "Ã´": "ô",
    "Ã»": "û",
    "Ã¹": "ù",
    "Ã¢": "â",
    "Ã´": "ô"
}

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            print(f"Processing {file_path}...")
            
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except UnicodeDecodeError:
                # If it's not valid UTF-8, it might already be in some other encoding or corrupted
                continue

            modified = False
            for key, val in replacements.items():
                if key in content:
                    content = content.replace(key, val)
                    modified = True
            
            if modified:
                print(f"  Fixed {file}")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
