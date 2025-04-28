function goBack() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.warn('Webview element not found.');
        return;
    }
    webview.contentWindow.history.back();
}

function goForward() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.warn('Webview element not found.');
        return;
    }
    webview.contentWindow.history.forward();
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    if (!urlBar || !webview) {
        console.warn('URL bar or Webview element not found.');
        return;
    }
    let url = urlBar.value;
    if (!url.startsWith('http')) {
        url = 'https://' + url; // Add https if missing
    }
    webview.src = url;
}

document.getElementById('webview').classList.add('active');

function IframeFullscreen() {
    const iframe = document.getElementById('webview');

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { 
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { 
        iframe.msRequestFullscreen();
    } else {
        alert("Fullscreen API is not supported in this browser.");
    }
}
