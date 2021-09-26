const startScreen = document.querySelector('#overlay');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
let missed = 0;
const phrases = [
    "A CAT HAS NINE LIVES",
    "BEST OF LUCK TO YOU",
    "DO WE HAVE A DEAL",
    "FEAST YOUR EYES ON THIS",
    "HANGING ON MY EVERY WORD",
];

function getRandomPhraseAsArray(arr) {
    const randomIndex = Math.floor( Math.random() * arr.length );
    const randomPhrase = arr[randomIndex];
    const letters = randomPhrase.split("");
    return letters;
}

function addPhraseToDisplay(arr) {
    for ( let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        if ( li.textContent != " " ) {
            li.className = 'letter';
        }
        phrase.appendChild(li);
    }
}

function checkLetter(chosenLetter) {
    const allLetters = phrase.children;
    for ( i = 0; i < allLetters.length; i++ ) {
        if ( allLetters[i].className === 'letter' && chosenLetter.textContent === allLetters[i].textContent.toLowerCase() ) {
            allLetters[i].classList.add( 'show' );
            let letterFound = allLetters[i];
            return letterFound;
        }
        }
        return null;
    }


startScreen.addEventListener ( 'click', (e) => {
    const startButton = e.target;
    if (startButton.className === 'btn__reset') {
        startScreen.style.display = 'none';
    }
});

keyboard.addEventListener ( 'click', (e) => {
    let chosenLetter = e.target;
    if ( chosenLetter.tagName === 'BUTTON') {
        chosenLetter.classList.add( 'chosen' );
        chosenLetter.setAttribute( 'disabled', '');
        let letterFound = checkLetter(chosenLetter);
    }
});

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);