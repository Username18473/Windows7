navigator.getBattery().then(battery => {
    const batteryUI = document.createElement("div");
    batteryUI.id = "battery-status";
    batteryUI.style.display = "flex";
    batteryUI.style.alignItems = "center";
    batteryUI.style.marginRight = "10px";
    batteryUI.style.color = "white";
    batteryUI.style.fontFamily = "Segoe UI, sans-serif";
    batteryUI.style.fontSize = "24px";

    const icon = document.createElement("span");
    icon.id = "battery-icon";
    icon.style.marginRight = "4px";

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
    icon.textContent = battery.charging ? "⚡" : "🔋";
    text.textContent = ` ${level}%`;

 navigator.getBattery().then(battery => {
    const batteryUI = document.createElement("div");
    batteryUI.id = "battery-status";
    batteryUI.style.display = "flex";
    batteryUI.style.alignItems = "center";
    batteryUI.style.marginRight = "10px";
    batteryUI.style.color = "white";
    batteryUI.style.fontFamily = "Segoe UI, sans-serif";
    batteryUI.style.fontSize = "24px";

    const icon = document.createElement("img"); // Changed from <span> to <img>
    icon.id = "battery-icon";
    icon.style.marginRight = "4px";
    icon.style.width = "24px"; // Set width for the image
    icon.style.height = "24px"; // Set height for the image

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
        icon.src = battery.charging ? "path/to/charging-image.png" : "path/to/battery-image.png"; // Set the image source
        text.textContent = ` ${level}%`;
    }

    updateBattery();
    battery.addEventListener("levelchange", updateBattery);
    battery.addEventListener("chargingchange", updateBattery);
});

    battery.addEventListener('levelchange', checkBatteryLevel);
    checkBatteryLevel(); // Initial check
});
