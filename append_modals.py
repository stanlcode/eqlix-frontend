import os

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
style_path = os.path.join(base_dir, "style.css")
modal_path = os.path.join(base_dir, "modal.css")

if os.path.exists(modal_path):
    with open(modal_path, "r", encoding="utf-8") as f:
        modals = f.read()
    
    # Aggressively hide modals by default
    modals = modals.replace(".contact-modal {", ".contact-modal {\n    display: none !important;")
    modals = modals.replace(".login-modal {", ".login-modal {\n    display: none !important;")
    modals = modals.replace(".contact-modal.active {", ".contact-modal.active {\n    display: flex !important;")
    modals = modals.replace(".login-modal.active {", ".login-modal.active {\n    display: flex !important;")
    
    with open(style_path, "a", encoding="utf-8") as f:
        f.write("\n\n/* === SURGICALLY APPENDED MODAL STYLES === */\n" + modals)
    
    print("Modals appended successfully.")
else:
    print("modal.css not found.")
