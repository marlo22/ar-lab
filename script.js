const ELEMENTS_IDS = {
  gpsPositionX: 'gpsPositionX',
  gpsPositionY: 'gpsPositionY',
}

try {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      document.getElementById(ELEMENTS_IDS.gpsPositionX).textContent = position.coords.latitude;
      document.getElementById(ELEMENTS_IDS.gpsPositionY).textContent = position.coords.longitude;
    },
    (error) => {
      document.getElementById(ELEMENTS_IDS.gpsPositionX).textContent = error.message;
    }
  );
} catch (err) {
  document.getElementById(ELEMENTS_IDS.gpsPositionX).textContent = err.message;
}
