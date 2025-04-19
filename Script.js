// Update Time and Date
function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    if (!timeElement || !dateElement) {
        console.error('Time or Date element not found!');
        return;
    }

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

// Browser Navigation Fixes
function goBack() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.error('Webview element not found!');
        return;
    }
    try {
        webview.contentWindow.history.back();
    } catch (error) {
        console.error('Failed to navigate back:', error);
    }
}

function goForward() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.error('Webview element not found!');
        return;
    }
    try {
        webview.contentWindow.history.forward();
    } catch (error) {
        console.error('Failed to navigate forward:', error);
    }
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    if (!urlBar || !webview) {
        console.error('URL bar or Webview element not found!');
        return;
    }
    let url = urlBar.value.trim();
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    webview.src = url;
}

// Toggle Start Menu
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (!startMenu) {
        console.error('Start Menu element not found!');
        return;
    }
    startMenu.style.display = (startMenu.style.display === 'none' || !startMenu.style.display) ? 'block' : 'none';
}

// Fullscreen Toggle
document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((error) => console.error('Failed to enable fullscreen:', error));
    } else {
        document.exitFullscreen().catch((error) => console.error('Failed to exit fullscreen:', error));
    }
});

// Login Form Handling
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    
    console.log('Username:', username || 'No username entered');
    console.log('Password:', password || 'No password entered');

    const desktop = document.getElementById('desktop');
    const loginContainer = document.getElementById('loginContainer');
    if (desktop && loginContainer) {
        desktop.style.display = 'block';
        loginContainer.style.display = 'none';
    } else {
        console.error('Desktop or Login Container element not found!');
    }
});

// Drag-and-Drop Functionality
function makeElementDraggable(element) {
    if (!element) {
        console.error('Draggable element not found!');
        return;
    }
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return; // Left mouse button only
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

// Apply draggable functionality to elements
makeElementDraggable(document.getElementById('browser'));
makeElementDraggable(document.getElementById('myPCPopup'));
makeElementDraggable(document.getElementById('control-panel'));

// Translations Handling
const translations = {
    en: { languageLabel: "Language:", timezoneLabel: "Timezone:", saveButton: "Save" },
    es: { languageLabel: "Idioma:", timezoneLabel: "Zona horaria:", saveButton: "Guardar" },
    fr: { languageLabel: "Langue:", timezoneLabel: "Fuseau horaire:", saveButton: "Sauvegarder" },
    de: { languageLabel: "Sprache:", timezoneLabel: "Zeitzone:", saveButton: "Speichern" },
    zh: { languageLabel: "语言:", timezoneLabel: "时区:", saveButton: "保存" },
};

// Update Labels Dynamically
function updateLanguage(selectedLanguage) {
    if (!translations[selectedLanguage]) {
        console.error(`No translations available for language: ${selectedLanguage}`);
        return;
    }
    document.querySelector('label[for="language"]')?.textContent = translations[selectedLanguage].languageLabel;
    document.querySelector('label[for="timezone"]')?.textContent = translations[selectedLanguage].timezoneLabel;
    document.getElementById('save-language-timezone')?.textContent = translations[selectedLanguage].saveButton;
}

document.getElementById('language')?.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    updateLanguage(selectedLanguage);
});

function openMediaPlayerApp() 
      { window.location.href = 'Mediaplayer.html'; } 

function openPaintApp() 
      { window.location.href = "Paint.html"; }
