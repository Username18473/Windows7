function setWallpaper(path) {
    document.body.style.backgroundImage = `url('${path}')`;
    localStorage.setItem('selectedWallpaper', path);
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('selectedWallpaper');
    if (saved) {
        document.body.style.backgroundImage = `url('${saved}')`;
    } else {
        setWallpaper('Wallpapers/Harmony.jpg');
    }
}); 

function setCustomWallpaper(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.backgroundImage = `url('${e.target.result}')`;
        localStorage.setItem('selectedWallpaper', e.target.result);
    };
    reader.readAsDataURL(file);
}

function triggerUpload() {
    document.getElementById('upload-image').click();
}