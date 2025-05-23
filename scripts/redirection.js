document.getElementById("power-option").addEventListener("change", function() {
    let action = this.value;
    if (action === "logoff" || action === "switch-user") {
        window.location.href = "Logoff.html";
    } else if (action === "shutdown") {
        window.location.href = "about:blank";
    }
});
