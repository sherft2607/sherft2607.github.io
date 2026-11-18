// --- DATA: Project Details ---
const projectData = {
    "4site": {
        "title": "4site",
        "image": "assets/projects/4site/hero.webp",
        "video": "assets/projects/4site/demo.mp4",
        "gallery": [
            "assets/projects/4site/city-map.webp",
            "assets/projects/4site/similar-arc.webp",
            "assets/projects/4site/lessons.webp",
            "assets/projects/4site/checklist.webp",
            "assets/projects/4site/chat.webp"
        ],
        "tags": [
            "React",
            "TypeScript",
            "MapLibre",
            "deck.gl",
            "FastAPI",
            "NYC Open Data"
        ],
        "description": "<p>Built at AEC Tech NYC 2026 with a team of eight, 4site is a citywide 3D map of New York City for architects and structural engineers. Before excavation or structural work begins next to older buildings, the warning signs are often already sitting in public records: 311 reports, DOB complaints and violations, stop-work orders, facade filings, and the age and construction of adjacent lots. 4site pulls those scattered city datasets onto one interactive map for a site and its touching neighbors, with the source and date attached to every fact.</p><p><strong>How it works</strong></p><ul><li><strong>Citywide map and layers:</strong> Toggle 11 NYC public data layers including construction incidents, structural complaints, fire and FDNY vacate orders, unsafe facades, FEMA flood zones, contamination sites, and an excavation watchlist.</li><li><strong>Site and touching neighbors:</strong> Search any NYC address or click a building to fly straight to it in 3D, outlining the lot, every touching lot, and which neighboring buildings are attached.</li><li><strong>What stands out and early warnings:</strong> Surfaces the highest-priority life-safety records first, flags sequences like work continuing after a stop-work order, and explains why each item is shown.</li><li><strong>Similar projects and project checklist:</strong> Compares the site against similar past cases across NYC, then turns project parameters (work type, construction type, team roles) into a shared discipline checklist and plain-English Q&amp;A linked to public records.</li></ul><p><strong>What I built (Map &amp; 3D)</strong></p><ul><li>The full-bleed citywide 3D map using MapLibre GL and deck.gl, with zoom-aware clustering and opacity fading so dense citywide datasets stay fast and readable.</li><li>Address search and click-to-select with smooth camera fly-to, lot and touching-neighbor highlighting, and visual separation for attached buildings.</li><li>Styled 3D building extrusions and Cityweft 3D city model integration around the picked site, plus 3D arcs connecting similar past cases across the city.</li><li>The multi-source layer panel with live toggles, record counts, dataset links, and last-updated dates.</li></ul><p><strong>Tools Used:</strong> React, TypeScript, Vite, Tailwind CSS, MapLibre GL, deck.gl, Cityweft, FastAPI, NYC Open Data, Vercel.</p><p><a href=\"https://4site-nyc.vercel.app/\" target=\"_blank\" rel=\"noopener\">Open the live app &rarr;</a> &nbsp; <a href=\"https://github.com/sherft2607/aec_hackathon_smart_plan\" target=\"_blank\" rel=\"noopener\">View on GitHub &rarr;</a></p>"
    },
    "listworth": {
        "title": "ListWorth",
        "image": "assets/projects/listworth/hero.webp",
        "gallery": [
            "assets/projects/listworth/wrapped.webp",
            "assets/projects/listworth/diary.webp",
            "assets/projects/listworth/stats.webp"
        ],
        "tags": [
            "Next.js",
            "TypeScript",
            "Supabase",
            "PWA"
        ],
        "description": "<p>ListWorth is a mobile-first progressive web app that answers one question: is an AMC Stubs A-List membership actually paying for itself? Forward it your ticket emails and it turns them into a running record of what you saw, where, in which format, and how much you saved compared with buying each ticket.</p><p><strong>How it helps</strong></p><ul><li>Shows whether the membership beats paying per ticket, with savings and billing-cycle break-even, so the decision is based on numbers.</li><li>Removes manual entry: purchase and cancellation emails are parsed into structured receipts automatically.</li><li>Gives a clearer picture of your habits: hours in the dark, savings by format (Standard, Dolby, IMAX), favourite nights and directors, plus a shareable monthly Wrapped recap.</li><li>Always available: everything is stored on the device and works offline, then syncs across devices once you sign in.</li></ul><p><strong>What I built</strong></p><ul><li>An email parser that extracts movie, theatre, auditorium, showtime and price, and detects the format. It remembers which auditorium is Dolby or IMAX and applies that to earlier tickets.</li><li>An offline-first data layer with an outbox and sync engine over Supabase (Postgres, magic-link and Google sign-in, row-level security).</li><li>A Cloudflare Email Worker for forwarding receipts, and TMDB poster matching.</li><li>Automated tests for the parser, format detection and sync, including the database schema run against an in-process Postgres.</li><li>Deployed on Vercel as an installable PWA.</li></ul><p><strong>Tools Used:</strong> Next.js, TypeScript, Supabase (Postgres, Auth), Cloudflare Workers, TMDB API, Vercel.</p><p><a href=\"https://alist-tracker.vercel.app\" target=\"_blank\" rel=\"noopener\">Open the live app &rarr;</a></p>",
        "video": "assets/projects/listworth/demo.mp4"
    }
};

