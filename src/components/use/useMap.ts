import Application from "@/models/Application";
import router from "@/router";

let google: any = null;
let map: any = null;
let directionsRenderer: any = null;
let directionsService: any = null;

export default function useMap() {
  function initMap(googleData: any, mapData: any) {
    google = googleData;
    map = mapData;
    directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsService = new google.maps.DirectionsService();
  }

  function createMarker(lat, lng, icon) {
    if (!google) return;
    const marker = new google.maps.Marker({
      position: {lat, lng},
      map: map,
      icon,
    });
    marker.addListener("click", () => {
      if (window.innerWidth <= 640) {
        router.push({path: `/`});
      }
      Application.venues.value.forEach(venue => {
        if (+venue.lat === lat) {
          if (venue.isRecommended) {
            venue.marker?.setIcon(venue.markerIconRecommendedFavorite);
          } else {
            venue.marker?.setIcon(venue.markerIconFavorite);
          }
          venue.showDetail();
        }
      });
      map.setZoom(15);
    });
    return marker;
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
      directionsRenderer,
      directionsService,
    }
  }

  return {
    initMap,
    getMapData,
    generateMyGeoPosition,
    generateMarker,
  };
}
