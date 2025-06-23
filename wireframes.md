# Detailed Page & Component Specifications

## 🏠 Home Page (`/`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects] [Publications] [Map] [Contact] │ [🌙]
│ (white text w/ shadow when not scrolled, gradient when scrolled) │
├─────────────────────────────────────────────────────────────────┤
│                         HERO SECTION                           │
│ ┌─────────────┐  Welcome! I'm Cherry Lian                      │
│ │  [Photo]    │  Robotics Engineer & ML Researcher             │
│ │ Cherry.jpg  │                                                 │
│ │ (circular)  │  [View Resume] [View Projects]                  │
│ └─────────────┘       ↓                                         │
│                  [Resume Modal]                                │
├─────────────────────────────────────────────────────────────────┤
│                     FEATURED PROJECTS                          │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ 🤖 HINTeract Framework  │ │ 🕷️ SpooderMan Robot        │     │
│ │ Interactive Learning    │ │ Autonomous Follower         │     │
│ │ [Python] [PyTorch] [ML] │ │ [ROS2] [OpenCV] [Python]    │     │
│ │    → /projects/hinteract│ │    → /projects/spooderman   │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
│           (CLICKABLE)                    (CLICKABLE)           │
├─────────────────────────────────────────────────────────────────┤
│                           FOOTER                               │
│  [Typing Animation: "Built with Next.js..." ↔ "Last updated..."] │
│     [✉️] [LinkedIn] [GitHub] [Old Portfolio] (REORDERED)        │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Navigation Bar (`Navbar.tsx`)**:
- Fixed header with responsive design and **theme toggle**
- **Cherry Lian text**: White with drop shadow when not scrolled, gradient when scrolled
- Desktop: Horizontal navigation links + theme toggle
- Mobile: Hamburger menu with slide-out navigation + theme toggle
- Active page highlighting
- Smooth hover transitions

**Hero Section**:
- Left: Profile photo (`Cherry.jpg`) - circular crop with border
- Right: Professional tagline and introduction
- **Updated CTA**: "View Resume" (opens modal) and "View Projects" (secondary)
- **Resume Modal**: In-browser PDF viewer with download and "open in new tab" options
- Subtle background animations

**Featured Projects Grid**:
- Data source: `resume.json` → projects array (first 2 items)
- **NEW**: Project cards are clickable and link to `/projects/[slug]`
- Project cards with emoji placeholders (🤖, 🕷️)
- Technology tags from project.technologies array
- Responsive: 2 columns desktop, 1 column mobile

**Footer (`Footer.tsx`)**:
- **NEW**: Typing animation cycling between two texts
- **REORDERED**: Email → LinkedIn → GitHub → Old Portfolio
- Copyright notice with current year
- Consistent across all pages

---

## 🌙 Dark/Light Mode System

### Theme Toggle Component
```
┌─────────────────┐
│ [🌙] Light Mode │  ← Navbar toggle
│ [☀️] Dark Mode  │
└─────────────────┘
```

**Features**:
- Animated sun/moon icon transition
- Located in both desktop and mobile navigation
- Persists preference in localStorage
- Detects system preference on first visit
- Smooth theme transition with CSS custom properties

### Theme System Architecture
```
ThemeContext.tsx
├── useContext hook for components
├── localStorage persistence
├── System preference detection
├── Theme state management
└── CSS custom property updates

globals.css
├── Light mode variables
├── Dark mode variables  
├── Smooth transitions
└── Component-specific themes
```

---

## 🗺️ Interactive Map Page (`/map`) - **UI IMPROVEMENTS**