// --- SOUND (easter egg, off by default) ---
// Every sound is synthesised: a bandpass-filtered noise transient (the metal
// "tk") plus an optional short falling sine (the weight of the detent)
const sfx = (() => {
    const STORAGE_KEY = 'sound';
    let ctx, noise, master;
    let enabled = false;
    try { enabled = localStorage.getItem(STORAGE_KEY) === 'on'; } catch (e) {}

    // Built lazily inside a click handler so browsers allow the audio to start
    function ensureContext() {
        if (!ctx) {
            ctx = new AudioContext();
            master = ctx.createGain();
            master.gain.value = 1;
            master.connect(ctx.destination);
            noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
            const data = noise.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        }
        if (ctx.state === 'suspended') ctx.resume();
    }

    function click({ freq = 4000, decay = 0.004, body = 180, gain = 0.08, at = 0 } = {}) {
        const t = ctx.currentTime + 0.005 + at;
        const out = ctx.createGain();
        out.gain.setValueAtTime(gain, t);
        out.gain.exponentialRampToValueAtTime(0.0001, t + decay + 0.03);
        out.connect(master);

        const src = ctx.createBufferSource();
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = freq;
        bp.Q.value = 1.2;
        src.buffer = noise;
        src.connect(bp).connect(out);
        src.start(t);
        src.stop(t + decay);

        if (body) {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.frequency.setValueAtTime(body, t);
            osc.frequency.exponentialRampToValueAtTime(body * 0.5, t + 0.03);
            g.gain.setValueAtTime(gain * 0.6, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
            osc.connect(g).connect(out);
            osc.start(t);
            osc.stop(t + 0.035);
        }
    }

    const sounds = {
        // Nav tab: one firm dial click
        detent: () => click(),
        // Filter buttons, lightbox: light, dry selector tick
        tick: () => click({ freq: 6000, decay: 0.002, body: 0, gain: 0.05 }),
        // MSG-01 open (pitch > 1 raises it, used for the sent confirmation)
        latch: (pitch = 1) => {
            click({ freq: 3000 * pitch, body: 140 * pitch });
            click({ freq: 5000 * pitch, body: 0, gain: 0.04, at: 0.045 });
        },
        // MSG-01 close: the latch in reverse
        unlatch: () => {
            click({ freq: 5000, body: 0, gain: 0.04 });
            click({ freq: 2600, body: 120, at: 0.04 });
        },
        // Skill filter: one tick per badge that lights up
        ratchet: (n = 1) => {
            for (let i = 0; i < Math.min(n, 16); i++) {
                click({ freq: 5500, decay: 0.002, body: 0, gain: 0.03, at: i * 0.018 });
            }
        }
    };

    return {
        play(name, arg) {
            if (!enabled) return;
            ensureContext();
            sounds[name](arg);
        },
        setEnabled(on) {
            enabled = on;
            try { localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off'); } catch (e) {}
        },
        get enabled() { return enabled; }
    };
})();

const soundToggle = document.getElementById('soundToggle');

function renderSoundToggle() {
    soundToggle.setAttribute('aria-pressed', String(sfx.enabled));
    soundToggle.querySelector('.sound-state').textContent = sfx.enabled ? 'ON' : 'OFF';
}

soundToggle.addEventListener('click', () => {
    // Click on the way out too, so turning it off still feels mechanical
    if (sfx.enabled) sfx.play('tick');
    sfx.setEnabled(!sfx.enabled);
    sfx.play('detent');
    renderSoundToggle();
});

renderSoundToggle();

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

    // Only real clicks click; first load and Back/Forward stay silent
    if (historyMode === 'push') sfx.play('detent');

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
    sfx.play('tick');
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.filter === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    document.querySelectorAll('.project-card:not([tabindex])').forEach(card => {
        const cardCats = card.dataset.category.split(' ');
        card.classList.toggle('hidden', category !== 'all' && !cardCats.includes(category));
    });
}

// Make cards reachable and openable from the keyboard
function bindProjectCards() {
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
}

bindProjectCards();

// --- PRIVATE PROJECTS ---
// projects.enc.json is AES-GCM ciphertext (key from PBKDF2 of the password),
// built by tools/encrypt-projects.mjs. A wrong password fails the GCM tag check.
const b64ToBytes = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));

