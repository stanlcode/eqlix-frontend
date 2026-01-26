import os

files = [
    r'c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\design.html',
    r'c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\impression.html'
]

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        print(f"--- {os.path.basename(filepath)} ---")
        for i, line in enumerate(lines):
            if "ð" in line or "Ã" in line or "â" in line:
                print(f"Line {i+1}: {repr(line.strip())}")
                
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
