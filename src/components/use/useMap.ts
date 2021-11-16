import Application from "@/models/Application";

let google: any = null;
let map: any = null;

export default function useMap() {
  function initMap(googleData: any, mapData: any) {
    google = googleData;
    map = mapData;
  }

  function createMarker(lat, lng, icon) {
    return new google.maps.Marker({
      position: {lat, lng},
      map: map,
      icon,
    });
  }
  function generateMyGeoPosition() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(position => {
          createMarker(position.coords.latitude, position.coords.longitude, '/marker-icons/user-location-icon.svg');
        },
        error => {
          console.log(error.message);
          createMarker(50.754311645428764, 25.332929592093258, '/marker-icons/user-location-icon.svg');
        })
  }
  function generateMarker() {
    Application.venues.value.forEach((venue) => {
      if (venue.isRecommended) {
        venue.marker = createMarker(+venue.lat, +venue.lng, venue.markerIconRecommended);
      } else {
        venue.marker = createMarker(+venue.lat, +venue.lng, venue.markerIcon);
      }
    });
  }

  function getMapData() {
    return {
      google,
      map,
    }
  }

  return {
    initMap,
    getMapData,
    generateMyGeoPosition,
    generateMarker,
  };
}