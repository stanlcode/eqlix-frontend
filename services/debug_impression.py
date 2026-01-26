import os

filepath = r'c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\impression.html'

try:
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"--- {os.path.basename(filepath)} ---")
    for i, line in enumerate(lines):
        if "â" in line and "Les supports" in line: # Target specific line 105
            print(f"Line {i+1}: {repr(line.strip())}")
            
except Exception as e:
    print(f"Error reading {filepath}: {e}")
