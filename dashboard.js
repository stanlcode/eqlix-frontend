// ===================================
// EQLIX DASHBOARD - JavaScript
// Premium Client Dashboard Functionality
// ===================================

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function () {
    // Check Auth
    console.log('Dashboard: Checking Authentication...');
    if (!window.API) {
        console.error('API not loaded! Redirecting...');
        window.location.href = 'index.html';
        return;
    }

    if (!window.API.user.isAuthenticated()) {
        console.warn('User not authenticated. Redirecting to home.');
        window.location.href = 'index.html';
        return;
    }
    console.log('Dashboard: Access Granted.');

    // initDarkMode(); // Handled by global script.js
    initUserMenu();
    initNavigation();
    loadDashboardContent();
});

// Dark Mode managed by global script.js
/*
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
*/

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

    initSidebarToggle();
}

// Sidebar Toggle (Mobile)
function initSidebarToggle() {
    const toggleBtns = document.querySelectorAll('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.querySelector('.dashboard-overlay') || createOverlay();

    // Close sidebar function
    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    };

    if (toggleBtns.length > 0 && sidebar) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
        });

        // Close when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        // Close when clicking a nav item (on mobile)
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
    }
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'dashboard-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        navItems.forEach(item => {
            item.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Only intercept local hash links (for SPA behavior on dashboard)
                if (href.startsWith('#')) {
                    e.preventDefault();

                    // Remove active class from all items
                    navItems.forEach(nav => nav.classList.remove('active'));

                    // Add active class to clicked item
                    this.classList.add('active');

                    // Get the section to load
                    const section = href.substring(1);
                    loadSection(section);
                }
                // Otherwise allow default navigation (e.g. from Profile -> Dashboard)
            });
        });
    });
}

