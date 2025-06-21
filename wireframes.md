# Detailed Page & Component Specifications

## 🏠 Home Page (`/`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects] [Publications] [Map] [Contact] │
├─────────────────────────────────────────────────────────────────┤
│                         HERO SECTION                           │
│ ┌─────────────┐  Welcome! I'm Cherry Lian                      │
│ │  [Photo]    │  Robotics Engineer & ML Researcher             │
│ │ Cherry.jpg  │                                                 │
│ │ (circular)  │  [Download Resume] [View Projects]              │
│ └─────────────┘                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     FEATURED PROJECTS                          │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ 🤖 HINTeract Framework  │ │ 🕷️ SpooderMan Robot        │     │
│ │ Interactive Learning    │ │ Autonomous Follower         │     │
│ │ [Python] [PyTorch] [ML] │ │ [ROS2] [OpenCV] [Python]    │     │
│ │         Learn More →    │ │         Learn More →        │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│                           FOOTER                               │
│        © 2025 Cherry Lian | [GitHub] [LinkedIn] [Email]        │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Navigation Bar (`Navbar.tsx`)**:
- Fixed header with responsive design
- Desktop: Horizontal navigation links
- Mobile: Hamburger menu with slide-out navigation
- Active page highlighting
- Smooth hover transitions

**Hero Section**:
- Left: Profile photo (`Cherry.jpg`) - circular crop with border
- Right: Professional tagline and introduction
- Two CTA buttons: "Download Resume" (primary) and "View Projects" (secondary)
- Subtle background animations

**Featured Projects Grid**:
- Data source: `resume.json` → projects array (first 2 items)
- Project cards with emoji placeholders (🤖, 🕷️)
- Technology tags from project.technologies array
- "Learn More" links to `/projects/[slug]`
- Responsive: 2 columns desktop, 1 column mobile

**Footer (`Footer.tsx`)**:
- Social media icons with external links
- Copyright notice
- Consistent across all pages

---

## 👩‍💼 About Page (`/about`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      PERSONAL BIO                              │
│ Passionate robotics engineer and ML researcher with expertise   │
│ spanning autonomous systems, computer vision, and intelligent   │
│ robotics. Currently pursuing MS in Robotics at Georgia Tech.    │
│                                                                 │
│ [Download CV] [Email Me] [LinkedIn] [GitHub]                    │
├─────────────────────────────────────────────────────────────────┤
│                    EDUCATION & EXPERIENCE                      │
│                                                                 │
│ 2025 ────●── Robotics Engineer @ Advanced Mechatronics          │
│          │   Solutions, San Diego                              │
│          │   • Leading autonomous robotics projects            │
│          │                                                     │
│ 2024 ────●── MS Robotics @ Georgia Tech (4.0 GPA)              │
│          │   • Research in robot learning and HRI             │
│          │                                                     │
│ 2023 ────●── ML Engineer @ Huawei Canada                       │
│          │   • Published 3 research papers                    │
│          │   • Led ML solutions for network optimization      │
│          │                                                     │
│ 2019 ────●── B.A.Sc. Mechanical Engineering @ UofT            │
│              • Dean's List, robotics specialization           │
├─────────────────────────────────────────────────────────────────┤
│                      SKILLS MATRIX                             │
│ [Python] [ROS2] [PyTorch] [TensorFlow] [OpenCV] [SLAM]          │
│ [Computer Vision] [Machine Learning] [Deep Learning] [NLP]      │
│ [Robotic Manipulation] [Motion Planning] [Control Systems]     │
│ [Linux] [Git] [Docker] [AWS] [C++] [JavaScript] [MATLAB]       │
│ [SolidWorks] [Gazebo] [Robosuite] [Jupyter] [LaTeX]           │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Personal Bio Section**:
- Introductory paragraph highlighting Cherry's expertise
- Contact action buttons with hover effects
- Download CV button links to `/assets/Yi_Lian_Resume.pdf`

**Interactive Timeline**:
- Data source: Combined `resume.json` → education + experience arrays
- Chronological sorting with visual markers:
  - 🎓 Education (blue markers)  
  - 💼 Work Experience (green markers)
- Each entry shows:
  - Institution/Company name
  - Role/Degree title
  - Duration
  - Key achievements (bullet points)
- Framer Motion staggered animations on scroll

