import os
import re

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
style_path = os.path.join(base_dir, "style.css")
modal_path = os.path.join(base_dir, "modal.css")

with open(style_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix Header Content
content = re.sub(r'\.header-content\s*\{[^}]*\}', 
                 ".header-content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 20px 50px;\n    gap: 40px;\n}", 
                 content)

# Fix Logo
content = re.sub(r'\.logo\s*\{[^}]*\}', 
                 ".logo {\n    display: flex;\n    align-items: center;\n    margin-right: 40px;\n    flex-shrink: 0;\n}", 
                 content)

# Fix Header Actions
content = re.sub(r'\.header-actions\s*\{[^}]*\}', 
                 ".header-actions {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    margin-left: auto;\n    padding-left: 40px;\n}", 
                 content)

# Fix Dark Mode Toggle
content = re.sub(r'\.dark-mode-toggle\s*\{[^}]*\}', 
                 ".dark-mode-toggle {\n    width: 44px;\n    height: 44px;\n    min-width: 44px;\n    min-height: 44px;\n    border-radius: 50%;\n    background: var(--gray-light);\n    border: none;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: var(--transition-smooth);\n    position: relative;\n    overflow: hidden;\n    flex-shrink: 0;\n    padding: 0;\n}", 
                 content)

# Remove Sticky Hero
content = content.replace("position: sticky;", "/* position: sticky; */")
content = re.sub(r'top:\s*\d+px;\s*/\* offset to account for fixed header \*/', "", content)

# Append Modal CSS if exists
if os.path.exists(modal_path):
    with open(modal_path, "r", encoding="utf-8") as f:
        modals = f.read()
    
    modals = modals.replace(".contact-modal {", ".contact-modal {\n    display: none !important;")
    modals = modals.replace(".login-modal {", ".login-modal {\n    display: none !important;")
    modals = modals.replace(".contact-modal.active {", ".contact-modal.active {\n    display: flex !important;")
    modals = modals.replace(".login-modal.active {", ".login-modal.active {\n    display: flex !important;")
    
    content += "\n\n/* === INTEGRATED MODAL STYLES === */\n" + modals

with open(style_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Robust CSS integration complete.")
