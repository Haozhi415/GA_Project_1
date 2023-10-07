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
}, 10000); 


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
// In the gameLogic function, the setInterval is set to run every 0.5 seconds (500 milliseconds). 
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
// Function for streak
let streak = 0;
function updateGameStreak() {// to update the streak in html.
    const gameStreakElement = document.getElementById('streak');
    gameStreakElement.innerHTML = `Streak: ${streak}`;
};
// Function to end the game.
function endGame() {
    clearInterval(gameInterval); // clearInterval stops the game loop

    const gameCountdownElement = document.getElementById('countdown');
    gameCountdownElement.innerHTML = `Game Over!`; //shows Game Over

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
           
            streak += 1; //update the global variable streak with +1.
            
            updateGameStreak(); //update the latest streak to html.
        }

        // If bomb is visible, hide it and show explosion
        if (bombVisible) {
            hideBombShowExplosion(cellId);
            endGame();
        }

        // Get the username from the URL
        const username = getQueryParam("username");

        // Check if username is available
        if (username) {
            // Update leaderboard
            updateLeaderboardStreak(String(username), streak);
            displayLeaderboardStreak();
        } else {
            console.error("Username not available.");
        }
    });
});


// >>>USERNAME RETRIEVAL
// Function to get the value of a query parameter from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};
document.addEventListener("DOMContentLoaded", function () {
    

    // Get the username from the URL
    const username = getQueryParam("username");

    // Set the username in the "username" div
    const usernameElement = document.getElementById("username").querySelector("span");
    usernameElement.textContent = username;

    
});

// >>>BACK TO WELCOME PAGE BUTTON
// Add this function in your game.js file
function redirectToWelcomePage() {
    window.location.href = "index.html";
};


// Function to update the leaderboard in localStorage
function updateLeaderboardStreak(username, score) {
    let leaderboardStreak = JSON.parse(localStorage.getItem('leaderboard_streak')) || [];

    // Check if the user already exists in the leaderboard
    const userIndex = leaderboardStreak.findIndex(entry => entry.username === username);

    if (userIndex !== -1) {
        // If the user exists, update their score
        leaderboardStreak[userIndex].streak = streak;
    } else {
        // If the user doesn't exist, add a new entry
        leaderboardStreak.push({ username, streak });
    }

    leaderboardStreak.sort((a, b) => b.streak - a.streak); // Sort in descending order

    localStorage.setItem('leaderboard_streak', JSON.stringify(leaderboardStreak));
};

  
// Function to display the leaderboard on the webpage
function displayLeaderboardStreak() {
    const leaderboardStreakList = document.getElementById('leaderboardStreak-list');
    leaderboardStreakList.innerHTML = ''; // Clear existing leaderboard
  
    const leaderboardStreak = JSON.parse(localStorage.getItem('leaderboard_streak')) || [];
  
    leaderboardStreak.forEach((entry, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}) ${entry.username}: ${entry.streak}`;
      leaderboardStreakList.appendChild(listItem);
    });
};
  
// Call displayLeaderboard when the page loads
document.addEventListener('DOMContentLoaded', displayLeaderboardStreak);
  
  