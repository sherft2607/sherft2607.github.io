// --- DATA: Project Details ---
const projectData = {
    'robotics': {
        title: "Robotic Fabrication & Additive Manufacturing",
        image: "https://placehold.co/1200x600/333/fff?text=Robotic+Fabrication",
        gallery: [
            "https://placehold.co/600x400/333/fff?text=Robotic+1",
            "https://placehold.co/600x400/444/fff?text=Robotic+2",
            "https://placehold.co/600x400/555/fff?text=Robotic+3",
            "https://placehold.co/600x400/666/fff?text=Robotic+4"
        ],
        tags: ["Robotics", "KUKA", "Python", "Fabrication"],
        description: `
            <p>This project explores the intersection of computational design and robotic fabrication. Utilizing KUKA industrial robots, we developed custom end-effectors to extrude recycled plastic materials into complex, non-standard geometries that would be impossible with traditional manufacturing methods.</p>
            <p>The workflow involved developing a custom Grasshopper script to generate the toolpaths (G-code) directly from the 3D model, allowing for rapid prototyping and iteration. We focused on structural integrity and material efficiency, reducing waste by 40% compared to subtractive methods.</p>
            <p><strong>Tools Used:</strong> Rhino, Grasshopper, KUKA|prc, Python.</p>
        `
    },
    'vr': {
        title: "Immersive VR Architecture Interface",
        image: "https://placehold.co/1200x600/444/fff?text=VR+Interface",
        gallery: [
            "https://placehold.co/600x400/222/fff?text=Unity+Setup",
            "https://placehold.co/600x400/333/fff?text=In-Game+View",
            "https://placehold.co/600x400/444/fff?text=User+Testing"
        ],
        tags: ["Unity", "C#", "Oculus", "UI/UX"],
        description: `
            <p>Bridging the gap between digital models and physical experience, this project created a custom VR interface using Unity and the Meta Quest headset. The goal was to allow clients and designers to step inside their models and manipulate geometry in real-time.</p>
            <p>I programmed bidirectional communication between Rhino/Grasshopper and Unity, meaning changes made in VR updated the parametric model instantly, and vice versa. This feedback loop enables a more intuitive design process.</p>
            <p><strong>Tools Used:</strong> Unity 3D, C#, Grasshopper, UDP Networking.</p>
        `
    },
    'pavilion': {
        title: "Parametric Pavilion Design",
        image: "https://placehold.co/1200x600/555/fff?text=Parametric+Pavilion",
        gallery: [
            "https://placehold.co/600x400/666/fff?text=Structure",
            "https://placehold.co/600x400/777/fff?text=Analysis",
            "https://placehold.co/600x400/888/fff?text=Render"
        ],
        tags: ["Grasshopper", "Karamba", "Optimization"],
        description: `
            <p>A computational design study focusing on structural optimization and material efficiency for a large-span public pavilion. The form finding process was driven by physics simulations to minimize bending moments and material usage.</p>
            <p>Using Karamba3D for structural analysis, the mesh was iteratively optimized. The final design features a lightweight lattice structure that provides shade while maintaining an airy, open feel.</p>
            <p><strong>Tools Used:</strong> Rhino, Grasshopper, Karamba3D, Kangaroo.</p>
        `
    },
    'worktower': {
        title: "High-Rise Commercial Tower",
        image: "https://placehold.co/1200x600/222/fff?text=High-Rise+Tower",
        gallery: [
            "https://placehold.co/600x400/111/fff?text=Facade+Detail",
            "https://placehold.co/600x400/222/fff?text=Lobby+Render",
        ],
        tags: ["Architecture", "Professional Work", "Revit"],
        description: `
            <p>A 40-story commercial tower designed during my time at [Firm Name]. The project emphasizes sustainable facade systems, utilizing high-performance glazing and automated shading devices to reduce solar gain.</p>
            <p>My role involved coordinating the BIM model between structural and MEP consultants and developing detailed drawing sets for the podium levels.</p>
            <p><strong>Tools Used:</strong> Revit, Enscape, Adobe Creative Suite.</p>
        `
    },
    'urban': {
        title: "Generative Urban Planning",
        image: "https://placehold.co/1200x600/111/fff?text=Generative+Urbanism",
        gallery: [
            "https://placehold.co/600x400/222/fff?text=Site+Plan",
            "https://placehold.co/600x400/333/fff?text=Traffic+Sim",
        ],
        tags: ["Computational Design", "Professional Work", "Python"],
        description: `
            <p>This project utilized machine learning algorithms to optimize urban layouts for a new mixed-use district. The goal was to maximize solar exposure and pedestrian connectivity while minimizing wind tunnels and traffic congestion.</p>
            <p>By simulating thousands of iterations, we were able to identify the most efficient site plan that met all zoning requirements and client sustainability goals.</p>
            <p><strong>Tools Used:</strong> Rhino, Grasshopper, Python, scikit-learn.</p>
        `
    },
    'housing': {
        title: "Sustainable Housing Complex",
        image: "https://placehold.co/1200x600/000/fff?text=Sustainable+Housing",
        gallery: [
            "https://placehold.co/600x400/111/fff?text=Courtyard+View",
            "https://placehold.co/600x400/222/fff?text=Unit+Plan",
        ],
        tags: ["Architecture", "College", "Sustainability"],
        description: `
            <p>A net-zero residential complex designed for a graduate studio. The project features passive cooling strategies, rainwater harvesting, and community gardens to promote social interaction and environmental responsibility.</p>
            <p>The design consists of modular units arranged around a central courtyard, creating a microclimate that reduces energy consumption for heating and cooling.</p>
            <p><strong>Tools Used:</strong> Revit, Lumion, Photoshop.</p>
        `
    }
};

