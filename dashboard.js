// ===================================
// EQLIX DASHBOARD - JavaScript
// Premium Client Dashboard Functionality
// ===================================

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initUserMenu();
    initNavigation();
    loadDashboardContent();
});

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });
    }
}

// User Menu Dropdown
function initUserMenu() {
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userMenu = document.querySelector('.user-menu');

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });
    }
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Get the section to load
            const section = this.getAttribute('href').substring(1);
            loadSection(section);
        });
    });
}

// Load Dashboard Content
function loadDashboardContent() {
    const dashboardContent = document.getElementById('dashboard-content');

    if (dashboardContent) {
        dashboardContent.innerHTML = getOverviewContent();
    }
}

// Load Different Sections
function loadSection(section) {
    const dashboardContent = document.getElementById('dashboard-content');

    if (!dashboardContent) return;

    switch (section) {
        case 'overview':
            dashboardContent.innerHTML = getOverviewContent();
            break;
        case 'projects':
            dashboardContent.innerHTML = getProjectsContent();
            break;
        case 'files':
            dashboardContent.innerHTML = getFilesContent();
            break;
        case 'messages':
            dashboardContent.innerHTML = getMessagesContent();
            break;
        case 'invoices':
            dashboardContent.innerHTML = getInvoicesContent();
            break;
        default:
            dashboardContent.innerHTML = getOverviewContent();
    }
}

// Overview Content
function getOverviewContent() {
    return `
        <div class="dashboard-welcome">
            <h1>Bienvenue, Jean Dupont 👋</h1>
            <p>Voici un aperçu de vos projets et activités récentes</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon" style="background: var(--gradient-primary);">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div class="stat-trend up">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        </svg>
                        +12%
                    </div>
                </div>
                <div class="stat-value">4</div>
                <div class="stat-label">Projets Actifs</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon" style="background: var(--gradient-success);">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <div class="stat-trend up">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        </svg>
                        +8%
                    </div>
                </div>
                <div class="stat-value">12</div>
                <div class="stat-label">Projets Terminés</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon" style="background: var(--gradient-info);">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div class="stat-trend up">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        </svg>
                        +2
                    </div>
                </div>
                <div class="stat-value">2</div>
                <div class="stat-label">Nouveaux Messages</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon" style="background: var(--gradient-warning);">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                            <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                    </div>
                    <div class="stat-trend down">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                        </svg>
                        -1
                    </div>
                </div>
                <div class="stat-value">3</div>
                <div class="stat-label">Factures en Attente</div>
            </div>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Projets Récents</h2>
            <button class="btn-secondary" onclick="loadSection('projects')">Voir Tout</button>
        </div>
        
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-thumbnail" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div class="project-status in-progress">En Cours</div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">Refonte Site Web</h3>
                    <p class="project-description">Modernisation complète de votre site web avec un design responsive et optimisé.</p>
                    <div class="project-meta">
                        <div class="project-date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            15 Jan 2026
                        </div>
                        <div class="project-progress">65%</div>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-thumbnail" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <div class="project-status in-progress">En Cours</div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">Campagne Marketing</h3>
                    <p class="project-description">Création de visuels pour votre campagne publicitaire sur les réseaux sociaux.</p>
                    <div class="project-meta">
                        <div class="project-date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            10 Jan 2026
                        </div>
                        <div class="project-progress">80%</div>
                    </div>
                </div>
            </div>
            
            <div class="project-card">
                <div class="project-thumbnail" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <div class="project-status pending">En Attente</div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">Logo & Identité Visuelle</h3>
                    <p class="project-description">Développement de votre nouvelle identité de marque et charte graphique.</p>
                    <div class="project-meta">
                        <div class="project-date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            5 Jan 2026
                        </div>
                        <div class="project-progress">25%</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Activité Récente</h2>
        </div>
        
        <div class="activity-section">
            <div class="activity-timeline">
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Nouveau fichier ajouté au projet "Refonte Site Web"</div>
                        <div class="activity-time">Il y a 2 heures</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Message reçu de l'équipe EQLIX</div>
                        <div class="activity-time">Il y a 5 heures</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Projet "Campagne Marketing" mis à jour (80%)</div>
                        <div class="activity-time">Hier à 14:30</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Facture #2026-001 générée</div>
                        <div class="activity-time">Il y a 2 jours</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="quick-actions">
            <div class="action-card" onclick="openContactModal()">
                <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
                <div class="action-title">Nouveau Projet</div>
            </div>
            <div class="action-card">
                <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                </div>
                <div class="action-title">Télécharger Fichier</div>
            </div>
            <div class="action-card">
                <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div class="action-title">Envoyer Message</div>
            </div>
            <div class="action-card">
                <div class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                </div>
                <div class="action-title">Voir Factures</div>
            </div>
        </div>
    `;
}

