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

# Define replacements for each file
design_replacements = {
    'ðŸŽ¨': '🎨',
    'ðŸ’¡': '💡',
    'ðŸŽ¯': '🎯',
    'ðŸš€': '🚀',
    'PrÃªt Ã  crÃ©er': 'Prêt à créer',
    'Donnez vie Ã  vos': 'Donnez vie à vos', # Contextual check
    'Ã ': 'à', # Fallback for remaining single ones if safe, but let's be more specific if possible or just do it last
}

# Specific 'Ã ' replacements for design.html to avoid over-matching if 'Ã' appears in other contexts (unlikely in French text but possible)
# Actually, looking at the file, "Ã " is consistently "à ".
design_replacements['Ã '] = 'à'


impression_replacements = {
    'âœ¨': '✨',
    'ðŸ †': '🏆',
    'âš™&iuml;¸ ': '⚙️',
    'ðŸ“¦': '📦',
    'Ã  chaque': 'à chaque',
    'Ã  votre': 'à votre',
    'Ã  la livraison': 'à la livraison',
    'Ã  imprimer': 'à imprimer',
    'Bon Ã€ Tirer': 'Bon À Tirer',
    'Ã ': 'à', # Generic fallback
}

identite_replacements = {
    'identit&eacute;&eacute;': 'identit&eacute;',
    'Ã ': 'à',
    '🎨': '🎨', # Ensure these are correct if they exist
    '⚡': '⚡',
    '🤝': '🤝',
}


base_dir = r'c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services'

fix_file(os.path.join(base_dir, 'design.html'), design_replacements)
fix_file(os.path.join(base_dir, 'impression.html'), impression_replacements)
fix_file(os.path.join(base_dir, 'identite.html'), identite_replacements)
