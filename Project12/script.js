// Get all DOM elements for functionality
// Cards Container
const cardContainer = document.getElementById('card-container');
// Navigation
const preBtn = document.getElementById('pre-btn');
const nextBtn = document.getElementById('next-btn');
const currentCard = document.getElementById('current-card');
// Add Card Container
const addCardContainer = document.getElementById('add-card-container');
const addCardBtn = document.getElementById('add-card');
const closeCardBtn = document.getElementById('close-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
addNewCardBtn = document.getElementById('add-card-btn');
// Clear Cards
const clearBtn = document.getElementById('clear');

// Track current card
let currentActiveCard = 0;

// Collection of card DOM elements 
const cardElements = [];

// Collection of card Data
const cardsData = getCardsData();

// Functions
//1. Function to create all cards
function createCards() {
    cardsData.forEach( (data, index) => createCard(data, index) )
}

//2. Function to create a card
function createCard(data, index) {
    // Create the div for a card
    const card = document.createElement('div');
    // Assign the class of the card
    card.classList.add('card');
    // Check for first card assign active class
    if (index === 0 ) {
        card.classList.add('active');
    }
    // Create the inner HTML for a card
    card.innerHTML = `
        <div class="inner-card">
            <div class="card-front">
                <p>${data.question}</p>
            </div>
            <div class="card-back">
                <p>${data.answer}</p>
            </div>
        </div>`;

        // Event listener to flip the card on click
        card.addEventListener('click', () => card.classList.toggle('show-answer'));

        // Add the newely created  card to the collection of card DOM
        cardElements.push(card);
        // Add the Card to DOM
        cardContainer.appendChild(card);

        // Display the current card number / total card number
        updateCurrentCardText();
}

//3. Function to show the current card number / total card number in navigation
function updateCurrentCardText() {
    currentCard.innerHTML = `
        <p>${currentActiveCard +1} / ${cardElements.length}</p>
    `
}

//4. Get card data from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//5. Function to save card data to local storage
function saveCardData(cards) {
    // Save data to local storage
    localStorage.setItem('cards', JSON.stringify(cards));
    // Reload Window
    window.location.reload();
}

createCards();

// Event Listeners
//1. Event listener for next button
nextBtn.addEventListener('click', () => {
    // Hide current card and move it to left
    cardElements[currentActiveCard].className = 'card left';
    // increment the current active card tracker to next card
    currentActiveCard++;
    // Check if last card
    if( currentActiveCard > cardElements.length - 1 ){
        currentActiveCard = cardElements.length -1;
    }
    // Display the next card
    cardElements[currentActiveCard].className = 'card active'
    // Update the current card number
    updateCurrentCardText();
})

//2. Event listener for previous button
preBtn.addEventListener('click', () => {
    // Hide current card and move it to right
    cardElements[currentActiveCard].className = 'card right';
    // increment the current active card tracker to next card
    currentActiveCard--;
    // Check if last card
    if( currentActiveCard < 0 ){
        currentActiveCard = 0;
    }
    // Display the next card
    cardElements[currentActiveCard].className = 'card active'
    // Update the current card number
    updateCurrentCardText();
})

//3. Event listener for add new card button
addCardBtn.addEventListener('click', () => {
    addCardContainer.classList.add('show');
})

//4. Event listener on close the add new card form
closeCardBtn.addEventListener('click', () => {
    addCardContainer.classList.remove('show');
})

//5. Event listener for creating a new card on click
addNewCardBtn.addEventListener('click', () => {
    // Get the user inputs from user
    const questionInput = question.value;
    const answerInput = answer.value;

    // Check if inputs are not null
    if( questionInput.trim() && answerInput.trim() ){
        // Create a new object using the user inputs
        const newCard = { question: questionInput, answer: answerInput };
        // Using the new card object, create a card element using the createcard function
        createCards(newCard);

        // Reset form fields
        question.value = '';
        answer.value = '';

        // Hide form after submit
         addCardContainer.classList.remove('show');
        // Add the new card object to the card data array
        cardsData.push(newCard)
        // Save data to local storage and reload page
        saveCardData(cardsData)
    }
})

// Event listener to clear all cards
clearBtn.addEventListener('click', () => {
    // Remove data from local storage
    localStorage.clear();
    // Clear the card content
    cardContainer.innerHTML = '';
    // Reload window
    window.location.reload();
    // Update the current card number
    currentCard.innerHTML = `<p></p>`;
})