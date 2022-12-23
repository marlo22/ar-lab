const ELEMENTS_IDS = {
  gpsPositionX: 'gpsPositionX',
  gpsPositionY: 'gpsPositionY',
}

navigator.geolocation.watchPosition((position) => {
  document.getElementById(ELEMENTS_IDS.gpsPositionX).textContent = position.coords.latitude;
  document.getElementById(ELEMENTS_IDS.gpsPositionY).textContent = position.coords.longitude;
});
