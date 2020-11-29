// Get all DOM elements
// HTML5 Main element for the grid
const main = document.getElementById('main');
// Select box for changing voices
const selectVoices = document.getElementById('voices');
// Toggle button display custom text input
const toggleBtn = document.getElementById('toggle');
// Close button to close the custom text
const closeBtn = document.getElementById('close');
// Text area for custom text input
const customText = document.getElementById('text');
// Button to read the custom text input
const readBtn = document.getElementById('read');
// Custom text div
const customTextDiv = document.getElementById('custom-text');

// Array for holding all images and text to be read
const data = [
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
},
{
    image: './img/drink.jpg',
    text: "I'm Thirsty"
},
{
    image: './img/food.jpg',
    text: "I'm Hungry"
},
{
    image: './img/grandma.jpg',
    text: "I want to go to Grandma's"
},
{
    image: './img/happy.jpg',
    text: "I'm Happy"
},
{
    image: './img/home.jpg',
    text: "I Want to go Home"
},
{
    image: './img/hurt.jpg',
    text: "I'm Hurt"
},
{
    image: './img/outside.jpg',
    text: "I Want to go Outside"
},
{
    image: './img/sad.jpg',
    text: "I'm Sad"
},
{
    image: './img/scared.jpg',
    text: "I'm Scared"
},
{
    image: './img/school.jpg',
    text: "I Want to go to School"
},
{
    image: './img/tired.jpg',
    text: "I'm Tired"
}
]

// Array for web speech API voices
let voicesBackup = [];

// Create a box for each object in the data array
data.forEach(createBox);

// Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    // Create empty div for the image to be added to the main grid
    const box = document.createElement('div');   
    // Get the image URL and text from the data array
    const { image, text } = imageObj;
    // Apply CSS class to the div
    box.classList.add('box');
    // Add the image inside the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}<p/>
    `;
     //Add event for speaking text
     box.addEventListener('click', () => {
       setMessage(text);
      speakText();
    })
    
    // Add the box to the DOM
    main.appendChild(box);
}

// Initialize speech synthesis
let message = new SpeechSynthesisUtterance();

// 2. Function to get voices from WEB Speech API voices and put into the select box
function populateVoicesList() {
    if( typeof speechSynthesis === 'undefined') {
        return;
    }

    let voices = speechSynthesis.getVoices();
    for( var i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + '(' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' --DEFAULT';
        }
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        selectVoices.appendChild(option);
    }
}

// 3, Function to set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. Function to speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set new voice
function setVoice(e) {

  e.preventDefault();

  var selectedOption = selectVoices.selectedOptions[0].getAttribute('data-name');
  let voices = speechSynthesis.getVoices();

 for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      message.voice = voices[i];
    }
  }
}
  
// Execute populateVoicesList function
populateVoicesList();
if ( typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    
    speechSynthesis.onvoiceschanged = populateVoicesList;
  }

// Event listeners

// 1. Event listener on toggle custom text button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

// 2. Event listener on close custom text div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

// 3. Event listener when changing voice
speechSynthesis.addEventListener('voiceschanged', populateVoicesList);
selectVoices.addEventListener('change', setVoice);

// 4. Event listener for custom text read
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})

