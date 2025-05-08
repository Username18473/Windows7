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

    let url = urlBar.value.trim();

    try {
        const parsedUrl = new URL(url);
        if (!parsedUrl.protocol.startsWith('http')) {
            throw new Error('Invalid protocol');
        }
    } catch (e) {
        // Perform a Google search if invalid
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }

    webview.src = url;
}
