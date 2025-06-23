# Cherry Lian - Personal Portfolio Website

A professional, responsive personal website showcasing Yi (Cherry) Lian's work as a Robotics Engineer and Machine Learning Researcher, built with Next.js 15.3.4, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Interactive Global Map**: Professional Mapbox-powered journey visualization with timeline sync
- **Dark/Light Mode**: Comprehensive theme system with automatic detection and manual toggle
- **Data-driven architecture**: All content dynamically populated from structured JSON files
- **Interactive project showcase**: Advanced filtering system with search and technology filters
- **Academic publications system**: Expandable abstracts with DOI links, hover interactions, and comprehensive search
- **Resume Modal**: In-browser PDF viewer with download and external link options
- **Responsive design**: Mobile-first approach with elegant animations
- **Performance optimized**: Image optimization, lazy loading, and optimized bundle sizes (22.2kB map page)
- **SEO optimized**: Individual metadata for each page with OpenGraph support
- **Type-safe**: Full TypeScript implementation with Zod runtime validation

## 🔧 Tech Stack

- **Framework**: Next.js 15.3.4 with TypeScript
- **UI/Styling**: Tailwind CSS with custom design system and CSS custom properties
- **Theme Management**: React Context with localStorage persistence
- **Maps**: Mapbox GL JS v3 via react-map-gl v8.0.4
- **Animations**: Framer Motion for smooth interactions and transitions
- **Validation**: Zod for runtime type checking
- **State Management**: React Context with useReducer pattern
- **Deployment**: Vercel-ready configuration
- **Data Management**: JSON files as single source of truth

## 📋 Pages Overview

### 🏠 Home (`/`)
**Hero Section**: Professional introduction with Cherry's photo, tagline, and primary CTA
**Featured Projects**: Dynamic grid showcasing highlighted projects from resume data with clickable navigation
**Resume Modal**: "View Resume" button opens in-browser PDF viewer with download options
**Quick Navigation**: Direct access to all major sections

### 👩‍💼 About (`/about`)
**Interactive Timeline**: Chronological view combining education and work experience with pop-up animations
**Skills Matrix**: 26+ technical skills as interactive, filterable tags
**Personal Bio**: Professional background highlighting robotics and ML expertise
**Contact Links**: Email, LinkedIn, and GitHub integration

### 🚀 Projects (`/projects`)
**Overview Page**: 
- Real-time search functionality with black text for readability
- Technology-based filtering dropdown with improved visibility
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
- **Hover-based abstract expansion** with smooth animations and bottom-centered arrows
- **Comprehensive search**: Searches across titles, authors, abstracts, keywords, and venues
- **Triple filtering system**: Publication type, status, and keyword/tag filters
- Color-coded badges for status and types
- Award recognition system (Best Presentation Award highlighted)
- DOI links to external papers
- Author name highlighting
- Improved text readability with black search/filter text

**Publications Included**:
- ICRA 2025 PTAS Workshop (Best Presentation Award)
- APNET '23 Conference Paper
- IEEE Network Journal Paper

### 🗺️ Interactive Map (`/map`) - **FULLY IMPLEMENTED**

**🌍 Global Professional Journey Visualization**

A sophisticated, interactive world map showcasing Cherry's academic and professional journey using Mapbox GL JS. Built with performance and user experience as top priorities.

#### Core Features:
- **Global Coverage**: Interactive world map supporting locations worldwide
- **Smart Markers**: Color-coded location markers with entry counts and hover effects (removed grey circular rings)
- **Rich Location Details**: Modal popups with comprehensive information and properly aligned bullet points
- **Timeline Integration**: Two-column layout with bidirectional synchronization and aligned bullet points
- **Advanced Filtering**: Filter by All, Education, Work, Conference, Travel
- **Performance Optimized**: 22.2kB bundle size with dynamic imports
- **Collapsible Experience Distribution**: Stats converted to dropdown with animated chevron

