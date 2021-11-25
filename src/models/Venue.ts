import Application from '@/models/Application';
import useMap from '@/components/use/useMap.ts';
import { event } from 'vue-gtag';

export default class Venue {
  public index = 0;

  public localizations = [];

  public image = '';

  public icon = '';

  public isRecommended = false;

  public recommended = 0;

  public rated = false;

  public rating = 0;

  public averageRating = 0;

  public pinned = false;

  public firstRecommended = false;

  public lastRecommended = false;

  public lat = '';

  public lng = '';

  public marker: google.maps.Marker | null = null;

  public isFavorite = false;

  public markerIcon = '';

  public markerIconFavorite = '';

  public markerIconRecommended = '';

  public markerIconRecommendedFavorite = '';

  constructor(props: Partial<Venue>) {
    Object.assign(this, props);

    return this;
  }

  public enhanceRecommended(firstRecommended: boolean, lastRecommended: boolean) {
    this.firstRecommended = firstRecommended;
    this.lastRecommended = lastRecommended;

    return this;
  }

  public showRatingModal() {
    Application.ratingVenue.value = this;
  }

  public showDetail(minimized = false) {
    Application.detailVenueMinimized.value = minimized;
    Application.detailVenue.value = this;
  }

  public toggleFavorite() {
    if (!this.marker) return;
    if (this.isFavorite && this.isRecommended) {
      this.marker.setIcon(this.markerIconRecommendedFavorite);
    } else if (this.isFavorite) {
      this.marker.setIcon(this.markerIconFavorite);
    } else if (this.isRecommended) {
      this.marker.setIcon(this.markerIconRecommended);
    } else {
      this.marker.setIcon(this.markerIcon);
    }
  }

  public createLatLng(lat: any, lng: any) {
    return new (useMap().getMapData()).google.maps.LatLng(lat, lng);
  }

  public generateRoute() {
    // @ts-ignore
    useMap().getMapData().directionsRenderer.setMap(useMap().getMapData().map);

    this.calculateAndDisplayRoute(useMap().getMapData().directionsService, useMap().getMapData().directionsRenderer);
  }

  public calculateAndDisplayRoute(
    directionsService: any,
    directionsRenderer: any,
  ) {
    const waypoints: { location: any; stopover: boolean; }[] = [];
    Application.venues.value.forEach(item => {
      if (item.isFavorite) {
        waypoints.push({
          location: this.createLatLng(item.lat, item.lng),
          stopover: true,
        });
      }
    });
    navigator.geolocation.getCurrentPosition(position => {
        if (!this) return;
        directionsService.route({
          origin: this.createLatLng(position.coords.latitude, position.coords.longitude),
          destination: this.createLatLng(this.lat, this.lng),
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: (useMap().getMapData()).google.maps.TravelMode.WALKING,
        }).then((response: any) => {
          directionsRenderer.setDirections(response);
          event('calculate-route-success', {
            value: `source: ${position.coords.latitude}, ${position.coords.longitude}; dest: ${this.lat}, ${this.lng}`,
          });
        });
      },
      error => {
        console.log(error.message);
        event('calculate-route-error', { error: error.message });
      })
  }
}
