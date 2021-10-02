const startScreen = document.querySelector('#overlay');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const scoreboard = document.querySelector('#scoreboard ol');
const allLetters = phrase.children;
const hearts = scoreboard.children;
let missed = 0;
const phrases = [
    "A CAT HAS NINE LIVES",
    "BEST OF LUCK TO YOU",
    "DO WE HAVE A DEAL",
    "FEAST YOUR EYES ON THIS",
    "HANGING ON MY EVERY WORD",
];

/**
 * This function chooses a random phrase from the phrases array and splits it up by each individual letter
 *
 * @param {Array} arr - An array of strings
 * @returns {Array} An array of the individual letters within the randomly chosen phrase
 */

function getRandomPhraseAsArray(arr) {
    const randomIndex = Math.floor( Math.random() * arr.length );
    const randomPhrase = arr[randomIndex];
    const letters = randomPhrase.split("");
    return letters;
}

/**
 * This function takes the individual letters of a phrase and attaches them as individual list items to the DOM
 *
 * @param {Array} arr - An array of individual letters
 * @returns {Object} list items that contain individual letters of the phrase
 */

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

/**
 * This function checks to see if the letter that the player chose is present in the phrase
 *
 * @param {Object} chosenLetter - The list item selected by the player that contains the letter
 * @returns {Object} If the letter is matched to the phrase, it is returned with the "show" class added
 * @returns {null} If the letter is not matched to the phrase, it returns null
 */

function checkLetter(chosenLetter) {
    let letterCount = 0;
    let letterFound = [];
    for ( let i = 0; i < allLetters.length; i++ ) {
        if ( allLetters[i].className === 'letter' && chosenLetter.textContent === allLetters[i].textContent.toLowerCase() ) {
            allLetters[i].classList.add( 'show' );
            letterCount++;
            letterFound.push( allLetters[i] );
            // let letterFound = allLetters[i];
            // return letterFound;
            }
        }
        if ( letterCount === 0 ) {
            return null;
        } else {
            return letterFound;
        }
    }

// Add event handler to 'Start Game' button, which will remove overlay

startScreen.addEventListener ( 'click', (e) => {
    const startButton = e.target;
    if (startButton.className === 'btn__reset') {
        startScreen.style.display = 'none';
    }
});

// Add event handler to keys on keyboard, which will check players choices and accordingly either show letters or subtract lives

keyboard.addEventListener ( 'click', (e) => {
    let chosenLetter = e.target;
    if ( chosenLetter.tagName === 'BUTTON') {
        chosenLetter.classList.add( 'chosen' );
        chosenLetter.setAttribute( 'disabled', '');
        let letterFound = checkLetter(chosenLetter);
        if ( !letterFound ) {
            missed++;
            let li = document.createElement('li');
            li.className = 'tries';
            let img = document.createElement('img');
            img.setAttribute( 'src', 'images/lostHeart.png' );
            img.setAttribute( 'height', '35px' );
            img.setAttribute( 'width', '30px' );
            li.appendChild(img);
            scoreboard.insertBefore( li, hearts[missed] );
            scoreboard.removeChild( hearts[missed - 1] );
            
            // *** Alternative way of removing tries from the scoreboard *** 
            
            // let lifeLost = hearts[missed - 1].children;
            // lifeLost[0].setAttribute( 'src', 'images/lostHeart.png' );
        }
    }
});

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);