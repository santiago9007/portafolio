/* ===============================
   ===== ELEMENTOS PRINCIPALES =====
================================= */

const navbar = document.getElementById("navbar");
const toggle = document.getElementById("theme-toggle");
const reveals = document.querySelectorAll(".reveal");
const cursor = document.querySelector(".custom-cursor");


/* ===============================
   ===== FUNCIONES =====
================================= */

// Reveal suave al hacer scroll
function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

// Fondo dinámico que respeta modo claro/oscuro
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;

function dynamicBackground(e) {
    targetX = e.pageX;
    targetY = e.pageY;
}

function updateBackground() {
    // Interpolación suave para seguimiento fluido
    mouseX += (targetX - mouseX) * 0.15;
    mouseY += (targetY - mouseY) * 0.15;
    
    document.body.style.background = `
        radial-gradient(
            600px at ${mouseX}px ${mouseY}px,
            rgba(79,156,255,0.08),
            transparent 80%
        ),
        var(--bg-color)
    `;
    requestAnimationFrame(updateBackground);
}

// Navbar efecto scroll
function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

// Cargar tema guardado en localStorage
function loadThemeFromStorage() {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "light") {
        document.body.classList.add("light");
        if (toggle) toggle.textContent = "☀️";
    } else {
        document.body.classList.remove("light");
        if (toggle) toggle.textContent = "🌙";
    }
}

// Toggle modo claro/oscuro
function handleThemeToggle() {
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light");

        const isLight = document.body.classList.contains("light");
        toggle.textContent = isLight ? "☀️" : "🌙";
        
        // Guardar preferencia en localStorage
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

// Cursor personalizado
function initCustomCursor() {
    if (!cursor) return;

    // Desactivar en móviles
    if ("ontouchstart" in window) {
        document.body.style.cursor = "auto";
        cursor.style.display = "none";
        return;
    }

    document.addEventListener("mousemove", e => {
        // Seguir el cursor sin límites
        const x = e.clientX;
        const y = e.clientY;
        
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    });

    // Animación al pasar por botones y enlaces
    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
        });

        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });
}


/* ===============================
   ===== EVENTOS =====
================================= */

// Scroll
window.addEventListener("scroll", () => {
    handleNavbarScroll();
    revealOnScroll();
});

// Movimiento del mouse (fondo dinámico)
document.addEventListener("mousemove", dynamicBackground);


/* ===============================
   ===== INICIALIZACIÓN =====
================================= */

loadThemeFromStorage();
handleNavbarScroll();
revealOnScroll();
handleThemeToggle();
initCustomCursor();
updateBackground();