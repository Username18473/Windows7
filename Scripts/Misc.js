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

function makeHeaderDraggable(header, popup) {
    if (!header || !popup) return;

    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        const minLeft = 0;
        const minTop = 0;
        const maxLeft = window.innerWidth - popup.offsetWidth;
        const maxTop = window.innerHeight - popup.offsetHeight;
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

makeHeaderDraggable(document.getElementById('browser'));
document.querySelectorAll('.window.active').forEach(window => {
    const header = window.querySelector('.title-bar');
    if (header) makeHeaderDraggable(header, window);
});



function showBrowser() {
    const browser = document.getElementById('browser');
    if (browser) {
        browser.style.display = 'block';
        browser.style.left = '50px';
        browser.style.top = '100px';
    } else {
        alert('Browser element not found. Ensure the element with ID "browser" exists.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
            const startMenu = document.querySelector('#start-menu');
            const startButton = document.querySelector('.start-menu');

            startButton.addEventListener('click', (e) => {
                e.stopPropagation();
                startMenu.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
                    startMenu.classList.remove('active');
                }
            });
        });
