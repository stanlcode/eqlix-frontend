import os

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
style_path = os.path.join(base_dir, "style.css")
modal_path = os.path.join(base_dir, "modal.css")

# Read style.css
with open(style_path, "r", encoding="utf-8") as f:
    style_content = f.read()

# Read modal.css
if os.path.exists(modal_path):
    with open(modal_path, "r", encoding="utf-8") as f:
        modal_content = f.read()
    
    # Aggressively hide modals by default
    processed_modals = modal_content.replace(".contact-modal {", ".contact-modal {\n    display: none !important;")
    processed_modals = processed_modals.replace(".login-modal {", ".login-modal {\n    display: none !important;")
    processed_modals = processed_modals.replace(".contact-modal.active {", ".contact-modal.active {\n    display: flex !important;")
    processed_modals = processed_modals.replace(".login-modal.active {", ".login-modal.active {\n    display: flex !important;")
    
    combined_content = style_content + "\n\n/* === DEFINITIVE MODAL STYLES === */\n" + processed_modals
    
    with open(style_path, "w", encoding="utf-8") as f:
        f.write(combined_content)
    
    print("Style and Modals combined successfully.")
else:
    print("modal.css not found.")
