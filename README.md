# EDUXCEL — National Collegiate Talent & Ranking Arena

> A nationwide platform connecting colleges across the country to rank themselves based on verified student talent in **Coding**, **Sports**, **Academics**, and **Extracurriculars**.

---

## 🌟 Key Features

1. **Floating Dynamic Island (Top Taskbar Replacement)**:
   - The conventional top taskbar is replaced by a sleek, floating **Dynamic Island** centered at the top.
   - **Hover / Focus state**: Smoothly expands into a full taskbar revealing **Sign In**, **Know More**, and **Developer** (`href="#"`).

2. **Ambient Lo-Fi Music Button (Beside Dynamic Island)**:
   - Placed directly beside the Dynamic Island at the top.
   - Controls background audio: `atlasaudio-ambient-lofi-576613.mp3`.
   - Features animated equalizer soundwaves (`||||`) and live play/pause toggling.

3. **Upper-Left Logo & Dedicated Video Player**:
   - Prominently situated on the upper-left (below the taskbar line):
     - Stylized brand typography: **EDUXCEL**.
     - **Video Player**: Exclusively attached to `TWMate.com-a3d9a573988513af7ef808a2700ee2aa.mp4`.
     - **Default Mute**: Set to muted by default for clean, non-intrusive autoplay.
     - **Full Screen Option**: Includes a dedicated fullscreen toggle button in the top-right corner of the player (also supports double-click).

4. **Collegiate Talent Uplift Concept**:
   - The Four Arenas: Coding & Tech, Sports & Athletics, Academics & Research, Extracurriculars & Arts.
   - Interactive **"Boost Your Campus" Simulator** where students can simulate logging achievements and watch live leaderboard recalculations.
   - Live National Leaderboard with search, category filtering, and real-time score telemetry.

---

## 📁 File Structure

```
eduexcel/
├── index.html                                        # Main landing page markup & structure
├── styles.css                                        # Master stylesheet (Cream & White luxury theme)
├── app.js                                            # Dynamic island, video fullscreen & ambient music controls
├── server.ps1                                        # HTTP server with Range streaming & audio MIME types
├── TWMate.com-a3d9a573988513af7ef808a2700ee2aa.mp4  # Logo animation video (attached to video player)
├── atlasaudio-ambient-lofi-576613.mp3                # Background ambient lo-fi music
└── README.md                                         # Project documentation
```

---

## 🚀 How to Run & View

### Option 1: View via Local Server (Active)
Visit: **[http://localhost:3000/](http://localhost:3000/)**

If the server ever needs to be restarted:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

### Option 2: Open Directly
Double-click `index.html` in your file explorer to open it in Chrome, Edge, Brave, or any browser.
