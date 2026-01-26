import os
import re

# Mapping of corrupted words to their correct French accented versions
# Using regex with word boundaries to avoid double accents
corrections = {
    r"\bopportunit\b": "opportunité",
    r"\bcrativit\b": "créativité",
    r"\bstratgie\b": "stratégie",
    r"\bnumrique\b": "numérique",
    r"\bexprience\b": "expérience",
    r"\bvnement\b": "événement",
    r"\bralisation\b": "réalisation",
    r"\bgalement\b": "également",
    r"\bRinitialisation\b": "Réinitialisation",
    r"\brinitialiser\b": "réinitialiser",
    r"\brinitialisation\b": "réinitialisation",
    r"\bRinitialisez\b": "Réinitialisez",
    r"\brinitialis\b": "réinitialisé",
    r"\boubli\b": "oublié",
    r"\bVrification\b": "Vérification",
    r"\bVrifiez\b": "Vérifiez",
    r"\bRessayer\b": "Réessayer",
    r"\benvoy\b": "envoyé",
    r"\baccder\b": "accéder",
    r"\bCrez\b": "Créez",
    r"\bidentit\b": "identité",
    r"\brussie\b": "réussie",
    r"\bscuris\b": "sécurisé",
    r"\bRinitialiser\b": "Réinitialiser",
    r"\btmoignage\b": "témoignage",
    r"\bclbrer\b": "célébrer",
    r"\bspcialit\b": "spécialité",
}

# Meta descriptions for main pages
meta_descriptions = {
    "index.html": "EQLIX MEDIA CREATION - Agence créative spécialisée en identité visuelle, photographie, design graphique et impression premium.",
    "about.html": "Découvrez l'agence EQLIX. Notre vision, notre équipe et nos équipements de pointe pour vos projets créatifs.",
    "portfolio.html": "Explorez le portfolio de EQLIX MEDIA CREATION. Découvrez nos réalisations en branding, design et photographie.",
    "contact.html": "Contactez EQLIX MEDIA CREATION pour donner vie à vos projets. Demandez un devis ou une consultation.",
    "pricing.html": "Consultez nos tarifs pour les services de branding, photographie et design graphique.",
    "faq.html": "Questions fréquentes sur les services et le processus créatif de EQLIX MEDIA CREATION.",
    "testimonials.html": "Ce que nos clients disent de nous. Découvrez les témoignages sur nos services créatifs.",
    "client-space.html": "Espace client EQLIX. Suivez vos projets, accédez à vos fichiers et communiquez avec notre équipe.",
    "dashboard.html": "Tableau de bord client EQLIX. Gérez vos projets et vos communications en toute simplicité.",
    "profile.html": "Gérez votre profil client EQLIX et vos préférences de compte.",
    "404.html": "Page non trouvée - EQLIX MEDIA CREATION.",
    "forgot-password.html": "Réinitialisez votre mot de passe pour accéder à votre espace client EQLIX.",
    "reset-password.html": "Créez un nouveau mot de passe pour votre compte EQLIX.",
    "verify-email.html": "Vérifiez votre adresse email pour activer votre compte EQLIX.",
    "register.html": "Créez votre compte client EQLIX pour commencer votre voyage créatif avec nous.",
    "legal/cgv.html": "Conditions Générales de Vente de EQLIX MEDIA CREATION.",
    "legal/confidentialite.html": "Politique de confidentialité et protection des données de EQLIX MEDIA CREATION.",
    "legal/cookies.html": "Politique d'utilisation des cookies de EQLIX MEDIA CREATION.",
    "legal/mentions-legales.html": "Mentions légales de l'agence EQLIX MEDIA CREATION."
}

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, base_dir).replace("\\", "/")
            
            if "node_modules" in rel_path:
                continue
                
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            original_content = content
            
            # 1. Restore accents using regex with word boundaries
            for pattern, replacement in corrections.items():
                content = re.sub(pattern, replacement, content)
            
            # 2. Fix specific double-accent bugs and filename bugs
            content = content.replace("opportunitéé", "opportunité")
            content = content.replace("identitéée", "identite") # Filenames normally don't have accents
            content = content.replace("identité.html", "identite.html")
            content = content.replace("Identit ", "Identité ")
            
            # 3. Inject meta description if missing
            if rel_path in meta_descriptions:
                desc = meta_descriptions[rel_path]
                if not re.search(r'<meta name="description"', content, re.IGNORECASE):
                    # Try to find a good place: after title or before </head>
                    if "<title>" in content.lower():
                        content = re.sub(r'(</title>)', r'\1\n    <meta name="description" content="' + desc + '">', content, flags=re.IGNORECASE)
                    elif "</head>" in content.lower():
                        content = re.sub(r'(</head>)', r'    <meta name="description" content="' + desc + '">\n\1', content, flags=re.IGNORECASE)
                else:
                    # Update empty ones
                    content = re.sub(r'<meta name="description" content="">', f'<meta name="description" content="{desc}">', content)
                    content = re.sub(r'<meta name="description"\s*content=".*?"', f'<meta name="description" content="{desc}"', content, count=1)
            
            if content != original_content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updates applied to {rel_path}")

print("Restoration complete.")
