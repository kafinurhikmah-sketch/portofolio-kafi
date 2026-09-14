/**
 * Main Interactive Logic for Kafi Nur Hikmah Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Render Projects
  renderProjects('all');

  // 2. Setup Project Filter Buttons
  setupProjectFilters();

  // 3. Setup Mobile Navigation Toggle
  setupMobileNav();

  // 4. Setup Scroll Spy (Active Navbar Indicator)
  setupScrollSpy();

  // 5. Setup Back to Top Button
  setupBackToTop();

  // 6. Setup Contact Form Submission
  setupContactForm();

  // 7. Setup CV Modal
  setupCvModal();

  // 8. Setup Cursor Glow Tracking
  setupCursorGlow();
});

/**
 * Render Project Cards into Container
 */
function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projects-grid');
  const data = (typeof window !== 'undefined' && window.projectsData) || (typeof projectsData !== 'undefined' ? projectsData : []);
  if (!container || !data || data.length === 0) return;

  const filtered = filterCategory === 'all' 
    ? data 
    : data.filter(p => p.category === filterCategory);

  container.innerHTML = '';

  filtered.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card group relative rounded-2xl overflow-hidden glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String((index % 3) * 100));

    const badgeColorClass = project.badgeColor === 'cyan' 
      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
      : 'bg-purple-500/10 text-purple-400 border-purple-500/20';

    const techBadges = project.techStack.map(tech => `
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 font-mono border border-slate-700/50">
        ${tech}
      </span>
    `).join('');

    card.innerHTML = `
      <!-- Project Visual Mockup Header -->
      <div class="relative h-52 w-full bg-gradient-to-br ${project.imageBg} p-6 flex flex-col justify-between overflow-hidden border-b border-slate-800">
        <!-- Ambient Grid Background -->
        <div class="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        <!-- Category & Status Badge -->
        <div class="relative z-10 flex items-center justify-between">
          <span class="text-xs font-semibold px-3 py-1 rounded-full border ${badgeColorClass} backdrop-blur-md">
            ${project.badge}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <i data-lucide="${project.category === 'mobile' ? 'smartphone' : 'layout'}" class="w-3.5 h-3.5 text-cyan-400"></i>
            ${project.categoryLabel}
          </span>
        </div>

        <!-- Simulated Device Mockup / Code Graphic -->
        <div class="relative z-10 my-auto flex items-center justify-center">
          <div class="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shadow-xl group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
            <i data-lucide="${project.icon}" class="w-8 h-8"></i>
          </div>
        </div>

        <!-- Quick Links Overlay Bar -->
        <div class="relative z-10 flex items-center justify-between text-xs text-slate-300">
          <span class="text-slate-400 font-mono">#0${index + 1}</span>
          <div class="flex items-center gap-3">
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors" title="Lihat Repository GitHub">
              <i data-lucide="github" class="w-4 h-4"></i>
            </a>
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors" title="Lihat Demo">
              <i data-lucide="external-link" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Project Content Body -->
      <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <h3 class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            ${project.title}
          </h3>
          <p class="text-sm text-slate-400 mt-2 leading-relaxed">
            ${project.summary}
          </p>

          <!-- Problem & Solution Box -->
          <div class="mt-4 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2 text-xs">
            <div>
              <span class="font-semibold text-rose-400 flex items-center gap-1">
                <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> Masalah (Challenge):
              </span>
              <p class="text-slate-400 mt-0.5 leading-normal">${project.problem}</p>
            </div>
            <div class="pt-2 border-t border-slate-800">
              <span class="font-semibold text-emerald-400 flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Solusi Rekayasa (Solution):
              </span>
              <p class="text-slate-400 mt-0.5 leading-normal">${project.solution}</p>
            </div>
          </div>
        </div>

        <!-- Tech Stack Badges -->
        <div>
          <div class="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 font-mono">Tech Stack:</div>
          <div class="flex flex-wrap gap-1.5">
            ${techBadges}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-slate-800 flex items-center gap-3">
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-semibold text-xs text-center border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center gap-2">
            <i data-lucide="play" class="w-3.5 h-3.5"></i>
            Live Demo
          </a>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs text-center border border-slate-700/60 transition-all duration-200 flex items-center justify-center gap-2">
            <i data-lucide="github" class="w-3.5 h-3.5"></i>
            Source Code
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Re-run lucide icons for newly appended cards
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Initialize VanillaTilt for dynamic project cards
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
      max: 4,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
    });
  }

  // Refresh AOS to capture new elements
  if (window.AOS) {
    setTimeout(() => {
      window.AOS.refresh();
    }, 100);
  }
}

/**
 * Setup Category Filter Click Listeners
 */
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/25');
        b.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
      });

      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
      btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/25');

      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });
}

/**
 * Mobile Navigation Drawer Toggle
 */
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      toggleBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    } else {
      mobileMenu.classList.add('hidden');
      toggleBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      toggleBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

/**
 * Scroll Spy - Active Navbar Highlighting
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-bold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-bold');
        link.classList.remove('text-slate-300');
      }
    });
  });
}

/**
 * Back To Top Button Behavior
 */
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
      btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
      btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Contact Form Submission & Toast Notification
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const category = document.getElementById('contact-category').value;
    const message = document.getElementById('contact-message-input').value.trim();

    if (!name || !email || !message) {
      showToast('Form Belum Lengkap', 'Mohon lengkapi Nama, Email, dan Pesan Anda.', 'error');
      return;
    }

    // Submit state animation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-slate-900 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Mengirim Pesan...
    `;

    // Simulate reliable async delivery
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      showToast(
        'Pesan Berhasil Terkirim!',
        `Terima kasih, ${name}. Pesan Anda telah diterima. Kafi Nur Hikmah akan segera merespons via ${email}.`,
        'success'
      );
    }, 1200);
  });

  function showToast(title, msg, type = 'success') {
    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = msg;

    const iconEl = toast.querySelector('#toast-icon');
    if (iconEl) {
      if (type === 'success') {
        iconEl.className = 'w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0';
        iconEl.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
      } else {
        iconEl.className = 'w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0';
        iconEl.innerHTML = '<i data-lucide="alert-triangle" class="w-4 h-4"></i>';
      }
      if (window.lucide) window.lucide.createIcons();
    }

    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }, 5500);
  }
}

/**
 * CV Modal Logic
 */
function setupCvModal() {
  const openBtns = document.querySelectorAll('.cv-modal-trigger');
  const modal = document.getElementById('cv-modal');
  const closeBtn = document.getElementById('close-cv-modal');
  const backdrop = document.getElementById('cv-modal-backdrop');

  if (!modal) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/**
 * Interactive Cursor Glow Tracking
 */
function setupCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  // Show glow when mouse moves
  document.addEventListener('mousemove', (e) => {
    // Only apply opacity transition once to avoid lag, but update variables continuously
    if (glow.classList.contains('opacity-0')) {
      glow.classList.remove('opacity-0');
      glow.classList.add('opacity-100');
    }
    glow.style.setProperty('--mouse-x', `${e.clientX}px`);
    glow.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // Hide glow when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    glow.classList.remove('opacity-100');
    glow.classList.add('opacity-0');
  });
}
