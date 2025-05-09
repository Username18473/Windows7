navigator.getBattery().then(battery => {
    const batteryUI = document.createElement("div");
    batteryUI.id = "battery-status";
    batteryUI.style.display = "flex";
    batteryUI.style.alignItems = "center";
    batteryUI.style.marginRight = "10px";
    batteryUI.style.color = "white";
    batteryUI.style.fontFamily = "Segoe UI, sans-serif";
    batteryUI.style.fontSize = "24px";

    const icon = document.createElement("img");
    icon.id = "battery-icon";
    icon.style.marginRight = "4px";
    icon.style.width = "30px";
    icon.style.height = "30px";

    const text = document.createElement("span");
    text.id = "battery-text";

    batteryUI.appendChild(icon);
    batteryUI.appendChild(text);

    const taskbar = document.querySelector(".taskbar");
    const timeContainer = document.querySelector(".time-container");
    taskbar.insertBefore(batteryUI, timeContainer);

    function updateBattery() {
        const level = Math.round(battery.level * 100);
        icon.src = battery.charging ? "path/to/charging-image.png" : "path/to/battery-image.png";
        text.textContent = `${level}%`;
    }

    function checkBatteryLevel() {
        const level = Math.floor(battery.level * 100);
        if (level === 10) {
            playSound('sounds/Low.mp3');
            const warningImage = document.getElementById('warningImage');
            if (warningImage) warningImage.style.display = 'block';
        } else if (level === 5) {
            playSound('sounds/Critical.mp3');
            const warning2Image = document.getElementById('warning2Image');
            if (warning2Image) warning2Image.style.display = 'block';
        }
    }

    // Initial update and event listeners
    updateBattery();
    checkBatteryLevel();
    battery.addEventListener("levelchange", () => {
        updateBattery();
        checkBatteryLevel();
    });
    battery.addEventListener("chargingchange", updateBattery);
}).catch(error => {
    console.error("Battery API not supported or failed to fetch battery info:", error);
});
