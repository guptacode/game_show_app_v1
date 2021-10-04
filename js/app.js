const startScreen = document.querySelector('#overlay');
const title = document.querySelector('.title');
const reset = document.querySelector('.btn__reset');
const keyboard = document.querySelector('#qwerty');
const kRow1 = document.querySelector('#krow1');
const kRow2 = document.querySelector('#krow2');
const kRow3 = document.querySelector('#krow3');
const phrase = document.querySelector('#phrase ul');
const scoreboard = document.querySelector('#scoreboard ol');
const allLetters = phrase.children;
const hearts = scoreboard.children;
const buttons1 = kRow1.children;
const buttons2 = kRow2.children;
const buttons3 = kRow3.children;
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
            }
        }
        if ( letterCount === 0 ) {
            return null;
        } else {
            return letterFound;
        }
    }

/**
 * This function checks to see if the player has won or lost the game, and displays the appropriate screen
 *
 * @returns {String} Changes the text, class and display value of the overlay page if player has won or lost
 */

    function checkWin() {
    let show = 0;
    let letter = 0;
    for ( let i = 0; i < allLetters.length; i++ ) {
        if ( allLetters[i].classList.contains('letter') ) {
            letter++;
        }
        if ( allLetters[i].classList.contains('letter') && allLetters[i].classList.contains('show') ) {
            show++;
        }
    }
    if ( show === letter ) {
        startScreen.className = 'win';
        title.textContent = 'YOU WIN!';
        reset.textContent = 'Play Again!';
        startScreen.style.display = '';
    } else if ( missed === 5 ) {
        startScreen.className = 'lose';
        title.textContent = 'YOU LOSE';
        reset.textContent = 'Play Again!';
        startScreen.style.display = '';
    }
}

/**
 * This function clears the keyboard and enables all keys
 *
 * @param {Array} arr - Accepts an array of keys
 * @returns {Object} Removes the 'chosen' class and 'disabled' attributes of all keys 
 */

function clearKeyboard(arr) {
    for ( let i = 0; i < arr.length; i++ ) {
        if ( arr[i].classList.contains('chosen') ) {
            arr[i].classList.remove('chosen');
            arr[i].removeAttribute('disabled');
        }
    }
}

// An event handler to 'Start Game' button, which will remove overlay and 'Play Again!' button to restart the game

startScreen.addEventListener ( 'click', (e) => {
    const startButton = e.target;
    if (startButton.textContent === 'Start Game') {
        startScreen.style.display = 'none';
    } else if (startButton.textContent === 'Play Again!'){
        const counter = allLetters.length;
        for ( let i = 0; i < counter; i++ ) {
            phrase.removeChild(allLetters[0]);
        }
        clearKeyboard(buttons1);
        clearKeyboard(buttons2);
        clearKeyboard(buttons3);
        for ( let i = 0; i < 5; i++ ) {
            let lifeGained = hearts[i].children;
            lifeGained[0].setAttribute( 'src', 'images/liveHeart.png' );
        }
        missed = 0;
        let randomPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(randomPhrase);
        startScreen.style.display = 'none';
    }
});

// An event handler to keys on keyboard, which will check players choices and accordingly either show letters or subtract lives

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
        checkWin();
    }
});

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);