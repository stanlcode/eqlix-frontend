import os

def fix_file(filepath, replacements):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

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

# Precise unicode replacements based on debug output

# Design
# ðŸŽ¨ -> \u00f0\u009f\u008e\u00a8 -> 🎨
# ðŸ’¡ -> \u00f0\u009f\u0092\u00a1 -> 💡
# ðŸŽ¯ -> \u00f0\u009f\u008e\u00af -> 🎯
# ðŸš€ -> \u00f0\u009f\u009a\u0080 -> 🚀
# Ã<NBSP> -> \u00c3\u00a0 -> à

design_replacements = {
    '\u00f0\u009f\u008e\u00a8': '🎨',
    '\u00f0\u009f\u0092\u00a1': '💡',
    '\u00f0\u009f\u008e\u00af': '🎯',
    '\u00f0\u009f\u009a\u0080': '🚀',
    '\u00c3\u00a0': 'à',
    'Pr\u00c3\u00aa': 'Prê', # PrÃªt -> Prêt (\xc3\xaa -> ê, \xc3 -> Ã, \xaa -> ª) -- Wait, PrÃªt is Pr\u00c3\u00aa? 
                             # ê is \xc3\xaa. Latin-1: \xc3=Ã, \xaa=ª. So PrÃªt.
                             # Let's verify commonly seen PrÃªt.
                             # Actually I'll just use the exact strings I see in view_file if simple, but unicode escapes are safer.
                             # 'Pr\u00e9t' ? No.
                             # Let's stick to the high confidence ones.
    'Pr\u00c3\u00aa': 'Prê',
}

# Impression
# âœ¨ -> \u00e2\u0153\u00a8 -> ✨
# ðŸ † -> \u00f0\u009f\u008f\u0086 -> 🏆
# âš™&iuml;¸<8f> -> \u00e2\u009a\u0099&iuml;\u00b8\u008f -> ⚙️
# ðŸ“¦ -> \u00f0\u009f\u0093\u00a6 -> 📦
# Ã<NBSP> -> \u00c3\u00a0 -> à
# Ã€ -> \u00c3\u0080 -> À

impression_replacements = {
    '\u00e2\u0153\u00a8': '✨',
    '\u00f0\u009f\u008f\u0086': '🏆',
    '\u00e2\u009a\u0099&iuml;\u00b8\u008f': '⚙️',
    '\u00f0\u009f\u0093\u00a6': '📦',
    '\u00c3\u00a0': 'à',
    '\u00c3\u0080': 'À', 
}

# Identite
# identit&eacute;&eacute; -> identit&eacute;
# Ã<NBSP> -> \u00c3\u00a0 -> à

identite_replacements = {
    'identit&eacute;&eacute;': 'identit&eacute;',
    '\u00c3\u00a0': 'à',
}


base_dir = r'c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services'

fix_file(os.path.join(base_dir, 'design.html'), design_replacements)
fix_file(os.path.join(base_dir, 'impression.html'), impression_replacements)
fix_file(os.path.join(base_dir, 'identite.html'), identite_replacements)
