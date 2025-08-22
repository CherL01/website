## Personal Website Project Plan

### 1. Overview & Objectives

- **Goal:** Build a clean, responsive, and easily maintainable personal website to showcase Yi (Cherry) Lian's professional profile, projects, publications, and research experience.
- **Design Principles:**
  - **Elegance & Conciseness:** Code should be minimal, modular, and descriptive.
  - **Theming Flexibility:** Use CSS variables and Tailwind config to allow easy palette changes.
  - **Responsive & Accessible:** Ensure layouts adapt to mobile devices and meet WCAG standards.
  - **Performance Optimized:** Implement image optimization and lazy loading from the start.
  - **Good Communication:** Organize content architecture clearly and document decisions.

### 2. Content & Data Sources

- **Resume Data (**`/data/resume.json`**):**
  - Pre-structured JSON file containing: personal info, education, experience, projects, skills, and publications.
  - Single source of truth for populating About, Projects, and Publications pages.
- **Publications Data (**`/data/publications.json`**):**
  - Structured publication data extracted from resume with proper DOI links, abstracts, and metadata.
  - Enables rich publication display with filtering and search capabilities.
- **Visited Map (**`/data/map.json`**):**
  ```json
  [
    { 
      "city": "Atlanta", 
      "country": "USA", 
      "state": "Georgia",
      "dates": "Aug 2024 - Present",
      "notes": "Graduate studies at Georgia Institute of Technology - MS in Robotics"
    },
    { 
      "city": "Toronto", 
      "country": "Canada",
      "state": "Ontario", 
      "dates": "Sep 2019 - Apr 2024",
      "notes": "Undergraduate studies at University of Toronto - Mechanical Engineering"
    },
    { 
      "city": "Markham", 
      "country": "Canada",
      "state": "Ontario",
      "dates": "May 2022 - Aug 2023",
      "notes": "Machine Learning Engineer internship at Huawei Canada"
    },
    {
      "city": "San Diego",
      "country": "USA",
      "state": "California", 
      "dates": "May 2025 - Aug 2025",
      "notes": "Robotics Engineer position at Advanced Mechatronics Solutions"
    }
  ]
  ```
- **Visual Assets:**
  - Professional headshot (`/assets/Cherry.jpg`)
  - Project placeholder images (to be replaced with actual screenshots later)

### 3. Feature Inventory

1. **Home** — Intro section + featured projects grid.
2. **About** — Bio and resume-driven timeline & skills matrix.
3. **Projects** — Dynamic cards populated from resume JSON with placeholder images.
4. **Publications** — List extracted from resume JSON with expandable abstracts and DOI links.
5. **Visited Map** — Interactive world map with academic/professional locations and timeline.
6. **Contact** — Simple mailto link.
7. **Footer** — Social links (GitHub, LinkedIn, Portfolio), copyright.

### 4. Information Architecture & Routes

```bash
title: Personal Website Routes
/		→ Home
/about	→ About (resume-driven)
/projects	→ Projects overview
/projects/:slug → Project detail
/publications → Publications list (from resume data)
/map	→ Visited Map
/contact → Contact (mailto only)
```

### 5. Theming & Styling

- **Color Palette:**
  - `primary`: `#FFDCDC`
  - `secondary`: `#FFF2EB`
  - `accent1`: `#FFE8CD`
  - `accent2`: `#FFD6BA`
- **Implementation:**
  - CSS variables in `globals.css`:
    ```css
    :root {
      --color-primary: #FFDCDC;
      --color-secondary: #FFF2EB;
      --color-accent1: #FFE8CD;
      --color-accent2: #FFD6BA;
    }
    ```
  - Tailwind config (`tailwind.config.js`): extend theme colors accordingly.
- **Typography:** Define font families via CSS variables for easy swaps.
- **Theming Flexibility:** CSS variables allow theme presets or dark/light toggles.

### 6. Component & Layout Guidelines

- **Layout:** Next.js + Tailwind, with a global layout component wrapping pages.
- **Navigation:** Sticky header with responsive hamburger menu on small screens.
- **Cards:** Consistent card component for projects & publications with soft shadows and rounded corners.
- **Map:** Use React Simple Maps; style markers according to accent colors with modal popups for trip details.
- **Performance:** Image optimization with Next.js Image component, lazy loading for below-fold content.
- **Accessibility:** ARIA roles, keyboard navigation, color contrast checks.

### 7. Project Timeline & Milestones

| Week | Deliverables                                                   |
| ---- | -------------------------------------------------------------- |
| 1    | ✅ Finalize project plan & wireframes                         |
|      | ✅ Data organization: moved resume.json to `/data/`, created `map.json` and `publications.json` |
|      | - Set up repository & install dependencies (Next.js, Tailwind) |
| 2    | - Implement global layout, theme variables, and header/nav     |
|      | - Integrate data files with proper structure and validation     |
| 3    | - Build About and Projects pages ingesting resume data         |
|      | - Create Publications page with proper DOI links from resume data |
| 4    | - Develop Visited Map page with academic/professional timeline |
|      | - Create Contact page with mailto functionality               |
|      | - Mobile responsiveness testing & accessibility audit          |
| 5    | - Polish styling, add animations (Framer Motion)               |
|      | - Deploy to Vercel and perform QA                             |
|      | - Implement performance optimizations                          |

### 8. Next Steps

1. **Data Organization:** Move `resume.json` to `/data/` directory and create `map.json` with Cherry's academic/professional timeline.
2. **Wireframes:** Review and approve updated wireframes reflecting Cherry's identity and career path.
3. **Repository Setup:** Initialize Next.js project scaffold with Vercel deployment.
4. **Development Kickoff:** Begin implementation, adhering to design principles.

---

*Reflecting on my values: this plan emphasizes concise, modular code, theming flexibility, clear communication, and a responsive, accessible UI optimized for performance. The focus on academic and research achievements aligns with Cherry's robotics and ML background.*

