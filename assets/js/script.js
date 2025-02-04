let songs = []; // Global array to store songs
let currentIndex = 0; // Track which song we're on
let score = 0; // Track correct answers
let gameSongs = []; // Will hold the 11 random songs

document.getElementById("yearDropdown").addEventListener("change", function() {
  const selectedYear = this.value;
  fetchSongs(selectedYear);
});

function fetchSongs(selectedYear) {
  fetch(`./assets/json/Songs/${selectedYear}-EOY-Songs.json`)
    .then((response) => response.json())
    .then((data) => {
      songs = data.content.sections[0].content[0].content[0].chartItems.map(
        (song) => ({
          title: song.title,
          artist: song.artist,
          peak: song.peak, // The highest position on the chart
          image: song.imageSrcSmall,
          audio: song.audioSrc,
        })
      );
    });

    //   startGame(); // Call function to begin game after fetching songs
    // })
    // .catch((error) => console.error("Error loading JSON:", error));
}

function startGame() {
    gameSongs = getRandomSongs();
    showNextSong();
    document.getElementById('song-container').style.display = "block"; // Show container
  document.getElementById("game-over").style.display = "none"; // Hide game-over message
  }
  
  function getRandomSongs(count = 11) {
    const validSongs = songs.filter(
      (song) => song.audio && song.image.includes("http")
    );
    const shuffled = validSongs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  function showNextSong() {
    if (currentIndex >= 10) {
      endGame();
      return;
    }
  
    const currentSong = gameSongs[currentIndex];
    const nextSong = gameSongs[currentIndex + 1];
  
    document.getElementById("song-container").innerHTML = `
      <div class="game-wrapper">
        <div class="card">
          <img src="${currentSong.image}" alt="${currentSong.title}">
          <h3>${currentSong.title}</h3>
          <p>by ${currentSong.artist}</p>
          <audio controls src="${currentSong.audio}"></audio>
          <p class="chart-position">Peak Position: ${currentSong.peak}</p>
        </div>
        <div class="vs">Banger or Clanger?
        <p>Did the next song chart **Higher**, **Lower**, or **The Same**?</p>
        <button onclick="guess('higher', ${currentSong.peak}, ${nextSong.peak})">Higher</button>
        <button onclick="guess('lower', ${currentSong.peak}, ${nextSong.peak})">Lower</button>
        <button onclick="guess('same', ${currentSong.peak}, ${nextSong.peak})">Same</button>
        </div>
        <div class="card">
          <img src="${nextSong.image}" alt="${nextSong.title}">
          <h3>${nextSong.title}</h3>
          <p>by ${nextSong.artist}</p>
          <audio controls src="${nextSong.audio}"></audio>
          <p class="chart-position hidden">Peak Position: ???</p>
        </div>
      </div>
      
    `;
  }
  
  function guess(playerGuess, currentPeak, nextPeak) {
    let correct = false;
  
    if (playerGuess === "higher" && nextPeak < currentPeak) correct = true;
    if (playerGuess === "lower" && nextPeak > currentPeak) correct = true;
    if (playerGuess === "same" && nextPeak === currentPeak) correct = true;
  
    if (correct) {
      score++;
      alert(`Correct! ✅ The next song peaked at position ${nextPeak}.`);
    } else {
      alert(`Wrong! ❌ The next song peaked at position ${nextPeak}.`);
    }
  
    currentIndex++;
    showNextSong();
  }
  
  function endGame() {
    document.getElementById("game-over").style.display = "block"; // Show game-over message
    document.getElementById("score").innerHTML = `
            <p>Your score: ${score} / 10</p>
      `;
    document.getElementById("song-container").style.display = "none"; // Hide game UI
    document.getElementById("buttons").style.display = "none"; 
}