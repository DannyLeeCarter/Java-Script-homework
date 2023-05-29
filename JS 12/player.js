const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const volumeControl = document.getElementById("volume-control");
playButton.addEventListener("click", () => {
   audioPlayer.play();
});
pauseButton.addEventListener("click", () => {
   audioPlayer.pause();
});
stopButton.addEventListener("click", () => {
    audioPlayer.pause();
audioPlayer.currentTime = 0;
});
volumeControl.addEventListener("input", (e) => {
    audioPlayer.volume = e.target.value;
    });
const timeElapsed = document.getElementById("time-elapsed");
audioPlayer.addEventListener("timeupdate", () => {
let minutes = Math.floor(audioPlayer.currentTime / 60);
let seconds = Math.floor(audioPlayer.currentTime % 60);
timeElapsed.innerHTML = `${minutes}:${seconds}`;

console.log (playButton);
console.log (pauseButton);
console.log (stopButton);
console.log (volumeControl);

});