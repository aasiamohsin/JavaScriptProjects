const circle = document.getElementById('circle');
const text = document.getElementById('text')
const pointer = document.getElementById('pointer');

time = 7000

// Function to add functionality for breathing effect

function breatheInOut() {
    circle.style.animationPlayState = 'running';
    pointer.style.animationPlayState = 'running';

    setTimeout(() => {
        text.innerText = 'Inhale';
  
    }, 0000);

    setTimeout(() => {
        text.innerText = 'Hold';
  
    }, 3000);

    setTimeout(() => {
        text.innerText = 'Exhale'
    }, 4000);
}

setInterval(breatheInOut,time)

breatheInOut()