// Projects Content
function getProjectsContent() {
    return `
        <div class="dashboard-welcome">
            <h1>Mes Projets</h1>
            <p>Gérez tous vos projets en cours et terminés</p>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Tous les Projets</h2>
            <button class="btn-primary" onclick="openContactModal()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Nouveau Projet
            </button>
        </div>
        
        <div class="projects-grid">
            ${generateProjectCards()}
        </div>
    `;
}

// Generate Project Cards
function generateProjectCards() {
    const projects = [
        { title: 'Refonte Site Web', description: 'Modernisation complète de votre site web avec un design responsive et optimisé.', status: 'in-progress', progress: '65%', date: '15 Jan 2026', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { title: 'Campagne Marketing', description: 'Création de visuels pour votre campagne publicitaire sur les réseaux sociaux.', status: 'in-progress', progress: '80%', date: '10 Jan 2026', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { title: 'Logo & Identité Visuelle', description: 'Développement de votre nouvelle identité de marque et charte graphique.', status: 'pending', progress: '25%', date: '5 Jan 2026', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { title: 'Shooting Photo Produits', description: 'Séance photo professionnelle de vos produits pour votre catalogue.', status: 'completed', progress: '100%', date: '28 Déc 2025', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { title: 'Brochure Commerciale', description: 'Design et impression de votre brochure commerciale premium.', status: 'completed', progress: '100%', date: '20 Déc 2025', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { title: 'Vidéo Promotionnelle', description: 'Création d\'une vidéo promotionnelle pour vos réseaux sociaux.', status: 'in-progress', progress: '45%', date: '12 Jan 2026', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }
    ];

    const statusLabels = {
        'in-progress': 'En Cours',
        'completed': 'Terminé',
        'pending': 'En Attente'
    };

    return projects.map(project => `
        <div class="project-card">
            <div class="project-thumbnail" style="background: ${project.gradient};">
                <div class="project-status ${project.status}">${statusLabels[project.status]}</div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <div class="project-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${project.date}
                    </div>
                    <div class="project-progress">${project.progress}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Files Content
function getFilesContent() {
    return `
        <div class="dashboard-welcome">
            <h1>Mes Fichiers</h1>
            <p>Accédez à tous vos fichiers et documents</p>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Documents Récents</h2>
            <button class="btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Télécharger Fichier
            </button>
        </div>
        
        <div class="activity-section">
            <div style="text-align: center; padding: 60px 20px;">
                <div style="width: 120px; height: 120px; margin: 0 auto 24px; background: var(--gradient-primary); border-radius: 24px; display: flex; align-items: center; justify-content: center;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width: 60px; height: 60px;">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <h3 style="font-size: 24px; font-weight: 700; color: var(--dashboard-text); margin-bottom: 12px;">Aucun fichier pour le moment</h3>
                <p style="color: var(--dashboard-text-light); margin-bottom: 24px;">Vos fichiers de projets apparaîtront ici</p>
            </div>
        </div>
    `;
}

// Messages Content
function getMessagesContent() {
    return `
        <div class="dashboard-welcome">
            <h1>Messages</h1>
            <p>Communiquez avec l'équipe EQLIX</p>
        </div>
        
        <div class="activity-section">
            <div style="text-align: center; padding: 60px 20px;">
                <div style="width: 120px; height: 120px; margin: 0 auto 24px; background: var(--gradient-info); border-radius: 24px; display: flex; align-items: center; justify-content: center;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width: 60px; height: 60px;">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <h3 style="font-size: 24px; font-weight: 700; color: var(--dashboard-text); margin-bottom: 12px;">Messagerie en cours de développement</h3>
                <p style="color: var(--dashboard-text-light); margin-bottom: 24px;">Cette fonctionnalité sera bientôt disponible</p>
                <button class="btn-primary" onclick="openContactModal()">Nous Contacter</button>
            </div>
        </div>
    `;
}

// Invoices Content
function getInvoicesContent() {
    return `
        <div class="dashboard-welcome">
            <h1>Factures</h1>
            <p>Consultez et téléchargez vos factures</p>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Factures Récentes</h2>
        </div>
        
        <div class="activity-section">
            <div style="text-align: center; padding: 60px 20px;">
                <div style="width: 120px; height: 120px; margin: 0 auto 24px; background: var(--gradient-warning); border-radius: 24px; display: flex; align-items: center; justify-content: center;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width: 60px; height: 60px;">
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                </div>
                <h3 style="font-size: 24px; font-weight: 700; color: var(--dashboard-text); margin-bottom: 12px;">Aucune facture disponible</h3>
                <p style="color: var(--dashboard-text-light); margin-bottom: 24px;">Vos factures apparaîtront ici une fois générées</p>
            </div>
        </div>
    `;
}

// Open Contact Modal (from main script.js)
function openContactModal() {
    if (typeof window.openContactModal === 'function') {
        window.openContactModal();
    } else {
        alert('Pour démarrer un nouveau projet, veuillez nous contacter via le formulaire de contact.');
    }
}
