import os

files_to_fix = [
    "forgot-password.html",
    "reset-password.html",
    "verify-email.html"
]

for file_name in files_to_fix:
    if not os.path.exists(file_name):
        print(f"Skipping {file_name} (not found)")
        continue
        
    print(f"Fixing {file_name}")
    with open(file_name, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Remove the 'é' characters that were added before every character
    fixed_content = content.replace("é", "")
    
    # Remove potential BOM or other weirdness at the start
    fixed_content = fixed_content.lstrip("\ufeff")
    
    with open(file_name, "w", encoding="utf-8") as f:
        f.write(fixed_content)
