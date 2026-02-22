/* ── Mobile nav toggle ─────────────────────────────────────── */
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

/* ── Hero background (PC vs Mobile) ───────────────────────── */
function setHeroBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    if (window.innerWidth <= 768) {
        hero.classList.add('mobile');
        hero.classList.remove('pc');
    } else {
        hero.classList.add('pc');
        hero.classList.remove('mobile');
    }
}
setHeroBackground();
window.addEventListener('resize', setHeroBackground);

/* ── Scroll-reveal (Intersection Observer) ─────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Only trigger once
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ── Header scroll shadow ──────────────────────────────────── */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.style.boxShadow = '0 4px 40px rgba(0,0,0,.5)';
    } else {
        header.style.boxShadow = '';
    }
}, { passive: true });

/* ── Gallery Lightbox ──────────────────────────────────────── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        // Use full-quality image if available (replace s320 with s1600)
        lightboxImg.src = img.src.replace('/s320/', '/s1600/');
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});
lightboxClose.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* ── Smooth active nav highlight on scroll ─────────────────── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('nav a');

const activateNav = () => {
    let currentId = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) currentId = sec.id;
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${currentId}`
            ? '#ffce00'
            : '';
    });
};

window.addEventListener('scroll', activateNav, { passive: true });
activateNav();