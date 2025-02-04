let songs = []; // Global array to store songs
let currentIndex = 0; // Track which song we're on
let score = 0; // Track correct answers
let gameSongs = []; // Will hold the 11 random songs

document.getElementById("yearDropdown").addEventListener("change", function () {
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
  document.getElementById("song-container").style.display = "block"; // Show container
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
        <div class="card col-md-3 col-lg-4">
          <img src="${currentSong.image}" alt="${currentSong.title}">
          <h3>${currentSong.title}</h3>
          <p>by ${currentSong.artist}</p>
          <audio controls src="${currentSong.audio}"></audio>
          <p class="chart-position">Peak Position: ${currentSong.peak}</p>
        </div> 
        
        <div class="vs col-md-3 col-lg-4">
        <h3>Banger or Clanger?</h3>
        <h4>Did the next song chart 
        <br>
        <strong>Higher, Lower, or the Same</strong>?</h4>
        <button class="game-button" onclick="guess('lower', ${currentSong.peak}, ${nextSong.peak})">Lower</button>
        <button class="game-button" onclick="guess('same', ${currentSong.peak}, ${nextSong.peak})">Same</button>
        <button class="game-button" onclick="guess('higher', ${currentSong.peak}, ${nextSong.peak})">Higher</button>
        <div id="notifications" class="row m-auto"></div>
        <div class="row m-auto">
        <p id="score-tracking">Score: ${score} / 10</p>
        </div>
        </div>
        
        <div class="card col-md-3 col-lg-4">
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

  // if (correct) {
  //   score++;
  //   alert(`Correct! ✅ The next song peaked at position ${nextPeak}.`);
  // } else {
  //   alert(`Wrong! ❌ The next song peaked at position ${nextPeak}.`);
  // }
 const notificationArea = document.getElementById("notifications");
  const scoreArea = document.getElementById("score-tracking");
  if (correct) {
    score++;
    const correctNotification = document.createElement("p");
    correctNotification.textContent = "Correct! ✅";
    notificationArea.appendChild(correctNotification);
  } else {
    const wrongNotification = document.createElement("p");
    wrongNotification.textContent = "Wrong! ❌";
    notificationArea.appendChild(wrongNotification);
  }

  const scoreNotification = document.createElement("p");
  scoreNotification.textContent = `The next song peaked at position ${nextPeak}.`;
  notificationArea.appendChild(scoreNotification);

  const guessButtons = document.querySelectorAll(".game-button");
  guessButtons.forEach((button) => (button.disabled = true));

  
  scoreArea.textContent = `Score: ${score} / 10`;
  

  currentIndex++;
  console.log(score);
  const nextSongButton = document.createElement("button");
  nextSongButton.textContent = "Next Song";
  nextSongButton.onclick = showNextSong;
  notificationArea.appendChild(nextSongButton);

  
}

function endGame() {
  document.getElementById("game-over").style.display = "block"; // Show game-over message
  document.getElementById("score").innerHTML = `
            <p>Your score: ${score} / 10</p>
      `;
  document.getElementById("song-container").style.display = "none"; // Hide game UI
  document.getElementById("buttons").style.display = "none";
}

const yearDropdown = document.getElementById('yearDropdown');
let selectedYear = yearDropdown.options[yearDropdown.selectedIndex].value;

yearDropdown.addEventListener('change', function() {
    selectedYear = yearDropdown.options[yearDropdown.selectedIndex].value;
});

const fbButton = document.getElementById('fb-share-button');
const url = window.location.href;

fbButton.addEventListener('click', function () {
    const score = document.getElementById("score").innerText;
    const message = `I just got ${score} on my knowledge of ${selectedYear} chart music. Think you can do better?`;
    window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&quote=' + encodeURIComponent(message),
        'facebook-share-dialog',
        'width=800,height=600'
    );
    return false;
});