// --- NAVIGATION LOGIC ---
// Sections hidden with an inline display:none (e.g. PROJECTS while it's being
// filled in) aren't routable, so a stale #projects link falls back to About.
function isRoutablePage(pageId) {
    const section = document.getElementById(pageId);
    return !!section && section.classList.contains('page-content') && section.style.display !== 'none';
}

// historyMode: 'push' for nav clicks, 'replace' for the initial load,
// 'none' when responding to Back/Forward (the URL is already correct)
function showPage(pageId, historyMode = 'push') {
    const sections = document.querySelectorAll('.page-content');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });

    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active-section');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.dataset.target === pageId) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    moveDockIndicator();

    // Record each section in history so reload and Back/Forward work
    const newHash = '#' + pageId;
    if (historyMode === 'push' && window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
    } else if (historyMode === 'replace') {
        history.replaceState(null, '', newHash);
    }

    window.scrollTo(0, 0);
}

// --- MOBILE DOCK ---
// Slides the sage pill under the active tab. The dock is display:none on
// desktop (zero width), so there's nothing to measure there.
function moveDockIndicator() {
    const dock = document.querySelector('.mobile-dock');
    if (!dock || dock.offsetWidth === 0) return;
    const active = dock.querySelector('.nav-link.active');
    const indicator = dock.querySelector('.dock-indicator');
    if (!active) return;

    // Sub-pixel rects (offsetWidth rounds), measured from the dock's padding edge
    const dockRect = dock.getBoundingClientRect();
    const tabRect = active.getBoundingClientRect();
    indicator.style.width = tabRect.width + 'px';
    indicator.style.transform = `translateX(${tabRect.left - dockRect.left - dock.clientLeft}px)`;

    // Enable the slide transition only after the first placement: flushing
    // styles first commits that position, so it doesn't animate in from 0
    if (!dock.classList.contains('ready')) {
        void indicator.offsetWidth;
        dock.classList.add('ready');
    }
}

moveDockIndicator();
// Tab widths change once Outfit loads and when crossing the 768px breakpoint
document.fonts.ready.then(moveDockIndicator);
window.addEventListener('resize', moveDockIndicator);

