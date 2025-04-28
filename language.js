// Select the form elements
const form = document.getElementById('language-timezone-form');
const languageSelect = document.getElementById('language');
const timezoneSelect = document.getElementById('timezone');
const saveButton = document.getElementById('save-language-timezone');

saveButton.addEventListener('click', () => {
    const selectedLanguage = languageSelect.value;
    const selectedTimezone = timezoneSelect.value;

    
    localStorage.setItem('preferredLanguage', selectedLanguage);
    localStorage.setItem('preferredTimezone', selectedTimezone);

    console.log('Preferences saved successfully!');
});

window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedTimezone = localStorage.getItem('preferredTimezone');

    if (savedLanguage) languageSelect.value = savedLanguage;
    if (savedTimezone) timezoneSelect.value = savedTimezone;

    console.log('Preferences loaded:', { savedLanguage, savedTimezone });
});

window.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedTimezone = localStorage.getItem('preferredTimezone');

    if (savedLanguage) document.getElementById('language').value = savedLanguage;
    if (savedTimezone) document.getElementById('timezone').value = savedTimezone;

    applyLanguage(savedLanguage);
});


document.getElementById('save-language-timezone').addEventListener('click', () => {
    const selectedLanguage = document.getElementById('language').value;
    const selectedTimezone = document.getElementById('timezone').value;

    localStorage.setItem('preferredLanguage', selectedLanguage);
    localStorage.setItem('preferredTimezone', selectedTimezone);

    applyLanguage(selectedLanguage);
});

function applyLanguage(lang) {
    const translations = {
        en: {
            myComputer: "Computer",
            recycleBin: "Recycle Bin",
            controlPanel: "Control Panel",
            webcam: "Webcam",
            paint: "Paint",
            Media: "Media Player",
            Notes: "Notepad",
            Internet: "Internet Explorer",
        },
        fr: {
            myComputer: "Ordinateur",
            recycleBin: "Corbeille",
            controlPanel: "Panneau de configuration",
            webcam: "Webcam",
            paint: "Peinture",
            Media: "Lecteur multimédia",
            Notes: "Bloc-notes",
            Internet: "Internet Explorer",
        },
        es: {
            myComputer: "PC",
            recycleBin: "Papelera",
            controlPanel: "Panel de control",
            webcam: "Cámara web",
            paint: "pintar",
            Media: "Reproductor multimedia",
            Notes: "Bloc",
            Internet: "Internet Explorer",
        },
        zh: {
            myComputer: "的电脑",
            recycleBin: "回收站",
            controlPanel: "控制面板",
            webcam: "网络摄像头",
            paint: "漆",
            Media: "媒体播放器",
            Notes: "集团",
            Internet: "IE浏览器",
        }
    };

    const t = translations[lang] || translations.en;

    document.getElementById('my-computer-label').textContent = t.myComputer;
    document.getElementById('recycle-bin-label').textContent = t.recycleBin;
    document.getElementById('control-panel-label').textContent = t.controlPanel;
    document.getElementById('webcam-label').textContent = t.webcam;
    document.getElementById('paint-label').textContent = t.paint;
    document.getElementById('media-player-label').textContent = t.Media;
    document.getElementById('notepad-label').textContent = t.Notes;
    document.getElementById('ie-label').textContent = t.Internet;
}
   
    document.getElementById('save-language-timezone').addEventListener('click', () => {
    const selectedTimezone = document.getElementById('timezone').value;
    localStorage.setItem('preferredTimezone', selectedTimezone);
    console.log('Timezone saved:', selectedTimezone);
});