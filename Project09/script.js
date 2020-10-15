const musicContainer = document.getElementById('music-container');
const songTitle = document.getElementById('song-title');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const songAudio = document.getElementById('audio');
const songCover = document.getElementById('cover');
const preBtn = document.getElementById('pre');
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');

// List of songs

const songList = ['Blah Blah Blah', 'Hilight Great Spirit', 'Freaks Timmy Trumpet', 'Valentino Khan - Pump'];

// Track which song is currently playing

let currentSong = 1;

// Update the song to the DOM

function loadSong(song) {

    songTitle.innerText = song;
    songAudio.src = `music/${song}.mp3`;
    songCover.src = `images/${song}.jpg`;
}

// Function to play song

function playSong() {

    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    songAudio.play();
}

// Function to pause song 

function pauseSong() {

    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    songAudio.pause();
}

// Function to switch to previous song

function previousSong() {

    currentSong--;

    if(currentSong < 0) {
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);

    playSong();
}

// Function to switch to next song

function nextSong() {

    currentSong++;

    if(currentSong > songList.length - 1) {
        currentSong = 0;
    }

    loadSong(songList[currentSong]);

    playSong();
}

function shuffleSongs() {

    songList.sort(function(a,b){
        return 0.2 - Math.random()
    });
    
    console.log(songList);

}

// function to update progress bar

function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
 
    const progressPercentage = ( currentTime / duration * 100);
    progressBar.style.width = `${progressPercentage}%`;
 }

// function to set progress bar

function setProgress(e) {

    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = songAudio.duration;
    songAudio.currentTime = ( offsetX / width) * duration;
    console.log(offsetX, width);
}

// Initial song load

loadSong(songList[currentSong]);

// Event listeners 

// Event listener on play button

playBtn.addEventListener('click', () => {

    const isSongPlaying = musicContainer.classList.contains('play');

    if(isSongPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Event listener on previous button

preBtn.addEventListener('click', previousSong);

// Event listener on next button

nextBtn.addEventListener('click', nextSong);

// Event listener to update the time for song play

songAudio.addEventListener('timeupdate', updateProgress);

// Update the time for song play based on click on progress container

progressContainer.addEventListener('click', setProgress);

// Event listener to automatically play next song

songAudio.addEventListener('ended', nextSong);

// Event listener to shuffle play list

shuffleBtn.addEventListener('click', shuffleSongs);