**Skills Matrix**:
- Data source: `resume.json` → technical_skills array (26 skills)
- Interactive skill tags with hover effects
- Organized by categories (Programming, Robotics, ML/AI, Tools)
- Color-coded badges matching site theme
- Click functionality for future filtering enhancement

**Technical Implementation**:
- TypeScript interfaces for timeline and skills data
- `useMemo` optimization for timeline sorting
- Responsive breakpoints for mobile/tablet/desktop
- Smooth scroll animations with Framer Motion

---

## 🚀 Projects Section

### Projects Overview (`/projects`)

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      PROJECT FILTERS                           │
│ 🔍 [Search projects...] | Technology: [All ▼] [2 Projects]      │
├─────────────────────────────────────────────────────────────────┤
│                      PROJECT CARDS                             │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ 🤖                      │ │ 🕷️                          │     │
│ │ HINTeract Framework     │ │ SpooderMan Robot            │     │
│ │                         │ │                             │     │
│ │ Interactive robot       │ │ Autonomous person-following │     │
│ │ learning system with    │ │ robot using computer vision │     │
│ │ hint-guided feedback    │ │ and ROS2 architecture       │     │
│ │                         │ │                             │     │
│ │ [Python] [Robosuite]    │ │ [ROS2] [Python] [OpenCV]    │     │
│ │ [PyTorch] [ML]          │ │ [Computer Vision]           │     │
│ │                         │ │                             │     │
│ │ 2024 • Research Project │ │ 2023 • Personal Project     │     │
│ │         Learn More →    │ │         Learn More →        │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Filter System**:
- Real-time search input with debounced filtering
- Technology dropdown with all unique technologies from projects
- Project counter showing filtered results
- Clear filters functionality

**Project Cards**:
- Data source: `resume.json` → projects array
- Large emoji placeholders (🤖 for HINTeract, 🕷️ for SpooderMan)
- Project title, description, and year
- Technology tags with consistent styling
- "Learn More" links to dynamic detail pages

**Technical Implementation**:
- `useState` for search and filter state management
- `useMemo` for optimized filtering performance
- Responsive grid layout (2 columns desktop, 1 column mobile)
- Smooth hover animations and transitions

### Project Detail Pages (`/projects/[slug]`)

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      HERO BANNER                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │           🤖 HINTeract Framework                            │ │
│ │        Interactive Robot Learning System                   │ │
│ │    [Python] [Robosuite] [PyTorch] [Machine Learning]       │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                    PROJECT OVERVIEW                            │
│ 📋 Overview                                                     │
│ Advanced framework for interactive robot learning that enables  │
│ robots to learn complex manipulation tasks through hint-guided  │
│ feedback and reinforcement learning.                            │
│                                                                 │
│ ⭐ Key Features                                                  │
│ • Hint-guided learning with human feedback integration          │
│ • Real-time robot simulation in Robosuite environment          │
│ • Advanced neural network architectures with PyTorch           │
│ • Interactive learning interface for seamless human-robot      │
│                                                                 │
│ 🎯 Technical Challenges                                         │
│ • Balancing exploration vs exploitation in RL algorithms       │
│ • Implementing efficient hint incorporation mechanisms          │
│ • Ensuring stable training across different manipulation tasks │
│                                                                 │
│ 📊 Results & Impact                                             │
│ • 40% improvement in learning efficiency compared to baseline   │
│ • Successfully demonstrated on 5 different manipulation tasks  │
│ • Research paper in preparation for ICRA 2026 submission      │
├─────────────────────────────────────────────────────────────────┤
│                    LINKS & RESOURCES                           │
│ [🔗 GitHub Repository] [📄 Research Paper] [🎥 Demo Video]      │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Hero Banner**:
- Project-specific gradient backgrounds
- Large emoji identifier
- Project title and subtitle
- Technology tags with consistent styling

**Project Content Sections**:
- **Overview**: Comprehensive project description
- **Key Features**: Bullet-pointed feature list with icons
- **Technical Challenges**: Development obstacles and solutions
- **Results & Impact**: Quantifiable outcomes and achievements

**Links Section**:
- Mock GitHub repository links
- Research paper references (when applicable)
- Demo video links (placeholder ready)
- External resource buttons with icons

**Technical Implementation**:
- Dynamic routing with `[slug]` parameter
- Data fetching from `resume.json` based on slug
- Custom 404 page for invalid project slugs
- SEO-optimized metadata for each project
- Smooth page transitions and animations

