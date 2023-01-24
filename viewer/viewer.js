const getGeoJsonFromQueryParams = () => {
  const queryParams = new URLSearchParams(location.search);
  const stringifiedGeoJson = queryParams.get("d");
  if (!stringifiedGeoJson) {
    alert("Brak danych do wyświetlenia!");
    location = "/";
  }
  return JSON.parse(stringifiedGeoJson);
};

window.onload = () => {
  const cameraElement = document.querySelector("[gps-new-camera]");

  cameraElement.addEventListener("gps-camera-update-position", () => {
    getGeoJsonFromQueryParams().features.forEach(({ geometry, properties }) => {
      const compoundEntity = document.createElement("a-entity");

      const [longitude, latitude] = geometry.coordinates;
      compoundEntity.setAttribute("gps-new-entity-place", {
        latitude,
        longitude,
      });

      const markerIconImage = document.createElement("a-image");
      markerIconImage.setAttribute("look-at", "[gps-new-camera]");
      markerIconImage.setAttribute("src", "../assets/locator.png");
      markerIconImage.setAttribute("width", 4);
      markerIconImage.setAttribute("height", 6);
      markerIconImage.setAttribute("position", {
        x: 0,
        y: 4,
        z: 0,
      });

      const labelPlane = document.createElement("a-plane");
      labelPlane.setAttribute("color", "#115f8b");
      labelPlane.setAttribute("width", 3);
      labelPlane.setAttribute("height", "auto");
      labelPlane.setAttribute("look-at", "[gps-new-camera]");
      labelPlane.setAttribute("scale", {
        x: 20,
        y: 20,
        z: 20,
      });
      labelPlane.setAttribute("text", {
        // TODO: Obsłużyć polskie znaki.
        // font: 'https://cdn.aframe.io/fonts/mozillavr.fnt',
        value: properties.name || `${longitude}, ${latitude}`,
        color: "#fff",
        align: "center",
        width: 2,
      });

      compoundEntity.appendChild(labelPlane);
      compoundEntity.appendChild(markerIconImage);
      document.querySelector("a-scene").appendChild(compoundEntity);
    });
  });
};

navigator.geolocation.watchPosition(
  ({ coords: { latitude, longitude, accuracy }}) => {
    document.getElementById('lastPositionUpdate').innerText = new Date().toLocaleTimeString();
    document.getElementById('currentPosition').innerText = `${latitude}, ${longitude}`;
    document.getElementById('accuracy').innerText = `${accuracy}m`;
  },
  ({ message }) => {
    window.alert(message);
  });