#### Interactive Components:
- **Map View (2/3 width)**:
  - Mapbox GL JS integration with graceful token validation
  - Color-coded markers: 🎓 Education (blue), 💼 Work (green), 📋 Conference (orange), ✈️ Travel (purple)
  - Clean hover effects without visual artifacts
  - Entry count badges on markers
  - Smart zoom controls (max zoom: 10)

- **Timeline Panel (1/3 width)**:
  - Chronological timeline with all location entries
  - Click timeline items to select map markers
  - Hover timeline items to highlight map markers
  - Smooth scrolling and animations with proper bullet alignment
  - Entry type icons and duration information

#### Data Structure:
**Migrated from flat to city-grouped format with GeoJSON coordinates:**
```json
{
  "city": "Toronto",
  "country": "Canada", 
  "coordinates": [-79.3832, 43.6532], // [lng, lat] GeoJSON format
  "entries": [{
    "id": "uoft-undergrad",
    "type": "education",
    "institution": "University of Toronto",
    "role": "Bachelor of Applied Science",
    "duration": "Sep 2019 - Apr 2024",
    "photos": [],
    "links": [{"label": "University Website", "url": "https://utoronto.ca"}],
    "achievements": ["Mechanical Engineering degree", "Focus on AI and Robotics"]
  }]
}
```

#### Technical Implementation:
- **MapboxMap.tsx**: Core map component with error handling and performance optimizations
- **MarkerLayer.tsx**: Smart marker rendering with React.memo optimization
- **LocationModal.tsx**: Rich content display with links, photos, and properly aligned achievements
- **TimelinePanel.tsx**: Chronological timeline with bidirectional sync and fixed bullet alignment
- **MapContext.tsx**: Centralized state management using useReducer
- **useMapData.ts**: Data loading and Zod validation

#### Locations Featured:
- **Toronto, Canada**: University of Toronto (Education, 2019-2024)
- **Markham, Canada**: Huawei Canada (Work, 2022-2023)  
- **Atlanta, USA**: Georgia Tech (Education, 2024-Present)
- **San Diego, USA**: Advanced Mechatronics Solutions (Work, 2025-Present)

#### Performance Features:
- React.memo for expensive components
- useCallback for event handlers
- useMemo for filtering operations
- Dynamic imports for heavy components
- Mapbox token validation with graceful fallbacks

### 📞 Contact (`/contact`)
- Primary email contact with pre-filled mailto templates
- Social media cards with hover effects
- Quick action buttons (View Resume, Learn About Me)
- Professional response time expectations
- Elegant animations and smooth interactions

## 🎨 Design System & Theme

**Dark/Light Mode System**:
- Comprehensive theme system using CSS custom properties
- ThemeContext with localStorage persistence
- Automatic system preference detection
- Animated theme toggle with sun/moon icons
- All components support both themes

**Color Palette**:
- **Light Mode**: 
  - Primary: #FFDCDC (soft pink)
  - Secondary: #FFF2EB (warm cream)
  - Accent: #FFE8CD (light peach)
  - Highlight: #FFD6BA (warm beige)
- **Dark Mode**: 
  - Sophisticated dark theme with proper contrast ratios
  - Maintains brand colors while ensuring readability

**Typography**:
- Clean, professional font hierarchy
- Optimized for readability across devices and themes
- Consistent spacing and sizing

