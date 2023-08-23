// Get the necessary elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const playbackSpeedInput = player.querySelector('.playbackSpeed');
const skipBackButton = player.querySelector('.skipBack');
const skipForwardButton = player.querySelector('.skipForward');

// Play/pause functionality
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Update play/pause button
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Skip functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));

// Volume and playback speed sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Playback speed
playbackSpeedInput.addEventListener('change', function () {
  video.playbackRate = this.value;
});

// Progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

// Scrubbing progress
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

progress.addEventListener('click', scrub);

// Skip back and forward buttons
skipBackButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

skipForwardButton.addEventListener('click', () => {
  video.currentTime += 25;
});

// Initialize playback speed
playbackSpeedInput.value = 1;
video.playbackRate = 1;

// Initialize video source
video.src = 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4';
