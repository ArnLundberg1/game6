// Exempel-larm i Sverige
const ALARMS_CONFIG = [
  {
    text: "Det brinner i en lägenhet i Stockholm!",
    voice: "Det brinner i en lägenhet i Stockholm.",
    lat: 59.3293,
    lng: 18.0686,
    required: ["fire", "ambulance"]
  },
  {
    text: "En trafikolycka har inträffat i Göteborg!",
    voice: "En trafikolycka har inträffat i Göteborg.",
    lat: 57.7089,
    lng: 11.9746,
    required: ["police", "ambulance"]
  },
  {
    text: "En person har svimmat i Malmö centrum.",
    voice: "En person har svimmat i Malmö centrum.",
    lat: 55.6050,
    lng: 13.0038,
    required: ["ambulance"]
  },
  {
    text: "Ett inbrott har rapporterats i Uppsala.",
    voice: "Ett inbrott har rapporterats i Uppsala.",
    lat: 59.8586,
    lng: 17.6389,
    required: ["police"]
  }
];
