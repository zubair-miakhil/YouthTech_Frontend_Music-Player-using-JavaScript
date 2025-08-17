// Demo songs (replace file paths with real mp3s in production)
const songs = [
  {
    name: "Acoustic Breeze",
    file: "songs/acoustic-breeze.mp3",
    duration: "2:37"
  },
  {
    name: "Sunny Day",
    file: "songs/sunny-day.mp3",
    duration: "3:12"
  },
  {
    name: "Jazz Piano",
    file: "songs/jazz-piano.mp3",
    duration: "2:58"
  }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const songDuration = document.getElementById('song-duration');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const volumeSlider = document.getElementById('volume-slider');
const playlistList = document.getElementById('playlist-list');

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songTitle.textContent = song.name;
  songDuration.textContent = `0:00 / ${song.duration}`;
  updatePlaylistUI();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<span>&#10073;&#10073;</span>';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<span>&#9654;</span>';
}

function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    songDuration.textContent = `${formatTime(audio.currentTime)} / ${songs[currentSong].duration}`;
  }
}

function setProgress(e) {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}

function setVolume(e) {
  audio.volume = e.target.value;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function updatePlaylistUI() {
  playlistList.innerHTML = '';
  songs.forEach((song, idx) => {
    const li = document.createElement('li');
    li.textContent = song.name;
    if (idx === currentSong) li.classList.add('active');
    li.addEventListener('click', () => {
      currentSong = idx;
      loadSong(currentSong);
      playSong();
    });
    playlistList.appendChild(li);
  });
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

document.addEventListener('DOMContentLoaded', () => {
  loadSong(currentSong);
  audio.volume = volumeSlider.value;
}); 