### Enhanced Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects] [Publications] [Map*] [Contact] [🌙]
├─────────────────────────────────────────────────────────────────┤
│                      PAGE HEADER                               │
│                    Interactive Journey Map                      │
│               Explore Cherry's Academic & Professional Path     │
├─────────────────────────────────────────────────────────────────┤
│              FILTER CONTROLS                                   │
│ [All] [🎓 Education] [💼 Work] [📋 Conference] [✈️ Travel]      │
│                                                    4 locations  │
├─────────────────────────────────────────────────────────────────┤
│ MAP VIEW (66.67%)            │ TIMELINE PANEL (33.33%)          │
│                              │                                  │
│  ┌─────────────────────────┐ │ ┌─────────────────────────────┐  │
│  │                         │ │ │ 📅 Timeline Overview        │  │
│  │    🌍 MAPBOX MAP        │ │ │                             │  │
│  │  (NO GREY RING HOVER)   │ │ │ ● 2025 Robotics Engineer   │  │
│  │                         │ │ │   Advanced Mechatronics     │  │
│  │  📍 San Diego (1)       │ │ │   Solutions, San Diego      │  │
│  │                         │ │ │   • Achievement 1           │  │ ← FIXED
│  │      📍 Atlanta (1)     │ │ │   • Achievement 2           │  │   BULLET
│  │                         │ │ │                             │  │   ALIGNMENT
│  │                         │ │ │ ● 2024 MS Robotics         │  │
│  │                         │ │ │   Georgia Tech, Atlanta     │  │
│  │   📍 Toronto (1)        │ │ │                             │  │
│  │                         │ │ │ ● 2023 ML Engineer         │  │
│  │       📍 Markham (1)    │ │ │   Huawei Canada, Markham   │  │
│  │                         │ │ │                             │  │
│  │   [Zoom Controls]       │ │ │ ● 2019 Bachelor's Degree   │  │
│  └─────────────────────────┘ │ │   University of Toronto    │  │
│                              │ │                             │  │
│                              │ ├─────────────────────────────┤  │
│                              │ │ 📊 Experience Distribution  │  │
│                              │ │         ▼ (DROPDOWN)       │  │ ← COLLAPSIBLE
│                              │ ├─────────────────────────────┤  │   STATS
│                              │ │ [Expanded Stats Content]    │  │
│                              │ │ [Bar Charts & Summary]      │  │
│                              │ └─────────────────────────────┘  │
└──────────────────────────────┴──────────────────────────────────┘
```

### UI Improvements Made

**Map Interaction Fixes**:
- **Removed Grey Circular Ring**: Fixed misaligned hover artifact on location markers
- **Clean Hover Effects**: Markers now have smooth hover without visual glitches
- **Preserved Functionality**: All click/hover interactions remain intact

**Timeline Panel Enhancements**:
- **Fixed Bullet Alignment**: Changed from `items-start` to `items-baseline`
- **LocationModal Alignment**: Applied same fix to achievement lists
- **Consistent Typography**: Proper bullet point alignment throughout

**Experience Distribution Enhancement**:
- **Collapsible Dropdown**: Converted stats bar to expandable component
- **Animated Chevron**: Rotating arrow indicates expand/collapse state
- **Smooth Transitions**: Framer Motion height and opacity animations
- **Preserved Content**: All original charts and geographic data retained
- **Accessibility**: Proper ARIA attributes for screen readers

### Modal Improvements
```
┌─────────────────────────────────────────────────────────────────┐
│                      LOCATION MODAL                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🏢 University of Toronto                           [×]      │ │
│ │ 🎓 Bachelor of Applied Science                              │ │
│ │ 📅 Sep 2019 - Apr 2024                                     │ │
│ │                                                             │ │
│ │ 🏆 Achievements:                                            │ │
│ │   • Mechanical Engineering degree        ← FIXED ALIGNMENT │ │
│ │   • Focus on AI and Robotics            ← FIXED ALIGNMENT │ │
│ │   • Dean's List recognition             ← FIXED ALIGNMENT │ │
│ │                                                             │ │
│ │ 🔗 Links:                                                   │ │
│ │   [University Website] [Program Details]                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👩‍💼 About Page (`/about`) - **CLEANUP**

