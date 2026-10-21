# EDUXCEL — National Collegiate Talent & Ranking Arena

> A nationwide platform connecting colleges across the country to rank themselves based on verified student talent in **Coding**, **Sports**, **Academics**, and **Extracurriculars**.

---

## 🌟 Key Features

1. **Floating Dynamic Island (Top Taskbar Replacement)**:
   - The conventional top taskbar has been replaced by a sleek, floating **Dynamic Island** centered at the top.
   - **Resting state**: A compact, glowing capsule showing the live league status and pulsating beacon.
   - **Hover / Focus state**: Smoothly expands into a full taskbar revealing:
     - **Sign In** (`href="#"`)
     - **Know More** (`href="#"`)
     - **Developer** (`href="#"`)
     - Active rank telemetry badge.

2. **Upper-Left Logo & Video Space for Animation Logo**:
   - Prominently situated on the upper-left (below the taskbar line):
     - Stylized brand typography: **EDUXCEL**.
     - Dedicated **video container** engineered for your animation logo.
     - Includes an interactive **"Test Your Video"** button to preview your `.mp4` / `.webm` animation directly in the browser.
     - Features an orbital canvas particle animation by default until your video file is added.

3. **Student Talent Uplift Concept**:
   - Allows individual students to elevate their college's national rank by winning hackathons, publishing papers, winning sports medals, or leading cultural fests.
   - Interactive **"Boost Your Campus" Simulator** where you can select a university, select a talent achievement, and watch points surge with live leaderboard recalculations.

4. **Live National Leaderboard**:
   - Real-time ranking of top institutes (IIT Bombay, BITS Pilani, NIT Trichy, Delhi University, IIIT Hyderabad, etc.).
   - Instant filtering by **All Arenas**, **Coding**, **Sports**, **Academics**, and **Extracurriculars**.
   - Instant search by college name, city, or specialty.

---

## 📁 File Structure

```
eduexcel/
├── index.html        # Main landing page markup & structure
├── styles.css        # Designer-grade dark mode styling & animations
├── app.js            # Dynamic island morphing, video loader, live leaderboard & simulator
└── README.md         # Documentation & setup instructions
```

---

## 🎬 How to Add Your Own Animation Logo Video

Open `index.html` and look for the `<video id="userLogoAnimation">` element:

```html
<video id="userLogoAnimation" class="logo-animation-media" autoplay loop muted playsinline poster="">
  <!-- Place your video filename or path here: -->
  <source src="your_logo_animation.mp4" type="video/mp4" id="videoSourceTag">
</video>
```

You can also simply click the **"Test Your Video"** pill directly inside the video box on the webpage to select any MP4 or WebM video file from your computer and preview it immediately!

---

## 🚀 How to Run

You can view the project in any web browser:

1. **Double-click** `index.html` in your file explorer, or
2. Run a simple local server using PowerShell:
   ```powershell
   python -m http.server 3000
   ```
   and visit `http://localhost:3000`.
