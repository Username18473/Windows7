function updateNetworkIcon() {
    const icon = document.getElementById('network-icon');
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
        const speed = connection.downlink;

        if (speed > 10) {
            icon.src = 'path/to/signal-full.png';
        } else if (speed > 5) {
            icon.src = 'path/to/signal-excellent.png';
        } else if (speed > 2) {
            icon.src = 'path/to/signal-average.png';
        } else if (speed > 1) {
            icon.src = 'path/to/signal-medium.png';
        } else if (speed > 0.5) {
            icon.src = 'path/to/signal-low.png';
        } else {
            icon.src = 'path/to/signal-none.png';
        }
    } else {
        console.log('Network Information API is not supported in your browser.');
    }
}

setInterval(updateNetworkIcon, 1000);
updateNetworkIcon();

