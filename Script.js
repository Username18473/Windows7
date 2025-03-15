function loadPage() {
  const urlBar = document.getElementById('url-bar');
  const webview = document.getElementById('webview');
  let url = urlBar.value;
  if (!url.startsWith('http')) {
    url = 'https://' + url; // Add https if missing
  }
  webview.src = url;
}

function goBack() {
  document.getElementById('webview').contentWindow.history.back();
}

function goForward() {
  document.getElementById('webview').contentWindow.history.forward();
}
