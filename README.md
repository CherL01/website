# Cherry Lian - Personal Portfolio Website

A professional, responsive personal website showcasing Yi (Cherry) Lian's work as a Robotics Engineer and Machine Learning Researcher, built with Next.js 15.3.4, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Data-driven architecture**: All content dynamically populated from structured JSON files
- **Interactive project showcase**: Advanced filtering system with search and technology filters
- **Academic publications system**: Expandable abstracts with DOI links and publication awards
- **Interactive journey map**: Visual timeline of academic and professional locations
- **Responsive design**: Mobile-first approach with elegant animations
- **Performance optimized**: Image optimization, lazy loading, and optimized bundle sizes
- **SEO optimized**: Individual metadata for each page with OpenGraph support

## 🔧 Tech Stack

- **Framework**: Next.js 15.3.4 with TypeScript
- **UI/Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Deployment**: Vercel-ready configuration
- **Data Management**: JSON files as single source of truth

## 📋 Pages Overview

### 🏠 Home (`/`)
**Hero Section**: Professional introduction with Cherry's photo, tagline, and primary CTA
**Featured Projects**: Dynamic grid showcasing highlighted projects from resume data
**Quick Navigation**: Direct access to all major sections

### 👩‍💼 About (`/about`)
**Interactive Timeline**: Chronological view combining education and work experience
**Skills Matrix**: 26+ technical skills as interactive, filterable tags
**Personal Bio**: Professional background highlighting robotics and ML expertise
**Download CV**: Direct link to resume PDF
**Contact Links**: Email, LinkedIn, and GitHub integration

### 🚀 Projects (`/projects`)
**Overview Page**: 
- Real-time search functionality
- Technology-based filtering dropdown
- Project cards with technology tags and metadata
- Links to detailed project pages

**Detail Pages** (`/projects/[slug]`):
- Dynamic routing with SEO-friendly URLs
- Hero banners with gradient backgrounds
- Comprehensive project information (features, challenges, results)
- Mock GitHub and research paper links
- Screenshots gallery (placeholder ready)
- Custom 404 handling

**Featured Projects**:
- **HINTeract**: Interactive Robot Learning Framework (Python, Robosuite, PyTorch)
- **SpooderMan**: Autonomous Robot Follower (ROS2, Python, OpenCV)

### 📚 Publications (`/publications`)
- Academic-style publication listing with year sorting
- Expandable abstracts with smooth animations
- Publication type filtering (Conference, Journal, Workshop)
- Color-coded badges for status and types
- Award recognition system (Best Presentation Award highlighted)
- DOI links to external papers
- Author name highlighting

**Publications Included**:
- ICRA 2025 PTAS Workshop (Best Presentation Award)
- APNET '23 Conference Paper
- IEEE Network Journal Paper

### 🗺️ Map (`/map`)
- Visual map of North America with coordinate-based positioning
- Interactive location markers (color-coded: blue for education, green for professional)
- Modal popups with detailed timeline information
- Location statistics dashboard
- Chronological timeline overview

**Locations Featured**:
- Toronto: University of Toronto (2019-2024)
- Markham: Huawei Canada (2022-2023)
- Atlanta: Georgia Tech (2024-Present)
- San Diego: Advanced Mechatronics Solutions (2025-Present)

### 📞 Contact (`/contact`)
- Primary email contact with pre-filled mailto templates
- Social media cards with hover effects
- Quick action buttons (Download Resume, Learn About Me)
- Professional response time expectations
- Elegant animations and smooth interactions

## 🎨 Design System

**Color Palette**:
- Primary: #FFDCDC (soft pink)
- Secondary: #FFF2EB (warm cream)
- Accent: #FFE8CD (light peach)
- Highlight: #FFD6BA (warm beige)

**Typography**:
- Clean, professional font hierarchy
- Optimized for readability across devices
- Consistent spacing and sizing

**Components**:
- Reusable card systems (`.card`, `.card-hover`)
- Button variants (`.btn-primary`, `.btn-secondary`)
- Interactive elements with smooth hover states
- Mobile-responsive navigation

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── about/             # About page with timeline and skills
│   ├── contact/           # Contact page with social links
│   ├── map/               # Interactive journey map
│   ├── projects/          # Projects overview and detail pages
│   │   └── [slug]/        # Dynamic project detail routes
│   ├── publications/      # Academic publications listing
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── Footer.tsx         # Site footer with social links
│   └── Navbar.tsx         # Main navigation component
└── data/                  # JSON data files
    ├── map.json           # Location data with coordinates
    ├── publications.json  # Academic papers and research
    └── resume.json        # Core resume data (106 lines)

public/
├── assets/               # Static assets
│   ├── Cherry.jpg        # Profile photo
│   └── Yi_Lian_Resume.pdf # Resume PDF
└── [icons]              # Next.js and Vercel icons
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
```

## 📊 Data Management

### JSON Data Files

**`resume.json`** (106 lines):
- Personal information and contact details
- Education history with GPAs and achievements
- Professional experience with detailed responsibilities
- Projects with technologies and descriptions
- Technical skills categorized by type
- Social media profiles

**`publications.json`**:
- Academic papers with full metadata
- DOI links and publication venues
- Abstracts and author information
- Awards and recognition

**`map.json`**:
- Geographic coordinates for each location
- Timeline data for education and work
- Achievement highlights for each position

## 🎯 Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Optimization**: Dynamic imports for client-side components
- **Animation Performance**: Framer Motion with `viewport={{ once: true }}`
- **SEO Optimization**: Individual metadata for each page
- **Mobile Performance**: Mobile-first responsive design

## 🔧 Technical Implementation

### Key Technologies Used:
- **Next.js 15.3.4**: Latest App Router with TypeScript
- **React 19**: Latest React features and optimizations
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth animations and transitions
- **TypeScript**: Full type safety throughout the application

### Notable Features:
- Dynamic routing with slug-based project pages
- Real-time search and filtering functionality
- Interactive map with coordinate-based positioning
- Expandable content sections with smooth animations
- Mobile-responsive navigation with hamburger menu
- Form handling with mailto integration

## 🌐 Deployment

The website is configured for Vercel deployment with:
- `vercel.json` configuration file
- Optimized build settings
- Automatic deployments from Git
- Performance monitoring ready

## 🏆 Achievements

- ✅ 6 fully functional pages implemented
- ✅ Complete responsive design system
- ✅ Interactive filtering and search functionality
- ✅ Professional academic publication system
- ✅ Dynamic project showcase with detail pages
- ✅ Interactive journey map with location data
- ✅ Professional contact system with social integration
- ✅ SEO optimization and performance features
- ✅ Zero build errors and fully functional website

---

*This website showcases Cherry's impressive journey from University of Toronto through her current MS at Georgia Tech, highlighting her expertise in robotics, machine learning, and her professional roles at Huawei Canada and Advanced Mechatronics Solutions. Built with elegant, maintainable code that prioritizes performance and user experience.*