async function decryptProjects(password) {
    const res = await fetch('projects.enc.json');
    if (!res.ok) throw new Error('fetch');
    const { iterations, salt, iv, ct } = await res.json();
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: b64ToBytes(salt), iterations, hash: 'SHA-256' }, base,
        { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64ToBytes(iv) }, key, b64ToBytes(ct));
    return JSON.parse(new TextDecoder().decode(plain));
}

const projectsGate = document.getElementById('projectsGate');
// No encrypted file deployed means no private projects, so don't show an unlock card that can't work
fetch('projects.enc.json', { method: 'HEAD' })
    .then(res => { if (!res.ok) projectsGate.hidden = true; })
    .catch(() => { projectsGate.hidden = true; });
projectsGate.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = document.getElementById('projectsStatus');
    const button = document.getElementById('projectsUnlock');
    button.disabled = true;
    status.classList.remove('error');
    status.textContent = 'Unlocking…';
    try {
        const { html, data } = await decryptProjects(document.getElementById('projectsPassword').value);
        Object.assign(projectData, data);
        projectsGate.insertAdjacentHTML('beforebegin', html);
        bindProjectCards();
        projectsGate.hidden = true;
    } catch (err) {
        status.classList.add('error');
        status.textContent = err.message === 'fetch' ? 'Could not load projects. Try again.' : 'Incorrect password.';
        button.disabled = false;
    }
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
        if (category === 'all') sfx.play('tick');
        else sfx.play('ratchet', skillCloud.querySelectorAll('.skill-badge.match').length);
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

// --- MESSAGE PANEL (inline form, sent via Web3Forms) ---
const msgToggle = document.getElementById('msgToggle');
const msgPanel = document.getElementById('msgPanel');
const msgForm = document.getElementById('msgForm');
const msgStatus = document.getElementById('msgStatus');
const msgSend = document.getElementById('msgSend');
const msgSuccess = document.getElementById('msgSuccess');

function setMessagePanel(open) {
    if (open !== isMessagePanelOpen()) sfx.play(open ? 'latch' : 'unlatch');
    // Hand focus back to the toggle before inert drops it from the closing panel
    if (!open && msgPanel.contains(document.activeElement)) msgToggle.focus();
    msgPanel.classList.toggle('open', open);
    msgPanel.inert = !open;
    msgToggle.setAttribute('aria-expanded', String(open));
    if (open) {
        // Wait for the expand transition before focusing so the scroll lands on the full panel
        setTimeout(() => {
            msgPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            const target = msgSuccess.hidden ? document.getElementById('msgName') : msgSuccess;
            target.focus({ preventScroll: true });
        }, 350);
    }
}

function isMessagePanelOpen() {
    return msgPanel.classList.contains('open');
}

msgToggle.addEventListener('click', () => setMessagePanel(!isMessagePanelOpen()));
document.getElementById('msgClose').addEventListener('click', () => setMessagePanel(false));

