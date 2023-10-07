// >>> INITIAL 10 SECS COUNTDOWN.
// Function for 10 secs countdown, then implemented in window.onload
function startInitialCountdown() {
    
    let init_seconds = 10; // duration of the initial countdown once the page loads 10 secs

    function updateInitialCountdown() {
      const initialCountdownElement = document.getElementById('countdown');
      initialCountdownElement.innerHTML = `Game starting in: ${init_seconds} seconds`;

      if (init_seconds > 0) {
        init_seconds--;
        setTimeout(updateInitialCountdown, 1000); // Update every 1 second (1000 milliseconds)
      } else {
        initialCountdownElement.innerHTML = 'Game Start!';
        setTimeout(() => {
            // Hide the "Game start!" message after 15 seconds
            initialCountdownElement.style.visibility = 'hidden';
          }, 15000);
      }
    }

    updateInitialCountdown();
  };
// load the startInitialCountdown once the page loads
window.onload = startInitialCountdown;


// >>> GAME STARTING.
// Delay the start of the game by 10 seconds
setTimeout(function () {
    gameLogic(); // Start the game logic after 10 seconds
    startGameCountdown(); // Start the game countdown after 10 seconds
}, 10000); 
// Function to end the game.
function endGame() {
    clearInterval(gameInterval); // clearInterval stops the game loop
    
    // Select all cells
    const cells = document.querySelectorAll('.cell');

    // Iterate through each cell
    cells.forEach(cell => {
        const images = cell.querySelectorAll('img');

        // Set the style of each image to "display: none"
        images.forEach(img => {
            img.style.display = 'none';
        });
    });
};
// Function for 90 secs game duration, implement in setTimeout function
function startGameCountdown() {
    
    let game_seconds = 90; // duration of the game 90 secs

    function updateGameCountdown() { //to update the game countdown in html
      const gameCountdownElement = document.getElementById('time_left');
      gameCountdownElement.innerHTML = `Game ends in: ${game_seconds} seconds`;

      if (game_seconds > 0) {
        game_seconds--;
        setTimeout(updateGameCountdown, 1000); // Update every 1 second (1000 milliseconds)
      } else {
        gameCountdownElement.innerHTML = `Game Over!`; //shows Game Over
        endGame();
      }
    }

    updateGameCountdown();
};


// >>> GRID CELLS PUMPKINS/BOMBS RANDOMISATION.
// Function to show the PUMPKIN image in a specific cell, by targeting the specific ID of each cells in html, to be used in gameLogic.
function showPumpkin(cellId) {
    document.getElementById(cellId).querySelector(".pumpkin_image").style.display = "block";
};
// Function to show the BOMB image in a specific cell, by targeting the specific ID of each cells in html, to be used in gameLogic. 
function showBomb(cellId) {
    document.getElementById(cellId).querySelector(".bomb_image").style.display = "block";
};
// Function to reset all images in a specific cell to hidden, by targeting the specific ID of each cells in html, to be used in gameLogic.
function resetImages(cellId) {
    document.getElementById(cellId).querySelector(".pumpkin_image").style.display = "none";
    document.getElementById(cellId).querySelector(".bomb_image").style.display = "none";
};
// Function to control game logic.
// setInterval is a JavaScript function that repeatedly 
// calls a provided function or executes a given piece of code at specified intervals, in this case every 0.5 seconds.
// Within each iteration of this interval, a random cell is selected, and based on another random value, 
// either the pumpkin or bomb image is displayed in that cell. 
// After displaying the image, the resetImages function is called to hide the image, and the cycle repeats.
function gameLogic() {
    gameInterval = setInterval(function () {
        let randomValue = Math.random();
        let cellId = "cell" + Math.floor(Math.random() * 9); // Get a random cell ID

        if (randomValue < 0.5) {
            resetImages(cellId);
            showPumpkin(cellId);
        } else if (randomValue >= 0.5 && randomValue < 0.7) {
            resetImages(cellId);
            showBomb(cellId);
        } else {
            resetImages(cellId);
        }

    }, 500); // Runs every 0.5 second
};


