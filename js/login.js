const input = document.querySelector(".login_input");
const button = document.querySelector(".btn_start");
const form = document.querySelector('.login_form');

function handleNameUser(event) {
    if(event.target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
}

function handlePlayGame(event) {
    event.preventDefault();

    localStorage.setItem('jogador', input.value);
    window.location = 'pages/game.html';
}

input.addEventListener('input', handleNameUser);
form.addEventListener('submit', handlePlayGame);