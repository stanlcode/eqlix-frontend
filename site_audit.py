import os
import re

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
all_html_files = []

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            all_html_files.append(os.path.relpath(os.path.join(root, file), base_dir).replace("\\", "/"))

errors = []

for html_file in all_html_files:
    file_path = os.path.join(base_dir, html_file)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Check Title
    if not re.search(r"<title>.*?</title>", content, re.IGNORECASE):
        errors.append(f"[{html_file}] Missing <title>")
    
    # 2. Check Description
    if not re.search(r'<meta name="description".*?>', content, re.IGNORECASE):
        errors.append(f"[{html_file}] Missing meta description")
        
    # 3. Check Images
    img_matches = re.finditer(r'<img[^>]*src=["\']([^"\']+)["\']', content, re.IGNORECASE)
    for match in img_matches:
        img_src = match.group(1).split("#")[0] # Strip anchor
        if img_src.startswith("http") or img_src.startswith("data:"):
            continue
            
        current_dir = os.path.dirname(html_file)
        if img_src.startswith("/"):
            resolved_img_path = img_src.lstrip("/")
        else:
            resolved_img_path = os.path.normpath(os.path.join(current_dir, img_src)).replace("\\", "/")
            
        if not os.path.exists(os.path.join(base_dir, resolved_img_path)):
            errors.append(f"[{html_file}] Broken image: {img_src}")

    # 4. Check Internal Links
    link_matches = re.finditer(r'<a[^>]*href=["\']([^"#\'][^"\']*)["\']', content, re.IGNORECASE)
    for match in link_matches:
        link_href = match.group(1).split("#")[0] # Strip anchor
        if not link_href: continue # Just an anchor link
        
        if link_href.startswith("http") or link_href.startswith("mailto:") or link_href.startswith("tel:") or link_href.startswith("javascript:"):
            continue
            
        current_dir = os.path.dirname(html_file)
        if link_href.startswith("/"):
            resolved_link_path = link_href.lstrip("/")
        else:
            resolved_link_path = os.path.normpath(os.path.join(current_dir, link_href)).replace("\\", "/")
            
        full_path = os.path.join(base_dir, resolved_link_path)
        if not os.path.exists(full_path):
            # Try appending .html if missing
            if not resolved_link_path.endswith(".html") and os.path.exists(full_path + ".html"):
                pass
            elif os.path.isdir(full_path) and os.path.exists(os.path.join(full_path, "index.html")):
                pass
            else:
                errors.append(f"[{html_file}] Broken link: {link_href}")

if errors:
    with open("audit_results.txt", "w", encoding="utf-8") as out:
        out.write(f"Total errors found: {len(errors)}\n")
        for e in errors:
            out.write(f" - {e}\n")
    print(f"Total errors found: {len(errors)}. Results saved to audit_results.txt")
else:
    print("No errors found.")
