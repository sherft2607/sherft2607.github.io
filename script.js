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
function showPage(pageId) {
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
        if (link.dataset.target === pageId) {
            link.classList.add('active');
        }
    });

    const menu = document.querySelector('nav ul');
    const button = document.querySelector('.menu-button');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
    }
    
    // --- NEW: Update URL history to support reload/back button ---
    if (history.pushState) {
        history.pushState(null, null, '#' + pageId);
    } else {
        window.location.hash = pageId;
    }

    window.scrollTo(0, 0);
}

function toggleMenu() {
    const menu = document.querySelector('nav ul');
    const button = document.querySelector('.menu-button');
    menu.classList.toggle('active');
    button.classList.toggle('active');
    
    const isExpanded = menu.classList.contains('active');
    button.setAttribute('aria-expanded', isExpanded);
}

document.querySelector('nav ul').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        const menu = document.querySelector('nav ul');
        const button = document.querySelector('.menu-button');
        menu.classList.remove('active');
        button.classList.remove('active'); 
        button.setAttribute('aria-expanded', 'false');
    } else if (event.target === event.currentTarget) {
        const menu = document.querySelector('nav ul');
        const button = document.querySelector('.menu-button');
        menu.classList.remove('active');
        button.classList.remove('active'); 
        button.setAttribute('aria-expanded', 'false');
    }
});

// --- FILTER LOGIC (MULTI-SELECT) ---
// State to track active filters
let activeFilters = new Set(['all']);

function filterProjects(category) {
    // Handle Toggle Logic
    if (category === 'all') {
        activeFilters.clear();
        activeFilters.add('all');
    } else {
        // Remove 'all' if specific filter selected
        if (activeFilters.has('all')) {
            activeFilters.delete('all');
        }

        // Toggle Selection
        if (activeFilters.has(category)) {
            activeFilters.delete(category);
        } else {
            activeFilters.add(category);
        }

        // If nothing left, revert to 'all'
        if (activeFilters.size === 0) {
            activeFilters.add('all');
        }
    }

    // Update UI Buttons
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (activeFilters.has(filter)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter Cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        // If 'all' is active, show everything
        if (activeFilters.has('all')) {
            card.classList.remove('hidden');
        } else {
            const cardCats = card.getAttribute('data-category').split(' ');
            // Check Intersection (AND logic): Card must match ALL active filters
            const isMatch = Array.from(activeFilters).every(filter => cardCats.includes(filter));
            
            if (isMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

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
        // Combine main image + gallery images so user can switch back
        const allImages = [data.image, ...data.gallery];
        
        // Start from index 1 because index 0 is main image
        // But wait, we want to show all gallery images in the grid
        // The gallery array in data doesn't include main image.
        // So lightboxImages indices: 0 = Main, 1 = Gal[0], 2 = Gal[1]...
        
        data.gallery.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
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
    // Reset scroll position to top
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        // Not standard property on div, but useful for some implementations. 
        // Better reset modal scrollTop if it has overflow
        // The modal itself has overflow-y: auto
        modal.scrollTop = 0; 
    }
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
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let mouse = { x: null, y: null };

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

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
    draw() {
        // Increased opacity to ensure visibility
        ctx.fillStyle = 'rgba(163, 197, 133, 0.4)'; /* Sage Green particle */
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.floor(width * height / 15000); // Responsive count
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
        
        // Connect particles to each other
        particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 100) {
                // Increased opacity for lines
                ctx.strokeStyle = `rgba(163, 197, 133, ${0.15 * (1 - dist / 100)})`; /* Sage Green line */
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });

        // Connect particles to mouse
        if (mouse.x != null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
                // Increased opacity for mouse connection lines
                ctx.strokeStyle = `rgba(163, 197, 133, ${0.4 * (1 - dist / 150)})`; /* Bright Green mouse line */
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash && (hash === 'about' || hash === 'resume' || hash === 'portfolio' || hash === 'projects')) {
        showPage(hash);
    }
});
