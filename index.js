const sections = document.querySelectorAll('section');
const navContainer = document.querySelector('.navigation');
let currentSection = 0;
let isScrolling = false;

sections.forEach((_, index) => {
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
    if (isScrolling) return;

    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentSection > 0) {
        scrollToSection(currentSection - 1);
    }
});

scrollToSection(0);