
    // Global state for webcam recording
    let currentStream = null;
    let mediaRecorder = null;
    let recordedChunks = [];
    let recordingUrl = null;

    async function startWebcam() {
        try {
            // If we already have a stream, reuse it
            if (!currentStream) {
                currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            }
            const videoElement = document.getElementById('webcam');
            if (videoElement) {
                videoElement.srcObject = currentStream;
                // Autoplay may be blocked; ensure it's attempted
                videoElement.play().catch(() => {});
            }
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }

    function takeScreenshot() {
        const videoElement = document.getElementById('webcam');
        const canvas = document.getElementById('screenshot');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        canvas.style.display = 'block';
        document.getElementById('remove-screenshot-button').style.display = 'inline-block';
    }

    function removeScreenshot() {
        const canvas = document.getElementById('screenshot');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        document.getElementById('remove-screenshot-button').style.display = 'none';
    }

    function openWebcamApp() {
        openPopup('webcamPopup');
        startWebcam();
           }

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none'; // Hide the popup
        if (popupId === 'webcamPopup') {
            const videoElement = document.getElementById('webcam');
            // If a recording is in progress, stop it first to ensure final data is captured
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                // stopRecording will also stop the tracks and clear srcObject
                stopRecording();
                return; // stopRecording will handle cleanup
            }

            // Otherwise just stop the active stream (if any)
            if (videoElement) {
                const stream = videoElement.srcObject || currentStream;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop()); // Stop all tracks
                }
                if (videoElement) videoElement.srcObject = null;
                currentStream = null;
            }
        }
    }
}

    // Start recording the active webcam stream. Creates a MediaRecorder and begins collecting data.
    async function startRecording() {
        // Ensure webcam is started
        if (!currentStream) {
            await startWebcam();
        }

        if (!currentStream) {
            console.error('No media stream available to record.');
            return;
        }

        // Clean up any previous recording URL
        if (recordingUrl) {
            URL.revokeObjectURL(recordingUrl);
            recordingUrl = null;
        }

        recordedChunks = [];

        let options = { mimeType: 'video/webm;codecs=vp9,opus' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/webm;codecs=vp8,opus' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = { mimeType: 'video/webm' };
            }
        }

        try {
            mediaRecorder = new MediaRecorder(currentStream, options);
        } catch (e) {
            console.error('Failed to create MediaRecorder:', e);
            try {
                mediaRecorder = new MediaRecorder(currentStream);
            } catch (err) {
                console.error('MediaRecorder not supported:', err);
                return;
            }
        }
        mediaRecorder.ondataavailable = function (event) {
            if (event.data && event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = function () {
            console.log('MediaRecorder stopped — no automatic cleanup performed.');
        };

        mediaRecorder.start();
        console.log('Recording started');
    }

    function stopRecording() {
        if (mediaRecorder) {
            try {
                if (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused') {
                    mediaRecorder.stop();
                    console.log('Recording stopped');
                }
            } catch (err) {
                console.error('Error stopping MediaRecorder:', err);
            }
        } else {
            console.log('No active MediaRecorder to stop.');
        }
    }

    document.getElementById('screenshot-button').addEventListener('click', takeScreenshot);
    document.getElementById('remove-screenshot-button').addEventListener('click', removeScreenshot);