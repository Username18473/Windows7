function goBack() {
    const webview = document.getElementById('webview');
    if (!webview) {
        console.warn('Webview element not found.');
        return;
    }
    if (!webview.contentWindow) {
        console.error('Content window not accessible.');
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
    if (!webview.contentWindow) {
        console.error('Content window not accessible.');
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
        if (!['http:', 'https:', 'ftp:', 'file:'].includes(parsedUrl.protocol)) {
            throw new Error('Invalid protocol');
        }
    } catch (e) {
        console.error('Error parsing URL:', e);
        url = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
    }

    webview.src = url;
}

// Example Event Listeners
document.getElementById('back-button')?.addEventListener('click', goBack);
document.getElementById('forward-button')?.addEventListener('click', goForward);
document.getElementById('load-button')?.addEventListener('click', loadPage);