**Custom 404 Handling**:
```typescript
// Custom not-found.tsx for invalid project slugs
return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1>Project Not Found</h1>
      <p>The project you're looking for doesn't exist.</p>
      <Link href="/projects">← Back to Projects</Link>
    </div>
  </div>
);
```

---

## 📚 Publications Page (`/publications`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                    PUBLICATION FILTERS                         │
│ Filter by Year: [All ▼] | Type: [All ▼] | 3 Publications       │
├─────────────────────────────────────────────────────────────────┤
│                    PUBLICATIONS LIST                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [2025] 🏆 BEST PRESENTATION AWARD                           │ │
│ │ Implicit Behavioral Cues for Enhancing Trust and Comfort   │ │
│ │ in Robot Social Navigation                                  │ │
│ │ ICRA 2025 PTAS Workshop • Yi Lian, John Smith              │ │
│ │ [Conference] [Social Robotics] [DOI] [▼ Abstract]           │ │
│ │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ │
│ │ This paper explores how implicit behavioral cues can        │ │
│ │ significantly enhance trust and comfort levels in human-    │ │
│ │ robot interactions during social navigation scenarios...    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [2023] Toward Fair and Efficient Congestion Control        │ │
│ │ APNET '23 • Yi Lian, Jane Doe, Bob Wilson                  │ │
│ │ [Conference] [Networking] [DOI] [▼ Abstract]                │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [2023] OpenData: A Framework to Train and Deploy ML        │ │
│ │ Solutions in Wide-Area Networks                             │ │
│ │ IEEE Network • Yi Lian, Alice Johnson                      │ │
│ │ [Journal] [Machine Learning] [DOI] [▼ Abstract]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Filter System**:
- Year-based filtering dropdown with all publication years
- Publication type filters (Conference, Journal, Workshop)
- Publication counter showing filtered results
- Clear filters functionality

**Publication Cards**:
- Data source: `publications.json` with complete metadata
- **Award Recognition**: Special 🏆 badge for Best Presentation Award
- **Author Highlighting**: "Yi Lian" appears in bold formatting
- **Color-coded Badges**:
  - Conference: Blue badges
  - Journal: Green badges  
  - Workshop: Purple badges
- **Expandable Abstracts**: Click to toggle full abstract display
- **DOI Links**: External links to official publications

**Publication Entry Structure**:
```typescript
interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Workshop';
  doi?: string;
  abstract: string;
  tags: string[];
  award?: string; // For special recognition
}
```

**Interactive Features**:
- Smooth expand/collapse animations for abstracts
- Hover effects on publication cards
- External DOI link handling with proper icons
- Mobile-responsive layout with stacked information

**Technical Implementation**:
- `useState` for managing expanded abstracts
- `useMemo` for optimized filtering
- Framer Motion for smooth animations
- SEO-optimized metadata for academic indexing

---

## 🗺️ Interactive Map Page (`/map`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      JOURNEY STATS                             │
│ 🌍 4 Locations | 🏛️ 2 Countries | 📍 3 States/Provinces        │
├─────────────────────────────────────────────────────────────────┤
│                    INTERACTIVE MAP                             │
│                      NORTH AMERICA                             │
│                                                                 │
│            ● Toronto (2019-2024)                               │
│            ● Markham (2022-2023)                              │
│                                                                 │
│                                                                 │
│                                ● Atlanta (2024-Present)        │
│                                                                 │
│                                                                 │
│                  ● San Diego (2025-Present)                    │
│                                                                 │
│ Legend: ● Education  ● Professional                            │
├─────────────────────────────────────────────────────────────────┤
│                    TIMELINE OVERVIEW                           │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ 🎓 Toronto      │ │ 💼 Markham      │ │ 🎓 Atlanta      │   │
│ │ University of   │ │ Huawei Canada   │ │ Georgia Tech    │   │
│ │ Toronto         │ │ ML Engineer     │ │ MS Robotics     │   │
│ │ 2019-2024       │ │ 2022-2023       │ │ 2024-Present    │   │
│ │ B.A.Sc. Mech    │ │ Research & Dev  │ │ 4.0 GPA        │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│              ┌─────────────────┐                               │
│              │ 💼 San Diego    │                               │
│              │ Advanced Mech   │                               │
│              │ Solutions       │                               │
│              │ 2025-Present    │                               │
│              │ Robotics Eng    │                               │
│              └─────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Journey Statistics**:
- Dynamic counters showing total locations, countries, and regions
- Data calculated from `map.json` location entries
- Visual stat cards with icons

