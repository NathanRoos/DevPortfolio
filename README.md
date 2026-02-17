# Nathan Roos - Portfolio Demo

A sleek, modern portfolio website with dark theme and purple accents. Built with Next.js 15.

## 🎨 Design Features

- **Dark Theme**: Black background with purple/pink gradient accents
- **Glass Morphism**: Frosted glass effect cards
- **Smooth Animations**: Hover effects, button transitions, floating elements
- **Gradient Text**: Eye-catching purple-to-pink gradient headings
- **Responsive**: Works on all devices

## ✅ Features

### Public Pages
- Home with hero section and featured content
- Skills showcase with progress bars and categories
- Projects portfolio
- Work Experience, Education, Hobbies
- Contact form with success feedback
- Testimonials with submission form

### Admin Panel `/admin`
- Dashboard with real-time stats
- **Manage Skills** - Add/delete with proficiency levels
- **Manage Projects** - Full CRUD operations
- **Manage Testimonials** - Approve/reject workflow
- **View Messages** - Contact form submissions

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📁 Project Structure

```
portfolio-demo/
├── app/
│   ├── page.js                    # Home page
│   ├── skills/page.js             # Skills
│   ├── projects/page.js           # Projects
│   ├── contact/page.js            # Contact form
│   ├── testimonials/page.js       # Testimonials
│   └── admin/
│       ├── page.js                # Dashboard
│       ├── skills/page.js         # Manage skills
│       ├── projects/page.js       # Manage projects
│       ├── testimonials/page.js   # Approve testimonials
│       └── messages/page.js       # View messages
├── lib/
│   └── db.js                      # In-memory database
└── globals.css                    # Dark theme styles
```

## 🎨 Color Scheme

- **Background**: `#0a0a0f` to `#1a0a2e` (dark gradient)
- **Primary Purple**: `#8b5cf6`
- **Secondary Pink**: `#ec4899`
- **Text**: `#e5e7eb`
- **Muted**: `#9ca3af`

## 🔧 Tech Stack

- Next.js 15
- React 19
- Server Actions
- In-memory Database (demo)

## 📝 Customization

1. Update personal info in `lib/db.js`
2. Modify colors in `app/globals.css`
3. Replace demo data with your own

## 🔐 Authentication

Currently NO authentication - `/admin` is publicly accessible.  
For production, add NextAuth.js or similar.

## 🚀 Production Deployment

1. Replace in-memory DB with PostgreSQL
2. Add authentication
3. Deploy to Vercel/Netlify
4. Or containerize with Docker + Kubernetes

## 📄 License

MIT

---

**Built by Nathan Roos** | Full Stack Developer