// >>> CLICK EVENT LISTENER, SCORE, AND STREAK.
// Function to hide pumpkin and show splatter, to be used in click event listener.
function hidePumpkinShowSplatter(cellId) {
    resetImages(cellId);
    document.getElementById(cellId).querySelector(".splatter_image").style.display = "block";

    // Wait for 0.2 seconds and then hide the splatter
    setTimeout(function() {
        document.getElementById(cellId).querySelector(".splatter_image").style.display = "none";
    }, 200);
};
// Function to hide bomb and show explosion, to be used in click event listener.
function hideBombShowExplosion(cellId) {
    resetImages(cellId);
    document.getElementById(cellId).querySelector(".explosion_image").style.display = "block";

    // Wait for 0.2 seconds and then hide the explosion
    setTimeout(function() {
        document.getElementById(cellId).querySelector(".explosion_image").style.display = "none";
    }, 200);
};
// Function for scoring
let score = 0;
function updateGameScore() { // to update the score in html.
    const gameScoreElement = document.getElementById('gamescore');
    gameScoreElement.innerHTML = `Score: ${score} Points`;
};
// Click event listener.
const cells = document.querySelectorAll('.cell'); // selecting all the cells in the game grid, by targeting the class ".cell"
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        // Get the ID of the clicked cell using "this"
        let cellId = this.id;

        // Check the currently displayed image in the clicked cell
        let pumpkinVisible = document.getElementById(cellId).querySelector(".pumpkin_image").style.display === "block";
        let bombVisible = document.getElementById(cellId).querySelector(".bomb_image").style.display === "block";

        // If pumpkin is visible, hide it and show splatter
        if (pumpkinVisible) {
            hidePumpkinShowSplatter(cellId);
            score += 10; //update the global variable score with +10 points.
            updateGameScore(); //update the latest score to html.
            
        }

        // If bomb is visible, hide it and show explosion
        if (bombVisible) {
            hideBombShowExplosion(cellId);
            score -= 15; //update the global variable score with -15 points.
            updateGameScore(); //update the latest score to html.
            
        }

        // Get the username from the URL
        const username = getQueryParam("username");

        // Check if username is available
        if (username) {
            // Update leaderboard
            updateLeaderboard(String(username), score);
            displayLeaderboard();
        } else {
            console.error("Username not available.");
        }
    });
});


// >>>USERNAME RETRIEVAL
// Function to get the value of a query parameter from the URL
    // 'name' parameter is a variable representing the name of the query parameter you want to retrieve. 
    function getQueryParam(name) {
        // In this case, the function is designed to get the value of a query parameter named "username"
        const urlParams = new URLSearchParams(window.location.search);
        // This line returns the value associated with the specified name (query parameter) from the URL. 
        // In this case, it returns the value of the "username" parameter from the URL.
        return urlParams.get(name);
    }
// This sets up an event listener that waits for the DOM content to be fully loaded before executing the contained function.
document.addEventListener("DOMContentLoaded", function () {
    

    // Get the username from the URL
    const username = getQueryParam("username");
    // Set the username in the "username" div in the html
    const usernameElement = document.getElementById("username").querySelector("span");
    usernameElement.textContent = username;

    
});

// >>>BACK TO WELCOME PAGE BUTTON
function redirectToWelcomePage() {
    window.location.href = "index.html";
};


// Function to update the leaderboard in localStorage
function updateLeaderboard(username, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Check if the user already exists in the leaderboard
    const userIndex = leaderboard.findIndex(entry => entry.username === username);

    if (userIndex !== -1) {
        // If the user exists, update their score
        leaderboard[userIndex].score = score;
    } else {
        // If the user doesn't exist, add a new entry
        leaderboard.push({ username, score });
    }

    leaderboard.sort((a, b) => b.score - a.score); // Sort in descending order

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};

  
// Function to display the leaderboard on the webpage
function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear existing leaderboard
    
    // initializes a variable leaderboard with the parsed contents of the 'leaderboard' key from the local storage. 
    // If there is no data or an error occurs during parsing, it defaults to an empty array.
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // function to update the leaderboard display.
    leaderboard.forEach((entry, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}) ${entry.username}: ${entry.score} Points`;
      leaderboardList.appendChild(listItem);
    });
};
  
// Call displayLeaderboard when the page loads
document.addEventListener('DOMContentLoaded', displayLeaderboard);
  
  