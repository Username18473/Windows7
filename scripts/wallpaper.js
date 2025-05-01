// Sets the desktop wallpaper and saves the preference in local storage
function setWallpaper(wallpaper) {
    document.documentElement.style.setProperty('--background-image', `url('${wallpaper}')`);
    localStorage.setItem('selectedWallpaper', wallpaper);
}

// Loads the wallpaper from local storage when the page is loaded
function loadWallpaper() {
    const savedWallpaper = localStorage.getItem('selectedWallpaper');
    if (savedWallpaper) {
        document.documentElement.style.setProperty('--background-image', `url('${savedWallpaper}')`);
    } else {
        document.documentElement.style.setProperty('--background-image', `url('path/to/Harmony.png')`);
    }
}

// Triggers the file upload process for setting a custom wallpaper
function triggerUpload() {
    document.getElementById('upload-image').click(); 
}

// Sets a custom wallpaper from an uploaded file
function setCustomWallpaper(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.documentElement.style.setProperty('--background-image', `url('${e.target.result}')`);
            localStorage.setItem('selectedWallpaper', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Load wallpaper on DOMContentLoaded
window.addEventListener('DOMContentLoaded', loadWallpaper);
