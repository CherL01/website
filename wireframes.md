## Wireframe Specifications for Personal Website

### 1. Home Page

**Header**

- Logo / Name (top-left)
- Navigation links (About | Projects | Publications | Map | Contact)
- Mobile: Hamburger menu toggles nav links

---

**Hero Section**

```
────────────────────────────────────────────────
|                     Header                  |
|----------------------------------------------|
| [Photo]       | Welcome! I'm Cherry Lian     |
| (circular)    |                      [CTA]  |
| Cherry.jpg    | Robotics Engineer & ML       |
|               | Researcher                   |
|----------------------------------------------|
| Reactive background/particle effect overlay |
────────────────────────────────────────────────
```

- Left: circular headshot photo (`Cherry.jpg`)
- Right: tagline and primary CTA button "Download Resume"
- Background: subtle animated particles or parallax

---

**Featured Projects**

- Grid of 2 cards (2 columns on desktop, 1 on mobile)
- Each card: placeholder image thumbnail, title, short description, "Learn more" link
- Data populated from resume.json projects section

---

**Footer**

- Social icons (GitHub, LinkedIn, Portfolio)
- © 2025 Yi (Cherry) Lian

---

### 2. About Page

**Vertical Timeline**

```
2025 ─────── Robotics Engineer @ Advanced Mechatronics Solutions
         |
2024 ───── MS Robotics Student @ Georgia Tech (4.0 GPA)
         |
2023 ───── ML Engineer @ Huawei Canada  
         |
2019 ───── B.A.Sc. Mechanical Engineering @ University of Toronto
```

- Pull items from resume.json education and experience data
- Markers on left, content on right

**Skills Matrix**

- Tags laid out in rows (e.g. Python, ROS2, PyTorch, SLAM, Computer Vision, ML)
- Data from resume.json technical_skills section

---

**Personal Bio**

- Brief paragraph about Cherry's robotics and ML background
- "Download CV" link below (links to `/assets/Yi_Lian_Resume.pdf`)

---

### 3. Projects Overview

**Filter Bar** (search + dropdown for tech filters)

**Project Cards**

- Placeholder thumbnail + title + tech tags + short blurb + link icon
- Data populated from resume.json projects section
- Show both projects: HINTeract and SpooderMan

---

### 4. Project Detail

```
──────────────────────────────────────
| [Placeholder Banner Image]         |
|------------------------------------|
| Title: HINTeract Framework         |
| Tech: Python, Robosuite, PyTorch   |
| Description: Interactive Robot      |
| Learning with hint-guided feedback |
| Screenshots gallery (placeholder)  |
| Links: [GitHub] [Research Paper]   |
──────────────────────────────────────
```

- Placeholder screenshots gallery (carousel)
- Link icons at bottom
- Content from resume.json project entries

---

### 5. Publications

- List of entries with year badge
- Publications from Huawei research work and Georgia Tech research
- Title, venue, year, DOI link icon
- Click expands/collapses abstract
- **Data source:** Extract publications from resume.json experience responsibilities

**Example Publications:**
- "Implicit Behavioral Cues for Enhancing Trust and Comfort in Robot Social Navigation" (ICRA 2025)
- "Toward Fair and Efficient Congestion Control: Machine Learning Aided Congestion Control" (APNET '23)
- "OpenData: A Framework to Train and Deploy ML Solutions in Wide-Area Networks" (IEEE Network 2023)

---

### 6. Visited Map

```
┌────────────────────────────────────────┐
│                World Map              │
│  ● Toronto    ● Markham    ● Atlanta   │
│                           ● San Diego  │
└────────────────────────────────────────┘
```

- Markers clickable to open modal showing academic/professional timeline
- **Modal content:**
  - Institution/Company
  - Duration
  - Role/Degree
  - Key achievements
- Data from map.json with enhanced structure

---

### 7. Contact

- Simple line: "Email me at [cherry.lian@gatech.edu](mailto:cherry.lian@gatech.edu)"
- Mailto link only (no contact form)

---

**Footer Updates**

- Social links: GitHub, LinkedIn, Portfolio (as per resume.json profiles)
- Clean, minimal icon design

---

**Performance Considerations**

- All images use Next.js Image component with optimization
- Lazy loading for below-fold content
- Placeholder images for projects initially
- Optimized for Vercel deployment

---

*All layouts use CSS variables/Tailwind theming to swap colors (#FFDCDC, #FFF2EB, #FFE8CD, #FFD6BA). Components designed mobile-first and enhance on desktop. Data-driven approach using resume.json as single source of truth for Cherry's robotics and ML career.*

