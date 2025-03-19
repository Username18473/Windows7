function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

function updateDate() {
    const dateElement = document.getElementById('date');
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    dateElement.textContent = `${month}/${day}/${year}`;
}

setInterval(updateTime, 1000);
setInterval(updateDate, 1000);  // Update the date every second
updateTime();
updateDate();

function goBack() {
    document.getElementById('webview').contentWindow.history.back();
}

function goForward() {
    document.getElementById('webview').contentWindow.history.forward();
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    let url = urlBar.value;
    if (!url.startsWith('http')) {
        url = 'https://' + url; // Add https if missing
    }
    webview.src = url;
}

function closeBrowser() {
    document.getElementById('browser').style.display = 'none';
}

// Reopen browser when browser icon is clicked
document.getElementById('browserIcon').addEventListener('click', function() {
    document.getElementById('browser').style.display = 'block';
});

// Toggle start menu visibility
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu.style.display === 'none' || startMenu.style.display === '') {
        startMenu.style.display = 'block';
    } else {
        startMenu.style.display = 'none';
    }
}

// Reopen browser when "Browser" link in start menu is clicked
document.getElementById('startMenuBrowserLink').addEventListener('click', function() {
    document.getElementById('browser').style.display = 'block';
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
