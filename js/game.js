const grid = document.querySelector('.grid');
const namePlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

let firstCard = '';
let secondCard = '';

const characters = [
    'flor',
    'torre',
    'rei-rainha',
    'pascal',
    'jose-bezerra',
    'rapunzel',
    'gothel',
    'casal',
    'maximus',
    'luzes',
]

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function checkWinGame() {
    const disabledCard = document.querySelectorAll('.disabled-card');

    if(disabledCard.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns ${namePlayer.innerHTML} || Seu tempo foi de: ${timer.innerHTML}`);
    }
}

function checkCards() {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
    
        firstCard = '';
        secondCard = '';

        checkWinGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            
            firstCard = '';
            secondCard = '';
        }, 1000)
    }

}

function revealCard(event) {
    if(event.target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if(firstCard === '') {
        event.target.parentNode.classList.add('reveal-card');
        firstCard = event.target.parentNode;
    } else if(secondCard === '') {
        event.target.parentNode.classList.add('reveal-card');
        secondCard = event.target.parentNode;

        checkCards();
    }
}

function createCard(characters) {
    const card = createElement('div', 'card');
    const cardFront = createElement('div', 'face card-front');
    const cardBack = createElement('div', 'face card-back');
    
    cardFront.style.backgroundImage = `url('../images/${characters}.png')`;
    
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    
    card.setAttribute('data-character', characters);
    card.addEventListener('click', revealCard);

    return card;
}

function loadGame() {
    const duplicateChracters = [ ...characters, ...characters];
    const shurrledArray = duplicateChracters.sort(() => Math.random() - 0.5);
    shurrledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })
}

function startTime() {
    this.loop = setInterval(() => {
        const currentTimer = Number(timer.innerHTML);
        timer.innerHTML = currentTimer + 1;
    }, 1000);
}

onload = () => {
    namePlayer.innerHTML = localStorage.getItem('jogador');
    startTime();
    loadGame();
}