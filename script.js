const map = L.map("map").setView([62.0, 15.0], 5); // Sverige mittpunkt

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

const alarmText = document.getElementById("alarm-text");
const unitsBox = document.getElementById("units");

let activeAlarm = null;

// Skapa larm från config
function loadAlarms() {
  ALARMS_CONFIG.forEach((data) => {
    const marker = L.marker([data.lat, data.lng]).addTo(map);
    marker.bindPopup("🚨 Larm! Klicka för info");

    marker.on("click", () => {
      selectAlarm(data, marker);
    });
  });
}

function selectAlarm(data, marker) {
  activeAlarm = { data, marker };

  alarmText.innerText = data.text;
  unitsBox.innerHTML = "<h3>Skicka enheter:</h3>";

  data.sent = data.sent || [];

  data.required.forEach((unit) => {
    const btn = document.createElement("button");
    btn.classList.add("unit-btn", unit);
    btn.innerText = unit.toUpperCase();
    if (data.sent.includes(unit)) btn.disabled = true;

    btn.addEventListener("click", () => {
      sendUnit(data, marker, unit, btn);
    });

    unitsBox.appendChild(btn);
  });

  speak(data.voice);
}

function sendUnit(data, marker, unit, btn) {
  data.sent.push(unit);
  btn.disabled = true;

  if (data.required.every((u) => data.sent.includes(u))) {
    marker.bindPopup("✅ Ärendet löst!").openPopup();
    alarmText.innerText = "✅ Ärendet är löst!";
    unitsBox.innerHTML = "";
  }
}

function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "sv-SE";
  speechSynthesis.speak(utterance);
}

// Start
loadAlarms();
