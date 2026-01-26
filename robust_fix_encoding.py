import os

def fix_content(content):
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
    
    # Specific context-based replacements for raw ISO-8859-1 remnants
    # These often appear if the file was partially corrupted or read wrongly
    content = content.replace("Identit ", "Identité ")
    content = content.replace("Identit\ufffd", "Identité")
    content = content.replace("Identit\xa0", "Identité")
    
    content = content.replace(" \xc0 Propos", " À Propos")
    content = content.replace("\ufffd Propos", "À Propos")
    
    content = content.replace(" \xc9quipe", " Équipe")
    content = content.replace("\ufffdquipe", "Équipe")
    
    content = content.replace("T\ufffdmoignages", "Témoignages")
    content = content.replace("D\ufffdmarrer", "Démarrer")
    
    for key, val in replacements.items():
        if key:
            content = content.replace(key, val)
    return content

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            
            with open(file_path, "rb") as f:
                raw_data = f.read()
            
            try:
                content = raw_data.decode("utf-8")
                encoding_used = "utf-8"
            except UnicodeDecodeError:
                content = raw_data.decode("latin-1")
                encoding_used = "latin-1"
            
            new_content = fix_content(content)
            
            if new_content != content or encoding_used != "utf-8":
                print(f"Fixing {file_path} (detected {encoding_used})")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
