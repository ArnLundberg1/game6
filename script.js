const map = document.getElementById("map");
const infoBox = document.getElementById("alarm-info");

// Exempel-larm som kan slumpas ut
const alarms = [
  { text: "Det brinner i en lägenhet på Storgatan 12!", voice: "Det brinner i en lägenhet på Storgatan tolva." },
  { text: "En trafikolycka har inträffat på motorvägen!", voice: "En trafikolycka har inträffat på motorvägen." },
  { text: "En person har svimmat i parken.", voice: "En person har svimmat i parken." },
  { text: "En katt sitter fast uppe i ett träd.", voice: "En katt sitter fast uppe i ett träd." },
  { text: "Ett inbrott har rapporterats på Industrigatan.", voice: "Ett inbrott har rapporterats på Industrigatan." }
];

// Skapa slumpade larm på kartan
function spawnAlarm() {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm");

  const x = Math.random() * (map.clientWidth - 20);
  const y = Math.random() * (map.clientHeight - 20);

  alarm.style.left = `${x}px`;
  alarm.style.top = `${y}px`;

  const data = alarms[Math.floor(Math.random() * alarms.length)];
  alarm.dataset.text = data.text;
  alarm.dataset.voice = data.voice;

  alarm.addEventListener("click", () => {
    showAlarm(data.text, data.voice);
    alarm.remove(); // Ta bort larmet efter klick
  });

  map.appendChild(alarm);

  // Nya larm med intervall
  setTimeout(spawnAlarm, 4000 + Math.random() * 3000);
}

function showAlarm(text, voiceText) {
  infoBox.innerText = text;
  speak(voiceText);
}

// Text-till-tal (webbläsarens inbyggda TTS)
function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "sv-SE"; // svenska
  speechSynthesis.speak(utterance);
}

// Starta första larmet
spawnAlarm();