**Interactive Map**:
- Visual representation of North America with CSS positioning
- **Location Markers**:
  - Blue circles (●) for educational institutions
  - Green circles (●) for professional positions
  - Positioned using coordinate data from `map.json`
- **Click Interactions**: Markers open detailed modal popups
- **Hover Effects**: Smooth scaling and color transitions

**Modal Popup System**:
```typescript
// Modal content structure for each location
interface LocationModal {
  location: string;
  institution: string;
  role: string;
  duration: string;
  type: 'education' | 'professional';
  achievements: string[];
  coordinates: [number, number];
}
```

**Timeline Overview Cards**:
- Visual timeline below the map
- Chronological arrangement of all locations
- Color-coded by type (education vs professional)
- Key achievements and details for each position

**Location Data Structure**:
```json
{
  "id": "toronto",
  "city": "Toronto",
  "country": "Canada",
  "coordinates": [43.6532, -79.3832],
  "institution": "University of Toronto",
  "role": "B.A.Sc. Mechanical Engineering",
  "duration": "2019-2024",
  "type": "education",
  "achievements": [
    "Dean's List recognition",
    "Robotics specialization focus",
    "Founded robotics club"
  ]
}
```

**Technical Implementation**:
- CSS-based coordinate positioning system
- Modal state management with `useState`
- Responsive design for mobile map viewing
- Smooth animations with Framer Motion
- Click-outside-to-close modal functionality

---

## 📞 Contact Page (`/contact`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      CONTACT HERO                              │
│                    Let's Connect!                              │
│         I'd love to hear about your next project              │
├─────────────────────────────────────────────────────────────────┤
│                   PRIMARY CONTACT                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📧 Email Me                                                 │ │
│ │ cherry.lian@gatech.edu                                      │ │
│ │ I typically respond within 24 hours                        │ │
│ │                                [Send Email]                │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                   SOCIAL MEDIA                                │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ 💼 LinkedIn     │ │ 🐙 GitHub       │ │ 🌐 Portfolio    │   │
│ │ Professional    │ │ Code & Projects │ │ Full Website    │   │
│ │ Network         │ │ Repository      │ │ Overview        │   │
│ │    [Connect]    │ │    [Follow]     │ │    [Visit]      │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                   QUICK ACTIONS                               │
│        [📄 Download Resume]  [👩‍💼 Learn About Me]                │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Contact Hero Section**:
- Welcoming headline with professional tone
- Subtitle encouraging project discussions
- Consistent with site branding and theming

**Primary Contact Card**:
- **Email Address**: cherry.lian@gatech.edu (clickable mailto link)
- **Response Time**: Professional expectation setting
- **Send Email Button**: Pre-filled mailto with subject line
- **Mailto Template**: 
  ```
  mailto:cherry.lian@gatech.edu?subject=Project Inquiry&body=Hi Cherry,

  I'd like to discuss...
  ```

**Social Media Cards**:
- **LinkedIn Card**:
  - Professional networking focus
  - Link to LinkedIn profile
  - "Connect" CTA button
  
- **GitHub Card**:
  - Code repository showcase
  - Link to GitHub profile  
  - "Follow" CTA button
  
- **Portfolio Card**:
  - Website overview reference
  - Self-referential link to home page
  - "Visit" CTA button

**Quick Actions Section**:
- **Download Resume**: Direct link to `/assets/Yi_Lian_Resume.pdf`
- **Learn About Me**: Internal link to `/about` page
- Prominent button styling with hover effects

**Technical Implementation**:
- Pre-filled mailto links with professional templates
- External link handling with `target="_blank"` and `rel="noopener"`
- Hover animations on all interactive elements
- Responsive card layout for mobile devices
- Icon integration consistent with site design

**Email Template Structure**:
```typescript
const emailTemplate = {
  to: 'cherry.lian@gatech.edu',
  subject: 'Project Inquiry',
  body: `Hi Cherry,

I'd like to discuss a potential collaboration opportunity.

Project Details:
- 

Timeline:
- 

Budget Range:
- 

Looking forward to hearing from you!

Best regards,
[Your Name]`
};
```

---

## 🧩 Shared Components

### Navigation Bar (`Navbar.tsx`)