**Components**:
- Reusable card systems (`.card`, `.card-hover`)
- Button variants (`.btn-primary`, `.btn-secondary`)
- Interactive elements with smooth hover states
- Mobile-responsive navigation with theme toggle

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15+ App Router
│   ├── about/             # About page with timeline and skills
│   ├── contact/           # Contact page with social links
│   ├── map/               # Interactive Mapbox journey map ⭐
│   │   ├── layout.tsx     # Map-specific layout
│   │   └── page.tsx       # Map page with two-column layout
│   ├── projects/          # Projects overview and detail pages
│   │   └── [slug]/        # Dynamic project detail routes
│   ├── publications/      # Academic publications listing
│   ├── globals.css        # Global styles and CSS custom properties
│   ├── layout.tsx         # Root layout with navigation and theme
│   └── page.tsx           # Home page with resume modal
├── components/            # Reusable UI components
│   ├── map/              # Map-specific components ⭐
│   │   ├── LocationModal.tsx    # Rich location details modal
│   │   ├── MapboxMap.tsx        # Core Mapbox GL integration
│   │   ├── MarkerLayer.tsx      # Smart marker rendering
│   │   └── TimelinePanel.tsx    # Chronological timeline
│   ├── Footer.tsx         # Site footer with typing animation
│   ├── Navbar.tsx         # Main navigation with theme toggle
│   ├── ResumeModal.tsx    # PDF viewer modal component
│   └── ThemeToggle.tsx    # Dark/light mode toggle
├── contexts/             # React Context providers ⭐
│   ├── MapContext.tsx    # Map state management with useReducer
│   └── ThemeContext.tsx  # Theme management with persistence
├── data/                 # JSON data files
│   ├── map.json          # Location data with GeoJSON coordinates ⭐
│   ├── publications.json # Academic papers and research
│   └── resume.json       # Core resume data (106 lines)
├── hooks/                # Custom React hooks ⭐
│   └── useMapData.ts     # Map data loading and validation
├── types/                # TypeScript type definitions
│   └── map.ts            # Map-related type definitions
└── utils/                # Utility functions
    └── clustering.ts     # Map clustering utilities
```

## 🚀 Recent Updates

### UI/UX Improvements
- **Navbar Enhancement**: Conditional text color with white text and drop shadow when not scrolled
- **Resume Integration**: Changed from download to view modal with PDF viewer
- **Footer Reordering**: Updated social media icon order (Email → LinkedIn → GitHub → Old Portfolio)
- **Footer Animation**: Added typing animation cycling between build info and last updated date
- **Publications UX**: Converted to hover-based abstract expansion with improved arrow positioning
- **Search/Filter Visibility**: Changed text colors to black for better readability
- **Map UI Fixes**: Removed grey circular hover artifacts and fixed bullet point alignment

### New Features
- **Dark/Light Mode**: Complete theme system with toggle, persistence, and system detection
- **Resume Modal**: In-browser PDF viewing with download and external link options
- **Enhanced Search**: Publications now searchable across all fields (title, author, abstract, keywords, venue)
- **Advanced Filtering**: Added keyword/tag filter as third filter option on publications page
- **Clickable Featured Projects**: Home page project cards now link to detail pages
- **Experience Distribution Dropdown**: Converted stats bar to collapsible component with animation

### Performance & Accessibility
- **Theme Persistence**: localStorage integration with system preference fallback
- **Animation Optimization**: Smooth transitions using Framer Motion
- **Component Optimization**: React.memo, useCallback, and useMemo implementations
- **Accessibility**: Proper ARIA attributes and keyboard navigation support
- **Build Optimization**: Zero ESLint and TypeScript errors for clean deployment

## 📈 Performance Metrics

- **Map Page Bundle**: 22.2kB (optimized)
- **Core Web Vitals**: Optimized for performance
- **Accessibility Score**: WCAG compliant
- **SEO Score**: Optimized metadata and structure
- **Theme Switching**: <100ms transition time
- **Mobile Performance**: 90+ Lighthouse score

## 🎯 SEO & Analytics

- Individual page metadata with OpenGraph support
- Structured data for professional content
- XML sitemap generation
- Optimized image loading and compression
- Clean URL structure with dynamic routing
- Theme-aware meta tags

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Data Management

All content is managed through JSON files in the `src/data/` directory:
- `resume.json`: Core resume data driving multiple pages
- `publications.json`: Academic publications with full metadata
- `map.json`: Geographic data with GeoJSON coordinates

## 🚀 Deployment

Optimized for Vercel deployment with:
- Next.js 15+ App Router configuration
- Automatic static optimization
- Environment variable management for Mapbox tokens
- Performance monitoring integration
- Custom 404 and error handling

---

Built with ❤️ by Cherry Lian using Next.js, TypeScript, and modern web technologies.
