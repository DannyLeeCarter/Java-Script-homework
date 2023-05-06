const videoPlayer = document.getElementById('video-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const volumeControl = document.getElementById('volume-control');
const timeElapsed = document.getElementById('time-elapsed');

playButton.addEventListener('click', (e) => {
  videoPlayer.play();
});

pauseButton.addEventListener('click', (e) => {
  videoPlayer.pause();
});

stopButton.addEventListener('click', (e) => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

volumeControl.addEventListener('input', (e) => {
  videoPlayer.volume = volumeControl.value;
});

let myInterval = setInterval(postTime, 1000);

function postTime() {
  let timeInSeconds = Math.round(videoPlayer.currentTime);
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  let timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  timeElapsed.innerHTML = "Time: " + timeString;
}


