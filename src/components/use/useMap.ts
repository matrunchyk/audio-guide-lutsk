// import GoogleMapsApiLoader from 'google-maps-api-loader'
//
// const google = null
// const map = {}
//
// export function initializeMap() {
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const directionsService = new this.google.maps.DirectionsService();
//     const lutsk = { lat: 50.76702937034824, lng: 25.308253865549478 };
//     const mapContainer = this.$refs.googleMap;
//     this.map = new this.google.maps.Map(
//         mapContainer, {
//             zoom: 14,
//             center: lutsk,
//         }
//     )
//     directionsRenderer.setMap(this.map);
//
//     this.createMarker(this.createLatLng(50.758741155650625, 25.350550096593707));
//     this.createMarker(this.createLatLng(50.74270304771435, 25.323703361173983));
//     this.calculateAndDisplayRoute(directionsService, directionsRenderer);
//
// },