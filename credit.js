
// Fonction utilitaire pour générer un nombre aléatoire dans une plage donnée
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Crée le flash lumineux initial de l'explosion
function createFlash(x, y, color) {
    const flash = document.createElement('div');
    flash.className = 'flash';
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    flash.style.backgroundColor = color;
    return flash;
}

// Crée un groupe de particules d'un type spécifique
function createParticleEffect(container, className, count, color, velocityMultiplier = 1) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = className;
        particle.style.backgroundColor = color;

        // Calcul de la trajectoire aléatoire
        const angle = random(0, 360);
        const velocity = random(150, 200) * velocityMultiplier; // Vitesse réduite
        const radians = angle * Math.PI / 180;
        const xMove = Math.cos(radians) * velocity;
        const yMove = Math.sin(radians) * velocity;
        const rotation = random(0, 360);

        // Application des propriétés CSS personnalisées
        particle.style.setProperty('--x', `${xMove/5}px`);
        particle.style.setProperty('--y', `${yMove/5}px`);
        particle.style.setProperty('--r', `${rotation}deg`);

        container.appendChild(particle);
    }
}

// Crée l'explosion complète avec tous ses composants
function createExplosion(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;

    // Génération des couleurs complémentaires
    const hue = random(0, 360);
    const mainColor = `hsl(${hue}, 100%, 50%)`;
    const complementaryHue = (hue + 180) % 360;
    const complementaryColor = `hsl(${complementaryHue}, 100%, 60%)`;

    firework.style.backgroundColor = mainColor;
    document.body.appendChild(firework);

    // Ajout des différents effets
    firework.appendChild(createFlash(0, 0, mainColor));
    createParticleEffect(firework, 'particle', 40, mainColor, 1); // Réduit de 80 à 60
    createParticleEffect(firework, 'particle', 20, complementaryColor, 0.8); // Réduit de 40 à 30
    createParticleEffect(firework, 'glitter', 50, 'rgba(255, 255, 255, 0.8)', 1.2); // Réduit de 100 à 70
    createParticleEffect(firework, 'trail', 30, mainColor, 0.9); // Réduit de 60 à 40

    // Nettoyage après l'animation
    setTimeout(() => {
        document.body.removeChild(firework);
    }, 2500);
}

// Gère le lancement d'une fusée
function launchFirework(startX, startY, endX, endY) {
    const rocket = document.createElement('div');
    rocket.className = 'rocket';
    rocket.style.left = `${startX}px`;
    rocket.style.bottom = `${startY}px`;
    document.body.appendChild(rocket);

    // Animation de la montée
    const duration = random(800, 1000);
    const start = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = elapsed / duration;

        if (progress < 1) {
            // Calcul de la trajectoire parabolique
            const currentX = startX + (endX - startX) * progress;
            const currentY = startY + (endY - startY) * progress -
                (-4.9 * Math.pow(progress, 2) + 4.9 * progress) * 100;

            rocket.style.left = `${currentX}px`;
            rocket.style.bottom = `${currentY}px`;

            requestAnimationFrame(animate);
        } else {
            // Fin de la montée, création de l'explosion
            document.body.removeChild(rocket);
            createExplosion(endX, window.innerHeight - endY);
        }
    }

    requestAnimationFrame(animate);
}

// Lance un feu d'artifice automatiquement à une position aléatoire
function autoLaunch() {
    const startX = random(100, window.innerWidth - 100);
    const endX = startX + random(-100, 100);
    const endY = random(window.innerHeight * 0.5, window.innerHeight * 0.8);

    launchFirework(startX, 0, endX, endY);
}

// Lancement automatique toutes les 2 secondes
setInterval(autoLaunch, 1600);

// Gestion des clics pour lancer des feux d'artifice
document.addEventListener('click', (e) => {
    const startX = e.clientX;
    launchFirework(startX, 0, startX + random(-50, 50), window.innerHeight - e.clientY);
});






















const cardInfo = [
    { number: 'Alexis DOUTEZ', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/109478081?v=4&size=64', github: 'https://github.com/Mortea1' },
    { number: 'Tristan CLOWEZ', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/70820374?v=4', github: 'https://github.com/TorisutanKholwes' },
    { number: 'Corentin DELAPORTE', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/152643807?v=4', github: 'https://github.com/cvipera' },
    { number: 'Victor BRANCHU', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/51047087?v=4', github: 'https://github.com/viciscat' },
    { number: 'Nolwen MEDEVIELLE', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/156612806?v=4', github: 'https://github.com/Nolwen53' },
    { number: 'Arend BUYSSE', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/172020886?v=4', github: 'https://github.com/Arendti' },
    { number: 'Noémie LENOEL', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/144156093?v=4', github: 'https://github.com/Lightning73' },
    { number: 'Noémie LENOEL', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/144156093?v=4', github: 'https://github.com/Lightning73' }
];

const clickableItems = document.querySelectorAll('.card-front'); // Select card front
let clickedCount = 0; // Counter to track clicks
let currentCardIndex = 0; // Index to keep track of the current card

// Function to update card info (including the image and GitHub link)
function updateCardInfo() {
    if (currentCardIndex >= cardInfo.length) {
        return; // Stop if all cards have been shown
    }

    const currentCard = cardInfo[currentCardIndex];

    // Update the card's text and image
    document.querySelector('.number').textContent = currentCard.number;
    document.querySelector('.name').textContent = currentCard.name;
    document.querySelector('.expiry').textContent = currentCard.expiry;
    document.querySelector('.desc').textContent = currentCard.desc;
    document.querySelector('.profile-image').src = currentCard.img; // Set image source
    document.querySelector('.wave-link').href = currentCard.github; // Set GitHub link

    // Update the card index for the next click
    currentCardIndex++;
}

// Handle the click on the card
function handleClick() {
    updateCardInfo();

    // Redirect to the main page after all cards have been viewed
    if (currentCardIndex === cardInfo.length) {
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to index.html
        }, 500); // Wait 0.5 seconds before redirecting
    }
}

// Add click event listener to the card
document.querySelector('.card-front').addEventListener('click', handleClick);

document.addEventListener("DOMContentLoaded", function () {
    const waveLink = document.querySelector('.wave-link');
    const text = waveLink.textContent; // Récupère le texte du lien
    waveLink.innerHTML = ''; // Vide le contenu du lien

    // Ajoute chaque lettre dans un span avec la classe 'letter'
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        waveLink.appendChild(span);
    }
});