// --- HEADER NAME REVEAL ---
// Tucks the header name away while the hero's big name is on screen, and
// fades it in once that scrolls under the header. On other pages the hero is
// display:none (never intersecting), so the header name simply shows.
const siteHeader = document.querySelector('header');
const heroName = document.querySelector('.hero-name');
if (siteHeader && heroName && 'IntersectionObserver' in window) {
    let firstReport = true;
    const heroObserver = new IntersectionObserver(([entry]) => {
        // Snap into place on load; only fade on later changes
        if (firstReport) siteHeader.classList.add('name-instant');
        siteHeader.classList.toggle('name-tucked', entry.isIntersecting);
        if (firstReport) {
            void siteHeader.offsetWidth;
            siteHeader.classList.remove('name-instant');
            firstReport = false;
        }
    }, { rootMargin: `-${siteHeader.offsetHeight}px 0px 0px 0px` });
    heroObserver.observe(heroName);
}

// --- FILTER LOGIC ---
// Single-select: each button shows the cards tagged with that category.
function filterProjects(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.filter === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    document.querySelectorAll('.project-card').forEach(card => {
        const cardCats = card.dataset.category.split(' ');
        card.classList.toggle('hidden', category !== 'all' && !cardCats.includes(category));
    });
}

// Make cards reachable and openable from the keyboard
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
});

// --- RESUME: SKILL FILTERS ---
// Highlight one category's badges and dim the rest; 'all' clears the highlight.
const skillCloud = document.querySelector('.skill-cloud');

document.querySelectorAll('.skill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.skillFilter;
        document.querySelectorAll('.skill-filter').forEach(b => {
            const isActive = b === btn;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-pressed', isActive);
        });
        skillCloud.classList.toggle('filtered', category !== 'all');
        skillCloud.querySelectorAll('.skill-badge').forEach(badge => {
            badge.classList.toggle('match', badge.dataset.skill === category);
        });
    });
});

// --- PORTFOLIO: SPREAD PREVIEWS ---
// Thumbnails open the shared lightbox with full-size spreads from assets/portfolio/large/
const spreadThumbs = document.querySelectorAll('.spread-thumb');
const spreadImages = Array.from(spreadThumbs, thumb =>
    thumb.querySelector('img').getAttribute('src').replace('assets/portfolio/', 'assets/portfolio/large/')
);

spreadThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        lightboxImages = spreadImages;
        openLightbox(Number(thumb.dataset.index));
    });
});

// --- MODAL LOGIC (Contact Form) ---
function openContactForm() {
    const modal = document.getElementById("contactFormModal");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeContactForm() {
    const modal = document.getElementById("contactFormModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// --- EMAIL LINK ---
// The mailto: link does nothing when the visitor has no default mail app,
// so also copy the address and offer a Gmail compose link as a fallback.
const emailLink = document.getElementById('email-link');
const emailToast = document.getElementById('emailToast');
let emailToastTimer;

emailLink.addEventListener('click', () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText('shandonherft@gmail.com').catch(() => {});
    }
    emailToast.classList.add('show');
    clearTimeout(emailToastTimer);
    emailToastTimer = setTimeout(() => emailToast.classList.remove('show'), 6000);
});

// --- LIGHTBOX LOGIC ---
let lightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    currentLightboxIndex = index;
    showLightboxImage();
    
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        // Only re-enable scrolling if project modal isn't open
        const projectModal = document.getElementById("projectModal");
        if (projectModal.style.display !== "block") {
             document.body.style.overflow = 'auto';
        }
    }, 300);
}

function changeImage(n) {
    currentLightboxIndex += n;
    if (currentLightboxIndex >= lightboxImages.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxImages.length - 1;
    }
    showLightboxImage();
}

function showLightboxImage() {
    const img = document.getElementById('lightboxImg');
    // Fade out
    img.style.opacity = '0';
    
    setTimeout(() => {
        img.src = lightboxImages[currentLightboxIndex];
        // Fade in
        img.onload = () => {
            img.style.opacity = '1';
        }
    }, 200);
}

