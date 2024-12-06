const cardInfo = [
    { number: 'Alexis DOUTEZ', name: 'NO GAME NO LIFE', expiry: '06/12/2024', desc: 'Le jeu est la vie, la vie est un jeu.', img: 'https://avatars.githubusercontent.com/u/109478081?v=4&size=64', github: 'https://github.com/alexisdoutez' },
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
    document.querySelector('.github-link').href = currentCard.github; // Set GitHub link

    // Update the card index for the next click
    currentCardIndex++;
}

// Handle the click on the card
function handleClick() {
    updateCardInfo();

    // Redirect to the main page after all cards have been viewed
    if (currentCardIndex === cardInfo.length) {
        setTimeout(() => {
            window.location.href = 'test.html'; // Redirect to index.html
        }, 500); // Wait 0.5 seconds before redirecting
    }
}

// Add click event listener to the card
document.querySelector('.card-front').addEventListener('click', handleClick);













