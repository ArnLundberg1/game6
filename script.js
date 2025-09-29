const map = document.getElementById("map");
const alarmText = document.getElementById("alarm-text");
const unitsBox = document.getElementById("units");

let activeAlarm = null;

// Skapa larm från config
function loadAlarms() {
  ALARMS_CONFIG.forEach((data) => {
    const alarm = document.createElement("div");
    alarm.classList.add("alarm");
    alarm.style.left = `${data.x}%`;
    alarm.style.top = `${data.y}%`;

    alarm.dataset.text = data.text;
    alarm.dataset.voice = data.voice;
    alarm.dataset.required = JSON.stringify(data.required);
    alarm.dataset.sent = JSON.stringify([]);

    alarm.addEventListener("click", () => {
      selectAlarm(alarm);
    });

    map.appendChild(alarm);
  });
}

function selectAlarm(alarm) {
  activeAlarm = alarm;
  const required = JSON.parse(alarm.dataset.required);
  const sent = JSON.parse(alarm.dataset.sent);

  alarmText.innerText = alarm.dataset.text;
  unitsBox.innerHTML = "<h3>Skicka enheter:</h3>";

  required.forEach((unit) => {
    const btn = document.createElement("button");
    btn.classList.add("unit-btn", unit);
    btn.innerText = unit.toUpperCase();
    if (sent.includes(unit)) btn.disabled = true;

    btn.addEventListener("click", () => {
      sendUnit(alarm, unit);
      btn.disabled = true;
    });

    unitsBox.appendChild(btn);
  });

  speak(alarm.dataset.voice);
}

function sendUnit(alarm, unit) {
  const sent = JSON.parse(alarm.dataset.sent);
  sent.push(unit);
  alarm.dataset.sent = JSON.stringify(sent);

  const required = JSON.parse(alarm.dataset.required);
  if (required.every((u) => sent.includes(u))) {
    alarm.classList.add("resolved");
    alarmText.innerText = "✅ Ärendet är löst!";
    unitsBox.innerHTML = "";
  }
}

function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "sv-SE"; // Svenska
  speechSynthesis.speak(utterance);
}

// Start
loadAlarms();
