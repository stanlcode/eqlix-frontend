import os
import re

base_dir = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE"

# Master Header Template
HEADER_TEMPLATE = """
    <!-- Header Sticky -->
    <header class="header" id="header">
        <div class="container header-content">
            <div class="logo">
                <a href="{ROOT}index.html"><img src="{ROOT}images/logo.png" alt="EQLIX MEDIA CREATION" class="logo-img"></a>
            </div>

            <nav class="nav" id="nav-menu">
                <ul class="nav-list">
                    <li class="nav-item dropdown">
                        <a href="{ROOT}index.html#services" class="nav-link">Services</a>
                        <div class="dropdown-menu">
                            <a href="{ROOT}services/identite.html" class="dropdown-item">Identit&eacute; Visuelle</a>
                            <a href="{ROOT}services/photo.html" class="dropdown-item">Photographie</a>
                            <a href="{ROOT}services/design.html" class="dropdown-item">Design Graphique</a>
                            <a href="{ROOT}services/impression.html" class="dropdown-item">Impression</a>
                        </div>
                    </li>
                    <li class="nav-item"><a href="{ROOT}portfolio.html" class="nav-link">Portfolio</a></li>
                    <li class="nav-item"><a href="{ROOT}testimonials.html" class="nav-link">T&eacute;moignages</a></li>
                    <li class="nav-item dropdown">
                        <a href="{ROOT}about.html" class="nav-link">Agence</a>
                        <div class="dropdown-menu">
                            <a href="{ROOT}about.html" class="dropdown-item">&Agrave; Propos</a>
                            <a href="{ROOT}about.html#vision" class="dropdown-item">Vision</a>
                            <a href="{ROOT}about.html#equipe" class="dropdown-item">&Eacute;quipe</a>
                            <a href="{ROOT}about.html#equipements" class="dropdown-item">&Eacute;quipements</a>
                        </div>
                    </li>
                </ul>
            </nav>

            <div class="header-actions">
                <button class="dark-mode-toggle" id="dark-mode-toggle" aria-label="Toggle dark mode">
                    <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                </button>
                <button class="btn btn-outline btn-client" id="client-space-btn" onclick="openLoginModal()">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Espace Client
                </button>
                <button class="btn btn-primary" onclick="openContactModal()">D&eacute;marrer un projet</button>
                <button class="mobile-menu-toggle" id="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>
"""

# Master Footer Template
FOOTER_TEMPLATE = """
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="{ROOT}services/identite.html">Identit&eacute; Visuelle</a></li>
                        <li><a href="{ROOT}services/photo.html">Photographie</a></li>
                        <li><a href="{ROOT}services/design.html">Design Graphique</a></li>
                        <li><a href="{ROOT}services/impression.html">Impression Premium</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Agence</h4>
                    <ul>
                        <li><a href="{ROOT}about.html">&Agrave; Propos</a></li>
                        <li><a href="{ROOT}about.html#vision">Notre Vision</a></li>
                        <li><a href="{ROOT}about.html#equipe">L'&Eacute;quipe</a></li>
                        <li><a href="{ROOT}about.html#equipements">Nos &Eacute;quipements</a></li>
                        <li><a href="{ROOT}portfolio.html">Portfolio</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>L&eacute;gal</h4>
                    <ul>
                        <li><a href="{ROOT}legal/mentions-legales.html">Mentions L&eacute;gales</a></li>
                        <li><a href="{ROOT}legal/cgv.html">CGV</a></li>
                        <li><a href="{ROOT}legal/confidentialite.html">Confidentialit&eacute;</a></li>
                        <li><a href="{ROOT}legal/cookies.html">Cookies</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="{ROOT}faq.html">FAQ</a></li>
                        <li><a href="{ROOT}contact.html">Contact</a></li>
                        <li><a href="{ROOT}pricing.html">Tarifs</a></li>
                        <li><a href="{ROOT}testimonials.html">T&eacute;moignages</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h4>Contact</h4>
                    <ul>
                        <li>contact@eqlix.com</li>
                        <li>+509 31 06 0634</li>
                        <li>+509 40 05 5553</li>
                        <li>11, Rue Chavanne Prolong&eacute;e</li>
                        <li>Di&egrave;gue, PV, Ha&iuml;ti</li>
                    </ul>
                    <div class="social-links">
                        <a href="https://instagram.com/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
                        <a href="https://linkedin.com/company/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</a>
                        <a href="https://facebook.com/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
                        <a href="https://twitter.com/eqlixmedia" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>
                        <a href="https://behance.net/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="Behance">BE</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-partners">
                    <span>Partenaires:</span>
                    <div class="partner-logos">
                        <span class="partner">Adobe</span>
                        <span class="partner">Pantone</span>
                        <span class="partner">Canon</span>
                    </div>
                </div>
                <div class="footer-copy">
                    <p>&copy; 2026 EQLIX MEDIA CREATION. Tous droits r&eacute;serv&eacute;s.</p>
                </div>
            </div>
        </div>
    </footer>
"""