**Desktop Navigation**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Cherry Lian    [About] [Projects] [Publications] [Map] [Contact] │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile Navigation**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Cherry Lian                                              [☰]    │
├─────────────────────────────────────────────────────────────────┤
│                     SLIDE-OUT MENU                             │
│                        [About]                                 │
│                      [Projects]                                │
│                    [Publications]                              │
│                        [Map]                                   │
│                      [Contact]                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Fixed positioning at top of all pages
- Active page highlighting with color changes
- Smooth hover transitions
- Mobile hamburger menu with slide-out animation
- Logo/name links to home page
- Z-index management for overlay elements

### Footer (`Footer.tsx`)

```
┌─────────────────────────────────────────────────────────────────┐
│        © 2025 Yi (Cherry) Lian | [GitHub] [LinkedIn] [Email]    │
└─────────────────────────────────────────────────────────────────┘
```

**Features**:
- Consistent across all pages
- Social media icon links matching contact page
- Copyright notice with current year
- Minimal, professional design
- Mobile-responsive layout

### Layout System

**Root Layout** (`layout.tsx`):
- Site-wide metadata configuration
- Font loading (Inter font family)
- Global CSS imports
- Navigation and footer wrapper
- SEO optimization tags

**Page-Specific Layouts**:
- Individual layout files for each major section
- Custom metadata for SEO optimization
- Section-specific styling and configuration
- OpenGraph and Twitter card support

---

## 🎨 Design System Implementation

### Color Palette & CSS Variables
```css
:root {
  --color-primary: #FFDCDC;    /* Soft pink */
  --color-secondary: #FFF2EB;  /* Warm cream */
  --color-accent: #FFE8CD;     /* Light peach */
  --color-highlight: #FFD6BA;  /* Warm beige */
  --color-text: #333333;       /* Dark gray */
  --color-text-light: #666666; /* Medium gray */
}
```

### Component Classes
```css
.card {
  @apply bg-white rounded-lg shadow-md p-6 transition-all duration-300;
}

.card-hover {
  @apply hover:shadow-lg hover:scale-105 transform;
}

.btn-primary {
  @apply bg-primary text-white px-6 py-3 rounded-lg font-semibold 
         hover:bg-opacity-90 transition-all duration-300;
}

.btn-secondary {
  @apply border-2 border-primary text-primary px-6 py-3 rounded-lg 
         font-semibold hover:bg-primary hover:text-white transition-all duration-300;
}
```

### Typography System
- **Headings**: Clean hierarchy with consistent spacing
- **Body Text**: Optimized for readability across devices  
- **Interactive Elements**: Clear visual feedback
- **Code Elements**: Monospace font with syntax highlighting ready

### Animation Patterns
- **Page Transitions**: Smooth enter/exit animations
- **Hover Effects**: Consistent scaling and color changes
- **Loading States**: Skeleton loaders for dynamic content
- **Scroll Animations**: Progressive revelation with Framer Motion

---

## 📱 Responsive Design Specifications

### Breakpoint System
- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (mixed layouts)
- **Desktop**: > 1024px (full multi-column layouts)

### Mobile Optimizations
- **Navigation**: Hamburger menu with slide-out drawer
- **Cards**: Single column stacking with full-width
- **Typography**: Optimized font sizes for small screens
- **Touch Targets**: Minimum 44px for all interactive elements
- **Images**: Responsive sizing with proper aspect ratios

### Performance Considerations
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Splitting**: Dynamic imports for heavy components
- **Animation Performance**: GPU-accelerated transforms
- **Loading States**: Progressive content loading
- **Caching**: Proper HTTP caching headers for static assets

---

## 🔧 Technical Architecture

### Data Flow
```
JSON Files (Single Source of Truth)
    ↓
TypeScript Interfaces
    ↓
React Components
    ↓
Rendered UI
```

### State Management
- **Local State**: `useState` for component-specific data
- **Derived State**: `useMemo` for computed values
- **URL State**: Next.js routing for navigation state
- **Form State**: Controlled inputs with validation

### Performance Optimization
- **Memoization**: `useMemo` and `useCallback` where beneficial
- **Image Optimization**: Next.js Image with proper sizing
- **Bundle Analysis**: Regular bundle size monitoring
- **Lazy Loading**: Dynamic imports and viewport-based loading

This comprehensive documentation covers all implemented pages, components, and features of Cherry Lian's personal website, providing a complete reference for maintenance, updates, and future enhancements.

