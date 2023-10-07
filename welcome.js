document.addEventListener("DOMContentLoaded", function () {
    // Get the start game button and add a click event listener
    document.getElementById("game2").addEventListener("click", function () {
        // Get the username entered by the user
        const usernameInput = document.getElementById("username");
        const username = usernameInput.value;

        // Check if the username is empty
        if (username.trim() === "") {
            alert("Please enter a username before starting the game.");
            return; // Stop execution if the username is empty
        }

        // Redirect to the game page with the username as a query parameter
        window.location.href = `game2.html?username=${encodeURIComponent(username)}`;
    });

    document.getElementById("game1").addEventListener("click", function () {
        // Get the username entered by the user
        const usernameInput = document.getElementById("username");
        const username = usernameInput.value;

        // Check if the username is empty
        if (username.trim() === "") {
            alert("Please enter a username before starting the game.");
            return; // Stop execution if the username is empty
        }

        // Redirect to the game page with the username as a query parameter
        window.location.href = `game1.html?username=${encodeURIComponent(username)}`;
    });
});