# Master Modals Template
MODALS_TEMPLATE = """
    <!-- Contact Modal -->
    <div class="contact-modal" id="contact-modal">
        <div class="modal-overlay" id="modal-overlay" onclick="closeContactModal()"></div>
        <div class="modal-content">
            <button class="modal-close" id="modal-close" onclick="closeContactModal()" aria-label="Fermer">&times;</button>

            <div class="modal-header">
                <h2 class="modal-title">D&eacute;marrons votre projet</h2>
                <p class="modal-subtitle">Parlez-nous de votre vision et nous la transformerons en r&eacute;alit&eacute;</p>
            </div>

            <form class="contact-form" id="contact-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Nom complet *</label>
                        <input type="text" id="name" name="name" required placeholder="Jean Dupont">
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required placeholder="jean@entreprise.com">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">T&eacute;l&eacute;phone</label>
                        <input type="tel" id="phone" name="phone" placeholder="+509 31 06 06 34">
                    </div>

                    <div class="form-group">
                        <label for="company">Entreprise</label>
                        <input type="text" id="company" name="company" placeholder="Nom de votre entreprise">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="project-type">Type de projet *</label>
                        <select id="project-type" name="project-type" required>
                            <option value="">S&eacute;lectionnez un type</option>
                            <option value="branding">Identit&eacute; Visuelle Compl&egrave;te</option>
                            <option value="design">Design Graphique</option>
                            <option value="photo">Photographie Professionnelle</option>
                            <option value="print">Impression Premium</option>
                            <option value="multiple">Projet Multi-services</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="budget">Budget estim&eacute;</label>
                        <select id="budget" name="budget">
                            <option value="">S&eacute;lectionnez une fourchette</option>
                            <option value="small">Less than $5,000</option>
                            <option value="medium">$5,000 - $15,000</option>
                            <option value="large">$15,000 - $50,000</option>
                            <option value="enterprise">Over $50,000</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="message">D&eacute;crivez votre projet *</label>
                    <textarea id="message" name="message" rows="5" required
                        placeholder="Parlez-nous de votre vision, vos objectifs et vos attentes..."></textarea>
                </div>

                <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-large">Envoyer la demande</button>
                    <p class="form-note">Nous vous r&eacute;pondrons sous 24h ouvr&eacute;es</p>
                </div>
            </form>

            <div class="success-message" id="success-message">
                <div class="success-icon">&checkmark;</div>
                <h3>Message envoy&eacute; avec succ&egrave;s !</h3>
                <p>Merci pour votre int&eacute;r&ecirc;t. Notre &eacute;quipe vous contactera tr&egrave;s prochainement.</p>
                <button class="btn btn-primary" id="success-close" onclick="closeContactModal()">Fermer</button>
            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <div class="login-modal" id="login-modal">
        <div class="modal-overlay" id="login-overlay" onclick="closeLoginModal()"></div>
        <div class="modal-content login-content">
            <button class="modal-close" id="login-close" onclick="closeLoginModal()" aria-label="Fermer">&times;</button>

            <div class="modal-header">
                <div class="login-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <h2 class="modal-title">Espace Client</h2>
                <p class="modal-subtitle">Connectez-vous pour acc&eacute;der &agrave; vos projets</p>
            </div>

            <form class="login-form" id="login-form">
                <div class="form-group">
                    <label for="login-email">Email *</label>
                    <input type="email" id="login-email" name="email" required placeholder="votre@email.com">
                </div>

                <div class="form-group">
                    <label for="login-password">Mot de passe *</label>
                    <div class="password-input-wrapper">
                        <input type="password" id="login-password" name="password" required placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;">
                    </div>
                </div>

                <div class="form-options">
                    <label class="checkbox-label">
                        <input type="checkbox" id="remember-me" name="remember">
                        <span>Se souvenir de moi</span>
                    </label>
                    <a href="{ROOT}forgot-password.html" class="forgot-link">Mot de passe oubli&eacute; ?</a>
                </div>

                <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-large">Se connecter</button>
                    <p class="form-note">Pas encore de compte ? <a href="{ROOT}register.html" class="signup-link">Cr&eacute;er un compte</a></p>
                </div>
            </form>
        </div>
    </div>
"""

