import os

root_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"
target_url = "https://twitter.com/eqlixmediacretion"
old_url = "https://twitter.com/eqlixmedia"

count = 0

for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.lower().endswith(".html"):
            filepath = os.path.join(dirpath, filename)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                if old_url in content:
                    new_content = content.replace(old_url, target_url)
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated: {filepath}")
                    count += 1
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print(f"Total files updated: {count}")
