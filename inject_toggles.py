import os
import re

TOGGLE_HTML = """                                <button type="button" class="password-toggle" aria-label="Afficher le mot de passe">
                                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <svg class="eye-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                </button>"""

def inject_toggle(content, input_id):
    # Regex to find the specific input field by ID
    # We look for <input ... id="input_id" ... > and ensure we are inside a .password-input-wrapper if possible, 
    # but the simplest way is to find the input tag and append after it if not already present.
    
    # Pattern to match the input tag. It might span multiple lines.
    # We want to insert the TOGGLE_HTML *after* the input tag closing `>`.
    
    pattern = re.compile(f'(<input[^>]*id="{input_id}"[^>]*>)', re.IGNORECASE | re.DOTALL)
    
    match = pattern.search(content)
    if match:
        input_tag = match.group(1)
        # Check if toggle already exists immediately after (ignoring whitespace)
        start_pos = match.end()
        next_chunk = content[start_pos:start_pos+500] # Look ahead
        
        if 'class="password-toggle"' in next_chunk or "class='password-toggle'" in next_chunk:
            print(f"Toggle already exists for {input_id}")
            return content
            
        print(f"Injecting toggle for {input_id}")
        new_content = content[:start_pos] + "\n" + TOGGLE_HTML + content[start_pos:]
        return new_content
    
    return content

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. Login Modal Password (login-password) - Present in almost all files
        # Only inject if it looks like the login modal structure (wrapper present)
        if 'id="login-password"' in content:
            content = inject_toggle(content, "login-password")
            
        # 2. Reset Password Page inputs
        if filepath.endswith("reset-password.html"):
            content = inject_toggle(content, "password")
            content = inject_toggle(content, "confirm-password")
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"No changes for {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    root_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                process_file(os.path.join(subdir, file))

if __name__ == "__main__":
    main()