// Load Dashboard Content
function loadDashboardContent() {
    const dashboardContent = document.getElementById('dashboard-content');

    // Check if we are on the profile page by checking if dashboardContent has pre-existing content 
    // AND if the URL explicitly says profile.html
    const isProfilePage = window.location.pathname.includes('profile.html');

    if (dashboardContent && !isProfilePage) {
        // Handle Hash Navigation on Load
        const hash = window.location.hash.substring(1); // Remove #
        if (hash) {
            loadSection(hash);
            // Update active state in sidebar
            const activeLink = document.querySelector(`.nav-item[href="#${hash}"]`);
            if (activeLink) {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                activeLink.classList.add('active');
            }
        } else {
            dashboardContent.innerHTML = getOverviewContent();
        }
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
        <button class="sidebar-toggle-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            Menu
        </button>
        <div class="dashboard-welcome">
            <h1>Bienvenue, Jean Dupont 👋</h1>
            <p>Voici un aper&ccedil;u de vos projets et activit&eacute;s r&eacute;centes</p>
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
                <div class="stat-label">Projets Termin&eacute;s</div>
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
            <h2 class="section-title">Projets R&eacute;cents</h2>
            <button class="btn-secondary" onclick="loadSection('projects')">Voir Tout</button>
        </div>
        
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-thumbnail" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div class="project-status in-progress">En Cours</div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">Refonte Site Web</h3>
                    <p class="project-description">Modernisation compl&egrave;te de votre site web avec un design responsive et optimis&eacute;.</p>
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
                    <p class="project-description">Cr&eacute;ation de visuels pour votre campagne publicitaire sur les r&eacute;seaux sociaux.</p>
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
                    <h3 class="project-title">Logo & Identit&eacute; Visuelle</h3>
                    <p class="project-description">D&eacute;veloppement de votre nouvelle identit&eacute; de marque et charte graphique.</p>
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
            <h2 class="section-title">Activit&eacute; R&eacute;cente</h2>
        </div>
        
        <div class="activity-section">
            <div class="activity-timeline">
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Nouveau fichier ajout&eacute; au projet "Refonte Site Web"</div>
                        <div class="activity-time">Il y a 2 heures</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Message re&ccedil;u de l'&eacute;quipe EQLIX</div>
                        <div class="activity-time">Il y a 5 heures</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Projet "Campagne Marketing" mis &agrave; jour (80%)</div>
                        <div class="activity-time">Hier &agrave; 14:30</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">Facture #2026-001 g&eacute;n&eacute;r&eacute;e</div>
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
                <div class="action-title">T&eacute;l&eacute;charger Fichier</div>
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
            <p>G&eacute;rez tous vos projets en cours et termin&eacute;s</p>
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
        { title: 'Refonte Site Web', description: 'Modernisation compl&egrave;te de votre site web avec un design responsive et optimis&eacute;.', status: 'in-progress', progress: '65%', date: '15 Jan 2026', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { title: 'Campagne Marketing', description: 'Cr&eacute;ation de visuels pour votre campagne publicitaire sur les r&eacute;seaux sociaux.', status: 'in-progress', progress: '80%', date: '10 Jan 2026', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { title: 'Logo & Identit&eacute; Visuelle', description: 'D&eacute;veloppement de votre nouvelle identit&eacute; de marque et charte graphique.', status: 'pending', progress: '25%', date: '5 Jan 2026', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { title: 'Shooting Photo Produits', description: 'S&eacute;ance photo professionnelle de vos produits pour votre catalogue.', status: 'completed', progress: '100%', date: '28 D&eacute;c 2025', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { title: 'Brochure Commerciale', description: 'Design et impression de votre brochure commerciale premium.', status: 'completed', progress: '100%', date: '20 D&eacute;c 2025', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { title: 'Vid&eacute;o Promotionnelle', description: 'Cr&eacute;ation d\'une vid&eacute;o promotionnelle pour vos r&eacute;seaux sociaux.', status: 'in-progress', progress: '45%', date: '12 Jan 2026', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }
    ];

    const statusLabels = {
        'in-progress': 'En Cours',
        'completed': 'Termin&eacute;',
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
    const files = [
        { name: 'Cahier_Des_Charges_V2.pdf', type: 'pdf', date: '15 Jan 2026', size: '2.4 MB' },
        { name: 'Maquette_Homepage_V3.fig', type: 'figma', date: '12 Jan 2026', size: '15 MB' },
        { name: 'Contrat_Prestation_Signe.pdf', type: 'pdf', date: '05 Jan 2026', size: '1.2 MB' },
        { name: 'Assets_Logos.zip', type: 'zip', date: '02 Jan 2026', size: '45 MB' },
        { name: 'Brief_Creatif_Marketing.docx', type: 'doc', date: '28 Dec 2025', size: '850 KB' }
    ];

    return `
        <div class="dashboard-welcome">
            <h1>Mes Fichiers</h1>
            <p>Acc&eacute;dez &agrave; tous vos fichiers et documents de projet</p>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Documents R&eacute;cents</h2>
            <button class="btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Ajouter un fichier
            </button>
        </div>
        
        <div class="files-list">
            ${files.map(file => `
            <div class="file-item" style="display: flex; align-items: center; padding: 16px; background: var(--dashboard-card-bg); border: 1px solid var(--dashboard-border); border-radius: 12px; margin-bottom: 12px; transition: transform 0.2s;">
                <div class="file-icon" style="width: 48px; height: 48px; background: var(--gray-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px; color: var(--primary-pink);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                </div>
                <div class="file-info" style="flex: 1;">
                    <h4 style="margin: 0 0 4px 0; color: var(--dashboard-text); font-size: 16px; font-weight: 600;">${file.name}</h4>
                    <p style="margin: 0; color: var(--dashboard-text-light); font-size: 13px;">${file.date} • ${file.size}</p>
                </div>
                <button class="btn-icon" style="background: none; border: none; cursor: pointer; color: var(--dashboard-text-light);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                </button>
            </div>
            `).join('')}
        </div>
    `;
}

// Messages Content
function getMessagesContent() {
    const messages = [
        { sender: 'Équipe Design', subject: 'Validation Maquette V3', preview: 'Bonjour Jean, voici la dernière version de la maquette pour validation...', date: '10:30', unread: true },
        { sender: 'Service Comptabilité', subject: 'Facture #2026-001 Disponible', preview: 'Votre facture pour le projet Refonte Site Web est disponible...', date: 'Hier', unread: true },
        { sender: 'Marc (Dev)', subject: 'Point d\'avancement Hebdo', preview: 'Le développement avance bien, nous avons terminé l\'intégration...', date: 'Lun', unread: false },
        { sender: 'Sarah (Chef de Projet)', subject: 'Kickoff Meeting', preview: 'Merci pour ce lancement de projet très productif...', date: '05 Jan', unread: false }
    ];

    return `
        <div class="dashboard-welcome">
            <h1>Messages</h1>
            <p>Communiquez avec l'&eacute;quipe EQLIX</p>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Boîte de Réception</h2>
            <button class="btn-primary" onclick="openContactModal()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Nouveau Message
            </button>
        </div>
        
        <div class="messages-list">
            ${messages.map(msg => `
            <div class="message-card ${msg.unread ? 'unread' : ''}" style="background: var(--dashboard-card-bg); padding: 20px; border-radius: 12px; border: 1px solid ${msg.unread ? 'var(--primary-pink)' : 'var(--dashboard-border)'}; margin-bottom: 12px; display: flex; gap: 16px; cursor: pointer; transition: all 0.2s;">
                <div class="message-avatar" style="width: 40px; height: 40px; background: ${msg.unread ? 'var(--gradient-primary)' : 'var(--gray-medium)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">
                    ${msg.sender[0]}
                </div>
                <div class="message-content" style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <h4 style="margin: 0; color: var(--dashboard-text); font-weight: 700;">${msg.sender}</h4>
                        <span style="font-size: 12px; color: var(--dashboard-text-light);">${msg.date}</span>
                    </div>
                    <div style="font-weight: 600; color: var(--dashboard-text); margin-bottom: 4px;">${msg.subject}</div>
                    <p style="margin: 0; color: var(--dashboard-text-light); font-size: 14px; line-height: 1.4;">${msg.preview}</p>
                </div>
            </div>
            `).join('')}
        </div>
    `;
}

// Invoices Content
function getInvoicesContent() {
    const invoices = [
        { id: 'FAC-2026-001', project: 'Refonte Site Web (Acompte)', amount: '1 500 €', date: '15 Jan 2026', status: 'paid' },
        { id: 'FAC-2026-002', project: 'Campagne Marketing', amount: '850 €', date: '20 Jan 2026', status: 'pending' },
        { id: 'FAC-2025-089', project: 'Shooting Photo', amount: '450 €', date: '20 Dec 2025', status: 'paid' }
    ];

    return `
        <div class="dashboard-welcome">
            <h1>Factures</h1>
            <p>Consultez l'historique de vos paiements</p>
        </div>
        
        <div class="section-header">
            <h2 class="section-title">Historique</h2>
        </div>
        
        <div class="invoices-table-container" style="background: var(--dashboard-card-bg); border-radius: 16px; border: 1px solid var(--dashboard-border); overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--gray-light); text-align: left;">
                        <th style="padding: 16px 24px; color: var(--dashboard-text-light); font-weight: 600; font-size: 13px; text-transform: uppercase;">Numéro</th>
                        <th style="padding: 16px 24px; color: var(--dashboard-text-light); font-weight: 600; font-size: 13px; text-transform: uppercase;">Projet</th>
                        <th style="padding: 16px 24px; color: var(--dashboard-text-light); font-weight: 600; font-size: 13px; text-transform: uppercase;">Date</th>
                        <th style="padding: 16px 24px; color: var(--dashboard-text-light); font-weight: 600; font-size: 13px; text-transform: uppercase;">Montant</th>
                        <th style="padding: 16px 24px; color: var(--dashboard-text-light); font-weight: 600; font-size: 13px; text-transform: uppercase;">Statut</th>
                        <th style="padding: 16px 24px;"></th>
                    </tr>
                </thead>
                <tbody>
                    ${invoices.map(inv => `
                    <tr style="border-bottom: 1px solid var(--dashboard-border);">
                        <td style="padding: 16px 24px; color: var(--dashboard-text); font-weight: 600;">${inv.id}</td>
                        <td style="padding: 16px 24px; color: var(--dashboard-text);">${inv.project}</td>
                        <td style="padding: 16px 24px; color: var(--dashboard-text-light);">${inv.date}</td>
                        <td style="padding: 16px 24px; color: var(--dashboard-text); font-weight: 700;">${inv.amount}</td>
                        <td style="padding: 16px 24px;">
                            <span style="padding: 4px 12px; border-radius: 50px; font-size: 12px; font-weight: 600; background: ${inv.status === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; color: ${inv.status === 'paid' ? '#10b981' : '#f59e0b'};">
                                ${inv.status === 'paid' ? 'Payée' : 'En Attente'}
                            </span>
                        </td>
                        <td style="padding: 16px 24px; text-align: right;">
                            <button style="background: none; border: none; cursor: pointer; color: var(--primary-pink);">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                        </td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}


