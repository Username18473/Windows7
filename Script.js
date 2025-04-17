function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    if (!timeElement || !dateElement) return;
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear().toString().substr(-2); // Get last two digits of the year

    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${month}/${day}/${year}`;
}

setInterval(updateTime, 1000);
updateTime();

function goBack() {
    const webview = document.getElementById('webview');
    if (webview) {
        webview.contentWindow.history.back();
    }
}

function goForward() {
    const webview = document.getElementById('webview');
    if (webview) {
        webview.contentWindow.history.forward();
    }
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    if (urlBar && webview) {
        let url = urlBar.value;
        if (!url.startsWith('http')) {
            url = 'https://' + url; // Add https if missing
        }
        webview.src = url;
    }
}

function closeBrowser() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'none';
    }
}

// Reopen browser when browser icon is clicked
document.getElementById('browserIcon').addEventListener('click', function() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
    }
});

// Toggle start menu visibility
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        startMenu.style.display = (startMenu.style.display === 'none' || startMenu.style.display === '') ? 'block' : 'none';
    }
}

// Reopen browser when "Browser" link in start menu is clicked
document.getElementById('startMenuBrowserLink').addEventListener('click', function() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
    }
});

document.getElementById("fullscreen-btn").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Handling the form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For demonstration purposes, log the username and password
    console.log('Username:', username);
    console.log('Password:', password);

    // Add your form submission logic here

    // Show the desktop after login
    const desktop = document.getElementById('desktop');
    const loginContainer = document.getElementById('loginContainer');
    if (desktop && loginContainer) {
        desktop.style.display = 'block';
        loginContainer.style.display = 'none';
    }
});

// Hide the desktop icons during login
document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const desktop = document.getElementById('desktop');
    if (loginContainer && desktop) {
        if (loginContainer.style.display !== 'none') {
            desktop.style.display = 'none';
        }
    }
});

// Add JavaScript to make the browser window draggable
function makeElementDraggable(element) {
    if (!element) return;
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', function(e) {
        console.log('Mouse down on element');
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            console.log('Dragging element');
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        console.log('Mouse up, stop dragging');
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

// Make the browser element draggable
makeElementDraggable(document.getElementById('browser'));

// Function to open My PC popup
function openMyPC() {
    const myPCPopup = document.getElementById('myPCPopup');
    if (myPCPopup) {
        myPCPopup.style.display = 'block';
    }
}

// Function to close My PC popup
function closeMyPC() {
    const myPCPopup = document.getElementById('myPCPopup');
    if (myPCPopup) {
        myPCPopup.style.display = 'none';
    }
}

// Make the My PC popup draggable
makeElementDraggable(document.getElementById('myPCPopup'));

function logoff() {
    // Perform logoff actions here
    // For example, redirect to a logoff page or clear session data
    window.location.href = "Logoff.html"; // Redirect to a logoff page
}

let currentPlayer = 'X';

function makeMove(cellNumber) {
    const cell = document.getElementById(`cell-${cellNumber}`);
    if (cell && cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            botMove();
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index =>
            document.getElementById(`cell-${index}`).textContent === currentPlayer
        );
    });
}

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell) {
            cell.textContent = '';
        }
    }
    currentPlayer = 'X';
}

function botMove() {
    // Find the first empty cell
    let emptyCell = null;
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (cell && cell.textContent === '') {
            emptyCell = cell;
            break;
        }
    }

    if (emptyCell) {
        // Bot places its mark
        emptyCell.textContent = currentPlayer;

        // Check if the bot won
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetGame();
            return;
        }

        // Switch back to player's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function toggleControlPanel() {
    const controlPanel = document.getElementById('control-panel');
    if (controlPanel) {
        controlPanel.style.display = (controlPanel.style.display === 'none' || controlPanel.style.display === '') ? 'block' : 'none';
    }
}

function performAction1() {
    const images = [
        'url("path/to/image1.jpg")',
        'url("path/to/image2.jpg")',
        'url("path/to/image3.jpg")',
        'url("path/to/image4.jpg")',
        'url("path/to/image5.jpg")'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    console.log('Selected Image:', randomImage); // Add this line to log the selected image
    document.body.style.backgroundImage = randomImage;
    document.body.style.backgroundSize = 'cover'; // Ensure the image covers the entire background
}

// Adding event listener for Action 1 button
document.getElementById('action1-btn').addEventListener('click', performAction1);

// JavaScript for handling the click event
document.querySelector('.start-menu').addEventListener('click', function() {
    const defaultImg = this.querySelector('img.default');
    const clickedImg = this.querySelector('img.clicked');
    defaultImg.style.display = 'none';
    clickedImg.style.display = 'block';
});
// Function to open Webcam App
function openWebcamApp() {
    window.location.href = 'webcam.html';
}

function closePopup() {
    const popup = document.getElementById('control-panel-popup');
    popup.style.display = 'none';
}

document.getElementById("action2-btn").addEventListener("click", function () {
  // Update the content within the menu
  document.getElementById("menu-content").textContent = "Clock & Language Menu Content";
});

document.addEventListener('DOMContentLoaded', function() {
  const actionButton = document.getElementById('action1-btn');
  const popup = document.getElementById('popup');
  const closeButton = document.getElementById('close-popup');
  const wallpapers = document.querySelectorAll('.wallpaper');
  const body = document.body;

  // Open popup when button is clicked
  actionButton.addEventListener('click', function() {
    popup.style.display = 'flex';
  });

  // Close popup when close button is clicked
  closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
  });

  // Change wallpaper when an image is clicked
  wallpapers.forEach(image => {
    image.addEventListener('click', function() {
      const wallpaperUrl = image.getAttribute('data-wallpaper');
      body.style.backgroundImage = `url(${wallpaperUrl})`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
      popup.style.display = 'none'; // Close popup
    });
  });
});

// Open the language and timezone popup
function openLanguageTimezonePopup() {
    document.getElementById('language-timezone-popup').style.display = 'flex';
}

// Close the language and timezone popup
document.getElementById('close-language-timezone-popup').addEventListener('click', function() {
    document.getElementById('language-timezone-popup').style.display = 'none';
});

// Save language and timezone selection
document.getElementById('save-language-timezone').addEventListener('click', function() {
    const language = document.getElementById('language').value;
    const timezone = document.getElementById('timezone').value;

    // Save the selections (you can send them to the server or store them locally)
    alert(`Language: ${language}, Time Zone: ${timezone}`);
    document.getElementById('language-timezone-popup').style.display = 'none';
});

document.getElementById('hide-program-btn').addEventListener('click', () => {
    const selectedProgram = document.getElementById('programs-dropdown').value;
    const programElement = document.getElementById(selectedProgram);

    if (programElement) {
        programElement.style.display = 'none'; // Hide the selected program
    }
});

document.getElementById('hide-program-btn').addEventListener('click', () => {
    const selectedProgram = document.getElementById('programs-dropdown').value;

    // Map the dropdown values to corresponding elements on the desktop and start menu
    const programElements = {
        "ie": {
            desktop: document.getElementById('browserIcon'), // Internet Explorer Desktop Icon
            startMenu: document.getElementById('startMenuBrowserLink') // Start Menu Link for Internet Explorer
        },
        "webcam": {
            desktop: document.querySelector('[onclick="openWebcamApp()"]'), // Webcam Desktop Icon
            startMenu: document.getElementById('startMenuWebcamLink') // Start Menu Link for Webcam
        }
    };

    // Check if the selected program exists in the map
    if (programElements[selectedProgram]) {
        // Hide the desktop icon
        if (programElements[selectedProgram].desktop) {
            programElements[selectedProgram].desktop.style.display = 'none';
        }

        // Hide the start menu link
        if (programElements[selectedProgram].startMenu) {
            programElements[selectedProgram].startMenu.style.display = 'none';
        }
    }
});

makeElementDraggable(document.getElementById('control-panel'), document.querySelector('.control-panel-header'));

function closeControlPanel() {
    document.getElementById('control-panel').style.display = 'none';
}

function openMediaPlayerApp() {
    window.location.href = 'Mediaplayer.html';
}

function openPaintApp() {
            window.location.href = "Paint.html";
        }
