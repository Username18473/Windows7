    const media = document.getElementById('media');
    const videoSource = document.getElementById('videoSource');

    function togglePlayPause() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    
    if (media.paused) {
        media.play();
        playPauseIcon.src = "stop-icon.png"; // Change to pause icon
        playPauseIcon.alt = "stop";
    } else {
        media.pause();
        playPauseIcon.src = "play-icon.png"; // Change to play icon
        playPauseIcon.alt = "Play";
    }
}

    function backMedia() {
        media.currentTime = Math.max(0, media.currentTime - 10); // Go back 10 seconds, but not less than 0
    }

    function forwardMedia() {
        media.currentTime = Math.min(media.duration, media.currentTime + 10); // Go forward 10 seconds, but not more than the duration
    }

    function uploadVideo(event) {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            videoSource.src = fileURL;
            media.load(); // Reload the video element with the new source
        }
