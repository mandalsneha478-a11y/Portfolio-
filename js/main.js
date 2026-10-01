/**
 * SNEHA MANDAL - PORTFOLIO INTERACTIVE CORE
 * Neural Canvas, Typing Effect, 3D Tilt, Project Modals, Interactive CLI & Audio Synth
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypingEffect();
  initNavbarScroll();
  initMobileNav();
  initCounterStats();
  initProjectFiltering();
  initProjectModals();
  initResumeModal();
  initTerminalCLI();
  initContactForm();
  initCopyEmail();
  initWebAudioSynth();
  initMouseSpotlight();
});

/* ==========================================================================
   1. MOUSE SPOTLIGHT FOLLOWER
   ========================================================================== */
function initMouseSpotlight() {
  const spotlight = document.querySelector('.mouse-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* ==========================================================================
   2. AI NEURAL NETWORK PARTICLE CANVAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const maxDistance = 140;
  const mouse = { x: null, y: null, radius: 160 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 14000); // Dynamic count based on screen area
    const particleCount = Math.min(Math.max(count, 35), 85);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(168, 85, 247, '
      });
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Bounce at edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse interactive attraction/repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.75)';
      ctx.fill();

      // Connect with nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(79, 172, 254, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. MULTI-PHRASE TYPING TEXT EFFECT
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typing-role');
  if (!target) return;

  const roles = [
    "Data Scientist",
    "AI Enthusiast & Researcher",
    "AR/VR Developer",
    "Intelligent Systems Builder",
    "Machine Learning Engineer",
    "Full-Stack Innovator"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2200; // Pause when complete
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. NAVBAR SCROLL & ACTIVE SPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   6. ANIMATED COUNTER STATS
   ========================================================================== */
function initCounterStats() {
  const statsSection = document.querySelector('.hero-stats-banner');
  if (!statsSection) return;

  const numbers = document.querySelectorAll('.stat-number');
  let activated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !activated) {
        activated = true;
        numbers.forEach((num) => {
          const target = parseInt(num.getAttribute('data-target'), 10);
          const suffix = num.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              num.textContent = target + suffix;
              clearInterval(timer);
            } else {
              num.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);
        });

        // Trigger skill bars animation as well
        document.querySelectorAll('.skill-progress-fill').forEach((bar) => {
          bar.classList.add('active');
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* ==========================================================================
   7. PROJECT FILTERING TABS
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   8. PROJECT DETAIL MODALS DATA & ENGINE
   ========================================================================== */
const projectDetailsData = {
  kindnesskart: {
    title: "KindnessKart – Full-Stack NGO Donation Platform",
    category: "Full-Stack Web • Social Impact",
    image: "assets/images/project-kindnesskart.svg",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "REST APIs"],
    problem: "Orphanages and grassroot NGOs often lack digital infrastructure to broadcast item-specific shortages, causing misdirected donations and critical resource supply gaps.",
    solution: "Engineered a high-performance donation portal connecting prospective donors directly with verified orphanages and NGOs. Features real-time requirement inventories, delivery tracking, and transparent impact analytics.",
    features: [
      "Real-time inventory sync for orphanages with urgent food, book, and medicine requests",
      "Secure authentication & RBAC for verified NGO administrators and individual donors",
      "Dynamic filtering by geographic location, urgency status, and item category",
      "Integrated impact dashboard tracking kilograms of food and units distributed",
      "Responsive glassmorphism UI with Supabase real-time websocket subscriptions"
    ],
    githubUrl: "https://github.com/mandalsneha478-a11y/Portfolio-",
    demoUrl: "https://kindnesskart.vercel.app"
  },
  aichatbot: {
    title: "AI Chatbot for Government Citizen Services",
    category: "Generative AI • Hackathon Winner",
    image: "assets/images/project-aichatbot.svg",
    tech: ["Python", "Google Gemini API", "Prompt Engineering", "HTML5", "CSS3", "JavaScript"],
    problem: "Government portals and official welfare scheme documents are excessively convoluted, causing millions of citizens to miss out on vital healthcare, subsidies, and educational grants.",
    solution: "Designed and deployed an intelligent conversational agent powered by Google Gemini API during a fast-paced hackathon. Translates bureaucratic documentation into simple, clear, multilingual conversational steps with 98% intent resolution.",
    features: [
      "Multilingual query processing supporting English, Hindi, and regional dialects",
      "Context-aware eligibility verification pipeline for subsidy schemes",
      "Sub-second response streaming using Gemini API with tuned prompt guardrails",
      "Built-in fallback escalation and automated links to direct official application forms",
      "Recognized with Hackathon Winner honors for civic innovation"
    ],
    githubUrl: "https://github.com/mandalsneha478-a11y/Portfolio-",
    demoUrl: "https://gov-ai-portal.netlify.app"
  },
  vrsimulator: {
    title: "VR Car Driving Simulator",
    category: "AR / VR • Unity 3D & C#",
    image: "assets/images/project-vrsimulator.svg",
    tech: ["Unity 3D", "C#", "XR Interaction Toolkit", "Physics Engine", "3D Modeling"],
    problem: "Traditional novice driving training requires costly physical vehicles and carries collision risks during initial steering calibration and high-speed emergency reflex drills.",
    solution: "Created an immersive VR Driving Simulator built from scratch during the IOFT internship. Simulates accurate wheel-force feedback, suspension dynamics, HUD telemetry, and varied environmental conditions.",
    features: [
      "6-DOF immersive cockpit view with realistic mirrors, dashboard gauges, and steering response",
      "Custom C# physics scripts modeling acceleration curves, braking distance, and tire friction",
      "Dynamic day/night and adverse weather systems impacting windshield visibility",
      "Audio synthesis for realistic engine rumble and road surface interaction",
      "Tested and optimized for zero-motion-sickness high frame rates (90 FPS+)"
    ],
    githubUrl: "https://github.com/mandalsneha478-a11y/Portfolio-",
    demoUrl: "https://youtube.com"
  },
  iotsmoke: {
    title: "IoT Smoke & Fire Detection System",
    category: "IoT Systems • Edge Telemetry",
    image: "assets/images/project-iotsmoke.svg",
    tech: ["IoT Sensors", "Python", "Microcontrollers", "WebSockets", "Hardware Prototyping"],
    problem: "Standard commercial fire alarms only sound local auditory sirens, leaving properties unprotected when managers are off-site or away from the premises.",
    solution: "Engineered an intelligent IoT-enabled sensor node combining gas/smoke ionization detection and thermal IR heat signatures with automated cloud telemetry and instant SMS/Email notifications.",
    features: [
      "Real-time smoke density monitoring (PPM) with continuous threshold analysis",
      "Dual-spectrum verification (smoke particles + temperature differential) to eradicate false alarms",
      "Instant multi-channel emergency alert dispatch (SMS, Email, and Cloud Dashboard)",
      "Prototyped and calibrated during the IOFT internship with physical hardware test rigs",
      "Low-power consumption sleep mode for uninterrupted extended battery uptime"
    ],
    githubUrl: "https://github.com/mandalsneha478-a11y/Portfolio-",
    demoUrl: "https://github.com/mandalsneha478-a11y/Portfolio-"
  },
  codesage: {
    title: "CodeSage – AI-Powered Code Reviewer & Mentor",
    category: "AI & Developer Tools",
    image: "assets/images/project-codesage.svg",
    tech: ["Gemini API", "JavaScript", "Abstract Syntax Trees (AST)", "HTML5", "CSS3"],
    problem: "Junior developers and computer engineering students frequently struggle with detecting subtle algorithmic bottlenecks (e.g. nested O(N²) loops) and security vulnerabilities in their code.",
    solution: "Created CodeSage, an interactive developer platform that parses code, computes algorithmic complexity, flags potential security pitfalls, and provides inline AI refactoring suggestions.",
    features: [
      "Automated algorithmic time and space complexity estimation (Big-O notation)",
      "Vulnerability audit for common flaws: SQL injections, unhandled exceptions, memory leaks",
      "Side-by-side smart refactoring recommendations with '1-Click Apply'",
      "Interactive code mentorship assistant explaining complex data structures intuitively",
      "Fast client-side syntax highlighting and tokenization"
    ],
    githubUrl: "https://github.com/mandalsneha478-a11y/Portfolio-",
    demoUrl: "https://codesage-ai.vercel.app"
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.project-btn-details');

  if (!modalBackdrop || !closeBtn) return;

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-badge').textContent = data.category;
    document.getElementById('modal-problem').textContent = data.problem;
    document.getElementById('modal-solution').textContent = data.solution;
    
    // Tech pills
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach((t) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    // Features
    const featContainer = document.getElementById('modal-features');
    featContainer.innerHTML = '';
    data.features.forEach((f) => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${f}</span>`;
      featContainer.appendChild(li);
    });

    // Links
    document.getElementById('modal-github-btn').href = data.githubUrl;
    document.getElementById('modal-demo-btn').href = data.demoUrl;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  detailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. RESUME MODAL & PRINT/DOWNLOAD ENGINE
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('print-resume-btn');
  const downloadBtn = document.getElementById('download-resume-btn');

  if (!resumeModal || !closeBtn) return;

  function openResume() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    openResume();
  }));

  closeBtn.addEventListener('click', closeResume);
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast("Generating official PDF resume for Sneha Mandal...");
      // Trigger browser print or download
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }
}

/* ==========================================================================
   10. INTERACTIVE TERMINAL CLI (ABOUT SECTION)
   ========================================================================== */
function initTerminalCLI() {
  const input = document.getElementById('cli-input');
  const output = document.getElementById('cli-output');
  if (!input || !output) return;

  const commands = {
    help: "Available commands: skills, projects, experience, education, achievements, contact, hire, clear",
    skills: "Programming: Python, Java, C++, JS | AI/DS: ML, Pandas, NumPy, Scikit-Learn | Web: React, Tailwind, Supabase | Other: Unity 3D, AR/VR, IoT, Gemini API",
    projects: "1. KindnessKart (React/Supabase) | 2. AI Gov Chatbot (Gemini) | 3. VR Car Driving Simulator (Unity) | 4. IoT Fire Alert | 5. CodeSage AI",
    experience: "AR/VR Developer Intern at IOFT (June-July 2024): Built VR Simulator, AR Body Scanner, IoT Fire System, Unity & Python AI integrations.",
    education: "B.Tech Data Science (Expected 2028) @ NMIMS MPSTME | Diploma in Computer Eng (2022-2025) @ Thakur Polytechnic",
    achievements: "2x Hackathon Winner | GDG Cloud Hackathon | HackSpark 1.0 | Technofest Competition | Vortex Technical Paper",
    contact: "Email: sneha.mandal.ds@gmail.com | Location: Mumbai, India | LinkedIn: /in/snehamandal | GitHub: github.com/mandalsneha478-a11y",
    hire: "Sneha is currently actively interviewing for Summer 2025/2026 Internships and Hackathon collaborations! Let's connect.",
    clear: ""
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      if (cmd === 'clear') {
        output.innerHTML = '';
        return;
      }

      if (commands[cmd]) {
        output.innerHTML = `<span style="color: #00f2fe;">&gt; ${cmd}</span><br><span style="color: #cbd5e0;">${commands[cmd]}</span>`;
      } else if (cmd === '') {
        output.innerHTML = '';
      } else {
        output.innerHTML = `<span style="color: #ff5f56;">Command '${cmd}' not recognized. Type <strong style="color: #00f2fe;">help</strong> for commands.</span>`;
      }
    }
  });
}

/* ==========================================================================
   11. CONTACT FORM VALIDATION & TRANSMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-form-btn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please provide a valid email address.", "error");
      return;
    }

    // Submit state animation
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Encrypting & Transmitting...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Transmitted!`;
      showToast("Message transmitted successfully! Sneha will respond promptly.");
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* ==========================================================================
   12. QUICK COPY EMAIL ACTION
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.querySelector('.quick-copy-email');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = "sneha.mandal.ds@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("Email address copied to clipboard!");
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = orig;
      }, 2000);
    }).catch(() => {
      showToast("Copied: sneha.mandal.ds@gmail.com");
    });
  });
}

/* ==========================================================================
   13. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = "success") {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check';
  const iconColor = type === 'error' ? '#f43f5e' : '#10b981';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon" style="color: ${iconColor};"></i>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   14. WEB AUDIO SCI-FI SYNTHESIZER (ZERO ASSET AUDIO)
   ========================================================================== */
function initWebAudioSynth() {
  let audioCtx = null;
  let soundEnabled = false;
  const soundBtn = document.getElementById('sound-toggle-btn');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playTone(freq, type = 'sine', duration = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
      // Audio context error ignore
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle('active', soundEnabled);
      if (soundEnabled) {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        showToast("Audio feedback enabled.");
        playTone(587.33, 'triangle', 0.12);
      } else {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        showToast("Audio feedback muted.");
      }
    });
  }

  // Interactive subtle clicks on buttons and links
  document.querySelectorAll('a, button, .filter-btn, .project-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled) playTone(440, 'sine', 0.04);
    });
    el.addEventListener('click', () => {
      if (soundEnabled) playTone(880, 'triangle', 0.08);
    });
  });
}
