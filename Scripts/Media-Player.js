const media = document.getElementById('media');
const videoSource = document.getElementById('videoSource');

if (!media || !videoSource) {
    console.error("Media or videoSource DOM elements are missing.");
}

function togglePlayPause() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (!playPauseIcon) {
        console.error("PlayPauseIcon element is missing.");
        return;
    }

    if (media.paused) {
        media.play();
        playPauseIcon.src = "Popup-Buttons/Stop.png";
        playPauseIcon.alt = "Stop";
    } else {
        media.pause();
        playPauseIcon.src = "Popup-Buttons/Play.png";
        playPauseIcon.alt = "Play";
    }
}

function backMedia() {
    if (media) {
        media.currentTime = Math.max(0, media.currentTime - 10);
    }
}

function forwardMedia() {
    if (media) {
        media.currentTime = Math.min(media.duration, media.currentTime + 10);
    }
}

function uploadVideo(event) {
    const file = event.target.files[0];
    if (file) {
        const supportedTypes = ["video/mp4", "video/webm", "video/ogg", "audio/mpeg", "audio/mpeg", "audio/ogg"];
        if (!supportedTypes.includes(file.type)) {
            console.error("Unsupported video format.");
            alert("Unsupported video format. Please upload MP4, WebM, or OGG files.");
            return;
        }
        const fileURL = URL.createObjectURL(file);
        videoSource.src = fileURL;
        media.load();
    }
}
