const ELEMENTS_IDS = {
  gpsPositionX: 'gpsPositionX',
  gpsPositionY: 'gpsPositionY',
  coordsInput: 'coordsInput',
  saveCoordsButton: 'saveCoordsButton',
}

try {
  navigator.geolocation.watchPosition(
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

const setArObjectAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}

const addArObject = (coordinate) => {
  document.querySelector('a-scene').insertAdjacentHTML('beforeEnd', `<a-entity material='color: red' geometry='primitive: box' gps-new-entity-place="latitude: ${coordinate[0]}; longitude: ${coordinate[1]}" scale="10 10 10"></a-entity>`);
};

document.getElementById(ELEMENTS_IDS.saveCoordsButton).addEventListener('click', () => {
  // document.querySelectorAll('a-entity').forEach((element) => element.remove()); // TOOD: Add remove of the previous entities.

  const coordinate = document.getElementById(ELEMENTS_IDS.coordsInput).value;
  if (coordinate) addArObject(coordinate.split(','));
});
