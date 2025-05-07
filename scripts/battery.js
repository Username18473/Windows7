navigator.getBattery().then(battery => {
    const batteryUI = document.createElement("div");
    batteryUI.id = "battery-status";
    batteryUI.style.display = "flex";
    batteryUI.style.alignItems = "center";
    batteryUI.style.marginRight = "10px";
    batteryUI.style.color = "white";
    batteryUI.style.fontFamily = "Segoe UI, sans-serif";
    batteryUI.style.fontSize = "24px";

    const icon = document.createElement("img"); // Use <img> instead of <span>
    icon.id = "battery-icon";
    icon.style.marginRight = "4px";
    icon.style.width = "24px"; // Set width
    icon.style.height = "24px"; // Set height

    const text = document.createElement("span");
    text.id = "battery-text";

    batteryUI.appendChild(icon);
    batteryUI.appendChild(text);

    // Insert battery status before time container
    const taskbar = document.querySelector(".taskbar");
    const timeContainer = document.querySelector(".time-container");
    taskbar.insertBefore(batteryUI, timeContainer);

    function updateBattery() {
        const level = Math.round(battery.level * 100);
        // Set the image source based on charging status
        icon.src = battery.charging ? "path/to/charging-image.png" : "path/to/battery-image.png";
        text.textContent = ` ${level}%`;
    }

    updateBattery();
    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);
});

    function checkBatteryLevel() {
        if (Math.floor(battery.level * 100) === 10) {
            playSound('sounds/Low.mp3');
            const warningImage = document.getElementById('warningImage');
            warningImage.style.display = 'block';
        } else if (Math.floor(battery.level * 100) === 5) {
            playSound('sounds/Critical.mp3');
            const warningImage = document.getElementById('warning2Image');
            warningImage.style.display = 'block';
        }
    }

    // Initial update and event listeners
    updateBattery();
    checkBatteryLevel();
    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);
    battery.addEventListener("levelchange", checkBatteryLevel);
});
