/* ═══════════════════════════════════════════
   SCRIPT — Editorial AI Portfolio
═══════════════════════════════════════════ */

// ── LOADER ──────────────────────────────
(function runLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loader-bar');
  const count = document.getElementById('loader-count');
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    bar.style.width = progress + '%';
    count.textContent = Math.floor(progress);
    if (progress >= 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        startHeroAnimation();
      }, 300);
    }
  }, 60);

  document.body.style.overflow = 'hidden';
})();

// ── THEME TOGGLE ─────────────────────────
(function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Optional: auto-detect system light theme, but let's default to dark for this portfolio 
    // root.setAttribute('data-theme', 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      if (currentTheme === 'light') {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
})();

// ── HERO HEADLINE ANIMATION ─────────────
function startHeroAnimation() {
  const lines = document.querySelectorAll('.hero-headline .line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(60px)';
    line.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 50 + i * 50);
  });
  document.querySelectorAll('.hero-eyebrow, .hero-bottom').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 60);
  });
}

// ── CUSTOM CURSOR ────────────────────────
(function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });
  function animate() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  const interactives = document.querySelectorAll('a, button, .bento-cell, .project-row');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ── HEADER SCROLL ────────────────────────
(function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── MOBILE MENU ──────────────────────────
(function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  menu.querySelectorAll('.mm-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── SCROLL REVEAL ────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ── BACK TO TOP ──────────────────────────
(function initBTT() {
  const btt = document.getElementById('btt');
  if (!btt) return;
  window.addEventListener('scroll', () => {
    btt.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── STACK BARS ───────────────────────────
(function initStackBars() {
  const bars = document.querySelectorAll('.stack-bar');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const p = e.target.dataset.p;
        e.target.querySelector('div').style.width = p + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => obs.observe(b));
})();

// ── 3D TILT ON BENTO CARDS ───────────────
(function initTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  const MAX_TILT = 6;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * MAX_TILT}deg) rotateX(${-dy * MAX_TILT}deg) translateZ(8px)`;
      card.style.transition = 'transform 0.05s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s';
    });
  });
})();

// ── SPLIT-SCREEN PROJECTS ────────────────
(function initProjectsSplit() {
  const items = document.querySelectorAll('.ps-item');
  const panels = document.querySelectorAll('.ps-panel');
  const progress = document.getElementById('ps-progress');
  if (!items.length) return;

  const TOTAL = items.length;

  function activate(idx) {
    items.forEach(i => i.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    items[idx].classList.add('active');
    panels[idx].classList.add('active');
    if (progress) progress.style.width = ((idx + 1) / TOTAL * 100) + '%';
  }

  items.forEach((item, idx) => {
    item.addEventListener('mouseenter', () => activate(idx));
    item.addEventListener('click', () => activate(idx));
  });
})();
// ── EXPERIENCE AUTO-SCROLL ─────────────────
(function initExpScroll() {
  const track = document.getElementById('exp-track');
  if (!track) return;

  let isHovered = false;
  let scrollInterval;
  
  const advanceScroll = () => {
    if (isHovered) return;
    
    // Check if we are near the end of the scroll width
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 10) {
      // Smoothly snap back to the beginning
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Find one card to calculate the scroll amount
      const card = track.querySelector('.exp-card');
      if (card) {
        // Scroll by card width + gap (32px)
        const scrollAmount = card.offsetWidth + 32;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const startAutoScroll = () => {
    // 3 seconds per slide move
    scrollInterval = setInterval(advanceScroll, 3000);
  };

  const stopAutoScroll = () => {
    clearInterval(scrollInterval);
  };

  // Pause on hover or touch
  track.addEventListener('mouseenter', () => { isHovered = true; stopAutoScroll(); });
  track.addEventListener('mouseleave', () => { isHovered = false; startAutoScroll(); });
  track.addEventListener('touchstart', () => { isHovered = true; stopAutoScroll(); }, { passive: true });
  track.addEventListener('touchend', () => { isHovered = false; startAutoScroll(); }, { passive: true });

  // Start initially
  startAutoScroll();
})();

// ── CERTIFICATION PANEL ────────────────────
(function initCertPanel() {
  const list = document.getElementById('cert-list');
  const panel = document.getElementById('cert-panel');
  if (!list || !panel) return;

  const btns = Array.from(list.querySelectorAll('.cert-list-item'));
  const cards = Array.from(panel.querySelectorAll('.cert-card'));

  function activate(idx) {
    btns.forEach((b, i) => b.classList.toggle('active', i === idx));
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
  }

  btns.forEach((btn, idx) => btn.addEventListener('click', () => activate(idx)));
})();

// ── CONTACT FORM ─────────────────────────
(function initForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('cf-submit');
  const btnText = document.getElementById('cf-btn-text');
  const success = document.getElementById('cf-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    btnText.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btnText.textContent = 'Send message →';
      btn.disabled = false;
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }, 1400);
  });
})();

// ── SMOOTH ANCHOR SCROLL ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
