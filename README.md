# Sneha Mandal — AI & Data Science Portfolio Website

A modern, futuristic, dark-themed portfolio website with glassmorphism, dynamic AI neural canvas animations, interactive 3D effects, and a terminal easter egg. Built for **Sneha Mandal** (Data Scientist | AI Enthusiast | AR/VR Developer).

---

## 🚀 Live Preview & Running Locally

This portfolio is built using modern standards-compliant **HTML5**, **CSS3**, and **Vanilla ES6+ JavaScript**. It requires **zero external build steps or NPM dependencies**, meaning it runs instantly in any browser.

### Option 1: Direct File Preview
Simply double-click [`index.html`](file:///c:/Users/Sneha/OneDrive/Desktop/imap%20portffolio/index.html) to open the portfolio directly in your default web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Recommended)
Run Python's built-in HTTP server from the project directory:
```bash
python -m http.server 8080
```
Then navigate to:
```
http://localhost:8080
```

---

## 🎨 Design & Style Highlights
- **Futuristic Dark Palette**: Deep obsidian void (`#060813`) layered with glassmorphic cards (`backdrop-filter: blur(16px)`), electric cyan (`#00f2fe`), violet (`#a855f7`), and emerald accents.
- **AI Neural Network Particle Canvas**: Real-time interactive canvas background connecting constellation nodes with distance-based vectors that react dynamically to cursor movements.
- **Dynamic Typing Text Effect**: Smooth typewriter animation looping through Sneha's core specializations.
- **Interactive Terminal CLI (`sneha.config.ts`)**: Interactive easter egg in the About section where users can type commands like `help`, `skills`, `projects`, `experience`, `hire`, and `clear`.
- **Interactive Project Deep Dive Modal**: In-depth architecture, problem statements, solutions, and engineering specs for each featured project.
- **Full Interactive Resume Viewer & PDF Downloader**: In-browser preview of Sneha's official CV with instant Print / PDF generation.
- **Sci-Fi Web Audio SFX**: Synthesizer built with the native Web Audio API (toggleable via the speaker icon in the navbar).
- **SEO & Social Share Ready**: OpenGraph metadata, Twitter Cards, and Schema.org `Person` JSON-LD structured data.

---

## 📂 Project Structure
```
imap portffolio/
├── index.html                   # Core semantic HTML5 layout with all 10 sections & SEO
├── css/
│   └── style.css                # Custom glassmorphic styling, animations, responsive grid
├── js/
│   └── main.js                  # Particle canvas, typing effect, modals, terminal CLI, sound synth
├── assets/
│   └── images/
│       ├── avatar.svg                  # Custom futuristic avatar vector for Sneha Mandal
│       ├── project-kindnesskart.svg    # KindnessKart donation platform illustration
│       ├── project-aichatbot.svg       # AI Chatbot for Government illustration
│       ├── project-vrsimulator.svg     # VR Car Driving Simulator cockpit visual
│       ├── project-iotsmoke.svg        # IoT Smoke & Fire telemetry dashboard visual
│       └── project-codesage.svg        # CodeSage AI code reviewer visual
└── README.md                    # Documentation & deployment guide
```

---

## 🌐 Deploying to Free Hosting (GitHub Pages / Vercel / Netlify)

### Deploying to GitHub Pages:
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Sneha Mandal portfolio"
   ```
2. Link your repository:
   ```bash
   git remote add origin https://github.com/mandalsneha478-a11y/Portfolio-.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository **Settings** → **Pages** → Source: select `main` branch and `/ (root)` folder → Click **Save**.

### Deploying to Vercel or Netlify:
- Simply drag and drop the folder into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
