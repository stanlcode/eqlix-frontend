import os

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
                            <a href="{ROOT}services/identite.html" class="dropdown-item">Identité Visuelle</a>
                            <a href="{ROOT}services/photo.html" class="dropdown-item">Photographie</a>
                            <a href="{ROOT}services/design.html" class="dropdown-item">Design Graphique</a>
                            <a href="{ROOT}services/impression.html" class="dropdown-item">Impression</a>
                        </div>
                    </li>
                    <li class="nav-item"><a href="{ROOT}portfolio.html" class="nav-link">Portfolio</a></li>
                    <li class="nav-item"><a href="{ROOT}testimonials.html" class="nav-link">Témoignages</a></li>
                    <li class="nav-item dropdown">
                        <a href="{ROOT}about.html" class="nav-link">Agence</a>
                        <div class="dropdown-menu">
                            <a href="{ROOT}about.html" class="dropdown-item">À Propos</a>
                            <a href="{ROOT}about.html#vision" class="dropdown-item">Vision</a>
                            <a href="{ROOT}about.html#equipe" class="dropdown-item">Équipe</a>
                            <a href="{ROOT}about.html#equipements" class="dropdown-item">Équipements</a>
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
                <button class="btn btn-primary" onclick="openContactModal()">Démarrer un projet</button>
                <button class="mobile-menu-toggle" id="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>
"""

# Master Modals Template
MODALS_TEMPLATE = """
    <!-- Contact Modal -->
    <div class="contact-modal" id="contact-modal">
        <div class="modal-overlay" id="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" id="modal-close" aria-label="Fermer">×</button>

            <div class="modal-header">
                <h2 class="modal-title">Démarrons votre projet</h2>
                <p class="modal-subtitle">Parlez-nous de votre vision et nous la transformerons en réalité</p>
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
                        <label for="phone">Téléphone</label>
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
                            <option value="">Sélectionnez un type</option>
                            <option value="branding">Identité Visuelle Complète</option>
                            <option value="design">Design Graphique</option>
                            <option value="photo">Photographie Professionnelle</option>
                            <option value="print">Impression Premium</option>
                            <option value="multiple">Projet Multi-services</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="budget">Budget estimé</label>
                        <select id="budget" name="budget">
                            <option value="">Sélectionnez une fourchette</option>
                            <option value="small">Less than $5,000</option>
                            <option value="medium">$5,000 - $15,000</option>
                            <option value="large">$15,000 - $50,000</option>
                            <option value="enterprise">Over $50,000</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="message">Décrivez votre projet *</label>
                    <textarea id="message" name="message" rows="5" required
                        placeholder="Parlez-nous de votre vision, vos objectifs et vos attentes..."></textarea>
                </div>

                <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-large">Envoyer la demande</button>
                    <p class="form-note">Nous vous répondrons sous 24h ouvrées</p>
                </div>
            </form>

            <!-- Success Message -->
            <div class="success-message" id="success-message">
                <div class="success-icon">✓</div>
                <h3>Message envoyé avec succès !</h3>
                <p>Merci pour votre intérêt. Notre équipe vous contactera très prochainement.</p>
                <button class="btn btn-primary" id="success-close">Fermer</button>
            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <div class="login-modal" id="login-modal">
        <div class="modal-overlay" id="login-overlay"></div>
        <div class="modal-content login-content">
            <button class="modal-close" id="login-close" aria-label="Fermer">×</button>

            <div class="modal-header">
                <div class="login-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <h2 class="modal-title">Espace Client</h2>
                <p class="modal-subtitle">Connectez-vous pour accéder à vos projets</p>
            </div>

            <form class="login-form" id="login-form">
                <div class="form-group">
                    <label for="login-email">Email *</label>
                    <input type="email" id="login-email" name="email" required placeholder="votre@email.com">
                </div>

                <div class="form-group">
                    <label for="login-password">Mot de passe *</label>
                    <div class="password-input-wrapper">
                        <input type="password" id="login-password" name="password" required placeholder="••••••••">
                        <button type="button" class="password-toggle" id="password-toggle"
                            aria-label="Afficher le mot de passe">
                            <svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <svg class="eye-off-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" style="display: none;">
                                <path
                                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                                </path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="form-options">
                    <label class="checkbox-label">
                        <input type="checkbox" id="remember-me" name="remember">
                        <span>Se souvenir de moi</span>
                    </label>
                    <a href="{ROOT}forgot-password.html" class="forgot-link">Mot de passe oublié ?</a>
                </div>

                <div class="form-footer">
                    <button type="submit" class="btn btn-primary btn-large">Se connecter</button>
                    <p class="form-note">Pas encore de compte ? <a href="{ROOT}register.html" class="signup-link">Créer un
                            compte</a></p>
                </div>
            </form>

            <!-- Login Success Message -->
            <div class="success-message" id="login-success-message">
                <div class="success-icon">✓</div>
                <h3>Connexion réussie !</h3>
                <p>Bienvenue dans votre espace client.</p>
                <button class="btn btn-primary" id="login-success-close">Accéder au tableau de bord</button>
            </div>
        </div>
    </div>
"""

SOCIAL_LINKS = """
                    <div class="social-links">
                        <a href="https://instagram.com/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
                        <a href="https://linkedin.com/company/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</a>
                        <a href="https://behance.net/eqlixmediacretion" target="_blank" rel="noopener noreferrer" aria-label="Behance">BE</a>
                    </div>
"""

SCRIPTS_TEMPLATE = """
    <script src="{ROOT}api.js"></script>
    <script src="{ROOT}script.js"></script>
"""

import re

def replace_block(content, start_marker, end_marker, new_block):
    pattern = re.compile(re.escape(start_marker) + ".*?" + re.escape(end_marker), re.DOTALL)
    if pattern.search(content):
        return pattern.sub(new_block, content)
    return content

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            # Skip some files if necessary
            if "dashboard" in file or "client-space" in file:
                # These might have very different headers, let's skip for now or handle carefully
                pass
            
            rel_path = os.path.relpath(base_dir, root)
            root_prefix = "" if rel_path == "." else rel_path.replace("\\", "/") + "/"
            
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # 1. Unify Header
            header = HEADER_TEMPLATE.replace("{ROOT}", root_prefix)
            content = replace_block(content, '<header class="header"', '</header>', header)
            
            # 2. Unify Social Links in Footer
            content = replace_block(content, '<div class="social-links">', '</div>', SOCIAL_LINKS)
            
            # 3. Ensure Modals are present and unified
            # Remove old modals if they exist separately
            content = re.sub(r'<!-- Contact Modal -->.*?<!-- Footer -->', '<!-- Footer -->', content, flags=re.DOTALL)
            content = re.sub(r'<!-- Login Modal -->.*?</body>', '</body>', content, flags=re.DOTALL)
            
            # Insert unified modals before </body>
            modals = MODALS_TEMPLATE.replace("{ROOT}", root_prefix)
            scripts = SCRIPTS_TEMPLATE.replace("{ROOT}", root_prefix)
            
            # Remove existing script tags for script.js and api.js to avoid duplicates
            content = re.sub(r'<script src=".*?api\.js"></script>', '', content)
            content = re.sub(r'<script src=".*?script\.js"></script>', '', content)
            
            if "</body>" in content:
                content = content.replace("</body>", modals + scripts + "\n</body>")
            
            print(f"Unified {file_path}")
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
