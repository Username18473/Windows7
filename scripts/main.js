document.addEventListener('DOMContentLoaded', function () {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    function updateTime() {
        if (!timeElement || !dateElement) return;
        const now = new Date();
        timeElement.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        dateElement.textContent = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear().toString().slice(-2)}`;
    }

    setInterval(updateTime, 1000);
    updateTime();

    function closeBrowser() {
        document.getElementById('browser')?.style.display = 'none';
    }

    function toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        if (startMenu) startMenu.style.display = startMenu.style.display === 'none' || !startMenu.style.display ? 'block' : 'none';
    }

    function makeElementDraggable(element) {
        if (!element) return;
        let isDragging = false, offsetX, offsetY;

        element.addEventListener('pointerdown', function (e) {
            if (e.button !== 0) return;
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

            function onMouseMove(e) {
                if (isDragging) {
                    element.style.left = `${e.clientX - offsetX}px`;
                    element.style.top = `${e.clientY - offsetY}px`;
                }
            }

            function onMouseUp() {
                isDragging = false;
                document.removeEventListener('pointermove', onMouseMove);
                document.removeEventListener('pointerup', onMouseUp);
            }

            document.addEventListener('pointermove', onMouseMove);
            document.addEventListener('pointerup', onMouseUp);
        });
    }

    makeElementDraggable(document.getElementById('browser'));

    function showBrowser() {
        const browser = document.getElementById('browser');
        if (browser) {
            browser.style.display = 'block';
            browser.style.left = '50px';
            browser.style.top = '100px';
        }
    }

    const browserIcon = document.getElementById('browserIcon');
    browserIcon?.addEventListener('click', showBrowser);

    const startMenuBrowserLink = document.getElementById('startMenuBrowserLink');
    startMenuBrowserLink?.addEventListener('click', showBrowser);
