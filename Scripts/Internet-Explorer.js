document.getElementById('back-button')?.addEventListener('click', goBack);
document.getElementById('forward-button')?.addEventListener('click', goForward);
document.getElementById('load-button')?.addEventListener('click', loadPage);

function goBack() {
    const webview = document.getElementById('webview');
    if (webview?.contentWindow) {
        webview.contentWindow.history.back();
    } else {
        console.warn('Webview element or content window not accessible.');
    }
}

function goForward() {
    const webview = document.getElementById('webview');
    if (webview?.contentWindow) {
        webview.contentWindow.history.forward();
    } else {
        console.warn('Webview element or content window not accessible.');
    }
}

function loadPage() {
    const urlBar = document.getElementById('url-bar');
    const webview = document.getElementById('webview');
    const favicon = document.getElementById("favicon");

    if (!urlBar || !webview) {
        console.warn('URL bar or Webview element not found.');
        return;
    }

    let url = urlBar.value.trim();

    try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:', 'ftp:', 'file:'].includes(parsedUrl.protocol)) {
            throw new Error('Invalid protocol');
        } else {
            if (!url.startsWith('http')) {
        url = 'https://' + url; 
        }
    }

    } catch (e) {
        console.error('Error parsing URL:', e);
        url = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
    }

    webview.src =  url;

    try {
        let domain = new URL(url).origin;
        let faviconUrl = `${domain}/favicon.ico`;
        favicon.src = faviconUrl;
        favicon.style.display = "inline";
    } catch (error) {
        console.error("Error setting favicon:", error);
    }
}
