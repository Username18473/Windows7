function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    if (!timeElement || !dateElement) return;
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear().toString().substr(-2);

    timeElement.textContent = `${hours}:${minutes}`;
    dateElement.textContent = `${month}/${day}/${year}`;
}

setInterval(updateTime, 1000);
updateTime();

function goBack() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.warn('Webview element not found.');
        return;
    }
    webview.contentWindow.history.back();
}

function goForward() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.warn('Webview element not found.');
        return;
    }
    webview.contentWindow.history.forward();
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    if (!urlBar || !webview) {
        console.warn('URL bar or Webview element not found.');
        return;
    }
    let url = urlBar.value;
    if (!url.startsWith('http')) {
        url = 'https://' + url; // Add https if missing
    }
    webview.src = url;
}

function closeBrowser() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'none';
    }
}

document.getElementById('browserIcon').addEventListener('click', function() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
    }
});

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        startMenu.style.display = (startMenu.style.display === 'none' || startMenu.style.display === '') ? 'block' : 'none';
    }
}

document.getElementById('startMenuBrowserLink').addEventListener('click', function() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    const desktop = document.getElementById('desktop');
    const loginContainer = document.getElementById('loginContainer');
    if (desktop && loginContainer) {
        desktop.style.display = 'block';
        loginContainer.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const desktop = document.getElementById('desktop');
    if (loginContainer && desktop) {
        if (loginContainer.style.display !== 'none') {
            desktop.style.display = 'none';
        }
    }
});

function makeElementDraggable(element) {
    if (!element) return;
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

makeElementDraggable(document.getElementById('browser'));

function openMyPC() {
    const myPCPopup = document.getElementById('myPCPopup');
    if (myPCPopup) {
        myPCPopup.style.display = 'block';
    }
}

function closeMyPC() {
    const myPCPopup = document.getElementById('myPCPopup');
    if (myPCPopup) {
        myPCPopup.style.display = 'none';
    }
}

makeElementDraggable(document.getElementById('myPCPopup'));

function logoff() {
    window.location.href = "Logoff.html";
}

function toggleControlPanel() {
    const controlPanel = document.getElementById('control-panel');
    if (controlPanel) {
        controlPanel.style.display = (controlPanel.style.display === 'none' || controlPanel.style.display === '') ? 'block' : 'none';
    }
}

makeElementDraggable(document.getElementById('control-panel'));

function closeControlPanel() {
    const controlPanel = document.getElementById('control-panel');
    if (controlPanel) {
        controlPanel.style.display = 'none';
    }
}
