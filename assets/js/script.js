// Initial Global Variable Definition
let songs = []; // Global array to store songs
let currentIndex = 0; // Track which song we're on
let score = 0; // Track correct answers
let gameSongs = []; // Will hold the 11 random songs
lastScoreDisplay(); // Display last score if available


// Function to display the last score if available (stored locally)
function lastScoreDisplay() {
  let scoreUpdate = document.getElementById("game-intro");
  let previousScore = localStorage.getItem("score");

  if (previousScore) {
    const scoreUpdateParagraph = document.createElement("p");
    scoreUpdateParagraph.id = "previous-score";
    if (document.getElementById("previous-score")) {
      document.getElementById("previous-score").remove();
    }
    if (previousScore < 10) {
      scoreUpdateParagraph.textContent = `Your last score was ${localStorage.getItem(
        "score"
      )} / 10. Can you beat it?`;
    } else if (previousScore == 10) {
      scoreUpdateParagraph.textContent = `Congratulations! You previously scored ${localStorage.getItem(
        "score"
      )} / 10. Can you do it again?`;
    }
    scoreUpdate.appendChild(scoreUpdateParagraph);
  }
}

// Start Game Function
function startGame() {
  // Get the selected year from the dropdown
  const selectedYear = document.getElementById("yearDropdown").value;
  if (selectedYear === "placeholder") {
    alert("Please select a year to start the game.");
    return;
  }

  // Reset Global Variables since we have changed years.
  songs = [];
  currentIndex = 0;
  score = 0;
  gameSongs = [];
  document.getElementById("song-container").style.display = "none";

  // Fetch songs from JSON file and get 11 random songs
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
      gameSongs = getRandomSongs();
      showNextSong();

      // Show game container and hide game-over message
      document.getElementById("song-container").style.display = "block";
      document.getElementById("game-over").style.display = "none";
    });
}

// Function to get 11 random songs from the songs array (1 start and 10 questions)
function getRandomSongs(count = 11) {
  const validSongs = songs.filter(
    (song) => song.audio && song.image.includes("http")
  );
  const shuffled = validSongs.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to display the next song in the game until 10 songs have been played
function showNextSong() {
  if (currentIndex >= 10) {
    endGame();
    return;
  }

  // Moves next song to current song and gets the next song
  const currentSong = gameSongs[currentIndex];
  const nextSong = gameSongs[currentIndex + 1];

  // Display the current and next song in the game
  document.getElementById("song-container").innerHTML = `
      <div class="game-wrapper row align-items-center">
  <div class="col-md-4">
    <div class="card">
      <div class="row align-items-center">
        <div class="col-5 col-md-12 image-container">

          <img src="${currentSong.image}" alt="${currentSong.title}" class="object-fit-contain img-fluid">
        </div>
      
      <div class="col-7 col-md-12">
        <h3>${currentSong.title}</h3>
        <p>by ${currentSong.artist}</p>
        <audio controls src="${currentSong.audio}"></audio>
        <p class="chart-position">Peak Position: ${currentSong.peak}</p>
      </div>
      </div>
    </div>
  </div>

<div class="col-md-4">
  <div class="vs">
    <h3>Banger or Clanger?</h3>
    <h4>Did the next song chart
      <br>
      <strong>Lower, The Same, or Higher</strong>?
    </h4>

    <button class="game-button" onclick="guess('lower', ${currentSong.peak}, ${nextSong.peak})">Lower</button>
    <button class="game-button" onclick="guess('same', ${currentSong.peak}, ${nextSong.peak})">Same</button>
    <button class="game-button" onclick="guess('higher', ${currentSong.peak}, ${nextSong.peak})">Higher</button>

    <div id="notifications" class="row m-auto"></div>

    <div class="row m-auto">

      <p id="score-tracking">Score: ${score} / 10</p>
    </div>
  </div>
</div>

<div class="col-md-4">
  <div class="card">
  <div class="row align-items-center">
        <div class="col-5 col-md-12 image-container">
    <img src="${nextSong.image}" alt="${nextSong.title}" class="object-fit-contain img-fluid">
    </div>
      
      <div class="col-7 col-md-12">
    <h3>${nextSong.title}</h3>
    <p>by ${nextSong.artist}</p>
    <audio controls src="${nextSong.audio}"></audio>
    <p class="chart-position hidden">Peak Position: ???</p>
    </div>
  </div>
</div>

</div>
</div>
    `;
}

// Function to check if the player's guess was correct
function guess(playerGuess, currentPeak, nextPeak) {
  let correct = false;

  if (playerGuess === "higher" && nextPeak < currentPeak) correct = true;
  if (playerGuess === "lower" && nextPeak > currentPeak) correct = true;
  if (playerGuess === "same" && nextPeak === currentPeak) correct = true;

  // Create paragraph elements for score notification
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

  // Notification and Score Update
  const scoreNotification = document.createElement("p");
  scoreNotification.textContent = `The next song peaked at position ${nextPeak}.`;
  notificationArea.appendChild(scoreNotification);
  scoreArea.textContent = `Score: ${score} / 10`;

  // Disable Buttons (to prevent re-triggering)
  const guessButtons = document.querySelectorAll(".game-button");
  guessButtons.forEach((button) => (button.disabled = true));

  // Move the song index along and create button for next round
  currentIndex++;
  const nextSongButton = document.createElement("button");
  nextSongButton.textContent = "Next Song";
  nextSongButton.onclick = showNextSong;
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      showNextSong();
    }
  });
  notificationArea.appendChild(nextSongButton);
}

// Function to end the game and display the final score
function endGame() {
  document.getElementById("song-container").style.display = "none"; // Hide game UI
  document.getElementById("game-over").style.display = "block"; // Show game-over message
  document.getElementById(
    "score"
  ).innerHTML = `<p>Your score: ${score} / 10</p>`;

  localStorage.setItem("score", score); // Store score in local storage
  lastScoreDisplay(); // Display last score

  // Reset Global Variables
  songs = [];
  currentIndex = 0;
  score = 0;
  gameSongs = [];
  yearDropdown.selectedIndex = 0; // Reset dropdown to default to force player to select a new year
}

// const yearDropdown = document.getElementById("yearDropdown");
// let selectedYear = yearDropdown.options[yearDropdown.selectedIndex].value;

// yearDropdown.addEventListener("change", function () {
//   selectedYear = yearDropdown.options[yearDropdown.selectedIndex].value;
// });

// const fbButton = document.getElementById("fb-share-button");
// const url = window.location.href;

// fbButton.addEventListener("click", function () {
//   const score = document.getElementById("score").innerText;
//   const message = `I just got ${score} on my knowledge of ${selectedYear} chart music. Think you can do better?`;
//   window.open(
//     "https://www.facebook.com/sharer/sharer.php?u=" +
//       encodeURIComponent(url) +
//       "&quote=" +
//       encodeURIComponent(message),
//     "facebook-share-dialog",
//     "width=800,height=600"
//   );
//   return false;
// });

const fbButton = document.getElementById('fb-share-button');
const url = window.location.href;

fbButton.addEventListener('click', function () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
        'facebook-share-dialog',
        'width=800,height=600'
    );
    return false;
});

document.getElementById('fontSelector').addEventListener('change', function() {
  const selectedFont = this.value;

  // Only change the font if a valid option is selected
  if (selectedFont !== 'placeholder') {
      document.documentElement.style.setProperty('--primary-font', selectedFont);
  }
});