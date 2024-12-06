const sections = document.querySelectorAll('section');
const navContainer = document.querySelector('.navigation');
let currentSection = 0;
let isScrolling = false;

sections.forEach((_, index) => {
    console.log("d")
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    dot.addEventListener('click', () => scrollToSection(index));
    navContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.nav-dot');

function scrollToSection(index) {
    if (isScrolling) return;
    isScrolling = true;
    currentSection = index;

    document.querySelector('.container').style.transform = `translateX(-${index * 100}vw)`;
    updateActiveDot();

    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function updateActiveDot() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
    sections.forEach((section, index) => {
        section.classList.toggle('active', index === currentSection);
    });
}

window.addEventListener('wheel', (e) => {
    console.log("a");

    if (isScrolling) return;

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
    }
});

let touchStartX = 0;
window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
    console.log("b");

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    }
});

window.addEventListener('keydown', (e) => {
    console.log("c");

    if (isScrolling) return;

    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentSection > 0) {
        scrollToSection(currentSection - 1);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    scrollToSection(0);
});

document.body.addEventListener('click', (e) => {
    // Conteneur pour les vagues concentriques
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple-container';

    // Positionner le conteneur au point de clic
    const x = e.clientX;
    const y = e.clientY;
    rippleContainer.style.left = `${x}px`;
    rippleContainer.style.top = `${y}px`;
    rippleContainer.style.transform = 'translate(-50%, -50%)';

    // Ajouter 3 vagues concentriques
    for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        rippleContainer.appendChild(ripple);
    }

    // Ajouter le conteneur au body
    document.body.appendChild(rippleContainer);

    // Supprimer le conteneur après l'animation
    rippleContainer.addEventListener('animationend', () => {
        rippleContainer.remove();
    });
});


function spawnRandomShockwave() {
    // Fonction utilitaire pour générer un nombre aléatoire dans une plage donnée
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    // Position aléatoire pour l'onde de choc
    const x = randomInRange(0, window.innerWidth);
    const y = randomInRange(0, window.innerHeight);

    // Conteneur pour l'onde de choc (groupe de cercles concentriques)
    const shockwaveContainer = document.createElement('div');
    shockwaveContainer.className = 'shockwave-container';
    shockwaveContainer.style.left = `${x}px`;
    shockwaveContainer.style.top = `${y}px`;

    // Ajouter plusieurs cercles concentriques pour l'onde de choc
    for (let i = 0; i < 3; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'shockwave';
        ripple.style.animationDelay = `${i * 0.2}s`; // Décalage entre les cercles
        shockwaveContainer.appendChild(ripple);
    }

    // Ajouter le conteneur au body
    document.body.appendChild(shockwaveContainer);

    // Supprimer le conteneur après l'animation
    shockwaveContainer.addEventListener('animationend', () => {
        shockwaveContainer.remove();
    });
}

// Lancer les ondes de choc à intervalles réguliers
setInterval(spawnRandomShockwave, 800);
