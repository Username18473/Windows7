function loadPage() {
  const urlBar = document.getElementById('url-bar');
  const webview = document.getElementById('webview');
  let url = urlBar.value;
  
  // Validate URL
  try {
    new URL(url);
  } catch (_) {
    alert('Invalid URL');
    return;
  }

  if (!url.startsWith('http')) {
    url = 'https://' + url; // Add https if missing
  }
  
  webview.src = url;
  
  // Handle iframe loading errors
  webview.onerror = function() {
    alert('Failed to load the page. Please check the URL or your internet connection.');
  };
}

function goBack() {
  const webview = document.getElementById('webview');
  if (webview.contentWindow.history.length > 0) {
    webview.contentWindow.history.back();
  } else {
    alert('No previous page in history.');
  }
}

function goForward() {
  const webview = document.getElementById('webview');
  if (webview.contentWindow.history.length > 0) {
    webview.contentWindow.history.forward();
  } else {
    alert('No next page in history.');
  }
}

// Ensure iframe is properly embedded and loaded
document.addEventListener('DOMContentLoaded', function() {
  const webview = document.getElementById('webview');
  webview.src = 'https://bing.com/';
});

// Cross-Origin Restrictions
// Be mindful of loading content from different origins and ensure you have the appropriate permissions.
