let songs = [];
let startTime;
let timerInterval;
let modal;


startGame();
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
    
    // Fetch songs from JSON file and get 11 random songs
  fetch(`./assets/json/Songs/${selectedYear}-EOY-Songs.json`)
  .then((response) => response.json())
  .then((data) => {
    songs = data.content.sections[0].content[0].content[0].chartItems.map(
        (song) => ({
        title: song.title,
        artist: song.artist,
        peak: song.peak, // The current position on the chart
        image: song.imageSrcSmall,
        audio: song.audioSrc,
      })
      );
      ;
    
// Errors start here



     // Initialize Sortable
     new Sortable(document.getElementById('songList'), {
        animation: 150,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen'
    });

    // Set up year selector
    document.getElementById('yearSelector').addEventListener('change', loadSongs);
    
    // Set up check button
    document.getElementById('checkButton').addEventListener('click', checkAnswer);
    
    // Set up share button
    document.getElementById('shareButton').addEventListener('click', shareToFacebook);
    
    // Load initial songs
    loadSongs();
  }
  
    );console.log(loadSongs);
}

function loadSongs() {
                
            // Shuffle the songs
            const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
            
            // Display songs
            displaySongs(shuffledSongs);
            
            // Reset and start timer
            resetTimer();
            startTimer();
        
        
}

function displaySongs(songsToDisplay) {
    const songList = document.getElementById('songList');
    songList.innerHTML = songsToDisplay.map(song => `
        <li class="song-item" data-position="${song.position}">
            <div class="song-button">
                <img src="${song.image}" alt="${song.title}" class="song-image">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
        </li>
    `).join('');
}

function checkAnswer() {
    const currentOrder = Array.from(document.getElementById('songList').children)
        .map(item => parseInt(item.dataset.position));
    
    const correctCount = currentOrder.filter((position, index) => 
        position === index + 1
    ).length;
    
    if (correctCount === 5) {
        const timeSpent = getTimeSpent();
        showSuccessModal(timeSpent);
        stopTimer();
    } else {
        showPartialSuccessModal(correctCount);
    }
}

function showSuccessModal(timeSpent) {
    document.getElementById('modalContent').innerHTML = `
        <p>Congratulations! You got all songs in the correct order!</p>
        <p>Time taken: ${timeSpent}</p>
    `;
    modal.show();
}

function showPartialSuccessModal(correctCount) {
    document.getElementById('modalContent').innerHTML = `
        <p>You got ${correctCount} out of 5 songs in the correct position.</p>
        <p>Keep trying!</p>
    `;
    modal.show();
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    document.getElementById('timer').textContent = 'Time: 0:00';
}

function updateTimer() {
    const timeSpent = getTimeSpent();
    document.getElementById('timer').textContent = `Time: ${timeSpent}`;
}

function getTimeSpent() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function shareToFacebook() {
    const timeSpent = getTimeSpent();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`I arranged the top 5 songs in order in ${timeSpent}! Can you beat my time?`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}