### Updated Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About*] [Projects] [Publications] [Map] [Contact] [🌙]
├─────────────────────────────────────────────────────────────────┤
│                      PAGE HEADER                               │
│                        About Cherry                            │
│              (REMOVED: "Robotics Engineer..." subheader)       │
├─────────────────────────────────────────────────────────────────┤
│                    PERSONAL BIO SECTION                        │
│ Professional background highlighting robotics and ML expertise  │
│ Personal interests and professional philosophy                  │
├─────────────────────────────────────────────────────────────────┤
│                  INTERACTIVE TIMELINE                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ● 2025 Robotics Engineer                                    │ │ ← POP UP FROM
│ │   Advanced Mechatronics Solutions    [ANIMATION: ↑]        │ │   BELOW ANIMATION
│ │                                                             │ │   (NOT LEFT SLIDE)
│ │ ● 2024 MS Robotics                                          │ │
│ │   Georgia Tech                       [ANIMATION: ↑]        │ │
│ │                                                             │ │
│ │ ● 2023 ML Engineer                                          │ │
│ │   Huawei Canada                      [ANIMATION: ↑]        │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                      SKILLS MATRIX                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Python] [C++] [ROS2] [PyTorch] [OpenCV] [Robotics]        │ │
│ │ [Machine Learning] [Computer Vision] [AI] [Research]        │ │
│ │         26+ interactive, filterable skill tags             │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                      CONTACT LINKS                             │
│         [✉️ Email] [LinkedIn] [GitHub]                          │
│              (REMOVED: Download CV button)                     │
└─────────────────────────────────────────────────────────────────┘
```

### Changes Made
- **Removed subheader**: "Robotics Engineer and ML Researcher passionate about..."
- **Removed Download CV button**: Avoid redundancy with home page resume modal
- **Changed timeline animation**: From sliding left to popping up from below
- **Maintained skills matrix**: All 26+ interactive tags preserved
- **Clean contact section**: Direct links without download redundancy

---

## 🚀 Projects Page (`/projects`) - **ENHANCED**

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects*] [Publications] [Map] [Contact] [🌙]
├─────────────────────────────────────────────────────────────────┤
│                      PAGE HEADER                               │
│                        My Projects                             │
│              Showcasing Technical Innovation                   │
├─────────────────────────────────────────────────────────────────┤
│                    ENHANCED CONTROLS                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🔍 [Search projects...] (BLACK TEXT)                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Technology Filter ▼] (BLACK TEXT)            [Clear Filters]   │
│                                                 2 projects      │
├─────────────────────────────────────────────────────────────────┤
│                      PROJECTS GRID                             │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ 🤖 HINTeract Framework  │ │ 🕷️ SpooderMan Robot        │     │
│ │ Interactive Learning    │ │ Autonomous Follower         │     │
│ │ Framework for Robots    │ │ ROS2-based System          │     │
│ │                         │ │                             │     │
│ │ [Python] [PyTorch] [ML] │ │ [ROS2] [OpenCV] [Python]    │     │
│ │ [Robosuite] [Research]  │ │ [Computer Vision] [AI]      │     │
│ │                         │ │                             │     │
│ │      Learn More →       │ │      Learn More →           │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Enhanced Features
- **Search Visibility**: Changed search input text to black for better readability
- **Filter Visibility**: Technology dropdown text changed to black
- **Maintained Functionality**: All existing search and filter logic preserved
- **Technology Tags**: Interactive tags with hover effects
- **Dynamic Filtering**: Real-time results based on search and filter criteria

---

## 📞 Contact Page (`/contact`) - **UPDATED**

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects] [Publications] [Map] [Contact*] [🌙]
├─────────────────────────────────────────────────────────────────┤
│                      PAGE HEADER                               │
│                       Get In Touch                             │
│                 Let's Connect and Collaborate                  │
├─────────────────────────────────────────────────────────────────┤
│                     CONTACT METHODS                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ✉️ Primary Email Contact                                    │ │
│ │ cherry.lian@example.com                                     │ │
│ │ [Send Email] (pre-filled mailto template)                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     SOCIAL MEDIA CARDS                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ ✉️ Email     │ │ 💼 LinkedIn │ │ 🐙 GitHub   │ │ 🌐 Portfolio│ │
│ │ Direct      │ │ Professional│ │ Code &      │ │ Previous    │ │
│ │ Contact     │ │ Network     │ │ Projects    │ │ Work        │ │
│ │ [Connect]   │ │ [View]      │ │ [Explore]   │ │ [Visit]     │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     QUICK ACTIONS                              │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ [View Resume]          │ │ [Learn About Me]           │     │
│ │ (CHANGED FROM DOWNLOAD) │ │ Navigate to About Page      │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│                 RESPONSE EXPECTATIONS                          │
│ Professional response time: 24-48 hours                        │
│ Open to collaboration, research opportunities, and networking   │
└─────────────────────────────────────────────────────────────────┘
```

