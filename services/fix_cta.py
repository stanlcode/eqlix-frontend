import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\services\photo.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix "Prêt à créer" and "vie à votre"
# The pattern is Ã followed by character 0xA0 (nbsp) usually, but might be a space in the file view
# matches "Ã "
# We will replace "Ã " (A tilde + space) if it matches, and also try A tilde + NBSP

# Generic fix for the specific observed lines
content = content.replace("Pr&ecirc;t Ã  cr&eacute;er", "Pr&ecirc;t à cr&eacute;er")
content = content.replace("vie Ã  votre", "vie à votre")

# Also general cleanup if feasible, but being specific is safer to avoid breaking other things
# content = content.replace("Ã ", "à") 

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed CTA encoding in photo.html")
