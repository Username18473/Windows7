navigator.getBattery().then(function(battery) {
  const batteryPercentage = document.getElementById('battery-percentage');

  function updateBattery() {
    const percentage = Math.round(battery.level * 100);
    batteryPercentage.textContent = `${percentage}%`;
  }
  updateBattery();
  battery.addEventListener('levelchange', updateBattery);
});
function openBattery() {
    const batteryDiv = document.getElementById('battery');
    if (batteryDiv.style.display === 'block') {
        batteryDiv.style.display = 'none';
    } else {
        batteryDiv.style.display = 'block';
    }
}
