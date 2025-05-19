function setWallpaper(wallpaper) {
    document.getElementById('desktop').style.backgroundImage = `url('${wallpaper}')`;
    localStorage.setItem('selectedWallpaper', wallpaper);
}

function loadWallpaper() {
    const savedWallpaper = localStorage.getItem('selectedWallpaper');
    if (savedWallpaper) {
        document.getElementById('desktop').style.backgroundImage = `url('${savedWallpaper}')`;
    }
}

function triggerUpload() {
    document.getElementById('upload-image').click();
}

function setCustomWallpaper(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const wallpaper = e.target.result;
            document.getElementById('desktop').style.backgroundImage = `url('${wallpaper}')`;
            localStorage.setItem('selectedWallpaper', wallpaper);
        };
        reader.readAsDataURL(file);
    }
}

window.addEventListener('DOMContentLoaded', loadWallpaper);
