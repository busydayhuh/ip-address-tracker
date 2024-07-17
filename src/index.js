import {
  validateIp,
  getCountryName,
  getUserAdress,
  getRequestedAdress,
  markerElement,
  map,
  createMap,
} from "./helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", () => getData(ipInput.value));
ipInput.addEventListener("keydown", handleKey);

initApp();

function initApp() {
  getUserAdress().then((userAdress) => {
    createMap(userAdress.location.lng, userAdress.location.lat);
  });

  getUserAdress().then(displayInfo);
}

function getData(ip) {
  if (validateIp(ip)) {
    getRequestedAdress(ip).then(displayInfo);
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData(ipInput.value);
  }
}

function displayInfo(mapData) {
  const { city, country, lng, lat, timezone } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = `${city}, ${getCountryName(country)}`;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  updateMap(lng, lat);
}

function updateMap(lng, lat) {
  map.setLocation({
    center: [lng, lat],
    zoom: 10,
    duration: 1200,
  });

  map.addChild(
    new ymaps3.YMapMarker({ coordinates: [lng, lat] }, markerElement)
  );
}