document.getElementById('msgAgain').addEventListener('click', () => {
    msgForm.reset();
    msgSuccess.hidden = true;
    msgForm.hidden = false;
    document.getElementById('msgName').focus();
});

msgForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!msgForm.reportValidity()) return;

    const data = Object.fromEntries(new FormData(msgForm));
    data.subject = `Portfolio · ${data.topic} — from ${data.name}`;

    msgSend.disabled = true;
    msgSend.classList.add('sending');
    msgStatus.className = 'msg-status';
    msgStatus.textContent = 'Sending…';

    try {
        const response = await fetch(msgForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || response.statusText);

        msgStatus.textContent = '';
        document.getElementById('msgSuccessText').textContent =
            `Thanks, ${data.name.split(' ')[0]} — I'll reply within a couple of days.`;
        msgForm.hidden = true;
        msgSuccess.hidden = false;
        msgSuccess.focus();
        sfx.play('latch', 1.5);
    } catch (error) {
        // Keep what they typed and point them at email so the message isn't lost
        msgStatus.className = 'msg-status error';
        msgStatus.innerHTML = 'Couldn&rsquo;t send just now. Email me at <a href="mailto:shandonherft@gmail.com">shandonherft@gmail.com</a> instead.';
    } finally {
        msgSend.disabled = false;
        msgSend.classList.remove('sending');
    }
});

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

// --- FOOTER CLOCK ---
// Always New York time, whatever the visitor's timezone; EDT/EST follows daylight saving
const nycTime = document.getElementById('nycTime');
const nycFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short'
});

function updateNycTime() {
    const now = new Date();
    const parts = Object.fromEntries(nycFormat.formatToParts(now).map(p => [p.type, p.value]));
    nycTime.textContent = `${parts.hour}:${parts.minute} ${parts.timeZoneName}`;
    nycTime.dateTime = now.toISOString();
}

updateNycTime();
setInterval(updateNycTime, 30000);

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
    sfx.play('tick');
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
        else if (isMessagePanelOpen() && msgPanel.contains(document.activeElement)) setMessagePanel(false);
    }
});

// --- MODAL LOGIC (Projects) ---
function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    // Prepare Lightbox Data (Main Image + Gallery)
    lightboxImages = [data.image, ...(data.gallery || [])].filter(Boolean);

    // Populate Main Info
    const mainImg = document.getElementById('modalImg');
    // A video replaces the header image behind a click-to-play cover. No media at all shows text only.
    const videoWrap = document.getElementById('modalVideoWrap');
    const video = document.getElementById('modalVideo');
    const videoCover = document.getElementById('modalVideoCover');
    const videoPoster = document.getElementById('modalVideoPoster');
    videoWrap.hidden = !data.video;
    if (data.video) {
        video.pause();
        video.poster = data.image || '';
        video.src = data.video;
        video.load();
        videoPoster.src = data.image || '';
        videoPoster.alt = `${data.title} cover`;
        videoCover.hidden = !data.image;
        videoCover.onclick = function() {
            sfx.play('detent');
            videoCover.hidden = true;
            video.play();
        };
    } else {
        video.pause();
        video.removeAttribute('src');
        videoCover.hidden = true;
    }
    mainImg.style.display = data.image && !data.video ? '' : 'none';
    if (data.image) mainImg.src = data.image;
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
    document.getElementById('modalVideo').pause();
    const modal = document.getElementById("projectModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close Modals on Outside Click
window.onclick = function(event) {
    const projectModal = document.getElementById("projectModal");
    const lightbox = document.getElementById("lightbox"); // Add this

    if (event.target === projectModal) {
        closeProjectModal();
    }
    if (event.target === lightbox) { // Add this
        closeLightbox();
    }
}

// Show the section named in the URL hash, defaulting to About
function pageFromHash() {
    const hash = window.location.hash.substring(1);
    return isRoutablePage(hash) ? hash : 'about';
}

// Back/Forward (and hand-edited hashes) fire popstate; show that section
// without pushing a new history entry
window.addEventListener('popstate', () => {
    closeProjectModal();
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