SCRIPTS_TEMPLATE = """
    <script src="{ROOT}api.js"></script>
    <script src="{ROOT}script.js"></script>
"""

def clean_body_content(content):
    # Remove existing Header sections and their comments
    content = re.sub(r'<!-- Header Sticky -->', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<header.*?</header>', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove existing structural comments
    content = re.sub(r'<!-- Footer -->', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<!-- Contact Modal -->', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<!-- Login Modal -->', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<!-- Scripts -->', '', content, flags=re.IGNORECASE)
    
    # Remove EVERYTHING starting from the footer, modals or script markers
    end_markers = [
        '<!-- Footer -->',
        '<footer',
        '<!-- Contact Modal -->',
        '<div class="contact-modal"',
        '<!-- Login Modal -->',
        '<div class="login-modal"',
        '<!-- Scripts -->',
        '<script src="api.js"',
        '<script src="script.js"',
        '<script src="register.js"',
        '<script src="login.js"',
        '</body>'
    ]
    
    lowest_index = len(content)
    for marker in end_markers:
        idx = content.find(marker)
        if idx != -1 and idx < lowest_index:
            lowest_index = idx
            
    return content[:lowest_index].strip()

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            
            # For now, apply to all files
            if any(x in file for x in ["dashboard", "profile", "client-space"]):
                # Optional: special handling if needed, but end-markers should work
                pass
                
            rel_path = os.path.relpath(base_dir, root)
            root_prefix = "" if rel_path == "." else rel_path.replace("\\", "/") + "/"
            
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Remove modal.css links as they are now consolidated in style.css
            content = re.sub(r'<link rel="stylesheet" href=".*?modal\.css">', '', content, flags=re.IGNORECASE)
            
            # Extract the page start (Head and Body opening)
            match = re.search(r'(<!DOCTYPE.*?>.*?<body.*?>)', content, flags=re.DOTALL | re.IGNORECASE)
            if not match:
                print(f"Skipping {file_path} - No body tag found")
                continue
            
            page_start = match.group(1)
            body_content_raw = content[match.end():]
            
            # Clean the body content of existing structure
            cleaned_body = clean_body_content(body_content_raw)
            
            # Prepare templates
            header = HEADER_TEMPLATE.replace("{ROOT}", root_prefix)
            footer = FOOTER_TEMPLATE.replace("{ROOT}", root_prefix)
            modals = MODALS_TEMPLATE.replace("{ROOT}", root_prefix)
            scripts = SCRIPTS_TEMPLATE.replace("{ROOT}", root_prefix)
            
            # Assemble the final HTML
            new_html = page_start + "\n" + header + "\n" + cleaned_body + "\n" + footer + modals + scripts + "\n</body>\n</html>"
            
            print(f"Cleanly unified {file_path}")
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_html)
