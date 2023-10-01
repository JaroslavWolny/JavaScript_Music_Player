document.addEventListener("DOMContentLoaded", function () {
  const wavesurfer = WaveSurfer.create({
    container: "#waveform",
    height: 115,
    splitChannels: false,
    normalize: false,
    waveColor: "#1a0a53",
    progressColor: "#4d22b3",
    cursorColor: "#ddd5e9",
    cursorWidth: 2,
    barWidth: 2,
    barGap: 2,
    barRadius: 1,
    barHeight: 1.2,
    url: "media/Rido_Counterstrike_-_Let_It_Roll.mp3",
  });

  let isPlaying = false;
  let updateTimeInterval;

  const playPauseButton = document.getElementById("playPause");
  playPauseButton.addEventListener("click", function () {
    if (isPlaying) {
      wavesurfer.pause();
      playPauseButton.textContent = "Play";
      clearInterval(updateTimeInterval);
    } else {
      wavesurfer.play();
      playPauseButton.textContent = "Pause";
      updateTimeInterval = setInterval(updateCurrentTime, 1000);
    }
    isPlaying = !isPlaying;
  });

  const zoomInButton = document.getElementById("zoomIn");
  zoomInButton.addEventListener("click", function () {
    wavesurfer.zoom(5);
  });

  const zoomOutButton = document.getElementById("zoomOut");
  zoomOutButton.addEventListener("click", function () {
    wavesurfer.zoom(-5);
  });

  updateCurrentTime();

  wavesurfer.on("seek", function (progress) {
    if (!isPlaying) {
      updateCurrentTime(progress);
    }
  });

  const waveformContainer = document.getElementById("waveform");
  waveformContainer.addEventListener("click", function (e) {
    const clickX = e.clientX - waveformContainer.getBoundingClientRect().left;
    const waveformWidth = waveformContainer.clientWidth;
    const progress = clickX / waveformWidth;
    updateCurrentTime(progress);
  });

  function updateCurrentTime() {
    const currentTimeDisplay = document.getElementById("currentTime");
    const currentTimeInSeconds = wavesurfer.getCurrentTime();
    const minutes = Math.floor(currentTimeInSeconds / 60);
    const seconds = Math.floor(currentTimeInSeconds % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    currentTimeDisplay.textContent = formattedTime;
  }
});
