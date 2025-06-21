# Cherry Lian - Personal Portfolio Website

A professional, responsive personal website showcasing Yi (Cherry) Lian's work as a Robotics Engineer and Machine Learning Researcher, built with Next.js 15.3.4, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Interactive Global Map**: Professional Mapbox-powered journey visualization with timeline sync
- **Data-driven architecture**: All content dynamically populated from structured JSON files
- **Interactive project showcase**: Advanced filtering system with search and technology filters
- **Academic publications system**: Expandable abstracts with DOI links and publication awards
- **Responsive design**: Mobile-first approach with elegant animations
- **Performance optimized**: Image optimization, lazy loading, and optimized bundle sizes (22.2kB map page)
- **SEO optimized**: Individual metadata for each page with OpenGraph support
- **Type-safe**: Full TypeScript implementation with Zod runtime validation

## 🔧 Tech Stack

- **Framework**: Next.js 15.3.4 with TypeScript
- **UI/Styling**: Tailwind CSS with custom design system
- **Maps**: Mapbox GL JS v3 via react-map-gl v8.0.4
- **Animations**: Framer Motion for smooth interactions
- **Validation**: Zod for runtime type checking
- **State Management**: React Context with useReducer pattern
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

### 🗺️ Interactive Map (`/map`) - **FULLY IMPLEMENTED**

**🌍 Global Professional Journey Visualization**

A sophisticated, interactive world map showcasing Cherry's academic and professional journey using Mapbox GL JS. Built with performance and user experience as top priorities.

#### Core Features:
- **Global Coverage**: Interactive world map supporting locations worldwide
- **Smart Markers**: Color-coded location markers with entry counts and hover effects
- **Rich Location Details**: Modal popups with comprehensive information
- **Timeline Integration**: Two-column layout with bidirectional synchronization
- **Advanced Filtering**: Filter by All, Education, Work, Conference, Travel
- **Performance Optimized**: 22.2kB bundle size with dynamic imports

#### Interactive Components:
- **Map View (2/3 width)**:
  - Mapbox GL JS integration with graceful token validation
  - Color-coded markers: 🎓 Education (blue), 💼 Work (green), 📋 Conference (orange), ✈️ Travel (purple)
  - Hover effects and click interactions
  - Entry count badges on markers
  - Smart zoom controls (max zoom: 10)

- **Timeline Panel (1/3 width)**:
  - Chronological timeline with all location entries
  - Click timeline items to select map markers
  - Hover timeline items to highlight map markers
  - Smooth scrolling and animations
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
- **LocationModal.tsx**: Rich content display with links, photos, and achievements
- **TimelinePanel.tsx**: Chronological timeline with bidirectional sync
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
├── app/                    # Next.js 15+ App Router
│   ├── about/             # About page with timeline and skills
│   ├── contact/           # Contact page with social links
│   ├── map/               # Interactive Mapbox journey map ⭐
│   │   ├── layout.tsx     # Map-specific layout
│   │   └── page.tsx       # Map page with two-column layout
│   ├── projects/          # Projects overview and detail pages
│   │   └── [slug]/        # Dynamic project detail routes
│   ├── publications/      # Academic publications listing
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── map/              # Map-specific components ⭐
│   │   ├── LocationModal.tsx    # Rich location details modal
│   │   ├── MapboxMap.tsx        # Core Mapbox GL integration
│   │   ├── MarkerLayer.tsx      # Smart marker rendering
│   │   └── TimelinePanel.tsx    # Chronological timeline
│   ├── Footer.tsx         # Site footer with social links
│   └── Navbar.tsx         # Main navigation component
├── contexts/             # React Context providers ⭐
│   └── MapContext.tsx    # Map state management with useReducer
├── data/                 # JSON data files
│   ├── map.json          # Location data with GeoJSON coordinates ⭐
│   ├── publications.json # Academic papers and research
│   └── resume.json       # Core resume data (106 lines)
├── hooks/                # Custom React hooks ⭐
│   └── useMapData.ts     # Map data loading and validation
├── types/                # TypeScript type definitions ⭐
│   └── map.ts            # Comprehensive map interfaces
└── utils/                # Utility functions ⭐
    └── clustering.ts     # Map marker clustering utilities

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
- Mapbox account (free tier: 50K monthly loads)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd website

# Install dependencies
npm install

# Add Mapbox token (optional for development)
# Create .env.local file:
echo "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here" > .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

```bash
# .env.local (optional)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...  # Your Mapbox public token
```

**Note**: The map gracefully handles missing tokens by showing an informative error message, allowing development without Mapbox setup.

### Development Commands

```bash
npm run dev        # Start development server (localhost:3001)
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

**`map.json`** ⭐ **FULLY MIGRATED**:
- City-grouped location data with GeoJSON coordinates
- Comprehensive entry details (institution, role, duration, achievements)
- Photo and link support for rich content
- Type categorization (education, work, conference, travel)
- Zod schema validation for type safety

## 🎯 Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Optimization**: Dynamic imports for client-side components
- **Map Performance**: React.memo, useCallback, useMemo optimizations
- **Build Size**: 22.2kB for map page bundle
- **Graceful Degradation**: Map works without Mapbox token (development mode)
- **Type Safety**: Runtime validation with Zod schemas

## 🔧 Development Status

### ✅ Completed (Phases 1-2)
- **Phase 1**: Core map replacement with Mapbox GL JS
- **Phase 2**: Interactive timeline, filtering, and UX enhancements
- Full TypeScript implementation with comprehensive interfaces
- Performance optimizations and error handling
- Responsive design and mobile compatibility
- Build system passing (npm run build ✅)

### 📋 Planned (Phase 3)
- Enhanced global statistics dashboard
- Lighthouse performance testing
- Accessibility improvements (keyboard navigation, screen readers)
- Mapbox usage monitoring and validation
- Production deployment optimizations

## 🛠️ Technical Notes

### Map Implementation Details
- **react-map-gl version**: 8.0.4 (requires `/mapbox` import endpoint)
- **Mapbox GL JS version**: 3.x (latest compatible)
- **Coordinate format**: GeoJSON [longitude, latitude]
- **Performance**: maxZoom: 10, optimized render cycles
- **Error handling**: Graceful token validation and fallbacks

### Known Issues Fixed
- ✅ Hydration mismatch (suppressHydrationWarning for browser extensions)
- ✅ Import path issues (react-map-gl v8 compatibility)
- ✅ TypeScript type safety throughout
- ✅ Linting errors resolved

### Browser Compatibility
- Modern browsers with WebGL support
- Progressive enhancement for older browsers
- Mobile-responsive design

## 📈 Analytics & Monitoring

The map implementation includes built-in analytics tracking for:
- Location interactions and popular destinations
- Timeline usage patterns
- Filter preferences
- Performance metrics

## 🤝 Contributing

This is a personal portfolio project. The codebase follows:
- TypeScript strict mode
- ESLint configuration
- Consistent naming conventions
- Comprehensive error handling
- Performance-first approach

## 📄 License

See LICENSE file for details.

---

**Built with ❤️ by Cherry Lian | Last Updated: January 2025**
