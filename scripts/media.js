const media = document.getElementById('media');
const videoSource = document.getElementById('videoSource');

// Check if media or videoSource exists
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
        playPauseIcon.src = "mediaplayer/stop-icon.png"; // Ensure file exists
        playPauseIcon.alt = "Stop";
    } else {
        media.pause();
        playPauseIcon.src = "mediaplayer/play-icon.png"; // Ensure file exists
        playPauseIcon.alt = "Play";
    }
}

function backMedia() {
    if (media) {
        media.currentTime = Math.max(0, media.currentTime - 10); // Go back 10 seconds
    }
}

function forwardMedia() {
    if (media) {
        media.currentTime = Math.min(media.duration, media.currentTime + 10); // Go forward 10 seconds
    }
}

function uploadVideo(event) {
    const file = event.target.files[0];
    if (file) {
        // Check for supported file types
        const supportedTypes = ["video/mp4", "video/webm", "video/ogg"];
        if (!supportedTypes.includes(file.type)) {
            console.error("Unsupported video format.");
            alert("Unsupported video format. Please upload MP4, WebM, or OGG files.");
            return;
        }

        const fileURL = URL.createObjectURL(file);
        videoSource.src = fileURL;
        media.load(); // Reload the video element with the new source
    }
}
