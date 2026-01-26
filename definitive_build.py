import os
import re

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
style_path = os.path.join(base_dir, "style.css")
modal_path = os.path.join(base_dir, "modal.css")

# 1. Read style.css (restored)
with open(style_path, "r", encoding="utf-8") as f:
    style = f.read()

# 2. Surgical Fixes
# Header Content
style = style.replace(
    ".header-content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 20px 40px 20px 20px;\n}",
    ".header-content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 20px 50px;\n    gap: 40px;\n}"
)

# Logo
style = style.replace(
    ".logo {\n    display: flex;\n    align-items: center;\n    margin-right: auto;\n    padding-right: 40px;\n}",
    ".logo {\n    display: flex;\n    align-items: center;\n    margin-right: 40px;\n    flex-shrink: 0;\n}"
)

# Header Actions
style = style.replace(
    ".header-actions {\n    display: flex;\n    align-items: center;\n    gap: 16px;\n}",
    ".header-actions {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    margin-left: auto;\n    padding-left: 40px;\n}"
)

# Dark Mode Toggle
style = style.replace(
    ".dark-mode-toggle {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background: var(--gray-light);\n    border: none;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: var(--transition-smooth);\n    position: relative;\n    overflow: hidden;\n}",
    ".dark-mode-toggle {\n    width: 44px;\n    height: 44px;\n    min-width: 44px;\n    min-height: 44px;\n    border-radius: 50%;\n    background: var(--gray-light);\n    border: none;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: var(--transition-smooth);\n    position: relative;\n    overflow: hidden;\n    flex-shrink: 0;\n    padding: 0;\n}"
)

# 3. Read and append Modal CSS
if os.path.exists(modal_path):
    with open(modal_path, "r", encoding="utf-8") as f:
        modals = f.read()
    
    # Force hidden by default
    modals = modals.replace(".contact-modal {", ".contact-modal {\n    display: none !important;")
    modals = modals.replace(".login-modal {", ".login-modal {\n    display: none !important;")
    modals = modals.replace(".contact-modal.active {", ".contact-modal.active {\n    display: flex !important;")
    modals = modals.replace(".login-modal.active {", ".login-modal.active {\n    display: flex !important;")
    
    style += "\n\n/* === SURGICALLY INTEGRATED MODAL STYLES === */\n" + modals

# 4. Save
with open(style_path, "w", encoding="utf-8") as f:
    f.write(style)

print("Definitive CSS build complete.")
