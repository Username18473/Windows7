
function openAboutBlank() {
            var newWindow = window.open('about:blank', '_blank');
            var iframe = newWindow.document.createElement('iframe');
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            newWindow.document.body.style.margin = '0';
            newWindow.document.body.style.height = '100vh';
            iframe.src = 'IndexProtoype2.html';
            newWindow.document.body.appendChild(iframe);
        }

function setCustomSettings() {
    const title = document.getElementById("websiteTitle").value;
    const faviconUrl = document.getElementById("faviconUrl").value;

    if (title) {
        document.title = title;
        localStorage.setItem("customTitle", title);
    }
    if (faviconUrl) {
        let link = document.querySelector("link[rel*='icon']") || document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = faviconUrl;
        document.getElementsByTagName("head")[0].appendChild(link);
        localStorage.setItem("customFavicon", faviconUrl); 
    }
}

function resetCustomSettings() {
    localStorage.removeItem("customTitle");
    localStorage.removeItem("customFavicon");
    location.reload();
}