// Swipe Support
let touchStartX = 0;
let touchEndX = 0;

const lightboxEl = document.getElementById('lightbox');

lightboxEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

lightboxEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    // Threshold for swipe
    if (touchEndX < touchStartX - 50) {
        changeImage(1); // Swipe Left -> Next
    }
    if (touchEndX > touchStartX + 50) {
        changeImage(-1); // Swipe Right -> Prev
    }
}

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    } else if (event.key === 'Escape') {
        if (document.getElementById('projectModal').style.display === 'block') closeProjectModal();
        if (document.getElementById('contactFormModal').style.display === 'block') closeContactForm();
    }
});

// --- MODAL LOGIC (Projects) ---
function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    // Prepare Lightbox Data (Main Image + Gallery)
    lightboxImages = [data.image, ...(data.gallery || [])];

    // Populate Main Info
    const mainImg = document.getElementById('modalImg');
    mainImg.src = data.image; // Set main image
    mainImg.alt = data.title;
    
    // Click Main Image -> Open Lightbox at Index 0
    mainImg.onclick = function() {
        openLightbox(0);
    }
    mainImg.style.cursor = "pointer";

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDesc').innerHTML = data.description;
    
    // Populate Tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = ''; // Clear previous
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'modal-tag';
        span.innerText = tag;
        tagsContainer.appendChild(span);
    });

    // Populate Gallery
    const galleryContainer = document.getElementById('modalGallery');
    galleryContainer.innerHTML = ''; // Clear previous
    
    if (data.gallery && data.gallery.length > 0) {
        // lightboxImages indices: 0 = main image, 1 = gallery[0], 2 = gallery[1]...
        data.gallery.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${data.title} image ${index + 1}`;
            img.loading = 'lazy';
            img.className = 'gallery-item';
            
            // The gallery images start at index 1 in our lightbox array
            const lightboxIndex = index + 1; 
            
            img.onclick = function() {
                openLightbox(lightboxIndex);
            };
            galleryContainer.appendChild(img);
        });
    }

    // Show Modal
    const modal = document.getElementById("projectModal");
    modal.style.display = "block";
    // Reset scroll position to top (the modal itself is the scroll container)
    modal.scrollTop = 0;
    document.body.style.overflow = "hidden";
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close Modals on Outside Click
window.onclick = function(event) {
    const contactModal = document.getElementById("contactFormModal");
    const projectModal = document.getElementById("projectModal");
    const lightbox = document.getElementById("lightbox"); // Add this
    
    if (event.target === contactModal) {
        closeContactForm();
    }
    if (event.target === projectModal) {
        closeProjectModal();
    }
    if (event.target === lightbox) { // Add this
        closeLightbox();
    }
}

// --- BACKGROUND ANIMATION ---
// Particles are bucketed into a grid of LINK_DIST-sized cells so each one is
// only compared against neighbours in adjacent cells instead of every other
// particle. Lines are batched by opacity into a few paths, so a frame costs a
// handful of stroke() calls rather than one per connection.
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const LINK_DIST = 100;
const MOUSE_DIST = 150;
const MAX_PARTICLES = 120;
const ALPHA_BUCKETS = 6;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let width, height;
let particles = [];
let mouse = { x: null, y: null };
let animationId = null;

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
}

function resize() {
    // Cap the backing store at 2x so 3x phone screens don't render 9x the pixels
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Match the particle count to the new area without resetting the scene
    // (mobile browsers fire resize whenever the address bar shows or hides)
    const target = Math.min(Math.floor(width * height / 15000), MAX_PARTICLES);
    while (particles.length < target) particles.push(new Particle());
    particles.length = target;
    particles.forEach(p => {
        p.x = Math.min(p.x, width);
        p.y = Math.min(p.y, height);
    });

    if (reducedMotion.matches) drawFrame();
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    // Build the spatial grid
    const cols = Math.ceil(width / LINK_DIST) + 1;
    const rows = Math.ceil(height / LINK_DIST) + 1;
    const grid = new Array(cols * rows);
    for (const p of particles) {
        const cx = Math.min(Math.max(Math.floor(p.x / LINK_DIST), 0), cols - 1);
        const cy = Math.min(Math.max(Math.floor(p.y / LINK_DIST), 0), rows - 1);
        const key = cy * cols + cx;
        (grid[key] || (grid[key] = [])).push(p);
    }

    const buckets = Array.from({ length: ALPHA_BUCKETS }, () => new Path2D());
    const linkDistSq = LINK_DIST * LINK_DIST;

    function link(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq >= linkDistSq) return;
        const strength = 1 - Math.sqrt(distSq) / LINK_DIST;
        const path = buckets[Math.min(Math.floor(strength * ALPHA_BUCKETS), ALPHA_BUCKETS - 1)];
        path.moveTo(a.x, a.y);
        path.lineTo(b.x, b.y);
    }

    // Visit each pair once: same cell (j > i), then the right, bottom-left,
    // bottom and bottom-right neighbour cells
    for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
            const cell = grid[cy * cols + cx];
            if (!cell) continue;
            for (let i = 0; i < cell.length; i++) {
                for (let j = i + 1; j < cell.length; j++) link(cell[i], cell[j]);
            }
            const neighbours = [
                cx + 1 < cols ? grid[cy * cols + cx + 1] : null,
                cy + 1 < rows && cx > 0 ? grid[(cy + 1) * cols + cx - 1] : null,
                cy + 1 < rows ? grid[(cy + 1) * cols + cx] : null,
                cy + 1 < rows && cx + 1 < cols ? grid[(cy + 1) * cols + cx + 1] : null
            ];
            for (const other of neighbours) {
                if (!other) continue;
                for (const a of cell) {
                    for (const b of other) link(a, b);
                }
            }
        }
    }

    ctx.lineWidth = 1;
    buckets.forEach((path, i) => {
        ctx.strokeStyle = `rgba(163, 197, 133, ${0.28 * (i + 0.5) / ALPHA_BUCKETS})`; /* Sage Green line (each pair is drawn once now) */
        ctx.stroke(path);
    });

    // Connect particles to mouse
    if (mouse.x != null) {
        const mouseDistSq = MOUSE_DIST * MOUSE_DIST;
        for (const p of particles) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseDistSq) {
                ctx.strokeStyle = `rgba(163, 197, 133, ${0.4 * (1 - Math.sqrt(distSq) / MOUSE_DIST)})`; /* Bright Green mouse line */
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }

    // Draw all particles as a single path
    ctx.fillStyle = 'rgba(163, 197, 133, 0.4)'; /* Sage Green particle */
    ctx.beginPath();
    for (const p of particles) {
        ctx.moveTo(p.x + p.size, p.y);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    }
    ctx.fill();
}

function animate() {
    particles.forEach(p => p.update());
    drawFrame();
    animationId = requestAnimationFrame(animate);
}

function startAnimation() {
    if (animationId === null && !reducedMotion.matches && !document.hidden) animate();
}

function stopAnimation() {
    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = null;
}

// Don't burn battery in background tabs
document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAnimation() : startAnimation();
});
reducedMotion.addEventListener('change', () => {
    reducedMotion.matches ? (stopAnimation(), drawFrame()) : startAnimation();
});

resize();
drawFrame();
startAnimation();

// Show the section named in the URL hash, defaulting to About
function pageFromHash() {
    const hash = window.location.hash.substring(1);
    return isRoutablePage(hash) ? hash : 'about';
}

// Back/Forward (and hand-edited hashes) fire popstate; show that section
// without pushing a new history entry
window.addEventListener('popstate', () => {
    closeProjectModal();
    closeContactForm();
    showPage(pageFromHash(), 'none');
});

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        showPage(pageFromHash(), 'replace');
        // The browser jumps to the #section anchor after load, which tucks the
        // heading under the fixed header; reset to the top once that happens
        window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
    }
});
