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
    icon.style.marginRight = "10px";
    icon.style.width = "20px";
    icon.style.height = "25px";

    const text = document.createElement("span"); // Create text element
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

// Define playSound function
function playSound(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
}

// Select the battery image element
const batteryImage = document.getElementById('battery-icon'); // Use correct ID
const trayBox = document.createElement('div');

// Style the tray box
trayBox.style.position = 'absolute';
trayBox.style.border = '1px solid #ccc';
trayBox.style.padding = '10px';
trayBox.style.borderRadius = '5px';
trayBox.style.backgroundColor = '#f0f0f0';
trayBox.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
trayBox.style.display = 'none';
trayBox.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
trayBox.style.fontSize = '14px';
trayBox.style.color = '#333';

// Append the tray box to the document body
document.body.appendChild(trayBox);

// Add event listener to the battery image
batteryImage.addEventListener('click', () => {
    const batteryPercentage = `${Math.round(battery.level * 100)}%`; // Fetch actual percentage
    trayBox.textContent = `Battery: ${batteryPercentage}`;

    const rect = batteryImage.getBoundingClientRect();
    trayBox.style.left = `${rect.left}px`;
    trayBox.style.top = `${rect.bottom + 5}px`;

    trayBox.style.display = 'block';

    setTimeout(() => {
        trayBox.style.display = 'none';
    }, 3000);
});
