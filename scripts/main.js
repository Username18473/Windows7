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

function closeBrowser() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'none';
    }
}

function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        startMenu.style.display = (startMenu.style.display === 'none' || startMenu.style.display === '') ? 'block' : 'none';
    }
}

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

function showBrowser() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
        browser.style.left = '50px'; // Default left position
        browser.style.top = '100px'; // Default top position
    } else {
        alert('Browser element not found. Ensure the element with ID "browser" exists.');
    }
}

// Attach event listeners after the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
    const browserIcon = document.getElementById('browserIcon');
    if (browserIcon) {
        browserIcon.addEventListener('click', showBrowser);
    } else {
        alert('Browser icon element not found.');
    }

    const startMenuBrowserLink = document.getElementById('startMenuBrowserLink');
    if (startMenuBrowserLink) {
        startMenuBrowserLink.addEventListener('click', showBrowser);
    } else {
        alert('Start menu browser link element not found.');
    }
});

const popup = document.querySelector('.popup');

function adjustPopupSize() {
    const contentHeight = popup.querySelector('.content').scrollHeight;
    popup.style.height = contentHeight > 400 ? '400px' : `${contentHeight}px`;
    popup.style.overflowY = contentHeight > 400 ? 'auto' : 'hidden';
}

adjustPopupSize();

const popup = document.querySelector('.popup');
const header = popup.querySelector('header');

header.addEventListener('mousedown', (e) => {
    let offsetX = e.clientX - popup.offsetLeft;
    let offsetY = e.clientY - popup.offsetTop;

    function mouseMoveHandler(e) {
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
    }

    function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});
