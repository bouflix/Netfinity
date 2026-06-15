document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbarScroll();
    initScrollAnimations();
    initLanguageToggle();
    initCardShineEffect();
    initCounters();
    initInstallTabs();
});

// --- Particles ---
function initParticles() {
    const c = document.getElementById('particles');
    for (let i = 0; i < 35; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        const s = (Math.random() * 2 + 1) + 'px';
        p.style.width = s; p.style.height = s;
        p.style.animationDuration = (Math.random() * 18 + 10) + 's';
        p.style.animationDelay = (Math.random() * 12) + 's';
        c.appendChild(p);
    }
}

// --- Navbar ---
function initNavbarScroll() {
    const nav = document.getElementById('navbar');
    let t = false;
    window.addEventListener('scroll', () => {
        if (!t) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                t = false;
            });
            t = true;
        }
    });
}

// --- Scroll Reveal ---
function initScrollAnimations() {
    const els = document.querySelectorAll('.feature-card, .anim-reveal, .anim-scale-in');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const d = e.target.dataset.delay || 0;
                setTimeout(() => e.target.classList.add('visible'), parseInt(d));
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
}

// --- Language Toggle ---
function initLanguageToggle() {
    const btn = document.getElementById('langToggle');
    const label = document.getElementById('langLabel');
    let lang = 'en';

    btn.addEventListener('click', () => {
        lang = lang === 'en' ? 'ar' : 'en';
        const isAr = lang === 'ar';

        document.documentElement.lang = lang;
        document.documentElement.dir = isAr ? 'rtl' : 'ltr';
        document.body.classList.toggle('ar', isAr);
        label.textContent = isAr ? 'English' : 'العربية';

        document.title = isAr
            ? 'Bouflix - حمّل التطبيق الآن | أفلام ومسلسلات'
            : 'Bouflix - Download the App | Movies & TV Shows';

        document.querySelectorAll('[data-' + lang + ']').forEach(el => {
            el.textContent = el.getAttribute('data-' + lang);
        });
    });
}

// --- Card Shine Effect (mouse follow) ---
function initCardShineEffect() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
    });
}

// --- Counter animation ---
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current;
                }, 30);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
}

// --- Install Tabs ---
function initInstallTabs() {
    const tabMobile = document.getElementById('tab-mobile');
    const tabPc = document.getElementById('tab-pc');
    const stepsMobile = document.getElementById('steps-mobile');
    const stepsPc = document.getElementById('steps-pc');

    if (!tabMobile || !tabPc || !stepsMobile || !stepsPc) return;

    tabMobile.addEventListener('click', () => {
        tabMobile.classList.add('active');
        tabPc.classList.remove('active');
        stepsMobile.style.display = 'flex';
        stepsPc.style.display = 'none';
    });

    tabPc.addEventListener('click', () => {
        tabPc.classList.add('active');
        tabMobile.classList.remove('active');
        stepsMobile.style.display = 'none';
        stepsPc.style.display = 'flex';
    });
}
