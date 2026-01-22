# EQLIX MEDIA CREATION - Frontend

Professional website for EQLIX MEDIA CREATION, a creative agency specializing in branding, photography, graphic design, and printing services.

## 🌐 Live Site

- **Frontend**: [Your Render URL here]
- **Backend API**: [Your Backend Render URL here]

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful UI
- **Dark Mode**: Toggle between light and dark themes
- **Client Portal**: Secure login and dashboard for clients
- **Contact Form**: Integrated with backend API for email notifications
- **Service Pages**: Detailed information about services (Branding, Photography, Design, Printing)
- **Portfolio**: Showcase of completed projects
- **Testimonials**: Client reviews and ratings
- **FAQ**: Frequently asked questions

## 📁 Project Structure

```
EQX SITE/
├── index.html              # Homepage
├── about.html              # About page
├── contact.html            # Contact page
├── portfolio.html          # Portfolio showcase
├── pricing.html            # Pricing information
├── testimonials.html       # Client testimonials
├── faq.html               # FAQ page
├── client-space.html      # Client login/register
├── dashboard.html         # Client dashboard
├── services/              # Service pages
│   ├── identite.html      # Branding services
│   ├── photo.html         # Photography services
│   ├── design.html        # Design services
│   └── impression.html    # Printing services
├── legal/                 # Legal pages
│   ├── mentions.html      # Legal notices
│   ├── privacy.html       # Privacy policy
│   ├── terms.html         # Terms of service
│   └── cookies.html       # Cookie policy
├── images/                # Image assets
├── style.css              # Main stylesheet
├── darkmode.css           # Dark mode styles
├── modal.css              # Modal styles
├── dashboard.css          # Dashboard styles
├── script.js              # Main JavaScript
├── api.js                 # API configuration
├── client-space.js        # Client space functionality
├── dashboard.js           # Dashboard functionality
└── testimonials.js        # Testimonials functionality
```

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No frameworks, pure JS
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)

## 🔧 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/stanlcode/eqlix-frontend.git
   cd eqlix-frontend
   ```

2. Open with a local server:
   - Using VS Code: Install "Live Server" extension and click "Go Live"
   - Using Python: `python -m http.server 5500`
   - Using Node: `npx http-server -p 5500`

3. Open browser to `http://localhost:5500`

## 🌍 Deployment

This site is deployed on Render.com as a static site.

For deployment instructions, see [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

## 📝 Environment Configuration

The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:5000/api` for backend
- **Production**: Uses deployed backend URL on Render

## 🔐 Backend Integration

The frontend connects to the EQLIX backend API for:
- User authentication (register, login, logout)
- Contact form submissions
- Client dashboard data
- File uploads (future feature)

Backend repository: [https://github.com/stanlcode/eqlix-backend](https://github.com/stanlcode/eqlix-backend)

## 📄 License

© 2026 EQLIX MEDIA CREATION. All rights reserved.

## 📞 Contact

- **Email**: contact@eqlix.com
- **Website**: [Your domain here]
