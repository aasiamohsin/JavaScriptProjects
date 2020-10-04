const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartBtn = document.getElementById('restart');
const notification = document.getElementById('slider-container');
const hangmanBody = document.querySelectorAll('.hangman-part');
const alphaBets = document.getElementById('buttons');


// An array of words to select from

const wordPool = ['javascript', 'social', 'classic', 'nostalgia', 'limelight', 'kubernetes', 'instagram','python','ubuntu', 'responsive'];

const alphabet = 'abcdefghijklmnopqrstuvwxyz' ;

  // create alphabet ul
function alphabets() {
    buttons.innerHTML = `
    ${alphabet
        .split('')
        .map(
            (alphabet) => 
            `<button class = alphabet>${alphabet}</button>
            `
        )
        .join('')
    }  
    `
}

// Randomly selecting a word from array wordpool

let selectWord = wordPool[Math.floor(Math.random() * wordPool.length)];

// Arrays to classify the input of the user

const correctLetters = [];
const incorrectLetters = [];

// Function to display the selected word on screen

function displaySelectedWord() {
    word.innerHTML = `
    ${selectWord
        .split('')
        .map(
            letter => `
            <span class="letter">
               ${correctLetters.includes(letter) ? letter : ''}
            </span>           
            `
        )
        .join('')
    }
    `;

    const wordText = word.innerText.replace(/\n/g, '');
    
    if( wordText === selectWord) {
        message.innerText = 'You won!';
        popup.style.display = 'flex'
    }
}

// Function to display the sliding notification on wrong input

function showNotification(){
    notification.classList.add('show');

    setTimeout( () => {

        notification.classList.remove('show');} , 2000 );

};

// Function to update incorrect letters

function updateWrongLetters() {
    wrongLetters.innerHTML = `  
    ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : '' }
    ${incorrectLetters.map( letter => `<span>${letter}</span>`)}
    `;

    hangmanBody.forEach( (part, index) => {
        const errors = incorrectLetters.length;

        if( index < errors ) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Show popup if lost
    if (incorrectLetters.length === hangmanBody.length) {
    message.innerText = 'You lost!';
    popup.style.display = 'flex';
    }

}

// Event listeners

// Event Handler for Keyoard button press

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90 ) {
        const letter = e.key;

        console.log(letter);

        if(selectWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            }else {
                showNotification();
            }
        } else {
            if(!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

// Event listener for keys on UI

alphaBets.addEventListener('click', key => {

    if(key.target.classList.contains('alphabet') ){

    const letter = key.target.innerText;
 
     if(selectWord.includes(letter)) {
         if(!correctLetters.includes(letter)) {
             correctLetters.push(letter);
             displaySelectedWord();
         }else {
             showNotification();
         }
     } else {
         if(!incorrectLetters.includes(letter)) {
             incorrectLetters.push(letter);
             updateWrongLetters();
         } else {
             showNotification();
         }
     
     }
    }
 })


// Event listener on restart button

restartBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    // Get a new selected word from the pool

    selectWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    displaySelectedWord();

    // clear the wrong letters

    updateWrongLetters();

    // Hide the popup

    popup.style.display = 'none';
})

displaySelectedWord();

alphabets();

