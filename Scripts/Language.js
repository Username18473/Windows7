const form = document.getElementById('language-form');
const languageSelect = document.getElementById('language');
const saveButton = document.getElementById('save-language-timezone');

saveButton.addEventListener('click', () => {
    const selectedLanguage = languageSelect.value;
    
    localStorage.setItem('preferredLanguage', selectedLanguage);

    console.log('Preferences saved successfully!');
});

window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (savedLanguage) languageSelect.value = savedLanguage;

    console.log('Preferences loaded:', { savedLanguage });
});

window.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (savedLanguage) document.getElementById('language').value = savedLanguage;

    applyLanguage(savedLanguage);
});


document.getElementById('save-language-timezone').addEventListener('click', () => {
    const selectedLanguage = document.getElementById('language').value;

    localStorage.setItem('preferredLanguage', selectedLanguage);

    applyLanguage(selectedLanguage);
});

function applyLanguage(lang) {
    const translations = {
        en: {
            recycleBin: "Recycle Bin",
            controlPanel: "Control Panel",
            webcam: "Webcam",
            paint: "Paint",
            Media: "Media Player",
            Notes: "Notepad",
            Internet: "Internet Explorer",
            Maze: "Maze",
        },
        fr: {
            recycleBin: "Corbeille",
            controlPanel: "Panneau de configuration",
            webcam: "Webcam",
            paint: "Peinture",
            Media: "Lecteur multimédia",
            Notes: "Bloc-notes",
            Internet: "Internet Explorer",
            Maze: "Labyrinthe",
        },
        es: {
            recycleBin: "Papelera",
            controlPanel: "Panel de control",
            webcam: "Cámara web",
            paint: "pintar",
            Media: "Reproductor multimedia",
            Notes: "Bloc de notas",
            Internet: "Internet Explorer",
            Maze: "Laberinto",
        },
        zh: {
            recycleBin: "回收站",
            controlPanel: "控制面板",
            webcam: "网络摄像头",
            paint: "漆",
            Media: "媒体播放器",
            Notes: "记事本",
            Internet: "IE浏览器",
            Maze: "迷宫",
        }
    };

    const t = translations[lang] || translations.en;

    document.getElementById('recycle-bin-label').textContent = t.recycleBin;
    document.getElementById('control-panel-label').textContent = t.controlPanel;
    document.getElementById('webcam-label').textContent = t.webcam;
    document.getElementById('paint-label').textContent = t.paint;
    document.getElementById('media-player-label').textContent = t.Media;
    document.getElementById('notepad-label').textContent = t.Notes;
    document.getElementById('ie-label').textContent = t.Internet;
    document.getElementById('Maze-label').textContent = t.Maze;
}
   
    document.getElementById('save-language-timezone').addEventListener('click', () => {
});
