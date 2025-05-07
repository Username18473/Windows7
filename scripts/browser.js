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
    
    let url = urlBar.value.trim(); // Trim any white spaces
    
    // Check if the URL is valid
    try {
        const parsedUrl = new URL(url);
        if (!parsedUrl.protocol.startsWith('http')) {
            throw new Error('Invalid protocol');
        }
    } catch (e) {
        // If invalid, perform a Google search
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`&igu=1;
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
