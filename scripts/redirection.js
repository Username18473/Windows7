document.getElementById("power-option").addEventListener("change", function() {
    let action = this.value;
    
    if (action === "logoff" || action === "switch-user") {
        logoff();
    } else if (action === "shutdown") {
        window.close();
    }
});

function logoff() {
    window.location.href = "Logoff.html"; // Redirects to Logoff page
}