### Changes Made
- **Updated Quick Action**: "Download Resume" → "View Resume" (opens modal)
- **Consistent Experience**: Matches home page resume modal functionality
- **Maintained Design**: All existing styling and interactions preserved

---

## 🎨 Global Design System Updates

### CSS Custom Properties (Theme Variables)
```css
:root {
  /* Light Mode */
  --color-background: #ffffff;
  --color-text: #000000;
  --color-primary: #FFDCDC;
  --color-secondary: #FFF2EB;
  --color-accent: #FFE8CD;
  --color-highlight: #FFD6BA;
  --color-card: #ffffff;
  --color-border: #e5e7eb;
}

[data-theme="dark"] {
  /* Dark Mode */
  --color-background: #0f172a;
  --color-text: #f8fafc;
  --color-primary: #FFDCDC;
  --color-secondary: #1e293b;
  --color-accent: #334155;
  --color-highlight: #475569;
  --color-card: #1e293b;
  --color-border: #334155;
}
```

### Component Enhancements

**Consistent Black Text for Forms**:
- Search inputs: `text-black` class applied
- Filter dropdowns: `text-black` class applied
- Form elements: Improved readability across all pages

**Animation Improvements**:
- **About timeline**: Changed from `slideInLeft` to `slideInUp`
- **Publications abstracts**: Hover-based with smooth height transitions
- **Footer typing**: Typewriter effect with blinking cursor
- **Theme toggle**: Smooth icon transitions between sun/moon

**Modal System**:
- **ResumeModal**: PDF viewer with download and external link options
- **LocationModal**: Fixed bullet point alignment with `items-baseline`
- Consistent modal behavior and styling across components

### Responsive Design Enhancements
```
Mobile Layout Updates:
┌─────────────────────┐
│ ☰ Cherry Lian   🌙 │ ← Theme toggle in mobile nav
├─────────────────────┤
│   [Main Content]   │
├─────────────────────┤
│ [Typing Animation] │ ← Footer animation
│ [Social Icons]     │
└─────────────────────┘
```

---

## 🔧 Technical Implementation Notes

### New Components Added
- `ThemeToggle.tsx`: Animated sun/moon toggle with smooth transitions
- `ResumeModal.tsx`: PDF viewer modal with download options
- Enhanced `Footer.tsx`: Typing animation component

### State Management Updates
- `ThemeContext.tsx`: Complete theme management system
- Enhanced `MapContext.tsx`: Fixed UI interaction bugs
- Updated component state handling for new features

### Performance Optimizations
- React.memo for expensive modal components
- useCallback for theme switching
- useMemo for filtered data in publications
- Optimized animations with Framer Motion

### Accessibility Improvements
- Proper ARIA labels for theme toggle
- Keyboard navigation for modals
- Screen reader support for animations
- Focus management in interactive elements

### Build System
- Zero ESLint errors
- TypeScript strict mode compliance
- Optimized bundle sizes
- Clean Vercel deployment configuration

---

**Last Updated**: January 2025 with comprehensive UI/UX improvements, dark mode system, and enhanced user interactions.

