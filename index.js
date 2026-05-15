const Mustache = require("mustache");
const fs = require("fs");
const fetch = require("node-fetch");

const MUSTACHE_MAIN_DIR = "./main.mustache";

// Edit these to match your location and timezone.
const CONFIG = {
  name: "Brent",
  cityLabel: "Lagos, NG",
  latitude: 6.5244,
  longitude: 3.3792,
  timezone: "Africa/Lagos",
};

const DATA = {
  name: CONFIG.name,
  city: CONFIG.cityLabel,
  temp: "—",
  refresh_date: new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: CONFIG.timezone,
  }),
};

async function setWeatherInformation() {
  const { latitude, longitude } = CONFIG;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Open-Meteo request failed: ${response.status}`);
  }

  const weather = await response.json();
  DATA.temp = String(Math.round(weather.current.temperature_2m));
}

function generateReadMe() {
  const template = fs.readFileSync(MUSTACHE_MAIN_DIR, "utf8");
  fs.writeFileSync("README.md", Mustache.render(template, DATA));
}

async function build() {
  await setWeatherInformation();
  generateReadMe();
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
