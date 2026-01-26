import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\style.css"

# Read as bytes to detect mess
with open(file_path, "rb") as f:
    data = f.read()

# Try to decode safely (might be a mix if 'type' was used)
try:
    # Try decoding as UTF-16 first if it looks like it (often happens with PowerShell redirection)
    content = data.decode('utf-16')
except:
    try:
        content = data.decode('utf-8')
    except:
        content = data.decode('latin-1')

# 1. Remove Sticky Hero
content = content.replace("position: sticky;", "/* position: sticky; */")
content = content.replace("top: 90px; /* offset to account for fixed header */", "")
content = content.replace("top: 80px;", "")

# 2. Fix Modal Visibility (Aggressive)
# Look for the modal blocks and ensure display: none !important
content = content.replace(".contact-modal {", ".contact-modal {\n    display: none !important;")
content = content.replace(".login-modal {", ".login-modal {\n    display: none !important;")

# Handle the .active classes
content = content.replace(".contact-modal.active {", ".contact-modal.active {\n    display: flex !important;")
content = content.replace(".login-modal.active {", ".login-modal.active {\n    display: flex !important;")

# 3. Double check the portfolio filter sticky too
content = content.replace(".portfolio-filter-section {", ".portfolio-filter-section {\n    position: relative !important;\n    top: auto !important;")

# Write back as clean UTF-8
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("style.css fixed and cleaned.")
