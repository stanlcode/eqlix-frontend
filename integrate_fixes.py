import os
import re

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
style_path = os.path.join(base_dir, "style.css")
modal_path = os.path.join(base_dir, "modal.css")

# 1. Read style.css
with open(style_path, "r", encoding="utf-8") as f:
    style_content = f.read()

# 2. Apply Header Spacing Fixes
style_content = style_content.replace(
    ".header-content {",
    ".header-content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 20px 50px;\n    gap: 40px;"
)
# Clean up duplicate padding if replace matched weirdly
style_content = re.sub(r'padding: 20px 40px 20px 20px;(\s*padding: 20px 50px;)', r'\1', style_content)

style_content = style_content.replace(
    ".logo {",
    ".logo {\n    display: flex;\n    align-items: center;\n    margin-right: 40px;\n    flex-shrink: 0;"
)

# 3. Apply Dark Mode Toggle Fixes
style_content = style_content.replace(
    ".dark-mode-toggle {",
    ".dark-mode-toggle {\n    width: 44px;\n    height: 44px;\n    min-width: 44px;\n    min-height: 44px;\n    border-radius: 50%;\n    background: var(--gray-light);\n    border: none;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: var(--transition-smooth);\n    position: relative;\n    overflow: hidden;\n    flex-shrink: 0;\n    padding: 0;"
)

# 4. Header Actions
style_content = style_content.replace(
    ".header-actions {",
    ".header-actions {\n    display: flex;\n    align-items: center;\n    gap: 20px;\n    margin-left: auto;\n    padding-left: 40px;"
)

# 5. Read modal.css and append with !important
if os.path.exists(modal_path):
    with open(modal_path, "r", encoding="utf-8") as f:
        modal_content = f.read()
    
    # Force hidden by default
    modal_content = modal_content.replace(".contact-modal {", ".contact-modal {\n    display: none !important;")
    modal_content = modal_content.replace(".login-modal {", ".login-modal {\n    display: none !important;")
    modal_content = modal_content.replace(".contact-modal.active {", ".contact-modal.active {\n    display: flex !important;")
    modal_content = modal_content.replace(".login-modal.active {", ".login-modal.active {\n    display: flex !important;")
    
    style_content += "\n\n/* === APPENDED MODAL STYLES === */\n" + modal_content

# 6. Final Polish: Ensure no sticky in portfolio-hero
style_content = style_content.replace("position: sticky;\n    top: 90px;", "")

# Write back
with open(style_path, "w", encoding="utf-8") as f:
    f.write(style_content)

print("Site-wide CSS integrated and fixed.")
