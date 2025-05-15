
    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.getElementById('webcam');
            videoElement.srcObject = stream;
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
            const stream = videoElement.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop()); // Stop all tracks
                 videoElement.srcObject = null;
            }
        }
    }
}

    document.getElementById('screenshot-button').addEventListener('click', takeScreenshot);
    document.getElementById('remove-screenshot-button').addEventListener('click', removeScreenshot);
document.querySelector('#webcamIcon').addEventListener('click', openWebcamApp);
