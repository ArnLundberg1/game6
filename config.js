// Här kan du skapa nya larm!
// position = procent inom kartan (0–100)
const ALARMS_CONFIG = [
  {
    text: "Det brinner i en lägenhet på Storgatan 12!",
    voice: "Det brinner i en lägenhet på Storgatan tolva.",
    x: 20,
    y: 30,
    required: ["fire", "ambulance"]
  },
  {
    text: "En trafikolycka har inträffat på motorvägen!",
    voice: "En trafikolycka har inträffat på motorvägen.",
    x: 60,
    y: 70,
    required: ["police", "ambulance"]
  },
  {
    text: "En person har svimmat i parken.",
    voice: "En person har svimmat i parken.",
    x: 40,
    y: 50,
    required: ["ambulance"]
  },
  {
    text: "Ett inbrott har rapporterats på Industrigatan.",
    voice: "Ett inbrott har rapporterats på Industrigatan.",
    x: 80,
    y: 20,
    required: ["police"]
  }
];
