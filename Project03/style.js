const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const fullscreen = document.getElementById('fullscreen');
const volume = document.getElementById('volume');

//Functions



//1- toggleVideo - Play or Pause video
//If video is playing, then pause
//If video is paused, then play

function toggleVideo() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

//2- updateIcon - toggle between  play and pause icons
// if video is playing,then show pause icon
/// if video is paused,then show play icon

function updateIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML =  '<i class="fas fa-pause fa-2x"></i> <span class="tooltiptext tooltip">Pause</span>';
    }
};

//3 - update progress - update the position of the progress bar and timestamp

function updateProgress() {

    
    progress.value = video.currentTime * (100 / video.duration);
    updateProgress.value = progress.value;

	var curmins = Math.floor(video.currentTime / 60);
	var cursecs = Math.floor(video.currentTime - curmins * 60);
	var durmins = Math.floor(video.duration / 60);
	var dursecs = Math.floor(video.duration - durmins * 60);
	if(cursecs < 10){ 
        cursecs = "0"+cursecs; 
    }
	if(dursecs < 10){ 
        dursecs = "0"+dursecs;
     }
	if(curmins < 10){
         curmins = "0"+curmins; 
     }
	if(durmins < 10){
         durmins = "0"+durmins;
     }
	curtime.innerHTML = curmins+":"+cursecs;
	durtime.innerHTML = durmins+":"+dursecs;
};

 
 
//4 - stop video - Stop video playback and reset time to 0

function stopVideo() {
    video.pause();
    video.currentTime = 0;
};

//5 - setProgress - update video playback time based on manual change in progress bar
 function setProgress() {
     video.currentTime = progress.value * video.duration / 100;
 };

 //6 - fastforward video - forward 10 seconds

 function fastForward() {
     video.currentTime = video.currentTime + 10;

 };

 //7 - fastbackward - click to backward 10 seconds

 function fastBackward() {
     video.currentTime = video.currentTime - 10;
 };

 //8- volume - slide to min and max volume

function videoVolume (e) {
    video.volume = e.currentTarget.value / 100;
}

// 9 expand -  click to go on full screen

function openFullScreen() {
    if(video.requestFullScreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) 
        video.webkitRequestFullscreen();
};
     

//Event listener

//1- Video Element - Click to play or pause video

video.addEventListener('click', toggleVideo);

//2- Video Element -pause to toggle play icon to pause icon

video.addEventListener('pause', updateIcon);


//3- Video Element -play to toggle pause icon back to play

video.addEventListener('play', updateIcon);

//4- Video Element -update progress bar and timestamp

video.addEventListener('timeupdate', updateProgress);

//5- Play Button - click to play or pause video

play.addEventListener('click', toggleVideo);

//6- Stop Button - click to reset video and pause video

stop.addEventListener('click', stopVideo);

//7- fast forward button - click to fast forward

forward.addEventListener('click', fastForward);

//8- fast forward button - click to fast backward

backward.addEventListener('click', fastBackward);

//7- Progress Bar - change position to change time of playback

progress.addEventListener('change', setProgress);

//8- full screen - click to go on full screen

fullscreen.addEventListener('click', openFullScreen);

//9 - volume control

volume.addEventListener('change', videoVolume);


