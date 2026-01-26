import os

def fix_file(filepath, replacements):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {filepath}")
        else:
            print(f"No changes needed for {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Impression fix
# â\x9c¨ -> \u00e2\u009c\u00a8 -> ✨
impression_replacements = {
    '\u00e2\u009c\u00a8': '✨',
}

base_dir = r'c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services'
fix_file(os.path.join(base_dir, 'impression.html'), impression_replacements)
