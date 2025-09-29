const map = L.map("map").setView([62.0, 15.0], 5);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

const alarmText = document.getElementById("alarm-text");
const unitsBox = document.getElementById("units");
const gameOverBox = document.getElementById("game-over");

let activeAlarm = null;
let alarms = [];
let vehicles = [];

function loadAlarms() {
  ALARMS_CONFIG.forEach((data) => {
    data.sent = [];
    data.resolved = false;

    const marker = L.marker([data.lat, data.lng]).addTo(map);
    marker.bindPopup("🚨 Larm! Klicka för info");

    marker.on("click", () => {
      selectAlarm(data, marker);
    });

    data.marker = marker;
    alarms.push(data);
  });
}

function selectAlarm(data, marker) {
  activeAlarm = { data, marker };

  alarmText.innerText = data.text;
  unitsBox.innerHTML = "<h3>Skicka enheter:</h3>";

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
  if (data.sent.includes(unit)) return;
  data.sent.push(unit);
  btn.disabled = true;

  // Starta en "utryckning"
  animateVehicle(unit, [data.lat, data.lng], () => {
    checkResolution(data, marker);
  });
}

function animateVehicle(unit, target, callback) {
  let color = unit === "fire" ? "red" : unit === "police" ? "blue" : "green";
  let start = [map.getCenter().lat + (Math.random() * 5), map.getCenter().lng + (Math.random() * 5)];

  let vehicle = L.circleMarker(start, {
    radius: 8,
    color: color,
    fillColor: color,
    fillOpacity: 1
  }).addTo(map);

  vehicles.push(vehicle);

  let steps = 50;
  let step = 0;
  let latStep = (target[0] - start[0]) / steps;
  let lngStep = (target[1] - start[1]) / steps;

  function move() {
    if (step < steps) {
      vehicle.setLatLng([start[0] + latStep * step, start[1] + lngStep * step]);
      step++;
      requestAnimationFrame(move);
    } else {
      vehicle.remove();
      callback();
    }
  }
  move();
}

function checkResolution(data, marker) {
  if (data.required.every((u) => data.sent.includes(u))) {
    data.resolved = true;
    marker.bindPopup("✅ Ärendet löst!").openPopup();
    alarmText.innerText = "✅ Ärendet är löst!";
    unitsBox.innerHTML = "";
    checkGameOver();
  }
}

function checkGameOver() {
  if (alarms.every((a) => a.resolved)) {
    gameOverBox.classList.remove("hidden");
  }
}

function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "sv-SE";
  speechSynthesis.speak(utterance);
}

// Start
loadAlarms();
