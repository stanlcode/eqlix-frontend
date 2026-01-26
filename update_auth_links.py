import os

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            print(f"Processing {file_path}...")
            
            # Determine relative path to root for links
            rel_path = os.path.relpath(base_dir, root)
            if rel_path == ".":
                forgot_link = "forgot-password.html"
                register_link = "register.html"
            else:
                forgot_link = os.path.join(rel_path, "forgot-password.html").replace("\\", "/")
                register_link = os.path.join(rel_path, "register.html").replace("\\", "/")

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except UnicodeDecodeError:
                continue

            modified = False
            
            # Replace placeholder links
            patterns = [
                ('href="#forgot-password"', f'href="{forgot_link}"'),
                ('href="#signup"', f'href="{register_link}"')
            ]
            
            for old, new in patterns:
                if old in content:
                    content = content.replace(old, new)
                    modified = True
            
            if modified:
                print(f"  Updated links in {file}")
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
