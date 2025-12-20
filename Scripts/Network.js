function updateNetworkIcon() {
    const icon = document.getElementById('network-icon');
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
        const speed = connection.downlink;

        if (speed > 10) {
            icon.src = 'Signal/full.png';
        } else if (speed > 5) {
            icon.src = 'Signal/excellent.png';
        } else if (speed > 2) {
            icon.src = 'Signal/average.png';
        } else if (speed > 1) {
            icon.src = 'Signal/medium.png';
        } else if (speed > 0.5) {
            icon.src = 'Signal/low.png';
        } else {
            icon.src = 'Signal/none.png';
        }
    } else {
        console.log('Network Information API is not supported in your browser.');
    }
}

setInterval(updateNetworkIcon, 1000);
updateNetworkIcon();

