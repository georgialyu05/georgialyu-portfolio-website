/* ============================================================
   NAV — hide on scroll down, show on scroll up
============================================================ */
const nav = document.getElementById('nav');
if (nav) {
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 80) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }
    lastY = y;
  }, { passive: true });
}

/* ============================================================
   GRID HINT — fade out on scroll
============================================================ */
const gridHint = document.querySelector('.grid-hint');
const gridColExt = document.querySelector('.grid-col-ext');
if (gridHint) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 120;
    gridHint.style.opacity = scrolled ? '0' : '1';
    if (gridColExt) {
      gridColExt.style.opacity = scrolled ? '1' : '0';
      gridColExt.classList.toggle('active', scrolled);
    }
  }, { passive: true });
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ============================================================
   SIDEBAR — scroll progress tracker
============================================================ */
const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
if (sidebarItems.length) {
  const sections = Array.from(sidebarItems).map(item =>
    document.getElementById(item.dataset.section)
  ).filter(Boolean);

  const onScroll = () => {
    const scrollY = window.scrollY + window.innerHeight * 0.3;
    let active = sections[0];
    sections.forEach(sec => { if (sec.offsetTop <= scrollY) active = sec; });
    sidebarItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === active.id);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   SMOOTH ANCHOR SCROLL
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 52;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
});

/* ============================================================
   PROJECT CARD — hover video
============================================================ */
document.querySelectorAll('.project-card').forEach(card => {
  const video = card.querySelector('.project-hover-video');
  if (!video) return;
  card.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play();
  });
  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

/* ============================================================
   MOBILE MENU
============================================================ */
const menuBtn = document.getElementById('menuBtn');
const navCenter = document.querySelector('.nav-center');
if (menuBtn && navCenter) {
  menuBtn.addEventListener('click', () => {
    const open = navCenter.style.display === 'flex';
    navCenter.style.display = open ? 'none' : 'flex';
    navCenter.style.flexDirection = 'column';
    navCenter.style.position = 'absolute';
    navCenter.style.top = 'var(--nav-h)';
    navCenter.style.left = '0';
    navCenter.style.right = '0';
    navCenter.style.background = 'var(--bg)';
    navCenter.style.padding = '1.5rem';
    navCenter.style.borderBottom = '1px solid var(--border)';
    navCenter.style.gap = '1.25rem';
  });
}
