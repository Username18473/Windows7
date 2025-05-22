navigator.getBattery().then(battery => {
    const batteryIcon = document.getElementById("battery-icon");
    const batteryLevelText = document.getElementById("battery-level");
    const trayBox = document.getElementById("tray-box");

    function updateBattery() {
        const level = Math.round(battery.level * 100);
        batteryIcon.src = battery.charging ? "path/to/charging-image.png" : "path/to/battery-image.png";
        batteryLevelText.textContent = `${level}%`;
    }

    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);

    batteryIcon.addEventListener("click", () => {
        trayBox.textContent = `Battery: ${Math.round(battery.level * 100)}%`;

        const rect = batteryIcon.getBoundingClientRect();
        trayBox.style.left = `${rect.left}px`;
        trayBox.style.top = `${rect.bottom + 5}px`;
        trayBox.style.display = "block";

        setTimeout(() => {
            trayBox.style.display = "none";
        }, 3000);
    });

    updateBattery();
});
