const startScreen = document.querySelector( '#overlay' );

startScreen.addEventListener ( 'click', (e) => {
    const startButton = e.target;
    if (startButton.className === 'btn__reset') {
        startScreen.style.display = 'none';
    }
});
